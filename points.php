<!DOCTYPE html>
<html><body>
<?php
require 'connection.php';
$sql = "SELECT * FROM col_points";

echo '<table cellspacing="5" cellpadding="5">
      <tr> 
        <td>ID</td> 
        <td>Latitude</td> 
        <td>Longitude</td>
        <td>Volume(%)</td>
      </tr>';
 
if ($result = $conn->query($sql)) {

    while ($row = $result->fetch_assoc()) {
        $row_id = $row["dumpster_id"];
        $row_lat = $row["lat"];
        $row_lng = $row["lng"];
        $row_vol = $row["volume"];
     
      
        echo '<tr> 
                <td>' . $row_id . '</td> 
                <td>' . $row_lat . '</td> 
                <td>' . $row_lng . '</td> 
                <td>' . $row_vol . '</td>
              
              </tr>';
    }
    $result->free();
}

$conn->close();
?> 
</table>
</body>
</html>