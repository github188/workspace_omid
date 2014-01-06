package com.nari.onlineMoni.service;

import java.util.List;
import java.util.Map;

import com.nari.common.mybatis.pagination.Page;

public interface MeterRunStatusMonitorService {
	public	List queryMeterProcolCodeList();
	public List queryMeterRunStatusTotalList(Map<String,String> queryItems);
	public Page<Map<String,Object>> queryMeterRunFailInfo(Page<Map<String,Object>> p,Map<String,String> queryItems);
	public List queryMeterCtrlSendRecord(Map<String,String> queryItems); 
	public List queryMeterFailSendRecord(Map<String,String> queryItems);
}
