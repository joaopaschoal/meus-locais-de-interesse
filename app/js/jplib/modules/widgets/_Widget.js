(function() {
	'use strict';
	define([
		'jplib/core/languageCore'
	], function ($lc) {

		var constants = {
			// add constants here
		};

		var defaults = {
			defaultTemplateString: '<div></div>',
			defaultParentNode: document.body,
			defaultStylesNode: document.head
		};

		function configureBaseWidgetDefaults(appDefaultCfg) {
			appDefaultCfg = $lc.isObject(appDefaultCfg) ? appDefaultCfg : {};
			var defaultCfg = $lc.clone(defaults);
			$lc.mixin(defaultCfg, appDefaultCfg);

			this.templateString = defaultCfg.defaultTemplateString;
			this.srcParentNode = defaultCfg.defaultParentNode;
			this.srcStyleNode = defaultCfg.defaultStylesNode;
		}

		function validateParams(params) {
			if ($lc.isSet(params) && $lc.isSet(params.srcParentNode)) {
				if (!$lc.isDOMElementOrNotEmptyString(params.srcParentNode)) {
					throw new $lc.BadParamsException('srcParentNode');
				}
			}
		}

		function loadParams(params) {
			if ($lc.isSet(params)) {
				if ($lc.isSet(params.srcParentNode)) {
					this.srcParentNode = params.srcParentNode;
				}

				if ($lc.isSet(params.map)) {
					this.map = params.map;
				}
			}
		}

		function validateWidget() {
			if (!$lc.isSet(this.srcParentNode)) {
				throw new $lc.ApplicationException('The widget must inform its parent element. Please set the "srcParentNode" attribute');
			}
			if (!$lc.isDOMElementOrNotEmptyString(this.srcParentNode)) {
				throw new $lc.ApplicationException('The attribute "srcParentNode" must be whether an element Id string or a DOM element');
			}
		}

		function placeWidgetTemplate() {
			$lc.domPlace(this.domNode, this.srcParentNode);
		}

		function placeWidgetStyle() {
			if ($lc.isNotEmptyString(this.styleString)) {
				if (!$lc.isDOMElementOrNotEmptyString(this.srcStyleNode)) {
					throw new $lc.ApplicationException('Could not apply styles because given "srcStyleNode" is invalid');
				}
				var stylesContainer = $lc.isString(this.srcStyleNode) ? $lc.domById(this.srcStyleNode) : this.srcStyleNode;
				$lc.domCreate('style', {innerHTML: this.styleString}, stylesContainer);
			}
		}

		var _Widget = $lc.declare([$lc._WidgetBase, $lc._TemplatedMixin], {

			templateString : defaults.defaultTemplateString,
			srcParentNode : defaults.defaultParentNode,
			srcStyleNode : defaults.defaultStylesNode,
			map : null,

			constructor: function(params) {
				$lc.ctx(this, validateParams)(params);
				$lc.ctx(this, loadParams)(params);
				$lc.ctx(this, validateWidget)();
			},

			postCreate: function() {
				$lc.ctx(this, placeWidgetTemplate)();
				$lc.ctx(this, placeWidgetStyle)();
			},

			
			
		});

		//Static (class owned) elements:
		$lc.mixin(_Widget, constants);
		$lc.mixin(_Widget, defaults);
		$lc.mixin(_Widget, { configureBaseWidgetDefaults: configureBaseWidgetDefaults} );
		
		return _Widget;
	});
}());
