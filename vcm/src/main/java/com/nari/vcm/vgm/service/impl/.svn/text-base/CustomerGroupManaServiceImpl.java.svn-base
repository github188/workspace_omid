package com.nari.vcm.vgm.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nari.vcm.vgm.mapper.CustomerGroupManaMapper;
import com.nari.vcm.vgm.service.CustomerGroupManaService;

@Service("CustomerGroupManaService")
public class CustomerGroupManaServiceImpl implements CustomerGroupManaService {
	
	@Autowired
	private CustomerGroupManaMapper customerGroupManaMapper;
	@SuppressWarnings("unused")
	
	@Override
	public Integer createCustomerGroup(Map<String, String> map) {
		
		return this.customerGroupManaMapper.createCustomerGroup(map);
	}
	
	@Override
	public Integer createCustomerGroupMember(Map<String, String> map) {
		
		return this.customerGroupManaMapper.createCustomerGroupMember(map);
	}
	
	public List<Map<String, Object>> queryImpCustomer(Map<String, String> map) {
		
		return this.customerGroupManaMapper.queryImpCustomer(map);
	}
	
	public Integer  delCustomerGroupMemeber(Map<String, String> map) {
		
		return this.customerGroupManaMapper.delCustomerGroupMemeber(map);
	}
	
	@Override
	public List<Map<String, Object>> queryAll() {
		
		return this.customerGroupManaMapper.queryAll();
	}
	
	public List<Map<String, Object>> querybyCon(Map<String, String> map) {
		
		return this.customerGroupManaMapper.querybyCon(map);
	}
	
	public List<Map<String, Object>> queryCustomerGroupMember(Map<String, String> map) {
		
		return this.customerGroupManaMapper.queryCustomerGroupMember(map);
	}
	
	public Integer  delCustomerGroup(Map<String, String> map) {//删除客户群，并级联删除属于该客户群的成员
		int delStatus = this.customerGroupManaMapper.delCustomerGroup(map);
		if(delStatus !=0){
		this.customerGroupManaMapper.delCustomerGroupMember_All(map);
		}
		return delStatus;
		
	}
	
	
	public Integer  updateCustomerGroup(Map<String, String> map) {
		
		return this.customerGroupManaMapper.updateCustomerGroup(map);
	}

	@Override
	public List<Map<String, Object>> queryUASAGE_TYPE_CODE() {
		// TODO Auto-generated method stub
		return this.customerGroupManaMapper.queryUASAGE_TYPE_CODE();
	}

	@Override
	public List<Map<String, Object>> queryREFRESH_CYCLE_CODE() {
		return this.customerGroupManaMapper.queryREFRESH_CYCLE_CODE();
	}

	@Override
	public List<Map<String, Object>> queryREFRESH_MODE() {
		return this.customerGroupManaMapper.queryREFRESH_MODE();
	}
	
}
