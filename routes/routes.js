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

module.exports = app;