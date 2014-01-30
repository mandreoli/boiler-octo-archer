define([
    'jquery',
    'underscore',
    'shared_models/base/BaseModel',
	'models/PhoneModel',
    'models/collections/PhoneCollection'
], 
function($, _, BaseModel, PhoneModel, PhoneCollection) {

    var UserModel = BaseModel.extend({

		modelName: 'UserModel',
	
        defaults: function() {
			return _.extend({
				id: null,
                name: null,
                address: null,
                mail: null,
				fax: null,
                phones: null                
            }, this.constructor.__super__.defaults);
		},
        
        initialize: function() {
            var that = this;
            that.tags = { root: 'user', children: [
                { node: 'id', type: WebApp.constants.SYS_T_INTEGER },
                { node: 'name', type: WebApp.constants.SYS_T_STRING },
                { node: 'address', type: WebApp.constants.SYS_T_STRING },
                { node: 'mail', type: WebApp.constants.SYS_T_STRING },
				{ node: 'fax', type: WebApp.constants.SYS_T_MODEL },
                { node: 'phones', type: WebApp.constants.SYS_T_ARRAY }
            ] };
            
			that.set('fax', new PhoneModel());
            that.set('phones', new PhoneCollection());
            
            return that;
        },
        
        getUser: function(filters, order, pagination, beforeCallback, successCallback, errorCallback) {
            var that = this;			
			var options = {
				service: WebAppPartial.settings.services_url.getUser,
				type: WebApp.constants.AJAX_POST,
				dataType: WebApp.constants.AJAX_DTYPE_XML
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

    return UserModel;
});
