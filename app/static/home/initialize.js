/* init */
App.on("before:start", function(options) {
	/* Perhaps put a loading animation in here? */
	console.log("Initializing....");

})

App.on("start", function(options) {
	console.log("App starting.");
	
	
	/* Defining Regions */
	console.log("Initializing Regions")
	App.addRegions({
		mainRegion			: "#main",
	})

	/* Define Initial State. Possibly a loading bar? */
	/*
	var homeView = new App.HomeView();
	App.mainRegion.show(homeView);
	*/

	/*
	$.ajax({
		url			: options.apiURL + "/",
		type		: "GET",
		contentType	: 'application/json; charset=utf-8',
		
		success : function(results) {
			console.log(results);
		}


	})
	*/

	if(Backbone.history) {
 		console.log("Starting Backbone history")
		Backbone.history.start();
	}

})

App.start(options);
