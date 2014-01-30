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
            return that;
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
            
            if (!isNull(res) && !isNull(res.output)) {
                var output = res.output;
                var meta = that.getMeta(output);                
                var data = that.getData(output);
     
                if (!isNull(meta)) {
                    object.meta.status = (!isNull(meta.status) && !isNull(meta.status.Text)) ? meta.status.Text : null;
                    object.meta.message = (!isNull(meta.message) && !isNull(meta.message.Text)) ? meta.message.Text : null;
                    object.meta.exception = (!isNull(meta.exception) && !isNull(meta.exception.Text)) ? meta.exception.Text : '';
                    object.meta.records = (!isNull(meta.records) && !isNull(meta.records.Text)) ? meta.records.Text : null;
                }
                if (!isNull(data)) {
                    object.data = data;
                }
            }
            
            $.Log.debug('Parsed XML response');
            $.Log.obj(object);
            
            return object;
        },
		
		convertXmlToJson: function(xml) {
            var that = this; 
            var res = $.xmlToJSON(xml);            
            return res;
        },
        
        getMeta: function(output) {
            var that = this;
            if (!isNull(output) && !isNull(output.meta)) {
                return output.meta;
            }
            return null; 
        },
        
        getData: function(output) {
            var that = this;
            if (!isNull(output) && !isNull(output.data)) {
                return output.data;
            }
            return null; 
        },
        
        getXmlMeta: function(xml) {
            var that = this;
            var res = that.parseAll(xml);
            if (!isNull(res) && !isNull(res.meta)) {
                return res.meta;
            }
            return null;           
        },
        
        getXmlData: function() {
            var that = this;
            var res = that.parseAll(xml);            
            if (!isNull(res) && !isNull(res.data)) {
                return res.data;
            }
            return null; 
        }
                   
    });

    return XmlOutputParserUtilityModel;
});
