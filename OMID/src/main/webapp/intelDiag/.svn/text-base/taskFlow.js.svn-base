
Ext.Loader.setConfig({
    enabled: true,
    paths: {
        TaskFlow: "./intelDiag/TaskFlow"
    }
});

Ext.require("TaskFlow.abnormalEleChartGrid");
Ext.require("TaskFlow.tmnlCopyFailureGrid");
Ext.require("TaskFlow.tmnlCheckClockGrid");
Ext.require("TaskFlow.tmnlParamGrid");
Ext.require("TaskFlow.tmnlMsgLogGrid");
//Ext.require("TaskFlow.tmnlStopGrid");
Ext.require("TaskFlow.mpCurveGrid");
Ext.require("TaskFlow.tmnlChangDataGrid");

Ext.onReady(function() {
	

	var gOrgNo; 
	var gEventLevel;
	var gQueryDate;
	var gConsNo;
	var gTerminalAddr;
	var gTerminalType;
	var gFlowStatusCode;
	var	sConsNo;
	var sExceptCode;
	var	sAlarmType;
 
	var selectModel_exception = Ext.create('Ext.selection.CheckboxModel',{
	    	//injectCheckbox:false, 
			mode : 'SINGLE',
			listeners : {
				    select : function(t,record,index,e) {
				    	var data1 = abnormalInfoFormpanel2.getSelectionModel().getSelection();
						var exceptCode = data1[0].get('EXCEPT_CODE');
						sConsNo = record.get('CONS_NO');
						sExceptCode = data1[0].get('EXCEPT_CODE');
						sAlarmType = record.get('ALARM_TYPE');
						queryFileInfoFun(record);
						queryExceptHisInfo(sConsNo,sExceptCode,sAlarmType);
				    	if (exceptCode == '00127' || exceptCode == '0012A') {//exceptCode == '00127' or exceptCode == '0012A'
				    		add(Ext.create("TaskFlow.abnormalEleChartGrid"),record);
				    	}
				    	else if (exceptCode == '00122'){//exceptCode == '00122'
				    		add(Ext.create("TaskFlow.tmnlCopyFailureGrid"),record);
				    	}
				    	else if (exceptCode == '00124'){//exceptCode == '00124'
				    		add(Ext.create("TaskFlow.tmnlCheckClockGrid"),record);
				    	}
				    	else if (exceptCode == '00121'){//exceptCode == '00121'
				    		add(Ext.create("TaskFlow.mpCurveGrid"),record);
				    	}
				    	else if (exceptCode == '0012E'){//exceptCode == '0012E'
				    		add(Ext.create("TaskFlow.tmnlChangDataGrid"),record);
				    	}
				    	else if (exceptCode == '0012D'){
				    		add(Ext.create("TaskFlow.tmnlParamGrid"),record);
				    	}
				    	else if (exceptCode == '00123'){
				    		add(Ext.create("TaskFlow.tmnlMsgLogGrid"),record);
				    	}
				    	else if (exceptCode == '00129'){
				    		tmnlStop(record);
				    	}
		      		}
			}
	});
	
	 function add (abnormalGrid,record) {
            task_abnormalEleChartPanel.removeAll(true);
            task_abnormalEleChartPanel.add(abnormalGrid);
            task_abnormalEleChartPanel.doLayout(); 
            abnormalGrid.query(record)
        }
        //终端停运但上报负荷
     function tmnlStop(record){
     	Ext.getCmp('task_abnormalEleChartPanelId').removeAll();
     	Ext.define('tmnlStopModel', {
						extend : 'Ext.data.Model',
						fields : ["DATA_TIME", "P"]
					});
			var tmnlStopStore = Ext.create('Ext.data.Store', {
						model : 'tmnlStopModel',
						remoteSort : true,
						proxy : new Ext.data.MemoryProxy()
					});

			var tmnlStopGridPanel = Ext.create('Ext.grid.Panel', {
						height : 300,
						width : Ext.getCmp('task_abnormalEleChartPanelId')
								.getWidth(),
						loadMask : true,
						border : false,
						store : tmnlStopStore,
						viewConfig : {
							trackOver : false
						},
						columnLines : true,
						columns : [{
									text : "时间",
									width : 120,
									dataIndex : 'DATA_TIME',
									align : 'center',
									sortable : true
								}, {
									text : "功率",
									width : 120,
									dataIndex : 'P',
									align : 'center',
									sortable : false
								}]

					});
			tmnlStopStore.removeAll();
			Ext.getCmp('task_abnormalEleChartPanelId').getEl().mask('正在查询...');
			Ext.Ajax.request({
				url : 'taskFlowAction!queryTmnlStop.action',
				params : {
					'queryItems.terminal_addr' : record.data["TERMINAL_ADDR"],
					'queryItems.alarmDate' : record.data["ALARM_DATE"]
				},
				success : function(response) {
					var result = Ext.decode(response.responseText);
					var tmnlStopList = result.tmnlStopList;
					if (!Ext.isEmpty(tmnlStopList)) {
						tmnlStopStore.loadData(tmnlStopList);
						var task_abnormalEleChartFitPowerPanelId = Ext.create(
								'Ext.panel.Panel', {
									id : 'task_abnormalEleChartFitPowerPanelId',
									border : false,
									height : 300,
									width : Ext
											.getCmp('task_abnormalEleChartPanelId')
											.getWidth(),
									renderTo : Ext.getBody()
								});
						var xmlData2 = "<graph caption='功率曲线图' xAxisName='' yAxisName='功率' labelDisplay = 'WRAP' anchorRadius='3' decimalPrecision='0' formatNumberScale='0' bgcolor='F3f3f3' bgAlpha='70' numvdivlines='5' showValues='0' divLineColor='CC3300' divLineIsDashed='1' chartRightMargin='50' labelStep='8'>";
						xmlData2 += "<categories>";
						for (var i = 0; i < tmnlStopList.length; i++) {
							xmlData2 += "<category name='"
									+ tmnlStopList[i]['DATA_TIME'].substring(10,
											16) + "'  />";
						}
						xmlData2 += "</categories>";
						xmlData2 += "<dataset seriesName='功率' color='#E7ED1A' anchorBorderColor='#E7ED1A' anchorBgColor='#E7ED1A'>";

						var temp = tmnlStopList[0]['P'];
						if (Ext.isEmpty(temp)) {
							temp = 0;
						}
						xmlData2 += "<set value='" + temp + "' />";
						for (var i = 1; i < tmnlStopList.length; i++) {
							if (Ext.isEmpty(tmnlStopList[i]['P'])) {
								xmlData2 += "<set value='" + temp + "' />";
							} else {
								xmlData2 += "<set value='"
										+ tmnlStopList[i]['P']
										+ "' />";
								temp = tmnlStopList[i]['P'];
							}
						}
						xmlData2 += "</dataset>";
//						xmlData2 += "<dataset seriesName='正向无功功率' color='#3BC71A' anchorBorderColor='#3BC71A' anchorBgColor='#3BC71A'>";
//						var temp = tmnlStopList[0]['REVERSEPOWER'];
//						if (Ext.isEmpty(temp)) {
//							temp = 0;
//						}
//						xmlData2 += "<set value='" + temp + "' />";
//						for (var i = 1; i < tmnlStopList.length; i++) {
//							if (Ext.isEmpty(tmnlStopList[i]['REVERSEPOWER'])) {
//								xmlData2 += "<set value='" + temp + "' />";
//							} else {
//								xmlData2 += "<set value='"
//										+ tmnlStopList[i]['REVERSEPOWER']
//										+ "' />";
//								temp = tmnlStopList[i]['REVERSEPOWER'];
//							}
//						}
//						xmlData2 += "</dataset>";
						xmlData2 += " <trendLines> <line startValue='"
							//	+ runCap
								+ "' color='FF0000' displayvalue='运行容量' />  </trendLines>";

						xmlData2 += "</graph>";

						var picCharts2 = new FusionCharts(
								"./FusionCharts-new/MSLine.swf",
								"task_eleAbnormalPicPowerCharts", Ext
										.getCmp('task_abnormalEleChartPanelId')
										.getWidth(), 300);
						picCharts2.setDataXML(xmlData2);
						picCharts2.render("task_abnormalEleChartFitPowerPanelId");
						Ext.getCmp('task_abnormalEleChartPanelId')
								.add(task_abnormalEleChartFitPowerPanelId);

					}

					Ext.getCmp('task_abnormalEleChartPanelId').add(tmnlStopGridPanel);
					Ext.getCmp('task_abnormalEleChartPanelId').doLayout();
					Ext.getCmp('task_abnormalEleChartPanelId').getEl().unmask();
				},
				failure : function(response) {
					Ext.Msg.alert('提示', '查询功率曲线信息失败');
					Ext.getCmp('task_abnormalEleChartPanelId').getEl().unmask();
				}

			});
     
     }//function tmnlStop
	
		var totalException = Ext.create('Ext.selection.CheckboxModel',{
	    	injectCheckbox:false, 
			mode : 'SINGLE',
			listeners : {
				    select : 
				    		function(t,rec,index,e) {
								task_queryExceptInfo('');
								//abnormalEleChartStore.removeAll();
		      			
		      		}
			}
	});
	
	Ext.define('TaskEvent',{
		extend : 'Ext.data.Model',
		fields : [ 
				   "ALARM_ID",
				   "ALARM_CODE",
				   "ALARM_TYPE",
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
			       "SAVE_EXCEPT_DATE",
			       "AREA_CODE"
			      ]
	});
	
	var task_msExceAnalStore =   Ext.create('Ext.data.Store', {
		model : 'TaskEvent',
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
				id : 'abnormalGridId',
				title : '采集装置异常事件明细',
				loadMask : true,
				selModel : selectModel_exception,
				region : 'center',
				border : true,
//				tbar:[{xtype: 'tbfill'},'-',appointDate],
				store:task_msExceAnalStore,
//				verticalScrollerType: 'paginggridscroller',
//				invalidateScrollerOnRefresh: false,
				viewConfig: {
		            trackOver: false
//		            forceFit : false,
//					getRowClass : function(record, rowIndex, rowParams, store) {
//						if (record.get('ALARM_DATE') == Ext.Date.format(Ext.Date.add(
//										new Date(), Ext.Date.DAY, -1), 'Y-m-d')) {
//							return 'x-grid-record-red';
//						} else {
//							return 'x-grid-record-rblue';
//						}
//
//			}
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
						},{
							text : "AREA_CODE",
							width : 120,
							dataIndex : 'AREA_CODE',
							hidden:true,
							align : 'center',
							sortable : true
						},{
							text : "ALARM_TYPE",
							width : 120,
							dataIndex : 'ALARM_TYPE',
							hidden:true,
							align : 'center',
							sortable : true
						},{
							text : "meter_id",
							width : 120,
							dataIndex : 'METER_ID',
							hidden:true,
							align : 'center',
							sortable : true
						},{
							text : "SAVE_EXCEPT_DATE",
							width : 120,
							dataIndex : 'SAVE_EXCEPT_DATE',
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
						}],
				  dockedItems: [{
				        xtype: 'pagingtoolbar',
				        store: task_msExceAnalStore,   
				        dock: 'bottom',
				        displayInfo: true
				    }]		
			});
	//margins = '3 20 3 20';
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
	Ext.define('TaskEventCount',{
		extend : 'Ext.data.Model',
		fields : [ "EVENT_NAME",
			       "ALARM_CODE",
			       "CNT"
			      ]
	});
	
	var eventCountStore =   Ext.create('Ext.data.Store', {
		model : 'TaskEventCount',
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
							width : 120,
							dataIndex : 'EVENT_NAME',
							align : 'center',
							sortable : false
						},{
							text : "数量",
							width : 120,
							dataIndex : 'CNT',
							align : 'center',
							sortable : false
//							renderer : function(s, m, rec) {
//								if(rec.get('ALARM_CODE')==''){
//									return s;
//								}
//								else{
//									return "<a href='javascript:' onclick='queryExceptInfo(\""
//										 + rec.get('ALARM_CODE')
//										 + "\");'>"+s+"</a>";
//								}
//							}
						}]
	});


	var top_panel = Ext.create('Ext.panel.Panel', {
				border : false,
				layout : 'border',
				height : 250,
				split: true,
				region : 'north',
				animCollapse : true,
				collapsible : true,
				items : [abnormalInfoGrid, abnormalInfoFormpanel2]
			});
		
	//异常信息
	var task_abnormalEleChartPanel = Ext.create('Ext.panel.Panel', {
		        id:'task_abnormalEleChartPanelId',
				title : '异常信息',
				width:  200,
//				layout:'fit',
				border : false,
				loadMask :true,
				monitorResize : true,
				autoScroll : true,
				items : []
			});
			
			
	
	Ext.define('TaskMeterEvent',{
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
										id : 'task_eleAbnormalConsNo',
										fieldLabel : '用户编号',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 70,
										readOnly : true

									}, {
										xtype : 'textfield',
										id : 'task_eleAbnormalConsName',
										fieldLabel : '用户名称',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 70,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'task_eleAbnormalVolt',
										fieldLabel : '供电电压',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 70,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'task_eleAbnormalElecAddr',
										fieldLabel : '用电地址',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 70,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'task_eleAbnormalRuncap',
										fieldLabel : '运行容量',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 70,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'task_eleAbnormalTrade',
										fieldLabel : '行业分类',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 70,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'task_eleAbnormalEleType',
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
										id : 'task_eleAbnormalTerAddr',
										fieldLabel : '终端地址',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 80,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'task_eleAbnormalTerAssetNo',
										fieldLabel : '终端资产号',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 80,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'task_eleAbnormalTerStatus',
										fieldLabel : '终端状态',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 80,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'task_eleAbnormalTerProlCode',
										fieldLabel : '终端规约',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 80,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'task_eleAbnormalTerType',
										fieldLabel : '终端类别',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 80,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'task_eleAbnormalTerCollMode',
										fieldLabel : '采集方式',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 80,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'task_eleAbnormalTerFactory',
										fieldLabel : '终端厂商',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 80,
										readOnly : true
									}]

						}
//						, {
//							columnWidth : .3,
//							xtype : 'form',
//							border : false,
//							items : [{
//										xtype : 'label',
//										html : "<font size=2px;font-weight:bold>电表信息</font>",
//										margin : '5 20 20 105'
//									}, {
//										xtype : 'textfield',
//										id : 'task_eleAbnormalMeterAssetNo',
//										fieldLabel : '电能表资产号',
//										labelAlign:'right', 
//										labelSeparator:'',
//										width:195,
//										labelWidth : 80,
//										readOnly : true
//									}, {
//										xtype : 'textfield',
//										id : 'task_eleAbnormalMeterCpt',
//										fieldLabel : '综合倍率',
//										labelAlign:'right', 
//										labelSeparator:'',
//										width:195,
//										labelWidth : 80,
//										readOnly : true
//									}, {
//										xtype : 'textfield',
//										id : 'task_eleAbnormalMeterProl',
//										fieldLabel : '通讯规约',
//										labelAlign:'right', 
//										labelSeparator:'',
//										width:195,
//										labelWidth : 80,
//										readOnly : true
//									}, {
//										xtype : 'textfield',
//										id : 'task_eleAbnormalMeterMp',
//										fieldLabel : '计量点性质',
//										labelAlign:'right', 
//										labelSeparator:'',
//										width:195,
//										labelWidth : 80,
//										readOnly : true
//									}, {
//										xtype : 'textfield',
//										id : 'task_eleAbnormalMeterEffect',
//										fieldLabel : '主用途类型',
//										labelAlign:'right', 
//										labelSeparator:'',
//										width:195,
//										labelWidth : 80,
//										readOnly : true
//									}, {
//										xtype : 'textfield',
//										id : 'task_eleAbnormalMeterVolt',
//										fieldLabel : '电压等级',
//										labelAlign:'right', 
//										labelSeparator:'',
//										width:195,
//										labelWidth : 80,
//										readOnly : true
//									}, {
//										xtype : 'textfield',
//										id : 'task_eleAbnormalMeterMeaMode',
//										labelAlign:'right', 
//										labelSeparator:'',
//										fieldLabel : '计量方式',
//										width:195,
//										labelWidth : 80,
//										readOnly : true
//									}]

//						}
	]
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
	var task_hisSelectModel = Ext.create('Ext.selection.CheckboxModel');
	Ext.define('task_hisInfoModel', {
				extend : 'Ext.data.Model',
				fields : ["CONS_NO","TMNL_EXCEPTION_ID","EXCEPT_CODE", "EVENT_NAME", "EVENT_LEVEL_NAME","FIRST_HAPPEN_DATE", 
						"HAPPEN_DATE","ALARM_CNT", "FIRST_RESUME_DATE", "RESUME_DATE","RESUME_DAY_CNT","EXCEPT_SRC_NAME"]
			});
	var abnormalEleHisStore = Ext.create('Ext.data.Store', {
				model : 'task_hisInfoModel',
				remoteSort : true,
				pageSize : DEFAULT_PAGE_SIZE,
				proxy : {
					type : 'ajax',
					url : 'taskFlowAction!queryAlarmAnalyseHisInfo.action',
					reader : {
						type : 'json',
						root : 'eleHisInfoList',
						totalProperty : 'totalCount'
					}
				}
			});
			
	var abnormalInfoHisGrid = Ext.create('Ext.grid.Panel', {
				loadMask : true,
				selModel : task_hisSelectModel,
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
							id : 'task_eleHisQuerySdate1',
						//	value : new Date().add(Date.MONTH,-3),
							value : new Date(),
							format : 'Y-m-d'
						},
					{
							xtype : 'datefield',
							fieldLabel : '结束日期',							
							id : 'task_eleHisQueryEdate1',
							value : new Date(),
							format : 'Y-m-d'
						}, {
							xtype : 'button',
							text : '查询',
							align : 'center',
							width : 80,						
							handler : function() {	
								if(Ext.isEmpty(sConsNo)||Ext.isEmpty(sExceptCode)){
									Ext.Msg.alert("提示","请选择一条记录");
									return;
								}else{
									queryExceptHisInfo(sConsNo,sExceptCode,sAlarmType);
								}
							}
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
							dataIndex : 'EXCEPT_CODE',
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
							dataIndex : 'EVENT_LEVEL_NAME',
							align : 'center',
							sortable : true
						},  {
							text : "最近告警时间",
							width : 120,
							dataIndex : 'HAPPEN_DATE',
							align : 'center',
							sortable : false
						}, {
							text : "第一次告警时间",
							width : 120,
							dataIndex : 'FIRST_HAPPEN_DATE',
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
							dataIndex : 'EXCEPT_SRC_NAME',
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
				items : [
						task_abnormalEleChartPanel,
						abnormalEleFilePanel,
						abnormalEleHistoryPanel]
			})

	
		// ------------右下角查询条件panel------------------
	Ext.define('task_orgSt', {
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
		model : 'task_orgSt',
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
					Ext.getCmp('task_eleAbnolOrgValue1').setValue(LOGGEDORGNO);
				}
			});
			
	Ext.define('task_eventSt', {
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
				model : 'task_eventSt',
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
					Ext.getCmp('task_eleAbnolEventValue1').setValue('01');
				}
			});
			
	Ext.define('task_flowStatusCodeModel', {
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
		    model: 'task_flowStatusCodeModel',
		    data : [
		        {flowStatusCodeValue: '0', flowStatusCodeName: '持续关注'},
		        {flowStatusCodeValue: '1', flowStatusCodeName: '新异常'}
		    ],
		    autoLoad : true
	});
		// tmnlTypeList
	Ext.define('TmnlTypeModel', {
				extend : 'Ext.data.Model',
				fields : [{
							type : 'string',
							name : 'TMNL_TYPE_CODE'
						}, {
							type : 'string',
							name : 'TMNL_TYPE'
						}]
	});
	// 终端类型Store
	 tmnlTypeStore = Ext.create('Ext.data.Store', {
				model : 'TmnlTypeModel',
				proxy : {
					type : 'ajax',
					url : 'taskFlowAction!queryTmnlType.action',
					reader : {
						root : 'tmnlTypeList',
						type : 'json'
					}
				},
				autoLoad : true
	});
	tmnlTypeStore.load({
				callback: function(records, operation, success) {
					Ext.getCmp('task_eleAbnolTerminalType1').setValue('');
				}
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
							id : 'task_eleAbnolOrgValue1',
							queryMode: 'local',
							store : orgStore,
							labelAlign:'right', 
							labelSeparator:'',
							labelWidth:70,
							displayField : 'ORG_NAME',
							valueField : 'ORG_NO',
							//value:'34101',
							emptyText : '----请输入----',
							blankText : '----请输入----',
							margin : '10 20 10 10'
						}, {
							xtype : 'combo',
							fieldLabel : '事件等级',
							name : 'eleAbnolEventValue',
							id : 'task_eleAbnolEventValue1',
							queryMode: 'local',
							store : eventLevelStore,
							labelAlign:'right', 
							labelSeparator:'',
							labelWidth:70,
							displayField : 'EVENT_LEVEL_NAME',
							valueField : 'EVENT_LEVEL',
							value:'03',
							emptyText : '----请输入----',
							blankText : '----请输入----',
							margin : '10 20 10 10'
						}, {
							xtype : 'combo',
							fieldLabel : '事件状态',
							name : 'flowStatusCode',
							id : 'task_flowStatusCode1',
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
							xtype : 'combo',
							fieldLabel : '终端类型',
							name : 'eleAbnolTerminalType',
							id : 'task_eleAbnolTerminalType1',
							queryMode: 'local',
							store : tmnlTypeStore,
							labelAlign:'right', 
							labelSeparator:'',
							labelWidth:70,
							displayField : 'TMNL_TYPE',
							valueField : 'TMNL_TYPE_CODE',
							//value : '',
							emptyText : '----请输入----',
							blankText : '----请输入----',
							margin : '10 20 10 10'
						},{
							xtype : 'datefield',
							fieldLabel : '查询日期',
							name : 'queryDate',
							id : 'task_eleAbnolQueryDate1',
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
							id : 'task_eleAbnolConsNo1',
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
							id : 'task_eleAbnolTerminalAddr1',
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
								queryEleAbnormal();
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
	function queryEleAbnormal() {
		var orgNo = Ext.getCmp("task_eleAbnolOrgValue1").getValue();
		var eventLevel = Ext.getCmp("task_eleAbnolEventValue1").getValue();
		var queryDate = Ext.getCmp("task_eleAbnolQueryDate1").getRawValue();
		var consNo = Ext.getCmp("task_eleAbnolConsNo1").getValue();
		var terminalAddr = Ext.getCmp("task_eleAbnolTerminalAddr1").getValue();
		var terminalType = Ext.getCmp("task_eleAbnolTerminalType1").getValue();
		var flowStatusCode = Ext.getCmp("task_flowStatusCode1").getValue();
		gOrgNo = Ext.getCmp("task_eleAbnolOrgValue1").getValue();
		gEventLevel = Ext.getCmp("task_eleAbnolEventValue1").getValue();
		gQueryDate = Ext.getCmp("task_eleAbnolQueryDate1").getRawValue();
		gConsNo = Ext.getCmp("task_eleAbnolConsNo1").getValue();
		gTerminalAddr = Ext.getCmp("task_eleAbnolTerminalAddr1").getValue();
		gTerminalType = Ext.getCmp("task_eleAbnolTerminalType1").getValue();
		gFlowStatusCode=Ext.getCmp("task_flowStatusCode1").getValue();
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
						'queryItems.terminalType' : terminalType,
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
			task_msExceAnalStore.removeAll();
		//	abnormalEleChartStore.removeAll();
//		queryExceptInfo('');
	}

	renderModel(totalPanel, "采集装置异常分析");
	
	var task_queryExceptInfo = function (){
		var queryItems = {};
		var data = abnormalInfoFormpanel2.getSelectionModel().getSelection();
		var exceptCode = data[0].get('EXCEPT_CODE');
		    //task_msExceAnalStore.removeAll();
			task_msExceAnalStore.proxy.extraParams={
				'queryItems.orgNo' : gOrgNo,
//				'queryItems.orgNo' : '34401',
				'queryItems.eventLevel' : gEventLevel,
				'queryItems.queryDate' : gQueryDate,
				'queryItems.consNo' : gConsNo,
				'queryItems.terminalAddr' : gTerminalAddr,
				'queryItems.terminalType' : gTerminalType,
				'queryItems.exceptCode' : exceptCode,
				//'queryItems.alarmType': '01',
				//'queryItems.alarmCode': alarmCode,
				'queryItems.flowStatusCode':gFlowStatusCode
			};

			
			task_msExceAnalStore.currentPage=1;
			task_msExceAnalStore.load({
			    	start:0
			});
			//task_msExceAnalStore.guaranteeRange(0, DEFAULT_PAGE_SIZE-1);	
	}
	
	
	//---------查询用户档案信息--------------
	function queryFileInfoFun(record) {
		fileInfoPanel.getForm().reset();
		var queryFileItems = {};
		var orgNo = record.get('ORG_NO');
		var consNo = record.get('CONS_NO');
		var termimalAddr = record.get('TERMINAL_ADDR');
		//var meterId = record.get('METER_ID');
		//alert(meterId);

		Ext.Ajax.request({
					url : 'taskFlowAction!queryFileTotalList.action',
					params : {
						'queryFileItems.orgNo' : orgNo,
						'queryFileItems.consNo' : consNo,
						'queryFileItems.termimalAddr' : termimalAddr
						//'queryFileItems.meterId' : meterId
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
		Ext.getCmp("task_eleAbnormalConsNo").setValue(staTotalList[0].CONS_NO);
		Ext.getCmp("task_eleAbnormalConsName").setValue(staTotalList[0].CONS_NAME);
		Ext.getCmp("task_eleAbnormalVolt").setValue(staTotalList[0].VOLT);
		Ext.getCmp("task_eleAbnormalElecAddr").setValue(staTotalList[0].ELEC_ADDR);
		Ext.getCmp("task_eleAbnormalRuncap").setValue(staTotalList[0].RUN_CAP);
		Ext.getCmp("task_eleAbnormalTrade").setValue(staTotalList[0].TRADE_NAME);
		Ext.getCmp("task_eleAbnormalEleType").setValue(staTotalList[0].ELEC_TYPE);
		// ----终端的----
		Ext.getCmp("task_eleAbnormalTerAddr")
				.setValue(staTotalList[0].TERMINAL_ADDR);
		Ext.getCmp("task_eleAbnormalTerAssetNo")
				.setValue(staTotalList[0].TMNL_ASSET_NO);
		Ext.getCmp("task_eleAbnormalTerStatus")
				.setValue(staTotalList[0].STATUS_NAME);
		Ext.getCmp("task_eleAbnormalTerProlCode")
				.setValue(staTotalList[0].PROTOCOL_NAME);
		Ext.getCmp("task_eleAbnormalTerType").setValue(staTotalList[0].TMNL_TYPE);
		Ext.getCmp("task_eleAbnormalTerCollMode")
				.setValue(staTotalList[0].COLL_MODE_NAME);
		Ext.getCmp("task_eleAbnormalTerFactory")
				.setValue(staTotalList[0].FACTORY_NAME);
		// -----电表的----

//		Ext.getCmp("task_eleAbnormalMeterAssetNo")
//				.setValue(staTotalList[0].ASSET_NO);
//		Ext.getCmp("task_eleAbnormalMeterCpt").setValue(staTotalList[0].T_FACTOR);
//		Ext.getCmp("task_eleAbnormalMeterProl").setValue(staTotalList[0].COMM_MODE);
//		Ext.getCmp("task_eleAbnormalMeterMp").setValue(staTotalList[0].MP_ATTR_NAME);
//		Ext.getCmp("task_eleAbnormalMeterEffect")
//				.setValue(staTotalList[0].USAGE_TYPE_NAME);
//		Ext.getCmp("task_eleAbnormalMeterVolt").setValue(staTotalList[0].VOLT_CODE);
//		Ext.getCmp("task_eleAbnormalMeterMeaMode")
//				.setValue(staTotalList[0].MEAS_MODE);

	}
	
	//-------查询异常历史信息-------------------
	function queryExceptHisInfo(consNo,exceptCode,alarmType){
//		var consNo = record.get('CONS_NO');
//		var exceptCode = abnormalInfoFormpanel2.getSelectionModel().getSelection()[0].get('EXCEPT_CODE');	
//		var data1 = abnormalInfoFormpanel2.getSelectionModel().getSelection();
//						var exceptCode = data1[0].get('EXCEPT_CODE')
		var queryItems={};
//		abnormalEleHisStore.load({
//			params:{
//			'queryItems.alarmType' : '01',
//			'queryItems.consNo' : consNo,
//			'queryItems.querySdate' :Ext.getCmp("task_eleHisQuerySdate1").getRawValue(),
//			'queryItems.queryEdate' :Ext.getCmp("task_eleHisQueryEdate1").getRawValue(),
//			'queryItems.exceptCode' : exceptCode
//			}
//		}) ;
		
		abnormalEleHisStore.proxy.extraParams = {
						'queryItems.alarmType' : alarmType,
						'queryItems.consNo' : consNo,
						'queryItems.querySdate' : Ext.getCmp("task_eleHisQuerySdate1").getRawValue(),
						'queryItems.queryEdate' : Ext.getCmp("task_eleHisQueryEdate1").getRawValue(),
						'queryItems.exceptCode' : exceptCode
					}
			//	});
	//	abnormalEleHisStore.guaranteeRange(0, DEFAULT_PAGE_SIZE - 1);
					abnormalEleHisStore.currentPage=1;
					abnormalEleHisStore.load({
			    	start:0
			});
//		abnormalEleHisStore.guaranteeRange(0, DEFAULT_PAGE_SIZE - 1);
	}
	
})