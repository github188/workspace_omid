var DEFAULT_PAGE_SIZE = 15;

Ext.onReady(function() {
	  var test_obj = {
					  org_no: "",
					  alarm_type: "",
					  event_level: "",
					  chaoqi:"3"
	               };

	var myalarmStore = Ext.create('Ext.data.Store', {
		model: 'AwaitAlarm',
		pageSize: DEFAULT_PAGE_SIZE,
		remoteSort: true,
		buffered: true,
		proxy: {
			type: 'ajax',
			url: 'awaitAlarm/chaoqiAction!queryAwaitchaoqi.action',
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
		height: 80,
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
					fieldLabel: '供电单位',
					name: 'org_no',
					store: statQuery.orgStore,
					displayField: 'ORG_NAME',
					valueField: 'ORG_NO',
					multiSelect: false,
					queryMode: 'local',
					editable: false,
					anchor: '96%',
					listeners : {
					      afterRender : function(combo) {
					         combo.setValue(statQuery.orgStore.first().data.ORG_NO);
				      }
			   		}
				}  , {
					xtype: 'textfield',
					fieldLabel: '超期天数',
					name: 'chaoqi',
					value:'3',
					id:'daibanchaoqi',
					regex : /^\d+$/, 
					regexText:"只能输入正整数!",  
					allowBlank : false  ,
					anchor: '96%'
				} ]
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
					fieldLabel: '异常类型',
					name: 'alarm_type',
					store: statQuery.typeStore,
					displayField : 'NAME',
					valueField : 'VALUE',
					multiSelect: false,
					queryMode: 'local',
					editable: false,
					anchor: '96%',
					listeners : {
				      afterRender : function(combo) {
				         combo.setValue(statQuery.typeStore.first().data.VALUE);
				      }
				   }
				} , {
					xtype: 'button',
					text: '查询',
					width: 80,
					margin: '0 0 0 256',
					handler: function() {
					var daibanchaoqi=Ext.getCmp('daibanchaoqi');
					if(daibanchaoqi.getValue()<0||daibanchaoqi.getValue().trim()==''){
					alert("超期天数请输入正整数！");
					return;
					}
						   var form = this.up('form').getForm();  
						   myalarmStore.removeAll();
						   myalarmStore.getProxy().extraParams = {
							   handle_param: Ext.encode(form.getValues())
	                        };
							    myalarmStore.currentPage=1;
								myalarmStore.load({
								    	start:0
								});
					}
				}
				]
			}]
		}]

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
   		},{
			header: ' 超期天数',
			dataIndex: 'CHAOQI',
			width : 100,
			align : 'center',
			sortable : true
		},{
			header: '供电单位',
			dataIndex: 'ORG_NAME',
			width : 100,
			align : 'center',
			sortable : true
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
		}, {
			header: '生成待办事项时间',
			dataIndex: 'AWAIT_DATE1',
			width : 100,
			align : 'center',
			sortable : true
		}, {
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
		//selType: 'checkboxmodel',
		dockedItems: [{
	        xtype: 'pagingtoolbar',
	        store: myalarmStore,   
	        dock: 'bottom',
	        displayInfo: true
	    		} ]

	});
	
 
	 


	alramTab = Ext.create('Ext.panel.Panel', {
		border: true,
		layout: 'border',
		title:'待办事项处理超期',
		items: [northPanel, centerPanel]
	});
	
	
	/* 分割线——————————————————————————以下为第二个tab页面——————————————————————————*/	
		 
	Ext.define('AwaitThings', {
		extend : 'Ext.data.Model',
		fields : ['EXCEPT_SRC_NAME','CREATE_TYPE_NAME','SEND_STAFF_NAME','SEND_STAFF_NAME',
		'SEND_ORG_NAME','START_TIME','PRE_CLOSE_TIME','TASK_ID','FLOW_STATUS_CODE','FLOW_STATUS_NAME','QIXIAN']
	});
 
	 var thingsStore = Ext.create('Ext.data.Store', {
		model : 'AwaitAlarm',
		pageSize: 15,
	    remoteSort: true,
	    buffered: true,
		proxy : {
			type : 'ajax',
			url : 'awaitAlarm/chaoqiAction!queryFlowchaoqi.action',
			reader : {
				type : 'json',
				root : 'thingsList',
			    totalProperty: 'totalCount'
			}
		}
	});
	
	 
	 
var np = Ext.create('Ext.form.Panel', {
			region: 'north',
			frame: true,
			height: 80,
			bodyPadding: 1,
			items: [{
				xtype: 'container',
				anchor: '100%',
				layout: 'column',
				items: [{
					xtype: 'container',
					columnWidth: .33,
					layout: 'anchor',
					anchor: '100%',
					defaults : {
						labelAlign : "right"
					},
					items: [{
						xtype: 'combo',
						fieldLabel: '供电单位',
						name: 'org_no',
						store: statQuery.orgStore,
						displayField: 'ORG_NAME',
						valueField: 'ORG_NO',
						multiSelect: false,
						queryMode: 'local',
						editable: false,
						anchor: '96%',
						listeners : {
						      afterRender : function(combo) {
						         combo.setValue(statQuery.orgStore.first().data.ORG_NO);
					      }
				   		}
					}  , {
						xtype: 'textfield',
						fieldLabel: '超期天数',
						name: 'chaoqi',
						value:'3',
						id:'chulichaoqi',
						regex : /^\d+$/, 
						regexText:"只能输入正整数!",  
						allowBlank : false  ,
						anchor: '96%'
					} ]
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
						fieldLabel: '异常类型',
						name: 'alarm_type',
						store: statQuery.typeStore,
						displayField : 'NAME',
						valueField : 'VALUE',
						multiSelect: false,
						queryMode: 'local',
						editable: false,
						anchor: '96%',
						listeners : {
					      afterRender : function(combo) {
					         combo.setValue(statQuery.typeStore.first().data.VALUE);
					      }
					   }
					} , {
						xtype: 'button',
						text: '查询',
						width: 80,
						margin: '0 0 0 256',
						handler: function() {
						var chulichaoqi=Ext.getCmp('chulichaoqi');
						if(chulichaoqi.getValue()<0||chulichaoqi.getValue().trim()==''){
						alert("超期天数请输入正整数！");
						return;
						}
							   var form = this.up('form').getForm();  
							   thingsStore.removeAll();
							   thingsStore.getProxy().extraParams = {
								   handle_param: Ext.encode(form.getValues())
		                        };
								   thingsStore.currentPage=1;
								   thingsStore.load({
										    	start:0
										});
						}
					}
					]
				}]
			}]

		});

	 
	 
	 
	 
		var northArea = Ext.create('Ext.grid.Panel', { 
			region: "center",
			columnLines : true,
			store: thingsStore,
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
	   		},{
				header: ' 超期天数',
				dataIndex: 'CHAOQI',
				width : 100,
				align : 'center',
				sortable : true
			},{
				header: '供电单位',
				dataIndex: 'ORG_NAME',
				width : 100,
				align : 'center',
				sortable : true
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
			}, {
				header: '生成待办事项时间',
				dataIndex: 'AWAIT_DATE1',
				width : 100,
				align : 'center',
				sortable : true
			}, {
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
			//selType: 'checkboxmodel',
			dockedItems: [{
		        xtype: 'pagingtoolbar',
		        store: thingsStore,   
		        dock: 'bottom',
		        displayInfo: true
		    		} ]

		});
		
			
		var flowTab=Ext.create('Ext.panel.Panel',{
			border:true,
			layout : 'border',
			title:'流程处理超期',
			id:'gridPanel_flow',
			items:[np,northArea]
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
		renderModel(mainPanel,'处理超期查询');
	
	});
