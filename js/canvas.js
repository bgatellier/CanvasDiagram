/*
 * Draw a beautiful red roadster.
 */
function drawRoadster(){
	var cnv_roadster = document.getElementById('cnv_roadster');
	
	if( cnv_roadster.getContext ){
		var ctx = cnv_roadster.getContext('2d');
		
		// Decor
		ctx.beginPath();
			var lingrad = ctx.createLinearGradient(0, 0, 0, 150);
			lingrad.addColorStop(0, '#00ABEB');		// Sky gradient, from 0 to (150*0.5)px
			lingrad.addColorStop(0.5, '#fff');
			lingrad.addColorStop(0.5, '#26C000');	// Background gradient, from (150*0.5)px to 150px
			lingrad.addColorStop(1, '#fff');
		  	ctx.fillStyle = lingrad;
		  	ctx.rect(0,0,300,113);
		ctx.fill();
		
		// Bodywork
		ctx.beginPath();
			ctx.fillStyle = "rgb(255,0,0)";
			ctx.moveTo(46,100);
			ctx.lineTo(30,100);									// Bas de caisse arrière
			ctx.quadraticCurveTo(0,100,0,50);
			ctx.lineTo(80,44);									// Coffre
			ctx.bezierCurveTo(80,46,84,50,86,50);
			ctx.lineTo(180,50);
			ctx.quadraticCurveTo(178,40,160,26);				// Pare-brise intérieur
			ctx.quadraticCurveTo(190,30,200,50);				// Pare-brise extérieur
			ctx.bezierCurveTo(250,60,298,76,300,100);			// Capot
			ctx.lineTo(240,100);								// Bas de caisse avant
			ctx.arc(216,91,25,Math.PI*(1/8),Math.PI*7/8,true);	// Passage de roue avant
			ctx.arc(70,91,25,Math.PI*(1/8),Math.PI*7/8,true);	// Passage de roue arrière
		ctx.fill();

		// Front wheel
		ctx.beginPath();
			ctx.fillStyle = "rgb(0,0,0)";
			ctx.arc(216,91,22,0,Math.PI*2,true);
		ctx.fill();

		// Back wheel
		ctx.beginPath();
			ctx.arc(70, 91, 22, 0, Math.PI*2, true);	// Color will be the last defined by ctx.fillStyle
		ctx.fill();
		
		// Road
		ctx.beginPath();
			ctx.rect(0,112,300,150);	// Color will be the last defined by ctx.fillStyle
		ctx.fill();
	}
	else{
		alert("Sorry, but your web browser doesn't support this feature (HTML5 Canvas API).\nIt's time to try Mozilla Firefox (@ http://www.mozilla-europe.org/fr/firefox/) !");
	}
}


/*
 * Update the diagram according to the data in the table.
 * @param _elementId HTML id attribute for the canvas where render the diagram.
 */
function updateDiagram(_elementId, data){
	var nb_values = nb_char_value = max_value = 0;
	var bar_height = bar_width = 0;
	var ratio = 4;
	var cnv_stats = document.getElementById(_elementId);
	
	nb_values = data.length;
	max_value = parseFloat(data[0]);	// Set the first max value
	for(var index in data){
		var current_value = parseFloat(data[index]);
		
		if(current_value>max_value){
			max_value = current_value;
		}
	}

	// Round the maximum off
	max_value = Math.floor(max_value);
	nb_char_value = String(max_value).length;
	max_value = (Math.floor(max_value/Math.pow(10,nb_char_value-1))+1)*Math.pow(10,nb_char_value-1);
		
	// Bar width and horizontal bar space calculation (in pixels)
	bar_width = cnv_stats.width/(nb_values+(nb_values+1)/ratio);
	bar_width.toFixed(0);
	space_width = (bar_width/ratio).toFixed(0);
	
	// Creation of the diagram
	if( cnv_stats.getContext ){
		var ctx = cnv_stats.getContext('2d');
		// Clear the canvas
		ctx.clearRect(0, 0, cnv_stats.width, cnv_stats.height);

		// Creation of the background grey grid
		var palier_horizontal = Math.pow(10, nb_char_value-1)/2;
		ctx.beginPath();
		for(var i=palier_horizontal ; i<max_value ; i+=palier_horizontal){
			ctx.moveTo(0, i*cnv_stats.height/max_value);
			ctx.lineTo(cnv_stats.width, i*cnv_stats.height/max_value);
		}
		ctx.stroke();
			
		// Creation of the vertical bars
		for(var i=0 ; i<nb_values ; i++){
			var bar_height = (cnv_stats.height*data[i]/max_value).toFixed(0);
			
			// Switch color
			if( i%2==0 )	ctx.fillStyle = 'rgba(50,150,0,0.8)';
			else			ctx.fillStyle = 'rgba(0,100,180,0.8)';
			
			// Display bar
			ctx.fillRect(i*space_width+i*bar_width, cnv_stats.height-bar_height, bar_width, bar_height);
		}
	}
	else{
		alert("Sorry, but your web browser doesn't support this feature (HTML5 Canvas API).\nIt's time to try Mozilla Firefox (@ http://www.mozilla-europe.org/fr/firefox/) !");
	}
}