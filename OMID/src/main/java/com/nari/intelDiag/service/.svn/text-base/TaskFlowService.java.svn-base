package com.nari.intelDiag.service;

import java.util.List;
import java.util.Map;

import com.nari.common.mybatis.pagination.Page;

public interface TaskFlowService {

	
	public Page<Map<String,Object>> queryTaskFlow(Page<Map<String,Object>> p,Map<String,String> queryItems);

	public List queryEleAbnormalTotalList(Map<String,String> queryItems);
	
	public Page<Map<String,Object>> queryAbnormal(Page<Map<String,Object>> p,Map<String,String> queryItems);

	public Page<Map<String,Object>> queryTmnlCheckClock(Page<Map<String,Object>> p,Map<String,String> queryItems);

	public Page<Map<String,Object>> queryTmnlParam(Page<Map<String,Object>> p,Map<String,String> queryItems);

	public Page<Map<String,Object>> queryTmnlMsgLog(Page<Map<String,Object>> p,Map<String,String> queryItems);

	public Page<Map<String,Object>> queryTmnlEvent(Page<Map<String,Object>> p,Map<String,String> queryItems);

	public Page<Map<String,Object>> queryMpCurve(Page<Map<String,Object>> p,Map<String,String> queryItems);

	public Page<Map<String,Object>> queryTmnlCopyFailure(Page<Map<String,Object>> p,Map<String,String> queryItems);

	public Page<Map<String,Object>> queryTmnlStop(Page<Map<String,Object>> p,Map<String,String> queryItems);

	public List queryTmnlChangData(Map queryItems);

	public List queryTmnlType();
	
	public List queryFileTotalList(Map<String,String> queryItems);
	 
	public Page<Map<String,Object>> queryAlarmAnalyseHisInfo(Page<Map<String,Object>> p,Map<String,String> queryItems);
}
