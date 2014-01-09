define([
    'underscore',
    'backbone',
    'shared_utils/XmlInputFormatterUtilityModel',
    'shared_utils/XmlOutputParserUtilityModel'
], 
function(_, Backbone, XmlInputFormatterUtilityModel, XmlOutputParserUtilityModel) {

    var BaseCollection = Backbone.Collection.extend({
        
		dataType: null,
		collectionName: null,
        model: null,        
        
        defaults: {
            tags: { root: null }
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
						if (that.dataType === WebApp.constants.AJAX_DTYPE_XML) {
							$.Log.debug('Searching for root tag <{0}>'.format(root));
						}
						else {
							$.Log.debug('Searching for root key \'{0}\''.format(root));
						}
                        if (!isNull(root)) {
							if (!isNull(response.data[root])) {
								var items = null;
								items = response.data[root];
								
								collection = that.setCollection(items);			

								$.Log.debug('Mapped collection::{0}'.format(that.collectionName));
								$.Log.obj(that);								
							}
							else {
								$.Log.warn('Root tag not found in collection::{0}'.format(that.collectionName));
							}
                        }
                        else {
                            $.Log.warn('Root tag not specified in collection::{0}'.format(that.collectionName));
                        }
                    }
                }
            } catch (e) {
                var msg = 'Error while mapping collection::{0} - {2}'.format(that.collectionName, e);
                $.Log.error(msg);
                throw new Error(msg);                
            }
			
			return collection;
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
        
        setCollection: function(items) {
            var that = this;
			var collection = [];
			
            if (isNull(that.model)) {
                var msg = 'No model associated to this collection::{0}'.format(that.collectionName);                
                throw msg;
            }
            var model = new that.model();
            var root = model.tags.root;
            
            if (isNull(root)) {
                $.Log.warn('Root tag not specified in model::{0}({1})'.format(model.modelName, model.cid));
            }
            
            if (!isNull(items)) {                
                that.reset();
                var list = null;
				if (model.dataType === WebApp.constants.AJAX_DTYPE_XML) {
					list = items[root];
				}
				else {
					list = items;
				}
                
				if (isNull(list) || list.length <= 0) {  
					if (model.dataType === WebApp.constants.AJAX_DTYPE_XML) {
						$.Log.warn('Root tag <{0}> not found in model::{1}({2})'.format(root, model.modelName, model.cid));
					}
                }
                else {
                    model.destroy();
					var m = null;
					var item = null;
					$.Log.debug('Mapping models::{0} into collection::{1}'.format(model.modelName, that.collectionName));
                    if (!(list instanceof Array)) {
                        item = list;  
						m = that.map(item);						
                        collection.push(m);
						$.Log.log('Pushed model::{0}({1}) into collection::{2}'.format(m.modelName, m.cid, that.collectionName));
                    }
                    else {
                        for (var i = 0; i < list.length; i++) {
                            item = list[i];     
							m = that.map(item);						
							collection.push(m);
							$.Log.log('Pushed model::{0}({1}) into collection::{2}'.format(m.modelName, m.cid, that.collectionName));
                        }
                    }				
                }
            }			
			
            return collection;
        },
        
        map: function(item) {
            var that = this; 
            var model = new that.model();
            model.map(item);
            
            return model;
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
        
    return BaseCollection;
});