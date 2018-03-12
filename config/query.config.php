<?php
  require('db.config.php');
  // Create Query
  $query_tavoli = 'SELECT * FROM fl_tavoli WHERE evento_id = '.$_SESSION["evento_id"].' ORDER BY numero_tavolo asc';
  $result_tavoli = mysqli_query($conn, $query_tavoli);

  $query_commensali = "SELECT * FROM fl_tavoli_commensali WHERE evento_id = ".$_SESSION['evento_id']." ORDER BY nome desc";
  $result_commensali = mysqli_query($conn, $query_commensali);

  $query_commensali2 = "SELECT * FROM fl_tavoli_commensali WHERE tavolo_id = 0 AND evento_id = ".$_SESSION['evento_id']." ORDER BY nome desc";
  $result_commensali2 = mysqli_query($conn, $query_commensali2);

mysqli_close($conn);
