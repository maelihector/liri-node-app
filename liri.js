// Require packages and keys file, and bring into the scope of liri.js
var dotenv = require('dotenv').config();
var fs = require('fs-extra');
var getMovie = require('./get-movie');
var getTweets = require('./get-tweets');

// Take in the command line argument indexOf[2] and store it in 'action' var
var action = process.argv[2];
// Store all of the arguments in an array
var argument = process.argv;

// Append output to log.txt
function append(output) {
  fs.appendFile("log.txt", `${output}
`, (error) => {
    /*console.log(error);*/
  })
}

// Funtion for action === 'do-what-it-says'
function getRandom() {
  // Grab the actions and arguments string in random.txt
  fs.readFile('random.txt', "utf8")
    .then(data => {
      // split the string at each "," and store each snippet in item
      let item = data.split(",")
      // Grab a random item 
      let random = item[Math.floor(Math.random() * item.length)];
      console.log(random);
      // Grab length of the random item
      let index = random.length;
      // Slice the random item at 'my-tweet' indexes 
      let myTweets = random.slice(0, 9);
      let randomMovie = random.slice(11, index);
      // and check if random item is != 'my-tweet'
      if (myTweets != "my-tweets") {
        console.log(`
        
        You get a movie! Hope you like ${randomMovie}!
        `);
        getMovie(randomMovie);
      } else {
        // If random item is === 'my-tweet'call getTweets()
        console.log(`
        
        You get my Tweets!
        `);
        getTweets()
      }
    }).catch(err => console.log(err))
}

switch (action) {
  case "my-tweets":
    getTweets();
    break;
  case "movie-this":
    getMovie();
    break;
  case "do-what-it-says":
    getRandom();
    break;
  default:
    console.log("Give me an action at process.argv[2]!");
}