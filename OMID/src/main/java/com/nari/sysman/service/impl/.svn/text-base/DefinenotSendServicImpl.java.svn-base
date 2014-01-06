	package com.nari.sysman.service.impl;
import java.net.URL;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.codehaus.xfire.client.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nari.common.mybatis.pagination.Page;
import com.nari.sysman.mapper.DefinenotSendMapper;
import com.nari.sysman.service.DefinenotSendService;
import com.nari.sysman.util.ClientAuthenticationHandler;
import com.nari.sysman.util.SwitchMessageForm;



@Service("DefinenotSendService")
public class DefinenotSendServicImpl implements DefinenotSendService{
@Autowired
private DefinenotSendMapper definenotSendMapper;


public Page<Map<String,Object>> qureyList(Page<Map<String,Object>> p,Map<String,String> queryItems) {
       return definenotSendMapper.qureyList(p,queryItems);
	}


public Integer addManage(Map<String, String> queryItems) {
	definenotSendMapper.addManage(queryItems);
	 return 1;
}



public Integer updateManage(Map<String, String> queryItems) {
	definenotSendMapper.updateManage(queryItems);
	return 1;
}


public Integer deleteManage(Map<String, String> queryItems) {
	definenotSendMapper.deleteManage(queryItems);
	return 1;
}


@Override
public void sendSelfDeMsg(List<Map<String, String>> consList, String msgContent) throws Exception {
	try{
		String sendRecId = definenotSendMapper.getSendRecId();
		Date date= new Date();
		List<Map<String, Object>> contactMapList1=new ArrayList<Map<String, Object>>();
		List<Map<String, String>> contactMapList2=new ArrayList<Map<String, String>>();
		for(int i=0;i<consList.size();i++){
			//记录短信日志
			Map<String, Object> contactMap1=new HashMap<String, Object>();
			contactMap1.put("SEND_STAFF_NO","nijl");
			contactMap1.put("USER_NAME",consList.get(i).get("PERSONNEL_NAME"));
			contactMap1.put("SEND_TIME",date);
			contactMap1.put("SEND_MODE", "3");
			contactMap1.put("MOBILE_NO", consList.get(i).get("MOBILE_NO"));
			contactMap1.put("ORG_NO", consList.get(i).get("ORG_NO"));
			contactMap1.put("SEND_CONTENT", msgContent);
			contactMap1.put("SEND_REC_ID", sendRecId);
			contactMap1.put("BATCH_NO", i+1);
			contactMap1.put("SEND_STATUS", "3");
			definenotSendMapper.saveMegRec(contactMap1);
			contactMapList1.add(contactMap1);
			
			Map<String, String> contactMap2=new HashMap<String, String>();
			contactMap2.put("MBDZ", consList.get(i).get("MOBILE_NO"));
			contactMap2.put("JYH",sendRecId);
			contactMap2.put("IP", "10.138.16.7");
			contactMap2.put("ID", String.valueOf(i+1));
			contactMap2.put("WNR", msgContent);
			contactMap2.put("USERNAME", "sea");
			contactMap2.put("PASSWORD", "sea95598");
			contactMap2.put("QUHAO", definenotSendMapper.queryStaffAliasOrgNo(consList.get(i).get("ORG_NO")));
			contactMap2.put("PCLSEQ", "9527");
			contactMapList2.add(contactMap2);
		}
		String msgXml=SwitchMessageForm.switchListToXml(contactMapList2);
		
		String	url=findConfig("OMID_OMID_URL");
		String	username=findConfig("OMID_NAME");
		String	password=findConfig("OMID_PASSWORD");
		Client client = new Client(new URL(url));
		client.addOutHandler(new ClientAuthenticationHandler(username,
				password));
	  System.out.println(url);
	  System.out.println(username);
	  System.out.println(password);
	  System.out.println(msgXml);
	    //发送短信
			Object result[] = client.invoke("WS_ZZ_SEND_MESSAGE", new Object[] {msgXml});
		//更新短信发送状态
		for(Map<String, Object> cm: contactMapList1){
	   Map<String, Object> conMap=new HashMap<String, Object>();
	    String a1=cm.get("SEND_REC_ID").toString();
	    String a2=cm.get("BATCH_NO").toString();
	    String a3="2";
	    conMap.put("t1", a1);
	    conMap.put("t2", a2);
	    conMap.put("t3", a3);
         definenotSendMapper.updateMsgSendStatus(conMap);
		}
		return;
	}
	catch (Exception e) {
		e.printStackTrace();
		throw e;
	}
}
public String findConfig(String config){
	return definenotSendMapper.findConfig(config);
	
}


@Override
public Page<Map<String, Object>> msgSendQuery(Page<Map<String, Object>> p,
		Map<String, String> queryItems) {
	 return definenotSendMapper.msgSendQuery(p, queryItems);
}


@Override
public List queryOrgNolist(String orgNo) {
	
	return definenotSendMapper.queryOrgNolist(orgNo);
}
	





}
