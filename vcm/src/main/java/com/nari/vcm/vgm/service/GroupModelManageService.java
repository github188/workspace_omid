package com.nari.vcm.vgm.service;


import java.util.List;
import java.util.Map;

public interface GroupModelManageService {
	
	/**
	 * @author user 杨传振
	 * @return
	 */
	
	
	public List<Map<String,Object>> queryTgOrgNo(Map<String,String> map); //查询供电管理单位
	public List<Map<String,Object>> queryModel(Map<String,String> map); //查询群模型
	public Integer insertModel(Map<String,String> map); //插入群模型
	public Integer insertModelCondition(Map<String,String> map); //插入群模型
	public Integer delModel(Map<String,String> map); //删除群模型条件
	public Integer updateModel(Map<String,String> map); //删除群模型
	public List<Map<String, Object>> queryModelCon(Map<String, String> map);
	//public List<Map<String, Object>> queryModel_CUST_SQL(Map<String, String> mapSQL);
	public Integer updateModel_CUST_SQL(Map<String, String> mapSQL);
	//List<Map<String, Object>> queryModel_CUST_SQL(Map<String, String> mapSQL);
	public Integer delModelCon(Map<String, String> map);
	public List<Map<String, Object>> queryGROUP_TYPE_CODE();
	
}
