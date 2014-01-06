package com.nari.realTimeMonitor.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.nari.common.mybatis.pagination.Page;
import com.nari.common.mybatis.pagination.PageInterceptor;

public interface PowerConsumeMonitorMapper {
	public List<Map<String, Object>> queryOrgList(@Param("map") Map<String, String> map);

	public List<Map<String, Object>> queryTradeList(@Param("map") Map<String, String> map);

	public List<Map<String, Object>> queryGroupList(@Param("map") Map<String, String> map);

	public void queryVcmInfoList(@Param(PageInterceptor.PAGE_KEY) Page<Map<String, Object>> p, @Param("map") Map<String, String> map);

	public List<Map<String, Object>> queryElecValueInfoList(@Param("map") Map<String, String> map);

	public List<Map<String, Object>> queryElecValueYearToYearInfoList(@Param("map") Map<String, String> map);

	public List<Map<String, Object>> queryElecValueChainRelativeInfoList(@Param("map") Map<String, String> map);

	public List<Map<String, Object>> queryElecQuantityInfoList(@Param("map") Map<String, String> map);

	public List<Map<String, Object>> queryElecQuantityYearToYearInfoList(@Param("map") Map<String, String> map);

	public List<Map<String, Object>> queryElecQuantityChainRelativeInfoList(@Param("map") Map<String, String> map);

	public List<Map<String, Object>> queryVoltageInfoList(@Param("map") Map<String, String> map);

	public List<Map<String, Object>> queryVoltageYearToYearInfoList(@Param("map") Map<String, String> map);

	public List<Map<String, Object>> queryVoltageChainRelativeInfoList(@Param("map") Map<String, String> map);

	public List<Map<String, Object>> queryElecCurrentInfoList(@Param("map") Map<String, String> map);

	public List<Map<String, Object>> queryElecCurrentYearToYearInfoList(@Param("map") Map<String, String> map);

	public List<Map<String, Object>> queryElecCurrentChainRelativeInfoList(@Param("map") Map<String, String> map);

	public List<Map<String, Object>> queryElecLoadInfoList(@Param("map") Map<String, String> map);

	public List<Map<String, Object>> queryElecLoadYearToYearInfoList(@Param("map") Map<String, String> map);

	public List<Map<String, Object>> queryElecLoadChainRelativeInfoList(@Param("map") Map<String, String> map);

	public List<Map<String, Object>> queryPowerFactorInfoList(@Param("map") Map<String, String> map);

	public List<Map<String, Object>> queryPowerFactorYearToYearInfoList(@Param("map") Map<String, String> map);

	public List<Map<String, Object>> queryPowerFactorChainRelativeInfoList(@Param("map") Map<String, String> map);

}
