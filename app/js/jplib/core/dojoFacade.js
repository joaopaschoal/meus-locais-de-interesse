(function() {
	'use strict';
	define([
		'dojo/_base/declare',
		'dojo/_base/lang',
		'dojo/Evented',
		'dojo/dom',
		'dojo/dom-construct',
		'dojo/on',
		'dojo/Deferred',

		'dijit/Dialog',
		'dijit/_WidgetBase', 
		'dijit/_TemplatedMixin'
	], function (declareDJ, langDJ, EventedDJ, domDJ, domConstructDJ, onDJ, DeferredDJ, DialogDJ, _WidgetBaseDJ, _TemplatedMixinDJ) {
		return {
			declare: function(inheritance, definition) {
				return declareDJ(inheritance, definition);
			},

			mixin: function(destObj, sourceObj) {
				return langDJ.mixin(destObj, sourceObj);
			},

			domById: function(nodeId) {
				return domDJ.byId(nodeId);
			},

			domCreate: function(strElementName, jsonElementProperties, targetNode) {
				return domConstructDJ.create(strElementName, jsonElementProperties, targetNode);
			},

			domPlace: function(node, destNode, pos) {
				return domConstructDJ.place(node, destNode, pos);
			},

			on: function(sender, channel, callback) {
				return onDJ(sender, channel, callback);
			},

			once: function(sender, channel, callback) {
				return onDJ.once(sender, channel, callback);
			},

			ctx: function(context, funcPointer) {
				return langDJ.hitch(context, funcPointer);
			},

			clone: function(obj) {
				return langDJ.clone(obj);
			},

			Evented: EventedDJ,

			Deferred: DeferredDJ,

			Dialog: DialogDJ,

			_TemplatedMixin: _TemplatedMixinDJ,

			_WidgetBase: _WidgetBaseDJ
		};
	});
}());