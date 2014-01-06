package com.nari.statQuery.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.nari.common.mybatis.pagination.Page;
import com.nari.common.mybatis.pagination.PageInterceptor;

public interface AlarmAnalyseService {
	
	public List<Map> getAlarmAnlyse(Map map);
	public Page queryAlarmAnlyse(Page<Map<String,Object>> p ,Map param);
	
	List getComplexCommonList(Map paramMap);
	
	Page<Map<String,Object>> queryComplexAlarm(Page<Map<String,Object>> p ,Map param);
}
