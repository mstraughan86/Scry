const videos = {
  'bunny': 0,
  'Butterfly Video': 1
  //{'episode-title-here': 'episode numeral here'}
};

//  I need to create a real good example of this, a few episodes worth to mess with.
const database = [
  {
    index: 0,
    title: 'bunny',
    url: '',
    season: '',
    episode: '',
    description: '',
    video: '',
    trailer: '', //hover over trailer?
    images: [], // what different kinds of images do i want? for display, for opengraph linking, etc etc.
    releaseDate: '',
    duration: '',
    actors: [],
    writers: [],
    directors: [],
    tags: []
  },
  {}
];


//does this video number exist
//get video name by number

const getVideo = (title) => {

};

const getVideosList = () => {
  return Object.keys(videos); // this just simply needs to be an array all titles
};

const formatTitleToUrl = (title) => {
  // Replace spaces with dashes
  // Replace symbols with dashes
  // Change title to all lower case
  return title.replace(/\W+/g, '-').toLowerCase();
};

module.exports = {
  getVideo,
  getVideosList,
  formatTitleToUrl
};