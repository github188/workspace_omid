package com.nari.intelDiag.service.impl;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.nari.common.mybatis.pagination.Page;
import com.nari.intelDiag.mapper.ElecAbnormalMapper;
import com.nari.intelDiag.service.EleAbnormalAnalyService;

@Service("EleAbnormalAnalyService")
public class EleAbnormalAnalyServiceImpl implements EleAbnormalAnalyService {
	
	@Autowired
	private ElecAbnormalMapper elecAbnormalMapper;
	
	public List getOrgNo(String orgNo) {
		return elecAbnormalMapper.getOrgNo(orgNo);
	};
	public List getEventLevelList() {
		return elecAbnormalMapper.getEventLevelList();
	};

	 public List queryEleAbnormalTotalList(Map<String,String> queryItems){
		 return elecAbnormalMapper.queryEleAbnormalTotalList(queryItems);
	 };
	 public List queryFileTotalList(Map<String,String> queryItems){
		 return elecAbnormalMapper.queryFileTotalList(queryItems);
	 };
		public Page<Map<String,Object>> queryAlarmAnalyseHisInfo(Page<Map<String,Object>> p,Map<String,String> queryItems){
			return elecAbnormalMapper.queryAlarmAnalyseHisInfo(p,queryItems);
		}
		@Override
     public List getconstypeList() {
		return elecAbnormalMapper.getconstypeList();
		}
}
