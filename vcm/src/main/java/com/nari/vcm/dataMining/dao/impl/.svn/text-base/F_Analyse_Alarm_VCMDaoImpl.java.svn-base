package com.nari.vcm.dataMining.dao.impl;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.nari.vcm.dataMining.dao.F_Analyse_Alarm_VCMDao;
import com.nari.vcm.dataMining.po.F_Analyse_Alarm_VCM;
import com.nari.vcm.dataMining.po.F_Cons_Analyse_Rela;

@Component("f_Analyse_Alarm_VCMDao")
public class F_Analyse_Alarm_VCMDaoImpl implements F_Analyse_Alarm_VCMDao{

	@Autowired
	private SessionFactory sessionFactory;
	
	@Override
	public void delByCustID(String custID) {
		Session session = sessionFactory.openSession();   
		Transaction tx = null;
		try{
		tx = session.beginTransaction();    
		String hqlDel = "delete F_Analyse_Alarm_VCM where cust_ID = :cust_ID";    
		session.createQuery(hqlDel).setString( "cust_ID", custID ).executeUpdate();     
		tx.commit();    
		 
		}catch(Exception ex){
			System.out.println(ex);
		    if(tx!=null)
		    {
		        tx.rollback();
		    }
		}finally{
			session.close();
		}
	}

	@Override
	public void save(F_Analyse_Alarm_VCM fav) {

		Session session = sessionFactory.openSession();   
		Transaction tx = null;
		try{
			tx= session.beginTransaction();
			session.save(fav);
		    tx.commit();    
		 
		}catch(Exception ex){
			System.out.println(ex);
		    if(tx!=null)
		    {
		        tx.rollback();
		    }
		}finally{
			session.close();
		}
	}
		

	@Override
	public BigDecimal getAnalyseItemID() {   
		Session session = sessionFactory.openSession(); 
		List<BigDecimal> list = session.createSQLQuery("select S_F_ANALYSE_ALARM_VCM.nextval from dual").list();
		BigDecimal sequence = list.get(0);
		session.close();
		return sequence;
	}

	@Override
	public boolean findCustID(String custID) {
		 Session session = sessionFactory.openSession();
		 String hql = "from F_Analyse_Alarm_VCM where cust_ID = :cust_ID";
		 List<F_Analyse_Alarm_VCM> ls = session.createQuery(hql).setString( "cust_ID", custID).list();
		 if(ls.size()!=0)
		     {
		        session.close();
		        return true;
		     }
		 else {
			  session.close();
			  return false;
		 }
		
	}

}
