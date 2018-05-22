require("dotenv").config();

var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var fs = require("fs");

var keys = require("keys");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

function myTweets() {

}

function spotifyThisSong(songName) {
    if(!songName) {
        signName = "The Sign";
    }
    spotify.search({type:"track", query:songName}, (err,data)=>{
        if(!!err) throw err;

        console.log(data);
    });
}

function movieThis(movieName) {

}

var command = process.argv[2];

var arg = null;
if(process.argv.length > 3) {
    arg = process.argv[3];
}

if(command === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", (error,data)=>{
        if(error) throw error;

        var dataArray = data.split(",");
        command = dataArray[0];
        if (dataArray.length > 1) {
            arg = dataArray[1];
        }
    });
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