/* init */
App.on("before:start", function(options) {
	/* Perhaps put a loading animation in here? */
	console.log("Initializing....");

})

App.on("start", function(options) {
	console.log("App starting.");		

	/* Define Initial State. Possibly a loading bar? */
	App.mainRegion.show(new App.Views.StaticView());

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
