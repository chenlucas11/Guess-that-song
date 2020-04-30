<?php
    if($_SERVER["REQUEST_METHOD"] =="POST"){
        $songNameGuess = $_POST["songName"];
        $artistNameGuess = $_POST["artistName"];
        //$songID = $_POST["something"];
    }
    //the below is something I found online to put JSON info into PHP objects?
    // Takes raw data from the request
    $json = file_get_contents('php://v1/tracks/{$songID}');
    // Converts it into a PHP object
    $data = json_decode($json);



?>
<body> 
    <h3>Your guess:</h3>
        <p>Song Name: <?php echo $songNameGuess; ?></p>
        <p>Artist Name: <?php echo $artistNameGuess; ?></p>
    <h3>Answers:</h3>
        <p>Song Name: <?php echo $songName; ?></p>
        <p>Artist Name: <?php echo $artistName; ?></p>
        <p>Points won: <?php echo "nope";?></p>
</body>
