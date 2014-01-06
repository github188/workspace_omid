package com.nari.statQuery.service.impl;


import java.util.List

;


import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nari.statQuery.mapper.DisposeExcMapper;
import com.nari.statQuery.service.DisposeExcService;

@Service("DisposeExcService")
public class DisposeExcServiceImpl  implements DisposeExcService {

//	@Autowired
//	private MeasureExcDao measureExcDao;
	
	@Autowired
	private DisposeExcMapper disposeExcMapper;
	@Override
	public Map getEventCount(Map param) {
		return this.disposeExcMapper.getEventCount(param);
	}

	@Override
	public List getEventStatePie(Map paramMap) {
		return disposeExcMapper.getEventStatePie(paramMap);
	}

	@Override
	public List getEventDetail(Map paramMap) {
		return disposeExcMapper.getEventDetail(paramMap);
	}

}
