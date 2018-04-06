// Take in the command line arguments
var nodeArg = process.argv[2];

// Require packages and keys file, bring into the scope of liri.js
var dotenv = require('dotenv').config();
var request = require('request-promise');
var Twitter = require('twitter');
var fs = require('fs');
var keys = require('./keys');

// Pass Twitter keys with the Twitter API call
var client = new Twitter(keys.twitter);
// Get statuses from 'knlsworthington' user_timeline, with 'count=20' included in the call
client.get('statuses/user_timeline.json?screen_name=knlsworthington&count=20', function (error, data) {
  if (error) throw error;
  // Loop through the data and console log only "text" and "created_at" data.
  for (var i = 0; i < data.length; i++) {
    console.log(`Tweet: ${data[i].text}`);
    console.log(`Created at: ${data[i].created_at}`);
  }
});
