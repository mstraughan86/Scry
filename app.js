//let dotenv = require('dotenv') // https://www.npmjs.com/package/dotenv
let request = require('request');
let path = require('path');
let util = require('util');
let fs = require('fs');
let express = require('express');
let app = express();
let dust = require('express-dustjs');

let sass = require('node-sass-middleware');
let bourbon = require('./lib').bourbon;
let neat = require('./lib').neat;
let bitters = require('./lib').bitters;

let favicon = require('serve-favicon');
let routes = require('./routes/routes');
let alias = require('./routes/alias');
let seo = require('./routes/seo');
let serveStatic = require('serve-static');
//let bodyParser = require('body-parser');
//let cookieParser = require('cookie-parser');

//dotenv.config(); // Attaching things to process.env
//can set things like NODE_ENV for production, development, etc.

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
dustInstance.helpers.test = function (chunk, context, bodies, params) {return chunk.write('This is a test!')};

/* SASS Configuration ~~~~~~ */
const sassConfig = { // https://github.com/sass/node-sass#options
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public', 'css'),
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

// Use body-parser to parse the body of post requests from json
//app.use(bodyParser.json()); // support json encoded bodies
//app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies
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
app.use('/css', express.static(path.join(__dirname, 'node_modules', 'flickity', 'dist')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'flickity', 'dist')));

app.use('/css', express.static(path.join(__dirname, 'node_modules', 'video.js', 'dist')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'video.js', 'dist')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'videojs-playlist', 'dist')));

/* Public Resources ~~~~~~ */
app.use('/', favicon(path.join(__dirname, 'public', 'assets', 'favicon.ico'))); // Set favicon
app.use('/', express.static(path.join(__dirname, 'public'))); // Public files: CSS, JS, Images

/* Video Streaming ~~~~~~ */
app.use('/files/:videoFile', function (req, res) {
  let videoPath = path.join(__dirname, 'files', 'videos', 'bunny.mp4');
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
app.use(function (req, res, next) {
  let errorJSON = {
    title: 'Scry | 404\'d',
    error: {
      type: 404,
      url: req.url,
      method: req.method
    }
  };
  res.status(404).render('error', errorJSON);
});
app.use(function (error, req, res, next) {
  let errorJSON = {
    title: 'Scry | 500\'d',
    error: {
      type: 500,
      url: req.url,
      method: req.method,
      message: error.message
    }
  };
  res.status(500).render('error', errorJSON);
});

let port = process.env.PORT || 3002;
let server = app.listen(port, function () {
  console.log('Server running at http://127.0.0.1:' + port + '/');
});