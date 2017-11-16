const path = require('path');
const fs = require('fs');

const reducePromiseArray = (promises) => {
  return promises
    .reduce((chain, promise) => chain.then(promise), Promise.resolve())
    .then(result => {
      console.log('Reduce Promise Array complete.');
      return result;
    });
};

module.exports = {
  reducePromiseArray
};