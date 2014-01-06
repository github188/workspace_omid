package com.nari.measancount.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nari.common.mybatis.pagination.Page;
import com.nari.measancount.model.Collector;
import com.nari.measancount.model.Meter;
import com.nari.measancount.model.Terminal;
import com.nari.measancount.service.MeasAncountService;
import com.nari.omid.mapper.MeasAnCountMapper;

@Service("MeasAncountService")
public class MeasAnCountServiceImpl implements MeasAncountService {
	
	@Autowired
	private MeasAnCountMapper meaancountMapper;
	@SuppressWarnings("unused")
	/**
	 * 按台区统计异常信息
	 */
	@Override
	public Page<Map<String,Object>> queryMeas(Page<Map<String,Object>> p,Map<String, String> map) {
		
		return meaancountMapper.queryMeas(p,map);
	}
	@Override
	public List<Map<String, Object>> queryStatusCode() {
		return this.meaancountMapper.queryStatusCode();
	}
	@Override
	public List<Map<String, Object>> queryTgCode() {
		
		return this.meaancountMapper.queryTgCode();
	}
	@Override
	public List<Map<String, Object>> queryTgOrgNo(Map<String, String> map) {
		
		return this.meaancountMapper.queryTgOrgNo(map);
	}
	@Override
	public List<Map<String,Object>> queryTgInfo(Map<String,String> map) {
		
		return meaancountMapper.queryTgInfo(map);
	}
	@Override
	public List<Map<String, Object>> querTgTotal(Map<String, String> map) {
		
		return meaancountMapper.querTgTotal(map);
	}
	@Override
	public Page<Map<String, Object>> queryLineInfo(Page<Map<String,Object>> p,Map<String, String> map) {
		
		return meaancountMapper.queryLineInfo(p,map);
	}
	@Override
	/**
	 * 辅线路变电站
	 */
	public List<Map<String, Object>> queryAsLine(Map<String, String> map) {
		
		return meaancountMapper.queryAsLine(map);
	}
	@Override
	/**
	 * 线路异常信息
	 */
	public List<Map<String, Object>> querySubs(Map<String,String> map) {
		
		return meaancountMapper.querySubs(map);
	}
	@Override
	public List<Map<String, Object>> queryMainAsLine(Map<String,String> map) {
		
		return meaancountMapper.queryMainAsLine(map);
	}
	@Override
	public List<Map<String, Object>> queryConsNum(Map<String, String> map) {
		
		return meaancountMapper.queryConsNum(map);
	}
	@Override
	public List<Map<String, Object>> queryLineId(Map<String, String> map) {
		
		return meaancountMapper.queryLineId(map);
	}
	@Override
	public List<Map<String, Object>> queryLineLL(Map<String, String> map) {
		
		return meaancountMapper.queryLineLL(map);
	}
	@Override
	public Page<Map<String, Object>> tgDetailInfo(Page<Map<String, Object>> p,
			Map<String, String> map) {
		
		return meaancountMapper.tgDetailInfo(p,map);
	}
	@Override
	public Page<Map<String, Object>> lineDetailInfo(Page<Map<String, Object>> p,
			Map<String, String> map) {
		
		return meaancountMapper.lineDetailInfo(p,map);
	}
	@Override
	public Page<Map<String, Object>> lineAsDetailInfo(Page<Map<String, Object>> p,
			Map<String, String> map) {
		
		return meaancountMapper.lineAsDetailInfo(p,map);
	}
}
