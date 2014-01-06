package com.nari.statQuery.mapper;


import java.util.List;


import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.nari.common.dao.mybatis.BaseMapper;
import com.nari.common.mybatis.pagination.Page;
import com.nari.common.mybatis.pagination.PageInterceptor;
import com.nari.omid.domain.Account;

public interface DisposeExcMapper extends BaseMapper<Map>{
	Map getEventCount(Map param);
	List getEventStatePie(Map paramMap);
	List getEventDetail(Map paramMap);
}
