package com.nari.statQuery.service.impl;


import java.util.List

;


import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nari.common.mybatis.pagination.Page;
import com.nari.demo.service.UserService;
import com.nari.statQuery.mapper.DisposeExcMapper;
import com.nari.statQuery.mapper.UsersExcMapper;
import com.nari.statQuery.service.DisposeExcService;
import com.nari.statQuery.service.UsersExcService;

@Service("UsersExcService")
public class UsersExcExcServiceImpl  implements UsersExcService {
	
	@Autowired
	private UsersExcMapper usersExcMapper;


	@Override
	public Page<Map<String, Object>> queryUsers(Page<Map<String, Object>> p,
			Map param) {
		return usersExcMapper.queryUsers(p, param);
	}


	@Override
	public List queryHisExc(Map paramMap) {
		// TODO Auto-generated method stub
		return usersExcMapper.queryHisExc(paramMap);
	}


	@Override
	public List queryMeterExc(Map paramMap) {
		// TODO Auto-generated method stub
		return usersExcMapper.queryMeterExc(paramMap);
	}


	@Override
	public List queryStatistics(Map paramMap) {
		// TODO Auto-generated method stub
		return usersExcMapper.queryStatistics(paramMap);
	}


	@Override
	public List queryTmnlExc(Map paramMap) {
		// TODO Auto-generated method stub
		return usersExcMapper.queryTmnlExc(paramMap);
	}

}
