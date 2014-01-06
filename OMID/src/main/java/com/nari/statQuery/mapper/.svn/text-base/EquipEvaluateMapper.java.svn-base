package com.nari.statQuery.mapper;


import java.util.List;



import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.nari.common.dao.mybatis.BaseMapper;
import com.nari.common.mybatis.pagination.Page;
import com.nari.common.mybatis.pagination.PageInterceptor;

public interface EquipEvaluateMapper extends BaseMapper<Map>{
	//List getEquipList(Map paramMap);
	
	Page<Map<String,Object>> getEquipList(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map paramMap);
	List getMeterList(Map paramMap);
}
