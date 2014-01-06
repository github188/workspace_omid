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
	private long totalCount;
	
	private Map<String,String> queryItems;
	
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
			System.out.println(" in method queryEleAbnormalTotalList-->"+eleStattisTotalList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}
	
	/**
	 * 查询异常信息
	 * @return
	 */
	public String queryAbnormal(){
		System.out.println(" in method queryAbnormal-->"+abnormalList);
		
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
	
	
	
	
}
