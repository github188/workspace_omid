package com.nari.vcm.dataMining.dao;

import java.util.List;

import com.nari.vcm.dataMining.po.F_Cons_Analyse_Rela;

public interface F_Cons_Analyse_RelaDao {

	public boolean findByCustID(String Cust_ID);
	
	public void delByCustID(String Cust_ID);
	
	public void update(F_Cons_Analyse_Rela far);
	
	public List<String> queryAllAnalyseItemID(String custID);
	
	public void save(F_Cons_Analyse_Rela far);
}
