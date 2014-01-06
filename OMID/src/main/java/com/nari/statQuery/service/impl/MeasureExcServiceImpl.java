package com.nari.statQuery.service.impl;


import java.util.List
;


import java.util.Map;


import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.nari.statQuery.mapper.MeasureExcMapper;
import com.nari.statQuery.service.MeasureExcService;

@Service("MeasureExcService")
public class MeasureExcServiceImpl  implements MeasureExcService {

//	@Autowired
//	private MeasureExcDao measureExcDao;
	
	@Autowired
	private MeasureExcMapper measureExcMapper;
	

	@Override
	public Map getMeasureExcByCondition(Map paramMap) {
		return null;
	}

	@Override
	public List getOrgNo(Map paramMap) {
		return measureExcMapper.getOrgNo(paramMap);
		//return this.getSqlSession().selectList("com.nari.statQuery.mapper.MeasureExcMapper.getOrgNo", org_no);
	}

	@Override
	public Map getEventCount(Map param) {
		// TODO Auto-generated method stub
		return this.measureExcMapper.getEventCount(param);
		//return (Map)this.getSqlSession().selectOne("com.nari.omid.mapper.MeasureExcMapper.getEventCount",param);
	}

	@Override
	public List getTypePie(Map paramMap) {
		return measureExcMapper.getTypePie(paramMap);
		//return this.getSqlSession().selectList("com.nari.statQuery.mapper.MeasureExcMapper.getTypePie", paramMap);
	}

	@Override
	public List getEventBar(Map paramMap) {
		return measureExcMapper.getEventBar(paramMap);
	}

	@Override
	public List getEventStatePie(Map paramMap) {
		return measureExcMapper.getEventStatePie(paramMap);
	}

	@Override
	public List getEventContByOrg(Map paramMap) {
		return measureExcMapper.getEventContByOrg(paramMap);
	}

	@Override
	public List getEventLevel(Map paramMap) {
		return measureExcMapper.getEventLevel(paramMap);
	}

	@Override
	public List getAlarmLevel() {
		return measureExcMapper.getAlarmLevel();
	}

	@Override
	public List getAlarmSrc() {
		return measureExcMapper.getAlarmSrc();
	}

	@Override
	public List getAlarmType() {
		return measureExcMapper.getAlarmType();
	}

	@Override
	public List getLowerEventPie(Map paramMap) {
		return measureExcMapper.getLowerEventPie(paramMap);
	}

	@Override
	public List getSelfEventPie(Map paramMap) {
		return measureExcMapper.getSelfEventPie(paramMap);
	}

	@Override
	public List getEventDetail(Map paramMap) {
		return measureExcMapper.getEventDetail(paramMap);
	}

	@Override
	public List getFlowStatus() {
		return measureExcMapper.getFlowStatus();
	}

	@Override
	public List getCreateType() {
		return measureExcMapper.getCreateType();
	}

	@Override
	public List getFlowFlaging() {
		return measureExcMapper.getFlowFlaging();
	}

}
