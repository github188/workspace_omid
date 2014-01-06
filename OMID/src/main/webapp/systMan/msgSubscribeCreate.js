Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', './ext4/examples/ux');
Ext.require([
    'Ext.ux.form.MultiSelect','Ext.selection.*'
]);

Ext.onReady(function(){
	//var selectOrgNo=LOGGEDORGNO;
	//var LOGGEDORGNO='34101';
	//订阅事件明细;
	var smsSubscribeObjList = new Array();
	
	//当前选择事件
	var selectedEventCode='';
	var resetFlag=0;
	
	//订阅单位
	var orgNameField = new Ext.form.TextField({
		fieldLabel : '订阅单位',
	    readOnly : true,
	    //emptyText : '请从左边树选择供电单位',
  		labelSeparator : '',
		labelAlign : 'right',
		labelWidth : 70,
		width:190
	});
	
	//供电单位
	var subNameField = new Ext.form.TextField({
		fieldLabel : '订阅名称',
		width:270,
  		labelSeparator : '',
 	    labelAlign : 'right',
		labelWidth : 70
	});
		
	// 开始日期
	var sendStartDate = new Ext.form.DateField({
		format : "Y-m-d",
		width : 170,
		fieldLabel : '开始日期',
		editable : false,
  		labelSeparator : '',
 	    labelAlign : 'right',
		labelWidth : 70,
		value : new Date()
	});

	// 结束日期
	var sendEndDate = new Ext.form.DateField({
		format : "Y-m-d",
		width : 170,
		fieldLabel : '结束日期',
		editable : false,
  		labelSeparator : '',
 	    labelAlign : 'right',
		labelWidth : 70,
		value : Ext.Date.add(new Date(),Ext.Date.DAY,7)
	});
	
	var msgSubConditionPanel1 = Ext.create('Ext.panel.Panel', {
		    width:800,
			border:false,
			height:70,
			layout: {
	            type: 'table',
	            columns: 2
	        },
		    defaults: {height: 30},
		    bodyStyle : 'padding:10px 0px 0px 0px',
			items:[{
				border : false,
			    width:300,	 	    
				items:[orgNameField]	
			},{
				border : false,
			    width:500,	 	
				items:[subNameField]	
			},{
				border : false,
			    width:300,
				items:[sendStartDate]	
			},{
				border : false,
			    width:500,		 	
				items:[sendEndDate]	
			}]
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
		
	var sendTimeStartHCombox = new Ext.form.ComboBox({
		    name : 'sendTimeStartHCombox',
			fieldLabel:'发送时间',
		    width:120,
	  		labelSeparator : '',
	 	    labelAlign : 'right',
			labelWidth : 70,
			queryMode : "local",
			forceSelection : true,
			triggerAction : 'all',
			selectOnFocus : true,
			store : ds_sendTimeH,
			displayField : 'sendTime',
		    valueField : 'sendTimeCode',
		    editable : false,
		    value:'00'
	});
	
	var sendTimeStartMCombox = new Ext.form.ComboBox({
		    name : 'sendTimeStartMCombox',
			fieldLabel:':',
		    width:60,
	  		labelSeparator : '',
	 	    labelAlign : 'right',
			labelWidth : 10,	
			queryMode : "local",
			forceSelection : true,
			triggerAction : 'all',
			selectOnFocus : true,
			store : ds_sendTimeM,
			displayField : 'sendTime',
		    valueField : 'sendTimeCode',
		    editable : false,
		    value:'00'
	});
	
	// 发送方式Combox
	var sendTimeEndHCombox = new Ext.form.ComboBox({
		    name : 'sendTimeEndHCombox',
			fieldLabel:'到',
		    width:60,
			queryMode : "local",
	  		labelSeparator : '',
	 	    labelAlign : 'right',
			labelWidth : 10,
			forceSelection : true,
			triggerAction : 'all',
			selectOnFocus : true,
			store : ds_sendTimeH,
			displayField : 'sendTime',
		    valueField : 'sendTimeCode',
		    editable : false,
		    value:'02'
	});

	var sendTimeEndMCombox = new Ext.form.ComboBox({
		    name : 'sendTimeEndMCombox',
		 	fieldLabel:':',
		    width:60,
	  		labelSeparator : '',
	 	    labelAlign : 'right',
			labelWidth : 10,
			queryMode : "local",
			forceSelection : true,
			triggerAction : 'all',
			selectOnFocus : true,
			store : ds_sendTimeM,
			displayField : 'sendTime',
		    valueField : 'sendTimeCode',
		    editable : false,
		    value:'00'
	});
	
	//发送范围store	
	var data_sendUserLimit= [['01','对指定用户'],['02','对所有用户']];
	var ds_sendUserLimit = new Ext.data.SimpleStore({
			fields : ['limitCode', 'limitName'],
			data : data_sendUserLimit
		}); 	
	var sendRangeCombox = new Ext.form.ComboBox({
		    name : 'sendRangeCombox',
			fieldLabel:'发送范围',
		    width:170,
	  		labelSeparator : '',
	 	    labelAlign : 'right',
			labelWidth : 70,
			queryMode : "local",
			forceSelection : true,
			triggerAction : 'all',
			selectOnFocus : true,
			store : ds_sendUserLimit,
			displayField : 'limitName',
		    valueField : 'limitCode',
		    editable : false,
		    value:'02'
	});
	
	var msgSubConditionPanel2 =Ext.create('Ext.panel.Panel',{
			width:590,
			border:false,
			height:30,
			layout: {
	            type: 'table',
	            columns: 5
	        },
		    defaults: {height: 30},
			items:[{
				border : false,
			    width:125,		 	    
				items:[sendTimeStartHCombox]	
			},{
				border : false,
			    width:100,	 	
				items:[sendTimeStartMCombox]	
			},{
				border : false,
			    width:65,		 	    
				items:[sendTimeEndHCombox]	
			},{
				border : false,
			    width:100,		 	
				items:[sendTimeEndMCombox]	
			},{
				border : false,
			    width:200,		 	
				items:[sendRangeCombox]	
			}]
		});
		
	var msgSubConditionPanel = Ext.create('Ext.panel.Panel', {
		border:false,
		height:100,
		region:'north',
		items:[msgSubConditionPanel1,msgSubConditionPanel2]
	});
	
	var subTypeStore = new Ext.data.JsonStore({
		proxy: {
	        type: 'ajax',
	        url: './MsgManageAction!querySubsType.action',
	        reader: {
	            type: 'json',
	            root: 'resultList'
	        }
	    },
	    fields : ['SUBS_TYPE_CODE','SUBS_TYPE_CODE_NAME']
    });
	var subTypeCombox = new Ext.form.ComboBox({
		    name : 'subTypeCombox',
			fieldLabel:'订阅类型',
		    width:500,
			queryMode : "local",
			labelSeparator : '',
	 	    labelAlign : 'right',
			labelWidth : 70,	
			forceSelection : true,
			triggerAction : 'all',
			selectOnFocus : true,
			store : subTypeStore,
			displayField : 'SUBS_TYPE_CODE_NAME',
		    valueField : 'SUBS_TYPE_CODE',
		    editable : false
	});
	subTypeStore.load();
	
	//事件来源store	
	var eventSrcStore =  new Ext.data.JsonStore({
		proxy: {
	        type: 'ajax',
	        url: './MsgManageAction!queryEventSrc.action',
	        reader: {
	            type: 'json',
	            root: 'resultList'
	        }
	    },
	    fields : ['EVENT_SRC_CODE','EVENT_SRC_NAME']
    });
	var dataRecCombox = new Ext.form.ComboBox({
		    name : 'dataRecCombox',
			fieldLabel:'事件来源',
		    width:200,
			queryMode : "local",
			labelSeparator : '',
	 	    labelAlign : 'right',
			labelWidth : 70,	
			forceSelection : true,
			triggerAction : 'all',
			selectOnFocus : true,
			store : eventSrcStore,
			displayField : 'EVENT_SRC_NAME',
		    valueField : 'EVENT_SRC_CODE',
		    editable : false
		    /*listeners : {
	      		select:function(combo, record, index) {
					dataEventStore.load({
						params : {:}
					});
	      		}
			}*/
	});
	eventSrcStore.load();
	
	var dataEventStore = new Ext.data.JsonStore({
			proxy: {
		        type: 'ajax',
		        url: './MsgManageAction!queryExceptEvent.action',
		        reader: {
		            type: 'json',
		            root: 'resultList'
		        }
		    },
		    fields : ['EVENT_CODE','EVENT_NAME'],
		    sortInfo: {field: 'EVENT_CODE', direction:'ASC'}
	    });
	    
 	var dataEvent = Ext.create('Ext.ux.form.MultiSelect',{
 			border : false,
            height:300,
            width: 200,
	  		labelSeparator : '',
	 	    labelAlign : 'right',
			labelWidth : 70,
            displayField : 'EVENT_NAME',
            valueField : 'EVENT_CODE',
            margin : '0 0 0 72',
            store: dataEventStore,
            listeners: {
                    boundList: {
                        itemdblclick: function() {
					        moveEvent(dataEvent,selectedEvent);
						}
                    }
                }
    });
    dataEventStore.load();
 	
 	var dataEventStore2 = new Ext.data.JsonStore({
	    fields : ['EVENT_CODE','EVENT_NAME'],
	    sortInfo: {field: 'EVENT_CODE', direction:'ASC'}
    });
    var selectedEvent =  Ext.create('Ext.ux.form.MultiSelect',{
            height:300,
            width: 200,
            labelSeparator : '',
	 	    labelAlign : 'right',
            displayField : 'EVENT_NAME',
            valueField : 'EVENT_CODE',
            margin : '0 0 0 30',
            store: dataEventStore2,
            listeners: {
                    boundList: {
                        itemdblclick: function() {
					        moveEvent(selectedEvent,dataEvent);
						}
                    }
                }
    });
    
	var msgSubTypePanel11 = new Ext.Panel({
			border:false,
			width:690,
			height:450,
			layout:'table',
			layoutConfig : {
				columns :3
		    },
		    defaults: {height: 450},
			items:[{
					//border : false,
					border : false,
				    width:280,	 	    
					items:[dataEvent]
			},{
				border : false,
			    width:100,
		  		bodyStyle : 'padding:80px 0px 0px 20px',
				items:[{
			   	    xtype:'button',
			   	    width:80,
			   	    text:'>',
		            handler:function(){
	            		moveEvent(dataEvent,selectedEvent);
		            }
			   	 },{
			   	    xtype:'panel',
			   	    border : false,
			   	    height:20,
		            items:[]
			   	 },{
			   	    xtype:'button',
			   	    width:80,
			   	    text:'>>',
		            handler:function(){
		            	moveAllEvent(dataEvent,selectedEvent);
		            }
			   	 },{
			   	    xtype:'panel',
			   	    border : false,
			   	    height:20,
		            items:[]
			   	 },{
			   	    xtype:'button',
			   	    width:80,
			   	    text:'<',
		            handler:function(){
		             	 moveEvent(selectedEvent,dataEvent);
		            }
			   	 },{
			   	    xtype:'panel',
			   	    border : false,
			   	    height:20,
		            items:[]
			   	 },{
			   	    xtype:'button',
			   	    width:80,
			   	    text:'<<',
		            handler:function(){
		               moveAllEvent(selectedEvent,dataEvent);
		            }
			   	 }]	
			},{
				border : false,
			    width:300,	 	    
				items:[selectedEvent]	
			}]
	});
	
	var msgSubTypePanel = new Ext.Panel({
		autoScroll : true,
		title:'订阅类型',
		region:'center',
 		bodyStyle : 'padding:10px 0px 0px 0px', 	
		items:[subTypeCombox,dataRecCombox,msgSubTypePanel11],
		buttonAlign:'right',
		buttons:[{
		   	    width:80,
		   	    text:'下一步',
	            handler:function(){
	            	if(Ext.isEmpty(Ext.String.trim(subNameField.getValue()))){
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
	            	if(Ext.isEmpty(dataRecCombox.getValue())){
            			Ext.Msg.alert("提示","请选择事件来源");
	                	return;
	            	}
	                if(selectedEvent.boundList.getStore().getCount()==0){
	                	Ext.Msg.alert("提示","请选择事件");
	                	return;
	                }
	                msgSubPanel.layout.setActiveItem(1);
	                eventList.getStore().removeAll();
	                statContactStore.removeAll();
      				msgTempletCombox.setValue('');
      				msgContent.setValue('');
      				resetFlag=1;
      				contactModeCheckGroup.reset();
      				resetFlag=0;
      				msgTempletCombox2.setValue('');
      				msgContent2.setValue('');
      				selfDeMsgConsStore.removeAll();
      				msgTempletCombox3.setValue('');
      				msgContent3.setValue('');
      				if(sendRangeCombox.getValue()=='01'){
      					//contactModeCheckGroup.setDisabled(true);
      					button2.setText('下一步');
      				}
      				else{
      					//contactModeCheckGroup.setDisabled(false);
      					button2.setText('完成');
      				}
	                smsSubscribeObjList = new Array();
	                var iis = new Array();
	                for(var i=0; i<selectedEvent.boundList.getStore().getCount(); i++){
	                	var ii = {
							"eventCode" : selectedEvent.boundList.getStore().getAt(i).get('EVENT_CODE'),
							"eventName" : selectedEvent.boundList.getStore().getAt(i).get('EVENT_NAME')
	                	};
	                	iis.push(ii);
						
						var smsSubscribeObj = {};
                		smsSubscribeObj.EVENT_NO=selectedEvent.boundList.getStore().getAt(i).get('EVENT_CODE');
                		smsSubscribeObj.EVENT_NAME=selectedEvent.boundList.getStore().getAt(i).get('EVENT_NAME');
                		smsSubscribeObj.STAFF_NO_ID='';
                		smsSubscribeObj.STAFF_TEMPLATE_ID='';
                		smsSubscribeObj.STAFF_NO_ID_STORE=new Array();
                		smsSubscribeObj.CONS_NO_ID='';
                		smsSubscribeObj.CONS_TEMPLATE_ID='';
                		smsSubscribeObj.SUBS_OBJ_ID='';
                		smsSubscribeObj.SUBS_OBJ_ID_STORE=new Array();
                		smsSubscribeObj.DEFINE_USER_ID='';
                		smsSubscribeObj.DEF_TEMPLATE_ID='';
                		smsSubscribeObj.DEFINE_USER_ID_STORE=new Array();
                		smsSubscribeObjList.push(smsSubscribeObj);
					}
					eventListStore.loadData(iis);
				    contactPanelFit.setDisabled(true);
	            }  	 
		}]
	});
	
	var msgSubPanel1 = new Ext.Panel({
		id:'msgSubPanel1',
	    border : false,
		layout: 'border',
		items: [msgSubConditionPanel,msgSubTypePanel]
		
	});

	//--------------订阅对象设置------------------------------------------------------
	var eventListSelectModel = Ext.create('Ext.selection.CheckboxModel',{
		    injectCheckbox:false,
			mode : 'SINGLE'
	});
	
    Ext.define('eventList',{
		extend : 'Ext.data.Model',
		fields : [  "eventCode",
			        "eventName"
			      ]
	});
	
	var eventListStore = Ext.create('Ext.data.Store', {
		model : 'eventList',
		remoteSort : true,
		buffered: true,
		proxy : new Ext.data.MemoryProxy()
	});
			
	var eventList = Ext.create('Ext.grid.Panel', {
		    border:true,
		    title:'所选异常',
			width:300,
		    height:427,
			stripeRows: true,
			store : eventListStore,
			loadMask:true,
			selModel : eventListSelectModel,
			viewConfig : {
				forceFit : false
			},
			columnLines : true,
			columns : [
			   {header:'异常名称',dataIndex:'eventName',sortable:false,align:'center',width:200}
			],
			 listeners : {
			 	   select: function (model, r, index,e ){
			      			if(selectedEventCode==''){
			      				contactPanelFit.setDisabled(false);
			      			}
			      			if(selectedEventCode!=r.get('eventCode')){
			      				selectedEventCode=r.get('eventCode')
			      				statContactStore.removeAll();
			      				msgTempletCombox.setValue('');
			      				msgContent.setValue('');
			      				resetFlag=1;
			      				contactModeCheckGroup.reset();
			      				resetFlag=0;
			      				msgTempletCombox2.setValue('');
			      				msgContent2.setValue('');
			      				selfDeMsgConsStore.removeAll();
			      				msgTempletCombox3.setValue('');
			      				msgContent3.setValue('');
			      				for(var i=0;i<smsSubscribeObjList.length;i++){
			      					if(smsSubscribeObjList[i].EVENT_NO==r.get('eventCode')){
			      						if(!Ext.isEmpty(smsSubscribeObjList[i].STAFF_NO_ID_STORE))
			      							statContactStore.loadData(smsSubscribeObjList[i].STAFF_NO_ID_STORE);
			      						if(!Ext.isEmpty(smsSubscribeObjList[i].STAFF_TEMPLATE_ID)){	
				      						msgTempletCombox.setValue(smsSubscribeObjList[i].STAFF_TEMPLATE_ID);
				      						msgContent.setValue(msgTemplateStore.getById(smsSubscribeObjList[i].STAFF_TEMPLATE_ID).get('TEMPLATE_CONTENT'));
			      						}
			      						if(!Ext.isEmpty(smsSubscribeObjList[i].CONS_NO_ID)){
			      							//var cc= smsSubscribeObjList[i].CONS_NO_ID.split(",");
			      							resetFlag=1;
			      							/*for(var n=0;n<cc.length;n++){
			      								for(var m=0;m<contactModeCheckGroup.items.length;m++){
			      									if(contactModeCheckGroup.items.get(m).getRawValue()==cc[n]){
			      										contactModeCheckGroup.items.get(m).setValue(true);
			      										break;
			      									}
			      								}
			      							}*/
			      							contactModeCheckGroup.setValue({
			      								'contactMode':smsSubscribeObjList[i].CONS_NO_ID
			      							});
			      							resetFlag=0;
			      						}
			      						if(!Ext.isEmpty(smsSubscribeObjList[i].CONS_TEMPLATE_ID)){	
				      						msgTempletCombox2.setValue(smsSubscribeObjList[i].CONS_TEMPLATE_ID);
				      						msgContent2.setValue(msgTemplateStore.getById(smsSubscribeObjList[i].CONS_TEMPLATE_ID).get('TEMPLATE_CONTENT'));
			      						}
			      						if(!Ext.isEmpty(smsSubscribeObjList[i].DEFINE_USER_ID_STORE))
			      							selfDeMsgConsStore.loadData(smsSubscribeObjList[i].DEFINE_USER_ID_STORE);
			      						if(!Ext.isEmpty(smsSubscribeObjList[i].DEF_TEMPLATE_ID)){	
				      						msgTempletCombox3.setValue(smsSubscribeObjList[i].DEF_TEMPLATE_ID);
				      						msgContent3.setValue(msgTemplateStore.getById(smsSubscribeObjList[i].DEF_TEMPLATE_ID).get('TEMPLATE_CONTENT'));
			      						}
			      						break;
			      					}
			      				}
			      			}
		     	 } 
		      }
	});
/*     var eventList = Ext.create('Ext.tree.Panel',{
	        height:400,
            width: 250,
           // selModel:Ext.create('Ext.selection.CheckboxModel',{allowDeselect:true,mode:'SINGLE'}),
	        useArrows:true,
	        animate:true,
	        rootVisible: false,
	        root: {
	        	expanded : false
	        },
	        listeners : {
		      		checkchange :function(node,checked1,e){
		      			if(checked1==true){
			      			var checkedNodes = eventList.getChecked();
			      			
			      			//var sm=eventList.getSelectionModel();
      						//	sm.selectAll(true);
			      			//eventList.getView().getChecked();
			      			for(var i=0;i<checkedNodes.length;i++){
//								var n = checkedNodes[i];
//								if(node.id != n.id){
//      								//alert(1);
//									//n.checked = false;
//      							var sm=eventList.getSelectionModel();
//      							sm.selectAll(true);
//								}
							}
							
							//var a =eventList.getView().getChecked();
							//var b= eventList.getChecked();
							
			      			if(selectedEventCode==''){
			      				contactPanelFit.setDisabled(false);
			      			}
			      			if(selectedEventCode!=node.eventCode){
			      				selectedEventCode=node.eventCode;
			      				statContactStore.removeAll();
			      				msgTempletCombox.setValue('');
			      				msgContent.setValue('');
			      				resetFlag=1;
			      				contactModeCheckGroup.reset();
			      				resetFlag=0;
			      				msgTempletCombox2.setValue('');
			      				msgContent2.setValue('');
			      				selfDeMsgConsStore.removeAll();
			      				msgTempletCombox3.setValue('');
			      				msgContent3.setValue('');
			      				for(var i=0;i<smsSubscribeObjList.length;i++){
			      					if(smsSubscribeObjList[i].EVENT_NO==node.eventCode){
			      						if(!Ext.isEmpty(smsSubscribeObjList[i].STAFF_NO_ID_STORE))
			      							statContactStore.loadData(smsSubscribeObjList[i].STAFF_NO_ID_STORE);
			      						if(!Ext.isEmpty(smsSubscribeObjList[i].STAFF_TEMPLATE_ID)){	
				      						msgTempletCombox.setValue(smsSubscribeObjList[i].STAFF_TEMPLATE_ID);
				      						msgContent.setValue(msgTemplateStore.getById(smsSubscribeObjList[i].STAFF_TEMPLATE_ID).get('TEMPLATE_CONTENT'));
			      						}
			      						if(!Ext.isEmpty(smsSubscribeObjList[i].CONS_NO_ID)){
			      							var cc= smsSubscribeObjList[i].CONS_NO_ID.split(",");
			      							resetFlag=1;
			      							for(var n=0;n<cc.length;n++){
			      								for(var m=0;m<contactModeCheckGroup.items.length;m++){
			      									if(contactModeCheckGroup.items.get(m).getRawValue()==cc[n]){
			      										contactModeCheckGroup.items.get(m).setValue(true);
			      										break;
			      									}
			      								}
			      							}
			      							resetFlag=0;
			      						}
			      						if(!Ext.isEmpty(smsSubscribeObjList[i].CONS_TEMPLATE_ID)){	
				      						msgTempletCombox2.setValue(smsSubscribeObjList[i].CONS_TEMPLATE_ID);
				      						msgContent2.setValue(msgTemplateStore.getById(smsSubscribeObjList[i].CONS_TEMPLATE_ID).get('TEMPLATE_CONTENT'));
			      						}
			      						if(!Ext.isEmpty(smsSubscribeObjList[i].DEFINE_USER_ID_STORE))
			      							selfDeMsgConsStore.loadData(smsSubscribeObjList[i].DEFINE_USER_ID_STORE);
			      						if(!Ext.isEmpty(smsSubscribeObjList[i].DEF_TEMPLATE_ID)){	
				      						msgTempletCombox3.setValue(smsSubscribeObjList[i].DEF_TEMPLATE_ID);
				      						msgContent3.setValue(msgTemplateStore.getById(smsSubscribeObjList[i].DEF_TEMPLATE_ID).get('TEMPLATE_CONTENT'));
			      						}
			      						break;
			      					}
			      				}
			      			}
			      			
			      		}
		      } 
	        }
    });*/
	
	var eventPanel = new Ext.Panel({
		border : false,
	    width:320,
		bodyStyle : 'padding:15px 0px 0px 15px',
		items:[eventList]
	});
	
	
    Ext.define('statContactCm',{
		extend : 'Ext.data.Model',
		fields : [  "ORG_NO",
			        "ORG_NAME",
	        		'STAFF_NO',
    				'U_NAME',
					'MOBILE_NO',
					'D_NAME',
					'ROLE_DESC'
			      ]
	});
	
	var selectModel = Ext.create('Ext.selection.CheckboxModel',{
			mode : 'MULTI'
	});
	var statContactStore = Ext.create('Ext.data.Store', {
		model : 'statContactCm',
		remoteSort : true,
		buffered: true,
		proxy : new Ext.data.MemoryProxy()
	});
			
	var statContactList = Ext.create('Ext.grid.Panel', {
			width:250,
		    height:325,
			stripeRows: true,
			store : statContactStore,
			loadMask:true,
			selModel : selectModel,
			viewConfig : {
				forceFit : false
			},
			columnLines : true,
			columns : [
			   {header:'单位名称',dataIndex:'ORG_NAME',sortable:false,align:'center'},
			   {header:'工号',dataIndex:'STAFF_NO',sortable:false,align:'center'},
			   {header:'联系人',dataIndex:'U_NAME',sortable:false,align:'center'},
			   {header:'联系电话',dataIndex:'MOBILE_NO',sortable:false,align:'center'},
			   {header:'角色',dataIndex:'ROLE_DESC',sortable:false,align:'center'}
			]
	});
	
	var statContactPanel1 =  new Ext.Panel({
		border : false,
	    width:300,
  		//layout:'form',	
		bodyStyle : 'padding:15px 0px 0px 20px',
		items:[{
	       	xtype:'panel',
   	        border : false,
   	        height:27,
   	        bodyStyle:'padding: 2px 0px 0px 3px ',
   	        items:[{
   	        	xtype : 'label',
				html : "<font font-weight:bold;>主站操作人员</font>"
   	        }]
		},statContactList,
	       {
	       	xtype:'panel',
	        layout:'column',
   	        border : false,
   	        height:30,
   	        items:[{
   	            columnWidth:.5,
   	            //layout:'form',
   	            border : false,
   	            bodyStyle : 'padding:5px 0px 0px 10px',
   	            items:[{
   	            	xtype:'button',
			   	    width:80,
			   	    text:'添加',
		            handler:function(){
              			addStatContactWinShow();
	            	}
				}] 
   	        },{
   	            columnWidth:.5,
   	            //layout:'form',
   	            border : false,
   	            bodyStyle : 'padding:5px 0px 0px 20px',
   	            items:[{
   	            	xtype:'button',
			   	    width:80,
			   	    text:'删除',
		            handler:function(){
	             		var contacts = selectModel.getSelection();
	                    if(Ext.isEmpty(contacts)){
	                        Ext.MessageBox.alert("提示","请选择要删除的联系人");
	                        return;
	                    }
	                    for(var i=0;i<contacts.length;i++){
		                    statContactStore.remove(contacts[i]);
	                    }
                        var staff_no_id_store =new Array();
                        var staff_no_id='';
	                    for(var m=0;m<statContactStore.getCount();m++){
	                    	/*staff_no_id_store[m]= new Array();
	                    	staff_no_id_store[m]['ORG_NO']=statContactStore.getAt(m).get('ORG_NO');
	                    	staff_no_id_store[m]['ORG_NAME']=statContactStore.getAt(m).get('ORG_NAME');
	                    	staff_no_id_store[m]['STAFF_NO']=statContactStore.getAt(m).get('STAFF_NO');
	                    	staff_no_id_store[m]['U_NAME']=statContactStore.getAt(m).get('U_NAME');
	                    	staff_no_id_store[m]['MOBILE_NO']=statContactStore.getAt(m).get('MOBILE_NO');
	                    	staff_no_id_store[m]['D_NAME']=statContactStore.getAt(m).get('D_NAME');
	                    	staff_no_id_store[m]['ROLE_DESC']=statContactStore.getAt(m).get('ROLE_DESC');*/
	                    	var ii={
		                        'ORG_NO':statContactStore.getAt(m).get('ORG_NO'),
		                        'ORG_NAME':statContactStore.getAt(m).get('ORG_NAME'),
		                        'STAFF_NO':statContactStore.getAt(m).get('STAFF_NO'),
		                        'U_NAME':statContactStore.getAt(m).get('U_NAME'),
		                        'MOBILE_NO':statContactStore.getAt(m).get('MOBILE_NO'),
		                        'D_NAME':statContactStore.getAt(m).get('D_NAME'),
		                        'ROLE_DESC':statContactStore.getAt(m).get('ROLE_DESC')
		                    };
		                    staff_no_id_store.push(ii);
                    		if(m==0)
	                    	  staff_no_id=statContactStore.getAt(m).get('STAFF_NO');
	                    	else   
	                    	  staff_no_id+=','+statContactStore.getAt(m).get('STAFF_NO');
	                    }
	                    for(var k=0;k<smsSubscribeObjList.length;k++){
	                    	if(smsSubscribeObjList[k].EVENT_NO==selectedEventCode){
	                    		smsSubscribeObjList[k].STAFF_NO_ID_STORE=staff_no_id_store;
	                    		smsSubscribeObjList[k].STAFF_NO_ID=staff_no_id;
	                    		break;
	                    	}
	                    }
	            }
		}] 
	       }]
       }]
	});

	 Ext.define('msgTemplateModel',{
		extend : 'Ext.data.Model',
		fields : [  "SEND_TYPE_CODE",
			        "TEMPLATE_NAME",
			        "TEMPLATE_CONTENT"
			      ],
		idProperty :'SEND_TYPE_CODE'	      
	});
	
	var msgTemplateStore = new Ext.data.Store({
			model : 'msgTemplateModel',
			proxy: {
		        type: 'ajax',
		        url: './MsgManageAction!queryAllMsgTemplate.action',
		        reader: {
		            type: 'json',
		            root: 'resultList'
		        }
		    }
	});
	//msgTemplateStore.load();
	
	var msgTempletCombox = new Ext.form.ComboBox({
		name : 'msgTempletCombox',
		fieldLabel:'短信模板',
		labelSeparator : '',
	    width:200,
		queryMode : "local",
 	    labelAlign : 'right',
		labelWidth : 50,	
		forceSelection : true,
		triggerAction : 'all',
		selectOnFocus : true,
		store : msgTemplateStore,
		displayField : 'TEMPLATE_NAME',
	    valueField : 'SEND_TYPE_CODE',
	    editable : false,
	    listeners : {
		      		select:function(combo, records, index) {
		      			//var sFlag=0;
	                    for(var k=0;k<smsSubscribeObjList.length;k++){
	                    	if(smsSubscribeObjList[k].EVENT_NO==selectedEventCode){
	                    		smsSubscribeObjList[k].STAFF_TEMPLATE_ID=records[0].get('SEND_TYPE_CODE');
	                    		//sFlag=1;
	                    		break;
	                    	}
	                    }
	                    /*if(sFlag==0){
                    		var smsSubscribeObj = {};
                    		smsSubscribeObj.EVENT_NO=selectedEventCode;
                    		smsSubscribeObj.STAFF_TEMPLATE_ID=record.get('SEND_TYPE_CODE');
                    		smsSubscribeObjList.push(smsSubscribeObj);
                    	}*/
		      			msgContent.setValue(records[0].get('TEMPLATE_CONTENT'));
		      		}
		      }
	});
	msgTemplateStore.load({
		callback : function(recs, options, success) {
			if(success){
				var idArray= [];
                var ii={
                    'SEND_TYPE_CODE':'',
                    'TEMPLATE_NAME':'无',
                    'TEMPLATE_CONTENT':''
                };
                //var r = new msgTemplateStore.recordType(ii);
                idArray.push(ii);
				msgTemplateStore.add(idArray);
			}
		}
	});
	
    var msgContent =new Ext.form.TextArea({
    	    hideLabel : true,
    	    readOnly:true,
    		width:255,
    		height:350
    });
    
	var statContactPanel2 =  new Ext.Panel({
		border : false,
	    width:300,
  		//layout:'form',
 	    bodyStyle : 'padding:15px 0px 0px 0px',
		items:[msgTempletCombox,msgContent]
	});
	
	var statContactPanel = new Ext.Panel({
		title:'主站操作员',
		border : false,
		height:400,
		layout:'table',
		layoutConfig : {
			columns :2
	    },
	    defaults: {height: 400},
		items: [statContactPanel1,statContactPanel2]
	});
	
	
	////////////////////////////////////用户联系人
	var contactModeCheckGroup =Ext.create('Ext.form.CheckboxGroup',{
		hideLabel : true,
		width:100,
		columns:1, 
		items : [{	
					name : 'contactMode',
					inputValue:'01',
					width:100,
					boxLabel : '电气联系人'
				}, {	
					name : 'contactMode',
					inputValue:'02',
					width:100,
					boxLabel : '账务联系人'
				}, {	
					name : 'contactMode',
					inputValue:'03',
					width:100,
					boxLabel : '停送电联系人'
				}],
		 listeners : {
	      		change:function(group,newValue,oldValue,e) {
	      			if(resetFlag==0){
		      			//var sFlag=0;
	      				var cons_no_id='';
	      				if(!Ext.isEmpty(newValue['contactMode'])){
	      					cons_no_id=newValue['contactMode'];
	      				}
	                    for(var k=0;k<smsSubscribeObjList.length;k++){
	                    	if(smsSubscribeObjList[k].EVENT_NO==selectedEventCode){
	                    		smsSubscribeObjList[k].CONS_NO_ID=newValue['contactMode'];
	                    		//sFlag=1;
	                    		break;
	                    	}
	                    }
	                  /*  if(sFlag==0){
                    		var smsSubscribeObj = {};
                    		smsSubscribeObj.EVENT_NO=selectedEventCode;
                    		smsSubscribeObj.CONS_NO_ID=cons_no_id;
                    		smsSubscribeObjList.push(smsSubscribeObj);
                    	}*/
	      			}
	      		}
	      }		
				
	});
	
	var consContactPanel1 =  new Ext.Panel({
		border : false,
	    width:300,
  		//layout:'form',
 	    labelAlign : 'right',
 	    labelWidth : 90,	
		bodyStyle : 'padding:15px 0px 0px 20px',
		items:[{
	       	xtype:'panel',
   	        border : false,
   	        height:27,
   	        bodyStyle:'padding: 2px 0px 0px 3px ',
   	        items:[{
   	        	xtype : 'label',
				html : "<font font-weight:bold;>用户联系人类型</font>"
   	        }]
		},{
	       	xtype:'panel',
	        //layout:'form',
	        height:350,
	        width:250,
	        bodyStyle : 'padding:5px 0px 0px 5px',
	        items:[contactModeCheckGroup]
	       }]
	});
	
	var msgTempletCombox2 = new Ext.form.ComboBox({
		name : 'msgTempletCombox2',
		fieldLabel:'短信模板',
		labelSeparator : '',
		labelAlign : 'right',
		labelWidth : 50,	
	    width:200,
		queryMode : "local",
		forceSelection : true,
		triggerAction : 'all',
		selectOnFocus : true,
		store : msgTemplateStore,
		displayField : 'TEMPLATE_NAME',
	    valueField : 'SEND_TYPE_CODE',
	    editable : false,
	    listeners : {
		      		select:function(combo, records, index) {
		      			//var sFlag=0;
	                    for(var k=0;k<smsSubscribeObjList.length;k++){
	                    	if(smsSubscribeObjList[k].EVENT_NO==selectedEventCode){
	                    		smsSubscribeObjList[k].CONS_TEMPLATE_ID=records[0].get('SEND_TYPE_CODE');
	                    		//sFlag=1;
	                    		break;
	                    	}
	                    }
	                   /* if(sFlag==0){
	                		var smsSubscribeObj = {};
	                		smsSubscribeObj.EVENT_NO=selectedEventCode;
	                		smsSubscribeObj.CONS_TEMPLATE_ID=record.get('SEND_TYPE_CODE');
	                		smsSubscribeObjList.push(smsSubscribeObj);
	                	}*/
		      			msgContent2.setValue(records[0].get('TEMPLATE_CONTENT'));
		      		}
		     }
	});
    var msgContent2 =new Ext.form.TextArea({
    	    hideLabel : true,
    		width:255,
    		height:350
    });
    
    var consContactPanel2 =  new Ext.Panel({
		border : false,
	    width:300,
 	    bodyStyle : 'padding:15px 0px 0px 0px',
		items:[msgTempletCombox2,msgContent2]
	});
    
	var consContactPanel = new Ext.Panel({
		title:'用户联系人',
		border : false,
		height:400,
		layout:'table',
		layoutConfig : {
			columns :2
	    },
	    defaults: {height: 400},
		items: [consContactPanel1,consContactPanel2]
	});
	
	////////////////////////////////////自定义联系人	
	 Ext.define('selfDeMsgCons',{
		extend : 'Ext.data.Model',
		fields : [   'CALLING_CARD_ID',
					 'ORG_NAME',
					 'PERSONNEL_NAME',
					 'MOBILE_NO',
					 'POSITION'
			      ]
	});
	
	var selfDeMsgConsSelectModel = Ext.create('Ext.selection.CheckboxModel',{
			mode : 'MULTI'
	});
	var selfDeMsgConsStore = Ext.create('Ext.data.Store', {
		model : 'selfDeMsgCons',
		remoteSort : true,
		buffered: true,
		proxy : new Ext.data.MemoryProxy()
	});
			
	var selfDeMsgConsGrid =  Ext.create('Ext.grid.Panel', {
			width:250,
		    height:325,
			stripeRows: true,
			store : selfDeMsgConsStore,
			loadMask:true,
			selModel : selfDeMsgConsSelectModel,
			viewConfig : {
				forceFit : false
			},
			columnLines : true,
			columns : [
			   {header:'单位名称',dataIndex:'ORG_NAME',sortable:false,align:'center'},
			   {header:'联系人',dataIndex:'PERSONNEL_NAME',sortable:false,align:'center'},
			   {header:'联系电话',dataIndex:'MOBILE_NO',sortable:false,align:'center'},
			   {header:'职位',dataIndex:'POSITION',sortable:false,align:'center'}
			]
	});
	
	var selfDeContactPanel1 =  new Ext.Panel({
		border : false,
	    width:300,
  		//layout:'form',
  		labelSeparator : '',
 	    labelAlign : 'right',
 	    labelWidth : 70,	
		bodyStyle : 'padding:15px 0px 0px 20px',
		items:[{
	       	xtype:'panel',
   	        border : false,
   	        height:27,
   	        bodyStyle:'padding: 2px 0px 0px 3px ',
   	        items:[{
   	        	xtype : 'label',
				html : "<font font-weight:bold;>联系人列表</font>"
   	        }]
		},selfDeMsgConsGrid,
	       {
	       	xtype:'panel',
	        layout:'column',
   	        border : false,
   	        height:30,
   	        items:[{
   	            columnWidth:.5,
   	           // layout:'form',
   	            border : false,
       	        bodyStyle : 'padding:5px 0px 0px 10px',
   	            items:[{
   	            	xtype:'button',
			   	    width:80,
			   	    text:'添加',
		            handler:function(){
		              	addSelfDeContactWinShow();
	            	}
				}] 
   	        },{
   	            columnWidth:.5,
   	           // layout:'form',
   	            border : false,
       	        bodyStyle : 'padding:5px 0px 0px 20px',
   	            items:[{
   	            	xtype:'button',
			   	    width:80,
			   	    text:'删除',
		            handler:function(){
	             		var contacts = selfDeMsgConsSelectModel.getSelection();
	                    if(Ext.isEmpty(contacts)){
	                        Ext.MessageBox.alert("提示","请选择要删除的联系人");
	                        return;
	                    }
	                    for(var i=0;i<contacts.length;i++){
		                    selfDeMsgConsStore.remove(contacts[i]);
	                    }
                        var define_user_id_store =new Array();
	                    var define_user_id='';
	                    for(var m=0;m<selfDeMsgConsStore.getCount();m++){
	                    	/*define_user_id_store[m]= new Array();
	                    	define_user_id_store[m]['CALLING_CARD_ID']=selfDeMsgConsStore.getAt(m).get('CALLING_CARD_ID');
	                    	define_user_id_store[m]['ORG_NAME']=selfDeMsgConsStore.getAt(m).get('ORG_NAME');
	                    	define_user_id_store[m]['PERSONNEL_NAME']=selfDeMsgConsStore.getAt(m).get('PERSONNEL_NAME');
	                    	define_user_id_store[m]['MOBILE_NO']=selfDeMsgConsStore.getAt(m).get('MOBILE_NO');
	                    	define_user_id_store[m]['POSITION']=selfDeMsgConsStore.getAt(m).get('POSITION');*/
	                    	var ii = {
		                        'CALLING_CARD_ID':selfDeMsgConsStore.getAt(m).get('CALLING_CARD_ID'),
		                        'ORG_NAME':selfDeMsgConsStore.getAt(m).get('ORG_NAME'),
		                        'PERSONNEL_NAME':selfDeMsgConsStore.getAt(m).get('PERSONNEL_NAME'),
		                        'MOBILE_NO':selfDeMsgConsStore.getAt(m).get('MOBILE_NO'),
		                        'POSITION':selfDeMsgConsStore.getAt(m).get('POSITION')
		                    };
		                	define_user_id_store.push(ii);
	                    	if(m==0)
	                    	  define_user_id=selfDeMsgConsStore.getAt(m).get('MOBILE_NO');
	                    	else   
	                    	  define_user_id+=','+selfDeMsgConsStore.getAt(m).get('MOBILE_NO');
	                    }
	                    for(var k=0;k<smsSubscribeObjList.length;k++){
	                    	if(smsSubscribeObjList[k].EVENT_NO==selectedEventCode){
	                    		smsSubscribeObjList[k].DEFINE_USER_ID_STORE=define_user_id_store;
	                    		smsSubscribeObjList[k].DEFINE_USER_ID=define_user_id;
	                    		break;
	                    	}
	                    }
	            }
		}] 
	       }]
       }]
	});

	//自定义联系人添加窗口
	function  addSelfDeContactWinShow(){
		
		var aBorgNameTF= new Ext.form.TextField({
			fieldLabel:'单位名称',
			labelAlign : 'right',
			labelWidth : 80,
			labelSeparator:'',
			width:180
		});
		
		var aBconsNameTF= new Ext.form.TextField({
			fieldLabel:'联系人',
			labelAlign : 'right',
			labelWidth : 60,
			labelSeparator:'',
			width:160
		});
		
		var aBMObileNoTF= new Ext.form.TextField({
			fieldLabel:'手机号码',
			labelAlign : 'right',
			labelWidth : 50,
			labelSeparator:'',
			width:150
		});
	
		var addressBookPanl = Ext.create('Ext.panel.Panel', {
			region:'north',
			border:false,
			layout:'table',
			height: 50,
			layoutConfig : {
				columns :4
		    },
		    defaults: {height: 30},
		    bodyStyle:'padding: 15px 0px 0px 0px ',
			items:[{
				border : false,
			    width:190,
				items:[aBorgNameTF]	
			},{
				border : false,
			    width:190,
				items:[aBconsNameTF]	
			},{
				border : false,
			    width:200,
				items:[aBMObileNoTF]	
			},{
				border:false,
			    width:80,
				items:[{
					xtype:'button',
					width: 70,
					text:'查询',
					handler:function(){
						if(Ext.isEmpty(Ext.String.trim(aBorgNameTF.getValue()))&&Ext.isEmpty(Ext.String.trim(aBconsNameTF.getValue()))
									&& Ext.isEmpty(Ext.String.trim(aBMObileNoTF.getValue()))){
							 Ext.MessageBox.alert("提示","请输入至少一个查询条件！");
			  		     	 return;
						}
						addressBookStore.proxy.extraParams={
							'queryItems.orgName' : Ext.String.trim(aBorgNameTF.getValue()),
							'queryItems.personnelName' : Ext.String.trim(aBconsNameTF.getValue()),
							'queryItems.mobileNo' : Ext.String.trim(aBMObileNoTF.getValue())
						};
						addressBookStore.currentPage=1;
						addressBookStore.load({
						    	start:0
						});
					}
				}]
			}]
		});
		
		var addressBookSelectModel1 = Ext.create('Ext.selection.CheckboxModel',{
			mode : 'MULTI'
		});
		Ext.define('addressBook1',{
			extend : 'Ext.data.Model',
			fields : [   
			            'CALLING_CARD_ID',
					    'ORG_NAME',
					    'PERSONNEL_NAME',
					    'MOBILE_NO',
					    'POSITION'
				      ]
		});
		
		var addressBookStore =   Ext.create('Ext.data.Store', {
			model : 'addressBook1',
			remoteSort : true,
			pageSize: DEFAULT_PAGE_SIZE,
			buffered: true,
			proxy : {
				type : 'ajax',
				url : './MsgManageAction!querySelfDeContact.action',
				reader : {
					type : 'json',
					root : 'resultList'
				}
			}	
		});
		
		addressBookStore.currentPage=1;
		addressBookStore.load({
		    	start:0
		});	
		   		
		var addressBookGrid = Ext.create('Ext.grid.Panel', {
				selModel:addressBookSelectModel1,
				store : addressBookStore,
				loadMask:true,
				region:'center',
				viewConfig : {
					forceFit : true
				},
				columnLines : true,
				columns:[
				   {header:'单位名称',dataIndex:'ORG_NAME',sortable:false,align:'center'},
				   {header:'联系人',dataIndex:'PERSONNEL_NAME',sortable:false,align:'center'},
				   {header:'联系电话',dataIndex:'MOBILE_NO',sortable:false,align:'center'},
				   {header:'职位',dataIndex:'POSITION',sortable:false,align:'center'}
				],
				tbar : [{
					xtype : 'label',
					html : "<font font-weight:bold;>联系人明细</font>",
					height:20
				},{xtype: 'tbfill'},
				{
					xtype: 'button',
					text:'确定',
					handler:function(){
						var contacts = addressBookSelectModel1.getSelection();
	                    if(Ext.isEmpty(contacts)){
	                        Ext.MessageBox.alert("提示","请选择要添加的联系人");
	                        return;
	                    }
	                    var idArray= [];
	                    for(var i=0;i<contacts.length;i++){
	                    	var flag=0;
	                    	for(var j=0;j<selfDeMsgConsStore.getCount();j++){
	                    		if(selfDeMsgConsStore.getAt(j).get('CALLING_CARD_ID')==contacts[i].get('CALLING_CARD_ID')){
	                    			flag=1;
	                    			break;
	                    		}
	                    	}
	                    	if(flag==1)
	                    		break;
		                    var ii={
		                        'CALLING_CARD_ID':contacts[i].get('CALLING_CARD_ID'),
		                        'ORG_NAME':contacts[i].get('ORG_NAME'),
		                        'PERSONNEL_NAME':contacts[i].get('PERSONNEL_NAME'),
		                        'MOBILE_NO':contacts[i].get('MOBILE_NO'),
		                        'POSITION':contacts[i].get('POSITION')
		                    };
		                    //var r = new selfDeMsgConsStore.recordType(ii);
		                    idArray.push(ii);
	                    }
	                    if(idArray.length>0){
	                    	selfDeMsgConsStore.add(idArray);
		                    var define_user_id_store =new Array();
		                    var define_user_id='';
		                    for(var m=0;m<selfDeMsgConsStore.getCount();m++){
		                    	/*define_user_id_store[m]= new Array();
		                    	define_user_id_store[m]['CALLING_CARD_ID']=selfDeMsgConsStore.getAt(m).get('CALLING_CARD_ID');
		                    	define_user_id_store[m]['ORG_NAME']=selfDeMsgConsStore.getAt(m).get('ORG_NAME');
		                    	define_user_id_store[m]['PERSONNEL_NAME']=selfDeMsgConsStore.getAt(m).get('PERSONNEL_NAME');
		                    	define_user_id_store[m]['MOBILE_NO']=selfDeMsgConsStore.getAt(m).get('MOBILE_NO');
		                    	define_user_id_store[m]['POSITION']=selfDeMsgConsStore.getAt(m).get('POSITION');*/
		                    	var ii = {
			                        'CALLING_CARD_ID':selfDeMsgConsStore.getAt(m).get('CALLING_CARD_ID'),
			                        'ORG_NAME':selfDeMsgConsStore.getAt(m).get('ORG_NAME'),
			                        'PERSONNEL_NAME':selfDeMsgConsStore.getAt(m).get('PERSONNEL_NAME'),
			                        'MOBILE_NO':selfDeMsgConsStore.getAt(m).get('MOBILE_NO'),
			                        'POSITION':selfDeMsgConsStore.getAt(m).get('POSITION')
			                    };
			                	define_user_id_store.push(ii);
		                    	if(m==0)
		                    	  define_user_id=selfDeMsgConsStore.getAt(m).get('MOBILE_NO');
		                    	else   
		                    	  define_user_id+=','+selfDeMsgConsStore.getAt(m).get('MOBILE_NO');
		                    }
		                    for(var k=0;k<smsSubscribeObjList.length;k++){
		                    	if(smsSubscribeObjList[k].EVENT_NO==selectedEventCode){
		                    		smsSubscribeObjList[k].DEFINE_USER_ID_STORE=define_user_id_store;
		                    		smsSubscribeObjList[k].DEFINE_USER_ID=define_user_id;
		                    		break;
		                    	}
		                    }
	                    }
	                    addressBookManageWin.close();
					}
				}],
				dockedItems: [{
			        xtype: 'pagingtoolbar',
			        store: addressBookStore,   
			        dock: 'bottom',
			        displayInfo: true
			    }]
		});
		
		//短信发送窗口
		var addressBookManageWin= Ext.create('Ext.window.Window',{
		    height:400,
		    width:700,
		    modal:true,
		    resizable:false,
		    layout:'border',
			closeAction : "close",
		    title:'管理联系人',
		    items:[addressBookPanl,addressBookGrid]
		});
		
		addressBookManageWin.show();

	}
	
	function  addStatContactWinShow(){
		
		var aBorgNameTF= new Ext.form.TextField({
			fieldLabel:'单位名称',
			width:180,
	  		labelAlign : 'right',
			labelWidth : 80,
			labelSeparator:''
		});
		
		var aBconsNameTF= new Ext.form.TextField({
			fieldLabel:'联系人',
			labelAlign : 'right',
			labelWidth : 60,
			labelSeparator:'',
			width:160
		});
		
		var aBMObileNoTF= new Ext.form.TextField({
			fieldLabel:'手机号码',
			labelAlign : 'right',
			labelWidth : 50,
			labelSeparator:'',
			width:150
		});
	
		var addressBookPanl = Ext.create('Ext.panel.Panel', {
			region:'north',
			border:false,
			layout:'table',
			height: 50,
			width:690,
			layoutConfig : {
				columns :4
		    },
		    defaults: {height: 30},
		    bodyStyle:'padding: 15px 0px 0px 0px ',
			items:[{
				border : false,
			    width:190,
				items:[aBorgNameTF]	
			},{
				border : false,
			    width:190,
				items:[aBconsNameTF]	
			},{
				border : false,
			    width:200,
				items:[aBMObileNoTF]	
			},{
				border:false,
			    width:80,
				items:[{
					xtype:'button',
					width: 70,
					text:'查询',
					handler:function(){
						if(Ext.isEmpty(Ext.String.trim(aBorgNameTF.getValue()))&&Ext.isEmpty(Ext.String.trim(aBconsNameTF.getValue()))
									&& Ext.isEmpty(Ext.String.trim(aBMObileNoTF.getValue()))){
							 Ext.MessageBox.alert("提示","请输入至少一个查询条件！");
			  		     	 return;
						}
						addressBookStore.proxy.extraParams={
							'queryItems.orgName' : Ext.String.trim(aBorgNameTF.getValue()),
							'queryItems.personnelName' : Ext.String.trim(aBconsNameTF.getValue()),
							'queryItems.mobileNo' : Ext.String.trim(aBMObileNoTF.getValue())
						};
						addressBookStore.currentPage=1;
						addressBookStore.load({
						    	start:0
						});
					}
				}]
			}]
		});
			
		var addressBookSelectModel = Ext.create('Ext.selection.CheckboxModel',{});
		Ext.define('addressBook',{
			extend : 'Ext.data.Model',
			fields : [  'ORG_NO',
					    'ORG_NAME',
					    'STAFF_NO',
					    'U_NAME',
					    'MOBILE_NO',
					    'D_NAME',
					    'ROLE_DESC'
				      ]
		});
		
		var addressBookStore =   Ext.create('Ext.data.Store', {
			model : 'addressBook',
			remoteSort : true,
			pageSize: DEFAULT_PAGE_SIZE,
			buffered: true,
			proxy : {
				type : 'ajax',
				url : './MsgManageAction!queryStatContact.action',
				reader : {
					type : 'json',
					root : 'resultList'
				}
			}	
		});
		
		addressBookStore.currentPage=1;
		addressBookStore.load({
		    	start:0
		});	
		var addressBookGrid = Ext.create('Ext.grid.Panel', {
				selModel:addressBookSelectModel,
				store : addressBookStore,
				loadMask:true,
				region:'center',
				viewConfig : {
					forceFit : true
				},
				columnLines : true,
				columns:[
				   {header:'单位名称',dataIndex:'ORG_NAME',sortable:false,align:'center'},
				   {header:'工号',dataIndex:'STAFF_NO',sortable:false,align:'center'},
				   {header:'联系人',dataIndex:'U_NAME',sortable:false,align:'center'},
				   {header:'联系电话',dataIndex:'MOBILE_NO',sortable:false,align:'center'},
				   {header:'职位',dataIndex:'D_NAME',sortable:false,align:'center'},
				   {header:'角色',dataIndex:'ROLE_DESC',sortable:false,align:'center'}
			    ],
				tbar : [{
					xtype : 'label',
					html : "<font font-weight:bold;>联系人明细</font>"
				},{xtype: 'tbfill'},
				{
					xtype: 'button',
					text:'确定',
					handler:function(){
						var contacts = addressBookSelectModel.getSelection();
	                    if(Ext.isEmpty(contacts)){
	                        Ext.MessageBox.alert("提示","请选择要添加的联系人");
	                        return;
	                    }
	                    var idArray= [];
	                    for(var i=0;i<contacts.length;i++){
	                    	var flag=0;
	                    	for(var j=0;j<statContactStore.getCount();j++){
	                    		if(statContactStore.getAt(j).get('STAFF_NO')==contacts[i].get('STAFF_NO')){
	                    			flag=1;
	                    			break;
	                    		}
	                    	}
	                    	if(flag==1)
	                    		break;
		                    var ii={
		                        'ORG_NO':contacts[i].get('ORG_NO'),
		                        'ORG_NAME':contacts[i].get('ORG_NAME'),
		                        'STAFF_NO':contacts[i].get('STAFF_NO'),
		                        'U_NAME':contacts[i].get('U_NAME'),
		                        'MOBILE_NO':contacts[i].get('MOBILE_NO'),
		                        'D_NAME':contacts[i].get('D_NAME'),
		                        'ROLE_DESC':contacts[i].get('ROLE_DESC')
		                    };
		                   // var r = new statContactStore.recordType(ii);
		                    idArray.push(ii);
	                    }
	                    if(idArray.length>0){
	                    	statContactStore.add(idArray);
		                    var staff_no_id_store =new Array();
		                    var staff_no_id='';
		                    for(var m=0;m<statContactStore.getCount();m++){
		                    	/*staff_no_id_store[m]= new Array();
		                    	staff_no_id_store[m]['ORG_NO']=statContactStore.getAt(m).get('ORG_NO');
		                    	staff_no_id_store[m]['ORG_NAME']=statContactStore.getAt(m).get('ORG_NAME');
		                    	staff_no_id_store[m]['STAFF_NO']=statContactStore.getAt(m).get('STAFF_NO');
		                    	staff_no_id_store[m]['U_NAME']=statContactStore.getAt(m).get('U_NAME');
		                    	staff_no_id_store[m]['MOBILE_NO']=statContactStore.getAt(m).get('MOBILE_NO');
		                    	staff_no_id_store[m]['D_NAME']=statContactStore.getAt(m).get('D_NAME');
		                    	staff_no_id_store[m]['ROLE_DESC']=statContactStore.getAt(m).get('ROLE_DESC');*/
		                    	var ii={
			                        'ORG_NO':statContactStore.getAt(m).get('ORG_NO'),
			                        'ORG_NAME':statContactStore.getAt(m).get('ORG_NAME'),
			                        'STAFF_NO':statContactStore.getAt(m).get('STAFF_NO'),
			                        'U_NAME':statContactStore.getAt(m).get('U_NAME'),
			                        'MOBILE_NO':statContactStore.getAt(m).get('MOBILE_NO'),
			                        'D_NAME':statContactStore.getAt(m).get('D_NAME'),
			                        'ROLE_DESC':statContactStore.getAt(m).get('ROLE_DESC')
			                    };
			                    staff_no_id_store.push(ii);
		                    	if(m==0)
		                    	  staff_no_id=statContactStore.getAt(m).get('STAFF_NO');
		                    	else   
		                    	  staff_no_id+=','+statContactStore.getAt(m).get('STAFF_NO');
		                    }
		                   // var sFlag=0;
		                    for(var k=0;k<smsSubscribeObjList.length;k++){
		                    	if(smsSubscribeObjList[k].EVENT_NO==selectedEventCode){
		                    		smsSubscribeObjList[k].STAFF_NO_ID_STORE=staff_no_id_store;
		                    		smsSubscribeObjList[k].STAFF_NO_ID=staff_no_id;
		                    		//sFlag=1;
		                    		break;
		                    	}
		                    }
	                    	/*if(sFlag==0){
	                    		var smsSubscribeObj = {};
	                    		smsSubscribeObj.EVENT_NO=selectedEventCode;
	                    		smsSubscribeObj.STAFF_NO_ID_STORE=staff_no_id_store;
	                    		smsSubscribeObj.STAFF_NO_ID=staff_no_id;
	                    		smsSubscribeObjList.push(smsSubscribeObj);
	                    	}*/
	                    }
	                    addressBookManageWin.close();
					}
				}],
				dockedItems: [{
				        xtype: 'pagingtoolbar',
				        store: addressBookStore,   
				        dock: 'bottom',
				        displayInfo: true
				    }]
		});
		
		//短信发送窗口
		var addressBookManageWin= Ext.create('Ext.window.Window',{
		    height:400,
		    width:700,
		    modal:true,
		    resizable:false,
		    layout:'border',
			closeAction : "close",
		    title:'管理联系人',
		    items:[addressBookPanl,addressBookGrid]
		});
		
		addressBookManageWin.show();

	}
	
	var msgTempletCombox3 = new Ext.form.ComboBox({
		name : 'msgTempletCombox3',
		fieldLabel:'短信模板',
		labelSeparator : '',
	    width:200,
		queryMode : "local",
		labelAlign : 'right',
		labelWidth : 50,	
		forceSelection : true,
		triggerAction : 'all',
		selectOnFocus : true,
		store : msgTemplateStore,
		displayField : 'TEMPLATE_NAME',
	    valueField : 'SEND_TYPE_CODE',
	    editable : false,
	    listeners : {
		      		select:function(combo, records, index) {
	                    for(var k=0;k<smsSubscribeObjList.length;k++){
	                    	if(smsSubscribeObjList[k].EVENT_NO==selectedEventCode){
	                    		smsSubscribeObjList[k].DEF_TEMPLATE_ID=records[0].get('SEND_TYPE_CODE');
	                    		break;
	                    	}
	                    }
		      			msgContent3.setValue(records[0].get('TEMPLATE_CONTENT'));
		      		}
		     }
	});
	
    var msgContent3=new Ext.form.TextArea({
    	    hideLabel : true,
    		width:255,
    		height:350
    });
    
	var selfDeContactPanel2 =  new Ext.Panel({
		border : false,
	    width:300,
 	    bodyStyle : 'padding:15px 0px 0px 0px',
		items:[msgTempletCombox3,msgContent3]
	});
	
	var selfDeContactPanel = new Ext.Panel({
		title:'自定义联系人',
		border : false,
		height:400,
		layout:'table',
		layoutConfig : {
			columns :2
	    },
	    defaults: {height: 400},
		items: [selfDeContactPanel1,selfDeContactPanel2]
	});
	
	var contactPanelFit = new Ext.TabPanel({	
		border : true,
		activeTab: 0,
		width:600,
		items : [statContactPanel,consContactPanel,selfDeContactPanel]
	}); 
	
	var contactPanel = new Ext.Panel({
		border : false,
		bodyStyle : 'padding:15px 0px 0px 0px',
		width:600,
		items : [contactPanelFit]
	});
	
	var button2 = new Ext.Button({
	   	    width:80,
	   	    text:'',
            handler:function(){
               if(sendRangeCombox.getValue()=='01'){
               	  if(selectedEventCode==''){
	                    Ext.MessageBox.alert("提示","请选择事件");
	                    return; 
               	  }
               	  msgSubPanel.layout.setActiveItem(2);
               	  //此处需要添加校检过程
               	  contactAddStore.removeAll();
               	  for(var i=0;i<smsSubscribeObjList.length;i++){
					  if(smsSubscribeObjList[i].EVENT_NO==selectedEventCode){
	               	  	if(!Ext.isEmpty(smsSubscribeObjList[i].SUBS_OBJ_ID_STORE))
							contactAddStore.add(smsSubscribeObjList[i].SUBS_OBJ_ID_STORE);
  					  }
               	  }
               }
               else{
               		if(checkSmsSubScribeInfo()){
               			saveSmsSubscribeInfo();
               		}
               }
            }  	 
	});
	
	var msgSubPanel2Fit = new Ext.Panel({
		//border : false,
		autoScroll : true,
		region:'center',
		title: '订阅对象设置',
		height:450,
		width:920,
		layout:'table',
		layoutConfig : {
			columns :2
	    },
	    defaults: {height: 450},
		items: [eventPanel,contactPanel],
		buttonAlign:'right',
		buttons:[{
		   	    width:80,
		   	    text:'上一步',
	            handler:function(){
	            	selectedEventCode='';
	                msgSubPanel.layout.setActiveItem(0);
	            }
		},button2]
	});
	
	var msgSubPanel2 = new Ext.Panel({
		border : false,
		layout:'border',
		items:[msgSubPanel2Fit]
	});
	//--------------发送人定义------------------------------------------------------	
	//供电单位
	var tgNameField = new Ext.form.TextField({
		fieldLabel : '所属台区',
		labelSeparator : '',
 	    labelAlign : 'right',
		labelWidth : 70,		 
		width:190
	});
	
	var copySectField = new Ext.form.TextField({
		fieldLabel : '抄表段号',
  		labelSeparator : '',
 	    labelAlign : 'right',
		labelWidth : 70,
		width:190
	});
	
	var consNoField = new Ext.form.TextField({
		fieldLabel : '用户编号',
  		labelSeparator : '',
 	    labelAlign : 'right',
		labelWidth : 70,
		width:190
	});
	
	var consNameField = new Ext.form.TextField({
		fieldLabel : '用户名称',
        labelAlign: 'right',
        labelWidth:70,
        labelSeparator : '',
		width:190
	});
	
	var contactDefQueryPanel = Ext.create('Ext.panel.Panel', {
		border : false,
		width:800,
		height:80,
		layout: {
            type: 'table',
            columns: 4
        },
	    defaults: {height: 30},
	    bodyStyle : 'padding:15px 0px 0px 0px',
		items: [{
				border : false,
			    width:200, 	 
				items:[tgNameField]	
			},{
				border : false,
			    width:200, 
				items:[copySectField]	
			},{
				border : false,
			    width:200, 
				items:[consNoField]	
			},{
	            border : false,
	           // layout:'form',
	            width:200,
		        items:[consNameField]
			},{
				border:false,
			    width:810,
				//layout:'form',
				colspan: 4,
				bodyStyle : 'padding:0px 0px 0px 730px',
				items:[{
					xtype:'button',
					width: 70,
					text:'查询',
					handler:function(){
						if(Ext.isEmpty(Ext.String.trim(tgNameField.getValue()))&&Ext.isEmpty(Ext.String.trim(copySectField.getValue()))
									&& Ext.isEmpty(Ext.String.trim(consNoField.getValue()))&& Ext.isEmpty(Ext.String.trim(consNameField.getValue()))){
							 Ext.MessageBox.alert("提示","请输入至少一个查询条件！");
			  		     	 return;
						}
						contactDefStore.proxy.extraParams={
							'queryItems.tgName' :Ext.String.trim(tgNameField.getValue()),
							'queryItems.mrSectNo' : Ext.String.trim(copySectField.getValue()),
							'queryItems.consNo' : Ext.String.trim(consNoField.getValue()),
							'queryItems.consName' : Ext.String.trim(consNameField.getValue())
						};
						contactDefStore.currentPage=1;
						contactDefStore.load({
						    	start:0
						});
						contactDefTabPanel.setActiveTab(0);
					}
				}]
			}]
	});
	
	 Ext.define('contactDef',{
		extend : 'Ext.data.Model',
		fields : [    'ORG_NO',
					  'ORG_NAME',
					  'CONS_NO',
					  'CONS_NAME',
					  'ELEC_ADDR',
					  'LINE_NAME',
					  'TG_NAME',
					  'MR_SECT_NO',
					  'RUN_CAP',
					  'CONTACT_ID',
					  'CONTACT_NAME',
					  'MOBILE',
					  'CONTACT_MODE'
			      ]
	});
	
	var contactDefSelectModel = Ext.create('Ext.selection.CheckboxModel',{
	});
	
	var contactDefStore = Ext.create('Ext.data.Store', {
		model : 'contactDef',
		remoteSort : true,
		buffered: true,
		proxy : {
			type : 'ajax',
			url : './MsgManageAction!queryConsContact.action',
			reader : {
				type : 'json',
				root : 'resultList',
				totalProperty : 'totalCount'
			}
		}	
	});
	
	var contactDefGridPanel=Ext.create('Ext.grid.Panel', {
		border : false,
		store: contactDefStore,
		stripeRows: true,
		selModel : contactDefSelectModel,
		columnLines : true,
		columns:[
			   {header:'供电单位',dataIndex:'ORG_NAME',sortable:false,align:'center'},
			   {header:'用户编号',dataIndex:'CONS_NO',sortable:false,align:'center'},
			   {header:'用户名称',dataIndex:'CONS_NAME',sortable:false,align:'center'},
			   {header:'用电地址',dataIndex:'ELEC_ADDR',sortable:false,align:'center'},
			   {header:'所属线路',dataIndex:'LINE_NAME',sortable:false,align:'center'},
			   {header:'所属台区',dataIndex:'TG_NAME',sortable:false,align:'center'},
			   {header:'抄表段号',dataIndex:'MR_SECT_NO',sortable:false,align:'center'},
			   //{header:'终端地址',dataIndex:'',sortable:false,align:'center'},
			   //{header:'电能表资产号',dataIndex:'',sortable:false,align:'center'},
			   {header:'运行容量',dataIndex:'RUN_CAP',sortable:false,align:'center'}
		//	   {header:'联系人',dataIndex:'CONTACT_NAME',sortable:false,align:'center'},
		//	   {header:'联系电话',dataIndex:'MOBILE',sortable:false,align:'center'},
		//	   {header:'联系人类型',dataIndex:'CONTACT_MODE',sortable:false,align:'center'}
			],
		tbar:[
			{xtype: 'tbfill'},{		
	             xtype:"button",
	             text:"添加",
	            // iconCls: 'plus',
	             handler : function() {
		             	var contacts = contactDefSelectModel.getSelection();
	                    if(Ext.isEmpty(contacts)){
	                        Ext.MessageBox.alert("提示","请选择要添加的联系人");
	                        return;
	                    }
	                    var idArray= [];
	                    for(var i=0;i<contacts.length;i++){
	                    	var flag=0;
	                    	for(var j=0;j<contactAddStore.getCount();j++){
	                    		if(contactAddStore.getAt(j).get('CONS_NO')==contacts[i].get('CONS_NO')){
	                    			flag=1;
	                    			break;
	                    		}
	                    	}
	                    	if(flag==1)
	                    		continue;
		                    var ii={
		                        'ORG_NO':contacts[i].get('ORG_NO'),
		                        'ORG_NAME':contacts[i].get('ORG_NAME'),
		                        'CONS_NO':contacts[i].get('CONS_NO'),
		                        'CONS_NAME':contacts[i].get('CONS_NAME'),
		                        'ELEC_ADDR':contacts[i].get('ELEC_ADDR'),
		                        'LINE_NAME':contacts[i].get('LINE_NAME'),
		                        'TG_NAME':contacts[i].get('TG_NAME'),
		                        'MR_SECT_NO':contacts[i].get('MR_SECT_NO'),
		                        'RUN_CAP':contacts[i].get('RUN_CAP')
		                    };
		                   // var r = new contactAddStore.recordType(ii);
		                    idArray.push(ii);
	                    }
                        if(idArray.length>0){
	                    	contactAddStore.add(idArray);
		                    var subs_obj_id_store =new Array();
		                    var subs_obj_id='';
		                    for(var m=0;m<contactAddStore.getCount();m++){
//		                    	subs_obj_id_store[m]= new Array();
//		                    	subs_obj_id_store[m]['ORG_NO']=contactAddStore.getAt(m).get('ORG_NO');
//		                    	subs_obj_id_store[m]['ORG_NAME']=contactAddStore.getAt(m).get('ORG_NAME');
//		                    	subs_obj_id_store[m]['CONS_NO']=contactAddStore.getAt(m).get('CONS_NO');
//		                    	subs_obj_id_store[m]['CONS_NAME']=contactAddStore.getAt(m).get('CONS_NAME');
//		                    	subs_obj_id_store[m]['ELEC_ADDR']=contactAddStore.getAt(m).get('ELEC_ADDR');
//		                    	subs_obj_id_store[m]['LINE_NAME']=contactAddStore.getAt(m).get('LINE_NAME');
//		                    	subs_obj_id_store[m]['TG_NAME']=contactAddStore.getAt(m).get('TG_NAME');
//		                    	subs_obj_id_store[m]['MR_SECT_NO']=contactAddStore.getAt(m).get('MR_SECT_NO');
//		                    	subs_obj_id_store[m]['RUN_CAP']=contactAddStore.getAt(m).get('RUN_CAP');
		                    	 var ii={
			                        'ORG_NO':contactAddStore.getAt(m).get('ORG_NO'),
			                        'ORG_NAME':contactAddStore.getAt(m).get('ORG_NAME'),
			                        'CONS_NO':contactAddStore.getAt(m).get('CONS_NO'),
			                        'CONS_NAME':contactAddStore.getAt(m).get('CONS_NAME'),
			                        'ELEC_ADDR':contactAddStore.getAt(m).get('ELEC_ADDR'),
			                        'LINE_NAME':contactAddStore.getAt(m).get('LINE_NAME'),
			                        'TG_NAME':contactAddStore.getAt(m).get('TG_NAME'),
			                        'MR_SECT_NO':contactAddStore.getAt(m).get('MR_SECT_NO'),
			                        'RUN_CAP':contactAddStore.getAt(m).get('RUN_CAP')
			                    };
			                    subs_obj_id_store.push(ii);
		                    	if(m==0)
		                    	  subs_obj_id=contactAddStore.getAt(m).get('CONS_NO');
		                    	else   
		                    	  subs_obj_id+=','+contactAddStore.getAt(m).get('CONS_NO');
		                    }
		                    for(var k=0;k<smsSubscribeObjList.length;k++){
		                    	if(smsSubscribeObjList[k].EVENT_NO==selectedEventCode){
		                    		smsSubscribeObjList[k].SUBS_OBJ_ID_STORE=subs_obj_id_store;
		                    		smsSubscribeObjList[k].SUBS_OBJ_ID=subs_obj_id;
		                    		break;
		                    	}
		                    }
	                    }
	                    contactDefTabPanel.setActiveTab(1);
	             }
			}
			],
		 dockedItems: [{
		        xtype: 'pagingtoolbar',
		        store: contactDefStore,   
		        dock: 'bottom',
		        displayInfo: true
		    }]
	});
	
	 Ext.define('contactAdd',{
		extend : 'Ext.data.Model',
		fields : [      
					'ORG_NO',
				    'ORG_NAME',
				    'CONS_NO',
				    'CONS_NAME',
				    'ELEC_ADDR',
				    'LINE_NAME',
				    'TG_NAME',
				    'MR_SECT_NO',
				    'RUN_CAP'
			      ]
	});
	
	var contactAddSelectModel = Ext.create('Ext.selection.CheckboxModel',{

	});
	
	var contactAddStore = Ext.create('Ext.data.Store', {
		model : 'contactAdd',
		remoteSort : true,
		buffered: true,
		proxy : new Ext.data.MemoryProxy()
	});
		
	var contactAddGridPanel=Ext.create('Ext.grid.Panel', {
		border : false,
		selModel : contactAddSelectModel,
		store: contactAddStore,
		stripeRows: true,
		columnLines : true,
		columns:[Ext.create('Ext.grid.RowNumberer', {
						header : '序号',
						width : 30
						}),
		   {header:'供电单位',dataIndex:'ORG_NAME',sortable:false,align:'center'},
		   {header:'用户编号',dataIndex:'CONS_NO',sortable:false,align:'center'},
		   {header:'用户名称',dataIndex:'CONS_NAME',sortable:false,align:'center'},
		   {header:'用电地址',dataIndex:'ELEC_ADDR',sortable:false,align:'center'},
		   {header:'所属线路',dataIndex:'LINE_NAME',sortable:false,align:'center'},
		   {header:'所属台区',dataIndex:'TG_NAME',sortable:false,align:'center'},
		   {header:'抄表段号',dataIndex:'MR_SECT_NO',sortable:false,align:'center'},
		   //{header:'终端地址',dataIndex:'',sortable:false,align:'center'},
		  // {header:'电能表资产号',dataIndex:'',sortable:false,align:'center'},
		   {header:'运行容量',dataIndex:'RUN_CAP',sortable:false,align:'center'}
		],
		tbar:[
			{xtype: 'tbfill'},{		
	             xtype:"button",
	             text:"删除",
	             iconCls: 'cancel',
	             handler : function() {
	             	var contacts = contactAddSelectModel.getSelection();
                    if(Ext.isEmpty(contacts)){
                        Ext.MessageBox.alert("提示","请选择要删除的联系人");
                        return;
                    }
                    for(var i=0;i<contacts.length;i++){
	                    contactAddStore.remove(contacts[i]);
                    }
                    var subs_obj_id_store =new Array();
                    var subs_obj_id='';
                    for(var m=0;m<contactAddStore.getCount();m++){
                    	/*subs_obj_id_store[m]= new Array();
                    	subs_obj_id_store[m]['ORG_NO']=contactAddStore.getAt(m).get('ORG_NO');
                    	subs_obj_id_store[m]['ORG_NAME']=contactAddStore.getAt(m).get('ORG_NAME');
                    	subs_obj_id_store[m]['CONS_NO']=contactAddStore.getAt(m).get('CONS_NO');
                    	subs_obj_id_store[m]['CONS_NAME']=contactAddStore.getAt(m).get('CONS_NAME');
                    	subs_obj_id_store[m]['ELEC_ADDR']=contactAddStore.getAt(m).get('ELEC_ADDR');
                    	subs_obj_id_store[m]['LINE_NAME']=contactAddStore.getAt(m).get('LINE_NAME');
                    	subs_obj_id_store[m]['TG_NAME']=contactAddStore.getAt(m).get('TG_NAME');
                    	subs_obj_id_store[m]['MR_SECT_NO']=contactAddStore.getAt(m).get('MR_SECT_NO');
                    	subs_obj_id_store[m]['RUN_CAP']=contactAddStore.getAt(m).get('RUN_CAP');*/
                    	 var ii={
	                        'ORG_NO':contactAddStore.getAt(m).get('ORG_NO'),
	                        'ORG_NAME':contactAddStore.getAt(m).get('ORG_NAME'),
	                        'CONS_NO':contactAddStore.getAt(m).get('CONS_NO'),
	                        'CONS_NAME':contactAddStore.getAt(m).get('CONS_NAME'),
	                        'ELEC_ADDR':contactAddStore.getAt(m).get('ELEC_ADDR'),
	                        'LINE_NAME':contactAddStore.getAt(m).get('LINE_NAME'),
	                        'TG_NAME':contactAddStore.getAt(m).get('TG_NAME'),
	                        'MR_SECT_NO':contactAddStore.getAt(m).get('MR_SECT_NO'),
	                        'RUN_CAP':contactAddStore.getAt(m).get('RUN_CAP')
	                    };
	                    subs_obj_id_store.push(ii);
                    	if(m==0)
                    	  subs_obj_id=contactAddStore.getAt(m).get('CONS_NO');
                    	else   
                    	  subs_obj_id+=','+contactAddStore.getAt(m).get('CONS_NO');
                    }
                    for(var k=0;k<smsSubscribeObjList.length;k++){
                    	if(smsSubscribeObjList[k].EVENT_NO==selectedEventCode){
                    		smsSubscribeObjList[k].SUBS_OBJ_ID_STORE=subs_obj_id_store;
                    		smsSubscribeObjList[k].SUBS_OBJ_ID=subs_obj_id;
                    		break;
                    	}
                    }
	             }
			}] 
	});
	
	var contactDefTabPanel = new Ext.TabPanel({
	   region:'center',
	   activeTab: 0,
	  // border : false,
	   items:[{
	      title:'用户明细',
	      layout:'fit',
	      items:[contactDefGridPanel]
	      
	   },{
	      title:'已添加联系人',
	      layout:'fit',
	      items:[contactAddGridPanel]
	   
	   }]
	});
	
	var contactDefQueryPanelFit = Ext.create('Ext.panel.Panel',{
		border : false,
		region:'north',
		height:80,
		items:[contactDefQueryPanel]
	});
	
	var msgSubPanel3 = new Ext.Panel({
		id:'msgSubPanel3',
		border : false,
		title: '发送人定义',
		layout:'border',
		items: [contactDefQueryPanelFit,contactDefTabPanel],
		buttonAlign:'right',
		buttons:[{
		   	    width:80,
		   	    text:'上一步',
	            handler:function(){
	               msgSubPanel.layout.setActiveItem(1);
	            }
		},{
		   	    width:80,
		   	    text:'完成',
	            handler:function(){
	            	if(checkSmsSubScribeInfo()){
	              		saveSmsSubscribeInfo();
	            	}
	            }  	 
		}]
	});
	
	var msgSubPanel = new Ext.Panel({
		layout : 'card',
		activeItem : 0,
		border : false,
		items : [msgSubPanel1,msgSubPanel2,msgSubPanel3]
	});
	
	renderModel(msgSubPanel, '短信订阅创建');
	
	Ext.Ajax.request({
		url : './MsgManageAction!queryOOrgByOrgNo.action',
		params : {
			'queryItems.orgNo':LOGGEDORGNO
		},
		success : function(response) {
			var result = Ext.decode(response.responseText); 
			var list = result.resultList;
			orgNameField.setValue(list[0].ORG_NAME);
    	}
	});
	
	
	function moveEvent(dataEvent,selectedEvent){
        var fromList = dataEvent.boundList;
        var toList = selectedEvent.boundList;
        var selected = this.getSelections(fromList);
        fromList.getStore().remove(selected);
        toList.getStore().add(selected);
        toList.refresh();
        fromList.refresh();
        var si =   toList.getStore().sortInfo;
        if(si){
            toList.getStore().sort(si.field, si.direction);
        }
        toList.select(selected);
	}
	
	function moveAllEvent(dataEvent,selectedEvent){
		var fromList = dataEvent.boundList;
		var toList = selectedEvent.boundList;
        var selected =  [];
        for (var i=0; i<fromList.getStore().getCount(); i++) {
            var record = fromList.getStore().getAt(i);
            selected.push(record);
        }    
        fromList.getStore().removeAll();
        toList.getStore().add(selected);
        toList.refresh();
        fromList.refresh();
        var si = toList.getStore().sortInfo;
        if(si){
            toList.getStore().sort(si.field, si.direction);
        }        
	}

	//保存短信订阅信息function
	function saveSmsSubscribeInfo(){
		var contanctArray=new Array();
		for(var i=0;i<smsSubscribeObjList.length;i++){
			contanctArray[i]=Ext.encode(smsSubscribeObjList[i]);
		}
        Ext.getBody().mask("保存中...");
    	Ext.Ajax.request({
     		url:'./MsgManageAction!saveSmsSubscribeInfo.action',
     		params : {
     			'queryItems.subscribeName':Ext.String.trim(subNameField.getValue()), 
     			'queryItems.subsTypeCode':subTypeCombox.getValue(), 
     			'queryItems.sendUserLimit':sendRangeCombox.getValue(), 
     			'queryItems.startDate':Ext.Date.format(sendStartDate.getValue(),'Y-m-d'), 
     			'queryItems.endDate':Ext.Date.format(sendEndDate.getValue(),'Y-m-d'), 
				'queryItems.sendTimeS':sendTimeStartHCombox.getValue()+':'+sendTimeStartMCombox.getValue(), 
				'queryItems.sendTimeE':sendTimeEndHCombox.getValue()+':'+sendTimeEndMCombox.getValue(),  
				paramList:contanctArray, 
				'queryItems.eventSrc':dataRecCombox.getValue(),
				'queryItems.orgNo':LOGGEDORGNO,
				'queryItems.staffNo':LOGGEDSTAFFNO
     		},
     		success : function(response){
 	    		var result = Ext.decode(response.responseText);
			    if(result.FLAG==1){
                    Ext.MessageBox.alert("提示","短信订阅成功！");
                    msgSubPanel.layout.setActiveItem(0);
                    selectedEventCode='';
                }
                else{
                    Ext.MessageBox.alert("提示","短信订阅失败！");
                }
        	},
        	callback:function(){
        		Ext.getBody().unmask();
        	}
     	});	
    }
    
    function  checkSmsSubScribeInfo(){
    	if(sendRangeCombox.getValue()=='01'){
	    	for(var i=0;i<smsSubscribeObjList.length;i++){
	    		if(smsSubscribeObjList[i].STAFF_NO_ID=='' && smsSubscribeObjList[i].STAFF_TEMPLATE_ID==''
		    		&& smsSubscribeObjList[i].SUBS_OBJ_ID=='' && smsSubscribeObjList[i].CONS_TEMPLATE_ID=='' && smsSubscribeObjList[i].DEFINE_USER_ID==''
		    		&& smsSubscribeObjList[i].DEF_TEMPLATE_ID==''){
		    			Ext.MessageBox.alert("提示","请对【"+smsSubscribeObjList[i].EVENT_NAME+"】事件订阅对象进行设置");
		    			return false;
	    		}
	    		else if(smsSubscribeObjList[i].STAFF_NO_ID!='' || smsSubscribeObjList[i].STAFF_TEMPLATE_ID!=''){
	    			 if(smsSubscribeObjList[i].STAFF_TEMPLATE_ID==''){
	    			 	Ext.MessageBox.alert("提示","请对【"+smsSubscribeObjList[i].EVENT_NAME+"】事件指定主站操作员短信模板");
		    			return false;
	    			 }
	    			 else if(smsSubscribeObjList[i].STAFF_NO_ID=='' ){
	    			 	Ext.MessageBox.alert("提示","请对【"+smsSubscribeObjList[i].EVENT_NAME+"】事件添加主站操作员");
		    			return false;
	    			 }
	    			 else if(smsSubscribeObjList[i].STAFF_NO_ID.length>100){
	    			 	Ext.MessageBox.alert("提示","【"+smsSubscribeObjList[i].EVENT_NAME+"】事件的主站操作员工号总长度过长，请调整在100以内");
		    			return false;
	    			 }
	    		}
	    		else if(smsSubscribeObjList[i].CONS_NO_ID!='' || smsSubscribeObjList[i].SUBS_OBJ_ID!='' || smsSubscribeObjList[i].CONS_TEMPLATE_ID!=''){
	    			if(smsSubscribeObjList[i].CONS_NO_ID==''){
	    			 	Ext.MessageBox.alert("提示","请对【"+smsSubscribeObjList[i].EVENT_NAME+"】事件选择用户联系人类型");
		    			return false;
	    			 }
	    			 else if( smsSubscribeObjList[i].CONS_TEMPLATE_ID==''){
	    			 	Ext.MessageBox.alert("提示","请对【"+smsSubscribeObjList[i].EVENT_NAME+"】事件指定用户联系人短信模板");
		    			return false;
	    			 }
	    			 else if(smsSubscribeObjList[i].SUBS_OBJ_ID==''){
	    			 	Ext.MessageBox.alert("提示","请对【"+smsSubscribeObjList[i].EVENT_NAME+"】事件添加用户联系人");
		    			return false;
	    			 }
	    		}
	    		else if(smsSubscribeObjList[i].DEFINE_USER_ID!='' || smsSubscribeObjList[i].DEF_TEMPLATE_ID!=''){
	    			 if(smsSubscribeObjList[i].DEF_TEMPLATE_ID==''){
	    			 	Ext.MessageBox.alert("提示","请对【"+smsSubscribeObjList[i].EVENT_NAME+"】事件指定自定义联系人短信模板");
		    			return false;
	    			 }
	    			 else if(smsSubscribeObjList[i].DEFINE_USER_ID==''){
	    			 	Ext.MessageBox.alert("提示","请对【"+smsSubscribeObjList[i].EVENT_NAME+"】事件添加自定义联系人");
		    			return false;
	    			 }
	    			 else if(smsSubscribeObjList[i].DEFINE_USER_ID.length>100){
	    			 	Ext.MessageBox.alert("提示","【"+smsSubscribeObjList[i].EVENT_NAME+"】事件的自定义联系人总手机号码过长，请调整在100以内");
		    			return false;
	    			 }
	    		}
	    	}
			return true;
    	}
    	else {
	    	for(var i=0;i<smsSubscribeObjList.length;i++){
	    		if(smsSubscribeObjList[i].STAFF_NO_ID=='' && smsSubscribeObjList[i].STAFF_TEMPLATE_ID==''
		    		&& smsSubscribeObjList[i].CONS_NO_ID=='' && smsSubscribeObjList[i].CONS_TEMPLATE_ID=='' && smsSubscribeObjList[i].DEFINE_USER_ID==''
		    		&& smsSubscribeObjList[i].DEF_TEMPLATE_ID==''){
		    			Ext.MessageBox.alert("提示","请对【"+smsSubscribeObjList[i].EVENT_NAME+"】事件订阅对象进行设置");
		    			return false;
	    		}
	    		else if(smsSubscribeObjList[i].STAFF_NO_ID!='' || smsSubscribeObjList[i].STAFF_TEMPLATE_ID!=''){
	    			 if(smsSubscribeObjList[i].STAFF_TEMPLATE_ID==''){
	    			 	Ext.MessageBox.alert("提示","请对【"+smsSubscribeObjList[i].EVENT_NAME+"】事件指定主站操作员短信模板");
		    			return false;
	    			 }
	    			 else if(smsSubscribeObjList[i].STAFF_NO_ID==''){
	    			 	Ext.MessageBox.alert("提示","请对【"+smsSubscribeObjList[i].EVENT_NAME+"】事件添加主站操作员");
		    			return false;
	    			 }
	    		}
	    		else if(smsSubscribeObjList[i].CONS_NO_ID!='' || smsSubscribeObjList[i].CONS_TEMPLATE_ID!=''){
	    			 if(smsSubscribeObjList[i].CONS_TEMPLATE_ID==''){
	    			 	Ext.MessageBox.alert("提示","请对【"+smsSubscribeObjList[i].EVENT_NAME+"】事件指定用户联系人短信模板");
		    			return false;
	    			 }
	    			 else if(smsSubscribeObjList[i].CONS_NO_ID==''){
	    			 	Ext.MessageBox.alert("提示","请对【"+smsSubscribeObjList[i].EVENT_NAME+"】事件选择用户联系人类型");
		    			return false;
	    			 }
	    		}
	    		else if(smsSubscribeObjList[i].DEFINE_USER_ID!='' || smsSubscribeObjList[i].DEF_TEMPLATE_ID!=''){
	    			 if( smsSubscribeObjList[i].DEF_TEMPLATE_ID==''){
	    			 	Ext.MessageBox.alert("提示","请对【"+smsSubscribeObjList[i].EVENT_NAME+"】事件指定自定义联系人短信模板");
		    			return false;
	    			 }
	    			 else if(smsSubscribeObjList[i].DEFINE_USER_ID==''){
	    			 	Ext.MessageBox.alert("提示","请对【"+smsSubscribeObjList[i].EVENT_NAME+"】事件添加自定义联系人");
		    			return false;
	    			 }
	    		}
	    	}
			return true;
    	}
    }
    
    getSelections = function(list){
        var store = list.getStore(),
            selections = list.getSelectionModel().getSelection(),
            i = 0,
            len = selections.length;
            
        return Ext.Array.sort(selections, function(a, b){
            a = store.indexOf(a);
            b = store.indexOf(b);
            
            if (a < b) {
                return -1;
            } else if (a > b) {
                return 1;
            }
            return 0;
        });
    };
});
	