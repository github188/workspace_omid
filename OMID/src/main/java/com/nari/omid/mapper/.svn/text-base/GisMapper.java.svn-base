package com.nari.omid.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.nari.common.dao.mybatis.BaseMapper;
import com.nari.common.mybatis.pagination.Page;
import com.nari.common.mybatis.pagination.PageInterceptor;

public interface GisMapper  {
	
	Page<Map<String,Object>> queryCp(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map param);
	
	
	List  queryCpByAlarmType(@Param("map")Map param);
	public void updateCpGPS(@Param("map")Map param);
	List  queryEventCode(@Param("map")Map param);
	
	List queryGisStyleColor();
	List queryGisURL();
}
