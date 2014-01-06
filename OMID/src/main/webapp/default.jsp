<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<style>
<!--
#lockform,#locklayer{
	position: absolute;
	width:expression(this.parentNode.scrollWidth);
	top:expression(this.parentNode.scrollTop);
	left=0; height:100%;right:0; bottom:0;
}
#lockform { z-index:1}
#locklayer{ z-index:1;background-color:#FFFFFF;filter:alpha(opacity=100);}
#locktab{
	position: absolute;
	top:250px;left:expression(this.parentNode.scrollWidth/2-100);
	background-color:#FFFFFF; z-index:2;width:200px;height:30px;
	border-style: solid; border-width: 1px;border-color:green;color:black;text-align: center;padding-top: 5px;
}
#lockck{border:0;background:fff;color:red;}
-->
</style>	

<title>计量在线监测与智能诊断</title>
<script type="text/javascript">
function browserLoad(){
	var url = document.URL;
	var index = url.indexOf("default.jsp");
	url = url.substring(0, index) + 'go.jsp?staffno=<%=request.getParameter("staffno")%>';
	browser.Navigate2(url);
	document.getElementById("lockform").style.display = "none";
}
</script>

<script   language="javascript"   for='browser'   event='StatusTextChange(text)'>  
  window.status=text;  
</script>
</head>
<body leftmargin=0 topmargin=0 scroll=no  onload="browserLoad()">
<div id="lockform" style="display:;">
	<div id="locklayer"></div>
	<div id="locktab">
		<div><input type="image" src="./images/progress.gif" width="15" height="15">系统初始化...</div>
	</div>
</div>
<object classid="clsid:1339B54C-3453-11D2-93B9-000000000000" id="browser" width="100%" height="100%" codebase ="./plugins/Setup.exe#Version=1,2,0,0"></object>
</body>
</html>