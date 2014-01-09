define([
    'jquery',
    'underscore',
    'shared_models/base/BaseCollection',
    'models/UserModel'
], 
function($, _, BaseCollection, UserModel) {

    var UserCollection = BaseCollection.extend({

		collectionName: 'UserCollection',
        model: UserModel,
	
        defaults: function() {
			return _.extend({
                
            }, this.constructor.__super__.defaults);
		},
        
        initialize: function() {
            var that = this;
            that.tags = { root: 'users' };
            
            return that;
        },
        
        getUsers: function(filters, order, pagination, beforeCallback, successCallback, errorCallback) {
            var that = this;
			var options = {
				service: WebAppPartial.settings.services_url.getUsers,
				type: WebApp.constants.AJAX_POST,
				dataType: WebApp.constants.AJAX_DTYPE_JSON
			};
			
            return that.call(
				options,
				filters, 
				order,
				pagination, 
				beforeCallback, 
				successCallback, 
				errorCallback
			);
        }
       
    });

    return UserCollection;
});
