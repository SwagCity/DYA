

var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
var svgNS = svg.namespaceURI;

var circle = document.createElementNS(svgNS, 'circle');
circle.attr("cx", 30)
circle.attr("cy", 30)
circle.attr("r", 20)
circle.on("click", mouseClick);

svg.appendChild(cirle);
document.body.appendChild(svg);

var h=document.createElement('a');
var t=document.createtextNode('Hello');
h.appendChild(t);
document.body.appendChild(h);
