package com.nari.omid.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.nari.common.dao.mybatis.BaseMapper;
import com.nari.common.mybatis.pagination.Page;
import com.nari.common.mybatis.pagination.PageInterceptor;
import com.nari.omid.domain.Account;

public interface AccountMapper extends BaseMapper<Account>{
	Account getAccountByUsername(String username);
	
	Page<Map<String,Object>> getPageUser(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map map);
}
