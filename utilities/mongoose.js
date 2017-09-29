const mongod = require('mongod');
const mongoose = require('mongoose');
const path = require('path');

const port = 27017;
const url = `mongodb://localhost:${port}/scry`;

const mongoDB = new mongod({
  port: port,
  dbpath: path.join(__dirname, '..', 'mongodb', 'data')
});

const videoSchema = new mongoose.Schema({
  title: String,
  url: String,
  aliasUrl: String,
  number: Number,
  season: Number,
  episode: Number,
  description: String,
  video: String,
  trailer: String,
  imageThumb: String
});
const Video = mongoose.model("Video", videoSchema);

const schemas = {
  Video : Video
};

const connect = () => {
  return mongoDB.open()
    .then(() => {
      mongoose.connect(url, {
        useMongoClient: true,
        /* other options */
      });
    })
    .catch(err => console.log(err));
};

module.exports = {
  connect,
  schemas
};