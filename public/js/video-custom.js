var player = videojs(document.querySelector('.video-js'), {
  controls: true,
  autoplay: true,
  preload: 'auto'
});

player.playlist([{
  sources: [{
    src: '/files/videos/1.mp4',
    type: 'video/mp4'
  }],
  poster: '/files/images/001.jpg'
}, {
  sources: [{
    src: '/files/videos/2.mp4',
    type: 'video/mp4'
  }],
  poster: '/files/images/002.jpg'
}, {
  sources: [{
    src: '/files/videos/3.mp4',
    type: 'video/mp4'
  }],
  poster: '/files/images/003.jpg'
}, {
  sources: [{
    src: '/files/videos/4.mp4',
    type: 'video/mp4'
  }],
  poster: '/files/images/004.jpg'
}, {
  sources: [{
    src: '/files/videos/5.mp4',
    type: 'video/mp4'
  }],
  poster: '/files/images/005.jpg'
}, {
  sources: [{
    src: '/files/videos/6.mp4',
    type: 'video/mp4'
  }],
  poster: '/files/images/006.jpg'
}, {
  sources: [{
    src: '/files/videos/7.mp4',
    type: 'video/mp4'
  }],
  poster: '/files/images/007.jpg'
}, {
  sources: [{
    src: '/files/videos/8.mp4',
    type: 'video/mp4'
  }],
  poster: '/files/images/008.jpg'
}, {
  sources: [{
    src: '/files/videos/9.mp4',
    type: 'video/mp4'
  }],
  poster: '/files/images/009.jpg'
}, {
  sources: [{
    src: '/files/videos/10.mp4',
    type: 'video/mp4'
  }],
  poster: '/files/images/010.jpg'
}]);

// Play through the playlist automatically.
player.playlist.autoadvance(1);


