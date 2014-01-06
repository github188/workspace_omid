/**
 * 
 * 
 * @author chenyueyan
 * @date 2012-10-17
 */

function openFailDetailList() {

}
var alarm_type = '02'
Ext.onReady(function() {
	var gOrgNo;
	var gEventLevel;
	var gQueryDate;
	var gConsNo;
	var gTerminalAddr;
	var gFlowStatusCode;
	var sConsNo;
	var sAlarmCode;
	var selectModel = Ext.create('Ext.selection.CheckboxModel', {
				mode : 'SINGLE',
				listeners : {
					select : function(t, record, index, e) {
						sConsNo = record.get('CONS_NO');
						sAlarmCode = record.get('ALARM_CODE');
						queryFileInfoFun(record);
						queryExceptHisInfo(record.get('CONS_NO'), record
										.get('ALARM_CODE'));
						queryEleCurveInfo(record.get('ALARM_CODE'), record
										.get('METER_ID'), record
										.get('ALARM_DATE'), record
										.get('RUN_CAP'));
						queryMeterEventInfo(record.get('ALARM_ID'));
						queryTmnlEventInfo(record.get('ALARM_ID'));
						// examplesCurve();

					}
				}
			});

	Ext.define('Eventabnormal', {
				extend : 'Ext.data.Model',
				fields : ["ALARM_ID", "ALARM_CODE", "EVENT_NAME",
						"EVENT_LEVEL", "ORG_NO", "ORG_NAME", "CONS_NO",
						"CONS_NAME", "ALARM_SRC", "CONS_TYPE_NAME", "RUN_CAP",
						"FIRST_ALARM_DATE", "ALARM_DATE", "ALARM_CNT",
						"FIRST_RESUME_DATE", "RESUME_DATE", "RESUME_DAY_CNT",
						"TERMINAL_ADDR", "METER_ID", "ASSET_NO", "ALARM_SRC",
						"SAVE_ALARM_DATE"]
			});

	var abnormalInfoStore = Ext.create('Ext.data.Store', {
				model : 'Eventabnormal',
				remoteSort : true,
				pageSize : DEFAULT_PAGE_SIZE,
				buffered : true,
				proxy : {
					type : 'ajax',
					url : 'measureExceptionAnalAction!queryAlarmAnalyseInfo.action',
					reader : {
						type : 'json',
						root : 'resultList',
						totalProperty : 'totalCount'
					}
				}
			});
	var abnormalInfoGrid = Ext.create('Ext.grid.Panel', {
		title : '用电异常事件明细',
		loadMask : true,
		selModel : selectModel,
		region : 'center',
		border : true,
		store : abnormalInfoStore,
		// verticalScrollerType : 'paginggridscroller',
		// invalidateScrollerOnRefresh : false,
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
					renderer : function(value) {
						if (value == "严重") {
							return "<font color='#D4101D';font-weight:bold>严重</font>";
						} else if (value == "重要") {
							return "<font color='#D46B1D';font-weight:bold>重要</font>";
						} else if (value == "较重要") {
							return "<font color='#D1B11A';font-weight:bold>较重要</font>";
						} else if (value == "一般") {
							return "<font color='#026115';font-weight:bold>一般</font>";
						}
					}
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
				}],
		dockedItems : [{
					xtype : 'pagingtoolbar',
					store : abnormalInfoStore,
					dock : 'bottom',
					displayInfo : true
				}]
			// ,
			// listeners : {
			// // itemclick : function(view, record, item, index, e) {
			// select : function(view, record, item, index, e) {
			// queryFileInfoFun(record);
			// queryExceptHisInfo(record);
			// }
			// // queryEleCurveInfo(record);
			//
			// }

	});

	// ---------右上角----------------
	margins = '3 20 3 20';

	Ext.define('EventabnormalCount', {
				extend : 'Ext.data.Model',
				fields : ["EVENT_NAME", "ALARM_CODE", "CNT"]
			});
	var eventCountStore = Ext.create('Ext.data.Store', {
				model : 'EventabnormalCount',
				remoteSort : true,
				proxy : new Ext.data.MemoryProxy()
			});
	var abnormalInfoFormpanel = Ext.create('Ext.grid.Panel', {
		title : '异常信息统计',
		loadMask : true,
		region : 'east',
		width : 300,
		border : true,
		viewConfig : {
			trackOver : false
		},
		store : eventCountStore,
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
							return "<a href='javascript:' onclick='queryExceptInfo(\""
									+ rec.get('ALARM_CODE')
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
				items : [abnormalInfoGrid, abnormalInfoFormpanel]
			});
	var timeParamRadioGroup = Ext.create('Ext.form.Panel', {
				region : 'east',
				bodyStyle : 'padding:10px 0px 10px 10px',
				width : 150,
				items : [{
							xtype : 'radio',
							boxLabel : '执行查询日期',
							name : 'maxPowerRatioRadio',
							checked : true,
							inputValue : 1,
							listeners : {
								check : function(checkbox, checked) {
									if (checked) {

									}
								}
							}
						}, {
							xtype : 'datefield',
							fieldLabel : '',
							width : 100,
							name : 'execQueryDate',
							value : new Date(),
							format : 'Y-m-d',
							margin : '10 20 10 0'
						}, {
							xtype : 'radio',
							boxLabel : '异常发生日期',
							name : 'maxPowerRatioRadio',
							checked : false,
							inputValue : 2,
							listeners : {}
						}, {
							xtype : 'combo',
							name : 'eventDate',
							width : 100,
							// store:orgStore,
							displayField : 'NAME',
							valueField : 'VALUE',
							multiSelect : true,
							// queryMode : 'local',
							margin : '10 20 10 0'
						}]

			});

	// -------------------------右下角-------------------------
	// -------------用电信息--------------
	var appointDate = Ext.create('Ext.Button', {
		text : '查询指定日期数据',
		handler : function() {
			var ss = selectModel.getSelection();
			if (Ext.isEmpty(ss)) {
				Ext.Msg.alert('提示', '请选择异常事件');
				return;
			}
			var appointDateDataInfoPanel1 = Ext.create('Ext.panel.Panel', {
						border : false,
						height : 40,
						region : 'north',
						layout : 'fit',
						items : [{
							margin : '5 0 0 10',
							xtype : 'radiogroup',
							hideLabel : true,
							columns : 2,
							vertical : true,
							id : 'eleInfoAbnormalDateRadiogroup',
							items : [{
								boxLabel : '异常发生日期',
								name : 'rb',
								inputValue : '1',
								checked : true,
								listeners : {
									change : function(t, newValue, oldValue, e) {
										if (newValue == '1') {
											Ext
													.getCmp('eleInfoSingleRadiogroup')
													.setDisabled(false);
											Ext
													.getCmp('eleInfoAbnormalDateField')
													.setDisabled(true);
										} else {
											Ext
													.getCmp('eleInfoSingleRadiogroup')
													.setDisabled(true);
											Ext
													.getCmp('eleInfoAbnormalDateField')
													.setDisabled(false);
										}
									}
								}
							}, {
								boxLabel : '指定查询日期',
								name : 'rb',
								inputValue : '2'
							}]
						}]
					});

			var appointDateDataInfoPanel2 = Ext.create('Ext.panel.Panel', {
				border : false,
				region : 'center',
				layout : 'column',
				items : [{
							columnWidth : .5,
							height : 150,
							margin : '10 10 10 10',
							items : [{
										id : 'eleInfoSingleRadiogroup',
										xtype : 'radiogroup',
										columns : 1,
										vertical : true,
										hideLabel : true,
										layout : 'fit',
										items : []
									}]
						}, {
							columnWidth : .5,
							border : false,
							items : [{
										id : 'eleInfoAbnormalDateField',
										xtype : 'datefield',
										hideLabel : true,
										width : 100,
										value : new Date(),
										format : 'Y-m-d',
										margin : '10 20 10 10',
										disabled : true
									}, {
										xtype : 'button',
										width : 70,
										text : '查询',
										margin : '50 0 0 40',
										handler : function() {
											var cc = Ext
													.getCmp('eleInfoAbnormalDateRadiogroup')
													.getValue();
											if (cc.rb == '1') {
												var dd = Ext
														.getCmp('eleInfoSingleRadiogroup')
														.getValue();
												if (Ext.isEmpty(dd)) {
													Ext.Msg.alert('提示',
															'请选择异常发生日期');
													return;
												}
												queryEleCurveInfo(
														ss[0].get('ALARM_CODE'),
														ss[0].get('METER_ID'),
														dd.dateList, ss[0]
																.get('RUN_CAP'));
											} else {
												queryEleCurveInfo(
														ss[0].get('ALARM_CODE'),
														ss[0].get('METER_ID'),
														Ext
																.getCmp('eleInfoAbnormalDateField')
																.getRawValue(),
														ss[0].get('RUN_CAP'));
											}
											win.close();
										}
									}, {
										xtype : 'button',
										width : 70,
										text : '退出',
										margin : '10 0 0 40',
										handler : function() {
											win.close();
										}
									}]
						}]
			});
			var dateList = ss[0].get('SAVE_ALARM_DATE').split(',', '-1');
			var flag = 1;
			if (dateList.length == 1 && dateList[0] == '') {
				flag = 0;
			}
			if (flag == 1) {
				for (var i = 0; i < dateList.length; i++) {
					var elecDate = dateList[i].replace("/", "-");
					elecDate = elecDate.replace("/", "-");
					if (i == 0) {

						Ext.getCmp('eleInfoSingleRadiogroup').add({
									boxLabel : elecDate,
									name : 'dateList',
									inputValue : elecDate,
									checked : true,
									width : 100
								});
					} else {
						Ext.getCmp('eleInfoSingleRadiogroup').add({
									boxLabel : elecDate,
									name : 'dateList',
									inputValue : elecDate,
									width : 100
								});
					}
				}
			}

			var win = Ext.create('Ext.window.Window', {
						modal : true,
						height : 250,
						width : 300,
						resizable : false,
						title : '切换日期',
						layout : 'border',
						items : [appointDateDataInfoPanel1,
								appointDateDataInfoPanel2]
					});
			win.show();
		}
	});

	var abnormalEleChartPanel = Ext.create('Ext.panel.Panel', {
				// title : '用电信息',
				// layout : 'border',
				// border : true,
				// monitorResize : true,
				// autoScroll : true,
				// items : [picPanel1, timeParamRadioGroup]
				id : 'abnormalEleChartPanelId',
				title : '用电信息',
				layout : 'fit',
				border : false,
				monitorResize : true,
				autoScroll : true,
				tbar : [{
							xtype : 'tbfill'
						}, '-', appointDate],
				items : []
			});

	// ---------电能表事件------------

	Ext.define('EleAbnormalMeterEvent', {
				extend : 'Ext.data.Model',
				fields : ["ALARM_ID", "ALARM_TYPE_CODE", "METER_ID",
						"EVENT_NO", "EVENT_NAME", "ID", "EVENT_TYPE_CODE",
						"TERMINAL_ID", "EVENT_TIME", "REC_TIME"]
			});

	var meterEleMeterEventStore = Ext.create('Ext.data.Store', {
				model : 'EleAbnormalMeterEvent',
				remoteSort : true,
				// pageSize: DEFAULT_PAGE_SIZE,
				buffered : true,
				proxy : {
					type : 'ajax',
					url : 'measureExceptionAnalAction!queryMeterEvent.action',
					reader : {
						type : 'json',
						root : 'resultList'
					}
				}
			});
	var abnormalEleMeterEventPanel = Ext.create('Ext.grid.Panel', {
		title : '电能表事件',
		loadMask : true,
		border : false,
		store : meterEleMeterEventStore,
		viewConfig : {
			trackOver : false
		},
		columnLines : true,
		columns : [{
					text : "表计资产号",
					width : 120,
					dataIndex : 'ASSET_NO',
					align : 'center',
					sortable : true
				}, {
					text : "事件名称",
					width : 120,
					dataIndex : 'EVENT_NAME',
					align : 'center',
					sortable : false
				}, {
					text : "发生时间",
					width : 90,
					dataIndex : 'EVENT_TIME',
					align : 'center',
					sortable : true
				}, {
					text : "接收时间",
					width : 120,
					dataIndex : 'REC_TIME',
					align : 'center',
					sortable : false
				}, {
					text : "明细",
					width : 120,
					align : 'center',
					renderer : function(s, m, rec) {
						return "<a href='javascript:' onclick='queryAlarmMeterEventDetailInfo(\""
								+ rec.get('ID') + "\");'>查看</a>";
					}

				}]
	});
	// --------------终端事件-------------------
	Ext.define('EleAbnormalTmnlEvent', {
				extend : 'Ext.data.Model',
				fields : ["ALARM_ID", "ALARM_TYPE_CODE", "METER_ID",
						"EVENT_NO", "EVENT_NAME", "ID", "EVENT_TYPE_CODE",
						"TERMINAL_ID", "EVENT_TIME", "REC_TIME"]
			});
	var tmnlEleMeterEventStore = Ext.create('Ext.data.Store', {
				model : 'EleAbnormalTmnlEvent',
				remoteSort : true,
				// pageSize: DEFAULT_PAGE_SIZE,
				buffered : true,
				proxy : {
					type : 'ajax',
					url : 'measureExceptionAnalAction!queryMeterEvent.action',
					reader : {
						type : 'json',
						root : 'resultList'
					}
				}
			});
	var abnormalEleTmnlEventPanel = Ext.create('Ext.grid.Panel', {
		title : '终端事件',
		loadMask : true,
		border : false,
		store : tmnlEleMeterEventStore,
		viewConfig : {
			trackOver : false
		},
		columnLines : true,
		columns : [{
					text : "终端资产号",
					width : 120,
					dataIndex : 'TMNL_ASSET_NO',
					align : 'center',
					sortable : true
				}, {
					text : "事件名称",
					width : 120,
					dataIndex : 'EVENT_NAME',
					align : 'center',
					sortable : false
				}, {
					text : "发生时间",
					width : 90,
					dataIndex : 'EVENT_TIME',
					align : 'center',
					sortable : true
				}, {
					text : "接收时间",
					width : 120,
					dataIndex : 'REC_TIME',
					align : 'center',
					sortable : false
				}, {
					text : "明细",
					width : 120,
					align : 'center',
					renderer : function(s, m, rec) {
						return "<a href='javascript:' onclick='queryAlarmTmnlEventDetailInfo(\""
								+ rec.get('ID') + "\");'>查看</a>";
					}

				}]
	});
	// ------------------档案信息-------------------------
	var fileInfoPanel = Ext.create('Ext.form.Panel', {
		// title : '档案',
		layout : 'column',
		bodyStyle : 'padding:5px 0px 10px 5px',
		items : [{
					columnWidth : .33,
					xtype : 'form',
					border : false,
					// labelAlign : "right",
					// labelWidth : 70,
					items : [{
								xtype : 'label',
								html : "<font size=2px;font-weight:bold>用户信息</font>",
								margin : '5 20 20 100'
							}, {
								xtype : 'textfield',
								id : 'eleAbnormalConsNo',
								fieldLabel : '用户编号',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 70,
								readOnly : true

							}, {
								xtype : 'textfield',
								id : 'eleAbnormalConsName',
								fieldLabel : '用户名称',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 70,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'eleAbnormalVolt',
								fieldLabel : '供电电压',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 70,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'eleAbnormalElecAddr',
								fieldLabel : '用电地址',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 70,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'eleAbnormalRuncap',
								fieldLabel : '运行容量',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 70,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'eleAbnormalTrade',
								fieldLabel : '行业分类',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 70,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'eleAbnormalEleType',
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
								id : 'eleAbnormalTerAddr',
								fieldLabel : '终端地址',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 80,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'eleAbnormalTerAssetNo',
								fieldLabel : '终端资产号',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 80,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'eleAbnormalTerStatus',
								fieldLabel : '终端状态',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 80,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'eleAbnormalTerProlCode',
								fieldLabel : '终端规约',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 80,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'eleAbnormalTerType',
								fieldLabel : '终端类别',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 80,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'eleAbnormalTerCollMode',
								fieldLabel : '采集方式',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 80,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'eleAbnormalTerFactory',
								fieldLabel : '终端厂商',
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
								id : 'eleAbnormalMeterAssetNo',
								fieldLabel : '电能表资产号',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 80,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'eleAbnormalMeterCpt',
								fieldLabel : '综合倍率',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 80,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'eleAbnormalMeterProl',
								fieldLabel : '通讯规约',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 80,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'eleAbnormalMeterMp',
								fieldLabel : '计量点性质',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 80,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'eleAbnormalMeterEffect',
								fieldLabel : '主用途类型',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 80,
								hidden : true,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'eleAbnormalMeterVolt',
								fieldLabel : '电压等级',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 80,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'eleAbnormalMeterWirMode',
								fieldLabel : '接线方式',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 80,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'eleAbnormalMeterMeaMode',
								fieldLabel : '计量方式',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 80,
								readOnly : true
							}]

				}]
	});
	var abnormalEleFilePanel = Ext.create('Ext.panel.Panel', {
				title : '档案信息',
				id : 'abnormalEleFilePanelId',
				border : true,
				layout : 'fit',
				monitorResize : true,
				autoScroll : true,
				items : [fileInfoPanel]
			});

	// ------------异常历史信息------------------
	var hisSelectModel = Ext.create('Ext.selection.CheckboxModel');
	Ext.define('EleAbnormalHisInfoModel', {
				extend : 'Ext.data.Model',
				fields : ["CONS_NO", "ALARM_ID", "ALARM_CODE", "EVENT_NAME",
						"EVENT_LEVEL", "FIRST_ALARM_DATE", "ALARM_DATE",
						"ALARM_CNT", "FIRST_RESUME_DATE", "RESUME_DATE",
						"RESUME_DAY_CNT", "ALARM_SRC", "METER_ASSET_NO"]
			});
	var abnormalEleHisStore = Ext.create('Ext.data.Store', {
				model : 'EleAbnormalHisInfoModel',
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
						}, '->', {
							xtype : 'datefield',
							fieldLabel : '开始日期',
							id : 'eleHisQuerySdate',
							// value : new Date().add(Date.MONTH,-3),
							value : new Date(),
							format : 'Y-m-d'
						}, {
							xtype : 'datefield',
							fieldLabel : '结束日期',
							id : 'eleHisQueryEdate',
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
									queryExceptHisInfo(sConsNo, sAlarmCode);
								}
							}
						}

				],
				// verticalScrollerType : 'paginggridscroller',
				// invalidateScrollerOnRefresh : false,
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
							text : "电能表资产号",
							width : 120,
							dataIndex : 'METER_ASSET_NO',
							align : 'center',
							sortable : false
						}],
				dockedItems : [{
							xtype : 'pagingtoolbar',
							store : abnormalEleHisStore,
							dock : 'bottom',
							displayInfo : true
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
				region : 'center',
				activeTab : 0,
				defaults : {
					bodyPandding : 10
				},
				items : [abnormalEleChartPanel, abnormalEleMeterEventPanel,
						abnormalEleTmnlEventPanel, abnormalEleFilePanel,
						abnormalEleHistoryPanel]
			})

	// ------------右下角查询条件panel------------------
	Ext.define('EleAbnormalOrgSt', {
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
		model : 'EleAbnormalOrgSt',
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
				callback : function(records, operation, success) {
					Ext.getCmp('eleAbnolOrgValue').setValue('34101');
				}
			});
	Ext.define('EleAbnormalEventSt', {
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
				model : 'EleAbnormalEventSt',
				proxy : {
					type : 'ajax',
					url : 'eleAbnormalAnalyAction!queryEventLevelList.action',
					reader : {
						root : 'eventList',
						type : 'json'
					}
				},
				autoLoad : true
			});
	eventLevelStore.load({
				callback : function(records, operation, success) {
					Ext.getCmp('eleAbnolEventValue').setValue('01');
				}
			});
	Ext.define('EleFlowStatusCodeModel', {
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
				model : 'EleFlowStatusCodeModel',
				data : [{
							flowStatusCodeValue : '0',
							flowStatusCodeName : '持续关注'
						}, {
							flowStatusCodeValue : '1',
							flowStatusCodeName : '新异常'
						}]
			});
	Ext.define('EleConsTypeModel', {
				extend : 'Ext.data.Model',
				fields : [{
							name : 'CONS_TYPE',
							type : 'string'
						}, {
							name : 'CONS_TYPE_NAME',
							type : 'string'
						}]
			});
	var eleConsTypeStore = Ext.create('Ext.data.Store', {
				model : 'EleConsTypeModel',
				proxy : {
					type : 'ajax',
					url : 'eleAbnormalAnalyAction!queryConsTypeList.action',
					reader : {
						root : 'consTypeList',
						type : 'json'
					}
				},
				autoLoad : true
			});
	eleConsTypeStore.load({
				callback : function(records, operation, success) {
					Ext.getCmp('eleAbnolConsType').setValue('0');
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
							name : 'eleAbnolOrgValue',
							id : 'eleAbnolOrgValue',
							queryMode : 'local',
							store : orgStore,
							displayField : 'ORG_NAME',
							valueField : 'ORG_NO',
							emptyText : '----请输入----',
							blankText : '----请输入----',
							margin : '10 20 10 10'
						}, {
							xtype : 'combo',
							fieldLabel : '事件等级',
							name : 'eleAbnolEventValue',
							id : 'eleAbnolEventValue',
							store : eventLevelStore,
							displayField : 'EVENT_LEVEL_NAME',
							valueField : 'EVENT_LEVEL',
							emptyText : '----请输入----',
							blankText : '----请输入----',
							margin : '10 20 10 10'
						}, {
							xtype : 'combo',
							fieldLabel : '事件状态',
							name : 'flowStatusCode',
							id : 'flowStatusCode',
							store : flowStatusCodeStore,
							queryMode : 'local',
							displayField : 'flowStatusCodeName',
							valueField : 'flowStatusCodeValue',
							value : '1',
							margin : '10 20 10 10'
						}, {
							xtype : 'datefield',
							fieldLabel : '查询日期',
							name : 'queryDate',
							id : 'eleAbnolQueryDate',
							value : new Date(),
							format : 'Y-m-d',
							hidden : true,
							margin : '10 20 10 10'
						}, {
							xtype : 'combo',
							fieldLabel : '用户类别',
							name : 'eleAbnolConsType',
							id : 'eleAbnolConsType',
							queryMode : 'local',
							store : eleConsTypeStore,
							displayField : 'CONS_TYPE_NAME',
							valueField : 'CONS_TYPE',
							emptyText : '----请输入----',
							blankText : '----请输入----',
							margin : '10 20 10 10'

						}, {
							xtype : 'textfield',
							fieldLabel : '用户编号',
							name : 'eleAbnolConsNo',
							id : 'eleAbnolConsNo',
							emptyText : '----请输入----',
							blankText : '----请输入----',
							margin : '10 20 10 10'

						}, {
							xtype : 'textfield',
							fieldLabel : '终端地址',
							name : 'eleAbnolTerminalAddr',
							id : 'eleAbnolTerminalAddr',
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
								// queryEleCurveInfo('0011A');
							}
						}]

			});
	var bottom_panel = Ext.create('Ext.panel.Panel', {
				border : true,
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
		Ext.getCmp("eleAbnormalConsNo").setValue(staTotalList[0].CONS_NO);
		Ext.getCmp("eleAbnormalConsName").setValue(staTotalList[0].CONS_NAME);
		Ext.getCmp("eleAbnormalVolt").setValue(staTotalList[0].VOLT);
		Ext.getCmp("eleAbnormalElecAddr").setValue(staTotalList[0].ELEC_ADDR);
		Ext.getCmp("eleAbnormalRuncap").setValue(staTotalList[0].RUN_CAP);
		Ext.getCmp("eleAbnormalTrade").setValue(staTotalList[0].TRADE_NAME);
		Ext.getCmp("eleAbnormalEleType").setValue(staTotalList[0].ELEC_TYPE);
		// ----终端的----
		Ext.getCmp("eleAbnormalTerAddr")
				.setValue(staTotalList[0].TERMINAL_ADDR);
		Ext.getCmp("eleAbnormalTerAssetNo")
				.setValue(staTotalList[0].TMNL_ASSET_NO);
		Ext.getCmp("eleAbnormalTerStatus")
				.setValue(staTotalList[0].STATUS_NAME);
		Ext.getCmp("eleAbnormalTerProlCode")
				.setValue(staTotalList[0].PROTOCOL_NAME);
		Ext.getCmp("eleAbnormalTerType").setValue(staTotalList[0].TMNL_TYPE);
		Ext.getCmp("eleAbnormalTerCollMode")
				.setValue(staTotalList[0].COLL_MODE_NAME);
		Ext.getCmp("eleAbnormalTerFactory")
				.setValue(staTotalList[0].FACTORY_NAME);
		// -----电表的----

		Ext.getCmp("eleAbnormalMeterAssetNo")
				.setValue(staTotalList[0].ASSET_NO);
		Ext.getCmp("eleAbnormalMeterCpt").setValue(staTotalList[0].T_FACTOR);
		Ext.getCmp("eleAbnormalMeterProl").setValue(staTotalList[0].COMM_MODE);
		Ext.getCmp("eleAbnormalMeterMp").setValue(staTotalList[0].MP_ATTR_NAME);
		Ext.getCmp("eleAbnormalMeterEffect")
				.setValue(staTotalList[0].USAGE_TYPE_NAME);
		Ext.getCmp("eleAbnormalMeterVolt").setValue(staTotalList[0].VOLT_CODE);
		Ext.getCmp("eleAbnormalMeterWirMode")
				.setValue(staTotalList[0].WIRING_MODE_NAME);
		Ext.getCmp("eleAbnormalMeterMeaMode")
				.setValue(staTotalList[0].MEAS_MODE);

	}

	// -----查询异常统计信息
	function queryEleAbnormalInfoFun() {
		var orgNo = Ext.getCmp("eleAbnolOrgValue").getValue();
		var eventLevel = Ext.getCmp("eleAbnolEventValue").getValue();
		var queryDate = Ext.getCmp("eleAbnolQueryDate").getRawValue();
		var consNo = Ext.getCmp("eleAbnolConsNo").getValue();
		var terminalAddr = Ext.getCmp("eleAbnolTerminalAddr").getValue();
		var flowStatusCode = Ext.getCmp("flowStatusCode").getValue();
		var consType = Ext.getCmp("eleAbnolConsType").getValue();
		gOrgNo = Ext.getCmp("eleAbnolOrgValue").getValue();
		gEventLevel = Ext.getCmp("eleAbnolEventValue").getValue();
		gQueryDate = Ext.getCmp("eleAbnolQueryDate").getRawValue();
		gConsNo = Ext.getCmp("eleAbnolConsNo").getValue();
		gTerminalAddr = Ext.getCmp("eleAbnolTerminalAddr").getValue();
		gFlowStatusCode = Ext.getCmp("flowStatusCode").getValue();
		gConsType = Ext.getCmp("eleAbnolConsType").getValue();
		if (Ext.isEmpty(orgNo)) {
			Ext.Msg.alert("提示", "请选择供电单位！");
			return;
		}
		if (Ext.isEmpty(eventLevel)) {
			Ext.Msg.alert("提示", "事件等级！");
			return;
		}
		eventCountStore.removeAll();
		abnormalInfoStore.removeAll();
		var queryItems = {};
		Ext.Ajax.request({
					url : 'eleAbnormalAnalyAction!queryEleAbnormalTotalList.action',
					params : {
						'queryItems.alarmType' : alarm_type,
						'queryItems.orgNo' : orgNo,
						'queryItems.eventLevel' : eventLevel,
						'queryItems.queryDate' : queryDate,
						'queryItems.consNo' : consNo,
						'queryItems.terminalAddr' : terminalAddr,
						'queryItems.flowStatusCode' : flowStatusCode,
						'queryItems.consType' : consType
					},
					success : function(response) {
						var result = Ext.decode(response.responseText);
						var staTotalList = result.eleStattisTotalList;
						if (!Ext.isEmpty(staTotalList)) {
							eventCountStore.loadData(staTotalList);
						}
					},
					failure : function(response) {
						Ext.Msg.alert('提示', '查询异常统计信息失败');
					}

				});

		queryExceptInfo('');

	}

	renderModel(totalPanel, "用电异常分析");

	// ---查询用电异常信息------
	queryExceptInfo = function(alarmCode) {
		var queryItems = {};
		// abnormalInfoStore.proxy.extraParams = {
		// 'queryItems.orgNo' : gOrgNo,
		// 'queryItems.eventLevel' : gEventLevel,
		// 'queryItems.queryDate' : gQueryDate,
		// 'queryItems.consNo' : gConsNo,
		// 'queryItems.terminalAddr' : gTerminalAddr,
		// 'queryItems.alarmType' : alarm_type,
		// 'queryItems.alarmCode' : alarmCode
		// };
		// abnormalInfoStore.load({
		// params : {
		abnormalInfoStore.proxy.extraParams = {
			'queryItems.orgNo' : gOrgNo,
			'queryItems.eventLevel' : gEventLevel,
			'queryItems.queryDate' : gQueryDate,
			'queryItems.consNo' : gConsNo,
			'queryItems.terminalAddr' : gTerminalAddr,
			'queryItems.alarmType' : alarm_type,
			'queryItems.alarmCode' : alarmCode,
			'queryItems.flowStatusCode' : gFlowStatusCode,
			'queryItems.consType' : gConsType
		}
		// });
		// abnormalInfoStore.guaranteeRange(0, DEFAULT_PAGE_SIZE - 1);
		abnormalInfoStore.currentPage = 1;
		abnormalInfoStore.load({
					start : 0
				});

	}
	// -------查询异常历史信息-------------------
	function queryExceptHisInfo(consNo, alarmCode) {
		var queryItems = {};
		// abnormalEleHisStore.load({
		// params : {
		abnormalEleHisStore.proxy.extraParams = {
			'queryItems.alarmType' : alarm_type,
			'queryItems.consNo' : consNo,
			'queryItems.querySdate' : Ext.getCmp("eleHisQuerySdate")
					.getRawValue(),
			'queryItems.queryEdate' : Ext.getCmp("eleHisQueryEdate")
					.getRawValue(),
			'queryItems.alarmCode' : alarmCode
		}
		// });
		// abnormalEleHisStore.guaranteeRange(0, DEFAULT_PAGE_SIZE - 1);
		abnormalEleHisStore.currentPage = 1;
		abnormalEleHisStore.load({
					start : 0
				});
	}

	// ---曲线例子-------------------------------
	// function examplesCurve() {
	// Ext.getCmp('abnormalEleChartPanelId').removeAll();
	// // var lineData = [{
	// // name : '09-01',
	// // data : 10,
	// // data1 : ''
	// // }, {
	// // name : '09-02',
	// // data : '',
	// // data1 : 30
	// // }, {
	// // name : '09-03',
	// // data : 18,
	// // data1 : 20
	// // }, {
	// // name : '09-04',
	// // data : 34,
	// // data1 : 28
	// // }, {
	// // name : '09-05',
	// // data : 35,
	// // data1 : 34
	// // }, {
	// // name : '09-06',
	// // data : 80,
	// // data1 : 85
	// // }];
	// // var lineStore = Ext.create('Ext.data.JsonStore', {
	// // fields : ['name', 'data'],
	// // data : lineData
	// // });
	// Ext.define('LineRequire', {
	// extend : 'Ext.data.Model',
	// fields : ["DATA_DATE", "PAP_DEMAND"]
	// });
	//
	// var lineStore = Ext.create('Ext.data.Store', {
	// model : 'LineRequire',
	// remoteSort : true,
	// proxy : new Ext.data.MemoryProxy()
	// });
	// var bMeterRequiretGridPanel = Ext.create('Ext.grid.Panel', {
	// height : 300,
	// width : Ext.getCmp('abnormalEleChartPanelId').getWidth(),
	// loadMask : true,
	// border : false,
	// store : lineStore,
	// viewConfig : {
	// trackOver : false
	// },
	// columnLines : true,
	// columns : [{
	// text : "时间",
	// width : 120,
	// dataIndex : 'DATA_DATE',
	// align : 'center',
	// sortable : true
	// }, {
	// text : "正向有功总需量",
	// width : 120,
	// dataIndex : 'PAP_DEMAND',
	// align : 'center',
	// sortable : false
	// }]
	//
	// });
	//
	// lineStore.removeAll();
	// Ext.getCmp('abnormalEleChartPanelId').getEl().mask('正在查询...');
	// Ext.Ajax.request({
	// url : 'eleAbnormalAnalyAction!queryMeterDemandInfo.action',
	// params : {
	// 'queryItems.meterId' : '999951131212',
	// 'queryItems.dataTime' : '2012-11-14'
	// },
	// success : function(response) {
	// var result = Ext.decode(response.responseText);
	// var resultList = result.resultList;
	// if (!Ext.isEmpty(resultList)) {
	// lineStore.loadData(resultList);
	// var lineChart = Ext.create('Ext.chart.Chart', {
	// width : 100,
	// height : 100,
	// animate : true,
	// store : lineStore,
	// legend : {
	// position : 'bottom'
	// },
	// axes : [{
	// type : 'Numeric',
	// position : 'left',
	// fields : ['PAP_DEMAND'],
	// title : '正向有功需量',
	// minorTickSteps : 2
	// }, {
	// type : 'Category',
	// position : 'bottom',
	// fields : ['DATA_DATE'],
	// title : '时间'
	// }],
	// theme : 'Red',
	// series : [{
	// type : 'line',
	// axis : 'left',
	// highlight : {
	// size : 7,
	// radius : 7
	// },
	// xField : 'DATA_DATE',
	// yField : 'PAP_DEMAND',
	// tips : {
	// trackMouse : true,
	// width : 80,
	// height : 40,
	// renderer : function(storeItem, item) {
	// this.setTitle(storeItem
	// .get('DATA_DATE')
	// + '<br/>'
	// + storeItem
	// .get('PAP_DEMAND'));
	// }
	// },
	// style : {
	// fill : '#38B8BF',
	// stroke : '#38B8BF',
	// 'stroke-width' : 3
	// },
	// markerConfig : {
	// // type:'cross',
	// type : 'circle',
	// size : 4,
	// radius : 4,
	// 'stroke-width' : 0
	//
	// }
	// }]
	//
	// });
	//
	// var linePanel = Ext.create('widget.panel', {
	// width : Ext.getCmp('abnormalEleChartPanelId')
	// .getWidth(),
	// height : 300,
	// // title : 'Ext Line Example',
	// renderTo : Ext.getBody(),
	// layout : 'fit',
	// items : [lineChart]
	// })
	// Ext.getCmp('abnormalEleChartPanelId').add(linePanel);
	// Ext.getCmp('abnormalEleChartPanelId')
	// .add(bMeterRequiretGridPanel);
	// }
	// Ext.getCmp('abnormalEleChartPanelId').doLayout();
	// Ext.getCmp('abnormalEleChartPanelId').getEl().unmask();
	// },
	// failure : function(response) {
	// Ext.Msg.alert('提示', '查询需量信息失败');
	// Ext.getCmp('abnormalEleChartPanelId').getEl().unmask();
	// }
	// });
	// }
	// ------------曲线数据----------------
	// function queryEleCurveInfo1(alarmCode, meterId, alarmDate, runCap) {
	// Ext.getCmp('abnormalEleChartPanelId').removeAll();
	// if (alarmCode == '00111' || alarmCode == '00112'
	// || alarmCode == '00113') {// ---电流异常分析
	//
	// Ext.define('BLPhase', {
	// extend : 'Ext.data.Model',
	// fields : ["DATA_TIME", 'SHOW_TIME', "UA", "UB", "UC",
	// "IA", "IB", "IC"]
	// });
	// var bLPhaseStore = Ext.create('Ext.data.Store', {
	// model : 'BLPhase',
	// remoteSort : true,
	// proxy : new Ext.data.MemoryProxy()
	// });
	// var bLPhaseGridPanel = Ext.create('Ext.grid.Panel', {
	// height : 300,
	// width : Ext.getCmp('abnormalEleChartPanelId')
	// .getWidth(),
	// loadMask : true,
	// border : false,
	// store : bLPhaseStore,
	// viewConfig : {
	// trackOver : false
	// },
	// columnLines : true,
	// columns : [{
	// text : "时间",
	// width : 120,
	// dataIndex : 'DATA_TIME',
	// align : 'center',
	// sortable : true
	// }, {
	// text : "A相电流",
	// width : 120,
	// dataIndex : 'IA',
	// align : 'center',
	// sortable : false
	// }, {
	// text : "B相电流",
	// width : 100,
	// dataIndex : 'IB',
	// align : 'center',
	// sortable : false
	// }, {
	// text : "C相电流",
	// width : 120,
	// dataIndex : 'IC',
	// align : 'center',
	// sortable : false
	// }, {
	// text : "A相电压",
	// width : 120,
	// dataIndex : 'UA',
	// align : 'center',
	// sortable : false
	// }, {
	// text : "B相电压",
	// width : 90,
	// dataIndex : 'UB',
	// align : 'center',
	// sortable : true
	// }, {
	// text : "C相电压",
	// width : 120,
	// dataIndex : 'UC',
	// align : 'center',
	// sortable : false
	// }]
	//
	// });
	// bLPhaseStore.removeAll();
	// Ext.getCmp('abnormalEleChartPanelId').getEl().mask('正在查询...');
	// Ext.Ajax.request({
	// url : 'measureExceptionAnalAction!queryBLPhaseInfo.action',
	// params : {
	// 'queryItems.meterId' : '5141779', // meterId,
	// 'queryItems.dataTime' : '2012-11-13' // alarmDate
	// },
	// success : function(response) {
	// var result = Ext.decode(response.responseText);
	// var resultList = result.resultList;
	// if (!Ext.isEmpty(resultList)) {
	// bLPhaseStore.loadData(resultList);
	// var lineChart = Ext.create('Ext.chart.Chart', {
	// width : 100,
	// height : 100,
	// animate : true,
	// store : bLPhaseStore,
	// legend : {
	// position : 'bottom'
	// },
	// style : 'background:#fff',
	//
	// grid : {
	// odd : {
	// opacity : 1,
	// fill : '#ddd',
	// stroke : '#bbb',
	// 'stroke-width' : 0.5
	// }
	// },
	//
	// axes : [{
	// type : 'Numeric',
	// position : 'left',
	// fields : ['IA', 'IB', 'IC'],
	// title : '电流值',
	// minorTickSteps : 2
	// }, {
	// type : 'Category',
	// position : 'bottom',
	// fields : ['SHOW_TIME'],
	// title : '时间'
	// }],
	// theme : 'Category1',
	// // theme : 'Red',
	// series : [{
	// type : 'line',
	// axis : 'left',
	// highlight : {
	// size : 7,
	// radius : 7
	// },
	// xField : 'DATA_TIME',
	// yField : 'IA',
	// tips : {
	// trackMouse : true,
	// width : 80,
	// height : 40,
	// renderer : function(storeItem, item) {
	// this.setTitle(storeItem
	// .get('DATA_TIME')
	// + '<br/>'
	// + storeItem.get('IA'));
	// }
	// },
	// style : {
	// fill : '#38B8BF',
	// stroke : '#38B8BF',
	// 'stroke-width' : 3
	// },
	// markerConfig : {
	// // type:'cross',
	// type : 'circle',
	// size : 4,
	// radius : 4,
	// 'stroke-width' : 0
	//
	// }
	// }, {
	//
	// type : 'line',
	// axis : 'left',
	// highlight : {
	// size : 7,
	// radius : 7
	// },
	// xField : 'DATA_TIME',
	// yField : 'IB',
	// tips : {
	// trackMouse : true,
	// width : 80,
	// height : 40,
	// renderer : function(storeItem, item) {
	// this.setTitle(storeItem
	// .get('DATA_TIME')
	// + '<br/>'
	// + storeItem.get('IB'));
	// }
	// },
	// style : {
	// fill : '#A8B8BF',
	// stroke : '#A8B8BF',
	// 'stroke-width' : 3
	// },
	// markerConfig : {
	// // type:'cross',
	// type : 'circle',
	// size : 4,
	// radius : 4,
	// 'stroke-width' : 0
	// }
	// }, {
	//
	// type : 'line',
	// axis : 'left',
	// highlight : {
	// size : 7,
	// radius : 7
	// },
	// xField : 'DATA_TIME',
	// yField : 'IC',
	// tips : {
	// trackMouse : true,
	// width : 80,
	// height : 40,
	// renderer : function(storeItem, item) {
	// this.setTitle(storeItem
	// .get('DATA_TIME')
	// + '<br/>'
	// + storeItem.get('IC'));
	// }
	// },
	// style : {
	// fill : '#E7ED1A',
	// stroke : '#E7ED1A',
	// 'stroke-width' : 3
	// },
	// markerConfig : {
	// // type:'cross',
	// type : 'circle',
	// size : 4,
	// radius : 4,
	// 'stroke-width' : 0
	// }
	//
	// }]
	//
	// });
	//
	// var linePanel = Ext.create('widget.panel', {
	// width : Ext
	// .getCmp('abnormalEleChartPanelId')
	// .getWidth(),
	// height : 300,
	// // title : 'Ext Line Example',
	// renderTo : Ext.getBody(),
	// layout : 'fit',
	// items : [lineChart]
	// })
	// Ext.getCmp('abnormalEleChartPanelId').add(linePanel);
	// Ext.getCmp('abnormalEleChartPanelId')
	// .add(bLPhaseGridPanel);
	// }
	// Ext.getCmp('abnormalEleChartPanelId').doLayout();
	// Ext.getCmp('abnormalEleChartPanelId').getEl().unmask();
	// },
	// failure : function(response) {
	// Ext.Msg.alert('提示', '查询断电流曲线信息失败');
	// Ext.getCmp('abnormalEleChartPanelId').getEl().unmask();
	// }
	//
	// });
	// } else if (alarmCode == '0011A' || alarmCode == '0011B') {
	// Ext.define('BPowerAndEnergy', {
	// extend : 'Ext.data.Model',
	// fields : ["DATA_TIME", "SHOW_TIME", "VIEWPOWER",
	// "FORWARDPOWER", "REVERSEPOWER", "PAP_E",
	// "RAP_E"]
	// });
	// var bPowerAndEnergyStore = Ext.create('Ext.data.Store', {
	// model : 'BPowerAndEnergy',
	// remoteSort : true,
	// proxy : new Ext.data.MemoryProxy()
	// });
	//
	// var bPowerAndEnergyGridPanel = Ext.create('Ext.grid.Panel', {
	// height : 300,
	// width : Ext.getCmp('abnormalEleChartPanelId')
	// .getWidth(),
	// loadMask : true,
	// border : false,
	// store : bPowerAndEnergyStore,
	// viewConfig : {
	// trackOver : false
	// },
	// columnLines : true,
	// columns : [{
	// text : "时间",
	// width : 120,
	// dataIndex : 'DATA_TIME',
	// align : 'center',
	// sortable : true
	// }, {
	// text : "视在功率",
	// width : 120,
	// dataIndex : 'VIEWPOWER',
	// align : 'center',
	// sortable : false
	// }, {
	// text : "正向有功功率",
	// width : 120,
	// dataIndex : 'FORWARDPOWER',
	// align : 'center',
	// sortable : false
	// }, {
	// text : "正向无功功率",
	// width : 120,
	// dataIndex : 'REVERSEPOWER',
	// align : 'center',
	// sortable : false
	// }, {
	// text : "正向有功电量",
	// width : 120,
	// dataIndex : 'PAP_E',
	// align : 'center',
	// sortable : false
	// }, {
	// text : "反向有功电量",
	// width : 120,
	// dataIndex : 'RAP_E',
	// align : 'center',
	// sortable : false
	// }]
	//
	// });
	// bPowerAndEnergyStore.removeAll();
	// Ext.getCmp('abnormalEleChartPanelId').getEl().mask('正在查询...');
	// Ext.Ajax.request({
	// url : 'measureExceptionAnalAction!queryBLPhaseInfo.action',
	// params : {
	// 'queryItems.meterId' : '5141779', // meterId,
	// 'queryItems.dataTime' : '2012-11-13' // alarmDate
	// },
	// success : function(response) {
	// var result = Ext.decode(response.responseText);
	// var resultList = result.resultList;
	// if (!Ext.isEmpty(resultList)) {
	// bPowerAndEnergyStore.loadData(resultList);
	// var lineChart = Ext.create('Ext.chart.Chart', {
	// width : 100,
	// height : 100,
	// animate : true,
	// store : bPowerAndEnergyStore,
	// legend : {
	// position : 'bottom'
	// },
	// style : 'background:#fff',
	//
	// grid : {
	// odd : {
	// opacity : 1,
	// fill : '#ddd',
	// stroke : '#bbb',
	// 'stroke-width' : 0.5
	// }
	// },
	//
	// axes : [{
	// type : 'Numeric',
	// position : 'left',
	// fields : ['FORWARDPOWER',
	// 'REVERSEPOWER'],
	// title : '功率值',
	// minorTickSteps : 2
	// }, {
	// type : 'Category',
	// position : 'bottom',
	// fields : ['SHOW_TIME'],
	// title : '时间'
	// }],
	// theme : 'Category1',
	// // theme : 'Red',
	// series : [{
	// type : 'line',
	// axis : 'left',
	// highlight : {
	// size : 7,
	// radius : 7
	// },
	// xField : 'DATA_TIME',
	// yField : 'FORWARDPOWER',
	// tips : {
	// trackMouse : true,
	// width : 80,
	// height : 40,
	// renderer : function(storeItem, item) {
	// this
	// .setTitle(storeItem
	// .get('DATA_TIME')
	// + '<br/>'
	// + storeItem
	// .get('FORWARDPOWER'));
	// }
	// },
	// style : {
	// fill : '#38B8BF',
	// stroke : '#38B8BF',
	// 'stroke-width' : 3
	// },
	// markerConfig : {
	// // type:'cross',
	// type : 'circle',
	// size : 4,
	// radius : 4,
	// 'stroke-width' : 0
	//
	// }
	// }, {
	//
	// type : 'line',
	// axis : 'left',
	// highlight : {
	// size : 7,
	// radius : 7
	// },
	// xField : 'DATA_TIME',
	// yField : 'REVERSEPOWER',
	// tips : {
	// trackMouse : true,
	// width : 80,
	// height : 40,
	// renderer : function(storeItem, item) {
	// this
	// .setTitle(storeItem
	// .get('DATA_TIME')
	// + '<br/>'
	// + storeItem
	// .get('REVERSEPOWER'));
	// }
	// },
	// style : {
	// fill : '#A8B8BF',
	// stroke : '#A8B8BF',
	// 'stroke-width' : 3
	// },
	// markerConfig : {
	// // type:'cross',
	// type : 'circle',
	// size : 4,
	// radius : 4,
	// 'stroke-width' : 0
	// }
	// }]
	//
	// });
	//
	// var linePanel = Ext.create('widget.panel', {
	// width : Ext
	// .getCmp('abnormalEleChartPanelId')
	// .getWidth(),
	// height : 280,
	// renderTo : Ext.getBody(),
	// layout : 'fit',
	// items : [lineChart]
	// })
	//
	// var lineChart1 = Ext.create('Ext.chart.Chart', {
	// width : 100,
	// height : 100,
	// animate : true,
	// store : bPowerAndEnergyStore,
	// legend : {
	// position : 'bottom'
	// },
	// style : 'background:#fff',
	//
	// grid : {
	// odd : {
	// opacity : 1,
	// fill : '#ddd',
	// stroke : '#bbb',
	// 'stroke-width' : 0.5
	// }
	// },
	// axes : [{
	// type : 'Numeric',
	// position : 'left',
	// fields : ['FORWARDPOWER',
	// 'REVERSEPOWER'],
	// title : '需量值',
	// minorTickSteps : 2
	// }, {
	// type : 'Category',
	// position : 'bottom',
	// fields : ['SHOW_TIME'],
	// title : '时间'
	// }],
	// theme : 'Category1',
	// series : [{
	// type : 'line',
	// axis : 'left',
	// highlight : {
	// size : 7,
	// radius : 7
	// },
	// xField : 'DATA_TIME',
	// yField : 'FORWARDPOWER',
	// tips : {
	// trackMouse : true,
	// width : 80,
	// height : 40,
	// renderer : function(storeItem, item) {
	// this
	// .setTitle(storeItem
	// .get('DATA_TIME')
	// + '<br/>'
	// + storeItem
	// .get('FORWARDPOWER'));
	// }
	// },
	// style : {
	// fill : '#38B8BF',
	// stroke : '#38B8BF',
	// 'stroke-width' : 3
	// },
	// markerConfig : {
	// // type:'cross',
	// type : 'circle',
	// size : 4,
	// radius : 4,
	// 'stroke-width' : 0
	//
	// }
	// }, {
	//
	// type : 'line',
	// axis : 'left',
	// highlight : {
	// size : 7,
	// radius : 7
	// },
	// xField : 'DATA_TIME',
	// yField : 'REVERSEPOWER',
	// tips : {
	// trackMouse : true,
	// width : 80,
	// height : 40,
	// renderer : function(storeItem, item) {
	// this
	// .setTitle(storeItem
	// .get('DATA_TIME')
	// + '<br/>'
	// + storeItem
	// .get('REVERSEPOWER'));
	// }
	// },
	// style : {
	// fill : '#A8B8BF',
	// stroke : '#A8B8BF',
	// 'stroke-width' : 3
	// },
	// markerConfig : {
	// // type:'cross',
	// type : 'circle',
	// size : 4,
	// radius : 4,
	// 'stroke-width' : 0
	// }
	// }]
	//
	// });
	//
	// var linePanel1 = Ext.create('widget.panel', {
	// width : Ext
	// .getCmp('abnormalEleChartPanelId')
	// .getWidth(),
	// height : 300,
	// renderTo : Ext.getBody(),
	// layout : 'fit',
	// items : [lineChart1]
	// })
	// var radioPanel = Ext.create('Ext.form.Panel', {
	// height : 20,
	// border : true,
	// bodyPadding: 10,
	// items : [{
	// xtype : 'radiogroup',
	// columns: 2,
	// vertical: true,
	// items : [{
	// boxLabel : '曲线',
	// name : 'curve_Radio',
	// checked : true,
	// inputValue : 1,
	// listeners : {
	// click: {
	// element: 'el',
	// fn: function(){picAndDataPanel.layout.setActiveItem(0); }
	// }
	// }
	// },{
	// boxLabel : '数据',
	// name : 'curve_Radio',
	// checked : false,
	// inputValue : 2,
	// listeners : {
	// click: {
	// element: 'el',
	// fn: function(){picAndDataPanel.layout.setActiveItem(1); }
	// }
	// }
	// }]
	// }]
	//
	// });
	//
	// var picturePanel = Ext.create('Ext.panel.Panel', {
	// layout:'fit',
	// autoScroll:true,
	// border : false,
	// height:240
	// });
	// picturePanel.add(linePanel);
	// picturePanel.add(linePanel1);
	// var picAndDataPanel = Ext.create('Ext.panel.Panel', {
	// region:'center',
	// layout : 'card',
	// activeItem : 0,
	// items : [picturePanel,
	// bPowerAndEnergyGridPanel]
	// });
	//								
	// Ext.getCmp('abnormalEleChartPanelId')
	// .add(radioPanel);
	//						
	// Ext.getCmp('abnormalEleChartPanelId')
	// .add(picAndDataPanel);
	// // northPanel.add(radioPanel);
	// // centerPanel.add(picAndDataPanel);
	// //
	// // Ext.getCmp('abnormalEleChartPanelId').add(linePanel);
	// // Ext.getCmp('abnormalEleChartPanelId').add(linePanel1);
	// // Ext.getCmp('abnormalEleChartPanelId')
	// // .add(bPowerAndEnergyGridPanel);
	// }
	// Ext.getCmp('abnormalEleChartPanelId').doLayout();
	// Ext.getCmp('abnormalEleChartPanelId').getEl().unmask();
	// },
	// failure : function(response) {
	// Ext.Msg.alert('提示', '查询断电流曲线信息失败');
	// Ext.getCmp('abnormalEleChartPanelId').getEl().unmask();
	// }
	//
	// });
	//
	// }
	// }

	// --------------查询用电信息曲线数据----------
	function queryEleCurveInfo(alarmCode, meterId, alarmDate, runCap) {
		Ext.getCmp('abnormalEleChartPanelId').removeAll();
		if (alarmCode == '00111' || alarmCode == '00112'
				|| alarmCode == '00113') {// ---电流异常分析

			Ext.define('EleBLPhase', {
						extend : 'Ext.data.Model',
						fields : ["DATA_TIME", "UA", "UB", "UC", "IA", "IB",
								"IC"]
					});
			var bLPhaseStore = Ext.create('Ext.data.Store', {
						model : 'EleBLPhase',
						remoteSort : true,
						proxy : new Ext.data.MemoryProxy()
					});
			var bLPhaseGridPanel = Ext.create('Ext.grid.Panel', {
						height : 300,
						width : Ext.getCmp('abnormalEleChartPanelId')
								.getWidth(),
						loadMask : true,
						border : false,
						store : bLPhaseStore,
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
									text : "A相电流",
									width : 120,
									dataIndex : 'IA',
									align : 'center',
									sortable : false
								}, {
									text : "B相电流",
									width : 100,
									dataIndex : 'IB',
									align : 'center',
									sortable : false
								}, {
									text : "C相电流",
									width : 120,
									dataIndex : 'IC',
									align : 'center',
									sortable : false
								}, {
									text : "A相电压",
									width : 120,
									dataIndex : 'UA',
									align : 'center',
									sortable : false
								}, {
									text : "B相电压",
									width : 90,
									dataIndex : 'UB',
									align : 'center',
									sortable : true
								}, {
									text : "C相电压",
									width : 120,
									dataIndex : 'UC',
									align : 'center',
									sortable : false
								}]

					});
			bLPhaseStore.removeAll();
			Ext.getCmp('abnormalEleChartPanelId').getEl().mask('正在查询...');
			Ext.Ajax.request({
				url : 'measureExceptionAnalAction!queryBLPhaseInfo.action',
				params : {
					'queryItems.meterId' : meterId,
					'queryItems.dataTime' : alarmDate
				},
				success : function(response) {
					var result = Ext.decode(response.responseText);
					var resultList = result.resultList;
					if (!Ext.isEmpty(resultList)) {
						bLPhaseStore.loadData(resultList);
						var abnormalEleChartFitPanelId2 = Ext.create(
								'Ext.panel.Panel', {
									id : 'abnormalEleChartFitPanelId2',
									border : false,
									height : 300,
									width : Ext
											.getCmp('abnormalEleChartPanelId')
											.getWidth(),
									renderTo : Ext.getBody()
								});
						var xmlData2 = "<graph caption='电流曲线图' xAxisName='时间' yAxisName='电流' labelDisplay = 'WRAP' anchorRadius='3' decimalPrecision='0' formatNumberScale='0' bgcolor='F3f3f3' bgAlpha='70' numvdivlines='5' showValues='0' divLineColor='CC3300' divLineIsDashed='1' chartRightMargin='50' labelStep='8'>";
						xmlData2 += "<categories>";
						for (var i = 0; i < resultList.length; i++) {
							xmlData2 += "<category name='"
									+ resultList[i]['DATA_TIME'].substring(10,
											16) + "'  />";
						}
						xmlData2 += "</categories>";
						xmlData2 += "<dataset seriesName='A相' color='#E7ED1A' anchorBorderColor='#E7ED1A' anchorBgColor='#E7ED1A'>";
						var temp = resultList[0]['IA'];
						if (Ext.isEmpty(temp)) {
							temp = 0;
						}
						xmlData2 += "<set value='" + temp + "' />";
						for (var i = 1; i < resultList.length; i++) {
							if (Ext.isEmpty(resultList[i]['IA'])) {
								xmlData2 += "<set value='" + temp + "' />";
							} else {
								xmlData2 += "<set value='"
										+ resultList[i]['IA'] + "' />";
								temp = resultList[i]['IA'];
							}
						}
						xmlData2 += "</dataset>";
						xmlData2 += "<dataset seriesName='B相' color='#3BC71A' anchorBorderColor='#3BC71A' anchorBgColor='#3BC71A'>";
						var temp = resultList[0]['IB'];
						if (Ext.isEmpty(temp)) {
							temp = 0;
						}
						xmlData2 += "<set value='" + temp + "' />";
						for (var i = 1; i < resultList.length; i++) {
							if (Ext.isEmpty(resultList[i]['IB'])) {
								xmlData2 += "<set value='" + temp + "' />";
							} else {
								xmlData2 += "<set value='"
										+ resultList[i]['IB'] + "' />";
								temp = resultList[i]['IB'];
							}
						}
						xmlData2 += "</dataset>";
						xmlData2 += "<dataset seriesName='C相' color='#BF1515' anchorBorderColor='#BF1515' anchorBgColor='#BF1515'>";
						var temp = resultList[0]['IC'];
						if (Ext.isEmpty(temp)) {
							temp = 0;
						}
						xmlData2 += "<set value='" + temp + "' />";
						for (var i = 1; i < resultList.length; i++) {
							if (Ext.isEmpty(resultList[i]['IC'])) {
								xmlData2 += "<set value='" + temp + "' />";
							} else {
								xmlData2 += "<set value='"
										+ resultList[i]['IC'] + "' />";
								temp = resultList[i]['IC'];
							}
						}
						xmlData2 += "</dataset></graph>";
						var picCharts2 = new FusionCharts(
								"./FusionCharts-new/MSLine.swf",
								"eleAbnormalPicCharts2", Ext
										.getCmp('abnormalEleChartPanelId')
										.getWidth(), 300);
						picCharts2.setDataXML(xmlData2);
						picCharts2.render("abnormalEleChartFitPanelId2");

						Ext.getCmp('abnormalEleChartPanelId')
								.add(abnormalEleChartFitPanelId2);

					}

					Ext.getCmp('abnormalEleChartPanelId').add(bLPhaseGridPanel);

					Ext.getCmp('abnormalEleChartPanelId').doLayout();
					Ext.getCmp('abnormalEleChartPanelId').getEl().unmask();
				},
				failure : function(response) {
					Ext.Msg.alert('提示', '查询断电流曲线信息失败');
					Ext.getCmp('abnormalEleChartPanelId').getEl().unmask();
				}

			});

		} else if (alarmCode == '00110' || alarmCode == '00117'
				|| alarmCode == '00118') {// ---电压异常分析

			Ext.define('EleBLVolt', {
						extend : 'Ext.data.Model',
						fields : ["DATA_TIME", "UA", "UB", "UC", "IA", "IB",
								"IC"]
					});

			var bLVoltStore = Ext.create('Ext.data.Store', {
						model : 'EleBLVolt',
						remoteSort : true,
						proxy : new Ext.data.MemoryProxy()
					});

			var bLVoltGridPanel = Ext.create('Ext.grid.Panel', {
						height : 300,
						width : Ext.getCmp('abnormalEleChartPanelId')
								.getWidth(),
						loadMask : true,
						border : false,
						store : bLVoltStore,
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
									text : "A相电压",
									width : 120,
									dataIndex : 'UA',
									align : 'center',
									sortable : false
								}, {
									text : "B相电压",
									width : 90,
									dataIndex : 'UB',
									align : 'center',
									sortable : true
								}, {
									text : "C相电压",
									width : 120,
									dataIndex : 'UC',
									align : 'center',
									sortable : false
								}, {
									text : "A相电流",
									width : 120,
									dataIndex : 'IA',
									align : 'center',
									sortable : false
								}, {
									text : "B相电流",
									width : 100,
									dataIndex : 'IB',
									align : 'center',
									sortable : false
								}, {
									text : "C相电流",
									width : 120,
									dataIndex : 'IC',
									align : 'center',
									sortable : false
								}]

					});

			bLVoltStore.removeAll();
			Ext.getCmp('abnormalEleChartPanelId').getEl().mask('正在查询...');
			Ext.Ajax.request({
				url : 'measureExceptionAnalAction!queryBLPhaseInfo.action',
				params : {
					'queryItems.meterId' : meterId,
					'queryItems.dataTime' : alarmDate
				},
				success : function(response) {
					var result = Ext.decode(response.responseText);
					var resultList = result.resultList;
					if (!Ext.isEmpty(resultList)) {
						bLVoltStore.loadData(resultList);
						// 生成电压数据
						var abnormalEleChartFitVoltPanel = Ext.create(
								'Ext.panel.Panel', {
									id : 'abnormalEleChartFitVoltPanel',
									border : false,
									height : 300,
									width : Ext
											.getCmp('abnormalEleChartPanelId')
											.getWidth(),
									renderTo : Ext.getBody()
								});
						var xmlData = "<graph caption='电压曲线图' xAxisName='时间' yAxisName='电压' labelDisplay = 'WRAP' anchorRadius='3' decimalPrecision='0' formatNumberScale='0' bgcolor='F3f3f3' bgAlpha='70' numvdivlines='5' showValues='0' divLineColor='CC3300' divLineIsDashed='1' chartRightMargin='50' labelStep='8'>";
						xmlData += "<categories>";
						for (var i = 0; i < resultList.length; i++) {
							xmlData += "<category name='"
									+ resultList[i]['DATA_TIME'].substring(10,
											16) + "'  />";
						}
						xmlData += "</categories>";
						xmlData += "<dataset seriesName='A相'  color='#E7ED1A' anchorBorderColor='#E7ED1A' anchorBgColor='#E7ED1A'>";
						var temp = resultList[0]['UA'];
						if (Ext.isEmpty(temp)) {
							temp = 0;
						}
						xmlData += "<set value='" + temp + "' />";
						for (var i = 1; i < resultList.length; i++) {
							if (Ext.isEmpty(resultList[i]['UA'])) {
								xmlData += "<set value='" + temp + "' />";
							} else {
								xmlData += "<set value='" + resultList[i]['UA']
										+ "' />";
								temp = resultList[i]['UA'];
							}
						}
						xmlData += "</dataset>";
						xmlData += "<dataset seriesName='B相' color='#3BC71A' anchorBorderColor='#3BC71A' anchorBgColor='#3BC71A'>";
						var temp = resultList[0]['UB'];
						if (Ext.isEmpty(temp)) {
							temp = 0;
						}
						xmlData += "<set value='" + temp + "' />";
						for (var i = 1; i < resultList.length; i++) {
							if (Ext.isEmpty(resultList[i]['UB'])) {
								xmlData += "<set value='" + temp + "' />";
							} else {
								xmlData += "<set value='" + resultList[i]['UB']
										+ "' />";
								temp = resultList[i]['UB'];
							}
						}
						xmlData += "</dataset>";
						xmlData += "<dataset seriesName='C相' color='#BF1515' anchorBorderColor='#BF1515' anchorBgColor='#BF1515'>";
						var temp = resultList[0]['UC'];
						if (Ext.isEmpty(temp)) {
							temp = 0;
						}
						xmlData += "<set value='" + temp + "' />";
						for (var i = 1; i < resultList.length; i++) {
							if (Ext.isEmpty(resultList[i]['UC'])) {
								xmlData += "<set value='" + temp + "' />";
							} else {
								xmlData += "<set value='" + resultList[i]['UC']
										+ "' />";
								temp = resultList[i]['UC'];
							}
						}
						xmlData += "</dataset></graph>";

						var picCharts = new FusionCharts(
								"./FusionCharts-new/MSLine.swf",
								"elAabnormalPicVoltCharts", Ext
										.getCmp('abnormalEleChartPanelId')
										.getWidth(), 300);
						picCharts.setDataXML(xmlData);
						picCharts.render("abnormalEleChartFitVoltPanel");

						Ext.getCmp('abnormalEleChartPanelId')
								.add(abnormalEleChartFitVoltPanel);

					}
					Ext.getCmp('abnormalEleChartPanelId').add(bLVoltGridPanel);

					Ext.getCmp('abnormalEleChartPanelId').doLayout();
					Ext.getCmp('abnormalEleChartPanelId').getEl().unmask();
				},
				failure : function(response) {
					Ext.Msg.alert('提示', '查询断电压信息失败');
					Ext.getCmp('abnormalEleChartPanelId').getEl().unmask();
				}

			});

		}

		else if (alarmCode == '00114') {
			// -----需量
			// Ext.define('BMeterRequire', {
			// extend : 'Ext.data.Model',
			// fields : ["DATA_TIME", "VIEWPOWER", "FORWARDPOWER",
			// "REVERSEPOWER"]
			// });
			Ext.define('EleMeterRequire', {
						extend : 'Ext.data.Model',
						fields : ["DATA_DATE", "PAP_DEMAND"]
					});

			var bMeterRequireStore = Ext.create('Ext.data.Store', {
						model : 'EleMeterRequire',
						remoteSort : true,
						proxy : new Ext.data.MemoryProxy()
					});

			var bMeterRequiretGridPanel = Ext.create('Ext.grid.Panel', {
						height : 300,
						width : Ext.getCmp('abnormalEleChartPanelId')
								.getWidth(),
						loadMask : true,
						border : false,
						store : bMeterRequireStore,
						viewConfig : {
							trackOver : false
						},
						columnLines : true,
						columns : [{
									text : "时间",
									width : 120,
									dataIndex : 'DATA_DATE',
									align : 'center',
									sortable : true
								}, {
									text : "正向有功总需量",
									width : 120,
									dataIndex : 'PAP_DEMAND',
									align : 'center',
									sortable : false
								}

						// , {
						// text : "视在功率",
						// width : 120,
						// dataIndex : 'VIEWPOWER',
						// align : 'center',
						// sortable : false
						// }, {
						// text : "正向有功功率",
						// width : 120,
						// dataIndex : 'FORWARDPOWER',
						// align : 'center',
						// sortable : false
						// }, {
						// text : "正向无功功率",
						// width : 120,
						// dataIndex : 'REVERSEPOWER',
						// align : 'center',
						// sortable : false
						// }
						]

					});

			bMeterRequireStore.removeAll();
			Ext.getCmp('abnormalEleChartPanelId').getEl().mask('正在查询...');
			Ext.Ajax.request({
				url : 'eleAbnormalAnalyAction!queryMeterDemandInfo.action',
				params : {
					'queryItems.meterId' : meterId,
					'queryItems.dataTime' : alarmDate
				},
				success : function(response) {
					var result = Ext.decode(response.responseText);
					var resultList = result.resultList;
					if (!Ext.isEmpty(resultList)) {
						bMeterRequireStore.loadData(resultList);
						// 生成电压数据
						var abnormalEleChartFitRequirePanel = Ext.create(
								'Ext.panel.Panel', {
									id : 'abnormalEleChartFitRequirePanel',
									border : false,
									height : 300,
									width : Ext
											.getCmp('abnormalEleChartPanelId')
											.getWidth(),
									renderTo : Ext.getBody()
								});
						var xmlData = "<graph caption='正向有功总需量曲线图' xAxisName='日期' yAxisName='正向有功总需量' labelDisplay = 'WRAP' anchorRadius='3' decimalPrecision='0' formatNumberScale='0' bgcolor='F3f3f3' bgAlpha='70' numvdivlines='5' showValues='0' divLineColor='CC3300' divLineIsDashed='1' chartRightMargin='50' labelStep='1'>";
						xmlData += "<categories>";
						for (var i = 0; i < resultList.length; i++) {
							xmlData += "<category name='"
									+ resultList[i]['DATA_DATE'].substring(5,
											10) + "'  />";
						}
						xmlData += "</categories>";

						xmlData += "<dataset seriesName='正向有功总需量' color='#3BC71A' anchorBorderColor='#3BC71A' anchorBgColor='#3BC71A'>";
						var temp = resultList[0]['PAP_DEMAND'];
						if (Ext.isEmpty(temp)) {
							temp = 0;
						}
						xmlData += "<set value='" + temp + "' />";
						for (var i = 1; i < resultList.length; i++) {
							if (Ext.isEmpty(resultList[i]['PAP_DEMAND'])) {
								xmlData += "<set value='" + temp + "' />";
							} else {
								xmlData += "<set value='"
										+ resultList[i]['PAP_DEMAND'] + "' />";
								temp = resultList[i]['PAP_DEMAND'];
							}

						}
						xmlData += "</dataset>";
						xmlData += " <trendLines> <line startValue='"
								+ runCap
								+ "' color='FF0000' displayvalue='运行容量' />  </trendLines>";
						xmlData += "</graph>";

						var picCharts = new FusionCharts(
								"./FusionCharts-new/MSLine.swf",
								"elAabnormalPicRequireCharts", Ext
										.getCmp('abnormalEleChartPanelId')
										.getWidth(), 300);
						picCharts.setDataXML(xmlData);
						picCharts.render("abnormalEleChartFitRequirePanel");

						Ext.getCmp('abnormalEleChartPanelId')
								.add(abnormalEleChartFitRequirePanel);

					}
					Ext.getCmp('abnormalEleChartPanelId')
							.add(bMeterRequiretGridPanel);

					Ext.getCmp('abnormalEleChartPanelId').doLayout();
					Ext.getCmp('abnormalEleChartPanelId').getEl().unmask();
				},
				failure : function(response) {
					Ext.Msg.alert('提示', '查询正向有功需量信息失败');
					Ext.getCmp('abnormalEleChartPanelId').getEl().unmask();
				}

			});
		} else if (alarmCode == '00115' || alarmCode == '00119') {
			// ---负荷分析
			Ext.define('EleLPower', {
						extend : 'Ext.data.Model',
						fields : ["DATA_TIME", "FORWARDPOWER", "REVERSEPOWER"]
					});
			var bLPowerStore = Ext.create('Ext.data.Store', {
						model : 'EleLPower',
						remoteSort : true,
						proxy : new Ext.data.MemoryProxy()
					});
			var bLPowerGridPanel = Ext.create('Ext.grid.Panel', {
						height : 300,
						width : Ext.getCmp('abnormalEleChartPanelId')
								.getWidth(),
						loadMask : true,
						border : false,
						store : bLPowerStore,
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
									text : "正向有功功率",
									width : 120,
									dataIndex : 'FORWARDPOWER',
									align : 'center',
									sortable : false
								}, {
									text : "正向无功功率",
									width : 120,
									dataIndex : 'REVERSEPOWER',
									align : 'center',
									sortable : false
								}]

					});
			bLPowerStore.removeAll();
			Ext.getCmp('abnormalEleChartPanelId').getEl().mask('正在查询...');
			Ext.Ajax.request({
				url : 'measureExceptionAnalAction!queryBLPhaseInfo.action',
				params : {
					'queryItems.meterId' : meterId,
					'queryItems.dataTime' : alarmDate
				},
				success : function(response) {
					// alert(runCap);
					var result = Ext.decode(response.responseText);
					var resultList = result.resultList;
					if (!Ext.isEmpty(resultList)) {
						bLPowerStore.loadData(resultList);
						var abnormalEleChartFitPowerPanelId = Ext.create(
								'Ext.panel.Panel', {
									id : 'abnormalEleChartFitPowerPanelId',
									border : false,
									height : 300,
									width : Ext
											.getCmp('abnormalEleChartPanelId')
											.getWidth(),
									renderTo : Ext.getBody()
								});
						var xmlData2 = "<graph caption='功率曲线图' xAxisName='时间' yAxisName='功率' labelDisplay = 'WRAP' anchorRadius='3' decimalPrecision='0' formatNumberScale='0' bgcolor='F3f3f3' bgAlpha='70' numvdivlines='5' showValues='0' divLineColor='CC3300' divLineIsDashed='1' chartRightMargin='50' labelStep='8'>";
						xmlData2 += "<categories>";
						for (var i = 0; i < resultList.length; i++) {
							xmlData2 += "<category name='"
									+ resultList[i]['DATA_TIME'].substring(10,
											16) + "'  />";
						}
						xmlData2 += "</categories>";
						xmlData2 += "<dataset seriesName='正向有功功率' color='#E7ED1A' anchorBorderColor='#E7ED1A' anchorBgColor='#E7ED1A'>";

						var temp = resultList[0]['FORWARDPOWER'];
						if (Ext.isEmpty(temp)) {
							temp = 0;
						}
						xmlData2 += "<set value='" + temp + "' />";
						for (var i = 1; i < resultList.length; i++) {
							if (Ext.isEmpty(resultList[i]['FORWARDPOWER'])) {
								xmlData2 += "<set value='" + temp + "' />";
							} else {
								xmlData2 += "<set value='"
										+ resultList[i]['FORWARDPOWER']
										+ "' />";
								temp = resultList[i]['FORWARDPOWER'];
							}
						}
						xmlData2 += "</dataset>";
						xmlData2 += "<dataset seriesName='正向无功功率' color='#3BC71A' anchorBorderColor='#3BC71A' anchorBgColor='#3BC71A'>";
						var temp = resultList[0]['REVERSEPOWER'];
						if (Ext.isEmpty(temp)) {
							temp = 0;
						}
						xmlData2 += "<set value='" + temp + "' />";
						for (var i = 1; i < resultList.length; i++) {
							if (Ext.isEmpty(resultList[i]['REVERSEPOWER'])) {
								xmlData2 += "<set value='" + temp + "' />";
							} else {
								xmlData2 += "<set value='"
										+ resultList[i]['REVERSEPOWER']
										+ "' />";
								temp = resultList[i]['REVERSEPOWER'];
							}
						}
						xmlData2 += "</dataset>";
						xmlData2 += " <trendLines> <line startValue='"
								+ runCap
								+ "' color='FF0000' displayvalue='运行容量' />  </trendLines>";

						xmlData2 += "</graph>";

						var picCharts2 = new FusionCharts(
								"./FusionCharts-new/MSLine.swf",
								"eleAbnormalPicPowerCharts", Ext
										.getCmp('abnormalEleChartPanelId')
										.getWidth(), 300);
						picCharts2.setDataXML(xmlData2);
						picCharts2.render("abnormalEleChartFitPowerPanelId");
						Ext.getCmp('abnormalEleChartPanelId')
								.add(abnormalEleChartFitPowerPanelId);

					}

					Ext.getCmp('abnormalEleChartPanelId').add(bLPowerGridPanel);
					Ext.getCmp('abnormalEleChartPanelId').doLayout();
					Ext.getCmp('abnormalEleChartPanelId').getEl().unmask();
				},
				failure : function(response) {
					Ext.Msg.alert('提示', '查询功率曲线信息失败');
					Ext.getCmp('abnormalEleChartPanelId').getEl().unmask();
				}

			});

		} else if (alarmCode == '00116') {// ----功率因数

			Ext.define('ElePowerFactor', {
						extend : 'Ext.data.Model',
						fields : ["DATA_TIME", "F", "VIEWPOWER",
								"FORWARDPOWER", "REVERSEPOWER"]
					});

			var bPowerFactorStore = Ext.create('Ext.data.Store', {
						model : 'ElePowerFactor',
						remoteSort : true,
						proxy : new Ext.data.MemoryProxy()
					});

			var bPowerFactorGridPanel = Ext.create('Ext.grid.Panel', {
						height : 300,
						width : Ext.getCmp('abnormalEleChartPanelId')
								.getWidth(),
						loadMask : true,
						border : false,
						store : bPowerFactorStore,
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
									text : "功率因数",
									width : 120,
									dataIndex : 'F',
									align : 'center',
									sortable : false
								}, {
									text : "视在功率",
									width : 120,
									dataIndex : 'VIEWPOWER',
									align : 'center',
									sortable : false
								}, {
									text : "正向有功功率",
									width : 120,
									dataIndex : 'FORWARDPOWER',
									align : 'center',
									sortable : false
								}, {
									text : "正向无功功率",
									width : 120,
									dataIndex : 'REVERSEPOWER',
									align : 'center',
									sortable : false
								}]

					});

			bPowerFactorStore.removeAll();
			Ext.getCmp('abnormalEleChartPanelId').getEl().mask('正在查询...');
			Ext.Ajax.request({
				url : 'measureExceptionAnalAction!queryBLPhaseInfo.action',
				params : {
					'queryItems.meterId' : meterId,
					'queryItems.dataTime' : alarmDate
				},
				success : function(response) {
					var result = Ext.decode(response.responseText);
					var resultList = result.resultList;
					if (!Ext.isEmpty(resultList)) {
						bPowerFactorStore.loadData(resultList);
						// 生成电压数据
						var abnormalEleChartFitFactorPanel = Ext.create(
								'Ext.panel.Panel', {
									id : 'abnormalEleChartFitFactorPanel',
									border : false,
									height : 300,
									width : Ext
											.getCmp('abnormalEleChartPanelId')
											.getWidth(),
									renderTo : Ext.getBody()
								});
						var xmlData = "<graph caption='功率因数曲线图' xAxisName='时间' yAxisName='功率因数' labelDisplay = 'WRAP' anchorRadius='3' decimalPrecision='0' formatNumberScale='0' bgcolor='F3f3f3' bgAlpha='70' numvdivlines='5' showValues='0' divLineColor='CC3300' divLineIsDashed='1' chartRightMargin='50' labelStep='8'>";
						xmlData += "<categories>";
						for (var i = 0; i < resultList.length; i++) {
							xmlData += "<category name='"
									+ resultList[i]['DATA_TIME'].substring(10,
											16) + "'  />";
						}
						xmlData += "</categories>";

						xmlData += "<dataset seriesName='功率因数' color='#BF1515' anchorBorderColor='#BF1515' anchorBgColor='#BF1515'>";
						var temp = resultList[0]['F'];
						if (Ext.isEmpty(temp)) {
							temp = 0;
						}
						xmlData += "<set value='" + temp + "' />";
						for (var i = 1; i < resultList.length; i++) {
							if (Ext.isEmpty(resultList[i]['F'])) {
								xmlData += "<set value='" + temp + "' />";
							} else {
								xmlData += "<set value='" + resultList[i]['F']
										+ "' />";
								temp = resultList[i]['F'];
							}
						}
						xmlData += "</dataset></graph>";

						var picCharts = new FusionCharts(
								"./FusionCharts-new/MSLine.swf",
								"elAabnormalPicFactorCharts", Ext
										.getCmp('abnormalEleChartPanelId')
										.getWidth(), 300);
						picCharts.setDataXML(xmlData);
						picCharts.render("abnormalEleChartFitFactorPanel");

						Ext.getCmp('abnormalEleChartPanelId')
								.add(abnormalEleChartFitFactorPanel);
					}
					Ext.getCmp('abnormalEleChartPanelId')
							.add(bPowerFactorGridPanel);
					Ext.getCmp('abnormalEleChartPanelId').doLayout();
					Ext.getCmp('abnormalEleChartPanelId').getEl().unmask();
				},
				failure : function(response) {
					Ext.Msg.alert('提示', '查询功率因数信息失败');
					Ext.getCmp('abnormalEleChartPanelId').getEl().unmask();
				}

			});

		} else if (alarmCode == '0011A' || alarmCode == '0011B') {
			Ext.define('ElePowerAndEnergy', {
						extend : 'Ext.data.Model',
						fields : ["DATA_TIME", "VIEWPOWER", "FORWARDPOWER",
								"REVERSEPOWER", "PAP_E", "RAP_E"]
					});
			var bPowerAndEnergyStore = Ext.create('Ext.data.Store', {
						model : 'ElePowerAndEnergy',
						remoteSort : true,
						proxy : new Ext.data.MemoryProxy()
					});
			var bPowerAndEnergyGridPanel = Ext.create('Ext.grid.Panel', {
						height : 300,
						width : Ext.getCmp('abnormalEleChartPanelId')
								.getWidth(),
						loadMask : true,
						border : false,
						store : bPowerAndEnergyStore,
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
									text : "视在功率",
									width : 120,
									dataIndex : 'VIEWPOWER',
									align : 'center',
									sortable : false
								}, {
									text : "正向有功功率",
									width : 120,
									dataIndex : 'FORWARDPOWER',
									align : 'center',
									sortable : false
								}, {
									text : "正向无功功率",
									width : 120,
									dataIndex : 'REVERSEPOWER',
									align : 'center',
									sortable : false
								}, {
									text : "正向有功电量",
									width : 120,
									dataIndex : 'PAP_E',
									align : 'center',
									sortable : false
								}, {
									text : "反向有功电量",
									width : 120,
									dataIndex : 'RAP_E',
									align : 'center',
									sortable : false
								}]

					});

			bPowerAndEnergyStore.removeAll();
			var eleRadioPanel = Ext.create('Ext.panel.Panel', {
						border : false,
						height : 35,
						region : 'north',
						layout : 'fit',
						items : [{
							margin : '5 0 0 10',
							xtype : 'radiogroup',
							hideLabel : true,
							columns : 2,
							vertical : true,
							items : [{
								boxLabel : '曲线',
								name : 'eleCurveRadio',
								inputValue : '1',
								checked : true,
								listeners : {
									click : {
										element : 'el',
										fn : function() {
											Ext.getCmp('picAndDataPanel').layout
													.setActiveItem(0);
										}
									}
								}
							}, {
								boxLabel : '数据',
								name : 'eleCurveRadio',
								inputValue : '2',
								listeners : {
									click : {
										element : 'el',
										fn : function() {
											Ext.getCmp('picAndDataPanel').layout
													.setActiveItem(1);
										}
									}
								}
							}]
						}]
					});
			var picturePanel = Ext.create('Ext.panel.Panel', {
						layout : 'fit',
						id : 'picturePanel',
						autoScroll : true,
						border : false,
						height : 240,
						items : []
					});
			Ext.getCmp('abnormalEleChartPanelId').getEl().mask('正在查询...');
			Ext.Ajax.request({
				url : 'measureExceptionAnalAction!queryBLPhaseInfo.action',
				params : {
					'queryItems.meterId' : meterId,
					'queryItems.dataTime' : alarmDate
				},
				success : function(response) {
					var result = Ext.decode(response.responseText);
					var resultList = result.resultList;
					if (!Ext.isEmpty(resultList)) {
						bPowerAndEnergyStore.loadData(resultList);
						// --电量的图形
						var abnormalEleChartFitEnergyPanel = Ext.create(
								'Ext.panel.Panel', {
									id : 'abnormalEleChartFitEnergyPanel',
									border : false,
									height : 300,
									width : Ext
											.getCmp('abnormalEleChartPanelId')
											.getWidth(),
									renderTo : Ext.getBody()
								});
						var xmlData = "<graph caption='电量曲线图' xAxisName='时间' yAxisName='电量' labelDisplay = 'WRAP' anchorRadius='3' decimalPrecision='0' formatNumberScale='0' bgcolor='F3f3f3' bgAlpha='70' numvdivlines='5' showValues='0' divLineColor='CC3300' divLineIsDashed='1' chartRightMargin='50' labelStep='8'>";
						xmlData += "<categories>";
						for (var i = 0; i < resultList.length; i++) {
							xmlData += "<category name='"
									+ resultList[i]['DATA_TIME'].substring(10,
											16) + "'  />";
						}
						xmlData += "</categories>";
						xmlData += "<dataset seriesName='正向有功总' color='#E7ED1A' anchorBorderColor='#E7ED1A' anchorBgColor='#E7ED1A'>";
						var temp = resultList[0]['PAP_E'];
						if (Ext.isEmpty(temp)) {
							temp = 0;
						}
						xmlData += "<set value='" + temp + "' />";
						for (var i = 1; i < resultList.length; i++) {
							if (Ext.isEmpty(resultList[i]['PAP_E'])) {
								xmlData += "<set value='" + temp + "' />";
							} else {
								xmlData += "<set value='"
										+ resultList[i]['PAP_E'] + "' />";
								temp = resultList[i]['PAP_E'];
							}
						}
						xmlData += "</dataset>";
						xmlData += "<dataset seriesName='反向有功总' color='#BF1515' anchorBorderColor='#BF1515' anchorBgColor='#BF1515'>";

						var temp = resultList[0]['RAP_E'];
						if (Ext.isEmpty(temp)) {
							temp = 0;
						}
						xmlData += "<set value='" + temp + "' />";
						for (var i = 1; i < resultList.length; i++) {
							if (Ext.isEmpty(resultList[i]['RAP_E'])) {
								xmlData += "<set value='" + temp + "' />";
							} else {
								xmlData += "<set value='"
										+ resultList[i]['RAP_E'] + "' />";
								temp = resultList[i]['RAP_E'];
							}
						}
						xmlData += "</dataset></graph>";

						var picCharts = new FusionCharts(
								"./FusionCharts-new/MSLine.swf",
								"elAabnormalPicEnergyCharts", Ext
										.getCmp('abnormalEleChartPanelId')
										.getWidth(), 300);
						picCharts.setDataXML(xmlData);
						picCharts.render("abnormalEleChartFitEnergyPanel");

						Ext.getCmp('picturePanel')
								.add(abnormalEleChartFitEnergyPanel);

						// --- 功率的图形
						var abnormalEleChartFitPowerPanel2 = Ext.create(
								'Ext.panel.Panel', {
									id : 'abnormalEleChartFitPowerPanel2',
									border : false,
									height : 300,
									width : Ext
											.getCmp('abnormalEleChartPanelId')
											.getWidth(),
									renderTo : Ext.getBody()
								});
						var xmlData2 = "<graph caption='功率曲线图' xAxisName='时间' yAxisName='功率' labelDisplay = 'WRAP' anchorRadius='3' decimalPrecision='0' formatNumberScale='0' bgcolor='F3f3f3' bgAlpha='70' numvdivlines='5' showValues='0' divLineColor='CC3300' divLineIsDashed='1' chartRightMargin='50' labelStep='8'>";
						xmlData2 += "<categories>";
						for (var i = 0; i < resultList.length; i++) {
							xmlData2 += "<category name='"
									+ resultList[i]['DATA_TIME'].substring(10,
											16) + "'  />";
						}
						xmlData2 += "</categories>";
						xmlData2 += "<dataset seriesName='正向有功功率' color='#E7ED1A' anchorBorderColor='#E7ED1A' anchorBgColor='#E7ED1A'>";
						var temp = resultList[0]['FORWARDPOWER'];
						if (Ext.isEmpty(temp)) {
							temp = 0;
						}
						xmlData2 += "<set value='" + temp + "' />";
						for (var i = 1; i < resultList.length; i++) {
							if (Ext.isEmpty(resultList[i]['FORWARDPOWER'])) {
								xmlData2 += "<set value='" + temp + "' />";
							} else {
								xmlData2 += "<set value='"
										+ resultList[i]['FORWARDPOWER']
										+ "' />";
								temp = resultList[i]['FORWARDPOWER'];
							}
						}
						xmlData2 += "</dataset>";
						xmlData2 += "<dataset seriesName='正向无功功率' color='#BF1515' anchorBorderColor='#BF1515' anchorBgColor='#BF1515'>";
						var temp = resultList[0]['REVERSEPOWER'];
						if (Ext.isEmpty(temp)) {
							temp = 0;
						}
						xmlData2 += "<set value='" + temp + "' />";
						for (var i = 1; i < resultList.length; i++) {
							if (Ext.isEmpty(resultList[i]['REVERSEPOWER'])) {
								xmlData2 += "<set value='" + temp + "' />";
							} else {
								xmlData2 += "<set value='"
										+ resultList[i]['REVERSEPOWER']
										+ "' />";
								temp = resultList[i]['REVERSEPOWER'];
							}
						}
						xmlData2 += "</dataset>";
						xmlData2 += " <trendLines> <line startValue='"
								+ runCap
								+ "' color='FF0000' displayvalue='运行容量' />  </trendLines>";

						xmlData2 += "</graph>";

						var picCharts = new FusionCharts(
								"./FusionCharts-new/MSLine.swf",
								"elAabnormalPicPowerCharts2", Ext
										.getCmp('abnormalEleChartPanelId')
										.getWidth(), 300);
						picCharts.setDataXML(xmlData2);
						picCharts.render("abnormalEleChartFitPowerPanel2");

						Ext.getCmp('picturePanel')
								.add(abnormalEleChartFitPowerPanel2);
					}

					var picAndDataPanel = Ext.create('Ext.panel.Panel', {
								region : 'center',
								layout : 'card',
								id:'picAndDataPanel',
								activeItem : 0,
								items : [picturePanel, bPowerAndEnergyGridPanel]
							});

					var eleNewTotalPanel = Ext.create('Ext.panel.Panel', {
								height : 450,
								resizable : false,
								title : '图形',
								layout : 'border',
								items : [eleRadioPanel, picAndDataPanel]
							});

					Ext.getCmp('abnormalEleChartPanelId').add(eleNewTotalPanel);

					Ext.getCmp('abnormalEleChartPanelId').doLayout();
					Ext.getCmp('abnormalEleChartPanelId').getEl().unmask();
				},
				failure : function(response) {
					Ext.Msg.alert('提示', '查询功率和电量信息失败');
					Ext.getCmp('abnormalEleChartPanelId').getEl().unmask();
				}

			});
		}

	};

	// -------------------查询电能表事件--------------------------
	function queryMeterEventInfo(alarmId) {
		meterEleMeterEventStore.proxy.extraParams = {
			'queryItems.alarmId' : alarmId,
			'queryItems.eventTypeCode' : '02'
		};
		meterEleMeterEventStore.load();
		// meterEleMeterEventStore.currentPage=1;
		// meterEleMeterEventStore.load({
		// start:0
		// });

	}
	// --------------------查询电能表事件明细-----------------
	function queryAlarmMeterEventDetailInfo() {

		Ext.define('EleMeterEventDetail', {
					extend : 'Ext.data.Model',
					fields : ["ITEM_NO", "EVENT_DATA"]
				});

		var eleMeterEventDetailStore = Ext.create('Ext.data.Store', {
			model : 'EleMeterEventDetail',
			remoteSort : true,
			// pageSize: DEFAULT_PAGE_SIZE,
			buffered : true,
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
			store : eleMeterEventDetailStore,
			viewConfig : {
				trackOver : false
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
				// ,
				// dockedItems: [{
				// xtype: 'pagingtoolbar',
				// store: eleMeterEventDetailStore,
				// dock: 'bottom',
				// displayInfo: true
				// }]
			});

		eleMeterEventDetailStore.proxy.extraParams = {
			'queryItems.id' : id
		};
		eleMeterEventDetailStore.load();

		Ext.create('Ext.window.Window', {
					modal : true,
					height : 110,
					width : 340,
					resizable : false,
					title : '电能表事件明细',
					layout : 'fit',
					items : [eleMeterEventGridPanel]
				}).show();
	}

	// --------------------查询终端事件------------------------------------
	function queryTmnlEventInfo(alarmId) {
		tmnlEleMeterEventStore.proxy.extraParams = {
			'queryItems.alarmId' : alarmId,
			'queryItems.eventTypeCode' : '01'
		};
		tmnlEleMeterEventStore.load();
		// tmnlEleMeterEventStore.currentPage=1;
		// tmnlEleMeterEventStore.load({
		// start:0
		// });
	}
	function queryAlarmTmnlEventDetailInfo() {
		Ext.define('EleTmnlEventDetail', {
					extend : 'Ext.data.Model',
					fields : ["ITEM_NO", "EVENT_DATA"]
				});

		var eleTmnlEventDetailStore = Ext.create('Ext.data.Store', {
			model : 'EleTmnlEventDetail',
			remoteSort : true,
			// pageSize: DEFAULT_PAGE_SIZE,
			buffered : true,
			proxy : {
				type : 'ajax',
				url : 'measureExceptionAnalAction!queryMeterEventDetail.action',
				reader : {
					type : 'json',
					root : 'resultList'
				}
			}
		});

		var eleTmnlEventGridPanel = Ext.create('Ext.grid.Panel', {
			loadMask : true,
			border : false,
			store : eleTmnlEventDetailStore,
			viewConfig : {
				trackOver : false
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
				// ,
				// dockedItems: [{
				// xtype: 'pagingtoolbar',
				// store: eleTmnlEventDetailStore,
				// dock: 'bottom',
				// displayInfo: true
				// }]
				// ,
			});

		eleTmnlEventDetailStore.proxy.extraParams = {
			'queryItems.id' : id
		};
		eleTmnlEventDetailStore.load();

		Ext.create('Ext.window.Window', {
					modal : true,
					height : 110,
					width : 340,
					resizable : false,
					title : '终端事件明细',
					layout : 'fit',
					items : [eleTmnlEventGridPanel]
				}).show();

	}

		// ------------
})