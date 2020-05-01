var leaderboard = function(score){
    var i = 1;
    while(i<11){
        if(score > document.getElementById(i).innerHTML){
            var temp = document.getElementById(i).innerHTML;
            document.getElementById(i).innerHTML = score;
            for(var x = i; x < 11; x++){
                score = temp;
                temp = document.getElementById(i+1).innerHTML;
                document.getElementById(i+1).innerHTML = score;
            }
        i = 11;
        }
        else{
            i++;
        }
    }
}

var getSong = function(){
    var request = new XMLHttpRequest();
    request.open("Get", "https://api.spotify.com/v1/tracks/{id}", true);
    request.onload = function(){
        var data = JSON.parse(this.response);
        var name = data.name;
        }
        return name;
}

var getArtist = function(){
    var request = new XMLHttpRequest();
    request.open("Get", "https://api.spotify.com/v1/tracks/{id}", true);
    request.onload = function(){
        var data = JSON.parse(this.response);
        var artist = data.artists;
        }
        return artist;
}

var isArtistCorrect = function(artist){
    if(artist == getArtist()){
        return true;
    }
    else {
        return false;
    }
}

var isSongCorrect = function(song){
    if(song == getSong()){
        return true;
    }
    else{
        return false;
    }
}

var processGuess = function(artist, song){
    var song = document.input-form.songName.value;
    var artist = document.input-form.artistName.value;
    if(isArtistCorrect(artist) && isSongCorrect(song)){
        document.write("<h2>Both Answers You Gave Are Correct!</h2>");
    }
    else if(isArtistCorrect(artist) && !isSongCorrect(song)){
        document.write("<h2>You Got The Artist Correct, But Not The Song Name!</h2>");
    }
    else if(!isArtistCorrect(artist) && isSongCorrect(song)){
        document.write("<h2>You Got The Song Name Correct, But Not The Artist!</h2>");
    }
    else if(!isArtistCorrect(artist) && !isSongCorrect(song)){
        document.write("<h2>You Got Neither Correct!</h2>");
    }
}