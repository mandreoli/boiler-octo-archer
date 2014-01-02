/** Global vars for single app*/
WebAppPartial = {
	logLevel: null,
	logLocal: null,
	subtitle: null,
	subversion: null,
	urls: {},
    database: {
        tables: {}
    },
    constants: {},
    settings: {
        services_url: {}
    }
};

/* object: 0, log: 1, debug: 2, info: 3, warn: 4, error: 5 */
WebAppPartial.logEnabled = false;
WebAppPartial.logLevel = 3;

WebAppPartial.subtitle = 'Template two';
WebAppPartial.subversion = '';

WebAppPartial.urls = {
    root: WebApp.domain + '/app_second/index.html',
	app_first: WebApp.domain + '/app_first/index.html'
}

WebAppPartial.constants = {
}

WebAppPartial.settings.services_url = {
	test: WebApp.urls.services + '/TestService.asmx/'
};

WebAppPartial.database.tables = {
    tb_test: null
};