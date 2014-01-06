package com.nari.sysman.service.impl;

import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.codehaus.xfire.client.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mysql.jdbc.log.Log;
import com.nari.common.mybatis.pagination.Page;
import com.nari.common.util.StringUtil;
import com.nari.omid.mapper.TemplateManageMapper;
import com.nari.sysman.model.FTaskFrontDet;
import com.nari.sysman.model.TTmnlParam;
import com.nari.sysman.service.TemplateManageService;
import com.nari.common.util.XMLSwitchUtil;

@Service("TemplateManageService")
public class TemplateManageServiceImpl implements TemplateManageService{
	
	@Autowired
	private TemplateManageMapper templateManageMapper;
	
	private static Logger logger = Logger.getLogger(TemplateManageServiceImpl.class);
	
	public List queryF9Temp(Map paramMap){
		return templateManageMapper.queryF9Temp(paramMap);
	}
	
	public List querySeaAlarmCode01(){
		return templateManageMapper.querySeaAlarmCode01();
	}
	
	public List querySeaAlarmCode02(){
		return templateManageMapper.querySeaAlarmCode02();
	}
	
	public List querySeaAlarmCode03(){
		return templateManageMapper.querySeaAlarmCode03();
	}
	
	public List querySeaAlarmCode0101(){
		return templateManageMapper.querySeaAlarmCode0101();
	}
	
	public List querySeaAlarmCode0202(){
		return templateManageMapper.querySeaAlarmCode0202();
	}
	
	public List querySeaAlarmCode0303(){
		return templateManageMapper.querySeaAlarmCode0303();
	}
	
	public List queryProtocolCode(){
		return templateManageMapper.queryProtocolCode();
	}
	
	public List queryTmnlTypeCode(){
		return templateManageMapper.queryTmnlTypeCode();
	}
	
	public String saveBTmnlEventTemplate(Map paramMap){
		String retString = "";
		try{
		Integer retInt = templateManageMapper.saveBTmnlEventTemplate(paramMap);
		if(retInt==1) 
		   retString = "success";
		else
		   retString = "failure";
		}catch(Exception e){
			retString = "failure";
			e.printStackTrace();
		}
		return retString;
	}
	
	public String saveBTmnlEveAppDef(Map paramMap){
		String retString = "";
		try{
			Integer retInt = templateManageMapper.saveBTmnlEveAppDef(paramMap);
			if(retInt==1) 
				retString = "success";
			else
				retString = "failure";
		}catch(Exception e){
			retString = "failure";
			e.printStackTrace();
		}
		return retString;
	}
	
	public List queryOrgNoNameByOrgType03(){
		return templateManageMapper.queryOrgNoNameByOrgType03();
	}
	
	public String sendTaskByTmnl(String orgNo,List<Map<String,Object>> list){
		String retString = "success";
		String taskId = getTaskId();
		Map paramMap = new HashMap();
		paramMap.put("ORG_NO", orgNo);
		paramMap.put("TASK_ID", taskId);
		Integer insertRetInt1 = templateManageMapper.insertFTaskFront(paramMap);
		logger.debug("插入F_TASK_FRONT记录");
		retString = formTaskParam(taskId,list);
		if(!"success".equals(retString)) return retString;
		//调用webservice
		retString = callWebService(taskId);
		return retString;
	}
	
	public String sendTmnlTask(Map paramMap){
		String retString = "success";
        String taskId = getTaskId();
		paramMap.put("TASK_ID", taskId);
		Integer insertRetInt1 = templateManageMapper.insertFTaskFront(paramMap);
		logger.debug("插入F_TASK_FRONT记录");
		String orgNo = StringUtil.removeNull(paramMap.get("ORG_NO"));
		List<Map<String,Object>> terminalIdList = templateManageMapper.queryTmnlByOrgNo(orgNo);
		retString = formTaskParam(taskId,terminalIdList);
		if(!"success".equals(retString)) return retString;
		//调用webservice
		retString = callWebService(taskId);
		return retString;
	}
	
	public String getTaskId(){
		List<Map<String,Object>> taskIdList = templateManageMapper.queryTaskId();	
		String taskId ="";
		if(taskIdList!=null && taskIdList.size()>0)
		taskId = StringUtil.removeNull(taskIdList.get(0).get("TASK_ID"));
		logger.debug("生成F_TASK_FRONT序列号"+taskId);
		return taskId;
	}
	
	public String formTaskParam(String taskId,List<Map<String,Object>> terminalIdList){
		String ret = "success";
		try{
		int sum = 0;
		List fTaskFrontDetList = new ArrayList();
		List tTmnlParamList = new ArrayList();
		if(terminalIdList!=null && terminalIdList.size()>0){
			for(int i=0;i<terminalIdList.size();i++){
				String terminalId=StringUtil.removeNull(terminalIdList.get(i).get("TERMINAL_ID"));
				String protocolCode = StringUtil.removeNull(terminalIdList.get(i).get("PROTOCOL_CODE"));
				String tmnlTypeCode = StringUtil.removeNull(terminalIdList.get(i).get("TERMINAL_TYPE_CODE"));
				String areaCode = StringUtil.removeNull(terminalIdList.get(i).get("AREA_CODE"));
			

				FTaskFrontDet fTaskFrontDetModel = new FTaskFrontDet();
				fTaskFrontDetModel.setTaskId(taskId);
				fTaskFrontDetModel.setTerminalId(terminalId);
				fTaskFrontDetModel.setProtocolCode(protocolCode);
				
                fTaskFrontDetList.add(fTaskFrontDetModel);
                
//				templateManageMapper.insertFTaskFrontDet(fTaskFrontDetList);
//				logger.debug("插入F_TASK_FRONT_DET记录");
                
				Map templateMap = new HashMap();
				templateMap.put("TMNL_TYPE_CODE", tmnlTypeCode);
				templateMap.put("PROTOCOL_CODE", protocolCode);
				//查询此种类型和规约的终端的模板
				List<Map<String,Object>> templateList = templateManageMapper.queryTemplate(templateMap);
				if(templateList!=null && templateList.size()>0){
					String[] onOffArray = new String[64];
					String[] importantNormalArray = new String[64];
					for(int l=0;l<64;l++){
						onOffArray[l]="0";
						importantNormalArray[l]="0";
					}
					for(int j=0;j<templateList.size();j++){
						String recFlag = StringUtil.removeNull(templateList.get(j).get("REC_FLAG"));
						String eventLevel = StringUtil.removeNull(templateList.get(j).get("EVENT_LEVEL"));
						String eventNo = StringUtil.removeNull(templateList.get(j).get("EVENT_NO"));
						int num = Integer.valueOf(eventNo.substring(3,eventNo.length()));
						if("1".equals(recFlag)) onOffArray[num-1]="1";
						if("1".equals(eventLevel)) importantNormalArray[num-1]="1";
					}
					String value[] = new String[2];
				    value[0]="";
					value[1]="";
					for(int j=63;j>=0;j--){
						value[0] = value[0]+onOffArray[j];
					}
					for(int j=63;j>=0;j--){
						value[1] = value[1]+importantNormalArray[j];
					}
					String fn = "";
					fn="5".equals(protocolCode)?"09":(("1".equals(protocolCode)||"2".equals(protocolCode))?"08":"");
					if(!"".equals(fn)){
					   Map protocolMap = new HashMap();
					   protocolMap.put("PROT_ITEM_NO", protocolCode+"04"+fn);
					   List bCommProtocolItemList = templateManageMapper.queryBCommProtocolItem(protocolMap);
					   if(bCommProtocolItemList!=null){
						   for(int j=0;j<bCommProtocolItemList.size();j++){
							   Map<String,Object> bCommProtocolItemMap = (Map)bCommProtocolItemList.get(j);
							   String protItemNo = StringUtil.removeNull(bCommProtocolItemMap.get("PROT_ITEM_NO"));
							   String protItemSn = StringUtil.removeNull(bCommProtocolItemMap.get("PROT_ITEM_SN"));
							   String currentValue = value[j];
							  
							   TTmnlParam tTmnlParamModel = new TTmnlParam();
							   tTmnlParamModel.setTerminalId(terminalId);
							   tTmnlParamModel.setProtItemNo(protItemNo);
							   tTmnlParamModel.setProtItemSn(protItemSn);
							   tTmnlParamModel.setCurrentValue(currentValue);
							   tTmnlParamModel.setAreaCode(areaCode);
							   tTmnlParamList.add(tTmnlParamModel);
//							   try{
//							   int insertResult = templateManageMapper.insertTTmnlParam(tTmnlParamMap);
//							   }catch(Exception e){
//								   logger.debug(terminalId+":"+protItemNo+":"+protItemSn+":"+currentValue);
//								   e.printStackTrace();
//							   }
						   }
					   }
					}else{
					   logger.debug("terminalId:"+terminalId+"规约类型不正确");
					}
				}else{
					sum+=1;
				}
			}
		}
		if(sum==terminalIdList.size()){
		templateManageMapper.deleteFTaskFront(taskId);
		ret = "按供电单位、终端类型、终端规约在B_TMNL_EVENT_TEMPLATE无记录";
		}else{
			if(fTaskFrontDetList!=null && fTaskFrontDetList.size()>0){
				List fTaskFrontDetNewList = new ArrayList();
				for(int i=0;i<fTaskFrontDetList.size();i++){
					fTaskFrontDetNewList.add(fTaskFrontDetList.get(i));
					if((i+1)%1000==0||(i+1)==fTaskFrontDetList.size()){
						templateManageMapper.insertFTaskFrontDet(fTaskFrontDetNewList);
						fTaskFrontDetNewList = new ArrayList();
					}
				}
			}
//			templateManageMapper.insertFTaskFrontDet(fTaskFrontDetList);
			logger.debug("插入F_TASK_FRONT_DET记录");
			if(tTmnlParamList!=null && tTmnlParamList.size()>0){
				List tTmnlParamNewList = new ArrayList();
				for(int i=0;i<tTmnlParamList.size();i++){
					tTmnlParamNewList.add(tTmnlParamList.get(i));
					if((i+1)%1000==0||(i+1)==tTmnlParamList.size()){
						templateManageMapper.insertTTmnlParam(tTmnlParamNewList);
						tTmnlParamNewList = new ArrayList();
					}
				}
			}
//			int insertResult = templateManageMapper.insertTTmnlParam(tTmnlParamList);
			logger.debug("插入或更新T_TMNL_PARAM记录");
			
		}
	    }catch(Exception e){
		    e.printStackTrace();
		    ret = "下发失败";
	    }
		return ret;
	}
	
	public String callWebService(String taskId){
		String ret = "success";
		try{
		Map<String,Object> taskMap = new HashMap<String,Object>();
		taskMap.put("TASK_ID", taskId);
		taskMap.put("TASK_TYPE", "03");
		XMLSwitchUtil xsu = new XMLSwitchUtil();
		List<Map<String,Object>> urlList = templateManageMapper.queryUrl();
		String url ="";
		if(urlList!=null && urlList.size()>0){
			 url = StringUtil.removeNull(urlList.get(0).get("PARAM_ITEM_VAL"));
		}
		if(!"".equals(url)){
			Client client = new Client(new URL(url));
		    Object result[] = client.invoke("WS_TASK_NOTICE_TS", new Object[] {xsu.switchInputMapToXml_omid(taskMap)});
		    String resultFlag = StringUtil.removeNull(result[0]);
		}
		}catch(Exception e){
			e.printStackTrace();
			ret = "调用任务调度接口失败";
		}
		return ret;
	}
	
	public List queryEventAppDef(Map paramMap){
		return templateManageMapper.queryEventAppDef(paramMap); 
	}
	
	public Page<Map<String,Object>> queryTmnl(Page<Map<String,Object>> p,Map paramMap){
		return templateManageMapper.queryTmnl(p,paramMap);
	}
}
