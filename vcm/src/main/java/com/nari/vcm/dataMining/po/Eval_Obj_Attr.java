package com.nari.vcm.dataMining.po;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="S_EVAL_OBJ_ATTR")
public class Eval_Obj_Attr {
     private String attr_ID;
     private String attr_Name;
     private String usage_Code;
     private String type_Code;
     private String unit ;
     private String ps_Org_No;
     private String effect_Degree;
     private String data_Xrc;
     private String src_Field;
     private String src_Xable;
     private String attr_Comment;
     private String risk_Xype_Code;
     private String analyse_Type;
     private String event_Level;
     
     @Id
     public String getAttr_ID() {
		return attr_ID;
	}
	public void setAttr_ID(String attrID) {
		attr_ID = attrID;
	}
	public String getAttr_Name() {
		return attr_Name;
	}
	public void setAttr_Name(String attrName) {
		attr_Name = attrName;
	}
	public String getUsage_Code() {
		return usage_Code;
	}
	public void setUsage_Code(String usageCode) {
		usage_Code = usageCode;
	}
	public String getType_Code() {
		return type_Code;
	}
	public void setType_Code(String typeCode) {
		type_Code = typeCode;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public String getPs_Org_No() {
		return ps_Org_No;
	}
	public void setPs_Org_No(String psOrgNo) {
		ps_Org_No = psOrgNo;
	}
	public String getEffect_Degree() {
		return effect_Degree;
	}
	public void setEffect_Degree(String effectDegree) {
		effect_Degree = effectDegree;
	}
	public String getData_Xrc() {
		return data_Xrc;
	}
	public void setData_Xrc(String dataXrc) {
		data_Xrc = dataXrc;
	}
	public String getSrc_Field() {
		return src_Field;
	}
	public void setSrc_Field(String srcField) {
		src_Field = srcField;
	}
	public String getSrc_Xable() {
		return src_Xable;
	}
	public void setSrc_Xable(String srcXable) {
		src_Xable = srcXable;
	}
	public String getAttr_Comment() {
		return attr_Comment;
	}
	public void setAttr_Comment(String attrComment) {
		attr_Comment = attrComment;
	}
	public String getRisk_Xype_Code() {
		return risk_Xype_Code;
	}
	public void setRisk_Xype_Code(String riskXypeCode) {
		risk_Xype_Code = riskXypeCode;
	}
	public String getAnalyse_Type() {
		return analyse_Type;
	}
	public void setAnalyse_Type(String analyseType) {
		analyse_Type = analyseType;
	}
	public String getEvent_Level() {
		return event_Level;
	}
	public void setEvent_Level(String eventLevel) {
		event_Level = eventLevel;
	}
}
