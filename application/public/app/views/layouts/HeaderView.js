define([
    'jquery',
    'underscore',
    'backbone',
    'shared_views/base/BaseView',
    'shared_views/dialogs/ModalDialogView',
    'text!shared_templates/layouts/headerTemplate.html'
], 
function($, _, Backbone, BaseView, ModalDialogView, headerTemplate) {
    
    var HeaderView = BaseView.extend({
        
        options: {
            title: null,
            version: null,
			subtitle: null,
			subversion: null
        },
        
        events: {           
            'click #exitBtn': 'exit'
        },

        initialize: function() {
            var that = this;
            that.$el.html(headerTemplate);
            that.caching();
        },
        
        caching: function() {
            var that = this;
            that.options.title = that.$el.find('#appTitle');
            that.options.version = that.$el.find('#appVersion');
			that.options.subtitle = that.$el.find('#appSubtitle');
			that.options.subversion = that.$el.find('#appSubversion');
        },
        
        render: function() {
            var that = this;
            (!isNull(WebApp.title) && WebApp.title != '') ? that.options.title.html(WebApp.title).show() : that.options.title.hide();
            (!isNull(WebApp.version) && WebApp.version != '') ? that.options.version.html(WebApp.version).show() : that.options.version.hide();		
			(!isNull(WebAppPartial.subtitle) && WebAppPartial.subtitle != '') ? that.options.subtitle.html(WebAppPartial.subtitle).show() : that.options.subtitle.hide();
			(!isNull(WebAppPartial.subversion) && WebAppPartial.subversion != '') ? that.options.subversion.html(WebAppPartial.subversion).show() : that.options.subversion.hide();
			
			if (((isNull(WebApp.title) || WebApp.title == '') && (isNull(WebApp.version) || WebApp.version == '')) || 
				((isNull(WebAppPartial.subtitle) || WebAppPartial.subtitle == '') && (isNull(WebAppPartial.subversion) || WebAppPartial.subversion == ''))
			) {
				that.$el.find('#titleSeparator').hide();
				alert('hide');
			}
			else {
				that.$el.find('#titleSeparator').show();
			}
			
			return that;
        },
        
        exit: function (ev) {
            var that = this;
            var dialog = new ModalDialogView();			
			that.addSubview(dialog, 'modalDialogView');
			dialog.render(
                WebApp.constants.DIALOG_QUESTION,
                'Close application'.lang(WebApp.language),
                'Are you sure that you want to close the application <strong>{0}</strong>?'.lang(WebApp.language).format(that.options.title.text()),
                function(ret) {
					var self = that;
					if (ret) {
					    window.open('', '_self', ''); 
                        window.close();
					}
				}
            );
                    
            ev.preventDefault();
            ev.stopPropagation();
        } 
        
    });
    
    return HeaderView;
});
