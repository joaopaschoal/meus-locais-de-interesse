(function() {
    'use strict';
    define([
        'jplib/core/languageCore',
        'jplib/modules/_ModuleBase',
        'esri/layers/FeatureLayer',
        'esri/layers/ArcGISDynamicMapServiceLayer',
        'esri/layers/ArcGISImageServiceLayer'
    ], function ($lc, _ModuleBase, FeatureLayer, ArcGISDynamicMapServiceLayer, ArcGISImageServiceLayer) {

        var constants = {
            LAYER_ADDED: 'layer_added',

            TYPE_FEATURE_LAYER: 'typeFeatureLayer',
            TYPE_MAP_LAYER: 'typeMapLayer',
            TYPE_IMAGE_LAYER: 'typeImageLayer'
        };


        var LayerHelper = $lc.declare(_ModuleBase, {
            addLayer: function(layer, map) {
                var dfd = new $lc.Deferred();

                var handler = $lc.on(map, 'layer-add-result', function(layerAddResult) {
                    if (layerAddResult.layer == layer) {
                        handler.remove();
                        this.emit(constants.LAYER_ADDED, {layer: layerAddResult.layer});
                        dfd.resolve(layerAddResult);
                    }
                });
                map.addLayer(layer);
                return dfd.promise;
            },

            removeLayer: function(layerId, map) {
                var dfd = new $lc.Deferred();

                var handler = $lc.on(map, 'layer-remove', function(layerRemoveResult) {
                    if (layerRemoveResult.layer.id == layerId) {
                        handler.remove();
                        dfd.resolve(layerRemoveResult);
                    }
                });
                map.removeLayer(map.getLayer(layerId));

                return dfd.promise;
            },

            createLayer: function(url, type, params) {
                var supportedLayerTypes = this.getSupportedLayerTypes();
                var Type = supportedLayerTypes[type].Type;
                return new Type(url, params);
            },

            createFeatureLayer: function(url, params) {
                return this.createLayer(url, constants.TYPE_FEATURE_LAYER, params);
            },

            createMapLayer: function(url, params) {
                return this.createLayer(url, constants.TYPE_MAP_LAYER, params);
            },

            createImageLayer: function(url, params) {
                return this.createLayer(url, constants.TYPE_IMAGE_LAYER, params);
            },

            getSupportedLayerTypes: function() {
                return {
                    typeFeatureLayer: { Type: FeatureLayer, label: 'Feature Layer' },
                    typeMapLayer: { Type: ArcGISDynamicMapServiceLayer, label: 'Map Layer' },
                    typeImageLayer: { Type: ArcGISImageServiceLayer, label: 'Image Layer' }
                };
            }

        });
        
        $lc.mixin(LayerHelper, constants);

        return LayerHelper;
    });
}());