package com.nari.demo.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.nari.common.model.AbstractModel;


/**
 */
@Entity
@Table(name = "T_TMNL_EXCEPTION_STAT_D")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TmnlExcModel  extends AbstractModel {

    @Id
    //@GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "stat_id", nullable = false)
    private String stat_id;
    
    @Column(name = "org_no")
    private String org_no;
    
    @Column(name = "org_type")
    private String org_type;
    
    @Column(name = "stat_date")
    private String stat_date;
    
    @Column(name = "event_code")
    private String  event_code;
    
    @Column(name = "terminal_type_code")
    private String terminal_type_code;
    
    @Column(name = "factory_code")
    private String factory_code;
    
    @Column(name = "protocol_code")
    private String protocol_code;
    
    @Column(name = "flow_status_code")
    private String  flow_status_code;
    
   
	public String getStat_id() {
		return stat_id;
	}

	public void setStat_id(String statId) {
		stat_id = statId;
	}

	public String getOrg_no() {
		return org_no;
	}

	public void setOrg_no(String orgNo) {
		org_no = orgNo;
	}

	public String getOrg_type() {
		return org_type;
	}

	public void setOrg_type(String orgType) {
		org_type = orgType;
	}

	public String getStat_date() {
		return stat_date;
	}

	public void setStat_date(String statDate) {
		stat_date = statDate;
	}

	public String getEvent_code() {
		return event_code;
	}

	public void setEvent_code(String eventCode) {
		event_code = eventCode;
	}

	public String getTerminal_type_code() {
		return terminal_type_code;
	}

	public void setTerminal_type_code(String terminalTypeCode) {
		terminal_type_code = terminalTypeCode;
	}

	public String getFactory_code() {
		return factory_code;
	}

	public void setFactory_code(String factoryCode) {
		factory_code = factoryCode;
	}

	public String getProtocol_code() {
		return protocol_code;
	}

	public void setProtocol_code(String protocolCode) {
		protocol_code = protocolCode;
	}

	public String getFlow_status_code() {
		return flow_status_code;
	}

	public void setFlow_status_code(String flowStatusCode) {
		flow_status_code = flowStatusCode;
	}

	public int getExcept_cnt() {
		return except_cnt;
	}

	public void setExcept_cnt(int exceptCnt) {
		except_cnt = exceptCnt;
	}

	@Column(name = "except_cnt")
    private int  except_cnt;
    
    
}
