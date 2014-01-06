package com.nari.intelDiag.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.nari.common.mybatis.pagination.Page;
import com.nari.common.mybatis.pagination.PageInterceptor;

public interface TaskFlowMapper {
	
	
    Page<Map<String,Object>> queryTaskFlow(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map<String,String> queryItems);
    
    List<Map<String,Object>> queryEleAbnormalTotalList(@Param("map")Map<String,String> map);
    
    Page<Map<String,Object>> queryAbnormal(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map<String,String> queryItems);
}
