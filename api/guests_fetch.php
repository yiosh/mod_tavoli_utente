<?php
  require('../config/db.config.php');

  $sql = "SELECT IF(tavolo_id IS NULL ,0,tavolo_id ) as tavolo_id , id, evento_id, cognome, nome, adulti, bambini, sedie, seggioloni, note_intolleranze, tipo_commensale, data_creazione, data_aggiornamento	FROM fl_tavoli_commensali WHERE (tavolo_id = 0 OR tavolo_id IS NULL) AND evento_id = ".$_SESSION['evento_id']." ORDER BY nome desc";
  if ($result = mysqli_query($conn, $sql)) {
    while($row = mysqli_fetch_assoc($result)){
        $json[] = $row;
    }
  
    echo json_encode($json);
  } else {
    echo "Tavolo Errore. MySQli Error: " . mysqli_error($conn);
  }

  mysqli_close($conn);
