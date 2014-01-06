package com.nari.vcm.dataMining.po2;


import java.util.Date;


/**
 * create by scaffold
 * @author codefan@hotmail.com
 */ 

public class ZfbzjcComplaint implements java.io.Serializable {
	private static final long serialVersionUID =  1L;


	private String complaintNo;

	private String  complaintName;
	private String  complaintPa;
	private String  complaintNation;
	private String  complaintId;
	private String  complaintArea;
	private String  complaintTel;
	private String  complaintPostal;
	private String  complaintAddress;
	private String  complaintEmail;
	private String  complaintPost;
	private String  complaintUnit;
	private String  respondentName;
	private String  respondentSex;
	private String  respondentNation;
	private String  respondentPa;
	private String  respondentLevel;
	private String  respondentPost;
	private String  respondentSpecialStaus;
	private String  respondentArea;
	private String  respondentAddress;
	private String  respondentProblem;
	private String  respondentContent;
	private Date  acceptanceTime;
	private String  attn;
	private String  respondentUnit;
	private String  actionType;
	private String  doType;
	private Date  actionTime;
	private Date  actionLimit;
	private String  signUnit;
	private Date  signTime;
	private String  replyer;
	private Date  replyTime;
	private String  actionOpinion;
	private String  replyOpinion;
	private String  doOpinion;
	private String  processType2;
	private Date  syncDate;
	private String  syncSign;
	private String  syncErrorDesc;
	private String  complaintSex;
	
	/** 投诉受理时间开始 */
	private Date acceptanceTimeBegin;
	/** 投诉受理时间结束 */
	private Date acceptanceTimeEnd;
	
	
	public Date getAcceptanceTimeBegin() {
        return acceptanceTimeBegin;
    }
    public void setAcceptanceTimeBegin(Date acceptanceTimeBegin) {
        this.acceptanceTimeBegin = acceptanceTimeBegin;
    }
    public Date getAcceptanceTimeEnd() {
        return acceptanceTimeEnd;
    }
    public void setAcceptanceTimeEnd(Date acceptanceTimeEnd) {
        this.acceptanceTimeEnd = acceptanceTimeEnd;
    }
    // Constructors
	/** default constructor */
	public ZfbzjcComplaint() {
	}
	/** minimal constructor */
	public ZfbzjcComplaint(
		String complaintNo		
		) {
	
	
		this.complaintNo = complaintNo;		
			
	}

/** full constructor */
	public ZfbzjcComplaint(
	 String complaintNo		
	,String  complaintName,String  complaintPa,String  complaintNation,String  complaintId,String  complaintArea,String  complaintTel,String  complaintPostal,String  complaintAddress,String  complaintEmail,String  complaintPost,String  complaintUnit,String  respondentName,String  respondentSex,String  respondentNation,String  respondentPa,String  respondentLevel,String  respondentPost,String  respondentSpecialStaus,String  respondentArea,String  respondentAddress,String  respondentProblem,String  respondentContent,Date  acceptanceTime,String  attn,String  respondentUnit,String  actionType,String  doType,Date  actionTime,Date  actionLimit,String  signUnit,Date  signTime,String  replyer,Date  replyTime,String  actionOpinion,String  replyOpinion,String  doOpinion,String  processType2,Date  syncDate,String  syncSign,String  syncErrorDesc,String  complaintSex) {
	
	
		this.complaintNo = complaintNo;		
	
		this.complaintName= complaintName;
		this.complaintPa= complaintPa;
		this.complaintNation= complaintNation;
		this.complaintId= complaintId;
		this.complaintArea= complaintArea;
		this.complaintTel= complaintTel;
		this.complaintPostal= complaintPostal;
		this.complaintAddress= complaintAddress;
		this.complaintEmail= complaintEmail;
		this.complaintPost= complaintPost;
		this.complaintUnit= complaintUnit;
		this.respondentName= respondentName;
		this.respondentSex= respondentSex;
		this.respondentNation= respondentNation;
		this.respondentPa= respondentPa;
		this.respondentLevel= respondentLevel;
		this.respondentPost= respondentPost;
		this.respondentSpecialStaus= respondentSpecialStaus;
		this.respondentArea= respondentArea;
		this.respondentAddress= respondentAddress;
		this.respondentProblem= respondentProblem;
		this.respondentContent= respondentContent;
		this.acceptanceTime= acceptanceTime;
		this.attn= attn;
		this.respondentUnit= respondentUnit;
		this.actionType= actionType;
		this.doType= doType;
		this.actionTime= actionTime;
		this.actionLimit= actionLimit;
		this.signUnit= signUnit;
		this.signTime= signTime;
		this.replyer= replyer;
		this.replyTime= replyTime;
		this.actionOpinion= actionOpinion;
		this.replyOpinion= replyOpinion;
		this.doOpinion= doOpinion;
		this.processType2= processType2;
		this.syncDate= syncDate;
		this.syncSign= syncSign;
		this.syncErrorDesc= syncErrorDesc;
		this.complaintSex= complaintSex;		
	}
	

  
	public String getComplaintNo() {
		return this.complaintNo;
	}

	public void setComplaintNo(String complaintNo) {
		this.complaintNo = complaintNo;
	}
	// Property accessors
  
	public String getComplaintName() {
		return this.complaintName;
	}
	
	public void setComplaintName(String complaintName) {
		this.complaintName = complaintName;
	}
  
	public String getComplaintPa() {
		return this.complaintPa;
	}
	
	public void setComplaintPa(String complaintPa) {
		this.complaintPa = complaintPa;
	}
  
	public String getComplaintNation() {
		return this.complaintNation;
	}
	
	public void setComplaintNation(String complaintNation) {
		this.complaintNation = complaintNation;
	}
  
	public String getComplaintId() {
		return this.complaintId;
	}
	
	public void setComplaintId(String complaintId) {
		this.complaintId = complaintId;
	}
  
	public String getComplaintArea() {
		return this.complaintArea;
	}
	
	public void setComplaintArea(String complaintArea) {
		this.complaintArea = complaintArea;
	}
  
	public String getComplaintTel() {
		return this.complaintTel;
	}
	
	public void setComplaintTel(String complaintTel) {
		this.complaintTel = complaintTel;
	}
  
	public String getComplaintPostal() {
		return this.complaintPostal;
	}
	
	public void setComplaintPostal(String complaintPostal) {
		this.complaintPostal = complaintPostal;
	}
  
	public String getComplaintAddress() {
		return this.complaintAddress;
	}
	
	public void setComplaintAddress(String complaintAddress) {
		this.complaintAddress = complaintAddress;
	}
  
	public String getComplaintEmail() {
		return this.complaintEmail;
	}
	
	public void setComplaintEmail(String complaintEmail) {
		this.complaintEmail = complaintEmail;
	}
  
	public String getComplaintPost() {
		return this.complaintPost;
	}
	
	public void setComplaintPost(String complaintPost) {
		this.complaintPost = complaintPost;
	}
  
	public String getComplaintUnit() {
		return this.complaintUnit;
	}
	
	public void setComplaintUnit(String complaintUnit) {
		this.complaintUnit = complaintUnit;
	}
  
	public String getRespondentName() {
		return this.respondentName;
	}
	
	public void setRespondentName(String respondentName) {
		this.respondentName = respondentName;
	}
  
	public String getRespondentSex() {
		return this.respondentSex;
	}
	
	public void setRespondentSex(String respondentSex) {
		this.respondentSex = respondentSex;
	}
  
	public String getRespondentNation() {
		return this.respondentNation;
	}
	
	public void setRespondentNation(String respondentNation) {
		this.respondentNation = respondentNation;
	}
  
	public String getRespondentPa() {
		return this.respondentPa;
	}
	
	public void setRespondentPa(String respondentPa) {
		this.respondentPa = respondentPa;
	}
  
	public String getRespondentLevel() {
		return this.respondentLevel;
	}
	
	public void setRespondentLevel(String respondentLevel) {
		this.respondentLevel = respondentLevel;
	}
  
	public String getRespondentPost() {
		return this.respondentPost;
	}
	
	public void setRespondentPost(String respondentPost) {
		this.respondentPost = respondentPost;
	}
  
	public String getRespondentSpecialStaus() {
		return this.respondentSpecialStaus;
	}
	
	public void setRespondentSpecialStaus(String respondentSpecialStaus) {
		this.respondentSpecialStaus = respondentSpecialStaus;
	}
  
	public String getRespondentArea() {
		return this.respondentArea;
	}
	
	public void setRespondentArea(String respondentArea) {
		this.respondentArea = respondentArea;
	}
  
	public String getRespondentAddress() {
		return this.respondentAddress;
	}
	
	public void setRespondentAddress(String respondentAddress) {
		this.respondentAddress = respondentAddress;
	}
  
	public String getRespondentProblem() {
		return this.respondentProblem;
	}
	
	public void setRespondentProblem(String respondentProblem) {
		this.respondentProblem = respondentProblem;
	}
  
	public String getRespondentContent() {
		return this.respondentContent;
	}
	
	public void setRespondentContent(String respondentContent) {
		this.respondentContent = respondentContent;
	}
  
	public Date getAcceptanceTime() {
		return this.acceptanceTime;
	}
	
	public void setAcceptanceTime(Date acceptanceTime) {
		this.acceptanceTime = acceptanceTime;
	}
  
	public String getAttn() {
		return this.attn;
	}
	
	public void setAttn(String attn) {
		this.attn = attn;
	}
  
	public String getRespondentUnit() {
		return this.respondentUnit;
	}
	
	public void setRespondentUnit(String respondentUnit) {
		this.respondentUnit = respondentUnit;
	}
  
	public String getActionType() {
		return this.actionType;
	}
	
	public void setActionType(String actionType) {
		this.actionType = actionType;
	}
  
	public String getDoType() {
		return this.doType;
	}
	
	public void setDoType(String doType) {
		this.doType = doType;
	}
  
	public Date getActionTime() {
		return this.actionTime;
	}
	
	public void setActionTime(Date actionTime) {
		this.actionTime = actionTime;
	}
  
	public Date getActionLimit() {
		return this.actionLimit;
	}
	
	public void setActionLimit(Date actionLimit) {
		this.actionLimit = actionLimit;
	}
  
	public String getSignUnit() {
		return this.signUnit;
	}
	
	public void setSignUnit(String signUnit) {
		this.signUnit = signUnit;
	}
  
	public Date getSignTime() {
		return this.signTime;
	}
	
	public void setSignTime(Date signTime) {
		this.signTime = signTime;
	}
  
	public String getReplyer() {
		return this.replyer;
	}
	
	public void setReplyer(String replyer) {
		this.replyer = replyer;
	}
  
	public Date getReplyTime() {
		return this.replyTime;
	}
	
	public void setReplyTime(Date replyTime) {
		this.replyTime = replyTime;
	}
  
	public String getActionOpinion() {
		return this.actionOpinion;
	}
	
	public void setActionOpinion(String actionOpinion) {
		this.actionOpinion = actionOpinion;
	}
  
	public String getReplyOpinion() {
		return this.replyOpinion;
	}
	
	public void setReplyOpinion(String replyOpinion) {
		this.replyOpinion = replyOpinion;
	}
  
	public String getDoOpinion() {
		return this.doOpinion;
	}
	
	public void setDoOpinion(String doOpinion) {
		this.doOpinion = doOpinion;
	}
  
	public String getProcessType2() {
		return this.processType2;
	}
	
	public void setProcessType2(String processType2) {
		this.processType2 = processType2;
	}
  
	public Date getSyncDate() {
		return this.syncDate;
	}
	
	public void setSyncDate(Date syncDate) {
		this.syncDate = syncDate;
	}
  
	public String getSyncSign() {
		return this.syncSign;
	}
	
	public void setSyncSign(String syncSign) {
		this.syncSign = syncSign;
	}
  
	public String getSyncErrorDesc() {
		return this.syncErrorDesc;
	}
	
	public void setSyncErrorDesc(String syncErrorDesc) {
		this.syncErrorDesc = syncErrorDesc;
	}
  
	public String getComplaintSex() {
		return this.complaintSex;
	}
	
	public void setComplaintSex(String complaintSex) {
		this.complaintSex = complaintSex;
	}



	public void copy(ZfbzjcComplaint other){
  
		this.setComplaintNo(other.getComplaintNo());
  
		this.complaintName= other.getComplaintName();  
		this.complaintPa= other.getComplaintPa();  
		this.complaintNation= other.getComplaintNation();  
		this.complaintId= other.getComplaintId();  
		this.complaintArea= other.getComplaintArea();  
		this.complaintTel= other.getComplaintTel();  
		this.complaintPostal= other.getComplaintPostal();  
		this.complaintAddress= other.getComplaintAddress();  
		this.complaintEmail= other.getComplaintEmail();  
		this.complaintPost= other.getComplaintPost();  
		this.complaintUnit= other.getComplaintUnit();  
		this.respondentName= other.getRespondentName();  
		this.respondentSex= other.getRespondentSex();  
		this.respondentNation= other.getRespondentNation();  
		this.respondentPa= other.getRespondentPa();  
		this.respondentLevel= other.getRespondentLevel();  
		this.respondentPost= other.getRespondentPost();  
		this.respondentSpecialStaus= other.getRespondentSpecialStaus();  
		this.respondentArea= other.getRespondentArea();  
		this.respondentAddress= other.getRespondentAddress();  
		this.respondentProblem= other.getRespondentProblem();  
		this.respondentContent= other.getRespondentContent();  
		this.acceptanceTime= other.getAcceptanceTime();  
		this.attn= other.getAttn();  
		this.respondentUnit= other.getRespondentUnit();  
		this.actionType= other.getActionType();  
		this.doType= other.getDoType();  
		this.actionTime= other.getActionTime();  
		this.actionLimit= other.getActionLimit();  
		this.signUnit= other.getSignUnit();  
		this.signTime= other.getSignTime();  
		this.replyer= other.getReplyer();  
		this.replyTime= other.getReplyTime();  
		this.actionOpinion= other.getActionOpinion();  
		this.replyOpinion= other.getReplyOpinion();  
		this.doOpinion= other.getDoOpinion();  
		this.processType2= other.getProcessType2();  
		this.syncDate= other.getSyncDate();  
		this.syncSign= other.getSyncSign();  
		this.syncErrorDesc= other.getSyncErrorDesc();  
		this.complaintSex= other.getComplaintSex();

	}
	
	public void copyNotNullProperty(ZfbzjcComplaint other){
  
	if( other.getComplaintNo() != null)
		this.setComplaintNo(other.getComplaintNo());
  
		if( other.getComplaintName() != null)
			this.complaintName= other.getComplaintName();  
		if( other.getComplaintPa() != null)
			this.complaintPa= other.getComplaintPa();  
		if( other.getComplaintNation() != null)
			this.complaintNation= other.getComplaintNation();  
		if( other.getComplaintId() != null)
			this.complaintId= other.getComplaintId();  
		if( other.getComplaintArea() != null)
			this.complaintArea= other.getComplaintArea();  
		if( other.getComplaintTel() != null)
			this.complaintTel= other.getComplaintTel();  
		if( other.getComplaintPostal() != null)
			this.complaintPostal= other.getComplaintPostal();  
		if( other.getComplaintAddress() != null)
			this.complaintAddress= other.getComplaintAddress();  
		if( other.getComplaintEmail() != null)
			this.complaintEmail= other.getComplaintEmail();  
		if( other.getComplaintPost() != null)
			this.complaintPost= other.getComplaintPost();  
		if( other.getComplaintUnit() != null)
			this.complaintUnit= other.getComplaintUnit();  
		if( other.getRespondentName() != null)
			this.respondentName= other.getRespondentName();  
		if( other.getRespondentSex() != null)
			this.respondentSex= other.getRespondentSex();  
		if( other.getRespondentNation() != null)
			this.respondentNation= other.getRespondentNation();  
		if( other.getRespondentPa() != null)
			this.respondentPa= other.getRespondentPa();  
		if( other.getRespondentLevel() != null)
			this.respondentLevel= other.getRespondentLevel();  
		if( other.getRespondentPost() != null)
			this.respondentPost= other.getRespondentPost();  
		if( other.getRespondentSpecialStaus() != null)
			this.respondentSpecialStaus= other.getRespondentSpecialStaus();  
		if( other.getRespondentArea() != null)
			this.respondentArea= other.getRespondentArea();  
		if( other.getRespondentAddress() != null)
			this.respondentAddress= other.getRespondentAddress();  
		if( other.getRespondentProblem() != null)
			this.respondentProblem= other.getRespondentProblem();  
		if( other.getRespondentContent() != null)
			this.respondentContent= other.getRespondentContent();  
		if( other.getAcceptanceTime() != null)
			this.acceptanceTime= other.getAcceptanceTime();  
		if( other.getAttn() != null)
			this.attn= other.getAttn();  
		if( other.getRespondentUnit() != null)
			this.respondentUnit= other.getRespondentUnit();  
		if( other.getActionType() != null)
			this.actionType= other.getActionType();  
		if( other.getDoType() != null)
			this.doType= other.getDoType();  
		if( other.getActionTime() != null)
			this.actionTime= other.getActionTime();  
		if( other.getActionLimit() != null)
			this.actionLimit= other.getActionLimit();  
		if( other.getSignUnit() != null)
			this.signUnit= other.getSignUnit();  
		if( other.getSignTime() != null)
			this.signTime= other.getSignTime();  
		if( other.getReplyer() != null)
			this.replyer= other.getReplyer();  
		if( other.getReplyTime() != null)
			this.replyTime= other.getReplyTime();  
		if( other.getActionOpinion() != null)
			this.actionOpinion= other.getActionOpinion();  
		if( other.getReplyOpinion() != null)
			this.replyOpinion= other.getReplyOpinion();  
		if( other.getDoOpinion() != null)
			this.doOpinion= other.getDoOpinion();  
		if( other.getProcessType2() != null)
			this.processType2= other.getProcessType2();  
		if( other.getSyncDate() != null)
			this.syncDate= other.getSyncDate();  
		if( other.getSyncSign() != null)
			this.syncSign= other.getSyncSign();  
		if( other.getSyncErrorDesc() != null)
			this.syncErrorDesc= other.getSyncErrorDesc();  
		if( other.getComplaintSex() != null)
			this.complaintSex= other.getComplaintSex();

	}
	
	public void clearProperties(){
  
		this.complaintName= null;  
		this.complaintPa= null;  
		this.complaintNation= null;  
		this.complaintId= null;  
		this.complaintArea= null;  
		this.complaintTel= null;  
		this.complaintPostal= null;  
		this.complaintAddress= null;  
		this.complaintEmail= null;  
		this.complaintPost= null;  
		this.complaintUnit= null;  
		this.respondentName= null;  
		this.respondentSex= null;  
		this.respondentNation= null;  
		this.respondentPa= null;  
		this.respondentLevel= null;  
		this.respondentPost= null;  
		this.respondentSpecialStaus= null;  
		this.respondentArea= null;  
		this.respondentAddress= null;  
		this.respondentProblem= null;  
		this.respondentContent= null;  
		this.acceptanceTime= null;  
		this.attn= null;  
		this.respondentUnit= null;  
		this.actionType= null;  
		this.doType= null;  
		this.actionTime= null;  
		this.actionLimit= null;  
		this.signUnit= null;  
		this.signTime= null;  
		this.replyer= null;  
		this.replyTime= null;  
		this.actionOpinion= null;  
		this.replyOpinion= null;  
		this.doOpinion= null;  
		this.processType2= null;  
		this.syncDate= null;  
		this.syncSign= null;  
		this.syncErrorDesc= null;  
		this.complaintSex= null;

	}
}
