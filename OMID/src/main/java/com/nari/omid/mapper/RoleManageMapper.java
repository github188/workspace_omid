package com.nari.omid.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.nari.common.dao.mybatis.BaseMapper;
import com.nari.common.mybatis.pagination.Page;
import com.nari.common.mybatis.pagination.PageInterceptor;
import com.nari.sysman.model.PAccessRole;

public interface RoleManageMapper extends BaseMapper<Map>{
	List<Map<String,Object>> queryPRole(String orgNo);
	Page<Map<String,Object>> queryPSysUser(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map map);
	List<Map<String,Object>> queryVwRoleAttr();
	List<Map<String,Object>> queryOOrg();
	Integer insertPRole(Map paramMap);
	Integer updatePRole(Map paramMap);
	Integer savePAccessRole(@Param("list")List<PAccessRole> list);
	List<Map<String,Object>> queryRowByStaffNo(Map paramMap);
	Integer deletePAccessRole(String staffNo);
	Integer deletePRole(Map paramMap);
	Integer deletePAccessRoleByRoleId(Map map);
	Integer deletePAccessRoleByStaffno(Map<String,Object> map);
	
	
	List<Map<String,Object>> findPSysUserByOrgNo(String orgNo);
}
