const path = require('path');
const authorize = require(path.join(__dirname, '..', 'utilities', 'google.js')).authorize;
const google = require(path.join(__dirname, '..', 'utilities', 'google.js'));
const mongoose = require(path.join(__dirname, '..', 'utilities', 'mongoose.js'));

const VideoObject = mongoose.schemas.VideoObject;
const creativeWork = mongoose.schemas.creativeWork;

// Put this into its own utility function.
const promiseSeries_withCombinedResults = (array, initial, ...args) => {
  const combinedResults = [];
  return array
    .reduce((chain, promise) => {
      return chain
        .then(result => promise(result, ...args))
        .then(result => {
          combinedResults.push(result);
          Promise.resolve(result);
        })
    }, Promise.resolve(initial))
    .then(() => Promise.resolve(combinedResults));
};

const turnLabeledSheetIntoObjectArray = array => {
  return array.slice(1, array.length).reduce((a, v, i, array2) => {
    return a.concat(
      array2[i].reduce((a, v, i) => {
        a[array[0][i]] = v;
        return a;
      }, {})
    );
  }, []);
};

const main = () => {
  return Promise.resolve()
    .then(mongoose.initialize)
    .then(mongoose.connect)
    .then(authorize)
    .then(google.checkBook)
    .then(google.setActiveSheet.bind(null, google.masterSheetName))
    .then(google.getActiveSheetData)
    .then(result => turnLabeledSheetIntoObjectArray(result.values))
    .then(tvSeriesDataObjectArray => {
      const processOneTitle = title => {
        return [
          () => Promise.resolve(title)
            .then(google.setActiveSheet)
            .then(google.getActiveSheetData)
            .then(result => turnLabeledSheetIntoObjectArray(result.values))
        ];
      };
      const titles = tvSeriesDataObjectArray.reduce((e, v, i, l) => e.concat(v.title), []);
      const work = titles.reduce((e, v, i, l) => e.concat(processOneTitle(v)), []);
      return promiseSeries_withCombinedResults(work)
        .then(result => {
          result.forEach(videos => {
            videos.forEach(video => {
              const fileName = `${video.show}_${video.season}x${video.episode}`;
              const mediaDirectory = `\/media\/${video.show}`;
              video.audio = `${mediaDirectory}\/audio\/${fileName}.mp3`;
              video.previews = `${mediaDirectory}\/previews\/${fileName}.mp4`;
              video.video = {};
              video.video.full = `${mediaDirectory}\/video\/full\/${fileName}.mp4`;
              video.video.large = `${mediaDirectory}\/video\/large\/${fileName}.mp4`;
              video.video.medium = `${mediaDirectory}\/video\/medium\/${fileName}.mp4`;
              video.video.small = `${mediaDirectory}\/video\/small\/${fileName}.mp4`;
              video.screenshots = [];
              for (let i = 1; i <= 10; i++) {
                var videoPath = `${mediaDirectory}\/screenshots\/${fileName}x${i}.png`;
                // now i need to get width and stuff using videoPath;
                // i need to import that new tool image-size

                video.screenshots.push({
                  url: (videoPath),
                  type: `image/png`,
                  width: (videoPath),
                  height: (videoPath),
                  alt: 'some kind of description'
                });
              }
            })
          });

          return [tvSeriesDataObjectArray, result];
        });
    })
    .then(result => {
      const [metaData, videoData] = result;
      return Promise.resolve([].concat(...videoData))
        .then(mongoose.save.bind(null, VideoObject))
        .then(() => Promise.resolve(metaData))
        .then(mongoose.save.bind(null, creativeWork))
    })
    .then(mongoose.disconnect)
    .then(mongoose.terminate)
    .catch((error) => {console.log('error:', error)});
};

main();