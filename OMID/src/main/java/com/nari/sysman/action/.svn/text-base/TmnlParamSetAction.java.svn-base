package com.nari.sysman.action;

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

import com.nari.common.action.BaseAction;
import com.nari.common.mybatis.pagination.Page;
import com.nari.common.util.StringUtil;
import com.nari.sysman.service.TmnlParamSetService;

@ParentPackage("baseJson")
@Namespace("/sysman")
@Action("tmnlParamSetAction")
@Results({@Result(name="success",type="json")})
public class TmnlParamSetAction extends BaseAction{
	@Autowired
	private TmnlParamSetService tmnlParamSetService;
	
	private static Logger logger = Logger.getLogger(TmnlParamSetAction.class);
	
	private int page = 1;
	private int limit ;
	private String tmnlTypeCode;
	private String protocolCode;
	private String orgNo;
	private String terminalAddr;
	private String sendStatus;
	private String terminalId;
	private String taskItemId;
	private String taskBeginTimeParam;
	private String taskEndTimeParam;
	private String taskExecuteBeginTimeParam;
	private String taskExecuteEndTimeParam;
	private String callStatusCodeParam;
	private String sponsorParam;
	private String taskIds;
	
	private List<Map<String,Object>> sendCodeList;
	private List<Map<String,Object>> terminalList;
	private long totalCount;
	private List<Map<String,Object>> tTmnlParamList;
	private long chooseTotalCount;
	private List<Map<String,Object>> chooseList;
	
	public String queryTTmnlParam(){
		Map paramMap = new HashMap();
		paramMap.put("TERMINAL_ID", terminalId);
		paramMap.put("TMNL_TYPE_CODE", tmnlTypeCode);
		paramMap.put("PROTOCOL_CODE", protocolCode);
		tTmnlParamList = tmnlParamSetService.queryTTmnlParam(paramMap);
		return SUCCESS;
	}
	
	public String queryCallStatusCode(){
		sendCodeList = tmnlParamSetService.queryCallStatusCode();
		return SUCCESS;
	}
	
	public String queryFTaskFrontDet(){
        Page<Map<String,Object>> p = new Page<Map<String,Object>>();
		p.setCurrentPage(page);
		p.setSize(limit);
		Map paramMap=new HashMap();
		paramMap.put("TMNL_TYPE_CODE", StringUtil.removeNull(tmnlTypeCode));
		paramMap.put("PROTOCOL_CODE", StringUtil.removeNull(protocolCode));
		paramMap.put("ORG_NO", StringUtil.removeNull(orgNo));
		paramMap.put("TERMINAL_ADDR", StringUtil.removeNull(terminalAddr));
		paramMap.put("SEND_STATUS", StringUtil.removeNull(sendStatus));
		List<String> taskIdList = null ;
		if(taskIds!=null && !"".equals(taskIds)){
		  String[] taskIdArray = taskIds.split(",");
		  taskIdList = new ArrayList<String>(); 
		  for(int i=0;i<taskIdArray.length;i++){
			  taskIdList.add(taskIdArray[i]);
	      }
		}
		paramMap.put("TASK_ID", taskIdList);
		p = tmnlParamSetService.queryFTaskFrontDet(p,paramMap);
		terminalList = p.getResult();
		totalCount = p.getTotal();
		return SUCCESS;
	}

	public String queryFTaskFront(){
		Page<Map<String,Object>> p = new Page<Map<String,Object>>();
		p.setCurrentPage(page);
		p.setSize(limit);
		Map paramMap = new HashMap();
		paramMap.put("TASK_BEGIN_TIME", StringUtil.removeNull(taskBeginTimeParam.replace("T", " ")));
		paramMap.put("TASK_END_TIME", StringUtil.removeNull(taskEndTimeParam.replace("T", " ")));
		paramMap.put("CALL_SATRT_TIME", StringUtil.removeNull(taskExecuteBeginTimeParam.replace("T", " ")));
		paramMap.put("CALL_END_TIME", StringUtil.removeNull(taskExecuteEndTimeParam.replace("T", " ")));
		paramMap.put("CALL_STATUS_CODE", StringUtil.removeNull(callStatusCodeParam));
		paramMap.put("TASK_SPONSOR", StringUtil.removeNull(sponsorParam));
		p=tmnlParamSetService.queryFTaskFront(p, paramMap);
		chooseList = p.getResult();
		chooseTotalCount = p.getTotal();
		return SUCCESS;
	}
	
	public List<Map<String, Object>> getSendCodeList() {
		return sendCodeList;
	}

	public void setSendCodeList(List<Map<String, Object>> sendCodeList) {
		this.sendCodeList = sendCodeList;
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

	public List<Map<String, Object>> getTerminalList() {
		return terminalList;
	}

	public void setTerminalList(List<Map<String, Object>> terminalList) {
		this.terminalList = terminalList;
	}

	public long getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(long totalCount) {
		this.totalCount = totalCount;
	}

	public String getTmnlTypeCode() {
		return tmnlTypeCode;
	}

	public void setTmnlTypeCode(String tmnlTypeCode) {
		this.tmnlTypeCode = tmnlTypeCode;
	}

	public String getProtocolCode() {
		return protocolCode;
	}

	public void setProtocolCode(String protocolCode) {
		this.protocolCode = protocolCode;
	}

	public String getOrgNo() {
		return orgNo;
	}

	public void setOrgNo(String orgNo) {
		this.orgNo = orgNo;
	}

	public String getTerminalAddr() {
		return terminalAddr;
	}

	public void setTerminalAddr(String terminalAddr) {
		this.terminalAddr = terminalAddr;
	}

	public String getSendStatus() {
		return sendStatus;
	}

	public void setSendStatus(String sendStatus) {
		this.sendStatus = sendStatus;
	}

	public String getTerminalId() {
		return terminalId;
	}

	public void setTerminalId(String terminalId) {
		this.terminalId = terminalId;
	}

	public String getTaskItemId() {
		return taskItemId;
	}

	public void setTaskItemId(String taskItemId) {
		this.taskItemId = taskItemId;
	}

	public List<Map<String, Object>> gettTmnlParamList() {
		return tTmnlParamList;
	}

	public void settTmnlParamList(List<Map<String, Object>> tTmnlParamList) {
		this.tTmnlParamList = tTmnlParamList;
	}

	public String getTaskBeginTimeParam() {
		return taskBeginTimeParam;
	}

	public void setTaskBeginTimeParam(String taskBeginTimeParam) {
		this.taskBeginTimeParam = taskBeginTimeParam;
	}

	public String getTaskEndTimeParam() {
		return taskEndTimeParam;
	}

	public void setTaskEndTimeParam(String taskEndTimeParam) {
		this.taskEndTimeParam = taskEndTimeParam;
	}

	public String getTaskExecuteBeginTimeParam() {
		return taskExecuteBeginTimeParam;
	}

	public void setTaskExecuteBeginTimeParam(String taskExecuteBeginTimeParam) {
		this.taskExecuteBeginTimeParam = taskExecuteBeginTimeParam;
	}

	public String getTaskExecuteEndTimeParam() {
		return taskExecuteEndTimeParam;
	}

	public void setTaskExecuteEndTimeParam(String taskExecuteEndTimeParam) {
		this.taskExecuteEndTimeParam = taskExecuteEndTimeParam;
	}

	public String getCallStatusCodeParam() {
		return callStatusCodeParam;
	}

	public void setCallStatusCodeParam(String callStatusCodeParam) {
		this.callStatusCodeParam = callStatusCodeParam;
	}

	public String getSponsorParam() {
		return sponsorParam;
	}

	public void setSponsorParam(String sponsorParam) {
		this.sponsorParam = sponsorParam;
	}

	public long getChooseTotalCount() {
		return chooseTotalCount;
	}

	public void setChooseTotalCount(long chooseTotalCount) {
		this.chooseTotalCount = chooseTotalCount;
	}

	public List<Map<String, Object>> getChooseList() {
		return chooseList;
	}

	public void setChooseList(List<Map<String, Object>> chooseList) {
		this.chooseList = chooseList;
	}

	public String getTaskIds() {
		return taskIds;
	}

	public void setTaskIds(String taskIds) {
		this.taskIds = taskIds;
	}
}
