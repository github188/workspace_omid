package com.nari.sysman.service;

import java.util.List;
import java.util.Map;

import com.nari.common.mybatis.pagination.Page;

public interface RoleManageService {
	List<Map<String,Object>> queryPRole(String orgNo);
	Page<Map<String,Object>> queryPSysUser(Page<Map<String,Object>> p,Map<String,String> map);
	List<Map<String,Object>> queryVwRoleAttr();
	List<Map<String,Object>> queryOOrg();
	String savePRole(String roleId,String roleName,String roleAttr,String roleLevel,String orgNo);
	String savePAccessRole(String roleId,String staffNo);
	String queryRowByStaffNo(String staffNo);
	String deletePRole(String roleIds);
	List<Map<String,Object>> getPSysUserByOrgNo(String orgNo);
	String deletePAccessRoleByStaffno(String staffnos);
}
