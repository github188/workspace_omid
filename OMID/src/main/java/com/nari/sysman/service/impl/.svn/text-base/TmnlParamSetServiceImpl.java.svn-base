package com.nari.sysman.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nari.common.mybatis.pagination.Page;
import com.nari.omid.mapper.TmnlParamSetMapper;
import com.nari.sysman.service.TmnlParamSetService;

@Service("TmnlParamSetService")
public class TmnlParamSetServiceImpl implements TmnlParamSetService{
	@Autowired
	private TmnlParamSetMapper tmnlParamSetMapper;
	
	public List queryTTmnlParam(Map paramMap){
		String fn = "";
		String protocolCode = paramMap.get("PROTOCOL_CODE").toString();
		fn="5".equals(protocolCode)?"09":(("1".equals(protocolCode)||"2".equals(protocolCode))?"08":"");
		String protItemNo = protocolCode+"04"+fn; 
		paramMap.put("PROT_ITEM_NO", protItemNo);
		List<Map<String,Object>> tTmnlParamList = tmnlParamSetMapper.queryTTmnlParam(paramMap);
		List<Map<String,Object>> bTmnlEventTemplateList = tmnlParamSetMapper.queryBTmnlEventTemplate(paramMap);
		int num =64;
		if(bTmnlEventTemplateList!=null && bTmnlEventTemplateList.size()>0){
			if(bTmnlEventTemplateList.size()<64)
			num = bTmnlEventTemplateList.size();
		}
		if(tTmnlParamList!=null && tTmnlParamList.size()>0){
			for(int i=0;i<tTmnlParamList.size();i++){
				//F9 1表示有效 2等级
				String value = tTmnlParamList.get(i).get("CURRENT_VALUE").toString();
				for(int j=0;j<num;j++){
					String eventNo = bTmnlEventTemplateList.get(j).get("EVENT_NO").toString();
					int no = Integer.valueOf(eventNo.substring(3,eventNo.length()));
					bTmnlEventTemplateList.get(j).put(i==0?"REC_FLAG":"EVENT_LEVEL", value.substring(64-no,65-no));
				}
			}
		}
		return bTmnlEventTemplateList;
	}
	
	public List queryCallStatusCode(){
		return tmnlParamSetMapper.queryCallStatusCode();
	}
	
	public Page<Map<String,Object>> queryFTaskFrontDet(Page<Map<String,Object>> p,Map<String,Object> paramMap){
		return tmnlParamSetMapper.queryFTaskFrontDet(p,paramMap);
	}
	public Page<Map<String,Object>> queryFTaskFront(Page<Map<String,Object>> p,Map<String,Object> paramMap){
		return tmnlParamSetMapper.queryFTaskFront(p,paramMap);
	}
}
