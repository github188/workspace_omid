package com.nari.sysman.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



import com.nari.sysman.mapper.MainPageMapper;
import com.nari.sysman.service.MainPageService;



@Service("MainPageService") 
public class MainPageServiceImpl implements MainPageService{
	@Autowired
	private MainPageMapper mainPageMapper;
	
	@Override
	public List<Map<String, Object>> rightQuery_1(Map map) {
		return mainPageMapper.rightQuery_1(map);
	}
	public List<Map<String, Object>> rightQuery_2(Map map) {
		return mainPageMapper.rightQuery_2(map);
	}
	public List<Map<String, Object>> rightQuery_3(Map map) {
		return mainPageMapper.rightQuery_3(map);
	}
	public List<Map<String, Object>> rightQuery_4(Map map) {
		return mainPageMapper.rightQuery_4(map);
	}
	public List<Map<String, Object>> rightQuery_5(Map map) {
		return mainPageMapper.rightQuery_5(map);
	}
	
	public List<Map<String, Object>> rightQuery_6(Map map) {
		return mainPageMapper.rightQuery_6(map);
	}
	@Override
	public List<Map<String, Object>> rightQuery_7(Map map) {
		return mainPageMapper.rightQuery_7(map);
	}

	
}
