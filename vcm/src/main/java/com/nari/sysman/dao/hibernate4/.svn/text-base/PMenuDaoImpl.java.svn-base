package com.nari.sysman.dao.hibernate4;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.nari.common.dao.hibernate4.BaseHibernateDao;
import com.nari.sysman.dao.PMenuDao;
import com.nari.sysman.model.PMenu;


@Repository("PMenuDao")
public class PMenuDaoImpl extends BaseHibernateDao<PMenu, String> implements PMenuDao{

	@Override
	public List<PMenu> findByIsValid() {
		String hql = "from PMenu  where isValid=? order by p_menu_no, to_number(handle_sort)";
		return this.findBy(hql, 1);
	}

}
