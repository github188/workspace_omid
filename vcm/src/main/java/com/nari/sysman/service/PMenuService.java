package com.nari.sysman.service;

import java.util.List;

import com.nari.common.service.IBaseService;
import com.nari.sysman.model.PMenu;


public interface PMenuService extends IBaseService<PMenu, String>{
	public List<PMenu> getPMenuByIsValid();
}
