<?php
  require('../config/db.config.php');

	$id = $_POST['id'];
	
	// Delete guest
	$sql = "DELETE FROM fl_tavoli_commensali WHERE id='$id' AND evento_id='$evento_id'";
	if (mysqli_query($conn, $sql)) {
		echo "cancellato";
	} else {
		echo "Errore durante l'eliminazione del ospite $id: " . mysqli_error($conn);
	}

  mysqli_close($conn);