var circles = [];
var s = [];


var mouseClick = function(evt){
    var circle = evt.target;
    for (i=0;i<circles.length;i++){
	var current = s[i];
	if (current == circle)
	    current.setAttribute('r','120');
	    
	else
	    current.setAttribute('r','70');
    }
}


var data = [140,340,540];


var drawCircle = function(y){
    return {
	y:y,
	
	drawC : function(){
	    var svg = document.getElementsByTagName('svg')[0];
	    var svgNS = svg.namespaceURI;

	    var circle = document.createElementNS(svgNS,'circle');
	    circle.setAttribute('cx', '170');
	    circle.setAttribute('cy', y);
	    circle.setAttribute('r', '70');	    
	    circle.setAttribute('fill','#95B3D7');
	    circle.addEventListener("click",mouseClick);
	    s.push(circle);
	    svg.appendChild(circle);
	},
    }
}



function drawf(){
    for (var i = 0; i < data.length; i ++){
	circles.push(drawCircle(data[i]));
    }
    for (var i =0 ; i <circles.length;i++){
	circles[i].drawC()
    }
}

$( document ).ready( drawf );
