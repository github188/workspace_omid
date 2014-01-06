// 1、供电单位选择框
Ext.define('MyOrgDataModel', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'ORG_NO',
						type : 'string'
					}, {
						name : 'ORG_NAME',
						type : 'string'
					}]
		});
var myOrgDataStore = Ext.create('Ext.data.Store', {
			model : 'MyOrgDataModel',
			proxy : {
				type : 'ajax',
				url : 'powerConsumeMonitorAction!queryOrgList.action',
				reader : {
					root : 'orgList',
					type : 'json'
				}
			},
			autoLoad : true
		});

// 2、行业选择框
Ext.define('MyTradeDataModel', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'TRADE_NO',
						type : 'string'
					}, {
						name : 'TRADE_NAME',
						type : 'string'
					}]
		});
var myTradeDataStore = Ext.create('Ext.data.Store', {
			model : 'MyTradeDataModel',
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
// var myGroupTreeStore = Ext.create('Ext.data.TreeStore', {
// proxy : {
// type : 'ajax',
// url : 'powerConsumeMonitorAction!queryGroupTreeNodeList.action',
// reader : {
// root : 'groupTreeNodeList',
// type : 'json'
// }
// },
// fields : ['id', 'text']
// // 跟旧版本extjs一样，节点的id和显示文本
// });

// var groupTree = Ext.create("Ext.tree.Panel", {
// border : false,
// width : 330,
// height : 370,
// singleExpand : true,
// root : {
// text : '群组',
// id : '34101',
// leaf : false,
// expanded : false
// },
// store : groupStore
// });
//
// var groupTreeWin = Ext.create('Ext.window.Window', {
// title : '选择群组',
// width : 350,
// height : 450,
// layout : 'fit',
// modal : true,
// resizable : false,
// bodyStyle : 'padding:2px',
// buttonAlign : 'center',
// closeAction : 'hide',
// items : [groupTree],
// buttons : [{
// text : '确定',
// handler : function() {
// }
// }, {
// text : '关闭',
// handler : function() {
// groupTreeWin.hide();
// }
// }]
// });
//
Ext.define('Ext.ux.form.VcmQueryPanel', {
	extend : 'Ext.form.Panel',
	alias : 'widget.vcmquerypanel',
	autoScroll : true,
	config : {},
	myGroupTreeStore : null,
	myGroupTree : null,
	myGroupTreeWin : null,
	initComponent : function() {
		var me = this;
		me.myGroupTreeStore = Ext.create('Ext.data.TreeStore', {
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
		me.myGroupTree = Ext.create("Ext.tree.Panel", {
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
					store : me.myGroupTreeStore
				});
		me.myGroupTree.on('itemdblclick', function(view, rcd, item, idx, event,
						eOpts) {
					var obj = new Object();
					obj.groupName = rcd.get('text');;
					obj.groupNo = rcd.get('id');;
					if (obj.groupNo != '34101') {
						Ext.getCmp(me.id + '_GroupName')
								.setValue(obj.groupName);
						Ext.getCmp(me.id + '_GroupNo').setValue(obj.groupNo);
					}

					me.myGroupTreeWin.hide();

				}, this);
		me.myGroupTreeWin = Ext.create('Ext.window.Window', {
					title : '选择群组',
					width : 350,
					height : 450,
					layout : 'fit',
					modal : true,
					resizable : false,
					bodyStyle : 'padding:2px',
					buttonAlign : 'center',
					closeAction : 'hide',
					items : [me.myGroupTree],
					buttons : [{
						text : '确定',
						handler : function() {
							var obj = new Object();
							var record = me.myGroupTree.getSelectionModel()
									.getSelection();
							if (record.length > 0) {
								obj.groupName = record[0].get('text');
								obj.groupNo = record[0].get('id');
								if (obj.groupNo != '34101') {
									Ext.getCmp(me.id + '_GroupName')
											.setValue(obj.groupName);
									Ext.getCmp(me.id + '_GroupNo')
											.setValue(obj.groupNo);
								}
							}
							me.myGroupTreeWin.hide();
						}
					}, {
						text : '关闭',
						handler : function() {
							me.myGroupTreeWin.hide();
						}
					}]
				});
		Ext.applyIf(this, {
			title : '查询条件',
			border : true,
			width : 300,
			height : 300,
			autoScroll : true,
			bodyStyle : 'padding:10px 0px 10px 10px',
			items : [{
						xtype : 'combo',
						id : me.id + '_OrgCombox',
						fieldLabel : '供电单位',
						queryMode : 'local',
						store : myOrgDataStore,
						displayField : 'ORG_NAME',
						valueField : 'ORG_NO',
						value : 34101,
						margin : '10 20 10 10'
					}, {
						xtype : 'combo',
						id : me.id + '_TradeCombox',
						fieldLabel : '行业类别',
						queryMode : 'local',
						store : myTradeDataStore,
						displayField : 'TRADE_NAME',
						valueField : 'TRADE_NO',
						emptyText : '----请选择行业----',
						margin : '10 20 10 10'
					}, {
						xtype : 'textfield',
						id : me.id + '_GroupName',
						fieldLabel : '群组名称',
						readOnly : true,
						emptyText : '----请选择群组----',
						blankText : '----请选择群组----',
						listeners : {
							'focus' : function() {
								me.myGroupTreeWin.show();
							}
						},
						margin : '10 20 10 10'
					}, {
						xtype : 'textfield',
						id : me.id + '_GroupNo',
						fieldLabel : '群组编号',
						readOnly : true,
						hidden : true,
						hideLabel : true

					}, {
						xtype : 'textfield',
						id : me.id + '_CustNo',
						fieldLabel : '客户编号',
						emptyText : '----请输入----',
						blankText : '----请输入----',
						margin : '10 20 10 10'
					}, {
						xtype : 'textfield',
						id : me.id + '_CustName',
						fieldLabel : '客户名称',
						emptyText : '----请输入----',
						blankText : '----请输入----',
						margin : '10 20 10 10'
					}, {
						xtype : 'form',
						border : false,
						width : 300,
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
									Ext.getCmp(me.id + '_TradeCombox')
											.setValue('');
									Ext.getCmp(me.id + '_GroupName')
											.setValue('');
									Ext.getCmp(me.id + '_GroupNo').setValue('');
									Ext.getCmp(me.id + '_CustNo').setValue('');
									Ext.getCmp(me.id + '_CustName')
											.setValue('');
								}
							}]
						}, {
							columnWidth : .5,
							border : false,
							items : [{
								xtype : 'button',
								id : me.id + '_QueryBtn',
								text : '查询',
								align : 'center',
								width : 80,
								margin : '10 20 10 20'
									/*
									 * handler : function() { queryVcmInfo(); }
									 */
								}]
						}]
					}]

		});
		me.callParent(arguments);
	},
	constructor : function(cnfg) {
		this.callParent(arguments);
		// this.initConfig(cnfg);
	},
	getVcmQueryValue : function() {
		var me = this;
		var queryMap = {};
		queryMap.orgNo = Ext.getCmp(me.id + '_OrgCombox').getValue();
		queryMap.tradeNo = Ext.getCmp(me.id + '_TradeCombox').getValue();
		queryMap.groupNo = Ext.getCmp(me.id + '_GroupNo').getValue();
		queryMap.custNo = Ext.getCmp(me.id + '_CustNo').getValue();
		queryMap.custName = Ext.getCmp(me.id + '_CustName').getValue();
		return queryMap;
	}
		// ,constructor : function(cnfg) {
		//
		// if (cnfg) {
		// this.id = cnfg.id
		// }
		// this.callParent(arguments);
		// },
		// afterlayout : function() {
		//
		// Ext.ComponentQuery.query('#"' + id + '" >
		// combo')[0].setValue('34101');
		// this.callParent(arguments);
		//
		// }

		// config : {},
		// initComponent : function() {
		// Ext.applyIf(this, {
		// title : '查询条件',
		// id : 'vcmQuery',
		// border : true,
		// autoScroll : true,
		// bodyStyle : 'padding:10px 0px 10px 10px',
		// width : 300,
		// height : 300,
		// items : [{
		// xtype : 'combo',
		// fieldLabel : '供电单位',
		// queryMode : 'local',
		// store : myOrgDataStore,
		// displayField : 'ORG_NAME',
		// valueField : 'ORG_NO',
		// margin : '10 20 10 10'
		// }, {
		// xtype : 'combo',
		// fieldLabel : '行业类别',
		// queryMode : 'local',
		// store : myTradeDataStore,
		// displayField : 'TRADE_NAME',
		// valueField : 'TRADE_NO',
		// emptyText : '----请选择行业----',
		// margin : '10 20 10 10'
		// }, {
		// xtype : 'textfield',
		// fieldLabel : '客户编号',
		// emptyText : '----请输入----',
		// blankText : '----请输入----',
		// margin : '10 20 10 10'
		// }, {
		// xtype : 'textfield',
		// fieldLabel : '客户名称',
		// emptyText : '----请输入----',
		// blankText : '----请输入----',
		// margin : '10 20 10 10'
		// }]
		// });
		// this.callParent(arguments);
		// },
		// constructor : function(cnfg) {
		// this.callParent(arguments);
		// this.initConfig(cnfg);
		// }

});
