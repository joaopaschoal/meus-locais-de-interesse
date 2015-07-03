(function () {
	'use strict';

	var pathRX = new RegExp(/\/[^\/]+$/);
	var locationPath = location.pathname.replace(pathRX, '');

	require({
		async: true,
		isDebug: true,
		packages: [
			{
				name: 'jplib',
				location: locationPath + '/js/jplib'
			},
			{
				name: 'app',
				location: locationPath + '/js',
				main: 'main'
			}
		]
	}, ['app']);

}());