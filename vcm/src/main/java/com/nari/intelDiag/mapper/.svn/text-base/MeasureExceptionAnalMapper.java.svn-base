package com.nari.intelDiag.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.nari.common.mybatis.pagination.Page;
import com.nari.common.mybatis.pagination.PageInterceptor;

public interface MeasureExceptionAnalMapper {
	
	List<Map<String,Object>> queryExceptEventInfo(@Param("map")Map<String,Object> map);
	
	List<Map<String,Object>> queryBLPhaseInfo(@Param("map")Map<String,String> map);
	
    Page<Map<String,Object>> queryAlarmAnalyseInfo(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map<String,String> queryItems);
    
    /**
     * 查询电能表事件信息
     * @param map
     * @return
     */
    List<Map<String,Object>> queryMeterEvent(@Param("map")Map<String,String> map);
    
    /**
     * 查询电能表事件记录信息
     * @param queryItems
     * @return
     */
    List<Map<String,Object>> queryEleMeterEventRec(@Param("map")Map<String,String> map);
    
    /**
     * 查询电能表事件明细
     * @param map
     * @return
     */
    List<Map<String,Object>> queryMeterEventDetail(@Param("map")Map<String,String> map);
    
    /**
     * 查询电能表事件记录明细
     * @param map
     * @return
     */
    List<Map<String,Object>> queryMeterEventRecDetail(@Param("map")Map<String,String> map);
    
    /**
     * 查询电表正反向有功电能示值\电表正反向有功各费率
     * @param map
     * @return
     */
    List<Map<String,Object>> queryeMpDayRead(@Param("map")Map<String,String> map);
    
    /**
     * 查询电能量
     * @param map
     * @return
     */
    List<Map<String,Object>> queryaCalcDayPower(@Param("map")Map<String,String> map);
    
    /**
     * 查询表分区
     * @param map
     * @return
     */
    String queryTablePartiTion(@Param("map")Map<String,String> map);
    
}
