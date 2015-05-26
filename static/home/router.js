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
			"/" : "home",
			"stories" : "renderAll",
			"stories/:story_id" : "renderStory",
			"stories/:story_id/edit" : "editStory",
			"new" : "createStory"
		}
	})
})
