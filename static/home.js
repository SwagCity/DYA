
storyJSON = d3.json("../static/stories.json", function(error, storyData){
    
    var totalStories = 0;
    
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

    visit(storyData, function(d) {
	totalStories++;
    });

    console.log(totalStories);
	  
});
