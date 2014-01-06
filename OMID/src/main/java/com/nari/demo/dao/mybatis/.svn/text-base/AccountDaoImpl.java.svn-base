package com.nari.demo.dao.mybatis;

import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Repository;

import com.nari.common.mybatis.pagination.Page;
import com.nari.demo.dao.AccountDao;
import com.nari.omid.domain.Account;

public class AccountDaoImpl extends SqlSessionDaoSupport implements AccountDao{

	@Override
	public Account getAccountByUsername(String username) {
		return (Account)this.getSqlSession().selectOne("mybatis.getAccountByUsername",username);
	}
}
