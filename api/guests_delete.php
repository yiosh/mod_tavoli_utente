<?php
  require('../config/db.config.php');

  $id = $_POST['id'];

  // sql to delete a record
  $sql = "DELETE FROM fl_tavoli_commensali WHERE id='$id'";

  if (mysqli_query($conn, $sql)) {
      echo "Guest $id successfully deleted";
  } else {
      echo "Error deleting Guest $id: " . mysqli_error($conn);
  }

  mysqli_close($conn);