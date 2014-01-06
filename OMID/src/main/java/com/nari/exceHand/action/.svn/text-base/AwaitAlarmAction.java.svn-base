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

import com.nari.common.action.BaseAction;
import com.nari.common.mybatis.pagination.Page;
import com.nari.exceHand.service.AwaitAlarmService;
import com.nari.omid.model.PSysUser;
import com.opensymphony.xwork2.ActionContext;

 
@ParentPackage("baseJson")
@Namespace("/awaitAlarm")
@Action("awaitAlarmAction")
@Results({
	@Result(name="success",type="json")
})
public class AwaitAlarmAction extends BaseAction{
	
	@Autowired
	private AwaitAlarmService awaitAlarmService;
	
	private List<Map<String, Object>> list ;
	private List<Map<String, Object>> exceptSRCList ;
	private List<Map<String,Object>> thingsList;
	public List<Map<String, Object>> getUserList() {
		return userList;
	}

	public void setUserList(List<Map<String, Object>> userList) {
		this.userList = userList;
	}

	private List<Map<String,Object>> detailList;
	private List<Map<String,Object>> userList;
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

	private List tmnlAlarmList;
	
	private String task_id;
	
	private int roleId;

	public String getTask_id() {
		return task_id;
	}

	public void setTask_id(String taskId) {
		task_id = taskId;
	}

	private String processMode;
	private String await_item_id;
	
	
	private String alarm_handle_param;
	
	private int page = 1;
	private int limit ;
	
	private long totalCount;
	
	
	private String tmnl_id;
	private String search_params;
	
	public String queryAwaitAlarm()throws Exception{
		Map<String, Object> map = new HashMap<String, Object>();
		if(this.search_params != null){
			JSONObject jsonObject = JSONObject.fromObject(this.search_params);
			map = jsonObject;
		}
		
		Page<Map<String,Object>> p = new Page<Map<String,Object>>();
		
		p.setCurrentPage(page);
		p.setSize(limit);
		
		
		Map session = ActionContext.getContext().getSession();
		PSysUser user=(PSysUser)session.get("pSysUser");
		String orgNo="";
		if(user!=null){
			orgNo=user.getOrgNo();
		}
		 
		map.put("org_no", orgNo);
	 
		p = awaitAlarmService.getPageAwaitAlarm(p, map);
		
		
		list = p.getResult(); 
		totalCount = p.getTotal();
		
		return SUCCESS;
	}
	
	


	public String getSearch_params() {
		return search_params;
	}

	public void setSearch_params(String searchParams) {
		search_params = searchParams;
	}

	//异常来源
	public String ExceptSRC() throws Exception{
		exceptSRCList= awaitAlarmService.getExceptSRC();
		return SUCCESS;
	}
	
	public String queryRole() throws Exception{
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("orgNo", this.getPSysUser().getOrgNo());
		list = awaitAlarmService.findRoleByStaffno(map);
		return SUCCESS;
	}

	public String Process() throws Exception{
		HashMap map = new HashMap();
		
		if ("2".equals(processMode)) {
			//Observe(); 待观察
			map.put("await_item_id", await_item_id);
			map.put("status_code", "2");
			awaitAlarmService.Process(map);
			
		} else if("3".equals(processMode)){
			//Misinformation(); 误报
			map.put("await_item_id", await_item_id);
			map.put("status_code", 3);
			awaitAlarmService.Process(map);
			 
		} else if("1".equals(processMode)){
			//本地处理
			 
			
		} else if("4".equals(processMode)){
			//传营销
			LocalProcess();
		}
		return SUCCESS;
	}
	
	public String handleAlarm() {
		Map param = new HashMap();
		
		if(this.alarm_handle_param != null){
			JSONObject jsonObject = JSONObject.fromObject(this.alarm_handle_param);
			param = jsonObject;
		}
		
		Map session = ActionContext.getContext().getSession();
		PSysUser user=(PSysUser)session.get("pSysUser");
		awaitAlarmService.handle_alarm(param,user);
		return SUCCESS;
	}
	
	public String queryTmnlAlarm(){
		
		Map map = new HashMap();
		map.put("tmnl_id", tmnl_id);
		tmnlAlarmList = awaitAlarmService.queryTmnlAlarm(map);
		
		return SUCCESS;
	}
	/*查询流程代办*/
	public String queryAlarmThings()throws Exception{
		try{
			HashMap<String, Object> map = new HashMap<String, Object>();
			Page<Map<String,Object>> p = new Page<Map<String,Object>>();
			
			Map session = ActionContext.getContext().getSession();
			PSysUser user=(PSysUser)session.get("pSysUser");
			String userNo="";
			if(user!=null){
				userNo=user.getStaffNo();
			}
			map.put("userNo", userNo);
			p.setCurrentPage(page);
			p.setSize(limit);
			p = awaitAlarmService.getAlarmThings(p, map);
			thingsList = p.getResult();
			totalCount = p.getTotal();
		}catch(Exception e){
			e.printStackTrace();
		}
		return SUCCESS;
	}
	
	/*查询流程代办与之相关的事件*/
	public String queryAlarmDetail()throws Exception{
		try{
			HashMap<String, Object> map = new HashMap<String, Object>();
			Page<Map<String,Object>> p = new Page<Map<String,Object>>();
			p.setCurrentPage(page);
			p.setSize(limit);
			map.put("TASK_ID", task_id);
			p = awaitAlarmService.getAlarmDetail(p, map);
			detailList = p.getResult();
			totalCount = p.getTotal();
		}catch(Exception e){
			e.printStackTrace();
		}
		return SUCCESS;
	}
	
	/*归档操作*/
	public String modifyFlowStatus()throws Exception{
		try{
			Map param = new HashMap();
			
			if(this.alarm_handle_param != null){
				JSONObject jsonObject = JSONObject.fromObject(this.alarm_handle_param);
				param = jsonObject;
				awaitAlarmService.modifyFlowStatus(param);
			}
			
		}catch(Exception e){
			e.printStackTrace();
		}
		return SUCCESS;
	}
	public String Marketing(Map map) throws Exception{
		
		return null;
	}
	
	public String LocalProcess() throws Exception{
		return null;
	}
	public String UserListbyOrgNO()throws Exception{
		try{
			Map session = ActionContext.getContext().getSession();
			PSysUser user=(PSysUser)session.get("pSysUser");
			String orgNo="";
			if(user!=null){
				orgNo=(String)user.getOrgNo();
			}
			Map param=new HashMap();
			param.put("ORG_NO", orgNo);
			param.put("roleId", roleId);
		    userList=awaitAlarmService.getUserListbyOrgNO(param);
		}catch(Exception e){
			e.printStackTrace();
		}
		return SUCCESS;
	}
	public List<Map<String, Object>> getList() {
		return list;
	}

	public void setList(List<Map<String, Object>> list) {
		this.list = list;
	}

	 
	public List<Map<String, Object>> getExceptSRCList() {
		return exceptSRCList;
	}

	public void setExceptSRCList(List<Map<String, Object>> exceptSRCList) {
		this.exceptSRCList = exceptSRCList;
	}

	public String getProcessMode() {
		return processMode;
	}

	public void setProcessMode(String processMode) {
		this.processMode = processMode;
	}

	public String getAwait_item_id() {
		return await_item_id;
	}

	public void setAwait_item_id(String awaitItemId) {
		await_item_id = awaitItemId;
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




	public String getAlarm_handle_param() {
		return alarm_handle_param;
	}




	public void setAlarm_handle_param(String alarm_handle_param) {
		this.alarm_handle_param = alarm_handle_param;
	}




	public String getTmnl_id() {
		return tmnl_id;
	}




	public void setTmnl_id(String tmnl_id) {
		this.tmnl_id = tmnl_id;
	}
 



	public List getTmnlAlarmList() {
		return tmnlAlarmList;
	}




	public void setTmnlAlarmList(List tmnlAlarmList) {
		this.tmnlAlarmList = tmnlAlarmList;
	}
	
	
	private String manage_type;

	public String getManage_type() {
		return manage_type;
	}

	public void setManage_type(String manageType) {
		manage_type = manageType;
	}

	public int getRoleId() {
		return roleId;
	}

	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}

}
