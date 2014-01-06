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
	public List<Map<String,Object>> queryMeterEvent(Page<Map<String,Object>> p,Map<String,String> queryItems);
	/**
	 * 按用户类型查询
	 * @param queryItems
	 * @return
	 */
	 public List getconstypeList();
	/**
	 * 查询电能表事件记录
	 * @param queryItems
	 * @return
	 */
	public List<Map<String,Object>> queryEleMeterEventRec(Page<Map<String,Object>> p,Map<String,String> queryItems);
	
	/**
	 * 查询电能表事件明细
	 * @param queryItems
	 * @return
	 */
	public List<Map<String,Object>> queryMeterEventDetail(Page<Map<String,Object>> p,Map<String,String> queryItems);
	
	/**
	 * 查询电能表事件记录明细
	 * @param queryItems
	 * @return
	 */
	public List<Map<String,Object>> queryMeterEventRecDetail(Page<Map<String,Object>> p,Map<String,String> queryItems);
	
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
	/**
	 * 查询统计信息
	 * @return
	 */
   public List queryEleAbnormalTotalList(Map<String,String> queryItems);
   /**
	 * 电能表时钟不对
	 * @return
	 */
   public List<Map<String,Object>> empMeterClockInfo(Map<String,String> queryItems);
   /**
    * 查询档案信息
    * @return
    */
   public List<Map<String,Object>> queryFileTotalList(Map<String,String> queryItems);
   //queryEleTmnlEventRec
   public Page<Map<String,Object>> queryAlarmAnalyseHisInfo(Page<Map<String,Object>> p,Map<String,String> queryItems);
   
   public List<Map<String,Object>> queryEleTmnlEventRec(Page<Map<String,Object>> p,Map<String,String> queryItems);
}
