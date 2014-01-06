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

import com.nari.exceHand.service.AwaitAlarmService;
import com.opensymphony.xwork2.ActionSupport;
 
@ParentPackage("baseJson")
@Namespace("/awaitAlarm")
@Action("flowPrintAction")
@Results({
	@Result(name="success",type="json")
})
public class FlowPrintAction extends ActionSupport{
	
	public List<Map<String, Object>> getList() {
		return list;
	}
	public void setList(List<Map<String, Object>> list) {
		this.list = list;
	}
	public List<Map<String, Object>> getThingsList() {
		return thingsList;
	}
	public void setThingsList(List<Map<String, Object>> thingsList) {
		this.thingsList = thingsList;
	}
	public List<Map<String, Object>> getDetailList() {
		return detailList;
	}
	public void setDetailList(List<Map<String, Object>> detailList) {
		this.detailList = detailList;
	}
	public String getTask_id() {
		return task_id;
	}
	public void setTask_id(String taskId) {
		task_id = taskId;
	}

	@Autowired
	private AwaitAlarmService awaitAlarmService;
	
	private List<Map<String, Object>> list ;
	private List<Map<String,Object>> thingsList; 
	private List<Map<String,Object>> detailList;
  
	private String task_id; 
	
	 
	public String TaskDetail()throws Exception{
		try{
			HashMap<String, Object> map = new HashMap<String, Object>();
			map.put("task_id", task_id);
			detailList= awaitAlarmService.getTaskDetailbyTaskId(map);
		}catch(Exception e){
			e.printStackTrace();
		}
		return SUCCESS;
	}
	public String TG()throws Exception{
		try{
			HashMap<String, Object> map = new HashMap<String, Object>();
			map.put("task_id", task_id);
			list=awaitAlarmService.getTGbyTaskId(map);
		}catch(Exception e){
			e.printStackTrace();
		}
		return SUCCESS;
	}
	
	public String doResult()throws Exception{
		try{
			HashMap<String, Object> map = new HashMap<String, Object>();
			map.put("task_id", task_id);
			thingsList=awaitAlarmService.getdoResultbyTaskId(map);
		}catch(Exception e){
			e.printStackTrace();
		}
		return SUCCESS;
	}
	
	 
	
	

}
