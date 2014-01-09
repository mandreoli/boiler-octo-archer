define([
    'shared_views/MainView',
    'jqueryui',
    'taffy',
    'json',
    'xmlToJson',
	'protoutils'
],
function(MainView) {

    // Provide a global location to place configuration settings and module creation.
    var App = {
	
		root: null, 
		name: null,
		mainView: null,
        appRouter: null,
		
		init: function(url, name) {
			var that = this;
			that.root = url;
			that.name = name;			
		},
        
        start: function() {            
			var that = this;			
			$.Log.info('APP STARTED AND RENDERING MainView');
			$.Log.obj(that);
			that.mainView = new MainView({ name: that.name, el: $('#mainContainer') });
			that.mainView.render();			
        },
		
		destroy: function() {
			var that = this;
			that.mainView.remove();
		}
    };		
    
    return App;
});