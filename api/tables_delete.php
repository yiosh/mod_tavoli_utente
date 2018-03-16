<?php
  require('../config/db.config.php');

  $id = $_POST['id'];

  // If exist delete record
  $sql = "DELETE FROM fl_tavoli WHERE id='$id' AND evento_id='$evento_id'";
  if (mysqli_query($conn, $sql)) {
    // If success output nome and cognome to be logged
    mysqli_query($conn,"UPDATE `fl_tavoli_commensali` SET `tavolo_id` = '0' WHERE `fl_tavoli_commensali`.`tavolo_id` = ".$id);
    echo "cancellato";
    
  } else {
    echo "Errore durante l'eliminazione del ospite $id: " . mysqli_error($conn);
  }

  mysqli_close($conn);