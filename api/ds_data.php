<?php
 require('connection.php');
  $result=mysqli_query($conn, "SELECT * FROM coll_points ORDER BY dumpster_id");
  $result_array = array();

   
   if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        array_push($result_array, $row);
    }
}
/* send a JSON encded array to client */
header('Content-type: application/json');
echo json_encode($result_array);
$conn->close();
   

?>