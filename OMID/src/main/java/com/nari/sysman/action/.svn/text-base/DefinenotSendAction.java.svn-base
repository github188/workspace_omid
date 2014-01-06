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
import com.nari.sysman.service.DefinenotSendService;
import com.nari.sysman.util.JSONParser;

@ParentPackage("baseJson")
@Namespace("/")
@Action("DefinenotSendAction")
@Results({@Result(name="success",type="json"),
@Result(name="input",type="json")})
public class DefinenotSendAction extends BaseAction{
 @Autowired
 private DefinenotSendService definenotSendService;
 private List<Map<String,Object>> resultList;
 private Map<String,String> queryItems;
 private int page = 1;
 private int limit ;
 private int start;
 private long totalCount;
 private Integer Flag;
 private List consList;
 private String msgContent;
 private List orgList;
 private String orgNo;
	/**
	 * 查询联系人信息
	 * @param queryItems
	 * @return
	 */
	 public String qureyList(){
		 Page<Map<String,Object>>  p=new Page<Map<String,Object>>();
		 p.setCurrentPage(page);
		 p.setSize(limit);
	  	Page<Map<String,Object>> page=definenotSendService.qureyList(p,queryItems);
		 resultList=page.getResult();
		 totalCount=page.getTotal();
		return SUCCESS;
	 }
	 /**
		 * 增加联系人信息
		 * @param queryItems
		 * @return
		 */
	 public String addManage(){
		 Flag=definenotSendService.addManage(queryItems);
		 return SUCCESS;
	 }
	 /**
		 * 修改联系人信息
		 * @param queryItems
		 * @return
		 */
	 public String updateManage(){
		  Flag=definenotSendService.updateManage(queryItems);
		 return SUCCESS;
	 }
	 /**
		 * 删除联系人信息
		 * @param queryItems
		 * @return
		 */
	 public String deleteManage(){
		  Flag=definenotSendService.deleteManage(queryItems);
		 return SUCCESS;
	 }
		/**
		 * 发送自定义短信
		 * @return
		 * @throws Exception
		 */
		public String sendSelfDeMsg()throws Exception{
			if(consList==null||consList.size()<=0||(consList.size()==1 && "".equals(consList.get(0))))
				return SUCCESS;
			definenotSendService.sendSelfDeMsg(JSONParser.Json2ListMapString(consList), msgContent);
			this.Flag=1;
			return SUCCESS;
		}
		/**
		 * 短信发送查询
		 * @return
		 * @throws Exception
		 */
	 public String msgSendQuery(){
		String  start1=queryItems.get("start_Time");
		 String start2=queryItems.get("end_Time");
		 queryItems.put("start_Time", start1.substring(0, 10)) ;
		 queryItems.put("end_Time", start2.substring(0, 10)) ;
		 Page<Map<String,Object>>  p=new Page<Map<String,Object>>();
		 p.setCurrentPage(page);
		 p.setSize(limit);
		 Page<Map<String,Object>> page=definenotSendService.msgSendQuery(p, queryItems);
	    resultList=page.getResult();
		totalCount=page.getTotal();
		return SUCCESS;
		 
	 }
		/**
		 * 查询供电公司
		 * @return
		 * @throws Exception
		 */
	 public String queryOrgNolist(){
		 orgList=definenotSendService.queryOrgNolist(orgNo);
		 return SUCCESS;
	 }
	
	public List<Map<String,Object>> getResultList() {
		return resultList;
	}
  

	public void setResultList(List<Map<String,Object>> resultList) {
		this.resultList = resultList;
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
	public Integer getFlag() {
		return Flag;
	}
	public void setFlag(Integer flag) {
		Flag = flag;
	}
	public List getConsList() {
		return consList;
	}
	public void setConsList(List consList) {
		this.consList = consList;
	}
	public String getMsgContent() {
		return msgContent;
	}
	public void setMsgContent(String msgContent) {
		this.msgContent = msgContent;
	}
	public List getOrgList() {
		return orgList;
	}
	public void setOrgList(List orgList) {
		this.orgList = orgList;
	}
	public String getOrgNo() {
		return orgNo;
	}
	public void setOrgNo(String orgNo) {
		this.orgNo = orgNo;
	}
    
	

}
