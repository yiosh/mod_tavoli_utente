<?php

  require('../config/db.config.php');

  $sql = "SELECT * FROM fl_tavoli_commensali WHERE evento_id='$evento_id'";
  $result = mysqli_query($conn, $sql);

  while($row = mysqli_fetch_assoc($result)){
     $json[] = $row;
  }

  $data['utenti'] = $json;

  $sql = "SELECT * FROM fl_tavoli  WHERE evento_id='$evento_id'";
  $result = mysqli_query($conn, $sql);

  while($row = mysqli_fetch_assoc($result)){
     $json[] = $row;
  }

  $data['tavoli'] = $json;

  echo json_encode($data);
?>