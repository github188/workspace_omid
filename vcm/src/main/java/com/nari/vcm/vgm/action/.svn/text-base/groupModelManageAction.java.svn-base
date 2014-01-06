package com.nari.vcm.vgm.action;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.nari.vcm.vgm.service.GroupModelManageService;
import com.opensymphony.xwork2.ActionSupport;


@ParentPackage("json-default")
@Namespace("/")
@Action("groupModelManageAction")
@Results({@Result(name="success",type="json"),@Result(name="input",type="json")})
public class groupModelManageAction extends ActionSupport{
	
	@Autowired
	private GroupModelManageService groupModelManageService;
	
	private String vcmOrgNo; //供电单位编号
	private List<Map<String,Object>>vcmTgOrgNoList; //供电单位编号 List
	
	private List<Map<String,Object>>queryModelList; //模型查询结果 List
	private List<Map<String,Object>>queryModelConList; //根据模型ID查询模型条件 List
	
	private List<Map<String,Object>>queryGROUP_TYPE_CODEList; //群类型List
	
	

	
	
	public List<Map<String, Object>> getQueryModelList() {
		return queryModelList;
	}
	public void setQueryModelList(List<Map<String, Object>> queryModelList) {
		this.queryModelList = queryModelList;
	}
	public List<Map<String, Object>> getVcmTgOrgNoList() {
		return vcmTgOrgNoList;
	}
	public void setVcmTgOrgNoList(List<Map<String, Object>> vcmTgOrgNoList) {
		this.vcmTgOrgNoList = vcmTgOrgNoList;
	}
	public String getVcmOrgNo() {
		return vcmOrgNo;
	}
	public void setVcmOrgNo(String vcmOrgNo) {
		this.vcmOrgNo = vcmOrgNo;
	}

	private String groupModelID; 
	private String name;
	private String groupTypeCode;
	private String pModelID;
	private String orgNO;
	private String creatorNO;
	public String getCREATE_TIME() {
		return CREATE_TIME;
	}
	public void setCREATE_TIME(String cREATETIME) {
		CREATE_TIME = cREATETIME;
	}
	public String getSTART_DATE() {
		return START_DATE;
	}
	public void setSTART_DATE(String sTARTDATE) {
		START_DATE = sTARTDATE;
	}
	public String getSTOP_PERSON_NO() {
		return STOP_PERSON_NO;
	}
	public void setSTOP_PERSON_NO(String sTOPPERSONNO) {
		STOP_PERSON_NO = sTOPPERSONNO;
	}
	public String getSTOP_REASON() {
		return STOP_REASON;
	}
	public void setSTOP_REASON(String sTOPREASON) {
		STOP_REASON = sTOPREASON;
	}
	public String getSTOP_DATE() {
		return STOP_DATE;
	}
	public void setSTOP_DATE(String sTOPDATE) {
		STOP_DATE = sTOPDATE;
	}
	public String getSTOP_FLAG() {
		return STOP_FLAG;
	}
	public void setSTOP_FLAG(String sTOPFLAG) {
		STOP_FLAG = sTOPFLAG;
	}
	public String getAPP_NO() {
		return APP_NO;
	}
	public void setAPP_NO(String aPPNO) {
		APP_NO = aPPNO;
	}

	private String CREATE_TIME;
	private String START_DATE;
	private String STOP_PERSON_NO ;
	private String STOP_REASON;
	private String STOP_DATE;
	private String STOP_FLAG;
	private String APP_NO;
	private String custSQL;
	private String remark;
	
	
	
	private String CONDITION;//模型条件：来源表+来源字段
	
	
	
	
	public String getCOND_NAME() {
		return COND_NAME;
	}
	public void setCOND_NAME(String cONDNAME) {
		COND_NAME = cONDNAME;
	}
	public String getATTR_ID() {
		return ATTR_ID;
	}
	public void setATTR_ID(String aTTRID) {
		ATTR_ID = aTTRID;
	}
	public String getCOMPARE_VALUE() {
		return COMPARE_VALUE;
	}
	public void setCOMPARE_VALUE(String cOMPAREVALUE) {
		COMPARE_VALUE = cOMPAREVALUE;
	}
	public String getLOGIC_SYMBOL() {
		return LOGIC_SYMBOL;
	}
	public void setLOGIC_SYMBOL(String lOGICSYMBOL) {
		LOGIC_SYMBOL = lOGICSYMBOL;
	}
	
	private String CUST_GROUP_MODEL_ID;
	private String COND_ID;
	private String COND_NAME;
	private String ATTR_ID;
	private String COMPARE_VALUE;
	private String LOGIC_SYMBOL;
	
	
	public String getGroupModelID() {
		return groupModelID;
	}
	public void setGroupModelID(String groupModelID) {
		this.groupModelID = groupModelID;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getGroupTypeCode() {
		return groupTypeCode;
	}
	public void setGroupTypeCode(String groupTypeCode) {
		this.groupTypeCode = groupTypeCode;
	}
	public String getpModelID() {
		return pModelID;
	}
	public void setpModelID(String pModelID) {
		this.pModelID = pModelID;
	}
	public String getOrgNO() {
		return orgNO;
	}
	public void setOrgNO(String orgNO) {
		this.orgNO = orgNO;
	}
	public String getCreatorNO() {
		return creatorNO;
	}
	public void setCreatorNO(String creatorNO) {
		this.creatorNO = creatorNO;
	}
	public String getCustSQL() {
		return custSQL;
	}
	public void setCustSQL(String custSQL) {
		this.custSQL = custSQL;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
	
	public String queryTgOrgNo() throws Exception{     //***********查询供电单位
		try {
			Map<String,String> map = new HashMap<String, String>();
			map.put("vcmOrgNo", vcmOrgNo);
			vcmTgOrgNoList = groupModelManageService.queryTgOrgNo(map);
		} catch (Exception e) {
			throw new Exception("查询供电管理单位差错");
		}
		return SUCCESS;
	}
	
	public String queryGROUP_TYPE_CODE() throws Exception{    //***********查询群类型
		try {

			queryGROUP_TYPE_CODEList = groupModelManageService.queryGROUP_TYPE_CODE();
		} catch (Exception e) {
			throw new Exception("群类型查询差错");
		}
		return SUCCESS;
	}
	
	public String queryModel() throws Exception{    //***********查询群模型
		try {
			Map<String,String> map = new HashMap<String, String>();
			map.put("vcmOrgNo", vcmOrgNo);
			map.put("name", name);
			queryModelList = groupModelManageService.queryModel(map);
		} catch (Exception e) {
			throw new Exception("模型查询差错");
		}
		return SUCCESS;
	}
	
	public String queryModelCon() throws Exception{    //***********查询群模型条件
		try {
			Map<String,String> map = new HashMap<String, String>();
			map.put("CUST_GROUP_MODEL_ID", groupModelID);
			queryModelConList = groupModelManageService.queryModelCon(map);
		} catch (Exception e) {
			throw new Exception("模型查询差错");
		}
		return SUCCESS;
	}
	
	
	
	public String insertModelCondition() throws Exception{    //***********查询群模型
		try {
			Map<String,String> map = new HashMap<String, String>();
			map.put("CUST_GROUP_MODEL_ID", groupModelID);
			map.put("ATTR_ID",ATTR_ID );
			map.put("COND_NAME", COND_NAME);
			map.put("CONDITION", CONDITION);
			map.put("COMPARE_VALUE", COMPARE_VALUE);
			map.put("LOGIC_SYMBOL", LOGIC_SYMBOL);
            groupModelManageService.insertModelCondition(map);
            Map<String,String> mapSQL = new HashMap<String, String>();
            mapSQL.put("CUST_GROUP_MODEL_ID", groupModelID);
            //Map<String,String> mapSQLforUpdate = new HashMap<String, String>();
            //groupModelManageService.queryModel_CUST_SQL(mapSQL);
            groupModelManageService.updateModel_CUST_SQL(mapSQL);
		} catch (Exception e) {
			throw new Exception("插入模型条件差错");
		}
		return SUCCESS;
	}
	
	
	public String insertModel() throws Exception{    //***********保存群模型
		try {
			Map<String,String> map = new HashMap<String, String>();
			map.put("CUST_GROUP_MODEL_ID", groupModelID);
			map.put("name", name);
			map.put("groupTypeCode",groupTypeCode );
			map.put("pModelID", "1");
			map.put("orgNO", orgNO);
			map.put("creatorNO", creatorNO);
			
			SimpleDateFormat bartDateFormat = new SimpleDateFormat("yyyy-MM-dd");
			Date date = new Date();
			System.out.println(bartDateFormat.format(date)); 
			CREATE_TIME = bartDateFormat.format(date);
			START_DATE = bartDateFormat.format(date);
			STOP_DATE = bartDateFormat.format(date);
			
			
			map.put("CREATE_TIME",CREATE_TIME );
			map.put("START_DATE",START_DATE );
			map.put("STOP_PERSON_NO","" );
			map.put("STOP_REASON",STOP_REASON );
			map.put("STOP_DATE", STOP_DATE);
			map.put("STOP_FLAG",STOP_FLAG );
			map.put("APP_NO", APP_NO);
			
			map.put("custSQL", custSQL);
			map.put("remark",remark );
            groupModelManageService.insertModel(map);
		} catch (Exception e) {
			throw new Exception("模型查询差错");
		}
		return SUCCESS;
	}
	
	public String delModel() throws Exception{    //***********删除群模型
		try {
			Map<String,String> map = new HashMap<String, String>();
			map.put("groupModelID", groupModelID);
			groupModelManageService.delModel(map);
		} catch (Exception e) {
			throw new Exception("模型删除差错");
		}
		return SUCCESS;
	}
	
	public String delModelCon() throws Exception{    //***********删除群模型
		try {
			Map<String,String> map = new HashMap<String, String>();
			map.put("CUST_GROUP_MODEL_ID", CUST_GROUP_MODEL_ID);
			map.put("COND_ID", COND_ID);
			groupModelManageService.delModelCon(map);
			
            Map<String,String> mapSQL = new HashMap<String, String>();
            mapSQL.put("CUST_GROUP_MODEL_ID", CUST_GROUP_MODEL_ID);
            groupModelManageService.updateModel_CUST_SQL(mapSQL);
		} catch (Exception e) {
			throw new Exception("模型条件删除差错");
		}
		return SUCCESS;
	}
	
	
	
	public String updateModel() throws Exception{    //***********删除群模型
		try {
			Map<String,String> map = new HashMap<String, String>();
			map.put("name", name);
			map.put("orgNO", orgNO);
			map.put("creatorNO", creatorNO);
			map.put("groupTypeCode", groupTypeCode);
			
			groupModelManageService.updateModel(map);
		} catch (Exception e) {
			throw new Exception("模型修改差错");
		}
		return SUCCESS;
	}
	public void setQueryModelConList(List<Map<String,Object>> queryModelConList) {
		this.queryModelConList = queryModelConList;
	}
	public List<Map<String,Object>> getQueryModelConList() {
		return queryModelConList;
	}
	public void setCONDITION(String cONDITION) {
		CONDITION = cONDITION;
	}
	public String getCONDITION() {
		return CONDITION;
	}
	public void setCOND_ID(String cOND_ID) {
		COND_ID = cOND_ID;
	}
	public String getCOND_ID() {
		return COND_ID;
	}
	public void setCUST_GROUP_MODEL_ID(String cUST_GROUP_MODEL_ID) {
		CUST_GROUP_MODEL_ID = cUST_GROUP_MODEL_ID;
	}
	public String getCUST_GROUP_MODEL_ID() {
		return CUST_GROUP_MODEL_ID;
	}
	public void setQueryGROUP_TYPE_CODEList(List<Map<String,Object>> queryGROUP_TYPE_CODEList) {
		this.queryGROUP_TYPE_CODEList = queryGROUP_TYPE_CODEList;
	}
	public List<Map<String,Object>> getQueryGROUP_TYPE_CODEList() {
		return queryGROUP_TYPE_CODEList;
	}
	
}
