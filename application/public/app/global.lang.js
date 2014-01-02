Lang = [];
Object.extend = function(destination, source) {
    for (var property in source) {
        if (source.hasOwnProperty(property)) {
            destination[property] = source[property];
        }
    }
    return destination;
};

Lang['it'] = {
	//Header view
	'Close application': 'Chiudi applicazione'
	,'Are you sure that you want to close the application <strong>{0}</strong>?': 'Sei sicuro di voler chiudere l\'applicazione <strong>{0}</strong>?'
	//Validator widget
	,'{0} the strings are different.': '{0} le stringhe sono diverse.'
	,'{0} not a valid date.': '{0} la data non &egrave; valida.'
	,'{0} characters not allowed.': '{0} caratteri non ammessi.'
	,'{0} maximum {1} characters.': '{0} massimo {1} caratteri.'
	,'{0} minimum {1} characters.': '{0} minimo {1} caratteri.'
	//Modal dialog popup
	,'Ok': 'Ok'
	,'Close': 'Chiudi'
	,'Cancel': 'Annulla'
	//Combo widget
	,'Error': 'Errore'
	,'Loading data...': 'Caricamento dati...'
};