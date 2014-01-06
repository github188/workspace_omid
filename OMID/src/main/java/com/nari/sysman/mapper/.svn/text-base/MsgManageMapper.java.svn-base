package com.nari.sysman.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.nari.common.mybatis.pagination.Page;
import com.nari.common.mybatis.pagination.PageInterceptor;

public interface MsgManageMapper {
	
	/**
	 * 查询供电单位名称
	 * @return
	 */
	public List<Map<String,Object>> queryOOrgByOrgNo(@Param("map")Map<String,String> map);
	
	/**
	 * 查询订阅类型
	 * @param map
	 * @return
	 */
	public List<Map<String,Object>> querySubsType();
	
	/**
	 * 查询事件来源
	 * @return
	 */
	public List<Map<String,Object>> queryEventSrc();
	
	/**
	 * 查询异常类型
	 * @return
	 */
	public List<Map<String,Object>> queryExceptEvent();
	
	/**
	 * 查询短信模板名称
	 * @return
	 */
	public List<Map<String,Object>> queryAllMsgTemplate();
	
	/**
	 * 查询主站联系人
	 * @param p
	 * @param queryItems
	 * @return
	 */
	public Page<Map<String,Object>> queryStatContact(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map<String,String> queryItems);
	
	/**
	 * 查询自定义联系人
	 * @param p
	 * @param queryItems
	 * @return
	 */
	public Page<Map<String,Object>> querySelfDeContact(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map<String,String> queryItems);
	
	/**
	 * 查询用户联系人
	 * @param p
	 * @param queryItems
	 * @return
	 */
	public Page<Map<String,Object>> queryConsContact(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map<String,String> queryItems);
	
	
	/**
	 * 取短信订阅Id
	 * @return
	 */
	public String getRecordId();
	
	/**
	 * 保存短信订阅
	 * @param map
	 */
	public void saveSmsSubScribe(@Param("map")Map<String,String> map);
	
	/**
	 * 取事件配置Id
	 * @return
	 */
	public String getSubscribeId();
	
	/**
	 * 保存事件配置明细
	 * @param map
	 */
	public void saveSmsSubScribeObj(@Param("map")Map<String,String> map);
	
	/**
	 * 保存事件指定联系人信息
	 * @param subScribeId
	 * @param eventNo
	 * @param consNo
	 */
	public void saveSmsSendObj(@Param("map")Map<String,String> map);

}
