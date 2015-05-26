App.DataManip = function() {

	var init = function(data) {

		// Initializes and prepares the data sent from API request.
		var setParents = function(tree) {
			var setParent = function (obj) {
				if (obj.children != undefined) {
					for (c in obj.children) {
						obj.children[c].parent = obj;
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

App.DataManip.Ajax = function() {


	return {
		
	}
}();
