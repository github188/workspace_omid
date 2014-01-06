package com.nari.intelDiag.service.impl;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.nari.common.mybatis.pagination.Page;
import com.nari.intelDiag.mapper.ElecAbnormalMapper;
import com.nari.intelDiag.service.EleAbnormalAnalyService;

@Service("EleAbnormalAnalyService")
public class EleAbnormalAnalyServiceImpl implements EleAbnormalAnalyService {
	
	@Autowired
	private ElecAbnormalMapper elecAbnormalMapper;
	
	public List getOrgNo(String orgNo) {
		return elecAbnormalMapper.getOrgNo(orgNo);
	};
	public List getEventLevelList() {
		return elecAbnormalMapper.getEventLevelList();
	};
	 public	List getConsTypeList(){
		 return elecAbnormalMapper.getConsTypeList();
		 
	 };
	 public List queryEleAbnormalTotalList(Map<String,String> queryItems){
		 List<Map<String,Object>> areaCodeList=elecAbnormalMapper.getAreaCodeByOrgNo(queryItems.get("orgNo"));
		 if(areaCodeList.size()>0 && areaCodeList.get(0)!=null){
			 queryItems.put("areaCode", (String)areaCodeList.get(0).get("AREA_CODE"));			 
		 }else{
			 queryItems.put("areaCode",null);
		 }
		 return elecAbnormalMapper.queryEleAbnormalTotalList(queryItems);
	 };
	 public Page<Map<String,Object>> queryAlarmAnalyseInfo(Page<Map<String,Object>> p,Map<String,String> queryItems){
		 List<Map<String,Object>> areaCodeList=elecAbnormalMapper.getAreaCodeByOrgNo(queryItems.get("orgNo"));
		 if(areaCodeList.size()>0 && areaCodeList.get(0)!=null){
			 queryItems.put("areaCode", (String)areaCodeList.get(0).get("AREA_CODE"));			 
		 }else{
			 queryItems.put("areaCode",null);
		 }
			return elecAbnormalMapper.queryEleAlarmAnalyseInfo(p,queryItems);
		}
	 public List queryFileTotalList(Map<String,String> queryItems){
		 return elecAbnormalMapper.queryFileTotalList(queryItems);
	 };
	public Page<Map<String,Object>> queryAlarmAnalyseHisInfo(Page<Map<String,Object>> p,Map<String,String> queryItems){
		 List<Map<String,Object>> areaCodeList=elecAbnormalMapper.getAreaCodeByOrgNo(queryItems.get("orgNo"));
		 if(areaCodeList.size()>0 && areaCodeList.get(0)!=null){
			 queryItems.put("areaCode", (String)areaCodeList.get(0).get("AREA_CODE"));			 
		 }else{
			 queryItems.put("areaCode",null);
		 }
		return elecAbnormalMapper.queryAlarmAnalyseHisInfo(p,queryItems);
	}
	public  List<Map<String,Object>> queryMeterDemandInfo(Map<String,String> queryItems){	
		return elecAbnormalMapper.queryMeterDemandInfo(queryItems);
	}	
	public  List<Map<String,Object>> queryMeterFactorInfo(Map<String,String> queryItems){	
		return elecAbnormalMapper.queryMeterFactorInfo(queryItems);
	}	
	public Page<Map<String,Object>> queryMeterEvent(Page<Map<String,Object>> p,Map<String,String> queryItems){
		return elecAbnormalMapper.queryMeterEvent(p,queryItems);
	}
	public List<Map<String,Object>> queryMeterEventDetail(Map<String,String> queryItems){
		return elecAbnormalMapper.queryMeterEventDetail(queryItems);
	}
	public Page<Map<String,Object>> queryEleMeterEventRec(Page<Map<String,Object>> p,Map<String,String> queryItems){
		return elecAbnormalMapper.queryEleMeterEventRec(p,queryItems);
	}
	public List<Map<String,Object>> queryMeterEventRecDetail(Map<String,String> queryItems){
		return elecAbnormalMapper.queryMeterEventRecDetail(queryItems);
	}
	 public Page<Map<String,Object>> queryEleTmnlEventRec(Page<Map<String,Object>> p,Map<String,String> queryItems){
		 return elecAbnormalMapper.queryEleTmnlEventRec(p,queryItems);
	 };
	public  List<Map<String,Object>> queryBLPhaseInfo(Map<String,String> queryItems){

		Map<String,String> map = new HashMap<String,String>();
		map.put("tableName", "e_mp_curve");
		map.put("queryDate", queryItems.get("dataTime"));
		map.put("dateFormat", "YYYY-MM-DD");
	//获取表分区
	String datePartition = elecAbnormalMapper.queryTablePartiTion(map);
	queryItems.put("datePartition", datePartition);
//	}
	return elecAbnormalMapper.queryBLPhaseInfo(queryItems);
}
}
