<?php
  require('../config/db.config.php');

  $tavolo_id = $_POST['tavolo_id'];
  $user_id = $_POST['user_id'];
  $nome_tavolo = $_POST['nome_tavolo'];
  $nome_cognome = $_POST['nome_cognome'];

  $sql = "UPDATE fl_tavoli_commensali SET tavolo_id='$tavolo_id' WHERE id='$user_id'";

  if ($result = mysqli_query($conn, $sql)) {
    $sql = "SELECT * FROM fl_tavoli_commensali WHERE id='$user_id'";

    if ($result = mysqli_query($conn, $sql)) {
      $json = mysqli_fetch_assoc($result);

      echo json_encode($json);

    } else {
      echo "Errore durante l'aggiunta di $nome_cognome alla tavolo: $nome_tavolo. MySQli Error: " . mysqli_error($conn);
    }

  } else {
    echo "Errore durante l'aggiunta di $nome_cognome alla tavolo: $nome_tavolo. MySQli Error: " . mysqli_error($conn);
  }

  mysqli_close($conn);
