const Twitter = require('twitter');
const fs = require('fs-extra');
require('dotenv').config();


// Append output to log.txt
function append(output) {
  fs.appendFile("log.txt", `${output}
`, (error) => {
    /*console.log(error);*/
  });
}

// Function for getting user timeline tweets
const getTweets = function (publicTwitterScreenName) {
  
  // Grab twitter credentials to use for the Twitter API call
  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    bearer_token: process.env.TWITTER_BEARER_TOKEN
  });

  // If no twitter account is supplied, default to "knlsworthington"
  if (!publicTwitterScreenName) {
    publicTwitterScreenName = "knlsworthington";
  }

  // Call Twitter API and 'GET' status of user_timeline = 'knlsworthington' up to 'count=20'
  // Paramaters are included in the call rather than saved in a variable
  client.get('statuses/user_timeline.json?screen_name=' + publicTwitterScreenName + '&count=20', function (error, data) {
    if (error) {
      console.log(`
      Oops, something went wrong, here's @knlsworthington's tweets instead!
      `);
      // If twitter can't find the handle or if it's a private account, default to 'knlsworthington'
      getTweets('knlsworthington');
    }
    // Loop through all of the data 
    for (let i = 0; i < data.length; i++) {
      let log = `
        On ${data[i].created_at}, ${publicTwitterScreenName} tweeted: 
        ${data[i].text}`;
      // Console log and call append()
      console.log(log);
      append(log);
    }

  });
};

module.exports = getTweets;