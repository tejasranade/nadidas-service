const sdk = require('kinvey-flex-sdk');
var Kinvey = require('kinvey-node-sdk');

sdk.service((err, flex) => {    
	function sortByPreference(context, complete, modules){
		const products = context.body;
		const store = modules.userStore();

		store.getCurrentUser((err, user) => {	
			console.log ("error: " + JSON.stringify(err));
			console.log ("user: " + JSON.stringify(user));
			if (err) {
				return complete().setBody(err).runtimeError().done();
			}

			products.sort(function (product1, product2){
				if (product1.category === user.preference){
					return -1;
				}
				return 1;
			});

	  		return complete().setBody(products).ok().done();			
		});
	}

	flex.functions.register('listProducts', sortByPreference);
});