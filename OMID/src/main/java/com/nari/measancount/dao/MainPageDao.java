package com.nari.measancount.dao;

import java.util.List;
import java.util.Map;


public interface MainPageDao {
	/*
	 * 以下为主页统计方法，主要涉及图标统计，异常信息统计
	 */
	/**
	 * 主页右下角统计严重异常信息
	 * @author 李建久 //12.10.23
	 *              
	 */
	public List<Map<String,Object>> rightQuery_1(Map map);
}
