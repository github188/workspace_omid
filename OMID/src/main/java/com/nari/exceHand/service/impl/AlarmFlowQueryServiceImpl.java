package com.nari.exceHand.service.impl;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nari.common.mybatis.pagination.Page;
import com.nari.exceHand.mapper.AlarmFlowQueryMapper;
import com.nari.exceHand.service.AlarmFlowQueryService;


@Service("AlarmFlowQueryService")
public class AlarmFlowQueryServiceImpl implements AlarmFlowQueryService{
	
	@Autowired
	private AlarmFlowQueryMapper alarmFlowQueryMapper;

	@Override
	public Page getAlarmFlowList(Map paramMap, Page<Map<String, Object>> p) {
		return alarmFlowQueryMapper.getAlarmFlowList(p, paramMap);
	}
}
