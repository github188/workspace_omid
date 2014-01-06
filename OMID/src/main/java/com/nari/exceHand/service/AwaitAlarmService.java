package com.nari.exceHand.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.nari.common.mybatis.pagination.Page;
import com.nari.omid.model.PSysUser;

public interface AwaitAlarmService {
	public List<Map<String, Object>> getAwaitAlarm(HashMap<String, Object> map);
	
	Page<Map<String,Object>> getPageAwaitAlarm(Page<Map<String,Object>> p,Map map);
	
	public List<Map<String, Object>> getExceptSRC();
	public void Process(Map map);
	
	public List getAlarmone(Map map);
	public List getExceptone(Map map);
	public List getAwaitAlarmone(Map map);
	public List getftaskAlarmRela(Map map);
	public List getAwaitAlarmrelaonebytm(Map map);
	
	public void insertFtaskFlow(Map map);
	public void insertFtaskAlarmRela(Map map);
	public void handle_alarm(Map map,PSysUser user) ;
	public List queryTmnlAlarm(Map map);
	
	public Page getAlarmThings(Page<Map<String,Object>> p,Map map);
	public Page getAlarmDetail(Page<Map<String,Object>> p,Map map);
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
	
	public Page<Map<String, Object>> awaitchaoqiQuery(
			Page<Map<String, Object>> p, Map map);
	
	
	public Page<Map<String, Object>> flowchaoqiQuery(
			Page<Map<String, Object>> p, Map map);
	
	List<Map<String,Object>> findRoleByStaffno(Map<String,Object> map);
}
