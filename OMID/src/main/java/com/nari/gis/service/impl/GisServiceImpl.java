package com.nari.gis.service.impl;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.support.SqlSessionDaoSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.nari.common.mybatis.pagination.Page;
import com.nari.gis.service.GisService;
import com.nari.omid.mapper.AccountMapper;
import com.nari.omid.mapper.GisMapper;

@Service("GisService")
public class GisServiceImpl   implements GisService {
	
	@Autowired
	private GisMapper gisMapper;
	
	@Override
	public Page queryCp(Map param,Page<Map<String,Object>> p) {
		// TODO Auto-generated method stub
		
		
		return gisMapper.queryCp(p,param);
	}

	@Override
	public boolean updateCpGPS(Map param) {
		// TODO Auto-generated method stub
		try {
			gisMapper.updateCpGPS(param);
			return true;
		} catch (Exception e) {
			// TODO: handle exception
			System.err.println("Update cp GPS failed!!");
			e.printStackTrace();
			return false;
		}
		

	}

	@Override
	public List queryCpByAlarmType(Map param) {
		// TODO Auto-generated method stub
		 return gisMapper.queryCpByAlarmType(param);

	}

	@Override
	public List queryEventCode(Map param) {
		// TODO Auto-generated method stub
		return gisMapper.queryEventCode(param);
	}
	
	

}
