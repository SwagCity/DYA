var circles = [];

var mouseClick = function(evt){
    console.log("hello");
    var circle = evt.target;
    var cRadius = circle.getAttribute("r");
    if (cRadius < 100)
	circle.setAttribute("r", '120');
    else
	circle.setAttribute("r", '70');
}

function draw() {
    var svg = document.getElementsByTagName('svg')[0];
    var svgNS = svg.namespaceURI;

    var rect = document.createElementNS(svgNS,'rect');
    rect.setAttribute('x',5);
    rect.setAttribute('y',5);
    rect.setAttribute('width',100);
    rect.setAttribute('height',36);
    rect.setAttribute('fill','#95B3D7');

    svg.appendChild(rect);
}

var data = [140,340,540];



var drawCircle = function(x,y,r){
    return {
	x:x,
	
	drawC : function(){
	    var svg = document.getElementsByTagName('svg')[0];
	    var svgNS = svg.namespaceURI;

	    var circle = document.createElementNS(svgNS,'circle');
	    circle.setAttribute('cx', x);
	    circle.setAttribute('cy', '70');
	    circle.setAttribute('r', '70');	    
	    circle.setAttribute('fill','#95B3D7');
	    circle.addEventListener("click",mouseClick);
	    
	    svg.appendChild(circle);
	    console.log('hello');
	}	
    }
}



function drawf(){
    for (var i = 0; i < data.length; i ++){
	circles.push(drawCircle(data[i]));
	console.log('wassup');
    }
    for (var i =0 ; i <circles.length;i++){
	circles[i].drawC()
    }
}

$( document ).ready( drawf );
