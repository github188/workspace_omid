package com.nari.intelDiag.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nari.common.mybatis.pagination.Page;
import com.nari.intelDiag.mapper.MeasureExceptionAnalMapper;
import com.nari.intelDiag.mapper.TaskFlowMapper;
import com.nari.intelDiag.service.TaskFlowService;

@Service("TaskFlowService")
public class TaskFlowServiceImpl implements TaskFlowService {
	
	@Autowired
	private TaskFlowMapper taskFlowMapper;
	@Autowired
	private MeasureExceptionAnalMapper measureExceptionAnalMapper;	
	
	public Page<Map<String,Object>> queryTaskFlow(Page<Map<String,Object>> p,Map<String,String> queryItems){
		String exceptCode = queryItems.get("exceptCode");
		if ("00125".equals(exceptCode)) {
			return taskFlowMapper.queryTmnlNoFile(p, queryItems);
		} else {
			return taskFlowMapper.queryTaskFlow(p, queryItems);
		}
	}
	
	 @SuppressWarnings("unchecked")
	public List queryEleAbnormalTotalList(Map<String,String> queryItems){
		 return taskFlowMapper.queryEleAbnormalTotalList(queryItems);
	 };
	 
	 public Page<Map<String,Object>> queryAbnormal(Page<Map<String,Object>> p,Map<String,String> queryItems){
			return taskFlowMapper.queryAbnormal(p,queryItems);
		}

	 public Page<Map<String,Object>> queryTmnlCheckClock(Page<Map<String,Object>> p,Map<String,String> queryItems){
		 return taskFlowMapper.queryTmnlCheckClock(p,queryItems);
	 }

	 public Page<Map<String,Object>> queryTmnlParam(Page<Map<String,Object>> p,Map<String,String> queryItems){
		 return taskFlowMapper.queryTmnlParam(p,queryItems);
	 }

	 public Page<Map<String,Object>> queryTmnlEvent(Page<Map<String,Object>> p,Map<String,String> queryItems){
		 String time = queryItems.get("alarmTime").toString().replaceAll("-", "");
		 String code = queryItems.get("areaCode");
		 String eventPartition = "subpartition("+"PART_" +time +"_ORG"+code + ")";
		 queryItems.put("eventPartition", eventPartition);
		 return taskFlowMapper.queryTmnlEvent(p,queryItems);
	 }

	 public Page<Map<String,Object>> queryTmnlMsgLog(Page<Map<String,Object>> p,Map<String,String> queryItems){
		 Map<String,String> map = new HashMap<String,String>();
			map.put("tableName", "sea_l_up_comm_msg_log");
			map.put("queryDate", queryItems.get("alarmTime"));
			map.put("dateFormat", "YYYY-MM-DD");
		//获取表分区
		String datePartition = measureExceptionAnalMapper.queryTablePartiTion(map);
		queryItems.put("datePartition", datePartition);
		 return taskFlowMapper.queryTmnlMsgLog(p,queryItems);
	 }

	 public Page<Map<String,Object>> queryMpCurve(Page<Map<String,Object>> p,Map<String,String> queryItems){
		 Map<String,String> map = new HashMap<String,String>();
			map.put("tableName", "e_mp_curve");
			map.put("queryDate", queryItems.get("dataTime"));
			map.put("dateFormat", "YYYY-MM-DD");
		//获取表分区
		String datePartition = measureExceptionAnalMapper.queryTablePartiTion(map);
		queryItems.put("datePartition", datePartition);
		 return taskFlowMapper.queryMpCurve(p,queryItems);
	 }

	 public Page<Map<String,Object>> queryTmnlCopyFailure(Page<Map<String,Object>> p,Map<String,String> queryItems){
		 return taskFlowMapper.queryTmnlCopyFailure(p,queryItems);
	 }

	 public Page<Map<String,Object>> queryTmnlStop(Page<Map<String,Object>> p,Map<String,String> queryItems){
		 Map<String,String> map = new HashMap<String,String>();
			map.put("tableName", "e_mp_curve");
			map.put("queryDate", queryItems.get("alarmDate"));
			map.put("dateFormat", "YYYY-MM-DD");
		//获取表分区
		String datePartition = measureExceptionAnalMapper.queryTablePartiTion(map);
		queryItems.put("datePartition", datePartition);
		 return taskFlowMapper.queryTmnlStop(p, queryItems);
	 }

	 @SuppressWarnings("unchecked")
	public List queryTmnlChangData(Map queryItems){
		  
		 	List  tmnlChangDataList=taskFlowMapper.queryTmnlChangData(queryItems);
			
		 	List revList =new ArrayList();
			
			Iterator it= tmnlChangDataList.iterator();
			
			while(it.hasNext()){
				Map tmp_curve = (Map)it.next();
				String type_code = tmp_curve.get("DATA_TYPE_CODE").toString();
				
				if ("01".equals(type_code)) {
					List list =taskFlowMapper.queryP(tmp_curve);
					if(list.size()>0){
						revList.add(handle_power_list(list));
					}
				} else if("02".equals(type_code)){
					List list =taskFlowMapper.queryDayRead(tmp_curve);
					if(list.size()>0){
						revList.add(handle_electric_list(list));
					}
				} else if("03".equals(type_code)){
					List list =taskFlowMapper.queryEnergy(tmp_curve);
					if(list.size()>0){
						revList.add(handle_energy_list(list));
					}
				}
			}	
			return revList;
	 }
	 
	 @SuppressWarnings("unchecked")
	private Map handle_power_list(List list){ 
		 Map res_tmp = (Map)list.get(0);
		 String content = "负荷   "+"功率：" + res_tmp.get("P")+ " A相电压：" + res_tmp.get("UA")+ " B相电压：" 
		 + res_tmp.get("UB")+ " C相电压：" + res_tmp.get("UC")+ " A相电流：" + res_tmp.get("IA")+  " B相电流：" 
		 + res_tmp.get("IB")+ " C相电流：" + res_tmp.get("IC");
		 Map item =new HashMap();
		 item.put("eve_type", "负荷");
		 item.put("data_time", res_tmp.get("DATA_TIME"));
		 item.put("content", content);
		 return item;
	 }

	 @SuppressWarnings("unchecked")
	private Map handle_electric_list(List list){ 
		 Map res_tmp = (Map)list.get(0);
		 String content = "电能示值"+res_tmp.get("PAP_R");
		 Map item =new HashMap();
		 item.put("eve_type", "电能示值");
		 item.put("data_time", res_tmp.get("DATA_DATE"));
		 item.put("content", content);
		 return item;
	 }

	 @SuppressWarnings("unchecked")
	private Map handle_energy_list(List list){ 
		 Map res_tmp = (Map)list.get(0);
		 String content = "电能量"+res_tmp.get("PAP_E");
		 Map item =new HashMap();
		 item.put("eve_type", "电能量");
		 item.put("data_time", res_tmp.get("DATA_DATE"));
		 item.put("content", content);
		 return item;
	 }
	
	 public List queryTmnlType(){
		 return taskFlowMapper.queryTmnlType();
	 }
	 
	 public List queryFileTotalList(Map<String,String> queryItems){
		 return taskFlowMapper.queryFileTotalList(queryItems);
	 };
	
	 public Page<Map<String,Object>> queryAlarmAnalyseHisInfo(Page<Map<String,Object>> p,Map<String,String> queryItems){
		return taskFlowMapper.queryAlarmAnalyseHisInfo(p,queryItems);
	}
}
