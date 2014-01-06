package com.nari.intelDiag.action;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;



import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.nari.common.action.BaseAction;
import com.nari.common.mybatis.pagination.Page;
import com.nari.intelDiag.service.TaskFlowService;


@ParentPackage("baseJson")
@Namespace("/")
@Action("taskFlowAction")
@Results({@Result(name="success",type="json"),
@Result(name="input",type="json")})
public class TaskFlowAction extends BaseAction {

	private List<Map<String,Object>> resultList ;
	private List<Map<String,Object>> resultList2 ; //备用结果集
	
	private List eleStattisTotalList;
	private List<Map<String,Object>> abnormalList ;
	private List<Map<String,Object>> tmnlCheckClockList ;
	private List<Map<String,Object>> tmnlParamList ;
	private List<Map<String,Object>> tmnlMsgLogList ;
	private List<Map<String,Object>> mpCurveList ;
	private List<Map<String,Object>> tmnlCopyFailureList ;
	private List<Map<String,Object>> tmnlStopList ;
	private List<Map<String,Object>> eleHisInfoList ;
	private List<Map<String,Object>> tmnlEventList ;



	private List eleFileTotalList;
	private List tmnlChangDataList ;
	private List tmnlTypeList ;
	
	private long totalCount;
	
	private Map<String,String> queryItems;
	private Map<String,String> queryFileItems;
	
	private int page = 1;
	private int limit ;
	private int start;
	@Autowired
	private TaskFlowService taskFlowService;
	
	/**
	 * 查询异常事件信息
	 * @return
	 */
	public String queryExceptEventInfo(){
		//resultList = taskFlowService.queryExceptEventInfo(queryItems);
		return SUCCESS;
	}
	
	/**
	 * 查询异常事件主表
	 * @return
	 */
	public String queryTaskFlow(){
		Page<Map<String,Object>> p = new Page<Map<String,Object>>();
		p.setCurrentPage(page);
		p.setSize(limit);
		
//		Page<Map<String,Object>> page1 = 
		taskFlowService.queryTaskFlow(p,queryItems);
		resultList=p.getResult();
		totalCount=p.getTotal();
		return SUCCESS;
	}
	
	/**
	 * 查询统计信息
	 * @return
	 */
	public String queryEleAbnormalTotalList(){
		try {
			eleStattisTotalList=taskFlowService.queryEleAbnormalTotalList(queryItems);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}
	
	/**
	 * 查询异常信息-投运终端无配置任务，调试失败时间超期
	 * @return
	 */
	public String queryAbnormal(){
		
		try {
			Page<Map<String,Object>> p = new Page<Map<String,Object>>();
			p.setCurrentPage(page);
			p.setSize(limit);
			taskFlowService.queryAbnormal(p,queryItems);
			abnormalList=p.getResult();
			totalCount=p.getTotal();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	
	/**
	 * 查询异常信息-终端时钟不对
	 * @return
	 */
	public String queryTmnlCheckClock(){

		try {
			Page<Map<String,Object>> p = new Page<Map<String,Object>>();
			p.setCurrentPage(page);
			p.setSize(limit);
			taskFlowService.queryTmnlCheckClock(p,queryItems);
			tmnlCheckClockList=p.getResult();
			totalCount=p.getTotal();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}
	/**
	 * 查询异常信息-测量点参数与主站不一致
	 * @return
	 */

	public String queryTmnlParam(){
		
		try {
			Page<Map<String,Object>> p = new Page<Map<String,Object>>();
			p.setCurrentPage(page);
			p.setSize(limit);
			taskFlowService.queryTmnlParam(p,queryItems);
			tmnlParamList=p.getResult();
			totalCount=p.getTotal();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	/**
	 * 查询异常信息-告警或报文过多-报文信息
	 * @return
	 */
	
	public String queryTmnlMsgLog(){
		
		try {
			Page<Map<String,Object>> p = new Page<Map<String,Object>>();
			p.setCurrentPage(page);
			p.setSize(limit);
			taskFlowService.queryTmnlMsgLog(p,queryItems);
			tmnlMsgLogList=p.getResult();
			totalCount=p.getTotal();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	
	/**
	 * 查询异常信息-告警或报文过多-终端事件信息
	 * @return
	 */
	
	public String queryTmnlEvent(){
		
		try {
			Page<Map<String,Object>> p = new Page<Map<String,Object>>();
			p.setCurrentPage(page);
			p.setSize(limit);
			taskFlowService.queryTmnlEvent(p,queryItems);
			tmnlEventList=p.getResult();
			totalCount=p.getTotal();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	/**
	 * 查询异常信息-昨日终端与主站无通信
	 * @return
	 */
	
	public String queryMpCurve(){
		
		try {
			Page<Map<String,Object>> p = new Page<Map<String,Object>>();
			p.setCurrentPage(page);
			p.setSize(limit);
			taskFlowService.queryMpCurve(p,queryItems);
			mpCurveList=p.getResult();
			totalCount=p.getTotal();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	/**
	 * 查询异常信息-终端连续N天抄表失败
	 * @return
	 */
	
	public String queryTmnlCopyFailure(){
		
		try {
			Page<Map<String,Object>> p = new Page<Map<String,Object>>();
			p.setCurrentPage(page);
			p.setSize(limit);
			taskFlowService.queryTmnlCopyFailure(p,queryItems);
			tmnlCopyFailureList=p.getResult();
			totalCount=p.getTotal();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	
	/**
	 * 查询异常信息-终端停运但上报负荷
	 * @return
	 */
	
	public String queryTmnlStop(){
		
		try {
			Page<Map<String,Object>> p = new Page<Map<String,Object>>();
			p.setCurrentPage(page);
			p.setSize(limit);
			taskFlowService.queryTmnlStop(p,queryItems);
			tmnlStopList=p.getResult();
			totalCount=p.getTotal();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	/**
	 * 查询异常信息-终端数据突变
	 * @return
	 */
	
	public String queryTmnlChangData(){
		
		try {

			tmnlChangDataList = taskFlowService.queryTmnlChangData(queryItems);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	
	public String queryTmnlType(){
		
		try {
			
			tmnlTypeList = taskFlowService.queryTmnlType();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}
	
	/**
	 * 查询档案信息
	 * @return
	 */
	public String queryFileTotalList(){
		eleFileTotalList=taskFlowService.queryFileTotalList(queryFileItems);	
		return SUCCESS;
	}

	/**
	 * 查询异常事件历史信息
	 * @return
	 */
	public String queryAlarmAnalyseHisInfo(){
		Page<Map<String,Object>> p = new Page<Map<String,Object>>();
		p.setCurrentPage(page);
		p.setSize(limit);
		Page<Map<String,Object>> page = taskFlowService.queryAlarmAnalyseHisInfo(p,queryItems);
		eleHisInfoList=page.getResult();
		totalCount=page.getTotal();
		return SUCCESS;
	}
	
	public List<Map<String, Object>> getResultList() {
		return resultList;
	}

	public long getTotalCount() {
		return totalCount;
	}

	public Map<String, String> getQueryItems() {
		return queryItems;
	}

	public void setQueryItems(Map<String, String> queryItems) {
		this.queryItems = queryItems;
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

	public List<Map<String, Object>> getResultList2() {
		return resultList2;
	}

	public List getEleStattisTotalList() {
		return eleStattisTotalList;
	}

	public void setEleStattisTotalList(List eleStattisTotalList) {
		this.eleStattisTotalList = eleStattisTotalList;
	}

	public List<Map<String, Object>> getAbnormalList() {
		return abnormalList;
	}

	public void setAbnormalList(List<Map<String, Object>> abnormalList) {
		this.abnormalList = abnormalList;
	}

	public List<Map<String, Object>> getTmnlCheckClockList() {
		return tmnlCheckClockList;
	}

	public void setTmnlCheckClockList(List<Map<String, Object>> tmnlCheckClockList) {
		this.tmnlCheckClockList = tmnlCheckClockList;
	}

	public List<Map<String, Object>> getTmnlParamList() {
		return tmnlParamList;
	}

	public void setTmnlParamList(List<Map<String, Object>> tmnlParamList) {
		this.tmnlParamList = tmnlParamList;
	}

	public List<Map<String, Object>> getTmnlMsgLogList() {
		return tmnlMsgLogList;
	}

	public void setTmnlMsgLogList(List<Map<String, Object>> tmnlMsgLogList) {
		this.tmnlMsgLogList = tmnlMsgLogList;
	}

	public List<Map<String, Object>> getMpCurveList() {
		return mpCurveList;
	}

	public void setMpCurveList(List<Map<String, Object>> mpCurveList) {
		this.mpCurveList = mpCurveList;
	}

	public List<Map<String, Object>> getTmnlCopyFailureList() {
		return tmnlCopyFailureList;
	}

	public void setTmnlCopyFailureList(List<Map<String, Object>> tmnlCopyFailureList) {
		this.tmnlCopyFailureList = tmnlCopyFailureList;
	}

	public List<Map<String, Object>> getTmnlStopList() {
		return tmnlStopList;
	}

	public void setTmnlStopList(List<Map<String, Object>> tmnlStopList) {
		this.tmnlStopList = tmnlStopList;
	}

	public List<Map<String, Object>> getTmnlChangDataList() {
		return tmnlChangDataList;
	}

	public void setTmnlChangDataList(List<Map<String, Object>> tmnlChangDataList) {
		this.tmnlChangDataList = tmnlChangDataList;
	}

	public List getTmnlTypeList() {
		return tmnlTypeList;
	}

	public void setTmnlTypeList(List tmnlTypeList) {
		this.tmnlTypeList = tmnlTypeList;
	}

	public List<Map<String, Object>> getEleHisInfoList() {
		return eleHisInfoList;
	}

	public void setEleHisInfoList(List<Map<String, Object>> eleHisInfoList) {
		this.eleHisInfoList = eleHisInfoList;
	}

	public List getEleFileTotalList() {
		return eleFileTotalList;
	}

	public void setEleFileTotalList(List eleFileTotalList) {
		this.eleFileTotalList = eleFileTotalList;
	}

	public Map<String, String> getQueryFileItems() {
		return queryFileItems;
	}

	public void setQueryFileItems(Map<String, String> queryFileItems) {
		this.queryFileItems = queryFileItems;
	}
	
	public List<Map<String, Object>> getTmnlEventList() {
		return tmnlEventList;
	}

	public void setTmnlEventList(List<Map<String, Object>> tmnlEventList) {
		this.tmnlEventList = tmnlEventList;
	}

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
