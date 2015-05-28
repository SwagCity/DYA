/*
 * Uses Marionette's CompositeView to recursively render the tree data structure.
 *
 * http://jsfiddle.net/derickbailey/AdWjU/ (NOTE : in main.js line 24, change from itemView to childView.)
 */


/*
 * A single node on the Story tree.
 * Contains a model of the contents,
 * which has a reference to a list of child nodes.
 *
 * Recursively rendered.
 */
App.Views.StoryNode = Marionette.CompositeView.extend({
	template : "#snippet-template",
	tagName : "span",
	childView : App.Views.StoryNode,

	ui : {
		content : ".snippet"
	},

	initialize : function() {

		// By not specifying the child view type, the CompositeView defaults to using itself as the child view.
		this.collection = this.model.children;
		this.el.id = this.model.attributes._id;
	},
	onRender : function() {
		this.ui.content[0].id = "content-"+this.model.attributes._id;
		this.model.region.$el.append(this.ui.content[0]);
		/*
		// I have no idea why this doens't actually work.
		$("#content-"+this.model.attributes._id).click(function() {
			App.viewStoryView.changeCurrentNode(this.model.attributes._id);
		});
		*/

		// Remove el from this.region.
	},
	renderRegion : function() {

	},

	// events
	events : {


	},
	modelEvents : {
		"change" : "renderNode"
	},
	renderNode : function() {
		//this.model.region.append(this.$el);
	}
})


/* Using a LayoutView, which allows on-the-fly creation of regions. */
App.Views.ViewStory = Marionette.LayoutView.extend({
	template : "#view-template",

	initialize : function() {

	},

	// Events

	modelEvents : {
		"change" : "updateChildren"
	},
	onRender : function() {
		// Declare regions
		this.addRegions({
			viewHiddenUpper			: "#view-hidden-upper",
			viewMainUpper			: "#view-main-upper",
			viewMain 				: "#view-main",
			viewMainLower			: "#view-main-lower",
			viewHiddenLower			: "#view-hidden-lower"
		});
		this.instantiateChildren();
	},
	updateChildren : function() {
		console.log("Updating children")

		// Recursive function to identify the regions where
		// each of the nodes will be rendered.
		console.log("RESTORING DEFAULTS")
		var setAllRegions = function(node, region) {
			App.DataManip.execAll(function(node) {
				node.region = region;
			})(node);
		}
		setAllRegions(this.model.story, this.viewHiddenUpper);
		this.model.currentNode.region = this.viewMain;
		if (this.model.currentNode.get("parent")){
			this.model.currentNode.get("parent").region = this.viewMainUpper;
		}
		if (this.model.currentNode.children) {
			if (this.model.currentNode.children.models) {
				for (var x=0; x<this.model.currentNode.children.models.length; x++) {
					(this.model.currentNode.children[n], this.viewHiddenLower);
					setAllRegions(this.model.currentNode.children.models[n], this.viewHiddenLower);
					this.model.currentNode.children.models[n].region = this.viewMainLower;
				}
			}

		}

		console.log("RENDERING VIEWS");

		App.testRegion.show(
			new App.Views.StoryNode({
				model : this.model.story
			})
		)
		/*
		App.DataManip.execAll(function(node) {
			var x = new App.Views.StoryNode({
				model : node
			})
			x.render();
		})(this.model.story);
		*/
	},
	instantiateChildren : function() {
		console.log("Instantiating children.")
		this.updateChildren();
	},
	changeCurrentNode : function(node_id) {
		// Changes the "currentNode" of the model.
		// Should fire off an event to rerender.
		this.model.currentNode = App.DataManip.findNode(this.model.story, node_id);
	}
})
