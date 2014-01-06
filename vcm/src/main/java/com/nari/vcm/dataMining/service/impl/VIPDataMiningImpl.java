package com.nari.vcm.dataMining.service.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nari.vcm.dataMining.dao.Cust_VCM_Dao;
import com.nari.vcm.dataMining.dao.F_Analyse_Alarm_VCMDao;
import com.nari.vcm.dataMining.dao.F_Cons_Analyse_RelaDao;
import com.nari.vcm.dataMining.dao.S_Cust_Group_ModelDao;
import com.nari.vcm.dataMining.dao.UtilDao;
import com.nari.vcm.dataMining.po.C_Cust_VCM;
import com.nari.vcm.dataMining.po.F_Analyse_Alarm_VCM;
import com.nari.vcm.dataMining.po.F_Cons_Analyse_Rela;
import com.nari.vcm.dataMining.po.S_Cust_Group_Model;
import com.nari.vcm.dataMining.service.VIPDataMining;

@Service("vIPDataMining")
public class VIPDataMiningImpl implements VIPDataMining {
	private static Logger logger = Logger.getLogger(VIPDataMiningImpl.class);
	
	@Autowired
	private Cust_VCM_Dao cust_VCM_Dao;
	
	@Autowired
	private S_Cust_Group_ModelDao s_Cust_Group_ModelDao;
	
	@Autowired
	private F_Analyse_Alarm_VCMDao f_Analyse_Alarm_VCMDao;
	
	@Autowired
	private UtilDao utilDao;
	
	
	@Override
	public void dataMining() {
		logger.debug("++++++++++++++++++++++++++进入logger.debugger");
		/**************获取大客户标识*******************/ 
		List<String> listVCM = new ArrayList<String>();
		listVCM = cust_VCM_Dao.queryCustVcmMenber();
		//listVCM = cust_VCM_Dao.queryCustVcmMenber();
		
		/**************获取群模型自定义SQL*******************/
		List<S_Cust_Group_Model> ls = new ArrayList<S_Cust_Group_Model>();
		ls = s_Cust_Group_ModelDao.queryModelSQL();
		
        String cust_ID; //大客户标识
		for(int i=0;i<listVCM.size();i++){ //******依次对每个大客户进行数据挖掘
			cust_ID=listVCM.get(i);
			
			/**********该大客户在F_Analyse_Alarm_VCM表已存在，需重新挖掘********/
			if(f_Analyse_Alarm_VCMDao.findCustID(cust_ID)){ 
				   //删除cust_ID对应的F_Analyse_Alarm_VCM表中的分析项
				   f_Analyse_Alarm_VCMDao.delByCustID(cust_ID);
			}
			
			Iterator<S_Cust_Group_Model> it = ls.iterator();
			while(it.hasNext()){
				 S_Cust_Group_Model scgm =  it.next();
				 String custSQL =  scgm.getCUST_SQL();
				 if(!custSQL.contains("@")){   //----------单个模型条件挖掘
					 dataMineBySingleConditionByPre(cust_ID,custSQL);
				 }else{
					 dataMineByMultiConditionsByPre(cust_ID,custSQL); //--------多个模型条件挖掘
				 }
		
		//dataMineByAvarage(listVCM,ls);/*对历史数据平均值进行挖掘*/
	   }
	  }
	}
	/*对历史数据平均值进行挖掘*/
	public void dataMineByAvarage(List<String> listVCM,List<S_Cust_Group_Model> ls){
		
		String cust_ID; //大客户标识
		
		for(int i=0;i<listVCM.size();i++){ //******依次对每个大客户进行数据挖掘
			cust_ID=listVCM.get(i);
			
			/**********该大客户在F_Analyse_Alarm_VCM表已存在，需重新挖掘********/
			if(f_Analyse_Alarm_VCMDao.findCustID(cust_ID)){ 
				   //删除cust_ID对应的F_Analyse_Alarm_VCM表中的分析项
				   f_Analyse_Alarm_VCMDao.delByCustID(cust_ID);
			}
			
			Iterator<S_Cust_Group_Model> it = ls.iterator();
			while(it.hasNext()){
				 S_Cust_Group_Model scgm =  it.next();
				 String custSQL =  scgm.getCUST_SQL();
			   if(!custSQL.contains("@")){   //----------单个模型条件挖掘
				 String[] str = custSQL.trim().split("#");
				 if(str.length==6){ //对评估属性的属性进行挖掘，例如：某大客户日用电量
					 String tableName = str[0];
					 String fieldName = str[1];
					 String symbol = str[2];
					 String value = str[3];
					 String analyseType = str[4];
					 String eventLevel = str[5];
					
					 String sqlSingelCondtion2="select tn.cust_ID from "+tableName+" tn " +" where "+"tn.cust_id = "+"'"+cust_ID+"'"
						 +" and tn."+fieldName+symbol+value;
					 
					 /***********按表中字段的平均值进行挖掘****************/
					 String sqlSingelCondtion="select distinct tn.org_no from "+tableName+" tn " +" where "
					                           +"(select avg(tn2."+fieldName+") from "+tableName+" tn2 where tn2.cust_id="+"'"+cust_ID+"'"
					                           +") "+symbol+value;
					 
					 
					 String queryResultOrgNO = utilDao.queryBySingleCondition(sqlSingelCondtion,cust_ID,tableName);
					
					 if(null!=queryResultOrgNO){  //*******符合模型条件
					   
					   F_Analyse_Alarm_VCM  faav = new F_Analyse_Alarm_VCM();
					   faav.setOrg_NO(queryResultOrgNO);
					   faav.setStatus_Code("0");
					   faav.setAnalyse_Type(analyseType);
					   faav.setAnalyse_Src("1");
					   faav.setEvent_Level(eventLevel);
					   faav.setCust_ID(cust_ID);
					   f_Analyse_Alarm_VCMDao.save(faav);
					   
					   System.out.println("大客户:"+listVCM.get(i)+"满足模型:"+custSQL);
				   }
				 }else if(str.length==7){  //对评估属性的属性进行挖掘，例如：某大客户日用电量的增长率
					 String tableName = str[0];
					 String fieldName = str[1];
					 String attribute = str[2];
					 String symbol = str[3];
					 String value = str[4];
					 String analyseType = str[5];
					 String eventLevel = str[6];
					
					 if(attribute.equals("zzl")){  // 根据增长率挖掘
						 String sql = "select t."+fieldName+" from "+tableName+" t where "+"t.cust_id="+"'"+cust_ID+"'"+" and t."+fieldName+" is not null"+" and t."+fieldName+"!=0"+" order by t.stat_date ASC";
						 
						 String s[]=new String[2];
						 s = utilDao.getGrowthRatio(sql,tableName,cust_ID); //获得增长率
						 if(null!=s){
							 String orgNO = s[0];
							 double zzl = new Double(s[1]);
							 
							 double value2= new Double(value);
							 if(zzl>value2){ 
								   F_Analyse_Alarm_VCM  faav = new F_Analyse_Alarm_VCM();
								   faav.setOrg_NO(orgNO);  //
								   faav.setStatus_Code("0");
								   faav.setAnalyse_Type(analyseType);
								   faav.setAnalyse_Src("1");
								   faav.setEvent_Level(eventLevel);
								   faav.setCust_ID(cust_ID);
								   f_Analyse_Alarm_VCMDao.save(faav);
								   
								   System.out.println("大客户:"+listVCM.get(i)+"满足模型:"+custSQL);
							 }
						 }else{
							 System.out.println("该客户无增长率");
					 }
					 }
				 }
				 
			}else{  //多个模型条件
				 String[] str2 = custSQL.trim().split("@");
				 boolean[] label = new boolean[str2.length];
				 boolean temp = true;
				 String  queryResultOrgNO2 = null;
				 for(int m=0;m<str2.length;m++){
					 String[] str3 = str2[m].trim().split("#");
					 
					 if(str3.length==6){ //对评估属性的属性进行挖掘，例如：某大客户日用电量
						 String tableName = str3[0];
						 String fieldName = str3[1];
						 String symbol = str3[2];
						 String value = str3[3];
						 String analyseType = str3[4];
						 String eventLevel = str3[5];
						 
						 String sqlSingelCondtion="select distinct tn.org_no from "+tableName+" tn " +" where "
                         +"(select avg(tn2."+fieldName+") from "+tableName+" tn2 where tn2.cust_id="+"'"+cust_ID+"'"
                         +") "+symbol+value;
						 
						 queryResultOrgNO2 = utilDao.queryBySingleCondition(sqlSingelCondtion,cust_ID,tableName);
						
						 if(null!=queryResultOrgNO2){  //*******符合模型条件
						   label[m] = true;
						   temp = label[m]&&temp;
					   }
						 if(null!=queryResultOrgNO2){
							 
							   F_Analyse_Alarm_VCM  faav = new F_Analyse_Alarm_VCM();
							   
							   faav.setOrg_NO(queryResultOrgNO2);
							   faav.setStatus_Code("0");
							   faav.setAnalyse_Type(analyseType);
							   faav.setAnalyse_Src("1");
							   faav.setEvent_Level(eventLevel);
							   faav.setCust_ID(cust_ID);
							   f_Analyse_Alarm_VCMDao.save(faav);
							   
							   System.out.println("大客户:"+listVCM.get(i)+"满足模型:"+custSQL);
						 }
						   
						 
						 
					 }else if(str3.length==7){  //对评估属性的属性进行挖掘，例如：某大客户日用电量的"增长率"
						 String tableName = str3[0];
						 String fieldName = str3[1];
						 String attribute = str3[2];
						 String symbol = str3[3];
						 String value = str3[4];
						 String analyseType = str3[5];
						 String eventLevel = str3[6];
						
						 if(attribute.equals("zzl")){  // 根据增长率挖掘
							 String sql = "select t."+fieldName+" from "+tableName+" t where "+"t.cust_id="+"'"+cust_ID+"'"+" and t."+fieldName+" is not null"+" and t."+fieldName+"!=0"+" order by t.stat_date ASC";
							 String s[]=new String[2];
							 s = utilDao.getGrowthRatio(sql,tableName,cust_ID); //获得增长率
							 if(null!=s){
								 String orgNO = s[0];
								 double zzl = new Double(s[1]);
								 double value2= new Double(value);
								 if(zzl>value2){ 
									   label[m] = true;
									   temp = label[m]&&temp;
									 
									   F_Analyse_Alarm_VCM  faav = new F_Analyse_Alarm_VCM();
									   
									   faav.setOrg_NO(orgNO);
									   faav.setStatus_Code("0");
									   faav.setAnalyse_Type(analyseType);
									   faav.setAnalyse_Src("1");
									   faav.setEvent_Level(eventLevel);
									   faav.setCust_ID(cust_ID);
									   f_Analyse_Alarm_VCMDao.save(faav);
									   
									   System.out.println("大客户:"+listVCM.get(i)+"满足模型:"+custSQL);
									 
								 }
							 }else{
								 System.out.println("该客户无增长率");
							 }
							 
						 }
					 }
				 }
			  }
			}
		  }
		}
	
	/*对前一天历史数据进行挖掘*/
	public void dataMineByPreDay(){
		
		
	}
	/*对前一个月历史数据进行挖掘*/
	public void dataMineByPreMonth(){
		
	}
	/*对前一年历史数据进行挖掘*/
	public void dataMineByPreYear(){
		
	}
	/*群模型为单个模型条件*/
	public void dataMineBySingleConditionByAve(String cust_ID,String custSQL){
		
		String[] str = custSQL.trim().split("#");
		 if(str.length==6){ //对评估属性的属性进行挖掘，例如：某大客户日用电量
			 String tableName = str[0];
			 String fieldName = str[1];
			 String symbol = str[2];
			 String value = str[3];
			 String analyseType = str[4];
			 String eventLevel = str[5];
			
			 String sqlSingelCondtion2="select tn.cust_ID from "+tableName+" tn " +" where "+"tn.cust_id = "+"'"+cust_ID+"'"
				 +" and tn."+fieldName+symbol+value;
			 
			 /***********按表中字段的平均值进行挖掘****************/
			 String sqlSingelCondtion="select distinct tn.org_no from "+tableName+" tn " +" where "
			                           +"(select avg(tn2."+fieldName+") from "+tableName+" tn2 where tn2.cust_id="+"'"+cust_ID+"'"
			                           +") "+symbol+value;
			 
			 
			 String queryResultOrgNO = utilDao.queryBySingleCondition(sqlSingelCondtion,cust_ID,tableName);
			
			 if(null!=queryResultOrgNO){  //*******符合模型条件
			   
			   F_Analyse_Alarm_VCM  faav = new F_Analyse_Alarm_VCM();
			   faav.setOrg_NO(queryResultOrgNO);
			   faav.setStatus_Code("0");
			   faav.setAnalyse_Type(analyseType);
			   faav.setAnalyse_Src("1");
			   faav.setEvent_Level(eventLevel);
			   faav.setCust_ID(cust_ID);
			   f_Analyse_Alarm_VCMDao.save(faav);
			   
			   //System.out.println("大客户:"+listVCM.get(i)+"满足模型:"+custSQL);
		   }
		 }else if(str.length==7){  //对评估属性的属性进行挖掘，例如：某大客户日用电量的增长率
			 String tableName = str[0];
			 String fieldName = str[1];
			 String attribute = str[2];
			 String symbol = str[3];
			 String value = str[4];
			 String analyseType = str[5];
			 String eventLevel = str[6];
			
			 if(attribute.equals("zzl")){  // 根据增长率挖掘
				 String sql = "select t."+fieldName+" from "+tableName+" t where "+"t.cust_id="+"'"+cust_ID+"'"+" and t."+fieldName+" is not null"+" and t."+fieldName+"!=0"+" order by t.stat_date ASC";
				 
				 String s[]=new String[2];
				 s = utilDao.getGrowthRatio(sql,tableName,cust_ID); //获得增长率
				 if(null!=s){
					 String orgNO = s[0];
					 double zzl = new Double(s[1]);
					 
					 double value2= new Double(value);
					 if(zzl>value2){ 
						   F_Analyse_Alarm_VCM  faav = new F_Analyse_Alarm_VCM();
						   faav.setOrg_NO(orgNO);  //
						   faav.setStatus_Code("0");
						   faav.setAnalyse_Type(analyseType);
						   faav.setAnalyse_Src("1");
						   faav.setEvent_Level(eventLevel);
						   faav.setCust_ID(cust_ID);
						   f_Analyse_Alarm_VCMDao.save(faav);
						   
						   //System.out.println("大客户:"+listVCM.get(i)+"满足模型:"+custSQL);
					 }
				 }else{
					 System.out.println("该客户无增长率");
				 }
			 }
		 }
		
		
	}
	
	/*群模型为多个模型条件*/
	public void dataMineByMultiConditionsByAve(String cust_ID,String custSQL){
		
		 String[] str2 = custSQL.trim().split("@");
		 boolean[] label = new boolean[str2.length];
		 boolean temp = true;
		 String  queryResultOrgNO2 = null;
		 for(int m=0;m<str2.length;m++){
			 String[] str3 = str2[m].trim().split("#");
			 
			 if(str3.length==6){ //对评估属性的属性进行挖掘，例如：某大客户日用电量
				 String tableName = str3[0];
				 String fieldName = str3[1];
				 String symbol = str3[2];
				 String value = str3[3];
				 String analyseType = str3[4];
				 String eventLevel = str3[5];
				 
				 String sqlSingelCondtion="select distinct tn.org_no from "+tableName+" tn " +" where "
                +"(select avg(tn2."+fieldName+") from "+tableName+" tn2 where tn2.cust_id="+"'"+cust_ID+"'"
                +") "+symbol+value;
				 
				 queryResultOrgNO2 = utilDao.queryBySingleCondition(sqlSingelCondtion,cust_ID,tableName);
				
				 if(null!=queryResultOrgNO2){  //*******符合模型条件
				   label[m] = true;
				   temp = label[m]&&temp;
			   }
				 if(null!=queryResultOrgNO2){
					 
					   F_Analyse_Alarm_VCM  faav = new F_Analyse_Alarm_VCM();
					   
					   faav.setOrg_NO(queryResultOrgNO2);
					   faav.setStatus_Code("0");
					   faav.setAnalyse_Type(analyseType);
					   faav.setAnalyse_Src("1");
					   faav.setEvent_Level(eventLevel);
					   faav.setCust_ID(cust_ID);
					   f_Analyse_Alarm_VCMDao.save(faav);
					   
					   //System.out.println("大客户:"+listVCM.get(i)+"满足模型:"+custSQL);
				 }
				   
				 
				 
			 }else if(str3.length==7){  //对评估属性的属性进行挖掘，例如：某大客户日用电量的"增长率"
				 String tableName = str3[0];
				 String fieldName = str3[1];
				 String attribute = str3[2];
				 String symbol = str3[3];
				 String value = str3[4];
				 String analyseType = str3[5];
				 String eventLevel = str3[6];
				
				 if(attribute.equals("zzl")){  // 根据增长率挖掘
					 String sql = "select t."+fieldName+" from "+tableName+" t where "+"t.cust_id="+"'"+cust_ID+"'"+" and t."+fieldName+" is not null"+" and t."+fieldName+"!=0"+" order by t.stat_date ASC";
					 String s[]=new String[2];
					 s = utilDao.getGrowthRatio(sql,tableName,cust_ID); //获得增长率
					 String orgNO = s[0];
					 double zzl = new Double(s[1]);
					 double value2= new Double(value);
					 if(zzl>value2){ 
						   label[m] = true;
						   temp = label[m]&&temp;
						 
						   F_Analyse_Alarm_VCM  faav = new F_Analyse_Alarm_VCM();
						   
						   faav.setOrg_NO(orgNO);
						   faav.setStatus_Code("0");
						   faav.setAnalyse_Type(analyseType);
						   faav.setAnalyse_Src("1");
						   faav.setEvent_Level(eventLevel);
						   faav.setCust_ID(cust_ID);
						   f_Analyse_Alarm_VCMDao.save(faav);
						   
						   //System.out.println("大客户:"+listVCM.get(i)+"满足模型:"+custSQL);
						 
					 }
				 }
			 }
		 }
	  }
    
	public void dataMineBySingleConditionByPre(String cust_ID,String custSQL){
		
		String[] str = custSQL.trim().split("#");
		 if(str.length==6){ //对评估属性的属性进行挖掘，例如：某大客户日用电量
			 String tableName = str[0];
			 String fieldName = str[1];
			 String symbol = str[2];
			 String value = str[3];
			 String analyseType = str[4];
			 String eventLevel = str[5];
			
			 String sqlSingelCondtion = null;
			 
			 if(tableName.equals("A_CONS_VCM_STAT_D")||tableName.equals("A_CUST_VCM_STAT_D")){  //对前一天数据进行挖掘
				 
				 sqlSingelCondtion ="select tn.cust_ID from "+tableName+" tn " +" where "+"tn.cust_id = "+"'"+cust_ID+"'"
				 +" and tn."+fieldName+symbol+value+" and "+" to_char(tn.stat_date,'yyyy-mm-dd') = (select to_char(to_date(to_char(sysdate,'yyyy-mm-dd'),'yyyy-mm-dd')-1,'yyyy-mm-dd') from dual)";
			 }else if(tableName.equals("A_CONS_VCM_STAT_M")||tableName.equals("A_CUST_VCM_STAT_M")){ //对前一个月数据进行挖掘
				 
				 sqlSingelCondtion ="select tn.cust_ID from "+tableName+" tn " +" where "+"tn.cust_id = "+"'"+cust_ID+"'"
				 +" and tn."+fieldName+symbol+value+" and "+"to_char(tn.stat_date,'yyyy-mm') = (select to_char(to_date(to_char(sysdate,'yyyy-mm'),'yyyy-mm')-1,'yyyy-mm') from dual)" ;
			 }else if(tableName.equals("A_CONS_VCM_STAT_Y")||tableName.equals("A_CUST_VCM_STAT_Y")){ //对前一年数据进行挖掘
				 
				 sqlSingelCondtion ="select tn.cust_ID from "+tableName+" tn " +" where "+"tn.cust_id = "+"'"+cust_ID+"'"
				 +" and tn."+fieldName+symbol+value+" and "+"to_char(tn.stat_date,'yyyy') = (select to_char(to_date(to_char(sysdate,'yyyy'),'yyyy')-1,'yyyy') from dual)";
			 }else{
				 
				 sqlSingelCondtion ="select tn.cust_ID from "+tableName+" tn " +" where "+"tn.cust_id = "+"'"+cust_ID+"'"
				 +" and tn."+fieldName+symbol+value;
			 }
			 
			 
			 /***********按表中字段的平均值进行挖掘****************/
			 /*String sqlSingelCondtion="select distinct tn.org_no from "+tableName+" tn " +" where "
			                           +"(select avg(tn2."+fieldName+") from "+tableName+" tn2 where tn2.cust_id="+"'"+cust_ID+"'"
			                           +") "+symbol+value;*/
			 
			 
			 String queryResultOrgNO = utilDao.queryBySingleCondition(sqlSingelCondtion,cust_ID,tableName);
			
			 if(null!=queryResultOrgNO){  //*******符合模型条件
			   
			   F_Analyse_Alarm_VCM  faav = new F_Analyse_Alarm_VCM();
			   faav.setOrg_NO(queryResultOrgNO);
			   faav.setStatus_Code("0");
			   faav.setAnalyse_Type(analyseType);
			   faav.setAnalyse_Src("1");
			   faav.setEvent_Level(eventLevel);
			   faav.setCust_ID(cust_ID);
			   f_Analyse_Alarm_VCMDao.save(faav);
			   
			   //System.out.println("大客户:"+listVCM.get(i)+"满足模型:"+custSQL);
		   }
		 }else if(str.length==7){  //对评估属性的属性进行挖掘，例如：某大客户日用电量的增长率
			 String tableName = str[0];
			 String fieldName = str[1];
			 String attribute = str[2];
			 //String symbol = str[3];
			 String value = str[4];
			 String analyseType = str[5];
			 String eventLevel = str[6];
			
			 if(attribute.equals("zzl")){  // 根据增长率挖掘
				 String sql = "select t."+fieldName+" from "+tableName+" t where "+"t.cust_id="+"'"+cust_ID+"'"+" and t."+fieldName+" is not null"+" and t."+fieldName+"!=0"+" order by t.stat_date ASC";
				 String s[]=new String[2];
				 s = utilDao.getGrowthRatio(sql,tableName,cust_ID); //获得增长率
				 if(null!=s){
					 String orgNO = s[0];
					 double zzl = new Double(s[1]);
					 
					 double value2= new Double(value);
					 if(zzl>value2){ 
						   F_Analyse_Alarm_VCM  faav = new F_Analyse_Alarm_VCM();
						   faav.setOrg_NO(orgNO);  //
						   faav.setStatus_Code("0");
						   faav.setAnalyse_Type(analyseType);
						   faav.setAnalyse_Src("1");
						   faav.setEvent_Level(eventLevel);
						   faav.setCust_ID(cust_ID);
						   f_Analyse_Alarm_VCMDao.save(faav);
						   
						   //System.out.println("大客户:"+listVCM.get(i)+"满足模型:"+custSQL);
					 }
				 }else{
					 System.out.println("该客户无增长率");
				 }
			 }
		 }
		
		
	}
	
	/*群模型为多个模型条件*/
	public void dataMineByMultiConditionsByPre(String cust_ID,String custSQL){
		
		 String[] str2 = custSQL.trim().split("@");
		 boolean[] label = new boolean[str2.length];
		 boolean temp = true;
		 String  queryResultOrgNO2 = null;
		 for(int m=0;m<str2.length;m++){
			 String[] str3 = str2[m].trim().split("#");
			 
			 if(str3.length==6){ //对评估属性的属性进行挖掘，例如：某大客户日用电量
				 String tableName = str3[0];
				 String fieldName = str3[1];
				 String symbol = str3[2];
				 String value = str3[3];
				 String analyseType = str3[4];
				 String eventLevel = str3[5];
				 
				 String sqlSingelCondtion = null;
				 
				 if(tableName.equals("A_CONS_VCM_STAT_D")||tableName.equals("A_CUST_VCM_STAT_D")){  //对前一天数据进行挖掘
					 
					 sqlSingelCondtion ="select tn.cust_ID from "+tableName+" tn " +" where "+"tn.cust_id = "+"'"+cust_ID+"'"
					 +" and tn."+fieldName+symbol+value+" and "+" to_char(tn.stat_date,'yyyy-mm-dd') = (select to_char(to_date(to_char(sysdate,'yyyy-mm-dd'),'yyyy-mm-dd')-1,'yyyy-mm-dd') from dual)";
				 }else if(tableName.equals("A_CONS_VCM_STAT_M")||tableName.equals("A_CUST_VCM_STAT_M")){ //对前一个月数据进行挖掘
					 
					 sqlSingelCondtion ="select tn.cust_ID from "+tableName+" tn " +" where "+"tn.cust_id = "+"'"+cust_ID+"'"
					 +" and tn."+fieldName+symbol+value+" and "+"to_char(tn.stat_date,'yyyy-mm') = (select to_char(to_date(to_char(sysdate,'yyyy-mm'),'yyyy-mm')-1,'yyyy-mm') from dual)" ;
				 }else if(tableName.equals("A_CONS_VCM_STAT_Y")||tableName.equals("A_CUST_VCM_STAT_Y")){ //对前一年数据进行挖掘
					 
					 sqlSingelCondtion ="select tn.cust_ID from "+tableName+" tn " +" where "+"tn.cust_id = "+"'"+cust_ID+"'"
					 +" and tn."+fieldName+symbol+value+" and "+"to_char(tn.stat_date,'yyyy') = (select to_char(to_date(to_char(sysdate,'yyyy'),'yyyy')-1,'yyyy') from dual)";
				 }else{
					 
					 sqlSingelCondtion ="select tn.cust_ID from "+tableName+" tn " +" where "+"tn.cust_id = "+"'"+cust_ID+"'"
					 +" and tn."+fieldName+symbol+value;
				 }
				 
				 queryResultOrgNO2 = utilDao.queryBySingleCondition(sqlSingelCondtion,cust_ID,tableName);
				
				/* if(null!=queryResultOrgNO2){  //*******符合模型条件
				   label[m] = true;
				   temp = label[m]&&temp;
			   }*/
				 if(null!=queryResultOrgNO2){
					 
					   F_Analyse_Alarm_VCM  faav = new F_Analyse_Alarm_VCM();
					   
					   faav.setOrg_NO(queryResultOrgNO2);
					   faav.setStatus_Code("0");
					   faav.setAnalyse_Type(analyseType);
					   faav.setAnalyse_Src("1");
					   faav.setEvent_Level(eventLevel);
					   faav.setCust_ID(cust_ID);
					   f_Analyse_Alarm_VCMDao.save(faav);
					   
					   //System.out.println("大客户:"+listVCM.get(i)+"满足模型:"+custSQL);
				 }
				   
				 
				 
			 }else if(str3.length==7){  //对评估属性的属性进行挖掘，例如：某大客户日用电量的"增长率"
				 String tableName = str3[0];
				 String fieldName = str3[1];
				 String attribute = str3[2];
				 String symbol = str3[3];
				 String value = str3[4];
				 String analyseType = str3[5];
				 String eventLevel = str3[6];
				
				 if(attribute.equals("zzl")){  // 根据增长率挖掘
					 String sql = "select t."+fieldName+" from "+tableName+" t where "+"t.cust_id="+"'"+cust_ID+"'"+" and t."+fieldName+" is not null"+" and t."+fieldName+"!=0"+" order by t.stat_date ASC";
					 String s[]=new String[2];
					 s = utilDao.getGrowthRatio(sql,tableName,cust_ID); //获得增长率
					 if(null!=s){
						 String orgNO = s[0];
						 double zzl = new Double(s[1]);
						 double value2= new Double(value);
						 if(zzl>value2){ 
//							   label[m] = true;
//							   temp = label[m]&&temp;
							 
							   F_Analyse_Alarm_VCM  faav = new F_Analyse_Alarm_VCM();
							   faav.setOrg_NO(orgNO);
							   faav.setStatus_Code("0");
							   faav.setAnalyse_Type(analyseType);
							   faav.setAnalyse_Src("1");
							   faav.setEvent_Level(eventLevel);
							   faav.setCust_ID(cust_ID);
							   f_Analyse_Alarm_VCMDao.save(faav);
							   //System.out.println("大客户:"+listVCM.get(i)+"满足模型:"+custSQL);
						 }
					 }else{
						 System.out.println("该客户无增长率");
					 }
				 }
			 }
		 }
	   }
	}
	
	
