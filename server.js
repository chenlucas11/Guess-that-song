// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

//-------------------------------------------------------------//
//----------------------- AUTHORIZATION -----------------------//
//-------------------------------------------------------------//

// Initialize Spotify API wrapper
var SpotifyWebApi = require("spotify-web-api-node");

// Replace with your redirect URI, required scopes, and show_dialog preference
var redirectUri = `https://${process.env.PROJECT_DOMAIN}.glitch.me/callback`;
var scopes = ["user-top-read"];
var showDialog = true;

// The API object we'll use to interact with the API
var spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: redirectUri
});

app.get("/authorize", function(request, response) {
  var authorizeURL = spotifyApi.createAuthorizeURL(scopes, null, showDialog);
  console.log(authorizeURL);
  response.send(authorizeURL);
});

// Exchange Authorization Code for an Access Token
app.get("/callback", function(request, response) {
  var authorizationCode = request.query.code;

  spotifyApi.authorizationCodeGrant(authorizationCode).then(
    function(data) {
      console.log(data);
      response.redirect(
        `/#access_token=${data.body["access_token"]}&refresh_token=${
          data.body["refresh_token"]
        }`
      );
    },
    function(err) {
      console.log(
        "Something went wrong when retrieving the access token!",
        err.message
      );
    }
  );
});

app.get("/logout", function(request, response) {
  response.redirect("/");
});

app.get("/myendpoint", function(request, response) {
  var loggedInSpotifyApi = new SpotifyWebApi();
  console.log(request.headers["authorization"].split(" ")[1]);
  loggedInSpotifyApi.setAccessToken(
    request.headers["authorization"].split(" ")[1]
  );
  // Search for a track!
  loggedInSpotifyApi
    .getRecommendations({ seed_genres: ["pop"], min_popularity: 70 })
    .then(
      function(data) {
        console.log(data.body);
        response.send(data.body);
      },
      function(err) {
        console.error(err);
      }
    );
});

/*
// Using the Client Credentials auth flow, authenticate our app
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
  
    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
    console.log('Got an access token: ' + spotifyApi.getAccessToken());
  
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err.message);
  });

*/
//-------------------------------------------------------------//
//------------------------- API CALLS -------------------------//
//-------------------------------------------------------------//

app.get("/current-track", function(request, response) {
  spotifyApi.getMyCurrentPlaybackState({}).then(
    function(data) {
      // Output items
      console.log("Now Playing: ", data.body);
    },
    function(err) {
      console.log("Something went wrong!", err);
    }
  );
});

app.get("/category-playlists", function(request, response) {
  // Get playlists from a browse category
  // Find out which categories are available here: https://beta.developer.spotify.com/console/get-browse-categories/
  spotifyApi.getPlaylistsForCategory("toplists", { limit: 20 }).then(
    function(data) {
      // Send the list of playlists
      response.send(data.body.playlists);
    },
    function(err) {
      console.error(err);
    }
  );
});

//-------------------------------------------------------------//
//------------------------ WEB SERVER -------------------------//
//-------------------------------------------------------------//

// Listen for requests to our app
// We make these requests from client.js
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
