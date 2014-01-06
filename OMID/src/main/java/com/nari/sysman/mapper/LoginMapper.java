package com.nari.sysman.mapper;

import java.util.List;

import com.nari.omid.model.PSysUser;

public interface LoginMapper {
	List<PSysUser> login(String staffno);
}
