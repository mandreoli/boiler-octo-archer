define([
    'jquery',
    'underscore',
    'backbone',
    'shared_views/base/BaseView',
	'views/ContainerView',
    'text!shared_templates/layouts/pageTemplate.html'
], 
function($, _, Backbone, BaseView, ContainerView, pageTemplate) {
    
    var PageView = BaseView.extend({
        
        options: {
            leftPaneContainer: null,
            centerPaneContainer: null,
            rightPaneContainer: null
        },
        
        events: {           
        },

        initialize: function() {
            var that = this;
            that.$el.html(pageTemplate);
            that.caching();
        },
        
        caching: function() {
            var that = this;
            that.options.leftPaneContainer = that.$el.find('#leftPaneContainer');
            that.options.centerPaneContainer = that.$el.find('#centerPaneContainer');
            that.options.rightPaneContainer = that.$el.find('#rightPaneContainer');
        },
        
        render: function() {
            var that = this;
			
            //Add container view
            var containerView = new ContainerView({ el: that.options.centerPaneContainer });
            that.addSubview(containerView, 'containerView');
            containerView.render();
			
			return that;
        }
        
    });
    
    return PageView;
});
