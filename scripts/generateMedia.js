const path = require('path');
const fs = require('fs');
const os = require('os').platform();

const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = (os === 'win32') ? path.join(__dirname, '..', 'lib', 'ffmpeg', 'bin', 'ffmpeg.exe') : ''; // fix for Ubuntu/RPI3
ffmpeg.setFfmpegPath(ffmpegPath);
let config;

const walk = dir => {
  return fs.readdirSync(dir)
    .reduce((array, file) =>
        fs.statSync(path.join(dir, file)).isDirectory() ?
          array.concat(walk(path.join(dir, file))) :
          array.concat(path.join(dir, file))
      , []);
};
const sysout = msg => {console.log((new Date().toLocaleTimeString()) + ` |  ` + msg)};
const getInputArgs = () => {
  return process.argv.slice(2).reduce((accumulator, current) => {
    let [key, value = true] = current.split('=');
    accumulator[key] = value;
    return accumulator;
  }, {});
};
const promiseSeries = (array, initial = 0, ...args) => {
  return array
    .reduce((chain, promise)=>{
      return chain.then(result => promise(result, ...args));
    }, Promise.resolve(initial));
};

// getVideoFrameRate // ffprobe -v 0 -of csv=p=0 -select_streams 0 -show_entries stream=r_frame_rate infile
const processSaveDirectories = (title) => {
  return new Promise((resolve, reject) => {
    fs.stat(path.join(config.dirs.output, title), (err, stats) => {
      sysout('Checking Directory.');
      if (err && err.code == 'ENOENT') {
        sysout('Directory does not exist. Creating directory structure.');
        const newDirectory = path.join(config.dirs.output, title);
        try {
          fs.mkdirSync(newDirectory);
          fs.mkdirSync(path.join(newDirectory, config.dirs.audio));
          fs.mkdirSync(path.join(newDirectory, config.dirs.video.root));
          fs.mkdirSync(path.join(newDirectory, config.dirs.previews));
          fs.mkdirSync(path.join(newDirectory, config.dirs.screenshots));
          fs.mkdirSync(path.join(newDirectory, config.dirs.video.small));
          fs.mkdirSync(path.join(newDirectory, config.dirs.video.medium));
          fs.mkdirSync(path.join(newDirectory, config.dirs.video.large));
          fs.mkdirSync(path.join(newDirectory, config.dirs.video.full));
          sysout('Directories created!');
        }
        catch (err) {
          return reject(err);
        }
        return resolve();
      }
      if (!stats.isDirectory()) return reject('Directory exists as a different file type!');
      else {
        resolve(sysout('Directory exists.'));
        return resolve();
      }
    });
  });
};
const getVideoDuration = (videoPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(videoPath, (err, metadata) => {resolve(metadata.format.duration)});
  });
};
const createVideoAudioMedia = (videoPath, fileName, savePath, videoDuration) => {
  const videoJump = percent => (videoDuration / 100) * percent;
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(videoPath)
      .output(path.join(savePath, config.dirs.audio, `${fileName}.mp3`)).format('mp3')

      .output(path.join(savePath, config.dirs.video.small, `${fileName}.mp4`)).format('mp4').audioCodec('copy').size(config.sizes.small)
      .output(path.join(savePath, config.dirs.video.medium, `${fileName}.mp4`)).format('mp4').audioCodec('copy').size(config.sizes.medium)
      .output(path.join(savePath, config.dirs.video.large, `${fileName}.mp4`)).format('mp4').audioCodec('copy').size(config.sizes.large)
      .output(path.join(savePath, config.dirs.video.full, `${fileName}.mp4`)).format('mp4').audioCodec('copy').size(config.sizes.full)

    // If I take the duration of the video, remove the intro and outro, and divide that by 6
    // i get the percentages @ from 20 to 95

      .output(path.join(savePath, config.dirs.previews, 'tn_1.mp4')).size('320x?').noAudio().seek(videoJump(5)).duration(4)
      .output(path.join(savePath, config.dirs.previews, 'tn_2.mp4')).size('320x?').noAudio().seek(videoJump(20)).duration(4)
      .output(path.join(savePath, config.dirs.previews, 'tn_3.mp4')).size('320x?').noAudio().seek(videoJump(35)).duration(4)
      .output(path.join(savePath, config.dirs.previews, 'tn_4.mp4')).size('320x?').noAudio().seek(videoJump(50)).duration(4)
      .output(path.join(savePath, config.dirs.previews, 'tn_5.mp4')).size('320x?').noAudio().seek(videoJump(65)).duration(4)
      .output(path.join(savePath, config.dirs.previews, 'tn_6.mp4')).size('320x?').noAudio().seek(videoJump(80)).duration(4)

    //.output(path.join(savePath, 'video',  'small', `${fileName}.mp4`)).format('webm').size('25%')
    //.output(path.join(savePath, 'video',  'medium', `${fileName}.mp4`)).format('webm').size('50%')
    //.output(path.join(savePath, 'video',  'large', `${fileName}.mp4`)).format('webm').size('75%')
    //.output(path.join(savePath, 'video',  'original', `${fileName}.mp4`)).format('webm').size('100%')

      .on('start', () => {sysout('Creating media.');})
      .on('progress', progress => {
        let p = Math.floor(progress.percent);
        if (p % 5 === 0) sysout(`Progress: ${p}%`);
      })
      .on('error', err => {reject(err)})
      .on('end', () => {
        sysout('Processing finished!');
        resolve();
      })
      .run();
  });
};
const createScreenshots = (videoPath, fileName, savePath) => {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(videoPath)
      .on('start', () => {sysout('Creating screenshots.');})
      .on('progress', progress => {
        let p = Math.floor(progress.percent);
        if (p % 5 === 0) sysout(`Progress: ${p}%`);
      })
      .on('error', err => {reject(err)})
      .on('end', () => {
        sysout('Processing finished!');
        resolve();
      })
      .screenshots(
        {
          filename: `${fileName}x%i.png`,
          count: 10,
          folder: path.join(savePath, config.dirs.screenshots)
        }
      );
  });
};
const mergeThumbnailSegments = (fileName, savePath, array) => {

  // array currently is null, not passed, and made a default value. we should remove!

  const inputFiles = (process, array) => array.reduce((chain, file) => chain.input(file), process());
  const filesToCombine = array || [
      path.join(savePath, config.dirs.previews, 'tn_1.mp4'),
      path.join(savePath, config.dirs.previews, 'tn_2.mp4'),
      path.join(savePath, config.dirs.previews, 'tn_3.mp4'),
      path.join(savePath, config.dirs.previews, 'tn_4.mp4'),
      path.join(savePath, config.dirs.previews, 'tn_5.mp4'),
      path.join(savePath, config.dirs.previews, 'tn_6.mp4')
    ];

  return new Promise((resolve, reject) => {
    inputFiles(ffmpeg, filesToCombine)
      .on('start', () => {sysout('Creating preview.');})
      .on('progress', progress => {
        let p = Math.floor(progress.percent);
        if (p % 5 === 0) sysout(`Progress: ${p}%`);
      })
      .on('error', err => {reject(err)})
      .on('end', () => {
        sysout('Processing finished!');
        resolve();
      })
      .mergeToFile(path.join(savePath, config.dirs.previews, `${fileName}.mp4`), savePath);
  });
};
const createPalette = () => {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(path.join(config.dirs.output, 'combined.mp4'))
      .output(path.join(config.dirs.output, 'palette.png')).outputOptions('-vf palettegen=stats_mode=diff')
      .on('start', () => {sysout('Creating palette.');})
      .on('progress', progress => {
        let p = Math.floor(progress.percent);
        if (p % 5 === 0) sysout(`Progress: ${p}%`);
      })
      .on('error', err => {reject(err)})
      .on('end', () => {
        sysout('Processing finished!');
        resolve();
      })
      .run();
  });
};
const convertMP4toGIF = () => {
  return new Promise((resolve, reject) => {
    const fps = 30;
    ffmpeg()
      .input(path.join(config.dirs.output, 'combined.mp4'))
      .input(path.join(config.dirs.output, 'palette.png'))
      .output(path.join(config.dirs.output, 'thumbnail.gif'))
      .on('start', () => {sysout('Converting preview mp4 to gif.');})
      .on('progress', progress => {
        let p = Math.floor(progress.percent);
        if (p % 5 === 0) sysout(`Progress: ${p}%`);
      })
      .on('error', err => {reject(err)})
      .on('end', () => {
        sysout('Processing finished!');
        resolve();
      })
      .run();
  });
};
const deleteTempFiles = (savePath) => {
  const deleteFile = (file) => {
    fs.unlinkSync(path.join(savePath, config.dirs.previews, file)); // this has no catch, dangerous.
  };
  return new Promise((resolve, reject) => {
    const tempFilesRegex = /^tn\_\d+\.mp4$/;
    fs.readdir(path.join(savePath, config.dirs.previews), (error, files) => {
      if (error) return reject(error);
      files.filter(name => tempFilesRegex.test(name)).forEach(deleteFile);
      return resolve();
    });
  });
};

const processOneFile = file => {
  const videoPath = file;
  const seriesTitle = /[^_]*/.exec(file.substr(file.lastIndexOf('\\') + 1))[0];    // might break in linux
  const seasonNumber = /_([^]*?)x/.exec(file)[1].replace(/^[0]+/g, "");
  const episodeNumber = /x([^]*?)[.]/.exec(file)[1].replace(/^[0]+/g, "");
  const fileName = /.*\./.exec(file.substr(file.lastIndexOf('\\') + 1))[0].replace(/.$/, "");           // might break in linux
  const fullFileName = file.substr(file.lastIndexOf('\\') + 1);  // might break in linux
  const savePath = path.join(config.dirs.output, seriesTitle);

  return [
    (msg => {sysout('Processing File: ' + msg)}).bind(null, fullFileName),
    processSaveDirectories.bind(null, seriesTitle),
    getVideoDuration.bind(null, videoPath),
    createVideoAudioMedia.bind(null, videoPath, fileName, savePath),
    createScreenshots.bind(null, videoPath, fileName, savePath),
    mergeThumbnailSegments.bind(null, fileName, savePath),
    deleteTempFiles.bind(null, savePath)
  ];
};

const main = () => {

  config = {
    dirs : {
      input: 'import',
      output: path.join(__dirname, '..', 'public', 'media'),
      video: {
        root: 'video',
        small: path.join('video', 'small'),
        medium: path.join('video', 'medium'),
        large: path.join('video', 'large'),
        full: path.join('video', 'full'),
      },
      audio: 'audio',
      previews: 'previews',
      screenshots: 'screenshots',
    },
    sizes : {
      small : '25%',
      medium : '50%',
      large : '75%',
      full : '100%',
    }
  };

  const args = getInputArgs();
  args.path = args.path || config.dirs.input;

  const directory = path.join(__dirname, '..', args.path);
  const fileList = walk(directory);
  const workList = fileList.reduce((list, file) => list.concat(processOneFile(file)), []);

    return promiseSeries(workList)
      .catch((err)=>{console.log(err)});
};

main();

/*
Abstract/Refactor the following for a more customizable config:

- Alt video resolutions:
    percentage based, make option for resolution based.
- Save file names
- Trailer
    length
    number of scenes
    scene distribution
    temp file names
    file cleanup
- Video file formats
    mp3, mp4, webm
- Thumbnail sizes, 320x?
- Consider use of .env file, and stick these in there. That is even less 'hard-coded'.
 */

/*
 Amazing content ideas:
 Trailer maker:
 Find quotes of the episode from IMDB. Get the best quotes. Find the text for it. Find the video position for that
 scene, stitch them together chronologically and put a time limit on it.
 Trailer made, with auto generated GOOD cut points for dialogue, also with curated quotes for nostalgia effect.
 */