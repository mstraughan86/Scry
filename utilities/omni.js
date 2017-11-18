const path = require('path');
const fs = require('fs');

const delay = time => new Promise(resolve => setTimeout(resolve, time));
const walk = dir => {
  return fs.readdirSync(dir)
    .reduce((array, file) =>
        fs.statSync(path.join(dir, file)).isDirectory() ?
          array.concat(walk(path.join(dir, file))) :
          array.concat(path.join(dir, file))
      ,[]);
};
const formatToUrl = t => t.replace(/[^a-zA-Z0-9_.-]/g, '-');



module.exports = {
  delay,
  walk,
  formatToUrl
};