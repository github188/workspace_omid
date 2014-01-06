package com.nari.demo.action;

import java.util.List;

import org.apache.log4j.Logger;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;

import com.nari.common.action.BaseAction;
import com.nari.demo.model.UserModel;
import com.nari.demo.service.UserService;

//@ParentPackage("test")
//@Namespace("/")
//@ParentPackage("json-default")
//@ParentPackage("struts-default")
//@Action(value="userAction",results={@Result(name="success",type="json")})
//@Action(value="userAction")
//@Result(name="success",type="json")
//@Result(name="success",location="/userList.jsp")
//@Action(value="userAction",results={@Result(name="success",location="/userList.jsp")})
public class UserAction extends BaseAction {
	private static final Logger logger = Logger.getLogger(UserAction.class);
	
//	private UserService userService;
//
//	
//	private List<UserModel> list ;
//	
//	public String queryUser(){
//		list = userService.listAll();
//		return SUCCESS;
//	}
//	
//	@Autowired
//	public void setUserService(UserService userService) {
//		this.userService = userService;
//	}
//
//
//	public List<UserModel> getList() {
//		return list;
//	}
//
//	public void setList(List<UserModel> list) {
//		this.list = list;
//	}
	
}
