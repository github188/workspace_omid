package com.nari.vcm.vgm.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nari.vcm.vgm.mapper.HomepageMapper;
import com.nari.vcm.vgm.service.HomePageService;

@Service("HomePageService")
public class HomePageServiceImpl implements HomePageService {
	@Autowired
	private HomepageMapper homepageMapper;
	
	@Override
	public List<Map<String,Object>> getVipCustomer(Map param) {
		return homepageMapper.getVipCustomer(param);
	}
	@Override
	public List<Map<String, Object>> queryTgOrgNo(Map param) {
		return homepageMapper.queryTgOrgNo(param);
	}
}
