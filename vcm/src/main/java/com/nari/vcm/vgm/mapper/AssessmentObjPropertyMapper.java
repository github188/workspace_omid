package com.nari.vcm.vgm.mapper;

import java.util.List;
import java.util.Map;
import com.nari.common.dao.mybatis.BaseMapper;

public interface AssessmentObjPropertyMapper extends BaseMapper<Map>{

	Integer insertAOP(Map<String, String> map);


	Integer updateAOP(Map<String, String> map);

	Integer delAOP(Map<String, String> map);

	List<Map<String, Object>> queryAOP(Map<String, String> map);


	List<Map<String, Object>> queryUNIT_CODE();


	List<Map<String, Object>> queryANALYSE_TYPE();


	List<Map<String, Object>> queryEVENT_LEVEL();




	List<Map<String, Object>> queryTYPE_CODE();


	List<Map<String, Object>> queryUSAGE_CODE();


	List<Map<String, Object>> queryEFFECT_DEGREE();

}
