define([
    'jquery',
    'underscore',
    'backbone',
    'shared_views/base/BaseView',
    'shared_views/layouts/HeaderView',
    'shared_views/layouts/PageView',
    'shared_views/layouts/FooterView'
], 
function($, _, Backbone, BaseView, HeaderView, PageView, FooterView) {
    
    var MainView = BaseView.extend({
        
        options: {
            headerContainer: null,
            pageContainer: null,
            footerContainer: null
        },
		
		_name: null,
        
        events: {           
        },

        initialize: function(elems) {
            var that = this;
			that._name = elems.name;
            that.options.headerContainer = that.$el.find('#headerContainer');
            that.options.pageContainer = that.$el.find('#pageContainer');
            that.options.footerContainer = that.$el.find('#footerContainer');
        },
        
        render: function() {
            var that = this;
            
            //Add header view
            var headerView = new HeaderView({ el: that.options.headerContainer });
            that.addSubview(headerView, 'headerView');
            headerView.render();
            
            //Add page view
            var pageView = new PageView({ el: that.options.pageContainer });
            that.addSubview(pageView, 'pageView');
            pageView.render();
            
            //Add footer view
            var footerView = new FooterView({ el: that.options.footerContainer });
            that.addSubview(footerView, 'footerView');
            footerView.render();
			
			return that;
        }
        
    });
    
    return MainView;
});
