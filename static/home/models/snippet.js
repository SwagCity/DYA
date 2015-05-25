App.Models.Snippet = Backbone.Model.extend({
	initialize : function() {
		var children = this.get("children");
		if (children) {
			this.children = new App.Models.SnippetCollection(children);
			this.unset("children");
		}
	}
});

App.Models.SnippetCollection = Backbone.Collection.extend({
	model : App.Models.Snippet
})
