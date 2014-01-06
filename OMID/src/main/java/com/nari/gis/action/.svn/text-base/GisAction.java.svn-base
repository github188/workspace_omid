package com.nari.gis.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.eclipse.jdt.core.dom.ThisExpression;
import org.springframework.beans.factory.annotation.Autowired;

import com.nari.common.action.BaseAction;
import com.nari.common.mybatis.pagination.Page;
import com.nari.gis.service.GisService;
import com.nari.omid.mapper.GisMapper;
import com.opensymphony.xwork2.ActionSupport;


@ParentPackage("json-default")
@Namespace("/")
@Action("gisAction")
@Results({@Result(name="success",type="json"),@Result(name="input",type="json")})
public class GisAction extends BaseAction {
	
	private List cplist;
	private String search_params;
	private int page = 1;
	private int limit ;
	private long totalCount;
	private String cpDataString;
	private String gis_search_param;
	private List eventPonintList;
	private List eventCodeList;
	private String event_search_param;
	private List colorList;
	private String gisurlString;
	
	
	@Autowired
	private GisService gisService;
	@Autowired
	private GisMapper gisMapper;
	
	public String queryCp(){
		
		Map map = new HashMap();
		if(this.search_params != null){
			JSONObject jsonObject = JSONObject.fromObject(this.search_params);
			map = jsonObject;
			
			System.out.println(this.search_params);
		}
	   
	    
		
		
		Page<Map<String,Object>> p = new Page<Map<String,Object>>();
		
		p.setCurrentPage(page);
		p.setSize(limit);
		gisService.queryCp(map,p);
		cplist = p.getResult();
		totalCount = p.getTotal();
				

		return SUCCESS;
	}
	
	public String updateCpGps(){
		Map param = new HashMap();
		if(this.cpDataString != null){
			JSONObject jsonObject = JSONObject.fromObject(this.cpDataString);
			param = jsonObject;
			
			System.out.println(this.cpDataString);
		}
		
		gisService.updateCpGPS(param);
		
		return SUCCESS;
		
		
	}
	
	public String queryCpByAlarmType(){
		Map param = new HashMap();
		if(this.gis_search_param != null){
			JSONObject jsonObject = JSONObject.fromObject(this.gis_search_param);
			param = jsonObject;
			System.out.println(this.gis_search_param);
		}
		if(this.getPSysUser() == null){
			return SUCCESS;
		}
		param.put("org_no", this.getPSysUser().getOrgNo());
		eventPonintList = gisService.queryCpByAlarmType(param);
		
		return SUCCESS;
	}
	
	public String queryEventCode() {
		
		Map param = new HashMap();
		if(this.event_search_param != null){
			JSONObject jsonObject = JSONObject.fromObject(this.event_search_param);
			param = jsonObject;
			System.out.println(this.event_search_param);
		}
		eventCodeList = gisService.queryEventCode(param);
		
		return SUCCESS;

		
	}
	
	public String queryGisStyleColor() {
		colorList = gisMapper.queryGisStyleColor();
		return SUCCESS;
	}
	
	public String queryGisURL() {
		List list = gisMapper.queryGisURL();
		if (list.size() == 1) {
			gisurlString = ((Map)list.get(0)).get("URL").toString();
		}else {
			gisurlString = "http://192.168.176.94:8001"; 
		}
		return SUCCESS;
	}
	

	public List getCplist() {
		return cplist;
	}

	public void setCplist(List cplist) {
		this.cplist = cplist;
	}


	public String getSearch_params() {
		return search_params;
	}


	public void setSearch_params(String search_params) {
		this.search_params = search_params;
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


	public long getTotalCount() {
		return totalCount;
	}


	public void setTotalCount(long totalCount) {
		this.totalCount = totalCount;
	}

	public String getCpDataString() {
		return cpDataString;
	}

	public void setCpDataString(String cpDataString) {
		this.cpDataString = cpDataString;
	}

	public String getGis_search_param() {
		return gis_search_param;
	}

	public void setGis_search_param(String gis_search_param) {
		this.gis_search_param = gis_search_param;
	}

	public List getEventPonintList() {
		return eventPonintList;
	}

	public void setEventPonintList(List eventPonintList) {
		this.eventPonintList = eventPonintList;
	}

	public List getEventCodeList() {
		return eventCodeList;
	}

	public void setEventCodeList(List eventCodeList) {
		this.eventCodeList = eventCodeList;
	}

	public String getEvent_search_param() {
		return event_search_param;
	}

	public void setEvent_search_param(String event_search_param) {
		this.event_search_param = event_search_param;
	}



	public List getColorList() {
		return colorList;
	}

	public void setColorList(List colorList) {
		this.colorList = colorList;
	}

	public String getGisurlString() {
		return gisurlString;
	}

	public void setGisurlString(String gisurlString) {
		this.gisurlString = gisurlString;
	}

}
