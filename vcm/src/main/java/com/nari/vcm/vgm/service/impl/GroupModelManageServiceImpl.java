package com.nari.vcm.vgm.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nari.vcm.vgm.mapper.GroupModelManageMapper;
import com.nari.vcm.vgm.service.GroupModelManageService;

@Service("GroupModelManageService")
public class GroupModelManageServiceImpl implements GroupModelManageService {
	
	@Autowired
	private GroupModelManageMapper groupModelManageMapper;
	@SuppressWarnings("unused")
	
	@Override
	public List<Map<String, Object>> queryTgOrgNo(Map<String, String> map) {
		
		return this.groupModelManageMapper.queryTgOrgNo(map);
	}
	@Override
	public List<Map<String, Object>> queryModel(Map<String, String> map) {
		
		return this.groupModelManageMapper.queryModel(map);
	}
	@Override
	public Integer insertModel(Map<String, String> map) {
		
		return this.groupModelManageMapper.insertModel(map);
	}
	
	
	@Override
	public Integer insertModelCondition(Map<String, String> map) {
		
		return this.groupModelManageMapper.insertModelCondition(map);
	}
	@Override
	public Integer delModel(Map<String, String> map) {
		
		return this.groupModelManageMapper.delModel(map);
	}
	@Override
	public Integer updateModel(Map<String, String> map) {
		
		return this.groupModelManageMapper.updateModel(map);
	}
	@Override
	public List<Map<String, Object>> queryModelCon(Map<String, String> map) {
		// TODO Auto-generated method stub
		return this.groupModelManageMapper.queryModelCon(map);
	}
//	@Override
//	public List<Map<String, Object>> queryModel_CUST_SQL(
//			Map<String, String> mapSQL) {
//		// TODO Auto-generated method stub
//		return this.groupModelManageMapper.queryModel_CUST_SQL(mapSQL);
//	}
	@Override
	public Integer updateModel_CUST_SQL(Map<String, String> mapSQL) {
		// TODO Auto-generated method stub
		List<Map<String,Object>>queryModel_CUST_SQLList = this.groupModelManageMapper.queryModelCon(mapSQL);
		String Model_CUST_SQL="";
		for(int i=0;i<queryModel_CUST_SQLList.size();i++){
			if(i<queryModel_CUST_SQLList.size()-1){
				Model_CUST_SQL = Model_CUST_SQL+queryModel_CUST_SQLList.get(i).get("CONDITION")+"@";
			}
			else{
				Model_CUST_SQL = Model_CUST_SQL+queryModel_CUST_SQLList.get(i).get("CONDITION");
			}
			
		}
		Map<String,String> Model_CUST_SQLUpdatebyModelID = new HashMap<String, String>();
		
		Model_CUST_SQLUpdatebyModelID.put("CUST_GROUP_MODEL_ID", mapSQL.get("CUST_GROUP_MODEL_ID"));
		Model_CUST_SQLUpdatebyModelID.put("CUST_SQL", Model_CUST_SQL);
		return this.groupModelManageMapper.updateModel_CUST_SQL(Model_CUST_SQLUpdatebyModelID);
	}
	@Override
	public Integer delModelCon(Map<String, String> map) {
		// TODO Auto-generated method stub
		return this.groupModelManageMapper.delModelCon(map);
	}
	@Override
	public List<Map<String, Object>> queryGROUP_TYPE_CODE() {
		// TODO Auto-generated method stub
		return this.groupModelManageMapper.queryGROUP_TYPE_CODE();
	}
	
	
}
