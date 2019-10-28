
# Language Interpretation and Recognition Interface (LIRI)


## What is this?


LIRI is a [nodejs](https://nodejs.org/en/) application program that uses a command-line interface (CLI) to interact with its users. 

LIRI recognizes commands to get tweets, get movie data, get music data, and a command that asks LIRI itself to randomly pick a command to execute. The commands return useful data from either the [Twitter API](https://developer.twitter.com/), the [OMDb API](http://www.omdbapi.com/), or the [Spotify API](https://developer.spotify.com/documentation/web-api/).



## What does LIRI do?

Based on the commands:


1. LIRI returns the 20 most recent [tweets](https://twitter.com/home?lang=en) by a public twitter account that the user specifies by calling the [Twitter API](https://developer.twitter.com/) to get this data. If a twitter handle is not supplied to LIRI, if the twitter handle does not exist, or if it belongs to a private account, LIRI returns [@knlsworthington](https://twitter.com/knlsworthington)'s tweets.


2. Calling the [Spotify API](https://developer.spotify.com/documentation/web-api/), LIRI returns the top albums of the artist that the user specifies. If an artist is not supplied to LIRI, or if the artist does not exists on the [Spotify API](https://developer.spotify.com/documentation/web-api/), LIRI returns [Michael Jackson](https://www.michaeljackson.com/)'s top albums.


3. LIRI gets detailed movie data from the movie title specified by the user by calling the [OMDb API](http://www.omdbapi.com/) to get this data. If a movie title is not supplied to LIRI, or if the movie does not exists on the [OMDb API](http://www.omdbapi.com/), LIRI returns movie data for the movie [Mr. Nobody](https://www.imdb.com/title/tt0485947/).


4. The user has the option to let LIRI pick what to get. With this particular command LIRI reads the `random.txt` file which holds a string of several commands, splits the commands into an array, and then randomly picks one to execute.



## How does it work?

#### First make sure that you have [nodejs](https://nodejs.org/en/) installed on your local machine, *and* that you have both a [Spotify for Developers](https://developer.spotify.com/dashboard/) and a  [Twitter Developers](https://developer.twitter.com/en/docs/basics/getting-started) account. 

 1. Clone this LIRI project onto your local machine.
 2. Install all of LIRI's node package dependencies. Inside your terminal, `cd` to the root of your LIRI directory and run `npm install`.
 3. Get your API Credentials. 
	- Sign in to your [Spotify for Developers](https://developer.spotify.com/dashboard/) account and follow the instructions to get both a **Client ID** and a **Secret Key**. 
	- Sign in to your [Twitter Developers](https://developer.twitter.com/en/docs/basics/getting-started) account to get both a  **Consumer API Key**, and an **API Secret Key**
		- After getting both your **Consumer API Key** and your **API Secret Key**, go [here](https://developer.twitter.com/en/docs/basics/authentication/guides/bearer-tokens) for instructions on how to get a Twitter **Bearer Token** and get yours.

4. Add your API credentials to LIRI. Still at the root of your LIRI directory, inside the terminal run `touch .env`. Place all five credentials inside the `.env` file, and sure the file looks like the following with **your own** credentials as the values: 

```
# Spotify API keys

SPOTIFY_ID=yourAlphaNumericSpotifyIdGoesHere
SPOTIFY_SECRET=yourAlphaNumericSpotifySecretGoesHere

# Twitter API keys

TWITTER_CONSUMER_KEY=yourAlphaNumericTwitterConsumerKeyGoesHere
TWITTER_CONSUMER_SECRET=yourAlphaNumericTwitterConsumerSecretKeyGoesHere
TWITTER_BEARER_TOKEN=yourAlphaNumericTwitterBearerTokenGoesHere
```

5. There is no step 5! LIRI is READY!


### To Get Tweets

In the terminal at the root of the LIRI directory enter:

`node liri get-tweets <twitter handle without the @>`

Ex: `node liri get-tweets NASA`


### Get Movie Info

In the terminal at the root of the LIRI directory enter:

`node liri get-movie <movie title>`

Ex : `node liri get-movie The Shawshank Redemption`


### Get a Music Artist's Info


In the terminal at the root of the LIRI directory enter:

`node liri get-top-albums <artist name>`

Ex: `node liri get-top-albums Michael Jackson`



### Get Random


In the terminal at the root of the LIRI directory enter:

`node liri liri-picks`


## Technologies Used

- JavaScript

- [Node.js](https://nodejs.org/en/)
	- [request-promise](https://www.npmjs.com/package/request-promise)

	- [fs-extra](https://www.npmjs.com/package/fs-extra)
	- [dotenv](https://www.npmjs.com/search?q=dotenv)
	- [lodash](https://www.npmjs.com/package/lodash)
	- [twitter](https://www.npmjs.com/package/twitter)


- [Twitter API](https://developer.twitter.com/)
- [Spotify API](https://developer.spotify.com/)
- [OMDb API](http://www.omdbapi.com/)


---

> Written with [StackEdit](https://stackedit.io/)