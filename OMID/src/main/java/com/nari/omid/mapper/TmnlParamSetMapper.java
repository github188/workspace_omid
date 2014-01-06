package com.nari.omid.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.nari.common.mybatis.pagination.Page;
import com.nari.common.mybatis.pagination.PageInterceptor;

public interface TmnlParamSetMapper {
    List queryCallStatusCode();
    Page<Map<String,Object>> queryFTaskFrontDet(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map map);
    List queryTTmnlParam(Map paramMap);
    List queryBTmnlEventTemplate(Map paramMap);
    Page<Map<String,Object>> queryFTaskFront(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map map);
}
