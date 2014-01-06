var DEFAULT_PAGE_SIZE = 100;	
	Ext.define('complexQueryCommonModel', {
		extend : 'Ext.data.Model',
		fields : ['NAME','VALUE']
	});
	Ext.define('complexModel', {
		extend : 'Ext.data.Model',
		fields : ['EVENT_NAME','EVENT_LEVEL_NAME','EXCEPT_SRC_NAME','ORG_NAME'
		,'FLOW_FLAG_NAME','FLOW_STATUS_NAME','CONS_NO','FIRST_HAPPEN_DATE'
		,'HAPPEN_DATE','ALARM_CNT','FIRST_RESUME_DATE','RESUME_DATE','RESUME_DAY_CNT','TMNL_ASSET_NO'
		,'TERMINAL_ADDR','CONS_NAME','CONS_SORT_NAME','ELEC_ADDR','ASSET_NO']
	});
/**/
Ext.onReady(function() {



   //异常名称单独拿出来
	var eventName_store = Ext.create('Ext.data.Store', {
		model : 'complexQueryCommonModel'
	});
	var eventName_obj={};
    var queryEventName=function(eventType_param){
    	if(typeof(eventType_param)!='undefined'&&eventType_param!=null){
	    	var alarmname_param={
		    	column_name	:'event_name',
				column_value	:'event_no',
		        table_name:'VW_SEA_ALARM_CODE',
		        event_type:eventType_param
	    	};
//		     eventName_store.getProxy().extraParams = {
//	             alarmname_param: Ext.encode(alarmname_param)
//	         };
//	         eventName_store.load({
//	             params:{ alarmname_param:Ext.encode(alarmname_param)}
//	         });
	    	Ext.Ajax.request({
					url : 'AlarmAnalyseAction!queryEventNameList.action',
					params : {
						alarmname_param:Ext.encode(alarmname_param)
					},
					success : function(response) {
						var result = Ext.decode(response.responseText);
						var complexEventList = result.eventNameList;
						eventName_obj[eventType_param]=complexEventList
						eventName_store.loadData(eventName_obj["01"]);
					}
			});
	    	}
    }
    queryEventName('01');
    queryEventName('02');
    queryEventName('03');
	var complex_store = Ext.create('Ext.data.Store', {
		model : 'complexModel',
		pageSize: 50,
		remoteSort: true,
        buffered: true,
		proxy : {
			type : 'ajax',
			url : 'AlarmAnalyseAction!queryComplexAlarm.action',
			timeout:120000,
			reader : {
				root : 'complexAlarmList',
				totalProperty: 'totalCount',
				type : 'json'
			}
		}
	});
	
	
	
	



	
	var northPanel=Ext.create('Ext.form.Panel', {
		region:'north',
		frame:true,
		height : 120,
		bodyPadding : 1,
		id:'statQuery_complexForm',
		items: [{
	            xtype: 'container',
	            anchor: '100%',
	            layout:'column',
	            items:[
                  {
	                xtype: 'container',
	                columnWidth:.33,
	                layout: 'anchor',
	                items: [{
	                    xtype:'combo',
	                    fieldLabel: '供电单位',
	                    labelAlign:'right',
	                    name: 'org_no',
	                    store : statQuery.orgStore,
						displayField : 'ORG_NAME',
						valueField : 'ORG_NO',
						multiSelect : false,
						queryMode : 'local',
	                    anchor:'95%',
	                    editable: false,
	                    listeners : {
					      afterRender : function(combo) {
					         combo.setValue(statQuery.orgStore.first().data.ORG_NO);
					      }
				   		}
	                },{
	                	xtype:'combo',
	                    fieldLabel: '异常来源',
	                    labelAlign:'right',
	                    name: 'alarm_src',
	                    store:statQuery.sourceStore,
	                    displayField : 'NAME',
						valueField : 'VALUE',
						multiSelect : false,
						queryMode : 'local',
	                    anchor:'95%',
	                    editable: false,
	                    emptyText:'全部'
	                },{
	                	xtype:'combo',
	                    fieldLabel: '处理方式',
	                    labelAlign:'right',
	                    name: 'flow_flag',
	                    store:statQuery.stores_obj['handleType_store'],
	                    displayField : 'NAME',
						valueField : 'VALUE',
						multiSelect : false,
						queryMode : 'local',
	                    anchor:'95%',
	                    editable: false,
	                    emptyText:'全部'
	                }]
	            },
	            {
	                xtype: 'container',
	                columnWidth:.33,
	                layout: 'anchor',
	                items: [
	                	{
							fieldLabel : '异常类型',
							xtype : 'radiogroup',
							labelAlign:'right',
							vertical: true,
							column:3,
							name : 'event_type',
							id:'statQuery_eventTypeRadio',
							flex:1,
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
				                 		eventName_store.loadData(eventName_obj[newValue.event_type]);
				                 		if(newValue.event_type=='03'){
				                 			Ext.getCmp("complexQuery_asset_NO_column").hide();
				                 		}else{
				                 			Ext.getCmp("complexQuery_asset_NO_column").show();
				                 		}
		                        	 	//queryEventName(newValue.event_type);
				                 	}
				                 }
							 }
						},{
	                    xtype:'combo',
	                    fieldLabel: '异常等级',
	                    labelAlign:'right',
	                    name: 'event_level',
	                    store:statQuery.levelStore,
	                    displayField : 'NAME',
						valueField : 'VALUE',
						multiSelect : false,
						queryMode : 'local',
						editable: false,
	                    anchor:'95%',
	                    emptyText:'全部'
	                },
	                	{
	                    xtype:'datefield',
	                    fieldLabel: '发生时间',
	                    format:'Y-m-d',
	                    labelAlign:'right',
	                    name: 'start_date',
	                    anchor:'95%',
	                    value:statQuery.start_date
	                }]
	            },{
	                xtype: 'container',
	                columnWidth:.33,
	                layout: 'anchor',
	                items: [
                	{
	                    xtype:'combo',
	                    fieldLabel: '异常名称',
	                    labelAlign:'right',
	                    name: 'event_name',
	                    store:eventName_store,
	                    displayField : 'NAME',
						valueField : 'VALUE',
						multiSelect : false,
						queryMode : 'local',
						editable: false,
	                    anchor:'95%',
	                    loadMask:false,
	                    id:'statQuery_complexEventName',
	                    emptyText:'全部'
	                },
	                {
	                    xtype:'combo',
	                    fieldLabel: '流程状态',
	                    labelAlign:'right',
	                    name: 'flow_status',
	                    store:statQuery.flowStatusStore,
	                    displayField : 'NAME',
						valueField : 'VALUE',
						multiSelect : false,
						queryMode : 'local',
						editable: false,
	                    anchor:'95%',
	                    emptyText:'全部'
	                },
	                {
	                    xtype:'datefield',
	                    fieldLabel: '到',
	                    format:'Y-m-d',
	                    labelAlign:'right',
	                    name: 'end_date',
	                    editable:false,
	                    value: statQuery.end_date,
	                    anchor:'95%'
	                },
                	{
                		xtype: 'container',
		                layout: 'hbox',
                		items:[
            			{
		                	xtype:'button',
		                	text:'查询',
		                	width:80,
		                	margin:'0 0 0 90',
		                	handler:function(){
		                	var params = this.up('form').getForm().getValues();
		                	complex_store.getProxy().extraParams = {
	                            complex_params: Ext.encode(params)
	                        };
	                        complex_store.removeAll();
	                        complex_store.currentPage=1;
	                        complex_store.load({
						    	start:0
							});
	                		}
                		},
                		{
		                	xtype:'button',
		                	text:'高级',
		                	width:80,
		                	margin:'0 0 0 10',
		                	handler:function(){
							    
									var alaramConditionPanel=Ext.create('Ext.panel.Panel', {
										collapsible:true,
//										split: true,
										anchor: '100%',
//										animCollapse: true,
										title:'异常查询条件',
										frame:true,
										items:[{
									            xtype: 'container',
									            width:777,
									            layout:'column',
									            defaults:{
									                columnWidth:.5
									            },
									            items:[
								                  {
								                  	xtype: 'container',
								                  	layout: 'anchor',
									                items: [{
									                    xtype:'combo',
									                    fieldLabel: '供电单位',
									                    labelAlign:'right',
									                    name: 'org_no',
									                    store : statQuery.orgStore,
														displayField : 'ORG_NAME',
														valueField : 'ORG_NO',
														multiSelect : false,
														queryMode : 'local',
									                    anchor:'95%',
									                    editable: false,
									                    listeners : {
													      afterRender : function(combo) {
													         combo.setValue(statQuery.orgStore.first().data.ORG_NO);
													      }
												   		}
									                },{
									                    xtype:'combo',
									                    fieldLabel: '异常名称',
									                    labelAlign:'right',
									                    name: 'event_name',
									                    store:eventName_store,
									                    displayField : 'NAME',
														valueField : 'VALUE',
														multiSelect : false,
														queryMode : 'local',
														editable: false,
									                    anchor:'95%',
									                    loadMask:false,
									                    id:'statQuery_advancedEventName',
									                    emptyText:'全部'
									                },{
									                    xtype:'combo',
									                    fieldLabel: '异常等级',
									                    labelAlign:'right',
									                    name: 'event_level',
									                    store:statQuery.levelStore,
									                    displayField : 'NAME',
														valueField : 'VALUE',
														multiSelect : false,
														queryMode : 'local',
														editable: false,
									                    anchor:'95%',
									                   	emptyText:'全部'
									                },
									                	{
									                    xtype:'datefield',
									                    fieldLabel: '发生时间',
									                    format:'Y-m-d',
									                    labelAlign:'right',
									                    name: 'start_date',
									                    anchor:'95%',
									                    value:statQuery.start_date
									                },{
									                	xtype:'combo',
									                    fieldLabel: '处理方式',
									                    labelAlign:'right',
									                    name: 'flow_flag',
									                    store:statQuery.stores_obj['handleType_store'],
									                    displayField : 'NAME',
														valueField : 'VALUE',
														multiSelect : false,
														queryMode : 'local',
									                    anchor:'95%',
									                    editable: false,
									                   	emptyText:'全部'
									                }]
									            },
									            {
									                xtype: 'container',
									                columnWidth:.5,
									                layout: 'anchor',
									                items: [
									                	{
															fieldLabel : '异常类型',
															xtype : 'radiogroup',
															labelAlign:'right',
															vertical: true,
															column:3,
															flex:1,
															id:'complexQuery_alarmType',
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
												                 		if(newValue.event_type=='03'){
									                        	 			meterConditionPanel.hide();
									                        	 			Ext.getCmp("complexQuery_asset_NO_column").hide();
										                        	 	}else{
										                        	 		meterConditionPanel.show();
										                        	 		Ext.getCmp("complexQuery_asset_NO_column").show();
										                        	 	}
										                        	 	eventName_store.loadData(eventName_obj[newValue.event_type]);
										                        	 	//queryEventName(newValue.event_type);
												                 	}
												                 }
															 }
														},
														{
									                	xtype:'combo',
									                    fieldLabel: '异常来源',
									                    labelAlign:'right',
									                    name: 'alarm_src',
									                    store:statQuery.sourceStore,
									                    displayField : 'NAME',
														valueField : 'VALUE',
														multiSelect : false,
														queryMode : 'local',
									                    anchor:'95%',
									                    editable: false,
									                    emptyText:'全部'
									                },
									                {
									                    xtype:'combo',
									                    fieldLabel: '流程状态',
									                    labelAlign:'right',
									                    name: 'flow_status',
									                    store:statQuery.flowStatusStore,
									                    displayField : 'NAME',
														valueField : 'VALUE',
														multiSelect : false,
														queryMode : 'local',
														editable: false,
									                    anchor:'95%',
									                    emptyText:'全部'
									                },
									                 {
									                    xtype:'datefield',
									                    fieldLabel: '到',
									                    format:'Y-m-d',
									                    labelAlign:'right',
									                    name: 'end_date',
									                    editable:false,
									                    value: statQuery.end_date,
									                    anchor:'95%'
									                }
									                ]
									            }]
									        }
										]
									});
								   var userConditionPanel=Ext.create('Ext.panel.Panel', {
										collapsible:true,
										//animCollapse: true,
										title:'用户查询条件',
										frame:true,
										items:[{
									            xtype: 'container',
									            width:777,
									            layout:'column',
									            defaults:{
									                columnWidth:.5
									            },
									            items:[
								                  {
								                  	xtype: 'container',
								                  	layout: 'anchor',
									                items: [{
									                    xtype:'combo',
									                    fieldLabel: '用户分类',
									                    labelAlign:'right',
									                    name: 'cons_sort_code',
									                    store : statQuery.stores_obj['userSort_store'],
														displayField : 'NAME',
														valueField : 'VALUE',
														multiSelect : false,
														queryMode : 'local',
									                    anchor:'95%',
									                    editable: false,
									                    emptyText:'全部'
									                },{
									                    xtype:'textfield',
									                    fieldLabel: '用户编号',
									                    labelAlign:'right',
									                    name: 'cons_no',
									                    anchor:'95%',
									                    emptyText:'多个以","号分隔。'
									                },{
									                    xtype:'textfield',
									                    fieldLabel: '用电地址',
									                    anchor:'95%',
									                    labelAlign:'right',
									                    name: 'elec_addr'
									                }]
									            },
									            {
									                xtype: 'container',
									                columnWidth:.5,
									                layout: 'anchor',
									                items: [
														{
									                	xtype:'combo',
									                    fieldLabel: '行业',
									                    labelAlign:'right',
									                    name: 'trade_code',
									                	store:statQuery.stores_obj['trade_store'],
									                    displayField : 'NAME',
														valueField : 'VALUE',
														multiSelect : false,
														queryMode : 'local',
									                    anchor:'95%',
									                    editable: false,
									                    emptyText:'全部'
									                },
									                {
									                    xtype:'textfield',
									                    fieldLabel: '用户名称',
									                    labelAlign:'right',
									                    name: 'cons_name',
									                    anchor:'95%'
									                },
									                 {
									                	xtype:'combo',
									                    fieldLabel: '用户容量等级 ',
									                    labelAlign:'right',
									                    name: 'cap_grade_no',
									                    store:statQuery.stores_obj['trade_store'],
									                    displayField : 'NAME',
														valueField : 'VALUE',
														multiSelect : false,
														queryMode : 'local',
									                    anchor:'95%',
									                    editable: false,
									                    emptyText:'全部'
									                }
									                ]
									            }]
									        }
										]
									});
									 var tmnlConditionPanel=Ext.create('Ext.panel.Panel', {
										collapsible:true,
//										split: true,
//										animCollapse: true,
										title:'终端查询条件',
										frame:true,
										items:[{
									            xtype: 'container',
									            width:777,
									            layout:'column',
									            defaults:{
									                columnWidth:.5
									            },
									            items:[
									            
								                  {
								                  	xtype: 'container',
								                  	layout: 'anchor',
									                items: [
									                	{
									                    xtype:'textfield',
									                    fieldLabel: '终端地址',
									                    labelAlign:'right',
									                    name: 'terminal_addr',
									                    anchor:'95%',
									                    emptyText:'多个以","号分隔。'
								                		},{
									                    xtype:'combo',
									                    fieldLabel: '通信方式',
									                    labelAlign:'right',
									                    name: 'coll_mode',
									                    store : statQuery.stores_obj['commMode_store'],
														displayField : 'NAME',
														valueField : 'VALUE',
														multiSelect : false,
														queryMode : 'local',
									                    anchor:'95%',
									                    editable: false,
									                    emptyText:'全部'
									                },{
									                    xtype:'combo',
									                    fieldLabel: '终端状态',
									                    labelAlign:'right',
									                    name: 'status_code',
									                    store : statQuery.stores_obj['tmnlStatus_store'],
														displayField : 'NAME',
														valueField : 'VALUE',
														multiSelect : false,
														queryMode : 'local',
									                    anchor:'95%',
									                    editable: false,
									                    emptyText:'全部'
									                }]
									            },
									            {
									                xtype: 'container',
									                columnWidth:.5,
									                layout: 'anchor',
									                items: [
														{
									                	xtype:'combo',
									                    fieldLabel: '终端规约',
									                    labelAlign:'right',
									                    name: 'protocol_code',
									                    store:statQuery.stores_obj['protocol_store'],
									                    displayField : 'NAME',
														valueField : 'VALUE',
														multiSelect : false,
														queryMode : 'local',
									                    anchor:'95%',
									                    editable: false,
									                    emptyText:'全部'
									                },
									               {
									                	xtype:'combo',
									                    fieldLabel: '终端类型',
									                    labelAlign:'right',
									                    name: 'terminal_type_code',
									                    store:statQuery.stores_obj['tmnlType_store'],
									                    displayField : 'NAME',
														valueField : 'VALUE',
														multiSelect : false,
														queryMode : 'local',
									                    anchor:'95%',
									                    editable: false,
									                    emptyText:'全部'
									                }
									                ]
									            }]
									        }
										]
									});
									var meterConditionPanel=Ext.create('Ext.panel.Panel', {
										collapsible:true,
										title:'电能表查询条件',
										frame:true,
										items:[{
									            xtype: 'container',
									            //anchor: '100%',
									            width:777,
									            layout:'column',
									            defaults:{
									                columnWidth:.5
									            },
									            items:[
								                  {
								                  	xtype: 'container',
								                  //	layout: 'auto',
								                  	layout: 'anchor',
									                items: [
									                	{
									                    xtype:'combo',
									                    fieldLabel: '电能表规约',
									                    labelAlign:'right',
									                    name: 'comm_no',
									                    store : statQuery.stores_obj['meterProtocol_store'],
														displayField : 'NAME',
														valueField : 'VALUE',
														multiSelect : false,
														queryMode : 'local',
									                    anchor:'95%',
									                    editable: false,
									                    emptyText:'全部'
									                },{
									                    xtype:'combo',
									                    fieldLabel: '计量点分类',
									                    labelAlign:'right',
									                    name: 'type_code',
									                    store : statQuery.stores_obj['mpType_store'],
														displayField : 'NAME',
														valueField : 'VALUE',
														multiSelect : false,
														queryMode : 'local',
									                    anchor:'95%',
									                    editable: false,
									                    emptyText:'全部'
									                }]
									            },
									            {
									                xtype: 'container',
									                columnWidth:.5,
									                layout: 'anchor',
									                items: [
													{
								                    xtype:'textfield',
								                    fieldLabel: '电能表资产号',
								                    labelAlign:'right',
								                    name: 'asset_no',
								                    anchor:'95%',
								                    emptyText:'多个以","号分隔。'
								            		},
									               {
									                	xtype:'combo',
									                    fieldLabel: '计量点用途',
									                    labelAlign:'right',
									                    name: 'usage_type_code',
									                    store:statQuery.stores_obj['mpUsage_store'],
									                    displayField : 'NAME',
														valueField : 'VALUE',
														multiSelect : false,
														queryMode : 'local',
									                    anchor:'95%',
									                    editable: false,
									                    emptyText:'全部'
									                }
									                ]
									            }]
									        }
										]
								});	
								 
								 var complexForm=Ext.create('Ext.form.Panel', {
												id:'statQuery_advancedForm',
												anchor:'100%',
												region:'center',
											//	layout:'',
												items:[alaramConditionPanel,userConditionPanel,
												tmnlConditionPanel,meterConditionPanel,{
												  	xtype:'button',
										        	text:'查询',
										        	width:80,
										        	margin:'10 0 0 680',
										        	handler:function(){
										        		var params = this.up('form').getForm().getValues();
									                	complex_store.getProxy().extraParams = {
								                            complex_params: Ext.encode(params)
								                        };
								                        complex_store.removeAll();
								                        complex_store.currentPage=1;
								                        complex_store.load({
													    	start:0
														});
							                       	    queryCondition_Win.close();
							                       	    Ext.getCmp('statQuery_eventTypeRadio').setValue({event_type:'01'});
										    		}
												}]
								});
								var queryCondition_Win =Ext.create('Ext.window.Window', {
										    title: '高级查询',
										    height: 580,
										    width: 800,
										    layout: 'border',
										    closable:true,
									        items: [complexForm]
								});
								queryCondition_Win.show();
	                		}
                		}
                		]
                	}
	                ]
	            }]
	        }]
	        
	});


		var centerPanel = Ext.create('Ext.grid.Panel', {
			region:'center',
			title: '异常明细',
	        store: complex_store,
	       // verticalScrollerType: 'paginggridscroller',
	        loadMask: true,
	        sortableColumns:false,
	        disableSelection: true,
	       // invalidateScrollerOnRefresh: false,
	        viewConfig: {
	            trackOver: false
	        },
			//selType:'checkboxmodel',
			//multiSelect:true,
			columns : [ {
        		xtype: 'rownumberer',
        		width: 50,
        		sortable: false
       		 },{
				header : '供电单位',
				dataIndex : 'ORG_NAME',
				width:150,
        		sortable: false
			},
			{
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
				header : '异常名称',
				dataIndex : 'EVENT_NAME',
				width:150
			},{
				header : '异常来源',
				dataIndex : 'EXCEPT_SRC_NAME',
				width:150
			},
			{
				header : '告警次数',
				dataIndex : 'ALARM_CNT',
				width:100
			},
			{
				header : '用户编号',
				dataIndex : 'CONS_NO',
				width:150
			},
			{
				header : '用户名称',
				dataIndex : 'CONS_NAME',
				width:150
			},{
				header : '用电地址',
				dataIndex : 'ELEC_ADDR',
				width:150
			},{
				header : '用户类别',
				dataIndex : 'CONS_SORT_NAME',
				width:150
			},
				{
				header : '流程状态',
				dataIndex : 'FLOW_STATUS_NAME',
				width:150
			},{
				header : '处理方式',
				dataIndex : 'FLOW_FLAG_NAME',
				width:150
			},{
				header : '最近告警时间',
				dataIndex : 'HAPPEN_DATE',
				width:150
			},{
				header : '第一次告警时间',
				dataIndex : 'FIRST_HAPPEN_DATE',
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
				header : '终端资产号',
				dataIndex : 'TMNL_ASSET_NO',
				width:150
			}, 
			{
				header : '电能表资产号',
				dataIndex : 'ASSET_NO',
				width:150,
				id:'complexQuery_asset_NO_column'
			}],
			dockedItems: [{
	        xtype: 'pagingtoolbar',
	        store: complex_store,   
	        dock: 'bottom',
	        displayInfo: true
    		}]
			
		});
		alarmAnalyseMainPanel=Ext.create('Ext.panel.Panel',{
			border:true,
			layout : 'border',
			items:[northPanel,centerPanel]
		});
		
		renderModel(alarmAnalyseMainPanel,'异常综合查询');
	//	myStore.guaranteeRange(0, 19);
	});
