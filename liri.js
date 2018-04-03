// require dotenv package and bring into the scope of the file
var dotenv = require("dotenv").config();

// Take in the command line arguments
var nodeArgs = process.argv;

// function to capture appropriate keys for Spotify
function Spotify(id, secret){
  this.id = id;
  this.secret = secret;
}

// class Spotify{
//   constructor(id, secret){
//     this.id = id;
//     this.secret = secret;
//   }
// }

//function to capture appropriate keys for Twitter
function Twitter(consumer_key, consumer_secret, access_token_key, access_token_secret){
  this.consumer_key = consumer_key;
  this.consumer_secret = consumer_secret;
  this.access_token_key = access_token_key;
  this.access_token_secret = access_token_secret;
}
// class Twitter{
//   constructor(consumer_key, consumer_secret, access_token_key, access_token_secret){
//     this.consumer_key = consumer_key;
//     this.consumer_secret = consumer_secret;
//     this.access_token_key = access_token_key;
//     this.access_token_secret = access_token_secret;
//   }
// }

// Require keys.js and bring into the scope of file
var keys = require("./keys");

// create var to hold keys
var spotify = keys.spotify;
var twitter = keys.twitter;

console.log(spotify); // console logs appropriate keys
console.log(twitter); // console logs appropriate keys

