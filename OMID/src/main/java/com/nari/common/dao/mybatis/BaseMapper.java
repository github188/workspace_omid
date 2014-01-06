package com.nari.common.dao.mybatis;

import org.apache.ibatis.annotations.Param;

import com.nari.common.mybatis.pagination.Page;
import com.nari.common.mybatis.pagination.PageInterceptor;

/**
 * 把常用的方法抽象到此接口中，避免在多个接口中重复定义
 * @author nbstar
 *
 * @param <T>
 */
public interface BaseMapper<T> {

	String PO_KEY = "po";
	
	Page<T> getPage(@Param(PageInterceptor.PAGE_KEY) Page<T> p, @Param(PO_KEY) T obj);
}
