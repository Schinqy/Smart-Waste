			var height=0; 
      	var map;
      	var waypoints;
      	function initMap() {
        	  	var mapLayer = document.getElementById("map"); 
            	var centerCoordinates = new google.maps.LatLng(28.6139, 77.2090);
        		var defaultOptions = { center: centerCoordinates, zoom: 8 }
        		map = new google.maps.Map(mapLayer, defaultOptions);
	
            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer;
            directionsDisplay.setMap(map);

            $("#drawPath").on("click",function() {
                    var start ="28.6139, 77.2090";
                    var end = "28.6839, 77.2090";
                    drawPath(directionsService, directionsDisplay,start,end);
              
            });
            
      	}
        	function drawPath(directionsService, directionsDisplay,start,end) {
            directionsService.route({
           origin: 'Chicago, IL',
  destination: 'Chicago, IL',
  waypoints: [
    {
      location: 'Joplin, MO',
      stopover: true
    },{
      location: 'Oklahoma City, OK',
      stopover: true
    }],
  provideRouteAlternatives: false,
  travelMode: 'DRIVING',
            }, function(response, status) {
                if (status === 'OK') {
                directionsDisplay.setDirections(response);
                } else {
                window.alert('Problem in showing direction due to ' + status);
                }
            });
      }



window.initMap = initMap;


$(document).ready(function(){
 $("#zoomDS").click(function() {
var elem = document.getElementById("trash-level");
    height = height + 10;
    var heightvh;
heightvh= (height/100)*70;

        elem.style.height = heightvh + "vh";
	if(height<80){
        elem.innerHTML = " <h4 class='m-2 text-bold'>" + height  + "% Full </h4>";
	}
	else
	{     elem.style.background = "red";
		elem.innerHTML = "<h4 class='m-2 text-bold'>" + height  + "% Full (Take Action) </h4>";
	}
         
            });
			 });
			 