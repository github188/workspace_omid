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


import com.nari.statQuery.service.MeasureExcService;
import com.opensymphony.xwork2.ActionSupport;


@ParentPackage("json-default")
@Namespace("/")
@Action("MeasureExcAction")
@Results({@Result(name="success",type="json"),
@Result(name="input",type="json")})
//@Results({@Result(name="success",location="/userList.jsp"),@Result(name="input",location="/index.jsp")})
public class MeasureExcAction extends ActionSupport {
	
	@Autowired
	private MeasureExcService measureExcService;
	
	private String org_no;
	private String org_type;
	public String getOrg_type() {
		return org_type;
	}

	public void setOrg_type(String orgType) {
		org_type = orgType;
	}
	private String event_source;
	private String flow_status_code;
	public String getFlow_status_code() {
		return flow_status_code;
	}

	public void setFlow_status_code(String flowStatusCode) {
		flow_status_code = flowStatusCode;
	}
	private String start_date;
	private String end_date;
	private String alarm_type;
	private String alarm_level;
	public String getAlarm_type() {
		return alarm_type;
	}

	public void setAlarm_type(String alarmType) {
		alarm_type = alarmType;
	}

	public String getAlarm_level() {
		return alarm_level;
	}

	public void setAlarm_level(String alarmLevel) {
		alarm_level = alarmLevel;
	}
	//	private Map event_count;
	private List pieList;
	private List barList;
	private List statePieList;
	private List orgEventList;
	private List alarmLevelList;
	private List alarmTypeList;
	private List alarmSrcList;
	private List flowStatusList;
	private List flowFlagingList;
	public List getFlowFlagingList() {
		return flowFlagingList;
	}

	public void setFlowFlagingList(List flowFlagingList) {
		this.flowFlagingList = flowFlagingList;
	}
	private List createTypeList;
	public List getCreateTypeList() {
		return createTypeList;
	}

	public void setCreateTypeList(List createTypeList) {
		this.createTypeList = createTypeList;
	}

	public List getFlowStatusList() {
		return flowStatusList;
	}

	public void setFlowStatusList(List flowStatusList) {
		this.flowStatusList = flowStatusList;
	}
	private List selfList;
	private List lowerList;
	private List detailList;
	public List getSelfList() {
		return selfList;
	}

	public void setSelfList(List selfList) {
		this.selfList = selfList;
	}

	public List getLowerList() {
		return lowerList;
	}

	public void setLowerList(List lowerList) {
		this.lowerList = lowerList;
	}

	public List getDetailList() {
		return detailList;
	}

	public void setDetailList(List detailList) {
		this.detailList = detailList;
	}

	public List getAlarmLevelList() {
		return alarmLevelList;
	}

	public void setAlarmLevelList(List alarmLevelList) {
		this.alarmLevelList = alarmLevelList;
	}

	public List getAlarmTypeList() {
		return alarmTypeList;
	}

	public void setAlarmTypeList(List alarmTypeList) {
		this.alarmTypeList = alarmTypeList;
	}

	public List getAlarmSrcList() {
		return alarmSrcList;
	}

	public void setAlarmSrcList(List alarmSrcList) {
		this.alarmSrcList = alarmSrcList;
	}

	public List getOrgEventList() {
		return orgEventList;
	}

	public void setOrgEventList(List orgEventList) {
		this.orgEventList = orgEventList;
	}

	public List getStatePieList() {
		return statePieList;
	}

	public void setStatePieList(List statePieList) {
		this.statePieList = statePieList;
	}

	public List getBarList() {
		return barList;
	}

	public void setBarList(List barList) {
		this.barList = barList;
	}


	public List getPieList() {
		return pieList;
	}

	public void setPieList(List pieList) {
		this.pieList = pieList;
	}

//	private Map chart; 
//	public Map getEvent_count() {
//		return event_count;
//	}
//	
//	public void setEvent_count(Map eventCount) {
//		event_count = eventCount;
//	}
	public String getEvent_source() {
		return event_source;
	}
	public void setEvent_source(String eventSource) {
		event_source = eventSource;
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
	private List orgList;
	
	public List getOrgList() {
		return orgList;
	}
	public void setOrgList(List orgList) {
		this.orgList = orgList;
	}
	public String execute() throws Exception {
		return SUCCESS;
	}
	public String queryOrgNolist(){
		try{
			Map paramMap=new HashMap();
			paramMap.put("org_no",org_no);
			paramMap.put("org_type", org_type);
			orgList=measureExcService.getOrgNo(paramMap);
		}catch(Exception e){
			e.printStackTrace();
		}
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
			//paramMap.put("EVENT_SOURCE", event_source);
			paramMap.put("FLOW_STATUS_CODE", flow_status_code);
			paramMap.put("START_DATE", start_date);
			paramMap.put("END_DATE", end_date);
		//	event_count=measureExcService.getEventCount(paramMap);
			orgEventList=measureExcService.getEventContByOrg(paramMap);
		}catch(Exception e){
			e.printStackTrace();
		}
		return SUCCESS;
	}
	/**
	 * 查询异常类型
	 * @return
	 */
	public String queryTypePie(){
		try{
			Map paramMap=new HashMap();
			paramMap.put("ORG_NO", org_no);
			//paramMap.put("EVENT_SOURCE", event_source);
			paramMap.put("FLOW_STATUS_CODE", flow_status_code);
			paramMap.put("START_DATE", start_date);
			paramMap.put("END_DATE", end_date);
			pieList=measureExcService.getTypePie(paramMap);
		}catch(Exception e){
			e.printStackTrace();
		}
		return SUCCESS;
	}
	/**
	 * 查询各单位异常数
	 * @return
	 */
	public String queryEventBar(){
		try{
			Map paramMap=new HashMap();
			paramMap.put("ORG_NO", org_no);
			//paramMap.put("EVENT_SOURCE", event_source);
			paramMap.put("FLOW_STATUS_CODE", flow_status_code);
			paramMap.put("START_DATE", start_date);
			paramMap.put("END_DATE", end_date);
			//barList=measureExcService.getEventBar(paramMap);
			barList=measureExcService.getEventLevel(paramMap);
		}catch(Exception e){
			e.printStackTrace();
		}
		return SUCCESS;
	}
	/**
	 * 查询各状态异常数
	 * @return
	 */
	public String queryEventStatePie(){
		try{
			Map paramMap=new HashMap();
			paramMap.put("ORG_NO", org_no);
			//paramMap.put("EVENT_SOURCE", event_source);
			paramMap.put("FLOW_STATUS_CODE", flow_status_code);
			paramMap.put("START_DATE", start_date);
			paramMap.put("END_DATE", end_date);
			statePieList=measureExcService.getEventStatePie(paramMap);
		}catch(Exception e){
			e.printStackTrace();
		}
		return SUCCESS;
	}
	/**
	 * 查询异常等级
	 * @return
	 */
	public String queryAlarmLevel(){
		try{
			alarmLevelList=measureExcService.getAlarmLevel();
			Map firstMap=new HashMap<String, String>();
			firstMap.put("NAME", "全部");
			firstMap.put("VALUE", "");
			alarmLevelList.add(0, firstMap);
		}catch(Exception e){
			e.printStackTrace();
		}
		return SUCCESS;
	}
	/**
	 * 查询异常类型
	 * @return
	 */
	public String queryAlarmType(){
		try{
			alarmTypeList=measureExcService.getAlarmType();
			Map firstMap=new HashMap<String, String>();
			firstMap.put("NAME", "全部");
			firstMap.put("VALUE", "");
			alarmTypeList.add(0, firstMap);
		}catch(Exception e){
			e.printStackTrace();
		}
		return SUCCESS;
	}
	/**
	 * 查询异常来源
	 * @return
	 */
	public String queryAlarmSrc(){
		try{
			alarmSrcList=measureExcService.getAlarmSrc();
			Map firstMap=new HashMap<String, String>();
			firstMap.put("NAME", "全部");
			firstMap.put("VALUE", "");
			alarmSrcList.add(0, firstMap);
		}catch(Exception e){
			e.printStackTrace();
		}
		return SUCCESS;
	}
	/**
	 * 查询流程状态明细
	 * @return
	 */
	public String queryFlowStatus(){
		try{
			flowStatusList=measureExcService.getFlowStatus();
			Map firstMap=new HashMap<String, String>();
			firstMap.put("NAME", "全部");
			firstMap.put("VALUE", "");
			flowStatusList.add(0, firstMap);
		}catch(Exception e){
			e.printStackTrace();
		}
		return SUCCESS;
	}
	/**
	 * 查询流程状态
	 * @return
	 */
	public String queryFlowFlaging(){
		try{
			flowFlagingList=measureExcService.getFlowFlaging();
			Map firstMap=new HashMap<String, String>();
			firstMap.put("NAME", "全部");
			firstMap.put("VALUE", "");
			flowFlagingList.add(0, firstMap);
		}catch(Exception e){
			e.printStackTrace();
		}
		return SUCCESS;
	}
	/**
	 * 查询流程生产方式
	 * @return
	 */
	public String queryCreateType(){
		try{
			createTypeList=measureExcService.getCreateType();
			Map firstMap=new HashMap<String, String>();
			firstMap.put("NAME", "全部");
			firstMap.put("VALUE", "");
			createTypeList.add(0, firstMap);
		}catch(Exception e){
			e.printStackTrace();
		}
		return SUCCESS;
	}
	/**
	 * 查询本级单位各异常数量
	 * @return
	 */
	public String querySelfPie(){
		try{
			Map paramMap=new HashMap();
			paramMap.put("ORG_NO", org_no);
			paramMap.put("ALARM_TYPE", alarm_type);
			paramMap.put("EVENT_LEVEL", alarm_level);
			paramMap.put("START_DATE", start_date);
			paramMap.put("END_DATE", end_date);
			selfList=measureExcService.getSelfEventPie(paramMap);
		}catch(Exception e){
			e.printStackTrace();
		}
		return SUCCESS;
	}
	/**
	 * 查询下级单位异常总数
	 * @return
	 */
	public String querLowerPie(){
		try{
			Map paramMap=new HashMap();
			paramMap.put("ORG_NO", org_no);
			paramMap.put("ALARM_TYPE", alarm_type);
			paramMap.put("EVENT_LEVEL", alarm_level);
			paramMap.put("START_DATE", start_date);
			paramMap.put("END_DATE", end_date);
			lowerList=measureExcService.getLowerEventPie(paramMap);
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
			paramMap.put("EVENT_LEVEL", alarm_level);
			paramMap.put("START_DATE", start_date);
			paramMap.put("END_DATE", end_date);
			detailList=measureExcService.getEventDetail(paramMap);
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
