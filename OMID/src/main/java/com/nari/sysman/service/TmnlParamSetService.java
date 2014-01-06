package com.nari.sysman.service;

import java.util.List;
import java.util.Map;
import com.nari.common.mybatis.pagination.Page;

public interface TmnlParamSetService {
    List queryCallStatusCode();
    Page<Map<String,Object>> queryFTaskFrontDet(Page<Map<String,Object>> p,Map<String,Object> paramMap);
    List queryTTmnlParam(Map paramMap);
    Page<Map<String,Object>> queryFTaskFront(Page<Map<String,Object>> p,Map<String,Object> paramMap);
}
