package com.nari.exceHand.action;

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
import com.nari.exceHand.service.AwaitAlarmService;
import com.opensymphony.xwork2.ActionSupport;
 
@ParentPackage("baseJson")
@Namespace("/awaitAlarm")
@Action("chaoqiAction")
@Results({
	@Result(name="success",type="json")
})
public class ChaoqiQueryAction extends ActionSupport{
	
	public List<Map<String, Object>> getList() {
		return list;
	}
	
	public void setList(List<Map<String, Object>> list) {
		this.list = list;
	}
	 
	public String getHandle_param() {
		return handle_param;
	}
	public void setHandle_param(String handleParam) {
		handle_param = handleParam;
	}

	@Autowired
	private AwaitAlarmService awaitAlarmService;
	
	private List<Map<String, Object>> list ;
 
	
	private List<Map<String, Object>> thingsList ;
  	public List<Map<String, Object>> getThingsList() {
		return thingsList;
	}

	public void setThingsList(List<Map<String, Object>> thingsList) {
		this.thingsList = thingsList;
	}

	private String  handle_param;; 
	
  	private int page = 1;
	private int limit ;
	
	private long totalCount;
	 
	public String queryAwaitchaoqi()throws Exception{
		try{
			Map<String, Object> map = new HashMap<String, Object>();
			
			if(this.handle_param != null){
				JSONObject jsonObject = JSONObject.fromObject(this.handle_param);
				map = jsonObject;
				Page<Map<String,Object>> p = new Page<Map<String,Object>>();
				
				p.setCurrentPage(page);
				p.setSize(limit);
				
				p=awaitAlarmService.awaitchaoqiQuery(p,map);
				
				list = p.getResult(); 
				totalCount = p.getTotal();
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return SUCCESS;
	}
	
	public String queryFlowchaoqi()throws Exception{
		try{
			Map<String, Object> map = new HashMap<String, Object>();
			
			if(this.handle_param != null){
				JSONObject jsonObject = JSONObject.fromObject(this.handle_param);
				map = jsonObject;
				Page<Map<String,Object>> p = new Page<Map<String,Object>>();
				
				p.setCurrentPage(page);
				p.setSize(limit);
				
				p=awaitAlarmService.flowchaoqiQuery(p,map);
				
				thingsList = p.getResult(); 
				totalCount = p.getTotal();
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return SUCCESS;
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
	
	 
	
	 
	
	

}
