<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="./ext4/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="./js/portal/portal.css" />
<link rel="stylesheet" type="text/css" href="./css/custom.css" />
<link rel="stylesheet" type="text/css" href="./css/grid_style.css" />
<!-- 
<link rel="stylesheet" type="text/css" href="./img/images/web.css" />
-->
<!-- Gis css -->
<link rel="stylesheet" href="gis/css/gis_style.css" />

<script type="text/javascript" src="./ext4/ext-all-debug.js"></script>
<!-- 中文化 -->
<script type="text/javascript" src="./ext4/locale/ext-lang-zh_CN.js"></script>

<script type="text/javascript" src="./js/portal/classes/Portlet.js"></script>
<script type="text/javascript" src="./js/portal/classes/PortalColumn.js"></script>
<script type="text/javascript" src="./js/portal/classes/PortalPanel.js"></script>
<script type="text/javascript" src="./js/portal/classes/Portlet.js"></script>
<script type="text/javascript" src="./js/portal/classes/PortalDropZone.js"></script>

<script type="text/javascript" src="./index.js"></script>
<script type="text/javascript" src="./statQuery/commonStatistics.js"></script>
<!-- FusionCharts引入 -->
<script type="text/javascript" src="./FusionCharts/FusionCharts.js"></script>
<script type="text/javascript"> 
LOGGEDSTAFFNO='${sessionScope.pSysUser.staffNo }';
LOGGEDUSER='${sessionScope.pSysUser.name }';
LOGGEDORGNO='${sessionScope.pSysUser.orgNo }';
LOGGEDLEVEL='${sessionScope.pSysUser.accessLevel }';
</script>
<!--GIS Library   -->
<script src="gis/open/OpenLayers.js"></script>
<script type="text/javascript" src="gis/map_app/gis_config.js"></script>

<title>大客户智能数据挖掘与分析</title>
<style type="text/css">
.toolbar{
	background-color:transparent ;background-image: url();
}

.signout-button{
	background-image: url(./images/signout.png) !important;
}
.index-top-logo{
	background-image: url(./img/images/logo.jpg) !important;
}
</style>
</head>
<body>
</body>
</html>