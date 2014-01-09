define([
    'jquery',
    'underscore',
    'backbone',
	'shared_views/base/BasePopupView',
    'text!templates/popups/configurationPopupTemplate.html'
], 
function($, _, Backbone, BasePopupView, configurationPopupTemplate) {

    var ConfigurationPopupView = BasePopupView.extend({
        
        template: _.template($(configurationPopupTemplate).html()),
        
        events: function() {  
			return _.extend({
			
            }, this.constructor.__super__.events);
		},
		
		caching_aux: function() {
            var that = this;        
        },

        initialize: function(elems) {            
            var that = this;         
			that.initBasePopup(elems.params);
			Object.extend( {
					access: WebApp.constants.READ,
					parent: null
				}, that.options
			);
			that.options.parent = (elems.parent) ? elems.parent : that.options.parent;
			that.options.access = elems.access;
			
		    that.options.content.html(that.template({
				
            }));			

			that.caching_aux();
        },		
        
        render: function() {
            var that = this;
            var buttons = {};			
            
            if (that.options.access === WebApp.constants.UPDATE) {
                buttons = {
                    "Ok": function() { 
						_.bindAll(that, 'beforeCallback', 'successCallback', 'errorCallback');  								
                    },
                    "Chiudi": function() { that.$el.dialog('close'); }
                };
            }
            else if (that.options.access === WebApp.constants.INSERT) {
                buttons = {
                    "Ok": function() {
						_.bindAll(that, 'beforeCallback', 'successCallback', 'errorCallback');  
                    },
                    "Chiudi": function() { that.$el.dialog('close'); }
                };
            }
            else {
                buttons = {
                    "Chiudi": function() { that.$el.dialog('close'); }
                };
            }
			
			that.$el.dialog('option', 'buttons', buttons);
			that.$el.dialog('open');
            that.options.popupButtons = that.$el.dialog().parent().find('.ui-dialog-buttonpane').find('button');
			
			return that;
        },
		
		successCallback: function(response) {
			var that = this;
			var res = response.meta_data;

            if (res.status === WebApp.constants.SUCCESS) {    	   
                that.$el.dialog('option', 'closeOnEscape', true);
                that.$el.dialog('close');
            }
		    else {
				that.showPopupError(res.message);
			}
		}
		
    });
    
    return ConfigurationPopupView;
});