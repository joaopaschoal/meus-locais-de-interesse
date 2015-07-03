(function() {
	'use strict';
	define([
		'tests/support/bdd',
		'jplib/core/languageCore',
		'esri/map',
		'esri/geometry/Extent',
		'esri/urlUtils'
	], function (bdd, $lc, Map, Extent, urlUtils) {

		var mapDivId = 'div_map';
		var mapWkid = 102100;
		var testMap = null;
		var pmsMapLoaded = null;
		var timeout = 30 * 1000;

		var sampleLayers = {
			featureLayer: 'http://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/la_county_labor_centroid/FeatureServer/0',
			mapLayer: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/',
			imageLayer: 'http://sampleserver6.arcgisonline.com/arcgis/rest/services/Toronto/ImageServer'
		};


		function setupTestsUsingMap() {
			registerTestsProxy();
			placeMapHtmlTags();
			testMap = createMap(mapDivId);
			pmsMapLoaded = loadTheMap();
			setFavicon();
		}

		function placeMapHtmlTags() {
			$lc.domPlace('<div id="' + mapDivId + '"></div>', document.body);
			$lc.domPlace('<link rel="stylesheet" href="http://js.arcgis.com/3.13/esri/css/esri.css">', document.head);
			$lc.domPlace('<style>#container,#div_map,body,html{padding:0;margin:0;height:100% !important;}</style>', document.head);
		}

		function createMap(targetNodeId) {
			var map = new Map(targetNodeId, {
				basemap: 'streets',
				extent: new Extent({
					spatialReference: { "wkid": mapWkid},
					"xmax": -4266466.498535502,
					"xmin": -4296716.452479319,
					"ymax": -1447622.6973762056,
					"ymin": -1457349.309225481
				})
			});
			$lc.once(map, 'load', function() {
				map.resize();
			});
			return map;
		}

		function registerTestsProxy() {
			urlUtils.addProxyRule({
				urlPrefix: "http://services2.arcgis.com",
				proxyUrl: "/proxy/proxy.php"
			});
			urlUtils.addProxyRule({
				urlPrefix: "http://sampleserver3.arcgisonline.com",
				proxyUrl: "/proxy/proxy.php"
			});
		}

		function setFavicon() {
			var link = document.createElement('link');
		    link.type = 'image/x-icon';
		    link.rel = 'shortcut icon';
		    link.href = '/tests/tests.ico';
		    document.getElementsByTagName('head')[0].appendChild(link);
		}

		function asyncSuccessCallback() {
			
		}

		function asyncErrorCallback(e) {
			if ($lc.isNotEmptyString(this.asyncErrorMsg)) {
				e.message = this.asyncErrorMsg + ': ' + e.message;
			}
		}

		

		function loadTheMap() {
			var dfdMapLoaded = new $lc.Deferred();

			//when the tested map loads, calls the user defined tests & expects:
			var waitingLoad = setTimeout(function() {
				var errorMsg = 'The base "testMap" failed loading';
				dfdMapLoaded.reject(errorMsg);
				console.error(errorMsg);
			}, timeout);
			$lc.once(testMap, 'load', function() {
				$lc.once(testMap, 'layer-add', function() {
					clearTimeout(waitingLoad);
					dfdMapLoaded.resolve();
				});
			});

			return dfdMapLoaded.promise;
		}


		setupTestsUsingMap();

		return {

			testMap: testMap,
			timeout: timeout, //time in millis

			getSampleLayesUrls: function() {
				return sampleLayers;
			},

			registerEventAwaitMsg: function (strEvent) {
				this.asyncErrorMsg = 'The event "' + strEvent + '" was never fired';
				// $lc.once(sender, strEvent, $lc.ctx(this, function() {
				// 	this.asyncErrorMsg = null;
				// }));
			},

			clearEventAwaitMsg: function() {
				this.asyncErrorMsg = null;
			},


			describe: function (name, factory) {
				return bdd.describe(name, factory);
			},

			it: function (name, test) {
				var bddMap = this;
				bdd.it(name, function() {
					var testObj = this;
					testObj.timeout = bddMap.timeout;
					
					//Sets all map tests as being async:
					var dfd = testObj.async(this.timeout);
					//register default callbacks for async tests:
					dfd.then($lc.ctx(bddMap, asyncSuccessCallback), $lc.ctx(bddMap, asyncErrorCallback));

					
					//whenever the mapLoadedPromise is resolved --> calls the user defined tests & expects:
					pmsMapLoaded.then(function() {
						try {
							//the user defined test is the one responsible for resolving the deferred...
							$lc.ctx(testObj, test)(dfd);
						} catch(e) {
							dfd.reject(e);
						}
					});
				});
			},

			before: function (fn) {
				return bdd.before(fn);
			},

			after: function (fn) {
				return bdd.after(fn);
			},

			beforeEach: function (fn) {
				return bdd.beforeEach(fn);
			},

			afterEach: function (fn) {
				return bdd.afterEach(fn);
			}
		};

	});
}());
