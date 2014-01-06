package com.nari.statQuery.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.nari.common.mybatis.pagination.Page;
import com.nari.common.mybatis.pagination.PageInterceptor;

public interface AlarmAnalyseMapper {
	
	public List<Map> getAlarmAnlyse(Map map);
	Page<Map<String,Object>> queryAlarmAnyse(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map param);
	List getComplexCommonList(Map paramMap);
	
	Page<Map<String,Object>> queryComplexAlarm(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map param);

}
