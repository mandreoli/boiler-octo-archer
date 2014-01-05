define([
    'jquery',
    'underscore',
    'shared_models/base/BaseCollection',
    'models/UserModel'
], 
function($, _, BaseCollection, UserModel) {

    var UserCollection = BaseCollection.extend({

        defaults: function() {
			return _.extend({
                
            }, this.constructor.__super__.defaults);
		},
        
        initialize: function() {
            var that = this;
            that.model = UserModel;
            that.set('modelName', 'UserModel');
            that.set('tags', { root: 'users', group: 'user' });
            
            return that;
        },
        
        getUser: function(beforeCallback, successCallback, errorCallback) {
            var that = this;
            return that.call(WebAppPartial.settings.services_url.testUser, null, null, null, beforeCallback, successCallback, errorCallback);
        }
       
    });

    return UserCollection;
});
