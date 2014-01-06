package com.nari.realTimeMonitor.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nari.common.mybatis.pagination.Page;
import com.nari.realTimeMonitor.mapper.PowerConsumeMonitorMapper;
import com.nari.realTimeMonitor.service.PowerConsumeMonitorService;

@Service("PowerConsumeMonitorService")
public class PowerConsumeMonitorServiceImpl implements PowerConsumeMonitorService {
	@Autowired
	private PowerConsumeMonitorMapper powerConsumeMonitorMapper;

	@Override
	public List<Map<String, Object>> queryOrgList(Map<String, String> queryOrgMap) {
		return powerConsumeMonitorMapper.queryOrgList(queryOrgMap);
	}

	@Override
	public List<Map<String, Object>> queryTradeList(Map<String, String> queryTradeMap) {
		return powerConsumeMonitorMapper.queryTradeList(queryTradeMap);
	}

	@Override
	public List<Map<String, Object>> queryGroupList(Map<String, String> queryGroupMap) {
		return powerConsumeMonitorMapper.queryGroupList(queryGroupMap);
	}

	@Override
	public void queryVcmInfoList(Page<Map<String, Object>> p, Map<String, String> queryMap) {
		powerConsumeMonitorMapper.queryVcmInfoList(p, queryMap);

	}

	@Override
	public List<Map<String, Object>> queryElecValueInfoList(Map<String, String> queryMap) {
		return powerConsumeMonitorMapper.queryElecValueInfoList(queryMap);
	}

	@Override
	public List<Map<String, Object>> queryElecValueYearToYearInfoList(Map<String, String> queryMap) {
		return powerConsumeMonitorMapper.queryElecValueYearToYearInfoList(queryMap);
	}

	@Override
	public List<Map<String, Object>> queryElecValueChainRelativeInfoList(Map<String, String> queryMap) {
		return powerConsumeMonitorMapper.queryElecValueChainRelativeInfoList(queryMap);
	}

	@Override
	public List<Map<String, Object>> queryElecQuantityInfoList(Map<String, String> queryMap) {
		return powerConsumeMonitorMapper.queryElecQuantityInfoList(queryMap);
	}

	@Override
	public List<Map<String, Object>> queryElecQuantityYearToYearInfoList(Map<String, String> queryMap) {
		return powerConsumeMonitorMapper.queryElecQuantityYearToYearInfoList(queryMap);
	}

	@Override
	public List<Map<String, Object>> queryElecQuantityChainRelativeInfoList(Map<String, String> queryMap) {
		return powerConsumeMonitorMapper.queryElecQuantityChainRelativeInfoList(queryMap);
	}

	@Override
	public List<Map<String, Object>> queryVoltageInfoList(Map<String, String> queryMap) {
		return powerConsumeMonitorMapper.queryVoltageInfoList(queryMap);
	}

	@Override
	public List<Map<String, Object>> queryVoltageYearToYearInfoList(Map<String, String> queryMap) {
		return powerConsumeMonitorMapper.queryVoltageYearToYearInfoList(queryMap);
	}

	@Override
	public List<Map<String, Object>> queryVoltageChainRelativeInfoList(Map<String, String> queryMap) {
		return powerConsumeMonitorMapper.queryVoltageChainRelativeInfoList(queryMap);
	}

	@Override
	public List<Map<String, Object>> queryElecCurrentInfoList(Map<String, String> queryMap) {
		return powerConsumeMonitorMapper.queryElecCurrentInfoList(queryMap);
	}

	@Override
	public List<Map<String, Object>> queryElecCurrentYearToYearInfoList(Map<String, String> queryMap) {
		return powerConsumeMonitorMapper.queryElecCurrentYearToYearInfoList(queryMap);
	}

	@Override
	public List<Map<String, Object>> queryElecCurrentChainRelativeInfoList(Map<String, String> queryMap) {
		return powerConsumeMonitorMapper.queryElecCurrentChainRelativeInfoList(queryMap);
	}

	@Override
	public List<Map<String, Object>> queryElecLoadInfoList(Map<String, String> queryMap) {
		return powerConsumeMonitorMapper.queryElecLoadInfoList(queryMap);
	}

	@Override
	public List<Map<String, Object>> queryElecLoadYearToYearInfoList(Map<String, String> queryMap) {
		return powerConsumeMonitorMapper.queryElecLoadYearToYearInfoList(queryMap);
	}

	@Override
	public List<Map<String, Object>> queryElecLoadChainRelativeInfoList(Map<String, String> queryMap) {
		return powerConsumeMonitorMapper.queryElecLoadChainRelativeInfoList(queryMap);
	}

	@Override
	public List<Map<String, Object>> queryPowerFactorInfoList(Map<String, String> queryMap) {
		return powerConsumeMonitorMapper.queryPowerFactorInfoList(queryMap);
	}

	@Override
	public List<Map<String, Object>> queryPowerFactorYearToYearInfoList(Map<String, String> queryMap) {
		return powerConsumeMonitorMapper.queryPowerFactorYearToYearInfoList(queryMap);
	}

	@Override
	public List<Map<String, Object>> queryPowerFactorChainRelativeInfoList(Map<String, String> queryMap) {
		return powerConsumeMonitorMapper.queryPowerFactorChainRelativeInfoList(queryMap);
	}

}
