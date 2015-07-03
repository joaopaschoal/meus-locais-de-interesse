(function() {
	// 'use strict';
	define([
		'jplib/core/languageCore',
		'jplib/modules/widgets/_Widget',
		'jplib/modules/helpers/map/LayerHelper',
		'dojo/text!./html/AddLayer.tpl.html',
		'dojo/text!./css/AddLayer.css'
	], function ($lc, _Widget, LayerHelper, addLayerTemplate, addLayerStyle) {


		var layerHelper = new LayerHelper();

		var constants = {
			EVT_LAYER_STARTED: 'evt_layer_started',
			EVT_LAYER_ADDED: 'evt_adding_layer',
			EVT_LAYER_ADD_ERROR: 'evt_adding_layer'
		};

		function bindings() {
			var self = this;
			$lc.on(this.getBtnAddLayer(), 'click', function() {
				var layerUrl = self.getTxtLayerURL().value;
				var layerType = self.getSlcLayerType().value;

				self.emit(constants.EVT_ADDING_LAYER, { layerType: LayerHelper.TYPE_FEATURE_LAYER, layerUrl: layerUrl });
				var layer = layerHelper.createLayer(layerUrl, layerType);
				layerHelper.addLayer(layer, self.map).then(
					//success:
					function(addedLayer) {
						self.emit(constants.EVT_ADDING_LAYER, { layer: addedLayer });
					},
					//errror:
					function(e) {
						self.emit(constants.EVT_LAYER_ADD_ERROR, { error: e });
					}
				);

			});
		}

		function populateSlcLayerTypes() {
			var supportedLayerTypes = layerHelper.getSupportedLayerTypes();
			for (var prop in supportedLayerTypes) {
                if (supportedLayerTypes.hasOwnProperty(prop)) {
                    $lc.domCreate('option', { innerHTML: supportedLayerTypes[prop].label, value: prop }, this.getSlcLayerType());
                }
            }
		}

		function criarDialogAddLayer() {
            this.contentDialog = new $lc.Dialog({
                title: 'Adicionar Layer',
                srcNodeRef: this.getDivContainerDialog(),
                style: 'width: auto; height: auto;',
                class: 'nonModal'
            });
        }

		var AddLayer = $lc.declare([_Widget], {

			templateString: addLayerTemplate,
			styleString: addLayerStyle,
			contentDialog: null,

			constructor: function() {
			},

			postCreate: function() {
				_Widget.prototype.postCreate.call(this);
				$lc.ctx(this, populateSlcLayerTypes)();
				$lc.ctx(this, bindings)();
				$lc.ctx(this, criarDialogAddLayer)();
			},

			showDialog: function() {
                this.contentDialog.show();
            },

            hideDialog: function() {
                this.contentDialog.hide();
            },

			//view getters:
			getBtnAddLayer: function() {
				return $lc.domById('btn_add_layer');
			},

			getTxtLayerURL: function() {
				return $lc.domById('txt_layer_url');
			},

			getRadLayerSource: function() {
				return $lc.domById('rad_layer_source');
			},

			getSlcLayerType: function() {
				return $lc.domById('slc_layer_type');
			},

			getDivContainerDialog: function() {
				return $lc.domById('div_container_dialog');
			}
			

		});

		$lc.mixin(AddLayer, constants);
		
		return AddLayer;
	});
}());