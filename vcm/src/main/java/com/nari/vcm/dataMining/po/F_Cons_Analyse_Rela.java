package com.nari.vcm.dataMining.po;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;




@Entity  
@Table(name="F_CONS_ANALYSE_RELA")
@SequenceGenerator(name="ConsAnalyse",sequenceName="S_CONS_ANALYSE_RELA_ID")
 
public class F_Cons_Analyse_Rela {

	private int CONS_ANALYSE_RELA_ID;
	private String ANALYSE_ITEM_ID;
	private String CUST_ID;
	private String IS_VALID;
	
	@Id
	@GeneratedValue(generator="ConsAnalyse",strategy=GenerationType.AUTO)
	public int getCONS_ANALYSE_RELA_ID() {
		return CONS_ANALYSE_RELA_ID;
	}
	public void setCONS_ANALYSE_RELA_ID(int cONSANALYSERELAID) {
		CONS_ANALYSE_RELA_ID = cONSANALYSERELAID;
	}
	
	public String getANALYSE_ITEM_ID() {
		return ANALYSE_ITEM_ID;
	}
	public void setANALYSE_ITEM_ID(String aNALYSEITEMID) {
		ANALYSE_ITEM_ID = aNALYSEITEMID;
	}
	public String getCUST_ID() {
		return CUST_ID;
	}
	public void setCUST_ID(String cUSTID) {
		CUST_ID = cUSTID;
	}
	public String getIS_VALID() {
		return IS_VALID;
	}
	public void setIS_VALID(String iSVALID) {
		IS_VALID = iSVALID;
	}
}
