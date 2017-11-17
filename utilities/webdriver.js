const Nightmare = require('nightmare');
let webDriver;

const nightmareConfiguration = {
  show: false,
  openDevTools: false
};

const promiseSeries_withCombinedResults = (array, initial, ...args) => {
  const combinedResults = [];
  return array
    .reduce((chain, promise)=>{
      return chain
        .then(result => promise(result, ...args))
        .then(result => {
          combinedResults.push(result);
          Promise.resolve(result);
        })
    }, Promise.resolve(initial))
    .then(()=>Promise.resolve(combinedResults));
};

const actionArray = (func, array) =>{
  const promises = array.map(obj => {
    return action.bind(null, func(obj))
  });
  return promiseSeries_withCombinedResults(promises)
};
/* param:
const exampleAction = {
  url: '',
  wait: '',
  evaluate: ()=>{},
  after: ([result, thiss])=>Promise.resolve(result)
};
 */
const action = act => {
  return webDriver
    .goto(act.url)
    .wait(act.wait)
    .evaluate(act.evaluate)
    .then(result=>[result, act])
    .then(act.after)
    .catch(err => {console.log(err)});
};
const terminate = () => {
  return new Promise((resolve, reject) => {
    webDriver
      .end()
      .then(function () {
        console.log('Closed WebDriver.');
        return resolve();
      })
  })
};
const initialize = () => {
  console.log('Opened WebDriver.');
  webDriver = Nightmare(nightmareConfiguration);
  return Promise.resolve();
};

const EXAMPLE_IMDB_getAllEpisodeUrls = url => {
  return {
    url: url,
    wait: 'img.poster',
    evaluate: ()=>{
      return {
        collection: [...document.querySelectorAll('.list_item')].map(obj=>obj.querySelector('a').href),
        next: (document.querySelector('#load_next_episodes')) ? document.querySelector('#load_next_episodes').href : false
      }
    },
    after: ([result, thiss])=>{
      if (result.next) {
        thiss.url = result.next;
        return webAction(thiss)
          .then(results=>Promise.resolve(result.collection.concat(results)));
      }
      else return result.collection;
    }
  };
};
const EXAMPLE_IMDB_getEpisodeData = url => {
  return {
    url: url,
    wait: '.poster img',
    evaluate: ()=>{
      return {
        show: document.querySelector('.titleParent a').textContent.trim(),
        title: document.querySelector('.title_wrapper h1').textContent.trim(),
        duration: document.querySelector('.title_wrapper time').textContent.trim(),
        genres: [...document.querySelectorAll('.title_wrapper a span')].map(i=>i.textContent.trim()),
        aired: document.querySelector('.title_wrapper a meta').getAttribute('content'),
        season: document.querySelector('.bp_heading').textContent.split('|')[0].trim().split(' ')[1],
        episode: document.querySelector('.bp_heading').textContent.split('|')[1].trim().split(' ')[1],
        description: document.querySelector('.summary_text').textContent.trim()
      };
    },
    after: ([result, thiss])=>Promise.resolve(result)
  };
};

/* Usage example:
return initialize()
  .then(action.bind(null, EXAMPLE_IMDB_getAllEpisodeUrls(IMDB_targetUrl)))
  .then(actionArray.bind(null, EXAMPLE_IMDB_getEpisodeData))
  .then(terminate)
  .catch();
*/

module.exports = {
  actionArray,
  action,
  terminate,
  initialize
};