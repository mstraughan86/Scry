"use strict";
let express = require('express');
let app = express();
let path = require('path');
let dust = require('express-dustjs');
let request = require('request');
let moment = require('moment');
let async = require('async');
const uuid = require('node-uuid');
let bodyParser = require('body-parser');

/**
 * Routing section
 */
app.get('/', (req, res) => {
  res.render('home', {
    title: 'Scry | Show me what you got.'
  });
});
/**
 * Route for the venue page
 * Maybe this sits in own file, unsure
 * Also don't know best way to get validVenueUrls
 */
app.get('/video/:videoId', (req, res, next) => {
  res.render('video', venueInfoObj);
});

module.exports = app;