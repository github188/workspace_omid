package com.nari.sysman.service;

import java.util.List;
import java.util.Map;

import com.nari.common.mybatis.pagination.Page;

public interface MsgManageService {
	
	public List<Map<String,Object>> queryOOrgByOrgNo(Map<String,String> queryItems);
	
	/**
	 * 查询订阅类型
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
	public Page<Map<String,Object>> queryStatContact(Page<Map<String,Object>> p,Map<String,String> queryItems);
	
	/**
	 * 查询自定义联系人
	 * @param p
	 * @param queryItems
	 * @return
	 */
	public Page<Map<String,Object>> querySelfDeContact(Page<Map<String,Object>> p,Map<String,String> queryItems);
	
	/**
	 * 查询用户联系人
	 * @param p
	 * @param queryItems
	 * @return
	 */
	public Page<Map<String,Object>> queryConsContact(Page<Map<String,Object>> p,Map<String,String> queryItems);
	
	/**
	 * 保存短信订阅信息
	 * @return
	 */
	public Integer saveSmsSubscribeInfo(Map<String,String> queryItems,List<Map<String,String>> smsSubscribeObjList);
	
}
