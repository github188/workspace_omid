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

import com.nari.exceHand.service.AwaitAlarmService;
import com.opensymphony.xwork2.ActionSupport;
 
@ParentPackage("baseJson")
@Namespace("/awaitAlarm")
@Action("alarmRemoveAction")
@Results({
	@Result(name="success",type="json")
})
public class AlarmRemoveAction extends ActionSupport{
	
	 
	@Autowired
	private AwaitAlarmService awaitAlarmService;
	 
  
	private String handp; 
	
	 
	public String getHandp() {
		return handp;
	}


	public void setHandp(String handp) {
		this.handp = handp;
	}


	public String addAlarmRemove()throws Exception{
		try{
	Map param = new HashMap();
			
			if(this.handp != null){
				JSONObject jsonObject = JSONObject.fromObject(this.handp);
				param = jsonObject;
				awaitAlarmService.modifyAlarmRemove(param);
			}
			
		 
		}catch(Exception e){
			e.printStackTrace();
		}
		return SUCCESS;
	}
	 

}
