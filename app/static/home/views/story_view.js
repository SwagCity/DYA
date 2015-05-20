/*
 * Uses Marionette's CompositeView to recursively render the tree data structure.
 *
 * http://jsfiddle.net/derickbailey/AdWjU/ (NOTE : in main.js line 24, change from itemView to childView.)
 */

/* A single node on the Story tree */
App.Views.StoryNode = Marionette.CompositeView.extend({
	template : "#snippet-template",
	tagName : "span",
	childView : App.Views.StoryNode,

	initialize : function() {
		console.log(this.model.children);
		// By not specifying the child view type, the CompositeView defaults to using itself as the child view.
		this.collection = this.model.children;
		console.log(this.collection);

		this.el.id = this.model.attributes._id;
	}
})

/* Umbrella view encapsulating the tree. Contains triggers for re-rendering pages based on global changes. */
App.Views.ViewStory = Marionette.CompositeView.extend({
	template : "#story-template",
	childView : App.Views.StoryNode,

	initialize : function() {
		this.collection = this.model.story;
	}
})
