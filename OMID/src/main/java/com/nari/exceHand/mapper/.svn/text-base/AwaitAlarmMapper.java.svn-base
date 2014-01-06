package com.nari.exceHand.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.nari.common.mybatis.pagination.Page;
import com.nari.common.mybatis.pagination.PageInterceptor;


public interface AwaitAlarmMapper {
	public List<Map<String, Object>> getAwaitAlarm(HashMap<String, Object> map);
	public List<Map<String, Object>> getExceptSRC();
	public void Process(@Param("map")Map param);
	public List getAlarmone(Map map);
	public List getExceptone(Map map);
	public List getAwaitAlarmone(Map map);
	public List getftaskAlarmRela(Map map);
	public List getAwaitAlarmrelaonebytm(Map map);
	
	
	Page<Map<String,Object>> getPageAwaitAlarm(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map map);
	
	public void insertFtaskFlow(Map map);
	public void insertFtaskAlarmRela(Map map);
	public List queryTmnlAlarm(Map map);
	public void insertFtaskFlowEX(Map map);//处理误报与 暂不处理 专用
	
	public Page getAlarmThings(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map map);
	public Page getAlarmDetail(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map map);
	
	public void modifyFlowStatus(Map map);
	
	
	public void updateAalarmAnalyse(Map map);
	
	public void updateAtmnlException(Map map);
	public List getTaskAlarmRelaByTaskId(Map map);
	public List getUserListbyOrgNO(Map param);
	
	public List getdoResultbyTaskId(Map param);

	public List getTaskDetailbyTaskId(Map param);

	public List getTGbyTaskId(Map param);
	
	public List findTaskLevel(Map param);
	public void modifyAlarmRemove(Map param);
	
	public void updateAlarmRemove(Map param);
	
	public List findAlarmRemoveis(Map param);
	
	
	public 	Page<Map<String,Object>>  awaitchaoqiQuery(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map map);
	public 	Page<Map<String,Object>>  flowchaoqiQuery(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map map);
	
	List<Map<String,Object>> findRoleByStaffno(Map<String,Object> param);
}
