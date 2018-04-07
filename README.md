#  LIRI

  

## What is this?

  LIRI is a Language Interpretation and Recognition Interface.

Using Node.js LIRI takes in an action request and an optional argument through `process.argv`.

## What does it do?
 

 1. LIRI can retrieve the 20 most recent tweets from the Twitter API using the specified parameter of `screen_name` 
 2. Retrieve arbitrary movie information for the movie referenced by the user  by calling the OMBD API
 3. Or call out to a text file that holds either of the two actions mentioned above, plus a random movie as an argument if the action is to retrieve movie information

Aside from that LIRI appends all output to log.txt for easier viewing of data.

##  How does it work?

###  Get Tweets

To retrieves my cat's latest 20 tweets:
`node liri.js my-tweets`

 ###  Get Movie Info

Retrieves movie information for a movie:
`node liri.js movie-this Star Wars`

 **Don't worry about capitalization, just make sure you spell the title right.**

###  Get Random Info

Gets random text inside a file and does what it says:
`node liri.js do-what-it-says`


----------


##  NPM Installs

####  [Twitter](https://www.npmjs.com/package/twitter)

####  [dotenv](https://www.npmjs.com/package/dotenv)

####  [request-promise](https://www.npmjs.com/package/request-promise)

####  [fs-extra](https://www.npmjs.com/package/fs-extra)
