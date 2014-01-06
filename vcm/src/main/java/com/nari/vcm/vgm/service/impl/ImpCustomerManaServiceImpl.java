package com.nari.vcm.vgm.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.mortbay.log.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nari.common.mybatis.pagination.Page;
import com.nari.common.util.StringUtil;
import com.nari.vcm.vgm.mapper.ImpCustomerManaMapper;
import com.nari.vcm.vgm.service.ImpCustomerManaService;

@Service("ImpCustomerManaService")
public class ImpCustomerManaServiceImpl implements ImpCustomerManaService {
	
	@Autowired
	private ImpCustomerManaMapper impCustomerManaMapper;
	private static Logger logger = Logger.getLogger(ImpCustomerManaServiceImpl.class);

	public Page<Map<String,Object>> queryCCons(Page<Map<String,Object>> p ,Map<String,Object> map){
		return this.impCustomerManaMapper.queryCCons(p,map);
	}
	
	public List<Map<String,Object>> queryOOrg03(){
		return this.impCustomerManaMapper.queryOOrg03();
	}
	
	public List<Map<String,Object>> queryPbsArea(){
		return this.impCustomerManaMapper.queryPbsArea();
	}
	
	public List<Map<String,Object>> queryPbsFactory(Map<String,Object> map){
		return this.impCustomerManaMapper.queryPbsFactory(map);
	}
	
	public Page<Map<String,Object>> queryPbsMeter(Page<Map<String,Object>> p,Map<String,Object> map){
		return this.impCustomerManaMapper.queryPbsMeter(p,map);
	}
	
	public List<Map<String, Object>> queryCCustVcm(Map<String, String> map) {
		return this.impCustomerManaMapper.queryCCustVcm(map);
	}
	
	public List<Map<String, Object>> queryCConsVcm(Map<String, String> map){
		return this.impCustomerManaMapper.queryCConsVcm(map);
	}
	
	public List<Map<String,Object>> queryVwCustType(){
		return this.impCustomerManaMapper.queryVwCustType();
	}
	
	public List<Map<String,Object>> queryVwEconomyType(){
		return this.impCustomerManaMapper.queryVwEconomyType();
	}
	
	public List<Map<String,Object>> queryVwCreditLevel(){
		return this.impCustomerManaMapper.queryVwCreditLevel();
	}
	
	public List<Map<String,Object>> queryVwValueLevel(){
		return this.impCustomerManaMapper.queryVwValueLevel();
	}
	
	public List<Map<String,Object>> queryVwRiskLevel(){
		return this.impCustomerManaMapper.queryVwRiskLevel();
	}
	
	public List<Map<String,Object>> queryVwVipFlag(){
		return this.impCustomerManaMapper.queryVwVipFlag();
	}
	
	public List<Map<String,Object>> queryVwIndustryCode(){
		return this.impCustomerManaMapper.queryVwIndustryCode();
	}
	
	public List<Map<String,Object>> querySeaVwConsSortCode(){
		return this.impCustomerManaMapper.querySeaVwConsSortCode();
	}
	
	public List<Map<String,Object>> queryVwHecIndustryCode(){
		return this.impCustomerManaMapper.queryVwHecIndustryCode();
	}
	
	public List<Map<String,Object>> queryVwIsVip(){
		return this.impCustomerManaMapper.queryVwIsVip();
	}
	
	public Page<Map<String,Object>> queryCCust(Page<Map<String,Object>> p,Map<String,Object> map){
		return this.impCustomerManaMapper.queryCCust(p,map);
	}
	
	public List<Map<String,Object>> queryMeter(String consId){
		return this.impCustomerManaMapper.queryMeter(consId);
	}
	
	public List<Map<String, Object>>queryCCustDef(Map<String,Object> map){
		return this.impCustomerManaMapper.queryCCustDef(map);
	}
	
	public Integer importCCustVcm(Map<String,Object> map){
		return this.impCustomerManaMapper.importCCustVcm(map);
	}
	
	public Integer importCConsVcm(Map<String,Object> map){
		return this.impCustomerManaMapper.importCConsVcm(map);
	}
	
	public Integer saveCCustVcm(Map<String,String> map){
		if("".equals(map.get("CUST_ID"))){
		List<Map<String,Object>> custIdList = impCustomerManaMapper.queryCustId();
		if(custIdList!=null && custIdList.size()>0){
			map.put("CUST_ID", custIdList.get(0).get("CUST_ID").toString());
		}
		}
		return this.impCustomerManaMapper.saveCCustVcm(map);
	}
	
	public Integer saveCConsVcm(Map<String,String> map){
		if("".equals(map.get("CONS_ID"))){
			List<Map<String,Object>> consIdList = impCustomerManaMapper.queryConsId();
			if(consIdList!=null && consIdList.size()>0){
				map.put("CONS_ID", consIdList.get(0).get("CONS_ID").toString());
			}
		}
		
		String meterIds = map.get("METER_IDS");
		String consId = map.get("CONS_ID");
		String custId = map.get("CUST_ID");
		if(!"".equals(meterIds)){
		    String[] meterArray = meterIds.split(";");
		    for(int i=0;i<meterArray.length;i++){
		    	Map<String,Object> meterMap = new HashMap<String,Object>();
		    	meterMap.put("CONS_ID", consId);
		    	meterMap.put("CUST_ID",custId);
		    	String[] meterOperatorArray = meterArray[i].split(",");
		    	meterMap.put("OBJ_ID", meterOperatorArray[0]);
		    	String operaType = "0";
		    	if(meterOperatorArray.length>=2) 
		    	operaType = "-".equals(meterOperatorArray[1])?"1":"0";
		    	meterMap.put("OPERA_TYPE", operaType);
		    	List<Map<String,Object>> meterList = impCustomerManaMapper.queryCCustDefExist(meterMap);
		    	if(meterList!=null && meterList.size()>0){
		    		//存在
		    	}else{
		    		List<Map<String,Object>> cCustDefIdList = impCustomerManaMapper.queryCCustDefId();
                    if(cCustDefIdList!=null && cCustDefIdList.size()>0){
                    	String cCustDefId = cCustDefIdList.get(0).get("C_CUST_DEF_ID").toString();
                    	meterMap.put("C_CUST_DEF_ID", cCustDefId);
                    	impCustomerManaMapper.insertCCustDef(meterMap);
                    }
		    		
		    	}
		    }
		}
		this.impCustomerManaMapper.saveCConsVcm(map);
		return 1;
	}
	
	public Integer deleteCConsVcm(Map<String,Object> map){
		return this.impCustomerManaMapper.deleteCConsVcm(map);
	}
	
	public Integer deleteCCustDef(Map<String,Object> map){
		return this.impCustomerManaMapper.deleteCCustDef(map);
	}
	
	public Integer insertCCustDef(Map<String,Object> map){
		return this.impCustomerManaMapper.insertCCustDef(map);
	}
	
	public List<Map<String,Object>> queryCCustDefId(){
		return this.impCustomerManaMapper.queryCCustDefId();
	}
}
