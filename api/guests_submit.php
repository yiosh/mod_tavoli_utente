<?php
  require('../config/db.config.php');

  $nome = $_POST['nome'];
  $cognome = $_POST['cognome'];
  $adulti = $_POST['adulti'];
  $bambini = $_POST['bambini'];
  $seggioloni = $_POST['seggioloni'];
  $note_intolleranze = $_POST['note_intolleranze'];

  $sql = "INSERT INTO fl_tavoli_commensali (evento_id, nome, cognome, adulti, bambini, seggioloni, note_intolleranze, data_creazione)
  VALUES ('$evento_id', '$nome', '$cognome', '$adulti', '$bambini', '$seggioloni', '$note_intolleranze', (now()))";

  if ($result = mysqli_query($conn, $sql)) {
    $id = mysqli_insert_id($conn);
    $sql = "SELECT * FROM fl_tavoli_commensali WHERE id='$id' AND evento_id='$evento_id'";

    if ($result = mysqli_query($conn, $sql)) {
      $json = mysqli_fetch_assoc($result);

      echo json_encode($json);

    } else {
      echo "Errore durante l'aggiunta di $nome $cognome. MySQli Error: " . mysqli_error($conn);
    }

  } else {
    echo "Errore durante l'aggiunta di $nome $cognome. MySQli Error: " . mysqli_error($conn);
  }

  mysqli_close($conn);
  