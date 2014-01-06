package com.nari.statQuery.action;

import java.util.HashMap;

import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.apache.struts2.convention.annotation.Action;

import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;


import com.nari.common.mybatis.pagination.Page;
import com.nari.statQuery.service.DisposeExcService;
import com.nari.statQuery.service.MeasureExcService;
import com.nari.statQuery.service.UsersExcService;
import com.opensymphony.xwork2.ActionSupport;


@ParentPackage("json-default")
@Namespace("/")
@Action("UsersExcAction")
@Results({@Result(name="success",type="json"),
@Result(name="input",type="json")})
//@Results({@Result(name="success",location="/userList.jsp"),@Result(name="input",location="/index.jsp")})
public class UsersExcAction extends ActionSupport {
	

	@Autowired
	private UsersExcService usersExcService;
	
	private int page = 1;
	private int limit ;
	private long totalCount;

	
	private String users_params;
	private String cons_no;
	private String event_type;
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
	public long getTotalCount() {
		return totalCount;
	}
	public void setTotalCount(long totalCount) {
		this.totalCount = totalCount;
	}
	public String getUsers_params() {
		return users_params;
	}
	public void setUsers_params(String usersParams) {
		users_params = usersParams;
	}
	public String getCons_no() {
		return cons_no;
	}
	public void setCons_no(String consNo) {
		cons_no = consNo;
	}
	public String getEvent_type() {
		return event_type;
	}
	public void setEvent_type(String eventType) {
		event_type = eventType;
	}
	public String getAlarm_type() {
		return alarm_type;
	}
	public void setAlarm_type(String alarmType) {
		alarm_type = alarmType;
	}
	public List getUsers_List() {
		return users_List;
	}
	public void setUsers_List(List usersList) {
		users_List = usersList;
	}
	public List getStatistics_list() {
		return statistics_list;
	}
	public void setStatistics_list(List statisticsList) {
		statistics_list = statisticsList;
	}
	public List getMeterExc_List() {
		return meterExc_List;
	}
	public void setMeterExc_List(List meterExcList) {
		meterExc_List = meterExcList;
	}
	public List getTmnlExc_List() {
		return tmnlExc_List;
	}
	public void setTmnlExc_List(List tmnlExcList) {
		tmnlExc_List = tmnlExcList;
	}
	public List getHisExc_List() {
		return hisExc_List;
	}
	public void setHisExc_List(List hisExcList) {
		hisExc_List = hisExcList;
	}
	private String alarm_type;
	private List users_List;
	private List statistics_list;
	private List meterExc_List;
	private List tmnlExc_List;
	private List hisExc_List;
	public String execute() throws Exception {
		return SUCCESS;
	}
	/**
	 * 查询用户
	 * @return
	 */
	public String queryUsers(){
		try{
			Map param = new HashMap();
			if(this.users_params != null){
				JSONObject jsonObject = JSONObject.fromObject(this.users_params);
				param = jsonObject;
			}
			Page<Map<String,Object>> p = new Page<Map<String,Object>>();
			p.setCurrentPage(page);
			p.setSize(limit);
			usersExcService.queryUsers(p, param);
			users_List = p.getResult();
			totalCount = p.getTotal();
		}catch(Exception e){
			e.printStackTrace();
		}
		return SUCCESS;
	}
	public String queryStatistics(){
		try{
			Map paramMap=new HashMap();
			paramMap.put("cons_no", cons_no);
			statistics_list=usersExcService.queryStatistics(paramMap);
		}catch(Exception e){
			e.printStackTrace();
		}
		return SUCCESS;
	}
	public String queryTmnlExc(){
		try{
			Map paramMap=new HashMap();
			paramMap.put("cons_no", cons_no);
			tmnlExc_List=usersExcService.queryTmnlExc(paramMap);
		}catch(Exception e){
			e.printStackTrace();
		}
		return SUCCESS;
	}
	public String queryMeterExc(){
		try{
			Map paramMap=new HashMap();
			paramMap.put("cons_no", cons_no);
			meterExc_List=usersExcService.queryMeterExc(paramMap);
		}catch(Exception e){
			e.printStackTrace();
		}
		return SUCCESS;
	}
	public String queryHisExc(){
		try{
			Map paramMap=new HashMap();
			paramMap.put("cons_no", cons_no);
			paramMap.put("event_type", event_type);
			hisExc_List=usersExcService.queryHisExc(paramMap);
		}catch(Exception e){
			e.printStackTrace();
		}
		return SUCCESS;
	}
}
