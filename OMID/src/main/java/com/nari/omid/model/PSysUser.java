package com.nari.omid.model;

import java.io.Serializable;
import java.util.Date;

public class PSysUser implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String staffNo;
	private String empNo;
	private String orgNo;
	private String deptNo;
	private String name;
	private String pwd;
	private String accessLevel;
	private String ip;
	private String mac;
	private String curStatusCode;
	private Date pwdRemindTime;
	private Date lockTime;
	private Date planUnlockTime;
	private Date unlockTime;
	private String lockIp;
	private String autoUnlockFlag;
	private String lockReason;
	private String unlockEmpNo;
	public String getStaffNo() {
		return staffNo;
	}
	public void setStaffNo(String staffNo) {
		this.staffNo = staffNo;
	}
	public String getEmpNo() {
		return empNo;
	}
	public void setEmpNo(String empNo) {
		this.empNo = empNo;
	}
	public String getOrgNo() {
		return orgNo;
	}
	public void setOrgNo(String orgNo) {
		this.orgNo = orgNo;
	}
	public String getDeptNo() {
		return deptNo;
	}
	public void setDeptNo(String deptNo) {
		this.deptNo = deptNo;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPwd() {
		return pwd;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	public String getAccessLevel() {
		return accessLevel;
	}
	public void setAccessLevel(String accessLevel) {
		this.accessLevel = accessLevel;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public String getMac() {
		return mac;
	}
	public void setMac(String mac) {
		this.mac = mac;
	}
	public String getCurStatusCode() {
		return curStatusCode;
	}
	public void setCurStatusCode(String curStatusCode) {
		this.curStatusCode = curStatusCode;
	}
	public Date getPwdRemindTime() {
		return pwdRemindTime;
	}
	public void setPwdRemindTime(Date pwdRemindTime) {
		this.pwdRemindTime = pwdRemindTime;
	}
	public Date getLockTime() {
		return lockTime;
	}
	public void setLockTime(Date lockTime) {
		this.lockTime = lockTime;
	}
	public Date getPlanUnlockTime() {
		return planUnlockTime;
	}
	public void setPlanUnlockTime(Date planUnlockTime) {
		this.planUnlockTime = planUnlockTime;
	}
	public Date getUnlockTime() {
		return unlockTime;
	}
	public void setUnlockTime(Date unlockTime) {
		this.unlockTime = unlockTime;
	}
	public String getLockIp() {
		return lockIp;
	}
	public void setLockIp(String lockIp) {
		this.lockIp = lockIp;
	}
	public String getAutoUnlockFlag() {
		return autoUnlockFlag;
	}
	public void setAutoUnlockFlag(String autoUnlockFlag) {
		this.autoUnlockFlag = autoUnlockFlag;
	}
	public String getLockReason() {
		return lockReason;
	}
	public void setLockReason(String lockReason) {
		this.lockReason = lockReason;
	}
	public String getUnlockEmpNo() {
		return unlockEmpNo;
	}
	public void setUnlockEmpNo(String unlockEmpNo) {
		this.unlockEmpNo = unlockEmpNo;
	}
}
