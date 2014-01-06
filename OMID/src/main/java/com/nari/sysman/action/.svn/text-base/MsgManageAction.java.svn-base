package com.nari.sysman.action;

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
import com.nari.common.util.JSONParser;
import com.nari.sysman.service.MsgManageService;

@ParentPackage("baseJson")
@Namespace("/")
@Action("MsgManageAction")
@Results({@Result(name="success",type="json"),
@Result(name="input",type="json")})
public class MsgManageAction extends BaseAction{
	private List<Map<String,Object>> resultList ;
	
	private Map<String,String> queryItems;
	private int page = 1;
	private int limit ;
	private int start;
	private long totalCount;
	@Autowired
	private MsgManageService msgManageService;
	private List<String> paramList;
	
	private Integer FLAG;
	/**
	 * 查询供电单位名称
	 * @return
	 */
	public String queryOOrgByOrgNo(){	
		resultList = msgManageService.queryOOrgByOrgNo(queryItems);
		return SUCCESS;
	}
	
	/**
	 * 查询订阅类型
	 * @return
	 */
	public String querySubsType(){
		resultList=msgManageService.querySubsType();
		return SUCCESS;
	}
	/**
	 * 查询事件来源
	 * @return
	 */
	public String queryEventSrc(){
		resultList=msgManageService.queryEventSrc();
		return SUCCESS;
	}
	
	/**
	 * 查询异常类型
	 * @return
	 */
	public String queryExceptEvent(){
		resultList=msgManageService.queryExceptEvent();
		return SUCCESS;
	}
	
	/**
	 * 查询短信模板名称
	 * @return
	 */
	public String queryAllMsgTemplate(){
		resultList=msgManageService.queryAllMsgTemplate();
		return SUCCESS;
	}
	
	
	/**
	 * 查询主站联系人
	 * @return
	 */
	public String queryStatContact(){
		Page<Map<String,Object>> p = new Page<Map<String,Object>>();
		p.setCurrentPage(page);
		p.setSize(limit);

		msgManageService.queryStatContact(p, queryItems);
		resultList=p.getResult();
		totalCount=p.getTotal();
		return SUCCESS;
	}
	
	/**
	 * 查询自定义联系人
	 * @return
	 */
	public String querySelfDeContact(){
		Page<Map<String,Object>> p = new Page<Map<String,Object>>();
		p.setCurrentPage(page);
		p.setSize(limit);

		msgManageService.querySelfDeContact(p, queryItems);
		resultList=p.getResult();
		totalCount=p.getTotal();
		return SUCCESS;
	}
	
	/**
	 * 查询用户联系人
	 * @return
	 */
	public String queryConsContact(){
		Page<Map<String,Object>> p = new Page<Map<String,Object>>();
		p.setCurrentPage(page);
		p.setSize(limit);

		msgManageService.queryConsContact(p, queryItems);
		resultList=p.getResult();
		totalCount=p.getTotal();
		return SUCCESS;
	}
	
	/**
	 * 保存短信订阅信息
	 * @return
	 * @throws Exception
	 */
	public String saveSmsSubscribeInfo(){
		FLAG=msgManageService.saveSmsSubscribeInfo(queryItems,JSONParser.Json2ListMapString(paramList));
		return SUCCESS;
	}
	
	public List<Map<String, Object>> getResultList() {
		return resultList;
	}

	public void setQueryItems(Map<String, String> queryItems) {
		this.queryItems = queryItems;
	}

	public Map<String, String> getQueryItems() {
		return queryItems;
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

	public long getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(long totalCount) {
		this.totalCount = totalCount;
	}

	public List<String> getParamList() {
		return paramList;
	}

	public void setParamList(List<String> paramList) {
		this.paramList = paramList;
	}

	public Integer getFLAG() {
		return FLAG;
	}
	
	
}
