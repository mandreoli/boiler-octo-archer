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
//WebApp.domain = '/boilerplate/application';
WebApp.domain = '/boilerplate/release';

/* object: 0, log: 1, debug: 2, info: 3, warn: 4, error: 5 */
WebApp.logEnabled = false;
WebApp.logLevel = 0;

WebApp.fatalError = true;
WebApp.fatalErrorClose = true;

WebApp.language = 'it';
WebApp.title = 'Boilerplate';
WebApp.version = '1.0.0';

WebApp.urls = {
	services: WebApp.domain + '/../services',	
	assets: WebApp.domain + '/public/assets',
	app: WebApp.domain + '/public/app',
	libs: WebApp.domain + '/public/app/libs'
}

WebApp.constants = {
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
    INSERT: 'I'
};

WebApp.settings.services_url = {
    access: WebApp.urls.services + '/AccessService.asmx/'
};

WebApp.database.tables = {
    tb_access: null
};