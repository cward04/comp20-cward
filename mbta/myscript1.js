/* javascript file that centers map on South Station and places markers on map */

var stations = [
	['Alewife', 42.395428, -71.142483, 'place-alfcl'],
	['Davis', 42.39674, -71.121815, 'place-davis'],
	['Porter Square', 42.3884, -71.11914899999999, 'place-portr'],
	['Harvard Square', 42.373362, -71.118956, 'place-harsq'],
	['Central Square', 42.365486, -71.103802, 'place-cntsq'],
	['Kendall/MIT', 42.36249079, -71.08617653, 'place-knncl'],
	['Charles/MGH', 42.361166, -71.070628, 'place-chmnl'],
	['Park Street', 42.35639457, -71.0624242, 'place-pktrm'],
	['Downtown Crossing', 42.355518, -71.060225, 'place-dwnxg'],
	['South Station', 42.352271, -71.05524200000001, 'place-sstat'],
	['Broadway', 42.342622, -71.056967, 'place-brdwy'],
	['Andrew', 42.330154, -71.057655, 'place-andrw'],
	['JFK/UMass', 42.320685, -71.052391, 'place-jfk'],
	['North Quincy', 42.275275, -71.029583, 'place-nqncy'],
	['Wollaston', 42.2665139, -71.0203369, 'place-wlsta'],
	['Quincy Center', 42.251809, -71.005409, 'place-qnctr'],
	['Quincy Adams', 42.233391, -71.007153, 'place-qamnl'],
	['Braintree', 42.2078543, -71.0011385, 'place-brntn'],
	['Savin Hill', 42.31129, -71.053331, 'place-shmnl'],
	['Fields Corner', 42.300093, -71.061667, 'place-fldcr'],
	['Shawmut', 42.29312583, -71.06573796000001, 'place-smmnl'],
	['Ashmont', 42.284652, -71.06448899999999, 'place-asmnl'],
];

function init() {
			
	// Sets up map
	var myOptions = {
		zoom: 13,
		center: new google.maps.LatLng(42.352271, -71.05524200000001),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
				
	// Create the map in the "map_canvas" <div>
	var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	var infoWindow = new google.maps.InfoWindow(), marker, i;

	// places markers into the map
	for(var i = 0; i < stations.length; i++){
		var position = new google.maps.LatLng(stations[i][1], stations[i][2]);
		var marker = new google.maps.Marker({
			position: position,
			map: map,
			icon: {
				url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
			}
		});

		// sets each marker to have an info window of train times
		google.maps.event.addListener(marker, 'click', (function(marker, i){
			return function(){


				// to read in the JSON reads, looping through the stations array for link to data
				var request = new XMLHttpRequest();
				request.open("GET", 'https://mbtalab3.herokuapp.com/redline/schedule.json/?stop_id=' + stations[i][3], true);

				request.onreadystatechange = function() {
					if(request.readyState == 4 && request.status == 200) {
						var theString = request.responseText;
						var json = JSON.parse(theString);

						var schedule = '';
						for(var j = 0; j < (json.data).length; j++){
							if(json.data != null && (json.data).length > 0){
								schedule = schedule + '<br />' + 'Train ' + '' + (j+1) + ' Arrival: ' + json.data[j].attributes.arrival_time + '; Train ' + '' + (j+1) + ' Departure: ' + json.data[j].attributes.departure_time;
								if(json.data[j].attributes.direction_id == '0')
									schedule = schedule + '. (Southbound)';
								if(json.data[j].attributes.direction_id == '1')
									schedule = schedule + '. (Northbound)';
							}
							else
								schedule = 'No times to display';
						}

						// assign each marker info from the string or do it below
						var stationContents = stations[i][0] + '<br />' + '<br />' + schedule;
						infoWindow.setContent(stationContents);
						infoWindow.open(map, marker);
					}
				};
				request.send();
			}
		})(marker, i));
	}


	// traces the poly lines onto the map connecting each station
	var trainPath = new google.maps.Polyline({
		path: [
			{lat: stations[0][1], lng: stations[0][2]}, 
			{lat: stations[1][1], lng: stations[1][2]},
			{lat: stations[2][1], lng: stations[2][2]},
			{lat: stations[3][1], lng: stations[3][2]},
			{lat: stations[4][1], lng: stations[4][2]},
			{lat: stations[5][1], lng: stations[5][2]},
			{lat: stations[6][1], lng: stations[6][2]},
			{lat: stations[7][1], lng: stations[7][2]},
			{lat: stations[8][1], lng: stations[8][2]},
			{lat: stations[9][1], lng: stations[9][2]},
			{lat: stations[10][1], lng: stations[10][2]},
			{lat: stations[11][1], lng: stations[11][2]},
			{lat: stations[12][1], lng: stations[12][2]}
			],
		geodesic: true,
		strokeColor: '#FF0000',
		strokeOpacity: 1.0,
		strokeWeight: 2
	});
	trainPath.setMap(map);

	var trainSplitOne = new google.maps.Polyline({
		path: [
		{lat: stations[12][1], lng: stations[12][2]},
		{lat: stations[13][1], lng: stations[13][2]},
		{lat: stations[14][1], lng: stations[14][2]},
		{lat: stations[15][1], lng: stations[15][2]},
		{lat: stations[16][1], lng: stations[16][2]},
		{lat: stations[17][1], lng: stations[17][2]}
		],
		geodesic: true,
		strokeColor: '#FF0000',
		strokeOpacity: 1.0,
		strokeWeight: 2
	});
	trainSplitOne.setMap(map);

	var trainSplitTwo = new google.maps.Polyline({
		path: [
		{lat: stations[12][1], lng: stations[12][2]},
		{lat: stations[18][1], lng: stations[18][2]},
		{lat: stations[19][1], lng: stations[19][2]},
		{lat: stations[20][1], lng: stations[20][2]},
		{lat: stations[21][1], lng: stations[21][2]}
		],
		geodesic: true,
		strokeColor: '#FF0000',
		strokeOpacity: 1.0,
		strokeWeight: 2
	});
	trainSplitTwo.setMap(map);


	// Determines location and places pin on map
	navigator.geolocation.getCurrentPosition(function(somePos){
		var userLat = somePos.coords.latitude;
		var userLng = somePos.coords.longitude;
		
		var userPosition = new google.maps.LatLng(userLat, userLng);
		var userMarker = new google.maps.Marker({
			position: userPosition,
			map: map,
		});

		// Determine closest MBTA Station
		for(var i = 0; i < stations.length; i++){
			var stationsLatLng = new google.maps.LatLng(stations[i][1], stations[i][2]);
			var distance = google.maps.geometry.spherical.computeDistanceBetween(userPosition, stationsLatLng);
			var min;
			var closestStation;

			if(i == 0){
				min = distance;
			}
			if(distance < min){
				min = distance;
				closestStation = stations[i][0];
				closestStationLat = stations[i][1];
				closestStationLng = stations[i][2];
			}
		}

		// Adding the closest subway location to the map
		min = min * 0.000621371192;
		var string = "Closest MBTA Red Line Station: " + closestStation + "<br />" + "Distance to Closest Station: " + '' + min + " miles";
		userMarker.setTitle(string);
	
		// Info window for user location icon
		google.maps.event.addListener(userMarker, 'click', function(){
			infoWindow.setContent(userMarker.title);
			infoWindow.open(map, userMarker);
		});

		// draw polyline to closest station onto map
		var closestPath = new google.maps.Polyline({
			path: [
			{lat: userLat, lng: userLng},
			{lat: closestStationLat, lng: closestStationLng},
			],
			geodesic: true,
			strokeOpacity: 1.0,
			strokeWeight: 2
			});
		closestPath.setMap(map);
	});

}







