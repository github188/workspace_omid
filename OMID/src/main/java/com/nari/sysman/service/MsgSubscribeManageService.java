package com.nari.sysman.service;

import java.util.List;
import java.util.Map;

import com.nari.common.mybatis.pagination.Page;

public interface MsgSubscribeManageService {

	
	
	
	
	
	/**
	 * 保存短信订阅信息
	 * @return
	 */
//	public Integer saveSmsSubscribeInfo(Map<String,String> queryItems,List<Map<String,String>> smsSubscribeObjList);
	public Integer saveOrUpdateSmsSubscribeInfo(Map<String,String> queryItems,List<Map<String,String>> smsSubscribeObjList);
	
	/**
     * 检查所选事件是否已存在于订阅中
     */
	public List<Map<String, Object>> checkEventNo(Map<String, String>queryItems);
	/**
	 * 查询自定义联系人
	 */
	public List<Map<String, Object>> querySelfDeContact(Map<String,String> queryItems);
	/**
	 * 查询所有短信模板
	 */
	public List<Map<String, Object>> queryAllMsgTemplate();
	/**
	 * 查询异常事件
	 * @return
	 * @throws DBAccessException
	 */
	public List<Map<String,Object>> queryExceptEvent();
	/**
     * 查询事件来源
     */
     public List<Map<String, Object>> queryEventSrc();
	/**
	 * 查询订阅类型
	 * @return
	 */
	public List<Map<String, Object>> querySubsType();

	/**
	 * 查询短信订阅信息 点击查询按钮所触发的操作
	 */
	public List<Map<String,Object>> querySmsScribeInfo(Map<String, String> queryItems);

	/**
	 * 查询供电单位
	 * @param org_no
	 */
	public List<Map<String, Object>> getOrgNo(String orgNo);
	/**
	 * 查询短信模板内容
	 * @param sendTypeCode
	 */
	public String querySmsTemplateContent(String sendTypeCode);
	
	/**
	 * 注销短信订阅信息
	 */
	public Integer cancelMsgSub(String id);
	/**
	 * 更新短信订阅信息
	 */
	public Integer updateSmsSubscribeInfo(Map<String,String>map);
	/**
	 * 查询短信订阅事件信息
	 * @param subscribeId
	 */
	public  List<Map<String,Object>> querySmsScribeObj(String id);

	/**
	 * 删除短信订阅事件
	 */
	public Integer deleteEventSub(String recordId);

	/**
	 * 查询指定发送用户
	 */
	public List<Map<String, Object>> querySmsSendObj(String subscribeId);
	
	/**
	 * 查询主站联系人
	 * @param queryItems
	 * @return
	 */
	public List<Map<String,Object>> queryStatContact(Map<String,String> queryItems);
	
	/**
	 * 查询用户联系人
	 */
	public Page<Map<String,Object>> queryConsContact(Page<Map<String,Object>> p,Map<String,String> queryItems);
	
	
	
	
}
