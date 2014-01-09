define([
    'jquery',
    'underscore',
    'shared_views/base/BaseView',
	'shared_views/widgets/ComboWidgetView',
	'shared_views/widgets/MessageWidgetView',
    'models/UserModel',
	'models/collections/UserCollection',
    'text!templates/start/startTemplate.html'
], 
function($, _, BaseView, ComboWidgetView, MessageWidgetView, UserModel, UserCollection, startTemplate) {
    
    var StartView = BaseView.extend({
        
        tagName: 'div',
        id: 'startContainer',
		template: startTemplate,        
        
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
			that.options = {		
				content: null,
				combo: null,
				successMessage: null,
				errorMessage: null,
				infoMessage: null
			};
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
			that.addSubview(successView, 'successView').appendSubview(successView, that.options.successMessage);
            successView.render().setMessage('This is a success message!');
			
			var errorView = new MessageWidgetView({ type: WebApp.constants.MESSAGE_ERROR });
			that.addSubview(errorView, 'errorView').appendSubview(errorView, that.options.errorMessage);
            errorView.render().setMessage('This is an error message!');
			
			var infoView = new MessageWidgetView({ type: WebApp.constants.MESSAGE_ALERT });
			that.addSubview(infoView, 'infoView').appendSubview(infoView, that.options.infoMessage);
            infoView.render().setMessage('This is an info message!');
			
			var comboView = new ComboWidgetView({ customId: 'appCombo', defaultOpt: { value: 0, text: 'Select' } });
			that.addSubview(comboView, 'comboView').appendSubview(comboView, that.options.combo);
            comboView.render();
			comboView.onBeforeLoadData();
			comboView.setData([{ value: '1', text: 'One' }, { value: '2', text: 'Two' }], null, true);			
        
            var user = new UserModel();    
            var xhr = user.getUser();
			that.callsStack.push(xhr);
			
			var users = new UserCollection();    
            var xhr = users.getUsers();			
			that.callsStack.push(xhr);
			
        }
        
    });
    
    return StartView;
});
