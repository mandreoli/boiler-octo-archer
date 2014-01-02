/*
	Prototype utils plugin
	Copyright (c) 2014 - Michele Andreoli
	Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
	Version: 1.0.0
*/

if ((WebApp.fatalError != null || WebApp.fatalError != undefined) && WebApp.fatalError === true) {
	window.onerror = function(message, url, rownumber, colnumber) {
		var doc = window.document;
		var icon = '<span class="fatal-error-icon"></span>';
		var cls = '';
		if ((WebApp.fatalErrorClose != null || WebApp.fatalErrorClose != undefined) && WebApp.fatalErrorClose === true) {
			cls = '<div class="fatal-error-button"><a class="text-small" id="clearFatalError" href="javascript:void(0);" title="Close error">Close</a></div>';
		}
		var msg = '<p class="fatal-error-par"><span class="fatal-error-title text-medium">Message</span><span class="fatal-error-value text-medium">' + message + ' <i>in:</i></span></p>';
		var url = '<p class="fatal-error-par"><span class="fatal-error-title text-medium">Url</span><span class="fatal-error-value text-medium">' + url + ' <i>at:</i></span></p>';
		var ln = '<p class="fatal-error-par"><span class="fatal-error-title text-medium">Ln</span><span class="fatal-error-value text-medium">' + rownumber + '</span></p>';
		var col = '<p class="fatal-error-par"><span class="fatal-error-title text-medium">Col</span><span class="fatal-error-value text-medium">' + colnumber + '</span></p>';
		var sep = '<div class="fatal-error-par-separator"></div>';
		var panelContent = '<div class="fatal-error-panel">' + msg + url + ln + col + sep +'</div>';
		var errorTitle = '<div class="fatal-error-bar text-big">Javascript Fatal Error</div>';
		var html = '<div id="fatalErrorContent">' + icon + errorTitle + panelContent + cls + '</div>';
		var panel = doc.createElement('div');
		var body = doc.getElementsByTagName('body')[0].appendChild(panel);
		panel.setAttribute('id', 'fatalErrorContainer');
		panel.innerHTML = html;
		
		var mainContainer = doc.getElementById('mainContainer');
		mainContainer.className = 'hidden-elem';
		
		var clsBtn = doc.getElementById('clearFatalError');
		if (clsBtn) {
			clsBtn.onclick = function() {
				mainContainer.removeAttribute('class');
				clsBtn.onclick = null;	
				doc.body.removeChild(panel);
			}
		}
		
		return true;
	}
}

isNull = function(value) { 
	if (value === undefined || value === null || value === NaN) {
		return true;
	}
	return false;
} || isNull;

if (!String.prototype.format) {
	String.prototype.format = function() {
		var s = this;
		var i = arguments.length;

		while (i--) {
			s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
		}
		return s;
	};
}

if (!String.prototype.trim) {
	String.prototype.trim = function () {
		return this.replace(/^\s+|\s+$/gm, '');
	};
}

if (!String.prototype.lang) {
	String.prototype.lang = function(culture) {
		var s = this;
		var c = (Lang != null && Lang != undefined) ? Lang[culture] : null;
		var t = (c !== null && c !== undefined) ? c[s] : null;
		
		if (t === null || t === undefined) {
			t = s;
		}
		
		return String(t);
	};
}

if (!String.prototype.toInt && !Number.prototype.toInt) {
	String.prototype.toInt = Number.prototype.toInt = function(radix) { 
		var n = this;
		var r = 10;
		if (radix !== null || radix !== undefined) {
			r = radix;
		}
		return parseInt(n, radix);
	};
}