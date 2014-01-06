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
				,
			});

	/** ***************客户群模型查询结果模型*************** */
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
	
	
	/** ***************客户群模型条件数据模型*************** */
	Ext.define('modelConQuerybyModelIDModel', {
				extend : 'Ext.data.Model',
				fields : ['COND_ID', 'CUST_GROUP_MODEL_ID', 'ATTR_ID',
						'COND_NAME', 'CONDITION', 'COMPARE_VALUE',
						'LOGIC_SYMBOL']
			});

	var modelConQuerybyModelIDStore = Ext.create('Ext.data.Store', {
				model : 'modelConQuerybyModelIDModel',
				proxy : {
					type : 'ajax',
					url : 'groupModelManageAction!queryModelCon.action',
					reader : {
						root : 'queryModelConList',
						type : 'json'
					}
				}
			});
	
	
	/** ***************评估对象属性下拉列表数据*************** */
	Ext.define('AOPInfoConStoreModel', {
				extend : 'Ext.data.Model',
				fields : ["ATTR_ID", "ATTR_NAME", "USAGE_CODE", "TYPE_CODE",
						"UNIT", "PS_ORG_NO", "EFFECT_DEGREE", "DATA_SRC",
						"SRC_FIELD", "SRC_TABLE", "ATTR_COMMENT",
						"RISK_TYPE_CODE", "ANALYSE_TYPE", "EVENT_LEVEL"]
			});

	var AOPInfoConStore = Ext.create('Ext.data.Store', {// 根据条件模糊查询评估对象属性信息数据
		model : 'AOPInfoConStoreModel',
		proxy : {
			type : 'ajax',
			url : 'AssessmentObjPropertyAction!queryAOP.action',

			reader : {
				root : 'queryAOPList',
				type : 'json'
			}
		}
	});
	AOPInfoConStore.load({
		params : {
			PS_ORG_NO : '34101',
			ATTR_NAME : ''
			,
		}

	});
// var selModelAOP = Ext.create('Ext.selection.CheckboxModel', {// 评估对象属性选择模型
// mode : 'SINGLE',
// listeners : {
//
// }
//
// });

	/** **********单选按钮*********** */
	var selModelManage = Ext.create('Ext.selection.CheckboxModel', {
				mode : 'SINGLE',
				// checkOnly:true,//如果值为true，则只用点击checkbox列才能选中此条记录
				// allowDeselect:true//如果值true，并且mode值为单选（single）时，可以通过点击checkbox取消对其的选择
				listeners : {
					select : function(model, record, index) { // record被选中时产生的事件
						var rec2 = selModelManage.getSelection();
						var groupModelID = rec2[0].get("CUST_GROUP_MODEL_ID");
						modelConQuerybyModelIDStore.load({
					params : {
							groupModelID : groupModelID
						,
					}

				});
						
						var index = vcmModelQueryResultStore.find('CUST_GROUP_MODEL_ID',groupModelID);
						
						Ext.getCmp("modelIDAdd").setValue(groupModelID);
						Ext.getCmp("eleManaUnitAdd").setValue(vcmModelQueryResultStore.getAt(index).get('PS_ORG_NO'));
						Ext.getCmp("modelNameAdd").setValue(vcmModelQueryResultStore.getAt(index).get('MODEL_NAME'));
						Ext.getCmp("creatorAdd").setValue(vcmModelQueryResultStore.getAt(index).get('CREATOR_NO'));
						Ext.getCmp("groupTypeAdd").setValue(vcmModelQueryResultStore.getAt(index).get('GROUP_TYPE_CODE'));
						Ext.getCmp("parentModelLableAdd").setValue(vcmModelQueryResultStore.getAt(index).get('P_MODEL_ID'));
						Ext.getCmp("customSQLAdd").setValue(vcmModelQueryResultStore.getAt(index).get('CUST_SQL'));
						Ext.getCmp("remarkAdd").setValue(vcmModelQueryResultStore.getAt(index).get('REMARK'));
						//Ext.getCmp("modelNameAdd").setValue(vcmModelQueryResultStore.getAt(index).get('MODEL_NAME'));

						
						
				}
	}
			});
	
	
	var selModelCon = Ext.create('Ext.selection.CheckboxModel', {
		mode : 'SINGLE',
		// checkOnly:true,//如果值为true，则只用点击checkbox列才能选中此条记录
		// allowDeselect:true//如果值true，并且mode值为单选（single）时，可以通过点击checkbox取消对其的选择
		listeners : {
			select : function(model, record, index) { // record被选中时产生的事件
}
	}});
	
	/** ***************群类型*************** */
	var states = Ext.create('Ext.data.Store', {
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
						}]
			});
	
	
	var LOGIC_SYMBOLStore = Ext.create('Ext.data.Store', {// 逻辑符号下拉列表数据
		fields : ['abbr2', 'name2'],
		data : [{
					"abbr2" : ">",
					"name2" : ">"
				}, {
					"abbr2" : "<",
					"name2" : "<"
				}, {
					"abbr2" : "=",
					"name2" : "="
				}, {
					"abbr2" : "AND",
					"name2" : "AND"
				}, {
					"abbr2" : "OR",
					"name2" : "OR"
				}]
	});

	
	
	var groupTypeComboBox = Ext.create('Ext.form.ComboBox', {
				id : 'groupTypeAdd',
				name : 'groupTypeAdd',
				// fieldLabel: '群类型',
				store : states,
				queryMode : 'local',
				displayField : 'name2',
				valueField : 'abbr2',
				value : '03'
			});

	var groupTypeComboBoxUpdate = Ext.create('Ext.form.ComboBox', { // 模型修改群类型下拉框
		id : 'groupTypeUpdate',
		name : 'groupTypeUpdate',
		// fieldLabel: '群类型',
		store : states,
		queryMode : 'local',
		displayField : 'name2',
		valueField : 'abbr2',
		value : '03'
	});


	var modelForm = Ext.create('Ext.form.Panel', {
		height : 40,
		region : 'north',
		border : false,
		layout : 'auto',
		items : [{
			xtype : 'container',
			layout : 'column',
			defaults : {
				columnWidth : 0.2,
				labelAlign : 'right',
				margin : '6 0 6 0'
			},
			items : [{
						columnWidth : 0.25,
						name : 'eleManaOrg',
						id : 'eleManaOrg',
						xtype : 'combo',
						fieldLabel : '供电管理单位',
						multiSelect : false,
						queryMode : 'remote',
						store : eleManaOrgStore,
						displayField : 'ORG_NAME',
						valueField : 'ORG_NO',
						value : '34101',
						emptyText : '--请输入--',
						blankText : '--请输入--',
						editable : false,
						anchor : '100%',
						margin : '6 0 6 1'
						,

					}, {
						name : 'modelNameQ',
						id : 'modelNameQ',
						columnWidth : 0.17,
						xtype : 'textfield',
						fieldLabel : '模型名称',
						margin : '6 0 6 0'
							
						,
					}, {
						columnWidth : 0.17,
						xtype : 'textfield',
						fieldLabel : '建立人',
						margin : '6 2 6 0'
						,

					},

					{
						columnWidth : 0.08,
						xtype : 'button',
						text : '查询',
						anchor : '70%',
						margin : '6 10 6 10',
						handler : function() {
							vcmModelQueryResultStore.proxy.extraParams = {
								vcmOrgNo : Ext.getCmp('eleManaOrg').getValue(),
								name : Ext.getCmp('modelNameQ').getValue()
							};
							vcmModelQueryResultStore.load();
						}
					},

					{
						columnWidth : 0.08,
						margin : '6 10 6 10',
						// x: 80,
						// y: 100,
						width : 60,
						xtype : 'button',
						anchor : '60%',
						text : '删除',
						id : 'delModelButton',
						name : 'delModelButton',
						handler : function() {
							var rec2 = selModelManage.getSelection();
							var groupModelID2 = rec2[0]
									.get("CUST_GROUP_MODEL_ID");
							Ext.Ajax.request({
								url : 'groupModelManageAction!delModel.action',
								params : {
									groupModelID : groupModelID2
								},
								success : function(response) {
									Ext.Msg.alert("模型删除成功");
									vcmModelQueryResultStore.proxy.extraParams = {
											vcmOrgNo : Ext.getCmp('eleManaOrg').getValue(),
											name : Ext.getCmp('modelNameQ').getValue()
										};
										vcmModelQueryResultStore.load();
								}
							});
						}
					}]

		}]
	});

	/** ********************编辑群模型模块********************** */

	var add_model = Ext.create('Ext.panel.Panel', {
		title : '编辑客户群模型',
		layout : 'absolute',
		width : 420,
		height : 300,
		items : [{
			x : 0,
			y : 0,
			xtype : 'textfield',
			width : 0,
			value : '-1',
			border : false,
			hidden : true,
			id : 'modelIDAdd',
			name : 'modelIDAdd'},{
					x : 10,
					y : 10,
					xtype : 'label',
					text : ' 供电单位'
				}, {
					x : 80,
					y : 10,
					xtype : 'combo',
					width : 140,
					id : 'eleManaUnitAdd',
					name : 'eleManaUnitAdd',
					queryMode : 'local',
					store : eleManaOrgStore,
					displayField : 'ORG_NAME',
					valueField : 'ORG_NO',
					value : '34101'
					,
					// typeAhead: true
			}	, {
					x : 260,
					y : 10,
					xtype : 'label',
					text : '模型名称'
				}, {

					x : 340,
					y : 10,
					xtype : 'textfield',
					width : 140,
					id : 'modelNameAdd',
					name : 'modelNameAdd',
					allowBlank : false
				}, {
					x : 10,
					y : 40,
					xtype : 'label',
					text : '创建人'
				}, {
					x : 80,
					y : 40,
					xtype : 'textfield',
					width : 140,
					id : 'creatorAdd',
					name : 'creatorAdd'
				}, {
					x : 260,
					y : 40,
					xtype : 'label',
					text : '群类型'
				}, {
					x : 340,
					y : 40,
					width : 140,
					items : [groupTypeComboBox]
				}, {
					x : 10,
					y : 70,
					xtype : 'label',
					text : '父模型标识'
				}, {
					x : 80,
					y : 70,
					xtype : 'combo',
					width : 140,
					id : 'parentModelLableAdd',
					name : 'parentModelLableAdd',
					disabled : true

				}, {
					x : 260,
					y : 70,
					xtype : 'label',
					text : '自定义SQL'
				}, {
					x : 340,
					y : 70,
					xtype : 'textfield',
					width : 140,
					id : 'customSQLAdd',
					name : 'customSQLAdd'
					,
					// displayField: 'ORG_NAME',
				// store: TgorgStore,
				// queryMode: 'local',
				// typeAhead: true
				// valueField:'ORG_NO',
				// value :'34101'
			}	, {
					x : 10,
					y : 120,
					xtype : 'label',
					text : '说明'
				}, {
					x : 80,
					y : 120,
					xtype : 'textarea',
					width : 400,
					hight : 100,
					id : 'remarkAdd',
					name : 'remarkAdd',
					typeAhead : true
					,
				}, {
					x : 200,
					y : 230,
					width : 30,
					xtype : 'button',
					text : '保存',
					align : 'center',

					handler : function() {
					if(Ext.getCmp("modelNameAdd").getValue()!=''){
						var modelIDAdd = Ext.getCmp("modelIDAdd")
						.getValue();
						var eleManaUnit = Ext.getCmp("eleManaUnitAdd")
								.getValue();
						var modelName = Ext.getCmp("modelNameAdd").getValue();
						var creator = Ext.getCmp("creatorAdd").getValue();
						var groupType = Ext.getCmp("groupTypeAdd").getValue();
						var parentModelLable = Ext
								.getCmp("parentModelLableAdd").getValue();
						var customSQL = Ext.getCmp("customSQLAdd").getValue();
						var remark = Ext.getCmp("remarkAdd").getValue();

						Ext.Ajax.request({
									url : 'groupModelManageAction!insertModel.action',
									params : {
										groupModelID : modelIDAdd,
										orgNO : eleManaUnit,
										name : modelName,
										creatorNO : creator,
										groupTypeCode : groupType,
										parentModelLable : parentModelLable,
										// 数据库中无此字段
										custSQL : customSQL,
										remark : remark
									},
									success : function(response) {
										/*
										 * testExerciseStore.baseParams = {
										 * txtOfNameTextField :
										 * txtNameForUpdate,
										 * txtOfStaffNoTextField :
										 * txtStaffNoForUpdate };
										 */
										Ext.Msg.alert('数据保存成功！');
										vcmModelQueryResultStore.proxy.extraParams = {
												vcmOrgNo : Ext.getCmp('eleManaOrg').getValue(),
												name : Ext.getCmp('modelNameQ').getValue()
											};
											vcmModelQueryResultStore.load();
											customerGroupModelManaPanel.setActiveTab(customerGroupModelInfoPanel);
											Ext.getCmp('add_model').form
											.reset();
									}
								});
					}
						else{
							Ext.Msg.alert('提示', '模型名称不能为空!');
					    	  return;
						}
					}
					
				}, {
					x : 300,
					y : 230,
					width : 30,
					xtype : 'button',
					align : 'center',
					text : '清空',
					handler : function(){
					Ext.getCmp("modelIDAdd").setValue('-1');
					Ext.getCmp("eleManaUnitAdd").setValue('');
					Ext.getCmp("modelNameAdd").setValue('');
					Ext.getCmp("creatorAdd").setValue('');
					Ext.getCmp("groupTypeAdd").setValue('');
					Ext.getCmp("parentModelLableAdd").setValue('');
					Ext.getCmp("customSQLAdd").setValue('');
					Ext.getCmp("remarkAdd").setValue('');
				    }
				}]
	});

	/** ********************关联群模型条件模块********************** */

	var buildModelCondition = Ext.create('Ext.form.Panel', {
				region : 'west',
				width : 275,
				height : 400,

				layout : 'column',
				defaults : {
					labelAlign : "center",
					margin : '10 10 10 10'
				},
				// title:'群模型管理',
				items : [{
							columnWidth : 0.3,
							// margin : '6 30 6 20' ,
							xtype : 'label',
							text : ' 条件名称'
							,
						}, {
							columnWidth : 0.7,
							// margin : '6 30 6 20' ,
							xtype : 'textfield',
							width : 140,
							// id : 'eleManaUnit',
							// name : 'eleManaUnit',
							// displayField: 'ORG_NAME',
							// store: TgorgStore,
							// queryMode: 'local',
							typeAhead : true
							,
							// valueField:'ORG_NO',
						// value :'34101'
					}	, {
							columnWidth : 0.3,
							// margin : '6 30 6 20' ,
							xtype : 'label',
							text : '条件'
						}, {
							columnWidth : 0.7,
							// margin : '6 30 6 20' ,
							xtype : 'textfield',
							width : 140,
							// id : 'modelName',
							// name : 'modelName',
							// id : 'MEAS_ORG',
							// displayField: 'ORG_NAME',
							// store: TgorgStore,
							// queryMode: 'local',
							typeAhead : true
							,
							// valueField:'ORG_NO',
						// value :'34101'
					}	, {
							columnWidth : 0.3,
							// margin : '6 30 6 20' ,
							xtype : 'label',
							text : '比较值'
						}, {
							columnWidth : 0.7,
							// margin : '6 30 6 20' ,
							xtype : 'textfield',
							width : 140
							,
							// id: 'buildMan',
						// name: 'buildMan'
					}	, {
							columnWidth : 0.3,
							// margin : '6 30 6 20' ,
							xtype : 'label',
							text : '逻辑符号'
						}, {
							columnWidth : 0.7,
							// margin : '6 30 6 20' ,
							xtype : 'combo',
							width : 140,
							// id: 'groupType',
							// name: 'groupType',
							// id : 'MEAS_ORG',
							// displayField: 'ORG_NAME',
							// store: TgorgStore,
							queryMode : 'local',
							typeAhead : true
							// valueField:'ORG_NO',
						// value :'34101'
					}	, {
							columnWidth : 0.5,
							margin : '150 30 6 20',
							width : 30,
							xtype : 'button',
							text : '确定',
							align : 'center'
							,
						}, {
							columnWidth : 0.5,
							margin : '150 30 6 20',
							xtype : 'button',
							text : '取消',
							align : 'center'
							,
						}]
			});




	var modelGrid = Ext.create('Ext.grid.Panel', {
				forceFit : true,
				region : 'center',
				// verticalScrollerType: 'paginggridscroller',
				// do not reset the scrollbar when the view refreshs
				// invalidateScrollerOnRefresh: false,
				// stateful: true,

				// stateId: 'stateGrid',
				autoScroll : true,
				store : vcmModelQueryResultStore,
				queryMode : 'remote',
				border : true,
				// hideBorders : false,
				selModel : selModelManage,
				// height : 200,
				// width : 800,
				columns : [{
							text : '客户群模型标识',
							sortable : false,
							menuDisabled : true,
							flex : 1,
							align : 'center',
							dataIndex : 'CUST_GROUP_MODEL_ID',
							hidden : true

						}, {
							text : '供电单位',
							sortable : false,
							menuDisabled : true,
							flex : 1,
							align : 'center',
							dataIndex : 'PS_ORG_NO'
						}, {
							text : '模型名称',
							sortable : false,
							menuDisabled : true,
							flex : 1,
							align : 'center',
							dataIndex : 'MODEL_NAME'
						}, {
							text : '建立人',
							sortable : false,
							menuDisabled : true,
							flex : 1,
							align : 'center',
							dataIndex : 'CREATOR_NO'
						}, {
							text : '建立时间',
							sortable : false,
							menuDisabled : true,
							flex : 1,
							align : 'center',
							dataIndex : 'CREATE_TIME'
						}, {
							text : '启用时间',
							sortable : false,
							menuDisabled : true,
							flex : 1,
							align : 'center',
							dataIndex : 'START_DATE'
						}, {
							text : '停用人',
							sortable : false,
							menuDisabled : true,
							flex : 1,
							align : 'center',
							dataIndex : 'STOP_PERSON_NO'
						}, {
							text : '停用时间',
							sortable : false,
							menuDisabled : true,
							flex : 1,
							align : 'center',
							dataIndex : 'STOP_DATE'
						}, {
							text : '停用原因',
							sortable : false,
							menuDisabled : true,
							flex : 1,
							align : 'center',
							dataIndex : 'STOP_REASON'
						}, {
							text : '群类型',
							sortable : false,
							menuDisabled : true,
							flex : 1,
							align : 'center',
							dataIndex : 'GROUP_TYPE_CODE'
						}]
				,

			});

	var customerGroupModelInfoPanel = Ext.create('Ext.panel.Panel', {
				title : '模型管理',
				// region :'fit',
				id : 'modelPanel',
				name : 'modelPanel',
				autoScroll : true,
				border : true,
				collapsible : true,
				items : [modelForm, modelGrid]

			});

	var customerGroupModelManaPanel = Ext.createWidget('tabpanel', {
				region : 'center',
				activeTab : 0,
				defaults : {
					bodyPandding : 10
				},
				items : [customerGroupModelInfoPanel, add_model]
			});

	var modelConditionGridPanel = Ext.create('Ext.grid.Panel', {
				region : 'center',
				height : 170,
				autoScroll : true,
				invalidateScrollerOnRefresh : false,
				 store : modelConQuerybyModelIDStore,
				 selModel :selModelCon,

				columns : [{
					header : "模型条件编号",
					sortable : true,
					resizable : true,
					dataIndex : "COND_ID",
					flex : 1
				},{
							header : "模型条件名称",
							sortable : true,
							resizable : true,
							dataIndex : "COND_NAME",
							flex : 1
						}, {
							header : "评估对象属性名称",
							sortable : true,
							resizable : true,
							dataIndex : "ATTR_ID",
							flex : 1
						}, {
							header : "条件",
							sortable : true,
							resizable : true,
							dataIndex : "CONDITION",
							flex : 1
						}]
//						,
//				         listeners :{
//				         	'itemclick' : function(grid,record,item,index,e,options){
//		eleManaUnitAdd.setValue(vcmModelQueryResultStore.get('CUST_ID'));
//					        }
//					     }

			});
	
	var customerGroupModelConditionDeletePanel = Ext.create('Ext.panel.Panel',{
		region : 'south',
		//height : 40,
		border : false,
		items : [{
			width : 40,
			xtype : 'button',
			text : '删除',
			margin : '0 0 0 10',
			handler : function() {
				var selMCon = selModelCon.getSelection();
				
				
				if(selMCon==''){
					Ext.Msg.alert('提示','请选择要删除的群模型条件！');
				}
				else{
				var selM = selModelManage.getSelection();
				var CUST_GROUP_MODEL_ID = selM[0].get("CUST_GROUP_MODEL_ID");
				var COND_ID = selMCon[0].get("COND_ID");
				Ext.Ajax.request({
					url : 'groupModelManageAction!delModelCon.action',
					params : {
					CUST_GROUP_MODEL_ID : CUST_GROUP_MODEL_ID,
					COND_ID : COND_ID
					},
					success : function(response) {
						Ext.Msg.alert('提示',"群模型条件删除成功");
						var rec2 = selModelManage.getSelection();
						var groupModelID = rec2[0].get("CUST_GROUP_MODEL_ID");
						modelConQuerybyModelIDStore.load({
					params : {
							groupModelID : groupModelID
						,
					}

				});
					}
				});
				}
			}
		}]
	});
	
	

	var customerGroupModelConditionPanel = Ext.create('Ext.form.Panel', {// 客户群模型信息管理面板（显示和模型条件）
		region : 'center',
		id : 'customerGroupModelConditionPanel',
		name : 'customerGroupModelConditionPanel',
		height : 250,
		layout : 'border',
		title : '客户群模型条件',
		// collapsible : true,
		floatable : false,
		autoScroll : true,
		items : [modelConditionGridPanel,customerGroupModelConditionDeletePanel]

	});

	var addModelConditionPanel = Ext.create('Ext.form.Panel', {// 客户群模型信息管理面板（显示和模型条件）
		region : 'east',
		layout : 'absolute',
		id : 'addModelConditionPanel',
		name : 'addModelConditionPanel',
		height : 250,
		width : 320,
		title : '添加客户群模型条件',
		// collapsible : true,
		floatable : false,
		autoScroll : true,
		items : [{
					x : 20,
					y : 10,
					xtype : 'label',
					text : ' 条件名称'
				}, {
					x : 120,
					y : 10,
					xtype : 'textfield',
					width : 150,
					id : 'COND_NAME',
					name : 'COND_NAME'
					,
				}, {
					x : 20,
					y : 40,
					xtype : 'label',
					text : '逻辑符号'
				}, {
					x : 120,
					y : 40,
					xtype : 'combo',
					width : 150,
					id : 'LOGIC_SYMBOL',
					name : 'LOGIC_SYMBOL',
					store : LOGIC_SYMBOLStore,
					queryMode: 'local',
					displayField: 'name2',
					valueField:'abbr2',
				

				}, {
					x : 20,
					y : 70,
					xtype : 'label',
					text : '比较值'
				}, {
					x : 120,
					y : 70,
					xtype : 'textfield',
					width : 150,
					id : 'COMPARE_VALUE',
					name : 'COMPARE_VALUE'
				}, {
					x : 20,
					y : 100,
					xtype : 'label',
					text : '关联评估对象属性'
				}, {
					x : 120,
					y : 100,
					xtype : 'combo',
					width : 150,
					id : 'ATTR_ID',
					name : 'ATTR_ID',
					store : AOPInfoConStore,
					displayField: 'ATTR_NAME',
					queryMode: 'local',
					valueField:'ATTR_ID',
					//allowBlank : false 
				// value :'34101'
			}, {
				x : 20,
				y : 130,
				xtype : 'label',
				text : '增长率'
			}, {
				x : 120,
				y : 130,
				xtype : 'textfield',
				width : 140,
				id : 'growthRate',
				name : 'growthRate',

			}, {
				x : 260,
				y : 130,
				xtype : 'textfield',
				width : 10,
				xtype : 'label',
				text : '%'
			}	, {
					x : 60,
					y : 160,
					width : 40,
					xtype : 'button',
					text : '保存',
					align : 'center',

					handler : function() {

						var rec2 = selModelManage.getSelection();
						if(rec2!='' && rec2.length>0){
						var groupModelID = rec2[0].get("CUST_GROUP_MODEL_ID");
						
						var ATTR_ID = Ext.getCmp("ATTR_ID").getValue();
						var COND_NAME = Ext.getCmp("COND_NAME").getValue();
						var COMPARE_VALUE = Ext.getCmp("COMPARE_VALUE")
								.getValue();
						var LOGIC_SYMBOL = Ext.getCmp("LOGIC_SYMBOL")
								.getValue();
						
						var growthRate = Ext.getCmp("growthRate")
						.getValue();
//						var parentModelLable = Ext
//								.getCmp("parentModelLableAdd").getValue();
//						var customSQL = Ext.getCmp("customSQLAdd").getValue();
//						var remark = Ext.getCmp("remarkAdd").getValue();

						

						}
						if(rec2=='' || rec2.length<=0){
							Ext.Msg.alert('提示','请选择要添加模型条件的模型！');
						}
						else if(COND_NAME!='' && ATTR_ID!=null&& COMPARE_VALUE!=''&& LOGIC_SYMBOL!=null&& COND_NAME!=''&& COND_NAME!=''){
							var index = AOPInfoConStore.find('ATTR_ID',ATTR_ID); 
							if(growthRate==''){
							var CONDITION = AOPInfoConStore.getAt(index).get('SRC_TABLE')+'#'+AOPInfoConStore.getAt(index).get('SRC_FIELD')
							+'#'+LOGIC_SYMBOL+'#'+COMPARE_VALUE; 
				}
							else if(growthRate>=0){
								var CONDITION = AOPInfoConStore.getAt(index).get('SRC_TABLE')+'#'+AOPInfoConStore.getAt(index).get('SRC_FIELD')
								+'#'+growthRate+'#'+LOGIC_SYMBOL+'#'+COMPARE_VALUE; 
							}
							
						Ext.Ajax.request({
									url : 'groupModelManageAction!insertModelCondition.action',
									params : {
										groupModelID : groupModelID,
										COND_NAME : COND_NAME,
										ATTR_ID : ATTR_ID,
										COMPARE_VALUE : COMPARE_VALUE,
										LOGIC_SYMBOL : LOGIC_SYMBOL	,
										CONDITION : CONDITION,
									},
									success : function(response) {
										Ext.Msg.alert("模型条件添加成功");
										
										Ext.getCmp('addModelConditionPanel').form.reset();
										// Ext.MessageBox.alert('数据保存成功！');
										// vcmModelQueryResultStore.proxy.extraParams={
										// vcmOrgNo :
										// Ext.getCmp('eleManaOrg').getValue()
										// };

									}
								})
						}
						else{
							Ext.Msg.alert('提示','模型条件字段不能为空！');
						}
					}
				}, {
					x : 240,
					y : 160,
					width : 40,
					xtype : 'button',
					text : '取消',
					align : 'center'
					,
				}]
	});

	var customerGroupModelConditionManaPanel = Ext.create('Ext.form.Panel', {// 客户群模型条件信息显示和添加面板
		region : 'south',
		name : 'customerGroupModelConditionManaPanel',
		id : 'customerGroupModelConditionManaPanel',
		layout : 'border',
		height : 250,
		// title : '群模型条件',
		items : [customerGroupModelConditionPanel, addModelConditionPanel]
	});

	var modelPanel = Ext.create('Ext.panel.Panel', {
				layout : 'border',
				border : true,
				autoScroll : true,
				items : [customerGroupModelConditionManaPanel,
						customerGroupModelManaPanel]
			});

	renderModel(modelPanel, "群模型定义");

});
