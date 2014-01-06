package com.nari.sysman.mapper;


import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.nari.common.mybatis.pagination.Page;
import com.nari.common.mybatis.pagination.PageInterceptor;

public interface DefinenotSendMapper {
	public Page<Map<String,Object>> qureyList(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map<String,String> map);
	public void addManage(@Param("map")Map<String,String> map);
	public void updateManage(@Param("map")Map<String,String> map);
	public void deleteManage(@Param("map")Map<String,String> map);
	public String getSendRecId();
	public void saveMegRec(@Param("map")Map<String,Object> map);
	public void updateMsgSendStatus(@Param("map")Map<String,Object> map);
	public String queryStaffAliasOrgNo(String orgno);
	public String findConfig(String config);
	public Page<Map<String,Object>> msgSendQuery(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map<String,String> map);
	public List queryOrgNolist(String orgNo);
}
