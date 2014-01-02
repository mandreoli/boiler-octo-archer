define([
    'jquery',
    'underscore',
    'backbone',
    'shared_views/base/BaseView',
	'shared_views/widgets/ComboWidgetView',
	'shared_views/widgets/MessageWidgetView',
    'text!templates/start/startTemplate.html'
], 
function($, _, Backbone, BaseView, ComboWidgetView, MessageWidgetView, startTemplate) {
    
    var StartView = BaseView.extend({
        
        tagName: 'div',
        id: 'startContainer',
		template: startTemplate,
        
        options: {		
			content: null,
			combo: null,
			successMessage: null,
			errorMessage: null,
			infoMessage: null
        },
        
        caching: function() {
            var that = this;
            that.options.content = that.$el.find('#startContent');
			that.options.combo = that.options.content.find('#comboPlaceholder');
			that.options.successMessage = that.options.content.find('#successMessagePlaceholder');
			that.options.errorMessage = that.options.content.find('#errorMessagePlaceholder');
			that.options.infoMessage = that.options.content.find('#infoMessagePlaceholder');
        },
        
        events: {
			'changedComboValue #appCombo': 'gotoApp'
        },

        initialize: function() {
            var that = this;
        },
		
		gotoApp: function(ev, val) {
			var that = this;
			if (val == 2) {
				that.navigateTo('goto/' + val, true, true);
			}
			ev.preventDefault();
		},
		
        render: function() {
            var that = this; 
            that.$el.html(that.template);			
            that.caching();
			
			var successView = new MessageWidgetView({ type: WebApp.constants.MESSAGE_SUCCESS });
			that.addSubview(successView, 'successView');
            that.appendSubview(successView, that.options.successMessage);
            successView.render().setMessage("This is a success message!");
			
			var errorView = new MessageWidgetView({ type: WebApp.constants.MESSAGE_ERROR });
			that.addSubview(errorView, 'errorView');
            that.appendSubview(errorView, that.options.errorMessage);
            errorView.render().setMessage("This is an error message!");
			
			var infoView = new MessageWidgetView({ type: WebApp.constants.MESSAGE_ALERT });
			that.addSubview(infoView, 'infoView');
            that.appendSubview(infoView, that.options.infoMessage);
            infoView.render().setMessage("This is an info message!");
			
			var comboView = new ComboWidgetView({ customId: 'appCombo', defaultOpt: { value: 0, text: 'Select' } });
			that.addSubview(comboView, 'comboView');
            that.appendSubview(comboView, that.options.combo);
            comboView.render();
			comboView.onBeforeLoadData();
			comboView.setData([{ value: '1', text: 'One' }, { value: '2', text: 'Two' }], null, true);
        }
        
    });
    
    return StartView;
});
