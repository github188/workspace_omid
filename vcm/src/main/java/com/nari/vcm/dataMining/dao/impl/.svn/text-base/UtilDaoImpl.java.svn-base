package com.nari.vcm.dataMining.dao.impl;

import java.math.BigDecimal;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.nari.vcm.dataMining.dao.UtilDao;

@Component("utilDao")
public class UtilDaoImpl implements UtilDao {

	@Autowired
	private SessionFactory sessionFactory;
	
	@Override
	public boolean queryByMultiConditions(String hql) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public String queryBySingleCondition(String hql,String cust_ID,String tableName) {
		 Session session = sessionFactory.openSession();
		 List<String> ls = session.createSQLQuery(hql).list();
		 List<String> lsOrgNo= session.createSQLQuery("select distinct t.org_no from "+tableName+" t "+ "where t.cust_id="+"'"+cust_ID+"'").list();
		 if(ls.size()!=0){
			 session.close();
			 return lsOrgNo.get(0);
		 }else{
			 session.close();
			 return null;
		 }
	}

	@Override
	public String[] getGrowthRatio(String sql,String tableName,String cust_ID) {  
		 try{
			 Session session = sessionFactory.openSession();
			 List<BigDecimal> ls = session.createSQLQuery(sql).list();
			 List<String> lsOrgNo= session.createSQLQuery("select distinct t.org_no from "+tableName+" t "+ "where t.cust_id="+"'"+cust_ID+"'").list();
			 session.close();
			 
			 if(ls.size()==0||lsOrgNo.size()==0||ls.size()==1){
				 return null;
			 }else{
				    
				     BigDecimal temp = null;
					// double temp =ls.get(0);
					 for(int i=0;i<ls.size()-1;i++){  //可能要重新排序？？？？
						 temp = (ls.get(i+1).subtract(ls.get(i))).divide(ls.get(i),4, BigDecimal.ROUND_HALF_EVEN);
					 }
					 double result = temp.divide(new BigDecimal((ls.size()-2)),4, BigDecimal.ROUND_HALF_EVEN).doubleValue();
					 /*for(int i=0;i<ls.size()-1;i++){
						 temp = (ls.get(i+1)-ls.get(i))/ls.get(i);
					 }
					 double result = temp/((ls.size()-2));*/
					 String str[] = new String[2];
				 str[0] = lsOrgNo.get(0);
				 str[1] = Double.toString(result);
				 return str;
			 }
		 }catch(Exception ex){
			 System.out.println(ex);
			 return null;
		 }
	}
}
