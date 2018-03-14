<?php
  require('../config/db.config.php');

  $numero = $_GET['numero'];

  $sql = "SELECT numero_tavolo FROM fl_tavoli WHERE numero_tavolo ='$numero'";
  if ($result = mysqli_query($conn, $sql)) {
    
    $result = mysqli_fetch_assoc($result);
    echo json_encode($result);
  } else {
    echo "Tavolo Errore. MySQli Error: " . mysqli_error($conn);
  }
  

  mysqli_close($conn);
// WHERE numero_tavolo = '$numero'