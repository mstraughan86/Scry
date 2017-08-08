"use strict";
let express = require('express');
//let dotenv = require('dotenv') // https://www.npmjs.com/package/dotenv

let app = express();
let path = require('path');
const util = require('util');
let dust = require('express-dustjs');
let request = require('request');
let favicon = require('serve-favicon');
let bodyParser = require('body-parser');
let routes = require('./routes/routes');
//let cookieParser = require('cookie-parser');

//dotenv.config(); // Attaching things to process.env

// These are copied from express-dustjs repo
// I don't really know what they do...
dust._.optimizers.format = function (ctx, node) {return node}; // Dustjs settings
dust._.helpers.demo = function (chk, ctx, bodies, params) {return chk.w('demo')}; // Define custom Dustjs helper

// Use Dustjs as Express view engine
app.engine('dust', dust.engine({useHelpers: true})); // Use dustjs-helpers
app.set('view engine', 'dust');
app.set('views', path.resolve(__dirname, './views'));

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

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico'))); // Set favicon
app.use(express.static(__dirname + '/public')); // Public files: CSS, JS, Images
app.use('/', routes); // Routes
//app.use('/videos', videos); // Example on how I can further segregate the routes.
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

let port = process.env.PORT || 3000;
let server = app.listen(port, function () {
  console.log('Server running at http://127.0.0.1:' + port + '/');
});