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
WebAppPartial.logLevel = 0;

WebAppPartial.subtitle = 'Template one';
WebAppPartial.subversion = '';

WebAppPartial.urls = {
    root: WebApp.domain + '/app_first/index.html',
	app_second: WebApp.domain + '/app_second/index.html'
}

WebAppPartial.constants = {
}

WebAppPartial.settings.services_url = {
    getUser: WebApp.urls.services + '/user.xml',
    getUsers: WebApp.urls.services + '/users.json'
};

WebAppPartial.database.tables = {
    tb_test: null
};