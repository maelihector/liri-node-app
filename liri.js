// Require packages and keys file, and bring into the scope of liri.js
var dotenv = require('dotenv').config();
var keys = require('./keys');
var request = require('request-promise');
var Twitter = require('twitter');
var fs = require('fs-extra');

// Take in the command line argument indexOf[2] and store it in 'action' var
var action = process.argv[2];
// Store all of the arguments in an array
var argument = process.argv;

// Append output to log.txt
function append(output) {
  fs.appendFile("log.txt", `${output}
`, (error) => { /*console.log(error);*/ })
}

// Create an empty variable for holding the movie name
var movieName = "";

// Function for action === 'movie-this' 
function getMovie() {
  // Loop through the title words starting from index 3 and add a '+' inbetween words if title consists of more than two words
  for (var i = 3; i < argument.length; i++) {
    if (i > 3 && i < argument.length) {
      movieName = movieName + "+" + argument[i];
    } else {
      movieName += argument[i];
    }
  }
  // If there is no argument after 'movie-this', default to "Mr+Nobody".
  if (!movieName) {
    movieName = "Mr+Nobody";
  }
  // Run the call/request to the OMDB API with movieName parameter
  request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy")
    .then(data => {
      // Parse return data
      let movie = JSON.parse(data);
      // Grab Rotten Tomatoes Rating and store it in 'tomatoesRating'
      let tomatoesRating = movie.Ratings[1].Value;
      // Grab output and store in log to avoid extra code.
      let log = `
      ${movie.Title} was released in ${movie.Year}, was produced in ${movie.Country}, and was made in the ${movie.Language} language(s).
      Its IMDB rating is ${movie.imdbRating}/10, while its Rotten Tomatoes rating is ${tomatoesRating}.
      The main actors in ${movie.Title} are ${movie.Actors}.
      The plot of ${movie.Title} is: ${movie.Plot}
      `
      // Console log and call append() 
      console.log(log);
      append(log);
    })
}

// Function for action === 'my-tweets'
function getTweets() {
  // Grab twitter keys and store them in a var to use for the Twitter API call
  var client = new Twitter(keys.twitter);
  // Call Twitter API and 'GET' statuses of user_timeline = 'knlsworthington' up to 'count=20'. I Included paramaters in the call rather than saving them in a var...
  client.get('statuses/user_timeline.json?screen_name=knlsworthington&count=20', function (error, data) {
    if (error) throw error;
    // Loop through all of the data 
    for (var i = 0; i < data.length; i++) {
      // Console log only "text" and "created_at" and call append() 
      let log = `
      On ${data[i].created_at}, Kenilsworthington tweeted: 
      ${data[i].text}`
      // Call append() to append output data to log.txt
      console.log(log);
      append(log);
    }
  });
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
      // Grab length of the random item
      let index = random.length;
      // Slice the random item at 'my-tweet' indexes 
      let myTweets = random.slice(0, 9);
      // and check if random item is != 'my-tweet'
      if (myTweets != "my-tweets") {
        // Grab the whole argument starting at indexOf[12] and store it in randomMovie
        let randomMovie = random.slice(11, index);
        // Loop through the title words starting from index 3 and add a '+' inbetween words if title consists of more than two words
        for (var i = 3; i < argument.length; i++) {
          if (i > 3 && i < argument.length) {
            randomMovie = randomMovie + "+" + argument[i];
          } else {
            randomMovie += argument[i];
          }
        }
        // Run the call/request to the OMDB API along with randomMovie
        request("http://www.omdbapi.com/?t=" + randomMovie + "&y=&plot=short&apikey=trilogy")
          .then(data => {
            let movie = JSON.parse(data);
            // Grab Rotten Tomatoes Rating in 'tomatoesRating'
            let tomatoesRating = movie.Ratings[1].Value;
            // Grab output and store in log to avoid extra code.
            let log = `
          I hoped you like the movie ${movie.Title}!
          
          ${movie.Title} was released in ${movie.Year}, was produced in ${movie.Country}, and was made in the ${movie.Language} language(s).
          Its IMDB rating is ${movie.imdbRating}/10, while its Rotten Tomatoes rating is ${tomatoesRating}.
          The main actors in ${movie.Title} are ${movie.Actors}.
          The plot of ${movie.Title} is: ${movie.Plot}
          `
            // Console log and call append() 
            console.log(log);
            append(log);
          })
      } else {
        // If random item is === 'my-tweet'call getTweets()
        console.log(`
        
        You get my Tweets!
        `);
        getTweets()
      }
    })
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
}