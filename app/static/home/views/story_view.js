/*
 * Uses Marionette's CompositeView to recursively render the tree data structure.
 *
 * http://jsfiddle.net/derickbailey/AdWjU/ (NOTE : in main.js line 24, change from itemView to childView.)
 */

/* A single node on the Story tree */
App.Views.StoryNode = Marionette.CompositeView.extend({
	template : "#snippet-template",

	initialize : function() {
		// By not specifying the child view type, the CompositeView defaults to using itself as the child view.
		this.collection = this.model.children;

		this.el.id = this.model.attributes._id;
	},

	// Callbacks on actions in the DOM
	events : {

	},
	toggleChildView : function() {

	},

	// Callbacks on changes to the Backbone collections
	collectionEvents : {
		"add" : "modelAdded",
	},
	modelAdded : function() {}
})

App.Views.StoryTree = Marionette.CollectionView.extend({
	childView : App.Views.StoryNode
})
