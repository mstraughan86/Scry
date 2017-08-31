const dataDictionary = require('../utilities/dataDictionary.js');

var openGraph = {
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

const generate = (pageType, pageObject = 'default') => {
  if (pageType == 'home') {
    return openGraph;
  }

  if (pageType == 'video') {
    //pageObject is going to be some VIDEO that we are going to retrieve.
    // Lets see... whats up?
    return openGraph;
  }
};

module.exports = {
  generate: generate,
};
//we must return a variable named openGraph that contains an object full of shit that we need
