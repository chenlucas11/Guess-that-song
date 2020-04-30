var leaderboard = function(score){
    var i = 1;
    while(i<11){
        if(score > document.getElementById(i).innerHTML){
            var temp = document.getElementById(i).innerHTML;
            document.getElementById(i).innerHTML = score;
            for(var x = i; x < 11; x++){
                score = temp;
                temp = document.getElementById(i+1).innerHTML;
                document.getElementById(i+1).innerHTML = score;// Check in morn
            }
        i = 11;
        }
        else{
            i++;
        }
    }

}
