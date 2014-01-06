package com.nari.sysman.service;





import java.util.List;
import java.util.Map;

import com.nari.common.mybatis.pagination.Page;

public interface DefinenotSendService {

 public Page<Map<String,Object>> qureyList(Page<Map<String,Object>> p,Map<String,String> queryItems);
 public Integer addManage(Map<String, String> queryItems);
 public Integer updateManage(Map<String, String> queryItems);
 public Integer deleteManage(Map<String, String> queryItems);
 public void sendSelfDeMsg(List<Map<String,String>> consList,String msgContent) throws Exception;
 public Page<Map<String,Object>> msgSendQuery(Page<Map<String,Object>> p,Map<String,String> queryItems);
 public List queryOrgNolist(String orgNo);
}
