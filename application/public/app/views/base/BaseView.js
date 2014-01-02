define([
    'jquery',
    'underscore',
    'backbone'
], 
function($, _, Backbone) {

    var BaseView = Backbone.View.extend({

        options: null,
        bindings: [],         
        model: null,
        collection: null,      
        callsStack: [],             
        
        appendSubview: function(view, el) {
			var that = this;
            el || (el = that.$el);
            el.append(view.el);
						
			$.Log.debug('Append subview::{0}({1}) - Parent view::{2}({3})'.format(view._name, view.cid, that._name, that.cid));
			$.Log.obj(view);
        },		
        
        bindTo: function (model, ev, callback, once) {
            var that = this;            
			if (once) {
				that.listenToOnce(model, ev, callback);
			}
			else {
				that.listenTo(model, ev, callback);
			}
			//model.on(ev, callback, that);
            that.bindings.push({ model: model, ev: ev, callback: callback });
			
			$.Log.debug('Add bindTo::{0} - From view::{1}({2})'.format(model.cid, that._name, that.cid));
			$.Log.obj(that.bindings);
        },

        unbindFromAll: function () {
            var that = this;
            _.each(that.bindings, function (binding) {
                that.stopListening(binding.model);
				//binding.model.off(binding.ev, binding.callback);
				$.Log.debug('Remove bindTo::{0} - From view::{1}({2})'.format(binding.model.cid, that._name, that.cid));
				$.Log.obj(that.binding);
            });
            that.bindings = [];
        },  

		// onRemove will be automatically called on all the subviews, onRemove is called before 
        // element is removed from the view and after all the subviews were destroyed/cleaned up first
        // it should be overwritten by user - can be used to clean up bindings to global objects, 
        // persistant collections and models, nullify references or trigger custom events etc.
        onRemove: function () {  
            var that = this;
            
            if (typeof(that.beforeOnRemove) == "function") {
                that.beforeOnRemove();
            }
            that._purgeCallsStack();
            that.unbindFromAll();
			that._purgeElements(that.options);            
			that.options = {};
        },
		
		abortPendingCalls: function() {
			var that = this;
			that._purgeCallsStack();
		},
        
        _purgeCallsStack: function() {
            var that = this;
            for (var xhr in that.callsStack) {
                var call = that.callsStack[xhr];
                try {                    
                    if (call.readyState !== 4) {
						$.Log.debug('XHR aborted::{0} - From view::{1}({2})'.format(readyState, that._name, that.cid));
						$.Log.obj(call);
		                call.abort();
		            }
		            that.callsStack[xhr] = null;
			        delete that.callsStack[xhr];
		        }
		        catch(e) {
			        that.callsStack[xhr] = null;
			        delete that.callsStack[xhr];
			    }	
            }
        },
		
		_purgeElements: function(array) {
			var that = this;
			if (array) {
                for (var e in array) {
					if (array[e]) {
						if (array[e].constructor === Array) {
							that._purgeElements(array[e]);
						}
						else {						    					    
						    array[e] = null;
					    	delete array[e];												
						}
					}
                }
            }
		},
        
        // adds a subview to the hierarchy and returns it for further use
        // if passed second optional name parameter adds a subview and stores 
        // a reference to that subview on an identity map;
        // names are unique and adding a view with the same name destroys 
        // the old view automatically making it easy to replace views
        // one can retrieve a named view using the `getSubview` method and passing view's name
        addSubview: function(subview, name) {
            // check if subviews array already exists if not create it
            this._subviews || (this._subviews = []);
            // add reference to superview to create vertical view hierarchy
            subview.parent = this;
            this._subviews.push(subview);
            // if it is a named view add the view to the named subviews collection
            if (name) {
                subview._name = name;
                this._namedSubviews || (this._namedSubviews = {});
                this._namedSubviews[name] && this.removeSubview(name);
                this._namedSubviews[name] = subview;
            }
			
			$.Log.debug('Add subview::{0}({1}) - Parent view::{2}({3})'.format(name, subview.cid, this._name, this.cid));
			$.Log.obj(subview);
			
            return subview;
        },

        // returns a subview with a given name
        getSubview: function(name) {
            if (!this._namedSubviews) {
                return null;
            }
            return this._namedSubviews[name];
        },
        
        // removes references to and removes subview given by reference or name if exists 
        removeSubviewIfExists: function(nameOrView) {            
            var subview = nameOrView instanceof Backbone.View ? nameOrView : this._namedSubviews && this._namedSubviews[nameOrView];
            if (subview) {
                subview && subview.remove();
                return subview;
            }
            return null;
        },

        // Remove this view from the DOM. Note that the view isn't present in the
        // DOM by default, so calling this method may be a no-op.
        // remove shouldn't be altered - any changes user wants to make during the removal should
        // be handled by overwriting the `onRemove` method
        remove: function() {
            this.$el.remove();
            // clear refs from parent view
            this.parent && this.parent._cleanRefs(this);
            
			$.Log.debug('Remove all subviews of view::{0}({1})'.format(this._name, this.cid));
			
			// trigger the cleanup
            this._remove();
			
            return this;
        },

        // removes references to and removes subview given by reference or name
        removeSubview: function(nameOrView) {
            var subview = nameOrView instanceof Backbone.View ? nameOrView : this._namedSubviews && this._namedSubviews[nameOrView];
            subview && subview.remove();
			
            return subview;
        },

        // removes and cleans up all the subviews in hierarchy without removing the view
        removeSubviews: function() {
            _.invoke(this._subviews, 'remove');
        },

        // Detach maps to jQuery detach method and marks the view as detached
        // it's very important when it comes to memory menagement and helping the garbage collector as 
        // all the jquery events, backbone event delegations and jquery data won't be cleaned up if the 
        // superview is removed while subview is detached from the DOM structure.
        // Because of that we are marking the the view as detached so later on in the `_onDestroy` method we can manualy call
        // the `cleanData` method to make sure we are not leaving any references to jquery events and data for elements that are
        // never making it back to the DOM.
        // Also sometimes we pre-create views on initialization or as content for some popoup/dialog jquery plugins -
        // if we use subviews like that we should mark views as detached ourselves as if they aren't children to the DOM
        // tree of the parent view they will never get cleaned up properly
        // If you know superview is not going to be removed any time soon (or at all) or that the view have a small chance of
        // being reattached it's better to play safe and use remove and just recreate the view when required
        detach: function() {
            this.detached = true;
            this.$el.detach();
            return this;
        },

        // maps to jquery cleanData to properly clean up detached view
        cleanData: function() {
            $.cleanData(this.el.getElementsByTagName("*"));
            $.cleanData([this.el]);
        },

        // `_remove` is a private method and shouldn't be altered to make sure it is always working as intended,
        // this method invokes the `_remove` method on all view's subviews and calls the onRemove to clean up any 
        // backbone references or trigger custom actions if user has overriden the `onRemove` method on given view and
        // all the subviews in its view hierarchy
        _remove: function() {
            // we are calling only _remove on the subviews as we don't want to remove every single subview 
            // from the DOM tree one by one - we want to clean up all the refs and trigger the onRemove if
            // any kind of custom cleaning up is required, all hierarchy references are cleaned up after 
            // _remove is invoked on all the subviews
			$.Log.log('Remove child subview::{0}({1})'.format(this._name, this.cid));
            _.invoke(this._subviews, '_remove');
            // cleanup the view hierarchy references after the _remove on all the children was called
            this.parent = null;
            this._subviews = null;
            this._namedSubviews = null;
            // if element isn't attached to the view we need to manualy take care of cleaning up all the jQuery refs
            // if view was detached, we check if it was reattached to the DOM if not we manualy clean up the jquery refs
            (this.detached || this.options.detached) && this.cleanData();
            // call the onRemove callback to do user defined cleanup
            this.onRemove();
            // unbind any events that could have been possibly bound to this view as handlers may keep the view in the memory
            this.unbind();
            // clear references to model and collection in case these were persistent, also clears the references to options 
            // as often we are passing references to persistent or external objects that might persist beyond the life of the view
            // needs to be last in case onRemove call needed access to these properties.
            this.model = null;
            this.collection = null;
            this.options = null;
            this.el = null;
            this.$el = null;
        },

        // cleans the references between parent view and subview
        _cleanRefs: function(subview) {			
            // removes name references
            subview._name && (delete this._namedSubviews[subview._name]);
            // remove the subview from the subviews collection
            this._subviews = _.without(this._subviews, subview);
        }
        
    });
        
    return BaseView;
});