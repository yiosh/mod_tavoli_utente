<?php
  require('db.config.php');
  // Create Query
  $queryGuests = $conn->prepare('SELECT * FROM fl_tavoli_commensali WHERE id > 1');// WHERE tavolo_id<>0
  $queryGuests->execute();
  // Fetch results
  $guests = $queryGuests->fetchAll();