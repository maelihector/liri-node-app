#  Language Interpretation and Recognition Interface (LIRI)

## What is this?

LIRI is a [node.js](https://nodejs.org/en/) command-line application that takes in an action request and an optional argument through `process.argv`, and returns either [Twitter](https://twitter.com/) data from [Twitter API](https://developer.twitter.com/) or movie data from [OMDb API](http://www.omdbapi.com/).

## What does LIRI do?

1. Retrieves the 20 most recent tweets referenced by the user from the Twitter API

2. Retrieves arbitrary movie data for the movie referenced by the user  by calling the OMBD API

4. Does one of the above by calling out to a text file that holds either of the two actions mentioned above, plus a random movie as an argument if the action is to retrieve movie information

Aside from that LIRI appends all output to `log.txt` for easier viewing of data.

##  How does it work?

###  Get Tweets

To retrieves a public Twitter account's latest 20 tweets, in the terminal at the root enter:

`node liri.js my-tweets <screen_name>`

### Get Movie Info

To retrieve movie information for a specific movie, in the terminal at the root enter:

`node liri.js movie-this <movie title>`

**Don't worry about capitalization or spaces in movie titles, just make sure you spell the title right.**

###  Get Random Info

To retrieve data at random, in the terminal at the root enter:

`node liri.js do-what-it-says`

## Technologies Used

- [Node.js](https://nodejs.org/en/)

  - [request-promise](https://www.npmjs.com/package/request-promise),
  - [fs-extra](https://www.npmjs.com/package/fs-extra) 	  

- [Twitter API](https://developer.twitter.com/) 

- [OMDb API](http://www.omdbapi.com/).


---
> Written with [StackEdit](https://stackedit.io/).
