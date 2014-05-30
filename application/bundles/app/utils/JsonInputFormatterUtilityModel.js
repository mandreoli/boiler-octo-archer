define([
    'underscore',
    'jquery',
    'backbone'
], 
function(_, $, Backbone) {

    var JsonInputFormatterUtilityModel = Backbone.Model.extend({

        defaults: {
        },  

        initialize: function() {
            var that = this;
            return that;
        },
		
		makeInputJSON: function(filters, order, pagination) {
            var that = this;
            var json_tag = null;   
            
            return json_tag;
        }
       
    });

    return JsonInputFormatterUtilityModel;
});
