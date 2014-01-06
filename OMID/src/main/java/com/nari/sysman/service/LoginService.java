package com.nari.sysman.service;

import java.util.List;

import com.nari.omid.model.PSysUser;

public interface LoginService {

	List<PSysUser> login(String staffno);
}
