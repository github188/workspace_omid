package com.nari.vcm.vgm.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.nari.vcm.vgm.service.HomePageService;
import com.opensymphony.xwork2.ActionSupport;


@ParentPackage("json-default")
@Namespace("/")
@Action("HomePageAction")
@Results({@Result(name="success",type="json"),@Result(name="input",type="json")})
public class HomePageAction extends ActionSupport{
	@Autowired
	private HomePageService homePageService;
	
	
	//供电单位编号 List
	private List<Map<String,Object>>vcmTgOrgNoList; 
    //查询数据的list
	private List<Map<String,Object>> detailList;
	
	
	private String vcmOrgNo; //供电单位编号
	private String powerSuportName;
	private String queryDate;//查询时间
	private String queryType;//查询方式
	
	/**
	 * 入口查询方法
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public String getVipCustomer (){
		try{
			Map paramMap=new HashMap();
			if(powerSuportName == ""){
				powerSuportName = "1";
			}
			paramMap.put("ORG_NO", powerSuportName);
			paramMap.put("STAT_DATE", queryDate);
			paramMap.put("QUERY_TYPE", queryType);
			
			Map<String,String> map = new HashMap<String, String>();
			map.put("vcmOrgNo", "34101");
			detailList=homePageService.getVipCustomer(map);
		}catch(Exception e){
			e.printStackTrace();
		}
		return SUCCESS;
	}
	
	/**
	 * 查询所有供电单位
	 * @return
	 * @throws Exception 
	 */
	public String queryTgOrgNo() throws Exception{
		try {
			Map<String,String> map = new HashMap<String, String>();
			map.put("vcmOrgNo", vcmOrgNo);
			vcmTgOrgNoList = homePageService.queryTgOrgNo(map);
		} catch (Exception e) {
			throw new Exception("查询供电管理单位出错");
		}
		return SUCCESS;
	}

	public List<Map<String, Object>> getVcmTgOrgNoList() {
		return vcmTgOrgNoList;
	}

	public void setVcmTgOrgNoList(List<Map<String, Object>> vcmTgOrgNoList) {
		this.vcmTgOrgNoList = vcmTgOrgNoList;
	}

	public List<Map<String, Object>> getDetailList() {
		return detailList;
	}

	public void setDetailList(List<Map<String, Object>> detailList) {
		this.detailList = detailList;
	}

	public String getVcmOrgNo() {
		return vcmOrgNo;
	}

	public void setVcmOrgNo(String vcmOrgNo) {
		this.vcmOrgNo = vcmOrgNo;
	}

	public String getPowerSuportName() {
		return powerSuportName;
	}

	public void setPowerSuportName(String powerSuportName) {
		this.powerSuportName = powerSuportName;
	}

	public String getQueryDate() {
		return queryDate;
	}

	public void setQueryDate(String queryDate) {
		this.queryDate = queryDate;
	}

	public String getQueryType() {
		return queryType;
	}

	public void setQueryType(String queryType) {
		this.queryType = queryType;
	}
	

	

	

	
	
	
	


	

	
}
