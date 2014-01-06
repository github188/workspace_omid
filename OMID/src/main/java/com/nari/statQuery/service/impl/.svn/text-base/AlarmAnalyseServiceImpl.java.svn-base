package com.nari.statQuery.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nari.common.mybatis.pagination.Page;
import com.nari.statQuery.mapper.AlarmAnalyseMapper;
import com.nari.statQuery.service.AlarmAnalyseService;


@Service("AlarmAnalyseService")
public class AlarmAnalyseServiceImpl implements AlarmAnalyseService {
	
	@Autowired
	private AlarmAnalyseMapper alarmAnalyseMapper;

	@Override
	public List<Map> getAlarmAnlyse(Map map) {
		return alarmAnalyseMapper.getAlarmAnlyse(map);
	}

	@Override
	public Page queryAlarmAnlyse( Page<Map<String, Object>> p,Map param) {
		// TODO Auto-generated method stub
		return alarmAnalyseMapper.queryAlarmAnyse(p, param);
	}

	@Override
	public List getComplexCommonList(Map paramMap) {
		return alarmAnalyseMapper.getComplexCommonList(paramMap);
	}

	@Override
	public Page<Map<String, Object>> queryComplexAlarm(
			Page<Map<String, Object>> p, Map param) {
		return alarmAnalyseMapper.queryComplexAlarm(p, param);
	}
}
