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
	var smConsSrc;
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
						smConsSrc = record.get('CONS_SRC');

					}
				}
			});
	Ext.define('VcmInfo', {
				extend : 'Ext.data.Model',
				fields : ["ORG_NO", "ORG_NAME", "CUST_NO", "CUST_NAME",
						"CONS_NO", "CONS_NAME", "CONS_SRC", "CONS_TYPE_NAME",
						"ELEC_TYPE", "TRADE_NAME", "CONTRACT_CAP", "RUN_CAP",
						"VOLT", "ELEC_ADDR"]
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
						root : 'resultList',
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
							// sortable : true,
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
							text : "用户来源",
							width : 120,
							dataIndex : 'CONS_SRC',
							align : 'center',
							// sortable : true,
							hidden : true
						}, {
							text : "用户类型",
							width : 120,
							dataIndex : 'CONS_TYPE_NAME',
							align : 'center',
							sortable : false
						}, {
							text : "用电类别",
							width : 100,
							dataIndex : 'ELEC_TYPE',
							align : 'center',
							sortable : false
						}, {
							text : "行业类别",
							width : 100,
							dataIndex : 'TRADE_NAME',
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
							dataIndex : 'VOLT',
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

	// 2、行业树
	var tradeStore = Ext.create('Ext.data.TreeStore', {
				proxy : {
					type : 'ajax',
					url : 'powerConsumeMonitorAction!queryTradeTreeNodeList.action',
					reader : {
						root : 'tradeTreeNodeList',
						type : 'json'
					}
				},
				fields : ['id', 'text']

			});

	var tradeTree = Ext.create("Ext.tree.Panel", {
				border : false,
				width : 330,
				height : 370,
				singleExpand : true,
				root : {
					text : '行业类别',
					id : 'trade_root',
					leaf : false,
					expanded : false
				},
				store : tradeStore
			});
	// 行业树的双击事件
	tradeTree.on('itemdblclick', function(view, rcd, item, idx, event, eOpts) {
				var obj = new Object();
				obj.tradeNo = rcd.get('id');
				obj.tradeName = rcd.get('text');
				if (obj.tradeNo != 'trade_root') {
					Ext.getCmp("tradeNo").setValue(obj.tradeNo);
					Ext.getCmp("tradeName").setValue(obj.tradeName);
				}

				tradeTreeWin.hide();

			}, this);
	var tradeTreeWin = Ext.create('Ext.window.Window', {
		title : '选择行业类别',
		width : 350,
		height : 450,
		layout : 'fit',
		modal : true,
		resizable : false,
		bodyStyle : 'padding:2px',
		buttonAlign : 'center',
		closeAction : 'hide',
		items : [tradeTree],
		buttons : [{
					text : '确定',
					handler : function() {
						var obj = new Object();
						var record = tradeTree.getSelectionModel()
								.getSelection();
						if (record.length > 0) {
							obj.tradeNo = record[0].get('id');
							obj.tradeName = record[0].get('text');
							if (obj.tradeNo != 'trade_root') {
								Ext.getCmp("tradeNo").setValue(obj.tradeNo);
								Ext.getCmp("tradeName").setValue(obj.tradeName);
							}
						}
						tradeTreeWin.hide();
					}
				}, {
					text : '关闭',
					handler : function() {
						tradeTreeWin.hide();
					}
				}]
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
					id : 'group_root',
					leaf : false,
					expanded : false
				},
				store : groupStore
			});
	// 群组树的双击事件
	groupTree.on('itemdblclick', function(view, rcd, item, idx, event, eOpts) {
				var obj = new Object();
				obj.groupNo = rcd.get('id');
				obj.groupName = rcd.get('text');
				if (obj.groupNo != 'group_root') {
					Ext.getCmp("groupNo").setValue(obj.groupNo);
					Ext.getCmp("groupName").setValue(obj.groupName);
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
							obj.groupNo = record[0].get('id');
							obj.groupName = record[0].get('text');
							if (obj.groupNo != 'group_root') {
								Ext.getCmp("groupNo").setValue(obj.groupNo);
								Ext.getCmp("groupName").setValue(obj.groupName);
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
						},/*
							 * { xtype : 'combo', fieldLabel : '行业类别', name :
							 * 'tradeCombox', id : 'tradeCombox', queryMode :
							 * 'local', store : tradeStore, displayField :
							 * 'TRADE_NAME', valueField : 'TRADE_NO', emptyText :
							 * '----请选择行业----', margin : '10 20 10 10' },
							 */{
							xtype : 'textfield',
							fieldLabel : '行业类别',
							name : 'tradeName',
							id : 'tradeName',
							readOnly : true,
							emptyText : '----请选择行业----',
							blankText : '----请选择行业----',
							listeners : {
								'focus' : function() {
									tradeTreeWin.show();
								}
							},
							margin : '10 20 10 10'
						}, {
							xtype : 'textfield',
							fieldLabel : '行业编号',
							id : 'tradeNo',
							name : 'tradeNo',
							readOnly : true,
							hidden : true,
							hideLabel : true

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
												Ext.getCmp("tradeNo")
														.setValue('');
												Ext.getCmp("tradeName")
														.setValue('');
												Ext.getCmp("groupNo")
														.setValue('');
												Ext.getCmp("groupName")
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
		vcmTradeNo = Ext.getCmp("tradeNo").getValue();
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
						id : 'compareTypeRadioGroup',
						width : 450,
						hideLabel : true,
						style : "padding:5px 5px 0px 0px",
						items : [{
							xtype : 'radio',
							boxLabel : '电能示值',
							name : 'compareType',
							inputValue : '1',
							checked : true,
							listeners : {
								click : {
									element : 'el',
									fn : function() {
										Ext.getCmp('queryDateField').format = 'Y-m';
										Ext.getCmp('queryDateField')
												.setValue(new Date());
									}
								}

							}

						}, {
							xtype : 'radio',
							boxLabel : '电量',
							name : 'compareType',
							inputValue : '2',
							listeners : {
								click : {
									element : 'el',
									fn : function() {
										Ext.getCmp('queryDateField').format = 'Y-m';
										Ext.getCmp('queryDateField')
												.setValue(new Date());
									}
								}

							}

						}, {
							xtype : 'radio',
							boxLabel : '电压',
							name : 'compareType',
							inputValue : '3',
							listeners : {
								click : {
									element : 'el',
									fn : function() {
										Ext.getCmp('queryDateField').format = 'Y-m-d';
										Ext.getCmp('queryDateField')
												.setValue(new Date());
									}
								}

							}

						}, {
							xtype : 'radio',
							boxLabel : '电流',
							name : 'compareType',
							inputValue : '4',
							listeners : {
								click : {
									element : 'el',
									fn : function() {
										Ext.getCmp('queryDateField').format = 'Y-m-d';
										Ext.getCmp('queryDateField')
												.setValue(new Date());
									}
								}

							}

						}, {
							xtype : 'radio',
							boxLabel : '负荷',
							name : 'compareType',
							inputValue : '5',
							listeners : {
								click : {
									element : 'el',
									fn : function() {
										Ext.getCmp('queryDateField').format = 'Y-m-d';
										Ext.getCmp('queryDateField')
												.setValue(new Date());
									}
								}

							}

						}, {
							xtype : 'radio',
							boxLabel : '功率因素',
							name : 'compareType',
							inputValue : '6',
							listeners : {
								click : {
									element : 'el',
									fn : function() {
										Ext.getCmp('queryDateField').format = 'Y-m-d';
										Ext.getCmp('queryDateField')
												.setValue(new Date());
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
								value : Ext.Date.add(new Date(), Ext.Date.MONTH, 0),
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
								Ext.Msg.alert('提示', '请先选择大客户!!!');
								return;
							}
							var queryDate = Ext.Date.format(Ext
											.getCmp("queryDateField")
											.getValue(), 'Y-m-d');
							queryPoweConsumeInfo(smOrgNo, smCustNo, smConsNo,
									smConsSrc, queryDate);
						}
					}]
				}]

	});

	// 用电变化情况
	var powerConsumeInfoPanel = Ext.create('Ext.panel.Panel', {
				// title : '用电变化情况',
				id : 'powerConsumeInfoPanel',
				border : false,
				layout : 'fit',
				region : 'center',
				autoScroll : true,
				monitorResize : true,
				items : []
			});

	// 1电能示值
	Ext.define('ElecValue', {
				extend : 'Ext.data.Model',
				fields : ["DATA_DATE", "ELEC_VALUE", "COMPARE_DATA_DATE",
						"COMPARE_ELEC_VALUE"]
			});
	var halfMonElecValueInfoStore = Ext.create('Ext.data.Store', {
				model : 'ElecValue',
				remoteSort : true,
				proxy : new Ext.data.MemoryProxy()
			});
	var secondHalfMonElecValueInfoStore = Ext.create('Ext.data.Store', {
				model : 'ElecValue',
				remoteSort : true,
				proxy : new Ext.data.MemoryProxy()
			});
	// 2电量
	Ext.define('ElecQuantity', {
				extend : 'Ext.data.Model',
				fields : ["DATA_DATE", "ELEC_QUANTITY", "COMPARE_DATA_DATE",
						"COMPARE_ELEC_QUANTITY"]
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
	// 3电压
	Ext.define('Voltage', {
				extend : 'Ext.data.Model',
				fields : ["DATA_TIME", "VOLTAGE", "COMPARE_DATA_TIME",
						"COMPARE_VOLTAGE"]
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

	// 4电流
	Ext.define('ElecCurrent', {
				extend : 'Ext.data.Model',
				fields : ["DATA_TIME", "ELEC_CURRENT", "COMPARE_DATA_TIME",
						"COMPARE_ELEC_CURRENT"]
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

	// 5负荷
	Ext.define('ElecLoad', {
				extend : 'Ext.data.Model',
				fields : ["DATA_TIME", "ELEC_LOAD", "COMPARE_DATA_TIME",
						"COMPARE_ELEC_LOAD"]
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

	// 6功率因素
	Ext.define('PowerFactor', {
				extend : 'Ext.data.Model',
				fields : ["DATA_TIME", "POWER_FACTOR", "COMPARE_DATA_TIME",
						"COMPARE_POWER_FACTOR"]
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
				items : [queryContionBottomPanel, powerConsumeInfoPanel]
			});

	// 函数
	function getPowerConsumeFusionChartXml(type, pattern, result) {
		var chartXml;
		if (type == 1) {
			chartXml = '<graph xaxisname="日期" yaxisname="电能示值" hovercapbg="DEDEBE" hovercapborder="889E6D" rotateNames="0" decimalPrecision="4" showValues="0" formatNumberScale = "0" caption="'
					+ smConsName + '"><categories>';
			var elecValueCompareInfoList = result.elecValueCompareInfoList;
			for (var i = 0; i < elecValueCompareInfoList.length; i++) {
				chartXml += '<category label = "'
						+ elecValueCompareInfoList[i]['COMPARE_DATA_DATE']
						+ '"/>';
				chartXml += '<category label = "'
						+ elecValueCompareInfoList[i]['DATA_DATE'] + '"/>';

			}
			chartXml += '</categories>';

			if (pattern == 1) {
				chartXml += '<dataset seriesname="同比电能示值" color="FDC12E">';
				chartXml += '</dataset>';

			} else {
				chartXml += '<dataset seriesname="环比电能示值" color="FDC12E">';
				chartXml += '</dataset>';
			}
			chartXml += '<dataset seriesname="本月电能示值" color="56B9F9">';
			for (var i = 0; i < elecValueCompareInfoList.length; i++) {
				chartXml += '<set value = "'
						+ elecValueCompareInfoList[i]['COMPARE_ELEC_VALUE']
						+ '" color="FDC12E"/>';
				chartXml += '<set value = "'
						+ elecValueCompareInfoList[i]['ELEC_VALUE']
						+ '" color="56B9F9"/>';

			}
			chartXml += '</dataset>';
			chartXml += "</graph>";

		} else if (type == 2) {

			chartXml = '<graph xaxisname="日期" yaxisname="电能量" hovercapbg="DEDEBE" hovercapborder="889E6D" rotateNames="0" decimalPrecision="4" showValues="0" formatNumberScale = "0" caption="'
					+ smConsName + '"><categories>';
			var elecQuantityCompareInfoList = result.elecQuantityCompareInfoList;
			for (var i = 0; i < elecQuantityCompareInfoList.length; i++) {
				chartXml += '<category label = "'
						+ elecQuantityCompareInfoList[i]['COMPARE_DATA_DATE']
						+ '"/>';
				chartXml += '<category label = "'
						+ elecQuantityCompareInfoList[i]['DATA_DATE'] + '"/>';

			}
			chartXml += '</categories>';

			if (pattern == 1) {
				chartXml += '<dataset seriesname="同比电能量" color="FDC12E">';
				chartXml += '</dataset>';

			} else {
				chartXml += '<dataset seriesname="环比电能量" color="FDC12E">';
				chartXml += '</dataset>';
			}
			chartXml += '<dataset seriesname="本月电能量" color="56B9F9">';
			for (var i = 0; i < elecQuantityCompareInfoList.length; i++) {
				chartXml += '<set value = "'
						+ elecQuantityCompareInfoList[i]['COMPARE_ELEC_QUANTITY']
						+ '" color="FDC12E"/>';
				chartXml += '<set value = "'
						+ elecQuantityCompareInfoList[i]['ELEC_QUANTITY']
						+ '" color="56B9F9"/>';

			}
			chartXml += '</dataset>';
			chartXml += "</graph>";

		} else if (type == 3) {
			chartXml = '<graph xaxisname="时间" yaxisname="电压" hovercapbg="DEDEBE" hovercapborder="889E6D" rotateNames="0" decimalPrecision="0" showValues="0" caption="'
					+ smConsName + '"><categories>';
			var voltageCompareInfoList = result.voltageCompareInfoList;
			for (var i = 0; i < voltageCompareInfoList.length; i++) {
				chartXml += '<category label = "'
						+ voltageCompareInfoList[i]['DATA_TIME'].substring(10,
								16) + '"/>';
			}

			chartXml += "</categories>";

			chartXml += '<dataset seriesname="UA" color="E7ED1A">';
			for (var i = 0; i < voltageCompareInfoList.length; i++) {
				if ((!Ext.isEmpty(voltageCompareInfoList[i]['VOLTAGE']))
						&& (voltageCompareInfoList[i]['VOLTAGE'].toString().split('-').length >= 1)) {
					chartXml += '<set value="'
							+ voltageCompareInfoList[i]['VOLTAGE'].toString()
									.split('-')[0] + '"/>'
				} else {
					chartXml += '<set value=""/>'
				}

			}
			chartXml += '</dataset>';

			chartXml += '<dataset seriesname="UB" color="3BC71A">';
			for (var i = 0; i < voltageCompareInfoList.length; i++) {
				if ((!Ext.isEmpty(voltageCompareInfoList[i]['VOLTAGE']))
						&& (voltageCompareInfoList[i]['VOLTAGE'].toString().split('-').length >= 2)) {
					chartXml += '<set value="'
							+ voltageCompareInfoList[i]['VOLTAGE'].toString()
									.split('-')[1] + '"/>'
				} else {
					chartXml += '<set value=""/>'
				}
			}
			chartXml += '</dataset>';

			chartXml += '<dataset seriesname="UC" color="9932CD">';
			for (var i = 0; i < voltageCompareInfoList.length; i++) {
				if ((!Ext.isEmpty(voltageCompareInfoList[i]['VOLTAGE']))
						&& (voltageCompareInfoList[i]['VOLTAGE'].toString()
								.split('-').length > 2)) {
					chartXml += '<set value="'
							+ voltageCompareInfoList[i]['VOLTAGE'].toString()
									.split('-')[2] + '"/>'
				} else {
					chartXml += '<set value=""/>'
				}
			}
			chartXml += '</dataset>';

			chartXml += "</graph>";

		} else if (type == 4) {
			chartXml = '<graph xaxisname="时间" yaxisname="电流" hovercapbg="DEDEBE" hovercapborder="889E6D" rotateNames="0" decimalPrecision="0" showValues="0" caption="'
					+ smConsName + '"><categories>';
			var elecCurrentCompareInfoList = result.elecCurrentCompareInfoList;
			for (var i = 0; i < elecCurrentCompareInfoList.length; i++) {
				chartXml += '<category label = "'
						+ elecCurrentCompareInfoList[i]['DATA_TIME'].substring(
								10, 16) + '"/>';
			}

			chartXml += "</categories>";

			chartXml += '<dataset seriesname="IA" color="E7ED1A">';
			for (var i = 0; i < elecCurrentCompareInfoList.length; i++) {
				if ((!Ext
						.isEmpty(elecCurrentCompareInfoList[i]['ELEC_CURRENT']))
						&& (elecCurrentCompareInfoList[i]['ELEC_CURRENT'].toString()
								.split('-').length >= 1)) {
					chartXml += '<set value="'
							+ elecCurrentCompareInfoList[i]['ELEC_CURRENT'].toString()
									.split('-')[0] + '"/>'
				} else {
					chartXml += '<set value=""/>'
				}

			}
			chartXml += '</dataset>';

			chartXml += '<dataset seriesname="IB" color="3BC71A">';
			for (var i = 0; i < elecCurrentCompareInfoList.length; i++) {
				if ((!Ext
						.isEmpty(elecCurrentCompareInfoList[i]['ELEC_CURRENT']))
						&& (elecCurrentCompareInfoList[i]['ELEC_CURRENT'].toString()
								.split('-').length >= 2)) {
					chartXml += '<set value="'
							+ elecCurrentCompareInfoList[i]['ELEC_CURRENT'].toString()
									.split('-')[1] + '"/>'
				} else {
					chartXml += '<set value=""/>'
				}

			}
			chartXml += '</dataset>';

			chartXml += '<dataset seriesname="IC" color="9932CD">';
			for (var i = 0; i < elecCurrentCompareInfoList.length; i++) {
				if ((!Ext
						.isEmpty(elecCurrentCompareInfoList[i]['ELEC_CURRENT']))
						&& (elecCurrentCompareInfoList[i]['ELEC_CURRENT'].toString()
								.split('-').length > 2)) {
					chartXml += '<set value="'
							+ elecCurrentCompareInfoList[i]['ELEC_CURRENT'].toString()
									.split('-')[2] + '"/>'
				} else {
					chartXml += '<set value=""/>'
				}

			}
			chartXml += '</dataset>';

			chartXml += "</graph>";
		} else if (type == 5) {
			chartXml = '<graph xaxisname="时间" yaxisname="负荷" hovercapbg="DEDEBE" hovercapborder="889E6D" rotateNames="0" decimalPrecision="0" showValues="0" caption="'
					+ smConsName + '"><categories>';
			var elecLoadCompareInfoList = result.elecLoadCompareInfoList;
			for (var i = 0; i < elecLoadCompareInfoList.length; i++) {
				chartXml += '<category label = "'
						+ elecLoadCompareInfoList[i]['DATA_TIME'].substring(10,
								16) + '"/>';
			}

			chartXml += "</categories>";
			if (pattern == 1) {
				chartXml += '<dataset seriesname="同比负荷" color="FDC12E">';
				for (var i = 0; i < elecLoadCompareInfoList.length; i++) {
					chartXml += '<set value="'
							+ elecLoadCompareInfoList[i]['COMPARE_ELEC_LOAD']
							+ '"/>'
				}
				chartXml += '</dataset>';
			} else {
				chartXml += '<dataset seriesname="环比负荷" color="FDC12E">';
				for (var i = 0; i < elecLoadCompareInfoList.length; i++) {
					chartXml += '<set value="'
							+ elecLoadCompareInfoList[i]['COMPARE_ELEC_LOAD']
							+ '"/>'
				}
				chartXml += '</dataset>';
			}
			chartXml += '<dataset seriesname="本日负荷" color="56B9F9">';
			for (var i = 0; i < elecLoadCompareInfoList.length; i++) {
				chartXml += '<set value="'
						+ elecLoadCompareInfoList[i]['ELEC_LOAD'] + '"/>'
			}
			chartXml += '</dataset>';

			chartXml += "</graph>";
		} else if (type == 6) {
			chartXml = '<graph xaxisname="时间" yaxisname="功率因素" hovercapbg="DEDEBE" hovercapborder="889E6D" rotateNames="0" decimalPrecision="0" showValues="0" caption="'
					+ smConsName + '"><categories>';
			var powerFactorCompareInfoList = result.powerFactorCompareInfoList;
			for (var i = 0; i < powerFactorCompareInfoList.length; i++) {
				chartXml += '<category label = "'
						+ powerFactorCompareInfoList[i]['DATA_TIME'].substring(
								10, 16) + '"/>';
			}

			chartXml += "</categories>";
			if (pattern == 1) {
				chartXml += '<dataset seriesname="同比功率因素" color="FDC12E">';
				for (var i = 0; i < powerFactorCompareInfoList.length; i++) {
					chartXml += '<set value="'
							+ powerFactorCompareInfoList[i]['COMPARE_POWER_FACTOR']
							+ '"/>'
				}
				chartXml += '</dataset>';
			} else {
				chartXml += '<dataset seriesname="环比功率因素" color="FDC12E">';
				for (var i = 0; i < powerFactorCompareInfoList.length; i++) {
					chartXml += '<set value="'
							+ powerFactorCompareInfoList[i]['COMPARE_POWER_FACTOR']
							+ '"/>'
				}
				chartXml += '</dataset>';
			}
			chartXml += '<dataset seriesname="本日功率因素" color="56B9F9">';
			for (var i = 0; i < powerFactorCompareInfoList.length; i++) {
				chartXml += '<set value="'
						+ powerFactorCompareInfoList[i]['POWER_FACTOR'] + '"/>'
			}
			chartXml += '</dataset>';

			chartXml += "</graph>";
		}

		return chartXml;

	};

	function queryPoweConsumeInfo(orgNo, custNo, consNo, consSrc, date) {

		Ext.getCmp('powerConsumeInfoPanel').removeAll();
		// 对比类型
		var type = Ext.getCmp('compareTypeRadioGroup').getChecked()[0].inputValue;
		// 对比方式
		var pattern = Ext.getCmp('comparePatternRadioGroup').getChecked()[0].inputValue;
		// 模拟用电变化情况图
		var powerConsumeChartPanel = Ext.create('Ext.panel.Panel', {
					border : false,
					id : 'powerConsumeChartPanel',
					region : 'north',
					layout : 'auto',
					bodyStyle : 'padding : 0px 0px 0px 15px',
					items : []

				});

		Ext.getCmp('powerConsumeChartPanel').removeAll();

		var powerConsumeFusionChartPanel = Ext.create('Ext.panel.Panel', {
					border : false,
					id : 'powerConsumeFusionChartPanel',
					height : 500,
					width : Ext.getCmp('powerConsumeInfoPanel').getWidth(),
					renderTo : Ext.getBody()
				});
		Ext.getCmp('powerConsumeInfoPanel').getEl().mask('正在查询...');

		var queryMap = {};
		Ext.Ajax.request({
			url : 'powerConsumeMonitorAction!queryPowerConsumeInfoList.action',
			params : {
				'queryMap.orgNo' : orgNo,
				'queryMap.custNo' : custNo,
				'queryMap.consNo' : consNo,
				'queryMap.consSrc' : consSrc,
				'queryMap.date' : date,
				'queryMap.type' : type,
				'queryMap.pattern' : pattern
			},
			success : function(response) {
				var result = Ext.decode(response.responseText);
				var chartXml = getPowerConsumeFusionChartXml(type, pattern,
						result);

				if (type == 1) {// 电能示值
					var powerConsumeFusionChart = new FusionCharts(
							"./FusionCharts-new/ScrollColumn2D.swf",
							"power_consume_fusionchart", Ext
									.getCmp('powerConsumeInfoPanel').getWidth()
									- 50, 500);
					powerConsumeFusionChart.setDataXML(chartXml);
					powerConsumeFusionChart.setTransparent(true);
					powerConsumeFusionChart
							.render('powerConsumeFusionChartPanel');
					Ext.getCmp('powerConsumeChartPanel')
							.add(powerConsumeFusionChartPanel);

					//
					var halfMonElecValueInfoList = result.halfMonElecValueInfoList;
					var secondHalfMonElecValueInfoList = result.secondHalfMonElecValueInfoList;

					halfMonElecValueInfoStore.removeAll();
					if (!Ext.isEmpty(halfMonElecValueInfoList)) {
						halfMonElecValueInfoStore
								.loadData(halfMonElecValueInfoList);
					}
					secondHalfMonElecValueInfoStore.removeAll();
					if (!Ext.isEmpty(secondHalfMonElecValueInfoList)) {
						secondHalfMonElecValueInfoStore
								.loadData(secondHalfMonElecValueInfoList);
					}
					if (pattern == 1) {
						// 同比
						var halfMonElecValueYearToYearInfoGrid = Ext.create(
								'Ext.grid.Panel', {
									border : true,
									width : 520,
									height : 150,
									loadMask : true, // 遮罩效果
									store : halfMonElecValueInfoStore,
									viewConfig : {
										trackOver : false
									},
									columnLines : true,
									columns : [new Ext.grid.RowNumberer({
														header : "序号",
														width : 40,
														align : 'center'
													}), {
												text : "上半月",
												width : 120,
												dataIndex : 'DATA_DATE',
												align : 'center'
											}, {
												text : "电能示值",
												width : 120,
												dataIndex : 'ELEC_VALUE',
												align : 'center'
											}, {
												text : "同比时间",
												width : 120,
												dataIndex : 'COMPARE_DATA_DATE',
												align : 'center'
											}, {
												text : "同比电能示值",
												width : 120,
												dataIndex : 'COMPARE_ELEC_VALUE',
												align : 'center'
											}]

								});

						var secondHalfMonElecValueYearToYearInfoGrid = Ext
								.create('Ext.grid.Panel', {
									border : true,
									width : 520,
									height : 150,
									loadMask : true, // 遮罩效果
									store : secondHalfMonElecValueInfoStore,
									viewConfig : {
										trackOver : false
									},
									columnLines : true,
									columns : [new Ext.grid.RowNumberer({
														header : "序号",
														width : 40,
														align : 'center'
													}), {
												text : "下半月",
												width : 120,
												dataIndex : 'DATA_DATE',
												align : 'center'
											}, {
												text : "电能示值",
												width : 120,
												dataIndex : 'ELEC_VALUE',
												align : 'center'
											}, {
												text : "同比时间",
												width : 120,
												dataIndex : 'COMPARE_DATA_DATE',
												align : 'center'
											}, {
												text : "同比电能示值",
												width : 120,
												dataIndex : 'COMPARE_ELEC_VALUE',
												align : 'center'
											}]

								});

						var elecValueYearToYearInfoGridPanel = Ext.create(
								'Ext.panel.Panel', {
									border : false,
									region : 'center',
									bodyStyle : 'padding : 10px 10px 10px 30px',
									layout : {
										type : 'table',
										columns : 2
									},
									items : [
											halfMonElecValueYearToYearInfoGrid,
											secondHalfMonElecValueYearToYearInfoGrid]
								});
						var elecValueYearToYearComparePanel = Ext.create(
								'Ext.panel.Panel', {
									border : false,
									layout : 'auto',
									autoScroll : true,
									monitorResize : true,
									items : [powerConsumeChartPanel,
											elecValueYearToYearInfoGridPanel]
								});
						Ext.getCmp('powerConsumeInfoPanel')
								.add(elecValueYearToYearComparePanel);

					} else {
						// 环比
						var halfMonElecValueChainRelativeInfoGrid = Ext.create(
								'Ext.grid.Panel', {
									border : true,
									width : 520,
									height : 150,
									loadMask : true, // 遮罩效果
									store : halfMonElecValueInfoStore,
									viewConfig : {
										trackOver : false
									},
									columnLines : true,
									columns : [new Ext.grid.RowNumberer({
														header : "序号",
														width : 40,
														align : 'center'
													}), {
												text : "上半月",
												width : 120,
												dataIndex : 'DATA_DATE',
												align : 'center'
											}, {
												text : "电能示值",
												width : 120,
												dataIndex : 'ELEC_VALUE',
												align : 'center'
											}, {
												text : "环比时间",
												width : 120,
												dataIndex : 'COMPARE_DATA_DATE',
												align : 'center'
											}, {
												text : "环比电能示值",
												width : 120,
												dataIndex : 'COMPARE_ELEC_VALUE',
												align : 'center'
											}]

								});

						var secondHalfMonElecValueChainRelativeInfoGrid = Ext
								.create('Ext.grid.Panel', {
									border : true,
									width : 520,
									height : 150,
									loadMask : true, // 遮罩效果
									store : secondHalfMonElecValueInfoStore,
									viewConfig : {
										trackOver : false
									},
									columnLines : true,
									columns : [new Ext.grid.RowNumberer({
														header : "序号",
														width : 40,
														align : 'center'
													}), {
												text : "下半月",
												width : 120,
												dataIndex : 'DATA_DATE',
												align : 'center'
											}, {
												text : "电能示值",
												width : 120,
												dataIndex : 'ELEC_VALUE',
												align : 'center'
											}, {
												text : "环比时间",
												width : 120,
												dataIndex : 'COMPARE_DATA_DATE',
												align : 'center'
											}, {
												text : "环比电能示值",
												width : 120,
												dataIndex : 'COMPARE_ELEC_VALUE',
												align : 'center'
											}]

								});

						var elecValueChainRelativeInfoGridPanel = Ext.create(
								'Ext.panel.Panel', {
									border : false,
									region : 'center',
									bodyStyle : 'padding : 10px 10px 10px 30px',
									layout : {
										type : 'table',
										columns : 2
									},
									items : [
											halfMonElecValueChainRelativeInfoGrid,
											secondHalfMonElecValueChainRelativeInfoGrid]
								});

						var elecValueChainRelativeComparePanel = Ext.create(
								'Ext.panel.Panel', {
									border : false,
									layout : 'auto',
									autoScroll : true,
									monitorResize : true,
									items : [powerConsumeChartPanel,
											elecValueChainRelativeInfoGridPanel]
								});
						Ext.getCmp('powerConsumeInfoPanel')
								.add(elecValueChainRelativeComparePanel);
					}

				} else if (type == 2) {// 电能量
					var powerConsumeFusionChart = new FusionCharts(
							"./FusionCharts-new/ScrollColumn2D.swf",
							"power_consume_fusionchart", Ext
									.getCmp('powerConsumeInfoPanel').getWidth()
									- 50, 500);
					powerConsumeFusionChart.setDataXML(chartXml);
					powerConsumeFusionChart.setTransparent(true);
					powerConsumeFusionChart
							.render('powerConsumeFusionChartPanel');
					Ext.getCmp('powerConsumeChartPanel')
							.add(powerConsumeFusionChartPanel);
					//

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
									width : 520,
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
												text : "上半月",
												width : 120,
												dataIndex : 'DATA_DATE',
												align : 'center'
											}, {
												text : "用电量",
												width : 120,
												dataIndex : 'ELEC_QUANTITY',
												align : 'center'
											}, {
												text : "同比时间",
												width : 120,
												dataIndex : 'COMPARE_DATA_DATE',
												align : 'center'
											}, {
												text : "同比用电量",
												width : 120,
												dataIndex : 'COMPARE_ELEC_QUANTITY',
												align : 'center'
											}]

								});

						var secondHalfMonElecQuantityYearToYearInfoGrid = Ext
								.create('Ext.grid.Panel', {
									border : true,
									width : 520,
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
												text : "下半月",
												width : 120,
												dataIndex : 'DATA_DATE',
												align : 'center'
											}, {
												text : "用电量",
												width : 120,
												dataIndex : 'ELEC_QUANTITY',
												align : 'center'
											}, {
												text : "同比时间",
												width : 120,
												dataIndex : 'COMPARE_DATA_DATE',
												align : 'center'
											}, {
												text : "同比用电量",
												width : 120,
												dataIndex : 'COMPARE_ELEC_QUANTITY',
												align : 'center'
											}]

								});

						var elecQuantityYearToYearInfoGridPanel = Ext.create(
								'Ext.panel.Panel', {
									border : false,
									region : 'center',
									bodyStyle : 'padding : 10px 10px 10px 30px',
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
						Ext.getCmp('powerConsumeInfoPanel')
								.add(elecQuantityYearToYearComparePanel);

					} else {
						// 环比
						var halfMonElecQuantityChainRelativeInfoGrid = Ext
								.create('Ext.grid.Panel', {
									border : true,
									width : 520,
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
												text : "上半月",
												width : 120,
												dataIndex : 'DATA_DATE',
												align : 'center'
											}, {
												text : "用电量",
												width : 120,
												dataIndex : 'ELEC_QUANTITY',
												align : 'center'
											}, {
												text : "环比时间",
												width : 120,
												dataIndex : 'COMPARE_DATA_DATE',
												align : 'center'
											}, {
												text : "环比用电量",
												width : 120,
												dataIndex : 'COMPARE_ELEC_QUANTITY',
												align : 'center'
											}]

								});

						var secondHalfMonElecQuantityChainRelativeInfoGrid = Ext
								.create('Ext.grid.Panel', {
									border : true,
									width : 520,
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
												text : "下半月",
												width : 120,
												dataIndex : 'DATA_DATE',
												align : 'center'
											}, {
												text : "用电量",
												width : 120,
												dataIndex : 'ELEC_QUANTITY',
												align : 'center'
											}, {
												text : "环比时间",
												width : 120,
												dataIndex : 'COMPARE_DATA_DATE',
												align : 'center'
											}, {
												text : "环比用电量",
												width : 120,
												dataIndex : 'COMPARE_ELEC_QUANTITY',
												align : 'center'
											}]

								});

						var elecQuantityChainRelativeInfoGridPanel = Ext
								.create('Ext.panel.Panel', {
									border : false,
									region : 'center',
									bodyStyle : 'padding : 10px 10px 10px 30px',
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
						Ext.getCmp('powerConsumeInfoPanel')
								.add(elecQuantityChainRelativeComparePanel);
					}

				} else if (type == 3) {// 电压
					var powerConsumeFusionChart = new FusionCharts(
							"./FusionCharts-new/ScrollLine2D.swf",
							"power_consume_fusionchart", Ext
									.getCmp('powerConsumeInfoPanel').getWidth()
									- 50, 500);
					powerConsumeFusionChart.setDataXML(chartXml);
					powerConsumeFusionChart.setTransparent(true);
					powerConsumeFusionChart
							.render('powerConsumeFusionChartPanel');
					Ext.getCmp('powerConsumeChartPanel')
							.add(powerConsumeFusionChartPanel);

					//
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
									width : 520,
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
												text : "上午",
												width : 120,
												dataIndex : 'DATA_TIME',
												align : 'center'
											}, {
												text : "电压",
												width : 120,
												dataIndex : 'VOLTAGE',
												align : 'center'
											}, {
												text : "同比时间",
												width : 120,
												dataIndex : 'COMPARE_DATA_TIME',
												align : 'center'
											}, {
												text : "同比电压",
												width : 120,
												dataIndex : 'COMPARE_VOLTAGE',
												align : 'center'
											}]

								});
						var secondHalfDayVoltageYearToYearInfoGrid = Ext
								.create('Ext.grid.Panel', {
									border : true,
									width : 520,
									height : 150,
									loadMask : true, // 遮罩效果
									store : secondHalfDayVoltageInfoStore,
									viewConfig : {
										trackOver : false
									},
									columnLines : true,
									columns : [new Ext.grid.RowNumberer({
														header : "序号",
														width : 40,
														align : 'center'
													}), {
												text : "下午",
												width : 120,
												dataIndex : 'DATA_TIME',
												align : 'center'
											}, {
												text : "电压",
												width : 120,
												dataIndex : 'VOLTAGE',
												align : 'center'
											}, {
												text : "同比时间",
												width : 120,
												dataIndex : 'COMPARE_DATA_TIME',
												align : 'center'
											}, {
												text : "同比电压",
												width : 120,
												dataIndex : 'COMPARE_VOLTAGE',
												align : 'center'
											}]

								});

						var voltageYearToYearInfoGridPanel = Ext.create(
								'Ext.panel.Panel', {
									border : false,
									region : 'center',
									bodyStyle : 'padding : 10px 10px 10px 30px',
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
						Ext.getCmp('powerConsumeInfoPanel')
								.add(voltageYearToYearComparePanel);

					} else {
						// 环比
						var halfDayVoltageChainRelativeInfoGrid = Ext.create(
								'Ext.grid.Panel', {
									border : true,
									width : 520,
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
												text : "上午",
												width : 120,
												dataIndex : 'DATA_TIME',
												align : 'center'
											}, {
												text : "电压",
												width : 120,
												dataIndex : 'VOLTAGE',
												align : 'center'
											}, {
												text : "环比时间",
												width : 120,
												dataIndex : 'COMPARE_DATA_TIME',
												align : 'center'
											}, {
												text : "环比电压",
												width : 120,
												dataIndex : 'COMPARE_VOLTAGE',
												align : 'center'
											}]

								});
						var secondHalfDayVoltageChainRelativeInfoGrid = Ext
								.create('Ext.grid.Panel', {
									border : true,
									width : 520,
									height : 150,
									loadMask : true, // 遮罩效果
									store : secondHalfDayVoltageInfoStore,
									viewConfig : {
										trackOver : false
									},
									columnLines : true,
									columns : [new Ext.grid.RowNumberer({
														header : "序号",
														width : 40,
														align : 'center'
													}), {
												text : "下午",
												width : 120,
												dataIndex : 'DATA_TIME',
												align : 'center'
											}, {
												text : "电压",
												width : 120,
												dataIndex : 'VOLTAGE',
												align : 'center'
											}, {
												text : "环比时间",
												width : 120,
												dataIndex : 'COMPARE_DATA_TIME',
												align : 'center'
											}, {
												text : "环比电压",
												width : 120,
												dataIndex : 'COMPARE_VOLTAGE',
												align : 'center'
											}]

								});
						var voltageChainRelativeInfoGridPanel = Ext.create(
								'Ext.panel.Panel', {
									border : false,
									region : 'center',
									bodyStyle : 'padding : 10px 10px 10px 30px',
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
						Ext.getCmp('powerConsumeInfoPanel')
								.add(voltageChainRelativeComparePanel);
					}

				} else if (type == 4) {// 电流
					var powerConsumeFusionChart = new FusionCharts(
							"./FusionCharts-new/ScrollLine2D.swf",
							"power_consume_fusionchart", Ext
									.getCmp('powerConsumeInfoPanel').getWidth()
									- 50, 500);
					powerConsumeFusionChart.setDataXML(chartXml);
					powerConsumeFusionChart.setTransparent(true);
					powerConsumeFusionChart
							.render('powerConsumeFusionChartPanel');
					Ext.getCmp('powerConsumeChartPanel')
							.add(powerConsumeFusionChartPanel);

					//
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
									width : 520,
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
												text : "上午",
												width : 120,
												dataIndex : 'DATA_TIME',
												align : 'center'
											}, {
												text : "电流",
												width : 120,
												dataIndex : 'ELEC_CURRENT',
												align : 'center'
											}, {
												text : "同比时间",
												width : 120,
												dataIndex : 'COMPARE_DATA_TIME',
												align : 'center'
											}, {
												text : "同比电流",
												width : 120,
												dataIndex : 'COMPARE_ELEC_CURRENT',
												align : 'center'
											}]

								});
						var secondHalfDayElecCurrentYearToYearInfoGrid = Ext
								.create('Ext.grid.Panel', {
									border : true,
									width : 520,
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
												text : "下午",
												width : 120,
												dataIndex : 'DATA_TIME',
												align : 'center'
											}, {
												text : "电流",
												width : 120,
												dataIndex : 'ELEC_CURRENT',
												align : 'center'
											}, {
												text : "同比时间",
												width : 120,
												dataIndex : 'COMPARE_DATA_TIME',
												align : 'center'
											}, {
												text : "同比电流",
												width : 120,
												dataIndex : 'COMPARE_ELEC_CURRENT',
												align : 'center'
											}]

								});

						var elecCurrentYearToYearInfoGridPanel = Ext.create(
								'Ext.panel.Panel', {
									border : false,
									region : 'center',
									bodyStyle : 'padding : 10px 10px 10px 30px',
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
						Ext.getCmp('powerConsumeInfoPanel')
								.add(elecCurrentYearToYearComparePanel);

					} else {
						// 环比
						var halfDayElecCurrentChainRelativeInfoGrid = Ext
								.create('Ext.grid.Panel', {
									border : true,
									width : 520,
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
												text : "上午",
												width : 120,
												dataIndex : 'DATA_TIME',
												align : 'center'
											}, {
												text : "电流",
												width : 120,
												dataIndex : 'ELEC_CURRENT',
												align : 'center'
											}, {
												text : "环比时间",
												width : 120,
												dataIndex : 'COMPARE_DATA_TIME',
												align : 'center'
											}, {
												text : "环比电流",
												width : 120,
												dataIndex : 'COMPARE_ELEC_CURRENT',
												align : 'center'
											}]

								});

						var secondHalfDayElecCurrentChainRelativeInfoGrid = Ext
								.create('Ext.grid.Panel', {
									border : true,
									width : 520,
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
												text : "下午",
												width : 120,
												dataIndex : 'DATA_TIME',
												align : 'center'
											}, {
												text : "电流",
												width : 120,
												dataIndex : 'ELEC_CURRENT',
												align : 'center'
											}, {
												text : "环比时间",
												width : 120,
												dataIndex : 'COMPARE_DATA_TIME',
												align : 'center'
											}, {
												text : "环比电流",
												width : 120,
												dataIndex : 'COMPARE_ELEC_CURRENT',
												align : 'center'
											}]

								});
						var elecCurrentChainRelativeInfoGridPanel = Ext.create(
								'Ext.panel.Panel', {
									border : false,
									region : 'center',
									bodyStyle : 'padding : 10px 10px 10px 30px',
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
						Ext.getCmp('powerConsumeInfoPanel')
								.add(elecCurrentChainRelativeComparePanel);
					}
				} else if (type == 5) {// 负荷
					var powerConsumeFusionChart = new FusionCharts(
							"./FusionCharts-new/ScrollLine2D.swf",
							"power_consume_fusionchart", Ext
									.getCmp('powerConsumeInfoPanel').getWidth()
									- 50, 500);
					powerConsumeFusionChart.setDataXML(chartXml);
					powerConsumeFusionChart.setTransparent(true);
					powerConsumeFusionChart
							.render('powerConsumeFusionChartPanel');
					Ext.getCmp('powerConsumeChartPanel')
							.add(powerConsumeFusionChartPanel);

					//
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
									width : 520,
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
												text : "上午",
												width : 120,
												dataIndex : 'DATA_TIME',
												align : 'center'
											}, {
												text : "负荷",
												width : 120,
												dataIndex : 'ELEC_LOAD',
												align : 'center'
											}, {
												text : "同比时间",
												width : 120,
												dataIndex : 'COMPARE_DATA_TIME',
												align : 'center'
											}, {
												text : "同比负荷",
												width : 120,
												dataIndex : 'COMPARE_ELEC_LOAD',
												align : 'center'
											}]

								});

						var secondHalfDayElecLoadYearToYearInfoGrid = Ext
								.create('Ext.grid.Panel', {
									border : true,
									width : 520,
									height : 150,
									loadMask : true, // 遮罩效果
									store : secondHalfDayElecLoadtInfoStore,
									viewConfig : {
										trackOver : false
									},
									columnLines : true,
									columns : [new Ext.grid.RowNumberer({
														header : "序号",
														width : 40,
														align : 'center'
													}), {
												text : "下午",
												width : 120,
												dataIndex : 'DATA_TIME',
												align : 'center'
											}, {
												text : "负荷",
												width : 120,
												dataIndex : 'ELEC_LOAD',
												align : 'center'
											}, {
												text : "同比时间",
												width : 120,
												dataIndex : 'COMPARE_DATA_TIME',
												align : 'center'
											}, {
												text : "同比负荷",
												width : 120,
												dataIndex : 'COMPARE_ELEC_LOAD',
												align : 'center'
											}]

								});
						var elecLoadYearToYearInfoGridPanel = Ext.create(
								'Ext.panel.Panel', {
									border : false,
									region : 'center',
									bodyStyle : 'padding : 10px 10px 10px 30px',
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
						Ext.getCmp('powerConsumeInfoPanel')
								.add(elecLoadYearToYearComparePanel);

					} else {
						// 环比
						var halfDayElecLoadChainRelativeInfoGrid = Ext.create(
								'Ext.grid.Panel', {
									border : true,
									width : 520,
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
												text : "上午",
												width : 120,
												dataIndex : 'DATA_TIME',
												align : 'center'
											}, {
												text : "负荷",
												width : 120,
												dataIndex : 'ELEC_LOAD',
												align : 'center'
											}, {
												text : "环比时间",
												width : 120,
												dataIndex : 'COMPARE_DATA_TIME',
												align : 'center'
											}, {
												text : "环比负荷",
												width : 120,
												dataIndex : 'COMPARE_ELEC_LOAD',
												align : 'center'
											}]

								});
						var secondHalfDayElecLoadChainRelativeInfoGrid = Ext
								.create('Ext.grid.Panel', {
									border : true,
									width : 520,
									height : 150,
									loadMask : true, // 遮罩效果
									store : secondHalfDayElecLoadtInfoStore,
									viewConfig : {
										trackOver : false
									},
									columnLines : true,
									columns : [new Ext.grid.RowNumberer({
														header : "序号",
														width : 40,
														align : 'center'
													}), {
												text : "下午",
												width : 120,
												dataIndex : 'DATA_TIME',
												align : 'center'
											}, {
												text : "负荷",
												width : 120,
												dataIndex : 'ELEC_LOAD',
												align : 'center'
											}, {
												text : "环比时间",
												width : 120,
												dataIndex : 'COMPARE_DATA_TIME',
												align : 'center'
											}, {
												text : "环比负荷",
												width : 120,
												dataIndex : 'COMPARE_ELEC_LOAD',
												align : 'center'
											}]

								});

						var elecLoadChainRelativeInfoGridPanel = Ext.create(
								'Ext.panel.Panel', {
									border : false,
									region : 'center',
									bodyStyle : 'padding : 10px 10px 10px 30px',
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
						Ext.getCmp('powerConsumeInfoPanel')
								.add(elecLoadChainRelativeComparePanel);
					}

				} else if (type == 6) {// 功率因素
					var powerConsumeFusionChart = new FusionCharts(
							"./FusionCharts-new/ScrollLine2D.swf",
							"power_consume_fusionchart", Ext
									.getCmp('powerConsumeInfoPanel').getWidth()
									- 50, 500);
					powerConsumeFusionChart.setDataXML(chartXml);
					powerConsumeFusionChart.setTransparent(true);
					powerConsumeFusionChart
							.render('powerConsumeFusionChartPanel');
					Ext.getCmp('powerConsumeChartPanel')
							.add(powerConsumeFusionChartPanel);
					//
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
									width : 520,
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
												text : "上午",
												width : 120,
												dataIndex : 'DATA_TIME',
												align : 'center'
											}, {
												text : "功率因素",
												width : 120,
												dataIndex : 'POWER_FACTOR',
												align : 'center'
											}, {
												text : "同比时间",
												width : 120,
												dataIndex : 'COMPARE_DATA_TIME',
												align : 'center'
											}, {
												text : "同比功率因素",
												width : 120,
												dataIndex : 'COMPARE_POWER_FACTOR',
												align : 'center'
											}]

								});

						var secondHalfDayPowerFactorYearToYearInfoGrid = Ext
								.create('Ext.grid.Panel', {
									border : true,
									width : 520,
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
												text : "下午",
												width : 120,
												dataIndex : 'DATA_TIME',
												align : 'center'
											}, {
												text : "功率因素",
												width : 120,
												dataIndex : 'POWER_FACTOR',
												align : 'center'
											}, {
												text : "同比时间",
												width : 120,
												dataIndex : 'COMPARE_DATA_TIME',
												align : 'center'
											}, {
												text : "同比功率因素",
												width : 120,
												dataIndex : 'COMPARE_POWER_FACTOR',
												align : 'center'
											}]

								});
						var powerFactorYearToYearInfoGridPanel = Ext.create(
								'Ext.panel.Panel', {
									border : false,
									region : 'center',
									bodyStyle : 'padding : 10px 10px 10px 30px',
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
						Ext.getCmp('powerConsumeInfoPanel')
								.add(powerFactorYearToYearComparePanel);

					} else {
						// 环比
						var halfDayPowerFactorChainRelativeInfoGrid = Ext
								.create('Ext.grid.Panel', {
									border : true,
									width : 520,
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
												text : "上午",
												width : 120,
												dataIndex : 'DATA_TIME',
												align : 'center'
											}, {
												text : "功率因素",
												width : 120,
												dataIndex : 'POWER_FACTOR',
												align : 'center'
											}, {
												text : "环比时间",
												width : 120,
												dataIndex : 'COMPARE_DATA_TIME',
												align : 'center'
											}, {
												text : "环比功率因素",
												width : 120,
												dataIndex : 'COMPARE_POWER_FACTOR',
												align : 'center'
											}]

								});

						var secondHalfDayPowerFactorChainRelativeInfoGrid = Ext
								.create('Ext.grid.Panel', {
									border : true,
									width : 520,
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
												text : "下午",
												width : 120,
												dataIndex : 'DATA_TIME',
												align : 'center'
											}, {
												text : "功率因素",
												width : 120,
												dataIndex : 'POWER_FACTOR',
												align : 'center'
											}, {
												text : "环比时间",
												width : 120,
												dataIndex : 'COMPARE_DATA_TIME',
												align : 'center'
											}, {
												text : "环比功率因素",
												width : 120,
												dataIndex : 'COMPARE_POWER_FACTOR',
												align : 'center'
											}]

								});

						var powerFactorChainRelativeInfoGridPanel = Ext.create(
								'Ext.panel.Panel', {
									border : false,
									region : 'center',
									bodyStyle : 'padding : 10px 10px 10px 30px',
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
						Ext.getCmp('powerConsumeInfoPanel')
								.add(powerFactorChainRelativeComparePanel);
					}
				}
				//
				Ext.getCmp('powerConsumeInfoPanel').doLayout();
				Ext.getCmp('powerConsumeInfoPanel').getEl().unmask();
			},
			failure : function(response) {
				Ext.Msg.alert('提示', '查询用电信息失败!!!');
				Ext.getCmp('powerConsumeInfoPanel').getEl().unmask();
			}
		});

	};
	// 整体面板
	var totalPanel = Ext.create('Ext.panel.Panel', {
				border : false,
				layout : 'border',
				items : [topPanel, poweConsumeMonitorPanel]

			});
	renderModel(totalPanel, "用电实时监控");
});