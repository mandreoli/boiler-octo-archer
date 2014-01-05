define([
    'underscore',
    'jquery',
    'backbone'
], 
function(_, $, Backbone) {

    var ValidatorUtilityModel = Backbone.Model.extend({

        defaults: {
			num_errors: 0,
			messages: []
        },  

        initialize: function() {
            var that = this;
            that.num_errors = 0;
			that.messages = [];
            return that;
        },
		
		incErrors: function() {
			var that = this;
			that.num_errors = that.num_errors + 1;
		},
		
		addMessage: function(message) {
			var that = this;            
			that.messages.push(message);
		},
		
		createErrorsList: function(div) {
			var that = this;
			if (div) {
				div.find('.text-message').empty();
				
				if (parseInt(that.num_errors, 10) != 0) {
					var ul = $('<ul class="errors_list">');
					for (var k = 0; k < that.messages.length; k++) {
						$('<li>').html(that.messages[k]).appendTo(ul);
					}
					div.show().find('.text-message').append(ul);
					return false
				}
			}
			
			if (parseInt(that.num_errors, 10) != 0) {
				return false;
			}
			
			return true;
		},
		
		validation: function(msg, string, cell, min, max, regexp, msgCustom) {
			var that = this;
			var num = 0;
			var message = null;
			string = $.trim(string);
			
			if (!isNull(min) && string.length < min) {
				message = '{0} minimum {1} characters.'.lang(WebApp.language).format(msg, min); 
				//message = msg + 'minimo ' + min + ' caratteri.';
				if (min == 1 || string == '') {
					message = '{0} mandatory.'.lang(WebApp.language).format(msg); 
					//message = msg + 'obbligatorio.';
				}
				num++;
			}
			else if (!isNull(max) && string.length > max) {
				message = '{0} maximum {1} characters.'.lang(WebApp.language).format(msg, max); 
				//message = msg + 'massimo ' + max + ' caratteri.';
				num++;
			}
			else if (regexp && string.length > 0 && !regexp.test(string)) {				
				message = '{0} characters not allowed.'.lang(WebApp.language).format(msg); 
				//message = msg + 'caratteri non ammessi.';
				if (msgCustom) {
					message = msg + msgCustom;
				}
				num++;
			}

			if (num > 0) {
				cell.addClass('error');				
				that.incErrors();
				that.addMessage(message);
                
                $.Log.log('Validation error of string::{0}'.format(string));
                
				return false;
			}
			
			cell.removeClass('error');
			return true;
		},
		
		isDate: function(msg, input, cell, min) {
			var that = this;
			var string = input.val();		
			var expression = /^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/]\d{4}$/i;

			if (that.validation(msg, string, cell, min, null, expression)) {
				if (min <= 0 && string == '') {
					return true;
				}
				
				var date = string.split('/');
				
				var year = (date[2] < 1000) ? date[2] + 1900 : date[2];
				var month = parseInt(date[1], 10) - 1;
				var day = parseInt(date[0], 10);
				
				var tempDate = new Date(year, month, day);

				if ((tempDate.getFullYear() == year) && (month == tempDate.getMonth()) && (day == tempDate.getDate())) {
					cell.removeClass('error');
					return true;
				}
				else {
					cell.addClass('error');				
					that.incErrors();
					that.addMessage('{0} not a valid date.'.lang(WebApp.language).format(msg));
					//that.addMessage(msg + 'data non valida.');
					return false
				}
			}
			
			return false;
		},
		
		isTime: function(msg, input, cell, sec, min, max) {
			var that = this;
			var string = input.val();		
			var expression = /^(([0-1][0-9])|([2][0-3])):([0-5][0-9])+$/i;
			if (sec) {
				expression = /^(([0-1][0-9])|([2][0-3])):([0-5][0-9]):([0-5][0-9])+$/i;
			}

			return that.validation(msg, string, cell, min, max, expression, 'caratteri non ammessi o formato errato.');
		},
		
		isNumericalSigned: function(msg, input, cell, min, max) {
			var that = this;
			var string = input.val();		
			var expression = /^\-?\+?[0-9e1-9]+$/i;

			return that.validation(msg, string, cell, min, max, expression);
		},
		
		isNumericalUnsigned: function(msg, input, cell, min, max) {
			var that = this;
			var string = input.val();		
			var expression = /^[0-9]+$/i;

			return that.validation(msg, string, cell, min, max, expression);
		},
		
		isAlphaNumerical: function(msg, input, cell, flagSpaces, min, max) {
			var that = this;
			var string = input.val();		
			var expression = null;

			if (flagSpaces) {
				expression = /^[A-Za-z0-9\s]+$/i;
			}
			else {								
				expression = /^[A-Za-z0-9]+$/i;
			}

			return that.validation(msg, string, cell, min, max, expression);
		},
		
		isSpecialAlphaNumerical: function(msg, input, cell, flagSpaces, min, max) {
			var that = this;
			var string = input.val();		
			var expression = null;

			if (flagSpaces) {
				expression = /^[\s\,\.\-\!\@\;\:\#\$\%\&\*\]\[\(\)\?\_A-Za-z0-9]+$/i;
			}
			else {								
				expression = /^[\!\,\.\-\@\;\:\#\$\%\&\*\]\[\(\)\?\_A-Za-z0-9]+$/i;
			}

			return that.validation(msg, string, cell, min, max, expression);
		},
		
		isRegExp: function(msg, input, cell, flagSpaces, min, max) {
			var that = this;
			var string = input.val();		
			var expression = null;

			if (flagSpaces) {
				expression = /^[\s\-\$\%\.\*\_A-Za-z0-9]+$/i;
			}
			else {								
				expression = /^[\-\$\%\.\*\_A-Za-z0-9]+$/i;
			}

			return that.validation(msg, string, cell, min, max, expression);
		},
		
		isGenericString: function(msg, input, cell, flagSpaces, min, max) {
			var that = this;
			var string = input.val();		
			var expression = null;

			if (flagSpaces) {
				expression = /^[A-Za-z0-9\s\\\\\'\"\,\.\(\)\/\:\;\?\!\_\@\#\-\+\*\%\&\$\^\=\u00C0-\u00F6\u00F8-\u00FF]+$/i;
			}
			else {								
				expression = /^[A-Za-z0-9\\\\\'\"\,\.\(\)\/\:\;\?\!\_\@\#\-\+\*\%\&\$\^\=\u00C0-\u00F6\u00F8-\u00FF]+$/i;
			}

			return that.validation(msg, string, cell, min, max, expression);
		},
		
		isString: function(msg, input, cell, flagSpaces, min, max) {
			var that = this;
			var string = input.val();		
			var expression = null;

			if (flagSpaces) {
				expression = /^[A-Za-z\s\'\u00C0-\u00F6\u00F8-\u00FF]+$/i;
			}
			else {								
				expression = /^[A-Za-z\'\u00C0-\u00F6\u00F8-\u00FF]+$/i;
			}

			return that.validation(msg, string, cell, min, max, expression);
		},
		
		isText: function(msg, input, cell, flagSpaces, min, max) {
			var that = this;			
			var string = input.val();		
			var expression = null;
			
			if (flagSpaces) {
				expression = /^[A-Za-z0-9\s\'\.\,\:\;\-\(\)\"\!\?\%\/\u00C0-\u00F6\u00F8-\u00FF]+$/i;
			}
			else {								
				expression = /^[A-Za-z0-9\'\.\,\:\;\-\(\)\"\!\?\%\/\u00C0-\u00F6\u00F8-\u00FF]+$/i;
			}

			return that.validation(msg, string, cell, min, max, expression);
		},
		
		isColumnName: function(msg, input, cell, flagSpaces, min, max) {
			var that = this;			
			var string = input.val();		
			var expression = null;
			
			if (flagSpaces) {
				expression = /^[A-Za-z0-9\_\s\u00C0-\u00F6\u00F8-\u00FF]+$/i;
			}
			else {								
				expression = /^[A-Za-z0-9\_\u00C0-\u00F6\u00F8-\u00FF]+$/i;
			}

			return that.validation(msg, string, cell, min, max, expression);
		},
		
		isFilterValue: function(msg, input, cell, flagSpaces, min, max) {
			var that = this;			
			var string = input.val();		
			var expression = null;
			
			if (flagSpaces) {
				expression = /^[A-Za-z0-9\_\\\-\/\$\&\!\%\?\s\u00C0-\u00F6\u00F8-\u00FF]+$/i;
			}
			else {								
				expression = /^[A-Za-z0-9\_\\\/\-\$\&\!\%\?\u00C0-\u00F6\u00F8-\u00FF]+$/i;
			}

			return that.validation(msg, string, cell, min, max, expression);
		},
		
		isName: function(msg, input, cell, flagSpaces, min, max) {
			var that = this;			
			var string = input.val();		
			var expression = null;
			
			if (flagSpaces) {
				expression = /^[A-Za-z0-9\s\'\u00C0-\u00F6\u00F8-\u00FF]+$/i;
			}
			else {								
				expression = /^[A-Za-z0-9\'\u00C0-\u00F6\u00F8-\u00FF]+$/i;
			}

			return that.validation(msg, string, cell, min, max, expression);
		},
		
		isFileName: function(msg, input, cell, min, max) {
			var that = this;			
			var string = input.val();
			var expression = /^[A-Za-z0-9\_\-\.\$\%]+$/i;
			var splitted = string.split('.');
			if (splitted.length > 1) {
			    splitted.pop();
			    string = '';
			    for (var i = 0; i < splitted.length; i++) {
			        string += splitted[i] + '.';
			    }
			    string = string.substr(0, string.length - 1);
			}

			return that.validation(msg, string, cell, min, max, expression);
		},
		
		isFileExtension: function(msg, input, cell, min, max) {
			var that = this;			
			var string = input.val();		
			var expression = /^[A-Za-z0-9]+$/i;
			var ext = string.substr(string.lastIndexOf('.') + 1);
			
			if (string.lastIndexOf('.') < 0) {
			    ext = '';
			}
			
			return that.validation(msg, ext, cell, min, max, expression);
		},

		isPath: function(msg, input, cell, min, max) {
			var that = this;			
			var string = input.val();		
			//MATCH: c:\prova\prova\ oppure c:\prova\prova oppure \\123.12.12.3\prova
			//var expression = /^(?:[\w]\:|\\)(\\[A-Za-z_\-0-9\.]+)([A-Za-z0-9_\-\\]+)$/i;
			//MATCH: c:\prova\prova oppure \\123.12.12.3\prova
			var expression = /^(?:[A-Za-z]\:|\\)?(\\([A-Za-z_\-0-9\.]+))?(\\([A-Za-z_\-0-9\$]+))+$/i;

			return that.validation(msg, string, cell, min, max, expression);
		},
		
		isInteger: function(msg, input, cell, min, max) {
			var that = this;			
			var string = input.val();		
			var expression = /^\-?[\d]+(\d{1,})?$/i;

			return that.validation(msg, string, cell, min, max, expression);
		},
		
		isFloat: function(msg, input, cell, min, max) {
			var that = this;			
			var string = input.val();		
			var expression = /^\-?[\d]+(,|.\d{1,2})?$/i;

			return that.validation(msg, string, cell, min, max, expression);
		},	
		
		isBoolean: function(msg, input, cell, min, max) {
			var that = this;			
			var string = input.val();		
			var expression = /^(?:true|false|0|1)$/i;

			return that.validation(msg, string, cell, min, max, expression);
		},		
		
		isMandatory: function(msg, input, cell, min) {
			var that = this;			
			var string = input.val();		
			var expression = null;

			return that.validation(msg, string, cell, min, null, expression);
		},
		
		isMail: function(msg, input, cell, min, max) {
			var that = this;			
			var string = input.val();		
			var expression = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-]{2,})+\.)+([a-zA-Z0-9]{2,})+$/i;

			return that.validation(msg, string, cell, min, max, expression);
		},
		
		isEqual: function(msg, input1, input2, cell) {
			var that = this;			
			var string_A = input1.val();
			var string_B = input2.val();
			
			if (string_A != string_B) {
				cell.addClass('error');
				that.incErrors();
				that.addMessage('{0} the strings are different.'.lang(WebApp.language).format(msg));
				//that.addMessage(msg + 'le stringhe sono diverse.');
				return false;
			}
			
			cell.removeClass('error');
			return true;
		}
       
    });

    return ValidatorUtilityModel;
});
