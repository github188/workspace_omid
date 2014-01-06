var DEFAULT_PAGE_SIZE = 100;	
	
Ext.define('AlarmAnalyse', {
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'ALARM_ID',
		type : 'string'
	}, {
		name : 'ALARM_TYPE',
		type : 'string'
	}, {
		name : 'ORG_NO',
		type : 'string'
	}, {
		name : 'CONS_NO',
		type : 'string'
	}, {
		name : 'TERMINAL_ID',
		type : 'string'
	},{
		name : 'TMNL_ASSET_NO',
		type : 'string'
	},{
		name : 'TERMINAL_ADDR',
		type : 'string'
	},{
		name : 'FACTORY_CODE',
		type : 'string'
	},{
		name : 'PROTOCOL_CODE',
		type : 'string'
	},{
		name : 'METER_ID',
		type : 'string'
	},{
		name : 'METER_ASSET_NO',
		type : 'string'
	},{
		name : 'METER_MANUFACTURER',
		type : 'date'
	},{
		name : 'COMM_NO',
		type : 'string'
	},{
		name : 'DATA_SRC',
		type : 'string'
	},{
		name : 'ALARM_CODE',
		type : 'string'
	},{
		name : 'ALARM_SRC',
		type : 'string'
	},{
		name : 'EVENT_CODE',
		type : 'string'
	},{
		name : 'TYPE_CODE',
		type : 'string'
	},{
		name : 'FIRST_ALARM_DATE',
		type : 'string'
	},{
		name : 'ALARM_DATE',
		type : 'string'
	},{
		name : 'ALARM_CNT',
		type : 'int'
	},{
		name : 'SAVE_ALARM_DATE',
		type : 'string'
	},{
		name : 'FIRST_RESUME_DATE',
		type : 'string'
	},{
		name : 'RESUME_DATE',
		type : 'string'
	},{
		name : 'RESUME_DAY_CNT',
		type : 'int'
	},{
		name : 'EVENT_LEVEL',
		type : 'string'
	},{
		name : 'ORG_NAME',
		type : 'string'
	},{
		name : 'PROTOCOL_NAME',
		type : 'string'
	},{
		name : 'EXCEPT_SRC_NAME',
		type : 'string'
	},{
		name : 'DATE_SRC_NAME',
		type : 'string'
	},{
		name : 'EVENT_LEVEL_NAME',
		type : 'string'
	},{
		name : 'EXCEPT_TYPE_NAME',
		type : 'string'
	}]
});
Ext.onReady(function() {
	

	// exceptSRCList
	Ext.define('ExceptSRCModel', {
				extend : 'Ext.data.Model',
				fields : [{
							type : 'string',
							name : 'EXCEPT_SRC_CODE'
						}, {
							type : 'string',
							name : 'EXCEPT_SRC_NAME'
						}]
	});
	// 异常来源Store
	 exceptSRCStore = Ext.create('Ext.data.Store', {
				model : 'ExceptSRCModel',
				proxy : {
					type : 'ajax',
					url : 'awaitAlarm/awaitAlarmAction!getExceptSRC.action',
					reader : {
						root : 'exceptSRCList',
						type : 'json'
					}
				},
				autoLoad : true
	});
	
	var northPanel=Ext.create('Ext.form.Panel', {
		region:'north',
		frame:true,
		height : 100,
		bodyPadding : 1,
		 items: [{
	            xtype: 'container',
	            anchor: '100%',
	            layout:'column',
	            items:[
                  {
	                xtype: 'container',
	                columnWidth:.33,
	                layout: 'anchor',
	                items: [{
	                    xtype:'combo',
	                    fieldLabel: '供电单位',
	                    labelAlign:'right',
	                    name: 'org_no',
	                    store : statQuery.orgStore,
						displayField : 'ORG_NAME',
						valueField : 'ORG_NO',
						multiSelect : false,
						queryMode : 'local',
	                    anchor:'96%',
	                    editable: false,
	                    listeners : {
					      afterRender : function(combo) {
					         combo.setValue(statQuery.orgStore.first().data.ORG_NO);
					      }
				   		}
	                },
	                	{
	                    xtype:'datefield',
	                    margin:'10 0 0 0',
	                    fieldLabel: '起始时间',
	                    format:'Y-m-d',
	                    labelAlign:'right',
	                    name: 'minDate',
	                    anchor:'96%',
	                    value:statQuery.start_date
	                }]
	            },
	            {
	                xtype: 'container',
	                columnWidth:.33,
	                layout: 'anchor',
	                items: [{
	                    xtype:'combo',
	                    fieldLabel: '告警等级',
	                    labelAlign:'right',
	                    name: 'event_level',
	                    store:statQuery.levelStore,
	                    displayField : 'NAME',
						valueField : 'VALUE',
						multiSelect : false,
						queryMode : 'local',
						editable: false,
	                    anchor:'98%',
	                    listeners : {
					      afterRender : function(combo) {
					         combo.setValue(statQuery.levelStore.first().data.VALUE);
					      }
				   		}
	                },{
	                    xtype:'datefield',
	                    margin:'10 0 0 0',
	                    fieldLabel: '结束时间',
	                    format:'Y-m-d',
	                    labelAlign:'right',
	                    name: 'maxDate',
	                    editable:false,
	                    value: statQuery.end_date,
	                    anchor:'98%'
	                }]
	            },{
	                xtype: 'container',
	                columnWidth:.33,
	                layout: 'anchor',
	                items: [{
	                	xtype:'combo',
	                    fieldLabel: '告警来源',
	                    labelAlign:'right',
	                    name: 'alarm_src',
	                    store:statQuery.sourceStore,
	                    displayField : 'NAME',
						valueField : 'VALUE',
						multiSelect : false,
						queryMode : 'local',
	                    anchor:'98%',
	                    editable: false,
	                    listeners : {
					      afterRender : function(combo) {
					         combo.setValue(statQuery.sourceStore.first().data.VALUE);
					      }
					   }
	                }
	              ,{
	                	xtype:'button',
	                	text:'查询',
	                	width:80,
	                	margin:'6 0 0 260',
	                	handler:function(){
	                	var form = this.up('form').getForm();
	                	myStore.load({params:form.getValues()});
	                	}
	                	
//	                	border:false,
//	                	buttons : [ 
//						{
//							text : '查询',
//							handler : function() {
//								var form = this.up('form').getForm(); // get the basic
//																		// form
//								myStore.load( {
//									params : form.getValues()
//								});
//							}
//						}
//						]
	                }
	                ]
	            }]
	        }]
	        
	});

	 var myStore = Ext.create('Ext.data.Store', {
		model : 'AlarmAnalyse',
		pageSize: 20,
		remoteSort: true,
        buffered: true,
		proxy : {
			type : 'ajax',
			url : 'AlarmAnalyseAction!queryAlarmAnalyse.action',
			extraParams: {
                total: 2000
            },
			reader : {
				type : 'json',
				totalProperty: 'totalCount',
				root : 'alarmList'
			}
		}
	});

		var centerPanel = Ext.create('Ext.grid.Panel', {
			region:'center',
			title: '用户列表',
	        store: myStore,
	        verticalScrollerType: 'paginggridscroller',
	        loadMask: true,
	        disableSelection: true,
	        invalidateScrollerOnRefresh: false,
	        viewConfig: {
	            trackOver: false
	        },
			//selType:'checkboxmodel',
			//multiSelect:true,
			columns : [ {
        		xtype: 'rownumberer',
        		width: 50,
        		sortable: false
       		 },{
				header : '告警类别',
				dataIndex : 'EXCEPT_TYPE_NAME',
				flex:1
			},{
				header : '供电单位名称',
				dataIndex : 'ORG_NAME',
				flex:1
			},{
				header : '用户编号',
				dataIndex : 'CONS_NO',
				flex:1
			},
	/*			{
				header : '终端资产号',
				dataIndex : 'TMNL_ASSET_NO',
				flex:1
			},{
				header : '终端地址',
				dataIndex : 'TERMINAL_ADDR',
				flex:1
			},{
				header : '终端生产厂家',
				dataIndex : 'FACTORY_CODE',
				flex:1
			},{
				header : '采用通讯规约',
				dataIndex : 'PROTOCOL_CODE',
				flex:1
			},*/
				{
				header : '电能表资产号',
				dataIndex : 'METER_ASSET_NO',
				flex:1
			},{
				header : '最近告警时间',
				dataIndex : 'ALARM_DATE',
				format:'Y-m-d',
				//renderer: Ext.util.Format.dateRenderer('Y-n-j'),
				flex:1
			}, {
				header : '告警发生次数 ',
				dataIndex : 'ALARM_CNT',
				flex:1
			}, 
			/*{
				header : '第一次恢复日期',
				dataIndex : 'FIRST_RESUME_DATE',
				format:'Y-m-d',
				//renderer: Ext.util.Format.dateRenderer('Y-n-j'),
				flex:1
			}, {
				header : '恢复日期',
				dataIndex : 'RESUME_DATE',
				format:'Y-m-d',
				//renderer: Ext.util.Format.dateRenderer('Y-n-j'),
				flex:1
			}, */
				{
				header : '连续恢复天数',
				dataIndex : 'RESUME_DAY_CNT',
				flex:1
			}, 
				{
				header : '事件等级',
				dataIndex : 'EVENT_LEVEL_NAME',
				flex:1,
				renderer: function(v) {
					if(v == "严重") return "<font color='red'>" + v + "</font>";
					else if(v == "重要") return "<font color='green'>" + v + "</font>";
					else if(v == "较重要") return "<font color='yellow'>" + v + "</font>";
					else if(v == "一般") return "<font color='blue'>" + v + "</font>";
	
				}
			}, {
				header : 'ID',
				dataIndex : 'DATE_SRC_NAME',
				hidden:true,
				flex:1
			}, {
				header : '数据来源',
				dataIndex : 'DATE_SRC_NAME',
				flex:1
			},
			{
				header : '告警来源',
				dataIndex : 'EXCEPT_SRC_NAME',
				flex:1
			}]
		});
		alarmAnalyseMainPanel=Ext.create('Ext.panel.Panel',{
			border:true,
			layout : 'border',
			items:[northPanel,centerPanel]
		});
		
		renderModel(alarmAnalyseMainPanel,'异常综合查询');
		myStore.guaranteeRange(0, 19);
	});
