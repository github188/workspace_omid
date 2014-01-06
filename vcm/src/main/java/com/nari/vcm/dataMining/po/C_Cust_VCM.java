package com.nari.vcm.dataMining.po;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="C_CUST_VCM")
public class C_Cust_VCM {

	private String cust_id; 
	private String cust_type; 
	private String cust_no;
	private String cust_name;
	private String economy_type_code;
	private String annual_gp;
	private String credit_level_code;
	private String value_level_code;
	private String risk_level_code;
	private String vip_flag;
	private String query_pwd;
	private String enteprise_website;
	private String enteprise_scale;
	private String brief;
	private String reg_capital;
	private String t_captal;
	private String legal_person;
	private String oper_scope;
	private String main_product;
	private String produce_tech;
	private String output;
	private String vip_level;
	private String main_material;
	private String supply_src;
	private String sales_amt;
	private String sales_region;
	private String ps_ensure_prj;
	private String power_cost_ratio;
	private String industry_code;
	
	@Id
	public String getCust_id() {
		return cust_id;
	}
	public void setCust_id(String custId) {
		cust_id = custId;
	}
	public String getCust_type() {
		return cust_type;
	}
	public void setCust_type(String custType) {
		cust_type = custType;
	}
	public String getCust_no() {
		return cust_no;
	}
	public void setCust_no(String custNo) {
		cust_no = custNo;
	}
	public String getCust_name() {
		return cust_name;
	}
	public void setCust_name(String custName) {
		cust_name = custName;
	}
	public String getEconomy_type_code() {
		return economy_type_code;
	}
	public void setEconomy_type_code(String economyTypeCode) {
		economy_type_code = economyTypeCode;
	}
	public String getAnnual_gp() {
		return annual_gp;
	}
	public void setAnnual_gp(String annualGp) {
		annual_gp = annualGp;
	}
	public String getCredit_level_code() {
		return credit_level_code;
	}
	public void setCredit_level_code(String creditLevelCode) {
		credit_level_code = creditLevelCode;
	}
	public String getValue_level_code() {
		return value_level_code;
	}
	public void setValue_level_code(String valueLevelCode) {
		value_level_code = valueLevelCode;
	}
	public String getRisk_level_code() {
		return risk_level_code;
	}
	public void setRisk_level_code(String riskLevelCode) {
		risk_level_code = riskLevelCode;
	}
	public String getVip_flag() {
		return vip_flag;
	}
	public void setVip_flag(String vipFlag) {
		vip_flag = vipFlag;
	}
	public String getQuery_pwd() {
		return query_pwd;
	}
	public void setQuery_pwd(String queryPwd) {
		query_pwd = queryPwd;
	}
	public String getEnteprise_website() {
		return enteprise_website;
	}
	public void setEnteprise_website(String entepriseWebsite) {
		enteprise_website = entepriseWebsite;
	}
	public String getEnteprise_scale() {
		return enteprise_scale;
	}
	public void setEnteprise_scale(String entepriseScale) {
		enteprise_scale = entepriseScale;
	}
	public String getBrief() {
		return brief;
	}
	public void setBrief(String brief) {
		this.brief = brief;
	}
	public String getReg_capital() {
		return reg_capital;
	}
	public void setReg_capital(String regCapital) {
		reg_capital = regCapital;
	}
	public String getT_captal() {
		return t_captal;
	}
	public void setT_captal(String tCaptal) {
		t_captal = tCaptal;
	}
	public String getLegal_person() {
		return legal_person;
	}
	public void setLegal_person(String legalPerson) {
		legal_person = legalPerson;
	}
	public String getOper_scope() {
		return oper_scope;
	}
	public void setOper_scope(String operScope) {
		oper_scope = operScope;
	}
	public String getMain_product() {
		return main_product;
	}
	public void setMain_product(String mainProduct) {
		main_product = mainProduct;
	}
	public String getProduce_tech() {
		return produce_tech;
	}
	public void setProduce_tech(String produceTech) {
		produce_tech = produceTech;
	}
	public String getOutput() {
		return output;
	}
	public void setOutput(String output) {
		this.output = output;
	}
	public String getVip_level() {
		return vip_level;
	}
	public void setVip_level(String vipLevel) {
		vip_level = vipLevel;
	}
	public String getMain_material() {
		return main_material;
	}
	public void setMain_material(String mainMaterial) {
		main_material = mainMaterial;
	}
	public String getSupply_src() {
		return supply_src;
	}
	public void setSupply_src(String supplySrc) {
		supply_src = supplySrc;
	}
	public String getSales_amt() {
		return sales_amt;
	}
	public void setSales_amt(String salesAmt) {
		sales_amt = salesAmt;
	}
	public String getSales_region() {
		return sales_region;
	}
	public void setSales_region(String salesRegion) {
		sales_region = salesRegion;
	}
	public String getPs_ensure_prj() {
		return ps_ensure_prj;
	}
	public void setPs_ensure_prj(String psEnsurePrj) {
		ps_ensure_prj = psEnsurePrj;
	}
	public String getPower_cost_ratio() {
		return power_cost_ratio;
	}
	public void setPower_cost_ratio(String powerCostRatio) {
		power_cost_ratio = powerCostRatio;
	}
	public String getIndustry_code() {
		return industry_code;
	}
	public void setIndustry_code(String industryCode) {
		industry_code = industryCode;
	}
}
