let express = require('express');
let app = express();

app.get('/', (req, res) => {
  res.render('home', {
    title: 'Scry | Show me what you got.'
  });
});

app.get('/video/:videoId', (req, res, next) => {
  res.render('video', {});
});

module.exports = app;