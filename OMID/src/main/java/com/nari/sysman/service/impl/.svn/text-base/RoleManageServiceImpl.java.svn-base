package com.nari.sysman.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nari.common.mybatis.pagination.Page;
import com.nari.common.util.StringUtil;
import com.nari.omid.mapper.RoleManageMapper;
import com.nari.sysman.model.PAccessRole;
import com.nari.sysman.service.RoleManageService;

@Service("RoleManageService")
public class RoleManageServiceImpl implements RoleManageService{

	@Autowired
	private RoleManageMapper roleManageMapper;
	public List<Map<String,Object>> queryPRole(String orgNo){
		return roleManageMapper.queryPRole(orgNo);
	}
	
	public Page<Map<String,Object>> queryPSysUser(Page<Map<String,Object>> p,Map<String,String> map){
		return roleManageMapper.queryPSysUser(p,map);
	}
	
	public List<Map<String,Object>> queryVwRoleAttr(){
		return roleManageMapper.queryVwRoleAttr();
	}
	
	public List<Map<String,Object>> queryOOrg(){
		return roleManageMapper.queryOOrg();
	}
	
	public String savePRole(String roleId,String roleName,String roleAttr,String roleLevel,String orgNo){
		try{
			Map<String,String> param = new HashMap<String,String>();
			param.put("ROLE_ID", StringUtil.removeNull(roleId));
			param.put("ROLE_NAME", StringUtil.removeNull(roleName));
			param.put("ROLE_ATTR", StringUtil.removeNull(roleAttr));
			param.put("ROLE_LEVEL", StringUtil.removeNull(roleLevel));
			param.put("orgNo", orgNo);
			if("".equals(param.get("ROLE_ID"))){
				roleManageMapper.insertPRole(param);
			}else{
				roleManageMapper.updatePRole(param);
			}
			return "success";
		}catch(Exception e){
			e.printStackTrace();
			return "保存失败";
		}
	}
	
	public String savePAccessRole(String roleId,String staffNo){
		try{
			List pAccessRoleList = new ArrayList();
			String[] staffNoArray = staffNo.split(",");
			for(int i = 0 ; i < staffNoArray.length ; i++){
				PAccessRole p = new PAccessRole();
				p.setRoleId(roleId);
				p.setStaffNo(staffNoArray[i].trim());
				pAccessRoleList.add(p);
			}
			roleManageMapper.savePAccessRole(pAccessRoleList);
			return "success";
		}catch(Exception e){
			e.printStackTrace();
			return "保存失败";
		}
	}
	
	public String queryRowByStaffNo(String staffNo){
		try{
			String ret = "";
			Map<String,String> param = new HashMap<String,String>();
			param.put("STAFF_NO", StringUtil.removeNull(staffNo));
			List<Map<String,Object>> list = roleManageMapper.queryRowByStaffNo(param);
			if(list!=null && list.size()>0){
				for(int i=0;i<list.size();i++){
					String rowNum = String.valueOf(list.get(i).get("ROWNUMBER"));
					if(i==0)
					ret = rowNum;
					else
					ret = ret + "," + rowNum;
				}
				
			}
			return ret;
		}catch(Exception e){
			e.printStackTrace();
			return "";
		}
	}
	
	public String deletePRole(String roleIds){
		try{
			List roleIdList = new ArrayList();
			String[] roleIdArray = roleIds.split(",");
			if(roleIdArray!=null && roleIdArray.length>0){
				for(int i=0;i<roleIdArray.length;i++){
					roleIdList.add(roleIdArray[i]);
				}
			}
			Map paramMap=new HashMap();
			paramMap.put("ROLE_ID", roleIdList);
			roleManageMapper.deletePRole(paramMap);
			roleManageMapper.deletePAccessRoleByRoleId(paramMap);
			return "success";
		}catch(Exception e){
			e.printStackTrace();
			return "删除失败";
		}
	}
	
	public List<Map<String,Object>> getPSysUserByOrgNo(String orgNo){
		return this.roleManageMapper.findPSysUserByOrgNo(orgNo);
	}
	
	public String deletePAccessRoleByStaffno(String staffnos){
		try {
			List<String> staffnoList = new ArrayList<String>();
			String[] staffnoArray = staffnos.split(",");
			for(int i = 0 ; i < staffnoArray.length ; i++){
				staffnoList.add(staffnoArray[i].trim());
			}
			Map<String,Object> paramMap = new HashMap<String, Object>();
			paramMap.put("staffnos", staffnoList);
			roleManageMapper.deletePAccessRoleByStaffno(paramMap);
			return "success";
		} catch (Exception e) {
			e.printStackTrace();
			return "删除失败";
		}
		
	}
}
