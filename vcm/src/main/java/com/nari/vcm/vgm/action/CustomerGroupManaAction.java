package com.nari.vcm.vgm.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.nari.vcm.vgm.service.*;
import com.opensymphony.xwork2.ActionSupport;


@ParentPackage("json-default")
@Namespace("/")
@Action("CustomerGroupManaAction")
@Results({@Result(name="success",type="json"),@Result(name="input",type="json")})
public class CustomerGroupManaAction extends ActionSupport{
	@Autowired
	private CustomerGroupManaService customerGroupManaService;
	
	
	private String customerGroupName;
	private String customerGroupFounderName;
	private String customerGroupBuildTime;
	private String customerGroupUsageType;
	private String customerGroupUsageDescription;
	private String customerGroupType;
	private String customerGroupModelName;
	private String customerGroupRefreshCycle;
	private String customerGroupRefreshMode;
	private String customerGroupID;
	
	private String CUST_GROUP_OBJ_ID2;//群成员（大客户）ID
	
	private String customerGroupID_Add;
	private String CUST_GROUP_OBJ_ID_Add;//群成员（大客户）ID
	
	private String impCustomerID; //大客户ID
	private String impCustomerName;//大客户Name
	private List<Map<String,Object>>impCustomerInfoList;//大客户信息
	
	private String customerGroupStartBuildTimeQ;//查询群创建开始时间
	private String customerGroupEndBuildTimeQ;//查询群创建截止时间
		
	private List<Map<String,Object>>CGAllList;
	private List<Map<String,Object>>CGAllListCon;
	
	private List<Map<String,Object>>customerGroupMemberInfoList;
	private List<Map<String,Object>>queryUASAGE_TYPE_CODEList;//群用途类型
	private List<Map<String,Object>>queryREFRESH_CYCLE_CODEList;//群刷新周期
	private List<Map<String,Object>>queryREFRESH_MODEList;//群刷新模式
	
	public String queryUASAGE_TYPE_CODE() throws Exception{
		try {
			
			queryUASAGE_TYPE_CODEList=customerGroupManaService.queryUASAGE_TYPE_CODE();
		} catch (Exception e) {
			throw new Exception("查询群用途类型差错");
		}
				
		return SUCCESS;
	}
	
	public String queryREFRESH_CYCLE_CODE() throws Exception{
		try {
			
			queryREFRESH_CYCLE_CODEList=customerGroupManaService.queryREFRESH_CYCLE_CODE();
		} catch (Exception e) {
			throw new Exception("查询群刷新周期差错");
		}
				
		return SUCCESS;
	}
	
	public String queryREFRESH_MODE() throws Exception{
		try {
			
			queryREFRESH_MODEList=customerGroupManaService.queryREFRESH_MODE();
		} catch (Exception e) {
			throw new Exception("查询群刷新模式差错");
		}
				
		return SUCCESS;
	}
	
	public String queryImpCustomer() throws Exception{
		try {
			
			Map<String,String> map = new HashMap<String, String>();
			map.put("customerGroupID_Add", customerGroupID_Add);
			map.put("impCustomerID", impCustomerID);
			map.put("impCustomerName", impCustomerName);
	
			impCustomerInfoList = customerGroupManaService.queryImpCustomer(map);
		} catch (Exception e) {
			throw new Exception("查询大客户差错");
		}
		
		//System.out.println("111111111111111111111111111111111"+CGAllListCon.toString()+"1111");
		return SUCCESS;
	}
	
	public String queryCustomerGroupMember() throws Exception{
		try {
			
			Map<String,String> map = new HashMap<String, String>();
			
			map.put("customerGroupID", customerGroupID);
	
			setCustomerGroupMemberInfoList(customerGroupManaService.queryCustomerGroupMember(map));
		} catch (Exception e) {
			System.out.print("异常信息"+e);
			throw new Exception("查询大客户失败！");
		}
		return SUCCESS;
	}
	
	
	
	public String createCustomerGroupMemberButtionAction ()throws Exception {//新增客户群成员
		
		try {
			Map<String,String> map = new HashMap<String, String>();
			
			map.put("customerGroupID_Add", customerGroupID_Add);
			map.put("CUST_GROUP_OBJ_ID_Add", CUST_GROUP_OBJ_ID_Add);
			this.customerGroupManaService.createCustomerGroupMember(map);
		} catch (Exception e) {
			System.out.print("异常信息"+e);
			throw new Exception("新增客户群成员失败！");
		}
		return SUCCESS;
	}
	
	public String createCustomerGroupButtionAction ()throws Exception {//新增客户群
		
		try {
			Map<String,String> map = new HashMap<String, String>();
			
			map.put("customerGroupID", customerGroupID);
			map.put("customerGroupName", customerGroupName);
			map.put("customerGroupFounderName", customerGroupFounderName);
			map.put("customerGroupBuildTime", customerGroupBuildTime);
			//System.out.println("111111111111111111111111111111111"+customerGroupBuildTime);
			map.put("customerGroupUsageType", customerGroupUsageType);
			map.put("customerGroupUsageDescription", customerGroupUsageDescription);
			map.put("customerGroupType", customerGroupType);
			map.put("customerGroupModelName", customerGroupModelName);
			map.put("customerGroupRefreshCycle", customerGroupRefreshCycle);
			map.put("customerGroupRefreshMode", customerGroupRefreshMode);
//			setCreateCustomerGroupMessageList(this.customerGroupManaService.createCustomerGroup(map));
			this.customerGroupManaService.createCustomerGroup(map);
		} catch (Exception e) {
			throw new Exception("新建客户群失败！");
		}
		return SUCCESS;
	}
	
	public String querybyCon() throws Exception{
		try {
			
			Map<String,String> map = new HashMap<String, String>();
			
			map.put("customerGroupName", customerGroupName);
			map.put("customerGroupStartBuildTimeQ", customerGroupStartBuildTimeQ);
			map.put("customerGroupEndBuildTimeQ", customerGroupEndBuildTimeQ);
			map.put("customerGroupType", customerGroupType);
			
			
			setCGAllListCon(customerGroupManaService.querybyCon(map));
		} catch (Exception e) {
			//sthrow new Exception("查询用户群差错");
			System.out.print(e);
		}
			
		return SUCCESS;
	}
	
	public String queryAll() throws Exception{
		try {
			
			setCGAllList(customerGroupManaService.queryAll());
		} catch (Exception e) {
			throw new Exception("查询用户群差错");
		}
				
		return SUCCESS;
	}
	
	public String delCustomerGroup() throws Exception{
		try {
			Map<String,String> map = new HashMap<String, String>();
			map.put("customerGroupID", customerGroupID);
			customerGroupManaService.delCustomerGroup(map);
		} catch (Exception e) {
			throw new Exception("客户群删除差错");
		}
		return SUCCESS;
	}
	
	
	public String delCustomerGroupMemeber() throws Exception{
		try {
			Map<String,String> map = new HashMap<String, String>();
			map.put("customerGroupID", customerGroupID);
			map.put("CUST_GROUP_OBJ_ID2", CUST_GROUP_OBJ_ID2);
			customerGroupManaService.delCustomerGroupMemeber(map);
		} catch (Exception e) {
			throw new Exception("客户群删除差错");
		}
		return SUCCESS;
	}
	
	
	public String updateCustomerGroupButtionAction() throws Exception{    //***********修改客户群
		try {
			Map<String,String> map = new HashMap<String, String>();
			
			map.put("customerGroupID", customerGroupID);
			map.put("customerGroupName", customerGroupName);
			map.put("customerGroupFounderName", customerGroupFounderName);
//			map.put("customerGroupBuildTime", customerGroupBuildTime);
			//System.out.println("111111111111111111111111111111111"+customerGroupBuildTime);
			map.put("customerGroupUsageType", customerGroupUsageType);
			map.put("customerGroupUsageDescription", customerGroupUsageDescription);
			map.put("customerGroupType", customerGroupType);
			map.put("customerGroupModelName", customerGroupModelName);
			map.put("customerGroupRefreshCycle", customerGroupRefreshCycle);
			map.put("customerGroupRefreshMode", customerGroupRefreshMode);
//			setCreateCustomerGroupMessageList(this.customerGroupManaService.createCustomerGroup(map));
			this.customerGroupManaService.updateCustomerGroup(map);
		} catch (Exception e) {
			throw new Exception("客户群修改差错");
		}
		return SUCCESS;
	}
	
	
	
	public void setCustomerGroupName(String customerGroupName) {
		this.customerGroupName = customerGroupName;
	}
	public String getCustomerGroupName() {
		return customerGroupName;
	}
	public void setCustomerGroupFounderName(String customerGroupFounderName) {
		this.customerGroupFounderName = customerGroupFounderName;
	}
	public String getCustomerGroupFounderName() {
		return customerGroupFounderName;
	}
	public void setCustomerGroupBuildTime(String customerGroupBuildTime) {
		this.customerGroupBuildTime = customerGroupBuildTime;
	}
	public String getCustomerGroupBuildTime() {
		return customerGroupBuildTime;
	}
	public void setCustomerGroupUsageType(String customerGroupUsageType) {
		this.customerGroupUsageType = customerGroupUsageType;
	}
	public String getCustomerGroupUsageType() {
		return customerGroupUsageType;
	}
	public void setCustomerGroupUsageDescription(
			String customerGroupUsageDescription) {
		this.customerGroupUsageDescription = customerGroupUsageDescription;
	}
	public String getCustomerGroupUsageDescription() {
		return customerGroupUsageDescription;
	}
	public void setCustomerGroupType(String customerGroupType) {
		this.customerGroupType = customerGroupType;
	}
	public String getCustomerGroupType() {
		return customerGroupType;
	}
	public void setCustomerGroupModelName(String customerGroupModelName) {
		this.customerGroupModelName = customerGroupModelName;
	}
	public String getCustomerGroupModelName() {
		return customerGroupModelName;
	}










	public void setCustomerGroupRefreshMode(String customerGroupRefreshMode) {
		this.customerGroupRefreshMode = customerGroupRefreshMode;
	}




	public String getCustomerGroupRefreshMode() {
		return customerGroupRefreshMode;
	}




	public void setCustomerGroupRefreshCycle(String customerGroupRefreshCycle) {
		this.customerGroupRefreshCycle = customerGroupRefreshCycle;
	}




	public String getCustomerGroupRefreshCycle() {
		return customerGroupRefreshCycle;
	}

	public void setCGAllList(List<Map<String,Object>> cGAllList) {
		CGAllList = cGAllList;
	}

	public List<Map<String,Object>> getCGAllList() {
		return CGAllList;
	}

	public void setCustomerGroupID(String customerGroupID) {
		this.customerGroupID = customerGroupID;
	}

	public String getCustomerGroupID() {
		return customerGroupID;
	}

	public void setCGAllListCon(List<Map<String,Object>> cGAllListCon) {
		CGAllListCon = cGAllListCon;
	}

	public List<Map<String,Object>> getCGAllListCon() {
		return CGAllListCon;
	}

	public void setCustomerGroupStartBuildTimeQ(
			String customerGroupStartBuildTimeQ) {
		this.customerGroupStartBuildTimeQ = customerGroupStartBuildTimeQ;
	}

	public String getCustomerGroupStartBuildTimeQ() {
		return customerGroupStartBuildTimeQ;
	}

	public void setCustomerGroupEndBuildTimeQ(String customerGroupEndBuildTimeQ) {
		this.customerGroupEndBuildTimeQ = customerGroupEndBuildTimeQ;
	}

	public String getCustomerGroupEndBuildTimeQ() {
		return customerGroupEndBuildTimeQ;
	}

	public void setCustomerGroupID_Add(String customerGroupID_Add) {
		this.customerGroupID_Add = customerGroupID_Add;
	}

	public String getCustomerGroupID_Add() {
		return customerGroupID_Add;
	}

	public void setCUST_GROUP_OBJ_ID_Add(String cUST_GROUP_OBJ_ID_Add) {
		CUST_GROUP_OBJ_ID_Add = cUST_GROUP_OBJ_ID_Add;
	}

	public String getCUST_GROUP_OBJ_ID_Add() {
		return CUST_GROUP_OBJ_ID_Add;
	}



	public void setCustomerGroupMemberInfoList(
			List<Map<String,Object>> customerGroupMemberInfoList) {
		this.customerGroupMemberInfoList = customerGroupMemberInfoList;
	}



	public List<Map<String,Object>> getCustomerGroupMemberInfoList() {
		return customerGroupMemberInfoList;
	}



	public void setCUST_GROUP_OBJ_ID2(String cUST_GROUP_OBJ_ID2) {
		CUST_GROUP_OBJ_ID2 = cUST_GROUP_OBJ_ID2;
	}



	public String getCUST_GROUP_OBJ_ID2() {
		return CUST_GROUP_OBJ_ID2;
	}

	public void setImpCustomerID(String impCustomerID) {
		this.impCustomerID = impCustomerID;
	}

	public String getImpCustomerID() {
		return impCustomerID;
	}

	public void setImpCustomerName(String impCustomerName) {
		this.impCustomerName = impCustomerName;
	}

	public String getImpCustomerName() {
		return impCustomerName;
	}

	public void setImpCustomerInfoList(List<Map<String,Object>> impCustomerInfoList) {
		this.impCustomerInfoList = impCustomerInfoList;
	}

	public List<Map<String,Object>> getImpCustomerInfoList() {
		return impCustomerInfoList;
	}

	public void setQueryUASAGE_TYPE_CODEList(
			List<Map<String,Object>> queryUASAGE_TYPE_CODEList) {
		this.queryUASAGE_TYPE_CODEList = queryUASAGE_TYPE_CODEList;
	}

	public List<Map<String,Object>> getQueryUASAGE_TYPE_CODEList() {
		return queryUASAGE_TYPE_CODEList;
	}

	public void setQueryREFRESH_CYCLE_CODEList(
			List<Map<String,Object>> queryREFRESH_CYCLE_CODEList) {
		this.queryREFRESH_CYCLE_CODEList = queryREFRESH_CYCLE_CODEList;
	}

	public List<Map<String,Object>> getQueryREFRESH_CYCLE_CODEList() {
		return queryREFRESH_CYCLE_CODEList;
	}

	public void setQueryREFRESH_MODEList(List<Map<String,Object>> queryREFRESH_MODEList) {
		this.queryREFRESH_MODEList = queryREFRESH_MODEList;
	}

	public List<Map<String,Object>> getQueryREFRESH_MODEList() {
		return queryREFRESH_MODEList;
	}


	

	
}
