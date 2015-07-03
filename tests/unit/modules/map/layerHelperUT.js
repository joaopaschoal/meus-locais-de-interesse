/* jshint expr: true */
(function() {
	'use strict';
	define([
		'tests/support/bddMap',
		'intern/chai!expect',
		'jplib/core/languageCore',
		'jplib/modules/helpers/map/LayerHelper',
		'esri/map',
		'esri/geometry/Extent',
		'esri/layers/FeatureLayer',
		'esri/layers/ArcGISDynamicMapServiceLayer',
		'esri/layers/ArcGISImageServiceLayer'
	], function (bddMap, expect, $lc, LayerHelper, Map, Extent, FeatureLayer, ArcGISDynamicMapServiceLayer, ArcGISImageServiceLayer) {

		var layerHelper = new LayerHelper();

		function createFeatureLayer() {
			var featureLayerURL = bddMap.getSampleLayesUrls().featureLayer;
			var randomId = new Date().getTime();
			return new FeatureLayer(featureLayerURL, {
				id: randomId.toString()
			});
		}


		bddMap.describe('LayerHelper', function () {

			bddMap.it('Should add a layer into a given map', function (dfd) {
				try {
					var fl = createFeatureLayer();
					var layersCount = bddMap.testMap.layerIds.length + bddMap.testMap.graphicsLayerIds.length;
					layerHelper.addLayer(fl, bddMap.testMap).then(
						function() {
							var newLayersCount = bddMap.testMap.layerIds.length + bddMap.testMap.graphicsLayerIds.length;
							expect(newLayersCount, 'No layers was added to the map').to.be.above(layersCount);
							dfd.resolve();
						},
						function(e) {
							dfd.reject(e);
						}
					);

				} catch(e) {
					dfd.reject();
				}
			});

			bddMap.it('Should remove a layer from a given layerId and map', function (dfd) {
				try {
					
					var fl = createFeatureLayer();
					bddMap.registerEventAwaitMsg('layer-add');
					var addHdlr = $lc.on(bddMap.testMap, 'layer-add', function(layerAddResult) {
						bddMap.clearEventAwaitMsg();
						if (layerAddResult.layer.id == fl.id) {
							addHdlr.remove();
							layerHelper.removeLayer(fl.id, bddMap.testMap).then(
								function() {
									var removedLayer = bddMap.testMap.getLayer(fl.id);
									expect(removedLayer, 'The layer wasnt removed from the map').to.be.an('undefined');
									dfd.resolve();
								},
								function(e) {
									dfd.reject(e);
								}
							);
						}
					});
					bddMap.testMap.addLayer(fl);

				} catch(e) {
					dfd.reject();
				}
			});

			bddMap.it('Should create a FeatureLayer', function(dfd) {
				var featureLayer = layerHelper.createFeatureLayer(bddMap.getSampleLayesUrls().featureLayer);
				expect(featureLayer, 'The created object wasnt a FeatureLayer').to.be.instanceof(FeatureLayer);
				dfd.resolve();
			});

			bddMap.it('Should create a MapLayer', function(dfd) {
				var mapLayer = layerHelper.createMapLayer(bddMap.getSampleLayesUrls().mapLayer);
				expect(mapLayer, 'The created object wasnt a MapLayer').to.be.instanceof(ArcGISDynamicMapServiceLayer);
				dfd.resolve();
			});

			bddMap.it('Should create a ImageLayer', function(dfd) {
				var imageLayer = layerHelper.createImageLayer(bddMap.getSampleLayesUrls().imageLayer);
				expect(imageLayer, 'The created object wasnt a ImageLayer').to.be.instanceof(ArcGISImageServiceLayer);
				dfd.resolve();
			});

		});
	});
}());