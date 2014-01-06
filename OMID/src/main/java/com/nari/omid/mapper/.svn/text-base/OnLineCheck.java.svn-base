package com.nari.omid.mapper;

import java.util.List;
import java.util.Map;

public interface OnLineCheck {
	public List<Map<String,Object>> querReadMeter(Map<String,String> map);
	/**
	 * 统计每个信道上线数量
	 * @param map
	 * @return
	 */
	public List<Map<String,Object>> queryModeNum(Map<String,String>map);
	
	/**
	 * 统计终端下发数量
	 * @param map
	 * @return
	 */
	public List<Map<String,Object>> queryFeelNum(Map<String,String>map);
	/**
	 * 控制状态下发失败
	 * @param map
	 * @return
	 */
	public List<Map<String,Object>> queryMetNum(Map<String,String>map);
	/**
	 * 查询日期的终端上线率
	 * @param map
	 * @return
	 */
	public List<Map<String,Object>> queryTmnlRate(Map<String,String>map);
	/**
	 * 查询对比日期的终端上线率
	 * @param map
	 * @return
	 */
	public List<Map<String,Object>> queryCompareTmnlRate(Map<String,String>map);
}
