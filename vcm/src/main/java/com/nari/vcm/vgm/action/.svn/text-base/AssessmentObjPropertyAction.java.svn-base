package com.nari.vcm.vgm.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.nari.vcm.vgm.service.AssessmentObjPropertyService;
import com.nari.vcm.vgm.service.GroupModelManageService;
import com.opensymphony.xwork2.ActionSupport;


@ParentPackage("json-default")
@Namespace("/")
@Action("AssessmentObjPropertyAction")
@Results({@Result(name="success",type="json"),@Result(name="input",type="json")})
public class AssessmentObjPropertyAction extends ActionSupport{
	
	@Autowired
	private AssessmentObjPropertyService assessmentObjPropertyService;
	private GroupModelManageService groupModelManageService;
	public String getATTR_ID() {
		return ATTR_ID;
	}
	public void setATTR_ID(String aTTRID) {
		ATTR_ID = aTTRID;
	}
	public String getATTR_NAME() {
		return ATTR_NAME;
	}
	public void setATTR_NAME(String aTTRNAME) {
		ATTR_NAME = aTTRNAME;
	}
	public String getUSAGE_CODE() {
		return USAGE_CODE;
	}
	public void setUSAGE_CODE(String uSAGECODE) {
		USAGE_CODE = uSAGECODE;
	}
	public String getTYPE_CODE() {
		return TYPE_CODE;
	}
	public void setTYPE_CODE(String tYPECODE) {
		TYPE_CODE = tYPECODE;
	}
	public String getUNIT() {
		return UNIT;
	}
	public void setUNIT(String uNIT) {
		UNIT = uNIT;
	}
	public String getPS_ORG_NO() {
		return PS_ORG_NO;
	}
	public void setPS_ORG_NO(String pSORGNO) {
		PS_ORG_NO = pSORGNO;
	}
	public String getEFFECT_DEGREE() {
		return EFFECT_DEGREE;
	}
	public void setEFFECT_DEGREE(String eFFECTDEGREE) {
		EFFECT_DEGREE = eFFECTDEGREE;
	}
	public String getDATA_SRC() {
		return DATA_SRC;
	}
	public void setDATA_SRC(String dATASRC) {
		DATA_SRC = dATASRC;
	}
	public String getSRC_FIELD() {
		return SRC_FIELD;
	}
	public void setSRC_FIELD(String sRCFIELD) {
		SRC_FIELD = sRCFIELD;
	}
	public String getSRC_TABLE() {
		return SRC_TABLE;
	}
	public void setSRC_TABLE(String sRCTABLE) {
		SRC_TABLE = sRCTABLE;
	}
	public String getATTR_COMMENT() {
		return ATTR_COMMENT;
	}
	public void setATTR_COMMENT(String aTTRCOMMENT) {
		ATTR_COMMENT = aTTRCOMMENT;
	}
	public String getRISK_TYPE_CODE() {
		return RISK_TYPE_CODE;
	}
	public void setRISK_TYPE_CODE(String rISKTYPECODE) {
		RISK_TYPE_CODE = rISKTYPECODE;
	}
	public String getANALYSE_TYPE() {
		return ANALYSE_TYPE;
	}
	public void setANALYSE_TYPE(String aNALYSETYPE) {
		ANALYSE_TYPE = aNALYSETYPE;
	}
	public String getEVENT_LEVEL() {
		return EVENT_LEVEL;
	}
	public void setEVENT_LEVEL(String eVENTLEVEL) {
		EVENT_LEVEL = eVENTLEVEL;
	}
	public List<Map<String, Object>> getVcmTgOrgNoList() {
		return vcmTgOrgNoList;
	}
	public void setVcmTgOrgNoList(List<Map<String, Object>> vcmTgOrgNoList) {
		this.vcmTgOrgNoList = vcmTgOrgNoList;
	}
	public List<Map<String, Object>> getQueryAOPList() {
		return queryAOPList;
	}
	public void setQueryAOPList(List<Map<String, Object>> queryAOPList) {
		this.queryAOPList = queryAOPList;
	}

	private String ATTR_ID; //评估对象属性ID
	private String ATTR_NAME; //属性名称
	private String USAGE_CODE; //属性用途
	private String TYPE_CODE; //属性类别
	private String UNIT; //属性单位途
	private String PS_ORG_NO; //供电单位编号
	private String EFFECT_DEGREE; //影响程度
	private String DATA_SRC; //数据来源
	private String SRC_FIELD; //来源字段
	private String SRC_TABLE; //来源表
	private String ATTR_COMMENT; //说明
	private String RISK_TYPE_CODE; //风险因素类别
	private String ANALYSE_TYPE; //分析类型
	private String EVENT_LEVEL; //分析项等级
	
	private List<Map<String,Object>>vcmTgOrgNoList; //供电单位编号 List
	private List<Map<String,Object>>queryUNIT_CODEList; //属性单位List
	private List<Map<String,Object>>queryTYPE_CODEList; //属性类别
	private List<Map<String,Object>>queryUSAGE_CODEList; //属性用途类别
	private List<Map<String,Object>>queryEFFECT_DEGREEList; //影响程度
	private List<Map<String,Object>>queryRISK_TYPE_CODEList; //风险类别因素
	private List<Map<String,Object>>queryANALYSE_TYPEList; //分析类型
	private List<Map<String,Object>>queryEVENT_LEVELList; //分析项等级
	
	private List<Map<String,Object>>queryAOPList; //评估对象属性查询结果 List
	
	
	
	public String queryTgOrgNo() throws Exception{     //***********查询供电单位
		try {
			Map<String,String> map = new HashMap<String, String>();
			map.put("vcmOrgNo",PS_ORG_NO);
			vcmTgOrgNoList = groupModelManageService.queryTgOrgNo(map);
		} catch (Exception e) {
			throw new Exception("查询供电管理单位差错");
		}
		return SUCCESS;
	}
	
	public String queryUNIT_CODE() throws Exception{    //***********查询群模型
		try {
			queryUNIT_CODEList = assessmentObjPropertyService.queryUNIT_CODE();
		} catch (Exception e) {
			throw new Exception("属性单位查询差错");
		}
		return SUCCESS;
	}
	
	public String queryTYPE_CODE() throws Exception{    //***********查询群模型
		try {
			queryTYPE_CODEList = assessmentObjPropertyService.queryTYPE_CODE();
		} catch (Exception e) {
			throw new Exception("属性类别查询差错");
		}
		return SUCCESS;
	}
	
	public String queryUSAGE_CODE() throws Exception{    //***********查询群用途类型
		try {
			queryUSAGE_CODEList = assessmentObjPropertyService.queryUSAGE_CODE();
		} catch (Exception e) {
			throw new Exception("群用途图类型查询差错");
		}
		return SUCCESS;
	}	
	
	public String queryEFFECT_DEGREE() throws Exception{    //***********查询影响程度
		try {
			queryEFFECT_DEGREEList = assessmentObjPropertyService.queryEFFECT_DEGREE();
		} catch (Exception e) {
			throw new Exception("影响程度查询差错");
		}
		return SUCCESS;
	}	

	public String queryANALYSE_TYPE() throws Exception{    //***********查询分析类型
		try {
			queryANALYSE_TYPEList = assessmentObjPropertyService.queryANALYSE_TYPE();
		} catch (Exception e) {
			throw new Exception("分析类型查询差错");
		}
		return SUCCESS;
	}	
	public String queryEVENT_LEVEL() throws Exception{    //***********查询分析项等级
		try {
			queryEVENT_LEVELList = assessmentObjPropertyService.queryEVENT_LEVEL();
		} catch (Exception e) {
			throw new Exception("分析项等级查询差错");
		}
		return SUCCESS;
	}
	
	
	public String queryAOP() throws Exception{    //***********查询群模型
		try {
			Map<String,String> map = new HashMap<String, String>();
			map.put("ATTR_NAME", ATTR_NAME);
			map.put("PS_ORG_NO", PS_ORG_NO);
			queryAOPList = assessmentObjPropertyService.queryAOP(map);
		} catch (Exception e) {
			throw new Exception("评估对象属性查询差错");
		}
		return SUCCESS;
	}
	public String insertAOP() throws Exception{    //***********查询评估对象属性
		try {
			Map<String,String> map = new HashMap<String, String>();
			map.put("ATTR_ID", ATTR_ID);
			map.put("ATTR_NAME",ATTR_NAME );
			map.put("USAGE_CODE", USAGE_CODE);
			map.put("TYPE_CODE", TYPE_CODE);
			map.put("UNIT", UNIT);
			map.put("PS_ORG_NO", PS_ORG_NO);
			
			map.put("EFFECT_DEGREE",EFFECT_DEGREE );
			map.put("DATA_SRC",DATA_SRC );
			map.put("SRC_FIELD", SRC_FIELD);
			map.put("SRC_TABLE", SRC_TABLE);
			map.put("ATTR_COMMENT", ATTR_COMMENT);
			
			map.put("RISK_TYPE_CODE", RISK_TYPE_CODE);
			map.put("ANALYSE_TYPE",ANALYSE_TYPE );
			map.put("EVENT_LEVEL", EVENT_LEVEL);
			assessmentObjPropertyService.insertAOP(map);
		} catch (Exception e) {
			throw new Exception("新建评估属性差错");
		}
		return SUCCESS;
	}
	
	public String delAOP() throws Exception{    //***********删除评估对象属性
		try {
			Map<String,String> map = new HashMap<String, String>();
			map.put("ATTR_ID", ATTR_ID);
			assessmentObjPropertyService.delAOP(map);
		} catch (Exception e) {
			throw new Exception("评估对象属性删除差错");
		}
		return SUCCESS;
	}
	
	public String updateModel() throws Exception{    //***********更新评估对象属性
		try {
			Map<String,String> map = new HashMap<String, String>();
			map.put("ATTR_ID", ATTR_ID);
			map.put("ATTR_NAME",ATTR_NAME );
			map.put("USAGE_CODE", "USAGE_CODE");
			map.put("TYPE_CODE", TYPE_CODE);
			map.put("UNIT", UNIT);
			map.put("PS_ORG_NO", PS_ORG_NO);
			map.put("DATA_SRC",DATA_SRC );
			map.put("SRC_FIELD", "SRC_FIELD");
			map.put("SRC_TABLE", SRC_TABLE);
			map.put("ATTR_COMMENT", ATTR_COMMENT);
			map.put("RISK_TYPE_CODE", RISK_TYPE_CODE);
			map.put("ANALYSE_TYPE",ANALYSE_TYPE );
			map.put("EVENT_LEVEL", "EVENT_LEVEL");
			
			assessmentObjPropertyService.updateAOP(map);
		} catch (Exception e) {
			throw new Exception("评估对象属性修改差错");
		}
		return SUCCESS;
	}
	public void setQueryUNIT_CODEList(List<Map<String,Object>> queryUNIT_CODEList) {
		this.queryUNIT_CODEList = queryUNIT_CODEList;
	}
	public List<Map<String,Object>> getQueryUNIT_CODEList() {
		return queryUNIT_CODEList;
	}
	public void setQueryRISK_TYPE_CODEList(List<Map<String,Object>> queryRISK_TYPE_CODEList) {
		this.queryRISK_TYPE_CODEList = queryRISK_TYPE_CODEList;
	}
	public List<Map<String,Object>> getQueryRISK_TYPE_CODEList() {
		return queryRISK_TYPE_CODEList;
	}
	public void setQueryEFFECT_DEGREEList(List<Map<String,Object>> queryEFFECT_DEGREEList) {
		this.queryEFFECT_DEGREEList = queryEFFECT_DEGREEList;
	}
	public List<Map<String,Object>> getQueryEFFECT_DEGREEList() {
		return queryEFFECT_DEGREEList;
	}
	public void setQueryUSAGE_CODEList(List<Map<String,Object>> queryUSAGE_CODEList) {
		this.queryUSAGE_CODEList = queryUSAGE_CODEList;
	}
	public List<Map<String,Object>> getQueryUSAGE_CODEList() {
		return queryUSAGE_CODEList;
	}
	public void setQueryANALYSE_TYPEList(List<Map<String,Object>> queryANALYSE_TYPEList) {
		this.queryANALYSE_TYPEList = queryANALYSE_TYPEList;
	}
	public List<Map<String,Object>> getQueryANALYSE_TYPEList() {
		return queryANALYSE_TYPEList;
	}
	public void setQueryEVENT_LEVELList(List<Map<String,Object>> queryEVENT_LEVELList) {
		this.queryEVENT_LEVELList = queryEVENT_LEVELList;
	}
	public List<Map<String,Object>> getQueryEVENT_LEVELList() {
		return queryEVENT_LEVELList;
	}
	public void setQueryTYPE_CODEList(List<Map<String,Object>> queryTYPE_CODEList) {
		this.queryTYPE_CODEList = queryTYPE_CODEList;
	}
	public List<Map<String,Object>> getQueryTYPE_CODEList() {
		return queryTYPE_CODEList;
	}
	
}
