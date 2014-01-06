package com.nari.demo.service;

import java.util.Map;

import com.nari.common.mybatis.pagination.Page;
import com.nari.omid.domain.Account;

public interface AccountService {

	Account getAccount(String username);
	
	Page<Account> getPage(Page<Account> p , Account account);
	
	Page<Map<String,Object>> getPageUser(Page<Map<String,Object>> p,Map map);
}
