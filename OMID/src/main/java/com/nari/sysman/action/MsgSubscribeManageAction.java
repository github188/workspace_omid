package com.nari.sysman.action;

import java.util.HashMap;
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
import com.nari.sysman.service.MsgSubscribeManageService;

@ParentPackage("baseJson")
@Namespace("/")
@Action("MsgSubscribeManageAction")
@Results( { @Result(name = "success", type = "json"),
		@Result(name = "input", type = "json") })
public class MsgSubscribeManageAction extends BaseAction {
	private static final long serialVersionUID = 1L;

	@Autowired
	private MsgSubscribeManageService msgSubscribeManageService;

	private List<Map<String, Object>> resultList;
	private String orgNo;
	private String subsTypeCode;
	private String sendUserLimit;
	private Map<String, String> queryItems;
	private long start;
	private int limit;
	private int page = 1;
	private List<Map<String, Object>> contactList;
	private long totalCount;
	private List<Map<String, Object>> orgList;
	private String id;
	private Integer FLAG;
	private List<String> paramList;
	private String eventSrc;
	private String msgContent; // 短信内容

	/**
	 * 查询短信模板内容
	 */
	public String querySmsTemplateContent() throws Exception {
		msgContent = msgSubscribeManageService.querySmsTemplateContent(id);
		return SUCCESS;
	}

	/**
	 * 更新短信订阅事件信息
	 */
	public String saveOrUpdateSmsSubscribeInfo() throws Exception {
		FLAG = msgSubscribeManageService.saveOrUpdateSmsSubscribeInfo(
				queryItems, JSONParser.Json2ListMapString(paramList));
		return SUCCESS;
	}

	/**
	 * 检查所选事件是否已存在于订阅中
	 */
	public String checkEventNo() throws Exception {
		try {
			String param = "";
			queryItems = new HashMap<String, String>();
			queryItems.put("id", id);

			for (int i = 0; i < paramList.size(); i++) {
				param += paramList.get(i) + ",";
			}
			param = param.substring(0, (param.length() - 1));
			queryItems.put("paramList", param);
			resultList = msgSubscribeManageService.checkEventNo(queryItems);
			FLAG = 1;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	/**
	 * 查询自定义联系人
	 * 
	 * @return
	 */
	public String querySelfDeContact() {
		try {
			resultList = msgSubscribeManageService
					.querySelfDeContact(queryItems);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	/**
	 * 查询短信模板
	 * 
	 * @return
	 * @throws Exception
	 */
	public String queryAllMsgTemplate() throws Exception {
		try {
			resultList = msgSubscribeManageService.queryAllMsgTemplate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	/**
	 * 查询异常事件
	 */
	public String queryExceptEvent() throws Exception {
		resultList = msgSubscribeManageService.queryExceptEvent();
		return SUCCESS;
	}

	/**
	 * 查询事件来源
	 */
	public String queryEventSrc() throws Exception {
		try {
			resultList = msgSubscribeManageService.queryEventSrc();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	/**
	 * 查询短信订阅事件信息
	 */
	public String querySmsScribeObj() throws Exception {
		try {
			resultList = msgSubscribeManageService.querySmsScribeObj(id);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	/**
	 * 更新短信订阅信息
	 * 
	 * @return
	 * @throws Exception
	 */
	public String updateSmsSubscribeInfo() throws Exception {
		try {
			FLAG = msgSubscribeManageService.updateSmsSubscribeInfo(queryItems);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	/**
	 * 注销短信订阅信息
	 * 
	 * @return
	 * @throws Exception
	 */
	public String cancelMsgSub() throws Exception {
		FLAG = msgSubscribeManageService.cancelMsgSub(id);
		return SUCCESS;
	}

	/**
	 * 查询短信订阅信息 点击‘查询’按钮，所触发的方法。
	 * 
	 * @return
	 * @throws Exception
	 */
	public String querySmsScribeInfo() throws Exception {
		try {
			resultList = msgSubscribeManageService
					.querySmsScribeInfo(queryItems);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	/**
	 * 查询订阅类型
	 * 
	 * @return
	 */
	public String querySubsType() {
		resultList = msgSubscribeManageService.querySubsType();
		return SUCCESS;
	}

	/**
	 * 查询供电单位
	 */
	public String queryOrgNolist() {
		orgList = msgSubscribeManageService.getOrgNo(orgNo);
		return SUCCESS;
	}

	/**
	 * 删除短信订阅事件
	 * 
	 * @return
	 * @throws Exception
	 */
	public String deleteEventSub() {
		FLAG = msgSubscribeManageService.deleteEventSub(id);
		return SUCCESS;
	}

	/**
	 * 查询指定发送用户
	 * 
	 * @return
	 */
	public String querySmsSendObj() {
		try {
			resultList = msgSubscribeManageService.querySmsSendObj(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	/**
	 * 查询主站联系人
	 * 
	 * @return
	 */
	public String queryStatContact() {
		try {
			resultList = msgSubscribeManageService.queryStatContact(queryItems);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	/**
	 * 查询用户联系人
	 * 
	 * @return
	 */
	public String queryConsContact() {
		Page<Map<String, Object>> p = new Page<Map<String, Object>>();
		p.setCurrentPage(page);
		p.setSize(limit);
		resultList = msgSubscribeManageService.queryConsContact(p, queryItems);
		resultList = p.getResult();
		totalCount = p.getTotal();
		return SUCCESS;
	}

	public Integer getFLAG() {
		return FLAG;
	}

	public void setFLAG(Integer fLAG) {
		FLAG = fLAG;
	}

	public String getOrgNo() {
		return orgNo;
	}

	public void setOrgNo(String orgNo) {
		this.orgNo = orgNo;
	}

	public String getSubsTypeCode() {
		return subsTypeCode;
	}

	public void setSubsTypeCode(String subsTypeCode) {
		this.subsTypeCode = subsTypeCode;
	}

	public String getSendUserLimit() {
		return sendUserLimit;
	}

	public void setSendUserLimit(String sendUserLimit) {
		this.sendUserLimit = sendUserLimit;
	}

	public long getStart() {
		return start;
	}

	public void setStart(long start) {
		this.start = start;
	}

	public List<Map<String, Object>> getContactList() {
		return contactList;
	}

	public void setContactList(List<Map<String, Object>> contactList) {
		this.contactList = contactList;
	}

	public long getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(long totalCount) {
		this.totalCount = totalCount;
	}

	public List<Map<String, Object>> getResultList() {
		return resultList;
	}

	public void setResultList(List<Map<String, Object>> resultList) {
		this.resultList = resultList;
	}

	public List<Map<String, Object>> getOrgList() {
		return orgList;
	}

	public void setOrgList(List<Map<String, Object>> orgList) {
		this.orgList = orgList;
	}

	public Map<String, String> getQueryItems() {
		return queryItems;
	}

	public void setQueryItems(Map<String, String> queryItems) {
		this.queryItems = queryItems;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public List<String> getParamList() {
		return paramList;
	}

	public void setParamList(List<String> paramList) {
		this.paramList = paramList;
	}

	public String getEventSrc() {
		return eventSrc;
	}

	public void setEventSrc(String eventSrc) {
		this.eventSrc = eventSrc;
	}

	public String getMsgContent() {
		return msgContent;
	}

	public void setMsgContent(String msgContent) {
		this.msgContent = msgContent;
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

}
