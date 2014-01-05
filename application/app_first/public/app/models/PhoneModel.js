define([
    'jquery',
    'underscore',
    'shared_models/base/BaseModel'
], 
function($, _, BaseModel) {

    var PhoneModel = BaseModel.extend({

        defaults: function() {
			return _.extend({
				number: null,
                type: null
            }, this.constructor.__super__.defaults);
		},
        
        initialize: function() {
            var that = this;
            that.modelName = 'PhoneModel';
            that.tags = { root: 'phone', children: [
                { node: 'number', type: WebApp.constants.SYS_T_STRING },
                { node: 'type', type: WebApp.constants.SYS_T_STRING }
            ] };         
            
            return that;
        }
        
    });

    return PhoneModel;
});
