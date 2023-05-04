<?php
// connect to your database
 require('connection.php');



// get the form data

$_POST = json_decode(file_get_contents('php://input'), true);
if ($_SERVER["REQUEST_METHOD"] == "POST") 
{
    $lat = test_input($_POST["lat"]);
$lng= test_input($_POST["lng"]);

  // other form data

  //echo $lat;
  // insert into your database table
  $sql = "INSERT INTO coll_points(lat, lng ) VALUES ('" . $lat . "', '" . $lng . "')";
  
  if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
}

$conn->close();

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

?>