package com.nari.vcm.dataMining.dao.impl;

import java.util.Iterator;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.nari.vcm.dataMining.dao.Cust_VCM_Dao;
import com.nari.vcm.dataMining.po.C_Cust_VCM;

@Component("cust_VCM_Dao")
public class Cust_VCM_DaoImpl implements Cust_VCM_Dao{

	@Autowired
	private SessionFactory sessionFactory;
	
	public List<String> queryCustVcmMenber(){
		 Session session = sessionFactory.getCurrentSession();
		 String sql="select cust_id from C_CUST_VCM";
		 List<String> list = session.createSQLQuery(sql).list();
		 return list;
	}
}
