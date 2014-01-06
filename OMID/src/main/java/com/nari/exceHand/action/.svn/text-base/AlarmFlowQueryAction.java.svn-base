package com.nari.exceHand.action;

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
import com.nari.exceHand.service.AlarmFlowQueryService;
import com.nari.statQuery.service.DisposeExcService;
//import com.nari.statQuery.service.EquipEvaluateService;
import com.nari.statQuery.service.MeasureExcService;
import com.opensymphony.xwork2.ActionSupport;


@ParentPackage("json-default")
@Namespace("/")
@Action("AlarmFlowQueryAction")
@Results({@Result(name="success",type="json"),
@Result(name="input",type="json")})
//@Results({@Result(name="success",location="/userList.jsp"),@Result(name="input",location="/index.jsp")})
public class AlarmFlowQueryAction extends ActionSupport {
	@Autowired
	private AlarmFlowQueryService alarmFlowQueryService;
	
	private String org_no;
	private String start_date;
	private String end_date;
	private String flow_status_code;
	private String create_type;
	public String getFlow_status_code() {
		return flow_status_code;
	}

	public void setFlow_status_code(String flowStatusCode) {
		flow_status_code = flowStatusCode;
	}

	public String getCreate_type() {
		return create_type;
	}

	public void setCreate_type(String createType) {
		create_type = createType;
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


	private List alramFlowList;

	public String execute() throws Exception {
		return SUCCESS;
	}
	/**
	 * 查询流程状态
	 * @return
	 */
	public String queryAlarmFlowList(){
		try{
			Map paramMap=new HashMap();
			paramMap.put("ORG_NO", org_no);
			paramMap.put("START_DATE", start_date);
			paramMap.put("END_DATE", end_date);
			paramMap.put("FLOW_STATUS_CODE", flow_status_code);
			paramMap.put("CREATE_TYPE", create_type);
			Page<Map<String,Object>> p = new Page<Map<String,Object>>();
			p.setCurrentPage(page);
			p.setSize(limit);
			p=alarmFlowQueryService.getAlarmFlowList(paramMap, p);
			alramFlowList=p.getResult();
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

	public List getAlramFlowList() {
		return alramFlowList;
	}

	public void setAlramFlowList(List alramFlowList) {
		this.alramFlowList = alramFlowList;
	}

	public void setOrg_no(String orgNo) {
		org_no = orgNo;
	}
}
