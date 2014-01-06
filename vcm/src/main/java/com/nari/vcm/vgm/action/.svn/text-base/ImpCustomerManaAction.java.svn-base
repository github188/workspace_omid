package com.nari.vcm.vgm.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

import org.apache.log4j.Logger;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.nari.common.mybatis.pagination.Page;
import com.nari.common.util.StringUtil;
import com.nari.vcm.vgm.service.*;
import com.opensymphony.xwork2.ActionSupport;


@ParentPackage("baseJson")
@Namespace("/")
@Action("impCustomerManaAction")
@Results({@Result(name="success",type="json")})
public class ImpCustomerManaAction extends ActionSupport{
	@Autowired
	private ImpCustomerManaService impCustomerManaService;
	private static Logger logger = Logger.getLogger(ImpCustomerManaAction.class);

	private int page = 1;
	private int limit ;
	private String vcmId;
	private String vcmNo;
	private String vcmName;
	private String custId;
	private String importVcmNo;
	private String importVcmName;
	private String custIds;
	private Map<String,String> vcmDetail = new HashMap<String,String>();
	private String orgNo;
	private String consNo;
	private String consName;
	private String consIds;
	private String areaId;
	private String factoryId;
	private String meterType;
	private Map<String,String> userDetail = new HashMap<String,String>();
	private String consId;
	
	private List<Map<String,Object>> vcmList;
	private List<Map<String,Object>> userList;
	private List<Map<String,Object>> cCustList;
	private long cCustTotalCount;
	private String importCCustVcmRet;
	private String saveCCustVcmRet;
	private List<Map<String,Object>> orgList;
	private List<Map<String,Object>> importUserList;
	private long importUserTotalCount;
	private String importCConsVcmRet;
	private String deleteCConsVcmRet;
	private List<Map<String,Object>> editOrgList;
	private List<Map<String,Object>> areaList;
	private List<Map<String,Object>> factoryList;
	private List<Map<String,Object>> meterList;
	private long meterTotalCount;
	private String saveCConsVcmRet;
	private List<Map<String,Object>> vcmTypeList;
	private List<Map<String,Object>> economyTypeList;
	private List<Map<String,Object>> creditLevelList;
	private List<Map<String,Object>> valueLevelList;
	private List<Map<String,Object>> riskLevelList;
	private List<Map<String,Object>> vipFlagList;
	private List<Map<String,Object>> industryList;
	private List<Map<String,Object>> consSortList;
	private List<Map<String,Object>> hecIndustryList;
	private List<Map<String,Object>> isVipList;

	public String queryCCons(){
		try{
			Page<Map<String,Object>> p = new Page<Map<String,Object>>();
			p.setCurrentPage(page);
			p.setSize(limit);
			Map<String,Object> map = new HashMap<String,Object>();
			map.put("ORG_NO", StringUtil.removeNull(orgNo));
			map.put("CONS_NO", StringUtil.removeNull(consNo));
			map.put("CONS_NAME", StringUtil.removeNull(consName));
			p = this.impCustomerManaService.queryCCons(p,map);
			importUserList = p.getResult();
			importUserTotalCount = p.getTotal();
		}catch(Exception e){
			logger.debug(e);
		}
		return SUCCESS;
	}
	
	public String queryCCustVcm(){
		try{
		Map<String,String> map = new HashMap<String, String>();
		map.put("CUST_ID", StringUtil.removeNull(vcmId));
		map.put("CUST_NO", StringUtil.removeNull(vcmNo));
		map.put("CUST_NAME", StringUtil.removeNull(vcmName));
		vcmList = impCustomerManaService.queryCCustVcm(map);
		}catch(Exception e){
			logger.debug(e);
		}
		return SUCCESS;
	}
	
	public String queryCConsVcm(){
		try{
		    Map<String,String> map = new HashMap<String,String>();
		    map.put("CUST_ID", StringUtil.removeNull(custId));
		    map.put("CONS_ID", StringUtil.removeNull(consId));
		    userList = impCustomerManaService.queryCConsVcm(map);
		}catch(Exception e){
			logger.debug(e);
		}
		return SUCCESS;
	}
	
	public String queryVwCustType(){
		try{
			vcmTypeList = impCustomerManaService.queryVwCustType();
		}catch(Exception e){
			logger.debug(e);
		}
		return SUCCESS;
	}
	
	public String queryVwEconomyType(){
	    try{
	    	economyTypeList = impCustomerManaService.queryVwEconomyType();
	    }catch(Exception e){
	    	logger.debug(e);
	    }
	    return SUCCESS;
	}
	
	public String queryVwCreditLevel(){
		try{
			creditLevelList = impCustomerManaService.queryVwCreditLevel();
		}catch(Exception e){
			logger.debug(e);
		}
		return SUCCESS;
	}
	
	public String queryVwValueLevel(){
		try{
			valueLevelList = impCustomerManaService.queryVwValueLevel();
		}catch(Exception e){
			logger.debug(e);
		}
		return SUCCESS;
	}
	
	public String queryVwRiskLevel(){
		try{
			riskLevelList = impCustomerManaService.queryVwRiskLevel();
		}catch(Exception e){
			logger.debug(e);
		}
		return SUCCESS;
	}
	
	public String queryVwVipFlag(){
		try{
			vipFlagList = impCustomerManaService.queryVwVipFlag();
		}catch(Exception e){
			logger.debug(e);
		}
		return SUCCESS;
	}
	
	public String queryVwIndustryCode(){
		try{
			industryList = impCustomerManaService.queryVwIndustryCode();
		}catch(Exception e){
			logger.debug(e);
		}
		return SUCCESS;
	}
	
	public String querySeaVwConsSortCode(){
		try{
			consSortList = impCustomerManaService.querySeaVwConsSortCode();
		}catch(Exception e){
			logger.debug(e);
		}
		return SUCCESS;
	}
	
	public String queryVwHecIndustryCode(){
		try{
			hecIndustryList = impCustomerManaService.queryVwHecIndustryCode();
		}catch(Exception e){
			logger.debug(e);
		}
		return SUCCESS;
	}
	
	public String queryVwIsVip(){
		try{
			isVipList = impCustomerManaService.queryVwIsVip();
		}catch(Exception e){
			logger.debug(e);
		}
		return SUCCESS;
	}
	
	public String queryCCust(){
		try{
			Page<Map<String,Object>> p = new Page<Map<String,Object>>();
			p.setCurrentPage(page);
			p.setSize(limit);
			Map<String,Object> map = new HashMap<String,Object>();
			map.put("CUST_NO", StringUtil.removeNull(importVcmNo));
			map.put("NAME", StringUtil.removeNull(importVcmName));
			p = impCustomerManaService.queryCCust(p,map);
			cCustList = p.getResult();
			cCustTotalCount = p.getTotal();
		}catch(Exception e){
			logger.debug(e);
		}
		return SUCCESS;
	}
	
	public String importCCustVcm(){
		try{
		List<String> custIdList = null ;
		  if(custIds!=null && !"".equals(custIds)){
		    String[] custIdArray = custIds.split(",");
		    custIdList = new ArrayList<String>(); 
		    for(int i=0;i<custIdArray.length;i++){
			  custIdList.add(custIdArray[i]);
	        }
		    Map<String,Object> map = new HashMap<String,Object>();
		    map.put("CUST_ID", custIdList);
		    impCustomerManaService.importCCustVcm(map);
		  }
		  importCCustVcmRet = "success";
		}catch(Exception e){
			importCCustVcmRet = "导入异常";
			logger.debug(e);
		}
		return SUCCESS;
	}
	
	public String importCConsVcm(){
		try{
			List<String> consIdList=null;
			if(custId!=null && !"".equals(custId) && consIds!=null && !"".equals(consIds)){
				String[] consIdArray = consIds.split(",");
				consIdList = new ArrayList<String>();
				for(int i=0;i<consIdArray.length;i++){
					consIdList.add(consIdArray[i]);
					String consId = consIdArray[i];
					//c_cust_def
					//查看该用户已存在于c_cust_def中的表 存放于idList中
					Map<String,Object> defMap = new HashMap<String,Object>();
					 defMap.put("CUST_ID", custId);
					 defMap.put("CONS_ID", "S"+consId);
					List<Map<String,Object>> meterExist = impCustomerManaService.queryCCustDef(defMap);
					List<String> idList = new ArrayList<String>();
					if(meterExist!=null && meterExist.size()>0){
						for(int k=0;k<meterExist.size();k++){
							idList.add((meterExist.get(k)).get("ID").toString());
						}
					}
					
					//查看该用户真正对应的表 存放于idListAll中
					List<Map<String, Object>> meterList = impCustomerManaService.queryMeter(consId);
					List<String> idListAll = new ArrayList<String>();
					if(meterList!=null && meterList.size()>0){
						for(int j=0;j<meterList.size();j++){
							idListAll.add((meterList.get(j)).get("ID").toString());
						}
					}
					
					//需要加入c_cust_def的表记录
					List<String> addList = new ArrayList<String>();
					for(int m=0;m<idListAll.size();m++){
						int flag = 0;
						for(int n=0;n<idList.size();n++){
						   if(idListAll.get(m).equals(idList.get(n))){
							   flag = 1;
							   break;
						   }
						}
						if(flag==0) addList.add(idListAll.get(m));
					}
					if(addList!=null && addList.size()>0){
					for(int m=0;m<addList.size();m++){
					    Map<String,Object> addMap = new HashMap<String,Object>();
					    addMap.put("OBJ_ID", addList.get(m));
					    addMap.put("CUST_ID", custId);
					    addMap.put("CONS_ID", "S"+consId);
					    List<Map<String,Object>> cCustDefIdList = impCustomerManaService.queryCCustDefId();
                        if(cCustDefIdList!=null && cCustDefIdList.size()>0){
                        	String cCustDefId = cCustDefIdList.get(0).get("C_CUST_DEF_ID").toString();
                        	addMap.put("C_CUST_DEF_ID", cCustDefId);
                        	impCustomerManaService.insertCCustDef(addMap);
                        }
					}
					}
					
					//需要从c_cust_def中删除的表记录
					List<String> deleteList = new ArrayList<String>();
					for(int m=0;m<idList.size();m++){
						int flag = 0;
						for(int n=0;n<idListAll.size();n++){
							if(idList.get(m).equals(idListAll.get(n))){
								flag = 1;
								break;
							}
						}
						if(flag==0) deleteList.add(idList.get(m));
					}
					if(deleteList!=null && deleteList.size()>0){
					Map<String,Object> deleteMap = new HashMap<String,Object>();
					deleteMap.put("DELETE_ID", deleteList);
					deleteMap.put("CUST_ID", custId);
					deleteMap.put("CONS_ID", "S"+consId);
					impCustomerManaService.deleteCCustDef(deleteMap);
					}
					
				}
				Map<String,Object> map = new HashMap<String,Object>();
				map.put("CONS_ID", consIdList);
				map.put("CUST_ID", custId);
				impCustomerManaService.importCConsVcm(map);
			}
			importCConsVcmRet = "success";
		}catch(Exception e){
			importCConsVcmRet = "导入异常";
			logger.debug(e);
		}
		return SUCCESS;
	}
	
	public String saveCCustVcm(){
		try{
			Map<String,String> map = new HashMap<String,String>();
			map.put("CUST_ID", StringUtil.removeNull(vcmDetail.get("custId")));
			map.put("CUST_NO", StringUtil.removeNull(vcmDetail.get("custNo")));
			map.put("CUST_NAME", StringUtil.removeNull(vcmDetail.get("custName")));
			map.put("CUST_TYPE", StringUtil.removeNull(vcmDetail.get("custType")));
			map.put("ECONOMY_TYPE", StringUtil.removeNull(vcmDetail.get("economyType")));
			map.put("CREDIT_LEVEL", StringUtil.removeNull(vcmDetail.get("creditLevel")));
			map.put("VALUE_LEVEL", StringUtil.removeNull(vcmDetail.get("valueLevel")));
			map.put("RISK_LEVEL", StringUtil.removeNull(vcmDetail.get("riskLevel")));
			map.put("VIP_FLAG", StringUtil.removeNull(vcmDetail.get("vipFlag")));
			map.put("LEGAL_PERSON", StringUtil.removeNull(vcmDetail.get("legalPerson")));
			map.put("INDUSTRY", StringUtil.removeNull(vcmDetail.get("industry")));
			map.put("OPER_SCOPE", StringUtil.removeNull(vcmDetail.get("operScope")));
			map.put("ENTEPRISE_WEBSITE", StringUtil.removeNull(vcmDetail.get("entepriseWebsite")));
			map.put("BRIEF", StringUtil.removeNull(vcmDetail.get("brief")));
			impCustomerManaService.saveCCustVcm(map);
			saveCCustVcmRet = "success";
		}catch(Exception e){
			saveCCustVcmRet = "保存异常";
			logger.debug(e);
		}
		return SUCCESS;
	}
	
	public String saveCConsVcm(){
		try{
			Map<String,String> map = new HashMap<String,String>();
			map.put("CONS_ID", StringUtil.removeNull(userDetail.get("consId")));
			map.put("CONS_SRC", StringUtil.removeNull(userDetail.get("consSrc")));
			map.put("CUST_ID", StringUtil.removeNull(userDetail.get("custId")));
			map.put("ORG_NO", StringUtil.removeNull(userDetail.get("orgNo")));
			map.put("CONS_NO", StringUtil.removeNull(userDetail.get("consNo")));
			map.put("CONS_NAME", StringUtil.removeNull(userDetail.get("consName")));
			map.put("CONS_SORT_CODE", StringUtil.removeNull(userDetail.get("consSortCode")));
			map.put("ELEC_ADDR", StringUtil.removeNull(userDetail.get("elecAddr")));
			map.put("TRADE_CODE", StringUtil.removeNull(userDetail.get("tradeCode")));
			map.put("HEC_INDUSTRY_CODE", StringUtil.removeNull(userDetail.get("hecIndustryCode")));
			map.put("IS_VIP", StringUtil.removeNull(userDetail.get("isVip")));
			map.put("METER_IDS", StringUtil.removeNull(userDetail.get("meterIds")));
			impCustomerManaService.saveCConsVcm(map);
			saveCConsVcmRet = "success";
		}catch(Exception e){
			saveCConsVcmRet = "保存异常";
			logger.debug(e);
		}
		return SUCCESS;
	}
	
	public String deleteCConsVcm(){
		try{
			List<String> consIdList=null;
			if(consIds!=null && !"".equals(consIds)){
				String[] consIdArray = consIds.split(",");
				consIdList = new ArrayList<String>();
				for(int i=0;i<consIdArray.length;i++){
					consIdList.add(consIdArray[i]);
				}
				Map<String,Object> map = new HashMap<String,Object>();
				map.put("CONS_ID", consIdList);
				impCustomerManaService.deleteCConsVcm(map);
			}
			deleteCConsVcmRet = "success";
		}catch(Exception e){
			deleteCConsVcmRet = "删除异常";
			logger.debug(e);
		}
		return SUCCESS;
	}
	
	public String queryOOrg03(){
		try{
			orgList = impCustomerManaService.queryOOrg03();
			editOrgList = orgList;
		}catch(Exception e){
			logger.debug(e);
		}
		return SUCCESS;
	}
	
	public String queryPbsArea(){
		try{
			areaList = impCustomerManaService.queryPbsArea();
		}catch(Exception e){
		   logger.debug(e);	
		}
		return SUCCESS;
	}
	
	public String queryPbsFactory(){
		try{
			Map<String,Object> map = new HashMap<String,Object>();
			map.put("AREA_ID", StringUtil.removeNull(areaId));
			factoryList = impCustomerManaService.queryPbsFactory(map);
		}catch(Exception e){
			logger.debug(e);
		}
		return SUCCESS;
	}
	
	public String queryPbsMeter(){
		try{
			Page<Map<String,Object>> p = new Page<Map<String,Object>>();
			p.setCurrentPage(page);
			p.setSize(limit);
			Map<String,Object> map = new HashMap<String,Object>();
			map.put("FAC_ID", StringUtil.removeNull(factoryId));
			map.put("METER_TYPE", StringUtil.removeNull(meterType));
			p = impCustomerManaService.queryPbsMeter(p,map);
			meterList = p.getResult();
			meterTotalCount = p.getTotal();
		}catch(Exception e){
			logger.debug(e);
		}
		return SUCCESS;
	}

	public String getVcmNo() {
		return vcmNo;
	}

	public void setVcmNo(String vcmNo) {
		this.vcmNo = vcmNo;
	}

	public String getVcmName() {
		return vcmName;
	}

	public void setVcmName(String vcmName) {
		this.vcmName = vcmName;
	}

	public List<Map<String, Object>> getVcmList() {
		return vcmList;
	}

	public void setVcmList(List<Map<String, Object>> vcmList) {
		this.vcmList = vcmList;
	}

	public String getCustId() {
		return custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public List<Map<String, Object>> getUserList() {
		return userList;
	}

	public void setUserList(List<Map<String, Object>> userList) {
		this.userList = userList;
	}

	public String getImportVcmNo() {
		return importVcmNo;
	}

	public void setImportVcmNo(String importVcmNo) {
		this.importVcmNo = importVcmNo;
	}

	public String getImportVcmName() {
		return importVcmName;
	}

	public void setImportVcmName(String importVcmName) {
		this.importVcmName = importVcmName;
	}

	public List<Map<String, Object>> getcCustList() {
		return cCustList;
	}

	public void setcCustList(List<Map<String, Object>> cCustList) {
		this.cCustList = cCustList;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	public long getcCustTotalCount() {
		return cCustTotalCount;
	}

	public void setcCustTotalCount(long cCustTotalCount) {
		this.cCustTotalCount = cCustTotalCount;
	}

	public String getCustIds() {
		return custIds;
	}

	public void setCustIds(String custIds) {
		this.custIds = custIds;
	}

	public String getImportCCustVcmRet() {
		return importCCustVcmRet;
	}

	public void setImportCCustVcmRet(String importCCustVcmRet) {
		this.importCCustVcmRet = importCCustVcmRet;
	}



	public Map<String, String> getVcmDetail() {
		return vcmDetail;
	}

	public void setVcmDetail(Map<String, String> vcmDetail) {
		this.vcmDetail = vcmDetail;
	}

	public String getSaveCCustVcmRet() {
		return saveCCustVcmRet;
	}

	public void setSaveCCustVcmRet(String saveCCustVcmRet) {
		this.saveCCustVcmRet = saveCCustVcmRet;
	}

	public String getVcmId() {
		return vcmId;
	}

	public void setVcmId(String vcmId) {
		this.vcmId = vcmId;
	}

	public String getOrgNo() {
		return orgNo;
	}

	public void setOrgNo(String orgNo) {
		this.orgNo = orgNo;
	}

	public String getConsNo() {
		return consNo;
	}

	public void setConsNo(String consNo) {
		this.consNo = consNo;
	}

	public String getConsName() {
		return consName;
	}

	public void setConsName(String consName) {
		this.consName = consName;
	}

	public List<Map<String, Object>> getOrgList() {
		return orgList;
	}

	public void setOrgList(List<Map<String, Object>> orgList) {
		this.orgList = orgList;
	}

	public List<Map<String, Object>> getImportUserList() {
		return importUserList;
	}

	public void setImportUserList(List<Map<String, Object>> importUserList) {
		this.importUserList = importUserList;
	}

	public long getImportUserTotalCount() {
		return importUserTotalCount;
	}

	public void setImportUserTotalCount(long importUserTotalCount) {
		this.importUserTotalCount = importUserTotalCount;
	}

	public String getConsIds() {
		return consIds;
	}

	public void setConsIds(String consIds) {
		this.consIds = consIds;
	}

	public String getImportCConsVcmRet() {
		return importCConsVcmRet;
	}

	public void setImportCConsVcmRet(String importCConsVcmRet) {
		this.importCConsVcmRet = importCConsVcmRet;
	}

	public String getDeleteCConsVcmRet() {
		return deleteCConsVcmRet;
	}

	public void setDeleteCConsVcmRet(String deleteCConsVcmRet) {
		this.deleteCConsVcmRet = deleteCConsVcmRet;
	}

	public List<Map<String, Object>> getEditOrgList() {
		return editOrgList;
	}

	public void setEditOrgList(List<Map<String, Object>> editOrgList) {
		this.editOrgList = editOrgList;
	}

	public List<Map<String, Object>> getAreaList() {
		return areaList;
	}

	public void setAreaList(List<Map<String, Object>> areaList) {
		this.areaList = areaList;
	}

	public List<Map<String, Object>> getFactoryList() {
		return factoryList;
	}

	public void setFactoryList(List<Map<String, Object>> factoryList) {
		this.factoryList = factoryList;
	}

	public String getAreaId() {
		return areaId;
	}

	public void setAreaId(String areaId) {
		this.areaId = areaId;
	}

	public String getFactoryId() {
		return factoryId;
	}

	public void setFactoryId(String factoryId) {
		this.factoryId = factoryId;
	}

	public String getMeterType() {
		return meterType;
	}

	public void setMeterType(String meterType) {
		this.meterType = meterType;
	}

	public List<Map<String, Object>> getMeterList() {
		return meterList;
	}

	public void setMeterList(List<Map<String, Object>> meterList) {
		this.meterList = meterList;
	}

	public long getMeterTotalCount() {
		return meterTotalCount;
	}

	public void setMeterTotalCount(long meterTotalCount) {
		this.meterTotalCount = meterTotalCount;
	}

	public Map<String, String> getUserDetail() {
		return userDetail;
	}

	public void setUserDetail(Map<String, String> userDetail) {
		this.userDetail = userDetail;
	}

	public String getSaveCConsVcmRet() {
		return saveCConsVcmRet;
	}

	public void setSaveCConsVcmRet(String saveCConsVcmRet) {
		this.saveCConsVcmRet = saveCConsVcmRet;
	}

	public String getConsId() {
		return consId;
	}

	public void setConsId(String consId) {
		this.consId = consId;
	}

	public List<Map<String, Object>> getVcmTypeList() {
		return vcmTypeList;
	}

	public void setVcmTypeList(List<Map<String, Object>> vcmTypeList) {
		this.vcmTypeList = vcmTypeList;
	}

	public List<Map<String, Object>> getEconomyTypeList() {
		return economyTypeList;
	}

	public void setEconomyTypeList(List<Map<String, Object>> economyTypeList) {
		this.economyTypeList = economyTypeList;
	}

	public List<Map<String, Object>> getCreditLevelList() {
		return creditLevelList;
	}

	public void setCreditLevelList(List<Map<String, Object>> creditLevelList) {
		this.creditLevelList = creditLevelList;
	}

	public List<Map<String, Object>> getValueLevelList() {
		return valueLevelList;
	}

	public void setValueLevelList(List<Map<String, Object>> valueLevelList) {
		this.valueLevelList = valueLevelList;
	}

	public List<Map<String, Object>> getRiskLevelList() {
		return riskLevelList;
	}

	public void setRiskLevelList(List<Map<String, Object>> riskLevelList) {
		this.riskLevelList = riskLevelList;
	}

	public List<Map<String, Object>> getVipFlagList() {
		return vipFlagList;
	}

	public void setVipFlagList(List<Map<String, Object>> vipFlagList) {
		this.vipFlagList = vipFlagList;
	}

	public List<Map<String, Object>> getIndustryList() {
		return industryList;
	}

	public void setIndustryList(List<Map<String, Object>> industryList) {
		this.industryList = industryList;
	}

	public List<Map<String, Object>> getConsSortList() {
		return consSortList;
	}

	public void setConsSortList(List<Map<String, Object>> consSortList) {
		this.consSortList = consSortList;
	}

	public List<Map<String, Object>> getHecIndustryList() {
		return hecIndustryList;
	}

	public void setHecIndustryList(List<Map<String, Object>> hecIndustryList) {
		this.hecIndustryList = hecIndustryList;
	}

	public List<Map<String, Object>> getIsVipList() {
		return isVipList;
	}

	public void setIsVipList(List<Map<String, Object>> isVipList) {
		this.isVipList = isVipList;
	}


}
