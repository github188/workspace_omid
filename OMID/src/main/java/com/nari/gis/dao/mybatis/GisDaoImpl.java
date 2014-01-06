package com.nari.gis.dao.mybatis;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Repository;

import com.nari.gis.dao.GisDao;

@Repository("GisDao")
public class GisDaoImpl extends SqlSessionDaoSupport implements GisDao {

	@Override
	public List queryCp(Map param) {
		// TODO Auto-generated method stub
		
		return this.getSqlSession().selectList("gis_cp.queryCp",param);
	}

}
