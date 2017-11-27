var player = videojs(document.querySelector('.video-js'), {
  controls: true,
  autoplay: true,
  preload: 'auto'
});

const updateUrlToMatchVideo = () => {
  var currentVideo = player.playlist.currentItem();
  // get current video
  // get url for video
  // change current url
};

// This fetch is unnecessary because instead of having a fetching js
// we can dynamically create a <script> tag with the correct information
// already served on initial load.
// But, its a good example of using the app.post. I don't have very many
// of that. So.... lets keep it.

fetch("/video/playlist",
  {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({
      show: document.title.split(" | ")[1].split(" - ")[0],
      title: document.title.split(" | ")[1].split(" - ")[1]
    })
  })
  .then(res => {
    if (res.ok) {
      res.json()
      .then(json => {
          player.playlist(json.playlist);
          player.playlist.repeat(true);
          player.on('playlistchange', updateUrlToMatchVideo);
      });
    }
  })
  .catch(res => console.log(res));