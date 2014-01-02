define([
    'jquery',
    'underscore',
    'backbone',
	'shared_views/base/BaseView',
    'text!shared_templates/widgets/paginatorWidgetTemplate.html'
], 
function($, _, Backbone, BaseView, paginatorWidgetTemplate) {

    var PaginatorWidgetView = BaseView.extend({

		tagName: 'div',
        className: 'paginator-container',
	
		options: {
			parent: null,
			input: null,
			rows: null,
			pages: 0,
			records: null,
			buttons: null
		},

        events: {
        },
        
        caching: function() {
            var that = this;			
			that.options.buttons = that.$el.find('div#paginatorsButtons_' + that.cid);
			that.options.input = that.options.buttons.find('input#textPage_' + that.cid);
        },
        
        initialize: function(elems) {
            var that = this;
            that.options.parent = elems.parent;
			that.options.pages = elems.pages;
			that.options.rows = elems.rows;
			that.options.records = 0;          			
        },
        
        render: function(records, page) {
            var that = this;
			that.options.records = records;
			
			var total = parseInt(records, 10);
            var begin =  parseInt(((page - 1) * that.options.rows), 10) + 1;
            var end = that.options.rows * page;
            if (end > total) {
                end = total;
            }
			
            var template = _.template($(paginatorWidgetTemplate).html());
            that.$el.html(template({
                input_id: that.cid,
                page: page,
                pages: that.options.pages,
                total: total,
                begin: begin,
                end: end
            }));                       
			
            that.caching();
			
			_.bindAll(that, 'changePaginatorPage');
			that.options.input.off('keypress').on('keypress', that.changePaginatorPage);
			that.options.buttons.find('a.paginator-button.enabled-btn').off('click').on('click', that.changePaginatorPage);
			
			return that;
        },
        
        changePaginatorPage: function(ev) {
            var that = this;
            var self = $(ev.target);		
			if (!self.is('a')) {
				self = that.options.input;
			}
            var page = 1;
			
            //Change page from input
            if (self.is('input')) {
                var key_code = ev.which;
                if (key_code === 13) {					
                    page = self.val();
                    ev.preventDefault();
                    ev.stopPropagation();
                }	
                else {
                    return;
                }
            }
            //Change page from buttons
            else {
                page = self.find('span').text();
            }

            //Check if page exists
            var number = parseInt(page, 10);			
            if (isNaN(number) || number < 1) {
                page = 1;
            }
            else if (number > that.options.pages) {
                page = that.options.pages;
            }
			
			$.Log.debug('Changed page of paginator({0}): {1}'.format(that.cid, page));
			
            that.render(that.options.records, page);
			self.trigger('changedPageValue', page);
			
			ev.preventDefault();
			ev.stopPropagation();
			return that;
        }
        
    });

    return PaginatorWidgetView;
});
