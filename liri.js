// Require packages into the scope of liri.js
const fs = require('fs-extra');
const getMovie = require('./get-movie');
const getTweets = require('./get-tweets');
const getSpotify = require('./get-spotify');

// Take in the command line argument index[2]
let action = process.argv[2];

// Loop through the argument words starting from index[3] and add a '+' inbetween words if argument consists of more than two words
let argument = process.argv.slice(3).join('+');

// Funtion for action === 'do-what-it-says'
function getRandom() {
  // Grab the actions and arguments string in random.txt
  fs.readFile('random.txt', "utf8")
    .then(data => {
      // Split the string at each "," and store each snippet in item
      let item = data.split(",");
      // Grab a random item 
      let random = item[Math.floor(Math.random() * item.length)];
      // Grab length of the random item
      let index = random.length;
      // Slice the random item to isolate action
      let myTweets = random.slice(0, 9);
      let randomArtist = random.slice(0, 12);
      let randomMovie = random.slice(0, 10);

      // Check if random item is != 'my-tweet'
      if (myTweets === "my-tweets") {
        console.log(`
        
        You get my Tweets!
        `);
        getTweets();
      }

      if (randomMovie === "movie-this") {
        // Fetch movie title and remove '+'
        randomMovie = random.slice(11, index);
        randomMovie = splitString(randomMovie);
        console.log(`
        
        You get a movie! Hope you like ${randomMovie}!
        `);
        getMovie(randomMovie);
      }

      if (randomArtist === "spotify-this-artist") {
        // Fetch artist string and remove '+'
        randomArtist = random.slice(13, index);
        randomArtist = splitString(randomArtist);
        console.log(`
        
        You get an artists' albums! Hope you like ${randomArtist}!
        `);
        getSpotify(randomArtist);
      }

    }).catch(err => console.log(err));
}

// Helper function to remove '+' from action string
function splitString(string) {
  string = string.split("+").join(" ");
  return string;
}

switch (action) {
  case "my-tweets":
    getTweets(argument);
    break;
  case "movie-this":
    getMovie(argument);
    break;
  case "do-what-it-says":
    getRandom();
    break;
  case "spotify-this-artist":
    getSpotify(argument);
    break;
  default:
    console.log("Give me an action of 'my-tweets', 'movie-this', 'do-what-it-says', or 'spotify-this-artist' at process.argv[2]!");
}