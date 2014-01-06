package com.nari.sysman.action;

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



import com.nari.sysman.service.MainPageService;
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
	private String stateDate;
	private String queryCode;
	
	private static Logger logger = Logger.getLogger(MainPageAction.class);
	
	private List<Map<String,Object>> resultList;
	/*-----------右下角监测信息统计信息开始---------------------------------*/
	@SuppressWarnings("unchecked")
	public String rightQuery_1() throws Exception{
		logger.debug("查询在线监测开始");
		try {
			Map map = new HashMap();
			map.put("orgNo", "15404");
			map.put("stateDate", "2012-09-12");
			resultList = mainPageService.rightQuery_1(map);
		} catch (Exception e) {
			e.printStackTrace();
		}
		logger.debug("查询在线监测结束");
		return SUCCESS;
		
	}
	
	@SuppressWarnings("unchecked")
	public String rightQuery_2(){
		Map map = new HashMap();
		map.put("orgNo", "15404");
		map.put("stateDate", "2012-09-12");
		resultList = mainPageService.rightQuery_2(map);
		return SUCCESS;
		
	}
	
	@SuppressWarnings("unchecked")
	public String rightQuery_3(){
		Map map = new HashMap();
		map.put("orgNo", "15404");
		map.put("stateDate", "2012-09-12");
		resultList = mainPageService.rightQuery_3(map);
		return SUCCESS;
		
	}
	
	@SuppressWarnings("unchecked")
	public String rightQuery_4(){
		Map map = new HashMap();
		map.put("orgNo", "15404");
		map.put("stateDate", "2012-09-12");
		resultList = mainPageService.rightQuery_4(map);
		return SUCCESS;
		
	}
	@SuppressWarnings("unchecked")
	public String rightQuery_5(){
		Map map = new HashMap();
		map.put("orgNo", "15404");
		map.put("stateDate", "2012-09-12");
		resultList = mainPageService.rightQuery_5(map);
		return SUCCESS;
		
	}
	@SuppressWarnings("unchecked")
	public String rightQuery_6(){
		Map map = new HashMap();
		map.put("queryCode", queryCode);
		resultList = mainPageService.rightQuery_6(map);
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

	public String getQueryCode() {
		return queryCode;
	}

	public void setQueryCode(String queryCode) {
		this.queryCode = queryCode;
	}
	
}
