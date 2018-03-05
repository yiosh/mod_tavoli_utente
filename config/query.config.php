<?php
  require('db.config.php');
  // Create Query

  $query_tavoli = "SELECT * FROM fl_tavoli WHERE id > 1";
  $result_tavoli = mysqli_query($conn, $query_tavoli);
  $array_tavoli = mysqli_fetch_assoc($result_tavoli);

  $query_commensali = "SELECT * FROM fl_tavoli_commensali WHERE id > 1";
  $result_commensali = mysqli_query($conn, $query_commensali);
  $array_commensali = mysqli_fetch_assoc($result_commensali);



  // $queryTables = $conn->prepare('SELECT * FROM fl_tavoli WHERE id > 1');
  // $queryTables->execute();
  // // Fetch results
  // $tables = $queryTables->fetchAll();

  // $queryGuests = $conn->prepare('SELECT * FROM fl_tavoli_commensali WHERE id > 1');// WHERE tavolo_id<>0
  // $queryGuests->execute();
  // // Fetch results
  // $guests = $queryGuests->fetchAll();