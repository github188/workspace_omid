package com.nari.vcm.dataMining.po;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="C_CONS_VCM")
public class C_Cons_VCM {

	private String cons_id;
	private String cust_id; 
	private String cons_src; 
	private String org_no; 
	private String area_no; 
	private String cons_no; 
	private String cons_name; 
	private String cust_no; 
	private String subs_id; 
	private String tg_id; 
	private String line_id; 
	private String meter_id; 
	private String cust_query_no; 
	private String tmp_pay_rela_no; 
	private String orgn_cons_no; 
	private String cons_sort_code; 
	private String elec_addr; 
	private String trade_code; 
	private String cons_type; 
	private String elec_type_code; 
	private String contract_cap; 
	private String run_cap; 
	private String cap_grade_no; 
	private String shift_no; 
	private String lode_attr_code; 
	private String volt_code; 
	private String hec_industry_code; 
	private String high_risk; 
	private String is_vip; 
	private String holiday; 
	private String build_date; 
	private String ps_date; 
	private String cancel_date; 
	private String due_date; 
	private String notify_mode; 
	private String settle_mode; 
	private String status_code; 
	private String rrio_code; 
	private String chk_cycle; 
	private String last_chk_date; 
	private String checker_no; 
	private String poweroff_code; 
	private String transfer_code; 
	private String mr_sect_no; 
	private String note_type_code; 
	private String tmp_flag; 
	private String tmp_date; 
	private String apply_no; 
	private String apply_date; 
	private String cons_sort; 
	
	@Id
	public String getCons_id() {
		return cons_id;
	}
	public void setCons_id(String consId) {
		cons_id = consId;
	}
	public String getCust_id() {
		return cust_id;
	}
	public void setCust_id(String custId) {
		cust_id = custId;
	}
	public String getCons_src() {
		return cons_src;
	}
	public void setCons_src(String consSrc) {
		cons_src = consSrc;
	}
	public String getOrg_no() {
		return org_no;
	}
	public void setOrg_no(String orgNo) {
		org_no = orgNo;
	}
	public String getArea_no() {
		return area_no;
	}
	public void setArea_no(String areaNo) {
		area_no = areaNo;
	}
	public String getCons_no() {
		return cons_no;
	}
	public void setCons_no(String consNo) {
		cons_no = consNo;
	}
	public String getCons_name() {
		return cons_name;
	}
	public void setCons_name(String consName) {
		cons_name = consName;
	}
	public String getCust_no() {
		return cust_no;
	}
	public void setCust_no(String custNo) {
		cust_no = custNo;
	}
	public String getSubs_id() {
		return subs_id;
	}
	public void setSubs_id(String subsId) {
		subs_id = subsId;
	}
	public String getTg_id() {
		return tg_id;
	}
	public void setTg_id(String tgId) {
		tg_id = tgId;
	}
	public String getLine_id() {
		return line_id;
	}
	public void setLine_id(String lineId) {
		line_id = lineId;
	}
	public String getMeter_id() {
		return meter_id;
	}
	public void setMeter_id(String meterId) {
		meter_id = meterId;
	}
	public String getCust_query_no() {
		return cust_query_no;
	}
	public void setCust_query_no(String custQueryNo) {
		cust_query_no = custQueryNo;
	}
	public String getTmp_pay_rela_no() {
		return tmp_pay_rela_no;
	}
	public void setTmp_pay_rela_no(String tmpPayRelaNo) {
		tmp_pay_rela_no = tmpPayRelaNo;
	}
	public String getOrgn_cons_no() {
		return orgn_cons_no;
	}
	public void setOrgn_cons_no(String orgnConsNo) {
		orgn_cons_no = orgnConsNo;
	}
	public String getCons_sort_code() {
		return cons_sort_code;
	}
	public void setCons_sort_code(String consSortCode) {
		cons_sort_code = consSortCode;
	}
	public String getElec_addr() {
		return elec_addr;
	}
	public void setElec_addr(String elecAddr) {
		elec_addr = elecAddr;
	}
	public String getTrade_code() {
		return trade_code;
	}
	public void setTrade_code(String tradeCode) {
		trade_code = tradeCode;
	}
	public String getCons_type() {
		return cons_type;
	}
	public void setCons_type(String consType) {
		cons_type = consType;
	}
	public String getElec_type_code() {
		return elec_type_code;
	}
	public void setElec_type_code(String elecTypeCode) {
		elec_type_code = elecTypeCode;
	}
	public String getContract_cap() {
		return contract_cap;
	}
	public void setContract_cap(String contractCap) {
		contract_cap = contractCap;
	}
	public String getRun_cap() {
		return run_cap;
	}
	public void setRun_cap(String runCap) {
		run_cap = runCap;
	}
	public String getCap_grade_no() {
		return cap_grade_no;
	}
	public void setCap_grade_no(String capGradeNo) {
		cap_grade_no = capGradeNo;
	}
	public String getShift_no() {
		return shift_no;
	}
	public void setShift_no(String shiftNo) {
		shift_no = shiftNo;
	}
	public String getLode_attr_code() {
		return lode_attr_code;
	}
	public void setLode_attr_code(String lodeAttrCode) {
		lode_attr_code = lodeAttrCode;
	}
	public String getVolt_code() {
		return volt_code;
	}
	public void setVolt_code(String voltCode) {
		volt_code = voltCode;
	}
	public String getHec_industry_code() {
		return hec_industry_code;
	}
	public void setHec_industry_code(String hecIndustryCode) {
		hec_industry_code = hecIndustryCode;
	}
	public String getHigh_risk() {
		return high_risk;
	}
	public void setHigh_risk(String highRisk) {
		high_risk = highRisk;
	}
	public String getIs_vip() {
		return is_vip;
	}
	public void setIs_vip(String isVip) {
		is_vip = isVip;
	}
	public String getHoliday() {
		return holiday;
	}
	public void setHoliday(String holiday) {
		this.holiday = holiday;
	}
	public String getBuild_date() {
		return build_date;
	}
	public void setBuild_date(String buildDate) {
		build_date = buildDate;
	}
	public String getPs_date() {
		return ps_date;
	}
	public void setPs_date(String psDate) {
		ps_date = psDate;
	}
	public String getCancel_date() {
		return cancel_date;
	}
	public void setCancel_date(String cancelDate) {
		cancel_date = cancelDate;
	}
	public String getDue_date() {
		return due_date;
	}
	public void setDue_date(String dueDate) {
		due_date = dueDate;
	}
	public String getNotify_mode() {
		return notify_mode;
	}
	public void setNotify_mode(String notifyMode) {
		notify_mode = notifyMode;
	}
	public String getSettle_mode() {
		return settle_mode;
	}
	public void setSettle_mode(String settleMode) {
		settle_mode = settleMode;
	}
	public String getStatus_code() {
		return status_code;
	}
	public void setStatus_code(String statusCode) {
		status_code = statusCode;
	}
	public String getRrio_code() {
		return rrio_code;
	}
	public void setRrio_code(String rrioCode) {
		rrio_code = rrioCode;
	}
	public String getChk_cycle() {
		return chk_cycle;
	}
	public void setChk_cycle(String chkCycle) {
		chk_cycle = chkCycle;
	}
	public String getLast_chk_date() {
		return last_chk_date;
	}
	public void setLast_chk_date(String lastChkDate) {
		last_chk_date = lastChkDate;
	}
	public String getChecker_no() {
		return checker_no;
	}
	public void setChecker_no(String checkerNo) {
		checker_no = checkerNo;
	}
	public String getPoweroff_code() {
		return poweroff_code;
	}
	public void setPoweroff_code(String poweroffCode) {
		poweroff_code = poweroffCode;
	}
	public String getTransfer_code() {
		return transfer_code;
	}
	public void setTransfer_code(String transferCode) {
		transfer_code = transferCode;
	}
	public String getMr_sect_no() {
		return mr_sect_no;
	}
	public void setMr_sect_no(String mrSectNo) {
		mr_sect_no = mrSectNo;
	}
	public String getNote_type_code() {
		return note_type_code;
	}
	public void setNote_type_code(String noteTypeCode) {
		note_type_code = noteTypeCode;
	}
	public String getTmp_flag() {
		return tmp_flag;
	}
	public void setTmp_flag(String tmpFlag) {
		tmp_flag = tmpFlag;
	}
	public String getTmp_date() {
		return tmp_date;
	}
	public void setTmp_date(String tmpDate) {
		tmp_date = tmpDate;
	}
	public String getApply_no() {
		return apply_no;
	}
	public void setApply_no(String applyNo) {
		apply_no = applyNo;
	}
	public String getApply_date() {
		return apply_date;
	}
	public void setApply_date(String applyDate) {
		apply_date = applyDate;
	}
	public String getCons_sort() {
		return cons_sort;
	}
	public void setCons_sort(String consSort) {
		cons_sort = consSort;
	}
}
