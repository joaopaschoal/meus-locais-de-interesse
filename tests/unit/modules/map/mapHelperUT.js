/* jshint expr: true */
(function() {
	'use strict';
	define([
		'tests/support/bddMap',
		'intern/chai!expect',
		'jplib/core/languageCore',
		'jplib/modules/helpers/map/MapHelper',
		'esri/map',
		'esri/layers/FeatureLayer',
		'esri/layers/ArcGISDynamicMapServiceLayer'
	], function (bddMap, expect, $lc, MapHelper, Map, FeatureLayer, ArcGISDynamicMapServiceLayer) {

		var mapHelper = new MapHelper();

		function createInvisibleDivMapHolder() {
			var strId = 'div_map_helper';
			$lc.domCreate('div', { id: strId, style: 'display: none;' }, document.body);
			return strId;
		}

		bddMap.describe('MapHelper', function () {

			bddMap.it('Should create a map', function (dfd) {
				var mapDivId = createInvisibleDivMapHolder();
				
				var map = mapHelper.createMap(mapDivId);

				expect(map, 'The created map must not be null.').not.to.be.null;
				expect(map, 'The map must be of type "esri/map".').to.be.instanceof(Map);


				//Expect the map to emit load event:
				bddMap.registerEventAwaitMsg('load');
				$lc.once(map, 'load', function(loadedParams) {
					bddMap.clearEventAwaitMsg();
					try {
						expect(map.id, 'The map loaded wasnt the same as the map created').to.equal(loadedParams.map.id);
					 	dfd.resolve();
					 } catch(e) {
					 	dfd.reject(e);
					 } finally {
					 	map.destroy();
					 }
				});
			});


			bddMap.it('Should count the number of layers in a given map', function(dfd) {
				bddMap.registerEventAwaitMsg('layers-removed');
				$lc.once(bddMap.testMap, 'layers-removed', function() {
					bddMap.clearEventAwaitMsg();
					var layer1 = new ArcGISDynamicMapServiceLayer(bddMap.getSampleLayesUrls().mapLayer);
					var layer2 = new FeatureLayer(bddMap.getSampleLayesUrls().featureLayer);
					
					bddMap.registerEventAwaitMsg('layers-add-result');
					$lc.once(bddMap.testMap, 'layers-add-result', function() {
						bddMap.clearEventAwaitMsg();
						bddMap.asyncErrorMsg = null;
						try {
							//expect 3 layers: the two added plus the basemap:
							expect(mapHelper.countLayers(bddMap.testMap)).to.equal(2);
							dfd.resolve();
						} catch(e) {
							dfd.reject(e);
						}
					});
					bddMap.testMap.addLayers([layer1, layer2]);
				});
				bddMap.testMap.removeAllLayers();
			});

		});
	});
}());