package com.nari.demo.action;

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

import com.nari.common.mybatis.pagination.Page;
import com.nari.demo.service.AccountService;
import com.nari.omid.domain.Account;
import com.opensymphony.xwork2.ActionSupport;


@ParentPackage("baseJson")
@Namespace("/")
@Action("helloAction")
@Results({@Result(name="success",type="json"),@Result(name="input",type="json")})
//@Results({@Result(name="success",location="/userList.jsp"),@Result(name="input",location="/index.jsp")})
public class HelloAction extends ActionSupport {
	
	private static Logger logger = Logger.getLogger(HelloAction.class);
	
	@Autowired
	private AccountService accountService;
	
	private String s;
	private int page = 1;
	private int limit ;
	
	private List<Map<String,Object>> list;
	private long totalCount;
	
	public String execute() throws Exception {
		s = "hello world";
		int i = 1/0;
		return SUCCESS;
	}
	
	public String hello(){
//		s = "test world";
		Account account = accountService.getAccount("j2ee");
		s = account.getEmail();
		return INPUT;
	}
	
	public String queryUser(){
		Page<Map<String,Object>> p = new Page<Map<String,Object>>();
		
		p.setCurrentPage(page);
		p.setSize(limit);
		
		Map m = new HashMap ();
		m.put("username", "zhang");
		m.put("password", "123456");
		p = accountService.getPageUser(p,m);
		
		list = p.getResult();
		totalCount = p.getTotal();
		
		return SUCCESS;
	}

	public String getS() {
		return s;
	}

	public void setS(String s) {
		this.s = s;
	}

	public List<Map<String, Object>> getList() {
		return list;
	}

	public void setList(List<Map<String, Object>> list) {
		this.list = list;
	}

	public long getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(long totalCount) {
		this.totalCount = totalCount;
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
}
