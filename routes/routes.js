let app = require('express')();
let openGraph = require('../utilities/openGraph.js').generate;


app.get('/', (req, res) => {
  res.render('home', {
    title: 'Scry - Show me what you got.',
    description: 'My little scrying object, what would you show me?, I said, with rising anticipation.',
    canonical: 'https://www.scry.io',
    openGraph: openGraph('video', 'bunny'),

    season: [
      {episode: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
      {episode: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
      {episode: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
    ]
  });
});

app.get('/video/:videoId', (req, res, next) => {

  // check if exists.
  // can be either by text
  // or by number, which redirects to text anyway.
  // how do i redirect?
  // or really... how do i rename?
  //  ... ?

  // I am trying to figure out what to do with the video names and the potential url
  // along with the video file numbers and the potential video alias
  //

  // Also looks like i can create the alias middleware pretty easily with some custom code:
  // https://stackoverflow.com/questions/19079497/in-app-redirect-in-expressjs-using-middleware
  // The placement of this middleware is going to be critical... but also I want to make sure
  // it wont slow things down.
  //
  // If i get lazy, here it is:
  // https://www.npmjs.com/package/router-alias
  //
  //
  //
  //

  res.render('video', {
    title: 'Scry | Video Title Here'
  });
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