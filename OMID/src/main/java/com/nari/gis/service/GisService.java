package com.nari.gis.service;

import java.util.List;
import java.util.Map;

import com.nari.common.mybatis.pagination.Page;

public interface GisService {
	
	public Page queryCp(Map param,Page<Map<String,Object>> p);
	public boolean updateCpGPS(Map param);
	public List queryCpByAlarmType(Map param);
	public List queryEventCode(Map param);
}
