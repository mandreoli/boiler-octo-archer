require([
    'domReady',
    'router',
    'app',
	'logger'
],
function(DomReady, Router, App) {

    DomReady(function() {	
		//Set log's level
		var enableLog = WebApp.logEnabled || WebAppPartial.logEnabled; 
		var levelLog = (WebAppPartial.logLevel >= WebApp.logLevel) ? WebAppPartial.logLevel : WebApp.logLevel; 	
		$.Log.logEnabled = enableLog;
		$.Log.level = levelLog;
		
		//Check for protoutils.js lib
		try {
			var r = isNull();
			$.Log.info('"protoutils.js" library loaded successfully');
		} catch (e) {
			$.Log.error('Unable to load "protoutils.js" library');
		}
		
		//Initialize Taffy's tables defined in the configs
        var table = null;	
		$.Log.info('INITIALIZE Taffy\'s tables in the global.config');
        for(table in WebApp.database.tables) {
            WebApp.database.tables[table] = TAFFY([]);		
			$.Log.log(table);
		}

		$.Log.info('INITIALIZE Taffy\'s tables in the partial.config');
		for(table in WebAppPartial.database.tables) {
            WebAppPartial.database.tables[table] = TAFFY([]);			
			$.Log.log(table);
        }		
        
        // Define your master router on the application namespace and trigger all
        // navigation from this instance.
        $.Log.info('INITIALIZE Router');
		App.appRouter = new Router();		
        App.init(WebAppPartial.urls.root, 'GlobalMainView');
		App.start();
	   
        // Trigger the initial route and enable HTML5 History API support, set the
        // root folder to '/' by default. Change in app.js.        			
		$.Log.info('ROUTING STARTED');
		Backbone.history.start({ 
			pushState: false,
			hashChange: true,
			root: App.root, 
			silent: false
		});	
		
        // All navigation that is relative should be passed through the navigate
        // method, to be processed by the router. If the link has a `data-bypass`
        // attribute, bypass the delegation completely.
        $(document).on("click", "a[href]:not([data-bypass])", function(evt) {
            // Get the absolute anchor href.
            var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
            // Get the absolute root.
            var root = location.protocol + "//" + location.host + App.root;

            // Ensure the root is part of the anchor href, meaning it's relative.
            if (href.prop.slice(0, root.length) === root) {
                // Stop the default event to ensure the link will not cause a page
                // refresh.
                evt.preventDefault();

                // `Backbone.history.navigate` is sufficient for all Routers and will
                // trigger the correct events. The Router's internal `navigate` method
                // calls this anyways.  The fragment is sliced from the root.
                Backbone.history.navigate(href.attr, { trigger: true });
            }
        });
			
    });

});