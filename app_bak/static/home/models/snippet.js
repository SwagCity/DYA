// Umbrella model containing the entire snippet tree as well as some helper variables.
App.Models.Story = Backbone.Model.extend({
	initialize : function() {

		var story = this.get("story");
		this.story = new App.Models.Snippet(story);
		this.unset("story");

		// currentNode stores the ID of the current story in focus
		this.currentNode = this.story;

	}
})

// A single node
App.Models.Snippet = Backbone.Model.extend({
	initialize : function() {
		var children = this.get("children");
		if (children) {
			this.children = new App.Models.SnippetCollection(children);
			this.unset("children");
		}

	}
});

// Helper for encapsulating children of nodes
App.Models.SnippetCollection = Backbone.Collection.extend({
	model : App.Models.Snippet
})
