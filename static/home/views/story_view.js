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
		content : ".snippet",
		script : "script"
	},

	initialize : function() {
		// By not specifying the child view type, the CompositeView defaults to using itself as the child view.
		this.collection = this.model.children;
		this.el.id = this.model.get("_id");
	
		this.ui.all = this.model.get("_id");

		this.first = true;
	},
	onBeforeRender : function() {
	
	},
	onRender : function() {
		console.log("onrender")
		var id = this.model.get("_id"),
			$content = $("#content-"+id),
			history = this.model.history;
		;
		

		this.ui.content[0].id = "content-"+id;
		if (this.model.region.el != "#view-main") {
			this.ui.content[0].onclick = function() {
				App.viewStoryView.changeCurrentNode(id)
			};
		}
		this.model.region.$el.append(this.ui.content);

		// Animations
	
		if (history) {
			this.ui.script[0].innerHTML = 
				"console.log($('#content-" + id + "').offset().top - App.DataManip.findNode(App.viewStoryView.model.story, '" + id + "').history.offsetTop);\n"+
				"$('#content-" + id + "')\n" +
				".css('top', App.DataManip.findNode(App.viewStoryView.model.story, '" + id + "').history.offsetTop - $('#content-" + id + "').offset().top)\n" + 
				".css('left',  App.DataManip.findNode(App.viewStoryView.model.story, '" + id + "').history.offsetLeft - $('#content-" + id + "').offset().left)\n" + 
				".animate({'top':'0px','left':'0px'});";	

			this.model.region.$el.append(this.ui.script)
		}
		
		this.first = false;
	},
	onShow : function() {
		
	},

	renderRegion : function() {

	},
	// events
	events : {
		'click .snippet' : "changeCurrentNode"
	},
	modelEvents : {
		"change" : "renderNode"
	},
	renderNode : function() {
		//this.model.region.append(this.$el);
	},

	changeCurrentNode : function() {
		console.log("child change current node")
		this.triggerMethod('change:currentNode', this.model.attributes._id);
	}
})


/* Using a LayoutView, which allows on-the-fly creation of regions. */
App.Views.ViewStory = Marionette.LayoutView.extend({
	template : "#view-template",

	initialize : function() {
		this.root = new App.Views.StoryNode({
			model : this.model.story
		})
	},

	// Events

	modelEvents : {
		"change" : "updateChildren"
	},
	childEvents: {
		render : function(childView) {
			console.log("a childview has been rendered");
		}, 
		"change:currentNode" : "changeCurrentNode"
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

		// Resets each of the 5 regions to nothing.		
		App.DataManip.execAll(function(node) {
			// Save history first
			try {
				node.history = {};
				node.history.Region = node.region;
				node.history.offsetLeft = $("#content-"+node.get("_id")).offset().left;
				node.history.offsetTop = $("#content-"+node.get("_id")).offset().top;
			} catch (err) {
				node.history = undefined;
			}
		})(this.model.story);
		this.viewHiddenUpper.$el.empty();
		this.viewMainUpper.$el.empty();
		this.viewMain.$el.empty();
		this.viewMainLower.$el.empty();
		this.viewHiddenLower.$el.empty();

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

		if (this.model.currentNode.get("parent_id")){
			App.DataManip.findNode(this.model.story, this.model.currentNode.get("parent_id")).region = this.viewMainUpper;
		}
		if (this.model.currentNode.children) {
			if (this.model.currentNode.children.models) {
				for (var x=0; x<this.model.currentNode.children.models.length; x++) {
					setAllRegions(this.model.currentNode.children.models[x], this.viewHiddenLower);
					this.model.currentNode.children.models[x].region = this.viewMainLower;
				}
			}
		}

		console.log("RENDERING VIEWS");
		this.root.render();



		App.DataManip.execAll(function(node) {
		    $("#content-" + node.get("_id")).on("keydown", function() {
				App.viewStoryView.changeCurrentNode(node.get("_id"));
			})
		})(this.model.story);
	},
	instantiateChildren : function() {
		console.log("Instantiating children.")
		this.updateChildren();
	},
	changeCurrentNode : function(node_id) {
		// Changes the "currentNode" of the model.
		// Should fire off an event to rerender.
		this.model.currentNode = App.DataManip.findNode(this.model.story, node_id);

		// I thought that marionette's views were supposed to be
		// very good at responding to events based on backbone
		// models, but I guess I was mistaken.
		this.updateChildren();
	}
})
