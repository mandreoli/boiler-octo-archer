define([
  'app',
  'views/start/StartView'
], 
function(App, StartView) {

    var Router = Backbone.Router.extend({

        initialize: function() {
            var that = this;
			Backbone.View.prototype.navigateTo = function (location, trigger, replace) {
                that.navigate(location, { trigger: trigger, replace: replace });
            };			
        },
        
        callsStack: [],
        
        routes: {
			'goto/:id': 'gotoApp', 
            '*actions': 'defaultAction'
        },
		
		gotoApp: function(id) {
			var that = this;	
			$.Log.debug('Routed::gotoApp - Params::{0}'.format(id));			
            that.abortPendingCalls();
			
			if (id == 1) {
				App.destroy();
				window.location.href = WebAppPartial.urls.app_first;
			}
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
        },
        
        abortPendingCalls: function() {
            var that = this;
            for (var xhr in that.callsStack) {
                var call = that.callsStack[xhr];
                try {                    
                    if (call.readyState !== 4) {
						$.Log.debug('XHR aborted::{0} - From router'.format(readyState));
						$.Log.obj(call);
		                call.abort();
		            }
		            that.callsStack[xhr] = null;
			        delete that.callsStack[xhr];
		        }
		        catch(e) {
			        that.callsStack[xhr] = null;
			        delete that.callsStack[xhr];
			    }	
            }
        }
		
    });

    return Router;
});
