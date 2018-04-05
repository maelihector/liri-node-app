// Take in the command line arguments
var nodeArgs = process.argv;

// require packages and bring into the scope of the file
var dotenv = require('dotenv').config();
var request = require('request-promise');
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

client.get('statuses/user_timeline.json?screen_name=knlsworthington&count=1', function(error, data) {
  if(error) throw error;
  console.log(data);  // The favorites. 

});
// function to capture appropriate keys for Spotify
// function Spotify(id, secret){
//   this.id = id;
//   this.secret = secret;
// }

// class Spotify{
//   constructor(id, secret){
//     this.id = id;ççç
//     this.secret = secret;
//   }
// }

//function to capture appropriate keys for Twitter
// function Twitter(consumer_key, consumer_secret, access_token_key, access_token_secret){
//   this.consumer_key = consumer_key;
//   this.consumer_secret = consumer_secret;
//   this.access_token_key = access_token_key;
//   this.access_token_secret = access_token_secret;
// }
  // class Twitter{
    //   constructor(consumer_key, consumer_secret, access_token_key, access_token_secret){
      //     this.consumer_key = consumer_key;
      //     this.consumer_secret = consumer_secret;
      //     this.access_token_key = access_token_key;
      //     this.access_token_secret = access_token_secret;
      //   }
      // }
      
      // // Require keys.js and bring into the scope of file
      // var keys = require("./keys");
      
      // // create var to hold keys
      // //var spotify = keys.spotify;
      // var twitter = keys.twitter;
      
      // //console.log(spotify); // console logs appropriate keys
      // console.log(twitter); // console logs appropriate keys
      
      // request('https://api.twitter.com/1.1/account/verify_credentials.json', twitter, function(error, data, response) {
      //   if (error) {
      //     //something was wrong with either accessToken or accessTokenSecret
      //     //start over with Step 1
      //   } else {
      //     //accessToken and accessTokenSecret can now be used to make api-calls (not yet implemented)
      //     //data contains the user-data described in the official Twitter-API-docs
      //     //you could e.g. display his screen_name
      //     console.log(data["screen_name"]);
      //   }
      // });