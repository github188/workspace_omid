package com.nari.measancount.dao.impl;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Repository;

import com.nari.measancount.dao.MainPageDao;
@Repository("MainPageDao")
public class MainPageDaoImpl extends SqlSessionDaoSupport implements MainPageDao{
	
	final static String NAEM_SPACES="com.nari.omid.mapper.MainPageMapper";
	/**
	 * 首页右下角在线监测严重异常信息统计
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String, Object>> rightQuery_1(Map map) {
		
		return this.getSqlSession().selectList(NAEM_SPACES+".rightQuery_1",map);
	}

}
