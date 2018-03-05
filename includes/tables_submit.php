<?php 
  
if(isset($_POST['submit-table'])) {
  require('../config/db.config.php');
  try {
    $stmt = $conn->prepare('INSERT INTO fl_tavoli (nome_tavolo) VALUES (?)');
    $stmt->bindParam(1, $_POST['nome_tavolo']);
  
    $stmt->execute();
    header('Location: '.ROOT_URL.'');
  } catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
  }
  $conn = null;
}