<?php
  require('../config/db.config.php');
  // Create Query
  $queryTavoli = $conn->prepare('SELECT * FROM fl_tavoli');// 
  $queryTavoli->execute();
  // Fetch results
  $tavoli = $queryTavoli->fetchAll();
  echo json_encode($tavoli);
  $conn = null;