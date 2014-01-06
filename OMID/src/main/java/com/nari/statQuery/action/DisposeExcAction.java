package com.nari.statQuery.action;

import java.util.HashMap;

import java.util.List;
import java.util.Map;

import org.apache.struts2.convention.annotation.Action;

import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;


import com.nari.statQuery.service.DisposeExcService;
import com.nari.statQuery.service.MeasureExcService;
import com.opensymphony.xwork2.ActionSupport;


@ParentPackage("json-default")
@Namespace("/")
@Action("DisposeExcAction")
@Results({@Result(name="success",type="json"),
@Result(name="input",type="json")})
//@Results({@Result(name="success",location="/userList.jsp"),@Result(name="input",location="/index.jsp")})
public class DisposeExcAction extends ActionSupport {
	
	public Map getEvent_count() {
		return event_count;
	}

	public void setEvent_count(Map eventCount) {
		event_count = eventCount;
	}

	@Autowired
	private DisposeExcService disposeExcService;
	
	private String org_no;
	private String start_date;
	private String end_date;
	private String alarm_type;
	private String event_level;
	public String getEvent_level() {
		return event_level;
	}

	public void setEvent_level(String eventLevel) {
		event_level = eventLevel;
	}

	public String getAlarm_type() {
		return alarm_type;
	}

	public void setAlarm_type(String alarmType) {
		alarm_type = alarmType;
	}

	private Map event_count;
	private List statePieList;
	private List detailList;

	public List getDetailList() {
		return detailList;
	}

	public void setDetailList(List detailList) {
		this.detailList = detailList;
	}

	public List getStatePieList() {
		return statePieList;
	}
	public void setStatePieList(List statePieList) {
		this.statePieList = statePieList;
	}


	public String getStart_date() {
		return start_date;
	}
	public void setStart_date(String startDate) {
		start_date = startDate;
	}
	public String getEnd_date() {
		return end_date;
	}
	public void setEnd_date(String endDate) {
		end_date = endDate;
	}
	public String execute() throws Exception {
		return SUCCESS;
	}
	/**
	 * 查询异常数
	 * @return
	 */
	public String queryEventCount(){
		try{
			Map paramMap=new HashMap();
			paramMap.put("ORG_NO", org_no);
			paramMap.put("ALARM_TYPE", alarm_type);
			paramMap.put("START_DATE", start_date);
			paramMap.put("END_DATE", end_date);
			event_count=disposeExcService.getEventCount(paramMap);
		}catch(Exception e){
			e.printStackTrace();
		}
		return SUCCESS;
	}
	/**
	 * 查询处理状态饼图
	 * @return
	 */
	public String queryEventStatePie(){
		try{
			Map paramMap=new HashMap();
			paramMap.put("ORG_NO", org_no);
			paramMap.put("ALARM_TYPE", alarm_type);
			paramMap.put("START_DATE", start_date);
			paramMap.put("END_DATE", end_date);
			paramMap.put("EVENT_LEVEL", event_level);
			statePieList=disposeExcService.getEventStatePie(paramMap);
		}catch(Exception e){
			e.printStackTrace();
		}
		return SUCCESS;
	}
	/**
	 * 查询下级单位异常明细
	 * @return
	 */
	public String queryEventDetail(){
		try{
			Map paramMap=new HashMap();
			paramMap.put("ORG_NO", org_no);
			paramMap.put("ALARM_TYPE", alarm_type);
			paramMap.put("START_DATE", start_date);
			paramMap.put("END_DATE", end_date);
			detailList=disposeExcService.getEventDetail(paramMap);
		}catch(Exception e){
			e.printStackTrace();
		}
		return SUCCESS;
	}
	public String getOrg_no() {
		return org_no;
	}
	public void setOrg_no(String orgNo) {
		org_no = orgNo;
	}
}
