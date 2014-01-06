package com.nari.vcm.dataMining.po2;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**********大客户分析项PO*************/

/*@Entity
@Table(name="F_ANALYSE_ALARM_VCM")*/
public class Analyse_CVM {
	private String analyse_Item_ID;
	private String org_NO;
	private String status_Code;
	private Date analyse_Date;
	private String analyse_Type;
	private String cust_ID;
	private String analyse_Src;
	private String event_Level;
	private String task_ID;
	private String await_User_ID;
	private Date start_Task_Time;
	
	//@Id
	public String getAnalyse_Item_ID() {
		return analyse_Item_ID;
	}
	public void setAnalyse_Item_ID(String analyseItemID) {
		analyse_Item_ID = analyseItemID;
	}
	public String getOrg_NO() {
		return org_NO;
	}
	public void setOrg_NO(String orgNO) {
		org_NO = orgNO;
	}
	public String getStatus_Code() {
		return status_Code;
	}
	public void setStatus_Code(String statusCode) {
		status_Code = statusCode;
	}
	public Date getAnalyse_Date() {
		return analyse_Date;
	}
	public void setAnalyse_Date(Date analyseDate) {
		analyse_Date = analyseDate;
	}
	public String getAnalyse_Type() {
		return analyse_Type;
	}
	public void setAnalyse_Type(String analyseType) {
		analyse_Type = analyseType;
	}
	public String getCust_ID() {
		return cust_ID;
	}
	public void setCust_ID(String custID) {
		cust_ID = custID;
	}
	public String getAnalyse_Src() {
		return analyse_Src;
	}
	public void setAnalyse_Src(String analyseSrc) {
		analyse_Src = analyseSrc;
	}
	public String getEvent_Level() {
		return event_Level;
	}
	public void setEvent_Level(String eventLevel) {
		event_Level = eventLevel;
	}
	public String getTask_ID() {
		return task_ID;
	}
	public void setTask_ID(String taskID) {
		task_ID = taskID;
	}
	public String getAwait_User_ID() {
		return await_User_ID;
	}
	public void setAwait_User_ID(String awaitUserID) {
		await_User_ID = awaitUserID;
	}
	public Date getStart_Task_Time() {
		return start_Task_Time;
	}
	public void setStart_Task_Time(Date startTaskTime) {
		start_Task_Time = startTaskTime;
	}
	
}
