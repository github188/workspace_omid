package com.nari.statQuery.mapper;


import java.util.List;


import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.nari.common.dao.mybatis.BaseMapper;
import com.nari.common.mybatis.pagination.Page;
import com.nari.common.mybatis.pagination.PageInterceptor;
import com.nari.omid.domain.Account;

public interface MeasureExcMapper extends BaseMapper<Map>{
	List getTypePie(Map paramMap);
	List getOrgNo(Map paramMap);
	Map getEventCount(Map param);
	List getEventBar(Map paramMap);
	//Page<Map<String,Object>> getPageUser(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p);
	List getEventStatePie(Map paramMap);
	List getEventContByOrg(Map paramMap);
	List getEventLevel(Map paramMap);
	List getAlarmLevel();
	List getAlarmType();
	List getAlarmSrc();
	List getFlowStatus();
	List getCreateType();
	List getFlowFlaging();
	List getSelfEventPie(Map paramMap);
	List getLowerEventPie(Map paramMap);
	List getEventDetail(Map paramMap);
}
