const dataDictionary = require('../utilities/dataDictionary.js');

var ogExample = {
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

const generate = (pageType, pageObject = 'default') => {
  if (pageType == 'home') {
    return ogExample;
  }
  if (pageType == 'video') {
    const videoObject = dataDictionary.getVideoData(pageObject);
    videoObject.series = dataDictionary.getSeries();

    return {
      title: videoObject.title,
      description: videoObject.description,
      images: videoObject.images,

      type: 'video.episode',

      series: videoObject.series,
      releaseDate: videoObject.releaseDate,
      duration: videoObject.duration,
      tags: videoObject.tags,

      actors: videoObject.actors,
      directors: videoObject.directors,
      writers: videoObject.writers
    };
  }
  if (pageType == 'page') {

  }
  if (pageType == 'other') {

  }
};

module.exports = {
  generate: generate,
};