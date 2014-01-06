package com.nari.onlineMoni.action;

import java.util.List;
import java.util.Map;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.nari.common.action.BaseAction;
import com.nari.common.mybatis.pagination.Page;
import com.nari.intelDiag.service.EleAbnormalAnalyService;
import com.nari.onlineMoni.service.MeterRunStatusMonitorService;

@ParentPackage("baseJson")
@Namespace("/")
@Action("meterRunStatusMonitorAction")
@Results( { @Result(name = "success", type = "json"),
		@Result(name = "input", type = "json") })
public class MeterRunStatusMonitorAction extends BaseAction {

	@Autowired
	private MeterRunStatusMonitorService meterRunStatusMonitorService;

	private String orgNo;
	private int page = 1;
	private int limit;
	private Map<String, String> queryItems;
	private Map<String, String> queryFileItems;

	private List list;
	private Map result;
	private long totalCount;
	private List orgList;
	private List protocolCodeList;
	private List consTypeList;
	private List meterRunStatusTotalList;
	private List meterCtrlSendRecord;
	private List meterFailSendRecord;
	private List eleFileTotalList;
	private List<Map<String, Object>> eleHisInfoList;
	private List<Map<String, Object>> resultList;

	// -----------begin--------------
	/**
	 * 查询电表规约
	 */
	public String queryMeterProcolCodeList() {
		protocolCodeList = meterRunStatusMonitorService
				.queryMeterProcolCodeList();
		return SUCCESS;
	}

	/**
	 * 查询失败统计信息
	 * 
	 * @return
	 */
	public String queryMeterRunStatusTotalList() {
		meterRunStatusTotalList = meterRunStatusMonitorService
				.queryMeterRunStatusTotalList(queryItems);
		System.out.println("tttttttttt" + meterRunStatusTotalList);
		return SUCCESS;
	}

	/**
	 * 查询失败明细信息
	 * 
	 * @return
	 */
	public String queryMeterRunFailInfo() {
		Page<Map<String, Object>> p = new Page<Map<String, Object>>();
		p.setCurrentPage(page);
		p.setSize(limit);
		Page<Map<String, Object>> page = meterRunStatusMonitorService
				.queryMeterRunFailInfo(p, queryItems);
		resultList = page.getResult();
		totalCount = page.getTotal();

		return SUCCESS;
	}

	public String queryMeterCtrlSendRecord() {
		meterCtrlSendRecord = meterRunStatusMonitorService
				.queryMeterCtrlSendRecord(queryItems);
		return SUCCESS;
	}

	/**
	 * 查询档案信息
	 * 
	 * @return
	 */
	public String queryFileTotalList() {
		// eleFileTotalList=meterRunStatusMonitorService.queryFileTotalList(queryFileItems);
		return SUCCESS;
	}

	public String queryMeterFailSendRecord() {
		meterFailSendRecord = meterRunStatusMonitorService
				.queryMeterFailSendRecord(queryItems);

		return SUCCESS;
	}

	/**
	 * 查询异常事件历史信息
	 * 
	 * @return
	 */
	public String queryAlarmAnalyseHisInfo() {
		// Page<Map<String,Object>> p = new Page<Map<String,Object>>();
		// p.setCurrentPage(page);
		// p.setSize(limit);
		// Page<Map<String,Object>> page =
		// meterRunStatusMonitorService.queryAlarmAnalyseHisInfo(p,queryItems);
		// eleHisInfoList=page.getResult();
		// totalCount=page.getTotal();
		return SUCCESS;
	}

	// -------------end---------------

	public List getOrgList() {
		return orgList;
	}

	public List<Map<String, Object>> getEleHisInfoList() {
		return eleHisInfoList;
	}

	public void setEleHisInfoList(List<Map<String, Object>> eleHisInfoList) {
		this.eleHisInfoList = eleHisInfoList;
	}

	public List getEleFileTotalList() {
		return eleFileTotalList;
	}

	public void setEleFileTotalList(List eleFileTotalList) {
		this.eleFileTotalList = eleFileTotalList;
	}

	public Map<String, String> getQueryItems() {
		return queryItems;
	}

	public void setQueryItems(Map<String, String> queryItems) {
		this.queryItems = queryItems;
	}

	public Map<String, String> getQueryFileItems() {
		return queryFileItems;
	}

	public void setQueryFileItems(Map<String, String> queryFileItems) {
		this.queryFileItems = queryFileItems;
	}

	public List getMeterRunStatusTotalList() {
		return meterRunStatusTotalList;
	}

	public void setMeterRunStatusTotalList(List meterRunStatusTotalList) {
		this.meterRunStatusTotalList = meterRunStatusTotalList;
	}

	public List getMeterCtrlSendRecord() {
		return meterCtrlSendRecord;
	}

	public void setMeterCtrlSendRecord(List meterCtrlSendRecord) {
		this.meterCtrlSendRecord = meterCtrlSendRecord;
	}

	public List getProtocolCodeList() {
		return protocolCodeList;
	}

	public void setProtocolCodeList(List protocolCodeList) {
		this.protocolCodeList = protocolCodeList;
	}

	public List getMeterFailSendRecord() {
		return meterFailSendRecord;
	}

	public void setMeterFailSendRecord(List meterFailSendRecord) {
		this.meterFailSendRecord = meterFailSendRecord;
	}

	public void setOrgList(List orgList) {
		this.orgList = orgList;
	}

	public String getOrgNo() {
		return orgNo;
	}

	public void setOrgNo(String orgNo) {
		this.orgNo = orgNo;
	}

	public List getConsTypeList() {
		return consTypeList;
	}

	public void setConsTypeList(List consTypeList) {
		this.consTypeList = consTypeList;
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

	public List getList() {
		return list;
	}

	public void setList(List list) {
		this.list = list;
	}

	public Map getResult() {
		return result;
	}

	public void setResult(Map result) {
		this.result = result;
	}

	public long getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(long totalCount) {
		this.totalCount = totalCount;
	}

	public List<Map<String, Object>> getResultList() {
		return resultList;
	}

	public void setResultList(List<Map<String, Object>> resultList) {
		this.resultList = resultList;
	}

}
