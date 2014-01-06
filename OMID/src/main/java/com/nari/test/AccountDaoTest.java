package com.nari.test;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.nari.common.mybatis.pagination.Page;
import com.nari.demo.service.AccountService;
import com.nari.omid.domain.Account;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:spring-config.xml" })
public class AccountDaoTest {

	@Autowired
	private AccountService accountService;
	
	@Test
	public void testGetAccountByUsername(){
		Account account = accountService.getAccount("j2ee");
		System.out.println(account.getEmail());
	}
	
	@Test
	public void testGetPage(){
		Page<Account> p = new Page<Account>();
		p.setCurrentPage(1);
		p.setSize(10);
		Account account = new Account();
		account.setUsername("user");
		accountService.getPage(p, null);
		
		System.out.println(p.getTotal() + " " + p.getResult().size());
	}
	
	@Test
	public void testGetPageUser(){
		Page<Map<String,Object>> p = new Page<Map<String,Object>>();
		p.setCurrentPage(1);
		p.setSize(200);
		Map m = new HashMap();
		m.put("username","zhang");
		m.put("password", "123456");
		accountService.getPageUser(p,m);
		System.out.println(p.getTotal() + " " + p.getResult().size());
		System.out.println(p.getResult().get(0).get("ID"));
	}
	
}
