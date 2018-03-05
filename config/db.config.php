<?php
  define('ROOT_URL', 'http://localhost/marriage-app/');

  $DB_host = "localhost";
  $DB_user = "root";
  $DB_pass = "";
  $DB_name = "db_calderoni";
  
  // Create and check Connection
  try {
     $conn = new PDO("mysql:host={$DB_host};dbname={$DB_name}",$DB_user,$DB_pass);
     $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
 } catch(PDOException $e) {
    // Connection failes
    echo "ERROR : ".$e->getMessage();
 }
