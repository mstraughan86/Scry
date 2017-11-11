# Scry
###### My little scrying object.
## Introduction
1. My ISP put a data cap on my household that I tore through, and quick!
2. My Video Streaming service keeps discontinuing my favorite shows!
3. Net Neutrality, this recurring boss fight is crazy hard! Go away, Gary!

I see a solution to all of these: self-hosted, LAN video streaming service. If I can create a self-contained server application that works on the local area network, I would save on a lot of data, I would have the capability to preserve my favorite shows, and I wouldn't have to worry about the likes of the outside internet, my intranet is improving by the day!

## Description
###### ...a lens for whatever I wish my eyes upon.
This is to be an all JS impementation of a video streaming server to be run and accessed on a local area network.

#### Requirements
- Single application per each television series.
- Single page view of all episodes of that series.
- Every video doubles as a playlist that streams the entire series indefinitely.
- On application build, supply series name and video source, and application will output a fully prepared database for the server to run on.
- On application load, everything just works.

## Preparation (Not necessary for the moment.)
1. Find the IMDB url of your television series. For example: http://www.imdb.com/title/tt0118375/
2. Source the video files.

## Installation
Install [MongoDB](https://www.mongodb.com/). Then:
```
git clone https://github.com/mstraughan86/Scry.git
cd Scry
npm install
```

####Raspberry Pi 3

Here is something to get going on a Raspberry Pi 3:
```
sudo su -
apt-get update
apt-get dist-upgrade
apt-get install -y mongodb-server
apt-get remove nodered -y
apt-get remove nodejs nodejs-legacy -y
curl -sL https://deb.nodesource.com/setup_8.x | sudo bash -
apt-get install nodejs -y
exit
mkdir ~/Dev
cd ~/Dev
git clone https://github.com/mstraughan86/Scry.git
cd Scry
sudo npm install
npm rebuild node-sass
git clone https://github.com/creationix/nvm.git ~/.nvm && cd ~/.nvm && git checkout v0.33.5
echo 'source ~/.nvm/nvm.sh' >> ~/.bashrc
echo 'source ~/.nvm/nvm.sh' >> ~/.profile
nvm install v6.9.5
sudo reboot
```

## Configuration (Not necessary for the moment.)
```
```

## Execution
```
npm start
```

## Usage
```
Navigate to: http://127.0.0.1:3002/
```

## Development

#### Technology Stack
- [MongoDB](https://www.mongodb.com/)
- [MongooseJS](http://mongoosejs.com/)
- [NodeJS](https://nodejs.org/)
- [ExpressJS](https://expressjs.com/)
- [DustJS](http://www.dustjs.com/)
- [Css.Bar](http://bourbon.io/)
	- [Bourbon v5.0.0.beta.8](https://github.com/thoughtbot/bourbon/releases/tag/v5.0.0.beta.8)
	- [Neat v1.9.0](https://github.com/thoughtbot/neat/releases/tag/v1.9.0)
	- [Bitters v1.7.0](https://github.com/thoughtbot/bitters/releases/tag/v1.7.0)
	- [Refills v0.2.0](https://github.com/thoughtbot/refills/releases/tag/v0.2.0)
- [Normalize.css](http://necolas.github.io/normalize.css/) [1](https://stackoverflow.com/questions/6887336/what-is-the-difference-between-normalize-css-and-reset-css)
- [Flickity](https://flickity.metafizzy.co/) [1](https://flickity.metafizzy.co/#initialize-with-vanilla-javascript)
- [Video.js](http://videojs.com/)

## Roadmap
#### Minimum Viable Product
- [ ] Intelligent Infinite Playlist
- [ ] Make: Import videos somehow
- [ ] Make: Import video data from IMDB
- [ ] Process video source into remaining required media files

#### System Infrastructure
- [ ] Continuous Integration with Github
- [ ] Raspberry Pi Deployment Instructions

#### Wishlist
- [] View counter; track viewage metrics for each user and sitewide.
- [] Shadow profile creation; track users even without signup.
- [] Serve customized pages for every user; what videos they've watched, how far they were in each video they have, etc.
- [] Audio-only service.
- [] Auto-transcription service.
- [] Import/retrieve script/subtitles.
- [] Audio-normalization.
- [] Animation frames insertion.
- [] Serve multiple video qualities.
- [] Serve outside of LAN.
- [] Social media link friendly.