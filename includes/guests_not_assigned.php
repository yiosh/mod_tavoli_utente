<?php
  require('../config/db.config.php');
  // Create Query
  $queryGuests = $conn->prepare('SELECT * FROM fl_tavoli_commensali WHERE tavolo_id = 0 AND id > 1');
  $queryGuests->execute();
  // Fetch results
  $tables = $queryGuests->fetchAll();
  echo json_encode($tables);
  $conn = null;