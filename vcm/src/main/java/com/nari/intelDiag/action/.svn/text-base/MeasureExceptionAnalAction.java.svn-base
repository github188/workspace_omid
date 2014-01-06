package com.nari.intelDiag.action;

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
import com.nari.intelDiag.service.MeasureExceptionAnalService;


@ParentPackage("baseJson")
@Namespace("/")
@Action("measureExceptionAnalAction")
@Results({@Result(name="success",type="json"),
@Result(name="input",type="json")})
public class MeasureExceptionAnalAction extends BaseAction {

	private List<Map<String,Object>> resultList ;
	private List<Map<String,Object>> resultList2 ; //备用结果集
	private long totalCount;
	
	private Map<String,String> queryItems;
	
	private int page = 1;
	private int limit ;
	private int start;
	@Autowired
	private MeasureExceptionAnalService measureExceptionAnalService;
	
	/**
	 * 查询异常事件信息
	 * @return
	 */
	public String queryExceptEventInfo(){
		//resultList = measureExceptionAnalService.queryExceptEventInfo(queryItems);
		return SUCCESS;
	}
	
	/**
	 * 查询异常事件主表
	 * @return
	 */
	public String queryAlarmAnalyseInfo(){
		Page<Map<String,Object>> p = new Page<Map<String,Object>>();
		p.setCurrentPage(page);
		p.setSize(limit);
		
//		Page<Map<String,Object>> page1 = 
		measureExceptionAnalService.queryAlarmAnalyseInfo(p,queryItems);
		resultList=p.getResult();
		totalCount=p.getTotal();
		return SUCCESS;
	}
	
	/**
	 * 查询断缺相信息
	 * @return
	 */
	public String queryBLPhaseInfo(){
		resultList=measureExceptionAnalService.queryBLPhaseInfo(queryItems);
		return SUCCESS;
	}
	
	/**
	 * 查询电能表事件
	 * @return
	 */
	public String queryMeterEvent(){
		resultList= measureExceptionAnalService.queryMeterEvent(queryItems);
		return SUCCESS;
	}
	
	/**
	 * 查询电能表事件记录
	 * @return
	 */
	public String queryEleMeterEventRec(){
		resultList = measureExceptionAnalService.queryEleMeterEventRec(queryItems);
		return SUCCESS;
	}
	
	/**
	 * 查询电能表明细
	 * @return
	 */
	public String queryMeterEventDetail(){
		resultList = measureExceptionAnalService.queryMeterEventDetail(queryItems);
		return SUCCESS;
	}
	
	/**
	 * 查询电能表事件记录明细
	 * @return
	 */
	public String queryMeterEventRecDetail(){
		resultList=measureExceptionAnalService.queryMeterEventRecDetail(queryItems);
		return SUCCESS;
	}
	
	/**
	 * 查询电表正反向有功电能示值\电表正反向有功各费率
	 * @return
	 */
	public String queryeMpDayRead(){
		resultList=measureExceptionAnalService.queryeMpDayRead(queryItems);
		return SUCCESS;
	}
	
	/**
	 * 查询电能表飞走和突变相关信息
	 * @return
	 */
	public String queryMeterFlyInfo(){
		resultList=measureExceptionAnalService.queryaCalcDayPower(queryItems);
		if(queryItems.get("consType").equals("1")){
			//System.out.println(queryItems.get("meterId")+"11111111111111111111111111111111111");
			resultList2 = measureExceptionAnalService.queryBLPhaseInfo(queryItems);
		}
		return SUCCESS;
	}
	
	/**
	 * 查询反向有功示值大于0相关信息
	 * @return
	 */
	public String queryRapExceptInfo(){
		if(queryItems.get("dataTime1").equals("")){

			resultList=measureExceptionAnalService.queryeMpDayRead(queryItems);
			if(queryItems.get("consType").equals("1")){
				resultList2 = measureExceptionAnalService.queryBLPhaseInfo(queryItems);
			}
		}
	   else{
		String datat1=queryItems.get("dataTime1").toString();
		String datat2=queryItems.get("dataTime2").toString();
		queryItems.put("dataTime1",datat1);
		queryItems.put("dataTime2",datat2);
		resultList=measureExceptionAnalService.queryeMpDayRead(queryItems);
		if(queryItems.get("consType").equals("1")){
			resultList2 = measureExceptionAnalService.queryBLPhaseInfo(queryItems);
		  }
		}
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
	
}
