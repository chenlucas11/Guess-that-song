var song10 = function(){
    var guessSong = document.input-form.songName.value;
    var guessArtist = document.input-form.artistName.value;
    var realSong = "Love Somebody";
    var realArtist = "Maroon 5"
    if((guessSong == realSong) && (guessArtist == realArtist)){
        alert("<h2>Both Answers You Gave Are Correct!</h2>");
    }
    else if(!(guessArtist == realArtist) && (guessArtist == realArtist)){
        alert("<h2>You Got The Artist Correct, But Not The Song Name!</h2>");
    }
    else if(!(guessArtist == realArtist) && (guessSong == realSong)){
        alert("<h2>You Got The Song Name Correct, But Not The Artist!</h2>");
    }
    else if(!(guessArtist == realArtist)) && !isSongCorrect(song)){
        alert("<h2>You Got Neither Correct!</h2>");
        }
}