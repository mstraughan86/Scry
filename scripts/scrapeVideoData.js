const path = require('path');
const webDriver = require(path.join(__dirname, '..', 'utilities', 'webdriver.js'));
const authorize = require(path.join(__dirname, '..', 'utilities', 'google.js')).authorize;
const google = require(path.join(__dirname, '..', 'utilities', 'google.js'));

// Put this into its own utility function.
const getInputArgs = () => {
  return process.argv.slice(2).reduce((accumulator, current) => {
    let [key, value = true] = current.split('=');
    accumulator[key] = value;
    return accumulator;
  }, {});
};

const IMDB_getAllEpisodeUrls = url => {
  return {
    url: url,
    wait: 'img.poster',
    evaluate: () => {
      return {
        collection: [...document.querySelectorAll('.list_item')].map(obj => obj.querySelector('a').href),
        next: (document.querySelector('#load_next_episodes')) ? document.querySelector('#load_next_episodes').href : false
      }
    },
    after: ([result, thiss]) => {
      if (result.next) {
        thiss.url = result.next;
        return webDriver.action(thiss)
          .then(results => Promise.resolve(result.collection.concat(results)));
      }
      else return result.collection;
    }
  };
};
const IMDB_getEpisodeData = url => {
  return {
    url: url,
    wait: '.poster img',
    evaluate: () => {
      let aired;
      if(document.querySelector('.title_wrapper a meta') === null) {aired = 'None';}
      else {aired = document.querySelector('.title_wrapper a meta').getAttribute('content');}

      let desc = document.querySelector('.summary_text').textContent.trim();
      if(desc.slice(-'See full summary »'.length).slice(0, -2) === 'See full summary') {
        desc = document.querySelector('#titleStoryLine p').textContent.trim().split('Written by')[0].trim()
      }

      return {
        show: document.querySelector('.titleParent a').textContent.trim(),
        title: document.querySelector('.title_wrapper h1').textContent.trim(),
        duration: document.querySelector('.title_wrapper time').textContent.trim(),
        genres: [...document.querySelectorAll('.title_wrapper a span')].map(i => i.textContent.trim()),
        aired: aired,
        season: document.querySelector('.bp_heading').textContent.split('|')[0].trim().split(' ')[1],
        episode: document.querySelector('.bp_heading').textContent.split('|')[1].trim().split(' ')[1],
        description: desc,
        imdb_id: window.location.href.split('/tt')[1].split('/')[0]
      };
    },
    after: ([result, thiss]) => Promise.resolve(result)
  };
};
const IMDB_getTVShowInfo = url => {
  return {
    url: url,
    wait: 'img',
    evaluate: () => {
      return {
        title: document.querySelector('.title_wrapper h1').textContent.trim(),
        episodes: [...document.querySelectorAll('.bp_sub_heading')].slice(-1)[0].textContent.trim().split(' ')[0],
        imdb_id: window.location.href.split('/tt')[1].split('/')[0]
      }
    },
    after: ([result, thiss]) => Promise.resolve(result)
  };
};

const main = () => {
  const args = getInputArgs();
  args.show = args.show || '0108734'; // or even 3766376
  const IMDB_url = `http://www.imdb.com/title/tt${args.show}/`;
  const IMDB_startUrl = `http://www.imdb.com/title/tt${args.show}/episodes?season=1`;

  return Promise.resolve()
    .then(authorize)
    .then(google.checkBook)
    .then(webDriver.initialize)
    .then(webDriver.action.bind(null, IMDB_getTVShowInfo(IMDB_url)))
    .then(tvShow => {
      [title, episodes, imdb_id] = [tvShow.title, tvShow.episodes, tvShow.imdb_id];
      console.log(`${title} - ${imdb_id}`);
      console.log('Episodes we found on IMDB: ', episodes);
      return Promise.resolve(tvShow)
        .then(google.checkSheet)
        .then(google.setActiveSheet.bind(null, google.masterSheetName))
        .then(google.getActiveSheetData)
        .then(data => {
          const tvSeriesIndex = data.values.findIndex(row => row[1] == args.show);
          const tvSeriesDataArray = data.values[tvSeriesIndex];
          const episodeCount = tvSeriesDataArray[2];
          console.log('Episodes we saved in Google:', episodeCount);
          if (episodes != episodeCount) {
            console.log('Scraping for episode data.');
            return Promise.resolve()
              .then(google.setActiveSheet.bind(null, title))
              .then(google.resetActiveSheet)
              .then(webDriver.action.bind(null, IMDB_getAllEpisodeUrls(IMDB_startUrl)))
              .then(webDriver.actionArray.bind(null, IMDB_getEpisodeData))
              .then(result => {
                return Promise.resolve(title)
                  .then(google.setActiveSheet)
                  .then(() => result.map(object => {
                    return [
                      object.aired,
                      object.description,
                      object.duration,
                      object.episode,
                      object.genres.join(', '),
                      object.season,
                      object.show,
                      object.title,
                      object.imdb_id
                    ]
                  }));
              })
              .then(google.appendRowToActiveSheet)
              .then(() => google.setActiveSheet(google.masterSheetName))
              .then(() => google.updateActiveSheet(`C${tvSeriesIndex+1}`, [[episodes]]))
          }
          else {
            console.log('No new episodes, no updates required.');
            return Promise.resolve();
          }

        })
        .catch(err => {console.log(err)});
    })
    .then(webDriver.terminate)
    .catch(error => {console.log('error:', error)});
};

main();