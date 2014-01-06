package com.nari.sysman.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nari.omid.model.PSysUser;
import com.nari.sysman.mapper.LoginMapper;
import com.nari.sysman.service.LoginService;

@Service("LoginService")
public class LoginServiceImpl implements LoginService {

	@Autowired
	private LoginMapper loginMapper;
	@Override
	public List<PSysUser> login(String staffno) {
		return loginMapper.login(staffno);
	}

}
