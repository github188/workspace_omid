package com.nari.measancount.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.nari.measancount.service.OnLineCheckService;
import com.nari.omid.mapper.OnLineCheck;
@Service("OnLineCheckService")
@SuppressWarnings("unused")
public class OnLineCheckServiceImpl implements OnLineCheckService{
	@Autowired
	private OnLineCheck onLineCheck;
	/**
	 * 左下角图形
	 */
	@Override
	public List<Map<String, Object>> querReadMeter(Map<String, String> map) {
		
		return onLineCheck.querReadMeter(map);
	}
	@Override
	public List<Map<String, Object>> queryModeNum(Map<String, String> map) {
		
		return onLineCheck.queryModeNum(map);
	}
	@Override
	public List<Map<String, Object>> queryFeelNum(Map<String, String> map) {
		
		return onLineCheck.queryFeelNum(map);
	}
	@Override
	public List<Map<String, Object>> queryMetNum(Map<String, String> map) {
		
		return onLineCheck.queryMetNum(map);
	}
	
	@Override
	public List<Map<String, Object>> queryCompareTmnlRate(
			Map<String, String> map) {
		
		return onLineCheck.queryCompareTmnlRate(map);
	}
	
	@Override
	public List<Map<String, Object>> queryTmnlRate(Map<String, String> map) {
		
		return onLineCheck.queryTmnlRate(map);
	}
	
}
