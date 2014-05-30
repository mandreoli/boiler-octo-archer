Lang = [];
Object.extend = function(destination, source) {
    for (var property in source) {
        if (source.hasOwnProperty(property)) {
            destination[property] = source[property];
        }
    }
    return destination;
};

Lang['en'] = {
	//Header view
	  APP_CLOSE_TITLE: 'Close application'
	, APP_CLOSE_CONFIRM_MSG: 'Are you sure that you want to close the application <strong>{0}</strong>?'
	//Validator widget
	, INVALID_STR_DIFF: '{0} the strings are different.'
	, INVALID_DATE: '{0} not a valid date.'
	, INVALID_CHARS: '{0} characters not allowed.'
	, INVALID_MAX: '{0} maximum {1} characters.'
	, INVALID_MIN: '{0} minimum {1} characters.'
	, INVALID_MANDATORY: '{0} mandatory.'
	//Modal dialog popup
	, MODAL_DIALOG_OK_BTN: 'Ok'
	, MODAL_DIALOG_CLOSE_BTN: 'Close'
	, MODAL_DIALOG_CANCEL_BTN: 'Cancel'
	//Combo widget
	, COMBO_LOAD_ERROR: 'Error'
	, COMBO_LOAD_DATA: 'Loading data...'
};

Lang['it'] = {
	//Header view
	  APP_CLOSE_TITLE: 'Chiudi applicazione'
	, APP_CLOSE_CONFIRM_MSG: 'Sei sicuro di voler chiudere l\'applicazione <strong>{0}</strong>?'
	//Validator widget
	, INVALID_STR_DIFF: '{0} le stringhe sono diverse.'
	, INVALID_DATE: '{0} la data non &egrave; valida.'
	, INVALID_CHARS: '{0} caratteri non ammessi.'
	, INVALID_MAX: '{0} massimo {1} caratteri.'
	, INVALID_MIN: '{0} minimo {1} caratteri.'
	, INVALID_MANDATORY: '{0} obbligatorio.'
	//Modal dialog popup
	, MODAL_DIALOG_OK_BTN: 'Ok'
	, MODAL_DIALOG_CLOSE_BTN: 'Chiudi'
	, MODAL_DIALOG_CANCEL_BTN: 'Annulla'
	//Combo widget
	, COMBO_LOAD_ERROR: 'Errore'
	, COMBO_LOAD_DATA: 'Caricamento dati...'
};