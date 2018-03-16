<?php
  require('db.config.php');
  
  
  // Create Query
  $query_tavoli = "SELECT * FROM fl_tavoli WHERE evento_id ='$evento_id' ORDER BY numero_tavolo_utente asc";

  if ($result_tavoli = mysqli_query($conn, $query_tavoli)) {
  } else {
    echo "Tavolo Errore. MySQli Error: " . mysqli_error($conn);
  }
  $result_tavoli = mysqli_query($conn, $query_tavoli);

  $query_commensali = "SELECT * FROM fl_tavoli_commensali WHERE evento_id ='$evento_id' ORDER BY nome desc";
  if ($result_commensali = mysqli_query($conn, $query_commensali)) {
  } else {
    echo "Tavolo Errore. MySQli Error: " . mysqli_error($conn);
  }

  $query_commensali2 = "SELECT * FROM fl_tavoli_commensali WHERE evento_id ='$evento_id' AND (tavolo_id = 0 OR tavolo_id IS NULL) ORDER BY nome desc";
  if ($result_commensali2 = mysqli_query($conn, $query_commensali2)) {
  } else {
    echo "Tavolo Errore. MySQli Error: " . mysqli_error($conn);
  }

  mysqli_close($conn);
