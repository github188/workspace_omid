package com.nari.measancount.action;

import java.util.ArrayList;
import java.util.HashMap;
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
import com.nari.measancount.model.Collector;
import com.nari.measancount.model.Line;
import com.nari.measancount.model.Meter;
import com.nari.measancount.model.Substation;
import com.nari.measancount.model.Terminal;
import com.nari.measancount.service.MeasAncountService;
import com.nari.omid.model.PSysUser;
import com.opensymphony.xwork2.ActionSupport;


@ParentPackage("json-default")
@Namespace("/")
@Action("measAnCountAction")
@Results({@Result(name="success",type="json"),@Result(name="input",type="json")})
public class MeasAnCountAction extends ActionSupport{
	
	@Autowired
	private MeasAncountService measAncountService; 
	
	private String orgNo;
	private String orgType;
	private String statDate;
	private String lineId;
	private String tgId;
	private int page = 1;
	private int limit ;
	private int start;
	private List  list;
	private Map result;
	private List<Map<String,Object>>stausCodeList;
	private List<Map<String,Object>>tgCodeList;
	private List<Map<String,Object>>tgOrgNoList;
	private List<Map<String,Object>>tgInfoList;
	private List<Map<String,Object>>lineInfoList;
	private List<Map<String,Object>>tgInfo;
	private List<Map<String,Object>>tgTotalInfo; 
	private List<Map<String,Object>> lineInfo;
	private String lineInfoXml;
	private List<Terminal> resultList;
	private String tginfoXml;
	private long totalCount;
	
	public String queryMeasAn(){
		try {
			Page<Map<String,Object>> p = new Page<Map<String,Object>>();
			p.setCurrentPage(page);
			p.setSize(limit);
			Map<String,String> map = new HashMap<String,String>();
			map.put("tgId", "%"+tgId+"%");
			map.put("stateDate", statDate);
			map.put("orgNo", orgNo);
			map.put("orgType", orgType);
			measAncountService.queryMeas(p,map);
			tgInfoList= p.getResult();
			totalCount = p.getTotal();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}
	
	public String queryStatusCode()throws Exception{
		try {
			stausCodeList = measAncountService.queryStatusCode();
			Map<String,Object> map  = new HashMap<String, Object>();
			map.put("STATUS_NAME", "全部");
			map.put("STATUS_CODE", "-1");
			stausCodeList.add(0,map);
		} catch (Exception e) {
			throw new Exception("查询运行状态编码出错");
		}
		return SUCCESS;
	}
	
	public String queryTgCode() throws Exception{
		try {
			tgCodeList = measAncountService.queryTgCode();
			Map<String,Object> tgMap = new HashMap<String, Object>();
			tgMap.put("CONS_SORT_NAME", "全部");
			tgMap.put("CONS_SORT", "-1");
			tgCodeList.add(0,tgMap);
		} catch (Exception e) {
			throw new Exception("查询专公变标志编码出错");
		}
		return SUCCESS;
	}
	
	public String queryTgOrgNo() throws Exception{
		try {
			Map<String,String> map = new HashMap<String, String>();
			map.put("orgType", orgType.replace("0", ""));
			map.put("orgNo", orgNo);
			tgOrgNoList = measAncountService.queryTgOrgNo(map);
		} catch (Exception e) {
			throw new Exception("查询供电单位差错");
		}
		return SUCCESS;
	}
	
	@SuppressWarnings("unchecked")
	public String queryTgInfo() throws Exception{
		try {
			Map<String,String>map = new HashMap<String,String>();
			map.put("tgId", tgId);
			tgInfo = measAncountService.queryTgInfo(map);
			Map<String,String>maptotal = new HashMap<String,String>();
			maptotal.put("stateDate", statDate.replace("-", ""));
			maptotal.put("orgNo", orgNo);
			maptotal.put("orgType", orgType);
			maptotal.put("tgId", tgId);
			tgTotalInfo = measAncountService.querTgTotal(maptotal);
			List<Terminal> list;
			if(!tgInfo.isEmpty()){
			 list = this.formInfo(tgInfo);
			}else {
				list=null;
			}
			String state = "";
			String color= "";
			String stateMent = "";
			String tgName ="台区名称:";
			String TgInfoName ="台区编号:";
			String terInfoName = "终端编号:";
			String collInfoName = "采集器编号:";
			String meterInfoName = "用户名称:";
			String eventName ="事件名称";
			int count_1=0;
			int count_2=0;
			int count_3=0;
			int count_4=0;
			for(int k = 0; k < tgInfo.size();k++){
				if(tgInfo.get(k).get("EVENT_LEVEL").equals("01")){
					count_1 ++;
				}else if(tgInfo.get(k).get("EVENT_LEVEL").equals("02")){
					count_2++;
				}else if(tgInfo.get(k).get("EVENT_LEVEL").equals("03")){
					count_3++;
				}else{ 
					count_4++;
				}
			}
			if(count_1>0){
				state="4";
				color= "#D4101D";
				stateMent ="严重异常";
			}else if(count_1<1&&count_2>0){
				state="3";
				color= "#D46B1D";
				stateMent ="重要异常";
			}else if((count_1<1 && count_2<1&&count_3>0)){
				state="2";
				color= "#C7CF18";
				stateMent ="较重要异常";
			}else {
				state="1";
				color= "#026115";
				stateMent ="一般异常";
			}
			StringBuffer  sb  = new StringBuffer();
			String READ_CNT = "";
			String READ_SUCC_CNT="";
			String READ_SUCC_RATE="";
			String PPQ="";
			String TG_SPQ="";
			String READ_FAIL_RATE="";
			if(tgTotalInfo.size()>0){
				READ_CNT = String.valueOf(tgTotalInfo.get(0).get("READ_CNT"));
				READ_SUCC_CNT = String.valueOf(tgTotalInfo.get(0).get("READ_SUCC_CNT"));
				READ_SUCC_RATE = String.valueOf(tgTotalInfo.get(0).get("READ_SUCC_RATE"));
				PPQ = String.valueOf(tgTotalInfo.get(0).get("PPQ"));
				TG_SPQ =String.valueOf(tgTotalInfo.get(0).get("TG_SPQ"));
				READ_FAIL_RATE =String.valueOf(tgTotalInfo.get(0).get("READ_FAIL_RATE"));
			}else {
				READ_CNT = "";
				READ_SUCC_CNT ="";
				READ_SUCC_RATE ="";
				PPQ ="";
				TG_SPQ ="";
				READ_FAIL_RATE ="";
			}
			if(list!=null&&!list.isEmpty()){
				sb.append("<root>");
				sb.append("<trans prop='self' state='"+state+"' name='"+tgName+""+tgInfo.get(0).get("TG_NAME")+"'>");
				sb.append("<title>"+tgInfo.get(0).get("ORG_NAME")+""+tgInfo.get(0).get("TG_ID")+"号台区信息</title>");
				sb.append("<content>");	
				sb.append("<![CDATA[<font color='#0000ff'>"+TgInfoName+""+tgInfo.get(0).get("TG_ID")+"</font><br>地址："+tgInfo.get(0).get("INST_ADDR")+"<br>状态：<font color='"+color+"'>'"+stateMent+"'</font>]]>");
				sb.append("</content>");
				sb.append("<totalrecord linecnt='4'>");
				sb.append("<![CDATA[<font color='#0000ff'>抄表成功率统计</font><br>应抄表数："+READ_CNT+"<br>实际抄表："+READ_SUCC_CNT+"<br>抄表成功率<font color='#ff0000'>："+READ_SUCC_RATE+"</font>]]>");
				sb.append("</totalrecord>");
				sb.append("<lostrecord  linecnt='4'>");
				sb.append("<![CDATA[<font color='#0000ff'>线损统计</font><br>供入电量："+PPQ+"<br>供出电量："+TG_SPQ+"<br>线损率<font color='#ff0000'>："+READ_FAIL_RATE+"</font>]]>");
				sb.append("</lostrecord>");
				sb.append("</trans>");
				for(int i=0 ;i<list.size();i++){
					sb.append("<terminal state='"+list.get(i).getTerminalState()+"' name='"+terInfoName+""+list.get(i).getTerminalId()+"'>");
					sb.append("<content>");
					sb.append("<![CDATA[</font>地址："+list.get(i).getTerminalAdd()+"状态：<font color='"+list.get(i).getTmnlColor()+"'>'"+list.get(i).getTmnlStateMent()+"'</font>]]>");
					sb.append("</content>");
						for(int j=0;j<list.get(i).getComms().size();j++){
						sb.append("<collector state='"+list.get(i).getComms().get(j).getCollectState()+"' name='"+collInfoName+""+list.get(i).getComms().get(j).getCollectorId()+"'>");
						sb.append("<content>");
						sb.append("<![CDATA[<br>地址："+list.get(i).getComms().get(j).getCollectAdd()+"<br>状态：<font color='"+list.get(i).getComms().get(j).getColor()+"'>'"+list.get(i).getComms().get(j).getStateMent()+"'</font>]]>");
						sb.append("</content>");
							for(int m=0;m<list.get(i).getComms().get(j).getMeters().size();m++){
								sb.append("<wattMeter name='"+list.get(i).getComms().get(j).getMeters().get(m).getAssetNo()+":"+list.get(i).getComms().get(j).getMeters().get(m).getEventName()+"'>");
								sb.append("<![CDATA[<font color='#0000ff'>"+meterInfoName+""+list.get(i).getComms().get(j).getMeters().get(m).getConsName()+"</font><br>电表地址："+list.get(i).getComms().get(j).getMeters().get(m).getMeterAddr()+"<br>状态：<font color='"+list.get(i).getComms().get(j).getMeters().get(m).getStateColor()+"'>'"+list.get(i).getComms().get(j).getMeters().get(m).getEventLevelName()+"'</font>]]>");
								sb.append("</wattMeter>");
							}
							sb.append("</collector>");
						}
					sb.append("</terminal>");
				}
				sb.append("</root>");
				tginfoXml= sb.toString();
			} else {
				tginfoXml ="";
			}
		} catch (Exception e) {
			throw new Exception("查询台区信息出错");
		}
		return SUCCESS;
	}
	
	public List<Terminal> formInfo(List<Map<String,Object>> list){	
		List<Terminal> tmnls = new ArrayList<Terminal>();
		List<Collector> colls = new ArrayList<Collector>();
		List<Meter> meters = new ArrayList<Meter>();
		
		String termialId = String.valueOf(list.get(0).get("TERMINAL_ID"));
		String terminalAdd= String.valueOf(list.get(0).get("TERMINAL_ADDR"));
		String state = "";
		String color= "";
		String stateMent = "";
		String tmnlState="";
		String tmnlColor ="";
		String tmnlStateMent="";
		String collectorId = String.valueOf(list.get(0).get("COLLECTOR_ID"));
		String collectAdd = String.valueOf(list.get(0).get("COMM_ADDR"));
		for(int i = 0 ; i <list.size() ; i++){
			Meter meter = new Meter ();
			meter.setMeterId(String.valueOf(list.get(i).get("METER_ID")));
			meter.setMeterAddr(String.valueOf(list.get(i).get("COMM_ADDR1")));
			meter.setMeterState(String.valueOf(list.get(i).get("EVENT_LEVEL")));
			meter.setStateColor(String.valueOf(list.get(i).get("STATE_COLOR")));
			meter.setEventLevelName(String.valueOf(list.get(i).get("EVENT_LEVEL_NAME")));
			meter.setEventName(String.valueOf(list.get(i).get("EVENT_NAME")));
			meter.setAssetNo(String.valueOf(list.get(i).get("ASSET_NO")));
			meter.setConsName(String.valueOf(list.get(i).get("CONS_NAME")));
			meter.setConsNo(String.valueOf(list.get(i).get("CONS_NO")));
			
			if(String.valueOf(list.get(i).get("TERMINAL_ID")).equals(termialId)){
				if(String.valueOf(list.get(i).get("COLLECTOR_ID")).equals(collectorId)){
					meters.add(meter);
					
					if(i == list.size()-1){
						Collector collectot = new Collector();
						collectot.setCollectorId(collectorId);
						collectot.setCollectAdd(collectAdd);
						int count_1=0;
						int count_2=0;
						int count_3=0;
						int count_4=0;
						for(int k = 0; k < meters.size();k++){
							if(tgInfo.get(k).get("EVENT_LEVEL").equals("01")){
								count_1 ++;
							}else if(tgInfo.get(k).get("EVENT_LEVEL").equals("02")){
								count_2++;
							}else if(tgInfo.get(k).get("EVENT_LEVEL").equals("03")){
								count_3++;
							}else{ 
								count_4++;
							}
						}
						if(count_1>0){
							state="4";
							color= "#D4101D";
							stateMent ="严重异常";
						}else if(count_1<1&&count_2>0){
							state="3";
							color= "#D46B1D";
							stateMent ="重要异常";
						}else if((count_1<1 && count_2<1&&count_3>0)){
							state="2";
							color= "#C7CF18";
							stateMent ="较重要异常";
						}else {
							state="1";
							color= "#026115";
							stateMent ="一般异常";
						}
						collectot.setCollectState(state);
						collectot.setColor(color);
						collectot.setStateMent(stateMent);
						collectot.setMeters(meters);
						colls.add(collectot);
						
						Terminal tmnl = new Terminal();
						tmnl.setTerminalId(termialId);
						tmnl.setTerminalAdd(terminalAdd);
						int tmnlcount_1=0;
						int tmnlcount_2=0;
						int tmnlcount_3=0;
						int tmnlcount_4=0;
						for(int k = 0; k < meters.size();k++){
							if(tgInfo.get(k).get("EVENT_LEVEL").equals("01")){
								tmnlcount_1 ++;
							}else if(tgInfo.get(k).get("EVENT_LEVEL").equals("02")){
								tmnlcount_2++;
							}else if(tgInfo.get(k).get("EVENT_LEVEL").equals("03")){
								tmnlcount_3++;
							}else{ 
								tmnlcount_4++;
							}
						}
						if(count_1>0){
							tmnlState="4";
							tmnlColor= "#D4101D";
							tmnlStateMent ="严重异常";
						}else if(count_1<1&&count_2>0){
							tmnlState="3";
							tmnlColor= "#D46B1D";
							tmnlStateMent ="重要异常";
						}else if((count_1<1 && count_2<1&&count_3>0)){
							tmnlState="2";
							tmnlColor= "#C7CF18";
							tmnlStateMent ="较重要异常";
						}else {
							tmnlState="1";
							tmnlColor= "#026115";
							tmnlStateMent ="一般异常";
						}
						tmnl.setTerminalState(tmnlState);
						tmnl.setTmnlColor(tmnlColor);
						tmnl.setTmnlStateMent(tmnlStateMent);
						tmnl.setComms(colls);
						tmnls.add(tmnl);
					}
				}else{
					Collector collectot = new Collector();
					collectot.setCollectorId(collectorId);
					collectot.setCollectAdd(collectAdd);
					int count_1=0;
					int count_2=0;
					int count_3=0;
					int count_4=0;
					for(int k = 0; k < meters.size();k++){
						if(tgInfo.get(k).get("EVENT_LEVEL").equals("01")){
							count_1 ++;
						}else if(tgInfo.get(k).get("EVENT_LEVEL").equals("02")){
							count_2++;
						}else if(tgInfo.get(k).get("EVENT_LEVEL").equals("03")){
							count_3++;
						}else{ 
							count_4++;
						}
					}
					if(count_1>0){
						state="4";
						color= "#D4101D";
						stateMent ="严重异常";
					}else if(count_1<1&&count_2>0){
						state="3";
						color= "#D46B1D";
						stateMent ="重要异常";
					}else if((count_1<1 && count_2<1&&count_3>0)){
						state="2";
						color= "#C7CF18";
						stateMent ="较重要异常";
					}else {
						state="1";
						color= "#026115";
						stateMent ="一般异常";
					}
					collectot.setCollectState(state);
					collectot.setColor(color);
					collectot.setStateMent(stateMent);
					collectot.setMeters(meters);
					colls.add(collectot);
					
					collectorId = String.valueOf(list.get(i).get("COLLECTOR_ID"));
					collectAdd =String.valueOf(list.get(i).get("COMM_ADDR"));
					meters = new ArrayList<Meter>();
					meters.add(meter);
				}
			}else{
				Collector collectot = new Collector();
				collectot.setCollectorId(collectorId);
				collectot.setCollectAdd(collectAdd);
				int count_1=0;
				int count_2=0;
				int count_3=0;
				int count_4=0;
				for(int k = 0; k < meters.size();k++){
					if(tgInfo.get(k).get("EVENT_LEVEL").equals("01")){
						count_1 ++;
					}else if(tgInfo.get(k).get("EVENT_LEVEL").equals("02")){
						count_2++;
					}else if(tgInfo.get(k).get("EVENT_LEVEL").equals("03")){
						count_3++;
					}else{ 
						count_4++;
					}
				}
				if(count_1>0){
					state="4";
					color= "#D4101D";
					stateMent ="严重异常";
				}else if(count_1<1&&count_2>0){
					state="3";
					color= "#D46B1D";
					stateMent ="重要异常";
				}else if((count_1<1 && count_2<1&&count_3>0)){
					state="2";
					color= "#C7CF18";
					stateMent ="较重要异常";
				}else {
					state="1";
					color= "#026115";
					stateMent ="一般异常";
				}
				collectot.setCollectState(state);
				collectot.setColor(color);
				collectot.setStateMent(stateMent);
				collectot.setMeters(meters);
				colls.add(collectot);
				
				Terminal tmnl = new Terminal();
				tmnl.setTerminalId(termialId);
				tmnl.setTerminalAdd(terminalAdd);
				int tmnlcount_1=0;
				int tmnlcount_2=0;
				int tmnlcount_3=0;
				int tmnlcount_4=0;
				for(int k = 0; k < colls.size();k++){
					if(tgInfo.get(k).get("EVENT_LEVEL").equals("01")){
						tmnlcount_1 ++;
					}else if(tgInfo.get(k).get("EVENT_LEVEL").equals("02")){
						tmnlcount_2++;
					}else if(tgInfo.get(k).get("EVENT_LEVEL").equals("03")){
						tmnlcount_3++;
					}else{ 
						tmnlcount_4++;
					}
				}
				if(count_1>0){
					tmnlState="4";
					tmnlColor= "#D4101D";
					tmnlStateMent ="严重异常";
				}else if(count_1<1&&count_2>0){
					tmnlState="3";
					tmnlColor= "#D46B1D";
					tmnlStateMent ="重要异常";
				}else if((count_1<1 && count_2<1&&count_3>0)){
					tmnlState="2";
					tmnlColor= "#C7CF18";
					tmnlStateMent ="较重要异常";
				}else {
					tmnlState="1";
					tmnlColor= "#026115";
					tmnlStateMent ="一般异常";
				}
				tmnl.setTerminalState(tmnlState);
				tmnl.setTmnlColor(tmnlColor);
				tmnl.setTmnlStateMent(tmnlStateMent);
				tmnl.setComms(colls);
				tmnls.add(tmnl);
				
				meters = new ArrayList<Meter>();
				meters.add(meter);
				
				collectorId = String.valueOf(list.get(i).get("COLLECTOR_ID"));
				collectAdd = String.valueOf(list.get(i).get("COMM_ADDR"));
				state ="";
				color ="";
				stateMent="";
				colls = new ArrayList<Collector>();
				
			
				termialId = String.valueOf(list.get(i).get("TERMINAL_ID"));
				terminalAdd = String.valueOf(list.get(i).get("TERMINAL_ADDR"));
				tmnlColor ="";
				tmnlState ="";
				tmnlStateMent="";
			}
		}
			return tmnls;
			
	}
	
	public String queryLineInfo() {
		try {
			Page<Map<String,Object>> p = new Page<Map<String,Object>>();
			p.setCurrentPage(page);
			p.setSize(limit);
			Map<String,String>map = new HashMap<String,String>();
			map.put("orgNo", orgNo);
			map.put("lineId", "%"+lineId+"%");
			map.put("stateDate", statDate);
			map.put("orgType", orgType);
		    measAncountService.queryLineInfo(p,map);
		    lineInfo = p.getResult();
		    totalCount = p.getTotal();
		} catch (Exception e) {
			e.printStackTrace();
		}
			
		return SUCCESS;
	}
	
	public String queryLine() throws Exception{
		Map<String,String>map = new HashMap<String,String>();
		map.put("lineId", lineId);
		map.put("statDate", statDate);
		List<Map<String,Object>> lineMainList=null;
		List<Map<String,Object>> lineAsList = null;
		List<Map<String,Object>> lineL = null;//线损率
		List<Map<String,Object>> lineIdList =measAncountService.queryLineId(map);
		if(lineIdList.isEmpty()){
			/**---------如果是主线路则直接查询线损率统计,如果不是主线路则查询其主线路线损率统计---------------------**/
			Map<String,String>map_1 = new HashMap<String,String>();
			map_1.put("lineId", lineId);
			map_1.put("statDate", statDate.toString().replace("-", ""));
			lineL = measAncountService.queryLineLL(map_1);
			/**---------统计主线路变压器如果主线路无变压器则本图形之内的主线路不显示--------------------------------**/
			lineMainList = measAncountService.queryMainAsLine(map);
			/**---------统计辅线路变压器信息如果辅线路无变压器则本图形之内的数据不显示------------------------------**/
			lineAsList = measAncountService.queryAsLine(map);
		} else {
			Map<String,String>map1 = new HashMap<String,String>();
			 map1.put("lineId", String.valueOf(lineIdList.get(0).get("LINK_LINE_ID")));
			 map1.put("statDate", statDate.toString().replace("-", ""));
			 lineL = measAncountService.queryLineLL(map1);
			lineMainList = measAncountService.queryMainAsLine(map1);
			lineAsList = measAncountService.queryMainAsLine(map);
		}
		/**---------根据线路Id来查询变电站如果无变电站则本图形不显示-------------------------------------------**/
		List<Map<String,Object>> lineList = measAncountService.querySubs(map);
		
		/**---------根据CONS_SORT查询统计六个类型用户---------------------------------------------------------**/
		List<Map<String,Object>> consNUmList = measAncountService.queryConsNum(map);
		List<Line> list = this.lineList(lineAsList);
		StringBuffer sb = new StringBuffer();
		String subsName ="变压器名称:";
		String runCap ="运行容量:";
		String subBigAdd ="变电站地址:";
		String subBigRunCap ="变电站容量:";
		String num1="0";
		String num2="0";
		String num3="0";
		String num4="0";
		String num5="0";
		String num6="0";
		String LINE_SUPPLY_PQ="0";
		String TG_SPQ ="0";
		String SPQ="0";
		String LINE_SPQ="0";
		String LOSEPQ="0";
		String L_LLR="0";
		if(!consNUmList.isEmpty()){
			num1 = consNUmList.get(0).get("CNT").toString();
			num2 = consNUmList.get(1).get("CNT").toString();
			num3 = consNUmList.get(2).get("CNT").toString();
			num4 = consNUmList.get(3).get("CNT").toString();
			num5 = consNUmList.get(4).get("CNT").toString();
			num6 = consNUmList.get(5).get("CNT").toString();
		}
		if(!lineL.isEmpty()){
			LINE_SUPPLY_PQ = lineL.get(0).get("LINE_SUPPLY_PQ").toString();
			TG_SPQ = lineL.get(0).get("TG_SPQ").toString();
			SPQ = lineL.get(0).get("SPQ").toString();
			LINE_SPQ = lineL.get(0).get("LINE_SPQ").toString();
			LOSEPQ = lineL.get(0).get("LOSEPQ").toString();
			L_LLR = lineL.get(0).get("L_LLR").toString();
		}
		String state = "";
		String color= "";
		String stateMent = "";
		int count_1=0;
		int count_2=0;
		int count_3=0;
		int count_4=0;
		for(int k = 0; k < lineMainList.size();k++){
			if(lineMainList.get(k).get("EVENT_LEVEL").equals("01")){
				count_1 ++;
			}else if(lineMainList.get(k).get("EVENT_LEVEL").equals("02")){
				count_2++;
			}else if(lineMainList.get(k).get("EVENT_LEVEL").equals("03")){
				count_3++;
			}else{ 
				count_4++;
			}
		}
		if(count_1>0){
			state="4";
			color= "#D4101D";
			stateMent ="严重异常";
		}else if(count_1<1&&count_2>0){
			state="3";
			color= "#D46B1D";
			stateMent ="重要异常";
		}else if((count_1<1 && count_2<1&&count_3>0)){
			state="2";
			color= "#C7CF18";
			stateMent ="较重要异常";
		}else {
			state="1";
			color= "#1D3DDA";
			stateMent ="一般异常";
		}
		if(!lineList.isEmpty()){
		sb.append("<root>");
		sb.append("<trans prop='self' state='"+state+"' name='"+lineList.get(0).get("SUBS_NAME")+"'>");
		sb.append("<title>"+lineList.get(0).get("ORG_NAME")+""+lineList.get(0).get("LINE_NAME")+"线路</title>");
		sb.append("<content>");
		sb.append("<![CDATA[<font color='#0000ff'>"+subBigRunCap+""+lineList.get(0).get("MT_CAP")+"</font><br>"+subBigAdd+""+lineList.get(0).get("SUBS_ADDR")+"<br>状态：<font color='"+color+"'>"+stateMent+"</font>]]>");
		sb.append("</content>");
		sb.append("<totalrecord linecnt='10'>");
		sb.append("<![CDATA[<font color='#0000ff'>抄表成功率统计</font><br>大型专变用户："+num1+"<br>中小型专变用户："+num2+"<br>三相一般工商业用户："+num3+"<br>单相一般工商业用户："+num4+"<br>居民用户："+num5+"<br>公用配变考核计量点："+num6+"]]>");
		sb.append("</totalrecord>");
		sb.append("<lostrecord linecnt='7'>");
		sb.append("<![CDATA[<font color='#0000ff'>线损统计</font><br>供电量："+LINE_SUPPLY_PQ+"<br>专变售电量："+SPQ+"<br>台区售电量："+TG_SPQ+"<br>售电量之和："+LINE_SPQ+"<br>损失电量："+LOSEPQ+"<br>线损率<font color='#ff0000'>："+L_LLR+" </font>]]>");
		sb.append("</lostrecord>");
		sb.append("</trans>");
		if(!lineMainList.isEmpty()){ 
			sb.append("<substations prop='main' name='"+lineMainList.get(0).get("LINE_NAME")+"'>");
			for(int i=0;i<lineMainList.size();i++){
				sb.append("<substation prop='"+lineMainList.get(i).get("PROP").toString().toLowerCase()+"' state='"+lineMainList.get(i).get("EVENT_LEVEL_FU").toString().replace("0", "")+"' id='"+lineMainList.get(i).get("SUBS_ID")+"' name='"+lineMainList.get(i).get("CONS_NAME")+"'><![CDATA[<font color='#0000ff'>"+subsName+""+lineMainList.get(i).get("CONS_NAME")+"</font><br>"+runCap+""+lineMainList.get(i).get("RUN_CAP")+"<br>状态：<font color='"+lineMainList.get(i).get("STATE_COLOR")+"'>"+lineMainList.get(i).get("EVENT_LEVEL_NAME")+"</font>]]>");
				sb.append("</substation>");
			}
		}else {
			sb.append("<substations prop='main' name=''>");
			sb.append("<substation prop='' state='' id='' name=''><![CDATA[<font color='#0000ff'></font><br><br>状态：<font color=''></font>]]>");
			sb.append("</substation>");
		}
		sb.append("</substations>");
		if(!list.isEmpty()){
			for(int i=0 ;i<list.size();i++){
				sb.append("<substations prop='branch' name='"+list.get(i).getLineName()+"'>");
				for(int j=0;j<list.get(i).getSubs().size();j++){
					sb.append("<substation prop='"+list.get(i).getSubs().get(j).getProp().toString().toLowerCase()+"' state='"+list.get(i).getSubs().get(j).getSubsState().toString().replace("0", "")+"' id='"+list.get(i).getSubs().get(j).getSusbId()+"' name='"+list.get(i).getSubs().get(j).getSubsName()+"'><![CDATA[<font color='#0000ff'>"+subsName+""+list.get(i).getSubs().get(j).getSubsName()+"</font><br>"+runCap+""+list.get(i).getSubs().get(j).getRunCap()+"<br>状态：<font color='"+list.get(i).getSubs().get(j).getColor()+"'>"+list.get(i).getSubs().get(j).getEventName()+"</font>]]>");
					sb.append("</substation>");
				}
			sb.append("</substations>");
			}
		}else{
			sb.append("<substations prop='branch' name=''>");
			sb.append("<substation prop='self' state='1' id='' name=''><![CDATA[<font color='#0000ff'></font><br><br>状态：<font color=''></font>]]>");
			sb.append("</substation>");	
			sb.append("</substations>");
		}
		sb.append("</root>");
		lineInfoXml = sb.toString();
		} else {
		lineInfoXml = sb.toString();
		}
		return SUCCESS;
	}
	
	public List<Line> lineList(List<Map<String,Object>> list){
		List<Line> lines = new ArrayList<Line>();
		List<Substation> substations = new ArrayList<Substation>();
		if(!list.isEmpty()){
		String LineId = String.valueOf(list.get(0).get("LINE_ID"));
		String LineName = String.valueOf(list.get(0).get("LINE_NAME"));
		for(int i=0;i<list.size();i++){
			Substation sub = new Substation();
			sub.setSusbId(String.valueOf(list.get(i).get("SUBS_ID")));
			sub.setSubsName(String.valueOf(list.get(i).get("CONS_NAME")));
			sub.setSubsState(String.valueOf(list.get(i).get("EVENT_LEVEL_FU")));
			sub.setProp(String.valueOf(list.get(i).get("PROP")));
			sub.setRunCap(String.valueOf(list.get(i).get("RUN_CAP")));
			sub.setColor(String.valueOf(list.get(i).get("STATE_COLOR")));
			sub.setEventName(String.valueOf(list.get(i).get("EVENT_LEVEL_NAME")));
			if(String.valueOf(list.get(i).get("LINE_ID")).equals(LineId)){
				substations.add(sub);
				if(i == list.size()-1){
					Line ll = new Line();
					ll.setLineId(LineId);
					ll.setLineName(LineName);
					ll.setSubs(substations);
					lines.add(ll);
				}
			}else {
				Line line = new Line();
				line.setLineId(LineId);
				line.setLineName(LineName);
				line.setSubs(substations);
				lines.add(line);
				substations =  new ArrayList<Substation>();
				substations.add(sub);
				LineId = String.valueOf(list.get(i).get("LINE_ID"));
				LineName = String.valueOf(list.get(i).get("LINE_NAME"));
			}
		}
		}
		return lines;
	}
	/******-----------台区异常信息明细------------***/
	public String queryTgDetailInfo(){
		try {
			Page<Map<String,Object>> p = new Page<Map<String,Object>>();
			p.setCurrentPage(page);
			p.setSize(limit);
			Map<String,String> map = new HashMap<String,String>();
			map.put("tgId", tgId);
			measAncountService.tgDetailInfo(p, map);
			tgInfoList= p.getResult();
			totalCount = p.getTotal();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}
	
	public String queryLineDetailInfo(){
		Map<String,String> map = new HashMap<String,String>();
		map.put("lineId", lineId);
		Page<Map<String,Object>> p = new Page<Map<String,Object>>();
		p.setCurrentPage(page);
		p.setSize(limit);
		/*如果为空则说明是主线路,如果不为空则说明有上级主线路*/
		List<Map<String,Object>> lineIdList =measAncountService.queryLineId(map);
		if(lineIdList.isEmpty()){
			measAncountService.lineDetailInfo(p, map);
			lineInfoList = p.getResult();
			totalCount = p.getTotal();
		} else {
			 Map<String,String> map1 = new HashMap<String,String>();
			 map1.put("LINK_LINE_ID", String.valueOf(lineIdList.get(0).get("LINK_LINE_ID")));
			 map1.put(lineId, lineId);
			 measAncountService.lineAsDetailInfo(p, map1);
			 lineInfoList = p.getResult();
			 totalCount = p.getTotal();
		}
		return SUCCESS;
	}
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public int getLimit() {
		return limit;
	}
	public void setLimit(int limit) {
		this.limit = limit;
	}
	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}
	public List getList() {
		return list;
	}

	public void setList(List list) {
		this.list = list;
	}

	public long getTotalCount() {
		return totalCount;
	}
	public void setTotalCount(long totalCount) {
		this.totalCount = totalCount;
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

	public String getStatDate() {
		return statDate;
	}
	public void setStatDate(String statDate) {
		this.statDate = statDate;
	}
	
	public String getTgId() {
		return tgId;
	}

	public void setTgId(String tgId) {
		this.tgId = tgId;
	}
	
	public String getLineId() {
		return lineId;
	}

	public void setLineId(String lineId) {
		this.lineId = lineId;
	}

	public Map getResult() {
		return result;
	}

	public void setResult(Map result) {
		this.result = result;
	}
	
	public List<Map<String, Object>> getStausCodeList() {
		return stausCodeList;
	}

	public void setStausCodeList(List<Map<String, Object>> stausCodeList) {
		this.stausCodeList = stausCodeList;
	}

	public List<Map<String, Object>> getTgCodeList() {
		return tgCodeList;
	}

	public void setTgCodeList(List<Map<String, Object>> tgCodeList) {
		this.tgCodeList = tgCodeList;
	}

	public List<Map<String, Object>> getTgOrgNoList() {
		return tgOrgNoList;
	}

	public void setTgOrgNoList(List<Map<String, Object>> tgOrgNoList) {
		this.tgOrgNoList = tgOrgNoList;
	}

	/*public List<Map<String, Object>> getTgInfoList() {
		return tgInfoList;
	}*/
	public List<Map<String, Object>> getTgInfoList() {
		return tgInfoList;
	}
	public void setTgInfoList(List<Map<String, Object>> tgInfoList) {
		this.tgInfoList = tgInfoList;
	}

	public List<Map<String, Object>> getLineInfoList() {
		return lineInfoList;
	}

	public void setLineInfoList(List<Map<String, Object>> lineInfoList) {
		this.lineInfoList = lineInfoList;
	}

	public String getTginfoXml() {
		return tginfoXml;
	}

	public void setTginfoXml(String tginfoXml) {
		this.tginfoXml = tginfoXml;
	}
	public List<Terminal> getResultList() {
		return resultList;
	}

	public void setResultList(List<Terminal> resultList) {
		this.resultList = resultList;
	}

	public List<Map<String, Object>> getLineInfo() {
		return lineInfo;
	}

	public void setLineInfo(List<Map<String, Object>> lineInfo) {
		this.lineInfo = lineInfo;
	}

	public String getLineInfoXml() {
		return lineInfoXml;
	}

	public void setLineInfoXml(String lineInfoXml) {
		this.lineInfoXml = lineInfoXml;
	}
	


	
}
