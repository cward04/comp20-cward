// JavaScript to parse the JSON data

function parse(){

	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("messages").innerHTML = this.responseText;

			var obj = this.responseText;
			var dataset = JSON.parse(obj);
			var lineOne = dataset[0].content + " " + dataset[0].username;
			var lineTwo = dataset[1].content + " " + dataset[1].username;

			document.getElementById("messages").innerHTML = lineOne + "<br />" + lineTwo;
		}
	};

	xhttp.open("GET", "data.json", true);
	xhttp.send();
}