define([
    'underscore',
    'backbone',
    'shared_utils/XmlInputFormatterUtilityModel',
    'shared_utils/XmlOutputParserUtilityModel'
], 
function(_, Backbone, XmlInputFormatterUtilityModel, XmlOutputParserUtilityModel) {

    var BaseModel = Backbone.Model.extend({    
        
        modelName: null,
        tags: { root: null, children: [] },
        
        defaults: {
            
        },  
        
        meta_data: {
            status: null,
            message: null,
            exception: null,
            records: null
        },
        
        parse : function(data) {
            var that = this;
            var parser = new XmlOutputParserUtilityModel();
            var xml = data;
            var response = parser.parseAll(xml);
            
            try {
                if (!isNull(response)) {
                    if (!isNull(response.meta)) {
                        that.meta_data = response.meta;
                    }

                    if (!isNull(response.data)) {
                        var root = that.tags.root;
                        $.Log.debug('Searching for root tag <{0}>'.format(root));
                        if (!isNull(root)) {                        
                            var item = null;
                            item = response.data[root];
                            $.Log.obj(item);
                            that.map(item);
                        }
                        else {
                            $.Log.warn('Root tag not specified in model::{0}({1})'.format(that.modelName, that.cid));
                        }
                    }
                }
            } catch (e) {
                var msg = 'Error while mapping model::{0}({1}) - {2}'.format(that.modelName, that.cid, e);
                $.Log.error(msg);
                throw new Error(msg);                
            }
        },
        
        
        map: function(item) {
            var that = this;
            
            $.Log.debug('Mapping model::{0}({1})'.format(that.modelName, that.cid));
            var list = that.tags.children;
            for (var k = 0; k < list.length; k++) {
                var param = list[k].node;
                var type = list[k].type;
                var value = null;
                if (isNull(item[param])) {
                    $.Log.warn('XML tag <{0}> not found for model::{1}({2})'.format(param, that.modelName, that.cid));
                }
                else {
                    value = item[param].Text; 
                    
                    $.Log.log('Setting attribute::{0}({1}) = {2}'.format(param, type, value));
                    if (WebApp.constants.SYS_T_INTEGER === type) {
                        that.set(param, value.toInt());
                    }
                    else if (WebApp.constants.SYS_T_ARRAY === type) {
                        that.get(param).setCollection(item[param]);
                    }
                    else {
                        that.set(param, value);
                    }    
                }
            }
            
            $.Log.debug('Mapped model::{0}({1})'.format(that.modelName, that.cid));
            $.Log.obj(that);
            
            
            /*
            if (item.ConfElaborations && item.ConfElaborations.ConfElaboration) {
                var items = item.ConfElaborations.ConfElaboration;                    
                that.get('ConfElaborations').setCollection(items);
            }
            */
        },
        
        call: function(service, filters, order, pagination, beforeCallback, successCallback, errorCallback) {
            var that = this;
            var xmlFormatter = new XmlInputFormatterUtilityModel();
            var xml = xmlFormatter.makeInputXML(filters, order, pagination);         
            
            var xhr = that.fetch({
                type: 'POST',
                dataType: 'text',
                data: { xml : encodeURIComponent(xml) },
                url: service,
                beforeSend: beforeCallback,
                success: successCallback,
				error: errorCallback
            });
            
            return xhr;
        }
        
    });
        
    return BaseModel;
});