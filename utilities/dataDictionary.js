const videoSeries = 'King of the Hill';

const videoMap = {
  'bunny': 0,
  'Butterfly Video': 1
  //{'episode-title-here': 'episode numeral here'}
};

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
  {
    index: 1,
    title: 'Butterfly Video',
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
  }
];

//does this video number exist
//get video name by number

const getSeries = () => {
  return videoSeries;
};

const getVideoData = (title) => {
  const titleCheck = doesThisVideoExist(title);
  if (typeof title == 'string' && titleCheck) return database[videoMap[title]];
  if (typeof title == 'number' && titleCheck) return database[title];
  return null;
};

const getVideosList = () => {
  return Object.keys(videoMap); // this just simply needs to be an array all titles
};

const formatTitleToUrl = (title) => {
  // Replace spaces with dashes
  // Replace symbols with dashes
  // Change title to all lower case
  return title.replace(/\W+/g, '-').toLowerCase();
};

module.exports = {
  getSeries,
  getVideoData,
  getVideosList,
  formatTitleToUrl
};