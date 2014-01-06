package com.nari.intelDiag.service;

import java.util.List;
import java.util.Map;

import com.nari.common.mybatis.pagination.Page;

public interface MeasureExceptionAnalService {

	public List<Map<String,Object>> queryExceptEventInfo(Map<String,Object> queryItems);
	
	/**
	 * 查询断缺相信息
	 * @param queryItems
	 * @return
	 */
	public  List<Map<String,Object>> queryBLPhaseInfo(Map<String,String> queryItems);
	
	public Page<Map<String,Object>> queryAlarmAnalyseInfo(Page<Map<String,Object>> p,Map<String,String> queryItems);

	/**
	 * 查询电能表事件
	 * @param queryItems
	 * @return
	 */
	public List<Map<String,Object>> queryMeterEvent(Map<String,String> queryItems);
	
	/**
	 * 查询电能表事件记录
	 * @param queryItems
	 * @return
	 */
	public List<Map<String,Object>> queryEleMeterEventRec(Map<String,String> queryItems);
	
	/**
	 * 查询电能表事件明细
	 * @param queryItems
	 * @return
	 */
	public List<Map<String,Object>> queryMeterEventDetail(Map<String,String> queryItems);
	
	/**
	 * 查询电能表事件记录明细
	 * @param queryItems
	 * @return
	 */
	public List<Map<String,Object>> queryMeterEventRecDetail(Map<String,String> queryItems);
	
	/**
	 * 查询电表正反向有功电能示值\电表正反向有功各费率
	 * @param queryItems
	 * @return
	 */
	public List<Map<String,Object>> queryeMpDayRead(Map<String,String> queryItems);
	
	/**
	 * 查询电能表飞走和突变相关信息
	 * @param queryItems
	 * @return
	 */
	public List<Map<String,Object>> queryaCalcDayPower(Map<String,String> queryItems);
}
