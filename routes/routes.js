let app = require('express')();

app.get('/', (req, res) => {
  res.render('home', {
    title: 'Scry | Show me what you got.'
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