Ext.onReady(function() {
	var gOrgNo; 
	var gEventLevel;
	var gQueryDate;
	var gConsNo;
	var gTerminalAddr;
	var gFlowStatusCode;
		Ext.define('abnormalInfoModel', {
				extend : 'Ext.data.Model',
				fields : ["APP_NO","ORG_NO","CONS_ID", "CONS_NO", "TG_ID","ELEC_ADDR", "CP_NO","TERMINAL_ID", 
						"TERMINAL_TYPE_CODE", "NEW_TERMINAL_ID","MP_NO","TYPE_CODE","USAGE_TYPE_CODE",
						"TMNL_TASK_TYPE","CONS_CHG_TYPE","METER_FLAG","WKST_APP_NO","DEBUG_STATUS_CODE",
						"DEBUG_TIME","FLOW_FLAG","DEBUG_CNT","TMNL_TASK_TYPE_NAME","DEBUG_STATUS_NAME",
						"FLOW_FLAG_NAME"]
		});
		var abnormalEleChartStore = Ext.create('Ext.data.Store', {
			model : 'abnormalInfoModel',
			remoteSort : true,
			buffered: true,
			pageSize : DEFAULT_PAGE_SIZE,
			proxy : {
				type : 'ajax',
				url : 'taskFlowAction!queryAbnormal.action',
				extraParams: {
	                //'queryItems.terminal_id':'1400001021'
	               // 'queryItems.terminal_id':terminal_id
	            },
				reader : {
					type : 'json',
					root : 'abnormalList',
					totalProperty : 'totalCount'
				}
			}
			//,autoLoad : true
	});
	
	var selectModel = Ext.create('Ext.selection.CheckboxModel',{
	    	//injectCheckbox:false, 
			mode : 'SINGLE',
			listeners : {
				    select : function(t,rec,index,e) {
		      				/*	eleMeterEventStore.proxy.extraParams={
									'queryItems.alarmId' : rec.get('ALARM_ID'),
									'queryItems.eventTypeCode':'02'
								};
								eleMeterEventStore.load();
								queryFileInfoFun(rec);*/
								var exceptions = abnormalInfoGrid.getSelectionModel().getSelection();
								var terminal_id = exceptions[0].get('TERMINAL_ID');	
		      					abnormalEleChartStore.proxy.extraParams={
									'queryItems.terminal_id' : terminal_id
									//'queryItems.eventTypeCode':'02'
								};
								abnormalEleChartStore.load();
								//queryExceptHisInfo(rec);
		      			
		      		}
			}
	});
	
		var totalException = Ext.create('Ext.selection.CheckboxModel',{
	    	injectCheckbox:false, 
			mode : 'SINGLE',
			listeners : {
				    select : 
				    		function(t,rec,index,e) {
								queryExceptInfo('');
								abnormalEleChartStore.removeAll();
		      			
		      		}
			}
	});
	
	Ext.define('Event',{
		extend : 'Ext.data.Model',
		fields : [ 
				   "ALARM_ID",
				   "ALARM_CODE",
			       "EVENT_NAME",
			       "EVENT_LEVEL",
			       "ORG_NO",
		           "ORG_NAME",
			       "CONS_NO",
			       "CONS_NAME",
			       "ALARM_SRC",
			       "CONS_TYPE",
			       "CONS_TYPE_NAME",
			       "FIRST_ALARM_DATE",
			       "ALARM_DATE",
			       "ALARM_CNT",
			       "FIRST_RESUME_DATE",
			       "RESUME_DATE",
			       "RESUME_DAY_CNT",
			       "TERMINAL_ADDR",
			       "TERMINAL_ID",
			       "METER_ID",
			       "ASSET_NO",
			       "ALARM_SRC",
			       "SAVE_ALARM_DATE"
			      ]
	});
	
	var msExceAnalStore =   Ext.create('Ext.data.Store', {
		model : 'Event',
		remoteSort : true,
		pageSize: DEFAULT_PAGE_SIZE,
		proxy : {
			type : 'ajax',
			url : 'taskFlowAction!queryTaskFlow.action',
			reader : {
				type : 'json',
				root : 'resultList',
				totalProperty : 'totalCount'
			}
		}	
	});
	
	var abnormalInfoGrid = Ext.create('Ext.grid.Panel', {
				title : '计量异常事件明细',
				loadMask : true,
				selModel : selectModel,
				region : 'center',
				border : true,
				store:msExceAnalStore,
//				verticalScrollerType: 'paginggridscroller',
//				invalidateScrollerOnRefresh: false,
				viewConfig: {
		            trackOver: false
		        },
				columnLines : true,
				columns : [Ext.create('Ext.grid.RowNumberer', {
						header : '序号',
						width : 30
						}),{
							text : "供电单位",
							width : 120,
							dataIndex : 'ORG_NAME',
							align : 'center',
							sortable : true
						},{
							text : "terminal_id",
							width : 120,
							dataIndex : 'TERMINAL_ID',
							hidden:true,
							align : 'center',
							sortable : true
						}, {
							text : "事件名称",
							width : 120,
							dataIndex : 'EVENT_NAME',
							align : 'center',
							sortable : false
						}, {
							text : "事件等级",
							width : 90,
							dataIndex : 'EVENT_LEVEL',
							align : 'center',
							sortable : true,
							renderer:function(value){
					   			if(value=="严重"){
						   			return "<font color='#D4101D';font-weight:bold>严重</font>";
						   		}
						   		else if(value=="重要"){
						   			return "<font color='#D46B1D';font-weight:bold>重要</font>";
						   		}
						   		else if(value=="较重要"){
						   			return "<font color='#D1B11A';font-weight:bold>较重要</font>";
						   		}
						   		else if(value=="一般"){
						   			return "<font color='#026115';font-weight:bold>一般</font>";
						   		}
			   				}
						}, {
							text : "用户名称",
							width : 120,
							dataIndex : 'CONS_NAME',
							align : 'center',
							sortable : false
						}, {
							text : "用户编号",
							width : 120,
							dataIndex : 'CONS_NO',
							align : 'center',
							sortable : false
						}, {
							text : "用户类别",
							width : 100,
							dataIndex : 'CONS_TYPE_NAME',
							align : 'center',
							sortable : false
						}, {
							text : "最近告警时间",
							width : 120,
							dataIndex : 'ALARM_DATE',
							align : 'center',
							sortable : false
						}, {
							text : "第一次告警时间",
							width : 120,
							dataIndex : 'FIRST_ALARM_DATE',
							align : 'center',
							sortable : false
						}, {
							text : "告警发生次数",
							width : 120,
							dataIndex : 'ALARM_CNT',
							align : 'center',
							sortable : true
						}, {
							text : "告警来源",
							width : 120,
							dataIndex : 'ALARM_SRC',
							align : 'center',
							sortable : false
						}, {
							text : "最近恢复时间",
							width : 120,
							dataIndex : 'RESUME_DATE',
							align : 'center',
							sortable : false
						}, {
							text : "第一次恢复时间",
							width : 120,
							dataIndex : 'FIRST_RESUME_DATE',
							align : 'center',
							sortable : false
						}, {
							text : "恢复天数",
							width : 90,
							dataIndex : 'RESUME_DAY_CNT',
							align : 'center',
							sortable : false
						}, {
							text : "终端地址",
							width : 120,
							dataIndex : 'TERMINAL_ADDR',
							align : 'center',
							sortable : false
						}, {
							text : "表计资产号",
							width : 120,
							dataIndex : 'ASSET_NO',
							align : 'center',
							sortable : false
						}],
				  dockedItems: [{
				        xtype: 'pagingtoolbar',
				        store: msExceAnalStore,   
				        dock: 'bottom',
				        displayInfo: true
				    }]		
			});
	margins = '3 20 3 20';
	/*var exceptionInfoLabel = Ext.create('Ext.form.Label',{
				
				});
	var abnormalInfoFormpanel2=Ext.create('Ext.panel.Panel',{
		title : '异常信息统计',
				width : 300,
				autoScroll : true,
				region : 'east',
				layout:'fit',
				items:[exceptionInfoLabel]
		
	})*/
	Ext.define('EventCount',{
		extend : 'Ext.data.Model',
		fields : [ "EVENT_NAME",
			       "ALARM_CODE",
			       "CNT"
			      ]
	});
	
	var eventCountStore =   Ext.create('Ext.data.Store', {
		model : 'EventCount',
		remoteSort : true,
		proxy : new Ext.data.MemoryProxy()	
//		,autoLoad : true
	});
	
	var abnormalInfoFormpanel2=Ext.create('Ext.grid.Panel',{
		border : false,
		title : '异常信息统计',
		selModel : totalException,
		loadMask : true,
		region : 'east',
		width : 300,
		border : true,
		viewConfig: {
            trackOver: false
        },
        store:eventCountStore,
		columnLines : false,
		columns : [{
							text : "异常事件",
							width : 150,
							dataIndex : 'EVENT_NAME',
							align : 'center',
							sortable : false
						},{
							text : "数量",
							width : 150,
							dataIndex : 'CNT',
							align : 'center',
							sortable : false,
							renderer : function(s, m, rec) {
								if(rec.get('ALARM_CODE')==''){
									return s;
								}
								else{
									return "<a href='javascript:' onclick='queryExceptInfo(\""
										 + rec.get('ALARM_CODE')
										 + "\");'>"+s+"</a>";
								}
							}
						}]
	});


	var top_panel = Ext.create('Ext.panel.Panel', {
				border : false,
				layout : 'border',
				height : 250,
				region : 'north',
				items : [abnormalInfoGrid, abnormalInfoFormpanel2]
			});
		
		//异常信息list
		var queryItems = {};
//		var exceptions = abnormalInfoGrid.getSelectionModel().getSelection();
//		var terminal_id = exceptions[0].get('TERMINAL_ID');
		
	var abnormalSelectModel = Ext.create('Ext.selection.CheckboxModel');

		var exceptColumns = [{
							text : "工单号",
							width : 120,
							dataIndex : 'APP_NO',
							align : 'center',
							sortable : true
						}, {
							text : "任务类型",
							width : 120,
							dataIndex : 'TMNL_TASK_TYPE_NAME',
							align : 'center',
							sortable : false
						}, {
							text : "是否换表",
							width : 120,
							dataIndex : 'METER_FLAG',
							align : 'center',
							sortable : false
						}, {
							text : "调式状态",
							width : 90,
							dataIndex : 'DEBUG_STATUS_NAME',
							align : 'center',
							sortable : true
						},  {
							text : "调试时间",
							width : 120,
							dataIndex : 'DEBUG_TIME',
							align : 'center',
							sortable : false
						}, {
							text : "流程类型",
							width : 120,
							dataIndex : 'FLOW_FLAG_NAME',
							align : 'center',
							sortable : false
						}, {
							text : "调试次数",
							width : 120,
							dataIndex : 'DEBUG_CNT',
							align : 'center',
							sortable : true
						}];
		
		//异常信息
		var abnormalEleChartGrid = Ext.create('Ext.grid.Panel', {
				loadMask : true,
				selModel : abnormalSelectModel,
				//region : 'center',
				border : true,
				store : abnormalEleChartStore, 
				verticalScrollerType : 'paginggridscroller',
				invalidateScrollerOnRefresh : false,
				viewConfig : {
					trackOver : false
				},
				columnLines : true,
				columns :  exceptColumns

			});

	//异常信息
	var abnormalEleChartPanel = Ext.create('Ext.panel.Panel', {
		        id:'abnormalEleChartPanel',
				title : '异常信息',
				layout:'fit',
				border : false,
				monitorResize : true,
				autoScroll : true,
				//tbar : [{xtype: 'tbfill'},'-',appointDate],
				items : [abnormalEleChartGrid]
			});
		
	Ext.define('EleMeterEvent',{
		extend : 'Ext.data.Model',
		fields : [  "ALARM_ID",
			        "ALARM_TYPE_CODE",
			        "METER_ID",
			        "EVENT_NO",
			        "EVENT_NAME",
			        "ID",
			        "EVENT_TYPE_CODE",
			        "TERMINAL_ID",
			        "EVENT_TIME",
			        "REC_TIME"
			      ]
	});
	
	var eleMeterEventStore =   Ext.create('Ext.data.Store', {
		model : 'EleMeterEvent',
		remoteSort : true,
		//pageSize: DEFAULT_PAGE_SIZE,
		buffered: true,
		proxy : {
			type : 'ajax',
			url : 'measureExceptionAnalAction!queryMeterEvent.action',
			reader : {
				type : 'json',
				root : 'resultList'
			}
		}	
	});
	
	var fileInfoPanel = Ext.create('Ext.form.Panel', {
				// title : '档案',
				layout : 'column',
				border : false,
				bodyStyle : 'padding:5px 0px 10px 5px',
				items : [{
							columnWidth : .33,
							xtype : 'form',
							border : false,
//							labelAlign : "right",
//							labelWidth : 40,
							items : [{
										xtype : 'label',
										html : "<font size=2px;font-weight:bold>用户信息</font>",
										margin : '5 20 20 100'
									}, {
										xtype : 'textfield',
										id : 'eleAbnormalConsNo-1',
										fieldLabel : '用户编号',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 70,
										readOnly : true

									}, {
										xtype : 'textfield',
										id : 'eleAbnormalConsName-1',
										fieldLabel : '用户名称',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 70,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'eleAbnormalVolt-1',
										fieldLabel : '供电电压',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 70,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'eleAbnormalElecAddr-1',
										fieldLabel : '用电地址',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 70,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'eleAbnormalRuncap-1',
										fieldLabel : '运行容量',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 70,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'eleAbnormalTrade-1',
										fieldLabel : '行业分类',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 70,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'eleAbnormalEleType-1',
										fieldLabel : '用电类别',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 70,
										readOnly : true
									}]

						}, {
							columnWidth : .33,
							xtype : 'form',
							border : false,
							items : [{
										xtype : 'label',
										html : "<font size=2px;font-weight:bold>终端信息</font>",
										margin : '5 20 20 110'
									}, {
										xtype : 'textfield',
										id : 'eleAbnormalTerAddr-1',
										fieldLabel : '终端地址',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 80,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'eleAbnormalTerAssetNo-1',
										fieldLabel : '终端资产号',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 80,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'eleAbnormalTerStatus-1',
										fieldLabel : '终端状态',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 80,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'eleAbnormalTerProlCode-1',
										fieldLabel : '终端规约',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 80,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'eleAbnormalTerType-1',
										fieldLabel : '终端类别',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 80,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'eleAbnormalTerCollMode-1',
										fieldLabel : '采集方式',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 80,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'eleAbnormalTerFactory-1',
										fieldLabel : '终端厂商',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 80,
										readOnly : true
									}]

						}, {
							columnWidth : .3,
							xtype : 'form',
							border : false,
							items : [{
										xtype : 'label',
										html : "<font size=2px;font-weight:bold>电表信息</font>",
										margin : '5 20 20 105'
									}, {
										xtype : 'textfield',
										id : 'eleAbnormalMeterAssetNo-1',
										fieldLabel : '电能表资产号',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 80,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'eleAbnormalMeterCpt-1',
										fieldLabel : '综合倍率',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 80,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'eleAbnormalMeterProl-1',
										fieldLabel : '通讯规约',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 80,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'eleAbnormalMeterMp-1',
										fieldLabel : '计量点性质',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 80,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'eleAbnormalMeterEffect-1',
										fieldLabel : '主用途类型',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 80,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'eleAbnormalMeterVolt-1',
										fieldLabel : '电压等级',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 80,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'eleAbnormalMeterMeaMode-1',
										labelAlign:'right', 
										labelSeparator:'',
										fieldLabel : '计量方式',
										width:195,
										labelWidth : 80,
										readOnly : true
									}]

						}]
			});
	var abnormalEleFilePanel = Ext.create('Ext.panel.Panel', {
				title : '档案信息',
				border : true,
				layout : 'fit',
				monitorResize : true,
				autoScroll : true,
				items : [fileInfoPanel]
			});
//------------异常历史信息------------------
	var hisSelectModel = Ext.create('Ext.selection.CheckboxModel');
	Ext.define('hisInfoModel', {
				extend : 'Ext.data.Model',
				fields : ["CONS_NO","ALARM_ID","ALARM_CODE", "EVENT_NAME", "EVENT_LEVEL","FIRST_ALARM_DATE", "ALARM_DATE",
						"ALARM_CNT", "FIRST_RESUME_DATE", "RESUME_DATE",
						"RESUME_DAY_CNT","ALARM_SRC","METER_ASSET_NO"]
			});
	var abnormalEleHisStore = Ext.create('Ext.data.Store', {
				model : 'hisInfoModel',
				remoteSort : true,
				pageSize : DEFAULT_PAGE_SIZE,
				proxy : {
					type : 'ajax',
					url : 'eleAbnormalAnalyAction!queryAlarmAnalyseHisInfo.action',
					reader : {
						type : 'json',
						root : 'eleHisInfoList',
						totalProperty : 'totalCount'
					}
				}
			});
			
	var abnormalInfoHisGrid = Ext.create('Ext.grid.Panel', {
				loadMask : true,
				selModel : hisSelectModel,
				region : 'center',
				border : true,
				store : abnormalEleHisStore,
				tbar : [{
						xtype : 'label',
						html : "<font font-weight:bold;>查询日期内历史信息</font>"
					},
					'->',
					{
							xtype : 'datefield',
							fieldLabel : '查询开始日期',							
							id : 'eleHisQuerySdate1',
						//	value : new Date().add(Date.MONTH,-3),
							value : new Date(),
							format : 'Y-m-d'
						},
					{
							xtype : 'datefield',
							fieldLabel : '结束日期',							
							id : 'eleHisQueryEdate1',
							value : new Date(),
							format : 'Y-m-d'
						}
						
					],
				verticalScrollerType : 'paginggridscroller',
				invalidateScrollerOnRefresh : false,
				viewConfig : {
					trackOver : false
				},
				columnLines : true,
				columns : [{
							text : "用户编码",
							width : 120,
							dataIndex : 'CONS_NO',
							align : 'center',
							sortable : true
						}, {
							text : "告警编码",
							width : 120,
							dataIndex : 'ALARM_CODE',
							align : 'center',
							sortable : false
						}, {
							text : "事件名称",
							width : 120,
							dataIndex : 'EVENT_NAME',
							align : 'center',
							sortable : false
						}, {
							text : "事件等级",
							width : 90,
							dataIndex : 'EVENT_LEVEL',
							align : 'center',
							sortable : true
						},  {
							text : "最近告警时间",
							width : 120,
							dataIndex : 'ALARM_DATE',
							align : 'center',
							sortable : false
						}, {
							text : "第一次告警时间",
							width : 120,
							dataIndex : 'FIRST_ALARM_DATE',
							align : 'center',
							sortable : false
						}, {
							text : "告警发生次数",
							width : 120,
							dataIndex : 'ALARM_CNT',
							align : 'center',
							sortable : true
						}, {
							text : "告警来源",
							width : 120,
							dataIndex : 'ALARM_SRC',
							align : 'center',
							sortable : false
						}, {
							text : "最近恢复时间",
							width : 120,
							dataIndex : 'RESUME_DATE',
							align : 'center',
							sortable : false
						}, {
							text : "第一次恢复时间",
							width : 120,
							dataIndex : 'FIRST_RESUME_DATE',
							align : 'center',
							sortable : false
						}, {
							text : "恢复天数",
							width : 90,
							dataIndex : 'RESUME_DAY_CNT',
							align : 'center',
							sortable : false
						}, {
							text : "电能表资产号",
							width : 120,
							dataIndex : 'METER_ASSET_NO',
							align : 'center',
							sortable : false
						}]

			});

	var abnormalEleHistoryPanel = Ext.create('Ext.panel.Panel', {
				title : '异常历史信息',
				border : true,
				layout : 'fit',
				monitorResize : true,
				autoScroll : true,
				items : [abnormalInfoHisGrid]
			});
			
	var abnormalRelaInfoTabpanel = Ext.createWidget('tabpanel', {
				border : false,
				region : 'center',
				activeTab : 0,
				defaults : {
					bodyPandding : 10
				},
				items : [abnormalEleChartPanel,
						abnormalEleFilePanel,
						abnormalEleHistoryPanel]
			})

	// ------------右下角查询条件panel------------------
/*	Ext.define('orgSt', {
				extend : 'Ext.data.Model',
				fields : [{
							name : 'ORG_NO',
							type : 'string'
						}, {
							name : 'ORG_NAME',
							type : 'string'
						}, {
							name : 'ORG_TYPE',
							type : 'string'
						}]
			});
	var orgStore = Ext.create('Ext.data.Store', {
		model : 'orgSt',
		proxy : {
			type : 'ajax',
			url : 'eleAbnormalAnalyAction!queryOrgNolist.action',
			reader : {
				root : 'orgList',
				type : 'json'
			}
		}
			 ,autoLoad: true
	});
	var LOGGEDORGNO='15101';
	orgStore.load({
				params : {
					orgNo :'15101' 
					//LOGGEDORGNO
				},
				callback: function(records, operation, success) {
					Ext.getCmp('eleAbnolOrgValue1').setValue(LOGGEDORGNO);
				}
			});*/
	
		// ------------右下角查询条件panel------------------
	Ext.define('orgSt', {
				extend : 'Ext.data.Model',
				fields : [{
							name : 'ORG_NO',
							type : 'string'
						}, {
							name : 'ORG_NAME',
							type : 'string'
						}, {
							name : 'ORG_TYPE',
							type : 'string'
						}]
			});
	var orgStore = Ext.create('Ext.data.Store', {
		model : 'orgSt',
		proxy : {
			type : 'ajax',
			url : 'eleAbnormalAnalyAction!queryOrgNolist.action',
			reader : {
				root : 'orgList',
				type : 'json'
			}
		}
			// autoLoad: true
		});
	orgStore.load({
				params : {
					orgNo : '34101'
				},
				callback: function(records, operation, success) {
					Ext.getCmp('eleAbnolOrgValue').setValue("34404");
				}
			});
			
	Ext.define('eventSt', {
				extend : 'Ext.data.Model',
				fields : [{
							name : 'EVENT_LEVEL',
							type : 'string'
						}, {
							name : 'EVENT_LEVEL_NAME',
							type : 'string'
						}]
			});
	var eventLevelStore = Ext.create('Ext.data.Store', {
				model : 'eventSt',
				proxy : {
					type : 'ajax',
					url : 'eleAbnormalAnalyAction!queryEventLevelList.action',
					reader : {
						root : 'eventList',
						type : 'json'
					}
				},
				autoLoad : true
			})
	eventLevelStore.load({
				callback: function(records, operation, success) {
					Ext.getCmp('eleAbnolEventValue1').setValue('01');
				}
			});
			
	Ext.define('flowStatusCodeModel', {
				extend : 'Ext.data.Model',
				fields : [{
							name : 'flowStatusCodeValue',
							type : 'string'
						}, {
							name : 'flowStatusCodeName',
							type : 'string'
						}]
			});		
			
	var flowStatusCodeStore = Ext.create('Ext.data.Store', {
		    model: 'flowStatusCodeModel',
		    data : [
		        {flowStatusCodeValue: '0', flowStatusCodeName: '持续关注'},
		        {flowStatusCodeValue: '1', flowStatusCodeName: '新异常'}
		    ],
		    autoLoad : true
	});
	
	var queryContionParam = Ext.create('Ext.form.Panel', {
				border : true,
				title : '查询条件',
				region : 'east',
				bodyStyle : 'padding:10px 0px 10px 10px',
				width : 300,
				items : [{
							xtype : 'combo',
							fieldLabel : '供电单位',
							name : 'eleAbnolOrgValue',
							id : 'eleAbnolOrgValue1',
							queryMode: 'local',
							store : orgStore,
							labelAlign:'right', 
							labelSeparator:'',
							labelWidth:70,
							displayField : 'ORG_NAME',
							valueField : 'ORG_NO',
							emptyText : '----请输入----',
							blankText : '----请输入----',
							margin : '10 20 10 10'
						}, {
							xtype : 'combo',
							fieldLabel : '事件等级',
							name : 'eleAbnolEventValue',
							id : 'eleAbnolEventValue1',
							queryMode: 'local',
							store : eventLevelStore,
							labelAlign:'right', 
							labelSeparator:'',
							labelWidth:70,
							displayField : 'EVENT_LEVEL_NAME',
							valueField : 'EVENT_LEVEL',
							emptyText : '----请输入----',
							blankText : '----请输入----',
							margin : '10 20 10 10'
						}, {
							xtype : 'combo',
							fieldLabel : '事件状态',
							name : 'flowStatusCode',
							id : 'flowStatusCode1',
							store : flowStatusCodeStore,
							queryMode: 'local',
							labelAlign:'right', 
							labelSeparator:'',
							labelWidth:70,
							displayField : 'flowStatusCodeName',
							valueField : 'flowStatusCodeValue',
							value:'1',
							margin : '10 20 10 10'
						},{
							xtype : 'datefield',
							fieldLabel : '查询日期',
							name : 'queryDate',
							id : 'eleAbnolQueryDate1',
							labelAlign:'right', 
							labelSeparator:'',
							labelWidth:70,
							value : new Date(),
							format : 'Y-m-d',
							margin : '10 20 10 10',
							hidden:true
						}, {
							xtype : 'textfield',
							fieldLabel : '用户编号',
							name : 'eleAbnolConsNo',
							id : 'eleAbnolConsNo1',
							labelAlign:'right', 
							labelSeparator:'',
							labelWidth:70,
							emptyText : '----请输入----',
							blankText : '----请输入----',
							margin : '10 20 10 10'

						}, {
							xtype : 'textfield',
							fieldLabel : '终端地址',
							name : 'eleAbnolTerminalAddr',
							id : 'eleAbnolTerminalAddr1',
							labelAlign:'right', 
							labelSeparator:'',
							labelWidth:70,
							emptyText : '----请输入----',
							blankText : '----请输入----',
							margin : '10 20 10 10'
						}, {
							xtype : 'button',
							text : '查询',
							width: 80,
							align : 'center',
							margin : '10 20 10 155',
							handler : function() {
								queryEleAbnormalInfoFun();
							}
						}]

			});
	var bottom_panel = Ext.create('Ext.panel.Panel', {
				border : false,
				layout : 'border',
				region : 'center',
				items : [abnormalRelaInfoTabpanel, queryContionParam]
			});

	var totalPanel = Ext.create('Ext.panel.Panel', {
				layout : 'border',
				border : false,
				items : [top_panel, bottom_panel]

			});
	// -----------function--------------
	function queryEleAbnormalInfoFun() {
		var orgNo = Ext.getCmp("eleAbnolOrgValue1").getValue();
		var eventLevel = Ext.getCmp("eleAbnolEventValue1").getValue();
		var queryDate = Ext.getCmp("eleAbnolQueryDate1").getRawValue();
		var consNo = Ext.getCmp("eleAbnolConsNo1").getValue();
		var terminalAddr = Ext.getCmp("eleAbnolTerminalAddr1").getValue();
		var flowStatusCode = Ext.getCmp("flowStatusCode1").getValue();
		gOrgNo = Ext.getCmp("eleAbnolOrgValue1").getValue();
		gEventLevel = Ext.getCmp("eleAbnolEventValue1").getValue();
		gQueryDate = Ext.getCmp("eleAbnolQueryDate1").getRawValue();
		gConsNo = Ext.getCmp("eleAbnolConsNo1").getValue();
		gTerminalAddr = Ext.getCmp("eleAbnolTerminalAddr1").getValue();
		gFlowStatusCode=Ext.getCmp("flowStatusCode1").getValue();
		if (Ext.isEmpty(orgNo)) {
			Ext.Msg.alert("提示", "请选择供电单位！");
			return;
		}
		if (Ext.isEmpty(eventLevel)) {
			Ext.Msg.alert("提示", "事件等级！");
			return;
		}
		eventCountStore.removeAll();
		var queryItems = {};
		Ext.Ajax.request({
			 	    url : 'taskFlowAction!queryEleAbnormalTotalList.action',					
					params : {
						'queryItems.alarmType': '01',
//						'queryItems.orgNo' : LOGGEDORGNO,
						//'queryItems.orgNo' : '34401',
						'queryItems.orgNo' : orgNo,
						'queryItems.eventLevel' : eventLevel,
						'queryItems.queryDate' : queryDate,
						'queryItems.consNo' : consNo,
						'queryItems.terminalAddr' : terminalAddr,
						'queryItems.flowStatusCode':flowStatusCode
					},
				success : function(response) {
					var result = Ext.decode(response.responseText);
					var staTotalList = result.eleStattisTotalList;
					if(!Ext.isEmpty(staTotalList)){
						eventCountStore.loadData(staTotalList);
					}
					/*var exceptionInfo ="";
					var count = 0;
					for(var i=0;i<staTotalList.length;i++){
						exceptionInfo+='<div style="float:left" align = "center" width="50px">'+staTotalList[i]['EVENT_NAME']+'</div>'
									 +"<div style='float:left' align = 'center' width='30px'><a href='javascript:' onclick='queryExceptInfo(\""
									 + staTotalList[i]['ALARM_CODE']
									 + "\");'>"+staTotalList[i]['CNT']+'</a></div>'
									 +'<div align = "center" width="10px">件</div>';
						count+=staTotalList[i]['CNT'];
					}
					exceptionInfo+='<div style="float:left" align = "center" width="50">合计</div>'
										 +'<div style="float:left" align = "center" width="30">'+count+'</a></div>'
										 +'<div align = "center" width="10">件</div>';
					exceptionInfoLabel.setText(exceptionInfo,false);*/
				},
				failure : function(response) {
					Ext.Msg.alert('提示', '查询异常统计信息失败');
				}

			});
			msExceAnalStore.removeAll();
			abnormalEleChartStore.removeAll();
	//	queryExceptInfo('');
	}

	renderModel(totalPanel, "采集装置异常分析");
	
	queryExceptInfo = function (alarmCode){
		var data = abnormalInfoFormpanel2.getSelectionModel().getSelection();
		var exceptCode = data[0].get('EXCEPT_CODE');
		    //msExceAnalStore.removeAll();
			msExceAnalStore.proxy.extraParams={
//				'queryItems.orgNo' : gOrgNo,
				'queryItems.orgNo' : '34401',
				'queryItems.eventLevel' : gEventLevel,
				'queryItems.queryDate' : gQueryDate,
				'queryItems.consNo' : gConsNo,
				'queryItems.terminalAddr' : gTerminalAddr,
				'queryItems.exceptCode' : exceptCode,
				'queryItems.alarmType': '01',
				'queryItems.alarmCode': alarmCode,
				'queryItems.flowStatusCode':gFlowStatusCode
			};
			
			msExceAnalStore.currentPage=1;
			msExceAnalStore.load({
			    	start:0
			});
			//msExceAnalStore.guaranteeRange(0, DEFAULT_PAGE_SIZE-1);	
	}
	
	queryAlarmEventDetailInfo = function (id){
				
		Ext.define('EleMeterEventDetail',{
			extend : 'Ext.data.Model',
			fields : [  "ITEM_NO",
				        "EVENT_DATA"
				      ]
		});
		
		var eleMeterEventDetailStore =   Ext.create('Ext.data.Store', {
			model : 'EleMeterEventDetail',
			remoteSort : true,
			//pageSize: DEFAULT_PAGE_SIZE,
			buffered: true,
			proxy : {
				type : 'ajax',
				url : 'measureExceptionAnalAction!queryMeterEventDetail.action',
				reader : {
					type : 'json',
					root : 'resultList'
				}
			}	
		});
		
		var eleMeterEventGridPanel = Ext.create('Ext.grid.Panel', {
					loadMask : true,
					border : false,
					store:eleMeterEventDetailStore,
					viewConfig: {
			            trackOver: false
			        },
					columnLines : true,
					columns : [{
								text : "序号",
								width : 120,
								dataIndex : 'ITEM_NO',
								align : 'center',
								sortable : true
							}, {
								text : "事件对应数据",
								width : 120,
								dataIndex : 'EVENT_DATA',
								align : 'center',
								sortable : false
							}]
			});
			
			eleMeterEventDetailStore.proxy.extraParams={
				'queryItems.id' : id
			};
			eleMeterEventDetailStore.load();
			
			Ext.create('Ext.window.Window', {
			       modal:true,
			       height:110,
			       width:340,
				   resizable:false,
			       title:'电能表事件明细',
			       layout:'fit',
			       items:[eleMeterEventGridPanel]
			}).show();
	}
	
	//---------查询用户档案信息--------------
	function queryFileInfoFun(record) {
		fileInfoPanel.getForm().reset();
		var queryFileItems = {};
		var orgNo = record.get('ORG_NO');
		var consNo = record.get('CONS_NO');
		var termimalAddr = record.get('TERMINAL_ADDR');
		var meterId = record.get('METER_ID');

		Ext.Ajax.request({
					url : 'eleAbnormalAnalyAction!queryFileTotalList.action',
					params : {
						'queryFileItems.orgNo' : orgNo,
						'queryFileItems.consNo' : consNo,
						'queryFileItems.termimalAddr' : termimalAddr,
						'queryFileItems.meterId' : meterId
					},
					success : function(response) {
						var result = Ext.decode(response.responseText);
						var staTotalList = result.eleFileTotalList;
						if(staTotalList.length>0)
						{
							setFileFormValue(staTotalList);
						}
					}
				});
	};
	
	function setFileFormValue(staTotalList) {
		// ---用户的--
		Ext.getCmp("eleAbnormalConsNo-1").setValue(staTotalList[0].CONS_NO);
		Ext.getCmp("eleAbnormalConsName-1").setValue(staTotalList[0].CONS_NAME);
		Ext.getCmp("eleAbnormalVolt-1").setValue(staTotalList[0].VOLT);
		Ext.getCmp("eleAbnormalElecAddr-1").setValue(staTotalList[0].ELEC_ADDR);
		Ext.getCmp("eleAbnormalRuncap-1").setValue(staTotalList[0].RUN_CAP);
		Ext.getCmp("eleAbnormalTrade-1").setValue(staTotalList[0].TRADE_NAME);
		Ext.getCmp("eleAbnormalEleType-1").setValue(staTotalList[0].ELEC_TYPE);
		// ----终端的----
		Ext.getCmp("eleAbnormalTerAddr-1")
				.setValue(staTotalList[0].TERMINAL_ADDR);
		Ext.getCmp("eleAbnormalTerAssetNo-1")
				.setValue(staTotalList[0].TMNL_ASSET_NO);
		Ext.getCmp("eleAbnormalTerStatus-1")
				.setValue(staTotalList[0].STATUS_NAME);
		Ext.getCmp("eleAbnormalTerProlCode-1")
				.setValue(staTotalList[0].PROTOCOL_NAME);
		Ext.getCmp("eleAbnormalTerType-1").setValue(staTotalList[0].TMNL_TYPE);
		Ext.getCmp("eleAbnormalTerCollMode-1")
				.setValue(staTotalList[0].COLL_MODE_NAME);
		Ext.getCmp("eleAbnormalTerFactory-1")
				.setValue(staTotalList[0].FACTORY_NAME);
		// -----电表的----

		Ext.getCmp("eleAbnormalMeterAssetNo-1")
				.setValue(staTotalList[0].ASSET_NO);
		Ext.getCmp("eleAbnormalMeterCpt-1").setValue(staTotalList[0].T_FACTOR);
		Ext.getCmp("eleAbnormalMeterProl-1").setValue(staTotalList[0].COMM_MODE);
		Ext.getCmp("eleAbnormalMeterMp-1").setValue(staTotalList[0].MP_ATTR_NAME);
		Ext.getCmp("eleAbnormalMeterEffect-1")
				.setValue(staTotalList[0].USAGE_TYPE_NAME);
		Ext.getCmp("eleAbnormalMeterVolt-1").setValue(staTotalList[0].VOLT_CODE);
		Ext.getCmp("eleAbnormalMeterMeaMode-1")
				.setValue(staTotalList[0].MEAS_MODE);

	}
	
	//-------查询异常历史信息-------------------
	function queryExceptHisInfo(record){
		var consNo = record.get('CONS_NO');
		var alarmCode = record.get('ALARM_CODE');		
		var queryItems={};
		abnormalEleHisStore.load({
			params:{
			'queryItems.alarmType' : '01',
			'queryItems.consNo' : consNo,
			'queryItems.querySdate' :Ext.getCmp("eleHisQuerySdate1").getRawValue(),
			'queryItems.queryEdate' :Ext.getCmp("eleHisQueryEdate1").getRawValue(),
			'queryItems.alarmCode' : alarmCode
			}
		}) ;
		abnormalEleHisStore.guaranteeRange(0, DEFAULT_PAGE_SIZE - 1);
	}
})