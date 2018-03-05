<?php
require('../config/db.config.php');

if (isset($_POST["user_id"])) {
  $stmt = $conn->prepare(
    "UPDATE fl_tavoli_commensali SET tavolo_id = :tavolo_id WHERE id= :user_id"
  );
  $stmt->execute(
    array(
      ':tavolo_id' => $_POST["tavolo_id"],
      ':user_id' => $_POST["user_id"]
    )
  );
}
$conn = null;