package com.nari.sysman.dao.hibernate4;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.nari.common.dao.hibernate4.BaseHibernateDao;
import com.nari.omid.model.PMenu;
import com.nari.sysman.dao.PMenuDao;

@Repository("PMenuDao")
public class PMenuDaoImpl extends BaseHibernateDao<PMenu, String> implements PMenuDao{
	public List<PMenu> findByIsValid(){
		String hql = "from PMenu p where p.isValid=?";
		return this.findBy(hql, 1);
	}
}
