const path = require('path');
const fs = require('fs');
const mongoose = require(path.join(__dirname, '..', 'utilities', 'mongoose.js'));
const omni = require(path.join(__dirname, '..', 'utilities', 'omni.js'));

const exampleUrlMap = [
  { '/video/imdb_id'  : '/show_title/episode_title'},
  { '/video/0'        : '/king-of-the-hill/alias'},
  { '/video/1'        : '/king-of-the-hill/pilot'},
  { '/video/2'        : '/king-of-the-hill/square-peg'},
  { '/video/imdb_id'  : '/movie_title'},
  { '/video/1999'     : '/terminator-2'},
  //...
];

const getAlias = url => {
  return new Promise((resolve, reject)=>{
    mongoose.schemas.VideoObject.find({}, (err, result) => {
      const urlMap = result.map(o => {
        return {[`\/video\/${o.imdb_id}`]: `\/${omni.formatToUrl(o.show)}\/${omni.formatToUrl(o.title)}`};
      });
      const originalUrls = urlMap.map(o => Object.keys(o)[0]);
      const aliasUrls = urlMap.map(o => o[Object.keys(o)[0]]);
      if (aliasUrls.includes(url)) resolve(originalUrls[aliasUrls.indexOf(url)]);
      resolve(null);
    })
  })
};

module.exports = (req, res, next) => {
  return getAlias(req.url)
    .then(alias=>{
      if (alias) req.url = alias;
      next();
    })
};