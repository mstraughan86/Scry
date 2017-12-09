const path = require('path');
const fs = require('fs');
const mongoose = require(path.join(__dirname, '..', 'utilities', 'mongoose.js'));

const dataDictionary = require('../utilities/dataDictionary.js');

// gonna get rid of this because we wont ever use it.
// examples be damned.
// the video.episode example below is going to be the one
let ogExample = {
  'facebookAppId': 'ccc',
  'images': [
    {
      'openGraph-image': 'https://github.com/edent/SuperTinySocialIcons/blob/master/original/github.png',
      'openGraph-imageSecureUrl': 'https://github.com/edent/SuperTinySocialIcons/blob/master/original/github.png',
      'openGraph-imageType': 'image/png',
      'openGraph-imageWidth': '200',
      'openGraph-imageHeight': '200',
      'openGraph-imageAltText': 'imageAltText'
    },
    {
      'openGraph-image': 'https://raw.githubusercontent.com/edent/SuperTinySocialIcons/master/original/flickr.png',
      'openGraph-imageSecureUrl': 'https://raw.githubusercontent.com/edent/SuperTinySocialIcons/master/original/flickr.png',
      'openGraph-imageType': 'image/png',
      'openGraph-imageWidth': '200',
      'openGraph-imageHeight': '200',
      'openGraph-imageAltText': 'imageAltText'
    },
    {
      'openGraph-image': 'https://raw.githubusercontent.com/edent/SuperTinySocialIcons/master/original/twitter.png',
      'openGraph-imageSecureUrl': 'https://raw.githubusercontent.com/edent/SuperTinySocialIcons/master/original/twitter.png',
      'openGraph-imageType': 'image/png',
      'openGraph-imageWidth': '200',
      'openGraph-imageHeight': '200',
      'openGraph-imageAltText': 'imageAltText'
    }
  ],
  'openGraph-type': "video.episode",
  'openGraph-videoSeries': 'asdf',
  'openGraph-videoReleaseDate': 'asdf',
  'openGraph-videoDuration': 'asdf',
  'openGraph-videoTags': 'asdf',
  'actors': [
    {
      'link': 'https://www.imdb.com/1234',
      'role': 'Norm Hull'
    },
    {
      'link': 'https://www.imdb.com/5678',
      'role': 'Todd Margarette'
    }
  ],
  'directors': [
    {
      'link': 'https://www.imdb.com/1234'
    }
  ],
  'writers': [
    {
      'link': 'https://www.imdb.com/1234'
    }
  ]
};

// ** potential omni-tool
// function renameKeys(obj, newKeys) {
//   return Object.keys(obj).map(key => {
//     const newKey = newKeys[key] || key;
//     return { [newKey]: obj[key] };
//   });
// }
// const renameKeys = (obj, newKeys) => Object.keys(obj).map(k => {return { [(newKeys[k] || k)]: obj[k] };});

function openGraphConstructor(color, seating, fuel) {
  this.color = color;
  this.seating = seating;
  this.fuelConsumption = fuel;
}

const generate = (pageType, pageObject) => {
  if (pageType == 'home') {
    return ogExample;
  }
  if (pageType == 'video') {
    // in addition to normalizing this
    // i must also go into open-graph.dust and normalize those expected parameters
    // the ogExample above is just confusing because now we are mixing two naming
    // conventions. get it together mike.

    return mongoose.schemas.VideoObject
      .find({'title': pageObject})
      .collation({locale: 'en', strength: 2})
      .sort({season: 1})
      .sort({episode: 1})
      .then(result => {
        const videoObject = result[0];

        var images = videoObject.forEach(video => {
          return {
            'url': 'https://raw.githubusercontent.com/edent/SuperTinySocialIcons/master/original/flickr.png',
            'type': 'image/png', // this is a png
            'width': '200', // i dont have this
            'height': '200', // i dont have this
            'alt': 'imageAltText' // i dont have this
          }
        });

        return {
          // these 3 are defaults
          title: videoObject.title,
          description: videoObject.description,
          images: videoObject.images, // make into an array somehow

          // type definer
          type: 'video.episode',

          // video episode specific stuff.
          series: videoObject.series,
          releaseDate: videoObject.releaseDate,
          duration: videoObject.duration,
          tags: videoObject.tags,

          actors: videoObject.actors,
          directors: videoObject.directors,
          writers: videoObject.writers
        };

      })
      .catch(err => {console.log('ERR: app.post /video/playlist', err)});
  }
  if (pageType == 'page') {

  }
  if (pageType == 'other') {

  }
};

module.exports = {
  generate: generate,
};