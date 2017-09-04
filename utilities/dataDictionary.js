const videoSeries = 'King of the Hill';

const videoMap = {
  "Pilot": 1,
  "Square Peg": 2,
  "The Order of the Straight Arrow": 3,
  "Hank's Got the Willies": 4,
  "Luanne's Saga": 5,
  "Hank's Unmentionable Problem": 6,
  "Westie Side Story": 7,
  "Shins of the Father": 8,
  "Peggy the Boggle Champ": 9,
  "Keeping Up with Our Joneses": 10,
  "King of the Ant Hill": 11,
  "Plastic White Female": 12
  //'episode-title-here': 'episode numeral here'
};

const database = [
  {
    title: 'Pilot',
    url: '/episode/pilot',
    season: 1,
    episode: 1,
    description: `Hank Hill is a proud and true American. He loves his job as a propane salesman, and respects and loves his family. But one day, after his son Bobby receives a black eye from a baseball game and Hank is heard raising his voice at the Mega-lo Mart, some women come to suspect Hank abuses his son. Word of mouth gets around and soon Hank finds himself under investigation by a skinny, neurotic social worker.`,
    video: '/videos/1.mp4',
    trailer: '/videos/trailers/1.mp4', //hover over trailer?
    imageThumb: '/images/001.jpg',
    images: [
      {
        url: '/images/pilot.jpg',
        secureUrl: '/images/pilot.jpg',
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
    url: '/episode/square-peg',
    season: 1,
    episode: 2,
    description: `Peggy is chosen to be the Sex Education teacher at Bobby's school.`,
    video: '/videos/2.mp4',
    trailer: '/videos/trailers/2.mp4', //hover over trailer?
    imageThumb: '/images/002.jpg'
  },
  {
    title: 'The Order of the Straight Arrow',
    url: '/episode/the-order-of-the-straight-arrow',
    season: 1,
    episode: 3,
    description: `When Bobby becomes a member of the Straight Arrows, Hank, Dale, Bill, & Boomhauer volunteer to take them on a camping trip. While there Bobby accidentally kill a whooping crane.`,
    video: '/videos/3.mp4',
    trailer: '/videos/trailers/3.mp4', //hover over trailer?
    imageThumb: '/images/003.jpg'
  },
  {
    title: `Hank's Got the Willies`,
    url: '/episode/hank-s-got-the-willies',
    season: 1,
    episode: 4,
    description: `Bobby accidentally hits Hank's hero, Willie Nelson, with a golf ball.`,
    video: '/videos/4.mp4',
    trailer: '/videos/trailers/4.mp4', //hover over trailer?
    imageThumb: '/images/004.jpg'
  },
  {
    title: `Luanne's Saga`,
    url: '/episode/hank-s-got-the-willies',
    season: 1,
    episode: 5,
    description: `After Buckley dumps Luanne Hank takes it upon himself to find her a new boyfriend, but for his own personal gain.`,
    video: '/videos/5.mp4',
    trailer: '/videos/trailers/5.mp4', //hover over trailer?
    imageThumb: '/images/005.jpg'
  },
  {
    title: `Hank's Unmentionable Problem`,
    url: '/episode/hank-s-unmentionable-problem',
    season: 1,
    episode: 6,
    description: `Hank is very embarrassed and introvert about his constipation. And it certainly doesn't help his condition with Peggy telling all her friends, making Hank go to a proctologist and treating him like a child over it.`,
    video: '/videos/6.mp4',
    trailer: '/videos/trailers/6.mp4', //hover over trailer?
    imageThumb: '/images/006.jpg'
  },
  {
    title: `Westie Side Story`,
    url: '/episode/westie-side-story',
    season: 1,
    episode: 7,
    description: `Hank and the rest of the gang on Rainey St. gets a culture shock when their new Laotian neighbors move in next door.`,
    video: '/videos/7.mp4',
    trailer: '/videos/trailers/7.mp4', //hover over trailer?
    imageThumb: '/images/007.jpg'
  },
  {
    title: `Shins of the Father`,
    url: '/episode/shins-of-the-father',
    season: 1,
    episode: 8,
    description: `Hank's rambunctious, bigoted, sexist, loud war-vet father, Cotton, visits the Hills for Bobby's birthday. Instantly Cotton teaches the boy bad habits about how to treat women. Hank refuses to admit his father is doing wrong, until Cotton takes Bobby to the sleazy Hotel Arlen to go hooker shopping!`,
    video: '/videos/8.mp4',
    trailer: '/videos/trailers/8.mp4', //hover over trailer?
    imageThumb: '/images/008.jpg'
  },
  {
    title: `Peggy the Boggle Champ`,
    url: '/episode/peggy-the-boggle-champ',
    season: 1,
    episode: 9,
    description: `Peggy and Hank head to Dallas so Peggy can compete in a boggle tournament, but Hank decides to forego the tournament in order to attend a lawnmower expo.`,
    video: '/videos/9.mp4',
    trailer: '/videos/trailers/9.mp4', //hover over trailer?
    imageThumb: '/images/009.jpg'
  },
  {
    title: `Keeping Up with Our Joneses`,
    url: '/episode/keeping-up-with-our-joneses',
    season: 1,
    episode: 10,
    description: `When Bobby is caught trying a cigarette, Hank decides the proper discipline is making Bobby smoke an entire carton. The result sparks an old smoking habit of Hank's and Peggy's, as well as a new habit in Bobby.`,
    video: '/videos/10.mp4',
    trailer: '/videos/trailers/10.mp4', //hover over trailer?
    imageThumb: '/images/010.jpg'
  },
  {
    title: `King of the Ant Hill`,
    url: '/episode/king-of-the-ant-hill',
    season: 1,
    episode: 11,
    description: `After Hank fires him as his exterminator, Dale infests Hanks lawn with ants in order to seek revenge.`,
    video: '/videos/11.mp4',
    trailer: '/videos/trailers/11.mp4', //hover over trailer?
    imageThumb: '/images/011.jpg'
  },
  {
    title: `Plastic White Female`,
    url: '/episode/plastic-white-female',
    season: 1,
    episode: 12,
    description: `Joeseph is throwing a co-ed party and informs Bobby there is going to be kissing. Never haven kissed a girl, Bobby practices on a plastic head Luanne was given for beauty school.`,
    video: '/videos/12.mp4',
    trailer: '/videos/trailers/12.mp4', //hover over trailer?
    imageThumb: '/images/012.jpg'
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

const doesThisVideoExist = title => {
  if (typeof title == 'string') return Object.keys(videoMap).includes(title);
  if (typeof title == 'number') return Object.values(videoMap).includes(title);
  return false;
};
const formatTitleForUrl = str => str.replace(/\W+/g, '-').toLowerCase();
const getSeries = () => videoSeries;
const getVideosList = () => Object.keys(videoMap);
const getVideoData = title => {
  const titleCheck = doesThisVideoExist(title);
  if (typeof title == 'string' && titleCheck) return database[videoMap[title]];
  if (typeof title == 'number' && titleCheck) return database[title];
  return null;
};

const getVideoPreviewObject = () => {

};

const getSeasonCarouselArray = (seasonNumber) => {
  return database
    .filter(e => e.season === seasonNumber)
    .map(e => ({title: e.title, url: e.url, imageThumb: e.imageThumb}))
};


// get rid of absolute path urls in the data object, and store the actual 
// website somewhere and abstract its use.

// rename getSeries to getSeriesTitle
module.exports = {
  getSeries,
  getVideoData,
  getVideosList,
  getSeasonCarouselArray,
  formatTitleForUrl
};