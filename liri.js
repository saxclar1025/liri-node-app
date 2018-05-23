require("dotenv").config();

var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var fs = require("fs");
var request = require("request");

var keys = require("./keys");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

function myTweets() {
    client.get("statuses/user_timeline", 
    {
        username:"SamFalcon3",
        count: 20
    }, (error,tweets,response)=>{
        if(!!error) throw error;
        tweets.forEach(tweet=>{
            console.log("Text:")
            console.log(tweet.text);
            console.log("Created at:");
            console.log(tweet.created_at);
            console.log();
        });
    });
}

function spotifyThisSong(songName) {
    if(!songName) {
        songName = "The Sign";
    }
    spotify.search({type:"track", query:songName}, (err,data)=>{
        if(!!err) throw err;

        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Name: " + data.tracks.items[0].name);
        console.log("Preview link: " + data.tracks.items[0].external_urls.spotify);
        console.log("Album: " + data.tracks.items[0].album.name);
    });
}

function movieThis(movieName) {
    if(!movieName) movieName = "Mr. Nobody";

    request("http://www.omdbapi.com/?apikey=trilogy&t=" + movieName,
    (error, response, body)=>{
        if(!!error) throw error;

        body = JSON.parse(body);
        console.log("Title: " + body.Title);
        console.log("Year: " + body.Year);
        console.log(body.Ratings);
        console.log("IMDB Rating: " + body.Ratings.find(rating=>(rating.Source==="Internet Movie Database")).Value);
        console.log("Rotten Tomatoes Rating: " + body.Ratings.find(rating=>(rating.Source==="Rotten Tomatoes")).Value);
        console.log("Country: " + body.Country);
        console.log("Language: " + body.Language);
        console.log("Plot: " + body.Plot);
        console.log("Actors: " + body.Actors);
    });
}

var command = process.argv[2];

var arg = null;
if(process.argv.length > 3) {
    arg = process.argv[3];
}

if(command === "my-tweets") {
    myTweets();
}

if(command === "spotify-this-song") {
    spotifyThisSong(process.argv[3]);
}

if(command === "movie-this") {
    movieThis(process.argv[3]);
}

if(command === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", (error,data)=>{
        if(error) throw error;

        var dataArray = data.split(",");
        command = dataArray[0];
        if (dataArray.length > 1) {
            arg = dataArray[1];
        }

        if(command === "my-tweets") {
            myTweets();
        }

        if(command === "spotify-this-song") {
            spotifyThisSong(process.argv[3]);
        }

        if(command === "movie-this") {
            movieThis(process.argv[3]);
        }
    });
}