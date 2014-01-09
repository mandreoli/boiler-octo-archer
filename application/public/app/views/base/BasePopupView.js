define([
    'jquery',
    'underscore',
    'backbone',
    'shared_views/base/BaseView',
	'shared_views/widgets/LoaderWidgetView',
	'shared_views/widgets/MessageWidgetView',
    'text!shared_templates/dialogs/basePopupTemplate.html'
], 
function($, _, Backbone, BaseView, LoaderWidgetView, MessageWidgetView, basePopupTemplate) {

    var BasePopupView = BaseView.extend({
        	
        id: 'popupContainer',
        tagName: 'div',          
        
        events: {
           'click #popupMessage': 'hideMessage'
        },
        
        caching: function() {
            var that = this;
            that.options.container = that.$el.find('#popupInnerContainer'); 
            that.options.loader = that.$el.find('#popupLoaderPlaceholder'); 
            that.options.content = that.options.container.find('#popupContent');
			that.options.message = that.options.container.find('#popupMessagePlaceholder');	
        },
        
        initBasePopup: function(params) {
            var that = this;
			that.options = {
				container: null,
				loader: null,
				loaderView: null,
				content: null,
				message: null,
				messageView: null,
				popupButtons: null,
				escButton: null
			};
			that.components = [];            
            that.$el.html(basePopupTemplate).hide();            
            that.caching();	
			
			that.$el.dialog({ 
                autoOpen: false,
                resizable: false,
                position: ['auto', 'auto'],                
                width: (!isNull(params.width)) ? params.width : 580,
                height: (!isNull(params.height)) ? params.height : 'auto',
                modal: (!isNull(params.modal)) ? params.modal : true,
                title: (!isNull(params.title)) ? params.title : '',
				//hide: {effect: 'fadeOut', duration: 'fast'},
				close: function(event, ui) { 
				    that.$el.dialog('destroy');                    
					that.remove();
				}
            });
            
            var loaderView = new LoaderWidgetView({ spinnerEnabled: true });
			that.addSubview(loaderView, 'loaderPopupView');
			that.appendSubview(loaderView, that.options.loader);
			that.options.loaderView = loaderView;
			
			var messageView = new MessageWidgetView({ type: WebApp.constants.MESSAGE_ERROR });
			that.addSubview(messageView, 'messagePopupView');
			that.appendSubview(messageView, that.options.message);
			that.options.messageView = messageView;
                        
			var title = that.$el.parent().find('.ui-dialog-titlebar');
			if (!isNull(params.titleClass)) {
				title.find('.ui-dialog-title').addClass(params.titleClass);
			}
            that.options.escButton = title.find('.ui-dialog-titlebar-close').show();
        },
		
		beforeCallback: function() {
			var that = this;
			that.disablePopupButtons();
			that.options.messageView.hideMessage();
			that.options.content.slideUp('fast');
			that.options.loaderView.showLoader();
			that.$el.dialog('option', 'closeOnEscape', false);
		},
		
		errorCallback: function(item, response, request) {
			var that = this;
			that.showPopupError('<strong>URL:</strong> [' + request.url + '] Errore durante la chiamata al web service.');
		},
		
		hideMessage: function(ev) {
			var that = this;
			var self = $(ev.target);
			self.hide();
		},
		
		showPopupError: function(message) {
			var that = this;
			that.enablePopupButtons();
			that.options.messageView.setMessage(message);			
			that.options.content.slideDown('fast');
			that.options.loaderView.hideLoader();
			that.$el.dialog('option', 'closeOnEscape', true);
			return false;
		},
		
		enablePopupButtons: function() {
			var that = this;
            that.options.escButton.show();
            if (that.options.popupButtons) {
                that.options.popupButtons.removeAttr('disabled');
                that.options.popupButtons.removeClass('ui-state-disabled');
            }
			return true;
		},
		
		disablePopupButtons: function() {
			var that = this;	
            that.options.escButton.hide();
            if (that.options.popupButtons) {
                that.options.popupButtons.attr('disabled', 'disabled');
                that.options.popupButtons.addClass('ui-state-disabled');
            }
			return true;
		}
        
    });

    return BasePopupView;
});