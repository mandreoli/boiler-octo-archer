define([
	'jquery',
    'underscore',
    'backbone'
], 
function($, _, Backbone) {

    var BaseRouter = Backbone.Router.extend({

		callsStack: [],
		
		app: null,
	
        constructor: function() {
			var that = this;   
			that.app = null;			
			that.callsStack = [];
			
			Backbone.View.prototype.navigateTo = function (location, trigger, replace) {
                that.navigate(location, { trigger: trigger, replace: replace });
            };
			
			// Call the original constructor
			Backbone.Router.apply(that, arguments);
		},
        
        routes: {
			'goto/:id': 'gotoApp', 
            '*actions': 'defaultAction'
        },
		
		destroyBeforeUnload: function() {
			alert();
		},
		
		gotoApp: function(id) {
			var that = this;	
			$.Log.debug('Routed::gotoApp(BaseRouter) - Params::{0}'.format(id));			
            that.abortPendingCalls();
			
			if (id == 2) {
				that.app.destroy();
				window.location.href = WebAppPartial.urls.app_second;
			}
		},
		
        defaultAction: function(uri) {
            var that = this;	
			$.Log.debug('Routed::defaultAction(BaseRouter) - Params::{0}'.format(uri));			
            that.abortPendingCalls();
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

    return BaseRouter;
});
