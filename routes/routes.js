let app = require('express')();

app.get('/', (req, res) => {
  res.render('home', {
    title: 'Scry | Show me what you got.',
    season: [
      {episode: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
      {episode: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
      {episode: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
    ]
  });
});

app.get('/video/:videoId', (req, res, next) => {
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