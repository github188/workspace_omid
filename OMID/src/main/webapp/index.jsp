<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="./ext4/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="./js/portal/portal.css" />
<link rel="stylesheet" type="text/css" href="./css/custom.css" />

<style>
.hideText{text-indent:-9999px;white-space:nowrap;}
.fix:after{content:".";height:0;visibility:hidden;display:block;clear:both;}
.fix{/height:1%;}
.y_fix{overflow:hidden;zoom:1}

.monitor{background:#E8F8FF}
.map-place{margin:20px;font:14px/1.4 "Tahoma";color:#3D3F3C;}
.map-place a{color:#06f;text-decoration:none}
.map-place a:hover{color:#BD5D00;text-decoration:underline}


.box{width:350px;border:1px solid #8dc48c;opacity:0.8;filter:Alpha(opacity=80);zoom:1;}
.box .theme{padding:0 10px;line-height:30px;border-bottom:1px solid #8dc48c;color:#3d8136;background:url(img/images/box_theme.gif) repeat-x;font-weight:bold}
.box .theme2{background-image:url(img/images/box_theme2.gif) repeat-x}
.box dd{margin:0;padding:0;background:#fff;}

.statistics-msg{position:absolute;right:20px;top:20px;}
.statistics-msg th{text-align:right;}
.statistics-msg th,.statistics-msg td{padding:4px 0;}
.statistics-msg .hd{font-size:130%}
.statistics-msg dd{padding:8px}
.color_value{background:url(img/images/color_value.png) no-repeat;padding-left:15px}
.cv_01{background-position:0 4px;}
.cv_02{background-position:0 -16px;}
.cv_03{background-position:0 -36px;}
.cv_04{background-position:0 -56px;}

.online-monitor{top:186px;right:20px;position:absolute;}
</style>

<!-- grid行颜色配置 -->
<link rel="stylesheet" type="text/css" href="./css/grid_style.css" />

<script type="text/javascript" src="./ext4/ext-all-debug.js"></script>
<!-- 中文化 -->
<script type="text/javascript" src="./ext4/locale/ext-lang-zh_CN.js"></script>

<script type="text/javascript" src="./js/Export2Excel.js"></script>
<script type="text/javascript" src="./js/public.js"></script>

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


<title>计量在线监测与智能诊断</title>
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
.exportExcel {
	background-image: url(./images/exportExcel.png) !important;
}
.alarmWarning {
	background-image: url(./images/icon-warning.gif) !important;
}

.x-selectable, .x-selectable * {  
    -moz-user-select: text!important;  
    -khtml-user-select: text!important;  
} 
</style>
</head>
<body>
</body>
</html>