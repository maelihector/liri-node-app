// Require packages and keys file, and bring into the scope of liri.js
var dotenv = require('dotenv').config();
var request = require('request-promise');
var Twitter = require('twitter');
var fs = require('fs');
var keys = require('./keys');

// Take in the command line argument indexOf[2]
var command = process.argv[2];

// // Pass Twitter keys with the Twitter API call
// var client = new Twitter(keys.twitter);
// // Get statuses from 'knlsworthington' user_timeline, with 'count=20' included in the call
// client.get('statuses/user_timeline.json?screen_name=knlsworthington&count=20', function (error, data) {
//   //if (error) throw error;
//   // Loop through the data and console log only "text" and "created_at" data.
//   for (var i = 0; i < data.length; i++) {
//     if (command === "my-tweets"){
//     console.log(`Tweet: ${data[i].text}`);
//     console.log(`Created at: ${data[i].created_at}`);
//     } else {
//       console.log(error);
//     }
//   }
// });

// Store all of the arguments in an array
var titleArgs = process.argv;

// Create an empty variable for holding the movie name
var movieName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 3; i < titleArgs.length; i++) {
  if (i > 3 && i < titleArgs.length) {
    movieName = movieName + "+" + titleArgs[i];
  } else {
    movieName += titleArgs[i];
  }
}

// Run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// console.log(queryUrl);

request(queryUrl, function (error, response, data) {

  // If the request is successful
  if (!error && response.statusCode === 200) {
    // Only respond if the command is 'movie-this', otherwise console log 'error'
    if (command === "movie-this") {
      let movie = JSON.parse(data);
      // Console log result
      console.log(`
      ${movie.Title} was released in ${movie.Year}, was produced in ${movie.Country}, and made in the ${movie.Language} language(s).
      Its IMDB rating is ${movie.imdbRating}, while its Rotten Tomatoes Rating is ${movie.Ratings[2][3]}.
      The main actors in ${movie.Title} are ${movie.Actors}.
      The plot of ${movie.Title} is: ${movie.Plot}
      `);
    } else {
      console.log(error);
    }
  }
});