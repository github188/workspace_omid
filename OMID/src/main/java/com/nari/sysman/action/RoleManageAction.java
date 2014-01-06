package com.nari.sysman.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.nari.common.action.BaseAction;
import com.nari.common.mybatis.pagination.Page;
import com.nari.common.util.StringUtil;
import com.nari.sysman.service.RoleManageService;

@ParentPackage("baseJson")
@Namespace("/sysman")
@Action("roleManageAction")
@Results({@Result(name="success",type="json")})
public class RoleManageAction extends BaseAction{
	@Autowired
	private RoleManageService roleManageService;
	
	private int page = 1;
	private int limit ;
	private String roleId;
	private String roleName;
	private String roleAttr;
	private String roleLevel;
	private String staffNo;
	private String roleIds;
	private String staffName;
	
	private List<Map<String,Object>> roleList;
	private List<Map<String,Object>> roleAttrList;
	private List<Map<String,Object>> operatorList;
	private long operatorTotalCount;
	private List<Map<String,Object>> oOrgList;
	private String savePRoleStatus;
    private String savePAccessRoleStatus;
    private String rowIds;
    private String deletePRoleStatus;
	
	private static Logger logger = Logger.getLogger(RoleManageAction.class);
	
	public String queryPRole(){
		String orgNo = this.getPSysUser().getOrgNo();
		roleList = roleManageService.queryPRole(orgNo);
		return SUCCESS;
	}
	
	public String queryPSysUser(){
		Page<Map<String,Object>> p = new Page<Map<String,Object>>();
		p.setCurrentPage(page);
		p.setSize(limit);
		Map<String,String> map = new HashMap<String,String>();
		map.put("STAFF_NO", StringUtil.removeNull(staffNo));
		map.put("STAFF_NAME", StringUtil.removeNull(staffName));
		map.put("roleId", StringUtil.removeNull(roleId));
		p = roleManageService.queryPSysUser(p,map);
		operatorList = p.getResult();
		operatorTotalCount = p.getTotal();
		return SUCCESS;
	}
	
	public String queryPSysUserByOrgNo(){
		String orgNo = this.getPSysUser().getOrgNo();
		operatorList = roleManageService.getPSysUserByOrgNo(orgNo);
		return SUCCESS;
	}
	
	public String queryVwRoleAttr(){
		roleAttrList = roleManageService.queryVwRoleAttr();
		return SUCCESS;
	}
	
	public String queryOOrg(){
		oOrgList = roleManageService.queryOOrg();
		return SUCCESS;
	}

	public String savePRole(){
		String orgNo = this.getPSysUser().getOrgNo();
		savePRoleStatus = roleManageService.savePRole(roleId,roleName,roleAttr,roleLevel,orgNo);
		return SUCCESS;
	}
	
	public String savePAccessRole(){
		savePAccessRoleStatus = roleManageService.savePAccessRole(roleId,staffNo);
		return SUCCESS;
	}
	
	public String queryRowByStaffNo(){
		rowIds = roleManageService.queryRowByStaffNo(staffNo);
		return SUCCESS;
	}
	
	public String deletePRole(){
		deletePRoleStatus = roleManageService.deletePRole(roleIds);
		return SUCCESS;
	}
	
	public String deletePAccessRoleByStaffno(){
		deletePRoleStatus = roleManageService.deletePAccessRoleByStaffno(staffNo);
		return SUCCESS;
	}
	
	public List<Map<String, Object>> getRoleAttrList() {
		return roleAttrList;
	}

	public void setRoleAttrList(List<Map<String, Object>> roleAttrList) {
		this.roleAttrList = roleAttrList;
	}

	public List<Map<String, Object>> getRoleList() {
		return roleList;
	}

	public void setRoleList(List<Map<String, Object>> roleList) {
		this.roleList = roleList;
	}

	public List<Map<String, Object>> getOperatorList() {
		return operatorList;
	}

	public void setOperatorList(List<Map<String, Object>> operatorList) {
		this.operatorList = operatorList;
	}

	public long getOperatorTotalCount() {
		return operatorTotalCount;
	}

	public void setOperatorTotalCount(long operatorTotalCount) {
		this.operatorTotalCount = operatorTotalCount;
	}

	public List<Map<String, Object>> getoOrgList() {
		return oOrgList;
	}

	public void setoOrgList(List<Map<String, Object>> oOrgList) {
		this.oOrgList = oOrgList;
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

	public String getRoleId() {
		return roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public String getRoleAttr() {
		return roleAttr;
	}

	public void setRoleAttr(String roleAttr) {
		this.roleAttr = roleAttr;
	}

	public String getRoleLevel() {
		return roleLevel;
	}

	public void setRoleLevel(String roleLevel) {
		this.roleLevel = roleLevel;
	}

	public String getSavePRoleStatus() {
		return savePRoleStatus;
	}

	public void setSavePRoleStatus(String savePRoleStatus) {
		this.savePRoleStatus = savePRoleStatus;
	}

	public String getStaffNo() {
		return staffNo;
	}

	public void setStaffNo(String staffNo) {
		this.staffNo = staffNo;
	}

	public String getSavePAccessRoleStatus() {
		return savePAccessRoleStatus;
	}

	public void setSavePAccessRoleStatus(String savePAccessRoleStatus) {
		this.savePAccessRoleStatus = savePAccessRoleStatus;
	}

	public String getRowIds() {
		return rowIds;
	}

	public void setRowIds(String rowIds) {
		this.rowIds = rowIds;
	}

	public String getDeletePRoleStatus() {
		return deletePRoleStatus;
	}

	public void setDeletePRoleStatus(String deletePRoleStatus) {
		this.deletePRoleStatus = deletePRoleStatus;
	}

	public String getRoleIds() {
		return roleIds;
	}

	public void setRoleIds(String roleIds) {
		this.roleIds = roleIds;
	}

	public String getStaffName() {
		return staffName;
	}

	public void setStaffName(String staffName) {
		this.staffName = staffName;
	}

}
