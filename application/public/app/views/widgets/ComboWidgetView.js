define([
    'jquery',
    'underscore',
    'backbone',
	'shared_views/base/BaseView',
    'text!shared_templates/widgets/comboWidgetTemplate.html'
], 
function($, _, Backbone, BaseView, comboWidgetTemplate) {

    var ComboWidgetView = BaseView.extend({

		tagName: 'div',
        className: 'combo-container',
	
		options: {
			content: null,
			combo: null,
			cid: null,
			customId: null,
			customClass: null,
			labelText: null,	
			isDisabled: null,
			defaultOpt: null,
			hideDefaultOpt: null,
			selectedValue: null,
            comboValues: []
		},

        events: {
			'change select': 'changedValue'
        },
        
        caching: function() {
            var that = this;
			that.options.content = that.$el.find('div');
			that.options.combo = that.options.content.find('select');
        },
        
        initialize: function(elems) {
            var that = this;
            that.options.cid = that.cid;
			that.options.hideDefaultOpt = false;
			that.options.customId = (!isNull(elems) && !isNull(elems.customId)) ? elems.customId : null;
			that.options.customClass = (!isNull(elems) && !isNull(elems.customClass)) ? elems.customClass : '';
			that.options.labelText = (!isNull(elems) && !isNull(elems.labelText)) ? elems.labelText : '';
			that.options.labelText = (!isNull(elems) && !isNull(elems.labelText)) ? elems.labelText : '';
			if (!isNull(elems) && !isNull(elems.defaultOpt)) {
				that.options.defaultOpt['value'] = (!isNull(elems.defaultOpt.value)) ? elems.defaultOpt.value : '';
				that.options.defaultOpt['text'] = (!isNull(elems.defaultOpt.text)) ? elems.defaultOpt.text : '';
				that.options.defaultOpt['alt'] = (!isNull(elems.defaultOpt.alt)) ? elems.defaultOpt.alt : '';
				that.options.defaultOpt['title'] = (!isNull(elems.defaultOpt.title)) ? elems.defaultOpt.title : '';
			}
			
			that.options.selectedValue = (!isNull(elems) && !isNull(elems.selectedValue)) ? elems.selectedValue : null;
			that.render(that.options.selectedValue);
        },
        
        render: function(selected) {
            var that = this;			
			that.options.selectedValue = (isNull(selected)) ? that.options.selectedValue : selected;
			
            var template = _.template($(comboWidgetTemplate).html());
            that.$el.html(template({
                cid: that.options.cid,
				customId: that.options.customId,
				customClass: that.options.customClass,
				isDisabled: that.options.isDisabled,
				labelText: that.options.labelText,
				defaultOpt: that.options.defaultOpt,
				items: that.options.comboValues,
				hideDefaultOpt: that.options.hideDefaultOpt,
				selectedValue: that.options.selectedValue
            }));
			
			that.options.hideDefaultOpt = false;
            that.caching();
			return that;
        },
		
		changedValue: function(ev) {
			var that = this;
			var obj = $(ev.target);
			that.options.selectedValue = obj.val();
			$.Log.debug('Changed combo({0}) value: {1}'.format(that.options.cid, that.options.selectedValue));
			that.options.combo.trigger('changedComboValue', obj.val());
			ev.preventDefault();
			return false;
		},
		
		setSelectedValue: function(selected) {
			var that = this;
			that.options.selectedValue = (isNull(selected) && that.options.defaultOpt) ? that.options.defaultOpt.value : selected;
			return that;
		},
		
		enableCombo: function() {
			var that = this;
			that.options.isDisabled = false;
			that.options.combo.prop('disabled', false);
			return that;
		},
		
		disableCombo: function() {
			var that = this;
			that.options.isDisabled = true;
			that.options.combo.prop('disabled', true);
			return that;
		},
		
		hideCombo: function() {
			var that = this;
			that.options.content.addClass('hidden-elem');
			return that;
		},
		
		showCombo: function() {
			var that = this;
			that.options.content.removeClass('hidden-elem');
			return that;
		},
		
		onBeforeLoadData: function(message, description) {
			var that = this;
			that.options.comboValues = [];
			var option = {
				value: '',
				text: (!isNull(message)) ? message : 'Loading data...'.lang(WebApp.language),
				alt: '',
				title: (!isNull(description)) ? description : message
			};
			$.Log.log('Before loading data into combo({0})'.format(that.options.cid));
			that.options.hideDefaultOpt = true;
			that.options.comboValues.push(option);
			return that.disableCombo().render();
		},
		
		setData: function(selectValues, selected, disabled) {
			var that = this;
			that.options.comboValues = [];
			
			for (var k = 0; k < selectValues.length; k++) {
				var item = selectValues[k];
				var option = {
					value: (!isNull(item) && !isNull(item.value)) ? item.value : '',
					text: (!isNull(item) && !isNull(item.text)) ? item.text : '',
					alt: (!isNull(item) && !isNull(item.alt)) ? item.alt : '',
					title: (!isNull(item) && !isNull(item.title)) ? item.title : ''
				};
				that.options.comboValues.push(option);
			}
			
			$.Log.log('Add {0} values into combo({1})'.format(that.options.comboValues.length, that.options.cid));
			$.Log.obj(that.options.comboValues);
			
			if (!isNull(selected)) {
				return that.render(selected);
			}
			
			if (!isNull(disabled)) {
				if (disabled === true) {
					return that.enableCombo().render();
				}
				else {
					return that.disableCombo().render();
				}
			}
			
			return that.render();
		},
		
		onErrorLoadData: function(message, exception) {
			var that = this;
			that.options.comboValues = [];
			var option = {
				value: '',
				text: (!isNull(message)) ? message : 'Error'.lang(WebApp.language),
				alt: '',
				title: (!isNull(exception)) ? exception : message
			};
			$.Log.error('Error while loading data into combo({0})'.format(that.options.cid));
			that.options.hideDefaultOpt = true;
			that.options.comboValues.push(option);
			return that.disableCombo().render();
		}
        
    });

    return ComboWidgetView;
});
