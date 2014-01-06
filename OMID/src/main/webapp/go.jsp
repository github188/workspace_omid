<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script type="text/javascript" src="./ext4/ext-all.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>计量在线监测与智能诊断</title>
</head>
<body>
<form id="dispatch" name="dispatch" action="default.jsp" method="post">
<input type="hidden" name="staffno" value="<%=request.getParameter("staffno") %>">
</form>
</body>
</html>
<script type="text/javascript">
var staffno = '<%=request.getParameter("staffno")%>';

if(Ext.isIE6){
	document.getElementById('dispatch').submit();
}else{
	Ext.Ajax.request({
		url : 'login.action',
		params : {
			staffno : staffno
		},
		success : function(response) {
			var result = Ext.decode(response.responseText);
			var isLogin = result.isLogin;
			if(isLogin == 1){
				location.href="index.jsp";
			}
		}
	});
}
</script>