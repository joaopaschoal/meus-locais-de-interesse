(function() {
	'use strict';
	define([
		'jplib/core/languageCore',
	], function ($lc) {

		var constants = {
			// add constants here
		};

		var _ModuleBase = $lc.declare($lc.Evented, {

			emit: function(channel, eventArgs) {
				return this.emit(channel, eventArgs);
			}

		});
		
		$lc.mixin(_ModuleBase, constants);

		return _ModuleBase;
	});
}());
