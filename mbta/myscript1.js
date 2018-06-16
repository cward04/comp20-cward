/* javascript file that centers map on South Station and places markers on map */

var stations = [
	['Alewife', 42.395428, -71.142483],
	['Davis', 42.39674, -71.121815],
	['Porter Square', 42.3884, -71.11914899999999],
	['Harvard Square', 42.373362, -71.118956],
	['Central Square', 42.365486, -71.103802],
	['Kendall/MIT', 42.36249079, -71.08617653],
	['Charles/MGH', 42.361166, -71.070628],
	['Park Street', 42.35639457, -71.0624242],
	['Downtown Crossing', 42.355518, -71.060225],
	['South Station', 42.352271, -71.05524200000001],
	['Broadway', 42.342622, -71.056967],
	['Andrew', 42.330154, -71.057655],
	['JFK/UMass', 42.320685, -71.052391],
	['North Quincy', 42.275275, -71.029583],
	['Wollaston', 42.2665139, -71.0203369],
	['Quincy Center', 42.251809, -71.005409],
	['Quincy Adams', 42.233391, -71.007153],
	['Braintree', 42.2078543, -71.0011385],
	['Savin Hill', 42.31129, -71.053331],
	['Fields Corner', 42.300093, -71.061667],
	['Shawmut', 42.29312583, -71.06573796000001],
	['Ashmont', 42.284652, -71.06448899999999],
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

	// Allows each marker to have an info window
	google.maps.event.addListener(marker, 'click', (function(marker, i){
		return function(){
			infoWindow.setContent(stations[i][0]);
			infoWindow.open(map, marker);
			}
		})(marker, i));
	}

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

}
