var request = require('request-promise');
var fs = require('fs-extra');


// Append output to log.txt
function append(output) {
  fs.appendFile("log.txt", `${output}
`, (error) => {
    /*console.log(error);*/ })
}

// Create an empty variable for holding the movie name
var movieName = "";

// Function for action === 'movie-this' 
var getMovie = function (randomMovie) {
  // Loop through the title words starting from index 3 and add a '+' inbetween words if title consists of more than two words
  movieName = process.argv.slice(3).join("+");
  // If getMovie() was called by getRandom(movieName), then set the random movie to movieName
  if (randomMovie) {
    movieName = randomMovie;
  }
  // If there is no argument after 'movie-this', default to "Mr+Nobody".
  if (!movieName) {
    movieName = "Mr+Nobody";
  }
  // Run the call/request to the OMDB API with movieName parameter
  request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=ef466355")
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
    }).catch(err => console.log(err))
}

module.exports = getMovie;