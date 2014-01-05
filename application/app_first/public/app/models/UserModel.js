define([
    'jquery',
    'underscore',
    'shared_models/base/BaseModel',
    'models/collections/PhoneCollection'
], 
function($, _, BaseModel, PhoneCollection) {

    var UserModel = BaseModel.extend({

        defaults: function() {
			return _.extend({
				id: null,
                name: null,
                address: null,
                mail: null,
                phones: null                
            }, this.constructor.__super__.defaults);
		},
        
        initialize: function() {
            var that = this;
            that.modelName = 'UserModel';
            that.tags = { root: 'user', children: [
                { node: 'id', type: WebApp.constants.SYS_T_INTEGER },
                { node: 'name', type: WebApp.constants.SYS_T_STRING },
                { node: 'address', type: WebApp.constants.SYS_T_STRING },
                { node: 'mail', type: WebApp.constants.SYS_T_STRING },
                { node: 'phones', type: WebApp.constants.SYS_T_ARRAY }
            ] };
            
            that.set('phones', new PhoneCollection());            
            
            return that;
        },
        
        getUser: function(beforeCallback, successCallback, errorCallback) {
            var that = this;
            return that.call(WebAppPartial.settings.services_url.testUser, null, null, null, beforeCallback, successCallback, errorCallback);
        }
       
    });

    return UserModel;
});
