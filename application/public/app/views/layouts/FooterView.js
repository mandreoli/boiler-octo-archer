define([
    'jquery',
    'underscore',
    'backbone',
    'shared_views/base/BaseView',
    'text!shared_templates/layouts/footerTemplate.html'
], 
function($, _, Backbone, BaseView, footerTemplate) {
    
    var FooterView = BaseView.extend({
        
        options: {
        },
        
        events: {           
        },

        initialize: function() {
            var that = this;
            that.$el.html(footerTemplate);
            that.caching();
        },
        
        caching: function() {
            var that = this;
        },
        
        render: function() {
            var that = this;
			return that;
        }
        
    });
    
    return FooterView;
});