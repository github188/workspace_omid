package com.nari.omid.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.nari.common.dao.mybatis.BaseMapper;
import com.nari.common.mybatis.pagination.Page;
import com.nari.common.mybatis.pagination.PageInterceptor;

public interface TemplateManageMapper extends BaseMapper<Map>{
	List queryF9Temp(Map paramMap);
	List querySeaAlarmCode01();
    List querySeaAlarmCode02();
    List querySeaAlarmCode03();
    List querySeaAlarmCode0101();
    List querySeaAlarmCode0202();
    List querySeaAlarmCode0303();
	List queryProtocolCode();
	List queryTmnlTypeCode();
	Integer saveBTmnlEventTemplate(Map paramMap);
	Integer saveBTmnlEveAppDef(Map paramMap);
	List queryOrgNoNameByOrgType03();
	List queryTaskId();
	Integer insertFTaskFront(Map paramMap);
	Integer insertFTaskFrontDet(List list);
	List queryTmnlByOrgNo(String orgNo);
	List queryTaskItemId();
	Integer insertFTaskFrontDet(Map paramMap);
	List queryTemplate(Map paramMap);
	Integer deleteFTaskFrontDet(String taskItemId);
	Integer deleteFTaskFront(String taskId);
	List queryUrl();
	List queryBCommProtocolItem(Map paramMap);
	Integer insertTTmnlParam(List list);
	List queryEventAppDef(Map paramMap);
	Page<Map<String,Object>> queryTmnl(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map map);
}
