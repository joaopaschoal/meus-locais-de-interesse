(function() {
	'use strict';
	define([
		//jplib
		'jplib/core/languageCore',
		//esri
		'esri/map',
		'esri/geometry/Extent'
	], function ($lc, Map, Extent) {
		
		var DEFAULT_WKID = 102100;
		var esriMap = null;

		function getDefaultParams() {
			return {
				basemap: 'streets',
				extent: new Extent({
					"spatialReference": { "wkid": DEFAULT_WKID },
					"xmax": -4266170.3050508965,
					"xmin": -4296745.116364926,
					"ymax": -1447049.4196640674,
					"ymin": -1462317.716064011
				})
			};
		}

		var MapHelper = $lc.declare(null, {
			createMap: function(idDivMap, params) {
				params = $lc.isObject(params) ? params : getDefaultParams();
				esriMap = new Map(idDivMap, params);
				return esriMap;
			},

			countLayers: function(map) {
				return map.layerIds.length + map.graphicsLayerIds.length;
			}
		});

		return MapHelper;
	});
}());