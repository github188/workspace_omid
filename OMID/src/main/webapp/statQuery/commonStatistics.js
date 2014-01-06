/*--------------公共查询方法----------------*/
Ext.application({});
	
Ext.onReady(function() {
	Ext.ns('statQuery');
	statQuery.end_date = new Date();
	statQuery.start_date = new Date();
	statQuery.yesterday_date = new Date();
	statQuery.start_date.setTime(statQuery.end_date.getTime() - 3600 * 24 * 30 * 1000);
	statQuery.yesterday_date.setTime(statQuery.end_date.getTime() - 3600 * 24  * 1000);
	// org_noList
	Ext.define('OrgModel', {
				extend : 'Ext.data.Model',
				fields : [{
							type : 'string',
							name : 'ORG_NO'
						}, {
							type : 'string',
							name : 'ORG_NAME'
						}]
	});
	// 供电单位Store
	statQuery.orgStore = Ext.create('Ext.data.Store', {
				model : 'OrgModel',
				proxy : {
					type : 'ajax',
					url : 'MeasureExcAction!queryOrgNolist.action',
					extraParams:{
						"org_no":LOGGEDORGNO,
						"org_type":LOGGEDLEVEL
					},
					reader : {
						root : 'orgList',
						type : 'json'
					}
				},
				autoLoad : true
	});
	
	Ext.define('AlarmModel', {
				extend : 'Ext.data.Model',
				fields : [{
							type : 'string',
							name : 'NAME'
						}, {
							type : 'string',
							name : 'VALUE'
						}]
	});
	Ext.define('complexQueryCommonModel', {
		extend : 'Ext.data.Model',
		fields : ['NAME','VALUE']
	});
	// 异常等级Store
	statQuery.levelStore = Ext.create('Ext.data.Store', {
				model : 'AlarmModel',
				proxy : {
					type : 'ajax',
					url : 'MeasureExcAction!queryAlarmLevel.action',
					reader : {
						root : 'alarmLevelList',
						type : 'json'
					}
				},
				autoLoad : true
	});
	// 异常类型Store
	statQuery.typeStore = Ext.create('Ext.data.Store', {
				model : 'AlarmModel',
				proxy : {
					type : 'ajax',
					url : 'MeasureExcAction!queryAlarmType.action',
					reader : {
						root : 'alarmTypeList',
						type : 'json'
					}
				},
				autoLoad : true
	});
	// 异常来源Store
	statQuery.sourceStore = Ext.create('Ext.data.Store', {
				model : 'AlarmModel',
				proxy : {
					type : 'ajax',
					url : 'MeasureExcAction!queryAlarmSrc.action',
					reader : {
						root : 'alarmSrcList',
						type : 'json'
					}
				}
				,autoLoad : true
	});
	// 异常流程状态明细Store
	statQuery.flowStatusStore = Ext.create('Ext.data.Store', {
				model : 'AlarmModel',
				proxy : {
					type : 'ajax',
					url : 'MeasureExcAction!queryFlowStatus.action',
					reader : {
						root : 'flowStatusList',
						type : 'json'
					}
				}
				,autoLoad : true
	});
	// 异常流程状态Store
	statQuery.flowFlagingStore = Ext.create('Ext.data.Store', {
				model : 'AlarmModel',
				proxy : {
					type : 'ajax',
					url : 'MeasureExcAction!queryFlowFlaging.action',
					reader : {
						root : 'flowFlagingList',
						type : 'json'
					}
				}
				,autoLoad : true
	});
	// 异常生成方式Store
	statQuery.createTypeStore = Ext.create('Ext.data.Store', {
				model : 'AlarmModel',
				proxy : {
					type : 'ajax',
					url : 'MeasureExcAction!queryCreateType.action',
					reader : {
						root : 'createTypeList',
						type : 'json'
					}
				}
				,autoLoad : true
	});
	var store_array=[
	{store_name:'userSort_store',column_name:'cons_sort_name',column_value:'cons_sort',table_name:'vw_cons_sort'},
	{store_name:'handleType_store',column_name:'flow_flag_name',column_value:'flow_flag_code',table_name:'vw_flow_flag_code'},
	{store_name:'trade_store',column_name:'trade_name',column_value:'p_trade_no',table_name:'sea_vw_trade'},
	{store_name:'grade_store',column_name:'cap_grade_name',column_value:'cap_grade_no',table_name:'sea_vw_cap_grade'},
	{store_name:'protocol_store',column_name:'protocol_name',column_value:'protocol_code',table_name:'sea_vw_protocol_code'},
	//通信方式
	{store_name:'commMode_store',column_name:'COMM_MODE',column_value:'COMM_MODE_CODE',table_name:'SEA_Vw_Comm_Mode'},
	//终端类型
	{store_name:'tmnlType_store',column_name:'TMNL_TYPE',column_value:'TMNL_TYPE_CODE',table_name:'sea_vw_tmnl_type_code'},
	//终端状态
	{store_name:'tmnlStatus_store',column_name:'STATUS_name',column_value:'STATUS_CODE',table_name:'sea_vw_tmnl_status_run'},
	//电能表规约
	{store_name:'meterProtocol_store',column_name:'protocol_name',column_value:'protocol_code',table_name:'sea_vw_met_comm_protocol'},
	//计量点分类
	{store_name:'mpType_store',column_name:'mp_attr_name',column_value:'mp_attr_code',table_name:'sea_vw_mp_attr'},
	//计量点用途
	{store_name:'mpUsage_store',column_name:'usage_Type_name',column_value:'usage_type_code',table_name:'sea_vw_mp_usage_type'}
	];
	var store_obj={};
	store_obj.list=store_array;
	 statQuery.stores_obj={};
	for(var i=0;i<store_array.length;i++){
		statQuery.stores_obj[store_array[i].store_name]=Ext.create("Ext.data.Store",{
			model : 'complexQueryCommonModel',
			data  :[]
		});
	}
	Ext.Ajax.request({
			url : 'AlarmAnalyseAction!queryComplexCommonList.action',
			params : {
				params_list:Ext.encode(store_obj)
			},
			success : function(response) {
				var result = Ext.decode(response.responseText);
				var complexCommData = result.complexCommData;
				for(var i=0;i<store_array.length;i++){
					statQuery.stores_obj[store_array[i].store_name].loadData(complexCommData[store_array[i].store_name]);
				}
			}
	});
	console.log(statQuery.stores_obj);
	
});
