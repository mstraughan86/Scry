let app = require('express')();
let dataDictionary = require('../utilities/dataDictionary.js');
let openGraph = require('../utilities/openGraph.js').generate;

app.get('/', (req, res) => {
  res.render('home', {
    title: 'Scry - Show me what you got.',
    description: 'My little scrying object, what would you show me?, I said, with rising anticipation.',
    canonical: 'https://www.scry.io',
    openGraph: openGraph('video', 'pilot'),
    season: [
      {episode: dataDictionary.getSeasonCarouselArray(1)},
      {episode: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
      {episode: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
      {episode: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
    ]
  });
});

app.get('/video/:videoId', (req, res, next) => {
  const videoData = dataDictionary.getVideoData(parseInt(req.params.videoId));
  res.render('video', {
    title: `Scry | ${videoData.title}`,
    videoFile: videoData.video,
    videoPreviewImg: videoData.imageThumb,
  });
});

app.post('/video/playlist', (req, res) => res.send({playlist: getFullSeriesLoopPlaylist(req.url)}));

/*
 TO MAKE:

 about
 faq
 terms & conditions
 contact us
 disclaimer
 help
 privacy policy
 shows/videos
 shop
 home
 web policy
 browser support
 site map
 accessibility
 (email us)
 customer service
 what's new (edited)

 */

module.exports = app;