<?php
	error_reporting(1);

	$servername = "localhost";
	// REPLACE with your Database name
	$dbname = "id20650174_smartwaste";
	// REPLACE with Database user
	$username = "id20650174_admin1";
	// REPLACE with Database user password
	$password = "";


	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 
	echo "";

?>
