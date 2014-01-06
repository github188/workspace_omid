package com.nari.sysman.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nari.common.mybatis.pagination.Page;
import com.nari.sysman.mapper.MsgSubscribeManageMapper;
import com.nari.sysman.service.MsgSubscribeManageService;


@Service("MsgSubscribeManageService")
public class MsgSubscribeManageServiceImpl implements MsgSubscribeManageService{
	
	@Autowired
	private MsgSubscribeManageMapper msgSubscribeManageMapper;
	
	public Integer saveOrUpdateSmsSubscribeInfo(Map<String,String> queryItems,List<Map<String,String>> smsSubscribeObjList){
		try{
			//防止出现冗余信息，先把指定事件的具体联系人删除
			Map<String, String> mapDelet = new HashMap<String, String>();
			String sql ="";
			if(queryItems.get("sendUserLimit").equals("01")){
				for (Map<String, String> map: smsSubscribeObjList) {
					sql = map.get("EVENT_NO")+",";
				}
				sql = sql.substring(0, (sql.length()-1));
				mapDelet.put("SUBSCRIBE_ID", queryItems.get("id"));
				mapDelet.put("EVENT_NO", sql);
				msgSubscribeManageMapper.deleteSmsSendObjByEventNo(mapDelet);
			}
			//更新订阅事件
			for(Map<String,String> map:smsSubscribeObjList){
				String recordId = msgSubscribeManageMapper.getSubscribeId();
				map.put("subscribeId", queryItems.get("id"));
				map.put("recordId", recordId);
				map.put("eventSrc", queryItems.get("eventSrc"));
				msgSubscribeManageMapper.saveOrUpdateSmsSubScribeObj(map);
				if(queryItems.get("sendUserLimit").equals("01") && !map.get("SUBS_OBJ_ID").equals("")){
					String ss[]=map.get("SUBS_OBJ_ID").split(",", -1);
					for(String consNo: ss){
						Map<String, String> saveSmsSendObjList = new HashMap<String, String>();
						saveSmsSendObjList.put("recordId",recordId);
						saveSmsSendObjList.put("SUBSCRIBE_ID",queryItems.get("id"));
						saveSmsSendObjList.put("EVENT_NO",map.get("EVENT_NO"));
						saveSmsSendObjList.put("consNo", consNo);
						msgSubscribeManageMapper.saveSmsSendObj(saveSmsSendObjList);
					}
				}
			}
		}catch(Exception e ) {
			e.printStackTrace();
		}
		 return 1;
	}
	
	/**
     * 检查所选事件是否已存在于订阅中
     */
	public List<Map<String, Object>> checkEventNo(Map<String, String>queryItems){
		return msgSubscribeManageMapper.checkEventNo(queryItems);
	}
	/**
	 * 查询自定义联系人
	 */
	public List<Map<String, Object>> querySelfDeContact(Map<String,String> queryItems){
		if(queryItems==null){
			queryItems= new HashMap<String,String>();
		}
		return msgSubscribeManageMapper.querySelfDeContact(queryItems);
	}
	/**
	 * 查询所有短信模板
	 * @return
	 */
	public List<Map<String, Object>> queryAllMsgTemplate(){
		return msgSubscribeManageMapper.queryAllMsgTemplate();
	}
	/**
	 * 查询异常事件
	 */
	public List<Map<String,Object>> queryExceptEvent(){
			return msgSubscribeManageMapper.queryExceptEvent();
	}
	
	/**
     * 查询事件来源
     */
     public List<Map<String, Object>> queryEventSrc(){
    		 return  msgSubscribeManageMapper.queryEventSrc();
     }
	/**
	 * 查询短信订阅事件信息
	 */
	public List<Map<String, Object>> querySmsScribeObj(String id ) {
		List<Map<String, Object>> list  = new ArrayList<Map<String,Object>>();
		try {
			 list = msgSubscribeManageMapper.querySmsScribeObj(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	/**
	 * 查询订阅类型
	 * @return
	 */
	public List<Map<String, Object>> querySubsType() {
		List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
		 
		list  = msgSubscribeManageMapper.querySubsType();
		return list;
	}
	
	/**
	 * 查询短信订阅信息
	 * 点击查询按钮所触发的操作
	 */
	public List<Map<String,Object>> querySmsScribeInfo(Map<String,String> queryItems){
		try{
			return msgSubscribeManageMapper.querySmsScribeInfo(queryItems);
			
		}catch (Exception e) {
			e.printStackTrace();
		}
			 return null;
	}

	/**
	 * 查询供电单位
	 */
	public List<Map<String, Object>> getOrgNo(String orgNo) {
		return msgSubscribeManageMapper.getOrgNo(orgNo);
	}
	
	public String  querySmsTemplateContent(String sendTypeCode){
		List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
		try {
			list = msgSubscribeManageMapper.querySmsTemplateContent(sendTypeCode);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list.get(0).get("TEMPLATE_CONTENT").toString();
	}
	/**
	 * 注销短信订阅信息
	 */
	public Integer cancelMsgSub(String id){
		try {
			msgSubscribeManageMapper.cancelMsgSub(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 1;
	}
	
	/**
	 * 更新短信订阅信息
	 */
	public Integer updateSmsSubscribeInfo(Map<String,String>queryItems){
		try {
			msgSubscribeManageMapper.updateSmsSubscribeInfo(queryItems);
		} catch (Exception e) {
			e.printStackTrace();
		}
				return 1;
	}
	
	/**
	 * 删除短信订阅事件
	 */
	public Integer deleteEventSub(String recordId){
		try{
			msgSubscribeManageMapper.deleteSmsScribeObj(recordId);
			msgSubscribeManageMapper.deleteSmsSendObj(recordId);
		}catch(Exception e) {
			 e.printStackTrace();
		}
		return 1;
	}
	/**
	 * 查询指定发送用户
	 */
	public List<Map<String, Object>> querySmsSendObj(String subscribeId){
		List<Map<String, Object>> list  = new ArrayList<Map<String,Object>>();
		try {
			list =  msgSubscribeManageMapper.querySmsSendObj(subscribeId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	/**
	 * 查询主站联系人
	 */
	public List<Map<String,Object>> queryStatContact(Map<String,String> queryItems){
		if(queryItems==null){
			queryItems= new HashMap<String,String>();
		}
		return  msgSubscribeManageMapper.queryStatContact(queryItems);
	}
	
	/**
	 * 查询用户联系人
	 */
	public Page<Map<String,Object>> queryConsContact(Page<Map<String,Object>> p,Map<String,String> queryItems){
		if(queryItems==null){
			queryItems= new HashMap<String,String>();
		}
		return  msgSubscribeManageMapper.queryConsContact(p,queryItems);
	}
}
