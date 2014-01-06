package com.nari.measancount.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.nari.demo.action.HelloAction;
import com.nari.measancount.service.MainPageService;
import com.opensymphony.xwork2.ActionSupport;

@ParentPackage("json-default")
@Namespace("/")
@Action("mainPageAction")
@Results({@Result(name="success",type="json"),@Result(name="input",type="json")})
public class MainPageAction extends ActionSupport{
	/*
	 * 系统主页统计说明
	 * 1.图形显示
	 * 2.右上角统计信息
	 * 3.右下角在线监测统计信息
	 */
	@Autowired
	private MainPageService mainPageService;
	private String orgNo;
	private String orgType;
	private String flashOrg;
	private String stateDate;
	private String queryCode;
	private String xmlCity;
	private String xmlCounty;
	
	private static Logger logger = Logger.getLogger(MainPageAction.class);
	
	private List<Map<String,Object>> resultList;
	private List<Map<String,Object>> resultCountryList;
	private List<Map<String,Object>> cityInfoList;
	/*-----------右下角监测信息统计信息开始---------------------------------*/
	@SuppressWarnings("unchecked")
	public String rightQuery_1() throws Exception{
		logger.debug("查询在线监测开始");
		try {
			Map map = new HashMap();
			map.put("orgNo", orgNo);
			map.put("orgType", orgType);
			List<Map<String,Object>>resultList_1 = mainPageService.rightQuery_1(map);
			List<Map<String,Object>> result= new ArrayList<Map<String,Object>>();
			if(resultList_1.size()>0){
				for(int i=0;i<resultList_1.size();i++){
					if(!String.valueOf(resultList_1.get(i).get("EXCETION_NUM1")).equals("0")){
						result.add(resultList_1.get(i));
					}
				}
			}
			resultList = result;
		} catch (Exception e) {
			e.printStackTrace();
		}
		logger.debug("查询在线监测结束");
		return SUCCESS;
		
	}
	
	@SuppressWarnings("unchecked")
	public String rightQuery_2(){
		Map map = new HashMap();
		map.put("orgNo", orgNo);
		map.put("orgType", orgType);
		resultList = mainPageService.rightQuery_2(map);
		List<Map<String,Object>>resultList_1 = mainPageService.rightQuery_2(map);
		List<Map<String,Object>> result= new ArrayList<Map<String,Object>>();
		if(resultList_1.size()>0){
			for(int i=0;i<resultList_1.size();i++){
				if(!String.valueOf(resultList_1.get(i).get("EXCETION_NUM1")).equals("0")){
					result.add(resultList_1.get(i));
				}
			}
		}
		resultList = result;
		return SUCCESS;
		
	}
	
	@SuppressWarnings("unchecked")
	public String rightQuery_3(){
		Map map = new HashMap();
		map.put("orgNo", orgNo);
		map.put("orgType", orgType);
		resultList = mainPageService.rightQuery_3(map);
		List<Map<String,Object>>resultList_1 = mainPageService.rightQuery_3(map);
		List<Map<String,Object>> result= new ArrayList<Map<String,Object>>();
		if(resultList_1.size()>0){
			for(int i=0;i<resultList_1.size();i++){
				if(!String.valueOf(resultList_1.get(i).get("EXCETION_NUM1")).equals("0")){
					result.add(resultList_1.get(i));
				}
			}
		}
		resultList = result;
		return SUCCESS;
		
	}
	
	@SuppressWarnings("unchecked")
	public String rightQuery_4(){
		Map map = new HashMap();
		map.put("orgNo", orgNo);
		map.put("orgType", orgType);
		resultList = mainPageService.rightQuery_4(map);
		List<Map<String,Object>>resultList_1 = mainPageService.rightQuery_4(map);
		List<Map<String,Object>> result= new ArrayList<Map<String,Object>>();
		if(resultList_1.size()>0){
			for(int i=0;i<resultList_1.size();i++){
				if(!String.valueOf(resultList_1.get(i).get("EXCETION_NUM1")).equals("0")){
					result.add(resultList_1.get(i));
				}
			}
		}
		resultList = result;
		return SUCCESS;
		
	}
	@SuppressWarnings("unchecked")
	public String rightQuery_5(){
		Map map = new HashMap();
		map.put("orgNo", orgNo);
		map.put("orgType", orgType);
		resultList = mainPageService.rightQuery_5(map);
		return SUCCESS;
	}
	@SuppressWarnings("unchecked")
	public String rightQuery_6(){
		Map map = new HashMap();
		if(orgType.equals("02")){
			map.put("queryCode", queryCode);
			map.put("orgType", orgType);
			map.put("orgNo", orgNo);
			resultList = mainPageService.rightQuery_6(map);
			resultCountryList = mainPageService.rightQuery_7(map);
		}else if(orgType.equals("03")){
			map.put("orgType", orgType);
			map.put("queryCode", queryCode);
			map.put("pOrgNo", orgNo);
			flashOrg = orgNo;
			cityInfoList = mainPageService.rightQuery_9(map);
		}else {
			map.put("orgNo", orgNo);
			Map map_1 = new HashMap();
			List<Map<String,Object>> orgList = mainPageService.rightQuery_8(map);
			map_1.put("queryCode", queryCode);
			map_1.put("pOrgNo",orgList.get(0).get("ORG_NO"));
			cityInfoList = mainPageService.rightQuery_9(map_1);
			flashOrg = String.valueOf(orgList.get(0).get("ORG_NO"));
		}
		return SUCCESS;
	}
	/*-----------------右下角统计在线监测信息结束----------------------------------*/
	
	public String getOrgNo() {
		return orgNo;
	}
	public void setOrgNo(String orgNo) {
		this.orgNo = orgNo;
	}
	public String getStateDate() {
		return stateDate;
	}
	public void setStateDate(String stateDate) {
		this.stateDate = stateDate;
	}
	public List<Map<String, Object>> getResultList() {
		return resultList;
	}
	public void setResultList(List<Map<String, Object>> resultList) {
		this.resultList = resultList;
	}
	
	public List<Map<String, Object>> getResultCountryList() {
		return resultCountryList;
	}

	public void setResultCountryList(List<Map<String, Object>> resultCountryList) {
		this.resultCountryList = resultCountryList;
	}

	public String getQueryCode() {
		return queryCode;
	}

	public void setQueryCode(String queryCode) {
		this.queryCode = queryCode;
	}

	public String getXmlCity() {
		return xmlCity;
	}

	public void setXmlCity(String xmlCity) {
		this.xmlCity = xmlCity;
	}

	public String getXmlCounty() {
		return xmlCounty;
	}

	public void setXmlCounty(String xmlCounty) {
		this.xmlCounty = xmlCounty;
	}

	public String getOrgType() {
		return orgType;
	}

	public void setOrgType(String orgType) {
		this.orgType = orgType;
	}
	
	public String getFlashOrg() {
		return flashOrg;
	}

	public void setFlashOrg(String flashOrg) {
		this.flashOrg = flashOrg;
	}

	public List<Map<String, Object>> getCityInfoList() {
		return cityInfoList;
	}

	public void setCityInfoList(List<Map<String, Object>> cityInfoList) {
		this.cityInfoList = cityInfoList;
	}
	
}
