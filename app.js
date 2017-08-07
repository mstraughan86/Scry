"use strict";
let express = require('express');
//let dotenv = require('dotenv') // https://www.npmjs.com/package/dotenv

let app = express();
let path = require('path');
let dust = require('express-dustjs');
let request = require('request');

let bodyParser = require('body-parser');
var routes = require('./routes/routes');
//var slack = require('./utilities/slackApi');
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

app.use(favicon(path.join(__dirname,'public','images','favicon.ico'))); // Set a custom favicon
app.use(express.static(__dirname + '/public')); // Public files: CSS, JS, Images
app.use('/', routes); // Routes

// Error handling routes
//404
app.use(function(req, res) {
  let error = {
    type: "404 Not found page",
    headers : req.headers,
    url: req.url,
    httpVersion: req.httpVersion,
    method: req.method
  };
  //slack.sendMessage(JSON.stringify(error, null, 3));
  res.status(404).render('404', {title: 'Page Not Found.'});
});

//500
app.use(function(error, req, res, next) {
  let errorJSON = {
    type: "500 Interval Server Error",
    headers : req.headers,
    url: req.url,
    httpVersion: req.httpVersion,
    method: req.method,
    message: error.message,
  };
  //slack.sendMessage(JSON.stringify(errorJSON, null, 3));
  res.status(500).render('404', {title: 'Unexpected error, please try again.'});
});

let port = process.env.PORT || 3000;
let server = app.listen(port, function () {
  console.log('Server running at http://127.0.0.1:' + port + '/');
});

