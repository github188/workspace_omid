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
import com.nari.omid.model.PSysUser;
import com.nari.sysman.service.LoginService;
import com.opensymphony.xwork2.ActionContext;

@ParentPackage("baseJson")
@Action("login")
@Results({@Result(name="success",type="json")})
public class LoginAction extends BaseAction{

	private String staffno;
	
	private int isLogin;
	@Autowired
	private LoginService loginService;
	@Override
	public String execute() throws Exception {
		
		List<PSysUser> list = loginService.login(staffno);
		if(list.isEmpty()){
			isLogin = 0;
		}else{
			isLogin = 1;
			Map session = ActionContext.getContext().getSession();
			session.put("pSysUser", list.get(0));
		}
		
		return SUCCESS;
	}
	public int getIsLogin() {
		return isLogin;
	}
	public void setIsLogin(int isLogin) {
		this.isLogin = isLogin;
	}
	public String getStaffno() {
		return staffno;
	}
	public void setStaffno(String staffno) {
		this.staffno = staffno;
	}
}
