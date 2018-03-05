<?php 
  
if(isset($_POST['submit-table'])) {
  require('../config/db.config.php');
  try {

    $stmt = $conn->prepare('INSERT INTO fl_tavoli (nome_tavolo, numero_tavolo) VALUES (?, (SELECT numero_tavolo + 1 FROM fl_tavoli WHERE evento_id = ? AND layout_id = ? ORDER BY numero_tavolo desc LIMIT 1 ))');
    $stmt->bindParam(1, $_POST['nome_tavolo']);
  
    $stmt->execute();
    header('Location: '.ROOT_URL.'');
  } catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
  }
  $conn = null;
}