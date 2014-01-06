Ext.onReady(function(){
//	var LOGGEDORGNO='34101';
	var selectOrgNo=LOGGEDORGNO;
	var SUBSCRIBE_ID_TEMP;
//--------------------订阅单位数据-----------------------
	Ext.define('orgSt', {
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
		model : 'orgSt',
		proxy : {
			type : 'ajax',
			url : './MsgSubscribeManageAction!queryOrgNolist.action',
			reader : {
				root : 'orgList',
				type : 'json'
			}
		}
	});
	orgStore.load({
			params : {
				orgNo : LOGGEDORGNO 
			},
			callback: function(records, operation, success) {
				Ext.getCmp('eleAbnolOrgValue1').setValue(LOGGEDORGNO);
			}
		});
//---------------------订阅单位----------------------------
	var orgNameField = Ext.create('Ext.form.field.ComboBox',{
		fieldLabel : '订阅单位',
		name : 'eleAbnolOrgValue',
		id : 'eleAbnolOrgValue1',
		queryMode: 'local',
		labelSeparator:'',
		store : orgStore,
	    displayField : 'ORG_NAME',
		valueField : 'ORG_NO',
		emptyText : '----请输入----',
		blankText : '----请输入----',
		width:130,
		labelAlign : 'right'
		
	});
//------------------订阅类型数据------------------------
	var subTypeStore = new Ext.data.JsonStore({
		proxy: {
	        type: 'ajax',
	        url: './MsgSubscribeManageAction!querySubsType.action',
	        reader: {
	            type: 'json',
	            root: 'resultList'
	        }
	    },
	    fields : ['SUBS_TYPE_CODE','SUBS_TYPE_CODE_NAME']
    });
    
	var subTypeCombox = Ext.create('Ext.form.field.ComboBox',{
			id:'subTypeCombox',
			name : 'subTypeCombox',
			fieldLabel:'订阅类型',
		    width:120,
		    queryMode : "local",
			labelSeparator:'',
			forceSelection : true,
			triggerAction : 'all',
			selectOnFocus : true,
			labelAlign : 'right',
			store : subTypeStore,
			displayField : 'SUBS_TYPE_CODE_NAME',
		    valueField : 'SUBS_TYPE_CODE',
		    editable : false,
		    value:'-1'
	});
	 subTypeStore.load({
    	callback : function(recs, options, success) {
			if(success){
				var idArray= [];
                var ii={
                    'SUBS_TYPE_CODE':'-1',
                    'SUBS_TYPE_CODE_NAME':'全部'
                };
                idArray.push(ii);
				subTypeStore.add(idArray);
				Ext.getCmp('subTypeCombox').setValue('-1');
				
			}
		}
	 });

	
	//发送范围store	
	var data_sendUserLimit= [['-1','全部'],['01','对指定用户'],['02','对所有用户']];
	var ds_sendUserLimit = new Ext.data.SimpleStore({
			fields : ['limitCode', 'limitName'],
			data : data_sendUserLimit
		}); 	
	var sendRangeCombox = Ext.create('Ext.form.field.ComboBox',{
			id:'sendRangeCombox',
			name:'sendRangeCombox',
			fieldLabel:'发送范围',
		    width:120,
			mode : "local",
			labelSeparator:'',
			forceSelection : true,
			triggerAction : 'all',
			selectOnFocus : true,
			labelAlign : 'right',
			store : ds_sendUserLimit,
			displayField : 'limitName',
		    valueField : 'limitCode',
		    editable : false,
		    value:'-1'
	});
	
	var msgSubConditionPanel1 = Ext.create('Ext.panel.Panel',{
		    region:'north',
			border:false,
			height:40,
			layout:'table',
			layoutConfig : {
				columns :4
		    },
		    defaults: {height: 30},
			viewConfig : {
				forceFit : false
			},
		    
		    bodyStyle : 'padding:10px 0px 0px 0px',
			items:[{
				border : false,
			    width:230,
			    layout:'fit',
		 	    labelAlign:'right',
				labelWidth : 70,		 	    
				items:[orgNameField]	
			},{
				border:false,
			    width:220,
			    layout:'fit',
		 	    labelAlign : 'right',
				labelWidth : 70,		 	
				items:[subTypeCombox]	
			},{
				border : false,
			    width:220,
			    layout:'fit',
		 	    labelAlign : 'right',
				labelWidth : 70,		 	    
				items:[sendRangeCombox]	
			},{
				border : false,
			    width:70,
			    layout:'fit',
		 	    labelAlign : 'right',
				labelWidth : 70,
			    x:80,
			   	y:-5,
				height:25,
				items:[{
			   	    xtype:'button',
			   	    width:80,
			   	    text:'查询',
			   	    handler:function(){
			   	    	msgSubStore.proxy.extraParams = {
								'queryItems.orgNo': Ext.getCmp('eleAbnolOrgValue1').getValue(),
								'queryItems.subsTypeCode' : Ext.getCmp('subTypeCombox').getValue(),
								'queryItems.sendUserLimit':Ext.getCmp('sendRangeCombox').getValue()
								};
						msgSubStore.load( {
								params : {
									'queryItems.start' : 0,
									'queryItems.limit' : DEFAULT_PAGE_SIZE
								}
						});
		            }
			   	 }]	
			}]
		});
		
   //------------------------短信订阅明细表格-----------------
	Ext.define('msgSub',{
		extend : 'Ext.data.Model',
		fields : [
		   "SUBSCRIBE_ID",
		   "ORG_NO",
		   "ORG_NAME",
		   "SUBSCRIBE_NAME",
		   "SUBS_TYPE_CODE",
		   "SUBS_TYPE_CODE_NAME",
		   "SEND_USER_LIMIT",
		   "START_DATE",
		   "END_DATE",
		   "SEND_TIME_S",
		   "SEND_TIME_E",
		   "STAFF_NO",
		   "CREATE_DATE" 
		   ]
	});
	
	var msgSubStore = Ext.create('Ext.data.Store',{
		id:'msgSubStore',
		model:'msgSub',
		proxy : {
			type : 'ajax',
			url:'./MsgSubscribeManageAction!querySmsScribeInfo.action',
			reader : {
						type : 'json',
						root : 'resultList'
					}
				}
			});	
	
	var msgSubGrid = Ext.create('Ext.grid.Panel',{
			id:'msgSubGrid',
		    title:'短信订阅明细',
			stripeRows: true,
			store : msgSubStore,
			loadMask:true,
			viewConfig : {
				forceFit : false
			},
			columnLines : true,
			anchor:'right 50%',
			columns:[{text :'操作',dataIndex:'',sortable:false,align:'center',
				renderer: function(s, m, rec){
						return "<a href='javascript:'onclick='editMsgSub(\""
							+ rec.get('SUBSCRIBE_ID')+ "\",\""
							+ rec.get('SUBSCRIBE_NAME') + "\",\""
							+ rec.get('SUBS_TYPE_CODE')+ "\",\""
							+ rec.get('START_DATE') + "\",\""
							+ rec.get('END_DATE')+ "\",\""
							+ rec.get('SEND_TIME_S')+ "\",\""
							+ rec.get('SEND_TIME_E')
							+ "\");'>"
                            +"<font color='green';font-weight:bold>[编辑]</font></a>"
                            + "&nbsp;&nbsp;"
                            +"<a href='javascript:'onclick='cancelMsgSub(\""
							+ rec.get('SUBSCRIBE_ID')
							+ "\");'>"
                            +"<font color='green';font-weight:bold>[注销]</font></a>";
	  		}
				},
			    {text:'供电单位',
			    dataIndex:'ORG_NAME',
			    sortable:false,
			    align:'center'},
			    {text:'订阅名称',dataIndex:'SUBSCRIBE_NAME',sortable:false,align:'center'},
			    {text:'订阅类型',dataIndex:'SUBS_TYPE_CODE_NAME',sortable:false,align:'center'}, 
			    {text:'短信发送范围',dataIndex:'SEND_USER_LIMIT',sortable:false,align:'center',
			    	renderer : function(val) {
		    	 	if('01'==val){
						return '指定用户';
					}
					else if('02'==val){
						return '所有用户';
					}}
			    },
			    {text:'开始日期',dataIndex:'START_DATE',sortable:false,align:'center'},
			    {text:'结束日期',dataIndex:'END_DATE',sortable:false,align:'center'},
			    {text:'发送开始时间',dataIndex:'SEND_TIME_S',sortable:false,align:'center'},
			    {header:'发送结束时间',dataIndex:'SEND_TIME_E',sortable:false,align:'center'},
			    {header:'创建人',dataIndex:'STAFF_NO',sortable:false,align:'center'},
	    		{header:'创建时间',dataIndex:'CREATE_DATE',sortable:false,align:'center'}		
				],
			    dockedItems: [{       
			        xtype: 'pagingtoolbar',
			        store: msgSubStore,   
			        dock: 'bottom',
				    displayInfo: true
			    }]
			    ,
				listeners : {
					select : function(model, r, index,e) {
								SUBSCRIBE_ID_TEMP = r.get('SUBSCRIBE_ID');
				      			msgSubscribeObjStore.proxy.extraParams = {
				      						id: r.get('SUBSCRIBE_ID')
				      							};
								msgSubscribeObjStore.load( {
									params : {
										start : 0,
										limit : DEFAULT_PAGE_SIZE
									}
								});
				      		},
				    rowdeselect: function(model, r, index,e) {
				      			msgSubscribeObjStore.removeAll();
				      			contactDefStore.removeAll();
				      		}
			}
	});	
		Ext.define('msgSubscribeObjStoreModel',{
			extend : 'Ext.data.Model',
			fields : [
					   "RECORD_ID",
     				   "SUBSCRIBE_ID",
					   "EVENT_NO",
					   "EVENT_NAME",
					   "EVENT_SRC",
					   "EVENT_SRC_NAME",
					   "STAFF_NO_ID",
					   "STAFF_TEMPLATE_ID",
					   "CONS_NO_ID",
					   "CONS_TEMPLATE_ID",
					   "DEFINE_USER_ID",
					   "DEF_TEMPLATE_ID",
					   "STAFF_TEMPLATE_NAME",
					   "CONS_TEMPLATE_NAME",
					   "DEF_TEMPLATE_NAME"
				   ]
		});
	var msgSubscribeObjStore = Ext.create('Ext.data.Store',{
		model:'msgSubscribeObjStoreModel',
		remoteSort : true,
		proxy : {
			type : 'ajax',
			url:'./MsgSubscribeManageAction!querySmsScribeObj.action',
			reader : {
					type : 'json',
					root : 'resultList'
					}
			}
	});
//--------------------------订阅对象表格----------------------
	var msgSubscribeObjGrid = Ext.create('Ext.grid.Panel',{
		id:'msgSubscribeObjGrid',
	    title:'订阅对象',
	    stripeRows: true,//显示斑马线，在表格中。
	    store : msgSubscribeObjStore,
		loadMask:true,
		height:200,
		viewConfig : {
			forceFit : false
		},
		columnLines : true,
		widht:.5,
		columns:[
				  {header:'操作',dataIndex:'',sortable:false,align:'center',
	    	renderer: function(s, m, rec){
						return "<a href='javascript:'onclick='deleteEventSub(\""
							+ rec.get('RECORD_ID')
							+ "\");'>"
                            +"<font color='green';font-weight:bold>[删除]</font></a>";
	  		}},
	   {header:'事件编号',dataIndex:'EVENT_NO',sortable:false,align:'center'},
	   {header:'事件名称',dataIndex:'EVENT_NAME',sortable:false,align:'center'},
	   {header:'事件来源',dataIndex:'EVENT_SRC_NAME',sortable:false,align:'center'},
	   {header:'主站操作人员',dataIndex:'STAFF_NO_ID',sortable:false,align:'center'},
	   {header:'短信模板',dataIndex:'STAFF_TEMPLATE_NAME',sortable:false,align:'center',
	      		renderer: function(s, m, rec){
	      			if(!Ext.isEmpty(s)){
						return "<a href='javascript:'onclick='querySmsTemplateContentWinShow(\""
							+ rec.get('STAFF_TEMPLATE_ID')
							+ "\");'>"+s+"</a>";
	      			}
  		  		}},
	   {header:'用户联系人',dataIndex:'CONS_NO_ID',sortable:false,align:'center',
	   			renderer:function(value){
	   				var userName = '';
	   				var userNo = value.split("[").toString().split("]").toString().split("\"").toString().split(",");
	   				for( var i = 0;i<=userNo.length;i++)
	   				{
		   				if('01' == userNo[i]){
		   					userName += '电气联系人,'
		   				}
	   					if('02' == userNo[i]){
	   						userName += '财务联系人,'
	   					}
	   					if('03' == userNo[i]){
	   						userName += '停送电联系人,'
	   					}
	   				}
	   				return userName.substr(0,(userName.length-1));
	   			}
	   },
	   {header:'短信模板',dataIndex:'CONS_TEMPLATE_NAME',sortable:false,align:'center',
			    renderer: function(s, m, rec){
			      			if(!Ext.isEmpty(s)){
								return "<a href='javascript:'onclick='querySmsTemplateContentWinShow(\""
									+ rec.get('CONS_TEMPLATE_ID')
									+ "\");'>"+s+"</a>";
			      			}
		  		  		}},
		{header:'自定义联系人',dataIndex:'DEFINE_USER_ID',sortable:false,align:'center'},
		{header:'短信模板',dataIndex:'DEF_TEMPLATE_NAME',sortable:false,align:'center',
		   renderer: function(s, m, rec){
		      			if(!Ext.isEmpty(s)){
							return "<a href='javascript:'onclick='querySmsTemplateContentWinShow(\""
								+ rec.get('DEF_TEMPLATE_ID')
								+ "\");'>"+s+"</a>";
		      			}
	  		  		}
		}
	   ],
			tbar : [
					{xtype: 'tbfill'},
				{
					xtype: 'button',
					iconCls: 'plus',
					text:'添加事件',
					handler:function(){
						var record =  msgSubGrid.getSelectionModel().getSelection();
				    	if(Ext.isEmpty(record)){
							Ext.MessageBox.alert("提示", "请选择订阅！");
							return;
	    				}
	    				addSubscribeId=record[0].get('SUBSCRIBE_ID');
	    				sendUserLimit=record[0].get('SEND_USER_LIMIT');
	    				openTab({title:'添加订阅事件', url:'./systMan/addSubscribeEvent.jsp'});
					}
				}
		],
		dockedItems: [{             
			        xtype: 'pagingtoolbar',
			        store: msgSubscribeObjStore,   
			        dock: 'bottom',
				    displayInfo: true
			    }]
		
	});

	Ext.define('contactDefStoreModel',{
				extend : 'Ext.data.Model',
				fields : [
					   "ORG_NO",
					   "ORG_NAME",
					   "CONS_NO",
//					   "SUBSCRIBE_ID",
					   "CONS_NAME",
					   "ELEC_ADDR",
					   "LINE_NAME",
					   "TG_NAME",
					   "MR_SECT_NO",
					   "RUN_CAP"
				]
	});
	var contactDefStore = Ext.create('Ext.data.Store',{
			id:'contactDefStore',
			model:'contactDefStoreModel',
			proxy : {
				type : 'ajax',
				url:'./MsgSubscribeManageAction!querySmsSendObj.action',
				reader : {
							type : 'json',
							root : 'resultList'
						}
				}
		});
	var msgSendObjGrid =Ext.create('Ext.grid.Panel',{
				id : 'msgSendObjGrid',
				border : false,
				title : '指定发送用户',
				stripeRows : true,
				store : contactDefStore,
				loadMask : true,
				height:200,
				viewConfig : {
					forceFit : false
				},
				columnLines : true,
			columns:
			   [
			   {header:'供电单位',dataIndex:'ORG_NAME',sortable:false,align:'center'},
			   {header:'用户编号',dataIndex:'CONS_NO',sortable:false,align:'center'},
//			   {header:'用户编号',dataIndex:'SUBSCRIBE_ID',sortable:false,align:'center'},
			   {header:'用户名称',dataIndex:'CONS_NAME',sortable:false,align:'center'},
			   {header:'用电地址',dataIndex:'ELEC_ADDR',sortable:false,align:'center'},
			   {header:'线路名称',dataIndex:'LINE_NAME',sortable:false,align:'center'},
			   {header:'台区名称',dataIndex:'TG_NAME',sortable:false,align:'center'},
			   {header:'抄表段号',dataIndex:'MR_SECT_NO',sortable:false,align:'center'},
			   {header:'运行容量',dataIndex:'RUN_CAP',sortable:false,align:'center'}
			   ],
			   dockedItems: [{             
			        xtype: 'pagingtoolbar',
			        store: contactDefStore,   
			        dock: 'bottom',
				    displayInfo: true
			    }]
		});
	
	var msgSubDetailPanel = Ext.create('Ext.tab.Panel',{	
		border : false,
		activeTab: 0,
		anchor:'right 50%',
		layout:'anchor',
		items : [msgSubscribeObjGrid,msgSendObjGrid],
		listeners : { 
					tabchange : function(tabPanel,newCard,oldCard,eOpts){
						if(newCard.getId()=='msgSendObjGrid'){
							contactDefStore.removeAll();
							if(!Ext.isEmpty(msgSubscribeObjGrid.getSelectionModel().getSelection()[0])){
								contactDefStore.proxy.extraParams={
								     id:msgSubscribeObjGrid.getSelectionModel().getSelection()[0].get('RECORD_ID')
								};      
								contactDefStore.load({
									params : {
										start : 0,
										limit : DEFAULT_PAGE_SIZE
									}
								});
							}
						}	
					}
				}	
	}); 
	var msgSubPanel2 = Ext.create('Ext.panel.Panel',{
		border : false,
		region:'center',
	    layout:'anchor',
		items:[msgSubGrid,msgSubDetailPanel]
	});	
	var msgSubPanel = Ext.create('Ext.panel.Panel',{
		layout : 'border',
		autoScroll:true,
		border : false,
		items : [msgSubConditionPanel1,msgSubPanel2]
	});
	renderModel(msgSubPanel, '短信订阅管理');
	
	
	
querySmsTemplateContentWinShow =function(sendTypeCode){
//		alert("sendTypeCode="+sendTypeCode);
	    var msgContent =Ext.create('Ext.form.field.TextArea',{
    	    hideLabel : true,
    	    readOnly:true
    	});
    	
		var smsTemplateContentWin = Ext.create('Ext.window.Window',{
			layout:'fit',
			title:'短信模板内容',
	        modal:true,
			width:400,
			height:250,
	     	items:[msgContent]
		});
		
		Ext.Ajax.request({
			url : './MsgSubscribeManageAction!querySmsTemplateContent.action',
			params : {
				id:sendTypeCode
			},
			success : function(response) {
				var result = Ext.decode(response.responseText); 
				msgContent.setValue(result.msgContent);
	    	}
		});
		smsTemplateContentWin.show();
	}

//---------------------操作下面的弹出框（编辑，注销）---------------------
	
	
	
	
	 cancelMsgSub =function(subscribeId){
		  Ext.MessageBox.confirm('提示', '确定注销吗？', doCancelMsgSub);
		  function doCancelMsgSub(btn){
				if(btn=='no') 
	              	return;
	            Ext.Ajax.request({
					url : './MsgSubscribeManageAction!cancelMsgSub.action',
					params : {
						id:subscribeId
					},
					success : function(response) {
						var result = Ext.decode(response.responseText); 
						if(1==result.FLAG){
							msgSubStore.load();
							msgSubscribeObjStore.removeAll();
			      			contactDefStore.removeAll();
						}
						else{
							Ext.MessageBox.alert("提示","注销失败！");
	 	    				return;
						}
			    	}
				});  	
	      }
	}
    editMsgSub = function(subscribeId,subscribeName,subsTypeCode,startDate,endDate,sendTimeS,sendTimeE){
		
    	//供电单位
		var subNameField = new Ext.form.TextField({
			id:'subNameField',
			fieldLabel : '订阅名称',
			labelSeparator : '',
		 	labelAlign : 'right',
		 	labelWidth : 70,
		 	width:100
		});
			
		// 开始日期
		var sendStartDate = Ext.create('Ext.form.field.Date',{
			id:'sendStartDate',
			labelSeparator : '',
		 	labelAlign : 'right',
			format : "Y-m-d",
			width : 100,
			labelWidth:70,
			fieldLabel : '开始日期',
			editable : false
		});
	
		// 结束日期
		var sendEndDate = Ext.create('Ext.form.field.Date',{
			id:'sendEndDate',
			format : "Y-m-d",
			labelSeparator : '',
		 	labelAlign : 'right',
			width : 100,
			labelWidth : 50,
			fieldLabel : '结束日期',
			editable : false
		});
			
		//发送时间store	
		var data_sendTimeH= [['00','00'],['01','01'],['02','02'],['03','03'],['04','04'],['05','05'],['06','06'],['07','07'],['08','08'],['09','09'],
		['10','10'],['11','11'],['12','12'],['13','13'],['14','14'],['15','15'],['16','16'],['17','17'],['18','18'],['19','19'],['20','20'],['21','21'],['22','22'],['23','23']];
		var ds_sendTimeH = new Ext.data.SimpleStore({
				fields : ['sendTimeCode', 'sendTime'],
				data : data_sendTimeH
			}); 
			
		var data_sendTimeM = [['00', '00'], ['01', '01'], ['02', '02'],
						['03', '03'], ['04', '04'], ['05', '05'], ['06', '06'],
						['07', '07'], ['08', '08'], ['09', '09'], ['10', '10'],
						['11', '11'], ['12', '12'], ['13', '13'], ['14', '14'],
						['15', '15'], ['16', '16'], ['17', '17'], ['18', '18'],
						['19', '19'], ['20', '20'], ['21', '21'], ['22', '22'],
						['23', '23'], ['24', '24'], ['25', '25'], ['26', '26'],
						['27', '27'], ['28', '28'], ['29', '29'], ['30', '30'],
						['31', '31'], ['32', '32'], ['33', '33'], ['34', '34'],
						['35', '35'], ['36', '36'], ['37', '37'], ['38', '38'],
						['39', '39'], ['40', '40'], ['41', '41'], ['42', '42'],
						['43', '43'], ['44', '44'], ['45', '45'], ['46', '46'],
						['47', '47'], ['48', '48'], ['49', '49'], ['50', '50'],
						['51', '51'], ['52', '52'], ['53', '53'], ['54', '54'],
						['55', '55'], ['56', '56'], ['57', '57'], ['58', '58'],
						['59', '59']];
		var ds_sendTimeM = new Ext.data.SimpleStore({
				fields : ['sendTimeCode', 'sendTime'],
				data : data_sendTimeM
			}); 	
			
		var sendTimeStartHCombox = Ext.create('Ext.form.ComboBox',{
				fieldLabel:'发送时间',
				name:'sendTimeStartHCombox',
				labelSeparator : '',
		 		labelAlign : 'right',
			    width:50,
			    labelWidth : 70,
				mode : "local",
				forceSelection : true,
				triggerAction : 'all',
				selectOnFocus : true,
				store : ds_sendTimeH,
				displayField : 'sendTime',
			    valueField : 'sendTimeCode',
			    editable : false
		});
		
		var sendTimeStartMCombox = Ext.create('Ext.form.ComboBox',{
				fieldLabel:':',
				name:'sendTimeStartMCombox',
			    width:50,
			    labelWidth : 10,
			    labelSeparator : '',
				mode : "local",
				forceSelection : true,
				triggerAction : 'all',
				selectOnFocus : true,
				store : ds_sendTimeM,
				displayField : 'sendTime',
			    valueField : 'sendTimeCode',
			    editable : false
		});
		
		// 发送方式Combox
		var sendTimeEndHCombox = Ext.create('Ext.form.ComboBox',{
				fieldLabel:'到',
				name:'sendTimeEndHCombox',
			    width:50,
			    labelWidth : 10,	
			    labelSeparator : '',
		 		labelAlign : 'right',
				mode : "local",
				forceSelection : true,
				triggerAction : 'all',
				selectOnFocus : true,
				store : ds_sendTimeH,
				displayField : 'sendTime',
			    valueField : 'sendTimeCode',
			    editable : false
		});
	
		var sendTimeEndMCombox = Ext.create('Ext.form.ComboBox',{
				name:'sendTimeEndMCombox',
				fieldLabel:':',
			    width:50,
			    labelSeparator : '',
			    labelWidth : 10,
				mode : "local",
				forceSelection : true,
				triggerAction : 'all',
				selectOnFocus : true,
				store : ds_sendTimeM,
				displayField : 'sendTime',
			    valueField : 'sendTimeCode',
			    editable : false
		});
		
		Ext.define('subTypeStore1Model',{
			 extend:'Ext.data.Model',
			fields : [
					'SUBS_TYPE_CODE',
					'SUBS_TYPE_CODE_NAME'
			]
		})
		var subTypeStore1 = Ext.create('Ext.data.JsonStore',{
			model:subTypeStore1Model,
			proxy: {
		        type: 'ajax',
			    url:'./MsgSubscribeManageAction!querySubsType.action',
			    reader: {
		            type: 'json',
		            root: 'resultList'
		            }
		       }
	    });
	    
		var subTypeCombox1 = Ext.create('Ext.form.ComboBox',{
				name:'subTypeCombox1',
				fieldLabel:'订阅类型',
			    width:200,
			    labelWidth : 70,
			    labelSeparator : '',
		 		labelAlign : 'right',
				mode : "local",
				forceSelection : true,
				triggerAction : 'all',
				selectOnFocus : true,
				store : subTypeStore1,
				displayField : 'SUBS_TYPE_CODE_NAME',
			    valueField : 'SUBS_TYPE_CODE',
			    editable : false
		});
		subTypeStore1.load({
			callback : function(recs, options, success) {
				if(success){
					subTypeCombox1.setValue(subsTypeCode);
				}
			}
		});
			
		var msgSubPanel = Ext.create('Ext.panel.Panel',{
			border:false,
			height:40,
			layout:{
				type:'table',
				columns:4
			},
		    defaults: {height: 40},
		    bodyStyle : 'padding:10px 0px 0px 0px',
			items:[{
				colspan:4,
				border : false,
				width:300,
				layout:'fit',
				height:30,
				items:[subNameField]	
			},{
				colspan:2,
				border : false,
			    width:225,
		  		layout:'fit',
				items:[sendStartDate]	
			},{
				colspan:2,
				border : false,
			    width:165,
		  		layout:'fit',
				items:[sendEndDate]	
			},{
				border : false,
			    width:125,
		  		layout:'fit',
				items:[sendTimeStartHCombox]	
			},{
				border : false,
			    width:100,
		  		layout:'fit',
						 	
				items:[sendTimeStartMCombox]	
			},{
				border : false,
			    width:65,
		  		layout:'fit',
				items:[sendTimeEndHCombox]	
			},{
				border : false,
			    width:100,
		  		layout:'fit',
						 	
				items:[sendTimeEndMCombox]	
			},{
				colspan:4,
				border : false,
			    width:300,
		  		layout:'fit',
				items:[subTypeCombox1]	
			}],
			buttonAlign:'center',
			buttons:[{
		   	    width:80,
		   	    text:'确定',
	            handler:function(){
	            
	            	if( Ext.isEmpty( subTypeCombox1.getValue() )){
            			Ext.Msg.alert("提示","请填写订阅名称");
	                	return;
	            	}
	            	if(sendStartDate.getValue()>sendEndDate.getValue()){
	            		Ext.Msg.alert("提示","开始日期不能大于结束日期");
	                	return;
	            	}
	            	if(sendTimeStartHCombox.getValue()+sendTimeStartMCombox.getValue()>=sendTimeEndHCombox.getValue()+sendTimeEndMCombox.getValue()){
	            		Ext.Msg.alert("提示","结束发送时间应大于开始发送时间");
	                	return;
	            	}
	            	if(Ext.isEmpty(subTypeCombox.getValue())){
            			Ext.Msg.alert("提示","请选择订阅类型");
	                	return;
	            	}
	            	Ext.getBody().mask("保存中...");
				    	Ext.Ajax.request({
				     		url:'./MsgSubscribeManageAction!updateSmsSubscribeInfo.action',
				     		params : {
				     			'queryItems.id':subscribeId,
				     			'queryItems.subscribeName':subNameField.getValue().trim(), 
				     			'queryItems.subsTypeCode':subTypeCombox1.getValue(), 
				     			'queryItems.startDate': Ext.Date.format(sendStartDate.getValue(),'Y-m-d'), 
				     			'queryItems.endDate': Ext.Date.format(sendEndDate.getValue(),'Y-m-d'),
								'queryItems.sendTimeS':sendTimeStartHCombox.getValue()+':'+sendTimeStartMCombox.getValue(), 
								'queryItems.sendTimeE':sendTimeEndHCombox.getValue()+':'+sendTimeEndMCombox.getValue()
				     		},
				     		success : function(response){
				 	    		var result = Ext.decode(response.responseText);
							    if(result.FLAG==1){
				                    Ext.MessageBox.alert("提示","修改成功！");
				                    msgSubStore.load();
									msgSubscribeObjStore.removeAll();
				      				contactDefStore.removeAll();
				      				smsTemplateContentWin.close();
				                }
				                else{
				                    Ext.MessageBox.alert("提示","修改失败！");
				                }
				        	},
				        	callback:function(){
				        		Ext.getBody().unmask();
				        	}
				     	});	
	           	 }
			},{
		   	    width:80,
		   	    text:'取消',
	            handler:function(){
	            	smsTemplateContentWin.close();
	            }
			}]
		});
		var smsTemplateContentWin = Ext.create('Ext.window.Window',{
			layout:'fit',
			title:'短信订阅信息',
	        modal:true,
			width:400,
			height:250,
	     	items:[msgSubPanel]
		});	
	
		subNameField.setValue(subscribeName);
		sendStartDate.setValue(startDate);
		sendEndDate.setValue(endDate);
		sendTimeStartHCombox.setValue(sendTimeS.substring(0,2));
		sendTimeStartMCombox.setValue(sendTimeS.substring(3,5));
		sendTimeEndHCombox.setValue(sendTimeE.substring(0,2));
		sendTimeEndMCombox.setValue(sendTimeE.substring(3,5));
		smsTemplateContentWin.show();
	}
	deleteEventSub =function(subscribeId){
		  Ext.MessageBox.confirm('提示', '确定删除吗？', doDeleteEventSub);
		  function doDeleteEventSub(btn){
				if(btn=='no') 
	              	return;
	            Ext.Ajax.request({
					url : './MsgSubscribeManageAction!deleteEventSub.action',
					params : {
						id:subscribeId
					},
					success : function(response) {
						var result = Ext.decode(response.responseText); 
						if(1==result.FLAG){
							msgSubscribeObjStore.load();
			      			contactDefStore.removeAll();
						}
						else{
							Ext.MessageBox.alert("提示","删除失败！");
	 	    				return;
						}
			    	}
				});  	
	      }
	}
});
