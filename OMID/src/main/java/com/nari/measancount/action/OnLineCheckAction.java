package com.nari.measancount.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.nari.measancount.service.OnLineCheckService;
import com.opensymphony.xwork2.ActionSupport;
@ParentPackage("json-default")
@Namespace("/")
@Action("onLineCheckAction")
@Results({@Result(name="success",type="json"),@Result(name="input",type="json")})
public class OnLineCheckAction extends ActionSupport{
	@Autowired
	private OnLineCheckService onLineCheckService;
	private String orgNo;
	private String orgType;
	private String startDate;//可能要统计默认时间
	private String statDate;//开始日期
	private String compareDate;//对比日期
	private String collMode;//通信方式
	private List<Map<String,Object>> readMeterList = new ArrayList<Map<String,Object>>();
	private List<Map<String,Object>> modeNumList;
	private List<Map<String,Object>> feelNumList;
	private List<Map<String,Object>> meterNumList;
	private List<Map<String,Object>> tmnlStatRateList;
	private List<Map<String,Object>> tmnlComRateList;
	
	public String querReadMeter() throws Exception{
		List<Map<String,Object>> list=null;
		try {
			Map<String,String> map = new HashMap<String, String>();
			map.put("orgNo", orgNo);
			map.put("orgType", orgType);
			String [] org={"ORG01","ORG02","ORG03","ORG04","ORG05","ORG06","ORG07","ORG08","ORG09","ORG10","ORG11","ORG12","ORG13","ORG14","ORG15","ORG16"};
			if(orgType.equals("02")){
				for (int i=0;i<org.length;i++){
					map.put("org", org[i]);
					list = onLineCheckService.querReadMeter(map);
					readMeterList.addAll(list);
				}
			}else {
			readMeterList = onLineCheckService.querReadMeter(map);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
		
	}
	/**----------每个信道上线数量-------------------**/
	public String queryModeNum() throws Exception{
		try {
			Map<String,String> map = new HashMap<String, String>();
			map.put("orgNo", orgNo);
			map.put("orgType", orgType);
			modeNumList = onLineCheckService.queryModeNum(map);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}
	
	/**----------终端控制状态数量-------------------**/
	public String queryFeelNum() throws Exception{
		try {
			Map<String,String> map = new HashMap<String, String>();
			map.put("orgNo", orgNo);
			map.put("orgType", orgType);
			feelNumList = onLineCheckService.queryFeelNum(map);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}
	/**----------远程控制状态下发失败数量-------------------**/
	public String queryMetNum() throws Exception{
		try {
			Map<String,String> map = new HashMap<String, String>();
			map.put("orgNo", orgNo);
			map.put("orgType", orgType);
			meterNumList = onLineCheckService.queryMetNum(map);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}
	/**-----------开始时间终端上线率及对比时间上线率-----------**/
	public String queryTmnlRate() throws Exception{
		try {
			Map<String,String> map = new HashMap<String, String>();
			map.put("orgNo", orgNo);
			map.put("orgType", orgType);
			map.put("statDate", statDate);
			map.put("comDate", compareDate);
			map.put("compareDate",compareDate.replace("-", ""));
			map.put("collMode", collMode);
			map.put("stateDate", statDate.replace("-", ""));
			tmnlStatRateList = onLineCheckService.queryTmnlRate(map);
			tmnlComRateList = onLineCheckService.queryCompareTmnlRate(map);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}
	
	public String getOrgNo() {
		return orgNo;
	}
	public void setOrgNo(String orgNo) {
		this.orgNo = orgNo;
	}
	public String getOrgType() {
		return orgType;
	}
	public void setOrgType(String orgType) {
		this.orgType = orgType;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getStatDate() {
		return statDate;
	}
	public void setStatDate(String statDate) {
		this.statDate = statDate;
	}
	public String getCompareDate() {
		return compareDate;
	}
	public void setCompareDate(String compareDate) {
		this.compareDate = compareDate;
	}
	
	public String getCollMode() {
		return collMode;
	}
	public void setCollMode(String collMode) {
		this.collMode = collMode;
	}
	public List<Map<String, Object>> getReadMeterList() {
		return readMeterList;
	}

	public void setReadMeterList(List<Map<String, Object>> readMeterList) {
		this.readMeterList = readMeterList;
	}

	public List<Map<String, Object>> getModeNumList() {
		return modeNumList;
	}

	public void setModeNumList(List<Map<String, Object>> modeNumList) {
		this.modeNumList = modeNumList;
	}
	public List<Map<String, Object>> getFeelNumList() {
		return feelNumList;
	}
	public void setFeelNumList(List<Map<String, Object>> feelNumList) {
		this.feelNumList = feelNumList;
	}
	public List<Map<String, Object>> getMeterNumList() {
		return meterNumList;
	}
	public void setMeterNumList(List<Map<String, Object>> meterNumList) {
		this.meterNumList = meterNumList;
	}
	public List<Map<String, Object>> getTmnlStatRateList() {
		return tmnlStatRateList;
	}
	public void setTmnlStatRateList(List<Map<String, Object>> tmnlStatRateList) {
		this.tmnlStatRateList = tmnlStatRateList;
	}
	public List<Map<String, Object>> getTmnlComRateList() {
		return tmnlComRateList;
	}
	public void setTmnlComRateList(List<Map<String, Object>> tmnlComRateList) {
		this.tmnlComRateList = tmnlComRateList;
	}
	
}
