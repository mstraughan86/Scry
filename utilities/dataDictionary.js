const videos = {
  'bunny': 0,
  'Butterfly Video': 1
  //{'episode-title-here': 'episode numeral here'}
};

//does this video number exist
//get video name by number

const format = (title) => {
  // Replace spaces with dashes
  // Replace symbols with dashes
  // Change title to all lower case
  return title.replace(/\W+/g, '-').toLowerCase();
};

module.exports = {
  videos,
  format
};