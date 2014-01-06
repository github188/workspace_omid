var DEFAULT_PAGE_SIZE = 100;

Ext.onReady(function() {
    var complexComonQuery_url="AlarmAnalyseAction!queryComplexCommonList.action";
	//用户分类
	var userSort_store = Ext.create('Ext.data.Store', {
		model : 'complexQueryCommonModel',
		proxy : {
			type : 'ajax',
			url : complexComonQuery_url,
			extraextraParams: {
				column_name	:'cons_sort_name',
				column_value	:'cons_sort',
	            table_name:'vw_cons_sort'
            },
			reader : {
				root : 'complexCommonList',
				type : 'json'
			}
		}
		,autoLoad : true

	});
	//处理方式
	 handleType_store = Ext.create('Ext.data.Store', {
		model : 'complexQueryCommonModel',
		proxy : {
			type : 'ajax',
			url : complexComonQuery_url,
			extraParams:{
				column_name	:'flow_flag_name',
				column_value	:'flow_flag_code',
				table_name:'vw_flow_flag_code'
			},
			reader : {
				root : 'complexCommonList',
				type : 'json'
			}
		}
		,autoLoad : true

	});
	
	//行业
	var trade_store = Ext.create('Ext.data.Store', {
		model : 'complexQueryCommonModel',
		proxy : {
			type : 'ajax',
			url : complexComonQuery_url,
			extraParams:{
				column_name	:'trade_name',
				column_value:'p_trade_no',
				table_name:'SEA_VW_TRADE'
			},
			reader : {
				root : 'complexCommonList',
				type : 'json'
			}
		}
		,autoLoad : true

	});
	//用户容量等级
	var grade_store = Ext.create('Ext.data.Store', {
		model : 'complexQueryCommonModel',
		proxy : {
			type : 'ajax',
			url : complexComonQuery_url,
			extraParams:{
				column_name	:'cap_grade_name',
				column_value	:'cap_grade_no',
				table_name:'sea_vw_cap_grade'
			},
			reader : {
				root : 'complexCommonList',
				type : 'json'
			}
		}
		,autoLoad : true

	});
	//终端规约
	var protocol_store = Ext.create('Ext.data.Store', {
		model : 'complexQueryCommonModel',
		proxy : {
			type : 'ajax',
			url : complexComonQuery_url,
			extraParams:{
				column_name	:'protocol_name',
				column_value	:'protocol_code',
				table_name:'sea_vw_protocol_code'
			},
			reader : {
				root : 'complexCommonList',
				type : 'json'
			}
		}
		,autoLoad : true

	});
	//通信方式
	var protocol_store = Ext.create('Ext.data.Store', {
		model : 'complexQueryCommonModel',
		proxy : {
			type : 'ajax',
			url : complexComonQuery_url,
			extraParams:{
				column_name	:'comm_mode',
				column_value	:'comm_mode_code',
				table_name:'sea_vw_comm_mode'
			},
			reader : {
				root : 'complexCommonList',
				type : 'json'
			}
		}
		,autoLoad : true

	});
});