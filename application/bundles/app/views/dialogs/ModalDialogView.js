define([
    'jquery',
    'underscore',
    'backbone',
    'shared_views/base/BaseView',
    'text!shared_templates/dialogs/modalDialogTemplate.html'
], 
function($, _, Backbone, BaseView, modalDialogTemplate) {

    var ModalDialogView = BaseView.extend({
        
        id: 'modalDialogContainer',
        tagName: 'div',
        template: _.template($(modalDialogTemplate).html()),
        
        events: {           
        },        
        
        initialize: function(params) {
            var that = this;
            $('body').append(that.$el.hide());
            
            that.$el.dialog({ 
                autoOpen: false,
                position: ['auto', 'auto'],                
                width: 320,
                height: 'auto',
                modal: true,
                resizable: false,                
				//hide: {effect: 'fadeOut', duration: 'fast'},                
                close: function(event, ui) {
					if (that && that.$el) {
					    that.$el.dialog('destroy'); 
					    that.remove();
					}
				}
            });		
        },
        
        render: function(type, title, text, callback, titleClass) {
            var that = this;

            if (type === WebApp.constants.DIALOG_SUCCESS || type === WebApp.constants.DIALOG_ERROR) {                
                that.$el.dialog({
                    title: title,
                    buttons: [{
						text: 'Ok'.lang(WebApp.language),
                        click: function() { 
                            $(this).dialog('close');
							
                            if (callback) {
                                callback(true);
                            }
                        }
                    }]
                });
            }
            else {
                that.$el.dialog({ 
                    title: title,
                    buttons: [{
						text: 'Ok'.lang(WebApp.language),
                        click: function() {
							that.$el.dialog('destroy'); 
							that.remove();
                            callback(true); 
                        }}, {
						text: 'Cancel'.lang(WebApp.language),
                        click: function() { 
                            $(this).dialog('close');
                            callback(false); 
                        }
                    }]
                });
            }
            
            that.$el.html(that.template({
                mode: type,
                message: text
            }));   

			var title = that.$el.parent().find('.ui-dialog-titlebar');
			if (!isNull(titleClass)) {
				title.find('.ui-dialog-title').addClass(titleClass);
			}			
			
            that.$el.dialog('open');
			
			return that;
        }
        
    });

    return ModalDialogView;
});
