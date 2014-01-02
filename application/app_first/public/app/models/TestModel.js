define([
    'underscore',
    'backbone',
    'shared_utils/XmlInputFormatterUtilitytModel',
    'shared_utils/XmlOutputParserUtilityModel'
], 
function(_, Backbone, XmlInputFormatterUtilitytModel, XmlOutputParserUtilityModel) {

    var TestModel = Backbone.Model.extend({

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
            
            if (response) {
                that.meta_data = response.meta;
                if (response && response.data && response.data.ConfigId) {
                    var id = parseInt(response.data.ConfigId.Text, 10);
                    if (id > 0) {
                        that.set('Id', String(id));
                    }
                }
            }
            
            if (response && response.data && response.data.Configurations && response.data.Configurations.Configuration) {
                var item = response.data.Configurations.Configuration;
                if (item) {
                    that.map(item);
                }
            }
        },
        
        map: function(item) {
            var that = this;
            
            try {
                that.set('Id', item.Id.Text);
                that.set('CeUo', item.CeUo.Text);
                that.set('FileName', item.FileName.Text);
                that.set('FilePath', item.FilePath.Text);
                that.set('FileTypeId', item.FileTypeId.Text);
                that.set('FileTypeDescription', item.FileTypeDescription.Text);
                that.set('Instance', item.Instance.Text);
                that.set('ElaborationPath', item.ElaborationPath.Text);
                that.set('WorkPath', item.WorkPath.Text);
                that.set('Elaborations', item.Elaborations.Text);
                that.set('Delimiter', item.Delimiter.Text);
                that.set('LastConfigUpdate', item.LastConfigUpdate.Text);
                that.set('StartExecution', item.StartExecution.Text);
                that.set('DaysExecution', item.DaysExecution.Text);
                that.set('Repeat', item.ContinueExecution.Text);
                that.set('RegExp', item.FileNameIsRegularExpression.Text);
                that.set('BulkRecords', item.BulkRecords.Text);
                that.set('IsRunning', item.IsRunning.Text);
                that.set('IsPending', item.IsPending.Text);
                
				/*
                if (item.ConfElaborations && item.ConfElaborations.ConfElaboration) {
                    var items = item.ConfElaborations.ConfElaboration;                    
                    that.get('ConfElaborations').setCollection(items);
                }
				*/
            }
            catch (e) {
                alert("Errore mappatura oggetto TestModel: " + e);
            }
            
            that.insertIntoTaffy();
        },
        
        insertIntoTaffy: function() {
            var that = this;
        
            try {
                WebApp.database.tables.tb_configuration.insert({
				    'Id': that.get('Id'),
				    'CeUo': that.get('CeUo'),
				    'FileName': that.get('FileName'),
				    'FilePath': that.get('FilePath'),
				    'FileTypeId': that.get('FileTypeId'),
				    'FileTypeDescription': that.get('FileTypeDescription'),
				    'Instance': that.get('Instance'),
				    'ElaborationPath': that.get('ElaborationPath'),
				    'WorkPath': that.get('WorkPath'),
				    'Elaborations': that.get('Elaborations'),
				    'Delimiter': that.get('Delimiter'),
				    'LastConfigUpdate': that.get('LastConfigUpdate'),
				    'StartExecution': that.get('StartExecution'),
				    'DaysExecution': that.get('DaysExecution'),
				    'Repeat': that.get('Repeat'),
				    'RegExp': that.get('RegExp'),
				    'BulkRecords': that.get('BulkRecords'),
				    'IsRunning': that.get('IsRunning'),
				    'IsPending': that.get('IsPending')
			    });
			}
            catch (e) {
                alert("Errore inserimento oggetto TestModel in TaffyDB: " + e);
            }
        },
        
        updateIntoTaffy: function(oldKey) {
            var that = this;            
            var key = oldKey;
            
            if (!key) {
                key = that.get('Id')
            }
        
            try {
                WebApp.database.tables.tb_configuration().filter({ 'Id': key }).update({
				    'Id': that.get('Id'),
				    'CeUo': that.get('CeUo'),
				    'FileName': that.get('FileName'),
				    'FilePath': that.get('FilePath'),
				    'FileTypeId': that.get('FileTypeId'),
				    'FileTypeDescription': that.get('FileTypeDescription'),
				    'Instance': that.get('Instance'),
				    'ElaborationPath': that.get('ElaborationPath'),
				    'WorkPath': that.get('WorkPath'),
				    'Elaborations': that.get('Elaborations'),
				    'Delimiter': that.get('Delimiter'),
				    'LastConfigUpdate': that.get('LastConfigUpdate'),
				    'StartExecution': that.get('StartExecution'),
				    'DaysExecution': that.get('DaysExecution'),
				    'Repeat': that.get('Repeat'),
				    'RegExp': that.get('RegExp'),
				    'BulkRecords': that.get('BulkRecords'),
				    'IsRunning': that.get('IsRunning'),
				    'IsPending': that.get('IsPending')
			    });
			}
            catch (e) {
                alert("Errore aggiornamento oggetto TestModel in TaffyDB: " + e);
            }
        },

        initialize: function() {
            var that = this;
            //that.set('ConfElaborations', new ConfElaborationCollection());
        },
        
        edit: function(beforeCallback, successCallback, errorCallback) {
            var that = this;
            var filters = [
                { field: 'configId', value: that.get('Id') },
                { field: 'configFileName', value: that.get('FileName') },
                { field: 'configFilePath', value: that.get('FilePath') },
                { field: 'configElaborationPath', value: that.get('ElaborationPath') },
                { field: 'configWorkPath', value: that.get('WorkPath') },
                { field: 'configDelimiter', value: that.get('Delimiter') },
                { field: 'configFileTypeId', value: that.get('FileTypeId') },
                { field: 'configRegexp', value: that.get('RegExp') },
                { field: 'configStartExecution', value: that.get('StartExecution') },
                { field: 'configDaysExecution', value: that.get('DaysExecution') },
                { field: 'configRepeat', value: that.get('Repeat') }
            ];
            var xmlFormatter = new XmlInputFormatterUtilitytModel();
            var xml = xmlFormatter.makeInputXML(filters);         
            
            var xhr = that.fetch({
                type: 'POST',
                dataType: 'text',
                data: { xml : encodeURIComponent(xml) },
                url: WebApp.settings.services_url.configuration + 'EditConfiguration',
                beforeSend: beforeCallback,
                success: successCallback,
				error: errorCallback
            });
            
            return xhr;
        },
        
        trash: function(beforeCallback, completeCallback, errorCallback) {
            var that = this;
            var filter = [{ field: 'configId', value: that.get('Id') }];
            var xmlFormatter = new XmlInputFormatterUtilitytModel();
            var xml = xmlFormatter.makeInputXML(filter);           
            
            var xhr = that.fetch({
                type: 'POST',
                dataType: 'text',
                data: { xml : encodeURIComponent(xml) },
                url: WebApp.settings.services_url.configuration + 'DeleteConfiguration',
                beforeSend: beforeCallback,
                success: completeCallback,
				error: errorCallback
            });
            
            return xhr;
        }
       
    });

    return TestModel;
});
