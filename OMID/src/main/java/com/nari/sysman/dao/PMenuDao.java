package com.nari.sysman.dao;

import java.util.List;

import com.nari.common.dao.IBaseDao;
import com.nari.omid.model.PMenu;

public interface PMenuDao extends IBaseDao<PMenu,String>{
	public List<PMenu> findByIsValid();
}
