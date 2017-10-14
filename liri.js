var keys = require("./keys.js");
var fs = require("fs");
var Twitter = require('twitter');
var request = require("request");
 
var option = process.argv[2];
var value = process.argv[3];

var myTweets = function() {
	// console.log last 20 tweets & when they were created
	var client = new Twitter(keys.twitterKeys)
	var params = {count: 20};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  	if (!error) {
	    	for (var i = 0; i < tweets.length; i++) {
	        	console.log(tweets[i].text + "\nTweeted on: " + tweets[i].created_at);
	            fs.appendFile('log.txt', "\n" + tweets[i].text + "\n" + "Tweeted on: " + tweets[i].created_at + "\n", function(err) {
					if (err) {
						return console.log(err);
					}
	            });
		  	}
	  	}
	});
};

var spotifyThisSong = function(value) {
	if (!value) {
		value = 'The Sign'
	}

	// list artist, song name, preview link from spotify, album	
};

var movieThis = function(value) {
	if (!value) {
		value = 'Mr. Nobody'
	}

	// connect to omdb and request data for movie
	request("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
	  // If the request is successful (i.e. if the response status code is 200)
	  if (!error && response.statusCode === 200) {
	  	console.log("\nTitle: " + JSON.parse(body).Title);
	    console.log("Year: " + JSON.parse(body).Year);
	    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
	    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
	    console.log("Country: " + JSON.parse(body).Country);
	    console.log("Language: " + JSON.parse(body).Language);
	    console.log("Plot Summary: " + JSON.parse(body).Plot);
	    console.log("Actors: " + JSON.parse(body).Actors);
	  }
	  else {
	  	console.log("Oops, couldn't find that movie :(");
	  };
	});
};

var doWhatItSays = function() {

	// use the fs node package to take the text inside the random.txt and the command indicated in the file
	// add more commands and text
};

switch (option) {
	case "my-tweets":
		myTweets();
		break;

	case "spotify-this-song":
		spotifyThisSong(value);
		break;

	case "movie-this":
		movieThis(value);
		break;

	case "do-what-it-says":
		doWhatItSays();
		break;

	default:
		console.log("\nPlease enter one of the following:");
		console.log("my-tweets");
		console.log("spotify-this-song <enter song title>");
		console.log("movie-this <enter movie title>");
		console.log("do-what-it-says");
		break;
};