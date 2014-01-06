package com.nari.onlineMoni.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.nari.common.mybatis.pagination.Page;
import com.nari.common.mybatis.pagination.PageInterceptor;

public interface MeterRunStatusMonitorMapper {
	public List<Map<String,Object>> queryMeterProcolCodeList();
	List<Map<String,Object>> queryMeterRunStatusTotalList(@Param("map")Map<String,String>  queryItems);
    Page<Map<String,Object>> queryMeterRunFailInfo(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map<String,String> queryItems);
    List<Map<String,Object>> queryMeterCtrlSendRecord(@Param("map")Map<String,String> queryItems); 
    public List queryMeterFailSendRecord(@Param("map")Map<String,String> queryItems);
}
