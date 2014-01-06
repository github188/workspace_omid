Ext.onReady(function() {
			Ext.define('orgCo', {
						extend : 'Ext.data.Model',
						fields : [{
									name : 'ORG_NO',
									type : 'string'
								}, {
									name : 'ORG_NAME',
									type : 'string'
								}, {
									name : 'ORG_TYPE',
									type : 'string'
								}]
					});
			var orgStore = Ext.create('Ext.data.Store', {
				model : 'orgCo',
				proxy : {
					type : 'ajax',
					url : 'DefinenotSendAction!queryOrgNolist.action',
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
							Ext.getCmp('orgcompany').setValue('34101');
						}
					});
var msgSendStatus = Ext.create('Ext.data.Store', {
    fields: ['sendStatusCode', 'sendStatus'],
    data : [
        {"sendStatusCode":"0", "sendStatus":"待发送"},
        {"sendStatusCode":"1", "sendStatus":"正在发送"},
        {"sendStatusCode":"2", "sendStatus":"发送成功"},
        {"sendStatusCode":"3", "sendStatus":"发送失败"}
    ]
});

var msgSendWay = Ext.create('Ext.data.Store', {
    fields: ['sendWayCode', 'sendWay'],
    data : [
        {"sendWayCode":"1", "sendWay":"短信发送模板"},
        {"sendWayCode":"2", "sendWay":"异常消息订阅"},
        {"sendWayCode":"3", "sendWay":"自定义短信"},
        {"sendWayCode":"4", "sendWay":"终端装接调试"},
        {"sendWayCode":"5", "sendWay":"预购电（自动）"},
        {"sendWayCode":"6", "sendWay":"远程费控（自动）"},
        {"sendWayCode":"7", "sendWay":"有序用电（自动）"}
    ]
});


			var orgCompany = Ext.create('Ext.form.ComboBox', {
						fieldLabel : '供电公司',
						labelWidth:55,
						name : 'orgcompany',
						id : 'orgcompany',
						store : orgStore,
						queryMode : 'local',
						displayField : 'ORG_NAME',
						valueField : 'ORG_NO',
						width:180,
						margin : '10 20 10 10'
					});
			var msgStatus = Ext.create('Ext.form.ComboBox', {
						fieldLabel : '发送状态',
						labelWidth:55,
						name : 'sendstatus',
						id : 'sendstatus',
						store : msgSendStatus,
						queryMode : 'local',
						displayField : 'sendStatus',
						valueField : 'sendStatusCode',
						emptyText : '----请输入----',
						blankText : '----请输入----',
						width:180,
						margin : '10 20 10 10'
					});
			var msgMay = Ext.create('Ext.form.ComboBox', {
						fieldLabel : '发送方式',
						labelWidth:55,
						name : 'msgsendway',
						id : 'msgsendway',
						store : msgSendWay,
						queryMode : 'local',
						displayField : 'sendWay',
						valueField : 'sendWayCode',
						emptyText : '----请输入----',
						blankText : '----请输入----',
						width:180,
						margin : '10 20 10 10'
					});

			var sendPerson = new Ext.form.field.Text({
				name:'sendPerson',
				id : "sendPerson",
				fieldLabel : '发送人',
				labelWidth : 55,
				width : 170,
				margin : '10 20 10 10'
			});
			
			var dateField1=Ext.create('Ext.form.field.Date',{
				fieldLabel:'开始时间',
				format:'Y-m-d',
				labelWidth:55,
				name: 'minDate',
				id:'start_Time',
				width:150,
				value: statQuery.start_date,
				margin : '10 20 10 10'
			});
			var dateField2=Ext.create('Ext.form.field.Date',{
				fieldLabel:'结束时间',
				 format:'Y-m-d',
				labelWidth:55,
				name:'maxDate',
				id:'end_Time',
				width:150,
				value: new Date(),
				margin : '10 20 10 10'
			});
	  var queryBotton = Ext.create('Ext.Button', {
						width : 80,
						text : '查询',
						labelWidth : 55,
						margin : '10 20 10 10',
						handler : function() {
							var startdate=Ext.getCmp('start_Time').getValue().getTime();
							var enddate=Ext.getCmp('end_Time').getValue().getTime();
							if(startdate>enddate){
								 Ext.Msg.alert('提示','开始时间不能大于结束时间');
							}
							msgSendListStore.proxy.extraParams={
											'queryItems.orgcompany' : Ext
													.getCmp('orgcompany')
													.getValue(),
											'queryItems.sendstatus' : Ext
													.getCmp('sendstatus')
													.getValue(),
											'queryItems.msgsendway' : Ext
													.getCmp('msgsendway')
													.getValue(),
											'queryItems.start_Time' : Ext
													.getCmp('start_Time')
													.getValue(),
											'queryItems.end_Time' : Ext
													.getCmp('end_Time')
													.getValue(),
											 'queryItems.sendPerson' : Ext
													.getCmp('sendPerson')
													.getValue()
							}
							msgSendListStore.load();
                         }
					})
			var  msgSendQuery=Ext.create('Ext.panel.Panel',{
			     border : false,
				 layout:'column',
				 y:7,
				 items:[{
				 	       columnWidth : 0.19,
						    border : false,
							items : [orgCompany]
						 },
						 {
				 	       columnWidth : 0.19,
							border : false,
							items : [msgStatus]
						 },
						 {
				 	       columnWidth : 0.19,
							border : false,
							items : [msgMay]
						 },
						  {
				 	       columnWidth : 0.19,
							border : false,
							items : [sendPerson]
						 }
				       ]
			});
			var msgSendTime=Ext.create('Ext.panel.Panel',{
			    border : false,
				layout:'column',
				items:[{
				 	 columnWidth:0.15,
				 	 border:false,
				 	 items:[dateField1]
				 },{ 
				     columnWidth:0.15,
				 	 border:false,
				 	 items:[dateField2]
				 },
				 {
				     columnWidth:0.15,
				 	 border:false,
				 	 x:380,
				 	 items:[queryBotton]
				 }]
			});
		var msgPanel=Ext.create('Ext.panel.Panel',{
			border : true,
			region : 'north',
			height : 90,
			items:[msgSendQuery,msgSendTime]
		
		})
//短信明细面板
	  Ext.define('Event', {
						extend : 'Ext.data.Model',
						fields : ["ORG_NAME", "CONS_NO", "CONS_NAME",
								"USER_NAME", "CONTACT_MODE", "MOBILE_NO",
								"SEND_CONTENT", "SEND_STAFF_NO", "SEND_DATE",
								"SEND_MODE","SEND_STATUS","SEND_COUNTS"]
					});

	var msgSendListStore = Ext.create('Ext.data.Store', {
				model : 'Event',
				remoteSort : true,
				pageSize : DEFAULT_PAGE_SIZE,
				proxy : {
					type : 'ajax',
					url : 'DefinenotSendAction!msgSendQuery.action',
					reader : {
						type : 'json',
						root : 'resultList',
						totalProperty : 'totalCount'
					}
				}
			});

	var selfDeMsgConsGrid = Ext.create('Ext.grid.Panel', {
				title : '短信明细面板',
				loadMask : true,
				region : 'center',
				border : true,
				store : msgSendListStore,
				viewConfig : {
					trackOver : false
				},
				columnLines : true,
				columns : [Ext.create('Ext.grid.RowNumberer', {
						header : '序号',
						width : 30
						}),{
							text : "供电单位",
							width : 90,
							dataIndex : 'ORG_NAME',
							align : 'center',
							sortable : true
						}, {
							text : "用户编号",
							width : 90,
							dataIndex : 'CONS_NO',
							align : 'center',
							sortable : false
						}, {
							text : "用户名称",
							width : 90,
							dataIndex : 'CONS_NAME',
							align : 'center',
							sortable : false
						}, {
							text : "联系人",
							width : 90,
							dataIndex : 'USER_NAME',
							align : 'center',
							sortable : false
						},{
						    text : "联系人类型",
							width : 90,
							dataIndex : 'CONTACT_MODE',
							align : 'center',
							sortable : false,
					renderer:function(value){
		   				  if('01'==value)
				   			return "电气联系人";
				   		  else if('02'==value)
				   			return "账务联系人";
				   		  else if('03'==value)
				   			return "停送电联系人";
			   			  else if('04'==value)
				   			return "法人联系人";	
			   			  else if('05'==value)
				   			return "委托代理联系人";	
				   		  else 
				   		     return "";
		   			}},{
						    text : "手机号码",
							width : 90,
							dataIndex : 'MOBILE_NO',
							align : 'center',
							sortable : false
						},{
						    text : "发送内容",
							width : 90,
							dataIndex : 'SEND_CONTENT',
							align : 'center',
							sortable : false
						},{
						    text : "发送人",
							width : 90,
							dataIndex : 'SEND_STAFF_NO',
							align : 'center',
							sortable : false
						},{
						    text : "发送时间",
							width : 90,
							dataIndex : 'SEND_DATE',
							align : 'center',
							sortable : false
						},{
						    text : "发送方式",
							width : 90,
							dataIndex : 'SEND_MODE',
							align : 'center',
							sortable : false,
					   renderer:function(value){
		   				  if('1'==value)
				   			return "短信发送模板";
				   		  else if('2'==value)
				   			return "异常消息订阅";
				   		  else if('3'==value)
				   			return "自定义短信";
			   			  else if('4'==value)
				   			return "终端装接调试";
				   		  else if('5'==value)
				   			return "预购电（自动）";	
				   		  else if('6'==value)
				   			return "远程费控（自动）";	
				   		else if('7'==value)
				   			return "有序用电（自动）";	
				   		  else 
				   		     return "";
		   			}
						},{
						    text : "发送状态",
							width : 90,
							dataIndex : 'SEND_STATUS',
							align : 'center',
							sortable : false,
					renderer:function(value){
		   				  if('0'==value)
				   			return "待发送";
				   		  else if('01'==value)
				   			return "正在发送";
				   		  else if('02'==value)
				   			return "发送成功";
			   			  else if('03'==value)
				   			return "发送失败";	
				   		  else 
				   		     return "";
		   			}
						},{
						    text : "发送次数",
							width : 90,
							dataIndex : 'SEND_COUNTS',
							align : 'center',
							sortable : false
						}],
				dockedItems : [{
							xtype : 'pagingtoolbar',
							store : msgSendListStore,
							dock : 'bottom',
							displayInfo : true
						}]
			});
		var magSendPanel=Ext.create('Ext.panel.Panel',{
			   layout:'border',
			   border : false,
			   items:[msgPanel,selfDeMsgConsGrid]
		});
			
			
renderModel(magSendPanel, '短信发送查询');
		})