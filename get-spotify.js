require('dotenv').config();
const request = require('request-promise');
var fs = require('fs-extra');


// Append output to log.txt
function append(output) {
  fs.appendFile("log.txt", `${output}
`, (error) => {
    /*console.log(error);*/
  });
}

// Fetch Spotify credentials
const spotifyId = process.env.SPOTIFY_ID;
const spotifySecret = process.env.SPOTIFY_SECRET;

// Create an empty variable for holding the artists' name
let artistName = "";

// Function for action === 'get-spotify`
let getSpotify = function (randomArtist) {

  // Create POST call url for getting a Spotify authorization token
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer.from(spotifyId + ':' + spotifySecret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };

  // Call Spotify API to get temporary token
  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      // Fetch access token
      let token = body.access_token;
      // If getSpotify() is called with `randomArtist` arg, it means that user chose 'get-random'
      if (randomArtist) {
        artistName = randomArtist;
      }
      // User did not enter artist after choosing 'get-spotify'
      if (!artistName) {
        artistName = "Michael+Jackson";
      }

      // Create GET call url for getting artist
      let options = {
        url: 'https://api.spotify.com/v1/search?q=' + artistName + '&type=artist&limit=1',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };

      // Call Spotify API to get artist
      request.get(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          // Fetch artist id
          let artistId = body.artists.items[0].id;
          artistName = body.artists.items[0].name;
          // Create GET call url for getting the artists' top albums
          let albumOptions = {
            url: "https://api.spotify.com/v1/artists/" + artistId + "/albums?coutry=US",
            headers: {
              'Authorization': 'Bearer ' + token
            },
            json: true
          };

          // Call Spotify API to get albums
          request.get(albumOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {
              // Fetch album objects
              let items = body.items;
              // Array to hold album release dates
              let releaseDatesArray = [];
              // Array to hold unique album objects
              let uniqueAlbums = [];
              // Loop through all albums to get name and release date
              for (let i = 0; i < items.length; i++) {
                // Avoid duplicates
                if (releaseDatesArray.indexOf(items[i].release_date) != -1) {
                  // console.log("Repeat: " + items[i].release_date);
                } else {
                  releaseDatesArray.push(items[i].release_date);
                  uniqueAlbums.push({
                    name: items[i].name,
                    release_date: items[i].release_date
                  });
                }
              }
              let log = `Top albums for ${artistName} are:

                `;
              for (let j = 0; j < uniqueAlbums.length; j++) {
                log = log + `${uniqueAlbums[j].name}, released ${uniqueAlbums[j].release_date}
                `;
              }
              // Console log and call append() 
              console.log(log);
              append(log);
            }
          });
        }
      });
    }
  });
};

module.exports = getSpotify;