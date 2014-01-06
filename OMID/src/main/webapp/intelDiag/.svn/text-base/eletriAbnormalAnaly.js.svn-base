/**
 * 
 * 
 * @author chenyueyan
 * @date 2012-10-17
 */

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
	var sOrgNo;
	var fileAlarmMessage;
	var selectModel = Ext.create('Ext.selection.CheckboxModel', {
				mode : 'SINGLE',
				listeners : {
					select : function(t, record, index, e) {
						sConsNo = record.get('CONS_NO');
						sOrgNo = record.get('ORG_NO');
						sAlarmCode = record.get('ALARM_CODE');
						queryFileInfoFun(record);
						queryExceptHisInfo(record.get('ORG_NO'), record
										.get('CONS_NO'), record
										.get('ALARM_CODE'));
						queryEleCurveInfo(record.get('ALARM_CODE'), record
										.get('METER_ID'), record
										.get('ASSET_NO'), record
										.get('ALARM_DATE'), record
										.get('RUN_CAP'), record
										.get('TYPE_CODE'));
						queryMeterEventInfo(record.get('METER_ID'));
						queryEleMeterEventRec();
						queryTmnlEventInfo(record.get('TERMINAL_ID'));
						queryEleTmnlEventRec();
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
						"TERMINAL_ADDR", "TERMINAL_ID", "METER_ID", "ASSET_NO",
						"ALARM_SRC", "SAVE_ALARM_DATE", "REMARK", "P_ORG_NAME",
						"TYPE_CODE", "AREA_CODE"]
			});

	var abnormalInfoStore = Ext.create('Ext.data.Store', {
				model : 'Eventabnormal',
				remoteSort : true,
				pageSize : DEFAULT_PAGE_SIZE,
				buffered : true,
				proxy : {
					type : 'ajax',
					url : 'eleAbnormalAnalyAction!queryAlarmAnalyseInfo.action',
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
		features : [selectFeature],
		// verticalScrollerType : 'paginggridscroller',
		// invalidateScrollerOnRefresh : false,
		viewConfig : {
			trackOver : false,
			forceFit : false,
			getRowClass : function(record, rowIndex, rowParams, store) {
				if (record.get('ALARM_DATE') == Ext.Date.format(Ext.Date.add(
								new Date(), Ext.Date.DAY, -1), 'Y-m-d')) {
					return 'x-grid-record-red';
				} else {
					return 'x-grid-record-rblue';
				}

			}
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
				}, {
					text : "备注",
					width : 90,
					dataIndex : 'REMARK',
					align : 'center',
					hidden : true,
					sortable : false
				}, {
					text : "上级供电单位",
					width : 120,
					dataIndex : 'P_ORG_NAME',
					align : 'center',
					sortable : true
				}

		]
			// ,
			// dockedItems : [{
			// xtype : 'pagingtoolbar',
			// store : abnormalInfoStore,
			// dock : 'bottom',
			// displayInfo : true
			// }]

	});
	abnormalInfoGrid.addDocked(new Ext.create('Ext.ux.MyToolBar', {
				dock : 'bottom',
				expallable : true,// 是否导出全部
				expcurable : true,// 是否导出当前页
				grid : abnormalInfoGrid,// 当前需要导出的grid
				title : '用电异常事件明细',// 导出excel的文件名称
				store : abnormalInfoStore,
				displayInfo : true
			}));

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
							return "<a href='javascript:' onclick='queryEleAbnormalExceptInfo(\""
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
	function getRemarkBtn() {	
		var remarkBtn = Ext.create('Ext.Button', {
					text : '异常分析说明',
					iconCls : 'alarmWarning',
					handler : function() {
						var ss = selectModel.getSelection();
						if (Ext.isEmpty(ss)) {
							Ext.Msg.alert('提示', '请选择异常事件');
							return;
						}
						var areaTextField = Ext.create('Ext.form.FormPanel', {
									// title : '异常说明信息',
									// region:'center',
									bodyPadding : 10,
									width : 340,
									fieldDefaults : {
										labelAlign : 'top',
										labelWidth : 90,
										anchor : '100%'
									},
									items : [{

												xtype : 'textareafield',
												name : 'alarmAnalMessage',
												fieldLabel : '异常分析说明',
												value : ss[0].get('REMARK')

											}, {
												xtype : 'textareafield',
												name : 'fileMessage',
												fieldLabel : '档案异常提示',
												anthor : '90%',
												value : fileAlarmMessage
											}]

								});
						var win = Ext.create('Ext.window.Window', {
									modal : true,
									height : 350,
									width : 450,
									resizable : false,
									layout : 'fit',
									title : '说明信息',
									closable : true,
									closeAction : "close",
									items : [areaTextField]
								});
						win.show();

					}

				});
		return remarkBtn;
	}
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
														ss[0].get('ASSET_NO'),
														dd.dateList,
														ss[0].get('RUN_CAP'),
														ss[0].get('TYPE_CODE'));
											} else {
												queryEleCurveInfo(
														ss[0].get('ALARM_CODE'),
														ss[0].get('METER_ID'),
														ss[0].get('ASSET_NO'),
														Ext
																.getCmp('eleInfoAbnormalDateField')
																.getRawValue(),
														ss[0].get('RUN_CAP'),
														ss[0].get('TYPE_CODE'));
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
				// layout : 'fit',
				border : false,
				monitorResize : true,
				autoScroll : true,
				// tbar : [{
				// xtype : 'tbfill'
				// }, '-', remarkBtn, '-', appointDate],
				items : []
			});

	// ---------电能表事件------------
	var meterSelectModel = Ext.create('Ext.selection.CheckboxModel', {
				mode : 'SINGLE',
				listeners : {
					select : function(t, record, index, e) {
						eleMeterEventDetailStore.proxy.extraParams = {
							'queryItems.eventNo' : record.get('EVENT_NO'),
							'queryItems.alarmId' : record.get('ALARM_ID'),
							'queryItems.id' : record.get('ID'),
							'queryItems.typeCode' : 1

						};
						eleMeterEventDetailStore.load();

					}
				}
			});

	Ext.define('EleAbnormalMeterEvent', {
				extend : 'Ext.data.Model',
				fields : ["ALARM_ID", "ALARM_TYPE_CODE", "METER_ID",
						"EVENT_NO", "EVENT_NAME", "ID", "EVENT_TYPE_CODE",
						"TERMINAL_ID", "EVENT_TIME", "REC_TIME"]
			});

	var meterEleMeterEventStore = Ext.create('Ext.data.Store', {
				model : 'EleAbnormalMeterEvent',
				remoteSort : true,
				pageSize : DEFAULT_PAGE_SIZE,
				buffered : true,
				proxy : {
					type : 'ajax',
					url : 'eleAbnormalAnalyAction!queryMeterEvent.action',
					reader : {
						type : 'json',
						root : 'resultList',
						totalProperty : 'totalCount'
					}
				}
			});
	var eleMeterEventGridPanel = Ext.create('Ext.grid.Panel', {
		// title : '电能表事件',
		region : 'center',
		loadMask : true,
		border : true,
		selModel : meterSelectModel,
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
					hidden : true,
					sortable : true
				}, {
					text : "事件名称",
					width : 180,
					dataIndex : 'EVENT_NAME',
					align : 'center',
					sortable : false
				}, {
					text : "发生时间",
					width : 140,
					dataIndex : 'EVENT_TIME',
					align : 'center',
					sortable : true
				}, {
					text : "接收时间",
					width : 140,
					dataIndex : 'REC_TIME',
					align : 'center',
					sortable : false
				}, {
					text : "明细",
					width : 120,
					hidden : true,
					align : 'center',
					renderer : function(s, m, rec) {
						return "<a href='javascript:' onclick='queryAlarmMeterEventDetailInfo(\""
								+ rec.get('ID') + "\");'>查看</a>";
					}

				}]
	});
	eleMeterEventGridPanel.addDocked(new Ext.create('Ext.ux.MyToolBar', {
				dock : 'bottom',
				expallable : true,// 是否导出全部
				expcurable : true,// 是否导出当前页
				grid : eleMeterEventGridPanel,// 当前需要导出的grid
				title : '电能表异常事件',// 导出excel的文件名称
				store : meterEleMeterEventStore,
				displayInfo : true
			}));
	Ext.define('EleMeterEventDetail', {
				extend : 'Ext.data.Model',
				fields : ["ITEM_NO", "ITEM_NAME", "EVENT_DATA"]
			});

	var eleMeterEventDetailStore = Ext.create('Ext.data.Store', {
				model : 'EleMeterEventDetail',
				remoteSort : true,
				// pageSize: DEFAULT_PAGE_SIZE,
				buffered : true,
				proxy : {
					type : 'ajax',
					url : 'eleAbnormalAnalyAction!queryMeterEventDetail.action',
					reader : {
						type : 'json',
						root : 'resultList'
					}
				}
			});

	var eleMeterEventDetailGridPanel = Ext.create('Ext.grid.Panel', {
				loadMask : true,
				border : true,
				store : eleMeterEventDetailStore,
				viewConfig : {
					trackOver : false
				},
				region : 'east',
				width : 380,
				columnLines : true,
				columns : [{
							text : "序号",
							width : 120,
							dataIndex : 'ITEM_NO',
							align : 'center',
							sortable : true
						}, {
							text : "事件名称",
							width : 120,
							dataIndex : 'ITEM_NAME',
							align : 'center',
							sortable : false
						}, {
							text : "事件对应数据",
							width : 120,
							dataIndex : 'EVENT_DATA',
							align : 'center',
							sortable : false
						}]
			});
	var abnormalEleMeterEventPanel = Ext.create('Ext.panel.Panel', {
				title : '电能表异常事件',
				layout : 'border',
				border : true,
				monitorResize : true,
				autoScroll : true,
				items : [eleMeterEventGridPanel, eleMeterEventDetailGridPanel]

			});

	// ----电表事件记录---
	var meterRecSelectModel = Ext.create('Ext.selection.CheckboxModel', {
				mode : 'SINGLE',
				listeners : {
					select : function(t, record, index, e) {
						eleMeterEventRecDetailStore.proxy.extraParams = {
							'queryItems.id' : record.get('MET_EVENT_ID')
						};
						eleMeterEventRecDetailStore.load();

					}
				}
			});
	Ext.define('EleAbnormalMeterRecEvent', {
				extend : 'Ext.data.Model',
				fields : ["MET_EVENT_ID", "METER_ID", "EVENT_NO", "EVENT_NAME",
						"ID", "EVENT_TIME", "REC_TIME", "ASSET_NO"]
			});
	var eleMeterEventRecStore = Ext.create('Ext.data.Store', {
				model : 'EleAbnormalMeterRecEvent',
				remoteSort : true,
				pageSize : DEFAULT_PAGE_SIZE,
				buffered : true,
				proxy : {
					type : 'ajax',
					url : 'eleAbnormalAnalyAction!queryEleMeterEventRec.action',
					reader : {
						type : 'json',
						root : 'resultList',
						totalProperty : 'totalCount'
					}
				}
			});
	var eleMeterEventRecGridPanel = Ext.create('Ext.grid.Panel', {
				region : 'center',
				loadMask : true,
				border : true,
				selModel : meterRecSelectModel,
				store : eleMeterEventRecStore,
				viewConfig : {
					trackOver : false
				},
				columnLines : true,
				columns : [{
							text : "表计资产号",
							width : 120,
							dataIndex : 'ASSET_NO',
							hidden : true,
							align : 'center',
							sortable : true
						}, {
							text : "事件名称",
							width : 180,
							dataIndex : 'EVENT_NAME',
							align : 'center',
							sortable : false
						}, {
							text : "发生时间",
							width : 140,
							dataIndex : 'EVENT_TIME',
							align : 'center',
							sortable : true
						}, {
							text : "接收时间",
							width : 140,
							dataIndex : 'REC_TIME',
							align : 'center',
							sortable : false
						}]
			});

	eleMeterEventRecGridPanel.addDocked(new Ext.create('Ext.ux.MyToolBar', {
				dock : 'bottom',
				expallable : true,// 是否导出全部
				expcurable : true,// 是否导出当前页
				grid : eleMeterEventRecGridPanel,// 当前需要导出的grid
				title : '电能表事件信息',// 导出excel的文件名称
				store : eleMeterEventRecStore,
				displayInfo : true
			}));

	Ext.define('EleMeterEventRecDetail', {
				extend : 'Ext.data.Model',
				fields : ["ITEM_NO", "EVENT_DATA"]
			});

	var eleMeterEventRecDetailStore = Ext.create('Ext.data.Store', {
				model : 'EleMeterEventRecDetail',
				remoteSort : true,
				// pageSize: DEFAULT_PAGE_SIZE,
				buffered : true,
				proxy : {
					type : 'ajax',
					url : 'eleAbnormalAnalyAction!queryMeterEventRecDetail.action',
					reader : {
						type : 'json',
						root : 'resultList'
					}
				}
			});

	var eleMeterEventDetailRecGridPanel = Ext.create('Ext.grid.Panel', {
				loadMask : true,
				border : true,
				store : eleMeterEventRecDetailStore,
				viewConfig : {
					trackOver : false
				},
				region : 'east',
				width : 380,
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

	var abnormalEleMeterEventRecPanelBtm = Ext.create('Ext.panel.Panel', {

				region : 'center',
				layout : 'border',
				border : true,
				monitorResize : true,
				autoScroll : true,
				items : [eleMeterEventRecGridPanel,
						eleMeterEventDetailRecGridPanel]

			});
	var abnormalEleMeterEventRecPanelTop = Ext.create('Ext.panel.Panel', {
				border : false,
				region : 'north',
				layout : {
					type : 'table',
					columns : 3
				},
				defaults : {
					height : 30
				},
				bodyStyle : 'padding:5px 0px 0px 5px',
				items : [{
					border : false,
					width : 220,
					items : [{
								xtype : 'datefield',
								id : 'eleMeterEventRecStartDate',
								fieldLabel : '开始日期',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 70,
								value : Ext.Date.add(new Date(), Ext.Date.DAY,
										-10),
								format : 'Y-m-d'
							}]
				}, {
					border : false,
					width : 220,
					items : [{
								xtype : 'datefield',
								id : 'eleMeterEventRecEndDate',
								fieldLabel : '结束日期',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 70,
								value : new Date(),
								format : 'Y-m-d'
							}]
				}, {
					border : false,
					width : 220,
					items : [{
								xtype : 'button',
								width : 70,
								text : '查询',
								margin : '0 0 0 10',
								handler : function() {
									queryEleMeterEventRec();
								}
							}]
				}]
			});
	function queryEleMeterEventRec() {
		var ss = selectModel.getSelection();
		if (Ext.isEmpty(ss)) {
			Ext.Msg.alert('提示', '请选择异常事件');
			return;
		}
		eleMeterEventRecStore.removeAll();
		eleMeterEventDetailStore.removeAll();
		eleMeterEventRecStore.proxy.extraParams = {
			'queryItems.consNo' : ss[0].get('CONS_NO'),
			'queryItems.meterId' : ss[0].get('METER_ID'),
			'queryItems.startDate' : Ext.Date.format(Ext
							.getCmp('eleMeterEventRecStartDate').getValue(),
					'Y-m-d'),
			'queryItems.endDate' : Ext.Date.format(Ext
							.getCmp('eleMeterEventRecEndDate').getValue(),
					'Y-m-d')
		};
		eleMeterEventRecStore.load();
	}
	var abnormalEleMeterEventRecPanel = Ext.create('Ext.panel.Panel', {
				layout : 'border',
				title : '电能表事件记录',
				border : false,
				items : [abnormalEleMeterEventRecPanelTop,
						abnormalEleMeterEventRecPanelBtm]
			});
	var abnormalEleMeterEventTotalPanel = Ext.create('Ext.panel.Panel', {
				layout : 'card',
				activeItem : 0,
				border : false,
				items : [abnormalEleMeterEventPanel,
						abnormalEleMeterEventRecPanel]
			});
	var eleAbnornalMeterEventTotalPanel = Ext.create('Ext.panel.Panel', {
				border : false,
				title : '电能表事件',
				layout : 'border',
				items : [{
					xtype : 'panel',
					region : 'north',
					height : 30,
					border : false,
					items : [{
						margin : '5 0 0 20',
						xtype : 'radiogroup',
						hideLabel : true,
						columns : 2,
						vertical : true,
						width : 250,
						items : [{
							boxLabel : '与异常关联的事件',
							name : 'eleAbnorlEvent',
							inputValue : '1',
							checked : true,
							listeners : {
								change : function(t, newValue, oldValue, e) {
									if (newValue == '1') {
										abnormalEleMeterEventTotalPanel
												.getLayout().setActiveItem(0);
									} else {
										abnormalEleMeterEventTotalPanel
												.getLayout().setActiveItem(1);
									}
								}
							}
						}, {
							boxLabel : '所有电表事件',
							name : 'eleAbnorlEvent',
							inputValue : '2'
						}]
					}]
				}, {
					xtype : 'panel',
					region : 'center',
					layout : 'fit',
					items : [abnormalEleMeterEventTotalPanel]
				}]
			});

	// --------------终端事件-------------------
	var tmnlSelectModel = Ext.create('Ext.selection.CheckboxModel', {
				mode : 'SINGLE',
				listeners : {
					select : function(t, record, index, e) {
						eleTmnlEventDetailStore.proxy.extraParams = {
							'queryItems.alarmId' : record.get('ALARM_ID'),
							'queryItems.id' : record.get('ID'),
							'queryItems.eventNo' : record.get('EVENT_NO'),
							'queryItems.typeCode' : 2
						};
						eleTmnlEventDetailStore.load();

					}
				}
			});
	Ext.define('EleAbnormalTmnlEvent', {
				extend : 'Ext.data.Model',
				fields : ["ALARM_ID", "ALARM_TYPE_CODE", "METER_ID",
						"EVENT_NO", "EVENT_NAME", "ID", "EVENT_TYPE_CODE",
						"TERMINAL_ID", "EVENT_TIME", "REC_TIME"]
			});
	var tmnlEleMeterEventStore = Ext.create('Ext.data.Store', {
				model : 'EleAbnormalTmnlEvent',
				remoteSort : true,
				pageSize : DEFAULT_PAGE_SIZE,
				buffered : true,
				proxy : {
					type : 'ajax',
					url : 'eleAbnormalAnalyAction!queryMeterEvent.action',
					reader : {
						type : 'json',
						root : 'resultList',
						totalProperty : 'totalCount'
					}
				}
			});
	var eleTmnlEventGridPanel = Ext.create('Ext.grid.Panel', {
		// title : '终端事件',
		loadMask : true,
		border : true,
		selModel : tmnlSelectModel,
		store : tmnlEleMeterEventStore,
		viewConfig : {
			trackOver : false
		},
		region : 'center',
		columnLines : true,
		columns : [{
					text : "终端ID",
					width : 120,
					dataIndex : 'TERMINAL_ID',
					align : 'center',
					hidden : true,
					sortable : true
				}, {
					text : "事件名称",
					width : 180,
					dataIndex : 'EVENT_NAME',
					align : 'center',
					sortable : false
				}, {
					text : "发生时间",
					width : 140,
					dataIndex : 'EVENT_TIME',
					align : 'center',
					sortable : true
				}, {
					text : "接收时间",
					width : 140,
					dataIndex : 'REC_TIME',
					align : 'center',
					sortable : false
				}, {
					text : "明细",
					width : 120,
					align : 'center',
					hidden : true,
					renderer : function(s, m, rec) {
						return "<a href='javascript:' onclick='queryAlarmTmnlEventDetailInfo(\""
								+ rec.get('ID') + "\");'>查看</a>";
					}

				}]
	});
	eleTmnlEventGridPanel.addDocked(new Ext.create('Ext.ux.MyToolBar', {
				dock : 'bottom',
				expallable : true,// 是否导出全部
				expcurable : true,// 是否导出当前页
				grid : eleTmnlEventGridPanel,// 当前需要导出的grid
				title : '终端异常事件',// 导出excel的文件名称
				store : tmnlEleMeterEventStore,
				displayInfo : true
			}));
	Ext.define('EleTmnlEventDetail', {
				extend : 'Ext.data.Model',
				fields : ["ITEM_NO", "ITEM_NAME", "EVENT_DATA"]
			});

	var eleTmnlEventDetailStore = Ext.create('Ext.data.Store', {
				model : 'EleTmnlEventDetail',
				remoteSort : true,
				// pageSize: DEFAULT_PAGE_SIZE,
				buffered : true,
				proxy : {
					type : 'ajax',
					url : 'eleAbnormalAnalyAction!queryMeterEventDetail.action',
					reader : {
						type : 'json',
						root : 'resultList'
					}
				}
			});

	var eleTmnlEventDetailGridPanel = Ext.create('Ext.grid.Panel', {
				loadMask : true,
				border : true,
				store : eleTmnlEventDetailStore,
				viewConfig : {
					trackOver : false
				},
				region : 'east',
				width : 300,
				columnLines : true,
				columns : [{
							text : "序号",
							width : 120,
							dataIndex : 'ITEM_NO',
							align : 'center',
							sortable : true
						}, {
							text : "事件名称",
							width : 120,
							dataIndex : 'ITEM_NAME',
							align : 'center',
							sortable : false
						}, {
							text : "事件对应数据",
							width : 120,
							dataIndex : 'EVENT_DATA',
							align : 'center',
							sortable : false
						}]
			});

	var abnormalEleTmnlEventPanel = Ext.create('Ext.panel.Panel', {
				title : '终端异常事件',
				layout : 'border',
				border : true,
				monitorResize : true,
				autoScroll : true,
				items : [eleTmnlEventGridPanel, eleTmnlEventDetailGridPanel]

			});

	var abnormalEleTmnlEventRecPanelTop = Ext.create('Ext.panel.Panel', {
				border : false,
				region : 'north',
				layout : {
					type : 'table',
					columns : 3
				},
				defaults : {
					height : 30
				},
				bodyStyle : 'padding:5px 0px 0px 5px',
				items : [{
					border : false,
					width : 220,
					items : [{
								xtype : 'datefield',
								id : 'eleTmnlEventRecStartDate',
								fieldLabel : '开始日期',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 70,
								value : Ext.Date.add(new Date(), Ext.Date.DAY,
										-3),
								format : 'Y-m-d'
							}]
				}, {
					border : false,
					width : 220,
					items : [{
								xtype : 'datefield',
								id : 'eleTmnlEventRecEndDate',
								fieldLabel : '结束日期',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 70,
								value : new Date(),
								format : 'Y-m-d'
							}]
				}, {
					border : false,
					width : 220,
					items : [{
								xtype : 'button',
								width : 70,
								text : '查询',
								margin : '0 0 0 10',
								handler : function() {
									queryEleTmnlEventRec();
								}
							}]
				}]
			});
	function queryEleTmnlEventRec() {
		var ss = selectModel.getSelection();
		if (Ext.isEmpty(ss)) {
			Ext.Msg.alert('提示', '请选择异常事件');
			return;
		}
		eleTmnlEventRecStore.removeAll();
		eleTmnlEventRecStore.proxy.extraParams = {
			'queryItems.terminalId' : ss[0].get('TERMINAL_ID'),
			'queryItems.areaCode' : ss[0].get('AREA_CODE'),
			'queryItems.startDate' : Ext.Date.format(Ext
							.getCmp('eleTmnlEventRecStartDate').getValue(),
					'Y-m-d'),
			'queryItems.endDate' : Ext.Date.format(Ext
							.getCmp('eleTmnlEventRecEndDate').getValue(),
					'Y-m-d')
		};
		eleTmnlEventRecStore.load();
	}
	var tmnlRecSelectModel = Ext.create('Ext.selection.CheckboxModel', {
				mode : 'SINGLE',
				listeners : {
					select : function(t, record, index, e) {
						// eleTmnlEventRecDetailStore.proxy.extraParams = {
						// 'queryItems.id' : record.get('MET_EVENT_ID')
						// };
						// eleTmnlEventRecDetailStore.load();

					}
				}
			});
	Ext.define('EleAbnormalTmnlRecEvent', {
				extend : 'Ext.data.Model',
				fields : ["TERMINAL_ADDR", "EVENT_NO", "EVENT_NAME",
						"EVENT_TIME", "EVENT_SRC", "EVENT_LEVEL", "FROM_NO",
						"DATA1", "DATA2", "DATA3", "DATA4", "DATA5", "DATA6"]
			});
	var eleTmnlEventRecStore = Ext.create('Ext.data.Store', {
				model : 'EleAbnormalTmnlRecEvent',
				remoteSort : true,
				pageSize : DEFAULT_PAGE_SIZE,
				buffered : true,
				proxy : {
					type : 'ajax',
					url : 'eleAbnormalAnalyAction!queryEleTmnlEventRec.action',
					reader : {
						type : 'json',
						root : 'resultList',
						totalProperty : 'totalCount'
					}
				}
			});
	var eleTmnlEventRecGridPanel = Ext.create('Ext.grid.Panel', {
				region : 'center',
				loadMask : true,
				border : true,
				selModel : tmnlRecSelectModel,
				store : eleTmnlEventRecStore,
				viewConfig : {
					trackOver : false
				},
				columnLines : true,
				columns : [{
							text : "终端地址",
							width : 180,
							dataIndex : 'TERMINAL_ADDR',
							align : 'center',
							sortable : false
						}, {
							text : "事件名称",
							width : 180,
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
							text : "事件来源",
							width : 120,
							dataIndex : 'EVENT_SRC',
							align : 'center',
							sortable : false
						}, {
							text : "严重等级",
							width : 120,
							dataIndex : 'EVENT_LEVEL',
							align : 'center',
							sortable : false
						}, {
							text : "测量点号",
							width : 120,
							dataIndex : 'FROM_NO',
							align : 'center',
							sortable : false
						}, {
							text : "数据项1",
							width : 120,
							dataIndex : 'DATA1',
							align : 'center',
							sortable : false
						}, {
							text : "数据项2",
							width : 120,
							dataIndex : 'DATA2',
							align : 'center',
							sortable : false
						}, {
							text : "数据项3",
							width : 120,
							dataIndex : 'DATA3',
							align : 'center',
							sortable : false
						}, {
							text : "数据项4",
							width : 120,
							dataIndex : 'DATA4',
							align : 'center',
							sortable : false
						}, {
							text : "数据项5",
							width : 120,
							dataIndex : 'DATA5',
							align : 'center',
							sortable : false
						}, {
							text : "数据项6",
							width : 120,
							dataIndex : 'DATA6',
							align : 'center',
							sortable : false
						}]
			});

	eleTmnlEventRecGridPanel.addDocked(new Ext.create('Ext.ux.MyToolBar', {
				dock : 'bottom',
				expallable : true,// 是否导出全部
				expcurable : true,// 是否导出当前页
				grid : eleTmnlEventRecGridPanel,// 当前需要导出的grid
				title : '终端所有事件信息',// 导出excel的文件名称
				store : eleTmnlEventRecStore,
				displayInfo : true
			}));
	var abnormalEleTmnlEventRecPanelBtm = Ext.create('Ext.panel.Panel', {

				region : 'center',
				layout : 'fit',
				border : true,
				monitorResize : true,
				autoScroll : true,
				items : [eleTmnlEventRecGridPanel]

			});
	var abnormalEleTmnlEventRecPanel = Ext.create('Ext.panel.Panel', {
				layout : 'border',
				title : '终端所有事件信息',
				border : false,
				items : [abnormalEleTmnlEventRecPanelTop,
						abnormalEleTmnlEventRecPanelBtm]
			});
	var abnormalEleTmnlEventTotalPanel = Ext.create('Ext.panel.Panel', {

				layout : 'card',
				activeItem : 0,
				border : false,
				items : [abnormalEleTmnlEventPanel,
						abnormalEleTmnlEventRecPanel]
			});
	var eleAbnornalTmnlEventTotalPanel = Ext.create('Ext.panel.Panel', {
				border : false,
				title : '终端事件',
				layout : 'border',
				items : [{
					xtype : 'panel',
					region : 'north',
					height : 30,
					border : false,
					items : [{
						margin : '5 0 0 20',
						xtype : 'radiogroup',
						hideLabel : true,
						columns : 2,
						vertical : true,
						width : 250,
						items : [{
							boxLabel : '与异常关联的事件',
							name : 'eleAbnorlTmnlEvent',
							inputValue : '1',
							checked : true,
							listeners : {
								change : function(t, newValue, oldValue, e) {
									if (newValue == '1') {
										abnormalEleTmnlEventTotalPanel
												.getLayout().setActiveItem(0);
									} else {
										abnormalEleTmnlEventTotalPanel
												.getLayout().setActiveItem(1);
									}
								}
							}
						}, {
							boxLabel : '所有终端事件',
							name : 'eleAbnorlTmnlEvent',
							inputValue : '2'
						}]
					}]
				}, {
					xtype : 'panel',
					region : 'center',
					layout : 'fit',
					items : [abnormalEleTmnlEventTotalPanel]
				}]
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
								id : 'eleAbnormalConsSort',
								fieldLabel : '用户分类',
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
								id : 'eleAbnormalConnectcap',
								fieldLabel : '合同容量',
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
								hidden : true,
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
							}, {
								xtype : 'textfield',
								id : 'eleAbnormalCollNo',
								fieldLabel : '采集点编号',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 80,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'eleAbnormalCollAddr',
								fieldLabel : '采集点地址',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 80,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'eleAbnormalCollType',
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
								id : 'eleAbnormalMeterAssetNo',
								fieldLabel : '电能表资产号',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								hidden : true,
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
								id : 'eleAbnormalMeterCt',
								fieldLabel : 'CT',
								labelAlign : 'right',
								labelSeparator : '',
								width : 195,
								labelWidth : 80,
								readOnly : true
							}, {
								xtype : 'textfield',
								id : 'eleAbnormalMeterPt',
								fieldLabel : 'PT',
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
								// hidden : true,
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
				fields : ["ALARM_TYPE", "EXCEPT_TYPE_NAME", "CONS_NO",
						"ALARM_ID", "ALARM_CODE", "EVENT_NAME", "EVENT_LEVEL",
						"EVENT_LEVEL_NAME", "FIRST_ALARM_DATE", "ALARM_DATE",
						"ALARM_CNT", "FIRST_RESUME_DATE", "RESUME_DATE",
						"RESUME_DAY_CNT", "ALARM_SRC", "METER_ASSET_NO",
						"FLOW_STATUS_NAME", "FLOW_STATUS_DETAIL_NAME",
						"FLOW_FLAG_NAME", "SEND_ORG_NAME", "SEND_STAFF_NO",
						"SEND_DATE", "HANDLE_ORG_NAME", "HANDLE_STAFF_NO",
						"HANDLE_DATE"]
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
					value : Ext.Date.add(new Date(), Ext.Date.MONTH, -6),
					// value : new Date(),
					format : 'Y-m'
				}, {
					xtype : 'datefield',
					fieldLabel : '结束日期',
					id : 'eleHisQueryEdate',
					value : new Date(),
					format : 'Y-m'
				}, {
					xtype : 'button',
					text : '查询',
					align : 'center',
					width : 80,
					handler : function() {
						if (Ext.isEmpty(sConsNo) || Ext.isEmpty(sAlarmCode)) {
							Ext.Msg.alert("提示", "请选择一条记录");
							return;
						} else {
							queryExceptHisInfo(sOrgNo, sConsNo, sAlarmCode);
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
					text : "异常类型",
					width : 120,
					dataIndex : 'ALARM_TYPE',
					hidden : true,
					align : 'center',
					sortable : true
				}, {
					text : "异常类型",
					width : 120,
					dataIndex : 'EXCEPT_TYPE_NAME',
					align : 'center',
					sortable : true

				}, {
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
					dataIndex : 'EVENT_LEVEL_NAME',
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
				}, {
					text : "流程状态",
					width : 120,
					dataIndex : 'FLOW_STATUS_NAME',
					align : 'center',
					sortable : false
				}, {
					text : "流程状态明细",
					width : 120,
					dataIndex : 'FLOW_STATUS_DETAIL_NAME',
					align : 'center',
					sortable : false
				}, {
					text : "流程标记",
					width : 120,
					dataIndex : 'FLOW_STATUS_NAME',
					align : 'center',
					sortable : false
				}, {
					text : "派工单位",
					width : 120,
					dataIndex : 'SEND_ORG_NAME',
					align : 'center',
					sortable : false
				}, {
					text : "派工人",
					width : 120,
					dataIndex : 'SEND_STAFF_NO',
					align : 'center',
					sortable : false
				}, {
					text : "派工日期",
					width : 120,
					dataIndex : 'SEND_DATE',
					align : 'center',
					sortable : false
				}, {
					text : "处理单位",
					width : 120,
					dataIndex : 'HANDLE_ORG_NAME',
					align : 'center',
					sortable : false
				}, {
					text : "处理人",
					width : 120,
					dataIndex : 'HANDLE_STAFF_NO',
					align : 'center',
					sortable : false
				}, {
					text : "处理日期",
					width : 120,
					dataIndex : 'HANDLE_DATE',
					align : 'center',
					sortable : false
				}]
			// ,
			// dockedItems : [{
			// xtype : 'pagingtoolbar',
			// store : abnormalEleHisStore,
			// dock : 'bottom',
			// displayInfo : true
			// }]

		});
	abnormalInfoHisGrid.addDocked(new Ext.create('Ext.ux.MyToolBar', {
				dock : 'bottom',
				expallable : true,// 是否导出全部
				expcurable : true,// 是否导出当前页
				grid : abnormalInfoHisGrid,// 当前需要导出的grid
				title : '用电异常历史事件明细',// 导出excel的文件名称
				store : abnormalEleHisStore,
				displayInfo : true
			}));

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
				items : [abnormalEleChartPanel,
						eleAbnornalMeterEventTotalPanel,
						eleAbnornalTmnlEventTotalPanel, abnormalEleFilePanel,
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
					orgNo : LOGGEDORGNO
				},
				callback : function(records, operation, success) {
					Ext.getCmp('eleAbnolOrgValue').setValue(LOGGEDORGNO);
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
					Ext.getCmp('eleAbnolConsType').setValue('-1');
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
							queryMode : 'local',
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
		fileAlarmMessage = "";
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
		Ext.getCmp("eleAbnormalConnectcap")
				.setValue(staTotalList[0].CONTRACT_CAP);
		Ext.getCmp("eleAbnormalConsSort")
				.setValue(staTotalList[0].CONS_SORT_NAME);
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
		Ext.getCmp("eleAbnormalCollNo").setValue(staTotalList[0].CP_NO);
		Ext.getCmp("eleAbnormalCollAddr").setValue(staTotalList[0].CP_ADDR);
		Ext.getCmp("eleAbnormalCollType").setValue(staTotalList[0].CP_TYPE);

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
		Ext.getCmp("eleAbnormalMeterCt").setValue(staTotalList[0].CT);
		Ext.getCmp("eleAbnormalMeterPt").setValue(staTotalList[0].PT);

		if (Ext.isEmpty(staTotalList[0].RUN_CAP)) {
			fileAlarmMessage += "客户档案异常提示：用户运行容量为空;";
		}
		// else {
		// fileAlarmMessage += "客户档案信息正常:运行容量;";
		// }
		if (Ext.isEmpty(staTotalList[0].VOLT_CODE)) {
			fileAlarmMessage += "客户电能表电压等级为空;";
		}
		// else {
		// fileAlarmMessage += "电能表档案信息正常:电压等级容量;";
		// }
		if (Ext.isEmpty(staTotalList[0].CT) || Ext.isEmpty(staTotalList[0].PT)) {
			fileAlarmMessage += "CT是 " + staTotalList[0].CT + "PT是 "
					+ staTotalList[0].PT + ";";
		}
		// else {
		// fileAlarmMessage += "电能表档案信息正常:电压等级容量;"+"CT是
		// "+staTotalList[0].CT+"PT是 "+staTotalList[0].PT+";";
		// }
		if ((staTotalList[0].MEAS_NO == 1 && staTotalList[0].WIRING_MODE == 2)
				|| (staTotalList[0].MEAS_NO == 2 && staTotalList[0].WIRING_MODE == 3)
				|| (staTotalList[0].MEAS_NO == 3 && staTotalList[0].WIRING_MODE == 1)) {
			// fileAlarmMessage+="计量方式与接线方式一致;"
		} else {
			fileAlarmMessage += "计量方式是" + staTotalList[0].MEAS_MODE + "  计量方式是"
					+ staTotalList[0].WIRING_MODE_NAME + " ，二者不对应; "
		}

		if (fileAlarmMessage == "" || Ext.isElement(fileAlarmMessage)) {
			fileAlarmMessage += "   \n  档案信息正常 。    ";
		} else {
			fileAlarmMessage += "   \n 上述档案问题会造成 异常分析误判，请核对后无误后再进行下一步处理。"
		}
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

		queryEleAbnormalExceptInfo('');

	}

	renderModel(totalPanel, "用电异常分析");

	// ---查询用电异常信息------
	queryEleAbnormalExceptInfo = function(alarmCode) {
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
	function queryExceptHisInfo(orgNo, consNo, alarmCode) {
		var queryItems = {};
		// abnormalEleHisStore.load({
		// params : {
		abnormalEleHisStore.proxy.extraParams = {
			'queryItems.orgNo' : orgNo,
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
	function queryEleCurveInfo(alarmCode, meterId, assetNo, alarmDate, runCap,
			typeCode) {
		Ext.getCmp('abnormalEleChartPanelId').removeAll();
		if (alarmCode == '00111' || alarmCode == '00112'
				|| alarmCode == '00113') {// ---电流异常分析

			Ext.define('EleBLPhase', {
						extend : 'Ext.data.Model',
						fields : ["DATA_TIME", "UA", "UB", "UC", "IA", "IB",
								"IC", "MEAS_MODE", "MEAS_MODE_NAME"]
					});
			var bLPhaseStore = Ext.create('Ext.data.Store', {
						model : 'EleBLPhase',
						remoteSort : true,
						proxy : new Ext.data.MemoryProxy()
					});
			var bLPhaseGridPanel = Ext.create('Ext.grid.Panel', {
				height : 300,
				width : Ext.getCmp('abnormalEleChartPanelId').getWidth(),
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
							width : 80,
							dataIndex : 'IA',
							align : 'center',
							sortable : false,
							renderer : function(value, m, r) {
								if (alarmCode == '00113') {
									if (typeCode == 2 && value == 0) {
										return "<font color='#D4101D';font-weight:bold>"
												+ value + "</font>";
									} else if (typeCode == 1 && value <= 6) {
										return "<font color='#D4101D';font-weight:bold>"
												+ value + "</font>";
									} else {
										return value;
									}
								} else if (alarmCode == '00112') {
									var ia = r.get("IA") == '' ? 0 : r
											.get("IA");
									var ib = r.get("IB") == '' ? 0 : r
											.get("IB");
									var ic = r.get("IC") == '' ? 0 : r
											.get("IC");
									var max = (ia > ib ? ia : ib) > ic
											? (ia > ib ? ia : ib)
											: ic;
									var min = (ia < ib ? ia : ib) < ic
											? (ia < ib ? ia : ib)
											: ic;

									if ((r.get("MEAS_MODE") == 1 || r
											.get("MEAS_MODE") == 2)
											&& ia != 0 && ib != 0 && ic != 0) {
										var ratio = (max - min) / max * 100
										if (ratio > 15) {
											return "<font color='#D4101D';font-weight:bold>"
													+ value + "</font>";
										} else {
											return value;
										}
									} else {
										return value;
									}
								} else {
									return value;
								}
							}
						}, {
							text : "B相电流",
							width : 80,
							dataIndex : 'IB',
							align : 'center',
							sortable : false,
							renderer : function(value, m, r) {
								if (alarmCode == '00113') {
									if (typeCode == 2 && value == 0) {
										return "<font color='#D4101D';font-weight:bold>"
												+ value + "</font>";
									} else if (typeCode == 1 && value <= 6) {
										return "<font color='#D4101D';font-weight:bold>"
												+ value + "</font>";
									} else {
										return value;
									}
								} else if (alarmCode == '00112') {
									var ia = r.get("IA") == '' ? 0 : r
											.get("IA");
									var ib = r.get("IB") == '' ? 0 : r
											.get("IB");
									var ic = r.get("IC") == '' ? 0 : r
											.get("IC");
									var max = (ia > ib ? ia : ib) > ic
											? (ia > ib ? ia : ib)
											: ic;
									var min = (ia < ib ? ia : ib) < ic
											? (ia < ib ? ia : ib)
											: ic;
									if ((r.get("MEAS_MODE") == 2) && ia != 0
											&& ib != 0 && ic != 0) {
										var ratio = (max - min) / max * 100
										if (ratio > 15) {
											return "<font color='#D4101D';font-weight:bold>"
													+ value + "</font>";
										} else {
											return value;
										}
									} else {
										return value;
									}
								} else {
									return value;
								}
							}
						}, {
							text : "C相电流",
							width : 80,
							dataIndex : 'IC',
							align : 'center',
							sortable : false,
							renderer : function(value, m, r) {
								if (alarmCode == '00113') {
									if (typeCode == 2 && value == 0) {
										return "<font color='#D4101D';font-weight:bold>"
												+ value + "</font>";
									} else if (typeCode == 1 && value <= 6) {
										return "<font color='#D4101D';font-weight:bold>"
												+ value + "</font>";
									} else {
										return value;
									}
								} else if (alarmCode == '00112') {

									var ia = r.get("IA") == '' ? 0 : r
											.get("IA");
									var ib = r.get("IB") == '' ? 0 : r
											.get("IB");
									var ic = r.get("IC") == '' ? 0 : r
											.get("IC");
									var max = (ia > ib ? ia : ib) > ic
											? (ia > ib ? ia : ib)
											: ic;
									var min = (ia < ib ? ia : ib) < ic
											? (ia < ib ? ia : ib)
											: ic;

									if ((r.get("MEAS_MODE") == 1 || r
											.get("MEAS_MODE") == 2)
											&& ia != 0 && ib != 0 && ic != 0) {
										var ratio = (max - min) / max * 100
										if (ratio > 15) {
											return "<font color='#D4101D';font-weight:bold>"
													+ value + "</font>";
										} else {
											return value;
										}
									} else {
										return value;
									}

								} else {
									return value;
								}

							}
						}, {
							text : "A相电压",
							width : 80,
							dataIndex : 'UA',
							align : 'center',
							sortable : false
						}, {
							text : "B相电压",
							width : 80,
							dataIndex : 'UB',
							align : 'center',
							sortable : true
						}, {
							text : "C相电压",
							width : 80,
							dataIndex : 'UC',
							align : 'center',
							sortable : false
						}, {
							text : "计量方式",
							width : 85,
							dataIndex : 'MEAS_MODE_NAME',
							align : 'center',
							sortable : false
						}]

			});
			bLPhaseStore.removeAll();
			var eleRadioPanel = Ext.create('Ext.panel.Panel', {
						border : true,
						height : 33,
						width : 180,
						frame : true,
						// region : 'north',
						layout : 'fit',
						items : [{
							// margin : '5 0 0 10',
							xtype : 'radiogroup',
							border : false,
							hideLabel : true,
							columns : 2,
							vertical : true,
							items : [{
								boxLabel : '曲线',
								name : 'eleCurvePhaseRadio',
								inputValue : '1',
								checked : true,
								listeners : {
									click : {
										element : 'el',
										fn : function() {
											Ext.getCmp('phasePicAndDataPanel').layout
													.setActiveItem(0);
										}
									}
								}
							}, {
								boxLabel : '数据',
								name : 'eleCurvePhaseRadio',
								inputValue : '2',
								listeners : {
									click : {
										element : 'el',
										fn : function() {
											Ext.getCmp('phasePicAndDataPanel').layout
													.setActiveItem(1);
										}
									}
								}
							}]
						}]
					});
			var toolbar = Ext.create('Ext.toolbar.Toolbar', {
						height : 35,
						width : Ext.getCmp('abnormalEleChartPanelId')
								.getWidth(),
						dock : 'top',
						items : [eleRadioPanel, {
									xtype : 'tbfill'
								}, '-', getRemarkBtn(), '-', appointDate]
					});
			Ext.getCmp('abnormalEleChartPanelId').add(toolbar);
			var phasePicturePanel = Ext.create('Ext.panel.Panel', {
						layout : 'fit',
						id : 'phasePicturePanel',
						autoScroll : true,
						border : false,
						height : 240,
						items : []
					});
			Ext.getCmp('abnormalEleChartPanelId').getEl().mask('正在查询...');
			Ext.Ajax.request({
				url : 'eleAbnormalAnalyAction!queryBLPhaseInfo.action',
				params : {
					'queryItems.meterId' : meterId,
					'queryItems.dataTime' : alarmDate
				},
				success : function(response) {
					var result = Ext.decode(response.responseText);
					var resultList = result.resultList;
					if (!Ext.isEmpty(resultList)) {
						bLPhaseStore.loadData(resultList);
						// ------电流---
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
						var xmlData2 = "<graph caption='电流曲线图' xAxisName='' yAxisName='电流值' labelDisplay = 'WRAP' anchorRadius='3' decimalPrecision='0' formatNumberScale='0' bgcolor='F3f3f3' bgAlpha='70' numvdivlines='5' showValues='0' divLineColor='CC3300' divLineIsDashed='1' chartRightMargin='50' labelStep='8'>";
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
						xmlData2 += "<dataset seriesName='C相' color='#9932CD ' anchorBorderColor='#9932CD ' anchorBgColor='#9932CD'>";
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

						// 生成电压数据
						var abnormalEleChartFitPhasePanel2 = Ext.create(
								'Ext.panel.Panel', {
									id : 'abnormalEleChartFitPhasePanel2',
									border : false,
									height : 300,
									width : Ext
											.getCmp('abnormalEleChartPanelId')
											.getWidth(),
									renderTo : Ext.getBody()
								});
						var xmlData = "<graph caption='电压曲线图' xAxisName='' yAxisName='电压值' labelDisplay = 'WRAP' anchorRadius='3' decimalPrecision='0' formatNumberScale='0' bgcolor='F3f3f3' bgAlpha='70' numvdivlines='5' showValues='0' divLineColor='CC3300' divLineIsDashed='1' chartRightMargin='50' labelStep='8'>";
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
						xmlData += "<dataset seriesName='C相' color='#9932CD' anchorBorderColor='#9932CD ' anchorBgColor='#9932CD'>";
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
						picCharts.render("abnormalEleChartFitPhasePanel2");
						Ext.getCmp('phasePicturePanel')
								.add(abnormalEleChartFitPanelId2);
						Ext.getCmp('phasePicturePanel')
								.add(abnormalEleChartFitPhasePanel2);

					}

					var phasePicAndDataPanel = Ext.create('Ext.panel.Panel', {
								region : 'center',
								layout : 'card',
								id : 'phasePicAndDataPanel',
								activeItem : 0,
								items : [phasePicturePanel, bLPhaseGridPanel]
							});

					var eleNewTotalPanel = Ext.create('Ext.panel.Panel', {
								height : 450,
								resizable : false,
								layout : 'border',
								// items : [eleRadioPanel, phasePicAndDataPanel]
								items : [phasePicAndDataPanel]
							});

					Ext.getCmp('abnormalEleChartPanelId').add(eleNewTotalPanel);
					Ext.getCmp('abnormalEleChartPanelId').doLayout();
					Ext.getCmp('abnormalEleChartPanelId').getEl().unmask();
				},
				failure : function(response) {
					Ext.Msg.alert('提示', '查询断电流曲线信息失败');
					Ext.getCmp('abnormalEleChartPanelId').getEl().unmask();
				}

			});

		} else if (alarmCode == '00110' || alarmCode == '00117'
				|| alarmCode == '00118' || alarmCode == '0011C') {// ---电压异常分析

			Ext.define('EleBLVolt', {
						extend : 'Ext.data.Model',
						fields : ["DATA_TIME", "UA", "UB", "UC", "IA", "IB",
								"IC", "MEAS_MODE", "MEAS_MODE_NAME"]
					});

			var bLVoltStore = Ext.create('Ext.data.Store', {
						model : 'EleBLVolt',
						remoteSort : true,
						proxy : new Ext.data.MemoryProxy()
					});

			var bLVoltGridPanel = Ext.create('Ext.grid.Panel', {
				height : 300,
				width : Ext.getCmp('abnormalEleChartPanelId').getWidth(),
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
							width : 80,
							dataIndex : 'UA',
							align : 'center',
							sortable : false,
							renderer : function(value, m, r) {
								if (alarmCode == '00110') {
									if (typeCode == 1
											&& r.get("MEAS_MODE") == 1
											&& (value < 90 || value > 110)) {
										return "<font color='#D4101D';font-weight:bold>"
												+ value + "</font>";
									} else if (typeCode == 1
											&& r.get("MEAS_MODE") == 2
											&& (value < 198 || value > 242)) {
										return "<font color='#D4101D';font-weight:bold>"
												+ value + "</font>";
									} else if (typeCode == 2 && value == 0) {
										return "<font color='#D4101D';font-weight:bold>"
												+ value + "</font>";
									} else if (r.get("MEAS_MODE") == 1
											&& (value < 90 || value > 110)) {
										return "<font color='#D4101D';font-weight:bold>"
												+ value + "</font>";
									} else if (r.get("MEAS_MODE") == 2
											&& (value < 200 || value > 242)) {
										return "<font color='#D4101D';font-weight:bold>"
												+ value + "</font>";
									} else {
										return value;
									}
								} else if (alarmCode == '00118') {

									var ia = r.get("UA") == '' ? 0 : r
											.get("UA");
									var ib = r.get("UB") == '' ? 0 : r
											.get("UB");
									var ic = r.get("UC") == '' ? 0 : r
											.get("UC");
									var max = (ia > ib ? ia : ib) > ic
											? (ia > ib ? ia : ib)
											: ic;
									var min = (ia < ib ? ia : ib) < ic
											? (ia < ib ? ia : ib)
											: ic;

									if ((r.get("MEAS_MODE") == 1 || r
											.get("MEAS_MODE") == 2)
											&& ia != 0 && ib != 0 && ic != 0) {
										var ratio = (max - min) / max * 100
										if (ratio > 15) {
											return "<font color='#D4101D';font-weight:bold>"
													+ value + "</font>";
										} else {
											return value;
										}
									} else {
										return value;
									}

								} else {
									return value;
								}

							}
						}, {
							text : "B相电压",
							width : 80,
							dataIndex : 'UB',
							align : 'center',
							sortable : true,
							renderer : function(value, m, r) {

								if (alarmCode == '00110') {
									if (typeCode == 1
											&& r.get("MEAS_MODE") == 1
											&& (value < 90 || value > 110)) {
										return "<font color='#D4101D';font-weight:bold>"
												+ value + "</font>";
									} else if (typeCode == 1
											&& r.get("MEAS_MODE") == 2
											&& (value < 198 || value > 242)) {
										return "<font color='#D4101D';font-weight:bold>"
												+ value + "</font>";
									} else if (typeCode == 2 && value == 0) {
										return "<font color='#D4101D';font-weight:bold>"
												+ value + "</font>";
									} else if (r.get("MEAS_MODE") == 1
											&& (value < 90 || value > 110)) {
										return "<font color='#D4101D';font-weight:bold>"
												+ value + "</font>";
									} else if (r.get("MEAS_MODE") == 2
											&& (value < 200 || value > 242)) {
										return "<font color='#D4101D';font-weight:bold>"
												+ value + "</font>";
									} else if (alarmCode == '00118') {

										var ia = r.get("UA") == '' ? 0 : r
												.get("UA");
										var ib = r.get("UB") == '' ? 0 : r
												.get("UB");
										var ic = r.get("UC") == '' ? 0 : r
												.get("UC");
										var max = (ia > ib ? ia : ib) > ic
												? (ia > ib ? ia : ib)
												: ic;
										var min = (ia < ib ? ia : ib) < ic
												? (ia < ib ? ia : ib)
												: ic;

										if (r.get("MEAS_MODE") == 2 && ia != 0
												&& ib != 0 && ic != 0) {
											var ratio = (max - min) / max * 100
											if (ratio > 15) {
												return "<font color='#D4101D';font-weight:bold>"
														+ value + "</font>";
											} else {
												return value;
											}
										} else {
											return value;
										}

									} else {
										return value;
									}
								} else if (alarmCode == '0011C') {
									if (value > 0) {
										return "<font color='#D4101D';font-weight:bold>"
												+ value + "</font>";
									} else {
										return value;
									}

								} else {
									return value;
								}

							}
						}, {
							text : "C相电压",
							width : 80,
							dataIndex : 'UC',
							align : 'center',
							sortable : false,
							renderer : function(value, m, r) {

								if (alarmCode == '00110') {
									if (typeCode == 1
											&& r.get("MEAS_MODE") == 1
											&& (value < 90 || value > 110)) {
										return "<font color='#D4101D';font-weight:bold>"
												+ value + "</font>";
									} else if (typeCode == 1
											&& r.get("MEAS_MODE") == 2
											&& (value < 198 || value > 242)) {
										return "<font color='#D4101D';font-weight:bold>"
												+ value + "</font>";
									} else if (typeCode == 2 && value == 0) {
										return "<font color='#D4101D';font-weight:bold>"
												+ value + "</font>";
									} else if (r.get("MEAS_MODE") == 1
											&& (value < 90 || value > 110)) {
										return "<font color='#D4101D';font-weight:bold>"
												+ value + "</font>";
									} else if (r.get("MEAS_MODE") == 2
											&& (value < 200 || value > 242)) {
										return "<font color='#D4101D';font-weight:bold>"
												+ value + "</font>";
									} else {
										return value;
									}
								} else if (alarmCode == '00118') {

									var ia = r.get("UA") == '' ? 0 : r
											.get("UA");
									var ib = r.get("UB") == '' ? 0 : r
											.get("UB");
									var ic = r.get("UC") == '' ? 0 : r
											.get("UC");
									var max = (ia > ib ? ia : ib) > ic
											? (ia > ib ? ia : ib)
											: ic;
									var min = (ia < ib ? ia : ib) < ic
											? (ia < ib ? ia : ib)
											: ic;

									if ((r.get("MEAS_MODE") == 1 || r
											.get("MEAS_MODE") == 2)
											&& ia != 0 && ib != 0 && ic != 0) {
										var ratio = (max - min) / max * 100
										if (ratio > 15) {
											return "<font color='#D4101D';font-weight:bold>"
													+ value + "</font>";
										} else {
											return value;
										}
									} else {
										return value;
									}

								} else {
									return value;
								}

							}
						}, {
							text : "A相电流",
							width : 80,
							dataIndex : 'IA',
							align : 'center',
							sortable : false
						}, {
							text : "B相电流",
							width : 80,
							dataIndex : 'IB',
							align : 'center',
							sortable : false,
							renderer : function(value, m, r) {
								if (alarmCode == '0011C' && value > 0) {
									return "<font color='#D4101D';font-weight:bold>"
											+ value + "</font>";
								} else {
									return value;
								}
							}
						}, {
							text : "C相电流",
							width : 80,
							dataIndex : 'IC',
							align : 'center',
							sortable : false
						}, {
							text : "计量方式",
							width : 85,
							dataIndex : 'MEAS_MODE_NAME',
							align : 'center',
							sortable : false
						}]

			});

			bLVoltStore.removeAll();
			var eleRadioPanel = Ext.create('Ext.form.Panel', {
						border : false,
						height : 35,
						width : 180,
						// region : 'north',
						frame : true,
						// layout : 'fit',
						items : [{
							// margin : '0 0 0 0',
							xtype : 'radiogroup',
							hideLabel : true,
							columns : 2,

							vertical : true,
							items : [{
								boxLabel : '曲线',
								name : 'eleCurveVoltRadio',
								inputValue : '1',
								checked : true,
								listeners : {
									click : {
										element : 'el',
										fn : function() {
											Ext.getCmp('voltPicAndDataPanel').layout
													.setActiveItem(0);
										}
									}
								}
							}, {
								boxLabel : '数据',
								name : 'eleCurveVoltRadio',
								inputValue : '2',
								listeners : {
									click : {
										element : 'el',
										fn : function() {
											Ext.getCmp('voltPicAndDataPanel').layout
													.setActiveItem(1);
										}
									}
								}
							}]
						}]
					});
			var toolbar = Ext.create('Ext.toolbar.Toolbar', {
						height : 35,
						width : Ext.getCmp('abnormalEleChartPanelId')
								.getWidth(),
						dock : 'top',
						items : [eleRadioPanel, {
									xtype : 'tbfill'
								}, '-', getRemarkBtn(), '-', appointDate]
					});
			Ext.getCmp('abnormalEleChartPanelId').add(toolbar);
			var voltPicturePanel = Ext.create('Ext.panel.Panel', {
						layout : 'fit',
						id : 'voltPicturePanel',
						autoScroll : true,
						border : false,
						height : 240,
						items : []
					});
			Ext.getCmp('abnormalEleChartPanelId').getEl().mask('正在查询...');
			Ext.Ajax.request({
				url : 'eleAbnormalAnalyAction!queryBLPhaseInfo.action',
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
						var abnormalEleChartFitVoltPanel1 = Ext.create(
								'Ext.panel.Panel', {
									id : 'abnormalEleChartFitVoltPanel1',
									border : false,
									height : 300,
									width : Ext
											.getCmp('abnormalEleChartPanelId')
											.getWidth(),
									renderTo : Ext.getBody()
								});
						var xmlData = "<graph caption='电压曲线图' xAxisName='' yAxisName='电压值' labelDisplay = 'WRAP' anchorRadius='3' decimalPrecision='0' formatNumberScale='0' bgcolor='F3f3f3' bgAlpha='70' numvdivlines='5' showValues='0' divLineColor='CC3300' divLineIsDashed='1' chartRightMargin='50' labelStep='8'>";
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
						xmlData += "<dataset seriesName='C相' color='#9932CD' anchorBorderColor='#9932CD' anchorBgColor='#9932CD'>";
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
						picCharts.render("abnormalEleChartFitVoltPanel1");
						// ------------电流曲线图------------
						var abnormalEleChartFitVoltPanel2 = Ext.create(
								'Ext.panel.Panel', {
									id : 'abnormalEleChartFitVoltPanel2',
									border : false,
									height : 300,
									width : Ext
											.getCmp('abnormalEleChartPanelId')
											.getWidth(),
									renderTo : Ext.getBody()
								});
						var xmlData = "<graph caption='电流曲线图' xAxisName='' yAxisName='电流值' labelDisplay = 'WRAP' anchorRadius='3' decimalPrecision='0' formatNumberScale='0' bgcolor='F3f3f3' bgAlpha='70' numvdivlines='5' showValues='0' divLineColor='CC3300' divLineIsDashed='1' chartRightMargin='50' labelStep='8'>";
						xmlData += "<categories>";
						for (var i = 0; i < resultList.length; i++) {
							xmlData += "<category name='"
									+ resultList[i]['DATA_TIME'].substring(10,
											16) + "'  />";
						}
						xmlData += "</categories>";
						xmlData += "<dataset seriesName='A相'  color='#E7ED1A' anchorBorderColor='#E7ED1A' anchorBgColor='#E7ED1A'>";
						var temp = resultList[0]['IA'];
						if (Ext.isEmpty(temp)) {
							temp = 0;
						}
						xmlData += "<set value='" + temp + "' />";
						for (var i = 1; i < resultList.length; i++) {
							if (Ext.isEmpty(resultList[i]['IA'])) {
								xmlData += "<set value='" + temp + "' />";
							} else {
								xmlData += "<set value='" + resultList[i]['IA']
										+ "' />";
								temp = resultList[i]['IA'];
							}
						}
						xmlData += "</dataset>";
						xmlData += "<dataset seriesName='B相' color='#3BC71A' anchorBorderColor='#3BC71A' anchorBgColor='#3BC71A'>";
						var temp = resultList[0]['IB'];
						if (Ext.isEmpty(temp)) {
							temp = 0;
						}
						xmlData += "<set value='" + temp + "' />";
						for (var i = 1; i < resultList.length; i++) {
							if (Ext.isEmpty(resultList[i]['IB'])) {
								xmlData += "<set value='" + temp + "' />";
							} else {
								xmlData += "<set value='" + resultList[i]['IB']
										+ "' />";
								temp = resultList[i]['IB'];
							}
						}
						xmlData += "</dataset>";
						xmlData += "<dataset seriesName='C相' color='#9932CD' anchorBorderColor='#9932CD' anchorBgColor='#9932CD'>";
						var temp = resultList[0]['IC'];
						if (Ext.isEmpty(temp)) {
							temp = 0;
						}
						xmlData += "<set value='" + temp + "' />";
						for (var i = 1; i < resultList.length; i++) {
							if (Ext.isEmpty(resultList[i]['IC'])) {
								xmlData += "<set value='" + temp + "' />";
							} else {
								xmlData += "<set value='" + resultList[i]['IC']
										+ "' />";
								temp = resultList[i]['IC'];
							}
						}
						xmlData += "</dataset></graph>";

						var picCharts2 = new FusionCharts(
								"./FusionCharts-new/MSLine.swf",
								"elAabnormalPicVoltCharts", Ext
										.getCmp('abnormalEleChartPanelId')
										.getWidth(), 300);
						picCharts2.setDataXML(xmlData);
						picCharts2.render("abnormalEleChartFitVoltPanel2");

						Ext.getCmp('voltPicturePanel')
								.add(abnormalEleChartFitVoltPanel1);
						Ext.getCmp('voltPicturePanel')
								.add(abnormalEleChartFitVoltPanel2);

					}
					var voltPicAndDataPanel = Ext.create('Ext.panel.Panel', {
								region : 'center',
								layout : 'card',
								id : 'voltPicAndDataPanel',
								activeItem : 0,
								items : [voltPicturePanel, bLVoltGridPanel]
							});

					var eleNewTotalPanel = Ext.create('Ext.panel.Panel', {
								height : 450,
								resizable : false,
								layout : 'border',
								// items : [eleRadioPanel, voltPicAndDataPanel]
								items : [voltPicAndDataPanel]
							});

					Ext.getCmp('abnormalEleChartPanelId').add(eleNewTotalPanel);
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
			var toolbar = Ext.create('Ext.toolbar.Toolbar', {
						height : 35,
						width : Ext.getCmp('abnormalEleChartPanelId')
								.getWidth(),
						dock : 'top',
						items : [{
									xtype : 'tbfill'
								}, '-', getRemarkBtn(), '-', appointDate]
					});
			Ext.getCmp('abnormalEleChartPanelId').add(toolbar);
			Ext.define('EleMeterRequire', {
						extend : 'Ext.data.Model',
						fields : ["DATA_DATE", "PAP_DEMAND", "FACTOR"]
					});

			var bMeterRequireStore = Ext.create('Ext.data.Store', {
						model : 'EleMeterRequire',
						remoteSort : true,
						proxy : new Ext.data.MemoryProxy()
					});

			var bMeterRequiretGridPanel = Ext.create('Ext.grid.Panel', {
				height : 300,
				width : Ext.getCmp('abnormalEleChartPanelId').getWidth(),
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
							text : "综合倍率",
							width : 80,
							dataIndex : 'FACTOR',
							align : 'center',
							hidden : true,
							sortable : true
						}, {
							text : "正向有功总需量",
							width : 180,
							dataIndex : 'PAP_DEMAND',
							align : 'center',
							sortable : false,
							renderer : function(value, m, r) {
								if (value * r.get("FACTOR") / runCap > 1) {
									return "<font color='#D4101D';font-weight:bold>"
											+ value + "</font>";
								} else {
									return value;
								}
							}
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
						var xmlData = "<graph caption='正向有功总需量曲线图' xAxisName='' yAxisName='正向有功总需量' labelDisplay = 'WRAP' anchorRadius='3' decimalPrecision='0' formatNumberScale='0' bgcolor='F3f3f3' bgAlpha='70' numvdivlines='5' showValues='0' divLineColor='CC3300' divLineIsDashed='1' chartRightMargin='50' labelStep='1'>";
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
			var toolbar = Ext.create('Ext.toolbar.Toolbar', {
						height : 35,
						width : Ext.getCmp('abnormalEleChartPanelId')
								.getWidth(),
						dock : 'top',
						items : [{
									xtype : 'tbfill'
								}, '-', getRemarkBtn(), '-', appointDate]
					});
			Ext.getCmp('abnormalEleChartPanelId').add(toolbar);
			Ext.define('EleLPower', {
						extend : 'Ext.data.Model',
						fields : ["DATA_TIME", "FACTOR", "VIEWPOWER",
								"FORWARDPOWER", "REVERSEPOWER", "UA", "UB",
								"UC", "IA", "IB", "IC", "P", "Q"]
					});
			var bLPowerStore = Ext.create('Ext.data.Store', {
						model : 'EleLPower',
						remoteSort : true,
						proxy : new Ext.data.MemoryProxy()
					});
			var bLPowerGridPanel = Ext.create('Ext.grid.Panel', {
				height : 300,
				width : Ext.getCmp('abnormalEleChartPanelId').getWidth(),
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
							text : "视在功率",
							width : 80,
							dataIndex : 'VIEWPOWER',
							align : 'center',
							sortable : false,
							renderer : function(value, m, r) {
								if (alarmCode == '00115'
										&& value * r.get("FACTOR") / runCap > 1) {
									return "<font color='#D4101D';font-weight:bold>"
											+ value + "</font>";
								} else {
									return value;
								}
							}
						}, {
							text : "正向有功功率",
							width : 100,
							dataIndex : 'FORWARDPOWER',
							align : 'center',
							sortable : false
						}, {
							text : "正向无功功率",
							width : 100,
							dataIndex : 'REVERSEPOWER',
							align : 'center',
							sortable : false
						}, {
							text : "A相电压",
							width : 80,
							dataIndex : 'UA',
							align : 'center',
							sortable : false
						}, {
							text : "B相电压",
							width : 80,
							dataIndex : 'UB',
							align : 'center',
							sortable : false
						}, {
							text : "C相电压",
							width : 80,
							dataIndex : 'UC',
							align : 'center',
							sortable : false
						}, {
							text : "A相电流",
							width : 80,
							dataIndex : 'IA',
							align : 'center',
							sortable : false
						}, {
							text : "B相电流",
							width : 80,
							dataIndex : 'IB',
							align : 'center',
							sortable : false
						}, {
							text : "C相电流",
							width : 80,
							dataIndex : 'IC',
							align : 'center',
							sortable : false
						}]

			});
			bLPowerStore.removeAll();
			Ext.getCmp('abnormalEleChartPanelId').getEl().mask('正在查询...');
			Ext.Ajax.request({
				url : 'eleAbnormalAnalyAction!queryBLPhaseInfo.action',
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
						var xmlData2 = "<graph caption='功率曲线图' xAxisName='' yAxisName='功率' labelDisplay = 'WRAP' anchorRadius='3' decimalPrecision='0' formatNumberScale='0' bgcolor='F3f3f3' bgAlpha='70' numvdivlines='5' showValues='0' divLineColor='CC3300' divLineIsDashed='1' chartRightMargin='50' labelStep='8'>";
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
			// -------- 曲线和数据切换按钮-----------------

			// ---最近十天平均功率因数---
			Ext.define('EleAvgFactor', {
						extend : 'Ext.data.Model',
						fields : ["DATA_TIME", "AVG_F"]

					});

			var eleAvgFactorStore = Ext.create('Ext.data.Store', {
						model : 'EleAvgFactor',
						remoteSort : true,
						proxy : new Ext.data.MemoryProxy()

					});
			var eleAvgFactorGridPanel = Ext.create('Ext.grid.Panel', {
						height : 100,
						width : Ext.getCmp('abnormalEleChartPanelId')
								.getWidth(),
						loadMask : true,
						autoScroll : true,
						border : false,
						store : eleAvgFactorStore,
						viewConfig : {
							trackOver : false
						},
						columnLines : true,
						columns : [{
									text : '日期',
									width : 120,
									dataIndex : 'STAT_DATE',
									align : 'center',
									sortable : true
								}, {
									text : '平均功率因数',
									width : 120,
									dataIndex : 'AVG_F',
									sortable : true
								}]

					});
			eleAvgFactorStore.removeAll();
			var eleRadioPanel = Ext.create('Ext.panel.Panel', {
						border : false,
						height : 33,
						width : 180,
						frame : true,
						// region : 'north',
						layout : 'fit',
						items : [{
							// margin : '5 0 0 10',
							xtype : 'radiogroup',
							hideLabel : true,
							columns : 2,
							vertical : true,
							items : [{
								boxLabel : '曲线',
								name : 'eleCurveFactorRadio',
								inputValue : '1',
								checked : true,
								listeners : {
									click : {
										element : 'el',
										fn : function() {
											Ext.getCmp('factorPicAndDataPanel')
													.getLayout()
													.setActiveItem(0);
										}
									}
								}
							}, {
								boxLabel : '数据',
								name : 'eleCurveFactorRadio',
								inputValue : '2',
								listeners : {
									click : {
										element : 'el',
										fn : function() {
											Ext.getCmp('factorPicAndDataPanel')
													.getLayout()
													.setActiveItem(1);
										}
									}
								}
							}]
						}]
					});
			var toolbar = Ext.create('Ext.toolbar.Toolbar', {
						height : 35,
						width : Ext.getCmp('abnormalEleChartPanelId')
								.getWidth(),
						dock : 'top',
						items : [eleRadioPanel, {
									xtype : 'tbfill'
								}, '-', getRemarkBtn(), '-', appointDate]
					});
			Ext.getCmp('abnormalEleChartPanelId').add(toolbar);
			var factorPicturePanel = Ext.create('Ext.panel.Panel', {
						layout : 'fit',
						id : 'factorPicturePanel',
						autoScroll : true,
						border : false,
						height : 240,
						items : []
					});
			Ext.getCmp('abnormalEleChartPanelId').getEl().mask('正在查询...');
			Ext.Ajax.request({
				url : 'eleAbnormalAnalyAction!queryMeterFactorInfo.action',
				params : {
					'queryItems.assetNo' : assetNo,
					// 'queryItems.assetNo' : '111111',
					'queryItems.dataTime' : alarmDate
				},
				success : function(response) {
					var result = Ext.decode(response.responseText);
					var resultList = result.resultList;
					if (!Ext.isEmpty(resultList)) {
						eleAvgFactorStore.loadData(resultList);
						var abnormalEleChartAvgFactorPanel = Ext.create(
								'Ext.panel.Panel', {
									id : 'abnormalEleChartAvgFactorPanel',
									border : false,
									height : 300,
									width : Ext
											.getCmp('abnormalEleChartPanelId')
											.getWidth(),
									renderTo : Ext.getBody()
								});
						var xmlData = "<graph caption='平均功率因数曲线图' xAxisName='' yAxisName='平均功率因数' labelDisplay = 'WRAP' anchorRadius='3' decimalPrecision='0' formatNumberScale='0' bgcolor='F3f3f3' bgAlpha='70' numvdivlines='5' showValues='0' divLineColor='CC3300' divLineIsDashed='1' chartRightMargin='50' labelStep='8'>";
						xmlData += "<categories>";
						for (var i = 0; i < resultList.length; i++) {
							xmlData += "<category name='"
									+ resultList[i]['STAT_DATE'].substring(5,
											10) + "'  />";
						}
						xmlData += "</categories>";
						xmlData += "<dataset seriesName='平均功率因数' color='#0000FF' anchorBorderColor='#0000FF' anchorBgColor='#0000FF'>";
						var temp = resultList[0]['AVG_F'];
						if (Ext.isEmpty(temp)) {
							temp = 0;
						}
						xmlData += "<set value='" + temp + "' />";
						for (var i = 1; i < resultList.length; i++) {
							if (Ext.isEmpty(resultList[i]['AVG_F'])) {
								xmlData += "<set value='" + temp + "' />";
							} else {
								xmlData += "<set value='"
										+ resultList[i]['AVG_F'] + "' />";
								temp = resultList[i]['AVG_F'];
							}
						}
						xmlData += "</dataset>";
						xmlData += "</graph>";
						var picCharts = new FusionCharts(
								"./FusionCharts-new/MSLine.swf",
								"elAabnormalPicAvgFactorCharts", Ext
										.getCmp('abnormalEleChartPanelId')
										.getWidth(), 300);
						picCharts.setDataXML(xmlData);
						picCharts.render("abnormalEleChartAvgFactorPanel");

						Ext.getCmp('factorPicturePanel')
								.add(abnormalEleChartAvgFactorPanel);

					}
					getFactorPicAndData();

					Ext.getCmp('abnormalEleChartPanelId').getEl().unmask();
				},
				failure : function(response) {
					Ext.Msg.alert('提示', '查询功率因数信息失败');
					Ext.getCmp('abnormalEleChartPanelId').getEl().unmask();
				}
			});
			function getFactorPicAndData() {

				// ----------测量点功率因数-----------------
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
							height : 200,
							width : Ext.getCmp('abnormalEleChartPanelId')
									.getWidth(),
							loadMask : true,
							border : false,
							autoScroll : true,
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
										width : 80,
										dataIndex : 'F',
										align : 'center',
										sortable : false
									}, {
										text : "视在功率",
										width : 80,
										dataIndex : 'VIEWPOWER',
										align : 'center',
										sortable : false
									}, {
										text : "正向有功功率",
										width : 100,
										dataIndex : 'FORWARDPOWER',
										align : 'center',
										sortable : false
									}, {
										text : "正向无功功率",
										width : 100,
										dataIndex : 'REVERSEPOWER',
										align : 'center',
										sortable : false
									}]

						});
				bPowerFactorStore.removeAll();
				Ext.Ajax.request({
					url : 'eleAbnormalAnalyAction!queryBLPhaseInfo.action',
					params : {
						'queryItems.meterId' : meterId,
						'queryItems.dataTime' : alarmDate
					},
					success : function(response) {
						var result = Ext.decode(response.responseText);
						var resultList = result.resultList;
						if (!Ext.isEmpty(resultList)) {
							bPowerFactorStore.loadData(resultList);
							// ---
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
							var xmlData = "<graph caption='功率因数曲线图' xAxisName='' yAxisName='功率因数' labelDisplay = 'WRAP' anchorRadius='3' decimalPrecision='0' formatNumberScale='0' bgcolor='F3f3f3' bgAlpha='70' numvdivlines='5' showValues='0' divLineColor='CC3300' divLineIsDashed='1' chartRightMargin='50' labelStep='8'>";
							xmlData += "<categories>";
							for (var i = 0; i < resultList.length; i++) {
								xmlData += "<category name='"
										+ resultList[i]['DATA_TIME'].substring(
												10, 16) + "'  />";
							}
							xmlData += "</categories>";

							xmlData += "<dataset seriesName='功率因数' color='#0000FF' anchorBorderColor='#0000FF' anchorBgColor='#0000FF'>";
							var temp = resultList[0]['F'];
							if (Ext.isEmpty(temp)) {
								temp = 0;
							}
							xmlData += "<set value='" + temp + "' />";
							for (var i = 1; i < resultList.length; i++) {
								if (Ext.isEmpty(resultList[i]['F'])) {
									xmlData += "<set value='" + temp + "' />";
								} else {
									xmlData += "<set value='"
											+ resultList[i]['F'] + "' />";
									temp = resultList[i]['F'];
								}
							}
							xmlData += "</dataset>";
							xmlData += "<dataset seriesName='视在功率' color='#3BC71A' anchorBorderColor='#3BC71A' anchorBgColor='#3BC71A'>";
							var temp = resultList[0]['VIEWPOWER'];
							if (Ext.isEmpty(temp)) {
								temp = 0;
							}
							xmlData += "<set value='" + temp + "' />";
							for (var i = 1; i < resultList.length; i++) {
								if (Ext.isEmpty(resultList[i]['VIEWPOWER'])) {
									xmlData += "<set value='" + temp + "' />";
								} else {
									xmlData += "<set value='"
											+ resultList[i]['VIEWPOWER']
											+ "' />";
									temp = resultList[i]['VIEWPOWER'];
								}
							}
							xmlData += "</dataset>";
							xmlData += "<dataset seriesName='正向有功功率' color='#E7ED1A' anchorBorderColor='#E7ED1A' anchorBgColor='#E7ED1A'>";
							var temp = resultList[0]['FORWARDPOWER'];
							if (Ext.isEmpty(temp)) {
								temp = 0;
							}
							xmlData += "<set value='" + temp + "' />";
							for (var i = 1; i < resultList.length; i++) {
								if (Ext.isEmpty(resultList[i]['FORWARDPOWER'])) {
									xmlData += "<set value='" + temp + "' />";
								} else {
									xmlData += "<set value='"
											+ resultList[i]['FORWARDPOWER']
											+ "' />";
									temp = resultList[i]['FORWARDPOWER'];
								}
							}
							xmlData += "</dataset>";
							xmlData += "<dataset seriesName='正向无功功率' color='#9932CD' anchorBorderColor='#9932CD' anchorBgColor='#9932CD'>";
							var temp = resultList[0]['REVERSEPOWER'];
							if (Ext.isEmpty(temp)) {
								temp = 0;
							}
							xmlData += "<set value='" + temp + "' />";
							for (var i = 1; i < resultList.length; i++) {
								if (Ext.isEmpty(resultList[i]['REVERSEPOWER'])) {
									xmlData += "<set value='" + temp + "' />";
								} else {
									xmlData += "<set value='"
											+ resultList[i]['REVERSEPOWER']
											+ "' />";
									temp = resultList[i]['REVERSEPOWER'];
								}
							}
							xmlData += "</dataset>";
							xmlData += "</graph>";
							var picCharts = new FusionCharts(
									"./FusionCharts-new/MSLine.swf",
									"elAabnormalPicFactorCharts", Ext
											.getCmp('abnormalEleChartPanelId')
											.getWidth(), 300);
							picCharts.setDataXML(xmlData);
							picCharts.render("abnormalEleChartFitFactorPanel");
							Ext.getCmp('factorPicturePanel')
									.add(abnormalEleChartFitFactorPanel);
						}
						var factorDataPanel = Ext.create('Ext.panel.Panel', {
									layout : 'fit',
									id : 'factorDataPanel',
									autoScroll : true,
									border : false,
									height : 240,
									items : [eleAvgFactorGridPanel,
											bPowerFactorGridPanel]
								});
						var factorPicAndDataPanel = Ext.create(
								'Ext.panel.Panel', {
									region : 'center',
									layout : 'card',
									id : 'factorPicAndDataPanel',
									activeItem : 0,
									items : [factorPicturePanel,
											factorDataPanel]
								});

						var eleNewTotalPanel = Ext.create('Ext.panel.Panel', {
									height : 450,
									resizable : false,
									layout : 'border',
									// items :
									// [eleRadioPanel,factorPicAndDataPanel]
									items : [factorPicAndDataPanel]
								});

						Ext.getCmp('abnormalEleChartPanelId')
								.add(eleNewTotalPanel);

						Ext.getCmp('abnormalEleChartPanelId').doLayout();
					},
					failure : function(response) {
						Ext.Msg.alert('提示', '查询功率因数信息失败');
					}
				});
			}

		} else if (alarmCode == '0011A') {
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
									width : 80,
									dataIndex : 'VIEWPOWER',
									align : 'center',
									sortable : false
								}, {
									text : "正向有功功率",
									width : 100,
									dataIndex : 'FORWARDPOWER',
									align : 'center',
									sortable : false
								}, {
									text : "正向无功功率",
									width : 100,
									dataIndex : 'REVERSEPOWER',
									align : 'center',
									sortable : false
								}, {
									text : "正向有功电量",
									width : 100,
									dataIndex : 'PAP_E',
									align : 'center',
									sortable : false
								}, {
									text : "反向有功电量",
									width : 100,
									dataIndex : 'RAP_E',
									align : 'center',
									sortable : false
								}]

					});

			bPowerAndEnergyStore.removeAll();
			var eleRadioPanel = Ext.create('Ext.panel.Panel', {
						border : false,
						height : 33,
						frame : true,
						width : 180,
						// region : 'north',
						layout : 'fit',
						items : [{
							// margin : '5 0 0 10',
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
			var toolbar = Ext.create('Ext.toolbar.Toolbar', {
						height : 35,
						width : Ext.getCmp('abnormalEleChartPanelId')
								.getWidth(),
						dock : 'top',
						items : [eleRadioPanel, {
									xtype : 'tbfill'
								}, '-', getRemarkBtn(), '-', appointDate]
					});
			Ext.getCmp('abnormalEleChartPanelId').add(toolbar);
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
				url : 'eleAbnormalAnalyAction!queryBLPhaseInfo.action',
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
						var xmlData = "<graph caption='电量曲线图' xAxisName='' yAxisName='电量' labelDisplay = 'WRAP' anchorRadius='3' decimalPrecision='0' formatNumberScale='0' bgcolor='F3f3f3' bgAlpha='70' numvdivlines='5' showValues='0' divLineColor='CC3300' divLineIsDashed='1' chartRightMargin='50' labelStep='8'>";
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
						xmlData += "<dataset seriesName='反向有功总' color='#9932CD' anchorBorderColor='#9932CD' anchorBgColor='#9932CD'>";

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
						var xmlData2 = "<graph caption='功率曲线图' xAxisName='' yAxisName='功率' labelDisplay = 'WRAP' anchorRadius='3' decimalPrecision='0' formatNumberScale='0' bgcolor='F3f3f3' bgAlpha='70' numvdivlines='5' showValues='0' divLineColor='CC3300' divLineIsDashed='1' chartRightMargin='50' labelStep='8'>";
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
						xmlData2 += "<dataset seriesName='正向无功功率' color='#9932CD' anchorBorderColor='#9932CD' anchorBgColor='#9932CD'>";
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
								id : 'picAndDataPanel',
								activeItem : 0,
								items : [picturePanel, bPowerAndEnergyGridPanel]
							});

					var eleNewTotalPanel = Ext.create('Ext.panel.Panel', {
								height : 450,
								resizable : false,
								// title : '图形',
								layout : 'border',
								// items : [eleRadioPanel, picAndDataPanel]
								items : [picAndDataPanel]
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
		} else if (alarmCode == '0011B') {// ---潮流反向
			Ext.define('EleRevPhase', {
						extend : 'Ext.data.Model',
						fields : ["DATA_TIME", "FACTOR", "VIEWPOWER",
								"FORWARDPOWER", "REVERSEPOWER", "UA", "UB",
								"UC", "IA", "IB", "IC"]
					});
			var eleRevPhaseStore = Ext.create('Ext.data.Store', {
						model : 'EleRevPhase',
						remoteSort : true,
						proxy : new Ext.data.MemoryProxy()
					});
			var eleRevPhaseGridPanel = Ext.create('Ext.grid.Panel', {
				height : 300,
				width : Ext.getCmp('abnormalEleChartPanelId').getWidth(),
				loadMask : true,
				border : false,
				store : eleRevPhaseStore,
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
							width : 80,
							dataIndex : 'VIEWPOWER',
							align : 'center',
							sortable : false
						}, {
							text : "正向有功功率",
							width : 100,
							dataIndex : 'FORWARDPOWER',
							align : 'center',
							sortable : false
						}, {
							text : "正向无功功率",
							width : 100,
							dataIndex : 'REVERSEPOWER',
							align : 'center',
							sortable : false
						}, {
							text : "A相电压",
							width : 80,
							dataIndex : 'UA',
							align : 'center',
							sortable : false
						}, {
							text : "B相电压",
							width : 80,
							dataIndex : 'UB',
							align : 'center',
							sortable : false
						}, {
							text : "C相电压",
							width : 80,
							dataIndex : 'UC',
							align : 'center',
							sortable : false
						}, {
							text : "A相电流",
							width : 80,
							dataIndex : 'IA',
							align : 'center',
							sortable : false,
							renderer : function(value, m, r) {
								if (value < 0) {
									return "<font color='#D4101D';font-weight:bold>"
											+ value + "</font>";
								} else {
									return value;
								}
							}
						}, {
							text : "B相电流",
							width : 80,
							dataIndex : 'IB',
							align : 'center',
							sortable : false,
							renderer : function(value, m, r) {
								if (value < 0) {
									return "<font color='#D4101D';font-weight:bold>"
											+ value + "</font>";
								} else {
									return value;
								}
							}
						}, {
							text : "C相电流",
							width : 80,
							dataIndex : 'IC',
							align : 'center',
							sortable : false,
							renderer : function(value, m, r) {
								if (value < 0) {
									return "<font color='#D4101D';font-weight:bold>"
											+ value + "</font>";
								} else {
									return value;
								}
							}
						}]

			});
			eleRevPhaseStore.removeAll();
			var eleRadioPanel = Ext.create('Ext.form.Panel', {
				border : false,
				height : 35,
				width : 180,
				// region : 'north',
				frame : true,
				// layout : 'fit',
				items : [{
					// margin : '0 0 0 0',
					xtype : 'radiogroup',
					hideLabel : true,
					columns : 2,

					vertical : true,
					items : [{
						boxLabel : '曲线',
						name : 'eleCurveRevPhaseRadio',
						inputValue : '1',
						checked : true,
						listeners : {
							click : {
								element : 'el',
								fn : function() {
									Ext.getCmp('revPhasePicAndDataPanel').layout
											.setActiveItem(0);
								}
							}
						}
					}, {
						boxLabel : '数据',
						name : 'eleCurveRevPhaseRadio',
						inputValue : '2',
						listeners : {
							click : {
								element : 'el',
								fn : function() {
									Ext.getCmp('revPhasePicAndDataPanel').layout
											.setActiveItem(1);
								}
							}
						}
					}]
				}]
			});
			var toolbar = Ext.create('Ext.toolbar.Toolbar', {
						height : 35,
						width : Ext.getCmp('abnormalEleChartPanelId')
								.getWidth(),
						dock : 'top',
						items : [eleRadioPanel, {
									xtype : 'tbfill'
								}, '-', getRemarkBtn(), '-', appointDate]
					});
			Ext.getCmp('abnormalEleChartPanelId').add(toolbar);
			var eleRevPhasePicPanel = Ext.create('Ext.panel.Panel', {
						layout : 'fit',
						id : 'eleRevPhasePicPanel',
						autoScroll : true,
						border : false,
						height : 240,
						items : []
					});
			Ext.getCmp('abnormalEleChartPanelId').getEl().mask('正在查询...');
			Ext.Ajax.request({
				url : 'eleAbnormalAnalyAction!queryBLPhaseInfo.action',
				params : {
					'queryItems.meterId' : meterId,
					'queryItems.dataTime' : alarmDate
				},
				success : function(response) {
					var result = Ext.decode(response.responseText);
					var resultList = result.resultList;
					if (!Ext.isEmpty(resultList)) {
						eleRevPhaseStore.loadData(resultList);
						// 生成电压数据
						var abnormalEleChartFitRevPhasePanel1 = Ext.create(
								'Ext.panel.Panel', {
									id : 'abnormalEleChartFitRevPhasePanel1',
									border : false,
									height : 300,
									width : Ext
											.getCmp('abnormalEleChartPanelId')
											.getWidth(),
									renderTo : Ext.getBody()
								});
						var xmlData = "<graph caption='功率曲线图' xAxisName='' yAxisName='功率值' labelDisplay = 'WRAP' anchorRadius='3' decimalPrecision='0' formatNumberScale='0' bgcolor='F3f3f3' bgAlpha='70' numvdivlines='5' showValues='0' divLineColor='CC3300' divLineIsDashed='1' chartRightMargin='50' labelStep='8'>";
						xmlData += "<categories>";
						for (var i = 0; i < resultList.length; i++) {
							xmlData += "<category name='"
									+ resultList[i]['DATA_TIME'].substring(10,
											16) + "'  />";
						}
						xmlData += "</categories>";
						xmlData += "<dataset seriesName='正向有功功率'  color='#E7ED1A' anchorBorderColor='#E7ED1A' anchorBgColor='#E7ED1A'>";
						var temp = resultList[0]['FORWARDPOWER'];
						if (Ext.isEmpty(temp)) {
							temp = 0;
						}
						xmlData += "<set value='" + temp + "' />";
						for (var i = 1; i < resultList.length; i++) {
							if (Ext.isEmpty(resultList[i]['FORWARDPOWER'])) {
								xmlData += "<set value='" + temp + "' />";
							} else {
								xmlData += "<set value='"
										+ resultList[i]['FORWARDPOWER']
										+ "' />";
								temp = resultList[i]['FORWARDPOWER'];
							}
						}
						xmlData += "</dataset>";
						xmlData += "<dataset seriesName='正向无功功率' color='#3BC71A' anchorBorderColor='#3BC71A' anchorBgColor='#3BC71A'>";
						var temp = resultList[0]['REVERSEPOWER'];
						if (Ext.isEmpty(temp)) {
							temp = 0;
						}
						xmlData += "<set value='" + temp + "' />";
						for (var i = 1; i < resultList.length; i++) {
							if (Ext.isEmpty(resultList[i]['REVERSEPOWER'])) {
								xmlData += "<set value='" + temp + "' />";
							} else {
								xmlData += "<set value='"
										+ resultList[i]['REVERSEPOWER']
										+ "' />";
								temp = resultList[i]['REVERSEPOWER'];
							}
						}
						xmlData += "</dataset>";

						xmlData += "</graph>";

						var picCharts = new FusionCharts(
								"./FusionCharts-new/MSLine.swf",
								"elAabnormalPicRevPhaseCharts", Ext
										.getCmp('abnormalEleChartPanelId')
										.getWidth(), 300);
						picCharts.setDataXML(xmlData);
						picCharts.render("abnormalEleChartFitRevPhasePanel1");
						// ------------电流曲线图------------
						var abnormalEleChartFitRevPhasePanel2 = Ext.create(
								'Ext.panel.Panel', {
									id : 'abnormalEleChartFitRevPhasePanel2',
									border : false,
									height : 300,
									width : Ext
											.getCmp('abnormalEleChartPanelId')
											.getWidth(),
									renderTo : Ext.getBody()
								});
						var xmlData = "<graph caption='电流曲线图' xAxisName='' yAxisName='电流值' labelDisplay = 'WRAP' anchorRadius='3' decimalPrecision='0' formatNumberScale='0' bgcolor='F3f3f3' bgAlpha='70' numvdivlines='5' showValues='0' divLineColor='CC3300' divLineIsDashed='1' chartRightMargin='50' labelStep='8'>";
						xmlData += "<categories>";
						for (var i = 0; i < resultList.length; i++) {
							xmlData += "<category name='"
									+ resultList[i]['DATA_TIME'].substring(10,
											16) + "'  />";
						}
						xmlData += "</categories>";
						xmlData += "<dataset seriesName='A相'  color='#E7ED1A' anchorBorderColor='#E7ED1A' anchorBgColor='#E7ED1A'>";
						var temp = resultList[0]['IA'];
						if (Ext.isEmpty(temp)) {
							temp = 0;
						}
						xmlData += "<set value='" + temp + "' />";
						for (var i = 1; i < resultList.length; i++) {
							if (Ext.isEmpty(resultList[i]['IA'])) {
								xmlData += "<set value='" + temp + "' />";
							} else {
								xmlData += "<set value='" + resultList[i]['IA']
										+ "' />";
								temp = resultList[i]['IA'];
							}
						}
						xmlData += "</dataset>";
						xmlData += "<dataset seriesName='B相' color='#3BC71A' anchorBorderColor='#3BC71A' anchorBgColor='#3BC71A'>";
						var temp = resultList[0]['IB'];
						if (Ext.isEmpty(temp)) {
							temp = 0;
						}
						xmlData += "<set value='" + temp + "' />";
						for (var i = 1; i < resultList.length; i++) {
							if (Ext.isEmpty(resultList[i]['IB'])) {
								xmlData += "<set value='" + temp + "' />";
							} else {
								xmlData += "<set value='" + resultList[i]['IB']
										+ "' />";
								temp = resultList[i]['IB'];
							}
						}
						xmlData += "</dataset>";
						xmlData += "<dataset seriesName='C相' color='#9932CD' anchorBorderColor='#9932CD' anchorBgColor='#9932CD'>";
						var temp = resultList[0]['IC'];
						if (Ext.isEmpty(temp)) {
							temp = 0;
						}
						xmlData += "<set value='" + temp + "' />";
						for (var i = 1; i < resultList.length; i++) {
							if (Ext.isEmpty(resultList[i]['IC'])) {
								xmlData += "<set value='" + temp + "' />";
							} else {
								xmlData += "<set value='" + resultList[i]['IC']
										+ "' />";
								temp = resultList[i]['IC'];
							}
						}
						xmlData += "</dataset></graph>";

						var picCharts2 = new FusionCharts(
								"./FusionCharts-new/MSLine.swf",
								"elAabnormalPicRevPhaseCharts2", Ext
										.getCmp('abnormalEleChartPanelId')
										.getWidth(), 300);
						picCharts2.setDataXML(xmlData);
						picCharts2.render("abnormalEleChartFitRevPhasePanel2");

						Ext.getCmp('eleRevPhasePicPanel')
								.add(abnormalEleChartFitRevPhasePanel1);
						Ext.getCmp('eleRevPhasePicPanel')
								.add(abnormalEleChartFitRevPhasePanel2);

					}
					var revPhasePicAndDataPanel = Ext.create('Ext.panel.Panel',
							{
								region : 'center',
								layout : 'card',
								id : 'revPhasePicAndDataPanel',
								activeItem : 0,
								items : [eleRevPhasePicPanel,
										eleRevPhaseGridPanel]
							});

					var eleNewTotalPanel = Ext.create('Ext.panel.Panel', {
								height : 450,
								resizable : false,
								layout : 'border',
								items : [revPhasePicAndDataPanel]
							});

					Ext.getCmp('abnormalEleChartPanelId').add(eleNewTotalPanel);
					Ext.getCmp('abnormalEleChartPanelId').doLayout();
					Ext.getCmp('abnormalEleChartPanelId').getEl().unmask();
				},
				failure : function(response) {
					Ext.Msg.alert('提示', '查询潮流反向信息失败');
					Ext.getCmp('abnormalEleChartPanelId').getEl().unmask();
				}

			});

		}
	};

	// -------------------查询电能表事件--------------------------
	function queryMeterEventInfo(alarmId) {
		var queryItems = {};
		eleMeterEventDetailStore.removeAll();
		meterEleMeterEventStore.proxy.extraParams = {
			'queryItems.meterId' : alarmId,
			'queryItems.eventTypeCode' : '02'
		};
		meterEleMeterEventStore.load();
		// meterEleMeterEventStore.currentPage=1;
		// meterEleMeterEventStore.load({
		// start:0
		// });

	}
	// --------------------查询电能表事件明细-----------------
	// function queryAlarmMeterEventDetailInfo() {

	// Ext.define('EleMeterEventDetail', {
	// extend : 'Ext.data.Model',
	// fields : ["ITEM_NO", "EVENT_DATA"]
	// });
	//
	// var eleMeterEventDetailStore = Ext.create('Ext.data.Store', {
	// model : 'EleMeterEventDetail',
	// remoteSort : true,
	// // pageSize: DEFAULT_PAGE_SIZE,
	// buffered : true,
	// proxy : {
	// type : 'ajax',
	// url : 'eleAbnormalAnalyAction!queryMeterEventDetail.action',
	// reader : {
	// type : 'json',
	// root : 'resultList'
	// }
	// }
	// });
	//
	// var eleMeterEventGridPanel = Ext.create('Ext.grid.Panel', {
	// loadMask : true,
	// border : false,
	// store : eleMeterEventDetailStore,
	// viewConfig : {
	// trackOver : false
	// },
	// columnLines : true,
	// columns : [{
	// text : "序号",
	// width : 120,
	// dataIndex : 'ITEM_NO',
	// align : 'center',
	// sortable : true
	// }, {
	// text : "事件对应数据",
	// width : 120,
	// dataIndex : 'EVENT_DATA',
	// align : 'center',
	// sortable : false
	// }]
	// // ,
	// // dockedItems: [{
	// // xtype: 'pagingtoolbar',
	// // store: eleMeterEventDetailStore,
	// // dock: 'bottom',
	// // displayInfo: true
	// // }]
	// });

	// eleMeterEventDetailStore.proxy.extraParams = {
	// 'queryItems.id' : id
	// };
	// eleMeterEventDetailStore.load();
	//
	// Ext.create('Ext.window.Window', {
	// modal : true,
	// height : 110,
	// width : 340,
	// resizable : false,
	// title : '电能表事件明细',
	// layout : 'fit',
	// items : [eleMeterEventGridPanel]
	// }).show();
	// }

	// --------------------查询终端事件------------------------------------
	function queryTmnlEventInfo(alarmId) {
		eleTmnlEventDetailStore.removeAll();
		tmnlEleMeterEventStore.proxy.extraParams = {
			'queryItems.terminalId' : alarmId,
			'queryItems.eventTypeCode' : '01'
		};
		tmnlEleMeterEventStore.load();
		// tmnlEleMeterEventStore.currentPage=1;
		// tmnlEleMeterEventStore.load({
		// start:0
		// });
	}
		// function queryAlarmTmnlEventDetailInfo() {
		// Ext.define('EleTmnlEventDetail', {
		// extend : 'Ext.data.Model',
		// fields : ["ITEM_NO", "EVENT_DATA"]
		// });
		//
		// var eleTmnlEventDetailStore = Ext.create('Ext.data.Store', {
		// model : 'EleTmnlEventDetail',
		// remoteSort : true,
		// // pageSize: DEFAULT_PAGE_SIZE,
		// buffered : true,
		// proxy : {
		// type : 'ajax',
		// url : 'measureExceptionAnalAction!queryMeterEventDetail.action',
		// reader : {
		// type : 'json',
		// root : 'resultList'
		// }
		// }
		// });
		//
		// var eleTmnlEventGridPanel = Ext.create('Ext.grid.Panel', {
		// loadMask : true,
		// border : false,
		// store : eleTmnlEventDetailStore,
		// viewConfig : {
		// trackOver : false
		// },
		// columnLines : true,
		// columns : [{
		// text : "序号",
		// width : 120,
		// dataIndex : 'ITEM_NO',
		// align : 'center',
		// sortable : true
		// }, {
		// text : "事件对应数据",
		// width : 120,
		// dataIndex : 'EVENT_DATA',
		// align : 'center',
		// sortable : false
		// }]
		// });
		//
		// eleTmnlEventDetailStore.proxy.extraParams = {
		// 'queryItems.id' : id
		// };
		// eleTmnlEventDetailStore.load();
		//
		// Ext.create('Ext.window.Window', {
		// modal : true,
		// height : 110,
		// width : 340,
		// resizable : false,
		// title : '终端事件明细',
		// layout : 'fit',
		// items : [eleTmnlEventGridPanel]
		// }).show();
		//
		// }

		// ------------
})