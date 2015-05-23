console.log("init");

var App = new Marionette.Application();
App.Models = [];
App.Views = [];

var options = {
	apiURL : "http://localhost:4000"
}

/* Defining Regions */
console.log("Initializing Regions")
App.addRegions({
	mainRegion			: "#main",
})
