package com.nari.sysman.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.nari.common.dao.IBaseDao;
import com.nari.common.service.impl.BaseService;
import com.nari.sysman.dao.PMenuDao;
import com.nari.sysman.model.PMenu;
import com.nari.sysman.service.PMenuService;


@Service("PMenuService")
public class PMenuServiceImpl extends BaseService<PMenu, String> implements PMenuService{

	private PMenuDao pMenuDao;
	
	@Autowired
    @Qualifier("PMenuDao")
	@Override
	public void setBaseDao(IBaseDao<PMenu, String> pMenuDao) {
		// TODO Auto-generated method stub
		this.baseDao = pMenuDao;
		this.pMenuDao =(PMenuDao) pMenuDao;
	}

	@Override
	public List<PMenu> getPMenuByIsValid() {
		return pMenuDao.findByIsValid();
	}

}
