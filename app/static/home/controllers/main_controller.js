App.MainController = Marionette.Controller.extend({
	initialize : function(options) {
		console.log("Initializing controller...");
	},

	start : function() {
		console.log("Starting in controller...");
	},

	createStory : function() {
		console.log("CREATING A STORY")
	},

	editStory : function(story_id) {
		console.log("editing a story");
	},

	renderStory : function(story_id) {
		/* Run an AJAX call to retrieve the story from the server. */
		var data = {
			story : {
				"snippet" : "In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort."
			},
			children : [
				{
					"story" : "It had a perfectly round door like a porthole, painted green, with a shiny yellow brass knob in the exact middle. The door opened on to a tube-shaped hall like a tunnel: a very comfortable tunnel without smoke, with panelled walls, and floors tiled and carpeted, provided with polished chairs, and lots and lots of pegs for hats and coats - the hobbit was fond of visitors. The tunnel wound on and on, going fairly but not quite straight into the side of the hill - The Hill, as all the people for many miles round called it - and many little round doors opened out of it, first on one side and then on another. No going upstairs for the hobbit: bedrooms, bathrooms, cellars, pantries (lots of these), wardrobes (he had whole rooms devoted to clothes), kitchens, dining-rooms, all were on the same floor, and indeed on the same passage. The best rooms were all on the left-hand side (going in), for these were the only ones to have windows, deep-set round windows looking over his garden and meadows beyond, sloping down to the river.",
					"children" : []
				},
				{
					"story" : "The hole was empty.",
					"children" : []
				}
			]
		};

		App.mainRegion.show(new App.TreeView({
			model : data["story"]
		}))
	},

/*

	home : function() {
		App.headerRegion.show(new App.HeaderView())
		App.mainRegion.show(new App.HomeView({}));
		App.footerRegion.show(new App.FooterView())
	},
	portfolioRoute : function() {
		App.headerRegion.show(new App.HeaderView())
		App.mainRegion.show(new App.PortfolioView({}))
		App.footerRegion.show(new App.FooterView())
	}
	*/
})

App.addInitializer(function(options) {
	App.mainController = new App.MainController();
})
