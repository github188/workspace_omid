
Ext.onReady(function() {
	// 左边chart
	Ext.define('countModel', {
				extend : 'Ext.data.Model',
				fields : ['NAME', 'VALUE']
	});
	// usersModel
	Ext.define('usersModel', {
				extend : 'Ext.data.Model',
				fields : ['ORG_NAME', 'CONS_NO','CONS_NAME','CONS_SORT_NAME', 'TERMINAL_ADDR','ASSET_NO','ELEC_ADDR']
	});
	Ext.define('alarmModel', {
				extend : 'Ext.data.Model',
				fields : ['EVENT_NAME', 'EVENT_LEVEL_NAME','HAPPEN_DATE',
				'FIRST_HAPPEN_DATE', 'ALARM_CNT','RESUME_DATE','FIRST_RESUME_DATE',
				'RESUME_DAY_CNT', 'TERMINAL_ADDR','ASSET_NO','EXCEPT_TYPE_NAME']
	});
	var usersStore = Ext.create('Ext.data.Store', {
		model : 'usersModel',
		pageSize: 50,
		remoteSort: true,
        buffered: true,
		proxy : {  
			type : 'ajax',
			url : 'UsersExcAction!queryUsers.action',
			reader : {
				root : 'users_List',
				type : 'json',
				totalProperty: 'totalCount'
			}
		}

	});
	var statistics_store = Ext.create('Ext.data.Store', {
		model : 'countModel',
		proxy : {
			type : 'ajax',
			url : 'UsersExcAction!queryStatistics.action',
			reader : {
				root : 'statistics_list',
				type : 'json'
			}
		}

	});
	var meter_store = Ext.create('Ext.data.Store', {
		model : 'alarmModel',
		proxy : {
			type : 'ajax',
			url : 'UsersExcAction!queryMeterExc.action',
			reader : {
				root : 'meterExc_List',
				type : 'json'
			}
		}

	});
	var tmnl_store = Ext.create('Ext.data.Store', {
		model : 'alarmModel',
		proxy : {
			type : 'ajax',
			url : 'UsersExcAction!queryTmnlExc.action',
			reader : {
				root : 'tmnlExc_List',
				type : 'json'
			}
		}

	});
	var his_store = Ext.create('Ext.data.Store', {
		model : 'alarmModel',
		proxy : {
			type : 'ajax',
			url : 'UsersExcAction!queryHisExc.action',
			reader : {
				root : 'hisExc_List',
				type : 'json'
			}
		}

	});
	
	var meter_panel = Ext.create('Ext.grid.Panel', {
		title : "计量和用电异常",
		//height : 300,
		store : meter_store,
		autoScroll:true,
		columns : [{
			xtype: 'rownumberer',
            width: 30
		},{
			header : "异常类型",
			sortable : true,
			dataIndex : "EXCEPT_TYPE_NAME",
			width : 150
		},{
			header : "事件名称",
			sortable : true,
			dataIndex : "EVENT_NAME",
			width : 150
		}, {
			header : '异常等级',
			dataIndex : 'EVENT_LEVEL_NAME',
			width:100,
			renderer: function(v) {
			if(v == "严重") return "<font color='#D4101D'>" + v + "</font>";
			else if(v == "重要") return "<font color='#D46B1D'>" + v + "</font>";
			else if(v == "较重要") return "<font color='#C7CF18'>" + v + "</font>";
			else if(v == "一般") return "<font color='#1D3DDA'>" + v + "</font>";

			}
		},{
				header : '最近告警时间',
				dataIndex : 'HAPPEN_DATE',
				width:150
			},{
				header : '第一次告警时间',
				dataIndex : 'FIRST_HAPPEN_DATE',
				width:150
			},{
				header : '告警发生次数',
				dataIndex : 'ALARM_CNT',
				width:150
			},{
				header : '最近恢复时间',
				dataIndex : 'RESUME_DATE',
				width:150
			},
			{
				header : '第一次恢复时间',
				dataIndex : 'FIRST_RESUME_DATE',
				width:150
			},
			{
				header : '连续恢复天数',
				dataIndex : 'RESUME_DAY_CNT',
				width:150
			},
			{
				header : '终端地址 ',
				dataIndex : 'TERMINAL_ADDR',
				width:150
			},
			{
				header : '电能表资产号 ',
				dataIndex : 'ASSET_NO',
				width:150
			}]

	});
	var tmnl_panel = Ext.create('Ext.grid.Panel', {
		title : "采集设备异常",
		//height : 300,
		store : tmnl_store,
		autoScroll:true,
		columns : [{
			xtype: 'rownumberer',
            width: 30
		},{
			header : "事件名称",
			sortable : true,
			dataIndex : "EVENT_NAME",
			width : 150
		}, {
			header : '异常等级',
			dataIndex : 'EVENT_LEVEL_NAME',
			width:100,
			renderer: function(v) {
			if(v == "严重") return "<font color='#D4101D'>" + v + "</font>";
			else if(v == "重要") return "<font color='#D46B1D'>" + v + "</font>";
			else if(v == "较重要") return "<font color='#C7CF18'>" + v + "</font>";
			else if(v == "一般") return "<font color='#1D3DDA'>" + v + "</font>";

			}
		},{
				header : '最近告警时间',
				dataIndex : 'HAPPEN_DATE',
				width:150
			},{
				header : '第一次告警时间',
				dataIndex : 'FIRST_HAPPEN_DATE',
				width:150
			},{
				header : '告警发生次数',
				dataIndex : 'ALARM_CNT',
				width:150
			},{
				header : '最近恢复时间',
				dataIndex : 'RESUME_DATE',
				width:150
			},
			{
				header : '第一次恢复时间',
				dataIndex : 'FIRST_RESUME_DATE',
				width:150
			},
			{
				header : '连续恢复天数',
				dataIndex : 'RESUME_DAY_CNT',
				width:150
			},
			{
				header : '终端地址 ',
				dataIndex : 'TERMINAL_ADDR',
				width:150
			}]

	});
	var his_panel = Ext.create('Ext.panel.Panel', {
		title : "历史异常信息",
		layout:'border',
		items:[{
			region:'north',
			height:30,
			xtype:'form',
			items:[{
				xtype : 'radiogroup',
				vertical: true,
				margin : '6 0 0 600',
				column:3,
				name : 'event_type',
				items : [{
							boxLabel : '计量异常',
							name : 'event_type',
							inputValue : '01',
							checked:true
						}, {
							boxLabel : '用电异常',
							name : 'event_type',
							inputValue : '02'
							
						}, {
							boxLabel : '终端异常',
							name : 'event_type',
							inputValue : '03'
							
				}],
				 listeners: {
	                 change: function(g, newValue, oldValue, eOpts){
	                 	if(newValue.event_type!=null&&(newValue.event_type+'').length==2){
	                 		var his_obj={};
	                 		his_obj.cons_no=Ext.getCmp("userExc_cons_no").getValue();
	                 		his_obj.event_type=newValue.event_type;
	                 		his_store.load({
								params : his_obj
							});
	                 	}
	                 }
				 }
			}]
		},{
			xtype:'gridpanel',
			autoScroll:true,
			store : his_store,
			region:'center',
			columns : [{
			xtype: 'rownumberer',
            width: 30
		},{
			header : "事件名称",
			sortable : true,
			dataIndex : "EVENT_NAME",
			width : 150
		}, {
			header : '异常等级',
			dataIndex : 'EVENT_LEVEL_NAME',
			width:100,
			renderer: function(v) {
			if(v == "严重") return "<font color='#D4101D'>" + v + "</font>";
			else if(v == "重要") return "<font color='#D46B1D'>" + v + "</font>";
			else if(v == "较重要") return "<font color='#C7CF18'>" + v + "</font>";
			else if(v == "一般") return "<font color='#1D3DDA'>" + v + "</font>";

			}
		},{
				header : '最近告警时间',
				dataIndex : 'HAPPEN_DATE',
				width:150
			},{
				header : '第一次告警时间',
				dataIndex : 'FIRST_HAPPEN_DATE',
				width:150
			},{
				header : '告警发生次数',
				dataIndex : 'ALARM_CNT',
				width:150
			},{
				header : '最近恢复时间',
				dataIndex : 'RESUME_DATE',
				width:150
			},
			{
				header : '第一次恢复时间',
				dataIndex : 'FIRST_RESUME_DATE',
				width:150
			},
			{
				header : '连续恢复天数',
				dataIndex : 'RESUME_DAY_CNT',
				width:150
			},
			{
				header : '终端地址 ',
				dataIndex : 'TERMINAL_ADDR',
				width:150
			},
			{
				header : '电能表资产号 ',
				dataIndex : 'ASSET_NO',
				width:150
			}]
		}]
		

	});
	// 供电单位列表
	var statistics_grid = Ext.create('Ext.grid.Panel', {
				region : 'center',
				title : "统计信息",
				border : false,
				//height : 300,
				store : statistics_store,
				autoScroll:true,
				columns : [{
							header : "统计单元",
							sortable : true,
							dataIndex : "NAME",
							width : 150
						}, {
							header : "异常数",
							sortable : true,
							dataIndex : "VALUE",
							flex:1
						}]
	});
	
	var right_area = Ext.create('Ext.panel.Panel', {
				region : 'east',
				width : 250,
				border : true,
				layout : 'border',
				items : [statistics_grid, {
					region : 'south',
					xtype : 'form',
					title : "查询条件",
					border : false,
					height:250,
					id : 'statQuery_UsersExcQueryForm',
					defaults : {
						margin : '10 5 10 10',
						labelAlign:'right',
						anchor:'95%',
						labelWidth:60
					},
					items : [{
								fieldLabel:'用户编号',
								xtype : 'textfield',
								name : 'cons_no',
								id:'userExc_cons_no'/*,
								readOnly:true*/
							},
							{
								fieldLabel:'用户名称',
								xtype : 'textfield',
								name : 'cons_name',
								id:'userExc_cons_name',
								readOnly:true
							},
							{
								fieldLabel:'用户分类',
								xtype : 'textfield',
								name : 'cons_sort_name',
								id:'userExc_cons_sort_name',
								readOnly:true
							},
							{
								xtype : 'button',
								text : "用户定位",
								width : 80,
								margin : '5 20 10 100',
								handler : function() {
									var users_queryConditionForm=Ext.create('Ext.form.Panel', {
										 //region:'north',
										// layout:'auto',
										 frame:true,
										 height:120,
							             items:[
							             	 {
								                  	xtype: 'container',
								                  	layout: 'column',
								                  	 defaults:{
										                columnWidth:.5,
										                anchor:'95%'
										             },
									                items: [{
									                    xtype:'textfield',
									                    fieldLabel: '用户编号',
									                    labelAlign:'right',
									                    name: 'cons_no',
									                    emptyText:'----请输入----'
									                },{
									                    xtype:'textfield',
									                    fieldLabel: '用户名称',
									                    labelAlign:'right',
									                    name: 'cons_name',
									                    emptyText:'----请输入----'
									                }]
								            }, {
								                  	xtype: 'container',
								                  	layout: 'column',
								                  	 defaults:{
										                columnWidth:.5,
										                anchor:'95%'
										             },
									                items: [{
									                    xtype:'combo',
									                    fieldLabel: '用户类型',
									                    labelAlign:'right',
									                    name: 'cons_sort_code',
									                    store : statQuery.stores_obj['userSort_store'],
														displayField : 'NAME',
														valueField : 'VALUE',
														multiSelect : false,
														queryMode : 'local',
									                    editable: false,
									                    emptyText:'全部'
									                },{
									                    xtype:'textfield',
									                    fieldLabel: '用电地址',
									                    labelAlign:'right',
									                    name: 'elec_addr',
									                    emptyText:'----请输入----'
									                }]
								            }, {
								                  	xtype: 'container',
								                  	layout: 'column',
								                  	 defaults:{
										                columnWidth:.5,
										                anchor:'95%'
										             },
									                items: [{
									                    xtype:'textfield',
									                    fieldLabel: '终端地址',
									                    labelAlign:'right',
									                    name: 'terminal_addr',
									                    
									                    emptyText:'----请输入----'
									                },{
									                    xtype:'textfield',
									                    fieldLabel: '电能表资产号',
									                    labelAlign:'right',
									                    name: 'asset_no',
									                    emptyText:'----请输入----'
									                }]
								            }, {
								                  	xtype: 'container',
								                  	layout: 'column',
									                items: [
								                	{
								                		xtype:'button',
								                		columnWidth:1.0,
									                	text:'查询',
									                	width:80,
									                	margin:'0 0 0 666',
									                	handler:function(){
									                	var params = this.up('form').getForm().getValues();
									                	usersStore.getProxy().extraParams = {
								                            users_params: Ext.encode(params)
								                        };
								                        usersStore.removeAll();
								                        usersStore.currentPage=1;
								                        usersStore.load({
													    	start:0
														});
						                			}
						                		}]
								            }
							             ]
									});
									var users_grid = Ext.create('Ext.grid.Panel', {
										//region : 'center',
										title : "用户信息",
										height : 380,
										store : usersStore,
										columns : [{
													header : "供电单位",
													sortable : true,
													dataIndex : "ORG_NAME",
													flex:1
												}, {
													header : "户号",
													sortable : true,
													dataIndex : "CONS_NO",
													flex:1
												}, {
													header : "用户名称",
													sortable : true,
													dataIndex : "CONS_NAME",
													flex:1
												}, {
													header : "用户类别",
													sortable : true,
													dataIndex : "CONS_SORT_NAME",
													flex:1
												}, {
													header : "用电地址",
													sortable : true,
													dataIndex : "ELEC_ADDR",
													flex:1
												}, {
													header : "终端地址",
													sortable : true,
													dataIndex : "TERMINAL_ADDR",
													flex:1
												}, {
													header : "电能表资产号",
													sortable : true,
													dataIndex : "ASSET_NO",
													flex:1
												}],
												dockedItems: [{
										        xtype: 'pagingtoolbar',
										        store: usersStore,   
										        dock: 'bottom',
										        displayInfo: true
									    		}]
									}); 
									var choose_obj={};
									
									 var users_panel=Ext.create('Ext.panel.Panel', {
												layout:'auto',
												items:[users_queryConditionForm,users_grid,
												{
												  	xtype:'button',
										        	text:'选择',
										        	//region : 'south',
										        	margin:'5 0 0 350',
										        	width:100,
										        	handler:function(){
										        		var data = users_grid.getSelectionModel().getSelection();
														if(data.length == 0) {
															Ext.Msg.alert('提示', '请选择一个用户！')
															return;
														}
										        		choose_obj=data[0].data;
										        		Ext.getCmp("userExc_cons_no").setValue(choose_obj["CONS_NO"]);
										        		Ext.getCmp("userExc_cons_name").setValue(choose_obj["CONS_NAME"]);
										        		Ext.getCmp("userExc_cons_sort_name").setValue(choose_obj["CONS_SORT_NAME"]);
										        		usersQuery_Win.close();
										    		}
												}]
									});
									
									var usersQuery_Win =Ext.create('Ext.window.Window', {
										    title: '用户查询',
										    height: 580,
										    width: 800,
										    layout: 'fit',
										    closable:true,
									        items: [users_panel]
									});
									usersQuery_Win.show();
									
								}
							},
							{
								xtype : 'button',
								text : "查  询",
								width : 80,
								waitMsg : '查询中...',
								margin : '5 20 10 100',
								handler : function() {
									if(Ext.getCmp("userExc_cons_no").getValue()==null ||Ext.getCmp("userExc_cons_no").getValue()==''){
										Ext.Msg.alert('提示', '请选择一个用户！')
										return;
									}
									
									var param_obj={};
			                 		param_obj.cons_no=Ext.getCmp("userExc_cons_no").getValue();
			                 		param_obj.event_type='01';
			                 		
			                 		statistics_store.load({
										params : param_obj
									});
			                 		meter_store.load({
										params : param_obj
									});
									tmnl_store.load({
										params : param_obj
									});
			                 		his_store.load({
										params : param_obj
									});
								}

							}]

				}]
			});

	var left_area = Ext.createWidget('tabpanel', {
		region : 'center',
		layout : 'fit',
		border : false,
		anchor:'100%',
		items : [meter_panel,tmnl_panel,his_panel]
	});
	
	var mainPanel  = Ext.create('Ext.panel.Panel', {
		//activeTab  :0,
		layout:'border',
		anchor:'100%',
		items:[left_area,right_area]
	});
	renderModel(mainPanel, "用户异常查询");
		
		
});
