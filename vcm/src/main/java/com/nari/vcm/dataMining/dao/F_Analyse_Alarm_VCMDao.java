package com.nari.vcm.dataMining.dao;

import java.math.BigDecimal;

import com.nari.vcm.dataMining.po.F_Analyse_Alarm_VCM;

public interface F_Analyse_Alarm_VCMDao {

	public void delByCustID(String custID);
	public void save(F_Analyse_Alarm_VCM fav);
	public BigDecimal getAnalyseItemID();
	public boolean findCustID(String custID);
}
