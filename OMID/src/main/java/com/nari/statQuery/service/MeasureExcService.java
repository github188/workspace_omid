package com.nari.statQuery.service;

import java.util.List;
import java.util.Map;



public interface MeasureExcService {

	Map getMeasureExcByCondition(Map paramMap);
	List getOrgNo(Map paramMap);
	Map getEventCount(Map param);
	List getTypePie(Map paramMap);
	List getEventBar(Map paramMap);
	List getEventStatePie(Map paramMap);
	List getEventContByOrg(Map paramMap);
	List getEventLevel(Map paramMap);
	List getAlarmLevel();
	List getAlarmType();
	List getAlarmSrc();
	List getFlowStatus();
	List getFlowFlaging();
	List getCreateType();
	List getSelfEventPie(Map paramMap);
	List getLowerEventPie(Map paramMap);
	List getEventDetail(Map paramMap);
}
