define([
    'underscore',
    'backbone',
    'shared_utils/XmlInputFormatterUtilityModel',
    'shared_utils/XmlOutputParserUtilityModel'
], 
function(_, Backbone, XmlInputFormatterUtilityModel, XmlOutputParserUtilityModel) {

    var BaseCollection = Backbone.Collection.extend({
        
        model: null,
        collectionName: null,
        
        defaults: {
            tags: { root: null, group: null }
        },  
        
        meta_data: {
            status: null,
            message: null,
            exception: null,
            records: null
        },
        
        setCollection: function(items) {
            var that = this;
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
                var list = items[root];
                if (isNull(list) || list.length <= 0) {                        
                    $.Log.warn('Root tag <{0}> not found in model::{1}({2})'.format(root, model.modelName, model.cid));
                }
                else {
                    model.destroy();
                    if (!(list instanceof Array)) {
                        var item = list;                        
                        that.push(that.map(item));
                    }
                    else {
                        for (var i = 0; i < list.length; i++) {
                            var it = list[i];                        
                            that.push(that.map(it));
                        }
                    }
                }
            }
            
            return true;
        },
        
        map: function(item) {
            var that = this; 
            var model = new that.model();
            model.map(item);
            
            return model;
        }
        
    });
        
    return BaseCollection;
});