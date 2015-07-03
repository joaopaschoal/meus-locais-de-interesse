<?
define('WEB_ROOT', '/app/');
define('PHP_ROOT', $_SERVER['DOCUMENT_ROOT'] . WEB_ROOT);
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="initial-scale=1, maximum-scale=1,user-scalable=no">
	<link rel="icon" href="/app/favicon.ico" type="image/x-icon">
	<title>Meus Locais de Interesse</title>
	<? include(PHP_ROOT.'includes/default_assets.php'); ?>
</head>

<body class="claro">

	<div id="container">
		<div id="div_navbar"><? include(PHP_ROOT.'includes/navbar_menu.php'); ?></div>
		<div id="div_container_widgets"></div>
		<div id="div_map"></div>
	</div>
	<div id="div_styles_widgets"></div>
</body>
</html>