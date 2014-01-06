var DEFAULT_PAGE_SIZE = 18;
Ext.onReady(function() {
	// 异常流程查询
	Ext.define('flowModel', {
				extend : 'Ext.data.Model',
				fields : ['FLOW_STATUS_NAME', 'TERMINAL_ADDR', 'SEND_ORG_NAME', 'CREATE_TYPE_NAME',
						'FLOW_STATUS_DETAIL_NAME', 'MANAGE_TYPE_NAME', 'FLOW_FLAG_NAME', 'EXCEPT_SRC_NAME',
						'ALARM_SRC', 'TASK_NO','TASK_ID', 'CREATE_TYPE', 'SEND_ORG_NO', 'SEND_SFAFF_NO',
						'START_TIME', 'CLOSE_ORG_NO','CLOSE_SFAFF_NO', 'CLOSE_TIME', 'FLOW_STATUS_CODE', 'FLOW_STATUS_DETAIL',
						'FLOW_FLAG', 'APP_NO','MANAGE_TYPE','CLOSE_ORG_NAME','SEND_STAFF_NAME','CLOSE_STAFF_NAME']
	});
	var formPanel = Ext.create('Ext.form.Panel', {
	height : 90,
	region : 'north',
	border : false,
	layout : 'auto',
	frame: true,
	items : [{
			xtype : 'container',
			layout : 'column',
			defaults : {
				columnWidth : 0.3,
				labelAlign : "right",
				margin : '6 0 6 0'
			},
			items : [{
						xtype:'combo',
						fieldLabel : '供电单位',
						name : 'org_no',
						store : statQuery.orgStore,
						displayField : 'ORG_NAME',
						valueField : 'ORG_NO',
						multiSelect : false,
						queryMode : 'local',
						// flex : 1,
						editable : false,
						anchor : '100%',
						listeners : {
							afterRender : function(combo) {
								if(statQuery.orgStore.first().data!=null&&typeof(statQuery.orgStore.first().data)!='undefined'){
								combo
										.setValue(statQuery.orgStore.first().data.ORG_NO);
								}
							}
						}
					},
					{
						xtype:'combo',
						fieldLabel : '流程标记',
						name : 'flow_status_code',
						store : statQuery.flowFlagingStore,
						displayField : 'NAME',
						valueField : 'VALUE',
						multiSelect : false,
						queryMode : 'local',
						// flex : 1,
						editable : false,
						anchor : '100%',
						listeners : {
							afterRender : function(combo) {
								combo
										.setValue(statQuery.flowFlagingStore.first().data.VALUE);
							}
						}
					},{
						xtype:'combo',
						fieldLabel : '生成方式',
						name : 'create_type',
						store : statQuery.createTypeStore,
						displayField : 'NAME',
						valueField : 'VALUE',
						multiSelect : false,
						queryMode : 'local',
						// flex : 1,
						editable : false,
						anchor : '100%',
						listeners : {
							afterRender : function(combo) {
								combo
										.setValue(statQuery.createTypeStore.first().data.VALUE);
							}
						}
					}]
				}, {
            		xtype:'container',
	                layout:'column',
	                defaults:{
						columnWidth : 0.3,
						labelAlign : "right"
					},
	            	items:[{
						xtype : 'datefield',
						format : 'Y-m-d',
						name : 'start_date',
						fieldLabel:'发起时间',
						flex:1,
						anchor : '100%',
						value:statQuery.start_date
					},{
						xtype : 'datefield',
						format : 'Y-m-d',
						name : 'end_date',
						fieldLabel:'到',
						flex:1,
						value:statQuery.end_date
					},{
						xtype : 'button',
						text : "查  询",
						width : 80,
						waitMsg : '查询中。。。',
						flex : 1,
						margin : '5 0 0 260',
						handler : function() {
							form = this.up('form').getForm().getValues();
							flowStore.getProxy().extraParams =form;
							flowStore.load();
						}
					}]
			}]
});

	// 流程查询查询
	var flowStore = Ext.create('Ext.data.Store', {
		model : 'flowModel',
		pageSize: DEFAULT_PAGE_SIZE,
		remoteSort: true,
        buffered: true,
		proxy : {
			type : 'ajax',
			url : 'AlarmFlowQueryAction!queryAlarmFlowList',
			extraParams:formPanel.getValues(),
			reader : {
				root : 'alramFlowList',
				totalProperty: 'totalCount',
				type : 'json'
			}
		}
	});
	var resultGrid = Ext.create('Ext.grid.Panel', {
		region : 'center',
		title : '查询结果',
		//verticalScrollerType: 'paginggridscroller',
        // do not reset the scrollbar when the view refreshs
        //invalidateScrollerOnRefresh: false,
		store : flowStore,
		columns : [
		        {
	                xtype: 'rownumberer',
	                flex: 0,
	                width: 30
	            },{
					header : "工单编号",
					sortable : true,
					dataIndex : "TASK_NO",
					flex:1
				}, {
					header : "异常来源",
					sortable : true,
					dataIndex : "EXCEPT_SRC_NAME",
					flex:1
				}, {
					header : "生成方式",
					sortable : true,
					flex: 1,
					dataIndex : "CREATE_TYPE_NAME"
				},{
					header : "终端地址",
					sortable : true,
					flex: 1,
					dataIndex : "TERMINAL_ADDR"
				}, {
					header : "发起人单位",
					sortable : true,
					flex: 1,
					dataIndex : "SEND_ORG_NAME"
				}, {
					header : "发起人",
					sortable : true,
					flex: 1,
					dataIndex : "SEND_STAFF_NAME"
				}, {
					header : "发起时间",
					sortable : true,
					flex: 1,
					dataIndex : "START_TIME"
				}, {
					header : "完成人单位",
					sortable : true,
					flex: 1,
					dataIndex : "CLOSE_ORG_NAME"
				}, {
					header : "完成人",
					sortable : true,
					flex: 1,
					dataIndex : "CLOSE_STAFF_NAME"
				}, {
					header : "完成时间",
					sortable : true,
					flex: 1,
					dataIndex : "CLOSE_TIME"
				}, {
					header : "流程状态",
					sortable : true,
					flex: 1,
					dataIndex : "FLOW_STATUS_NAME"
				}, {
					header : "流程状态明细",
					sortable : true,
					flex: 1,
					dataIndex : "FLOW_STATUS_DETAIL_NAME"
				}, {
					header : "流程标记",
					sortable : true,
					flex: 1,
					dataIndex : "FLOW_FLAG_NAME"
				}, {
					header : "营销反馈申请单号",
					sortable : true,
					flex: 1,
					dataIndex : "APP_NO"
				}, {
					header : "营销处理类型",
					sortable : true,
					flex: 1,
					dataIndex : "MANAGE_TYPE_NAME"
				}],
				dockedItems: [{
		        xtype: 'pagingtoolbar',
		        store: flowStore,   
		        dock: 'bottom',
		        displayInfo: true
	    		}]
	});
	var mainPanel = Ext.create('Ext.panel.Panel', {
				layout : "fit",
				hideBorders : true,
				border:false,
				items : {
					layout : "border",
					deferredRender : false,
					items : [formPanel, resultGrid]
				}
	});
	//equipStore.guaranteeRange(0, 50);
	renderModel(mainPanel, "异常流程查询");

});
