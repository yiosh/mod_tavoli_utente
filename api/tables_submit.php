<?php
  require('../config/db.config.php');
  
  $layout_id = 15;
  $evento_id = 449;
  $tipo_tavolo_id = 2;
  $nome_tavolo = $_POST['nome_tavolo'];
  // $data_creazione = date_default_timezone_get();
  // $sql = "SELECT max(numero_tavolo) + 1 FROM fl_tavoli WHERE evento_id = '$evento_id' AND layout_id = '$layout_id'";
  // $result = mysqli_query($conn, $sql);
  // $numero_tavolo = mysql_fetch_array($result);
  
  $sql = "INSERT INTO fl_tavoli (layout_id, evento_id, tipo_tavolo_id, nome_tavolo, numero_tavolo)
  VALUES ('$layout_id', '$evento_id', '$tipo_tavolo_id', '$nome_tavolo', (SELECT max(numero_tavolo) + 1 FROM fl_tavoli WHERE evento_id = $evento_id' AND layout_id = '$layout_id'))";
  $result = mysqli_query($conn, $sql);

  $sql = "SELECT * FROM fl_tavoli";
  $result = mysqli_query($conn, $sql);
  $data = mysqli_fetch_assoc($result);
  echo json_encode($data);

  mysqli_close($conn);
?>