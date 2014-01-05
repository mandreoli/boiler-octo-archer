define([
    'jquery',
    'underscore',
    'shared_models/base/BaseCollection',
    'models/PhoneModel'
], 
function($, _, BaseCollection, PhoneModel) {

    var PhoneCollection = BaseCollection.extend({        

        model: PhoneModel,

        defaults: function() {
			return _.extend({
                
            }, this.constructor.__super__.defaults);
		},
        
        initialize: function() {
            var that = this;
            that.collectionName = 'PhoneCollection';
        }
        
    });

    return PhoneCollection;
});
