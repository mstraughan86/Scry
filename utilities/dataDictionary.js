const videoSeries = 'King of the Hill';

const thesaurus = [
  {"Pilot": "pilot"},
  {"Square Peg": "square-peg"},
  {"The Order of the Straight Arrow": "the-order-of-the-straight-arrow"},
  {"Hank's Got the Willies": "hank-s-got-the-willies"},
  {"Luanne's Saga": "luanne-s-saga"},
  {"Hank's Unmentionable Problem": "hank-s-unmentionable-problem"},
  {"Westie Side Story": "westie-side-story"},
  {"Shins of the Father": "shins-of-the-father"},
  {"Peggy the Boggle Champ": "peggy-the-boggle-champ"},
  {"Keeping Up with Our Joneses": "keeping-up-with-our-joneses"},
  {"King of the Ant Hill": "king-of-the-ant-hill"},
  {"Plastic White Female": "plastic-white-female"}
  //{"Episode Title Here": "episode-title-here"}
];

// {
//   index: 1,
//   title: 'Butterfly Video',
//   url: '',
//   season: '',
//   episode: '',
//   description: '',
//   video: '',
//   trailer: '', //hover over trailer?
//   images: [], // what different kinds of images do i want? for display, for opengraph linking, etc etc.
//   releaseDate: '',
//   duration: '',
//   actors: [],
//   writers: [],
//   directors: [],
//   tags: []
// }

const database = [
  {
    title: `title`,
    url: '/video/0',
    aliasUrl: '/episode/alias',
    season: 0,
    episode: 0,
    description: `Description`,
    video: '/files/videos/0.mp4',
    trailer: '/files/videos/trailers/0.mp4',
    imageThumb: '/files/images/0.jpg'
  },
  {
    title: 'Pilot',
    url: '/video/1',
    aliasUrl: '/episode/pilot',
    season: 1,
    episode: 1,
    description: `Hank Hill is a proud and true American. He loves his job as a propane salesman, and respects and loves his family. But one day, after his son Bobby receives a black eye from a baseball game and Hank is heard raising his voice at the Mega-lo Mart, some women come to suspect Hank abuses his son. Word of mouth gets around and soon Hank finds himself under investigation by a skinny, neurotic social worker.`,
    video: '/files/videos/1.mp4',
    trailer: '/files/videos/trailers/1.mp4', //hover over trailer?
    imageThumb: '/files/images/1.jpg',
    images: [
      {
        url: '/files/images/pilot.jpg',
        secureUrl: '/files/images/pilot.jpg',
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
    title: 'Square Peg',
    url: '/video/2',
    aliasUrl: '/episode/square-peg',
    season: 1,
    episode: 2,
    description: `Peggy is chosen to be the Sex Education teacher at Bobby's school.`,
    video: '/files/videos/2.mp4',
    trailer: '/files/videos/trailers/2.mp4', //hover over trailer?
    imageThumb: '/files/images/2.jpg'
  },
  {
    title: 'The Order of the Straight Arrow',
    url: '/video/3',
    aliasUrl: '/episode/the-order-of-the-straight-arrow',
    season: 1,
    episode: 3,
    description: `When Bobby becomes a member of the Straight Arrows, Hank, Dale, Bill, & Boomhauer volunteer to take them on a camping trip. While there Bobby accidentally kill a whooping crane.`,
    video: '/files/videos/3.mp4',
    trailer: '/files/videos/trailers/3.mp4', //hover over trailer?
    imageThumb: '/files/images/3.jpg'
  },
  {
    title: `Hank's Got the Willies`,
    url: '/video/4',
    aliasUrl: '/episode/hank-s-got-the-willies',
    season: 1,
    episode: 4,
    description: `Bobby accidentally hits Hank's hero, Willie Nelson, with a golf ball.`,
    video: '/files/videos/4.mp4',
    trailer: '/files/videos/trailers/4.mp4', //hover over trailer?
    imageThumb: '/files/images/4.jpg'
  },
  {
    title: `Luanne's Saga`,
    url: '/video/5',
    aliasUrl: '/episode/hank-s-got-the-willies',
    season: 1,
    episode: 5,
    description: `After Buckley dumps Luanne Hank takes it upon himself to find her a new boyfriend, but for his own personal gain.`,
    video: '/files/videos/5.mp4',
    trailer: '/files/videos/trailers/5.mp4', //hover over trailer?
    imageThumb: '/files/images/5.jpg'
  },
  {
    title: `Hank's Unmentionable Problem`,
    url: '/video/6',
    aliasUrl: '/episode/hank-s-unmentionable-problem',
    season: 1,
    episode: 6,
    description: `Hank is very embarrassed and introvert about his constipation. And it certainly doesn't help his condition with Peggy telling all her friends, making Hank go to a proctologist and treating him like a child over it.`,
    video: '/files/videos/6.mp4',
    trailer: '/files/videos/trailers/6.mp4', //hover over trailer?
    imageThumb: '/files/images/6.jpg'
  },
  {
    title: `Westie Side Story`,
    url: '/video/7',
    aliasUrl: '/episode/westie-side-story',
    season: 1,
    episode: 7,
    description: `Hank and the rest of the gang on Rainey St. gets a culture shock when their new Laotian neighbors move in next door.`,
    video: '/files/videos/7.mp4',
    trailer: '/files/videos/trailers/7.mp4', //hover over trailer?
    imageThumb: '/files/images/7.jpg'
  },
  {
    title: `Shins of the Father`,
    url: '/video/8',
    aliasUrl: '/episode/shins-of-the-father',
    season: 1,
    episode: 8,
    description: `Hank's rambunctious, bigoted, sexist, loud war-vet father, Cotton, visits the Hills for Bobby's birthday. Instantly Cotton teaches the boy bad habits about how to treat women. Hank refuses to admit his father is doing wrong, until Cotton takes Bobby to the sleazy Hotel Arlen to go hooker shopping!`,
    video: '/files/videos/8.mp4',
    trailer: '/files/videos/trailers/8.mp4', //hover over trailer?
    imageThumb: '/files/images/8.jpg'
  },
  {
    title: `Peggy the Boggle Champ`,
    url: '/video/9',
    aliasUrl: '/episode/peggy-the-boggle-champ',
    season: 1,
    episode: 9,
    description: `Peggy and Hank head to Dallas so Peggy can compete in a boggle tournament, but Hank decides to forego the tournament in order to attend a lawnmower expo.`,
    video: '/files/videos/9.mp4',
    trailer: '/files/videos/trailers/9.mp4', //hover over trailer?
    imageThumb: '/files/images/9.jpg'
  },
  {
    title: `Keeping Up with Our Joneses`,
    url: '/video/10',
    aliasUrl: '/episode/keeping-up-with-our-joneses',
    season: 1,
    episode: 10,
    description: `When Bobby is caught trying a cigarette, Hank decides the proper discipline is making Bobby smoke an entire carton. The result sparks an old smoking habit of Hank's and Peggy's, as well as a new habit in Bobby.`,
    video: '/files/videos/10.mp4',
    trailer: '/files/videos/trailers/10.mp4', //hover over trailer?
    imageThumb: '/files/images/10.jpg'
  },
  {
    title: `King of the Ant Hill`,
    url: '/video/11',
    aliasUrl: '/episode/king-of-the-ant-hill',
    season: 1,
    episode: 11,
    description: `After Hank fires him as his exterminator, Dale infests Hanks lawn with ants in order to seek revenge.`,
    video: '/files/videos/11.mp4',
    trailer: '/files/videos/trailers/11.mp4', //hover over trailer?
    imageThumb: '/files/images/11.jpg'
  },
  {
    title: `Plastic White Female`,
    url: '/video/12',
    aliasUrl: '/episode/plastic-white-female',
    season: 1,
    episode: 12,
    description: `Joeseph is throwing a co-ed party and informs Bobby there is going to be kissing. Never haven kissed a girl, Bobby practices on a plastic head Luanne was given for beauty school.`,
    video: '/files/videos/12.mp4',
    trailer: '/files/videos/trailers/12.mp4', //hover over trailer?
    imageThumb: '/files/images/12.jpg'
  },

];

const doesThisVideoExist = title => {
  if (typeof title == 'string') {
    if (thesaurus.map(o => Object.keys(o)[0]).includes(title)) return true;
    if (thesaurus.map(o => o[Object.keys(o)[0]]).includes(title)) return true;
  }
  if (typeof title == 'number')
    if (thesaurus.length >= title) return true;
  return false;
};
const getVideoIndexByTitle = title => {
  if (/[A-Z]|\s+/.test(title)) return thesaurus.findIndex(o => Object.keys(o)[0] == title);
  return thesaurus.findIndex(o => o[Object.keys(o)[0]] == title);
};
const formatTitleForUrl = title => title.replace(/\W+/g, '-').toLowerCase();
const getSeries = () => videoSeries;
const getVideosList = () => thesaurus.map(o => Object.keys(o)[0]);
const getVideoData = ref => {
  const titleCheck = doesThisVideoExist(ref);
  if (typeof ref == 'string' && titleCheck) return database[getVideoIndexByTitle(ref)];
  if (typeof ref == 'number' && titleCheck) return database[ref];
  return null;
};

const getSeasonCarouselArray = (seasonNumber) => {
  return database
    .filter(e => e.season === seasonNumber)
    .map(e => ({title: e.title, url: e.aliasUrl, imageThumb: e.imageThumb}))
};

const getAliasUrlsList = () => database.map(o => {return {[o.url]: o.aliasUrl}});
const getVideoFilePathFromId = id => database[id].video || 0; // This is if someone manually types in /video/number and its crazy high.

const getFullSeriesLoopPlaylist = (url) => {
  const range = (start, end) => Array.from({length: (end - start + 1)}, (v, k) => k + start); // This is useful!
  const origin = database.findIndex(o => o.aliasUrl == url);
  const size = database.length - 1;

  const video = (reference) => {
    return {
      sources: [{
        src: `/files/videos/${reference}.mp4`,
        type: 'video/mp4'
      }],
        poster: `/files/images/${reference}.jpg`
    }
  };

  let playlist = [];

  if (origin > 1) {
    range(origin, size).forEach(e => playlist.push(video(e)));
    range(1, origin - 1).forEach(e => playlist.push(video(e)));
  }
  else range(1, size).forEach(e => playlist.push(video(e)));

  return playlist;
};

// get rid of absolute path urls in the data object, and store the actual
// website somewhere and abstract its use.

// rename getSeries to getSeriesTitle
module.exports = {
  getSeries,
  getVideoData,
  getVideosList,
  getSeasonCarouselArray,
  getAliasUrlsList,
  formatTitleForUrl,
  getVideoFilePathFromId,
  getFullSeriesLoopPlaylist
};