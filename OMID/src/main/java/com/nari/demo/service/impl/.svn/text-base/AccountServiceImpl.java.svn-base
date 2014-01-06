package com.nari.demo.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nari.common.mybatis.pagination.Page;
import com.nari.demo.service.AccountService;
import com.nari.omid.domain.Account;
import com.nari.omid.mapper.AccountMapper;

@Service("AccountService")
public class AccountServiceImpl implements AccountService {
	
	@Autowired
	private AccountMapper accountMapper;
	
	@Override
	public Account getAccount(String username) {
		return accountMapper.getAccountByUsername(username);
	}
	
	public Page<Account> getPage(Page<Account> p , Account account){
		return accountMapper.getPage(p, account);
	}

	public Page<Map<String,Object>> getPageUser(Page<Map<String,Object>> p,Map map){
		return accountMapper.getPageUser(p,map);
	}
}
