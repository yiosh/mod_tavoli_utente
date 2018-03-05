<?php
  require('db.config.php');
  // Create Query

  $res_tavoli = mysqli_query($conn, "SELECT * FROM fl_tavoli WHERE id > 1");
  $row_tavoli = mysqli_fetch_assoc($res_tavoli);

  $res_commensali = mysqli_query($conn, "SELECT * FROM fl_tavoli_commensali WHERE id > 1");
  $row_commensali = mysqli_fetch_assoc($res_commensali);


  // $queryTables = $conn->prepare('SELECT * FROM fl_tavoli WHERE id > 1');
  // $queryTables->execute();
  // // Fetch results
  // $tables = $queryTables->fetchAll();

  // $queryGuests = $conn->prepare('SELECT * FROM fl_tavoli_commensali WHERE id > 1');// WHERE tavolo_id<>0
  // $queryGuests->execute();
  // // Fetch results
  // $guests = $queryGuests->fetchAll();