package com.nari.vcm.vgm.mapper;

import java.util.List;
import java.util.Map;

import com.nari.common.dao.mybatis.BaseMapper;


public interface GroupModelManageMapper extends BaseMapper<Map>{
	
	/**
	 * 根据条件查询模型
	 * @param map
	 * @return
	 */
	public List<Map<String,Object>>queryModel(Map<String, String> map);
	/**
	 * 根据模型名称删除模型
	 * @param map
	 * @return
	 */
	public Integer delModel(Map<String, String> map);
	/**
	 * 插入群模型
	 * @param map
	 * @return
	 */
	public Integer insertModel(Map<String, String> map);
	/**
	 * 插入群模型
	 * @param map
	 * @return
	 */
	public Integer updateModel(Map<String, String> map);
	/**
	 * 修改模型
	 * @param map
	 * @return
	 */
	public List<Map<String,Object>>queryTgOrgNo(Map<String, String> map);
	public Integer insertModelCondition(Map<String, String> map);//插入模型条件
	public List<Map<String, Object>> queryModelCon(Map<String, String> map);
//	public List<Map<String, Object>> queryModel_CUST_SQL(
//			Map<String, String> mapSQL);
//	public Integer updateModel_CUST_SQL(Map<String, String> mapSQLforUpdate);
	public Integer updateModel_CUST_SQL(Map<String, String>Model_CUST_SQLUpdatebyModelID);
	public Integer delModelCon(Map<String, String> map);
	public List<Map<String, Object>> queryGROUP_TYPE_CODE();
	
	/**
	 * 按台区统计异常信息
	 * @return
	 *//*
	public Page<Map<String,Object>> queryMeas(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map<String, String> map);
	*/
}
