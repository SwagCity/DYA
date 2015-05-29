App.DataManip = function() {

	var init = function(data) {

		// Initializes and prepares the data sent from API request.
		var setParents = function(tree) {
			var setParent = function (obj) {
				if (obj.children != undefined) {
					for (c in obj.children) {
						obj.children[c].parent_id = obj._id;
						setParent(obj.children[c]);
					}
				}
			}
			for (n in tree) {
				setParent(tree[n]);
			}
		}([data.story]);

	}

	/* Perform a function on all nodes */
	var execAll = function(f) {

		var func = function(node) {
			//console.log(App.viewStoryView.model);
			f(node);
			if (node.children) {
				if (node.children.models) {
					for (var x=0; x<node.children.models.length; x++) {
						func(node.children.models[x]);
					}
				}
			}
		}
		return func;
	}

	var findNode = function(node, query) {
		var found;
		execAll(function(n) {
			if (n.get("_id") == query) {
				found = n;
				return n;
			}
		})(node);
		return found;
	}

	return {
		init 		: init,
		findNode	: findNode,
		execAll 	: execAll
	};
}();

App.DataManip.Ajax = function(options) {
	
	var addStory = function(params, parent) {	
		var data;
		$.ajax({
			url			: options.apiURL + "/stories",
			type		: "POST",
			contentType	: 'application/json; charset=utf-8',
			data 		: {
				"params" : params,
				"parent" : parent
			},

			success : function(results) {
				data = results;
			},
			error : function(err) {
				console.log(err);
			}
		})

		return data;
	}

	var getStory = function(params, node_id, parent) {
		var data;
		$.ajax({
			url			: options.apiURL + "/" + node_id,
			type		: "POST",
			contentType	: 'application/json; charset=utf-8',
			data 		: {
				"params" : params,
				"parent" : parent
			},

			success : function(results) {
				data = results;
			},
			error : function(err) {
				console.log(err);
			}
		})

		return data;
	}
	
	var removeStory = function(params, node_id, parent) {
		var data;
		$.ajax({
			url			: options.apiURL + "/" + node_id,
			type		: "DELETE",
			contentType	: 'application/json; charset=utf-8',

			success : function(results) {
				data = results;
			},
			error : function(err) {
				console.log(err);
			}
		})

		return data;
	};

	var updateStory = function(params, node_id, parent) {
		var data;
		$.ajax({
			url			: options.apiURL + "/" + node_id,
			type		: "PATCH",
			contentType	: 'application/json; charset=utf-8',
			data : {
				"params" : params,
				"parent" : parent
			},

			success : function(results) {
				data = results;
			},
			error : function(err) {
				console.log(err);
			}
		})

		return data;
	}



	return {
		addStory 	: addStory,
		getStory 	: getStory,
		removeStory : removeStory,
		updateStory	: updateStory
		
	}
}({
	apiURL 		: "localhost:8000"
});
