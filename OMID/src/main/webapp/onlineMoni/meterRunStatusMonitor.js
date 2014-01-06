/**
 * 
 * 
 * @author chenyueyan
 * @date 2012-11-27
 */

Ext.onReady(function() {
	var gOrgNo;
	var gConsNo;
	var gProtocolCode;
	var gTerminalAddr;
	var gMeterAssetNo;
	var sConsNo;
	var sAlarmCode;
	var selectModel = Ext.create('Ext.selection.CheckboxModel', {
				mode : 'SINGLE',
				listeners : {
					select : function(t, record, index, e) {
						if(record.get('FLAG')==0){
						Ext.getCmp('meterRunStatusChartPanel').layout
													.setActiveItem(0);
						}else{
						Ext.getCmp('meterRunStatusChartPanel').layout
													.setActiveItem(1);
						}
						setMeterCtrlStatusValue(record);
						queryMeterSendRecordFun(record);
						queryFileInfoFun(record);
						// queryMeterRunExceptHisInfo(record.get(''));

					}
				}
			});

	Ext.define('meterAbnormalInfoSt', {
				extend : 'Ext.data.Model',
				fields : ["ORG_NO", "ORG_NAME", "CONS_NO", "CONS_NAME",
						"CONS_TYPE_NAME", "APP_NO", "EVENT_NAME",
						"BUSINESS_TYPE", "HAPPEN_TIME", "TERMINAL_ADDR",
						"ASSET_NO", "METER_ID", "STATUS_NAME", "CIS_SEND_TIME",
						"FAILURE_CODE", "BACK_STATUS_CODE", "BACK_TIME",
						"CIS_STAFF_NO","MET_CTRL_FLAG","MET_CTRL_FLAG_NAME","FLAG_VALUE","TMNL_ASSET_NO", "FLAG"]
			});

	var meterAbnormalInfoStore = Ext.create('Ext.data.Store', {
				model : 'meterAbnormalInfoSt',
				remoteSort : true,
				pageSize : DEFAULT_PAGE_SIZE,
				buffered : true,
				proxy : {
					type : 'ajax',
					url : 'meterRunStatusMonitorAction!queryMeterRunFailInfo.action',
					reader : {
						type : 'json',
						root : 'resultList',
						totalProperty : 'totalCount'
					}
				}
			});
	var meterAbnormalInfoGrid = Ext.create('Ext.grid.Panel', {
				title : '电能表运行异常事件明细',
				loadMask : true,
				selModel : selectModel,
				region : 'center',
				border : true,
				store : meterAbnormalInfoStore,
				viewConfig : {
					trackOver : false
				},
				columnLines : true,
				columns : [{
							text : "供电单位",
							width : 120,
							dataIndex : 'ORG_NAME',
							align : 'center',
							sortable : true
						}, {
							text : "异常名称",
							width : 120,
							dataIndex : 'EVENT_NAME',
							align : 'center',
							sortable : false
						}, {
							text : "业务类别",
							width : 120,
							dataIndex : 'BUSINESS_TYPE',
							align : 'center',
							sortable : false
						}, {
							text : "发生时间",
							width : 120,
							dataIndex : 'HAPPEN_TIME',
							align : 'center',
							sortable : false
						}, {
							text : "用户编号",
							width : 120,
							dataIndex : 'CONS_NO',
							align : 'center',
							sortable : false
						}, {
							text : "用户名称",
							width : 120,
							dataIndex : 'CONS_NAME',
							align : 'center',
							sortable : false
						}, {
							text : "用户类别",
							width : 100,
							dataIndex : 'CONS_TYPE_NAME',
							align : 'center',
							sortable : false
						}, {
							text : "终端地址",
							width : 120,
							dataIndex : 'TERMINAL_ADDR',
							align : 'center',
							sortable : false
						}, {
							text : "电能表资产号",
							width : 120,
							dataIndex : 'ASSET_NO',
							align : 'center',
							sortable : false
						}, {
							text : "状态",
							width : 120,
							dataIndex : 'STATUS_NAME',
							align : 'center',
							sortable : false
						}]
//						,
//				dockedItems : [{
//							xtype : 'pagingtoolbar',
//							store : meterAbnormalInfoStore,
//							dock : 'bottom',
//							displayInfo : true
//						}]
			});
	 meterAbnormalInfoGrid.addDocked(new Ext.create('Ext.ux.MyToolBar',{
		dock: 'bottom',
		expallable : true,//是否导出全部
		expcurable : true,//是否导出当前页
		grid : meterAbnormalInfoGrid,//当前需要导出的grid
		title : '电能表运行异常事件明细',//导出excel的文件名称
		store: meterAbnormalInfoStore,
		displayInfo: true
	}));

	// ---------右上角----------------
	margins = '3 20 3 20';

	Ext.define('MeterAbnormalCount', {
				extend : 'Ext.data.Model',
				fields : ["FLAG", "EVENT_NAME", "MET_CTRL_FLAG", "FLAG_VALUE",
						"CNT"]
			});
	var meterAbnolCountStore = Ext.create('Ext.data.Store', {
				model : 'MeterAbnormalCount',
				remoteSort : true,
				proxy : new Ext.data.MemoryProxy()
			});
	var meterAbnormalInfoFormpanel = Ext.create('Ext.grid.Panel', {
		title : '异常信息统计',
		loadMask : true,
		id : 'meterAbnormalInfoFormpanel',
		region : 'east',
		width : 300,
		border : true,
		viewConfig : {
			trackOver : false
		},
		store : meterAbnolCountStore,
		columnLines : false,
		columns : [{
					text : "异常事件",
					width : 120,
					dataIndex : 'EVENT_NAME',
					align : 'center'
				}, {
					text : "数量",
					width : 120,
					dataIndex : 'CNT',
					align : 'center',
					renderer : function(s, m, rec) {
						if (rec.get('ALARM_CODE') == '') {
							return s;
						} else {
							return "<a href='javascript:' onclick='queryMeterRunStatusExceptInfo(\""
									+ rec.get('FLAG')
									+ "\",\""
									+ rec.get('MET_CTRL_FLAG')
									+ "\",\""
									+ rec.get('FLAG_VALUE')
									+ "\");'>"
									+ s
									+ "</a>";
						}
					}
				}]
	});

	var top_panel = Ext.create('Ext.panel.Panel', {
				border : true,
				layout : 'border',
				height : 250,
				region : 'north',
				minHeight : 130,
				maxHeight : 450,
				split : true,
				animCollapse : true,
				collapsible : true,
				items : [meterAbnormalInfoGrid, meterAbnormalInfoFormpanel]
			});

	// -------------------------右下角-------------------------
	// -------------用电信息--------------
	var meterCtrlFormPanel = Ext.create('Ext.form.Panel', {
				region : 'west',
				autoScroll : true,
				bodyStyle : 'padding:2px 0px 2px 2px',
				width : 300,
				items : [{
							xtype : 'textfield',
							fieldLabel : '工单号',
							name : 'meterRunMonitorAppNo',
							id : 'meterRunMonitorAppNo',
							labelAlign : 'right',
							labelSeparator : '',
							readOnly : true,
							emptyText : '--------',
							blankText : '--------',
							margin : '10 20 10 3'
						}, {
							xtype : 'textfield',
							fieldLabel : '营销发起时间',
							name : 'meterRunMonitorStartTime',
							id : 'meterRunMonitorStartTime',
							labelAlign : 'right',
							labelSeparator : '',
							readOnly : true,
							emptyText : '--------',
							blankText : '--------',
							margin : '10 20 10 3'
						}, {
							xtype : 'textfield',
							fieldLabel : '下发时间',
							name : 'meterRunMonitorSendTime',
							id : 'meterRunMonitorSendTime',
							labelAlign : 'right',
							labelSeparator : '',
							readOnly : true,
							emptyText : '--------',
							blankText : '--------',
							margin : '10 20 10 3'
						}, {
							xtype : 'textfield',
							fieldLabel : '状态',
							name : 'meterRunMonitorStatus',
							id : 'meterRunMonitorStatus',
							labelAlign : 'right',
							labelSeparator : '',
							readOnly : true,
							emptyText : '--------',
							blankText : '--------',
							margin : '10 20 10 3'
						}, {
							xtype : 'textfield',
							fieldLabel : '失败原因',
							name : 'meterRunMonitorFailReason',
							id : 'meterRunMonitorFailReason',
							labelAlign : 'right',
							labelSeparator : '',
							readOnly : true,
							emptyText : '--------',
							blankText : '--------',
							margin : '10 20 10 3'
						}, {
							xtype : 'textfield',
							fieldLabel : '回复营销状态',
							name : 'meterRunMonitorBackStatus',
							id : 'meterRunMonitorBackStatus',
							labelAlign : 'right',
							labelSeparator : '',
							readOnly : true,
							emptyText : '--------',
							blankText : '--------',
							margin : '10 20 10 3'
						}, {
							xtype : 'textfield',
							fieldLabel : '回复营销时间',
							name : 'meterRunMonitorBackTime',
							id : 'meterRunMonitorBackTime',
							labelAlign : 'right',
							labelSeparator : '',
							readOnly : true,
							emptyText : '--------',
							blankText : '--------',
							margin : '10 20 10 3'
						}, {
							xtype : 'textfield',
							fieldLabel : '操作员',
							name : 'meterRunMonitorStaffNo',
							id : 'meterRunMonitorStaffNo',
							labelAlign : 'right',
							labelSeparator : '',
							readOnly : true,
							emptyText : '--------',
							blankText : '--------',
							margin : '10 20 10 3'
						}]

			});
	Ext.define('MeterCtrlSend', {
				extend : 'Ext.data.Model',
				fields : ["SEND_TIME", "SEND_STATUS", "STAFF_NO", "IP_ADDR"]
			});

	var meterCtrlSendRecordStore = Ext.create('Ext.data.Store', {
		model : 'MeterCtrlSend',
		proxy : {
			type : 'ajax',
			url : 'meterRunStatusMonitorAction!queryMeterCtrlSendRecord.action',
			reader : {
				root : 'meterCtrlSendRecord',
				type : 'json'
			}
		}
	});
	var meterCtrlSendRecordGridPanel = Ext.create('Ext.grid.Panel', {
				title : '下发记录',
				loadMask : true,
				region : 'center',
				width : 300,
				border : true,
				viewConfig : {
					trackOver : false
				},
				store : meterCtrlSendRecordStore,
				columnLines : false,
				columns : [{
							text : "下发时间",
							width : 120,
							dataIndex : 'SEND_TIME',
							align : 'center'
						}, {
							text : "下发状态",
							width : 120,
							dataIndex : 'SEND_STATUS',
							align : 'center'
						}, {
							text : "操作员",
							width : 120,
							dataIndex : 'STAFF_NO',
							align : 'center'
						}, {
							text : "IP地址",
							width : 120,
							dataIndex : 'IP_ADDR',
							align : 'center'
						}]

			});
	var meterCtrlStatusChartPanel = Ext.create('Ext.panel.Panel', {
				layout : 'border',
				border : false,
				monitorResize : true,
				autoScroll : true,
				items : [meterCtrlFormPanel, meterCtrlSendRecordGridPanel]
			});
	var meterFailFormPanel = Ext.create('Ext.form.Panel', {
				region : 'west',
				autoScroll : true,
				bodyStyle : 'padding:2px 0px 2px 2px',
				width : 350,

				items : [{
							xtype : 'textfield',
							fieldLabel : '用户状态',
							labelWidth : 120,
							name : 'meterFailConsStatus',
							id : 'meterFailConsStatus',
							labelAlign : 'right',
							labelSeparator : '',
							readOnly : true,
							emptyText : '--------',
							blankText : '--------',
							margin : '10 10 10 3'
						}, {
							xtype : 'textfield',
							fieldLabel : '集中器载波芯片厂家',
							labelWidth : 120,
							name : 'meterFailCarriveFactory',
							id : 'meterFailCarriveFactory',
							labelAlign : 'right',
							labelSeparator : '',
							readOnly : true,
							emptyText : '--------',
							blankText : '--------',
							margin : '10 10 10 3'
						}, {
							xtype : 'textfield',
							fieldLabel : '电能表载波芯片厂家',
							labelWidth : 120,
							name : 'meterFailMeterCarriveFactory',
							id : 'meterFailMeterCarriveFactory',
							labelAlign : 'right',
							labelSeparator : '',
							readOnly : true,
							emptyText : '--------',
							blankText : '--------',
							margin : '10 10 10 3'
						}, {
							xtype : 'textfield',
							fieldLabel : '波特率',
							labelWidth : 120,
							name : 'meterFailBaudrate',
							id : 'meterFailBaudrate',
							labelAlign : 'right',
							labelSeparator : '',
							readOnly : true,
							emptyText : '--------',
							blankText : '--------',
							margin : '10 10 10 3'
						}, {
							xtype : 'textfield',
							fieldLabel : '端口号',
							labelWidth : 120,
							name : 'meterFailCollPort',
							id : 'meterFailCollPort',
							labelAlign : 'right',
							labelSeparator : '',
							readOnly : true,
							emptyText : '--------',
							blankText : '--------',
							margin : '10 10 10 3'
						}, {
							xtype : 'textfield',
							fieldLabel : '最后抄表日期',
							labelWidth : 120,
							name : 'meterFailLastSuccDate',
							id : 'meterFailLastSuccDate',
							labelAlign : 'right',
							labelSeparator : '',
							readOnly : true,
							emptyText : '--------',
							blankText : '--------',
							margin : '10 10 10 3'
						}]

			});
	Ext.define('MeterFailSend', {
				extend : 'Ext.data.Model',
				fields : ["PROT_ITEM_NO","PROT_ITEM_NAME","CURRENT_VALUE", "HISTORY_VALUE", "CALL_VALUE",
						"STATUS_NAME", "SEND_TIME", "STAFF_NO"]
			});
	var meterFailRecordStore = Ext.create('Ext.data.Store', {
		model : 'MeterFailSend',
		proxy : {
			type : 'ajax',
			url : 'meterRunStatusMonitorAction!queryMeterFailSendRecord.action',
			reader : {
				root : 'meterFailSendRecord',
				type : 'json'
			}
		}
	});
	var meterFailSendRecordGridPanel = Ext.create('Ext.grid.Panel', {
				title : '下发记录',
				loadMask : true,
				region : 'center',
				width : 300,
				border : true,
				viewConfig : {
					trackOver : false
				},
				store : meterFailRecordStore,
				columnLines : false,
				columns : [{
							text : "参数项名称",
							width : 120,
							dataIndex : 'PROT_ITEM_NAME',
							align : 'center'
						},{
							text : "当前值",
							width : 120,
							dataIndex : 'CURRENT_VALUE',
							align : 'center'
						}, {
							text : "历史值",
							width : 120,
							dataIndex : 'HISTORY_VALUE',
							align : 'center'
						}, {
							text : "召测值",
							width : 120,
							dataIndex : 'CALL_VALUE',
							align : 'center'
						}, {
							text : "下发状态",
							width : 120,
							dataIndex : 'STATUS_NAME',
							align : 'center'
						}, {
							text : "下发时间",
							width : 120,
							dataIndex : 'SEND_TIME',
							align : 'center'
						}, {
							text : "操作员",
							width : 120,
							dataIndex : 'STAFF_NO',
							align : 'center'
						}]

			});
	var meterFailChartPanel = Ext.create('Ext.panel.Panel', {
				layout : 'border',
				border : false,
				monitorResize : true,
				autoScroll : true,
				items : [meterFailFormPanel, meterFailSendRecordGridPanel]
			});
	var meterRunStatusChartPanel = Ext.create('Ext.panel.Panel', {
				title : '用电信息',
				region : 'center',
				layout : 'card',
				id : 'meterRunStatusChartPanel',
				activeItem : 0,
				items : [meterCtrlStatusChartPanel, meterFailChartPanel]
			});

	// ------------------档案信息-------------------------
	var fileInfoPanel = Ext.create('Ext.form.Panel', {
		// title : '档案',
		autoScroll : true,
		layout : 'column',
		bodyStyle : 'padding:5px 0px 10px 5px',
		items : [{
					columnWidth : .33,
					xtype : 'form',
					border : false,
					items : [{
								xtype : 'label',
								html : "<font size=2px;font-weight:bold>用户信息</font>",
								margin : '5 20 20 100'
							}, {
								xtype : 'textfield',
								id : 'meterRunStatusConsNo',
								fieldLabel : '用户编号',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 70,
								readOnly : true

							}, {
								xtype : 'textfield',
								id : 'meterRunStatusConsName',
								fieldLabel : '用户名称',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 70,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'meterRunStatusConsSort',
								fieldLabel : '用户分类',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 70,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'meterRunStatusVolt',
								fieldLabel : '供电电压',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 70,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'meterRunStatusAddr',
								fieldLabel : '用电地址',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 70,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'meterRunStatusRuncap',
								fieldLabel : '运行容量',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 70,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'meterRunStatusConnectcap',
								fieldLabel : '合同容量',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 70,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'meterRunStatusTrade',
								fieldLabel : '行业分类',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 70,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'meterRunStatusElecType',
								fieldLabel : '用电类别',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
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
								id : 'meterRunStatusTerAddr',
								fieldLabel : '终端地址',
								labelAlign : 'right',
								hidden : true,
								labelSeparator : '',
								width : 195,
								labelWidth : 80,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'meterRunStatusTerAssetNo',
								fieldLabel : '终端资产号',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 80,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'meterRunStatusTerStatus',
								fieldLabel : '终端状态',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 80,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'meterRunStatusTerProlCode',
								fieldLabel : '终端规约',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 80,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'meterRunStatusTerType',
								fieldLabel : '终端类别',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 80,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'meterRunStatusTerCollMode',
								fieldLabel : '采集方式',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 80,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'meterRunStatusTerFactory',
								fieldLabel : '终端厂商',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 80,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'meterRunStatusCollNo',
								fieldLabel : '采集点编号',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 80,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'meterRunStatusCollAddr',
								fieldLabel : '采集点地址',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 80,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'meterRunStatusCollType',
								fieldLabel : '采集点类型',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
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
								id : 'meterRunStatusMeterAssetNo',
								fieldLabel : '电能表资产号',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								hidden : true,
								labelWidth : 80,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'meterRunStatusMeterCpt',
								fieldLabel : '综合倍率',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 80,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'meterRunStatusMeterCt',
								fieldLabel : 'CT',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 80,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'meterRunStatusMeterPt',
								fieldLabel : 'PT',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 80,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'meterRunStatusMeterProl',
								fieldLabel : '通讯规约',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 80,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'meterRunStatusMeterMp',
								fieldLabel : '计量点性质',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 80,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'meterRunStatusMeterEffect',
								fieldLabel : '主用途类型',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 80,
								// hidden : true,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'meterRunStatusMeterVolt',
								fieldLabel : '电压等级',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 80,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'meterRunStatusMeterWirMode',
								fieldLabel : '接线方式',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 80,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'meterRunStatusMeterMeaMode',
								fieldLabel : '计量方式',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 80,
								readOnly : true
							}]

				}]
	});
	var meterRunStatusFilePanel = Ext.create('Ext.panel.Panel', {
				title : '档案信息',
				id : 'meterRunStatusFilePanelId',
				border : true,
				layout : 'fit',
				monitorResize : true,
				autoScroll : true,
				items : [fileInfoPanel]
			});

	// ------------异常历史信息------------------
	var meterHisSelectModel = Ext.create('Ext.selection.CheckboxModel');
	Ext.define('MeterRunStatusHisInfoModel', {
				extend : 'Ext.data.Model',
				fields : ["CONS_NO", "ALARM_ID", "ALARM_CODE", "EVENT_NAME",
						"EVENT_LEVEL", "FIRST_ALARM_DATE", "ALARM_DATE",
						"ALARM_CNT", "FIRST_RESUME_DATE", "RESUME_DATE",
						"RESUME_DAY_CNT", "ALARM_SRC", "METER_ASSET_NO"]
			});
	var meterRunStatusHisStore = Ext.create('Ext.data.Store', {
				model : 'MeterRunStatusHisInfoModel',
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
	var meterRunStatusInfoHisGrid = Ext.create('Ext.grid.Panel', {
				loadMask : true,
				selModel : meterHisSelectModel,
				region : 'center',
				border : true,
				store : meterRunStatusHisStore,
				tbar : [{
							xtype : 'label',
							html : "<font font-weight:bold;>查询日期内历史信息</font>"
						}, '->', {
							xtype : 'datefield',
							fieldLabel : '开始日期',
							id : 'meterRunHisQuerySdate',
							// value : new Date().add(Date.MONTH,-3),
							value : new Date(),
							format : 'Y-m-d'
						}, {
							xtype : 'datefield',
							fieldLabel : '结束日期',
							id : 'meterRunHisQueryEdate',
							value : new Date(),
							format : 'Y-m-d'
						}, {
							xtype : 'button',
							text : '查询',
							align : 'center',
							width : 80,
							handler : function() {
								if (Ext.isEmpty(sConsNo)
										|| Ext.isEmpty(sAlarmCode)) {
									Ext.Msg.alert("提示", "请选择一条记录");
									return;
								} else {
									queryMeterRunExceptHisInfo(sConsNo,
											sAlarmCode);
								}
							}
						}

				],
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
							text : "电能表资产号",
							width : 120,
							dataIndex : 'METER_ASSET_NO',
							align : 'center',
							sortable : false
						}]
//						,
//				dockedItems : [{
//							xtype : 'pagingtoolbar',
//							store : meterRunStatusHisStore,
//							dock : 'bottom',
//							displayInfo : true
//						}]

			});
	meterRunStatusInfoHisGrid.addDocked(new Ext.create('Ext.ux.MyToolBar',{
		dock: 'bottom',
		expallable : true,//是否导出全部
		expcurable : true,//是否导出当前页
		grid : meterRunStatusInfoHisGrid,//当前需要导出的grid
		title : '电能表运行异常历史事件明细',//导出excel的文件名称
		store: meterRunStatusHisStore,
		displayInfo: true
	}));
	var meterRunStatusHistoryPanel = Ext.create('Ext.panel.Panel', {
				title : '异常历史信息',
				border : true,
				layout : 'fit',
				monitorResize : true,
				autoScroll : true,
				items : [meterRunStatusInfoHisGrid]
			});
	var meterRunStatusInfoTabpanel = Ext.createWidget('tabpanel', {
				region : 'center',
				activeTab : 0,
				defaults : {
					bodyPandding : 10
				},
				items : [meterRunStatusChartPanel, meterRunStatusFilePanel]
			})

	// ------------右下角查询条件panel------------------
	Ext.define('meterRunStatusOrgSt', {
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
				model : 'meterRunStatusOrgSt',
				proxy : {
					type : 'ajax',
					url : 'eleAbnormalAnalyAction!queryOrgNolist.action',
					reader : {
						root : 'orgList',
						type : 'json'
					}
				}
			});
	orgStore.load({
				params : {
					orgNo : LOGGEDORGNO
				},
				callback : function(records, operation, success) {
					Ext.getCmp('meterRunMonitorOrgValue').setValue(LOGGEDORGNO);
				}
			});
	Ext.define('meterRunProtocolSt', {
				extend : 'Ext.data.Model',
				fields : [{
							name : 'MET_PROTOCOL_CODE',
							type : 'string'
						}, {
							name : 'MET_PROTOCOL_NAME',
							type : 'string'
						}]
			});
	var protocolCodeStore = Ext.create('Ext.data.Store', {
		model : 'meterRunProtocolSt',
		proxy : {
			type : 'ajax',
			url : 'meterRunStatusMonitorAction!queryMeterProcolCodeList.action',
			reader : {
				root : 'protocolCodeList',
				type : 'json'
			}
		},
		autoLoad : true
	});
	protocolCodeStore.load({
				callback : function(records, operation, success) {
					Ext.getCmp('meterRunMonitorProtocolCode').setValue('00');
				}
			});
	var queryContionParam = Ext.create('Ext.form.Panel', {
				border : true,
				title : '查询条件',
				region : 'east',
				autoScroll : true,
				bodyStyle : 'padding:10px 0px 10px 10px',
				width : 300,
				items : [{
							xtype : 'combo',
							fieldLabel : '供电单位',
							name : 'meterRunMonitorOrgValue',
							id : 'meterRunMonitorOrgValue',
							queryMode : 'local',
							store : orgStore,
							displayField : 'ORG_NAME',
							valueField : 'ORG_NO',
							labelAlign : 'right',
							emptyText : '----请输入----',
							blankText : '----请输入----',
							margin : '10 20 10 10'
						}, {
							xtype : 'combo',
							fieldLabel : '通信规约',
							name : 'meterRunMonitorProtocolCode',
							id : 'meterRunMonitorProtocolCode',
							queryMode : 'local',
							store : protocolCodeStore,
							displayField : 'MET_PROTOCOL_NAME',
							valueField : 'MET_PROTOCOL_CODE',
							labelAlign : 'right',
							emptyText : '----请输入----',
							blankText : '----请输入----',
							margin : '10 20 10 10'
						}, {
							xtype : 'textfield',
							fieldLabel : '用户编号',
							name : 'meterRunMonitorConsNo',
							id : 'meterRunMonitorConsNo',
							labelAlign : 'right',
							emptyText : '----请输入----',
							blankText : '----请输入----',
							margin : '10 20 10 10'

						}, {
							xtype : 'textfield',
							fieldLabel : '电能表资产号',
							name : 'meterRunMonitorAssetNo',
							id : 'meterRunMonitorAssetNo',
							labelAlign : 'right',
							emptyText : '----请输入----',
							blankText : '----请输入----',
							margin : '10 20 10 10'
						}, {
							xtype : 'textfield',
							fieldLabel : '终端地址',
							name : 'meterRunMonitorTerminalAddr',
							id : 'meterRunMonitorTerminalAddr',
							labelAlign : 'right',
							emptyText : '----请输入----',
							blankText : '----请输入----',
							margin : '10 20 10 10'
						}, {
							xtype : 'button',
							text : '查询',
							align : 'center',
							width : 80,
							margin : '10 20 10 185',
							handler : function() {
								queryEleAbnormalInfoFun();
							}
						}]

			});
	var bottom_panel = Ext.create('Ext.panel.Panel', {
				border : true,
				layout : 'border',
				region : 'center',
				items : [meterRunStatusInfoTabpanel, queryContionParam]
			});

	var totalPanel = Ext.create('Ext.panel.Panel', {
				layout : 'border',
				border : false,
				items : [top_panel, bottom_panel]

			});
	// -----------function--------------
	function setMeterCtrlStatusValue(record) {
		if (record.get('FLAG') == 0) {
			Ext.getCmp("meterRunMonitorAppNo").setValue(record.get('APP_NO'));
			Ext.getCmp("meterRunMonitorStartTime").setValue(record
					.get('CIS_SEND_TIME'));
			Ext.getCmp("meterRunMonitorSendTime").setValue(record
					.get('HAPPEN_TIME'));
			Ext.getCmp("meterRunMonitorStatus").setValue(record
					.get('STATUS_NAME'));
			Ext.getCmp("meterRunMonitorFailReason").setValue(record
					.get('FAILURE_CODE'));
			Ext.getCmp("meterRunMonitorBackStatus").setValue(record
					.get('BACK_STATUS_CODE'));
			Ext.getCmp("meterRunMonitorBackTime").setValue(record
					.get('BACK_TIME'));
			Ext.getCmp("meterRunMonitorStaffNo").setValue(record
					.get('CIS_STAFF_NO'));
		} else {
			Ext.getCmp("meterFailConsStatus").setValue(record.get('APP_NO'));
			Ext.getCmp("meterFailMeterCarriveFactory").setValue(record.get('CIS_STAFF_NO'));
			Ext.getCmp("meterFailCarriveFactory").setValue(record.get('MET_CTRL_FLAG_NAME'));
			Ext.getCmp("meterFailBaudrate").setValue(record.get('MET_CTRL_FLAG'));
			Ext.getCmp("meterFailCollPort").setValue(record.get('FLAG_VALUE'));
			Ext.getCmp("meterFailLastSuccDate").setValue(record.get('CIS_SEND_TIME'));
		}
	}
	function queryMeterSendRecordFun(record) {		
		if (record.get('FLAG') == 0) {
		meterCtrlSendRecordStore.removeAll();
		var queryItems = {};
		var app_no = record.get('APP_NO');
		var meterId = record.get('METER_ID');
		meterCtrlSendRecordStore.load({
					params : {
						'queryItems.appNo' : app_no,
						'queryItems.meterId' : meterId
					}
				});
		}else{			
		meterFailRecordStore.removeAll();
		var queryItems = {};
		var meterId = record.get('METER_ID');
		var tmnl_asset_no= record.get('TMNL_ASSET_NO');
		meterFailRecordStore.load({
					params : {						
						'queryItems.meterId' : meterId,
						'queryItems.tmnl_asset_no' : tmnl_asset_no
					}
				});
		
		
		}
	};

	// ---------查询用户档案信息--------------
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
						if (staTotalList.length > 0) {
							setFileFormValue(staTotalList);
						}
					}
				});
	};
	function setFileFormValue(staTotalList) {
		// ---用户的--
		Ext.getCmp("meterRunStatusConsNo").setValue(staTotalList[0].CONS_NO);
		Ext.getCmp("meterRunStatusConsName")
				.setValue(staTotalList[0].CONS_NAME);
		Ext.getCmp("meterRunStatusVolt").setValue(staTotalList[0].VOLT);
		Ext.getCmp("meterRunStatusAddr").setValue(staTotalList[0].ELEC_ADDR);
		Ext.getCmp("meterRunStatusRuncap").setValue(staTotalList[0].RUN_CAP);
		Ext.getCmp("meterRunStatusTrade").setValue(staTotalList[0].TRADE_NAME);
		Ext.getCmp("meterRunStatusElecType")
				.setValue(staTotalList[0].ELEC_TYPE);
		Ext.getCmp("meterRunStatusConnectcap")
				.setValue(staTotalList[0].CONTRACT_CAP);
		Ext.getCmp("meterRunStatusConsSort")
				.setValue(staTotalList[0].CONS_SORT_NAME);
		// ----终端的----
		Ext.getCmp("meterRunStatusTerAddr")
				.setValue(staTotalList[0].TERMINAL_ADDR);
		Ext.getCmp("meterRunStatusTerAssetNo")
				.setValue(staTotalList[0].TMNL_ASSET_NO);
		Ext.getCmp("meterRunStatusTerStatus")
				.setValue(staTotalList[0].STATUS_NAME);
		Ext.getCmp("meterRunStatusTerProlCode")
				.setValue(staTotalList[0].PROTOCOL_NAME);
		Ext.getCmp("meterRunStatusTerType").setValue(staTotalList[0].TMNL_TYPE);
		Ext.getCmp("meterRunStatusTerCollMode")
				.setValue(staTotalList[0].COLL_MODE_NAME);
		Ext.getCmp("meterRunStatusTerFactory")
				.setValue(staTotalList[0].FACTORY_NAME);
		Ext.getCmp("meterRunStatusCollNo").setValue(staTotalList[0].CP_NO);
		Ext.getCmp("meterRunStatusCollAddr").setValue(staTotalList[0].CP_ADDR);
		Ext.getCmp("meterRunStatusCollType").setValue(staTotalList[0].CP_TYPE);

		// -----电表的----

		Ext.getCmp("meterRunStatusMeterAssetNo")
				.setValue(staTotalList[0].ASSET_NO);
		Ext.getCmp("meterRunStatusMeterCpt").setValue(staTotalList[0].T_FACTOR);
		Ext.getCmp("meterRunStatusMeterProl")
				.setValue(staTotalList[0].COMM_MODE);
		Ext.getCmp("meterRunStatusMeterMp")
				.setValue(staTotalList[0].MP_ATTR_NAME);
		Ext.getCmp("meterRunStatusMeterEffect")
				.setValue(staTotalList[0].USAGE_TYPE_NAME);
		Ext.getCmp("meterRunStatusMeterVolt")
				.setValue(staTotalList[0].VOLT_CODE);
		Ext.getCmp("meterRunStatusMeterWirMode")
				.setValue(staTotalList[0].WIRING_MODE_NAME);
		Ext.getCmp("meterRunStatusMeterMeaMode")
				.setValue(staTotalList[0].MEAS_MODE);
		Ext.getCmp("meterRunStatusMeterCt").setValue(staTotalList[0].CT);
		Ext.getCmp("meterRunStatusMeterPt").setValue(staTotalList[0].PT);

	}

	// -----查询异常统计信息
	function queryEleAbnormalInfoFun() {
		var orgNo = Ext.getCmp("meterRunMonitorOrgValue").getValue();
		var consNo = Ext.getCmp("meterRunMonitorConsNo").getValue();
		var protocolCode = Ext.getCmp("meterRunMonitorProtocolCode").getValue();
		var terminalAddr = Ext.getCmp("meterRunMonitorTerminalAddr").getValue();
		var meterAssetNo = Ext.getCmp("meterRunMonitorAssetNo").getValue();

		gOrgNo = Ext.getCmp("meterRunMonitorOrgValue").getValue();
		gConsNo = Ext.getCmp("meterRunMonitorConsNo").getValue();
		gTerminalAddr = Ext.getCmp("meterRunMonitorTerminalAddr").getValue();
		gMeterAssetNo = Ext.getCmp("meterRunMonitorAssetNo").getValue();
		gProtocolCode = Ext.getCmp("meterRunMonitorProtocolCode").getValue();
		if (Ext.isEmpty(orgNo)) {
			Ext.Msg.alert("提示", "请选择供电单位！");
			return;
		}
		meterAbnolCountStore.removeAll();
		meterAbnormalInfoStore.removeAll();
		Ext.getCmp('meterAbnormalInfoFormpanel').getEl().mask('正在查询...');
		var queryItems = {};
		Ext.Ajax.request({
			url : 'meterRunStatusMonitorAction!queryMeterRunStatusTotalList.action',
			params : {
				'queryItems.protocolCode' : protocolCode,
				'queryItems.orgNo' : orgNo,
				'queryItems.consNo' : consNo,
				'queryItems.terminalAddr' : terminalAddr,
				'queryItems.meterAssetNo' : meterAssetNo
			},
			success : function(response) {
				var result = Ext.decode(response.responseText);
				var staTotalList = result.meterRunStatusTotalList;
				if (!Ext.isEmpty(staTotalList)) {
					meterAbnolCountStore.loadData(staTotalList);
					var sum = 0;
					for (var i = 0; i < staTotalList.length; i++) {
						sum += staTotalList[i].CNT;
					}
					var rec = Ext.create('MeterAbnormalCount', {
								FLAG : '2',
								EVENT_NAME : '合计',
								MET_CTRL_FLAG : '',
								FLAG_VALUE : '',
								CNT : sum
							});
					meterAbnolCountStore.add(rec);
				}
				Ext.getCmp('meterAbnormalInfoFormpanel').getEl().unmask();
			},
			failure : function(response) {
				Ext.Msg.alert('提示', '查询异常统计信息失败');
				Ext.getCmp('meterAbnormalInfoFormpanel').getEl().unmask();
			}

		});

		queryMeterRunStatusExceptInfo('2', '', '');

	}

	renderModel(totalPanel, "电能表运行监测");

	// ---查询用电异常信息------
	queryMeterRunStatusExceptInfo = function(flag, crtlflag, value) {
		var queryItems = {};
		meterAbnormalInfoStore.proxy.extraParams = {
			'queryItems.orgNo' : gOrgNo,
			'queryItems.consNo' : gConsNo,
			'queryItems.terminalAddr' : gTerminalAddr,
			'queryItems.protocolCode' : gProtocolCode,
			'queryItems.meterAssetNo' : gMeterAssetNo,
			'queryItems.ctrlFlag' : crtlflag,
			'queryItems.flagValue' : value,
			'queryItems.flag' : flag
		}
		meterAbnormalInfoStore.currentPage = 1;
		meterAbnormalInfoStore.load({
					start : 0
				});

	}
	// -------查询异常历史信息-------------------
	function queryMeterRunExceptHisInfo(consNo, alarmCode) {
		var queryItems = {};
		// meterRunStatusHisStore({
		// params : {
		meterRunStatusHisStore.proxy.extraParams = {
			'queryItems.alarmType' : alarm_type,
			'queryItems.consNo' : consNo,
			'queryItems.querySdate' : Ext.getCmp("meterRunHisQuerySdate")
					.getRawValue(),
			'queryItems.queryEdate' : Ext.getCmp("meterRunHisQueryEdate")
					.getRawValue(),
			'queryItems.alarmCode' : alarmCode
		}

		meterRunStatusHisStore.currentPage = 1;
		meterRunStatusHisStore.load({
					start : 0
				});
	}

	// --------------查询用电信息曲线数据----------
	function queryEleCurveInfo(alarmCode, meterId, assetNo, alarmDate, runCap) {
	};// ------------
})