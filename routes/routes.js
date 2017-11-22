const path = require('path');
const fs = require('fs');
const mongoose = require(path.join(__dirname, '..', 'utilities', 'mongoose.js'));
const omni = require(path.join(__dirname, '..', 'utilities', 'omni.js'));

let app = require('express')();

let dataDictionary = require('../utilities/dataDictionary.js');
let openGraph = require('../utilities/openGraph.js').generate;

const projectName = process.env.WHITE_LABEL;

app.get('/', (req, res) => {
  res.render('home', {
    title: `${projectName} - Show me what you got.`,
    description: 'My little scrying object, what would you show me?, I said, with rising anticipation.',
    canonical: 'https://www.scry.io',
    openGraph: openGraph('video', 'pilot'),
    season: [
      {episode: mongoose.getDataBySeason('1')}, // these didn't return in order, they mixed up.
      {episode: dataDictionary.getSeasonCarouselArray(1)},
      {episode: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
      {episode: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
    ]
  });
});

app.get('/video/:videoId', (req, res, next) => {
  mongoose.schemas.VideoObject.find({'imdb_id': req.params.videoId})
    .then(result => {
      res.render('video', {
        title: `${projectName} | ${result[0].show} - ${result[0].title}`,
        videoFile: result[0].video.full,
        videoPreviewImg: result[0].screenshots[0],
      });
    })
    .catch(err=>{console.log(`ERR: app.get /video/${req.params.videoId}`, err);})
});

// I am thinking of redoing my mongoose calls with this:
// https://stackoverflow.com/a/44768732/7705704

app.post('/video/playlist', (req, res) => {

  mongoose.schemas.VideoObject
    .find({'show': req.body.show})
    .collation({locale: 'en', strength: 2})
    .sort({season: 1})
    .sort({episode: 1})
    .then(result => {
      mongoose.schemas.VideoObject
        .find({'title': req.body.title})
        .then(secondResult => {
          let videos = result;
          const target = secondResult[0];
          const targetIndex = videos.findIndex(v => (v.season == target.season && v.episode == target.episode));

          videos = videos.splice(targetIndex).concat(videos.splice(0, targetIndex));
          videos = videos.map(data => {
            return {
              sources: [{
                src: `/media/${data.show}/video/full/${data.show}_${data.season}x${data.episode}.mp4`,
                type: 'video/mp4'
              }],
              poster: `/media/${data.show}/screenshots/${data.show}_${data.season}x${data.episode}x1.png`
            }
          });

          //console.log(videos);
          //console.log(dataDictionary.getFullSeriesLoopPlaylist(req.body.path));

          res.send({playlist: videos})
        });
    })
    .catch(err=>{console.log('ERR: app.post /video/playlist', err);})
});

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