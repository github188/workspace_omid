package com.nari.statQuery.action;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.nari.common.mybatis.pagination.Page;
import com.nari.statQuery.service.AlarmAnalyseService;
import com.opensymphony.xwork2.ActionSupport;
import com.sun.tools.javac.code.Attribute.Array;


@SuppressWarnings("serial")
@ParentPackage("baseJson")
@Namespace("/")
@Action("AlarmAnalyseAction")
@Results({@Result(name="success",type="json"),
@Result(name="input",type="json")})
public class AlarmAnalyseAction extends ActionSupport{
	
	@Autowired
	private AlarmAnalyseService alarmAnalyseService;
	
	@SuppressWarnings("unchecked")
	private List<Map> list ;
	
	private List alarmList;
	private List eventNameList;
	private List complexAlarmList;
	public List getComplexAlarmList() {
		return complexAlarmList;
	}

	public void setComplexAlarmList(List complexAlarmList) {
		this.complexAlarmList = complexAlarmList;
	}

	private Map complexCommData;
	public Map getComplexCommData() {
		return complexCommData;
	}

	public void setComplexCommData(Map complexCommData) {
		this.complexCommData = complexCommData;
	}

	private int page = 1;
	private int limit ;
	private long totalCount;
	
	private String org_no;
	private String alarm_src;
	private String event_level;
	private String minDate;
	private String maxDate;
	private String params_list;
	private String alarmname_param;
	private String complex_params;
/*	@SuppressWarnings("unchecked")
	public String getAlarmAnalyse() throws Exception{
		Map map = new HashMap();
		map.put("org_no",org_no );
		map.put("alarm_src",alarm_src );
		map.put("event_level",event_level );
		list = alarmAnalyseService.getAlarmAnlyse(map);
		return SUCCESS;
	}*/

	public String getComplex_params() {
		return complex_params;
	}

	public void setComplex_params(String complexParams) {
		complex_params = complexParams;
	}

	public List getEventNameList() {
		return eventNameList;
	}

	public void setEventNameList(List eventNameList) {
		this.eventNameList = eventNameList;
	}

	public String getAlarmname_param() {
		return alarmname_param;
	}

	public void setAlarmname_param(String alarmnameParam) {
		alarmname_param = alarmnameParam;
	}

	public String getParams_list() {
		return params_list;
	}

	public void setParams_list(String paramsList) {
		params_list = paramsList;
	}

//	public String getTable_name() {
//		return table_name;
//	}
//
//	public void setTable_name(String tableName) {
//		table_name = tableName;
//	}
	@SuppressWarnings("unchecked")
    public String queryComplexCommonList(){
		JSONObject jsonObject = JSONObject.fromObject(params_list);
		Map tmp_Map=jsonObject;
		List tmp_list=(List)tmp_Map.get("list");
		complexCommData=new HashMap();
    	try {
    		if(tmp_list!=null&&tmp_list.size()>0){
    			for(Iterator iter=tmp_list.iterator();iter.hasNext();){
    				Map paramMap=(Map)iter.next();
    				complexCommData.put(paramMap.get("store_name").toString(), alarmAnalyseService.getComplexCommonList(paramMap));
    			}
    		}else{
    			System.out.println("&&&&&&&*^*很不幸的事发生鸟（&（&（&（&&（");
    		}
		} catch (Exception e) {
			e.printStackTrace();
		}
    	return SUCCESS;
    }
	
	@SuppressWarnings("unchecked")
	public String queryEventNameList(){
		try{
			JSONObject jsonObject = JSONObject.fromObject(alarmname_param);
			Map paramMap=jsonObject;
			eventNameList=alarmAnalyseService.getComplexCommonList(paramMap);
		}catch(Exception e){
			e.printStackTrace();
		}
		return SUCCESS;
	}
	@SuppressWarnings("unchecked")
	public String queryComplexAlarm(){
		
		try {
			Map param = new HashMap();
			if(this.complex_params != null){
				JSONObject jsonObject = JSONObject.fromObject(this.complex_params);
				param = jsonObject;
			}
			if(param.get("cons_no")!=null && param.get("cons_no").toString().length()>0 ){
				param.put("cons_no", getConnectStr(param.get("cons_no").toString().replaceAll("，", ",").split(","),","));
			}
			if(param.get("terminal_addr")!=null && param.get("terminal_addr").toString().length()>0){
				param.put("terminal_addr", getConnectStr(param.get("terminal_addr").toString().replaceAll("，", ",").split(","),","));
			}
			if(param.get("asset_no")!=null && param.get("asset_no").toString().length()>0){
				param.put("asset_no", getConnectStr(param.get("asset_no").toString().replaceAll("，", ",").split(","),","));
			}
			Page<Map<String,Object>> p = new Page<Map<String,Object>>();
			p.setCurrentPage(page);
			p.setSize(limit);
			alarmAnalyseService.queryComplexAlarm(p, param);
			complexAlarmList = p.getResult();
			totalCount = p.getTotal();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}
	private String getConnectStr(String[] arrayStr,String connectFlag){
		String connectStr="";
		try {
			for(int i=0;i<arrayStr.length;i++){
				connectStr+="'"+arrayStr[i]+"'";
				if(i<arrayStr.length-1){
					connectStr+=connectFlag;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return connectStr;
		
	}
	@SuppressWarnings("unchecked")
	public String queryAlarmAnalyse() throws Exception{
		Page<Map<String, Object>> p = new Page<Map<String,Object>>();
		p.setCurrentPage(page);
		p.setSize(limit);

		Map map = new HashMap();
		map.put("org_no",org_no );
		map.put("alarm_src",alarm_src );
		map.put("event_level",event_level );
		
		if(null!=minDate &&!"".equals(minDate)){
			Date date = new Date(minDate);
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
			map.put("minDate", simpleDateFormat.format(date));
			System.out.println(simpleDateFormat.format(date));
		}
		if(null!=maxDate &&!"".equals(maxDate)){
			Date date = new Date(maxDate);
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
			map.put("maxDate", simpleDateFormat.format(date));
		}

		alarmAnalyseService.queryAlarmAnlyse(p, map);
		
		alarmList = p.getResult();
		totalCount = p.getTotal();
		
		return SUCCESS;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	@SuppressWarnings("unchecked")
	public List<Map> getList() {
		return list;
	}

	@SuppressWarnings("unchecked")
	public void setList(List<Map> list) {
		this.list = list;
	}

	public String getOrg_no() {
		return org_no;
	}

	public void setOrg_no(String orgNo) {
		org_no = orgNo;
	}

	public String getAlarm_src() {
		return alarm_src;
	}

	public void setAlarm_src(String alarmSrc) {
		alarm_src = alarmSrc;
	}

	public String getEvent_level() {
		return event_level;
	}

	public void setEvent_level(String eventLevel) {
		event_level = eventLevel;
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	public long getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(long totalCount) {
		this.totalCount = totalCount;
	}

	public List getAlarmList() {
		return alarmList;
	}

	public void setAlarmList(List alarmList) {
		this.alarmList = alarmList;
	}

	public String getMinDate() {
		return minDate;
	}

	public void setMinDate(String minDate) {
		this.minDate = minDate;
	}

	public String getMaxDate() {
		return maxDate;
	}

	public void setMaxDate(String maxDate) {
		this.maxDate = maxDate;
	}
	
	
	
	
	
	

}
