package com.nari.vcm.vgm.mapper;

import java.util.List;
import java.util.Map;

import com.nari.common.dao.mybatis.BaseMapper;

public interface CustomerGroupManaMapper extends BaseMapper<Map>{
	
	/**
	 * 根据条件查询vcmOrgNO
	 * @param map
	 * @return
	 */
	//public List<Map<String,Object>>queryModel(Map<String, String> map);
	/**
	 * 根据条件查询vcmModel
	 * @param map
	 * @return
	 */
	//public List<Map<String,Object>>queryTgOrgNo(Map<String, String> map);
	
	/**
	 * 插入客户群信息
	 * @param map
	 * @return
	 */
	public Integer createCustomerGroup (Map<String, String> map);
	
	/**
	 * 增加客户群成员
	 * @param map
	 * @return
	 */
	public Integer createCustomerGroupMember (Map<String, String> map);
	/**
	 * 查询所有客户群信息
	 * @param 
	 * @return
	 */
	public List<Map<String,Object>>queryAll();
	public Integer delCustomerGroup(Map<String, String> map);
	public Integer updateCustomerGroup(Map<String, String> map);
	public List<Map<String, Object>> querybyCon(Map<String, String> map);

	public List<Map<String, Object>> queryCustomerGroupMember(Map<String, String> map);

	public Integer delCustomerGroupMemeber(Map<String, String> map);

	public Integer delCustomerGroupMember_All(Map<String, String> map);

	public List<Map<String, Object>> queryImpCustomer(Map<String, String> map);

	public List<Map<String, Object>> queryUASAGE_TYPE_CODE();

	public List<Map<String, Object>> queryREFRESH_CYCLE_CODE();

	public List<Map<String, Object>> queryREFRESH_MODE();
	
}
