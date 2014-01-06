package com.nari.measancount.dao.impl;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Repository;

import com.nari.common.mybatis.pagination.Page;
import com.nari.measancount.dao.MeasAncountDao;
@Repository("MeasAncountDao")
public class MeasAnCountDaoImpl extends SqlSessionDaoSupport implements MeasAncountDao{
	@Override
	public List queryMeas() {

		return this.getSqlSession().selectList("com.nari.omid.mapper.MeasAnCountMapper.queryMeas");
	}
}
