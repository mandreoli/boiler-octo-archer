define([
  'app',  
  'shared_app/router',
  'views/start/StartView' 
], 
function(App, BaseRouter, StartView) {

    var Router = BaseRouter.extend({

        initialize: function() {
            var that = this;
			that.constructor.__super__.app = App;
        },
        
        routes: function() {  
			return _.extend({
				'*actions': 'defaultAction'
            }, this.constructor.__super__.routes);
		},
		
        defaultAction: function(uri) {
            var that = this;	
			$.Log.debug('Routed::defaultAction - Params::{0}'.format(uri));			
            that.abortPendingCalls();
			
			var pageView = App.mainView.getSubview('pageView').getSubview('containerView');
			
			//Add start view			
			pageView.removeSubviewIfExists('centerPaneView');
            var startView = new StartView();
            pageView.addSubview(startView, 'centerPaneView');
            pageView.appendSubview(startView, pageView.options.viewport);
            startView.render();
        }
		
    });

    return Router;
});
