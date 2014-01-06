package com.nari.statQuery.service;

import java.util.List;

import java.util.Map;

import com.nari.common.mybatis.pagination.Page;



public interface UsersExcService {
	
	Page<Map<String,Object>> queryUsers(Page<Map<String,Object>> p ,Map param);
	
	List queryStatistics(Map paramMap);
	List queryTmnlExc(Map paramMap);
	List queryMeterExc(Map paramMap);
	List queryHisExc(Map paramMap);
}
