<?php
    if($_SERVER["REQUEST_METHOD"] =="POST"){
        $songNameGuess = $_POST["songName"];
        $artistNameGuess = $_POST["artistName"];
        $songName = $_POST["songName"]; //this doesnt work--just a placeholder
        $artistName = $_POST["artistName"]; //this doesnt work--just a placeholder

    }



?>
<body> 
    <h3>Your guess:</h3>
        <p>Song Name: <?php echo $songNameGuess; ?></p>
        <p>Artist Name: <?php echo $artistNameGuess; ?></p>
        <p>Time Elapsed: <?php echo "time"; ?></p>
    <h3>Answers:</h3>
        <p>Song Name: <?php echo $songName; ?></p>
        <p>Artist Name: <?php echo $artistName; ?></p>
        <p>Points won: <?php echo "points";?></p>
</body>
