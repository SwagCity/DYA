App.addInitializer(function(options) {
	App.router = new Marionette.AppRouter({
		initialize : function() {
			console.log("Router initialized.");
		},
		start : function() {
			console.log("Router started");
		},
		controller : App.mainController,

		appRoutes  : {
			"new" : "createStory",
			":story_id" : "renderStory",
			":story_id/edit" : "editStory"
		}
	})
})

