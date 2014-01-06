package com.nari.onlineMoni.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nari.common.mybatis.pagination.Page;
import com.nari.intelDiag.mapper.ElecAbnormalMapper;
import com.nari.onlineMoni.mapper.MeterRunStatusMonitorMapper;
import com.nari.onlineMoni.service.MeterRunStatusMonitorService;
@Service("MeterRunStatusMonitorService")
public class MeterRunStatusMonitorServiceImpl implements MeterRunStatusMonitorService{
	@Autowired
	private MeterRunStatusMonitorMapper meterRunStatusMonitorMapper;
	@Autowired
	private ElecAbnormalMapper elecAbnormalMapper;
	public	List queryMeterProcolCodeList(){
		return meterRunStatusMonitorMapper.queryMeterProcolCodeList();
	};
	 public List queryMeterRunStatusTotalList(Map<String,String> queryItems){
		 List<Map<String,Object>> areaCodeList=elecAbnormalMapper.getAreaCodeByOrgNo(queryItems.get("orgNo"));
		 if(areaCodeList.size()>0 && areaCodeList.get(0)!=null){
			 queryItems.put("areaCode", (String)areaCodeList.get(0).get("AREA_CODE"));			 
		 }else{
			 queryItems.put("areaCode",null);
		 }
		 queryItems.put("orgType", (String)areaCodeList.get(0).get("ORG_TYPE"));
		 return meterRunStatusMonitorMapper.queryMeterRunStatusTotalList(queryItems);
		 
	 };
	 public Page<Map<String,Object>> queryMeterRunFailInfo(Page<Map<String,Object>> p,Map<String,String> queryItems){
		 List<Map<String,Object>> areaCodeList=elecAbnormalMapper.getAreaCodeByOrgNo(queryItems.get("orgNo"));
		 if(areaCodeList.size()>0 && areaCodeList.get(0)!=null){
			 queryItems.put("areaCode", (String)areaCodeList.get(0).get("AREA_CODE"));			 
		 }else{
			 queryItems.put("areaCode",null);
		 }
		 return meterRunStatusMonitorMapper.queryMeterRunFailInfo(p,queryItems);
	 };
	 public List queryMeterCtrlSendRecord(Map<String,String> queryItems){
		 return meterRunStatusMonitorMapper.queryMeterCtrlSendRecord(queryItems);
	 };
	 public List queryMeterFailSendRecord(Map<String,String> queryItems){
		 return meterRunStatusMonitorMapper.queryMeterFailSendRecord(queryItems);
		 
	 };

}
