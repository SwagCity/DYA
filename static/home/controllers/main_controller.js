var MainController = Marionette.Controller.extend({
	initialize : function(options) {
		console.log("Initializing controller...");
		this.currentStory = undefined;		// The id of the story currently being viewed.
	},

	// Functions corresponding to url changes
	start : function() {
		console.log("Starting in controller...");
	},
	home : function() {
		console.log("WE'RE HOME")
		App.homeView = App.Views.HomeView();
		App.mainRegion.show(App.homeView);
	},
	createStory : function() {
		console.log("CREATING A STORY")
	},
	editStory : function(story_id) {
		App.loadTreeJSON(story_id);
		App.editStoryView = new App.Views.EditView();
		App.mainRegion.show(App.editStoryView);
	},
	renderAll : function() {
		console.log("render all");
	},
	renderStory : function(story_id) {
		/* Run an AJAX call to retrieve the story from the server. */
/*
		var data = {
			"story" : {
				"_id": "toplevel2",
				"title" : "The Hole in the Ground",
				"snippet" : "In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort.",
				"children" : [
					{
						"title" : "A Perfectly Round Door",
						"snippet" : "It had a perfectly round door like a porthole, painted green, with a shiny yellow brass knob in the exact middle. The door opened on to a tube-shaped hall like a tunnel: a very comfortable tunnel without smoke, with panelled walls, and floors tiled and carpeted, provided with polished chairs, and lots and lots of pegs for hats and coats - the hobbit was fond of visitors.",
						"_id" : "secondlevel1",
						"children" : [
						{
							"title" : "The Hill",
							"snippet" : "The tunnel wound on and on, going fairly but not quite straight into the side of the hill - The Hill, as all the people for many miles round called it - and many little round doors opened out of it, first on one side and then on another. No going upstairs for the hobbit: bedrooms, bathrooms, cellars, pantries (lots of these), wardrobes (he had whole rooms devoted to clothes), kitchens, dining-rooms, all were on the same floor, and indeed on the same passage. The best rooms were all on the left-hand side (going in), for these were the only ones to have windows, deep-set round windows looking over his garden and meadows beyond, sloping down to the river.",
							"_id" : "thirdlevel1",
							"children" : []
						}
						]
					},
					{
						"title" : "Empty.",
						"snippet" : "The hole was empty.",
						"_id" : "secondlevel2",
						"children" : [
							{
								"title" : "Derp",
								"snippet" : "And jokes, Bilbo was actually just a massive derp",
								"_id" : "thirdlevel3",
								"children" : []
							}
						]
					}
				]
			}
		};
*/
		App.DataManip.Ajax.getStory(story_id, function(data) {
			var story = new App.Models.Story(data);
			App.viewStoryView = new App.Views.ViewStory({
				model : story
			});
			console.log(data);
			console.log(story);
			console.log(App.viewStoryView.model);

			App.mainRegion.show(App.viewStoryView);
		});
	}
});

App.addInitializer(function(options) {
	App.mainController = new MainController();
})
