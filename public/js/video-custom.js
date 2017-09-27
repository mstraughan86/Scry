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
    method: "POST"
  })
  .then(res => {
    console.log('HERE WE GO!!!!!!!!!!!!!');
    console.log(res);
    player.playlist(res);
    player.playlist.autoadvance(1); // supposed to be 1, hehe
  })
  .catch(res => console.log(res));