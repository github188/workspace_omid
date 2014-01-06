package com.nari.exceHand.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.nari.common.mybatis.pagination.Page;
import com.nari.common.mybatis.pagination.PageInterceptor;


public interface AlarmFlowQueryMapper {
	Page<Map<String,Object>> getAlarmFlowList(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map paramMap);
}
