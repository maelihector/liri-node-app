var Twitter = require('twitter');
var keys = require('./keys');
var fs = require('fs-extra');


// Append output to log.txt
function append(output) {
  fs.appendFile("log.txt", `${output}
`, (error) => {
    /*console.log(error);*/
  })
}

// Function for action === 'my-tweets'
var getTweets = function () {
  // Grab twitter keys and store them in a var to use for the Twitter API call
  var client = new Twitter(keys.twitter);
  // Create variable for the public twitter account searched
  var publicTwitterScreenName = process.argv[3];
  // If none entered, default to "knlsworthington"
  if (!publicTwitterScreenName) {
    publicTwitterScreenName = "knlsworthington";
  }
  // Call Twitter API and 'GET' statuses of user_timeline = 'knlsworthington' up to 'count=20'. I Included paramaters in the call rather than saving them in a var...
  client.get('statuses/user_timeline.json?screen_name=' + publicTwitterScreenName + '&count=20', function (error, data) {
    if (error) throw error;
    // Loop through all of the data 
    for (var i = 0; i < data.length; i++) {
      // Console log only "text" and "created_at" and call append() 
      let log = `
      On ${data[i].created_at}, ${publicTwitterScreenName} tweeted: 
      ${data[i].text}`
      // Call append() to append output data to log.txt
      console.log(log);
      append(log);
    }
  });
}


module.exports = getTweets;