package com.nari.vcm.dataMining.dao;

public interface UtilDao {

	public String queryBySingleCondition(String hql,String cust_ID,String tableName);
	public boolean queryByMultiConditions(String hql);
	public String[] getGrowthRatio(String sql,String tableName,String cust_ID);
}
