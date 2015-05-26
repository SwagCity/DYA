App.Views.HomeView = Marionette.ItemView.extend({
	template : "#home-template"
})

App.Views.EditView = Marionette.ItemView.extend({
	template : "#edit-template",

	onRender : function() {

		console.log('onRender');

		// Get rid of the wrapping div
		// tip from codepen.io/somethingkindawierd/pen/txnpE
		this.$el = this.$el.children();

		//Unwrap the elemnt to prevetn infinitely nesting elements during re-render
		this.$el.unwrap();
		this.setElement(this.$el);

	}
})
