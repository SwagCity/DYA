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


var data = [140,340,540];



var drawCircle = function(x,y,r){
    return {
	x:x,
	
	drawC : function(){
	    var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
	    circle.setAttributeNS(null,'cx', x);
	    circle.setAttributeNS(null,'cy', '70');
	    circle.setAttributeNS(null,'r', '70');	    
	    circle.setAttributeNS(null,'fill','#95B3D7');
	    circle.setAttributeNS(null,'visibility','visible');
	    circle.addEventListener("click",mouseClick);
	    
	    console.log('hello');
	}	
    }
}



function draw(){
    for (var i = 0; i < data.length; i ++){
	circles.push(drawCircle(data[i]));
	console.log('wassup');
    }
    for (var i =0 ; i <circles.length;i++){
	circles[i].drawC()
    }
}

$( document ).ready( draw );
