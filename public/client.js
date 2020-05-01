// client-side js
// run by the browser each time your view template is loaded

var song;
var artist;

var processGuess = function() {
  var songGuess = document.inputform.songName.value;
  var artistGuess = document.inputform.artistName.value;

  document.getElementById("submit").style.visibility = "visible";

  if (isArtistCorrect(artistGuess) && isSongCorrect(songGuess))
    document.getElementById("message").innerHTML = "Correct!!";
  else if (!isArtistCorrect(artistGuess) && isSongCorrect(songGuess))
    document.getElementById("message").innerHTML = "Incorrect Artist :(";
  else if (isArtistCorrect(artistGuess) && !isSongCorrect(songGuess))
    document.getElementById("message").innerHTML = "Incorrect Song Name :(";
  else document.getElementById("message").innerHTML = "Incorrect";
};

var isArtistCorrect = function(artistGuess) {
  if (artistGuess == artist) {
    return true;
  } else {
    return false;
  }
};

var isSongCorrect = function(songGuess) {
  if (songGuess == song) {
    return true;
  } else {
    return false;
  }
};

$(function() {
  $("#login").click(function() {
    // Call the authorize endpoint, which will return an authorize URL, then redirect to that URL
    $.get("/authorize", function(data) {
      console.log(data);
      window.location = data;
    });
  });

  const hash = window.location.hash
    .substring(1)
    .split("&")
    .reduce(function(initial, item) {
      if (item) {
        var parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});
  window.location.hash = "";

  if (hash.access_token) {
    $.get(
      {
        url: "/myendpoint",
        headers: { Authorization: `Bearer ${hash.access_token}` }
      },
      function(data) {
        // "Data" is the array of track objects we get from the API. See server.js for the function that returns it.
        console.log(data);

        song = data.tracks[0].name;
        artist = data.tracks[0].artists[0].name;

        var player = $(
          '<div id="player"><iframe src="https://open.spotify.com/embed?uri=' +
            data.tracks[0].uri +
            '" width="80" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></div>'
        );
        player.appendTo("#data-container ol");
      }
    );
  }
});
