package com.nari.intelDiag.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nari.common.mybatis.pagination.Page;
import com.nari.intelDiag.mapper.TaskFlowMapper;
import com.nari.intelDiag.service.TaskFlowService;

@Service("TaskFlowService")
public class TaskFlowServiceImpl implements TaskFlowService {
	
	@Autowired
	private TaskFlowMapper taskFlowMapper;
	
	public Page<Map<String,Object>> queryTaskFlow(Page<Map<String,Object>> p,Map<String,String> queryItems){
		return taskFlowMapper.queryTaskFlow(p, queryItems);
	}
	
	 public List queryEleAbnormalTotalList(Map<String,String> queryItems){
		 return taskFlowMapper.queryEleAbnormalTotalList(queryItems);
	 };
	 
	 public Page<Map<String,Object>> queryAbnormal(Page<Map<String,Object>> p,Map<String,String> queryItems){
			return taskFlowMapper.queryAbnormal(p,queryItems);
		}
}
