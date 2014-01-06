<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<% 
String title = request.getParameter("exporttitle");
title = title.isEmpty()?"export":title;
title = new String(title.getBytes("GB2312"), "ISO_8859_1"); 
response.setHeader("Content-Type","application/force-download");
response.setHeader("Content-Type","application/vnd.ms-excel");
response.setHeader("Content-Disposition","attachment;filename="+title+".xls");
out.print(request.getParameter("exportContent")); 
%> 