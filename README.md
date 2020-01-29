# Language Interpretation and Recognition Interface (LIRI)

## What is LIRI?

LIRI, or Language Interpretation and Recognition Interface, is a [Nodejs](https://nodejs.org/en/) application program that uses a command-line interface (CLI) to interact with its users.

LIRI recognizes commands to get tweets, get movie data, get music data, and a command that asks LIRI itself to randomly pick a command to execute.

The commands return useful data from either the [Twitter API](https://developer.twitter.com/), the [OMDb API](http://www.omdbapi.com/), or the [Spotify API](https://developer.spotify.com/documentation/web-api/).

## What does LIRI do?

Based on the commands the user enters into the terminal:

1. LIRI returns the 20 most recent [tweets](https://twitter.com/home?lang=en) by a public twitter account that the user specifies, by calling the [Twitter API](https://developer.twitter.com/) to get this data. If a twitter handle is not supplied to LIRI, if the twitter handle does not exist, or if it belongs to a private account, LIRI returns [@knlsworthington](https://twitter.com/knlsworthington)'s tweets.

2. Calling the [Spotify API](https://developer.spotify.com/documentation/web-api/), LIRI returns the top albums of the artist that the user specifies. If an artist is not supplied to LIRI, or if the artist does not exists on the [Spotify API](https://developer.spotify.com/documentation/web-api/), LIRI returns [Michael Jackson](https://www.michaeljackson.com/)'s top albums.

3. LIRI gets detailed movie data for the movie title specified by the user by calling the [OMDb API](http://www.omdbapi.com/) to get this data. If a movie title is not supplied to LIRI, or if the movie does not exists on the [OMDb API](http://www.omdbapi.com/), LIRI returns movie data for the movie [Mr. Nobody](https://www.imdb.com/title/tt0485947/).

4. The user has the option to let LIRI pick what to get. With this particular command LIRI reads the `random.txt` file which holds a string of several commands, splits the commands into an array, and then randomly picks one to execute.

## How does LIRI work?

#### Get set up first

1. Download the latest version of [Node.js](https://nodejs.org/en/)

2. Clone this LIRI repository onto your local machine.

3. Run the command `npm install` in your terminal at the root of the LIRI repository to install all of LIRI's node dependencies.

4. Get your API Credentials:

- **[OMBD API](http://www.omdbapi.com/)**
  - Go [here](http://www.omdbapi.com/apikey.aspx) and follow the instructions to get a free **OMBD API Key**.

- **[Spotify API](https://developer.spotify.com/documentation/web-api/)**
  - Sign in, or sign up to get your [Spotify for Developers](https://developer.spotify.com/dashboard/) account, and then follow their instructions to get both a **Client ID**, and a **Secret Key**.

-**[Twitter API](https://developer.twitter.com/en/docs)**
  - Sign in, or sign up get your [Twitter Developers](https://developer.twitter.com/en/docs/basics/getting-started) account, and then follow their instructions to get both a **Consumer API Key**, and a **API Secret Key**
  - After getting  *both your **Consumer API Key** and your **API Secret Key**, go [here](https://developer.twitter.com/en/docs/basics/authentication/guides/bearer-tokens) for instructions on how to get your **Bearer Token**.

5. Add your API credentials to LIRI.

- Create a .env file.
  - At the root of your LIRI directory, inside the terminal run `touch .env`. 
- Place all **SIX** API credentials inside the `.env` file, and make sure the file looks like the following with **YOUR OWN** credentials as the values:

```
# OMDB API key

OMDB_API_KEY=yourOMDBapiKeyGoesHere

# Spotify API keys

SPOTIFY_ID=yourSpotifyClientIdGoesHere
SPOTIFY_SECRET=yourSpotifySecretKeyGoesHere

# Twitter API keys

TWITTER_CONSUMER_KEY=yourTwitterConsumerAPIKeyGoesHere
TWITTER_CONSUMER_SECRET=yourTwitterAPISecretKeyGoesHere
TWITTER_BEARER_TOKEN=yourTwitterBearerTokenGoesHere
```

6. LIRI is ready to go! The following shows you how to use LIRI.

### Run each of the following seperate commands in your terminal **at the root of the LIRI repository**.

#### Get Tweets

To tell LIRI to fetch tweets, run:

`node liri get-tweets somePublicTwitterHandle`

Ex: `node liri get-tweets NASA`

*Make sure the twitter handle provided to LIRI is a **public** account

#### Get Movie Info

For LIRI to get OMBD movie data, run:

`node liri get-movie some movie title`

Ex : `node liri get-movie The Shawshank Redemption`

#### Get a Music Artist's Info

To get LIRI to return an artist's top albums from the Spotify API, run:

`node liri get-top-albums some artist name`

Ex: `node liri get-top-albums Michael Jackson`

#### Get Random

To let LIRI pick what you get, just run:

`node liri liri-picks`

## Demo Videos

*  [DEMO](https://drive.google.com/file/d/1zWftgHgjmx_LCZdlUdDzegg7_C4qmNx1/view)

## Technologies Used

JavaScript


[Node.js](https://nodejs.org/en/)

*  [request-promise](https://www.npmjs.com/package/request-promise)

*  [fs-extra](https://www.npmjs.com/package/fs-extra)

*  [dotenv](https://www.npmjs.com/search?q=dotenv)

*  [lodash](https://www.npmjs.com/package/lodash)

*  [twitter](https://www.npmjs.com/package/twitter)


[Twitter API](https://developer.twitter.com/)

[Spotify API](https://developer.spotify.com/)

[OMDb API](http://www.omdbapi.com/)


---

> Written with [StackEdit](https://stackedit.io/)