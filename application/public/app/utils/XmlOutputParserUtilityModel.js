define([
    'underscore',
    'jquery',
    'backbone'
], 
function(_, $, Backbone) {

    var XmlOutputParserUtilityModel = Backbone.Model.extend({

        defaults: {
        },  

        initialize: function() {
            var that = this;
        },
        
        parseAll: function(xml) {
            var that = this;
            var res = $.xmlToJSON(xml);
            var object = {
                meta: {
                    status: null,
                    records: null,
                    message: null,
                    exception: null
                },
                data: null
            }
            
            if (res && res.output) {
                var output = res.output;
                var meta = that.getMeta(output);                
                var data = that.getData(output);
     
                if (meta) {
                    object.meta.status = (meta.status && meta.status.Text) ? meta.status.Text : null;
                    object.meta.message = (meta.message && meta.message.Text) ? meta.message.Text : null;
                    object.meta.exception = (meta.exception && meta.exception.Text) ? meta.exception.Text : '';
                    object.meta.records = (meta.records && meta.records.Text) ? meta.records.Text : null;
                }
                if (data) {
                    object.data = data;
                }
            }
            
            return object;
        },
		
		convertXmlToJson: function(xml) {
            var that = this; 
            var res = $.xmlToJSON(xml);            
            return res;
        },
        
        getMeta: function(output) {
            var that = this;
            if (output && output.meta) {
                return output.meta;
            }
            return null; 
        },
        
        getData: function(output) {
            var that = this;
            if (output && output.data) {
                return output.data;
            }
            return null; 
        },
        
        getXmlMeta: function(xml) {
            var that = this;
            var res = that.parseAll(xml);
            if (res && res.meta) {
                return res.meta;
            }
            return null;           
        },
        
        getXmlData: function() {
            var that = this;
            var res = that.parseAll(xml);            
            if (res && res.data) {
                return res.data;
            }
            return null; 
        }
                   
    });

    return XmlOutputParserUtilityModel;
});
