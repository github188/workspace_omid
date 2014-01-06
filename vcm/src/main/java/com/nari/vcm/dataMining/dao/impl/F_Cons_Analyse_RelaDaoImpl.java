package com.nari.vcm.dataMining.dao.impl;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.nari.vcm.dataMining.dao.F_Cons_Analyse_RelaDao;
import com.nari.vcm.dataMining.po.F_Cons_Analyse_Rela;

@Component("f_Cons_Analyse_RelaDao")
public class F_Cons_Analyse_RelaDaoImpl implements F_Cons_Analyse_RelaDao{

	@Autowired
	private SessionFactory sessionFactory;
	
	@Override
	public void delByCustID(String cust_ID) {
		/*Session session = sessionFactory.openSession();
		Transaction ts = null;
		ts = session.beginTransaction();
		F_Cons_Analyse_Rela fc = (F_Cons_Analyse_Rela)session.get(F_Cons_Analyse_Rela.class, new Integer(cust_ID));
		session.delete(fc);
		ts.commit();
		session.close();*/
		
		Session session = sessionFactory.openSession();    
		Transaction tx = session.beginTransaction();    
		String hqlDelete = "delete F_Cons_Analyse_Rela where CUST_ID = :cust_ID";    
		int deletedEntities = session.createQuery(hqlDelete).setString( "cust_ID", cust_ID )    
		.executeUpdate();    
		tx.commit();    
		session.close(); 
		
	}

	@Override
	public boolean findByCustID(String Cust_ID ) {
		 Session session = sessionFactory.openSession();
		 String hql2 = "from F_Cons_Analyse_Rela where CUST_ID = :cust_ID";
		 List<F_Cons_Analyse_Rela> ls2 = session.createQuery(hql2).setString( "cust_ID", Cust_ID ).list();
		 if(ls2.size()!=0)
		     {
		        session.close();
		        return true;
		     }
		 else {
			  session.close();
			  return false;
		 }
	}

	@Override
	public void update(F_Cons_Analyse_Rela far) {
		 Session session = sessionFactory.openSession();
		 Transaction ts = null;
		 ts = session.beginTransaction();
		 session.update(far);
		 ts.commit();
		 session.close();
	}

	@Override
	public List<String> queryAllAnalyseItemID(String custID){
		Session session = sessionFactory.openSession();
		List<F_Cons_Analyse_Rela> list = new ArrayList<F_Cons_Analyse_Rela>();
		list = session.createQuery("from F_Cons_Analyse_Rela where CUST_ID = :custID").setString("custID", custID).list();
		session.close();
		
		List<String> list2 = new ArrayList<String>();
		Iterator<F_Cons_Analyse_Rela> it = list.iterator();
		while(it.hasNext()){
			list2.add(it.next().getANALYSE_ITEM_ID());
		}
		return list2;
	}

	@Override
	public void save(F_Cons_Analyse_Rela far) {
		
		 Session session = sessionFactory.openSession();
		 Transaction ts = null;
		 ts = session.beginTransaction();
		 session.save(far);
		 ts.commit();
		 session.close();
	}
}
