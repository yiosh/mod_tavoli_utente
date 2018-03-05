<?php

if(isset($_POST['submit-guest'])) {
  require('../config/db.config.php');
  try {
    $stmt = $conn->prepare('INSERT INTO fl_tavoli_commensali(nome, cognome, adulti, bambini, seggioloni, note_intolleranze) VALUES (?, ?, ?, ?, ?, ?)');
    $stmt->bindParam(1, $_POST['nome']);
    $stmt->bindParam(2, $_POST['cognome']);
    $stmt->bindParam(3, $_POST['adulti']);
    $stmt->bindParam(4, $_POST['bambini']);
    $stmt->bindParam(5, $_POST['seggioloni']);
    $stmt->bindParam(6, $_POST['note_intolleranze']);
  
    $stmt->execute();
    header('Location: '.ROOT_URL.'');
  } catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
  }
  $conn = null;
}