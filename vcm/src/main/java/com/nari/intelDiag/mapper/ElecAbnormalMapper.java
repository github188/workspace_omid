package com.nari.intelDiag.mapper;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.nari.common.mybatis.pagination.Page;
import com.nari.common.mybatis.pagination.PageInterceptor;



public interface ElecAbnormalMapper {
	
	List<Map<String,Object>> getOrgNo(String orgNo);

	public List<Map<String,Object>> getEventLevelList();
	public List<Map<String,Object>> getconstypeList();
	List<Map<String,Object>> queryEleAbnormalTotalList(@Param("map")Map<String,String> map);
	public List<Map<String,Object>> queryFileTotalList(@Param("map")Map<String,String> map);
	Page<Map<String,Object>> queryAlarmAnalyseHisInfo(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map<String,String> queryItems);

}
