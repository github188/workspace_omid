package com.nari.vcm.vgm.service;

import java.util.List;
import java.util.Map;

public interface AssessmentObjPropertyService {

	List<Map<String, Object>> queryAOP(Map<String, String> map);//查询评估对象属性

	Integer insertAOP(Map<String, String> map);//新建评估对象属性

	Integer delAOP(Map<String, String> map);//删除评估对象属性

	Integer updateAOP(Map<String, String> map);//更新评估对象属性

	List<Map<String, Object>> queryUNIT_CODE();

	List<Map<String, Object>> queryTYPE_CODE();

	List<Map<String, Object>> queryUSAGE_CODE();

	List<Map<String, Object>> queryEFFECT_DEGREE();


	List<Map<String, Object>> queryANALYSE_TYPE();

	List<Map<String, Object>> queryEVENT_LEVEL();

}
