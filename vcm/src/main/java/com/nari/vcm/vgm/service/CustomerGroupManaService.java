package com.nari.vcm.vgm.service;


import java.util.List;
import java.util.Map;

public interface CustomerGroupManaService {
	
	/**
	 * @author user 杨传振
	 * @return
	 */
	public Integer createCustomerGroup(Map<String,String> map);//新增客户群
	public List<Map<String,Object>> queryAll();//查询客户群
	public Integer delCustomerGroup(Map<String, String> map);//删除客户群
	public Integer updateCustomerGroup(Map<String,String> map);//修改客户群
	public List<Map<String, Object>> querybyCon(Map<String, String> map);//根据条件查询客户群
	public Integer createCustomerGroupMember(Map<String, String> map);
	public List<Map<String, Object>> queryCustomerGroupMember(Map<String, String> map);
	public Integer delCustomerGroupMemeber(Map<String, String> map);
	public List<Map<String, Object>> queryImpCustomer(Map<String, String> map);
	public List<Map<String, Object>> queryUASAGE_TYPE_CODE();
	public List<Map<String, Object>> queryREFRESH_CYCLE_CODE();
	public List<Map<String, Object>> queryREFRESH_MODE();
	
//	public List<Map<String,Object>> queryModel(Map<String,String> map);
	
}