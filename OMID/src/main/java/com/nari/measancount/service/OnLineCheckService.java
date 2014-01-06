package com.nari.measancount.service;

import java.util.List;
import java.util.Map;

public interface OnLineCheckService {
	public List<Map<String,Object>> querReadMeter(Map<String,String> map);
	public List<Map<String,Object>> queryModeNum(Map<String,String> map);
	public List<Map<String,Object>> queryFeelNum(Map<String,String>map);
	public List<Map<String,Object>> queryMetNum(Map<String,String>map);
	public List<Map<String,Object>> queryTmnlRate(Map<String,String>map);
	public List<Map<String,Object>> queryCompareTmnlRate(Map<String,String>map);
}
