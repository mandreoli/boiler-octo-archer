define([
    'jquery',
    'underscore',
    'backbone',
    'shared_views/base/BaseView',
    'text!templates/containerTemplate.html'
], 
function($, _, Backbone, BaseView, containerTemplate) {
    
    var ContainerView = BaseView.extend({
        
        tagName: 'div',
        id: 'contentLayout',
		template: containerTemplate,        
        
        caching: function() {
            var that = this;
            that.options.viewport = that.$el.find('#viewportLayout');
        },
        
        events: {
        },

        initialize: function() {
            var that = this;
			that.options = {
				viewport: null
			};
        },
        
        render: function() {
            var that = this; 
            that.$el.html(that.template);            
            that.caching();
			return that;
        }
        
    });
    
    return ContainerView;
});
