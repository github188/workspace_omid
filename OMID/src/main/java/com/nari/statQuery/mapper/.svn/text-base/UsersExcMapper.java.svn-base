package com.nari.statQuery.mapper;


import java.util.List;


import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.nari.common.dao.mybatis.BaseMapper;
import com.nari.common.mybatis.pagination.Page;
import com.nari.common.mybatis.pagination.PageInterceptor;
import com.nari.omid.domain.Account;

public interface UsersExcMapper extends BaseMapper<Map>{
	
	Page<Map<String,Object>> queryUsers(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map param);
	
	Map getEventCount(Map param);
	List queryStatistics(Map paramMap);
	List queryTmnlExc(Map paramMap);
	List queryMeterExc(Map paramMap);
	List queryHisExc(Map paramMap);
}
