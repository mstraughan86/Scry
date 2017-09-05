let dataDictionary = require('../utilities/dataDictionary.js');

const getAlias = (url) => {
  // Currently, the alias list is only retrieving video aliases.
  let urlMap = dataDictionary.getAliasUrlsList();
  let originalUrls = urlMap.map(o => Object.keys(o)[0]);
  let aliasUrls = urlMap.map(o => o[Object.keys(o)[0]]);

  if (aliasUrls.includes(url)) return originalUrls[aliasUrls.indexOf(url)];
  return null;
};

module.exports = function (req, res, next) {
  const alias = getAlias(req.url);
  if (alias) req.url = alias;
  next();
};