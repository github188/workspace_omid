package com.nari.intelDiag.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nari.common.mybatis.pagination.Page;
import com.nari.intelDiag.mapper.MeasureExceptionAnalMapper;
import com.nari.intelDiag.service.MeasureExceptionAnalService;

@Service("MeasureExceptionAnalService")
public class MeasureExceptionAnalServiceImpl implements
		MeasureExceptionAnalService {
	
	@Autowired
	private MeasureExceptionAnalMapper measureExceptionAnalMapper;
	
	public List<Map<String,Object>> queryExceptEventInfo(Map<String,Object> queryItems){
		return measureExceptionAnalMapper.queryExceptEventInfo(queryItems);
	}
	
	public Page<Map<String,Object>> queryAlarmAnalyseInfo(Page<Map<String,Object>> p,Map<String,String> queryItems){
		return measureExceptionAnalMapper.queryAlarmAnalyseInfo(p,queryItems);
	}
	
	public  List<Map<String,Object>> queryBLPhaseInfo(Map<String,String> queryItems){
		Map<String,String> map = new HashMap<String,String>();
		map.put("tableName", "e_mp_curve");
		map.put("queryDate", queryItems.get("dataTime"));
		map.put("dateFormat", "YYYY-MM-DD");
		//获取表分区
		String datePartition = measureExceptionAnalMapper.queryTablePartiTion(map);
		queryItems.put("datePartition", datePartition);
		return measureExceptionAnalMapper.queryBLPhaseInfo(queryItems);
	}
	
	public List<Map<String,Object>> queryMeterEvent(Map<String,String> queryItems){
		return measureExceptionAnalMapper.queryMeterEvent(queryItems);
	}
	
	public List<Map<String,Object>> queryEleMeterEventRec(Map<String,String> queryItems){
		return measureExceptionAnalMapper.queryEleMeterEventRec(queryItems);
	}
	
	public List<Map<String,Object>> queryMeterEventDetail(Map<String,String> queryItems){
		return measureExceptionAnalMapper.queryMeterEventDetail(queryItems);
	}
	
	public List<Map<String,Object>> queryMeterEventRecDetail(Map<String,String> queryItems){
		return measureExceptionAnalMapper.queryMeterEventRecDetail(queryItems);
	}
	
	public List<Map<String,Object>> queryeMpDayRead(Map<String,String> queryItems){
		return measureExceptionAnalMapper.queryeMpDayRead(queryItems);
	}
	
	public List<Map<String,Object>> queryaCalcDayPower(Map<String,String> queryItems){
		return measureExceptionAnalMapper.queryaCalcDayPower(queryItems);
	}
}
