package com.nari.intelDiag.mapper;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.nari.common.mybatis.pagination.Page;
import com.nari.common.mybatis.pagination.PageInterceptor;



public interface ElecAbnormalMapper {
	List<Map<String,Object>> getAreaCodeByOrgNo(String orgNo);
	List<Map<String,Object>> getOrgNo(String orgNo);
	public List<Map<String,Object>> getEventLevelList();
	public List<Map<String,Object>> getConsTypeList();
	List<Map<String,Object>> queryEleAbnormalTotalList(@Param("map")Map<String,String> map);
    Page<Map<String,Object>> queryEleAlarmAnalyseInfo(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map<String,String> queryItems);
	public List<Map<String,Object>> queryFileTotalList(@Param("map")Map<String,String> map);
	Page<Map<String,Object>> queryAlarmAnalyseHisInfo(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map<String,String> queryItems);
    /**
     * 查询表分区
     * @param map
     * @return
     */
    String queryTablePartiTion(@Param("map")Map<String,String> map);
    List<Map<String,Object>> queryMeterDemandInfo(@Param("map")Map<String,String> map);
    List<Map<String,Object>> queryMeterFactorInfo(@Param("map")Map<String,String> map);
    Page<Map<String,Object>> queryMeterEvent(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map<String,String> map);
    List<Map<String,Object>> queryMeterEventDetail(@Param("map")Map<String,String> map);
    Page<Map<String,Object>> queryEleMeterEventRec(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map<String,String> map);
    List<Map<String,Object>> queryMeterEventRecDetail(@Param("map")Map<String,String> map);
    Page<Map<String,Object>> queryEleTmnlEventRec(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map<String,String> map);
    List<Map<String,Object>> queryBLPhaseInfo(@Param("map")Map<String,String> map);
}
