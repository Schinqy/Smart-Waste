<?php

/*
  This is used by SIM808 to send data to the database via 000webhost server
*/
// If you change this value, the Arduino sketch needs to match
$api_key_value = "tPmAT5Ab3j7F9";

$api_key= $id = $latitude = $longitude = $vol = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $api_key = test_input($_POST["api_key"]);
    if($api_key == $api_key_value) {
        $id = test_input($_POST["id"]);
        $latitude = test_input($_POST["lat"]);
        $longitude = test_input($_POST["lng"]);
        $vol = test_input($_POST["volume"]);
       
        
      require 'connection.php';
        
        $sql = "INSERT INTO dumpster_data (dumpster_id, lat, lng, volume )
        VALUES ('" . $id . "', '" . $latitude . "', '" . $longitude . "', '" . $vol . "')";
        
        if ($conn->query($sql) === TRUE) {
            echo "New record created successfully";
        } 
        else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    
        $conn->close();
    }
    else {
        echo "Wrong API Key provided.";
    }

}
else {
    echo "No data posted with HTTP POST.";
}

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}