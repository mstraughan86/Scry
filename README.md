# Scry
My little scrying object.

This is designed to be a lens for whatever I wish my eyes upon.

Introduction:
I want to create a simple, single page view for all episodes of a given television series. Entering into any one of the episodes will...

Motivation:
My ISP Cox put a 1TB per month cap on my internet usage. I've never experienced this before in my life. I was shocked to find that my household went over this cap in the first month. In order to cut down on data usage, I aimed to minimize re-streaming data as we use a lot of video streaming. Thus, this little artifact was constructed to suit that purpose.

Currently looking at serving video. Up next might be audio.

## Technology Stack
### ExpressJS
### The CSS.Bar
- Bourbon v5.0.0.beta.8
- Neat v1.9.0
- Bitters v1.7.0
- Refills v0.2.0

### Visual Toolchain
- Normalize.css

https://stackoverflow.com/questions/6887336/what-is-the-difference-between-normalize-css-and-reset-css

- Flickity.css

https://flickity.metafizzy.co/

Initializing with HTML does not display the carousel without a 'resize' event, so we initialize with JS after ```window.onload()```. ... (Note to self, this is the second method I've introduced into the codebase for inserting/launching JS after page load.)

https://flickity.metafizzy.co/#initialize-with-vanilla-javascript

- Video.js

http://videojs.com/

- Video.js Plugin: Playlist

... (Note to self, this is an example of above.)

https://github.com/brightcove/videojs-playlist
