/*
 * Uses Marionette's CompositeView to recursively render the tree data structure.
 *
 * http://jsfiddle.net/derickbailey/AdWjU/ (NOTE : in main.js line 24, change from itemView to childView.)
 */

/* A single node on the Story tree */
App.Views.Story = Marionette.CompositeView.extend({
	template : "#snippet-template",

	tagName : "ul",

	initialize : function() {
		// By not specifying the child view type, the CompositeView defaults to using itself as the child view.
		this.collection = this.model.children;
	},

	appendHtml : function(collectionView, itemView) {

	}
})

App.Views.StoryTree = Marionette.CollectionView.extend({
	childView : App.Views.StoryNode
})
