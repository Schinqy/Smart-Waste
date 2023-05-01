			var height=0; 
      	var map;
      	var waypoints;
      	var vol;
		let myChart = null;
		var arrayTime2;
		var arrayVol = [];
		var latDS;
		var lngDS;
							var arrayTime = [];
	
		

      	function initMap() {
        	  	var mapLayer = document.getElementById("map"); 
            	var centerCoordinates = new google.maps.LatLng(-17.8390116, 31.0075234);
        		var defaultOptions = { center: centerCoordinates, zoom: 8 }
        		map = new google.maps.Map(mapLayer, defaultOptions);
	
            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer;
            directionsDisplay.setMap(map);

            $("#drawPath").on("click",function() {
				map = null;
                    //var start ="-17.8390116, 31.0075234";
					var start = latDS + "," + lngDS;
					

                    var end = "-17.835279, 31.003322";
                    drawPath(directionsService, directionsDisplay,start,end);
              
            });
			
		$("#zoomDS").on("click",function() {
			map = null;
			console.log(latDS);
			console.log(lngDS);
			 var myLatlng = new google.maps.LatLng(latDS, lngDS);
        var mapOptions = {
          zoom: 15,
          center: myLatlng
        }
		
		var icon = {
    url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    scaledSize: new google.maps.Size(50, 50)
};

         map = new google.maps.Map(document.getElementById("map"), mapOptions);
        var marker = new google.maps.Marker({
          position: myLatlng,
          title:"Dumpster ID #63-01" ,
		  icon: icon
        });
		marker.setMap(map);
		marker.setAnimation(google.maps.Animation.BOUNCE);
		
		 const contentString = "<a> Dumpster ID #63-01 </a><a>" + vol + "% Full </a>";
  const infowindow = new google.maps.InfoWindow({
    content: contentString,
    ariaLabel: "Uluru",
  });


  marker.addListener("click", () => {
    infowindow.open({
      anchor: marker,
      map,
    });
  });
	    });	
		
            
      	}
        	function drawPath(directionsService, directionsDisplay,start,end) {
            directionsService.route({
           origin: latDS + "," + lngDS,
  destination: '-17.835279, 31.003322',
  waypoints: [
    {
      location: '-17.836702, 31.005811',
      stopover: true
    },{
      location: '-17.840695, 31.005056',
      stopover: true
    },{
      location: '-17.841261, 31.001172',
      stopover: true
    },{
      location: '-17.838923, 30.999000',
      stopover: true
    }],
  provideRouteAlternatives: false,
  travelMode: 'DRIVING',
  optimizeWaypoints: true,
            }, function(response, status) {
                if (status === 'OK') {
                directionsDisplay.setDirections(response);
                } else {
                window.alert('Problem in showing direction due to ' + status);
                }
            });
      }



window.initMap = initMap;



function getDatah(){
     
           $.ajax({ 

        method: "GET", 
        mode: 'cors',
        url: "https://zambuko.000webhostapp.com/dumpsterdata2json.php",

      }).done(function( data ) { 

         var result = JSON.stringify(data);

        var resultt = JSON.parse(result);

        $.each( resultt, function( key, value ) { 
            
            //alert(result);
        
  
       vol = value['volume'];
	   latDS = value['lat'];
	   lngDS = value['lng'];
      
      }); 
 


			




	
     
var elem = document.getElementById("trash-level");
	var elem2 = document.getElementById("status");
    //height = height + 10;
    height = vol;
    var heightvh;
heightvh= (vol/100)*70;

        elem.style.height = heightvh + "vh";
	if(height<80){
	     elem.style.background = "blue";
        elem.innerHTML = " <h4 class='m-2 text-bold'>" + height  + "% Full </h4>";
		elem2.innerHTML="";
		elem2.innerHTML = " <i class='fa-solid fa-thumbs-up mt-2' style='color: green'> Levels Good - "  + height  + "% </i>";
	}
	else
	{     elem.style.background = "red";
		elem.innerHTML = "<h4 class='m-2 text-bold'>" + height  + "% Full (Take Action) </h4>";
		elem2.innerHTML = "<i id='status' class='fas fa-triangle-exclamation fa-fade mt-2' style='color: red'>" + height + " full. Empty the Dumpster </i> ";
	}
         
            });
}
            $(document).ready(function () {
                $("#myModal").on('shown.bs.modal', function () {
                    $.ajax({
                        url: 'https://zambuko.000webhostapp.com/tochart.php',
                        type: 'GET',
						mode: 'cors',
                        dataType: 'json',
                        success: function (data) {
							
							
							
							data.forEach(item => {
			  			const {
			  				volume,
							timestamp
			  			} = item;
			arrayVol.push(volume);
			arrayTime.push(timestamp);
			


			});
              arrayTime2= arrayTime.map(date => date.split(' ')[1]);
			console.log(arrayTime);
			console.log(arrayTime2);
			console.log(arrayVol);
			  
							
					                       	if(myChart !=null)
											{												
										myChart.destroy();
                                     
									 }		
							var config = {
    type: 'line',
    
    data: {
        labels: arrayTime2.reverse(),
        datasets: [{
            label: 'Volume vs Time',
            data: arrayVol.reverse(),
              backgroundColor: 
          'rgba(255, 26, 104, 0.2)',
        borderColor: 
          'rgba(255, 26, 104, 1)',
        //tension: 0.4,
		yAxisID: 'y'
        }]
    },
    options: {
		animations: {
        animation: false
    },
        maintainAspectRatio: false,
     scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Volume(%)'
                }
            }
        }
    
    }
};


								
							myChart = new Chart(document.getElementById('myChart'),config);
                        //    var ctx = document.getElementById("myChart").getContext('2d');
							
                            
 
  
	

						}
                    });
                });
            });


$(document).ready(function(){

setInterval(getDatah, 2000);
});



     
      $("#addDumpster").on("click",function() {
		  
		  console.log("Clicked");
			getLatLng();
			
              
            });
			
			
			 function getLatLng() {
  const myLatlng = { lat: -17.8216, lng: 31.092 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
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
    // Create a new InfoWindow.
    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    });
    infoWindow.setContent(
      JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
    );
    infoWindow.open(map);
  });
}

//window.getLatLng = getLatLng; 