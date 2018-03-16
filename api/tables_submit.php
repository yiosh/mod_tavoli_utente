<?php
  ini_set('display_errors', 'On');
  error_reporting(E_ALL | E_STRICT);
  require('../config/db.config.php');
  
  $layout_id = 15;
  $tipo_tavolo_id = 2;
  $nome_tavolo = $_POST['nome_tavolo'];
  $numero_tavolo = $_POST['numero_tavolo'];
  
  $lastTable = GQD('fl_tavoli','MAX(numero_tavolo) as num'," evento_id = ".$evento_id);
  $lastNumero_tavolo = $lastTable['num']+1;



  $sql = "INSERT INTO fl_tavoli (numero_tavolo,numero_tavolo_utente,nome_tavolo_utente, layout_id, evento_id, nome_tavolo, data_creazione, tipo_tavolo_id)
  VALUES ($lastNumero_tavolo,'$numero_tavolo','', '$layout_id', '$evento_id', '$nome_tavolo', (now()), '$tipo_tavolo_id')";

  if ($result = mysqli_query($conn, $sql)) {
    $id = mysqli_insert_id($conn);
    $sql = "SELECT * FROM fl_tavoli WHERE id='$id' AND evento_id = '$evento_id'";

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