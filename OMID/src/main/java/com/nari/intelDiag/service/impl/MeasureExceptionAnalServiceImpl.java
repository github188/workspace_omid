package com.nari.intelDiag.service.impl;

import java.util.HashMap;
import java.util.Iterator;
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
//		}
		return measureExceptionAnalMapper.queryBLPhaseInfo(queryItems);
	}
	
	public List<Map<String,Object>> queryMeterEvent(Page<Map<String,Object>> p,Map<String,String> queryItems){
		return measureExceptionAnalMapper.queryMeterEvent(p,queryItems);
	}
	
	public List<Map<String,Object>> queryEleMeterEventRec(Page<Map<String,Object>> p,Map<String,String> queryItems){
		return measureExceptionAnalMapper.queryEleMeterEventRec(p,queryItems);
	}
	
	public List<Map<String,Object>> queryMeterEventDetail(Page<Map<String,Object>> p,Map<String,String> queryItems){
		return measureExceptionAnalMapper.queryMeterEventDetail(p,queryItems);
	}
	
	public List<Map<String,Object>> queryMeterEventRecDetail(Page<Map<String,Object>> p,Map<String,String> queryItems){
		return measureExceptionAnalMapper.queryMeterEventRecDetail(p,queryItems);
	}
	
	public List<Map<String,Object>> queryeMpDayRead(Map<String,String> queryItems){
		return measureExceptionAnalMapper.queryeMpDayRead(queryItems);
	}
	
	public List<Map<String,Object>> queryaCalcDayPower(Map<String,String> queryItems){
		return measureExceptionAnalMapper.queryaCalcDayPower(queryItems);
	}
	@Override
    public List getconstypeList() {
		return measureExceptionAnalMapper.getconstypeList();
		}
	/**
	 * 查询统计信息
	 * @return
	 */
	 public List queryEleAbnormalTotalList(Map<String,String> queryItems){
		 return measureExceptionAnalMapper.queryEleAbnormalTotalList(queryItems);
	 }

	@Override
	public List<Map<String,Object>> empMeterClockInfo(Map<String, String> queryItems) {
	  return measureExceptionAnalMapper.empMeterClockInfo(queryItems);
	}

	@Override
	public List queryFileTotalList(Map<String, String> queryItems) {
		
		return measureExceptionAnalMapper.queryFileTotalList(queryItems);
	}

	@Override
	public Page<Map<String, Object>> queryAlarmAnalyseHisInfo(Page<Map<String, Object>> p, Map<String, String> queryItems) {
		return measureExceptionAnalMapper.queryAlarmAnalyseHisInfo(p,queryItems) ;
	};
	//queryEleTmnlEventRec
public List queryEleTmnlEventRec(Page<Map<String, Object>> p,Map<String, String> queryItems) {
		
		return measureExceptionAnalMapper.queryEleTmnlEventRec(p,queryItems);
	}
}
