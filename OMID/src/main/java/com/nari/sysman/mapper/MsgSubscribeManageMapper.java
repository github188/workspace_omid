package com.nari.sysman.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.nari.common.mybatis.pagination.Page;
import com.nari.common.mybatis.pagination.PageInterceptor;

public interface MsgSubscribeManageMapper {
	
	
	
	/**
	 * 取事件配置Id
	 * @return
	 */
	public String getSubscribeId();
	/**
	 * 取短信订阅Id
	 * @return
	 */
//	public String getRecordId();
	/**3
	 * 保存短信订阅
	 * @param map
	 */
	public void saveOrUpdateSmsSubScribeObj(@Param("map")Map<String,String> map);
	/**
	 * 保存事件配置明细
	 * @param map
	 */
//	public void saveSmsSubScribeObj(@Param("map")Map<String,String> map);
	/**
	 * 保存事件指定联系人信息
	 */
	public void saveSmsSendObj(@Param("map")Map<String,String> map);
	/**
	 * 防止出现冗余信息，先把指定事件的具体联系人删除
	 */
	public void deleteSmsSendObjByEventNo(@Param("map" )Map<String, String>map);
	
	
	
	
	
	
	
	
	
	
	/**
     * 检查所选事件是否已存在于订阅中
     */
	public List<Map<String, Object>> checkEventNo(@Param("map") Map<String, String>queryItems);
	/**
	 * 查询自定义联系人
	 */
	public List<Map<String, Object>> querySelfDeContact(@Param("map") Map<String,String> queryItems);
	/**
	 * 查询所有短信模板
	 * @return
	 */
	public List<Map<String, Object>> queryAllMsgTemplate();
	/**
	 * 查询异常事件
	 */
	public List<Map<String,Object>> queryExceptEvent();
	
	/**
     * 查询事件来源
     */
     public List<Map<String, Object>> queryEventSrc();
     
	/**
	 * 查询订阅类型
	 */
	public List<Map<String,Object>> querySubsType();
	
	/**
	 * 点击查询按钮所触发的操作
	 */
	public  List<Map<String,Object>> querySmsScribeInfo(@Param("map") Map<String, String> map);

	/**
	 * 查询供电单位
	 */
	public List<Map<String,Object>> getOrgNo(String orgNo);
	/**
	 * 查询短信模板内容
	 */
	public List<Map<String, Object>>  querySmsTemplateContent(String sendTypeCode );
	
	/**
	 * 注销短信订阅信息
	 */
	public void  cancelMsgSub(String id);
	
	/**
	 * 更新短信订阅信息
	 */
	public void updateSmsSubscribeInfo(@Param("map") Map<String, String> map );

	/**
	 * 查询短信订阅事件信息
	 */
	public List<Map<String,Object>> querySmsScribeObj(String id);
	
	/**
	 * 1.订阅对象删除。
	 */
	public void deleteSmsScribeObj(String recordId);
	/**
	 * 2.订阅对象删除。
	 */
	public void deleteSmsSendObj(String subscribeId);
	/**
	 * 查询指定发送用户
	 */
	public List<Map<String, Object>> querySmsSendObj(String id);
	/**
	 * 查询主站联系人
	 */
	public List<Map<String, Object>> queryStatContact(@Param("map") Map<String, String>map);
	/**
	 * 查询用户联系人
	 */
	public Page<Map<String,Object>> queryConsContact(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map<String, String>map);

}
