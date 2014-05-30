/*
 * The configuration file for require.js holds all dependency declarations for
 * the application. This is the first file, that will be loaded by require.js
 * and it holds a reference to the main.js file, that starts the app itself.
 */
require.config({
    baseUrl: './public/app/',
    
    waitSeconds: 30,
    
    // deps holds dependencies to load as soon as require is defined.
    deps: ['partial.config', 'partial.lang', '../../../bundles/app/main'],
    
    // Paths that contain the various different javascript files.
    paths: {
        domReady:               WebApp.urls.libs + '/require/domReady',
		protoutils:             WebApp.urls.libs + '/utility/protoutils',
        logger:		            WebApp.urls.libs + '/logger/logger',
		jquery:                 WebApp.urls.libs + '/jquery/jquery-min',
        jqueryui:               WebApp.urls.libs + '/jquery/jquery-ui-min',     
        underscore:             WebApp.urls.libs + '/underscore/underscore-min',
        backbone:               WebApp.urls.libs + '/backbone/backbone-min',
        taffy:                  WebApp.urls.libs + '/taffy/taffy-min',
        json:                   WebApp.urls.libs + '/json/json2-min',
        xmlToJson:              WebApp.urls.libs + '/xmltojson/xmlToJson-min',
        spin:                   WebApp.urls.libs + '/spin/spin-min',	
        text:                   WebApp.urls.libs + '/require/text',
        shared_models:			WebApp.urls.app + '/models',
		shared_views:			WebApp.urls.app + '/views',
		shared_templates:		WebApp.urls.app + '/templates',
		shared_utils:			WebApp.urls.app + '/utils',
		shared_app:				WebApp.urls.app
    },
    
    /*
     * Configure the dependencies and exports for older, traditional
     * 'browser globals' scripts that do not use define() to declare the
     * dependencies and set a module value.
     */
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'jqueryui': {
            deps: ['jquery'] 
        },
		'logger': {
            deps: ['jquery'] 
        },
        'xmlToJson': {
            deps: ['jquery'] 
        },
        'spin': {
            deps: ['jquery'] 
        }
    }
});