/*
 * Uses Marionette's CompositeView to recursively render the tree data structure.
 *
 * http://jsfiddle.net/derickbailey/AdWjU/ (NOTE : in main.js line 24, change from itemView to childView.)
 */

App.Views.StoryView = Marionette.CompositeView.extend({
	template : "#story-template",

	tagName : "ul",

	initialize : function() {
		// By not specifying the child view type, the CompositeView defaults to using itself as the child view.
		this.collection = this.model.children;
	},

	appendHtml : function(collectionView, itemView) {
		collectionView.$("li:first").append(itemView.el);
	}
})

