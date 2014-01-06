package com.nari.realTimeMonitor.service;

import java.util.List;
import java.util.Map;

import com.nari.common.mybatis.pagination.Page;

public interface PowerConsumeMonitorService {

	List<Map<String, Object>> queryOrgList(Map<String, String> queryOrgMap);

	List<Map<String, Object>> queryTradeList(Map<String, String> queryTradeMap);

	List<Map<String, Object>> queryGroupList(Map<String, String> queryGroupMap);

	void queryVcmInfoList(Page<Map<String, Object>> p, Map<String, String> queryMap);

	// 电能示值
	List<Map<String, Object>> queryElecValueInfoList(Map<String, String> queryMap);

	List<Map<String, Object>> queryElecValueYearToYearInfoList(Map<String, String> queryMap);

	List<Map<String, Object>> queryElecValueChainRelativeInfoList(Map<String, String> queryMap);

	// 电量
	List<Map<String, Object>> queryElecQuantityInfoList(Map<String, String> queryMap);

	List<Map<String, Object>> queryElecQuantityYearToYearInfoList(Map<String, String> queryMap);

	List<Map<String, Object>> queryElecQuantityChainRelativeInfoList(Map<String, String> queryMap);

	// 电压
	List<Map<String, Object>> queryVoltageInfoList(Map<String, String> queryMap);

	List<Map<String, Object>> queryVoltageYearToYearInfoList(Map<String, String> queryMap);

	List<Map<String, Object>> queryVoltageChainRelativeInfoList(Map<String, String> queryMap);

	// 电流
	List<Map<String, Object>> queryElecCurrentInfoList(Map<String, String> queryMap);

	List<Map<String, Object>> queryElecCurrentYearToYearInfoList(Map<String, String> queryMap);

	List<Map<String, Object>> queryElecCurrentChainRelativeInfoList(Map<String, String> queryMap);

	// 负荷
	List<Map<String, Object>> queryElecLoadInfoList(Map<String, String> queryMap);

	List<Map<String, Object>> queryElecLoadYearToYearInfoList(Map<String, String> queryMap);

	List<Map<String, Object>> queryElecLoadChainRelativeInfoList(Map<String, String> queryMap);

	// 功率因素

	List<Map<String, Object>> queryPowerFactorInfoList(Map<String, String> queryMap);

	List<Map<String, Object>> queryPowerFactorYearToYearInfoList(Map<String, String> queryMap);

	List<Map<String, Object>> queryPowerFactorChainRelativeInfoList(Map<String, String> queryMap);

}
