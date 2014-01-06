package com.nari.sysman.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nari.common.mybatis.pagination.Page;
import com.nari.sysman.mapper.MsgManageMapper;
import com.nari.sysman.service.MsgManageService;

@Service("MsgManageService")
public class MsgManageServiceImpl implements MsgManageService {
	@Autowired
	private MsgManageMapper msgManageMapper;
	
	public List<Map<String,Object>> queryOOrgByOrgNo(Map<String,String> queryItems){
		return msgManageMapper.queryOOrgByOrgNo(queryItems);
	}
	
	public List<Map<String,Object>> querySubsType(){
		return msgManageMapper.querySubsType();
	}
	
	public List<Map<String,Object>> queryEventSrc(){
		return msgManageMapper.queryEventSrc();
	}
	
	public List<Map<String,Object>> queryExceptEvent(){
		return msgManageMapper.queryExceptEvent();
	}
	
	public List<Map<String,Object>> queryAllMsgTemplate(){
		return msgManageMapper.queryAllMsgTemplate();
	}
	
	public Page<Map<String,Object>> queryStatContact(Page<Map<String,Object>> p,Map<String,String> queryItems){
		if(queryItems==null){
			queryItems= new HashMap<String,String>();
		}
		return  msgManageMapper.queryStatContact(p, queryItems);
	}
	
	public Page<Map<String,Object>> querySelfDeContact(Page<Map<String,Object>> p,Map<String,String> queryItems){
		if(queryItems==null){
			queryItems= new HashMap<String,String>();
		}
		return  msgManageMapper.querySelfDeContact(p, queryItems);
	}
	
	public Page<Map<String,Object>> queryConsContact(Page<Map<String,Object>> p,Map<String,String> queryItems){
		if(queryItems==null){
			queryItems= new HashMap<String,String>();
		}
		return  msgManageMapper.queryConsContact(p, queryItems);
	}
	
	public Integer saveSmsSubscribeInfo(Map<String,String> queryItems,List<Map<String,String>> smsSubscribeObjList){

		//检查订阅名称是否有重复（可选）
		String recordId=msgManageMapper.getRecordId();
		queryItems.put("recordId", recordId);
//		queryItems.put("orgNo", "");
//		queryItems.put("staffNo", "");
		msgManageMapper.saveSmsSubScribe(queryItems);
		for(Map<String,String> map:smsSubscribeObjList){
			String subScribeId=msgManageMapper.getSubscribeId();
			map.put("recordId", recordId);
			map.put("subScribeId", subScribeId);
			map.put("eventSrc", queryItems.get("eventSrc"));
			msgManageMapper.saveSmsSubScribeObj(map);
			if(queryItems.get("sendUserLimit").equals("01") && !map.get("SUBS_OBJ_ID").equals("")){
				String ss[]=map.get("SUBS_OBJ_ID").split(",", -1);
				for(String consNo: ss){
					Map<String,String> map1 = new HashMap<String,String>();
					map1.put("subScribeId", subScribeId);
					map1.put("eventNo", map.get("EVENT_NO"));
					map1.put("consNo", consNo);
					msgManageMapper.saveSmsSendObj(map1);
				}
			}
		}
		return 1;
	
	}
}
