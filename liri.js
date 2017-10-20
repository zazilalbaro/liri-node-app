var keys = require("./keys.js");
var fs = require("fs");
var Twitter = require('twitter');
var request = require("request");
var Spotify = require("node-spotify-api");
 
var option = process.argv[2];
var value = process.argv[3];

var myTweets = function() {
	// console.log last 20 tweets & when they were created
	var client = new Twitter(keys.twitterKeys)
	var params = {count: 20};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (error) {
		    return console.log('Error occurred: ' + error);
		}
		else {
			fs.appendFile('log.txt', "\nmy-tweets: \n", function(err) {
					if (err) {
						return console.log(err);
					}
	        });
	    	for (var i = 0; i < tweets.length; i++) {
	        	console.log(tweets[i].text + "\nTweeted on: " + tweets[i].created_at);
	            fs.appendFile('log.txt', tweets[i].text + "\n" + "Tweeted on: " + tweets[i].created_at + "\n", function(err) {
					if (err) {
						return console.log(err);
					}
	            });
	            
		  	}
		  	console.log("\nThese tweets were added to log.txt");
	  	}
	});
};

var spotifyThisSong = function(value) {
	if (!value) {
		value = 'The Sign'
	}
	var songTitle = value;
	// list artist, song name, preview link from spotify, album	
	var spotify = new Spotify({
	  id: keys.spotifyKeys.clientID,
	  secret: keys.spotifyKeys.clientSecret
	});
	spotify.search({ type: 'track', query: songTitle, limit: 1 }, function(err, data) {
		if (err) {
		    return console.log('Error occurred: ' + err);
		}
		var result = data.tracks.items[0];
		var trackInfo = "Track Title: " + result.name +
						",Artist(s): " + result.album.artists[0].name +
						",Preview Link: " + result.external_urls.spotify +
						",Album Name: " + result.album.name;		
		var dataArr = trackInfo.split(",");	
		fs.appendFile("log.txt", "\nspotify-this-song: \n", function(err) {
				if (err) {
					return console.log(err);
				}
		});		
		for (i=0; i < dataArr.length; i++) {	
			// display song info to the user			
			console.log(dataArr[i].trim());
			// add song to the log file
			fs.appendFile("log.txt", dataArr[i].trim()+"\n", function(err) {
				if (err) {
					return console.log(err);
				}
			});
		}
		console.log("\nThis song was added to log.txt");
	});
};

var movieThis = function(value) {
	if (!value) {
		value = 'Mr. Nobody'
	}

	// connect to omdb and request data for movie
	request("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
	    // If the request is successful (i.e. if the response status code is 200)
	    if (!error && response.statusCode === 200) {
		  	var result = "Title: " + JSON.parse(body).Title +
		    			"\nYear: " + JSON.parse(body).Year +
		    			"\nIMDB Rating: " + JSON.parse(body).imdbRating +
		    			"\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value +
		    			"\nCountry: " + JSON.parse(body).Country +
		    			"\nLanguage: " + JSON.parse(body).Language +
		    			"\nPlot Summary: " + JSON.parse(body).Plot +
						"\nActors: " + JSON.parse(body).Actors;
			console.log(result);
		    fs.appendFile("log.txt", "\n\nmovie-this: \n" + result, function(err) {
				if (err) {
					return console.log(err);
				}
			});
			console.log("\nThis movie was added to log.txt");
	    }
	    else {
		    return console.log('Error occurred: ' + error);
	    };
	});
};

var doWhatItSays = function() {
	// use the fs node package to take the text inside the random.txt and the command indicated in the file
    fs.readFile("random.txt", "utf8", function(error, data) {
		if(error) {
	 		console.log(error);
	 	}
	 	else {
			var randomDataArray = data.split(',');
			var action = randomDataArray[0];
			var value = randomDataArray[1];
			switch (action) {
				case "my-tweets":
					myTweets();
					break;
				case "spotify-this-song":
					spotifyThisSong(value);
					break;
				case "movie-this":
					movieThis(value);
					break;
			}
		}
	});
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