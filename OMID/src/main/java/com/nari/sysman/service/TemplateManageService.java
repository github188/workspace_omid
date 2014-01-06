package com.nari.sysman.service;

import java.util.List;
import java.util.Map;

import com.nari.common.mybatis.pagination.Page;

public interface TemplateManageService {
    List queryF9Temp(Map paramMap);
    List querySeaAlarmCode01();
    List querySeaAlarmCode02();
    List querySeaAlarmCode03();
    List querySeaAlarmCode0101();
    List querySeaAlarmCode0202();
    List querySeaAlarmCode0303();
    List queryProtocolCode();
    List queryTmnlTypeCode();
    String saveBTmnlEventTemplate(Map paramMap);
    String saveBTmnlEveAppDef(Map paramMap);
    List queryOrgNoNameByOrgType03();
    String sendTmnlTask(Map paramMap);
    List queryEventAppDef(Map paramMap);
    Page<Map<String,Object>> queryTmnl(Page<Map<String,Object>> p,Map map);
    public String sendTaskByTmnl(String orgNo,List<Map<String,Object>> list);
}
