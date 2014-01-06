package com.nari.demo.action;

import java.util.List;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.nari.demo.model.TmnlExcModel;
import com.nari.demo.service.TmnlExcService;
import com.opensymphony.xwork2.ActionSupport;


@ParentPackage("json-default")
@Namespace("/")
@Action("TmnlExcAction")
@Results({@Result(name="success",type="json"),@Result(name="input",type="json"),
	@Result(name="queryTmnl",type="json")})
//@Results({@Result(name="success",location="/userList.jsp"),@Result(name="input",location="/index.jsp")})
public class TmnlExcAction extends ActionSupport {
	private List<TmnlExcModel> tmnlList;
	//private String s;
	
	private int pn;
	private int pageSize; 
	private String org_no;
	//private TmnlExcModel tmnlExcModel;
	
	public int getPn() {
		return pn;
	}

	public void setPn(int pn) {
		this.pn = pn;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	
	@Autowired
	private TmnlExcService tmnlExcService;
	
	
	

	public String execute() throws Exception {
		//s = "hello world";
		int i = 1/0;
		return SUCCESS;
	}
	
	public List<TmnlExcModel> getTmnlList() {
		return tmnlList;
	}

	public void setTmnlList(List<TmnlExcModel> tmnlList) {
		this.tmnlList = tmnlList;
	}

	public String queryTmnlExc(){
		//tmnlExcModel.setOrg_no("1");
		tmnlList=tmnlExcService.listAll();
		System.out.println("当前页数："+pn+";显示条数："+pageSize+"供电单位："+org_no);
		return SUCCESS;
	}
	public String hello(){
		//s = "test world";
		return INPUT;
	}

//	public String getS() {
//		return s;
//	}
//
//	public void setS(String s) {
//		this.s = s;
//	}
}
