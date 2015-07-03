(function() {
	'use strict';
	require([
		'jplib/core/languageCore',
		'jplib/modules/helpers/map/MapHelper',
		'jplib/modules/widgets/_Widget',
		'jplib/modules/widgets/AddLayer',
		'esri/urlUtils',
		'dojo/domReady!'
	], function ($lc, MapHelper, _Widget, AddLayer, urlUtils) {

		var strDivMap = 'div_map';

		var applicationCfg = {
			defaultParentNode: 'div_container_widgets',
			defaultStylesNode: 'div_styles_widgets',
		};
		var map = null;
		var widgets = [];


		function startApp() {
			setupApp();

			var mapHelper = new MapHelper();
			map = mapHelper.createMap(strDivMap);

			//TODO: remover
			$lc.on(map, 'extent-change', function() { console.log(map.extent); });

			$lc.on(map, 'load', function() {
				loadWidgets();
				bindMenuEvents();
			});
		}

		function setupApp() {
			$lc.ctx(_Widget.prototype, _Widget.configureBaseWidgetDefaults)(applicationCfg);
			registerProxy();
		}

		function registerProxy() {
			urlUtils.addProxyRule({
				urlPrefix: "http://services2.arcgis.com",
				proxyUrl: "/proxy/proxy.php"
			});
		}

		function bindMenuEvents() {

		}

		function loadWidgets() {
			try {
				var widgetsParams = { map: map };

				var addLayer = new AddLayer(widgetsParams);
				widgets.push(addLayer);

				var menuAddLayer = $lc.domById('menu_add_layer');
				$lc.on(menuAddLayer, 'click', function() {
					addLayer.showDialog();
				});
			} catch(e) {
				if (e instanceof $lc.ApplicationException) {
					console.error(e);
				} else if (e instanceof Error) {
					console.error('Houve um erro ao construir a widget: "' + e.message + '"');
				}
			}
		}



		startApp();
	});
}());