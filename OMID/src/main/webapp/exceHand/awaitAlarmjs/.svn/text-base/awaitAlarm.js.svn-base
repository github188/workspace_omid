var DEFAULT_PAGE_SIZE = 15;

Ext.onReady(function() {
	Ext.define('ExceptSRCModel', {
		extend: 'Ext.data.Model',
		fields: [{
			type: 'string',
			name: 'EXCEPT_SRC_CODE'
		}, {
			type: 'string',
			name: 'EXCEPT_SRC_NAME'
		}]
	});
	
	  var test_obj = {
			  alarm_type: "",
			  minDate: "",
			  event_level: "",
			  maxDate: "",
			  alarm_src: ""
	        };
	  
	// 异常来源Store
	exceptSRCStore = Ext.create('Ext.data.Store', {
		model: 'ExceptSRCModel',
		proxy: {
			type: 'ajax',
			url: 'awaitAlarm/awaitAlarmAction!ExceptSRC.action',
			reader: {
				root: 'exceptSRCList',
				type: 'json'
			}
		}
	});
	userlistStore = Ext.create('Ext.data.Store', {
		model: 'userlistmodel',
		proxy: {
			type: 'ajax',
			url: 'awaitAlarm/awaitAlarmAction!UserListbyOrgNO.action',
			reader: {
				root: 'userList',
				type: 'json'
			}
		}
	});
	
	Ext.define('RoleListModel', {
		extend: 'Ext.data.Model',
		fields: [{
			type: 'string',
			name: 'ROLE_ID'
		}, {
			type: 'string',
			name: 'ROLE_DESC'
		}]
	});
	roleListStore = Ext.create('Ext.data.Store',{
		model : 'RoleListModel',
		proxy: {
			type: 'ajax',
			url: 'awaitAlarm/awaitAlarmAction!queryRole.action',
			reader: {
				root: 'list',
				type: 'json'
			}
		},
		autoLoad : true
	});
	
	var end_date = new Date();
	var start_date = new Date();
	start_date.setTime(end_date.getTime() - 3600 * 24 * 30 * 1000);

	var myalarmStore = Ext.create('Ext.data.Store', {
		model: 'AwaitAlarm',
		pageSize: DEFAULT_PAGE_SIZE,
		remoteSort: true,
		buffered: true,
		proxy: {
			type: 'ajax',
			url: 'awaitAlarm/awaitAlarmAction!queryAwaitAlarm.action',
			 extraParams: {
                search_params: Ext.encode(test_obj)
            },
			reader: {
				type: 'json',
				root: 'list',
				totalProperty: 'totalCount'
			}
		}
		//,autoLoad : true
	});
	

	var northPanel = Ext.create('Ext.form.Panel', {
		region: 'north',
		frame: true,
		height: 100,
		bodyPadding: 1,
		
		items: [{
			xtype: 'container',
			anchor: '100%',
			layout: 'column',
			items: [{
				xtype: 'container',
				columnWidth: .33,
				layout: 'anchor',
				defaults : {
					labelAlign : "right"
				},
				items: [{
					xtype: 'combo',
					fieldLabel: '告警类别',
					name: 'alarm_type',
					store: statQuery.typeStore,
					displayField: 'NAME',
					valueField: 'VALUE',
					multiSelect: false,
					queryMode: 'local',
					editable: false,
					anchor: '96%',
					listeners : {
					      afterRender : function(combo) {
					         combo.setValue(statQuery.typeStore.first().data.VALUE);
				      }
			   		}
				}, {
					xtype: 'textfield',
					fieldLabel: '用户编码',
					id: 'user_code',
					name: 'user_code',
					anchor: '96%'
				}, {
					xtype: 'datefield',
					fieldLabel: '告警日期',
					id: 'fromalarmdate',
					name: 'minDate',
					format: 'Y-m-d',
					value: start_date,
					editable: false,
					anchor: '96%'
				}]
			}, {
				xtype: 'container',
				columnWidth: .33,
				layout: 'anchor',
				defaults : {
					labelAlign : "right"
				},
				items: [{
					xtype: 'combo',
					fieldLabel: '异常等级',
					name: 'event_level',
					store: statQuery.levelStore,
					displayField: 'NAME',
					valueField: 'VALUE',
					multiSelect: false,
					queryMode: 'local',
					editable: false,
					anchor: '96%',
					listeners : {
					      afterRender : function(combo) {
					         combo.setValue(statQuery.levelStore.first().data.VALUE);
				      }
			   		}
				}, {
					xtype: 'textfield',
					fieldLabel: '用户名称',
					id: 'user_name',
					name: 'user_name',
					anchor: '96%'
				}, {
					xtype: 'datefield',
					fieldLabel: '到',
					name: 'maxDate',
					editable: false,
					id: 'toalarmdate',
					value: new Date(),
					format: 'Y-m-d',
					anchor: '96%'
				}]
			}, {
				xtype: 'container',
				columnWidth: .33,
				layout: 'anchor',
				defaults : {
					labelAlign : "right"
				},
				items: [{
					xtype: 'combo',
					fieldLabel: '异常来源',
					name: 'alarm_src',
					store: statQuery.sourceStore,
					displayField : 'NAME',
					valueField : 'VALUE',
					multiSelect: false,
					queryMode: 'local',
					editable: false,
					anchor: '96%',
					listeners : {
				      afterRender : function(combo) {
				         combo.setValue(statQuery.sourceStore.first().data.VALUE);
				      }
				   }
				}, {
					xtype: 'textfield',
					fieldLabel: '终端地址',
					id: 'tmnl_addr',
					name: 'tmnl_addr',
					anchor: '96%'
				}, {
					xtype: 'button',
					text: '查询',
					id: 'query_btn',
					width: 80,
					margin: '0 0 0 256',
					handler: function() {
						var toalarmdate = Ext.getCmp('toalarmdate');
						var fromalarmdate = Ext.getCmp('fromalarmdate');
						if(fromalarmdate.getValue().getTime() > toalarmdate.getValue().getTime()) {
							alert('开始日期大于结束日期');
						} else {
							var form = this.up('form').getForm();  
							   myalarmStore.removeAll();
							   myalarmStore.getProxy().extraParams = {
		                            search_params: Ext.encode(form.getValues())
		                        };
								    myalarmStore.currentPage=1;
									myalarmStore.load({
									    	start:0
									});
						
						}
					}
				}


				]
			}]
		}]

	});



	var tmnlStore = Ext.create('Ext.data.Store', {
		model: 'TmnlAlarm',
		proxy: {
			type: 'ajax',
			url: 'awaitAlarm/awaitAlarmAction!queryTmnlAlarm.action',
			reader: {
				type: 'json',
				root: 'tmnlAlarmList'
			}
		}

	});

	var centerPanel = Ext.create('Ext.grid.Panel', {
		region: "center",
		columnLines : true,
		store: myalarmStore,
		viewConfig : {  
            forceFit : true,  
            getRowClass : function(record,rowIndex,rowParams,myalarmStore){  
                //禁用数据显示红色  
            	
                if( record.data.EVENT_LEVEL_NAME== "严重"){  
                    return 'x-grid-record-red';  
                }else if(record.data.EVENT_LEVEL_NAME== "重要"){  
                    return 'x-grid-record-green';  
                }else if(record.data.EVENT_LEVEL_NAME== "较重要"){  
                    return 'x-grid-record-yellow';  
                }else if(record.data.EVENT_LEVEL_NAME== "一般"){  
                    return 'x-grid-record-blue';  
                }  
                
                  
            }  
        },
		columns: [
		{
		   header: '序号',
	       xtype: 'rownumberer',
		   width: 30 
   		},
		{
			header: '告警类别',
			dataIndex: 'EXCEPT_TYPE_NAME',
			width : 100,
			align : 'center',
			sortable : true
		}, {
			header: '告警名称',
			dataIndex: 'EVENT_NAME',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			header: '异常等级',
			dataIndex: 'EVENT_LEVEL_NAME',
			width : 100,
			align : 'center',
			sortable : true
		},{
			header: '供电单位 ',
			dataIndex: 'ORG_NAME',
			width : 140,
			align : 'center',
			sortable : true
		},  {
			header: '用户编号 ',
			dataIndex: 'CONS_NO',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			header: '用户名称',
			dataIndex: 'CONS_NAME',
			width : 200,
			align : 'center',
			sortable : true
		}, {
			header: '用户类别 ',
			dataIndex: 'CONS_SORT_NAME',
			width : 140,
			align : 'center',
			sortable : true
		}, {
			header: '终端地址',
			dataIndex: 'TERMINAL_ADDR',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			header: '第一次发生日期 ',
			dataIndex: 'FIRST_ALARM_DATE',
			width : 100,
			align : 'center',
			sortable : true
		}, {
			header: '告警日期 ',
			dataIndex: 'ALARM_DATE',
			width : 100,
			align : 'center',
			sortable : true
		}, {
			header: '发生次数 ',
			dataIndex: 'ALARM_CNT',
			width : 80,
			align : 'center',
			sortable : true
		}, {
			header: '状态',
			dataIndex: 'AWAIT_STATUS_NAME',
			width : 100,
			align : 'center',
			sortable : true
		}, {
			header: '异常来源',
			dataIndex: 'EXCEPT_SRC_NAME',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			header: '处理期限',
			dataIndex: 'QIXIAN',
			width : 80,
			align : 'center',
			sortable : true
		}, {
			header: 'ID',
			dataIndex: 'AWAIT_ITEM_ID',
			hidden: true,
			width : 120,
			align : 'center',
			sortable : true
		}, {
			header: 'ALARM_ID',
			dataIndex: 'ALARM_ID',
			hidden: true,
			width : 120,
			align : 'center',
			sortable : true
		}],
		selType: 'checkboxmodel',
		dockedItems: [{
	        xtype: 'pagingtoolbar',
	        store: myalarmStore,   
	        dock: 'bottom',
	        displayInfo: true
	    		},
	    	{
			xtype: 'toolbar',
			dock: 'top',
			items: [{
				xtype: 'button',
				text: '暂不处理',
				id:'zhanbuchuli',
				handler: function() {
					item_handler('2')
				}
			}, {
				xtype: 'button',
				text: '误报关闭',
				id:'wubaoguanbi',
				handler: function() {
					item_handler('3')
				}
			}, {
//				xtype: 'button',
//				text: '营销处理',
//				id:'yinxiaochuli',
//				handler: function() {
//					item_handler('4')
//				}
			}, {
				xtype: 'button',
				text: '分派处理',
				id:'fenpaichuli',
				handler: function() {
					item_handler('1')
				}
			},{
				xtype: 'component',
				width: 600
			}]
		}]

	});
	
	myalarmStore.currentPage=1;
	myalarmStore.load({
	    	start:0
	});
	
	myalarmStore.guaranteeRange(0, DEFAULT_PAGE_SIZE - 1);
	
	
	function shenggongshi(){
			 if	(ORGLEVEL=='02'){
				 Ext.getCmp('fenpaichuli').hide();
//				 Ext.getCmp('yinxiaochuli').hide();
				 Ext.getCmp('wubaoguanbi').hide();
				 Ext.getCmp('zhanbuchuli').hide();
			 
			 }
	
	}
	shenggongshi();
	function item_handler(handle_mode) {



		var data = centerPanel.getSelectionModel().getSelection();
		if(data.length == 0) {
			Ext.Msg.alert('提示', '请至少选择一个！')
			return
		}

		var pop_win = Ext.create('Ext.window.Window', { 
			title: '待办事项处理',
			height: 400,
			width: 400,
			layout: 'border',
			resizable: false,

			modal: true,
			items: [{ 
							xtype: 'form',
							layout: 'vbox',
							region: 'south',
							height: 200,
							frame: true,
							items: [{
								xtype: 'textareafield',
								name: 'more_info',
								fieldLabel: '处理说明',
								width:375 
							}],
							buttons: [{
								xtype: 'button',
								text: "确定",
								handler: function(argument) {
									var form_values = this.up('form').getValues();
									var desc = form_values['more_info'];
									if(desc.length == 0) {
										Ext.Msg.alert('提示','请填写内容');
										return
									};
									var selected_event = Ext.getCmp('event_grid2').getSelectionModel().getSelection();
									if (selected_event.length == 0) {
										Ext.Msg.alert('提示','请至少选择一项事件');
										return
									};
									var eventlist =[];
									for(var i=0;i<selected_event.length;i++){
										eventlist.push(selected_event[i].data) ;
									}
									
									handle_alarm(pop_win,handle_mode,form_values,data,eventlist);
							
									
								}
							}]
						},{
							region: 'center',
							xtype: 'grid',
							id: 'event_grid2',
							store: tmnlStore,
							selType: 'checkboxmodel',
							multiSelect: true,

							columns: [{
								header: '告警名称',
								sortable: false,
								dataIndex: 'EVENT_NAME',
								align : 'center',
								width:150
							},{
								header: '终端地址',
								sortable: false,
								dataIndex: 'TERMINAL_ADDR',
								align : 'center',
								width:80
							},{
								header: '用户名',
								sortable: false,
								align : 'center',
								dataIndex: 'CONS_NAME',
								width:150
							},
							{
								header: 'ALARM_ID',
								sortable: false,
								dataIndex: 'ALARM_ID',
								hidden: true,
								width:50
							},{
								header: 'METER_ID',
								sortable: false,
								dataIndex: 'METER_ID',
								hidden: true,
								width:50
							},{
								header: 'ALARM_TYPE',
								sortable: false,
								dataIndex: 'ALARM_TYPE',
								hidden: true,
								width:50
							},{
								header: 'TERMINAL_ID',
								sortable: false,
								dataIndex: 'TERMINAL_ID',
								hidden: true,
								width:50
							},{
								header: 'AWAIT_ITEM_ID',
								sortable: false,
								dataIndex: 'AWAIT_ITEM_ID',
								hidden: true,
								width:50
							}]

						}]
		});

		var local_pop_win = Ext.create('Ext.window.Window', {
			title: '待办事项处理',
			height: 400,
			width: 400,
			layout: 'border',
			resizable: false,

			modal: true,
			items: [{  
							xtype: 'form',
							layout: 'vbox',
							region: 'south',
							height: 200,
							frame: true,
							items: [{
								xtype : 'combo',
								fieldLabel : '角色',
								anchor: '98%',
								store : roleListStore,
								displayField: 'ROLE_DESC',
								valueField: 'ROLE_ID',
								multiSelect: false,
								queryMode: 'local',
								editable: false,
								listeners : {
								      afterRender : function(combo) {
								      	 if(roleListStore.getCount() == 0){
											return ;								      	 
								      	 }
								         combo.setValue(roleListStore.first().data.ROLE_ID);
								         userlistStore.getProxy().extraParams={
								         	roleId : roleListStore.first().data.ROLE_ID
								         };
								         
								         userlistStore.load({
								         	callback:function(records){
								         		Ext.getCmp('rev_staff').setValue(records[0].get('STAFF_NO'));
//								         		Ext.getCmp('rev_staff').on('afterRender',function(combo){
//								         			combo.setValue(userlistStore.first().data.STAFF_NO);
//								         		});
								         	}
								         });
							      	  },
							      	  change : function(combo){
								   			userlistStore.removeAll();
								   			userlistStore.getProxy().extraParams={
									         	roleId : combo.getValue()
									         };
									         
									         userlistStore.load({
									         	callback:function(records){
									         		Ext.getCmp('rev_staff').setValue(records[0].get('STAFF_NO'));
									         	}
									         });
								   		}
						   		}
							},
							{
								xtype: 'combo',
								fieldLabel: '指派人',
								name: 'rev_staff',
								id : 'rev_staff',
								store: userlistStore,
								displayField: 'NAME',
								valueField: 'STAFF_NO',
								multiSelect: false,
								queryMode: 'local',
								editable: false,
								anchor: '98%',
								listConfig : {
									loadMask : false								
								}
							}
							, {
								xtype: 'datefield',
								name: 'plan_date',
								fieldLabel: '计划完成时间',
								format: 'Y-m-d',
								value: new Date()
							}, {
								xtype: 'textareafield',
								name: 'more_info',
								fieldLabel: '处理说明',
								width: 375 
							}],
							buttons: [{
								xtype: 'button',
								text: "确定",
								handler: function(argument) {
									var form_values = this.up('form').getValues();
									var desc = form_values['more_info'];
									if(desc.length == 0) {
										Ext.Msg.alert('提示','请填写内容');
										return
									};
									var selected_event = Ext.getCmp('event_grid').getSelectionModel().getSelection();
									if (selected_event.length == 0) {
										Ext.Msg.alert('提示','请至少选择一项事件');
										return
									};
									var eventlist =[];
									for(var i=0;i<selected_event.length;i++){
										eventlist.push(selected_event[i].data) ;
									}
									
									handle_alarm(local_pop_win,handle_mode,form_values,data,eventlist);
							
									
								}
							}]
						},{
							region: 'center',
							xtype: 'grid',
							id: 'event_grid',
							store: tmnlStore,
							selType: 'checkboxmodel',
							multiSelect: true,

							columns: [{
								header: '告警名称',
								sortable: false,
								align : 'center',
								dataIndex: 'EVENT_NAME',
								width:150
							},{
								header: '终端地址',
								sortable: false,
								align : 'center',
								dataIndex: 'TERMINAL_ADDR',
								width:80
							},{
								header: '用户名',
								sortable: false,
								align : 'center',
								dataIndex: 'CONS_NAME',
								width:150
							},
							{
								header: 'ALARM_ID',
								sortable: false,
								dataIndex: 'ALARM_ID',
								hidden: true,
								width:50
							},{
								header: 'METER_ID',
								sortable: false,
								dataIndex: 'METER_ID',
								hidden: true,
								width:50
							},{
								header: 'ALARM_TYPE',
								sortable: false,
								dataIndex: 'ALARM_TYPE',
								hidden: true,
								width:50
							},{
								header: 'TERMINAL_ID',
								sortable: false,
								dataIndex: 'TERMINAL_ID',
								hidden: true,
								width:50
							},{
								header: 'AWAIT_ITEM_ID',
								sortable: false,
								dataIndex: 'AWAIT_ITEM_ID',
								hidden: true,
								width:50
							}]

						}]
		});


		if(handle_mode == '1') {
			local_pop_win.show();

			var queryObj ={};
			queryObj.tmnl_id = data[0].data["TERMINAL_ID"];
			tmnlStore.load({
				params: {tmnl_id: data[0].data["TERMINAL_ID"] }
			});

		} else {
			pop_win.show();
			var queryObj ={};
			queryObj.tmnl_id = data[0].data["TERMINAL_ID"];
			tmnlStore.load({
				params: {tmnl_id: data[0].data["TERMINAL_ID"] }
			});
		}


	}


	function query_alarm_list() {
		var toalarmdate = Ext.getCmp('toalarmdate');
		var fromalarmdate = Ext.getCmp('fromalarmdate');
		if(fromalarmdate.getValue().getTime() > toalarmdate.getValue().getTime()) {
			alert('开始日期大于结束日期');
		} else {
			var form = northPanel;
			 myalarmStore.removeAll();
			 myalarmStore.getProxy().extraParams = {
                 search_params: Ext.encode(form.getValues())
             };
			    myalarmStore.currentPage=1;
				myalarmStore.load({
				    	start:0
				});
		}
	}

	function handle_alarm (component,handle_mode,form_values,data,eventlist) {
		var obj = form_values;
		obj.processMode = handle_mode;
		obj.alarm_id = data[0].data['ALARM_ID'];
		obj.alarm_type = data[0].data['ALARM_TYPE'];
		obj.await_item_id = data[0].data['AWAIT_ITEM_ID'];
		obj.status_code = handle_mode;
		// obj.test = [{x:1},{x:2},{x:3}];
		eventlist = typeof(eventlist) == 'undefined' ? [] : eventlist;
		obj.eventlist = eventlist;
		
		
		Ext.Ajax.request({
			url: 'awaitAlarm/awaitAlarmAction!handleAlarm.action',
			params: {
					alarm_handle_param: Ext.encode(obj)
			},
			success: function(response) {
				component.close();
				query_alarm_list();
			}
		})
	}





	alramTab = Ext.create('Ext.panel.Panel', {
		border: true,
		layout: 'border',
		title:'异常待办事项',
		items: [northPanel, centerPanel]
	});
	
	
	/* 分割线——————————————————————————以下为第二个tab页面——————————————————————————*/	
		//待办事项
	Ext.define('AwaitThings', {
		extend : 'Ext.data.Model',
		fields : ['EXCEPT_SRC_NAME','CREATE_TYPE_NAME','SEND_STAFF_NAME','SEND_STAFF_NAME',
		'SEND_ORG_NAME','START_TIME','PRE_CLOSE_TIME','TASK_ID','FLOW_STATUS_CODE','FLOW_STATUS_NAME','QIXIAN']
	});
	//待办事项明细
	Ext.define('AwaitDetail', {
		extend : 'Ext.data.Model',
		fields : ['EVENT_LEVEL_NAME','EXCEPT_TYPE_NAME','EVENT_NAME','ORG_NAME','ORG_NO','MERER_ID','TERMINAL_ID','ALARM_CODE'
		,'TERMINAL_ADDR','ASSET_NO','ALARM_TYPE','FIRST_HAPPEN_DATE','EVENT_LEVEL','EXCEPT_CODE','CONS_NO','METER_ID'
		,'ALARM_CNT']
	});
	 var thingsStore = Ext.create('Ext.data.Store', {
		model : 'AwaitThings',
		pageSize: 10,
	    remoteSort: true,
	    buffered: true,
		proxy : {
			type : 'ajax',
			url : 'awaitAlarm/awaitAlarmAction!queryAlarmThings.action',
			reader : {
				type : 'json',
				root : 'thingsList',
			    totalProperty: 'totalCount'
			}
		}
	});
	 var detailStore = Ext.create('Ext.data.Store', {
		model : 'AwaitDetail',
		pageSize: DEFAULT_PAGE_SIZE,
	    remoteSort: true,
	    buffered: true,
		proxy : {
			type : 'ajax',
			url : 'awaitAlarm/awaitAlarmAction!queryAlarmDetail.action',
			reader : {
				type : 'json',
				root : 'detailList',
			    totalProperty: 'totalCount'
			}
		}
	});
	
		var northArea = Ext.create('Ext.grid.Panel', {
				region : 'north',
				//verticalScrollerType: 'paginggridscroller',
	            // do not reset the scrollbar when the view refreshs
	            //invalidateScrollerOnRefresh: false,
				store : thingsStore,
				height:300,
				stateful: true,
				selType: 'checkboxmodel',
				columns : [
 		           {
 		                xtype: 'rownumberer',
 		                  header : "序号",
 			                width: 30
 		            },
			            
			            {
							header : "异常来源",
							sortable : true,
							align : 'center',
							resizable : true,
							dataIndex : "EXCEPT_SRC_NAME",
						    width:120
						}, {
							header : "生成方式",
							sortable : true,
							align : 'center',
							resizable : true,
							dataIndex : "CREATE_TYPE_NAME",
							width:120
						}, {
							header : "发起人",
							sortable : true,
							resizable : true,
							align : 'center',
							width:120,
							dataIndex : "SEND_STAFF_NAME"
						}, {
							header : "发起人单位",
							sortable : true,
							resizable : true,
							align : 'center',
							width:200,
							dataIndex : "SEND_ORG_NAME"
						}, {
							header : "发起时间",
							sortable : true,
							resizable : true,
							align : 'center',
							width:120,
							dataIndex : "START_TIME"
						}, {
							header : "预计完成时间",
							sortable : true,
							resizable : true,
							align : 'center',
							width:120,
							dataIndex : "PRE_CLOSE_TIME"
						}, {
							header : "流程状态",
							sortable : true,
							resizable : true,
							align : 'center',
							width:120,
							dataIndex : "FLOW_STATUS_NAME"
						}, {
							header : "期限",
							sortable : true,
							resizable : true,
							align : 'center',
							width:50,
							dataIndex : "QIXIAN"
						},{
							header : "TASK_ID",
							sortable : true,
							resizable : true,
							width:120,
							hidden:true,
							dataIndex : "TASK_ID"
						}, {
							header : "FLOW_STATUS_CODE",
							sortable : true,
							resizable : true,
							hidden:true,
							width:120,
							dataIndex : "FLOW_STATUS_CODE"
						}],
					listeners : {
						itemclick:function(view,record,item,index,e){
							//if (typeof (record.raw) != 'undefined') {
						        //TASK_ID= record.raw.TASK_ID; 
						        detailStore.getProxy().extraParams={
						        	'task_id':record.get('TASK_ID') 
						        };
						        detailStore.removeAll();
						        detailStore.currentPage=1;
						        detailStore.load({
			            		    	start:0
			            		});
							//}
						}

					},	
					//selType: 'checkboxmodel',
					dockedItems: [
					  {
				        xtype: 'pagingtoolbar',
				        store: thingsStore,   
				        dock: 'bottom',
				        displayInfo: true
					  }
				    ,{
						xtype: 'toolbar',
						dock: 'top',
						items: [{
							xtype: 'component',
							flex: 1
						},
						{
							xtype: 'button',
							text: '打印工单',
							handler: function() {
							var data = northArea.getSelectionModel().getSelection();
							if(data.length == 0) {
								Ext.Msg.alert('提示', '请至少选择一个！');
								return;
							}
							var task_id = data[0].get('TASK_ID');
								 window.open('./exceHand/alarmFlowPrint.jsp?task_id='+task_id);
							
							}
						},{
							xtype: 'button',
							text: '本地处理',
							handler: function() {
								status_handler('2')
							}
						}, {
//							xtype: 'button',
//							text: '营销处理',
//							handler: function() {
//								status_handler('3')
//							}
						}, {
							xtype: 'button',
							text: '处理归档',
							handler: function() {
								status_handler('5')
							}
						}]
					}]
			});
		
			function status_handler(handle_mode) {
				var data = northArea.getSelectionModel().getSelection();
				if(data.length == 0) {
					Ext.Msg.alert('提示', '请至少选择一个！');
					return;
				}
				var obj=new Object();
				
				//本地处理
				if(handle_mode=='2'){
						if(data[0].data.FLOW_STATUS_CODE!='1'){
							Ext.Msg.alert('提示', '该状态下不能进行此操作！');
							}else{
									obj.FLOW_STATUS = handle_mode;
									obj.TASK_ID = data[0].get('TASK_ID');
									obj.PSTATUS_CODE= data[0].get('FLOW_STATUS_CODE');
									
									Ext.MessageBox.confirm('确认', '此操作会进入本地处理流程，确认继续吗？', function(v){
										if(v=='yes'){
											Ext.Ajax.request({
											url: 'awaitAlarm/awaitAlarmAction!modifyFlowStatus.action',
											params: {
												alarm_handle_param: Ext.encode(obj)
											},
											success: function(response) {
												Ext.Msg.alert('提示', '操作成功！');
												thingsStore.removeAll();
							            	    thingsStore.currentPage=1;
							            		thingsStore.load({
							            		    	start:0
							            		});
											}
										});
										}
									});
							}
				}else if(handle_mode=='3'){
					if(data[0].data.FLOW_STATUS_CODE!='1'){
						Ext.Msg.alert('提示', '该状态下不能进行此操作！');
						}else{
								obj.FLOW_STATUS = '3';
								obj.TASK_ID = data[0].get('TASK_ID');
								obj.PSTATUS_CODE= data[0].get('FLOW_STATUS_CODE');
								
								Ext.MessageBox.confirm('确认', '此操作会进入营销处理流程，确认继续吗？', function(v){
									if(v=='yes'){
										Ext.Ajax.request({
										url: 'awaitAlarm/awaitAlarmAction!modifyFlowStatus.action',
										params: {
											alarm_handle_param: Ext.encode(obj)
										},
										success: function(response) {
											Ext.Msg.alert('提示', '操作成功！');
											thingsStore.removeAll();
						            	    thingsStore.currentPage=1;
						            		thingsStore.load({
						            		    	start:0
						            		});
										}
									});
									}
								});
						}
				}else{
					if(data[0].data.FLOW_STATUS_CODE=='1'){
						Ext.Msg.alert('提示', '该状态下不能归档！');
								}else{
									
									if(data[0].get('FLOW_STATUS_CODE')=='2'){
									var handleWin =Ext.create('Ext.window.Window', {
								    title: '流程待办归档处理',
								    height: 400,
								    width: 400,
								    layout: 'fit',
								    closable:true,
							        items: [
							        	{
							        	xtype:'form',
							        	id:'file_form',
							        	frame:true,
							        	items:[ 
											 {
											    xtype: 'radiogroup',
											    fieldLabel: '处理情况',
											    columns: 2,
											    id:'manage_type',
											    items: [
											        { boxLabel: '现场安装问题', name: 'manage_type', inputValue: '01' },
											        { boxLabel: '计量装置故障', name: 'manage_type', inputValue: '02', checked: true},
											        { boxLabel: '计量回路问题', name: 'manage_type', inputValue: '03' },
											        { boxLabel: '用户窃电', name: 'manage_type', inputValue: '04' },
											        { boxLabel: '采集装置故障', name: 'manage_type', inputValue: '05' },
											        { boxLabel: '其它问题', name: 'manage_type', inputValue: '06' }
											    ]
											},{
							        	   		xtype     : 'textfield',
										        name      : 'FURTHER_ENGER',
										        fieldLabel: '追补电量',
										        anchor    : '100%',
										        id		  :"FURTHER_ENGER",
										        regex : /^((\d+(\.\d+))|(\d+))$/, 
												regexText:"只能输入正数!",  
												allowBlank : false  ,
										        labelAlign:'right',
										        labelWidth:60 
							        	   },{
							        	   		xtype     : 'textfield',
										        name      : 'FURTHER_CHARGE',
										        fieldLabel: '追补电费',
										        anchor    : '100%',
										        id		  :"FURTHER_CHARGE",
										        regex : /^((\d+(\.\d+))|(\d+))$/, 
												regexText:"只能输入正数!",  
												allowBlank : false  ,
										        labelAlign:'right',
										        labelWidth:60 
							        	   },{
							        	   		xtype     : 'textfield',
										        name      : 'DEFAULT_CHARGE',
										        fieldLabel: '违约电费',
										        anchor    : '100%',
										        id		  :"DEFAULT_CHARGE",
										        regex : /^((\d+(\.\d+))|(\d+))$/, 
												regexText:"只能输入正数!",  
												allowBlank : false  ,
										        labelAlign:'right',
										        labelWidth:60 
							        	   }
											   ,{
							        	   		xtype     : 'textareafield',
										        name      : 'END_TASK_DES',
										        fieldLabel: '处理说明',
										        anchor    : '100%',
										        id		  :"END_TASK_DES",
										        labelAlign:'right',
										        labelWidth:60,
										        height: 200
							        	   }],
							        	buttons:[
							            	{
											 text : '确定',
											 xtype:"button",
											 handler : function() {
							            		var  FURTHER_ENGER=Ext.getCmp("FURTHER_ENGER");
							            		var  FURTHER_CHARGE=Ext.getCmp("FURTHER_CHARGE");
							            		var  DEFAULT_CHARGE=Ext.getCmp("DEFAULT_CHARGE");
							            		if(FURTHER_ENGER.getValue()<0||FURTHER_ENGER.getValue().trim()==''){
							            			Ext.Msg.alert('提示','追补电量输入错误！');
							            			return;
							            		}
							            		if(FURTHER_CHARGE.getValue()<0||FURTHER_CHARGE.getValue().trim()==''){
							            			Ext.Msg.alert('提示','追补电费输入错误！');
							            			return;
							            		}
							            		
							            		if(FURTHER_CHARGE.getValue()<FURTHER_ENGER.getValue()*0.3 ){
							            			Ext.Msg.alert('提示','追补电费输入错误！');
							            			return;
							            		}
							            		if(DEFAULT_CHARGE.getValue()<0||DEFAULT_CHARGE.getValue().trim()==''){
							            			Ext.Msg.alert('提示','违约电费输入错误！');
							            			return;
							            		}
							            		
							            		
											 	var data = northArea.getSelectionModel().getSelection();
											 	obj=this.up('form').getValues();
											 	obj.TASK_ID = data[0].get('TASK_ID');
												obj.PSTATUS_CODE= data[0].get('FLOW_STATUS_CODE');
												
											 	obj.FLOW_STATUS = '5';
							            	 	Ext.Ajax.request({
								            	    url: 'awaitAlarm/awaitAlarmAction!modifyFlowStatus.action',
								            	    params: {
							            	 					alarm_handle_param: Ext.encode(obj)
								            	             },
								            	    success: function(response){
									            	    Ext.Msg.alert('提示', '操作成功！');
									            	    thingsStore.removeAll();
									            	    thingsStore.currentPage=1;
									            		thingsStore.load({
									            		    	start:0
									            		});
								    	            	handleWin.close();
								            	    }
								            	});
											  }	
											},
											{
												 xtype:"button",
								                  text:"关闭",
								                  handler:function(){
													handleWin.close();
								                  }
												
											}
							        	]
							        }]
								});
									handleWin.show();
								}
								
								
									if(data[0].get('FLOW_STATUS_CODE')=='3'){
										var cishandleWin =Ext.create('Ext.window.Window', {
										    title: '流程待办归档处理',
										    height: 400,
										    width: 400,
										    layout: 'fit',
										    closable:true,
									        items: [
									        	{
									        	xtype:'form',
									        	id:'cisfile_form',
									        	frame:true,
									        	items:[ 
													 {
													    xtype: 'radiogroup',
													    fieldLabel: '处理情况',
													    columns: 2,
													    id:'cismanage_type',
													    items: [
													        { boxLabel: '计量装置故障', name: 'manage_type', inputValue: '01' , checked: true},
													        { boxLabel: '专项检查', name: 'manage_type', inputValue: '02'},
													        { boxLabel: '现场消缺', name: 'manage_type', inputValue: '03' },
													        { boxLabel: '故障报修', name: 'manage_type', inputValue: '04' },
													        { boxLabel: '其他处理', name: 'manage_type', inputValue: '05' }
													    ]
													},{
									        	   		xtype     : 'textfield',
												        name      : 'FURTHER_ENGER',
												        fieldLabel: '追补电量',
												        anchor    : '100%',
												        id		  :"FURTHER_ENGER",
												        regex : /^((\d+(\.\d+))|(\d+))$/, 
														regexText:"只能输入正数!",  
														allowBlank : false  ,
												        labelAlign:'right',
												        labelWidth:60 
									        	   },{
									        	   		xtype     : 'textfield',
												        name      : 'FURTHER_CHARGE',
												        fieldLabel: '追补电费',
												        anchor    : '100%',
												        id		  :"FURTHER_CHARGE",
												        regex : /^((\d+(\.\d+))|(\d+))$/, 
														regexText:"只能输入正数!",  
														allowBlank : false  ,
												        labelAlign:'right',
												        labelWidth:60 
									        	   },{
									        	   		xtype     : 'textfield',
												        name      : 'DEFAULT_CHARGE',
												        fieldLabel: '违约电费',
												        anchor    : '100%',
												        id		  :"DEFAULT_CHARGE",
												        regex : /^((\d+(\.\d+))|(\d+))$/, 
														regexText:"只能输入正数!",  
														allowBlank : false  ,
												        labelAlign:'right',
												        labelWidth:60 
									        	   }
													   ,{
									        	   		xtype     : 'textareafield',
												        name      : 'END_TASK_DES',
												        fieldLabel: '处理说明',
												        anchor    : '100%',
												        id		  :"cisEND_TASK_DES",
												        labelAlign:'right',
												        labelWidth:60,
												        height: 200
									        	   }],
									        	buttons:[{
													 text : '确定',
													 xtype:"button",
													 handler : function() {
									        		
									        		var  FURTHER_ENGER=Ext.getCmp("FURTHER_ENGER");
								            		var  FURTHER_CHARGE=Ext.getCmp("FURTHER_CHARGE");
								            		var  DEFAULT_CHARGE=Ext.getCmp("DEFAULT_CHARGE");
								            		if(FURTHER_ENGER.getValue()<0||FURTHER_ENGER.getValue().trim()==''){
								            			Ext.Msg.alert('提示','追补电量输入错误！');
								            			return;
								            		}
								            		if(FURTHER_CHARGE.getValue()<0||FURTHER_CHARGE.getValue().trim()==''){
								            			Ext.Msg.alert('提示','追补电费输入错误！');
								            			return;
								            		}
								            		
								            		if(FURTHER_CHARGE.getValue()<FURTHER_ENGER.getValue()*0.3 ){
								            			Ext.Msg.alert('提示','追补电费输入错误！');
								            			return;
								            		}
								            		if(DEFAULT_CHARGE.getValue()<0||DEFAULT_CHARGE.getValue().trim()==''){
								            			Ext.Msg.alert('提示','违约电费输入错误！');
								            			return;
								            		}
								            		
													 	var data = northArea.getSelectionModel().getSelection();
													 	obj=this.up('form').getValues();
													 	obj.TASK_ID = data[0].get('TASK_ID');
														obj.PSTATUS_CODE= data[0].get('FLOW_STATUS_CODE');
													 	obj.FLOW_STATUS = '5';
													 	
									            	 	Ext.Ajax.request({
										            	    url: 'awaitAlarm/awaitAlarmAction!modifyFlowStatus.action',
										            	    params: {
									            	 					alarm_handle_param: Ext.encode(obj)
										            	             },
										            	    success: function(response){
											            	    Ext.Msg.alert('提示', '操作成功！');
											            	    thingsStore.removeAll();
											            	    thingsStore.currentPage=1;
											            		thingsStore.load({
											            		    	start:0
											            		});
											            	    cishandleWin.close();
										            	    }
										            	});
													  }	
													},
													{
														  xtype:"button",
										                  text:"关闭",
										                  handler:function(){
															cishandleWin.close();
										                  }
													}
									        	]
									        }]
										});
										cishandleWin.show();
									
									}
									if(data[0].get('FLOW_STATUS_CODE')=='0'){

										var guanchahandleWin =Ext.create('Ext.window.Window', {
										    title: '流程待办归档处理',
										    height: 300,
										    width: 400,
										    layout: 'fit',
										    closable:true,
									        items: [
									        	{
									        	xtype:'form',
									        	id:'guanchafile_form',
									        	frame:true,
									        	items:[{
								        	   		xtype     : 'textfield',
											        name      : 'FURTHER_ENGER',
											        fieldLabel: '追补电量',
											        anchor    : '100%',
											        id		  :"FURTHER_ENGER",
											        regex : /^((\d+(\.\d+))|(\d+))$/, 
													regexText:"只能输入正数!",  
													allowBlank : false  ,
											        labelAlign:'right',
											        labelWidth:60
								        	   },{
								        	   		xtype     : 'textfield',
											        name      : 'FURTHER_CHARGE',
											        fieldLabel: '追补电费',
											        anchor    : '100%',
											        id		  :"FURTHER_CHARGE",
											        regex : /^((\d+(\.\d+))|(\d+))$/, 
													regexText:"只能输入正数!",  
													allowBlank : false  ,
											        labelAlign:'right',
											        labelWidth:60 
								        	   }, {
								        	   		xtype     : 'textfield',
											        name      : 'DEFAULT_CHARGE',
											        fieldLabel: '违约电费',
											        anchor    : '100%',
											        id		  :"DEFAULT_CHARGE",
											        regex : /^((\d+(\.\d+))|(\d+))$/, 
													regexText:"只能输入正数!",  
													allowBlank : false  ,
											        labelAlign:'right',
											        labelWidth:60 
								        	   },
													  {
									        	   		xtype     : 'textareafield',
												        name      : 'END_TASK_DES',
												        fieldLabel: '处理说明',
												        anchor    : '100%',
												        id		  :"guanchaEND_TASK_DES",
												        labelAlign:'right',
												        labelWidth:60,
												        height: 200
									        	   }],
									        	buttons:[{
													 text : '确定',
													 xtype:"button",
													 handler : function() {
									        		
									        		
									        		var  FURTHER_ENGER=Ext.getCmp("FURTHER_ENGER");
								            		var  FURTHER_CHARGE=Ext.getCmp("FURTHER_CHARGE");
								            		var  DEFAULT_CHARGE=Ext.getCmp("DEFAULT_CHARGE");
								            		if(FURTHER_ENGER.getValue()<0||FURTHER_ENGER.getValue().trim()==''){
								            			Ext.Msg.alert('提示','追补电量输入错误！');
								            			return;
								            		}
								            		if(FURTHER_CHARGE.getValue()<0||FURTHER_CHARGE.getValue().trim()==''){
								            			Ext.Msg.alert('提示','追补电费输入错误！');
								            			return;
								            		}
								            		
								            		
								            		if(FURTHER_CHARGE.getValue()<FURTHER_ENGER.getValue()*0.3 ){
								            			Ext.Msg.alert('提示','追补电费输入错误！');
								            			return;
								            		}
								            		if(DEFAULT_CHARGE.getValue()<0||DEFAULT_CHARGE.getValue().trim()==''){
								            			 Ext.Msg.alert('提示','违约电费输入错误！');
								            			return;
								            		}
								            		
													 	var data = northArea.getSelectionModel().getSelection();
													 	obj=this.up('form').getValues();
													 	obj.TASK_ID = data[0].get('TASK_ID');
														obj.PSTATUS_CODE= data[0].get('FLOW_STATUS_CODE');
													 	obj.FLOW_STATUS = '5';
													 	
									            	 	Ext.Ajax.request({
										            	    url: 'awaitAlarm/awaitAlarmAction!modifyFlowStatus.action',
										            	    params: {
									            	 					alarm_handle_param: Ext.encode(obj)
										            	             },
										            	    success: function(response){
											            	    Ext.Msg.alert('提示', '操作成功！');
											            	    thingsStore.removeAll();
											            	    thingsStore.currentPage=1;
											            		thingsStore.load({
											            		    	start:0
											            		});
											            	    guanchahandleWin.close();
										            	    }
										            	});
													  }	
													},
													{
														  xtype:"button",
										                  text:"关闭",
										                  handler:function(){
															guanchahandleWin.close();
										                  }
													}
									        	]
									        }]
										});
										guanchahandleWin.show();
									
									}
							}
					
				}
			};
			
			
			function modifyALARM_REMOVE(do_type){
				
				var selected_detail = Ext.getCmp('detail_grid').getSelectionModel().getSelection();
				if (selected_detail.length == 0) {
					Ext.Msg.alert('提示','请至少选择一个异常');
					return
				};
				var detaillist =[];
				for(var i=0;i<selected_detail.length;i++){
					detaillist.push(selected_detail[i].data) ;
				}
				
				var obj=new Object();
				obj.detaillist = detaillist;
				obj.isvalid=do_type
				
				Ext.MessageBox.confirm('确认', '此操作会进入本地处理流程，确认继续吗？', function(v){
					if(v=='yes'){
								Ext.Ajax.request({
									url: 'awaitAlarm/alarmRemoveAction!addAlarmRemove.action',
									params: {
											handp: Ext.encode(obj)
									} ,
								    success: function(response){
					            	    Ext.Msg.alert('提示', '操作成功！');
				            	    }
								})
					}
				});
			}
			var centerArea = Ext.create('Ext.grid.Panel', {
				region : 'center',
				//verticalScrollerType: 'paginggridscroller',
	          //  invalidateScrollerOnRefresh: false,
				store : detailStore,
				id:"detail_grid",
				viewConfig : {  
	                forceFit : true,  
	                getRowClass : function(record,rowIndex,rowParams,detailStore){  
	                    //禁用数据显示红色  
	                	
	                    if( record.data.EVENT_LEVEL_NAME== "严重"){  
	                        return 'x-grid-record-red';  
	                    }else if(record.data.EVENT_LEVEL_NAME== "重要"){  
	                        return 'x-grid-record-green';  
	                    }else if(record.data.EVENT_LEVEL_NAME== "较重要"){  
	                        return 'x-grid-record-yellow';  
	                    }else if(record.data.EVENT_LEVEL_NAME== "一般"){  
	                        return 'x-grid-record-blue';  
	                    }  
	                    
	                      
	                }  
	            },
				columns : [
				        {
			                xtype: 'rownumberer',
			                header : "序号",
			                width: 30
			            },{
							header : "异常类型",
							sortable : true,
							resizable : true,
							align : 'center',
							dataIndex : "EXCEPT_TYPE_NAME",
							width:120
						}, {
							header : "异常名称",
							align : 'center',
							sortable : true,
							resizable : true,
							dataIndex : "EVENT_NAME",
							width:120
						}, {
							header : "异常等级",
							sortable : true,
							align : 'center',
							resizable : true,
							width:120,
							dataIndex : "EVENT_LEVEL_NAME" 
						}, {
							header : "供电单位",
							sortable : true,
							resizable : true,
							align : 'center',
							width:200,
							dataIndex : "ORG_NAME"
						}, {
							header : "第一次告警时间",
							sortable : true,
							resizable : true,
							align : 'center',
							width:120,
							dataIndex : "FIRST_HAPPEN_DATE"
						}, {
							header : "告警发生次数",
							sortable : true,
							align : 'center',
							resizable : true,
							width:120,
							dataIndex : "ALARM_CNT"
						}, {
							header : "终端地址",
							sortable : true,
							resizable : true,
							align : 'center',
							width:120,
							dataIndex : "TERMINAL_ADDR"
						}, {
							header : "表计资产号",
							sortable : true,
							resizable : true,
							align : 'center',
							width:150,
							dataIndex : "ASSET_NO"
						}, {
							header : "ALARM_ID",
							sortable : true,
							resizable : true,
							hidden:true,
							width:120,
							dataIndex : "ALARM_ID"
						}, {
							header : "ALARM_TYPE",
							sortable : true,
							resizable : true,
							hidden:true,
							width:120,
							dataIndex : "ALARM_TYPE"
						}, {
							header : "ORG_NO",
							sortable : true,
							resizable : true,
							hidden:true,
							width:120,
							dataIndex : "ORG_NO"
						}, {
							header : "用户编号",
							sortable : true,
							resizable : true,
							width:120,
							dataIndex : "CONS_NO"
						}, {
							header : "TERMINAL_ID",
							sortable : true,
							resizable : true,
							hidden:true,
							width:120,
							dataIndex : "TERMINAL_ID"
						}, {
							header : "METER_ID",
							sortable : true,
							resizable : true,
							hidden:true,
							width:120,
							dataIndex : "METER_ID"
						}, {
							header : "ALARM_CODE",
							sortable : true,
							resizable : true,
							hidden:true,
							dataIndex : "ALARM_CODE"
						} ],
						  dockedItems: [{
						        xtype: 'pagingtoolbar',
						        store: detailStore,   
						        dock: 'bottom',
						        displayInfo: true
						    },{
								xtype: 'toolbar',
								dock: 'top',
								items: [{
									xtype: 'button',
									text: '加入白名单',
									handler: function() {
										modifyALARM_REMOVE('1');
									}
								} ,{
									xtype: 'button',
									text: '禁用白名单',
									handler: function() {
										modifyALARM_REMOVE('0');
									}
								}]
							}]	
						    
						    ,
							selType: 'checkboxmodel'
						 
			});

			
		var flowTab=Ext.create('Ext.panel.Panel',{
			border:true,
			layout : 'border',
			title:'流程待办事项',
			id:'gridPanel_flow',
			items:[northArea,centerArea]
		});
		var mainPanel = Ext.create('Ext.tab.Panel', {
					activeTab :0,
					layout : 'fit',
					items : [alramTab,flowTab],
					listeners : {
							'tabchange' : function(t, b) {
										if(b.getId()=='gridPanel_flow'){
											thingsStore.removeAll();
						            	    thingsStore.currentPage=1;
						            		thingsStore.load({
						            		    	start:0
						            		});
										}
							}
						
					}
		});
		renderModel(mainPanel,'待办事项');
	
	});
