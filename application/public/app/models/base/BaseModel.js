define([
    'underscore',
    'backbone',
    'shared_utils/XmlInputFormatterUtilityModel',
    'shared_utils/XmlOutputParserUtilityModel'
], 
function(_, Backbone, XmlInputFormatterUtilityModel, XmlOutputParserUtilityModel) {

    var BaseModel = Backbone.Model.extend({    
        
		dataType: WebApp.constants.AJAX_DTYPE_JSON,
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
        
        parse: function(data) {
            var that = this;
            var response = null;
			
			switch (that.dataType) {
				case WebApp.constants.AJAX_DTYPE_JSON: 
					response = that.parseJSON(data);
					break;
				case WebApp.constants.AJAX_DTYPE_XML:
				default: 
					response = that.parseXML(data);
					break;
			}
            
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
				else {
					$.Log.warn('Response is empty');
				}
            } catch (e) {
                var msg = 'Error while mapping model::{0}({1}) - {2}'.format(that.modelName, that.cid, e);
                $.Log.error(msg);
                throw new Error(msg);                
            }
        },
		
		parseXML: function(data) {
			var that = this;
			$.Log.debug('Fetched data');
			$.Log.log(data);
			var parser = new XmlOutputParserUtilityModel();
            var xml = data;
            var response = parser.parseAll(xml);
			
			return response;
		},
		
		parseJSON: function(data) {
			var that = this;
			$.Log.debug('Fetched data');
			$.Log.obj(data);
			
			return data;
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
					if (that.dataType === WebApp.constants.AJAX_DTYPE_XML) {
						$.Log.warn('XML tag <{0}> not found for model::{1}({2})'.format(param, that.modelName, that.cid));
					}
					else {
						$.Log.warn('JSON key \'{0}\' not found for model::{1}({2})'.format(param, that.modelName, that.cid));
					}
                }
                else {				
					if (_.has(item[param], 'Text')) {
						value = item[param].Text;
					}
					else {
						value = item[param];
					}
                    
                    $.Log.log('Setting attribute::{0}({1}) = {2}'.format(param, type, value));
                    if (WebApp.constants.SYS_T_INTEGER === type) {
                        that.set(param, value.toInt());
                    }
                    else if (WebApp.constants.SYS_T_ARRAY === type) {                        
						var collection = that.get(param).setCollection(item[param]);
						that.get(param).add(collection);
						
						$.Log.debug('Mapped collection::{0}'.format(that.get(param).collectionName));
						$.Log.obj(that.get(param));
                    }
                    else {
                        that.set(param, value);
                    }    
                }
            }
            
            $.Log.debug('Mapped model::{0}({1})'.format(that.modelName, that.cid));
            $.Log.obj(that);
        },
        
        call: function(options, filters, order, pagination, beforeCallback, successCallback, errorCallback) {
            var that = this;
			var service = (!isNull(options) && !isNull(options.service)) ? options.service : '';
			var type = (!isNull(options) && !isNull(options.type)) ? options.type : WebApp.constants.AJAX_POST;
			that.dataType = (!isNull(options) && !isNull(options.dataType)) ? options.dataType : WebApp.constants.AJAX_DTYPE_XML;
			
			var xmlFormatter = new XmlInputFormatterUtilityModel();
            var xml = xmlFormatter.makeInputXML(filters, order, pagination);         
            
			$.Log.debug('Fetching data from::{0}'.format(service));
            var xhr = that.fetch({
                type: type,
                dataType: that.dataType,
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