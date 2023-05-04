var Lat;
var Lng;
var id;
var LatLng;
var dataq;
 
 
 
      $("#addDumpster").on("click",function() {
		  
		  console.log("Clicked");
			getLatLng();
			
              
            });
			
			
			 function getLatLng() {
  const myLatlng = { lat: -17.8216, lng: 31.092 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: myLatlng,
  });
  // Create the initial InfoWindow.
  let infoWindow = new google.maps.InfoWindow({
    content: "Click the map to get Lat/Lng!",
    position: myLatlng,
  });

  infoWindow.open(map);
  // Configure the click listener.
  map.addListener("click", (mapsMouseEvent) => {
    // Close the current InfoWindow.
    infoWindow.close();
		LatLng = JSON.stringify(mapsMouseEvent.latLng.toJSON());
	console.log(LatLng);
	var LatLngObj = JSON.parse(LatLng);
// Get the latitude
    Lat = LatLngObj.lat;

// Get the longitude
    Lng = LatLngObj.lng;
	var contentString = Lat.toFixed(6) + " , " + Lng.toFixed(6);
    // Create a new InfoWindow.
    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    });
    infoWindow.setContent(
      contentString
    );

	//console.log(JSON.stringify(LatLng.lat));
	



// Print the values
console.log("Latitude: " + Lat);
console.log("Longitude: " + Lng);
    
	//Add info to form
	
	document.getElementById("latitude").value = Lat.toFixed(6);
	document.getElementById("longitude").value = Lng.toFixed(6);


    infoWindow.open(map);
  });
}


window.getLatLng = getLatLng;


      $("#submit").on("click", function () {
      	validateForm();
      

      });





function validateForm(){
	document.getElementById("status").innerHTML = "...wait a sec";
	let url = "/api/save_ds.php";
var dataaa =  JSON.parse('{"lat":' + Lat + ',"lng":' + Lng + '}');
console.log(dataaa);
	
	
$.ajax({
    type: 'POST',
    url: url,
    data: JSON.stringify(dataaa),
    contentType: "application/json",
    dataType: 'text',
    success: function(response) {
        console.log("Server response:", response);
		document.getElementById("status").innerHTML = response;
		
displayList();
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log("Error:", textStatus, errorThrown);
    }
});
}




function displayList(){
    
    	$.ajax({
      		// url: "https://raw.githubusercontent.com/Schinqy/CropGPT/main/fertilizer.txt",
      		url: "/api/ds_data.php",
      		async: false,
      		success: function (data) {
				
				dataq = JSON.parse(data);
      		},
      		dataType: "text",
      		complete: function () {
      			//document.getElementById("deta").innerHTML = datah;
      			// call a function on complete 
      			//document.getElementById("deta2").innerHTML = JSON.stringify(data[0]);
      		}
      	});
    
    
    
var ul = document.createElement("ul");

// Loop through the array and append list items
for (var i = 0; i < dataq.length; i++) {
  var li = document.createElement("li");
  li.innerHTML = "id:" + dataq[i].dumpster_id + " | location: [" + dataq[i].lat + ", " + dataq[i].lng + "]";
  ul.appendChild(li);
}
var y = document.getElementById("listx");
// Add the list element to the document body
y.innerHTML = "";
y.appendChild(ul);
}

displayList();
