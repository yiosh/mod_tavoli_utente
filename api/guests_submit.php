<?php
  require('../config/db.config.php');
  
  $evento_id = 449;
  $nome = $_POST['nome'];
  $cognome = $_POST['cognome'];
  $adulti = $_POST['adulti'];
  $bambini = $_POST['bambini'];
  $seggioloni = $_POST['seggioloni'];
  $note_intolleranze = $_POST['note_intolleranze'];

  echo $guest_sql = "INSERT INTO fl_tavoli_commensali (evento_id, nome, cognome, adulti, bambini, seggioloni, note_intolleranze)
  VALUES ('449', '$nome', '$cognome', '$adulti', '$bambini', '$seggioloni', '$note_intolleranze')";
  $result = mysqli_query($conn, $guest_sql);

  $guest_sql = "SELECT * FROM fl_tavoli_commensali";
  $result = mysqli_query($conn, $guest_sql);
  $data = mysqli_fetch_assoc($result);
  echo json_encode($data);

  mysqli_close($conn);
?>