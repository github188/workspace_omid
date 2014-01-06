package com.nari.vcm.vgm.service;

import java.util.List;
import java.util.Map;

public interface HomePageService {
	/**
	 * 入口查询方法
	 * @return
	 */
	public List<Map<String,Object>> getVipCustomer (Map param );
	
	
	public List<Map<String,Object>> queryTgOrgNo (Map param );

}
