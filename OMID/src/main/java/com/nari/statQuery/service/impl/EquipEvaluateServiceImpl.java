package com.nari.statQuery.service.impl;


import java.util.List;


import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.nari.common.mybatis.pagination.Page;
import com.nari.statQuery.mapper.EquipEvaluateMapper;
import com.nari.statQuery.service.EquipEvaluateService;

@Service("EquipEvaluateService")
public class EquipEvaluateServiceImpl  implements EquipEvaluateService {

//	@Autowired
//	private MeasureExcDao measureExcDao;
	
	@Autowired
	private EquipEvaluateMapper equipEvaluateMapper;

	@Override
	public List getMeterList(Map paramMap) {
		return equipEvaluateMapper.getMeterList(paramMap);
	}

	@Override
	public Page getEquipList(Map paramMap,Page<Map<String,Object>> p) {
		return equipEvaluateMapper.getEquipList(p,paramMap);
	}

}
