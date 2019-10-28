// Require packages into the scope of liri.js
const fs = require('fs-extra');
const getMovie = require('./get-movie');
const getTweets = require('./get-tweets');
const getSpotify = require('./get-spotify');

// Take in the command line argument index[2]
let action = process.argv[2];

// Loop through the argument words starting from index[3] and add a '+' inbetween words if argument consists of more than two words
let argument = process.argv.slice(3).join('+');

// Funtion for action === 'liri-picks'
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
      let myTweets = random.slice(0, 10);
      let randomArtist = random.slice(0, 14);
      let randomMovie = random.slice(0, 9);

      // Check if random item is != 'my-tweet'
      if (myTweets === "get-tweets") {
        // Fetch twitter handle
        myTweets = random.slice(11, index);
        console.log(`
        
        You get @${myTweets}'s' tweets!
        `);
        getTweets(myTweets);
      }

      if (randomMovie === "get-movie") {
        // Fetch movie title and remove '+'
        randomMovie = random.slice(10, index);
        randomMovie = splitString(randomMovie);
        console.log(`
        
        You get a movie! Hope you like the movie ${randomMovie}!
        `);
        getMovie(randomMovie);
      }

      if (randomArtist === "get-top-albums") {
        // Fetch artist string and remove '+'
        randomArtist = random.slice(15, index);
        randomArtist = splitString(randomArtist);
        console.log(`
        
        You get an artists' top albums! Hope you like ${randomArtist}!
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
  case "get-tweets":
    getTweets(argument);
    break;
  case "get-movie":
    getMovie(argument);
    break;
  case "liri-picks":
    getRandom();
    break;
  case "get-top-albums":
    getSpotify(argument);
    break;
  default:
    console.log("Give me an action of 'get-tweets', 'get-movie', 'get-top-albums', or 'liri-picks' at process.argv[2]!");
}