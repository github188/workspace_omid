/*
 * Ext.Loader.setConfig({enabled: true}); Ext.Loader.setPath('Ext.ux',
 * './ext4/examples/ux'); Ext.require([ 'Ext.ux.form.MultiSelect' ]);
 */

Ext.onReady(function() {

	/** ***********供电管理单位模型*********** */
	Ext.define('vcmOrgNoModel', {
				extend : 'Ext.data.Model',
				fields : ["ORG_NO", "ORG_NAME"]
			});

	var eleManaOrgStore = Ext.create('Ext.data.Store', {
				model : 'vcmOrgNoModel',
				proxy : {
					type : 'ajax',
					url : 'groupModelManageAction!queryTgOrgNo.action',
					reader : {
						root : 'vcmTgOrgNoList',
						type : 'json'
					}
				}
			});
	eleManaOrgStore.load({
				params : {
					vcmOrgNo : '34101'
				}
			});

	/** ***************群模型下拉列表数据模型*************** */
	Ext.define('vcmModelQueryResult', {
				extend : 'Ext.data.Model',
				fields : ['CUST_GROUP_MODEL_ID', 'PS_ORG_NO', 'MODEL_NAME',
						'CREATOR_NO', 'CREATE_TIME', 'START_DATE',
						'STOP_PERSON_NO', 'STOP_DATE', 'STOP_REASON',
						'GROUP_TYPE_CODE']
			});

	var vcmModelQueryResultStore = Ext.create('Ext.data.Store', {
				model : 'vcmModelQueryResult',
				proxy : {
					type : 'ajax',
					url : 'groupModelManageAction!queryModel.action',
					reader : {
						root : 'queryModelList',
						type : 'json'
					}
				}
			});

	vcmModelQueryResultStore.load({
				params : {
					vcmOrgNo : '34101',
					name : ''
				}
			});

	/** ***********大客户信息数据*********** */
	Ext.define('impCustomerInfoStoreModel', {
				extend : 'Ext.data.Model',
				fields : ['CUST_ID', 'CUST_TYPE', 'CUST_NO', 'CUST_NAME',
						'ECONOMY_TYPE_CODE', 'ANNUAL_GP', 'CREDIT_LEVEL_CODE',
						'VALUE_LEVEL_CODE', 'RISK_LEVEL_CODE', 'VIP_FLAG',
						'QUERY_PWD', 'ENTEPRISE_WEBSITE', 'ENTEPRISE_SCALE',
						'BRIEF', 'REG_CAPITAL', 'T_CAPTAL,LEGAL_PERSON',
						'OPER_SCOPE', 'MAIN_PRODUCT', 'PRODUCE_TECH', 'OUTPUT',
						'VIP_LEVEL', 'MAIN_MATERIAL', 'SUPPLY_SRC',
						'SALES_AMT', 'SALES_REGION', 'PS_ENSURE_PRJ',
						'POWER_COST_RATIO', 'INDUSTRY_CODE']
			});

	var customerGroupMemberInfoStore = Ext.create('Ext.data.Store', {// 根据条件模糊查询大客户信息数据，用来存储属于该客户群的群成员
		model : 'impCustomerInfoStoreModel',
		proxy : {
			type : 'ajax',
			url : 'CustomerGroupManaAction!queryCustomerGroupMember.action',
			reader : {
				root : 'customerGroupMemberInfoList',
				type : 'json'
			}
		}
	});

	var impCustomerInfoConStore_Add = Ext.create('Ext.data.Store', {// 根据条件模糊查询大客户信息数据，存储满足条件的群成员信息
		model : 'impCustomerInfoStoreModel',
		proxy : {
			type : 'ajax',
			url : 'CustomerGroupManaAction!queryImpCustomer.action',
			reader : {
				root : 'impCustomerInfoList',
				type : 'json'
			}
		}
	});

	/** ***********客户群信息数据*********** */
	Ext.define('customerGroupInfoStoreModel', {
				extend : 'Ext.data.Model',
				fields : ["CUST_GROUP_ID", "CUST_GROUP_NAME", "CREATOR_NO", "GEN_DATE",
						"USAGE_DESC", "UASAGE_TYPE_CODE", "GROUP_TYPE_CODE",
						"REFRESH_CYCLE_CODE", "REFRESH_MODE",
						"CUST_GROUP_MODEL_ID"]
			});

	var customerGroupInfoStore = Ext.create('Ext.data.Store', {// 查询客户群信息全部数据
		model : 'customerGroupInfoStoreModel',
		proxy : {
			type : 'ajax',
			url : 'CustomerGroupManaAction!queryAll.action',
			reader : {
				root : 'CGAllList',
				type : 'json'
			}
		}
	});
	customerGroupInfoStore.load({
				params : {}
			});

	var customerGroupInfoConStore = Ext.create('Ext.data.Store', {// 根据条件模糊查询客户群信息数据
		model : 'customerGroupInfoStoreModel',
		proxy : {
			type : 'ajax',
			url : 'CustomerGroupManaAction!querybyCon.action',

			reader : {
				root : 'CGAllListCon',
				type : 'json'
			}
		}
	});

	var selModelImpCust = Ext.create('Ext.selection.CheckboxModel', {//群成员显示面板成员选择模型
				mode : 'SINGLE',
				listeners : {
					select : function(model, record, index) { // record被选中时产生的事件
					}
				}

			});

	var selModelImpCust_Add = Ext.create('Ext.selection.CheckboxModel', {//添加群成员面板成员选择模型
				mode : 'SINGLE',
				listeners : {
					select : function(model, record, index) { // record被选中时产生的事件
					}
				}
			});

	var selModelCustGroup = Ext.create('Ext.selection.CheckboxModel', {//客户群选择模型
				mode : 'SINGLE',
				listeners : {
					select : function(model, record, index) { // record被选中时产生的事件
						var rec2 = selModelCustGroup.getSelection();
						var customerGroupID = rec2[0].get("CUST_GROUP_ID");
						customerGroupMemberManaPanel.setActiveTab(customerGroupMemberInfoPanel); 
						customerGroupMemberInfoStore.load({
									params : {
										customerGroupID : customerGroupID
										,
									}

								});
						impCustomerInfoConStore_Add.removeAll();

						var index = customerGroupInfoConStore.find('CUST_GROUP_ID',customerGroupID);
						Ext.getCmp("customerGroupIDAdd").setValue(customerGroupID);
						Ext.getCmp("customerGroupName").setValue(customerGroupInfoConStore .getAt(index).get('CUST_GROUP_NAME'));
						Ext.getCmp("customerGroupFounderName").setValue(customerGroupInfoConStore .getAt(index).get('CREATOR_NO'));
						Ext.getCmp("customerGroupBuildTime").setValue(customerGroupInfoConStore .getAt(index).get('GEN_DATE'));
						Ext.getCmp("customerGroupUsageType").setValue(customerGroupInfoConStore .getAt(index).get('UASAGE_TYPE_CODE'));
						
						Ext.getCmp("customerGroupUsageDescription").setValue(customerGroupInfoConStore .getAt(index).get('USAGE_DESC'));
						Ext.getCmp("customerGroupType").setValue(customerGroupInfoConStore .getAt(index).get('GROUP_TYPE_CODE'));
						Ext.getCmp("customerGroupModelName").setValue(customerGroupInfoConStore .getAt(index).get('CUST_GROUP_MODEL_ID'));
						Ext.getCmp("customerGroupRefreshCycle").setValue(customerGroupInfoConStore .getAt(index).get('REFRESH_CYCLE_CODE'));
						Ext.getCmp("customerGroupRefreshMode").setValue(customerGroupInfoConStore .getAt(index).get('REFRESH_MODE'));
					}

				}

			});

	/** *******************客户群管理*********************** */
	/** *******************编辑客户群*********************** */
	var customerGroupTypeStore = Ext.create('Ext.data.Store', {// 群类型下拉列表数据
		fields : ['abbr2', 'name2'],
		data : [{
					"abbr2" : "01",
					"name2" : "系统群"
				}, {
					"abbr2" : "02",
					"name2" : "共享群"
				}, {
					"abbr2" : "03",
					"name2" : "私有群"
				}, {
					"abbr2" : "0",
					"name2" : "全部"
				}]
	});

	var customerGroupUsageTypeStore = Ext.create('Ext.data.Store', {// 群用途类型下拉列表数据
		fields : ['abbr2', 'name2'],
		data : [{
					"abbr2" : "01",
					"name2" : "01 信用评价"
				}, {
					"abbr2" : "02",
					"name2" : "02 价值评价"
				}, {
					"abbr2" : "03",
					"name2" : "03 风险评估"
				}, {
					"abbr2" : "04",
					"name2" : "04 VIP认定"
				}, {
					"abbr2" : "05",
					"name2" : "05 服务对象分配"
				}, {
					"abbr2" : "06",
					"name2" : "06 主动服务策略"
				}, {
					"abbr2" : "07",
					"name2" : "07 满意度调查"
				}, {
					"abbr2" : "08",
					"name2" : "99 其它"
				}]
	});

	var customerGroupRefreshCycleStore = Ext.create('Ext.data.Store', {// 群刷新周期下拉列表数据
		fields : ['abbr2', 'name2'],
		data : [{
					"abbr2" : "01",
					"name2" : "01 日"
				}, {
					"abbr2" : "02",
					"name2" : "02 周"
				}, {
					"abbr2" : "03",
					"name2" : "03 月"
				}, {
					"abbr2" : "04",
					"name2" : "04 年"
				}]
	});

	var customerGroupRefreshModeStore = Ext.create('Ext.data.Store', {// 群刷新模式下拉列表数据
		fields : ['abbr2', 'name2'],
		data : [{
					"abbr2" : "01",
					"name2" : "01 不刷新"
				}, {
					"abbr2" : "02",
					"name2" : "02 定时刷新"
				}, {
					"abbr2" : "03",
					"name2" : "03 手工刷新"
				}]
	});

	var customerGroupAddPanel = Ext.create('Ext.form.Panel', {// 编辑客户群面板
		name : 'customerGroupAddPanel',
		id : 'customerGroupAddPanel',
		layout : 'absolute',
		width : 500,
		height : 300,
		title : '编辑客户群',
		items : [{
			x : 0,
			y : 0,
			xtype : 'textfield',
			width : 0,
			border : false,
			hidden : true,
			value : '-1',
			id : 'customerGroupIDAdd',
			name : 'customerGroupIDAdd'},{
					x : 10,
					y : 10,
					xtype : 'label',
					text : ' 客户群名称'
				}, {
					x : 80,
					y : 10,
					xtype : 'textfield',
					width : 140,
					name : 'customerGroupName',
					id : 'customerGroupName',
					typeAhead : true
				}, {
					x : 260,
					y : 10,
					xtype : 'label',
					text : '建立人'
				}, {
					x : 340,
					y : 10,
					xtype : 'textfield',
					width : 140,
					name : 'customerGroupFounderName',
					id : 'customerGroupFounderName',
					typeAhead : true
				}, {
					x : 10,
					y : 40,
					xtype : 'label',
					text : '群生成日期'
				}, {
					x : 80,
					y : 40,
					width : 140,
					name : 'customerGroupBuildTime',
					id : 'customerGroupBuildTime',
					xtype : 'datefield',
					value : new Date(),
					format : 'Y-m-d'
				},

				{
					x : 260,
					y : 40,
					xtype : 'label',
					text : '群用途类型'
				}, {
					x : 340,
					y : 40,
					xtype : 'combo',
					width : 140,
					name : 'customerGroupUsageType',
					id : 'customerGroupUsageType',
					store : customerGroupUsageTypeStore,
					queryMode : 'local',
					displayField : 'name2',
					valueField : 'abbr2',
					value : '03'
				}, {
					x : 10,
					y : 70,
					xtype : 'label',
					text : ' 群用途描述'
				}, {
					x : 80,
					y : 70,
					xtype : 'textarea',
					width : 400,
					height : 50,
					name : 'customerGroupUsageDescription',
					id : 'customerGroupUsageDescription',
					typeAhead : true
				}, {
					x : 10,
					y : 130,
					xtype : 'label',
					text : '群类型'
				}, {
					x : 80,
					y : 130,
					xtype : 'combo',
					width : 140,
					name : 'customerGroupType',
					id : 'customerGroupType',
					store : customerGroupTypeStore,
					queryMode : 'local',
					displayField : 'name2',
					valueField : 'abbr2',
					value : '0'
				}, {
					x : 260,
					y : 130,
					xtype : 'label',
					text : '关联群模型'
				}, {
					x : 340,
					y : 130,
					xtype : 'combo',
					width : 140,
					name : 'customerGroupModelName',
					id : 'customerGroupModelName',
					queryMode : 'local',
					store : vcmModelQueryResultStore,
					displayField : 'MODEL_NAME',
					valueField : 'CUST_GROUP_MODEL_ID'
					,
				}, {
					x : 10,
					y : 160,
					xtype : 'label',
					text : '刷新周期'
				}, {
					x : 80,
					y : 160,
					xtype : 'combo',
					width : 140,
					name : 'customerGroupRefreshCycle',
					id : 'customerGroupRefreshCycle',
					store : customerGroupRefreshCycleStore,
					queryMode : 'local',
					displayField : 'name2',
					valueField : 'abbr2',
					value : '03'
				}, {
					x : 260,
					y : 160,
					xtype : 'label',
					text : '刷新模式'
				}, {
					x : 340,
					y : 160,
					xtype : 'combo',
					width : 140,
					name : 'customerGroupRefreshMode',
					id : 'customerGroupRefreshMode',
					store : customerGroupRefreshModeStore,
					queryMode : 'local',
					displayField : 'name2',
					valueField : 'abbr2',
					value : '03'
				}

				, {
					x : 80,
					y : 190,
					width : 30,
					xtype : 'button',
					align : 'center',

					text : "保存",
					handler : function() {
						var customerGroupID = Ext.getCmp("customerGroupIDAdd")
						.getValue();
						var customerGroupName = Ext.getCmp("customerGroupName")
								.getValue();
						var customerGroupFounderName = Ext
								.getCmp("customerGroupFounderName").getValue();
						var customerGroupBuildTime = Ext.Date.format((Ext
										.getCmp('customerGroupBuildTime')
										.getValue()), 'Y-m-d');
						var customerGroupUsageType = Ext
								.getCmp("customerGroupUsageType").getValue();
						var customerGroupUsageDescription = Ext
								.getCmp("customerGroupUsageDescription")
								.getValue();
						var customerGroupType = Ext.getCmp("customerGroupType")
								.getValue();
						var customerGroupModelName = Ext
								.getCmp("customerGroupModelName").getValue();
						var customerGroupRefreshCycle = Ext
								.getCmp("customerGroupRefreshCycle").getValue();
						var customerGroupRefreshMode = Ext
								.getCmp("customerGroupRefreshMode").getValue();
						Ext.Ajax.request({
							url : 'CustomerGroupManaAction!createCustomerGroupButtionAction.action',
							params : {
								customerGroupID : customerGroupID,
								customerGroupName : customerGroupName,
								customerGroupFounderName : customerGroupFounderName,
								customerGroupBuildTime : customerGroupBuildTime,
								customerGroupUsageType : customerGroupUsageType,
								customerGroupUsageDescription : customerGroupUsageDescription, // params
								// 参数名称必须与action方法中参数名称一致
								customerGroupType : customerGroupType,
								customerGroupModelName : customerGroupModelName,
								customerGroupRefreshCycle : customerGroupRefreshCycle,
								customerGroupRefreshMode : customerGroupRefreshMode
							},

							success : function(response) {
								Ext.Msg.alert('客户群数据保存成功！');
								customerGroupManaPanel.setActiveTab(customerGroupInfoPanel);
								var customerGroupName = Ext
								.getCmp("customerGroupNameQ").getValue();
						// var customerGroupFounderName = Ext
						// .getCmp("customerGroupFounderName").getValue();
						var customerGroupStartBuildTimeQ = Ext.Date.format(
								(Ext.getCmp('customerGroupStartBuildTimeQ')
										.getValue()), 'Y-m-d');
						var customerGroupEndBuildTimeQ = Ext.Date.format(
								(Ext.getCmp('customerGroupEndBuildTimeQ')
										.getValue()), 'Y-m-d');
						var customerGroupType = Ext
								.getCmp("customerGroupTypeQ").getValue();

						customerGroupInfoConStore.load({
							params : {
								customerGroupName : customerGroupName,
								customerGroupStartBuildTimeQ : customerGroupStartBuildTimeQ,
								customerGroupEndBuildTimeQ : customerGroupEndBuildTimeQ,
								customerGroupType : customerGroupType
								,
							}

						})
								
								Ext.getCmp('customerGroupAddPanel').form
										.reset();
							},
							failure : function() {
								Ext.getCmp('customerGroupAddPanel').form
										.reset();
								Ext.Msg.alert("错误", "客户群数据保存失败");// 什么时候会用到？
							}
						});
					}
				}, {
					x : 340,
					y : 190,
					width : 30,
					xtype : 'button',
					align : 'center',
					text : '清空',
					handler : function(){
					Ext.getCmp("customerGroupIDAdd").setValue('-1');
					Ext.getCmp("customerGroupName").setValue('');
					Ext.getCmp("customerGroupFounderName").setValue('');
					Ext.getCmp("customerGroupBuildTime").setValue('');
					Ext.getCmp("customerGroupUsageType").setValue('');
					
					Ext.getCmp("customerGroupUsageDescription").setValue('');
					Ext.getCmp("customerGroupType").setValue('');
					Ext.getCmp("customerGroupModelName").setValue('');
					Ext.getCmp("customerGroupRefreshCycle").setValue('');
					Ext.getCmp("customerGroupRefreshMode").setValue('');
				    }
				}]

	});


	var vipGroupManaSearchPanel = Ext.create('Ext.form.Panel', {// 客户群查询面板
		height : 40,
		// width : 800,
		region : 'north',
		border : false,
		layout : 'auto',
		items : [{
			xtype : 'container',
			layout : 'column',
			defaults : {
				columnWidth : 0.20,
				labelAlign : "right",
				margin : '6 0 6 0'
			},
			items : [{
						xtype : 'textfield',
						fieldLabel : '客户群名称',
						name : 'customerGroupNameQ',
						id : 'customerGroupNameQ',
						readOnly : false,
						labelSeparator : ''
						,
					}, {
						//columnWidth : 0.18,
						xtype : 'textfield',
						fieldLabel : '群生成起止日期',
						name : 'customerGroupStartBuildTimeQ',
						id : 'customerGroupStartBuildTimeQ',
						xtype : 'datefield',
						value : new Date(),
						format : 'Y-m-d'
					},

					{
						columnWidth : 0.03,
						text : 'to',
						xtype : 'label',
						margin : '6 5 6 13',
						Align : "center"
						,
					}, {
						columnWidth : 0.13,
						xtype : 'textfield',
						// fieldLabel : '-',
						name : 'customerGroupEndBuildTimeQ',
						id : 'customerGroupEndBuildTimeQ',
						xtype : 'datefield',
						value : new Date(),
						format : 'Y-m-d'
					},

					{
						// columnWidth : 0.33,
						xtype : 'combo',
						fieldLabel : '群类型',
						multiSelect : false,
						queryMode : 'local',
						name : 'customerGroupTypeQ',
						id : 'customerGroupTypeQ',
						store : customerGroupTypeStore,

						displayField : 'name2',
						valueField : 'abbr2',
						value : '0',
						editable : false,
						anchor : '100%'
						,
					},

					{
						// x: 80,
						// y: 100,
						// width : 10,
						columnWidth : 0.05,
						xtype : 'button',

						text : '查询',
						anchor : '100%',
						margin : '6 5 6 10',
						// align : 'center',
						handler : function() {
							var customerGroupName = Ext
									.getCmp("customerGroupNameQ").getValue();
							// var customerGroupFounderName = Ext
							// .getCmp("customerGroupFounderName").getValue();
							var customerGroupStartBuildTimeQ = Ext.Date.format(
									(Ext.getCmp('customerGroupStartBuildTimeQ')
											.getValue()), 'Y-m-d');
							var customerGroupEndBuildTimeQ = Ext.Date.format(
									(Ext.getCmp('customerGroupEndBuildTimeQ')
											.getValue()), 'Y-m-d');
							var customerGroupType = Ext
									.getCmp("customerGroupTypeQ").getValue();

							customerGroupInfoConStore.load({
								params : {
									customerGroupName : customerGroupName,
									customerGroupStartBuildTimeQ : customerGroupStartBuildTimeQ,
									customerGroupEndBuildTimeQ : customerGroupEndBuildTimeQ,
									customerGroupType : customerGroupType
									,
								}

							})
						}
					},

					{
						columnWidth : 0.05,
						margin : '6 5 6 5',
						// x: 80,
						// y: 100,
						width : 60,
						xtype : 'button',
						anchor : '60%',
						text : '删除',
						id : 'delGroupButton',
						name : 'delGroupButton',
						handler : function() {
							var rec2 = selModelCustGroup.getSelection();
							var customerGroupID = rec2[0].get("CUST_GROUP_ID");
							Ext.Ajax.request({
								url : 'CustomerGroupManaAction!delCustomerGroup.action',
								params : {
									customerGroupID : customerGroupID
								},
								success : function(response) {
									Ext.Msg.alert("客户群删除成功");
									customerGroupInfoConStore.load({
										params : {
											customerGroupName : Ext
													.getCmp("customerGroupNameQ")
													.getValue(),
											customerGroupStartBuildTimeQ : Ext.Date.format(
													(Ext.getCmp('customerGroupStartBuildTimeQ')
															.getValue()), 'Y-m-d'),
											customerGroupEndBuildTimeQ : Ext.Date.format(
													(Ext.getCmp('customerGroupEndBuildTimeQ')
															.getValue()), 'Y-m-d'),
											customerGroupType : Ext
													.getCmp("customerGroupTypeQ")
													.getValue()
											,
										}

									});
									// Ext.getCmp("vipGroupManaPanel").getUpdater().refresh();
								}
							});
							
							

						}
					}]

		}]
	});

	var vipGroupManaSearchResultPanel = Ext.create('Ext.grid.Panel', {// 显示客户群查询结果
		name : vipGroupManaSearchResultPanel,
		id : vipGroupManaSearchResultPanel,
		region : 'center',
		title : '查询结果',
		// width : 800,
		autoScroll : true,
		queryMode : 'remote',

		store : customerGroupInfoConStore,
		selModel : selModelCustGroup,

		columns : [

		{
					header : "客户群名称",
					// sortable : true,
					// resizable : true,
					dataIndex : "CUST_GROUP_NAME",
					flex : 1
				}, {
					header : "建立人",
					// sortable : true,
					// resizable : true,
					dataIndex : "CREATOR_NO",
					flex : 1
				}, {
					header : "群生成日期",
					// sortable : true,
					// resizable : true,
					flex : 1,
					dataIndex : "GEN_DATE"
				}, {
					header : "群用途描述",
					// sortable : true,
					// resizable : true,
					flex : 1,
					dataIndex : "USAGE_DESC"
				}, {
					header : "群用途类型",
					// sortable : true,
					// resizable : true,
					flex : 1,
					dataIndex : "UASAGE_TYPE_CODE"
				}, {
					header : "群类型",
					// sortable : true,
					// resizable : true,
					flex : 1,
					dataIndex : "GROUP_TYPE_CODE"
				}, {
					header : "刷新周期",
					// sortable : true,
					// resizable : true,
					flex : 1,
					dataIndex : "REFRESH_CYCLE_CODE"
				}, {
					header : "刷新模式",
					// sortable : true,
					// resizable : true,
					flex : 1,
					dataIndex : "REFRESH_MODE"
				}, {
					header : "群模型名称",
					// sortable : true,
					// resizable : true,
					flex : 1,
					dataIndex : "CUST_GROUP_MODEL_ID"
				}]

	});

	var customerGroupInfoPanel = Ext.create('Ext.form.Panel', {// 客户群信息管理面板（查询、显示和删除群）
		region : 'center',
		// height : 300,
		// width:800,
		title : '客户群查询',
		collapsible : true,
		floatable : false,
		autoScroll : true,
		items : [vipGroupManaSearchPanel, vipGroupManaSearchResultPanel]

	});

	var customerGroupManaPanel = Ext.createWidget('tabpanel', {
				region : 'center',
				height : 500,
				activeTab : 0,
				defaults : {
					bodyPandding : 10
				},
				items : [customerGroupInfoPanel, customerGroupAddPanel]
			});

	/** ***********************显示和删除客户群成员面板*************************** */

	var GroupMemberManaCtrlPanel = Ext.create('Ext.form.Panel', {// 客户群成员管理控制面板
		region : 'south',
		layout : 'auto',
		// title:'群模型管理',
		items : [{
			width : 40,
			xtype : 'button',
			text : '删除',
			margin : '0 0 0 10',
			id : 'delCustomerGroupMemberButton',
			name : 'delCustomerGroupMemberButton',
			handler : function() {
				var cgMember = selModelImpCust.getSelection();
				
				
				if(cgMember==''){
					Ext.Msg.alert('提示','请选择要删除的群成员！');
				}
				else{
				var rec2 = selModelCustGroup.getSelection();
				var customerGroupID = rec2[0].get("CUST_GROUP_ID");
				var CUST_GROUP_OBJ_ID2 = cgMember[0].get("CUST_ID");
				Ext.Ajax.request({
					url : 'CustomerGroupManaAction!delCustomerGroupMemeber.action',
					params : {
						CUST_GROUP_OBJ_ID2 : CUST_GROUP_OBJ_ID2,
						customerGroupID : customerGroupID
					},
					success : function(response) {
						Ext.Msg.alert("客户群成员删除成功");

						var rec2 = selModelCustGroup.getSelection();
						var customerGroupID = rec2[0].get("CUST_GROUP_ID");
						customerGroupMemberInfoStore.load({
									params : {
							customerGroupID : customerGroupID,
										
									}

								})
						// Ext.getCmp("grid_vcm").getUpdater().refresh();
					}
				});
				}
			}
		}]

	});

	var customerGroupMemberInfoGridPanel = Ext.create('Ext.grid.Panel', {// 显示群成员结果
		id : 'customerGroupMemberInfoGridPanel',
		name : 'customerGroupMemberInfoGridPanel',
		region : 'center',
		height : 170,
		autoScroll : true,
		invalidateScrollerOnRefresh : false,
		// selModel :selModel,
		store : customerGroupMemberInfoStore,
		selModel : selModelImpCust,

		columns : [{
					text : '客户标示',
					sortable : false,
					menuDisabled : true,
					flex : 1,
					dataIndex : 'CUST_ID'
				}, {
					text : '大客户类型',
					sortable : false,
					menuDisabled : true,
					flex : 1,
					dataIndex : 'CUST_TYPE'
				}, {
					text : '客户编号',
					sortable : false,
					menuDisabled : true,
					flex : 1,
					dataIndex : 'CUST_NO'
				}, {
					text : '客户名称',
					sortable : false,
					menuDisabled : true,
					flex : 1,
					dataIndex : 'CUST_NAME'
				}, {
					text : '经济类型',
					sortable : false,
					menuDisabled : true,
					flex : 1,
					dataIndex : 'ECONOMY_TYPE_CODE'
				}, {
					text : '信用等级',
					sortable : false,
					menuDisabled : true,
					flex : 1,
					dataIndex : 'CREDIT_LEVEL_CODE'
				}, {
					text : '价值等级',
					sortable : false,
					menuDisabled : true,
					flex : 1,
					dataIndex : 'VALUE_LEVEL_CODE'
				}, {
					text : '风险等级',
					sortable : false,
					menuDisabled : true,
					flex : 1,
					dataIndex : 'RISK_LEVEL_CODE'
				}, {
					text : 'VIP标志',
					sortable : false,
					menuDisabled : true,
					flex : 1,
					dataIndex : 'VIP_FLAG'
				}]
		,
	});

	var customerGroupMemberInfoPanel = Ext.create('Ext.form.Panel', {// 客户群成员信息管理面板（显示和删除群成员）
		// region : 'south',
		id : 'customerGroupMemberInfoPanel',
		name : 'customerGroupMemberInfoPanel',
		height : 200,
		// // width:800,
		title : '客户群成员',
		collapsible : true,
		floatable : false,
		autoScroll : true,
		items : [customerGroupMemberInfoGridPanel, GroupMemberManaCtrlPanel]

	});

	/** *********************添加客户群成员面板****************************** */

	var GroupMemberAdd_QueryCtrlPanel = Ext.create('Ext.form.Panel', { // 查询和选择群成员操作面板
		region : 'north',
		id : 'GroupMemberAdd_QueryPanel',
		name : 'GroupMemberAdd_QueryPanel',
		autoScroll : true,
		border : false,
		layout : 'auto',
		height : 35,
		layout : 'column',
		defaults : {
			columnWidth : 0.1,
			labelAlign : "right",
			margin : '6 0 6 0'
		},

		items : [{
					xtype : 'textfield',
					fieldLabel : '大客户编号',
					columnWidth : 0.25,
					name : 'impCustomerID_Add',
					id : 'impCustomerID_Add'
					,

				}, {
					xtype : 'textfield',
					fieldLabel : '客户名称',
					columnWidth : 0.25,
					name : 'impCustomerName_Add',
					id : 'impCustomerName_Add'
					,
					// emptyText : '----请输入----',
				// blankText : '----请输入----',
			}	, {
					xtype : 'button',
					text : '查询',
					labelWidth : 60,
					// width : 80,
					margin : '6 10 6 10',

					handler : function() {
						var impCustomerID = Ext.getCmp("impCustomerID_Add")
								.getValue();
						var impCustomerName = Ext.getCmp("impCustomerName_Add")
								.getValue();
						
						var rec2 = selModelCustGroup.getSelection();
						var customerGroupID_Add = rec2[0].get("CUST_GROUP_ID");

						impCustomerInfoConStore_Add.load({
									params : {
										customerGroupID_Add : customerGroupID_Add,
										impCustomerID : impCustomerID,
										impCustomerName : impCustomerName
										,
									}

								})
					}
				}, {
					xtype : 'button',
					text : '添加',
					labelWidth : 60,
					// width : 80,
					margin : '6 10 6 10',

					handler : function() {
						var rec2 = selModelCustGroup.getSelection();
						Ext.Msg.alert('提示',rec2)

						var impCustSel = selModelImpCust_Add.getSelection();

						if(rec2 == ''){
							Ext.Msg.alert('提示','请选择要加入群成员的客户群！')
						}
						else if(impCustSel == ''){
							Ext.Msg.alert('提示','请选择要加入客户群的群成员！')
						}
						else{
							var customerGroupID_Add = rec2[0].get("CUST_GROUP_ID");
							var CUST_GROUP_OBJ_ID_Add = impCustSel[0]
							       								.get("CUST_ID");
						Ext.Ajax.request({
							url : 'CustomerGroupManaAction!createCustomerGroupMemberButtionAction.action',
							params : {
								customerGroupID_Add : customerGroupID_Add,
								CUST_GROUP_OBJ_ID_Add : CUST_GROUP_OBJ_ID_Add
								,
							},

							success : function(response) {
								Ext.Msg.alert("客户群成员添加成功");
								var impCustomerID = Ext.getCmp("impCustomerID_Add")
								.getValue();
						var impCustomerName = Ext.getCmp("impCustomerName_Add")
								.getValue();
						
						impCustomerInfoConStore_Add.load({
									params : {
										customerGroupID_Add : customerGroupID_Add,
										impCustomerID : impCustomerID,
										impCustomerName : impCustomerName
										,
									}

								})
								
								
							},
							failure : function() {
								Ext.Msg.alert("错误", "客户群成员添加失败");
							}
						});
				}
					}
				}]
	});

	var GroupMemberAdd_QueryResultPanel = Ext.create('Ext.grid.Panel', {// 客户群成员（大客户）查询结果显示面板
		region : 'center',
		id : 'GroupMemberAdd_QueryResultPanel',
		name : 'GroupMemberAdd_QueryResultPanel',
		title : '查询结果',
		// width : 900,
		// height : 100,
		// region: 'center',
		// verticalScrollerType: 'paginggridscroller',
		// do not reset the scrollbar when the view refreshs
		// invalidateScrollerOnRefresh: false,
		// stateful: true,
		store : impCustomerInfoConStore_Add,
		selModel : selModelImpCust_Add,

		columns : [{
					text : '客户标示',
					sortable : false,
					menuDisabled : true,
					flex : 1,
					dataIndex : 'CUST_ID'
				}, {
					text : '大客户类型',
					sortable : false,
					menuDisabled : true,
					flex : 1,
					dataIndex : 'CUST_TYPE'
				}, {
					text : '客户编号',
					sortable : false,
					menuDisabled : true,
					flex : 1,
					dataIndex : 'CUST_NO'
				}, {
					text : '客户名称',
					sortable : false,
					menuDisabled : true,
					flex : 1,
					dataIndex : 'CUST_NAME'
				}, {
					text : '经济类型',
					sortable : false,
					menuDisabled : true,
					flex : 1,
					dataIndex : 'ECONOMY_TYPE_CODE'
				}, {
					text : '信用等级',
					sortable : false,
					menuDisabled : true,
					flex : 1,
					dataIndex : 'CREDIT_LEVEL_CODE'
				}, {
					text : '价值等级',
					sortable : false,
					menuDisabled : true,
					flex : 1,
					dataIndex : 'VALUE_LEVEL_CODE'
				}, {
					text : '风险等级',
					sortable : false,
					menuDisabled : true,
					flex : 1,
					dataIndex : 'RISK_LEVEL_CODE'
				}, {
					text : 'VIP标志',
					sortable : false,
					menuDisabled : true,
					flex : 1,
					dataIndex : 'VIP_FLAG'
				}]
		,
	});

	var customerGroupMemberAddPanel = Ext.create('Ext.form.Panel', {// 添加客户群成员（大客户）面板
		// region : 'south',
		layout : 'border',
		height : 200,
		// // width:800,
		title : '添加客户群成员',
		collapsible : true,
		floatable : false,
		autoScroll : true,
		items : [GroupMemberAdd_QueryCtrlPanel, GroupMemberAdd_QueryResultPanel]

	});

	var customerGroupMemberManaPanel = Ext.createWidget('tabpanel', {// 客户群成员（大客户）信息显示和添加客户群成员（大客户）面板
		region : 'south',
		activeTab : 0,
		defaults : {
			bodyPandding : 10
		},
		items : [customerGroupMemberInfoPanel, customerGroupMemberAddPanel]
	});

	var CGMana = Ext.create('Ext.panel.Panel', {
				layout : 'border',
				border : true,
				autoScroll : true,
				items : [customerGroupManaPanel, customerGroupMemberManaPanel]
			});

	renderModel(CGMana, "客户群管理");

});
