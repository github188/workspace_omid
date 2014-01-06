package com.nari.exceHand.service.impl;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nari.common.mybatis.pagination.Page;
import com.nari.exceHand.mapper.AwaitAlarmMapper;
import com.nari.exceHand.service.AwaitAlarmService;
import com.nari.omid.model.PSysUser;
import com.opensymphony.xwork2.ActionContext;


@Service("AwaitAlarmService")
public class AwaitAlarmServiceImpl implements AwaitAlarmService{
	
	@Autowired
	private AwaitAlarmMapper awaitAlarmMapper;

	@Override
	public List<Map<String, Object>> getAwaitAlarm(HashMap<String, Object> map) {
		return awaitAlarmMapper.getAwaitAlarm(map);
	}

	@Override
	public List<Map<String, Object>> getExceptSRC() {
		// TODO Auto-generated method stub
		return awaitAlarmMapper.getExceptSRC();
	}

	@Override
	public void Process(Map map) {
		awaitAlarmMapper.Process(map);
	}

	@Override
	public List getAlarmone(Map map) {
		// TODO Auto-generated method stub
		return   awaitAlarmMapper.getAlarmone(map);
	}

	@Override
	public List getAwaitAlarmone(Map map) {
		// TODO Auto-generated method stub
		return awaitAlarmMapper.getAwaitAlarmone(map);
	}

	@Override
	public List getExceptone(Map map) {
		// TODO Auto-generated method stub
		return awaitAlarmMapper.getExceptone(map);
	}

	@Override
	public List getftaskAlarmRela(Map map) {
		// TODO Auto-generated method stub
		return awaitAlarmMapper.getftaskAlarmRela(map);
	}

	@Override
	public void insertFtaskAlarmRela(Map map) {
		// TODO Auto-generated method stub
		awaitAlarmMapper.insertFtaskAlarmRela(map);
		
	}

	@Override
	public void insertFtaskFlow(Map map) {
		// TODO Auto-generated method stub
		awaitAlarmMapper.insertFtaskFlow(map);
	}

	@Override
	public List getAwaitAlarmrelaonebytm(Map map) {
		// TODO Auto-generated method stub
		return awaitAlarmMapper.getAwaitAlarmrelaonebytm(map);
	}

	@Override
	public Page<Map<String, Object>> getPageAwaitAlarm(
			Page<Map<String, Object>> p, Map map) {
		 
		return awaitAlarmMapper.getPageAwaitAlarm(p,map);
	}
	


	@Override
	public void handle_alarm(Map map,PSysUser user) {
		Integer processMode = Integer.parseInt(map.get("processMode").toString());
		String alarm_type= map.get("alarm_type").toString();
		List eventList =(List) map.get("eventlist");
		String task_id=String.valueOf(System.currentTimeMillis());
		
		
		String userNo="";
		String orgNo="";
		if(user!=null){
			userNo=user.getStaffNo();
			orgNo=user.getOrgNo();
		}
		
		Iterator it = eventList.iterator();
		String  terminal_id="";
		if(eventList!=null){
				Map mmm=(Map)eventList.get(0);
				if(mmm!=null){
					terminal_id=(String) mmm.get("TERMINAL_ID");
				}
		}
		Map m=new HashMap();
		m.put("terminal_id",terminal_id);
		
		List tasklevellist=findTaskLevel(m );
		if(tasklevellist!=null){
			Map mm=(Map)tasklevellist.get(0);
			if(mm!=null){
				String tesk_level=(String) mm.get("TASK_LEVEL");
				map.put("TASK_LEVEL", tesk_level);
			}
	    }
		
		
		
		switch (processMode) {
		case 1:
			//本地处理
			map.put("flow_flag", "0");
			
			map.put("task_id", task_id);
			map.put("SEND_SFAFF_NO",userNo);
			map.put("SEND_ORG_NO",orgNo);
			map.put("CLOSE_ORG_NO",orgNo );
			
			
	
			
			this.insertFtaskFlow(map);
			
			while (it.hasNext()) {
				Map object = (Map) it.next();
				
				object.put("TASK_ID", task_id);
				object.put("start_task_time", "start_task_time");
				object.put("status_code", map.get("status_code"));
				this.insertFtaskAlarmRela(object);
				this.Process(object);
				String atype=(String)object.get("ALARM_TYPE");
				object.put("FLOW_STATUS_CODE", "1");
				object.put("FLOW_STATUS_DETAIL", "");
				object.put("FLOW_FLAG", "0");
				object.put("HANDLE_ORG_NO", orgNo);
				object.put("HANDLE_STAFF_NO",map.get("rev_staff"));
				if(atype.equals("3")){
					this.updateAtmnlException(object);
				}else{
					this.updateAalarmAnalyse(object);
				}

			}
			break;
		case 4:
			//传营销的处理在这里
			map.put("task_id",  task_id);
			map.put("flow_flag", "1");
			map.put("flow_status_code","3" );
			map.put("SEND_SFAFF_NO",userNo);
			map.put("SEND_ORG_NO",orgNo );
			map.put("CLOSE_ORG_NO",orgNo);
			map.put("CLOSE_SFAFF_NO",userNo);
			
			awaitAlarmMapper.insertFtaskFlowEX(map);
			while (it.hasNext()) {
				Map object = (Map) it.next();
				object.put("TASK_ID", task_id);
				object.put("start_task_time", "start_task_time");
				object.put("status_code", map.get("status_code"));
				this.insertFtaskAlarmRela(object);
				this.Process(object);
				String atype=(String)object.get("ALARM_TYPE");
				object.put("FLOW_STATUS_CODE", "3");
				object.put("FLOW_STATUS_DETAIL", "");
				object.put("FLOW_FLAG", "1");
				object.put("HANDLE_ORG_NO", orgNo);
				object.put("HANDLE_STAFF_NO",userNo);
				if(atype.equals("3")){
					this.updateAtmnlException(object);
				}else{
					this.updateAalarmAnalyse(object);
				}

			}
			break;
		case 2:
			//暂不处理
			map.put("task_id", task_id);
			map.put("flow_flag", "0");
			map.put("flow_status_code","0" );
			map.put("SEND_SFAFF_NO",userNo);
			map.put("SEND_ORG_NO",orgNo);
			map.put("CLOSE_ORG_NO",orgNo);
			map.put("CLOSE_SFAFF_NO",userNo);
			awaitAlarmMapper.insertFtaskFlowEX(map);
		 
			while (it.hasNext()) {
				Map object = (Map) it.next();
				object.put("TASK_ID", task_id);
				object.put("start_task_time", "start_task_time");
				object.put("status_code", map.get("status_code"));
				this.insertFtaskAlarmRela(object);
				this.Process(object);
				
				String atype=(String)object.get("ALARM_TYPE");
				object.put("FLOW_STATUS_CODE", "0");
				object.put("FLOW_STATUS_DETAIL", "");
				object.put("FLOW_FLAG", "0");
				object.put("HANDLE_ORG_NO", orgNo);
				object.put("HANDLE_STAFF_NO",userNo);
				if(atype.equals("3")){
					this.updateAtmnlException(object);
				}else{
					this.updateAalarmAnalyse(object);
				}
			}
			break;
		case 3:
			//误报
			map.put("task_id", task_id);
			map.put("flow_flag", "0");
			map.put("flow_status_code","4" );
			
			map.put("SEND_SFAFF_NO",userNo);
			map.put("SEND_ORG_NO",orgNo);
			map.put("CLOSE_ORG_NO",orgNo );
			map.put("CLOSE_SFAFF_NO",userNo);
			
			awaitAlarmMapper.insertFtaskFlowEX(map);
			while (it.hasNext()) {
				Map object = (Map) it.next();
				object.put("TASK_ID", task_id);
				object.put("start_task_time", "start_task_time");
				object.put("status_code", map.get("status_code"));
				this.insertFtaskAlarmRela(object);
				this.Process(object);
				
				String atype=(String)object.get("ALARM_TYPE");
				
				object.put("FLOW_STATUS_CODE", "4");
				object.put("FLOW_STATUS_DETAIL", "41");
				object.put("FLOW_FLAG", "0");
				object.put("HANDLE_ORG_NO", orgNo);
				object.put("HANDLE_STAFF_NO",userNo);
				
			
				
				
				if(atype.equals("3")){
					this.updateAtmnlException(object);
				}else{
					this.updateAalarmAnalyse(object);
				}
				
				object.put("CLOSE_ORG_NO", orgNo);
				object.put("CLOSE_SFAFF_NO",userNo);
				object.put("CLOSE_TIME","CLOSE_TIME");
				object.put("FLOW_STATUS", "4");
				
				awaitAlarmMapper.modifyFlowStatus(object);
			}
			break;
		default:
			System.out.println("什么也没做");
			break;
		}
		
	}

	@Override
	public List queryTmnlAlarm(Map map) {
		// TODO Auto-generated method stub
		return awaitAlarmMapper.queryTmnlAlarm(map);
	}

	@Override
	public Page getAlarmDetail(Page<Map<String, Object>> p, Map map) {
		return awaitAlarmMapper.getAlarmDetail(p, map);
	}

	@Override
	public Page getAlarmThings(Page<Map<String, Object>> p, Map map) {
		return awaitAlarmMapper.getAlarmThings(p, map);
	}


	@Override
	public void modifyFlowStatus(Map map) {
		String FLOW_STATUS= map.get("FLOW_STATUS").toString();
		String PSTATUS_CODE=map.get("PSTATUS_CODE").toString();
		String MANAGE_TYPE=(String)map.get("manage_type");
		
		
		
		Map session = ActionContext.getContext().getSession();
		PSysUser user=(PSysUser)session.get("pSysUser");
		String userNo="";
		String orgNo="";
		if(user!=null){
			userNo=user.getStaffNo();
			orgNo=user.getOrgNo();
		}
		 
		map.put("MANAGE_TYPE", MANAGE_TYPE);
		
		List flowlist =this.getTaskAlarmRelaByTaskId(map);
		Iterator it = flowlist.iterator();
		if("3".equals(FLOW_STATUS)){
			map.put("FLOW_FLAG", "1");
		}
		if("5".equals(FLOW_STATUS)){
			if("3".equals(PSTATUS_CODE)){
				map.put("FLOW_STATUS_DETAIL", "52");
				map.put("FLOW_FLAG", "1");
			}
			if("2".equals(PSTATUS_CODE)){
				map.put("FLOW_STATUS_DETAIL", "51");
				map.put("FLOW_FLAG", "0");
				}
			else{
				map.put("FLOW_STATUS_DETAIL", "53");
				map.put("FLOW_FLAG", "0");
			}
		}
		map.put("CLOSE_ORG_NO", orgNo);
		map.put("CLOSE_SFAFF_NO",userNo);
		map.put("CLOSE_TIME","CLOSE_TIME");
		
		awaitAlarmMapper.modifyFlowStatus(map);
		while (it.hasNext()) {
			Map object = (Map) it.next();

			
			String atype=(String)object.get("ALARM_TYPE");
			object.put("FLOW_STATUS_CODE", FLOW_STATUS);
			
			if("5".equals(FLOW_STATUS)){
				if("3".equals(PSTATUS_CODE)){
					object.put("FLOW_STATUS_DETAIL", "52");
					object.put("FLOW_FLAG", "1");
				}
				if("2".equals(PSTATUS_CODE)){
					object.put("FLOW_STATUS_DETAIL", "51");
					object.put("FLOW_FLAG", "0");
					}
				if("0".equals(PSTATUS_CODE)){
					object.put("FLOW_STATUS_DETAIL", "53");
					object.put("FLOW_FLAG", "0");
				}
			}
			if("3".equals(FLOW_STATUS)){
				object.put("FLOW_FLAG", "1");
			}
			
			object.put("HANDLE_ORG_NO", orgNo);
			object.put("HANDLE_STAFF_NO",userNo);
			object.put("MANAGE_TYPE", MANAGE_TYPE);
			
			if("3".equals(atype)){
				this.updateAtmnlException(object);
			}else{
				this.updateAalarmAnalyse(object);
			}
		}
		
		
		
		
	}

	@Override
	public void updateAalarmAnalyse(Map map) {
		awaitAlarmMapper.updateAalarmAnalyse(map);
		
	}

	@Override
	public void updateAtmnlException(Map map) {
		awaitAlarmMapper.updateAtmnlException(map);
		
	}

	@Override
	public List getTaskAlarmRelaByTaskId(Map map) {
		return awaitAlarmMapper.getTaskAlarmRelaByTaskId(map);
	}

	@Override
	public List getUserListbyOrgNO(Map param) {
		return awaitAlarmMapper.getUserListbyOrgNO(param);
	}

	@Override
	public List getTGbyTaskId(Map param) {
		return awaitAlarmMapper.getTGbyTaskId(param);
	}

	@Override
	public List getTaskDetailbyTaskId(Map param) {
		return awaitAlarmMapper.getTaskDetailbyTaskId(param);
	}

	@Override
	public List getdoResultbyTaskId(Map param) {
		return awaitAlarmMapper.getdoResultbyTaskId(param);
	}

	@Override
	public List findTaskLevel(Map param) {
		return awaitAlarmMapper.findTaskLevel(param);
	}
	public void modifyAlarmRemove(Map param){
		List list=(List)param.get("detaillist");
		String isvalid=(String)param.get("isvalid");
		Iterator it=list.iterator();
		Map session = ActionContext.getContext().getSession();
		PSysUser user=(PSysUser)session.get("pSysUser");
		String userNO="";
		if(user!=null){
			userNO=user.getEmpNo();
		}
		while(it.hasNext()){
			Map object = (Map) it.next();
			object.put("ISVALID", isvalid);
			object.put("STAFF_NO", userNO);
			String atype=(String)object.get("ALARM_TYPE");
			String terminal_id=(String)object.get("TERMINAL_ID");
			String  meter_id="";
			if(object.get("METER_ID")!=null){
				meter_id=object.get("METER_ID").toString();
			}
			if("03".equals(atype)){
				object.put("DEV_TYPE", "02");
				object.put("DEV_ID", terminal_id);
			}else{
				object.put("DEV_TYPE", "01");
				object.put("DEV_ID", meter_id);
			}
 
			List findARlist=findAlarmRemoveis(object);
			System.out.println(findARlist+"findARlist");
			
			if(findARlist!=null&&findARlist.size()>0){
				HashMap count=(HashMap)findARlist.get(0);
				if(( "0".equals(count.get("CU").toString()))){
					awaitAlarmMapper.modifyAlarmRemove(object);
				}else{
					
					updateAlarmRemove(object);
				}
			} 
				 
		}
		
	
	}

	@Override
	public List findAlarmRemoveis(Map param) {
		return awaitAlarmMapper.findAlarmRemoveis(param);
	}

	@Override
	public void updateAlarmRemove(Map param) {
		awaitAlarmMapper.updateAlarmRemove(param);
	}

	@Override
	public Page<Map<String, Object>> awaitchaoqiQuery(
			Page<Map<String, Object>> p, Map map) {
		 
		return awaitAlarmMapper.awaitchaoqiQuery(p, map);
	}

	@Override
	public Page<Map<String, Object>> flowchaoqiQuery(
			Page<Map<String, Object>> p, Map map) {
		 
		return awaitAlarmMapper.flowchaoqiQuery(p, map);
	}

	public List<Map<String,Object>> findRoleByStaffno(Map<String,Object> map){
		return awaitAlarmMapper.findRoleByStaffno(map);
	}
}
