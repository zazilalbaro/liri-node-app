var keys = require("./keys.js");
var fs = require("fs");
var twitter = require('twitter');
var request = require("request");
 


var option = process.argv[2];

if (option == 'my-tweets') {
	// console.log last 20 tweets & when they were created
	var params = {screen_name: 'nodejs'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  	if (!error) {
    	console.log(tweets);
  	}
});

}
else if (option == 'spotify-this-song') {
	var song = process.argv[3];

	if (!song) {
	song = 'The Sign'
	}

	// list artist, song name, preview link from spotify, album	
}
else if (option == 'movie-this') {
	var movie = process.argv[3];

	if (!movie) {
		movie = 'Mr. Nobody'
	}

	// connect to omdb and request data for movie
	request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
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
	  	console.log("Oops, couldn't find that movie :(")
	  }
	});
}
else if (option == 'do-what-it-says') {
	// use the fs node package to take the text inside the random.txt and the command indicated in the file
	// add more commands and text
}

// ,"Ratings":[{"Source":"Internet Movie Database","Value":"7.9/10"},
// {"Source":"Rotten Tomatoes","Value":"64%"},
// {"Source":"Metacritic","Value":"63/100"}],"