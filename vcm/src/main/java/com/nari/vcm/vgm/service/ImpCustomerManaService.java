package com.nari.vcm.vgm.service;


import java.util.List;
import java.util.Map;

import com.nari.common.mybatis.pagination.Page;

public interface ImpCustomerManaService {
	public List<Map<String, Object>> queryCCustVcm(Map<String, String> map);
	public List<Map<String, Object>> queryCConsVcm(Map<String, String> map);
	public Page<Map<String,Object>> queryCCust(Page<Map<String,Object>> p,Map<String,Object> paramMap);
	public Integer importCCustVcm(Map<String,Object> map);
	public Integer saveCCustVcm(Map<String,String> map);
	public List<Map<String,Object>> queryOOrg03();
	public Page<Map<String,Object>> queryCCons(Page<Map<String,Object>> p ,Map<String,Object> map);
	public Integer importCConsVcm(Map<String,Object> map);
	public Integer deleteCConsVcm(Map<String,Object> map);
	public Integer deleteCCustDef(Map<String,Object> map);
	public Integer insertCCustDef(Map<String,Object> map);
	public List<Map<String,Object>> queryCCustDefId();
 	public List<Map<String,Object>> queryPbsArea();
	public List<Map<String,Object>> queryPbsFactory(Map<String,Object> map);
	public Page<Map<String,Object>> queryPbsMeter(Page<Map<String,Object>> p ,Map<String,Object> map);
	public Integer saveCConsVcm(Map<String,String> map);
	public List<Map<String,Object>> queryVwCustType();
	public List<Map<String,Object>> queryVwEconomyType();
	public List<Map<String,Object>> queryVwCreditLevel();
	public List<Map<String,Object>> queryVwValueLevel();
	public List<Map<String,Object>> queryVwRiskLevel();
	public List<Map<String,Object>> queryVwVipFlag();
	public List<Map<String,Object>> queryVwIndustryCode();
	public List<Map<String,Object>> querySeaVwConsSortCode();
	public List<Map<String,Object>> queryVwHecIndustryCode();
	public List<Map<String,Object>> queryVwIsVip();
	public List<Map<String, Object>>queryMeter(String consId);
	public List<Map<String, Object>>queryCCustDef(Map<String,Object> map);
}