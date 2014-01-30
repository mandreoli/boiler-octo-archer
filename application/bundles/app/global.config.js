/** Global vars for all apps */
WebApp = {
	logLevel: null,
	logEnabled: null,
	fatalError: null,
	fatalErrorClose: null,
	language: null,
	domain: null,
	title: null,
	version: null,
	urls: {},
    database: {
        tables: {}
    },
    constants: {},
    settings: {
        services_url: {}
    }
};

/* IMPORTANT: installation path (change also the base tag in the index.html/index.release pages) */
WebApp.domain = '/boiler-octo-archer/application';
//WebApp.domain = '/boiler-octo-archer/release';

/* object: 0, log: 1, debug: 2, info: 3, warn: 4, error: 5 */
WebApp.logEnabled = true;
WebApp.logLevel = 0;

WebApp.fatalError = true;
WebApp.fatalErrorClose = true;

WebApp.language = 'it';
WebApp.title = 'Boilerplate';
WebApp.version = '1.0.0';

WebApp.urls = {
	services: WebApp.domain + '/../services',	
	assets: WebApp.domain + '/bundles/assets',
	app: WebApp.domain + '/bundles/app',
	libs: WebApp.domain + '/bundles/app/libs'
}

WebApp.constants = {
	AJAX_POST: 'POST',
	AJAX_GET: 'GET',
	AJAX_DTYPE_XML: 'text',
	AJAX_DTYPE_JSON: 'json',
    DIALOG_QUESTION: 'question',
    DIALOG_SUCCESS: 'success',
    DIALOG_WARNING: 'warning',
    DIALOG_ERROR: 'error',
    DIALOG_INFO: 'info',
	MESSAGE_ERROR: 'failure',
	MESSAGE_SUCCESS: 'success',
	MESSAGE_ALERT: 'alerting',
    SUCCESS: 'ok',
    FAILURE: 'ko',
    UNINITIALIZE: '',
    READ: 'R',
    UPDATE: 'U',
    INSERT: 'I',
    SYS_T_INTEGER: 'int',
    SYS_T_STRING: 'string',
    SYS_T_ARRAY: 'array',
	SYS_T_MODEL: 'model'
};

WebApp.settings.services_url = {
    access: WebApp.urls.services + 'SomeService.php'
};

WebApp.database.tables = {
    tb_access: null
};