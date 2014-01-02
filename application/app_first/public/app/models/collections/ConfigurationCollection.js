define([
    'jquery',
    'underscore',
    'backbone',    
    'models/ConfigurationModel',
    'shared_utils/XmlInputFormatterUtilityModel',
    'shared_utils/XmlOutputParserUtilityModel'
], 
function($, _, Backbone, ConfigurationModel, XmlInputFormatterUtilityModel, XmlOutputParserUtilityModel) {

    var ConfigurationCollection = Backbone.Collection.extend({
        
        model: ConfigurationModel,

        meta_data: {
            status: null,
            message: null,
            exception: null,
            records: null
        },
        
        parse : function(data) {
            var that = this;
            var parser = new XmlOutputParserUtilityModel();
            var collection = []; 
            var xml = data;
            var response = parser.parseAll(xml);
            
            WebApp.database.tables.tb_configuration().remove();
            
            if (response) {
                that.meta_data = response.meta;
            }
            
            if (response && response.data && response.data.Configurations && response.data.Configurations.Configuration) {
                //Check if xml has only a node
                if (!(response.data.Configurations.Configuration instanceof Array)) {
                    var item = response.data.Configurations.Configuration;
                    collection.push(that.map(item));
                }
                else {
                    for (var i = 0; i < response.data.Configurations.Configuration.length; i++) {
                        var item = response.data.Configurations.Configuration[i];
                        collection.push(that.map(item));
                    } 
                }
            }
            
            return collection;
        },
        
        map: function(item) {
            var that = this; 
            var model = new ConfigurationModel();                       
            model.map(item);
            
            return model;
        },
        
        initialize: function(items) {
            var that = this;
        },
        
        setCollection: function(items) {
            var that = this; 
            
            if (items) {
                //WebApp.database.tables.tb_configuration().remove();
                that.reset();
                
                if (!(items instanceof Array)) {
                    var item = items;
                    that.push(that.map(item));
                }
                else {
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        that.push(that.map(item));
                    }
                }
            }
        },
        
        getConfigurations: function(filters, order, pagination, beforeCallback, completeCallback, errorCallback) {
            var that = this;            
            
            var xmlFormatter = new XmlInputFormatterUtilityModel();
            var xml = xmlFormatter.makeInputXML(filters, order, pagination);
            
            var xhr = that.fetch({
                type: 'POST',
                dataType: 'text',
                data: { xml : encodeURIComponent(xml) },
                url: WebApp.settings.services_url.configuration + 'GetConfigurations',
                beforeSend: beforeCallback,
                success: completeCallback,
				error: errorCallback
            });
            
            return xhr;
        }
        
    });

    return ConfigurationCollection;
});
