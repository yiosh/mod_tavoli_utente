<?php
  require('../config/db.config.php');

  $id = $_POST['id'];

  // If exist delete record
  $sql = "DELETE FROM fl_tavoli WHERE id='$id'";
  if (mysqli_query($conn, $sql)) {
    // If success output nome and cognome to be logged
    echo "cancellato";
  } else {
    echo "Errore durante l'eliminazione del ospite $id: " . mysqli_error($conn);
  }

  mysqli_close($conn);