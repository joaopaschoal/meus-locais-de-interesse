(function() {
	'use strict';
	define([
		'jplib/core/dojoFacade'
	], function (dojoFacade) {

		// ----- Exceptions ----- //

		function BaseException() {
		}
		BaseException.prototype = new Error();
		BaseException.prototype.setExceptionMessage = function(message) {
			this.message = (typeof(message) === 'string' && message !== '') ? message : this.getDefaultMessage();
		};

		function ApplicationException(message) {
			this.name = 'ApplicationException';
			this.getDefaultMessage = function() {
				return 'There was an error in the application';
			};
			this.setExceptionMessage(message);
		}
		ApplicationException.prototype = new BaseException();

		function MissingParamsException(param) {
			this.name = 'MissingParamsException';
			this.param = param;
			this.getDefaultMessage = function() {
				return 'The parameter: "' + this.param + '" is missing';
			};
			this.setExceptionMessage();
		}
		MissingParamsException.prototype = new ApplicationException();

		
		var langCore = {
			isSet: function(obj) {
				return typeof(obj) !== 'undefined';
			},

			isObject: function(obj) {
				return typeof(obj) === 'object';
			},

			isString: function(obj) {
				return typeof(obj) === 'string';
			},

			isNotNullObject: function(obj) {
				return typeof(obj) === 'object' && obj !== null;
			},

			isNotEmptyString: function(str) {
				return typeof(str) === 'string' && str !== '';
			},

			isDOMElement: function(obj) {
				return (
    				typeof HTMLElement === "object" ? obj instanceof HTMLElement : //DOM2
    					obj !== undefined && typeof obj === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === "string"
    			);
			},

			isDOMElementOrNotEmptyString: function(obj) {
				return this.isNotEmptyString(obj) || this.isDOMElement(obj);
			},

			executeOrYield: function(context, returnVal, onceCompletedFunction) {
				if (returnVal instanceof this.Deferred) {
					returnVal.then(function(yieldReturnVal) {
						return this.ctx(context, onceCompletedFunction)(yieldReturnVal);
					});
				} else {
					return this.ctx(context, onceCompletedFunction)(returnVal);
				}
			},

			//exceptions:
			ApplicationException: ApplicationException,

			MissingParamsException: MissingParamsException

		};

		dojoFacade.mixin(langCore, dojoFacade);

		return langCore;
	});
}());