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
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
  }

  /* Check if server is alive */
  if (mysqli_ping($conn)) {
    printf ("Our connection is ok!\n");
  } else {
    printf ("Error: %s\n", mysqli_error($conn));
  }

  /* Close connection */
  // mysqli_close($conn);
?>
