/* Minify and combine all js into one */
({
    /* Define app folder */
    baseUrl: '../../application/app_first/public/app/',
    /* Define require lib folder from baseUrl path */
    name: '../../../public/app/libs/require/require',
    /* Include global.js and main.js */
    include: ['../../../public/app/global.config', '../../../public/app/global.lang', 'partial.config', 'partial.lang', 'main'],  
    /* Output folder with the minified code */
    out: '../../release/app_first/public/app/app_first-built.js',  
    /* Minify code (set 'none' if you don't want minified code) */
    optimize: 'uglify2',
    uglify: {
        toplevel: true,
        ascii_only: true,
        beautify: false,
        max_line_length: 25000,
        no_mangle: false
    }, 
	uglify2: {
        output: {
            max_line_len: 25000
        },
        compress: {
            sequences: true,
            dead_code: true,
			unused: true,
			drop_debugger: true,
			properties: true,
			conditionals: true
        },
        warnings: false,
        mangle: {
			toplevel: true,
			eval: true
		}
    },		
    /* Inlines the text for any text! dependencies, to avoid the separate async XMLHttpRequest calls to load those dependencies */
    inlineText: true,
    findNestedDependencies: true,
    preserveLicenseComments: false,
    logLevel: 0,
    /* Define paths (from baseUrl path) used in the app (the same as your config.js file) */
    paths: {
        domReady:               '../../../public/app/libs/require/domReady',
        jquery:                 '../../../public/app/libs/jquery/jquery-min',
        jqueryui:               '../../../public/app/libs/jquery/jquery-ui-min',     
        underscore:             '../../../public/app/libs/underscore/underscore-min',
        backbone:               '../../../public/app/libs/backbone/backbone-min',
        taffy:                  '../../../public/app/libs/taffy/taffy-min',
        json:                   '../../../public/app/libs/json/json2-min',
        xmlToJson:              '../../../public/app/libs/xmltojson/xmlToJson-min',
        spin:                   '../../../public/app/libs/spin/spin-min',
		protoutils:             '../../../public/app/libs/utility/protoutils-min',
		logger:		            '../../../public/app/libs/logger/logger-min',
        mask:                   '../../../public/app/libs/maskedinput/maskedinput-min',
        text:                   '../../../public/app/libs/require/text',
        shared_models:			'../../../public/app/models',
		shared_views:			'../../../public/app/views',
		shared_templates:		'../../../public/app/templates',
		shared_utils:			'../../../public/app/utils'
    },
    /* Define dependency (the same as your config.js file) */
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
        },
        'mask': {
            deps: ['jquery'] 
        }
    }
})