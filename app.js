const path = require('path');
const fs = require('fs');
require('dotenv').config();

let util = require('util');       // probably remove!

const express = require('express');
const app = express();

const mongoose = require(path.join(__dirname, '.', 'utilities', 'mongoose.js'));

const dust = require('express-dustjs');
const sass = require('node-sass-middleware');

const bourbon = require(path.join(__dirname, '.', 'lib')).bourbon;
const neat = require(path.join(__dirname, '.', 'lib')).neat;
const bitters = require(path.join(__dirname, '.', 'lib')).bitters;

const favicon = require('serve-favicon');
const routes = require(path.join(__dirname, '.', 'routes', 'routes.js'));
const alias = require(path.join(__dirname, '.', 'routes', 'alias.js'));
const seo = require(path.join(__dirname, '.', 'routes', 'seo.js'));

const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
//const cookieParser = require('cookie-parser');

const projectName = process.env.WHITE_LABEL;
const port = process.env.EXPRESS_PORT;
/*

 @import "bourbon";

 @import "neat";
 @import "neat-helpers";

 @import "base";
 @import "buttons";
 @import "forms";
 @import "layout";
 @import "lists";
 @import "media";
 @import "tables";
 @import "typography";
 @import "variables";

 */

/* DustJS Configuration ~~~~~~ */
const dustInstance = dust._; // Instance object to attach properties to.
dustInstance.config.whitespace = true; // .../dustjs/wiki/Dust-Tutorial#controlling-whitespace-suppression
dustInstance.helpers.test = (chunk, context, bodies, params) => {return chunk.write('This is a test!')};

/* SASS Configuration ~~~~~~ */
const sassConfig = { // https://github.com/sass/node-sass#options
  src: path.join(__dirname, '.', 'sass'),
  dest: path.join(__dirname, '.', 'public', 'css'),
  includePaths: [bourbon, neat, bitters],
  outputStyle: 'expanded',
  debug: false,
  prefix: '' // https://stackoverflow.com/questions/30654312/why-node-sass-middleware-is-not-working
};

/* ExpressJS Configuration ~~~~ ~~ */
app.engine('dust', dust.engine({useHelpers: true}));
app.set('view engine', 'dust');
app.set('views', path.resolve(__dirname, './views'));
app.use('/css', sass(sassConfig));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//app.use(cookieParser('secret')); // Use cookie-parser for affiliate link tracking
// For a short time during development, you will need to log in.
// If working locally, this is safe to comment out.
// let basicAuth = require('express-basic-auth');
// app.use(basicAuth({
//   users: { 'user': 'pass' },
//   challenge: true,
//   unauthorizedResponse: 'Unauthorized.'
// }));
// we want to do something like app.use([...things]) anyway.	\
//
//http://expressjs.com/en/api.html
//app.use([path,] callback [, callback...])

/* CSS/JS NPM Imports */
app.use('/css', express.static(path.join(__dirname, '.', 'node_modules', 'flickity', 'dist')));
app.use('/js', express.static(path.join(__dirname, '.', 'node_modules', 'flickity', 'dist')));

app.use('/css', express.static(path.join(__dirname, '.', 'node_modules', 'video.js', 'dist')));
app.use('/js', express.static(path.join(__dirname, '.', 'node_modules', 'video.js', 'dist')));
app.use('/js', express.static(path.join(__dirname, '.', 'node_modules', 'videojs-playlist', 'dist')));

/* Public Resources ~~~~~~ */
app.use('/', favicon(path.join(__dirname, '.', 'public', 'assets', 'favicon.ico'))); // Set favicon
app.use('/', express.static(path.join(__dirname, '.', 'public'))); // Public files: CSS, JS, Images

/* Video Streaming ~~~~~~ */
app.use('/files/:videoFile', (req, res) => {
  const videoFilePath = req.params.videoFile.substring(1).split('/');
  let videoPath = path.join(__dirname, ...videoFilePath);
  let stat = fs.statSync(videoPath);
  let total = stat.size;

  if (req.headers['range']) {
    let range = req.headers.range;
    let parts = range.replace(/bytes=/, "").split("-");
    let partialstart = parts[0];
    let partialend = parts[1];

    let start = parseInt(partialstart, 10);
    let end = partialend ? parseInt(partialend, 10) : total - 1;
    let chunksize = (end - start) + 1;
    //console.log('RANGE: ' + start + ' - ' + end + ' = ' + chunksize);

    let file = fs.createReadStream(videoPath, {start: start, end: end});
    res.writeHead(206, {
      'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4'
    });
    file.pipe(res);
  } else {
    //console.log('ALL: ' + total);
    res.writeHead(200, {'Content-Length': total, 'Content-Type': 'video/mp4'});
    fs.createReadStream(videoPath).pipe(res);
  }
});

/* Normalize Alias ~~~~~~ */
app.use('/', alias);

/* Routes ~~~~~~ */
app.use('/', routes); // Static Routes
app.use('/', seo); // Search Engine Optimization Routes
//app.use('/videos', videos); // Example on how I can further segregate the routes.

/* Errors ~~~~~~ */
app.use((req, res, next) => {
  let errorJSON = {
    title: `${projectName} | 404'd`,
    error: {
      type: 404,
      url: req.url,
      method: req.method
    }
  };
  res.status(404).render('error', errorJSON);
});
app.use((error, req, res, next) => {
  let errorJSON = {
    title: `${projectName} | 500'd`,
    error: {
      type: 500,
      url: req.url,
      method: req.method,
      message: error.message
    }
  };
  res.status(500).render('error', errorJSON);
});

/* MongoDB Initialization ~~~~~~ */
mongoose.initialize()
  .then(mongoose.connect)
  .then(() => app.listen(port, () => {
    console.log('Express: Server running at http://127.0.0.1:' + port + '/');
  }))
  // .then(server => {
  //   const VideoObject = mongoose.schemas.VideoObject;
  //   return VideoObject.find({}, (err, result) => {
  //     console.log('How many records do we total?: ', result.length);
  //     const formatToUrl = t => t.replace(/[^a-zA-Z0-9_.-]/g, '-').toLowerCase();
  //     let newResult = result.map(o => {
  //       return {[`\/video\/${o.imdb_id}`]: `\/${formatToUrl(o.show)}\/${formatToUrl(o.title)}`};
  //     });
  //     result.forEach(i=>{console.log(i)});
  //     newResult.forEach(i=>{console.log(i)});
  //     return Promise.resolve(server);
  //   });
  // })
  // .then(server => {
  //   const VideoObject = mongoose.schemas.VideoObject;
  //   return mongoose.remove(VideoObject, 'season', '1')
  //     .then(Promise.resolve(server))
  // })
  .then(server => {
    const VideoObject = mongoose.schemas.VideoObject;
    return VideoObject.find({}, (err, result) => {
      console.log('How many records do we total?: ', result.length);
      result.forEach(i=>{console.log(i)});
      console.log('How many records do we total?: ', result.length);
      return Promise.resolve(server);
    });
  })
  .then((server) => {

  })
  .then(server => {})
  .catch(err => {console.log(err)});