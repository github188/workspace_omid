Ext.onReady(function() {

	// 参数
	var vcmOrgNo;
	var vcmTradeNo;
	var vcmGroupId;
	var vcmCustNo;
	var vcmCustName;

	var smOrgNo;
	var smCustNo;
	var smCustName;
	var smConsNo;
	var smConsName;
	// 大客户信息明细面板
	var selectModel = Ext.create('Ext.selection.CheckboxModel', {
				mode : 'SINGLE',
				listeners : {
					select : function(t, record, index, e) {
						smOrgNo = record.get('ORG_NO');
						smCustNo = record.get('CUST_NO');
						smCustName = record.get('CUST_NAME');
						smConsNo = record.get('CONS_NO');
						smConsName = record.get('CONS_NAME');

					}
				}
			});
	Ext.define('VcmInfo', {
				extend : 'Ext.data.Model',
				fields : ["ORG_NO", "ORG_NAME", "CUST_NO", "CUST_NAME",
						"CONS_NO", "CONS_NAME", "CONS_TYPE", "ELEC_TYPE_CODE",
						"TRADE_CODE", "CONTRACT_CAP", "RUN_CAP", "VOLT_CODE",
						"ELEC_ADDR"]
			});
	var vcmInfoStore = Ext.create('Ext.data.Store', {
				model : 'VcmInfo',
				pageSize : DEFAULT_PAGE_SIZE,
				buffered : true,
				proxy : {
					type : 'ajax',
					url : 'powerConsumeMonitorAction!queryVcmInfoList.action',
					reader : {
						type : 'json',
						root : 'vcmInfoList',
						totalProperty : 'totalCount'
					}
				}
			});
	var vcmInfoGrid = Ext.create('Ext.grid.Panel', {
				id : 'vcmInfoGrid',
				title : '大客户信息明细',
				border : true,
				region : 'center',
				loadMask : true, // 遮罩效果
				selModel : selectModel,
				store : vcmInfoStore,
				viewConfig : {
					trackOver : false
				},
				columnLines : true,
				columns : [new Ext.grid.RowNumberer({
									header : "序号",
									width : 40,
									align : 'center'
								}), {
							text : "供电单位编号",
							width : 120,
							dataIndex : 'ORG_NO',
							align : 'center',
							sortable : true,
							hidden : true
						}, {
							text : "供电单位",
							width : 120,
							dataIndex : 'ORG_NAME',
							align : 'center',
							sortable : true
						}, {
							text : "客户编号",
							width : 120,
							dataIndex : 'CUST_NO',
							align : 'center',
							sortable : false
						}, {
							text : "客户名称",
							width : 90,
							dataIndex : 'CUST_NAME',
							align : 'center',
							sortable : true
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
							text : "用户类型",
							width : 120,
							dataIndex : 'CONS_TYPE',
							align : 'center',
							sortable : false
						}, {
							text : "用电类别",
							width : 100,
							dataIndex : 'ELEC_TYPE_CODE',
							align : 'center',
							sortable : false
						}, {
							text : "行业类别",
							width : 100,
							dataIndex : 'TRADE_CODE',
							align : 'center',
							sortable : false
						}, {
							text : "合同容量",
							width : 120,
							dataIndex : 'CONTRACT_CAP',
							align : 'center',
							sortable : false
						}, {
							text : "运行容量",
							width : 120,
							dataIndex : 'RUN_CAP',
							align : 'center',
							sortable : false
						}, {
							text : "电压等级",
							width : 120,
							dataIndex : 'VOLT_CODE',
							align : 'center',
							sortable : false
						}, {
							text : "用电地址",
							width : 120,
							dataIndex : 'ELEC_ADDR',
							align : 'center',
							sortable : false
						}],
				dockedItems : [{
							xtype : 'pagingtoolbar',
							store : vcmInfoStore,
							dock : 'bottom',
							displayInfo : true
						}]

			});

	// 1、供电管理单位
	Ext.define('OrgDataModel', {
				extend : 'Ext.data.Model',
				fields : [{
							name : 'ORG_NO',
							type : 'string'
						}, {
							name : 'ORG_NAME',
							type : 'string'
						}]
			});
	var orgStore = Ext.create('Ext.data.Store', {
				model : 'OrgDataModel',
				proxy : {
					type : 'ajax',
					url : 'powerConsumeMonitorAction!queryOrgList.action',
					reader : {
						root : 'orgList',
						type : 'json'
					}
				}
			});
	orgStore.load({
				params : {
					orgNo : '34101'
				},
				callback : function(records, operation, success) {
					Ext.getCmp('orgCombox').setValue('34101');
				}
			});

	// 2、行业类别
	Ext.define('TradeDataModel', {
				extend : 'Ext.data.Model',
				fields : [{
							name : 'TRADE_NO',
							type : 'string'
						}, {
							name : 'TRADE_NAME',
							type : 'string'
						}]
			});
	var tradeStore = Ext.create('Ext.data.Store', {
				model : 'TradeDataModel',
				proxy : {
					type : 'ajax',
					url : 'powerConsumeMonitorAction!queryTradeList.action',
					reader : {
						root : 'tradeList',
						type : 'json'
					}
				},
				autoLoad : true

			});

	// 3、群组树
	var groupStore = Ext.create('Ext.data.TreeStore', {
		proxy : {
			type : 'ajax',
			url : 'powerConsumeMonitorAction!queryGroupTreeNodeList.action',
			reader : {
				root : 'groupTreeNodeList',
				type : 'json'
			}
		},
		fields : ['id', 'text']
			// 跟旧版本extjs一样，节点的id和显示文本
		});

	var groupTree = Ext.create("Ext.tree.Panel", {
				border : false,
				width : 330,
				height : 370,
				singleExpand : true,
				root : {
					text : '群组',
					id : '34101',
					leaf : false,
					expanded : false
				},
				store : groupStore
			});
	// 群组树的双击事件
	groupTree.on('itemdblclick', function(view, rcd, item, idx, event, eOpts) {
				var obj = new Object();
				obj.groupName = rcd.get('text');;
				obj.groupNo = rcd.get('id');;
				if (obj.groupNo != '34101') {
					Ext.getCmp("groupName").setValue(obj.groupName);
					Ext.getCmp("groupNo").setValue(obj.groupNo);
				}

				groupTreeWin.hide();

			}, this);

	var groupTreeWin = Ext.create('Ext.window.Window', {
		title : '选择群组',
		width : 350,
		height : 450,
		layout : 'fit',
		modal : true,
		resizable : false,
		bodyStyle : 'padding:2px',
		buttonAlign : 'center',
		closeAction : 'hide',
		items : [groupTree],
		buttons : [{
					text : '确定',
					handler : function() {
						var obj = new Object();
						var record = groupTree.getSelectionModel()
								.getSelection();
						if (record.length > 0) {
							obj.groupName = record[0].get('text');
							obj.groupNo = record[0].get('id');
							if (obj.groupNo != '34101') {
								Ext.getCmp("groupName").setValue(obj.groupName);
								Ext.getCmp("groupNo").setValue(obj.groupNo);
							}
						}
						groupTreeWin.hide();
					}
				}, {
					text : '关闭',
					handler : function() {
						groupTreeWin.hide();
					}
				}]
	});
	// 查询条件面板
	var queryContionPanel = Ext.create('Ext.form.Panel', {
				title : '查询条件',
				border : true,
				region : 'east',
				autoScroll : true,
				bodyStyle : 'padding:10px 0px 10px 10px',
				width : 300,
				items : [{
							xtype : 'combo',
							fieldLabel : '供电单位',
							name : 'orgCombox',
							id : 'orgCombox',
							queryMode : 'local',
							store : orgStore,
							displayField : 'ORG_NAME',
							valueField : 'ORG_NO',
							margin : '10 20 10 10'
						}, {
							xtype : 'combo',
							fieldLabel : '行业类别',
							name : 'tradeCombox',
							id : 'tradeCombox',
							queryMode : 'local',
							store : tradeStore,
							displayField : 'TRADE_NAME',
							valueField : 'TRADE_NO',
							emptyText : '----请选择行业----',
							margin : '10 20 10 10'
						}, {
							xtype : 'textfield',
							fieldLabel : '群组名称',
							name : 'groupName',
							id : 'groupName',
							readOnly : true,
							emptyText : '----请选择群组----',
							blankText : '----请选择群组----',
							listeners : {
								'focus' : function() {
									groupTreeWin.show();
								}
							},
							margin : '10 20 10 10'
						}, {
							xtype : 'textfield',
							fieldLabel : '群组编号',
							id : 'groupNo',
							name : 'groupNo',
							readOnly : true,
							hidden : true,
							hideLabel : true

						}, {
							xtype : 'textfield',
							fieldLabel : '客户编号',
							name : 'custNo',
							id : 'custNo',
							emptyText : '----请输入----',
							blankText : '----请输入----',
							margin : '10 20 10 10'

						}, {
							xtype : 'textfield',
							fieldLabel : '客户名称',
							name : 'custName',
							id : 'custName',
							emptyText : '----请输入----',
							blankText : '----请输入----',
							margin : '10 20 10 10'
						}, {
							xtype : 'form',
							border : false,
							layout : 'column',
							items : [{
								columnWidth : .5,
								border : false,
								items : [{
											xtype : 'button',
											text : '重置',
											align : 'center',
											width : 80,
											margin : '10 20 10 35',
											handler : function() {
												Ext.getCmp("tradeCombox")
														.setValue('');
												Ext.getCmp("groupName")
														.setValue('');
												Ext.getCmp("groupNo")
														.setValue('');
												Ext.getCmp("custNo")
														.setValue('');
												Ext.getCmp("custName")
														.setValue('');
											}
										}]
							}, {
								columnWidth : .5,
								border : false,
								items : [{
											xtype : 'button',
											text : '查询',
											align : 'center',
											width : 80,
											margin : '10 20 10 20',
											handler : function() {
												queryVcmInfo();
											}
										}]
							}]
						}]

			});

	function queryVcmInfo() {
		vcmOrgNo = Ext.getCmp("orgCombox").getValue();
		/*
		 * if (Ext.isEmpty(vcmOrgNo)) { Ext.Msg.alert("提示", "请选择供电单位！"); return; }
		 */
		vcmTradeNo = Ext.getCmp("tradeCombox").getValue();
		vcmGroupNo = Ext.getCmp("groupNo").getValue();
		vcmCustNo = Ext.getCmp("custNo").getValue();
		vcmCustName = Ext.getCmp("custName").getValue();

		var queryMap = {};
		vcmInfoStore.proxy.extraParams = {
			'queryMap.orgNo' : vcmOrgNo,
			'queryMap.tradeNo' : vcmTradeNo,
			'queryMap.groupNo' : vcmGroupNo,
			'queryMap.custNo' : vcmCustNo,
			'queryMap.custName' : vcmCustName
		}
		vcmInfoStore.currentPage = 1;
		vcmInfoStore.load({
					start : 0
				});
	};
	// 上部面板
	var topPanel = Ext.create('Ext.panel.Panel', {
				border : true,
				layout : 'border',
				region : 'north',
				height : 280,
				minHeight : 50,
				maxHeight : 300,
				split : true,
				animCollapse : true,
				collapsible : true,
				items : [vcmInfoGrid, queryContionPanel]
			});

	// 下部查询面板
	var queryContionBottomPanel = Ext.create('Ext.panel.Panel', {
		border : true,
		layout : 'column',
		region : 'north',
		height : 35,
		items : [{
					columnWidth : .06,
					border : false,
					bodyStyle : 'padding:8px 0px 0px 5px',
					items : [{
								xtype : 'label',
								text : '对比类型:'
							}]
				}, {
					columnWidth : .45,
					border : false,
					items : [{
						xtype : 'radiogroup',
						id : 'compareTypeRadiogroup',
						width : 450,
						hideLabel : true,
						style : "padding:5px 5px 0px 0px",
						items : [{
							xtype : 'radio',
							boxLabel : '电量',
							name : 'compareType',
							inputValue : '1',
							checked : true,
							listeners : {
								click : {
									element : 'el',
									fn : function() {
										Ext.getCmp('queryDateField').format = 'Y-m';
										Ext.getCmp('queryDateField')
												.setValue(new Date())
									}
								}

							}

						}, {
							xtype : 'radio',
							boxLabel : '电压',
							name : 'compareType',
							inputValue : '2',
							listeners : {
								click : {
									element : 'el',
									fn : function() {
										Ext.getCmp('queryDateField').format = 'Y-m-d';
										Ext.getCmp('queryDateField')
												.setValue(new Date())
									}
								}

							}

						}, {
							xtype : 'radio',
							boxLabel : '电流',
							name : 'compareType',
							inputValue : '3',
							listeners : {
								click : {
									element : 'el',
									fn : function() {
										Ext.getCmp('queryDateField').format = 'Y-m-d';
										Ext.getCmp('queryDateField')
												.setValue(new Date())
									}
								}

							}

						}, {
							xtype : 'radio',
							boxLabel : '负荷',
							name : 'compareType',
							inputValue : '4',
							listeners : {
								click : {
									element : 'el',
									fn : function() {
										Ext.getCmp('queryDateField').format = 'Y-m-d';
										Ext.getCmp('queryDateField')
												.setValue(new Date())
									}
								}

							}

						}, {
							xtype : 'radio',
							boxLabel : '有功',
							name : 'compareType',
							inputValue : '5',
							listeners : {
								click : {
									element : 'el',
									fn : function() {
										Ext.getCmp('queryDateField').format = 'Y-m';
										Ext.getCmp('queryDateField')
												.setValue(new Date())
									}
								}

							}

						}, {
							xtype : 'radio',
							boxLabel : '无功',
							name : 'compareType',
							inputValue : '6',
							listeners : {
								click : {
									element : 'el',
									fn : function() {
										Ext.getCmp('queryDateField').format = 'Y-m';
										Ext.getCmp('queryDateField')
												.setValue(new Date())
									}
								}

							}

						}, {
							xtype : 'radio',
							boxLabel : '功率因素',
							name : 'compareType',
							inputValue : '7',
							listeners : {
								click : {
									element : 'el',
									fn : function() {
										Ext.getCmp('queryDateField').format = 'Y-m-d';
										Ext.getCmp('queryDateField')
												.setValue(new Date())
									}
								}

							}

						}]
					}]
				}, {
					columnWidth : .06,
					border : false,
					bodyStyle : 'padding:8px 0px 0px 0px',
					items : [{
								xtype : 'label',
								text : '对比方式:'
							}]
				}, {
					columnWidth : .15,
					border : false,
					items : [{
								xtype : 'radiogroup',
								id : 'comparePatternRadioGroup',
								width : 120,
								hideLabel : true,
								style : "padding:5px 5px 0px 0px",
								items : [{
											xtype : 'radio',
											boxLabel : '同比',
											name : 'comparePattern',
											inputValue : '1',
											checked : true
										}, {
											xtype : 'radio',
											boxLabel : '环比',
											name : 'comparePattern',
											inputValue : '2'
										}]
							}]
				}, {
					columnWidth : .18,
					border : false,
					bodyStyle : 'padding:5px 0px 0px 0px',
					items : [{
								xtype : 'datefield',
								id : 'queryDateField',
								width : 150,
								labelWidth : 50,
								fieldLabel : "日期",
								value : new Date(),
								format : 'Y-m'
							}]
				}, {
					columnWidth : .1,
					border : false,
					bodyStyle : 'padding:5px 0px 0px 10px',
					items : [{
						xtype : 'button',
						text : '查询',
						align : 'center',
						width : 60,
						handler : function() {
							var record = selectModel.getSelection();
							if (Ext.isEmpty(record)) {
								Ext.Msg.alert('提示', '请先选择大客户！');
								return;
							}
							var queryDate = Ext.getCmp("queryDateField")
									.getValue();
							queryMonElecQuantityInfo(smOrgNo, smCustNo,
									smConsNo, queryDate);
						}
					}]
				}]

	});

	// 用电变化情况
	var poweConsumeInfoPanel = Ext.create('Ext.panel.Panel', {
				id : 'poweConsumeInfoPanel',
				// title : '用电变化情况',
				border : false,
				layout : 'fit',
				region : 'center',
				autoScroll : true,
				monitorResize : true,
				items : []
			});

	// 1电量
	Ext.define('ElecQuantity', {
				extend : 'Ext.data.Model',
				fields : ["DATA_DATE", "ELEC_QUANTITY", "LAST_ELEC_QUANTITY"]
			});

	var halfMonElecQuantityInfoStore = Ext.create('Ext.data.Store', {
				model : 'ElecQuantity',
				remoteSort : true,
				proxy : new Ext.data.MemoryProxy()
			});
	var secondHalfMonElecQuantityInfoStore = Ext.create('Ext.data.Store', {
				model : 'ElecQuantity',
				remoteSort : true,
				proxy : new Ext.data.MemoryProxy()
			});
	// 2电压
	Ext.define('Voltage', {
				extend : 'Ext.data.Model',
				fields : ["DATA_TIME", "VOLTAGE", "LAST_VOLTAGE"]
			});

	var halfDayVoltageInfoStore = Ext.create('Ext.data.Store', {
				model : 'Voltage',
				remoteSort : true,
				proxy : new Ext.data.MemoryProxy()
			});

	var secondHalfDayVoltageInfoStore = Ext.create('Ext.data.Store', {
				model : 'Voltage',
				remoteSort : true,
				proxy : new Ext.data.MemoryProxy()
			});

	// 3电流
	Ext.define('ElecCurrent', {
				extend : 'Ext.data.Model',
				fields : ["DATA_TIME", "ELEC_CURRENT", "LAST_ELEC_CURRENT"]
			});

	var halfDayElecCurrentInfoStore = Ext.create('Ext.data.Store', {
				model : 'ElecCurrent',
				remoteSort : true,
				proxy : new Ext.data.MemoryProxy()
			});
	var secondHalfDayElecCurrentInfoStore = Ext.create('Ext.data.Store', {
				model : 'ElecCurrent',
				remoteSort : true,
				proxy : new Ext.data.MemoryProxy()
			});

	// 4负荷
	Ext.define('ElecLoad', {
				extend : 'Ext.data.Model',
				fields : ["DATA_TIME", "ELEC_LOAD", "LAST_ELEC_LOAD"]
			});

	var halfDayElecLoadInfoStore = Ext.create('Ext.data.Store', {
				model : 'ElecLoad',
				remoteSort : true,
				proxy : new Ext.data.MemoryProxy()
			});
	var secondHalfDayElecLoadtInfoStore = Ext.create('Ext.data.Store', {
				model : 'ElecLoad',
				remoteSort : true,
				proxy : new Ext.data.MemoryProxy()

			});

	// 5有功
	Ext.define('ActivePower', {
				extend : 'Ext.data.Model',
				fields : ["DATA_DATE", "ACTIVE_POWER", "LAST_ACTIVE_POWER"]
			});

	var halfMonActivePowerInfoStore = Ext.create('Ext.data.Store', {
				model : 'ActivePower',
				remoteSort : true,
				proxy : new Ext.data.MemoryProxy()
			});
	var secondHalfMonActivePowerInfoStore = Ext.create('Ext.data.Store', {
				model : 'ActivePower',
				remoteSort : true,
				proxy : new Ext.data.MemoryProxy()
			});

	// 6无功
	Ext.define('ReactivePower', {
				extend : 'Ext.data.Model',
				fields : ["DATA_DATE", "REACTIVE_POWER", "LAST_REACTIVE_POWER"]
			});

	var halfMonReactivePowerInfoStore = Ext.create('Ext.data.Store', {
				model : 'ReactivePower',
				remoteSort : true,
				proxy : new Ext.data.MemoryProxy()
			});
	var secondHalfMonReactivePowerInfoStore = Ext.create('Ext.data.Store', {
				model : 'ReactivePower',
				remoteSort : true,
				proxy : new Ext.data.MemoryProxy()
			});

	// 7功率因素
	Ext.define('PowerFactor', {
				extend : 'Ext.data.Model',
				fields : ["DATA_TIME", "POWER_FACTOR", "LAST_POWER_FACTOR"]
			});

	var halfDayPowerFactorInfoStore = Ext.create('Ext.data.Store', {
				model : 'PowerFactor',
				remoteSort : true,
				proxy : new Ext.data.MemoryProxy()
			});
	var secondHalfDayPowerFactorInfoStore = Ext.create('Ext.data.Store', {
				model : 'ElecLoad',
				remoteSort : true,
				proxy : new Ext.data.MemoryProxy()
			});

	// 用电实时监控面板
	var poweConsumeMonitorPanel = Ext.create('Ext.panel.Panel', {
				title : '用电变化情况',
				border : false,
				layout : 'border',
				region : 'center',
				items : [queryContionBottomPanel, poweConsumeInfoPanel]
			});

	// 函数
	function getPowerConsumeFusionChartXml(type, pattern, powerConsumeInfoList) {
		var chartXml;
		if (type == 1 || type == 5 || type == 6) {
			chartXml = '<graph xaxisname="日期" yaxisname="用电量" hovercapbg="DEDEBE" hovercapborder="889E6D" rotateNames="0" decimalPrecision="0" showValues="0" caption="'
					+ smConsName + '"><categories>';
			var days = Ext.Date.getDaysInMonth(new Date());
			// var firstDay = Ext.Date.getFirstDateOfMonth(new Date());
			for (var i = 0; i < days; i++) {
				chartXml += "<category label = '"
						+ Ext.Date
								.format(
										Ext.Date
												.add(
														Ext.Date
																.getFirstDateOfMonth(new Date()),
														Ext.Date.DAY, i),
										'Y-m-d') + "'/>";
			}
			chartXml += "</categories>";
			if (pattern == 1) {
				chartXml += '<dataset seriesname="去年用电量" color="FDC12E"><set value="30.3"/><set value="26"/><set value="29"/><set value="31"/><set value="34"/><set value="30"/><set value="26"/><set value="29"/><set value="31"/><set value="34"/><set value="30"/><set value="26"/><set value="29"/><set value="31"/><set value="34"/><set value="30"/><set value="26"/><set value="29"/><set value="31"/><set value="34"/><set value="30"/><set value="26"/><set value="29"/><set value="31"/><set value="34"/><set value="30"/><set value="26"/><set value="29"/><set value="31"/><set value="34"/><set value="35"/></dataset>';
			} else {
				chartXml += '<dataset seriesname="上月用电量" color="FDC12E"><set value="30.3"/><set value="26"/><set value="29"/><set value="31"/><set value="34"/><set value="30"/><set value="26"/><set value="29"/><set value="31"/><set value="34"/><set value="30"/><set value="26"/><set value="29"/><set value="31"/><set value="34"/><set value="30"/><set value="26"/><set value="29"/><set value="31"/><set value="34"/><set value="30"/><set value="26"/><set value="29"/><set value="31"/><set value="34"/><set value="30"/><set value="26"/><set value="29"/><set value="31"/><set value="34"/><set value="35"/></dataset>';
			}
			chartXml += '<dataset seriesname="本月用电量" color="56B9F9"><set value="67.8"/><set value="98"/><set value="102"/><set value="73"/><set value="80"/><set value="67"/><set value="98"/><set value="79"/><set value="73"/><set value="80"/><set value="67"/><set value="98"/><set value="79"/><set value="73"/><set value="80"/><set value="67"/><set value="98"/><set value="79"/><set value="73"/><set value="80"/><set value="67"/><set value="98"/><set value="79"/><set value="73"/><set value="80"/><set value="67"/><set value="98"/><set value="79"/><set value="73"/><set value="80"/><set value="90"/></dataset>';
			chartXml += "</graph>";

		} else {
			chartXml = '<graph xaxisname="时间" yaxisname="电流" hovercapbg="DEDEBE" hovercapborder="889E6D" rotateNames="0" decimalPrecision="0" showValues="0" caption="'
					+ smConsName + '"><categories>';
			for (var i = 0; i < 25; i++) {
				chartXml += "<category label = '" + (i + "") + "'/>";
			}
			chartXml += "</categories>";

			chartXml += '<dataset seriesname="去年电流" color="FDC12E"><set value="30.3"/><set value="26"/><set value="29"/><set value="31"/><set value="34"/><set value="30"/><set value="26"/><set value="29"/><set value="31"/><set value="34"/><set value="30"/><set value="26"/><set value="29"/><set value="31"/><set value="34"/><set value="30"/><set value="26"/><set value="29"/><set value="31"/><set value="34"/><set value="30"/><set value="26"/><set value="29"/><set value="31"/><set value="34"/></dataset>';
			chartXml += '<dataset seriesname="电流" color="56B9F9"><set value="67.8"/><set value="98"/><set value="102"/><set value="73"/><set value="80"/><set value="67"/><set value="98"/><set value="79"/><set value="73"/><set value="80"/><set value="67"/><set value="98"/><set value="79"/><set value="73"/><set value="80"/><set value="67"/><set value="98"/><set value="79"/><set value="73"/><set value="80"/><set value="67"/><set value="98"/><set value="79"/><set value="73"/><set value="80"/></dataset>';
			chartXml += "</graph>";
		}

		return chartXml;

	};

	function queryMonElecQuantityInfo(orgNo, custNo, consNo, date) {

		Ext.getCmp('poweConsumeInfoPanel').removeAll();
		// 对比类型
		var type = Ext.getCmp('compareTypeRadiogroup').getChecked()[0].inputValue;
		// 对比方式
		var pattern = Ext.getCmp('comparePatternRadioGroup').getChecked()[0].inputValue;
		// 模拟用电变化情况图
		var powerConsumeChartPanel = Ext.create('Ext.panel.Panel', {
					id : 'powerConsumeChartPanel',
					border : false,
					layout : 'auto',
					region : 'north',
					bodyStyle : 'padding : 0px 0px 0px 15px',
					// margin : '0px 0px 0px 100px',
					items : []

				});
		Ext.getCmp('powerConsumeChartPanel').removeAll();

		var powerConsumeFusionChartPanel = Ext.create('Ext.panel.Panel', {
					id : 'powerConsumeFusionChartPanel',
					border : false,
					height : 500,
					width : Ext.getCmp('poweConsumeInfoPanel').getWidth(),
					renderTo : Ext.getBody()
				});
		Ext.getCmp('poweConsumeInfoPanel').getEl().mask('正在查询...');

		var queryMap = {};
		Ext.Ajax.request({
					url : 'powerConsumeMonitorAction!queryPowerConsumeInfoList.action',
					params : {
						'queryMap.orgNo' : orgNo,
						'queryMap.custNo' : custNo,
						'queryMap.consNo' : consNo,
						'queryMap.date' : date,
						'queryMap.type' : type,
						'queryMap.pattern' : pattern
					},
					success : function(response) {
						var result = Ext.decode(response.responseText);
						var powerConsumeInfoList = result.powerConsumeInfoList;
						var chartXml = getPowerConsumeFusionChartXml(type,
								pattern, powerConsumeInfoList);
						if (type == 1 || type == 5 || type == 6) {
							var powerConsumeFusionChart = new FusionCharts(
									"./FusionCharts-new/MSColumn3D.swf",
									"power_consume_fusionchart", Ext
											.getCmp('poweConsumeInfoPanel')
											.getWidth()
											- 50, 500);
							powerConsumeFusionChart.setDataXML(chartXml);
							powerConsumeFusionChart.setTransparent(true);
							powerConsumeFusionChart
									.render('powerConsumeFusionChartPanel');
							Ext.getCmp('powerConsumeChartPanel')
									.add(powerConsumeFusionChartPanel);
						} else {
							var powerConsumeFusionChart = new FusionCharts(
									"./FusionCharts-new/MSLine.swf",
									"power_consume_fusionchart", Ext
											.getCmp('poweConsumeInfoPanel')
											.getWidth()
											- 50, 500);
							powerConsumeFusionChart.setDataXML(chartXml);
							powerConsumeFusionChart.setTransparent(true);
							powerConsumeFusionChart
									.render('powerConsumeFusionChartPanel');
							Ext.getCmp('powerConsumeChartPanel')
									.add(powerConsumeFusionChartPanel);
						}
					}
				});

		var queryMap = {};
		if (type == 1) {// 电量
			Ext.Ajax.request({
				url : 'powerConsumeMonitorAction!queryMonElecQuantityInfoList.action',
				params : {
					'queryMap.orgNo' : orgNo,
					'queryMap.custNo' : custNo,
					'queryMap.consNo' : consNo,
					'queryMap.date' : date,
					'queryMap.pattern' : pattern
				},
				success : function(response) {
					var result = Ext.decode(response.responseText);

					var halfMonElecQuantityInfoList = result.halfMonElecQuantityInfoList;
					var secondHalfMonElecQuantityInfoList = result.secondHalfMonElecQuantityInfoList;

					halfMonElecQuantityInfoStore.removeAll();
					if (!Ext.isEmpty(halfMonElecQuantityInfoList)) {
						halfMonElecQuantityInfoStore
								.loadData(halfMonElecQuantityInfoList);
					}
					secondHalfMonElecQuantityInfoStore.removeAll();
					if (!Ext.isEmpty(secondHalfMonElecQuantityInfoList)) {
						secondHalfMonElecQuantityInfoStore
								.loadData(secondHalfMonElecQuantityInfoList);
					}
					if (pattern == 1) {
						// 同比
						var halfMonElecQuantityYearToYearInfoGrid = Ext.create(
								'Ext.grid.Panel', {
									border : true,
									width : 420,
									height : 150,
									loadMask : true, // 遮罩效果
									store : halfMonElecQuantityInfoStore,
									viewConfig : {
										trackOver : false
									},
									columnLines : true,
									columns : [new Ext.grid.RowNumberer({
														header : "序号",
														width : 40,
														align : 'center'
													}), {
												text : "上半月时间",
												width : 120,
												dataIndex : 'DATA_DATE',
												align : 'center'
											}, {
												text : "用电量(万千瓦时)",
												width : 120,
												dataIndex : 'ELEC_QUANTITY',
												align : 'center'
											}, {
												text : "去年用电量(万千瓦时)",
												width : 120,
												dataIndex : 'LAST_ELEC_QUANTITY',
												align : 'center'
											}]

								});

						var secondHalfMonElecQuantityYearToYearInfoGrid = Ext
								.create('Ext.grid.Panel', {
									border : true,
									width : 420,
									height : 150,
									loadMask : true, // 遮罩效果
									store : secondHalfMonElecQuantityInfoStore,
									viewConfig : {
										trackOver : false
									},
									columnLines : true,
									columns : [new Ext.grid.RowNumberer({
														header : "序号",
														width : 40,
														align : 'center'
													}), {
												text : "下半月时间",
												width : 120,
												dataIndex : 'DATA_DATE',
												align : 'center'
											}, {
												text : "用电量(万千瓦时)",
												width : 120,
												dataIndex : 'ELEC_QUANTITY',
												align : 'center'
											}, {
												text : "去年用电量(万千瓦时)",
												width : 120,
												dataIndex : 'LAST_ELEC_QUANTITY',
												align : 'center'
											}]

								});

						var elecQuantityYearToYearInfoGridPanel = Ext.create(
								'Ext.panel.Panel', {
									border : false,
									region : 'center',
									bodyStyle : 'padding : 10px 10px 10px 120px',
									layout : {
										type : 'table',
										columns : 2
									},
									items : [
											halfMonElecQuantityYearToYearInfoGrid,
											secondHalfMonElecQuantityYearToYearInfoGrid]
								});
						var elecQuantityYearToYearComparePanel = Ext.create(
								'Ext.panel.Panel', {
									border : false,
									layout : 'auto',
									autoScroll : true,
									monitorResize : true,
									items : [powerConsumeChartPanel,
											elecQuantityYearToYearInfoGridPanel]
								});
						Ext.getCmp('poweConsumeInfoPanel')
								.add(elecQuantityYearToYearComparePanel);

					} else {
						// 环比
						var halfMonElecQuantityChainRelativeInfoGrid = Ext
								.create('Ext.grid.Panel', {
									border : true,
									width : 420,
									height : 150,
									loadMask : true, // 遮罩效果
									store : halfMonElecQuantityInfoStore,
									viewConfig : {
										trackOver : false
									},
									columnLines : true,
									columns : [new Ext.grid.RowNumberer({
														header : "序号",
														width : 40,
														align : 'center'
													}), {
												text : "上半月时间",
												width : 120,
												dataIndex : 'DATA_DATE',
												align : 'center'
											}, {
												text : "用电量(万千瓦时)",
												width : 120,
												dataIndex : 'ELEC_QUANTITY',
												align : 'center'
											}, {
												text : "上月用电量(万千瓦时)",
												width : 120,
												dataIndex : 'LAST_ELEC_QUANTITY',
												align : 'center'
											}]

								});

						var secondHalfMonElecQuantityChainRelativeInfoGrid = Ext
								.create('Ext.grid.Panel', {
									border : true,
									width : 420,
									height : 150,
									loadMask : true, // 遮罩效果
									store : secondHalfMonElecQuantityInfoStore,
									viewConfig : {
										trackOver : false
									},
									columnLines : true,
									columns : [new Ext.grid.RowNumberer({
														header : "序号",
														width : 40,
														align : 'center'
													}), {
												text : "下半月时间",
												width : 120,
												dataIndex : 'DATA_DATE',
												align : 'center'
											}, {
												text : "用电量(万千瓦时)",
												width : 120,
												dataIndex : 'ELEC_QUANTITY',
												align : 'center'
											}, {
												text : "上月用电量(万千瓦时)",
												width : 120,
												dataIndex : 'LAST_ELEC_QUANTITY',
												align : 'center'
											}]

								});

						var elecQuantityChainRelativeInfoGridPanel = Ext
								.create('Ext.panel.Panel', {
									border : false,
									region : 'center',
									bodyStyle : 'padding : 10px 10px 10px 120px',
									layout : {
										type : 'table',
										columns : 2
									},
									items : [
											halfMonElecQuantityChainRelativeInfoGrid,
											secondHalfMonElecQuantityChainRelativeInfoGrid]
								});

						var elecQuantityChainRelativeComparePanel = Ext.create(
								'Ext.panel.Panel', {
									border : false,
									layout : 'auto',
									autoScroll : true,
									monitorResize : true,
									items : [powerConsumeChartPanel,
											elecQuantityChainRelativeInfoGridPanel]
								});
						Ext.getCmp('poweConsumeInfoPanel')
								.add(elecQuantityChainRelativeComparePanel);
					}
					//
					Ext.getCmp('poweConsumeInfoPanel').doLayout();
					Ext.getCmp('poweConsumeInfoPanel').getEl().unmask();

				},
				failure : function(response) {
					Ext.Msg.alert('提示', '查询用电情况失败');
					Ext.getCmp('poweConsumeInfoPanel').getEl().unmask();
				}
			});
		} else if (type == 2) {// 电压
			Ext.Ajax.request({
				url : 'powerConsumeMonitorAction!queryDayVoltageInfoList.action',
				params : {
					'queryMap.orgNo' : orgNo,
					'queryMap.custNo' : custNo,
					'queryMap.consNo' : consNo,
					'queryMap.date' : date,
					'queryMap.pattern' : pattern
				},
				success : function(response) {
					var result = Ext.decode(response.responseText);
					var halfDayVoltageInfoList = result.halfDayVoltageInfoList;
					var secondHalfDayVoltageInfoList = result.secondHalfDayVoltageInfoList;
					halfDayVoltageInfoStore.removeAll();
					if (!Ext.isEmpty(halfDayVoltageInfoList)) {
						halfDayVoltageInfoStore
								.loadData(halfDayVoltageInfoList);
					}
					secondHalfDayVoltageInfoStore.removeAll();
					if (!Ext.isEmpty(secondHalfDayVoltageInfoList)) {
						secondHalfDayVoltageInfoStore
								.loadData(secondHalfDayVoltageInfoList);
					}
					if (pattern == 1) {
						// 同比
						var halfDayVoltageYearToYearInfoGrid = Ext.create(
								'Ext.grid.Panel', {
									border : true,
									width : 420,
									height : 150,
									loadMask : true, // 遮罩效果
									store : halfDayVoltageInfoStore,
									viewConfig : {
										trackOver : false
									},
									columnLines : true,
									columns : [new Ext.grid.RowNumberer({
														header : "序号",
														width : 40,
														align : 'center'
													}), {
												text : "上午时间",
												width : 120,
												dataIndex : 'DATA_TIME',
												align : 'center'
											}, {
												text : "电压(伏)",
												width : 120,
												dataIndex : 'VOLTAGE',
												align : 'center'
											}, {
												text : "去年电压(伏)",
												width : 120,
												dataIndex : 'LAST_VOLTAGE',
												align : 'center'
											}]

								});
						var secondHalfDayVoltageYearToYearInfoGrid = Ext
								.create('Ext.grid.Panel', {
											border : true,
											width : 420,
											height : 150,
											loadMask : true, // 遮罩效果
											store : secondHalfDayVoltageInfoStore,
											viewConfig : {
												trackOver : false
											},
											columnLines : true,
											columns : [
													new Ext.grid.RowNumberer({
																header : "序号",
																width : 40,
																align : 'center'
															}), {
														text : "下午时间",
														width : 120,
														dataIndex : 'DATA_TIME',
														align : 'center'
													}, {
														text : "电压(伏)",
														width : 120,
														dataIndex : 'VOLTAGE',
														align : 'center'
													}, {
														text : "去年电压(伏)",
														width : 120,
														dataIndex : 'LAST_VOLTAGE',
														align : 'center'
													}]

										});

						var voltageYearToYearInfoGridPanel = Ext.create(
								'Ext.panel.Panel', {
									border : false,
									region : 'center',
									bodyStyle : 'padding : 10px 10px 10px 120px',
									layout : {
										type : 'table',
										columns : 2
									},
									items : [halfDayVoltageYearToYearInfoGrid,
											secondHalfDayVoltageYearToYearInfoGrid]
								});

						var voltageYearToYearComparePanel = Ext.create(
								'Ext.panel.Panel', {
									border : false,
									layout : 'auto',
									autoScroll : true,
									monitorResize : true,
									items : [powerConsumeChartPanel,
											voltageYearToYearInfoGridPanel]
								});
						Ext.getCmp('poweConsumeInfoPanel')
								.add(voltageYearToYearComparePanel);

					} else {
						// 环比
						var halfDayVoltageChainRelativeInfoGrid = Ext.create(
								'Ext.grid.Panel', {
									border : true,
									width : 420,
									height : 150,
									loadMask : true, // 遮罩效果
									store : halfDayVoltageInfoStore,
									viewConfig : {
										trackOver : false
									},
									columnLines : true,
									columns : [new Ext.grid.RowNumberer({
														header : "序号",
														width : 40,
														align : 'center'
													}), {
												text : "上午时间",
												width : 120,
												dataIndex : 'DATA_TIME',
												align : 'center'
											}, {
												text : "电压(伏)",
												width : 120,
												dataIndex : 'VOLTAGE',
												align : 'center'
											}, {
												text : "昨天电压(伏)",
												width : 120,
												dataIndex : 'LAST_VOLTAGE',
												align : 'center'
											}]

								});
						var secondHalfDayVoltageChainRelativeInfoGrid = Ext
								.create('Ext.grid.Panel', {
											border : true,
											width : 420,
											height : 150,
											loadMask : true, // 遮罩效果
											store : secondHalfDayVoltageInfoStore,
											viewConfig : {
												trackOver : false
											},
											columnLines : true,
											columns : [
													new Ext.grid.RowNumberer({
																header : "序号",
																width : 40,
																align : 'center'
															}), {
														text : "下午时间",
														width : 120,
														dataIndex : 'DATA_TIME',
														align : 'center'
													}, {
														text : "电压(伏)",
														width : 120,
														dataIndex : 'VOLTAGE',
														align : 'center'
													}, {
														text : "昨天电压(伏)",
														width : 120,
														dataIndex : 'LAST_VOLTAGE',
														align : 'center'
													}]

										});
						var voltageChainRelativeInfoGridPanel = Ext.create(
								'Ext.panel.Panel', {
									border : false,
									region : 'center',
									bodyStyle : 'padding : 10px 10px 10px 120px',
									layout : {
										type : 'table',
										columns : 2
									},
									items : [
											halfDayVoltageChainRelativeInfoGrid,
											secondHalfDayVoltageChainRelativeInfoGrid]
								});
						var voltageChainRelativeComparePanel = Ext.create(
								'Ext.panel.Panel', {
									border : false,
									layout : 'auto',
									autoScroll : true,
									monitorResize : true,
									items : [powerConsumeChartPanel,
											voltageChainRelativeInfoGridPanel]
								});
						Ext.getCmp('poweConsumeInfoPanel')
								.add(voltageChainRelativeComparePanel);
					}
					//
					Ext.getCmp('poweConsumeInfoPanel').doLayout();
					Ext.getCmp('poweConsumeInfoPanel').getEl().unmask();

				},
				failure : function(response) {
					Ext.Msg.alert('提示', '查询用电情况失败');
					Ext.getCmp('poweConsumeInfoPanel').getEl().unmask();
				}
			});
		} else if (type == 3) {// 电流
			Ext.Ajax.request({
				url : 'powerConsumeMonitorAction!queryDayElecCurrentInfoList.action',
				params : {
					'queryMap.orgNo' : orgNo,
					'queryMap.custNo' : custNo,
					'queryMap.consNo' : consNo,
					'queryMap.date' : date,
					'queryMap.pattern' : pattern
				},
				success : function(response) {
					var result = Ext.decode(response.responseText);
					var halfDayElecCurrentInfoList = result.halfDayElecCurrentInfoList;
					var secondHalfDayElecCurrentInfoList = result.secondHalfDayElecCurrentInfoList;

					halfDayElecCurrentInfoStore.removeAll();
					if (!Ext.isEmpty(halfDayElecCurrentInfoList)) {
						halfDayElecCurrentInfoStore
								.loadData(halfDayElecCurrentInfoList);
					}
					secondHalfDayElecCurrentInfoStore.removeAll();
					if (!Ext.isEmpty(secondHalfDayElecCurrentInfoList)) {
						secondHalfDayElecCurrentInfoStore
								.loadData(secondHalfDayElecCurrentInfoList);
					}
					if (pattern == 1) {
						// 同比
						var halfDayElecCurrentYearToYearInfoGrid = Ext.create(
								'Ext.grid.Panel', {
									border : true,
									width : 420,
									height : 150,
									loadMask : true, // 遮罩效果
									store : halfDayElecCurrentInfoStore,
									viewConfig : {
										trackOver : false
									},
									columnLines : true,
									columns : [new Ext.grid.RowNumberer({
														header : "序号",
														width : 40,
														align : 'center'
													}), {
												text : "上午时间",
												width : 120,
												dataIndex : 'DATA_TIME',
												align : 'center'
											}, {
												text : "电流(安)",
												width : 120,
												dataIndex : 'ELEC_CURRENT',
												align : 'center'
											}, {
												text : "去年电流(安)",
												width : 120,
												dataIndex : 'LAST_ELEC_CURRENT',
												align : 'center'
											}]

								});
						var secondHalfDayElecCurrentYearToYearInfoGrid = Ext
								.create('Ext.grid.Panel', {
									border : true,
									width : 420,
									height : 150,
									loadMask : true, // 遮罩效果
									store : secondHalfDayElecCurrentInfoStore,
									viewConfig : {
										trackOver : false
									},
									columnLines : true,
									columns : [new Ext.grid.RowNumberer({
														header : "序号",
														width : 40,
														align : 'center'
													}), {
												text : "下午时间",
												width : 120,
												dataIndex : 'DATA_TIME',
												align : 'center'
											}, {
												text : "电流(安)",
												width : 120,
												dataIndex : 'ELEC_CURRENT',
												align : 'center'
											}, {
												text : "去年电流(安)",
												width : 120,
												dataIndex : 'LAST_ELEC_CURRENT',
												align : 'center'
											}]

								});

						var elecCurrentYearToYearInfoGridPanel = Ext.create(
								'Ext.panel.Panel', {
									border : false,
									region : 'center',
									bodyStyle : 'padding : 10px 10px 10px 120px',
									layout : {
										type : 'table',
										columns : 2
									},
									items : [
											halfDayElecCurrentYearToYearInfoGrid,
											secondHalfDayElecCurrentYearToYearInfoGrid]
								});

						var elecCurrentYearToYearComparePanel = Ext.create(
								'Ext.panel.Panel', {
									border : false,
									layout : 'auto',
									autoScroll : true,
									monitorResize : true,
									items : [powerConsumeChartPanel,
											elecCurrentYearToYearInfoGridPanel]
								});
						Ext.getCmp('poweConsumeInfoPanel')
								.add(elecCurrentYearToYearComparePanel);

					} else {
						// 环比
						var halfDayElecCurrentChainRelativeInfoGrid = Ext
								.create('Ext.grid.Panel', {
									border : true,
									width : 420,
									height : 150,
									loadMask : true, // 遮罩效果
									store : halfDayElecCurrentInfoStore,
									viewConfig : {
										trackOver : false
									},
									columnLines : true,
									columns : [new Ext.grid.RowNumberer({
														header : "序号",
														width : 40,
														align : 'center'
													}), {
												text : "上午时间",
												width : 120,
												dataIndex : 'DATA_TIME',
												align : 'center'
											}, {
												text : "电流(安)",
												width : 120,
												dataIndex : 'ELEC_CURRENT',
												align : 'center'
											}, {
												text : "昨天电流(安)",
												width : 120,
												dataIndex : 'LAST_ELEC_CURRENT',
												align : 'center'
											}]

								});

						var secondHalfDayElecCurrentChainRelativeInfoGrid = Ext
								.create('Ext.grid.Panel', {
									border : true,
									width : 420,
									height : 150,
									loadMask : true, // 遮罩效果
									store : secondHalfDayElecCurrentInfoStore,
									viewConfig : {
										trackOver : false
									},
									columnLines : true,
									columns : [new Ext.grid.RowNumberer({
														header : "序号",
														width : 40,
														align : 'center'
													}), {
												text : "下午时间",
												width : 120,
												dataIndex : 'DATA_TIME',
												align : 'center'
											}, {
												text : "电流(安)",
												width : 120,
												dataIndex : 'ELEC_CURRENT',
												align : 'center'
											}, {
												text : "昨天电流(安)",
												width : 120,
												dataIndex : 'LAST_ELEC_CURRENT',
												align : 'center'
											}]

								});
						var elecCurrentChainRelativeInfoGridPanel = Ext.create(
								'Ext.panel.Panel', {
									border : false,
									region : 'center',
									bodyStyle : 'padding : 10px 10px 10px 120px',
									layout : {
										type : 'table',
										columns : 2
									},
									items : [
											halfDayElecCurrentChainRelativeInfoGrid,
											secondHalfDayElecCurrentChainRelativeInfoGrid]
								});
						var elecCurrentChainRelativeComparePanel = Ext.create(
								'Ext.panel.Panel', {
									border : false,
									layout : 'auto',
									autoScroll : true,
									monitorResize : true,
									items : [powerConsumeChartPanel,
											elecCurrentChainRelativeInfoGridPanel]
								});
						Ext.getCmp('poweConsumeInfoPanel')
								.add(elecCurrentChainRelativeComparePanel);
					}
					//
					Ext.getCmp('poweConsumeInfoPanel').doLayout();
					Ext.getCmp('poweConsumeInfoPanel').getEl().unmask();

				},
				failure : function(response) {
					Ext.Msg.alert('提示', '查询用电情况失败');
					Ext.getCmp('poweConsumeInfoPanel').getEl().unmask();
				}
			});

		} else if (type == 4) {// 负荷
			Ext.Ajax.request({
				url : 'powerConsumeMonitorAction!queryDayElecLoadInfoList.action',
				params : {
					'queryMap.orgNo' : orgNo,
					'queryMap.custNo' : custNo,
					'queryMap.consNo' : consNo,
					'queryMap.date' : date,
					'queryMap.pattern' : pattern
				},
				success : function(response) {
					var result = Ext.decode(response.responseText);
					var halfDayElecLoadInfoList = result.halfDayElecLoadInfoList;
					var secondHalfDayElecLoadInfoList = result.secondHalfDayElecLoadInfoList;

					halfDayElecLoadInfoStore.removeAll();
					if (!Ext.isEmpty(halfDayElecLoadInfoList)) {
						halfDayElecLoadInfoStore
								.loadData(halfDayElecLoadInfoList);
					}
					secondHalfDayElecLoadtInfoStore.removeAll();
					if (!Ext.isEmpty(secondHalfDayElecLoadInfoList)) {
						secondHalfDayElecLoadtInfoStore
								.loadData(secondHalfDayElecLoadInfoList);
					}
					if (pattern == 1) {
						// 同比
						var halfDayElecLoadYearToYearInfoGrid = Ext.create(
								'Ext.grid.Panel', {
									border : true,
									width : 420,
									height : 150,
									loadMask : true, // 遮罩效果
									store : halfDayElecLoadInfoStore,
									viewConfig : {
										trackOver : false
									},
									columnLines : true,
									columns : [new Ext.grid.RowNumberer({
														header : "序号",
														width : 40,
														align : 'center'
													}), {
												text : "上午时间",
												width : 120,
												dataIndex : 'DATA_TIME',
												align : 'center'
											}, {
												text : "负荷",
												width : 120,
												dataIndex : 'ELEC_LOAD',
												align : 'center'
											}, {
												text : "去年负荷",
												width : 120,
												dataIndex : 'LAST_ELEC_LOAD',
												align : 'center'
											}]

								});

						var secondHalfDayElecLoadYearToYearInfoGrid = Ext
								.create('Ext.grid.Panel', {
											border : true,
											width : 420,
											height : 150,
											loadMask : true, // 遮罩效果
											store : secondHalfDayElecLoadtInfoStore,
											viewConfig : {
												trackOver : false
											},
											columnLines : true,
											columns : [
													new Ext.grid.RowNumberer({
																header : "序号",
																width : 40,
																align : 'center'
															}), {
														text : "下午时间",
														width : 120,
														dataIndex : 'DATA_TIME',
														align : 'center'
													}, {
														text : "负荷",
														width : 120,
														dataIndex : 'ELEC_LOAD',
														align : 'center'
													}, {
														text : "去年负荷",
														width : 120,
														dataIndex : 'LAST_ELEC_LOAD',
														align : 'center'
													}]

										});
						var elecLoadYearToYearInfoGridPanel = Ext.create(
								'Ext.panel.Panel', {
									border : false,
									region : 'center',
									bodyStyle : 'padding : 10px 10px 10px 120px',
									layout : {
										type : 'table',
										columns : 2
									},
									items : [halfDayElecLoadYearToYearInfoGrid,
											secondHalfDayElecLoadYearToYearInfoGrid]
								});
						var elecLoadYearToYearComparePanel = Ext.create(
								'Ext.panel.Panel', {
									border : false,
									layout : 'auto',
									autoScroll : true,
									monitorResize : true,
									items : [powerConsumeChartPanel,
											elecLoadYearToYearInfoGridPanel]
								});
						Ext.getCmp('poweConsumeInfoPanel')
								.add(elecLoadYearToYearComparePanel);

					} else {
						// 环比
						var halfDayElecLoadChainRelativeInfoGrid = Ext.create(
								'Ext.grid.Panel', {
									border : true,
									width : 420,
									height : 150,
									loadMask : true, // 遮罩效果
									store : halfDayElecLoadInfoStore,
									viewConfig : {
										trackOver : false
									},
									columnLines : true,
									columns : [new Ext.grid.RowNumberer({
														header : "序号",
														width : 40,
														align : 'center'
													}), {
												text : "上午时间",
												width : 120,
												dataIndex : 'DATA_TIME',
												align : 'center'
											}, {
												text : "负荷",
												width : 120,
												dataIndex : 'ELEC_LOAD',
												align : 'center'
											}, {
												text : "昨日负荷",
												width : 120,
												dataIndex : 'LAST_ELEC_LOAD',
												align : 'center'
											}]

								});
						var secondHalfDayElecLoadChainRelativeInfoGrid = Ext
								.create('Ext.grid.Panel', {
											border : true,
											width : 420,
											height : 150,
											loadMask : true, // 遮罩效果
											store : secondHalfDayElecLoadtInfoStore,
											viewConfig : {
												trackOver : false
											},
											columnLines : true,
											columns : [
													new Ext.grid.RowNumberer({
																header : "序号",
																width : 40,
																align : 'center'
															}), {
														text : "下午时间",
														width : 120,
														dataIndex : 'DATA_TIME',
														align : 'center'
													}, {
														text : "负荷",
														width : 120,
														dataIndex : 'ELEC_LOAD',
														align : 'center'
													}, {
														text : "昨日负荷",
														width : 120,
														dataIndex : 'LAST_ELEC_LOAD',
														align : 'center'
													}]

										});

						var elecLoadChainRelativeInfoGridPanel = Ext.create(
								'Ext.panel.Panel', {
									border : false,
									region : 'center',
									bodyStyle : 'padding : 10px 10px 10px 120px',
									layout : {
										type : 'table',
										columns : 2
									},
									items : [
											halfDayElecLoadChainRelativeInfoGrid,
											secondHalfDayElecLoadChainRelativeInfoGrid]
								});

						var elecLoadChainRelativeComparePanel = Ext.create(
								'Ext.panel.Panel', {
									border : false,
									layout : 'auto',
									autoScroll : true,
									monitorResize : true,
									items : [powerConsumeChartPanel,
											elecLoadChainRelativeInfoGridPanel]
								});
						Ext.getCmp('poweConsumeInfoPanel')
								.add(elecLoadChainRelativeComparePanel);
					}
					//
					Ext.getCmp('poweConsumeInfoPanel').doLayout();
					Ext.getCmp('poweConsumeInfoPanel').getEl().unmask();

				},
				failure : function(response) {
					Ext.Msg.alert('提示', '查询用电情况失败');
					Ext.getCmp('poweConsumeInfoPanel').getEl().unmask();
				}
			});

		} else if (type == 5) {// 有功
			Ext.Ajax.request({
				url : 'powerConsumeMonitorAction!queryMonActivePowerInfoList.action',
				params : {
					'queryMap.orgNo' : orgNo,
					'queryMap.custNo' : custNo,
					'queryMap.consNo' : consNo,
					'queryMap.date' : date,
					'queryMap.pattern' : pattern
				},
				success : function(response) {
					var result = Ext.decode(response.responseText);
					var halfMonActivePowerInfoList = result.halfMonActivePowerInfoList;
					var secondHalfMonActivePowerInfoList = result.secondHalfMonActivePowerInfoList;

					halfMonActivePowerInfoStore.removeAll();
					if (!Ext.isEmpty(halfMonActivePowerInfoList)) {
						halfMonActivePowerInfoStore
								.loadData(halfMonActivePowerInfoList);
					}
					secondHalfMonActivePowerInfoStore.removeAll();
					if (!Ext.isEmpty(secondHalfMonActivePowerInfoList)) {
						secondHalfMonActivePowerInfoStore
								.loadData(secondHalfMonActivePowerInfoList);
					}
					if (pattern == 1) {
						// 同比
						var halfMonActivePowerYearToYearInfoGrid = Ext.create(
								'Ext.grid.Panel', {
									border : true,
									width : 420,
									height : 150,
									loadMask : true, // 遮罩效果
									store : halfMonActivePowerInfoStore,
									viewConfig : {
										trackOver : false
									},
									columnLines : true,
									columns : [new Ext.grid.RowNumberer({
														header : "序号",
														width : 40,
														align : 'center'
													}), {
												text : "上半月时间",
												width : 120,
												dataIndex : 'DATA_DATE',
												align : 'center'
											}, {
												text : "有功",
												width : 120,
												dataIndex : 'ACTIVE_POWER',
												align : 'center'
											}, {
												text : "去年有功",
												width : 120,
												dataIndex : 'LAST_ACTIVE_POWER',
												align : 'center'
											}]

								});

						var secondHalfMonActivePowerYearToYearInfoGrid = Ext
								.create('Ext.grid.Panel', {
									border : true,
									width : 420,
									height : 150,
									loadMask : true, // 遮罩效果
									store : secondHalfMonActivePowerInfoStore,
									viewConfig : {
										trackOver : false
									},
									columnLines : true,
									columns : [new Ext.grid.RowNumberer({
														header : "序号",
														width : 40,
														align : 'center'
													}), {
												text : "下半月时间",
												width : 120,
												dataIndex : 'DATA_DATE',
												align : 'center'
											}, {
												text : "有功",
												width : 120,
												dataIndex : 'ACTIVE_POWER',
												align : 'center'
											}, {
												text : "去年有功",
												width : 120,
												dataIndex : 'LAST_ACTIVE_POWER',
												align : 'center'
											}]

								});
						var activePowerYearToYearInfoGridPanel = Ext.create(
								'Ext.panel.Panel', {
									border : false,
									region : 'center',
									bodyStyle : 'padding : 10px 10px 10px 120px',
									layout : {
										type : 'table',
										columns : 2
									},
									items : [
											halfMonActivePowerYearToYearInfoGrid,
											secondHalfMonActivePowerYearToYearInfoGrid]
								});
						var activePowerYearToYearComparePanel = Ext.create(
								'Ext.panel.Panel', {
									border : false,
									layout : 'auto',
									autoScroll : true,
									monitorResize : true,
									items : [powerConsumeChartPanel,
											activePowerYearToYearInfoGridPanel]
								});
						Ext.getCmp('poweConsumeInfoPanel')
								.add(activePowerYearToYearComparePanel);

					} else {
						// 环比
						var halfMonActivePowerChainRelativeInfoGrid = Ext
								.create('Ext.grid.Panel', {
									border : true,
									width : 420,
									height : 150,
									loadMask : true, // 遮罩效果
									store : halfMonActivePowerInfoStore,
									viewConfig : {
										trackOver : false
									},
									columnLines : true,
									columns : [new Ext.grid.RowNumberer({
														header : "序号",
														width : 40,
														align : 'center'
													}), {
												text : "上半月时间",
												width : 120,
												dataIndex : 'DATA_DATE',
												align : 'center'
											}, {
												text : "有功",
												width : 120,
												dataIndex : 'ACTIVE_POWER',
												align : 'center'
											}, {
												text : "上月有功",
												width : 120,
												dataIndex : 'LAST_ACTIVE_POWER',
												align : 'center'
											}]

								});

						var secondHalfMonActivePowerChainRelativeInfoGrid = Ext
								.create('Ext.grid.Panel', {
									border : true,
									width : 420,
									height : 150,
									loadMask : true, // 遮罩效果
									store : secondHalfMonActivePowerInfoStore,
									viewConfig : {
										trackOver : false
									},
									columnLines : true,
									columns : [new Ext.grid.RowNumberer({
														header : "序号",
														width : 40,
														align : 'center'
													}), {
												text : "下半月时间",
												width : 120,
												dataIndex : 'DATA_DATE',
												align : 'center'
											}, {
												text : "有功",
												width : 120,
												dataIndex : 'ACTIVE_POWER',
												align : 'center'
											}, {
												text : "上月有功",
												width : 120,
												dataIndex : 'LAST_ACTIVE_POWER',
												align : 'center'
											}]

								});

						var activePowerChainRelativeInfoGridPanel = Ext.create(
								'Ext.panel.Panel', {
									border : false,
									region : 'center',
									bodyStyle : 'padding : 10px 10px 10px 120px',
									layout : {
										type : 'table',
										columns : 2
									},
									items : [
											halfMonActivePowerChainRelativeInfoGrid,
											secondHalfMonActivePowerChainRelativeInfoGrid]
								});

						var activePowerChainRelativeComparePanel = Ext.create(
								'Ext.panel.Panel', {
									border : false,
									layout : 'auto',
									autoScroll : true,
									monitorResize : true,
									items : [powerConsumeChartPanel,
											activePowerChainRelativeInfoGridPanel]
								});
						Ext.getCmp('poweConsumeInfoPanel')
								.add(activePowerChainRelativeComparePanel);
					}
					//
					Ext.getCmp('poweConsumeInfoPanel').doLayout();
					Ext.getCmp('poweConsumeInfoPanel').getEl().unmask();

				},
				failure : function(response) {
					Ext.Msg.alert('提示', '查询用电情况失败');
					Ext.getCmp('poweConsumeInfoPanel').getEl().unmask();
				}
			});
		} else if (type == 6) {// 无功
			Ext.Ajax.request({
				url : 'powerConsumeMonitorAction!queryMonReactivePowerInfoList.action',
				params : {
					'queryMap.orgNo' : orgNo,
					'queryMap.custNo' : custNo,
					'queryMap.consNo' : consNo,
					'queryMap.date' : date,
					'queryMap.pattern' : pattern
				},
				success : function(response) {
					var result = Ext.decode(response.responseText);
					var halfMonReactivePowerInfoList = result.halfMonReactivePowerInfoList;
					var secondHalfMonReactivePowerInfoList = result.secondHalfMonReactivePowerInfoList;

					halfMonReactivePowerInfoStore.removeAll();
					if (!Ext.isEmpty(halfMonReactivePowerInfoList)) {
						halfMonReactivePowerInfoStore
								.loadData(halfMonReactivePowerInfoList);
					}
					secondHalfMonReactivePowerInfoStore.removeAll();
					if (!Ext.isEmpty(secondHalfMonReactivePowerInfoList)) {
						secondHalfMonReactivePowerInfoStore
								.loadData(secondHalfMonReactivePowerInfoList);
					}
					if (pattern == 1) {
						// 同比
						var halfMonReactivePowerYearToYearInfoGrid = Ext
								.create('Ext.grid.Panel', {
									border : true,
									width : 420,
									height : 150,
									loadMask : true, // 遮罩效果
									store : halfMonReactivePowerInfoStore,
									viewConfig : {
										trackOver : false
									},
									columnLines : true,
									columns : [new Ext.grid.RowNumberer({
														header : "序号",
														width : 40,
														align : 'center'
													}), {
												text : "上半月时间",
												width : 120,
												dataIndex : 'DATA_DATE',
												align : 'center'
											}, {
												text : "无功",
												width : 120,
												dataIndex : 'ACTIVE_POWER',
												align : 'center'
											}, {
												text : "去年无功",
												width : 120,
												dataIndex : 'LAST_ACTIVE_POWER',
												align : 'center'
											}]

								});

						var secondHalfMonReactivePowerYearToYearInfoGrid = Ext
								.create('Ext.grid.Panel', {
									border : true,
									width : 420,
									height : 150,
									loadMask : true, // 遮罩效果
									store : secondHalfMonReactivePowerInfoStore,
									viewConfig : {
										trackOver : false
									},
									columnLines : true,
									columns : [new Ext.grid.RowNumberer({
														header : "序号",
														width : 40,
														align : 'center'
													}), {
												text : "下半月时间",
												width : 120,
												dataIndex : 'DATA_DATE',
												align : 'center'
											}, {
												text : "无功",
												width : 120,
												dataIndex : 'ACTIVE_POWER',
												align : 'center'
											}, {
												text : "去年无功",
												width : 120,
												dataIndex : 'LAST_ACTIVE_POWER',
												align : 'center'
											}]

								});
						var reactivePowerYearToYearInfoGridPanel = Ext.create(
								'Ext.panel.Panel', {
									border : false,
									region : 'center',
									bodyStyle : 'padding : 10px 10px 10px 120px',
									layout : {
										type : 'table',
										columns : 2
									},
									items : [
											halfMonReactivePowerYearToYearInfoGrid,
											secondHalfMonReactivePowerYearToYearInfoGrid]
								});
						var reactivePowerYearToYearComparePanel = Ext.create(
								'Ext.panel.Panel', {
									border : false,
									layout : 'auto',
									autoScroll : true,
									monitorResize : true,
									items : [powerConsumeChartPanel,
											reactivePowerYearToYearInfoGridPanel]
								});
						Ext.getCmp('poweConsumeInfoPanel')
								.add(reactivePowerYearToYearComparePanel);

					} else {
						// 环比
						var halfMonReactivePowerChainRelativeInfoGrid = Ext
								.create('Ext.grid.Panel', {
									border : true,
									width : 420,
									height : 150,
									loadMask : true, // 遮罩效果
									store : halfMonReactivePowerInfoStore,
									viewConfig : {
										trackOver : false
									},
									columnLines : true,
									columns : [new Ext.grid.RowNumberer({
														header : "序号",
														width : 40,
														align : 'center'
													}), {
												text : "上半月时间",
												width : 120,
												dataIndex : 'DATA_DATE',
												align : 'center'
											}, {
												text : "无功",
												width : 120,
												dataIndex : 'ACTIVE_POWER',
												align : 'center'
											}, {
												text : "上月无功",
												width : 120,
												dataIndex : 'LAST_ACTIVE_POWER',
												align : 'center'
											}]

								});
						var secondHalfMonReactivePowerChainRelativeInfoGrid = Ext
								.create('Ext.grid.Panel', {
									border : true,
									width : 420,
									height : 150,
									loadMask : true, // 遮罩效果
									store : secondHalfMonReactivePowerInfoStore,
									viewConfig : {
										trackOver : false
									},
									columnLines : true,
									columns : [new Ext.grid.RowNumberer({
														header : "序号",
														width : 40,
														align : 'center'
													}), {
												text : "下半月时间",
												width : 120,
												dataIndex : 'DATA_DATE',
												align : 'center'
											}, {
												text : "无功",
												width : 120,
												dataIndex : 'ACTIVE_POWER',
												align : 'center'
											}, {
												text : "上月无功",
												width : 120,
												dataIndex : 'LAST_ACTIVE_POWER',
												align : 'center'
											}]

								});

						var reactivePowerChainRelativeInfoGridPanel = Ext
								.create('Ext.panel.Panel', {
									border : false,
									region : 'center',
									bodyStyle : 'padding : 10px 10px 10px 120px',
									layout : {
										type : 'table',
										columns : 2
									},
									items : [
											halfMonReactivePowerChainRelativeInfoGrid,
											secondHalfMonReactivePowerChainRelativeInfoGrid]
								});

						var reactivePowerChainRelativeComparePanel = Ext
								.create('Ext.panel.Panel', {
									border : false,
									layout : 'auto',
									autoScroll : true,
									monitorResize : true,
									items : [powerConsumeChartPanel,
											reactivePowerChainRelativeInfoGridPanel]
								});
						Ext.getCmp('poweConsumeInfoPanel')
								.add(reactivePowerChainRelativeComparePanel);
					}
					//
					Ext.getCmp('poweConsumeInfoPanel').doLayout();
					Ext.getCmp('poweConsumeInfoPanel').getEl().unmask();

				},
				failure : function(response) {
					Ext.Msg.alert('提示', '查询用电情况失败');
					Ext.getCmp('poweConsumeInfoPanel').getEl().unmask();
				}
			});

		} else if (type == 7) {// 功率因素
			Ext.Ajax.request({
				url : 'powerConsumeMonitorAction!queryDayPowerFactorInfoList.action',
				params : {
					'queryMap.orgNo' : orgNo,
					'queryMap.custNo' : custNo,
					'queryMap.consNo' : consNo,
					'queryMap.date' : date,
					'queryMap.pattern' : pattern
				},
				success : function(response) {
					var result = Ext.decode(response.responseText);
					var halfDayPowerFactorInfoList = result.halfDayPowerFactorInfoList;
					var secondHalfDayPowerFactorInfoList = result.secondHalfDayPowerFactorInfoList;

					halfDayPowerFactorInfoStore.removeAll();
					if (!Ext.isEmpty(halfDayPowerFactorInfoList)) {
						halfDayPowerFactorInfoStore
								.loadData(halfDayPowerFactorInfoList);
					}
					secondHalfDayPowerFactorInfoStore.removeAll();
					if (!Ext.isEmpty(secondHalfDayPowerFactorInfoList)) {
						secondHalfDayPowerFactorInfoStore
								.loadData(secondHalfDayPowerFactorInfoList);
					}
					if (pattern == 1) {
						// 同比
						var halfDayPowerFactorYearToYearInfoGrid = Ext.create(
								'Ext.grid.Panel', {
									border : true,
									width : 420,
									height : 150,
									loadMask : true, // 遮罩效果
									store : halfDayPowerFactorInfoStore,
									viewConfig : {
										trackOver : false
									},
									columnLines : true,
									columns : [new Ext.grid.RowNumberer({
														header : "序号",
														width : 40,
														align : 'center'
													}), {
												text : "上午时间",
												width : 120,
												dataIndex : 'DATA_TIME',
												align : 'center'
											}, {
												text : "功率因素",
												width : 120,
												dataIndex : 'POWER_FACTOR',
												align : 'center'
											}, {
												text : "去年功率因素",
												width : 120,
												dataIndex : 'LAST_POWER_FACTOR',
												align : 'center'
											}]

								});

						var secondHalfDayPowerFactorYearToYearInfoGrid = Ext
								.create('Ext.grid.Panel', {
									border : true,
									width : 420,
									height : 150,
									loadMask : true, // 遮罩效果
									store : secondHalfDayPowerFactorInfoStore,
									viewConfig : {
										trackOver : false
									},
									columnLines : true,
									columns : [new Ext.grid.RowNumberer({
														header : "序号",
														width : 40,
														align : 'center'
													}), {
												text : "下午午时间",
												width : 120,
												dataIndex : 'DATA_TIME',
												align : 'center'
											}, {
												text : "功率因素",
												width : 120,
												dataIndex : 'POWER_FACTOR',
												align : 'center'
											}, {
												text : "去年功率因素",
												width : 120,
												dataIndex : 'LAST_POWER_FACTOR',
												align : 'center'
											}]

								});
						var powerFactorYearToYearInfoGridPanel = Ext.create(
								'Ext.panel.Panel', {
									border : false,
									region : 'center',
									bodyStyle : 'padding : 10px 10px 10px 120px',
									layout : {
										type : 'table',
										columns : 2
									},
									items : [
											halfDayPowerFactorYearToYearInfoGrid,
											secondHalfDayPowerFactorYearToYearInfoGrid]
								});

						var powerFactorYearToYearComparePanel = Ext.create(
								'Ext.panel.Panel', {
									border : false,
									layout : 'auto',
									autoScroll : true,
									monitorResize : true,
									items : [powerConsumeChartPanel,
											powerFactorYearToYearInfoGridPanel]
								});
						Ext.getCmp('poweConsumeInfoPanel')
								.add(powerFactorYearToYearComparePanel);

					} else {
						// 环比
						var halfDayPowerFactorChainRelativeInfoGrid = Ext
								.create('Ext.grid.Panel', {
									border : true,
									width : 420,
									height : 150,
									loadMask : true, // 遮罩效果
									store : halfDayPowerFactorInfoStore,
									viewConfig : {
										trackOver : false
									},
									columnLines : true,
									columns : [new Ext.grid.RowNumberer({
														header : "序号",
														width : 40,
														align : 'center'
													}), {
												text : "上午时间",
												width : 120,
												dataIndex : 'DATA_TIME',
												align : 'center'
											}, {
												text : "功率因素",
												width : 120,
												dataIndex : 'POWER_FACTOR',
												align : 'center'
											}, {
												text : "昨日功率因素",
												width : 120,
												dataIndex : 'LAST_POWER_FACTOR',
												align : 'center'
											}]

								});

						var secondHalfDayPowerFactorChainRelativeInfoGrid = Ext
								.create('Ext.grid.Panel', {
									border : true,
									width : 420,
									height : 150,
									loadMask : true, // 遮罩效果
									store : secondHalfDayPowerFactorInfoStore,
									viewConfig : {
										trackOver : false
									},
									columnLines : true,
									columns : [new Ext.grid.RowNumberer({
														header : "序号",
														width : 40,
														align : 'center'
													}), {
												text : "下午午时间",
												width : 120,
												dataIndex : 'DATA_TIME',
												align : 'center'
											}, {
												text : "功率因素",
												width : 120,
												dataIndex : 'POWER_FACTOR',
												align : 'center'
											}, {
												text : "昨日功率因素",
												width : 120,
												dataIndex : 'LAST_POWER_FACTOR',
												align : 'center'
											}]

								});

						var powerFactorChainRelativeInfoGridPanel = Ext.create(
								'Ext.panel.Panel', {
									border : false,
									region : 'center',
									bodyStyle : 'padding : 10px 10px 10px 120px',
									layout : {
										type : 'table',
										columns : 2
									},
									items : [
											halfDayPowerFactorChainRelativeInfoGrid,
											secondHalfDayPowerFactorChainRelativeInfoGrid]
								});
						var powerFactorChainRelativeComparePanel = Ext.create(
								'Ext.panel.Panel', {
									border : false,
									layout : 'auto',
									autoScroll : true,
									monitorResize : true,
									items : [powerConsumeChartPanel,
											powerFactorChainRelativeInfoGridPanel]
								});
						Ext.getCmp('poweConsumeInfoPanel')
								.add(powerFactorChainRelativeComparePanel);
					}
					//
					Ext.getCmp('poweConsumeInfoPanel').doLayout();
					Ext.getCmp('poweConsumeInfoPanel').getEl().unmask();

				},
				failure : function(response) {
					Ext.Msg.alert('提示', '查询用电情况失败');
					Ext.getCmp('poweConsumeInfoPanel').getEl().unmask();
				}
			});
		} else {
			Ext.Msg.alert('提示', '查询用电类型错误');
			Ext.getCmp('poweConsumeInfoPanel').getEl().unmask();
		}

	};
	// 整体面板
	var totalPanel = Ext.create('Ext.panel.Panel', {
				border : false,
				layout : 'border',
				items : [topPanel, poweConsumeMonitorPanel]

			});
	renderModel(totalPanel, "用电实时监控");
});