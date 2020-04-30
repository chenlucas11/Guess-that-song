<?php
    if($_SERVER["REQUEST_METHOD"] =="POST"){
        $songName = $_POST["songName"];
        $artistName = $_POST["artistName"];
    }
?>
<body> 
    <h3>Your guess:</h3>
        <p>Song Name: <?php echo $songName; ?></p>
        <p>Artist Name: <?php echo $artistName; ?></p>
        <p>Time Elapsed: <?php echo getTimeElapsed(); ?></p>
    <h3>Answers:</h3>
        <p>Song Name: <?php echo getSong(); ?></p>
        <p>Artist Name: <?php echo getArtist(); ?></p>
        <p>Points won: <?php echo 1000-getTimeElapsed();?></p>
</body>
