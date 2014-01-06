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
import com.nari.sysman.service.TemplateManageService;

@ParentPackage("baseJson")
@Namespace("/sysman")
@Action("templateManageAction")
@Results({@Result(name="success",type="json")})
public class TemplateManageAction extends BaseAction{

	@Autowired
	private TemplateManageService templateManageService;
	
	private static Logger logger = Logger.getLogger(TemplateManageAction.class);
	
	private int page = 1;
	private int limit ;
	private String tmnlTypeCode;
	private String protocolCode;
	private String eventTypeCode;
	private String orgNoParam;
	private String protocolCodeParam;
	private String tmnlTypeCodeParam;
	private String eventNoParam;
	private String recFlagParam;
	private String eventLevelParam;
	private String eventIsValidParam;
	private String createAppFlowParam;
	private String eventAnalParam;
	private String alarmCodeParam;
	private String tmnlTemplateId;
	private String tmnlTempIdParam;
	private String eventCodeParam;
	private String isValidParam;
	private String eventIsValidParam2;
	private String alarmCodeParam2;
	private String terminalAddrs;
	private String consNos;
	private String terminalIdParam;
	private String areaCodeParam;
	
	private List<Map<String,Object>> f9TempList;
	private List<Map<String,Object>> eventTypeCodeList;
	private List<Map<String,Object>> seaAlarmCodeList01;
	private List<Map<String,Object>> seaAlarmCodeList02;
	private List<Map<String,Object>> seaAlarmCodeList03;
	private List<Map<String,Object>> seaAlarmCodeList0101;
	private List<Map<String,Object>> seaAlarmCodeList0202;
	private List<Map<String,Object>> seaAlarmCodeList0303;
	private List<Map<String,Object>> protocolCodeList;
	private List<Map<String,Object>> tmnlTypeCodeList;
	private String retString;
	private List<Map<String,Object>> orgNoList;
	private List<Map<String,Object>> eventAppDefList;
	private List<Map<String,Object>> tmnlList;
	private long tmnlTotalCount;
	private String sendByTmnlString;
	
	public String queryTmnl(){
		Page<Map<String,Object>> p = new Page<Map<String,Object>>();
		p.setCurrentPage(page);
		p.setSize(limit);		
		Map paramMap = new HashMap();
		paramMap.put("PROTOCOL_CODE", StringUtil.removeNull(protocolCode));
		paramMap.put("TMNL_TYPE_CODE", StringUtil.removeNull(tmnlTypeCode));
		List<String> terminalAddrList = null;
		List<String> consNosList = null;
		String[] terminalAddr ;
		if(terminalAddrs!=null && !"".equals(terminalAddrs)){
			terminalAddrList = new ArrayList<String>();
			terminalAddr = terminalAddrs.split(",");
			for(int i=0;i<terminalAddr.length;i++){
				terminalAddrList.add(terminalAddr[i]);
		    }
		}
		String[] consNo ;
		if(consNos!=null && !"".equals(consNos)){
			consNosList = new ArrayList<String>();
			consNo = consNos.split(",");
			for(int i=0;i<consNo.length;i++){
				consNosList.add(consNo[i]);
		    }
		}
		paramMap.put("TERMINAL_ADDR", terminalAddrList);
		paramMap.put("CONS_NO", consNosList);
		p = templateManageService.queryTmnl(p,paramMap);
		tmnlList = p.getResult();
		tmnlTotalCount = p.getTotal();
		return SUCCESS;
	}
	
	public String sendTaskByTmnl(){
		
		String[] protocolCode = protocolCodeParam.split(",");
		String[] tmnlTypeCode = tmnlTypeCodeParam.split(",");
		String[] terminalId = terminalIdParam.split(",");
		String[] areaCode = areaCodeParam.split(","); 
//		PSysUser user = this.getPSysUser();
//		String orgNo = user.getAccessLevel();
		String orgNo = "";
		List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
		if(protocolCode!=null && protocolCode.length>0){
			for(int i=0;i<protocolCode.length;i++){
				Map paramMap = new HashMap();
				paramMap.put("PROTOCOL_CODE", protocolCode[i]);
				paramMap.put("TERMINAL_TYPE_CODE", tmnlTypeCode[i]);
				paramMap.put("TERMINAL_ID", terminalId[i]);
				paramMap.put("AREA_CODE", areaCode[i]);
				list.add(paramMap);
			}
		}
		sendByTmnlString = templateManageService.sendTaskByTmnl(orgNo,list);
		return SUCCESS;
	}
	
	public String sendTmnlTask(){
		Map paramMap = new HashMap();
		paramMap.put("ORG_NO", orgNoParam);
		retString = templateManageService.sendTmnlTask(paramMap);
		return SUCCESS;
	}
	
	public String queryOrgNoNameByOrgType03(){
		orgNoList = templateManageService.queryOrgNoNameByOrgType03();
		return SUCCESS;
	}
	
	public String queryTmnlTypeCode(){
		tmnlTypeCodeList = templateManageService.queryTmnlTypeCode();
		return SUCCESS;
	}
	
	public String queryProtocolCode(){
		protocolCodeList = templateManageService.queryProtocolCode();
		return SUCCESS;
	}
	
	public String queryF9Temp(){
		Map paramMap=new HashMap();
		paramMap.put("TMNL_TYPE_CODE", StringUtil.removeNull(tmnlTypeCode));
		paramMap.put("PROTOCOL_CODE", StringUtil.removeNull(protocolCode));
		f9TempList = templateManageService.queryF9Temp(paramMap);
		return SUCCESS;
	}
	
	public String querySeaAlarmCode01(){
		seaAlarmCodeList01 = templateManageService.querySeaAlarmCode01();
		return SUCCESS;
	}
	
	public String querySeaAlarmCode02(){
		seaAlarmCodeList02 = templateManageService.querySeaAlarmCode02();
		return SUCCESS;
	}
	
	public String querySeaAlarmCode03(){
		seaAlarmCodeList03 = templateManageService.querySeaAlarmCode03();
		return SUCCESS;
	}
	
	public String querySeaAlarmCode0101(){
		seaAlarmCodeList0101 = templateManageService.querySeaAlarmCode0101();
		return SUCCESS;
	}
	
	public String querySeaAlarmCode0202(){
		seaAlarmCodeList0202 = templateManageService.querySeaAlarmCode0202();
		return SUCCESS;
	}
	
	public String querySeaAlarmCode0303(){
		seaAlarmCodeList0303 = templateManageService.querySeaAlarmCode0303();
		return SUCCESS;
	}
	
	public String saveBTmnlEventTemplate(){
		Map paramMap = new HashMap();
		paramMap.put("ORG_NO", StringUtil.removeNull(orgNoParam));
		paramMap.put("PROTOCOL_CODE", StringUtil.removeNull(protocolCodeParam));
		paramMap.put("TMNL_TYPE_CODE", StringUtil.removeNull(tmnlTypeCodeParam));
		paramMap.put("EVENT_NO", StringUtil.removeNull(eventNoParam));
		paramMap.put("REC_FLAG", StringUtil.removeNull(recFlagParam));
		paramMap.put("EVENT_LEVEL", StringUtil.removeNull(eventLevelParam));
		paramMap.put("EVENT_IS_VALID", StringUtil.removeNull(eventIsValidParam));
		paramMap.put("CREATE_APP_FLOW", StringUtil.removeNull(createAppFlowParam));
		paramMap.put("ALARM_CODE", StringUtil.removeNull(alarmCodeParam));
		retString = templateManageService.saveBTmnlEventTemplate(paramMap);
		return SUCCESS;
	}
	
	public String saveBTmnlEveAppDef(){
		Map paramMap = new HashMap();
		paramMap.put("TMNL_TEMPLATE_ID", StringUtil.removeNull(tmnlTempIdParam));
		paramMap.put("EVENT_CODE", StringUtil.removeNull(eventCodeParam));
		paramMap.put("IS_VALID", StringUtil.removeNull(isValidParam));
		paramMap.put("EVENT_IS_VALID", StringUtil.removeNull(eventIsValidParam2));
		paramMap.put("ALARM_CODE", StringUtil.removeNull(alarmCodeParam2));
		retString = templateManageService.saveBTmnlEveAppDef(paramMap);
		return SUCCESS;
	}
	
	public String queryEventAppDef(){
		Map paramMap = new HashMap();
		paramMap.put("TMNL_TEMPLATE_ID", tmnlTemplateId);
		eventAppDefList = templateManageService.queryEventAppDef(paramMap);
		return SUCCESS;
	}
	
	public String getEventTypeCode() {
		return eventTypeCode;
	}

	public void setEventTypeCode(String eventTypeCode) {
		this.eventTypeCode = eventTypeCode;
	}

	public List<Map<String, Object>> getEventTypeCodeList() {
		return eventTypeCodeList;
	}

	public void setEventTypeCodeList(List<Map<String, Object>> eventTypeCodeList) {
		this.eventTypeCodeList = eventTypeCodeList;
	}

	public List<Map<String, Object>> getF9TempList() {
		return f9TempList;
	}

	public void setF9TempList(List<Map<String, Object>> f9TempList) {
		this.f9TempList = f9TempList;
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

	public List<Map<String, Object>> getProtocolCodeList() {
		return protocolCodeList;
	}

	public void setProtocolCodeList(List<Map<String, Object>> protocolCodeList) {
		this.protocolCodeList = protocolCodeList;
	}

	public List<Map<String, Object>> getTmnlTypeCodeList() {
		return tmnlTypeCodeList;
	}

	public void setTmnlTypeCodeList(List<Map<String, Object>> tmnlTypeCodeList) {
		this.tmnlTypeCodeList = tmnlTypeCodeList;
	}

	public String getOrgNoParam() {
		return orgNoParam;
	}

	public void setOrgNoParam(String orgNoParam) {
		this.orgNoParam = orgNoParam;
	}

	public String getProtocolCodeParam() {
		return protocolCodeParam;
	}

	public void setProtocolCodeParam(String protocolCodeParam) {
		this.protocolCodeParam = protocolCodeParam;
	}

	public String getTmnlTypeCodeParam() {
		return tmnlTypeCodeParam;
	}

	public void setTmnlTypeCodeParam(String tmnlTypeCodeParam) {
		this.tmnlTypeCodeParam = tmnlTypeCodeParam;
	}

	public String getEventNoParam() {
		return eventNoParam;
	}

	public void setEventNoParam(String eventNoParam) {
		this.eventNoParam = eventNoParam;
	}

	public String getRecFlagParam() {
		return recFlagParam;
	}

	public void setRecFlagParam(String recFlagParam) {
		this.recFlagParam = recFlagParam;
	}

	public String getEventLevelParam() {
		return eventLevelParam;
	}

	public void setEventLevelParam(String eventLevelParam) {
		this.eventLevelParam = eventLevelParam;
	}

	public String getEventIsValidParam() {
		return eventIsValidParam;
	}

	public void setEventIsValidParam(String eventIsValidParam) {
		this.eventIsValidParam = eventIsValidParam;
	}

	public String getCreateAppFlowParam() {
		return createAppFlowParam;
	}

	public void setCreateAppFlowParam(String createAppFlowParam) {
		this.createAppFlowParam = createAppFlowParam;
	}

	public String getEventAnalParam() {
		return eventAnalParam;
	}

	public void setEventAnalParam(String eventAnalParam) {
		this.eventAnalParam = eventAnalParam;
	}

	public String getAlarmCodeParam() {
		return alarmCodeParam;
	}

	public void setAlarmCodeParam(String alarmCodeParam) {
		this.alarmCodeParam = alarmCodeParam;
	}

	public String getRetString() {
		return retString;
	}

	public void setRetString(String retString) {
		this.retString = retString;
	}

	public List<Map<String, Object>> getOrgNoList() {
		return orgNoList;
	}

	public void setOrgNoList(List<Map<String, Object>> orgNoList) {
		this.orgNoList = orgNoList;
	}

	public List<Map<String, Object>> getSeaAlarmCodeList01() {
		return seaAlarmCodeList01;
	}

	public void setSeaAlarmCodeList01(List<Map<String, Object>> seaAlarmCodeList01) {
		this.seaAlarmCodeList01 = seaAlarmCodeList01;
	}

	public List<Map<String, Object>> getSeaAlarmCodeList02() {
		return seaAlarmCodeList02;
	}

	public void setSeaAlarmCodeList02(List<Map<String, Object>> seaAlarmCodeList02) {
		this.seaAlarmCodeList02 = seaAlarmCodeList02;
	}

	public List<Map<String, Object>> getSeaAlarmCodeList03() {
		return seaAlarmCodeList03;
	}

	public void setSeaAlarmCodeList03(List<Map<String, Object>> seaAlarmCodeList03) {
		this.seaAlarmCodeList03 = seaAlarmCodeList03;
	}

	public String getTmnlTemplateId() {
		return tmnlTemplateId;
	}

	public void setTmnlTemplateId(String tmnlTemplateId) {
		this.tmnlTemplateId = tmnlTemplateId;
	}

	public List<Map<String, Object>> getEventAppDefList() {
		return eventAppDefList;
	}

	public void setEventAppDefList(List<Map<String, Object>> eventAppDefList) {
		this.eventAppDefList = eventAppDefList;
	}

	public List<Map<String, Object>> getSeaAlarmCodeList0101() {
		return seaAlarmCodeList0101;
	}

	public void setSeaAlarmCodeList0101(
			List<Map<String, Object>> seaAlarmCodeList0101) {
		this.seaAlarmCodeList0101 = seaAlarmCodeList0101;
	}

	public List<Map<String, Object>> getSeaAlarmCodeList0202() {
		return seaAlarmCodeList0202;
	}

	public void setSeaAlarmCodeList0202(
			List<Map<String, Object>> seaAlarmCodeList0202) {
		this.seaAlarmCodeList0202 = seaAlarmCodeList0202;
	}

	public List<Map<String, Object>> getSeaAlarmCodeList0303() {
		return seaAlarmCodeList0303;
	}

	public void setSeaAlarmCodeList0303(
			List<Map<String, Object>> seaAlarmCodeList0303) {
		this.seaAlarmCodeList0303 = seaAlarmCodeList0303;
	}

	public String getTmnlTempIdParam() {
		return tmnlTempIdParam;
	}

	public void setTmnlTempIdParam(String tmnlTempIdParam) {
		this.tmnlTempIdParam = tmnlTempIdParam;
	}

	public String getEventCodeParam() {
		return eventCodeParam;
	}

	public void setEventCodeParam(String eventCodeParam) {
		this.eventCodeParam = eventCodeParam;
	}

	public String getIsValidParam() {
		return isValidParam;
	}

	public void setIsValidParam(String isValidParam) {
		this.isValidParam = isValidParam;
	}

	public String getEventIsValidParam2() {
		return eventIsValidParam2;
	}

	public void setEventIsValidParam2(String eventIsValidParam2) {
		this.eventIsValidParam2 = eventIsValidParam2;
	}

	public String getAlarmCodeParam2() {
		return alarmCodeParam2;
	}

	public void setAlarmCodeParam2(String alarmCodeParam2) {
		this.alarmCodeParam2 = alarmCodeParam2;
	}

	public String getTerminalAddrs() {
		return terminalAddrs;
	}

	public void setTerminalAddrs(String terminalAddrs) {
		this.terminalAddrs = terminalAddrs;
	}

	public String getConsNos() {
		return consNos;
	}

	public void setConsNos(String consNos) {
		this.consNos = consNos;
	}

	public List<Map<String, Object>> getTmnlList() {
		return tmnlList;
	}

	public void setTmnlList(List<Map<String, Object>> tmnlList) {
		this.tmnlList = tmnlList;
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

	public long getTmnlTotalCount() {
		return tmnlTotalCount;
	}

	public void setTmnlTotalCount(long tmnlTotalCount) {
		this.tmnlTotalCount = tmnlTotalCount;
	}

	public String getTerminalIdParam() {
		return terminalIdParam;
	}

	public void setTerminalIdParam(String terminalIdParam) {
		this.terminalIdParam = terminalIdParam;
	}

	public String getAreaCodeParam() {
		return areaCodeParam;
	}

	public void setAreaCodeParam(String areaCodeParam) {
		this.areaCodeParam = areaCodeParam;
	}

	public String getSendByTmnlString() {
		return sendByTmnlString;
	}

	public void setSendByTmnlString(String sendByTmnlString) {
		this.sendByTmnlString = sendByTmnlString;
	}

	
}
