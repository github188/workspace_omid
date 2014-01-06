/*
 * Ext.Loader.setConfig({enabled: true}); Ext.Loader.setPath('Ext.ux',
 * './ext4/examples/ux'); Ext.require([ 'Ext.ux.form.MultiSelect' ]);
 */

Ext.onReady(function() {

	/** ***********供电管理单位模型*********** */
	Ext.define('vcmOrgNoModel', {
				extend : 'Ext.data.Model',
				fields : ["ORG_NO", "ORG_NAME"]
			});

	var eleManaOrgStore = Ext.create('Ext.data.Store', {
				model : 'vcmOrgNoModel',
				proxy : {
					type : 'ajax',
					url : 'groupModelManageAction!queryTgOrgNo.action',
					reader : {
						root : 'vcmTgOrgNoList',
						type : 'json'
					}
				}
			});
	eleManaOrgStore.load({
				params : {
					vcmOrgNo : '34101'
				}
				,
			});

	/** ***********评估对象属性信息数据*********** */
	Ext.define('AOPInfoConStoreModel', {
				extend : 'Ext.data.Model',
				fields : ["ATTR_ID", "ATTR_NAME", "USAGE_CODE", "TYPE_CODE",
						"UNIT", "PS_ORG_NO", "EFFECT_DEGREE", "DATA_SRC",
						"SRC_FIELD", "SRC_TABLE", "ATTR_COMMENT",
						"RISK_TYPE_CODE", "ANALYSE_TYPE", "EVENT_LEVEL"]
			});

	var AOPInfoConStore = Ext.create('Ext.data.Store', {// 根据条件模糊查询评估对象属性信息数据
		model : 'AOPInfoConStoreModel',
		proxy : {
			type : 'ajax',
			url : 'AssessmentObjPropertyAction!queryAOP.action',

			reader : {
				root : 'queryAOPList',
				type : 'json'
			}
		}
	});

	var selModelAOP = Ext.create('Ext.selection.CheckboxModel', {// 评估对象属性选择模型
		mode : 'SINGLE',
		listeners : {
		
		select : function(model, record, index) { // record被选中时产生的事件
		var rec2 = selModelAOP.getSelection();
		var ATTR_ID = rec2[0].get("ATTR_ID");
		var index = AOPInfoConStore.find('ATTR_ID',ATTR_ID);
		Ext.getCmp("AOP_ATTR_ID").setValue(ATTR_ID);
		Ext.getCmp("AOP_EleManaUnit").setValue(AOPInfoConStore.getAt(index).get('PS_ORG_NO'));
		Ext.getCmp("AOPName").setValue(AOPInfoConStore.getAt(index).get('ATTR_NAME'));
		Ext.getCmp("AOPUnitType").setValue(AOPInfoConStore.getAt(index).get('UNIT'));
		Ext.getCmp("AOPType").setValue(AOPInfoConStore.getAt(index).get('TYPE_CODE'));
		Ext.getCmp("AOPUsageType").setValue(AOPInfoConStore.getAt(index).get('USAGE_CODE'));
		Ext.getCmp("AOPInfluenceDegree").setValue(AOPInfoConStore.getAt(index).get('EFFECT_DEGREE'));
		Ext.getCmp("AOPSourceField").setValue(AOPInfoConStore.getAt(index).get('SRC_FIELD'));
		Ext.getCmp("AOPSourceTable").setValue(AOPInfoConStore.getAt(index).get('SRC_TABLE'));
		Ext.getCmp("AOPRiskType").setValue(AOPInfoConStore.getAt(index).get('RISK_TYPE_CODE'));
		Ext.getCmp("AOPAnalysisType").setValue(AOPInfoConStore.getAt(index).get('ANALYSE_TYPE'));
		Ext.getCmp("AOPAnalysisLevel").setValue(AOPInfoConStore.getAt(index).get('EVENT_LEVEL'));
		Ext.getCmp("AOPDataSource").setValue(AOPInfoConStore.getAt(index).get('DATA_SRC'));
		Ext.getCmp("AOPRemark").setValue(AOPInfoConStore.getAt(index).get('ATTR_COMMENT'));
		
		}
	}

	});

	/** *******************新建评估对象属性********************** */
	var AOPTYPE_CODEStore = Ext.create('Ext.data.Store', {// 评估对象属性类型下拉列表数据
		fields : ['abbr2', 'name2'],
		data : [{
					"abbr2" : "01",
					"name2" : "01 内部"
				}, {
					"abbr2" : "02",
					"name2" : "02 外部"
				}]
	});

	var AOPUSAGE_CODEStore = Ext.create('Ext.data.Store', {// 评估对象属性用途类型下拉列表数据
		fields : ['abbr2', 'name2'],
		data : [{
					"abbr2" : "01",
					"name2" : "01 客户细分"
				}, {
					"abbr2" : "02",
					"name2" : "02 信用评价"
				}, {
					"abbr2" : "03",
					"name2" : "03 价值等级"
				}, {
					"abbr2" : "04",
					"name2" : "04 风险评估"
				}, {
					"abbr2" : "05",
					"name2" : "05 VIP认定"
				}, {
					"abbr2" : "06",
					"name2" : "06 业务联系"
				}, {
					"abbr2" : "07",
					"name2" : "07 单位评价"
				}, {
					"abbr2" : "99",
					"name2" : "99 共享"
				}]
	});

	var AOPUNITStore = Ext.create('Ext.data.Store', {// 评估对象属性属性单位下拉列表数据
		fields : ['abbr2', 'name2'],
		data : [{
					"abbr2" : "01",
					"name2" : "01 元"
				}, {
					"abbr2" : "02",
					"name2" : "02 万元"
				}, {
					"abbr2" : "03",
					"name2" : "03 KWH"
				}]
	});

	var AOPEFFECT_DEGREEStore = Ext.create('Ext.data.Store', {// 评估对象属性影响程度下拉列表数据
		fields : ['abbr2', 'name2'],
		data : [{
					"abbr2" : "01",
					"name2" : "01 高"
				}, {
					"abbr2" : "02",
					"name2" : "02 中"
				}, {
					"abbr2" : "03",
					"name2" : "03 低"
				}]
	});

	var AOPRISK_TYPE_CODEStore = Ext.create('Ext.data.Store', {// 评估对象属性风险因素类别下拉列表数据
		fields : ['abbr2', 'name2'],
		data : [{
					"abbr2" : "01",
					"name2" : "01 政策性"
				}, {
					"abbr2" : "02",
					"name2" : "02 经营性"
				}, {
					"abbr2" : "03",
					"name2" : "03 管理性"
				}]
	});

	var AOPANALYSE_TYPEStore = Ext.create('Ext.data.Store', {// 评估对象属性分析类型下拉列表数据
		fields : ['abbr2', 'name2'],
		data : [{
					"abbr2" : "01",
					"name2" : "01 优质客户"
				}, {
					"abbr2" : "02",
					"name2" : "02 高耗能客户"
				}, {
					"abbr2" : "03",
					"name2" : "03 潜在客户"
				}]
	});

	var AOPEVENT_LEVELStore = Ext.create('Ext.data.Store', {// 评估对象属性分析项等级下拉列表数据
		fields : ['abbr2', 'name2'],
		data : [{
					"abbr2" : "01",
					"name2" : "01 严重"
				}, {
					"abbr2" : "02",
					"name2" : "02 重要"
				}, {
					"abbr2" : "03",
					"name2" : "03 较重要"
				}, {
					"abbr2" : "03",
					"name2" : "03 一般"
				}]
	});
	
	
	var AOPSRC_TABLEStore = Ext.create('Ext.data.Store', {// 来源表
		fields : ['SRC_TABLENameE', 'SRC_TABLENameC'],
		data : [{
					"SRC_TABLENameE" : "C_CUST_VCM",
					"SRC_TABLENameC" : "客户"
				}, {
					"SRC_TABLENameE" : "C_CONS_VCM",
					"SRC_TABLENameC" : "用电用户"
				}, {
					"SRC_TABLENameE" : "A_CONS_VCM_STAT_D",
					"SRC_TABLENameC" : "大用户日统计"
				}, {
					"SRC_TABLENameE" : "A_CONS_VCM_STAT_M",
					"SRC_TABLENameC" : "大用户月统计"
				}, {
					"SRC_TABLENameE" : "A_CONS_VCM_STAT_Y",
					"SRC_TABLENameC" : "大用户年统计"
				}, {
					"SRC_TABLENameE" : "A_CUST_VCM_STAT_D",
					"SRC_TABLENameC" : "大客户日统计"
				}, {
					"SRC_TABLENameE" : "A_CUST_VCM_STAT_M",
					"SRC_TABLENameC" : "大客户月统计"
				}, {
					"SRC_TABLENameE" : "A_CUST_VCM_STAT_Y",
					"SRC_TABLENameC" : "大客户年统计"
				}]
	});
	var dataC_CUST_VCM=[{
		"SRC_FIELDE" : "CUST_ID",
		"SRC_FIELDC" : "客户标识"
	}, {
		"SRC_FIELDE" : "CUST_TYPE",
		"SRC_FIELDC" : "大客户类型"
	}, {
		"SRC_FIELDE" : "CUST_NO",
		"SRC_FIELDC" : "客户编号"
	}, {
		"SRC_FIELDE" : "CUST_NAME",
		"SRC_FIELDC" : "客户名称"
	}, {
		"SRC_FIELDE" : "ECONOMY_TYPE_CODE",
		"SRC_FIELDC" : "经济类型"
	}, {
		"SRC_FIELDE" : "ANNUAL_GP",
		"SRC_FIELDC" : "年生产总值"
	}, {
		"SRC_FIELDE" : "CREDIT_LEVEL_CODE",
		"SRC_FIELDC" : "信用等级"
	}, {
		"SRC_FIELDE" : "VALUE_LEVEL_CODE",
		"SRC_FIELDC" : "价值等级"
	}, {
		"SRC_FIELDE" : "RISK_LEVEL_CODE",
		"RC_FIELDC" : "风险等级"
	}, {
		"SRC_FIELDE" : "VIP_FLAG",
		"SRC_FIELDC" : "VIP标志"
	}, {
		"SRC_FIELDE" : "QUERY_PWD",
		"SRC_FIELDC" : "查询密码"
	}, {
		"SRC_FIELDE" : "ENTEPRISE_WEBSITE",
		"SRC_FIELDC" : "企业网址"
	}, {
		"SRC_FIELDE" : "ENTEPRISE_SCALE",
		"SRC_FIELDC" : "企业规模"
	}, {
		"SRC_FIELDE" : "BRIEF",
		"SRC_FIELDC" : "企业简介"
	}, {
		"SRC_FIELDE" : "REG_CAPITAL",
		"SRC_FIELDC" : "注册资本金"
	}, {
		"SRC_FIELDE" : "T_CAPTAL",
		"SRC_FIELDC" : "资金总额"
	}, {
		"SRC_FIELDE" : "LEGAL_PERSON",
		"SRC_FIELDC" : "法人代表"
	}, {
		"SRC_FIELDE" : "OPER_SCOPE",
		"SRC_FIELDC" : "经营范围"
	}, {
		"SRC_FIELDE" : "MAIN_PRODUCT",
		"SRC_FIELDC" : "主要产品"
	}, {
		"SRC_FIELDE" : "PRODUCE_TECH",
		"SRC_FIELDC" : "生产工艺"
	}, {
		"SRC_FIELDE" : "OUTPUT",
		"SRC_FIELDC" : "产能"
	}, {
		"SRC_FIELDE" : "VIP_LEVEL",
		"SRC_FIELDC" : "VIP等级"
	}, {
		"SRC_FIELDE" : "MAIN_MATERIAL",
		"SRC_FIELDC" : "主要原料"
	}, {
		"SRC_FIELDE" : "SUPPLY_SRC",
		"SRC_FIELDC" : "供应来源"
	}, {
		"SRC_FIELDE" : "SALES_AMT",
		"SRC_FIELDC" : "销售额"
	}, {
		"SRC_FIELDE" : "SALES_REGION",
		"SRC_FIELDC" : "销售区域"
	}, {
		"SRC_FIELDE" : "PS_ENSURE_PRJ",
		"SRC_FIELDC" : "重要保电项目"
	}, {
		"SRC_FIELDE" : "POWER_COST_RATIO",
		"SRC_FIELDC" : "电费占企业的成本比例"
	}, {
		"SRC_FIELDE" : "INDUSTRY_CODE",
		"SRC_FIELDC" : "产业分类"
	}];
	
	var dataC_CONS_VCM = [{
		"SRC_FIELDE" : "CONS_ID",
		"SRC_FIELDC" : "用户标识"
	}, {
		"SRC_FIELDE" : "CUST_ID",
		"SRC_FIELDC" : "客户标识"
	}, {
		"SRC_FIELDE" : "CONS_SRC",
		"SRC_FIELDC" : "用户来源"
	}, {
		"SRC_FIELDE" : "ORG_NO",
		"SRC_FIELDC" : "供电单位编号"
	}, {
		"SRC_FIELDE" : "AREA_NO",
		"SRC_FIELDC" : "供电区域编码"
	}, {
		"SRC_FIELDE" : "CONS_NO",
		"SRC_FIELDC" : "用户编号"
	}, {
		"SRC_FIELDE" : "CONS_NAME",
		"SRC_FIELDC" : "用户名称"
	}, {
		"SRC_FIELDE" : "CUST_NO",
		"SRC_FIELDC" : "客户编号"
	}, {
		"SRC_FIELDE" : "SUBS_ID",
		"SRC_FIELDC" : "变电站标识"
	}, {
		"SRC_FIELDE" : "TG_ID",
		"SRC_FIELDC" : "台区标识"
	}, {
		"SRC_FIELDE" : "LINE_ID",
		"SRC_FIELDC" : "线路标识"
	}, {
		"SRC_FIELDE" : "METER_ID",
		"SRC_FIELDC" : "电表标识"
	}, {
		"SRC_FIELDE" : "CUST_QUERY_NO",
		"SRC_FIELDC" : "自定义查询号"
	}, {
		"SRC_FIELDE" : "TMP_PAY_RELA_NO",
		"SRC_FIELDC" : "临时缴费关系号"
	}, {
		"SRC_FIELDE" : "ORGN_CONS_NO",
		"SRC_FIELDC" : "原用户编号"
	}, {
		"SRC_FIELDE" : "CONS_SORT_CODE",
		"SRC_FIELDC" : "用户分类"
	}, {
		"SRC_FIELDE" : "ELEC_ADDR ",
		"SRC_FIELDC" : "用电地址"
	}, {
		"SRC_FIELDE" : "TRADE_CODE",
		"SRC_FIELDC" : "行业分类"
	}, {
		"SRC_FIELDE" : "CONS_TYPE",
		"SRC_FIELDC" : "用电用户类型"
	}, {
		"SRC_FIELDE" : "ELEC_TYPE_CODE",
		"SRC_FIELDC" : "用电类别"
	}, {
		"SRC_FIELDE" : "CONTRACT_CAP",
		"SRC_FIELDC" : "合同容量"
	}, {
		"SRC_FIELDE" : "RUN_CAP",
		"SRC_FIELDC" : "运行容量"
	}, {
		"SRC_FIELDE" : "CAP_GRADE_NO",
		"SRC_FIELDC" : "容量等级"
	}, {
		"SRC_FIELDE" : "SHIFT_NO",
		"SRC_FIELDC" : "生产班次"
	}, {
		"SRC_FIELDE" : "LODE_ATTR_CODE",
		"SRC_FIELDC" : "负荷性质"
	}, {
		"SRC_FIELDE" : "VOLT_CODE",
		"SRC_FIELDC" : "供电电压"
	}, {
		"SRC_FIELDE" : "HEC_INDUSTRY_CODE",
		"SRC_FIELDC" : "高耗能行业类别"
	}, {
		"SRC_FIELDE" : "HIGH_RISK",
		"SRC_FIELDC" : "高危用户标识"
	}, {
		"SRC_FIELDE" : "IS_VIP",
		"SRC_FIELDC" : "重要用户标识"
	}, {
		"SRC_FIELDE" : "HOLIDAY",
		"SRC_FIELDC" : "厂休日"
	}, {
		"SRC_FIELDE" : "BUILD_DATE",
		"SRC_FIELDC" : "立户日期"
	}, {
		"SRC_FIELDE" : "PS_DATE",
		"SRC_FIELDC" : "送电日期"
	}, {
		"SRC_FIELDE" : "CANCEL_DATE",
		"SRC_FIELDC" : "销户日期"
	}, {
		"SRC_FIELDE" : "DUE_DATE",
		"SRC_FIELDC" : "到期日期"
	}, {
		"SRC_FIELDE" : "NOTIFY_MODE",
		"SRC_FIELDC" : "电费通知方式"
	}, {
		"SRC_FIELDE" : "SETTLE_MODE",
		"SRC_FIELDC" : "电费结算方式"
	}, {
		"SRC_FIELDE" : "STATUS_CODE",
		"SRC_FIELDC" : "用户状态"
	}, {
		"SRC_FIELDE" : "RRIO_CODE",
		"SRC_FIELDC" : "重要性等级"
	}, {
		"SRC_FIELDE" : "CHK_CYCLE",
		"SRC_FIELDC" : "检查周期"
	}, {
		"SRC_FIELDE" : "LAST_CHK_DATE",
		"SRC_FIELDC" : "上次检查日期"
	}, {
		"SRC_FIELDE" : "CHECKER_NO",
		"SRC_FIELDC" : "检查人员编号"
	}, {
		"SRC_FIELDE" : "POWEROFF_CODE",
		"SRC_FIELDC" : "停电标志"
	}, {
		"SRC_FIELDE" : "TRANSFER_CODE",
		"SRC_FIELDC" : "转供标志"
	}, {
		"SRC_FIELDE" : "MR_SECT_NO",
		"SRC_FIELDC" : "抄表段编号"
	}, {
		"SRC_FIELDE" : "NOTE_TYPE_CODE",
		"SRC_FIELDC" : "票据类型"
	}, {
		"SRC_FIELDE" : "TMP_FLAG",
		"SRC_FIELDC" : "临时用电标志"
	}, {
		"SRC_FIELDE" : "TMP_DATE",
		"SRC_FIELDC" : "临时用电到期日期"
	}, {
		"SRC_FIELDE" : "APPLY_NO",
		"SRC_FIELDC" : "用电业务受理编号"
	}, {
		"SRC_FIELDE" : "APPLY_DATE",
		"SRC_FIELDC" : "用电业务受理日期"
	}, {
		"SRC_FIELDE" : "CONS_SORT",
		"SRC_FIELDC" : "用户分类2"
	}, {
		"SRC_FIELDE" : "TYPICAL_DAY_LOAD",
		"SRC_FIELDC" : "典型日负荷"
	}, {
		"SRC_FIELDE" : "SECURITY_VALUE",
		"SRC_FIELDC" : "保安定值"
	}, {
		"SRC_FIELDE" : "IS_VALID",
		"SRC_FIELDC" : "有效标志"
	}];
	
	
	var dataA_CONS_VCM_STAT_D = [{
		"SRC_FIELDE" : "ORG_NO",
		"SRC_FIELDC" : "供电单位编号"
	}, {
		"SRC_FIELDE" : "ORG_TYPE",
		"SRC_FIELDC" : "供电单位类别"
	}, {
		"SRC_FIELDE" : "CONS_ID",
		"SRC_FIELDC" : "用户标识"
	}, {
		"SRC_FIELDE" : "STAT_DATE",
		"SRC_FIELDC" : "统计日期"
	}, {
		"SRC_FIELDE" : "PAP_E",
		"SRC_FIELDC" : "正向有功总电能量"
	}, {
		"SRC_FIELDE" : "PAP_E1",
		"SRC_FIELDC" : "正向有功费率1电能量"
	}, {
		"SRC_FIELDE" : "PAP_E2",
		"SRC_FIELDC" : "正向有功费率2电能量"
	}, {
		"SRC_FIELDE" : "PAP_E3",
		"SRC_FIELDC" : "正向有功费率3电能量"
	}, {
		"SRC_FIELDE" : "PAP_E4",
		"SRC_FIELDC" : "正向有功费率4电能量"
	}, {
		"SRC_FIELDE" : "RAP_E",
		"SRC_FIELDC" : "反向有功总电能量"
	}, {
		"SRC_FIELDE" : "RAP_E1",
		"SRC_FIELDC" : "反向有功费率1电能量"
	}, {
		"SRC_FIELDE" : "RAP_E2",
		"SRC_FIELDC" : "反向有功费率2电能量"
	}, {
		"SRC_FIELDE" : "RAP_E3",
		"SRC_FIELDC" : "反向有功费率3电能量"
	}, {
		"SRC_FIELDE" : "RAP_E4",
		"SRC_FIELDC" : "反向有功费率4电能量"
	}, {
		"SRC_FIELDE" : "MAX_P",
		"SRC_FIELDC" : "最大有功功率"
	}, {
		"SRC_FIELDE" : "MAX_P_TIME",
		"SRC_FIELDC" : "最大有功功率发生时间"
	}, {
		"SRC_FIELDE" : "MIN_P ",
		"SRC_FIELDC" : "最小有功功率"
	}, {
		"SRC_FIELDE" : "MIN_P_TIME",
		"SRC_FIELDC" : "最小有功功率发生时间"
	}, {
		"SRC_FIELDE" : "AVG_P",
		"SRC_FIELDC" : "平均有功功率"
	}, {
		"SRC_FIELDE" : "MAX_Q",
		"SRC_FIELDC" : "最大无功功率"
	}, {
		"SRC_FIELDE" : "MAX_Q_TIME",
		"SRC_FIELDC" : "最大无功功率发生时间"
	}, {
		"SRC_FIELDE" : "MIN_Q",
		"SRC_FIELDC" : "最小无功功率"
	}, {
		"SRC_FIELDE" : "MIN_Q_TIME",
		"SRC_FIELDC" : "最小无功功率发生时间"
	}, {
		"SRC_FIELDE" : "AVG_Q",
		"SRC_FIELDC" : "平均无功功率"
	}, {
		"SRC_FIELDE" : "P_RATE",
		"SRC_FIELDC" : "负荷率"
	}, {
		"SRC_FIELDE" : "PEAK_VALLE_DIF",
		"SRC_FIELDC" : "峰谷差"
	}, {
		"SRC_FIELDE" : "RCVBL_AMT",
		"SRC_FIELDC" : "应收金额"
	}, {
		"SRC_FIELDE" : "OWE_AMT",
		"SRC_FIELDC" : "应收欠费金额"
	}, {
		"SRC_FIELDE" : "THIS_RCVED_AMT",
		"SRC_FIELDC" : "本次实收金额"
	}, {
		"SRC_FIELDE" : "THIS_OWE_AMT",
		"SRC_FIELDC" : "实收欠费金额"
	}];
	
	var dataA_CONS_VCM_STAT_M = [{
		"SRC_FIELDE" : "ORG_NO",
		"SRC_FIELDC" : "供电单位编号"
	}, {
		"SRC_FIELDE" : "ORG_TYPE",
		"SRC_FIELDC" : "供电单位类别"
	}, {
		"SRC_FIELDE" : "CONS_ID",
		"SRC_FIELDC" : "用户标识"
	}, {
		"SRC_FIELDE" : "STAT_DATE",
		"SRC_FIELDC" : "统计日期"
	}, {
		"SRC_FIELDE" : "PAP_E",
		"SRC_FIELDC" : "正向有功月总电能量"
	}, {
		"SRC_FIELDE" : "PAP_E1",
		"SRC_FIELDC" : "正向有功费率1月电能量"
	}, {
		"SRC_FIELDE" : "PAP_E2",
		"SRC_FIELDC" : "正向有功费率2月电能量"
	}, {
		"SRC_FIELDE" : "PAP_E3",
		"SRC_FIELDC" : "正向有功费率3月电能量"
	}, {
		"SRC_FIELDE" : "PAP_E4",
		"SRC_FIELDC" : "正向有功费率4月电能量"
	}, {
		"SRC_FIELDE" : "RAP_E",
		"SRC_FIELDC" : "反向有功月总电能量"
	}, {
		"SRC_FIELDE" : "RAP_E1",
		"SRC_FIELDC" : "反向有功费率1月电能量"
	}, {
		"SRC_FIELDE" : "RAP_E2",
		"SRC_FIELDC" : "反向有功费率2月电能量"
	}, {
		"SRC_FIELDE" : "RAP_E3",
		"SRC_FIELDC" : "反向有功费率3月电能量"
	}, {
		"SRC_FIELDE" : "RAP_E4",
		"SRC_FIELDC" : "反向有功费率4月电能量"
	}, {
		"SRC_FIELDE" : "AVG _PAP",
		"SRC_FIELDC" : "平均日电量"
	}, {
		"SRC_FIELDE" : "MAX_ PAP",
		"SRC_FIELDC" : "最大日电量"
	}, {
		"SRC_FIELDE" : "MAX_ PAP_TIME",
		"SRC_FIELDC" : "月最大负荷出现日期"
	}, {
		"SRC_FIELDE" : "MAX_P",
		"SRC_FIELDC" : "最大有功功率"
	}, {
		"SRC_FIELDE" : "MAX_P_TIME",
		"SRC_FIELDC" : "最大有功功率发生时间"
	}, {
		"SRC_FIELDE" : "MIN_P ",
		"SRC_FIELDC" : "最小有功功率"
	}, {
		"SRC_FIELDE" : "MIN_P_TIME",
		"SRC_FIELDC" : "最小有功功率发生时间"
	}, {
		"SRC_FIELDE" : "AVG_P",
		"SRC_FIELDC" : "平均有功功率"
	}, {
		"SRC_FIELDE" : "MAX_Q",
		"SRC_FIELDC" : "最大无功功率"
	}, {
		"SRC_FIELDE" : "MAX_Q_TIME",
		"SRC_FIELDC" : "最大无功功率发生时间"
	}, {
		"SRC_FIELDE" : "MIN_Q",
		"SRC_FIELDC" : "最小无功功率"
	}, {
		"SRC_FIELDE" : "MIN_Q_TIME",
		"SRC_FIELDC" : "最小无功功率发生时间"
	}, {
		"SRC_FIELDE" : "AVG_Q",
		"SRC_FIELDC" : "平均无功功率"
	}, {
		"SRC_FIELDE" : "P_RATE",
		"SRC_FIELDC" : "负荷率"
	}, {
		"SRC_FIELDE" : "MAX_PV _DIF",
		"SRC_FIELDC" : "最大峰谷差"
	}, {
		"SRC_FIELDE" : "MAX_PV _DIF_RATE",
		"SRC_FIELDC" : "最大峰谷差率"
	}, {
		"SRC_FIELDE" : "AVG_PV _DIF",
		"SRC_FIELDC" : "平均峰谷差"
	}, {
		"SRC_FIELDE" : "AVG_PV _DIF_RATE",
		"SRC_FIELDC" : "平均峰谷差率"
	}, {
		"SRC_FIELDE" : "RCVBL_AMT",
		"SRC_FIELDC" : "应收金额"
	}, {
		"SRC_FIELDE" : "OWE_AMT",
		"SRC_FIELDC" : "应收欠费金额"
	}, {
		"SRC_FIELDE" : "THIS_RCVED_AMT",
		"SRC_FIELDC" : "本次实收金额"
	}, {
		"SRC_FIELDE" : "THIS_OWE_AMT",
		"SRC_FIELDC" : "实收欠费金额"
	}];
	
	
	var dataA_CONS_VCM_STAT_Y = [{
		"SRC_FIELDE" : "ORG_NO",
		"SRC_FIELDC" : "供电单位编号"
	}, {
		"SRC_FIELDE" : "ORG_TYPE",
		"SRC_FIELDC" : "供电单位类别"
	}, {
		"SRC_FIELDE" : "CONS_ID",
		"SRC_FIELDC" : "用户标识"
	}, {
		"SRC_FIELDE" : "STAT_DATE",
		"SRC_FIELDC" : "统计日期"
	}, {
		"SRC_FIELDE" : "PAP_E",
		"SRC_FIELDC" : "正向有功年总电能量"
	}, {
		"SRC_FIELDE" : "PAP_E1",
		"SRC_FIELDC" : "正向有功费率1年电能量"
	}, {
		"SRC_FIELDE" : "PAP_E2",
		"SRC_FIELDC" : "正向有功费率2年电能量"
	}, {
		"SRC_FIELDE" : "PAP_E3",
		"SRC_FIELDC" : "正向有功费率3年电能量"
	}, {
		"SRC_FIELDE" : "PAP_E4",
		"SRC_FIELDC" : "正向有功费率4年电能量"
	}, {
		"SRC_FIELDE" : "RAP_E",
		"SRC_FIELDC" : "反向有功年总电能量"
	}, {
		"SRC_FIELDE" : "RAP_E1",
		"SRC_FIELDC" : "反向有功费率1年电能量"
	}, {
		"SRC_FIELDE" : "RAP_E2",
		"SRC_FIELDC" : "反向有功费率2年电能量"
	}, {
		"SRC_FIELDE" : "RAP_E3",
		"SRC_FIELDC" : "反向有功费率3年电能量"
	}, {
		"SRC_FIELDE" : "RAP_E4",
		"SRC_FIELDC" : "反向有功费率4年电能量"
	},{
		"SRC_FIELDE" : "MAX_P",
		"SRC_FIELDC" : "最大有功功率"
	}, {
		"SRC_FIELDE" : "MAX_P_TIME",
		"SRC_FIELDC" : "最大有功功率发生时间"
	}, {
		"SRC_FIELDE" : "MIN_P ",
		"SRC_FIELDC" : "最小有功功率"
	}, {
		"SRC_FIELDE" : "MIN_P_TIME",
		"SRC_FIELDC" : "最小有功功率发生时间"
	}, {
		"SRC_FIELDE" : "AVG_P",
		"SRC_FIELDC" : "平均有功功率"
	}, {
		"SRC_FIELDE" : "MAX_Q",
		"SRC_FIELDC" : "最大无功功率"
	}, {
		"SRC_FIELDE" : "MAX_Q_TIME",
		"SRC_FIELDC" : "最大无功功率发生时间"
	}, {
		"SRC_FIELDE" : "MIN_Q",
		"SRC_FIELDC" : "最小无功功率"
	}, {
		"SRC_FIELDE" : "MIN_Q_TIME",
		"SRC_FIELDC" : "最小无功功率发生时间"
	}, {
		"SRC_FIELDE" : "AVG_Q",
		"SRC_FIELDC" : "平均无功功率"
	}, {
		"SRC_FIELDE" : "P_RATE",
		"SRC_FIELDC" : "负荷率"
	}, {
		"SRC_FIELDE" : "MAX_PV _DIF",
		"SRC_FIELDC" : "最大峰谷差"
	}, {
		"SRC_FIELDE" : "MAX_PV _DIF_RATE",
		"SRC_FIELDC" : "最大峰谷差率"
	}, {
		"SRC_FIELDE" : "AVG_PV _DIF",
		"SRC_FIELDC" : "平均峰谷差"
	}, {
		"SRC_FIELDE" : "AVG_PV _DIF_RATE",
		"SRC_FIELDC" : "平均峰谷差率"
	}, {
		"SRC_FIELDE" : "RCVBL_AMT",
		"SRC_FIELDC" : "应收金额"
	}, {
		"SRC_FIELDE" : "OWE_AMT",
		"SRC_FIELDC" : "应收欠费金额"
	}, {
		"SRC_FIELDE" : "THIS_RCVED_AMT",
		"SRC_FIELDC" : "本次实收金额"
	}, {
		"SRC_FIELDE" : "THIS_OWE_AMT",
		"SRC_FIELDC" : "实收欠费金额"
	}];
	
	var dataA_CUST_VCM_STAT_D = [{
		"SRC_FIELDE" : "ORG_NO",
		"SRC_FIELDC" : "供电单位编号"
	}, {
		"SRC_FIELDE" : "ORG_TYPE",
		"SRC_FIELDC" : "供电单位类别"
	}, {
		"SRC_FIELDE" : "CUST_ID",
		"SRC_FIELDC" : "客户标识"
	}, {
		"SRC_FIELDE" : "STAT_DATE",
		"SRC_FIELDC" : "统计日期"
	}, {
		"SRC_FIELDE" : "PAP_E",
		"SRC_FIELDC" : "正向有功总电能量"
	}, {
		"SRC_FIELDE" : "PAP_E1",
		"SRC_FIELDC" : "正向有功费率1电能量"
	}, {
		"SRC_FIELDE" : "PAP_E2",
		"SRC_FIELDC" : "正向有功费率2电能量"
	}, {
		"SRC_FIELDE" : "PAP_E3",
		"SRC_FIELDC" : "正向有功费率3电能量"
	}, {
		"SRC_FIELDE" : "PAP_E4",
		"SRC_FIELDC" : "正向有功费率4电能量"
	}, {
		"SRC_FIELDE" : "RAP_E",
		"SRC_FIELDC" : "反向有功总电能量"
	}, {
		"SRC_FIELDE" : "RAP_E1",
		"SRC_FIELDC" : "反向有功费率1电能量"
	}, {
		"SRC_FIELDE" : "RAP_E2",
		"SRC_FIELDC" : "反向有功费率2电能量"
	}, {
		"SRC_FIELDE" : "RAP_E3",
		"SRC_FIELDC" : "反向有功费率3电能量"
	}, {
		"SRC_FIELDE" : "RAP_E4",
		"SRC_FIELDC" : "反向有功费率4电能量"
	}, {
		"SRC_FIELDE" : "MAX_P",
		"SRC_FIELDC" : "最大有功功率"
	}, {
		"SRC_FIELDE" : "MAX_P_TIME",
		"SRC_FIELDC" : "最大有功功率发生时间"
	}, {
		"SRC_FIELDE" : "MIN_P ",
		"SRC_FIELDC" : "最小有功功率"
	}, {
		"SRC_FIELDE" : "MIN_P_TIME",
		"SRC_FIELDC" : "最小有功功率发生时间"
	}, {
		"SRC_FIELDE" : "AVG_P",
		"SRC_FIELDC" : "平均有功功率"
	}, {
		"SRC_FIELDE" : "MAX_Q",
		"SRC_FIELDC" : "最大无功功率"
	}, {
		"SRC_FIELDE" : "MAX_Q_TIME",
		"SRC_FIELDC" : "最大无功功率发生时间"
	}, {
		"SRC_FIELDE" : "MIN_Q",
		"SRC_FIELDC" : "最小无功功率"
	}, {
		"SRC_FIELDE" : "MIN_Q_TIME",
		"SRC_FIELDC" : "最小无功功率发生时间"
	}, {
		"SRC_FIELDE" : "AVG_Q",
		"SRC_FIELDC" : "平均无功功率"
	}, {
		"SRC_FIELDE" : "P_RATE",
		"SRC_FIELDC" : "负荷率"
	}, {
		"SRC_FIELDE" : "PEAK_VALLE_DIF",
		"SRC_FIELDC" : "峰谷差"
	}, {
		"SRC_FIELDE" : "RCVBL_AMT",
		"SRC_FIELDC" : "应收金额"
	}, {
		"SRC_FIELDE" : "OWE_AMT",
		"SRC_FIELDC" : "应收欠费金额"
	}, {
		"SRC_FIELDE" : "THIS_RCVED_AMT",
		"SRC_FIELDC" : "本次实收金额"
	}, {
		"SRC_FIELDE" : "THIS_OWE_AMT",
		"SRC_FIELDC" : "实收欠费金额"
	}];
	
	var dataA_CUST_VCM_STAT_M = [{
		"SRC_FIELDE" : "ORG_NO",
		"SRC_FIELDC" : "供电单位编号"
	}, {
		"SRC_FIELDE" : "ORG_TYPE",
		"SRC_FIELDC" : "供电单位类别"
	}, {
		"SRC_FIELDE" : "CUST_ID",
		"SRC_FIELDC" : "客户标识"
	}, {
		"SRC_FIELDE" : "STAT_DATE",
		"SRC_FIELDC" : "统计日期"
	}, {
		"SRC_FIELDE" : "PAP_E",
		"SRC_FIELDC" : "正向有功月总电能量"
	}, {
		"SRC_FIELDE" : "PAP_E1",
		"SRC_FIELDC" : "正向有功费率1月电能量"
	}, {
		"SRC_FIELDE" : "PAP_E2",
		"SRC_FIELDC" : "正向有功费率2月电能量"
	}, {
		"SRC_FIELDE" : "PAP_E3",
		"SRC_FIELDC" : "正向有功费率3月电能量"
	}, {
		"SRC_FIELDE" : "PAP_E4",
		"SRC_FIELDC" : "正向有功费率4月电能量"
	}, {
		"SRC_FIELDE" : "RAP_E",
		"SRC_FIELDC" : "反向有功月总电能量"
	}, {
		"SRC_FIELDE" : "RAP_E1",
		"SRC_FIELDC" : "反向有功费率1月电能量"
	}, {
		"SRC_FIELDE" : "RAP_E2",
		"SRC_FIELDC" : "反向有功费率2月电能量"
	}, {
		"SRC_FIELDE" : "RAP_E3",
		"SRC_FIELDC" : "反向有功费率3月电能量"
	}, {
		"SRC_FIELDE" : "RAP_E4",
		"SRC_FIELDC" : "反向有功费率4月电能量"
	}, {
		"SRC_FIELDE" : "AVG _PAP",
		"SRC_FIELDC" : "平均日电量"
	}, {
		"SRC_FIELDE" : "MAX_ PAP",
		"SRC_FIELDC" : "最大日电量"
	}, {
		"SRC_FIELDE" : "MAX_ PAP_TIME",
		"SRC_FIELDC" : "月最大负荷出现日期"
	}, {
		"SRC_FIELDE" : "MAX_P",
		"SRC_FIELDC" : "最大有功功率"
	}, {
		"SRC_FIELDE" : "MAX_P_TIME",
		"SRC_FIELDC" : "最大有功功率发生时间"
	}, {
		"SRC_FIELDE" : "MIN_P ",
		"SRC_FIELDC" : "最小有功功率"
	}, {
		"SRC_FIELDE" : "MIN_P_TIME",
		"SRC_FIELDC" : "最小有功功率发生时间"
	}, {
		"SRC_FIELDE" : "AVG_P",
		"SRC_FIELDC" : "平均有功功率"
	}, {
		"SRC_FIELDE" : "MAX_Q",
		"SRC_FIELDC" : "最大无功功率"
	}, {
		"SRC_FIELDE" : "MAX_Q_TIME",
		"SRC_FIELDC" : "最大无功功率发生时间"
	}, {
		"SRC_FIELDE" : "MIN_Q",
		"SRC_FIELDC" : "最小无功功率"
	}, {
		"SRC_FIELDE" : "MIN_Q_TIME",
		"SRC_FIELDC" : "最小无功功率发生时间"
	}, {
		"SRC_FIELDE" : "AVG_Q",
		"SRC_FIELDC" : "平均无功功率"
	}, {
		"SRC_FIELDE" : "P_RATE",
		"SRC_FIELDC" : "负荷率"
	}, {
		"SRC_FIELDE" : "MAX_PV _DIF",
		"SRC_FIELDC" : "最大峰谷差"
	}, {
		"SRC_FIELDE" : "MAX_PV _DIF_RATE",
		"SRC_FIELDC" : "最大峰谷差率"
	}, {
		"SRC_FIELDE" : "AVG_PV _DIF",
		"SRC_FIELDC" : "平均峰谷差"
	}, {
		"SRC_FIELDE" : "AVG_PV _DIF_RATE",
		"SRC_FIELDC" : "平均峰谷差率"
	}, {
		"SRC_FIELDE" : "RCVBL_AMT",
		"SRC_FIELDC" : "应收金额"
	}, {
		"SRC_FIELDE" : "OWE_AMT",
		"SRC_FIELDC" : "应收欠费金额"
	}, {
		"SRC_FIELDE" : "THIS_RCVED_AMT",
		"SRC_FIELDC" : "本次实收金额"
	}, {
		"SRC_FIELDE" : "THIS_OWE_AMT",
		"SRC_FIELDC" : "实收欠费金额"
	}];
	
	var dataA_CUST_VCM_STAT_Y = [{
		"SRC_FIELDE" : "ORG_NO",
		"SRC_FIELDC" : "供电单位编号"
	}, {
		"SRC_FIELDE" : "ORG_TYPE",
		"SRC_FIELDC" : "供电单位类别"
	}, {
		"SRC_FIELDE" : "CUST_ID",
		"SRC_FIELDC" : "客户标识"
	}, {
		"SRC_FIELDE" : "STAT_DATE",
		"SRC_FIELDC" : "统计日期"
	}, {
		"SRC_FIELDE" : "PAP_E",
		"SRC_FIELDC" : "正向有功年总电能量"
	}, {
		"SRC_FIELDE" : "PAP_E1",
		"SRC_FIELDC" : "正向有功费率1年电能量"
	}, {
		"SRC_FIELDE" : "PAP_E2",
		"SRC_FIELDC" : "正向有功费率2年电能量"
	}, {
		"SRC_FIELDE" : "PAP_E3",
		"SRC_FIELDC" : "正向有功费率3年电能量"
	}, {
		"SRC_FIELDE" : "PAP_E4",
		"SRC_FIELDC" : "正向有功费率4年电能量"
	}, {
		"SRC_FIELDE" : "RAP_E",
		"SRC_FIELDC" : "反向有功年总电能量"
	}, {
		"SRC_FIELDE" : "RAP_E1",
		"SRC_FIELDC" : "反向有功费率1年电能量"
	}, {
		"SRC_FIELDE" : "RAP_E2",
		"SRC_FIELDC" : "反向有功费率2年电能量"
	}, {
		"SRC_FIELDE" : "RAP_E3",
		"SRC_FIELDC" : "反向有功费率3年电能量"
	}, {
		"SRC_FIELDE" : "RAP_E4",
		"SRC_FIELDC" : "反向有功费率4年电能量"
	}, {
		"SRC_FIELDE" : "MAX_P",
		"SRC_FIELDC" : "最大有功功率"
	}, {
		"SRC_FIELDE" : "MAX_P_TIME",
		"SRC_FIELDC" : "最大有功功率发生时间"
	}, {
		"SRC_FIELDE" : "MIN_P ",
		"SRC_FIELDC" : "最小有功功率"
	}, {
		"SRC_FIELDE" : "MIN_P_TIME",
		"SRC_FIELDC" : "最小有功功率发生时间"
	}, {
		"SRC_FIELDE" : "AVG_P",
		"SRC_FIELDC" : "平均有功功率"
	}, {
		"SRC_FIELDE" : "MAX_Q",
		"SRC_FIELDC" : "最大无功功率"
	}, {
		"SRC_FIELDE" : "MAX_Q_TIME",
		"SRC_FIELDC" : "最大无功功率发生时间"
	}, {
		"SRC_FIELDE" : "MIN_Q",
		"SRC_FIELDC" : "最小无功功率"
	}, {
		"SRC_FIELDE" : "MIN_Q_TIME",
		"SRC_FIELDC" : "最小无功功率发生时间"
	}, {
		"SRC_FIELDE" : "AVG_Q",
		"SRC_FIELDC" : "平均无功功率"
	}, {
		"SRC_FIELDE" : "P_RATE",
		"SRC_FIELDC" : "负荷率"
	}, {
		"SRC_FIELDE" : "MAX_PV _DIF",
		"SRC_FIELDC" : "最大峰谷差"
	}, {
		"SRC_FIELDE" : "MAX_PV _DIF_RATE",
		"SRC_FIELDC" : "最大峰谷差率"
	}, {
		"SRC_FIELDE" : "AVG_PV _DIF",
		"SRC_FIELDC" : "平均峰谷差"
	}, {
		"SRC_FIELDE" : "AVG_PV _DIF_RATE",
		"SRC_FIELDC" : "平均峰谷差率"
	}, {
		"SRC_FIELDE" : "RCVBL_AMT",
		"SRC_FIELDC" : "应收金额"
	}, {
		"SRC_FIELDE" : "OWE_AMT",
		"SRC_FIELDC" : "应收欠费金额"
	}, {
		"SRC_FIELDE" : "THIS_RCVED_AMT",
		"SRC_FIELDC" : "本次实收金额"
	}, {
		"SRC_FIELDE" : "THIS_OWE_AMT",
		"SRC_FIELDC" : "实收欠费金额"
	}];
	

	var AOP_SRC_FIELDStore = Ext.create('Ext.data.Store', {// C_CUST_VCM来源字段
		fields : ['SRC_FIELDE', 'SRC_FIELDC'],
		data :dataC_CUST_VCM
	});

	//AOPC_CUST_VCM_SRC_FIELDStore.loadData(dataC_CUST_VCM,false);
//	var AOPC_CONS_VCM_SRC_FIELDStore = Ext.create('Ext.data.Store', {// C_CONS_VCM来源字段
//		fields : ['SRC_FIELDE', 'SRC_FIELDC'],
//		});
	
	

	var AOPAddPanel = Ext.create('Ext.form.Panel', {// 编辑评估属性面板
		name : 'AOPAddPanel',
		id : 'AOPAddPanel',
		layout : 'absolute',
		// layout : 'column',
		// defaults : {
		// columnWidth : 0.20,
		// labelAlign : "right",
		// margin : '6 0 6 0'
		// },
		// width : 500,
		// height : 300,
		title : '编辑评估对象属性',
		items : [
{
	x : 0,
	y : 0,
	xtype : 'textfield',
	width : 0,
	value : '-1',
	border : false,
	hidden : true,
	id : 'AOP_ATTR_ID',
	name : 'AOP_ATTR_ID'},

		         {
					x : 10,
					y : 10,
					xtype : 'label',
					text : ' 供电管理单位'
				}, {
					x : 90,
					y : 10,
					xtype : 'combo',
					width : 140,
					id : 'AOP_EleManaUnit',
					name : 'AOP_EleManaUnit',
					queryMode : 'local',
					store : eleManaOrgStore,
					displayField : 'ORG_NAME',
					valueField : 'ORG_NO',
					value : '34101'
					,
					// typeAhead: true
			}	, {
					x : 260,
					y : 10,
					xtype : 'label',
					text : '属性名称'
				}, {
					x : 340,
					y : 10,
					xtype : 'textfield',
					width : 140,
					name : 'AOPName',
					id : 'AOPName'
					,
				}, {
					x : 510,
					y : 10,
					xtype : 'label',
					text : '属性单位'
				}, {
					x : 590,
					y : 10,
					width : 140,
					name : 'AOPUnitType',
					id : 'AOPUnitType',
					xtype : 'combo',
					queryMode : 'local',
					store : AOPUNITStore,
					displayField : 'name2',
					valueField : 'abbr2',
					value : '02'
					,
				}, {
					x : 760,
					y : 10,
					xtype : 'label',
					text : '属性类别'
				}, {
					x : 840,
					y : 10,
					width : 140,
					name : 'AOPType',
					id : 'AOPType',
					xtype : 'combo',
					queryMode : 'local',
					store : AOPTYPE_CODEStore,
					displayField : 'name2',
					valueField : 'abbr2',
					value : '01'
					,
				}, {
					x : 10,
					y : 40,
					xtype : 'label',
					text : '属性用途类别'
				}, {
					x : 90,
					y : 40,
					width : 140,
					name : 'AOPUsageType',
					id : 'AOPUsageType',
					xtype : 'combo',
					queryMode : 'local',
					store : AOPUSAGE_CODEStore,
					displayField : 'name2',
					valueField : 'abbr2',
					value : '03'
					,
				}, {
					x : 260,
					y : 40,
					xtype : 'label',
					text : '影响程度'
				}, {
					x : 340,
					y : 40,
					width : 140,
					name : 'AOPInfluenceDegree',
					id : 'AOPInfluenceDegree',
					xtype : 'combo',
					queryMode : 'local',
					store : AOPEFFECT_DEGREEStore,
					displayField : 'name2',
					valueField : 'abbr2',
					value : '02'
					,
				},

				{
					x : 510,
					y : 40,
					xtype : 'label',
					text : '来源表'
				}, {
					x : 590,
					y : 40,
					xtype : 'combo',
					width : 140,
					name : 'AOPSourceTable',
					id : 'AOPSourceTable',
					store : AOPSRC_TABLEStore,
					displayField : 'SRC_TABLENameC',
					valueField : 'SRC_TABLENameE',
					value : 'C_CUST_VCM',
					 listeners : {
				        select : function (combo, record, index) {
					
					//Ext.Msg.alert(record.get(index));
					var srcTableNameE = Ext.getCmp('AOPSourceTable').getValue();
					
					switch(srcTableNameE){
					  　case 'C_CUST_VCM': 
				      　  AOP_SRC_FIELDStore.loadData(dataC_CUST_VCM,false);
				      　  Ext.getCmp('AOPSourceField').setValue(AOP_SRC_FIELDStore.getAt(0).get('SRC_FIELDE'));
				        　break;
					  case 'C_CONS_VCM': 
					      　  AOP_SRC_FIELDStore.loadData(dataC_CONS_VCM,false);
     			        Ext.getCmp('AOPSourceField').setValue(AOP_SRC_FIELDStore.getAt(0).get('SRC_FIELDE'));
					      　  break;
					      　  
					  case 'A_CONS_VCM_STAT_D': 
					      　  AOP_SRC_FIELDStore.loadData(dataA_CONS_VCM_STAT_D,false);
  			        Ext.getCmp('AOPSourceField').setValue(AOP_SRC_FIELDStore.getAt(0).get('SRC_FIELDE'));
					      　  break;
					  case 'A_CONS_VCM_STAT_M': 
					      　  AOP_SRC_FIELDStore.loadData(dataA_CONS_VCM_STAT_M,false);
  			        Ext.getCmp('AOPSourceField').setValue(AOP_SRC_FIELDStore.getAt(0).get('SRC_FIELDE'));
					      　  break;
					  case 'A_CONS_VCM_STAT_Y': 
					      　  AOP_SRC_FIELDStore.loadData(dataA_CONS_VCM_STAT_Y,false);
			        Ext.getCmp('AOPSourceField').setValue(AOP_SRC_FIELDStore.getAt(0).get('SRC_FIELDE'));
					      　  break;					      　  
					  case 'A_CUST_VCM_STAT_D': 
					      　  AOP_SRC_FIELDStore.loadData(dataA_CUST_VCM_STAT_D,false);
			        Ext.getCmp('AOPSourceField').setValue(AOP_SRC_FIELDStore.getAt(0).get('SRC_FIELDE'));
					      　  break;					      　  
					  case 'A_CUST_VCM_STAT_M': 
					      　  AOP_SRC_FIELDStore.loadData(dataA_CUST_VCM_STAT_M,false);
			        Ext.getCmp('AOPSourceField').setValue(AOP_SRC_FIELDStore.getAt(0).get('SRC_FIELDE'));
					      　  break;
					  case 'A_CUST_VCM_STAT_Y': 
					      　  AOP_SRC_FIELDStore.loadData(dataA_CUST_VCM_STAT_Y,false);
			        Ext.getCmp('AOPSourceField').setValue(AOP_SRC_FIELDStore.getAt(0).get('SRC_FIELDE'));
					      　  break;
				      　  
					}
				  //Ext.getCmp('AOPSourceTable').getValue();
				  
				}
				  
				   }

					
				},

				{
					x : 760,
					y : 40,
					xtype : 'label',
					text : '来源字段'
				}, {
					x : 840,
					y : 40,
					xtype : 'combo',
					width : 140,
					mode : 'local',
					name : 'AOPSourceField',
					id : 'AOPSourceField',
					store : AOP_SRC_FIELDStore,
					displayField : 'SRC_FIELDC',
					valueField : 'SRC_FIELDE',
					//value : '客户标识',
					
				}, {
					x : 10,
					y : 70,
					xtype : 'label',
					text : '风险因素类别'
				}, {
					x : 90,
					y : 70,
					width : 140,
					name : 'AOPRiskType',
					id : 'AOPRiskType',
					xtype : 'combo',
					queryMode : 'local',
					store : AOPRISK_TYPE_CODEStore,
					displayField : 'name2',
					valueField : 'abbr2',
					value : '02'
					,
				}, {
					x : 260,
					y : 70,
					xtype : 'label',
					text : '分析项类型'
				}, {
					x : 340,
					y : 70,
					width : 140,
					name : 'AOPAnalysisType',
					id : 'AOPAnalysisType',
					xtype : 'combo',
					queryMode : 'local',
					store : AOPANALYSE_TYPEStore,
					displayField : 'name2',
					valueField : 'abbr2',
					value : '02'
					,
				}, {
					x : 510,
					y : 70,
					xtype : 'label',
					text : '分析项等级'
				}, {
					x : 590,
					y : 70,
					width : 140,
					name : 'AOPAnalysisLevel',
					id : 'AOPAnalysisLevel',
					xtype : 'combo',
					queryMode : 'local',
					store : AOPEVENT_LEVELStore,
					displayField : 'name2',
					valueField : 'abbr2',
					value : '02'
					,
				}, {
					x : 10,
					y : 100,
					xtype : 'label',
					text : '数据来源'
				}, {
					x : 90,
					y : 100,
					xtype : 'textarea',
					width : 890,
					height : 50,
					name : 'AOPDataSource',
					id : 'AOPDataSource',
					typeAhead : true
				}, {
					x : 10,
					y : 160,
					xtype : 'label',
					text : '说明'
				}, {
					x : 90,
					y : 160,
					xtype : 'textarea',
					width : 890,
					height : 50,
					name : 'AOPRemark',
					id : 'AOPRemark',
					typeAhead : true
				}, {
					x : 180,
					y : 220,
					width : 30,
					xtype : 'button',
					align : 'center',

					text : "保存",
					handler : function() {
						var ATTR_ID = Ext.getCmp("AOP_ATTR_ID").getValue();
					
						var PS_ORG_NO = Ext.getCmp("AOP_EleManaUnit")
								.getValue();
						var ATTR_NAME = Ext.getCmp("AOPName").getValue();
						var UNIT = Ext.getCmp("AOPUnitType").getValue();
						var TYPE_CODE = Ext.getCmp("AOPType").getValue();
						var USAGE_CODE = Ext.getCmp("AOPUsageType").getValue();
						var EFFECT_DEGREE = Ext.getCmp("AOPInfluenceDegree")
								.getValue();
						var SRC_FIELD = Ext.getCmp("AOPSourceField").getValue();
						var SRC_TABLE = Ext.getCmp("AOPSourceTable").getValue();
						var RISK_TYPE_CODE = Ext.getCmp("AOPRiskType")
								.getValue();

						var ANALYSE_TYPE = Ext.getCmp("AOPAnalysisType")
								.getValue();
						var EVENT_LEVEL = Ext.getCmp("AOPAnalysisLevel")
								.getValue();
						var DATA_SRC = Ext.getCmp("AOPDataSource").getValue();
						var ATTR_COMMENT = Ext.getCmp("AOPRemark").getValue();

						Ext.Ajax.request({
							url : 'AssessmentObjPropertyAction!insertAOP.action',
							params : {
							
								ATTR_ID : ATTR_ID,
								PS_ORG_NO : PS_ORG_NO,

								ATTR_NAME : ATTR_NAME,
								UNIT : UNIT,
								TYPE_CODE : TYPE_CODE,
								USAGE_CODE : USAGE_CODE,
								EFFECT_DEGREE : EFFECT_DEGREE, // params
								// 参数名称必须与action方法中参数名称一致
								SRC_FIELD : SRC_FIELD,
								SRC_TABLE : SRC_TABLE,
								RISK_TYPE_CODE : RISK_TYPE_CODE,
								ANALYSE_TYPE : ANALYSE_TYPE,
								EVENT_LEVEL : EVENT_LEVEL,
								DATA_SRC : DATA_SRC,
								ATTR_COMMENT : ATTR_COMMENT
								,
							},

							success : function(response) {
								Ext.Msg.alert('评估对象属性保存成功！');
								
								
								var PS_ORG_NO = Ext.getCmp("eleManaUnitAdd_S").getValue();
								var ATTR_NAME = Ext.getCmp("ATTR_NAME_S").getValue();

								AOPInfoConStore.load({
											params : {
												PS_ORG_NO : PS_ORG_NO,
												ATTR_NAME : ATTR_NAME
												,
											}

										});
										
										
								AOPManaPanel.setActiveTab(AOPInfoPanel);
								Ext.getCmp('AOPAddPanel').form.reset();
							},
							failure : function() {
								Ext.getCmp('AOPAddPanel').form.reset();
								Ext.Msg.alert("错误", "新增失败");// 什么时候会用到？
							}
						});
					}
				}, {
					x : 700,
					y : 220,
					width : 30,
					xtype : 'button',
					text : '清空',
					align : 'center',
					handler : function() {
						Ext.getCmp('AOPAddPanel').form.reset();
						
						
						
						
					}
				}]

	});

	var AOPSearchPanel = Ext.create('Ext.form.Panel', {// 评估属性查询面板
		height : 50,
		// width : 800,
		region : 'north',
		border : false,
		frame : true,
		xtype : 'container',
		layout : 'column',
		defaults : {
			columnWidth : 0.20,
			labelAlign : "right",
			margin : '6 0 6 0'
		},
		items : [{

			xtype : 'combo',
			fieldLabel : '供电单位',
			width : 100,
			id : 'eleManaUnitAdd_S',
			name : 'eleManaUnitAdd_S',
			queryMode : 'local',
			store : eleManaOrgStore,
			displayField : 'ORG_NAME',
			valueField : 'ORG_NO',
			value : '34101'
			,
				// typeAhead: true
			}, {
			xtype : 'textfield',
			fieldLabel : '属性名称',
			width : 100,
			name : 'ATTR_NAME_S',
			id : 'ATTR_NAME_S',
			readOnly : false,
			labelSeparator : ''
			,
		},

		{
			// x: 80,
			// y: 100,
			width : 60,
			xtype : 'button',
			columnWidth : 0.10,
			text : '查询',
			anchor : '100%',
			margin : '6 5 6 10',
			// align : 'center',
			handler : function() {
				var PS_ORG_NO = Ext.getCmp("eleManaUnitAdd_S").getValue();
				var ATTR_NAME = Ext.getCmp("ATTR_NAME_S").getValue();

				AOPInfoConStore.load({
							params : {
								PS_ORG_NO : PS_ORG_NO,
								ATTR_NAME : ATTR_NAME
								,
							}

						});
				Ext.getCmp('AOPAddPanel').form.reset();
			}
		}, {
			margin : '6 5 6 5',
			// x: 80,
			// y: 100,
			width : 60,
			xtype : 'button',
			columnWidth : 0.10,
			anchor : '60%',
			text : '删除',
			id : 'delAOP',
			name : 'delAOP',
			handler : function() {
				var rec2 = selModelAOP.getSelection();
				var ATTR_ID = rec2[0].get("ATTR_ID");
				Ext.Ajax.request({
							url : 'AssessmentObjPropertyAction!delAOP.action',
							params : {
								ATTR_ID : ATTR_ID
							},
							success : function(response) {
								Ext.Msg.alert("客户群删除成功");
								var PS_ORG_NO = Ext.getCmp("eleManaUnitAdd_S")
										.getValue();
								var ATTR_NAME = Ext.getCmp("ATTR_NAME_S")
										.getValue();

								AOPInfoConStore.load({
											params : {
												PS_ORG_NO : PS_ORG_NO,
												ATTR_NAME : ATTR_NAME
												,
											}

										})
							}
						});
			}
		}]
	});

	var AOPSearchResultPanel = Ext.create('Ext.grid.Panel', {// 显示评估属性查询结果
		name : AOPSearchResultPanel,
		id : AOPSearchResultPanel,
		region : 'center',
		title : '查询结果',
		// width : 800,
		autoScroll : true,
		queryMode : 'remote',

		store : AOPInfoConStore,
		selModel : selModelAOP,

		columns : [

		{
					header : "属性编号",
					// sortable : true,
					// resizable : true,
					dataIndex : "ATTR_ID",
					flex : 1
				}, {
					header : "属性名称",
					// sortable : true,
					// resizable : true,
					dataIndex : "ATTR_NAME",
					flex : 1
				}, {
					header : "用途类型",
					// sortable : true,
					// resizable : true,
					flex : 1,
					dataIndex : "USAGE_CODE"
				}, {
					header : "属性类型",
					// sortable : true,
					// resizable : true,
					flex : 1,
					dataIndex : "TYPE_CODE"
				}, {
					header : "属性单位",
					// sortable : true,
					// resizable : true,
					flex : 1,
					dataIndex : "UNIT"
				}, {
					header : "用电管理单位",
					// sortable : true,
					// resizable : true,
					flex : 1,
					dataIndex : "PS_ORG_NO"
				}, {
					header : "影响程度",
					// sortable : true,
					// resizable : true,
					flex : 1,
					dataIndex : "EFFECT_DEGREE"
				}, {
					header : "数据来源",
					// sortable : true,
					// resizable : true,
					flex : 1,
					dataIndex : "DATA_SRC"
				}, {
					header : "来源字段",
					// sortable : true,
					// resizable : true,
					flex : 1,
					dataIndex : "SRC_FIELD"
				}, {
					header : "来源表",
					// sortable : true,
					// resizable : true,
					dataIndex : "SRC_TABLE",
					flex : 1
				}, {
					header : "说明",
					// sortable : true,
					// resizable : true,
					flex : 1,
					dataIndex : "ATTR_COMMENT"
				}, {
					header : "风险因素类型",
					// sortable : true,
					// resizable : true,
					flex : 1,
					dataIndex : "RISK_TYPE_CODE"
				}, {
					header : "分析类型",
					// sortable : true,
					// resizable : true,
					flex : 1,
					dataIndex : "ANALYSE_TYPE"
				}, {
					header : "分析项等级",
					// sortable : true,
					// resizable : true,
					flex : 1,
					dataIndex : "EVENT_LEVEL"
				}]

	});

	var AOPInfoPanel = Ext.create('Ext.form.Panel', {// 评估对象属性信息管理面板（查询、显示和删除评估属性）
		region : 'center',
		// height : 300,
		// width:800,
		title : '评估对象属性维护',
		collapsible : true,
		floatable : false,
		autoScroll : true,
		items : [AOPSearchPanel, AOPSearchResultPanel]

	});

	var AOPManaPanel = Ext.createWidget('tabpanel', {
				region : 'center',
				activeTab : 0,
				defaults : {
					bodyPandding : 10
				},
				items : [AOPInfoPanel, AOPAddPanel]
			});

	renderModel(AOPManaPanel, "评估对象属性管理");

});
