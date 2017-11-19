const path = require('path');
require('dotenv').config({path: path.join(__dirname, '..', '.env')});
const omni = require(path.join(__dirname, '.', 'omni.js'));

const mongod = require('mongod');
const mongoose = require('mongoose');

const port = process.env.DB_PORT;
const url = `mongodb://localhost:${port}/`;
const dbpath = process.env.DB_PATH;
const dbname = process.env.WHITE_LABEL;

mongoose.Promise = global.Promise; // use native promises.

const mongoDB = new mongod({
  port: port,
  dbpath: path.join(__dirname, '..', dbpath)
});
const videoObjectSchema = new mongoose.Schema({
  url: String,          //  /video/number
  aliasUrl: String,     //  /episode/example-title

  aired: String, //"2016-07-17",
  description: String, //'Descriptions about things and stuff.',
  duration: String, //"30min",
  episode: String, //"1",
  genres: String, //"Comedy",
  season: String, //"1",
  show: String, //"Vice Principals",
  title: String, //"The Principal",
  imdb_id: String, //"4404770",

  audio: String, //"/public/files/The Principal/audio/The Principal_1x1.mp3",
  previews: String, //"/public/files/The Principal/previews/The Principal_1x1.mp4",
  video: {
    full: String, //"/public/files/The Principal/video/full/The Principal_1x1.mp4",
    large: String, //"/public/files/The Principal/video/large/The Principal_1x1.mp4",
    medium: String, //"/public/files/The Principal/video/medium/The Principal_1x1.mp4",
    small: String, //"/public/files/The Principal/video/small/The Principal_1x1.mp4"
  },
  screenshots: [String]
});
const creativeWorkSchema = new mongoose.Schema({
  episode: String, //"1",
  title: String, //"The Principal",
  imdb_id: String //"4404770",
});

const VideoObject = mongoose.model("VideoObject", videoObjectSchema);
const CreativeWork = mongoose.model("creativeWork", creativeWorkSchema);

const schemas = {
  VideoObject: VideoObject,
  CreativeWork: CreativeWork
};

const initialize = () => {
  return mongoDB.open()
    .then(() => {
      console.log('MongoDB: Opened.');
    })
};
const terminate = () => {
  return omni.delay(9000) // used to ensures if back to back disconnect and terminate, things save.
    .then(new Promise((resolve, reject) => mongoDB.close(resolve)))
    .then(() => {console.log('MongoDB: Closed.');})
};
const connect = () => {
  return mongoose.connect(url + dbname, {
    useMongoClient: true,
    // I don't know what to do about the connection timeout issue:
    // https://stackoverflow.com/questions/40585705/connection-timeout-for-mongodb-using-mongoose
    // http://mongoosejs.com/docs/connections.html#options
    socketTimeoutMS: 0,
    keepAlive: true,
    reconnectTries: 30
    /* other options */
  }, () => {
    console.log(`Mongoose: Connected to ${url + dbname}`);
  });
};
const disconnect = () => {
  return mongoose.disconnect()
    .then((() => console.log('Mongoose: Disconnected.')));
};

const save = (Model, dataArray) => {
  return new Promise((resolve, reject) => {
    Model.create(dataArray, function (err, results) {
      if (err) return reject(err);
      return resolve(dataArray);
    })
  });
};
const remove = (Model, key, value) => {
  return new Promise((resolve) => {
    Model.find({[key]: value})
      .then(results => {
        return results
          .reduce((chain, result) => chain.then(() => {result.remove()}), Promise.resolve())
          .then(result => {
            console.log('Mongoose: Deleted all of records with:', key, value);
            return resolve(result);
          });
      });
  });
};

const createModel = (name, object) => mongoose.model(name, new mongoose.Schema(object));

const getDataBySeason = number => {
  return new Promise((resolve, reject) => {
    schemas.VideoObject.find({'season': number})
      .collation({locale: 'en', strength: 2})
      .sort({season: 1})
      .sort({episode: 1})
      .then(result => {
        const carouselData  = result.map(o => {
          return {
            title: o.title,
            url: `\/${omni.formatToUrl(o.show)}\/${omni.formatToUrl(o.title)}`,
            imageThumb: o.screenshots[0]
          }
        });
        resolve(carouselData);
      })
      .catch(err=>{console.log('ERR: getDataBySeason', err);})
  })
};

module.exports = {
  connect,
  disconnect,
  initialize,
  terminate,
  save,
  remove,
  createModel,
  schemas,

  getDataBySeason
};