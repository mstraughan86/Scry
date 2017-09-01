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
    url: 'https://scry.io/bunny',
    season: 1,
    episode: 1,
    description: 'A video of a bunny is on the screen.',
    video: 'https://scry.io/video/1',
    trailer: 'https://scry.io/trailer/1', //hover over trailer?
    images: [
      {
        url: 'http://www.scry.io/images/bunny.jpg',
        secureUrl: 'https://www.scry.io/images/bunny.jpg',
        type: 'jpg',
        width: 200,
        height: 200,
        altText: 'This is a test image alt text, describing what this image is.',
      }
    ], // what different kinds of images do i want? for display, for opengraph linking, etc etc.
    releaseDate: '2017-12-01',
    duration: 100000,
    actors: [
      {
        profile: 'https://www.imdb.com/1234',
        role: 'Bunny Bunsworth'
      },
      {
        profile: 'https://www.imdb.com/1234',
        role: 'Bunnette Bunsworth'
      }
    ],
    writers: [
      {
        profile: 'https://www.imdb.com/1234',

      }
    ],
    directors: [
      {
        profile: 'https://www.imdb.com/1234',

      }
    ],
    tags: [
      'bunnies',
      'testing',
      'learning'
    ]
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
const doesThisVideoExist = (title) => {
  if (typeof title == 'string') return Object.keys(videoMap).includes(title);
  if (typeof title == 'number') return Object.values(videoMap).includes(title);
  return false;
};

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