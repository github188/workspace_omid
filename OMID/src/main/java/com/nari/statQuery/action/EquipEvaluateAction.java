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

import com.nari.common.mybatis.pagination.Page;
import com.nari.statQuery.service.EquipEvaluateService;
import com.opensymphony.xwork2.ActionSupport;


@ParentPackage("json-default")
@Namespace("/")
@Action("EquipEvaluateAction")
@Results({@Result(name="success",type="json"),
@Result(name="input",type="json")})
//@Results({@Result(name="success",location="/userList.jsp"),@Result(name="input",location="/index.jsp")})
public class EquipEvaluateAction extends ActionSupport {
	

	@Autowired
	private EquipEvaluateService equipEvaluateService;
	
	private String org_no;
//	private String start_date;
//	private String end_date;
	private String alarm_type;
	private String equip_type;
	private String group_condition;
	private String date_month;
	private int page = 1;
	private int limit ;
	private long totalCount;
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

	public String getEquip_type() {
		return equip_type;
	}

	public void setEquip_type(String equipType) {
		equip_type = equipType;
	}

	public String getGroup_condition() {
		return group_condition;
	}

	public void setGroup_condition(String groupCondition) {
		group_condition = groupCondition;
	}

	public String getDate_month() {
		return date_month;
	}

	public void setDate_month(String dateMonth) {
		date_month = dateMonth;
	}

	public String getAlarm_type() {
		return alarm_type;
	}

	public void setAlarm_type(String alarmType) {
		alarm_type = alarmType;
	}

	private List equipList;

	public String execute() throws Exception {
		return SUCCESS;
	}
	/**
	 * 查询终端装置
	 * @return
	 */
	public String queryEquipList(){
		try{
			Map paramMap=new HashMap();
			paramMap.put("ORG_NO", org_no);
			paramMap.put("ALARM_TYPE", alarm_type);
//			paramMap.put("START_DATE", start_date);
//			paramMap.put("END_DATE", end_date);
			paramMap.put("DATE_MONTH",date_month);
			paramMap.put("EQUIP_TYPE",equip_type);
			paramMap.put("GROUP_CONDITION",group_condition);
			Page<Map<String,Object>> p = new Page<Map<String,Object>>();
			p.setCurrentPage(page);
			p.setSize(limit);
			p=equipEvaluateService.getEquipList(paramMap,p);
			equipList=p.getResult();
			totalCount = p.getTotal();
		}catch(Exception e){
			e.printStackTrace();
		}
		return SUCCESS;
	}
	/**
	 * 查询电表装置
	 * @return
	 */
//	public String queryMeterList(){
//		try{
//			Map paramMap=new HashMap();
//			paramMap.put("ORG_NO", org_no);
//			paramMap.put("ALARM_TYPE", alarm_type);
//			paramMap.put("START_DATE", start_date);
//			paramMap.put("END_DATE", end_date);
//			meterList=equipEvaluateService.getMeterList(paramMap);
//		}catch(Exception e){
//			e.printStackTrace();
//		}
//		return SUCCESS;
//	}


	public String getOrg_no() {
		return org_no;
	}
	public List getEquipList() {
		return equipList;
	}

	public void setEquipList(List equipList) {
		this.equipList = equipList;
	}

	public void setOrg_no(String orgNo) {
		org_no = orgNo;
	}
}
