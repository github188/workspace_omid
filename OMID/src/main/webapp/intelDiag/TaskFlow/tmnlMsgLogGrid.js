		//告警或报文过多
//		报文过多
		function tmnlMessage(alarmDate,terminalAddr){
				Ext.define('tmnlMsgLogModel', {
					extend : 'Ext.data.Model',
					fields : ["MESSAGE","EVENT_NO","COMM_TIME","TERMINAL_ADDR","FROM_ADDR"
							 ,"TO_ADDR","CTRL_CODE"]
			});
			Ext.create('Ext.data.Store',{
				//extend  : "Ext.data.Store",
				storeId :'tmnlMsgLogStoreId',
				model : 'tmnlMsgLogModel',
				remoteSort : true,
//				proxy : new Ext.data.MemoryProxy()
				buffered: true,
				pageSize : 30,
				proxy : {
					type : 'ajax',
					url : 'taskFlowAction!queryTmnlMsgLog.action',
					extraParams: {
						'queryItems.terminal_addr' : terminalAddr,
		  				'queryItems.alarmTime': alarmDate
		            },
					reader : {
						type : 'json',
						root : 'tmnlMsgLogList',
						totalProperty : 'totalCount'
					}
				}
				,autoLoad : true
		});
			var tmnlMsgGrid =   Ext.create('Ext.grid.Panel', {
				id : 'tmnlMsgGridId',
			  	extend    : "Ext.grid.Panel",
				loadMask : true,
				selModel : Ext.create('Ext.selection.CheckboxModel'),
				border : true,
				store : Ext.data.StoreManager.lookup('tmnlMsgLogStoreId'), 
				viewConfig : {
					trackOver : false
				},
//				tbar:['-',eventshow,'-',messageshow,{xtype: 'tbfill'},'-',appointDate],
				columnLines : true,
				columns :  [{
							text : "终端地址",
							width : 120,
							dataIndex : 'TERMINAL_ADDR',
							align : 'center',
							sortable : false
						}, {
							text : "通信时间",
							width : 120,
							dataIndex : 'COMM_TIME',
							align : 'center',
							sortable : false
						}, {
							text : "通信方式",
							width : 80,
							dataIndex : 'CTRL_CODE',
							align : 'center',
							sortable : false
						}, {
							text : "报文内容",
							width : 120,
							dataIndex : 'MESSAGE',
							align : 'center',
							sortable : false
						}, {
							text : "来源地址",
							width : 120,
							dataIndex : 'FROM_ADDR',
							align : 'center',
							sortable : false
						}, {
							text : "目的地址",
							width : 120,
							dataIndex : 'TO_ADDR',
							align : 'center',
							sortable : false
						}],
 				 dockedItems: [{
				        xtype: 'pagingtoolbar',
				        store: Ext.data.StoreManager.lookup('tmnlMsgLogStoreId'),   
				        dock: 'bottom',
				        displayInfo: true
				    }]	
			});
			Ext.getCmp('tmnlMsgLogGridId').removeAll();
			Ext.getCmp('tmnlMsgLogGridId').add(tmnlMsgGrid);
			Ext.getCmp('tmnlMsgLogGridId').doLayout();
			}
		
		var button;
		var alarmDate;
		var terminalAddr;
		var areaCode;
//		var selectExcepion = Ext.getCmp('abnormalGridId').getSelectionModel().getSelection()[0];
		
			var eventshow = Ext.create('Ext.Button', {
			id : 'eventshow',
			text : '终端事件明细',
			handler : function() {
				button = 'eventshow';
				var selectExcepion = Ext.getCmp('abnormalGridId').getSelectionModel().getSelection()[0];
//				alarmDate = selectExcepion.get("ALARM_DATE");
				alarmDate = selectExcepion.data["ALARM_DATE"];
				terminalAddr = selectExcepion.data["TERMINAL_ADDR"];
				areaCode = selectExcepion.data["AREA_CODE"];
				eventShow(alarmDate,terminalAddr,areaCode);
			}
		});

	var messageshow = Ext.create('Ext.Button', {
				id : 'messageshow',
				text : '报文过多明细',
				handler : function() {
					button = 'messageshow';
					var selectExcepion = Ext.getCmp('abnormalGridId').getSelectionModel().getSelection()[0];
					alarmDate = selectExcepion.data["ALARM_DATE"];
					terminalAddr = selectExcepion.data["TERMINAL_ADDR"];
					tmnlMessage(alarmDate,terminalAddr);
				}
			});
		var appointDate = Ext.create('Ext.Button',{
	    width:50,
		text: '<img src="./images/sercher.png" style="width: 20px;height: 20px">',
	    handler: function() {
	 		var selectExcepion = Ext.getCmp('abnormalGridId').getSelectionModel().getSelection();
	 		terminalAddr = selectExcepion[0].get('TERMINAL_ADDR');
	 		areaCode = selectExcepion[0].get('AREA_CODE');
	    	if(Ext.isEmpty(selectExcepion)){
	    		Ext.Msg.alert('提示', '请选择异常事件');
	    		return;
	    	}
	    	  var appointDateDataInfoPanel1 =  Ext.create('Ext.panel.Panel',{
				border : false,
				height:40,
				region:'north',
				layout:'fit',
				items:[{
					margin : '5 0 0 10',
			        xtype: 'radiogroup',
			        hideLabel: true,
			        columns: 2,
					vertical: true,
					id:'dateDataPanel1Radio',
			        items: [
			            { boxLabel: '异常发生日期', name: 'rb', inputValue: '1', checked: true,
			            	 listeners: {
			            	 	change:function(t,newValue,oldValue,e){
			            	 			if(newValue=='1'){
			            	 				Ext.getCmp('dateDataRadioGroup').setDisabled(false);
			            	 				Ext.getCmp('dateDataField').setDisabled(true);
			            	 			}
			            	 			else{
			            	 				Ext.getCmp('dateDataRadioGroup').setDisabled(true);
			            	 				Ext.getCmp('dateDataField').setDisabled(false);
			            	 			}
			            	 		}
			            	 }
			            },
			            { boxLabel: '指定查询日期', name: 'rb', inputValue: '2'}
			        ]
			    }]
			});
			
			var appointDateDataInfoPanel2 =  Ext.create('Ext.panel.Panel',{
				border : false,
				region:'center',
				layout:'column',
   	            items:[{
	   	            columnWidth:.5,
	   	            height:150,
	   	            margin : '10 10 10 10',
	   	            items:[{
	   	            	id:'dateDataRadioGroup',
				        xtype: 'radiogroup',
				        columns: 1,
				        vertical: true,
				        hideLabel: true,
				        layout:'fit',
				        items: []
	   	            }]
   	            },{
   	            	columnWidth:.5,
   	            	border : false,
	   	            items:[{
	   	            	id:'dateDataField',
	   	            	xtype:'datefield',
	   	            	hideLabel: true,
	   	            	width : 100,
						value : new Date(),
						format : 'Y-m-d',
						margin : '10 20 10 10',
						disabled:true
	   	            },{
	   	                xtype:'button',
	   	                width:70,
	   	                text: '查询',
	   	                margin : '50 0 0 40',
	   	                handler: function() {
	   	                	var cc=Ext.getCmp('dateDataPanel1Radio').getValue();
	   	                	if(cc.rb=='1'){
	   	                		var dd=Ext.getCmp('dateDataRadioGroup').getValue();
	   	                		if(Ext.isEmpty(dd)){
	   	                			Ext.Msg.alert('提示', '请选择异常发生日期');
	    							return;
	   	                		}
	   	                		if (button == 'eventshow') {
	   	                			eventShow(dd.dateList,terminalAddr,areaCode);
	   	                		} else if(button == 'messageshow'){
	   	                			tmnlMessage(dd.dateList,terminalAddr);
	   	                		}
//	   	                		Ext.data.StoreManager.lookup('tmnlMsgLogStoreId').load({
//  							  		params:	{
//  							  				'queryItems.terminal_addr' : terminalAddr,
//  							  				'queryItems.alarmTime':dd.dateList}
//  							  })
	   	                		//queryElectroExceptionInfo(selectExcepion[0],dd.dateList);
	   	                	}
	   	                	else{
	   	                		if (button == 'eventshow') {
	   	                			eventShow(Ext.getCmp('dateDataField').getRawValue(),terminalAddr,areaCode);
	   	                		} else if(button == 'messageshow'){
	   	                			tmnlMessage(Ext.getCmp('dateDataField').getRawValue(),terminalAddr);
	   	                		}
//	   	                		Ext.data.StoreManager.lookup('tmnlMsgLogStoreId').load({
//  							  		params:	{
//  							  				'queryItems.terminal_addr' : terminalAddr,
//  							  				'queryItems.alarmTime':Ext.getCmp('dateDataField').getRawValue()}
//  							  })
	   	                		//queryElectroExceptionInfo(selectExcepion[0],Ext.getCmp('dateDataField').getRawValue());
	   	                	}
	   	                	win.close();
	   	                }
	   	            },{
	   	                  xtype:'button',
		   	              width:70,
		   	              text: '退出',
		   	              margin : '10 0 0 40',
		   	              handler: function() {
		   	                	win.close();
		   	           }
	   	            }]
   	            }]
			});
			
		   var dateList = selectExcepion[0].get('SAVE_EXCEPT_DATE').split(',','-1');
	       var flag=1;
	       if(dateList.length==1 && dateList[0]==''){
	       	  flag=0;
	       }
	       if(flag==1){
			   for(var i=0;i<dateList.length;i++){
			   	    var  elecDate = dateList[i].replace("/","-");
			   	    elecDate = elecDate.replace("/","-");
			   	    if(i==0){
			   	    	
				    	Ext.getCmp('dateDataRadioGroup').add({
				    		boxLabel: elecDate, name: 'dateList', inputValue: elecDate, checked: true,width:100
				    	});
			   	    }
			   	    else{
			   	    	Ext.getCmp('dateDataRadioGroup').add({
				    		boxLabel: elecDate, name: 'dateList', inputValue: elecDate,width:100
				    	});
			   	    }
			   }
	       }
			 var win = Ext.create('Ext.window.Window', {
			       modal:true,
			       height:250,
			       width:300,
				   resizable:false,
			       title:'切换日期',
			       layout:'border',
			       items:[appointDateDataInfoPanel1,appointDateDataInfoPanel2]
			});
			win.show();
	    	}})
//	    	Panel
			Ext.define("TaskFlow.tmnlMsgLogGrid",{
			  	extend    : "Ext.panel.Panel",
			  	id : 'tmnlMsgLogGridId',
				border : false,
				viewConfig : {
					trackOver : false
				},
				tbar:['-',eventshow,'-',messageshow,{xtype: 'tbfill'},'-',appointDate],
				items :[],
				query: function (record) {
//					Ext.getCmp('tmnlMsgLogGridId').removeAll();
//					var record = Ext.getCmp('abnormalGridId').getSelectionModel().getSelection()[0];
//					alarmDate,terminalAddr
					terminalAddr = record.data["TERMINAL_ADDR"]
		  			alarmDate = record.data["ALARM_DATE"]
					tmnlMessage(alarmDate,terminalAddr);
 				 }
		})
			//异常信息
//			var tmnlMsgLogGrid1 = Ext.create('Ext.grid.Panel', {
			Ext.define("TaskFlow.tmnlMsgLogGrid1",{
				id : 'tmnlMsgGridId',
			  	extend    : "Ext.grid.Panel",
				loadMask : true,
				selModel : Ext.create('Ext.selection.CheckboxModel'),
				//region : 'center',
				border : true,
//				height:280,
				store : Ext.data.StoreManager.lookup('tmnlMsgLogStoreId'), 
				//verticalScrollerType : 'paginggridscroller',
				//invalidateScrollerOnRefresh : false,
				viewConfig : {
					trackOver : false
				},
//				tbar:['-',eventshow,'-',messageshow,{xtype: 'tbfill'},'-',appointDate],
				columnLines : true,
				columns :  [{
							text : "终端地址",
							width : 120,
							dataIndex : 'TERMINAL_ADDR',
							align : 'center',
							sortable : false
						}, {
							text : "通信时间",
							width : 120,
							dataIndex : 'COMM_TIME',
							align : 'center',
							sortable : false
						}, {
							text : "通信方式",
							width : 80,
							dataIndex : 'CTRL_CODE',
							align : 'center',
							sortable : false
						}, {
							text : "报文内容",
							width : 120,
							dataIndex : 'MESSAGE',
							align : 'center',
							sortable : false
						}, {
							text : "来源地址",
							width : 120,
							dataIndex : 'FROM_ADDR',
							align : 'center',
							sortable : false
						}, {
							text : "目的地址",
							width : 120,
							dataIndex : 'TO_ADDR',
							align : 'center',
							sortable : false
						}],
//						 initComponent : function() {
//							  var me = this;    
//							  me.callParent();
//							  },
//						query: function (record) {
//  							  Ext.data.StoreManager.lookup('tmnlMsgLogStoreId').load({
//  							  		params:	{'queryItems.terminal_addr' : record.data["TERMINAL_ADDR"],
//  							  				'queryItems.alarmTime':record.data["ALARM_DATE"]}
//  							  })
// 				 }
// 				 ,
 				 dockedItems: [{
				        xtype: 'pagingtoolbar',
				        store: Ext.data.StoreManager.lookup('tmnlMsgLogStoreId'),   
				        dock: 'bottom',
				        displayInfo: true
				    }]	
			});

			
//			终端事件
			function eventShow(alarmDate,terminalAddr,areaCode){
				Ext.define('tmnlEventModel', {
					extend : 'Ext.data.Model',
					fields : ["EVENT_TIME","EVENT_NAME","RECEIVE_TIME","TERMINAL_ADDR","FROM_TYPE"]
			});
			
			var tmnlEventStore =   Ext.create('Ext.data.Store', {
//			Ext.create('Ext.data.Store',{
				//extend  : "Ext.data.Store",
				storeId :'tmnlEventStoreId',
				model : 'tmnlEventModel',
				remoteSort : true,
//				proxy : new Ext.data.MemoryProxy()
				buffered: true,
				pageSize : 30,
				proxy : {
					type : 'ajax',
					url : 'taskFlowAction!queryTmnlEvent.action',
					extraParams: {
						'queryItems.terminal_addr' : terminalAddr,
		  				'queryItems.alarmTime': alarmDate,
		  				'queryItems.areaCode': areaCode
		            },
					reader : {
						type : 'json',
						root : 'tmnlEventList',
						totalProperty : 'totalCount'
					}
				}
				,autoLoad : true
		});
		var tmnlEventGrid =   Ext.create('Ext.grid.Panel', {
//		Ext.define("TaskFlow.tmnlEventGrid1",{
				id : 'tmnlEventId',
			  	extend    : "Ext.grid.Panel",
				loadMask : true,
				selModel : Ext.create('Ext.selection.CheckboxModel'),
				//region : 'center',
				border : true,
//				height:280,
				store : Ext.data.StoreManager.lookup('tmnlEventStoreId'), 
				viewConfig : {
					trackOver : false
				},
//				tbar:['-',eventshow,'-',messageshow,{xtype: 'tbfill'},'-',appointDate],
				columnLines : true,
				columns :  [ {
							text : "终端地址",
							width : 120,
							dataIndex : 'TERMINAL_ADDR',
							align : 'center',
							sortable : false
						}, {
							text : "事件名称",
							width : 120,
							dataIndex : 'EVENT_NAME',
							align : 'center',
							sortable : false
						}, {
							text : "事件时间",
							width : 80,
							dataIndex : 'EVENT_TIME',
							align : 'center',
							sortable : false
						}, {
							text : "接收时间",
							width : 120,
							dataIndex : 'RECEIVE_TIME',
							align : 'center',
							sortable : false
						}, {
							text : "测量点号",
							width : 120,
							dataIndex : 'FROM_TYPE',
							align : 'center',
							sortable : false
						}],
 				 dockedItems: [{
				        xtype: 'pagingtoolbar',
				        store: Ext.data.StoreManager.lookup('tmnlEventStoreId'),   
				        dock: 'bottom',
				        displayInfo: true
				    }]	
			});
			Ext.getCmp('tmnlMsgLogGridId').removeAll();
			Ext.getCmp('tmnlMsgLogGridId').add(tmnlEventGrid);
			Ext.getCmp('tmnlMsgLogGridId').doLayout();
			}



