define([
    'jquery',
    'underscore',
    'backbone',
	'spin',
	'shared_views/base/BaseView',
    'text!shared_templates/widgets/loaderWidgetTemplate.html'
], 
function($, _, Backbone, Spinner, BaseView, loaderWidgetTemplate) {

    var LoaderWidgetView = BaseView.extend({

		tagName: 'div',
        className: 'loader-container',

        events: {
        },
        
        caching: function() {
            var that = this;
			that.options.content = that.$el.find('div');
			that.options.loaderText = that.options.content.find('p.loader-text');
			that.options.spinner = that.options.content.find('span.spinner-js');
        },
        
        initialize: function(elems) {
            var that = this;
			that.options = {
				content: null,
				customId: null,
				customClass: null,
				customText: null,
				loaderText: null,
				spinner: null,
				spinnerEnabled: null,
				spinnerOpts: {}
			};
			that.options.customId = (!isNull(elems) && !isNull(elems.customId)) ? elems.customId : null;
			that.options.customClass = (!isNull(elems) && !isNull(elems.customClass)) ? elems.customClass : '';
			that.options.customText = (!isNull(elems) && !isNull(elems.customText)) ? elems.customText : null;
			that.options.spinnerOpts = 	(!isNull(elems) && !isNull(elems.spinner)) ? elems.spinner : { width: 2, radius: 10, speed: 1.5, color: '#222' };
			that.options.spinnerEnabled = (!isNull(elems) && !isNull(elems.spinnerEnabled) && elems.spinnerEnabled === true) ? true : false;
			that.render();
        },
        
        render: function() {
            var that = this;
			
            var template = _.template($(loaderWidgetTemplate).html());
            that.$el.html(template({
                cid: that.cid,
				customId: that.options.customId,
				customClass: that.options.customClass,
				customText: that.options.customText
            }));
			
            that.caching();
			
			if (that.options.spinnerEnabled) {
				var spinner = new Spinner(that.options.spinnerOpts).spin();
				that.options.spinner.append(spinner.el);
			}
			
			return that;
        },
		
		hideLoader: function() {
			var that = this;
			that.options.content.addClass('hidden-elem');
			return that;
		},
		
		showLoader: function(text) {
			var that = this;
			that.options.content.removeClass('hidden-elem');
			return that;
		}
        
    });

    return LoaderWidgetView;
});
