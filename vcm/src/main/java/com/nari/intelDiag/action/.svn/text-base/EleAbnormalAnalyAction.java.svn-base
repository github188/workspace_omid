package com.nari.intelDiag.action;

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
@ParentPackage("baseJson")
@Namespace("/")
@Action("eleAbnormalAnalyAction")
@Results({@Result(name="success",type="json"),
@Result(name="input",type="json")})
public class EleAbnormalAnalyAction extends BaseAction{
	
@Autowired
private EleAbnormalAnalyService eleAbnormalAnalyService;

private String orgNo;
private int page = 1;
private int limit ;
private Map<String,String> queryItems;
private Map<String,String> queryFileItems;


private List  list;
private Map result;
private long totalCount;
private List orgList;
private List eventList;
private List consList;
private List eleStattisTotalList;
private List eleFileTotalList;
private List<Map<String,Object>> eleHisInfoList ;


//-----------begin--------------
/**
 * 查询供电单位
 */
public String queryOrgNolist(){
	orgList=eleAbnormalAnalyService.getOrgNo(orgNo);
	return SUCCESS;
}
/**
 * 查询事件等级
 */
public String queryEventLevelList(){
	eventList=eleAbnormalAnalyService.getEventLevelList();
	return SUCCESS;
}
/**
 * 用户类型查询
 */
public String queryconstypeList(){
	consList=eleAbnormalAnalyService.getconstypeList();
	return SUCCESS;
}
/**
 * 查询统计信息
 * @return
 */
public String queryEleAbnormalTotalList(){
	eleStattisTotalList=eleAbnormalAnalyService.queryEleAbnormalTotalList(queryItems);
	System.out.println("tttttttttt"+eleStattisTotalList);
	return SUCCESS;
}
public String queryFileTotalList(){
	eleFileTotalList=eleAbnormalAnalyService.queryFileTotalList(queryFileItems);	
	return SUCCESS;
}

/**
 * 查询异常事件历史信息
 * @return
 */
public String queryAlarmAnalyseHisInfo(){
	Page<Map<String,Object>> p = new Page<Map<String,Object>>();
	p.setCurrentPage(page);
	p.setSize(limit);
	Page<Map<String,Object>> page = eleAbnormalAnalyService.queryAlarmAnalyseHisInfo(p,queryItems);
	eleHisInfoList=page.getResult();
	totalCount=page.getTotal();
	return SUCCESS;
}

//-------------end---------------


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
public List getEleStattisTotalList() {
	return eleStattisTotalList;
}
public void setEleStattisTotalList(List eleStattisTotalList) {
	this.eleStattisTotalList = eleStattisTotalList;
}
public List getEventList() {
	return eventList;
}
public void setEventList(List eventList) {
	this.eventList = eventList;
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
public List getConsList() {
	return consList;
}
public void setConsList(List consList) {
	this.consList = consList;
}

}
