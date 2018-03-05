<?php
  define('ROOT_URL', 'http://localhost/mod_tavoli_utente/');

  $db_host = "localhost";
  $db_user = "root";
  $db_pass = "";
  $db_name = "banquet_losmeraldo";
  
  // Create and check Connection
  $conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name);

  /* Check connection */
  if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
  // } else {
  //   echo "Success!";
  // }
?>
