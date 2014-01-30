define([
    'jquery',
    'underscore',
    'backbone',
	'shared_views/base/BaseView',
    'text!shared_templates/widgets/messageWidgetTemplate.html'
], 
function($, _, Backbone, BaseView, messageWidgetTemplate) {

    var MessageWidgetView = BaseView.extend({

		tagName: 'div',
        className: 'message-container',		

        events: {
			'click .display-message': 'hideMessage'
        },
        
        caching: function() {
            var that = this;
			that.options.content = that.$el.find('div');
			that.options.messageText = that.options.content.find('span.text-message');
        },
		
		initialize: function(elems) {
			var that = this;
			that.options = {
				content: null,
				message: null,
				messageText: null,
				customId: null,
				customClass: null,
				type: null
			};
			that.options.customId = (!isNull(elems) && !isNull(elems.customId)) ? elems.customId : null;
			that.options.customClass = (!isNull(elems) && !isNull(elems.customClass)) ? elems.customClass : '';
			that.options.type = (!isNull(elems) && !isNull(elems.type)) ? elems.type : WebApp.constants.MESSAGE_ERROR;	
			that.render();			
		},
        
        render: function() {
            var that = this;
			
            var template = _.template($(messageWidgetTemplate).html());
            that.$el.html(template({
                cid: that.cid,
				customId: that.options.customId,
				customClass: that.options.customClass,
				type: that.options.type
            }));
			
            that.caching();
			return that;
        },
		
		hideMessage: function(ev) {
			var that = this;
			that.options.content.addClass('hidden-elem');
			that.options.messageText.html('&nbsp;');			
			if (ev) {
				ev.preventDefault();
			}
			return that;
		},
		
		setMessage: function(text) {
			var that = this;		
			that.options.messageText.html(text);
			that.options.content.removeClass('hidden-elem');
			return that;
		}
        
    });

    return MessageWidgetView;
});
