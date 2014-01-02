define([
    'underscore',
    'jquery',
    'backbone'
], 
function(_, $, Backbone) {

    var XmlInputFormatterUtilityModel = Backbone.Model.extend({

        defaults: {
        },  

        initialize: function() {
            var that = this;
        },
		
		makeInputXML: function(filters, order, pagination) {
            var that = this;
            var xml_tag = $('<root>');           
            
            if (filters && filters.length > 0) {
                var k = 0;
                var params_tag = $('<parameters>');
                for (k = 0; k < filters.length; k++) {
                    $('<parameter>').attr('field', filters[k].field).text(filters[k].value).appendTo(params_tag);                    
                }
                params_tag.appendTo(xml_tag);
            }
            if (order && order.field && order.value) {
                var orderby_tag = $('<orderby>');
                $('<order>').attr('field', order.field).text(order.value).appendTo(orderby_tag);
                orderby_tag.appendTo(xml_tag);
            }
            if (pagination && pagination.rows && pagination.page) {
                var pagination_tag = $('<pagination>');
                $('<rows>').text(pagination.rows).appendTo(pagination_tag);
                $('<page>').text(pagination.page).appendTo(pagination_tag);
                pagination_tag.appendTo(xml_tag);
            }
            
            return xml_tag.wrapAll('<div></div>').parent().html();
        }
       
    });

    return XmlInputFormatterUtilityModel;
});
