package com.nari.vcm.dataMining.dao.impl;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.nari.vcm.dataMining.dao.S_Cust_Group_ModelDao;
import com.nari.vcm.dataMining.po.S_Cust_Group_Model;

@Component("s_Cust_Group_ModelDao")
public class S_Cust_Group_ModelDaoImpl implements S_Cust_Group_ModelDao{

	@Autowired
	private SessionFactory sessionFactory;
	
	public List<S_Cust_Group_Model> queryModelSQL(){
		Session session = sessionFactory.getCurrentSession();
		List<S_Cust_Group_Model> list = session.createSQLQuery("select * from S_Cust_Group_Model").addEntity(S_Cust_Group_Model.class).list();
		
		/*List<String> ls = new ArrayList<String>();
		Iterator<S_Cust_Group_Model> it = list.iterator();
		while(it.hasNext()){
			S_Cust_Group_Model sgm =  it.next();
			ls.add(sgm.getCUST_SQL());
		 }*/
		
		return list;
	}
}
