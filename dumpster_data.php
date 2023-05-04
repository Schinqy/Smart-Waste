<!DOCTYPE html>
<html><body>
<?php
require 'connection.php';
$sql = "SELECT * FROM dumpster_data";

echo '<table cellspacing="5" cellpadding="5">
      <tr> 
        <td>ID</td> 
        <td>Latitude</td> 
        <td>Longitude</td>
        <td>Volume(%)</td>
        <td>Time</td>
      </tr>';
 
if ($result = $conn->query($sql)) {

    while ($row = $result->fetch_assoc()) {
        $row_id = $row["dumpster_id"];
        $row_lat = $row["lat"];
        $row_lng = $row["lng"];
        $row_vol = $row["volume"];
        $row_time = $row["timestamp"];
     
      
        echo '<tr> 
                <td>' . $row_id . '</td> 
                <td>' . $row_lat . '</td> 
                <td>' . $row_lng . '</td> 
                <td>' . $row_vol . '</td>
                <td>' . $row_time . '</td>
              
              </tr>';
    }
    $result->free();
}

$conn->close();
?> 
</table>
</body>
</html>