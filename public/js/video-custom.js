var player = videojs(document.querySelector('.video-js'), {
  controls: true,
  autoplay: true,
  preload: 'auto'
});

fetch("/video/playlist",
  {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({path: window.location.pathname})
  })
  .then(res => {
    if (res.ok) {
      res.json()
      .then(json => player.playlist(json.playlist))
      .then(() => player.playlist.autoadvance(1));
    }
  })
  .catch(res => console.log(res));