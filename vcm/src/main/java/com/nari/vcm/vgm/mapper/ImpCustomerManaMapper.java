package com.nari.vcm.vgm.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.nari.common.dao.mybatis.BaseMapper;
import com.nari.common.mybatis.pagination.Page;
import com.nari.common.mybatis.pagination.PageInterceptor;

public interface ImpCustomerManaMapper extends BaseMapper<Map>{
	public List<Map<String, Object>> queryCCustVcm(Map<String, String> map);
	public List<Map<String, Object>> queryCConsVcm(Map<String, String> map);
	public Page<Map<String,Object>> queryCCust(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map map);
	public Integer importCCustVcm(Map<String,Object> map);
	public Integer saveCCustVcm(Map<String,String> map);
	public List<Map<String,Object>> queryCustId();
	public List<Map<String,Object>> queryOOrg03();
	public Page<Map<String,Object>> queryCCons(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map map);
	public Integer importCConsVcm(Map<String,Object> map);
	public Integer deleteCConsVcm(Map<String,Object> map);
	public Integer deleteCCustDef(Map<String,Object> map);
	public Integer insertCCustDef(Map<String,Object> map);
	public List<Map<String,Object>> queryCCustDefId();
	public List<Map<String,Object>> queryPbsArea();
	public List<Map<String,Object>> queryPbsFactory(Map<String,Object> map);
	public Page<Map<String,Object>> queryPbsMeter(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map map);
	public List<Map<String,Object>> queryConsId();
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
	public Integer importCCustDef(Map<String,Object> map);
	public List<Map<String,Object>> queryMeter(String consId);
	public List<Map<String, Object>>queryCCustDef(Map<String,Object> map);
	public List<Map<String,Object>> queryCCustDefExist(Map<String,Object> map);
}
