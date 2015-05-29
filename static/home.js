
storyJSON = d3.json("../static/stories.JSON", function(error, storyData){
    
    var totalStories = 0;
    
    function count(data){
	var total = 0;
	for (var i = 0; i < data.length; i++){
	    total++;
	}
	return total;
	
    }

    function visit(parent, visitFn, childrenFn) {
        if (!parent) return;

        visitFn(parent);

        var children = childrenFn(parent);
        if (children) {
            var count = children.length;
            for (var i = 0; i < count; i++) {
                visit(children[i], visitFn, childrenFn);
            }
        }
    }

    totalStories = count(storyData);
    
    console.log(totalStories);
	
    var ul = d3.select("#storyList").selectAll("ul")
	.data(storyData)
	.enter()
	.append("ul")

    var li = ul.selectAll("li")
	.data(function(d){return d;})
	.enter()
	.append("li")
	.text(function(d) {return d.descr;});
    
    
});
		    
