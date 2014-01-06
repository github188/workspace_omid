Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', './ext4/examples/ux');
Ext.require([
    'Ext.ux.form.MultiSelect','Ext.selection.*'
]);
Ext.onReady(function() {
	
//	var selectTgId;
	//订阅事件明细;
	var smsSubscribeObjList = new Array();
	
	//当前选择事件
	var selectedEventCode='';
	var resetFlag=0;
	
	Ext.define('eventSrcstoreModel',{
		extend:'Ext.data.Model',
		fields:[
				"EVENT_SRC_CODE",
				"EVENT_SRC_NAME"
			]
	});
	
	//事件来源store	
	var eventSrcStore = Ext.create('Ext.data.Store',{
		model:'eventSrcstoreModel',
		proxy : {	
			type : 'ajax',
			url:'./MsgSubscribeManageAction!queryEventSrc.action',
			reader : {
	    			type:'json',
	    			root : "resultList"
			}
		}
    });
	var dataRecCombox = Ext.create('Ext.form.field.ComboBox',{
			fieldLabel:'事件来源',
		    width:250,
		    x:10,
			mode : "local",
			labelSeparator : '',
		 	labelAlign : 'right',
			forceSelection : true,
			triggerAction : 'all',
			selectOnFocus : true,
			store : eventSrcStore,
			displayField : 'EVENT_SRC_NAME',
		    valueField : 'EVENT_SRC_CODE',
		    editable : false

	});
	eventSrcStore.load();
	
	var dataEventStore = new Ext.data.JsonStore({
			proxy: {
		        type: 'ajax',
		        url: './MsgSubscribeManageAction!queryExceptEvent.action',
		        reader: {
		            type: 'json',
		            root: 'resultList'
		        }
		    },
		    fields : ['EVENT_CODE','EVENT_NAME'],
		    sortInfo: {field: 'EVENT_CODE', direction:'ASC'}
	    });
 	var dataEvent = Ext.create('Ext.ux.form.MultiSelect',{
            height:400,
            width: 220,
            displayField : 'EVENT_NAME',
            valueField : 'EVENT_CODE',
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
    var selectedEvent = Ext.create('Ext.ux.form.MultiSelect',{
            height:400,
            width: 220,
            displayField : 'EVENT_NAME',
            valueField : 'EVENT_CODE',
            store: dataEventStore2,
            listeners: {
                 boundList: {
                     itemdblclick: function() {
			 	         moveEvent(selectedEvent,dataEvent);
			    		}
                 }
             }
    });
    
	var msgSubTypePanel11 = Ext.create('Ext.panel.Panel',{
			border:false,
			height:450,
			layout:'table',
			layoutConfig : {
				columns :3
		    },
		    defaults: {height: 450},
			items:[{
				border : false,
			    width:310,
		  		labelSeparator : '',
		 	    labelAlign : 'right',
				labelWidth : 70,	
				x:40,
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
		  		labelSeparator : '',
		 	    labelAlign : 'right',
				labelWidth : 30,	
				x:60,
				items:[selectedEvent]	
			}]
	});
	
	var msgSubTypePanel = Ext.create('Ext.panel.Panel',{
		autoScroll : true,
//		layout:'form',
		labelSeparator : '',
 	    labelAlign : 'right',
		labelWidth : 70,	
 		bodyStyle : 'padding:10px 0px 0px 0px', 	
		items:[dataRecCombox,msgSubTypePanel11],
		buttonAlign:'right',
		buttons:[{
		   	    width:80,
		   	    text:'下一步',
	            handler:function(){
	            	if(Ext.isEmpty(dataRecCombox.getValue())){
            			Ext.Msg.alert("提示","请选择事件来源");
	                	return;
	            	}
	                if(selectedEvent.boundList.getStore().getCount()==0){
	                	Ext.Msg.alert("提示","请选择事件");
	                	return;
	                }
					var eventNoArray=new Array();
					for(var i=0; i<selectedEvent.boundList.getStore().getCount(); i++){
						eventNoArray[i]=selectedEvent.boundList.getStore().getAt(i).get('EVENT_CODE');
					}
				    // 检查是否有已经存在的事件
					Ext.Ajax.request({
			     		url:'./MsgSubscribeManageAction!checkEventNo.action',
			     		params : {
			     			id: addSubscribeId,
							paramList: eventNoArray
			     		},
			     		success : function(response){
			 	    		var result = Ext.decode(response.responseText);
						    if(result.FLAG == 1 && Ext.isEmpty(result.resultList)){
						    	nextStep();
						    }
			                else if(!Ext.isEmpty(result.resultList)){
			                	function doNextStep(btn){
									if(btn=='no') 
						              	return;
						            nextStep();  							              	
  								}
			                	var ss="所选事件中的"
			                	for(i=0;i<result.resultList.length;i++){
			                		ss+="【"+result.resultList[i]['EVENT_NAME']+"】"
			                	}
			                	ss+="已存在，是否覆盖？";
  								Ext.MessageBox.confirm('提示', ss, doNextStep);
			                }
			        	},
			        	callback:function(){
			        		Ext.getBody().unmask();
			        	}
			     	});	
					function nextStep(){
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
//	      				if(sendRangeCombox.getValue()=='01'){
						if(sendUserLimit=='01'){
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
//								"text" : selectedEvent.boundList.getStore().getAt(i).get('EVENT_NAME'),
//								"leaf" : true
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
	            }  	 
		}]
	})
	
	var msgSubPanel1 = Ext.create('Ext.panel.Panel',{
		id:'msgSubPanel1',
	    border : false,
		layout: 'fit',
		items: [msgSubTypePanel]
		
	});

	
	//--------------订阅对象设置------------------------------------------------------

	var eventListSelectModel = Ext.create('Ext.selection.CheckboxModel',{
			  	injectCheckbox:false,
				mode : 'SINGLE'
	})
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
	
	
	var eventList = Ext.create('Ext.grid.Panel',{
		border : true,
//		title:'所选异常',
	    width:300,
	    height:427,
  		labelSeparator:'',
 	    labelAlign : 'right',
		bodyStyle : 'padding:0px 0px 0px 0px',
//		labelAlign : 'right',
		stripeRows: true,
		store : eventListStore,
		loadMask:true,
		selModel : eventListSelectModel,
		viewConfig : {
			forceFit : false
		},
		columns : [
			   {header:'事件名称',dataIndex:'eventName',sortable:false,align:'left',width:295}
			],
		listeners : {
		      	select :function(model, r, index,e ){
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
		      							/**for(var n=0;n<cc.length;n++){
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
    
	
	Ext.define('statContactCm',{
			extend : 'Ext.data.Model',
			filed:[
				"ORG_NO",
			    "ORG_NAME",
			    "STAFF_NO",
			    "U_NAME",
			    "MOBILE_NO",
			    "D_NAME",
			    "ROLE_DESC"
			]
	})
	var selectModel = Ext.create('Ext.selection.CheckboxModel',{
//			mode : 'SINGLE'
			mode : 'MULTI'
	});	
	var statContactStore = Ext.create('Ext.data.Store',{
			model : 'statContactCm',
			remoteSort : true,
			buffered: true,
			proxy  : new Ext.data.MemoryProxy()
	});
			
	var statContactList = Ext.create('Ext.grid.Panel',{
			width:250,
		    height:325,
			stripeRows: true,
			store : statContactStore,
			loadMask:true,
			selModel : selectModel,
			viewConfig : {
				forceFit : false
			},
			columns:[
			   {header:'单位名称11',dataIndex:'ORG_NAME',sortable:false,align:'center'},
			   {header:'工号',dataIndex:'STAFF_NO',sortable:false,align:'center'},
			   {header:'联系人',dataIndex:'U_NAME',sortable:false,align:'center'},
			   {header:'联系电话',dataIndex:'MOBILE_NO',sortable:false,align:'center'},
			   {header:'角色',dataIndex:'ROLE_DESC',sortable:false,align:'center'}
			]
	});
	
	var statContactPanel1 = Ext.create('Ext.panel.Panel',{
		border : false,
	    width:300,
  		labelSeparator : '',
 	    labelAlign : 'right',
 	    labelWidth : 80,	
		bodyStyle : 'padding:15px 0px 0px 20px',
		items:[{
	    	xtype:'textfield',
	    	fieldLabel:'主站操作人员',
	    	hidden :true,
    		labelSeparator : ''
	       },statContactList,
	       {
	       	xtype:'panel',
	        layout:'column',
   	        border : false,
   	        height:30,
   	        items:[{
   	            columnWidth:.5,
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
   	            border : false,
   	            bodyStyle : 'padding:5px 0px 0px 20px',
   	            items:[{
   	            	xtype:'button',
			   	    width:80,
			   	    text:'删除',
		            handler:function(){
	             		var contacts =  selectModel.getSelection();
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
			extend: 'Ext.data.Model',
			fields:[  'SEND_TYPE_CODE',
				     'TEMPLATE_NAME',
				    'TEMPLATE_CONTENT'
			],
			idProperty: 'SEND_TYPE_CODE'
	})
	var msgTemplateStore = Ext.create('Ext.data.Store',{
		model : 'msgTemplateModel',
		proxy : {
			type:'ajax',
			url:'./MsgSubscribeManageAction!queryAllMsgTemplate.action',
			reader : {
					type:'json',
					root : 'resultList'
				}
			}
	});
	
	var msgTempletCombox = Ext.create('Ext.form.field.ComboBox',{
		name:'msgTempletCombox',
		fieldLabel:'短信模板',
		labelSeparator : '',
	    width:200,
//		mode : "local",
		queryMode : "local",
		forceSelection : true,
		triggerAction : 'all',
		labelAlign : 'right',
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
//                var r = new msgTemplateStore.recordType(ii);
                idArray.push(ii);
				msgTemplateStore.add(idArray);
			}
		}
	});
	
    var msgContent = Ext.create('Ext.form.field.TextArea',{
    	    hideLabel : true,
    	    readOnly:true,
    		width:255,
    		height:350
    });
    
	var statContactPanel2 =  Ext.create('Ext.panel.Panel',{
		border : false,
	    width:300,
 	    labelAlign : 'right',
		labelWidth : 50,
 	    bodyStyle : 'padding:15px 0px 0px 0px',
		items:[msgTempletCombox,msgContent]
	});
	
	var statContactPanel = Ext.create('Ext.panel.Panel',{
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
	var contactModeCheckGroup = Ext.create('Ext.form.CheckboxGroup',{
		hideLabel : true,
		width:100,
		columns:1, 
		items : [{	
					name : 'contactMode',
					inputValue:'01',
					boxLabel : '电气联系人'
				}, {	
					name : 'contactMode',
					inputValue:'02',
					boxLabel : '账务联系人'
				}, {	
					name : 'contactMode',
					inputValue:'03',
					boxLabel : '停送电联系人'
				}],
		 listeners : {
	      		change:function(group,newValue,oldValue,e) {
	      			if(resetFlag==0){
		      			var cons_no_id='';
		      			if(!Ext.isEmpty(newValue['contactMode'])){
	      					cons_no_id=newValue['contactMode'];
	      				}
	                    for(var k=0;k<smsSubscribeObjList.length;k++){
	                    	if(smsSubscribeObjList[k].EVENT_NO==selectedEventCode){
	                    		smsSubscribeObjList[k].CONS_NO_ID=newValue['contactMode'];
	                    		break;
	                    	}
	                    }
	      			}
	      		}
	      }		
				
	});
	
	var consContactPanel1 = Ext.create('Ext.panel.Panel',{
		border : false,
	    width:300,
 	    labelAlign : 'right',
 	    labelWidth : 90,	
		bodyStyle : 'padding:15px 0px 0px 20px',
		items:[{
	    	xtype : 'label',
			html : "<font font-weight:bold;>用户联系人类型</font>",
			height:27
	       },{
	       	xtype:'panel',
	        height:350,
	        width:250,
	        bodyStyle : 'padding:5px 0px 0px 5px',
	        items:[contactModeCheckGroup]
	       }]
	});
	
	var msgTempletCombox2 = Ext.create('Ext.form.field.ComboBox',{
		name:'msgTempletCombox2',
		fieldLabel:'短信模板',
		labelSeparator : '',
	    width:200,
//		mode : "local",
	    queryMode : "local",
		labelAlign:'right',
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
	                    /*if(sFlag==0){
	                		var smsSubscribeObj = {};
	                		smsSubscribeObj.EVENT_NO=selectedEventCode;
	                		smsSubscribeObj.CONS_TEMPLATE_ID=record.get('SEND_TYPE_CODE');
	                		smsSubscribeObjList.push(smsSubscribeObj);
	                	}*/
		      			msgContent2.setValue(records[0].get('TEMPLATE_CONTENT'));
		      		}
		     }
	});
    var msgContent2 = Ext.create('Ext.form.field.TextArea',{
    	    hideLabel : true,
    		width:255,
    		height:350
    });
    
    var consContactPanel2 = Ext.create('Ext.panel.Panel',{
		border : false,
	    width:300,
//  		layout:'form',
 	    labelAlign : 'right',
		labelWidth : 50,
 	    bodyStyle : 'padding:15px 0px 0px 0px',
		items:[msgTempletCombox2,msgContent2]
	});
    
	var consContactPanel = Ext.create('Ext.panel.Panel',{
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
//			mode : 'SINGLE'
			mode : 'MULTI'
	});
	var selfDeMsgConsStore = Ext.create('Ext.data.Store', {
		model : 'selfDeMsgCons',
		remoteSort : true,
		buffered: true,
		proxy : new Ext.data.MemoryProxy()
	});
	var selfDeMsgConsGrid =Ext.create('Ext.grid.Panel',{
			width:250,
		    height:325,
			stripeRows: true,
			selModel : selfDeMsgConsSelectModel ,
			store : selfDeMsgConsStore,
			loadMask:true,
			viewConfig : {
				forceFit : false
			},
			columns:[
				{header:'单位名称',dataIndex:'ORG_NAME',sortable:false,align:'center'},
			    {header:'联系人',dataIndex:'PERSONNEL_NAME',sortable:false,align:'center'},
			    {header:'联系电话',dataIndex:'MOBILE_NO',sortable:false,align:'center'},
			    {header:'职位',dataIndex:'POSITION',sortable:false,align:'center'}
			]
	});
	
	var selfDeContactPanel1 = Ext.create('Ext.panel.Panel',{
		border : false,
	    width:300,
  		labelSeparator : '',
 	    labelAlign : 'right',
 	    labelWidth : 70,	
		bodyStyle : 'padding:15px 0px 0px 20px',
		items:[{
	    	xtype:'panel',
	    	fieldLabel:'联系人列表',
	    	hidden :true,
    		labelSeparator : ''
	       },selfDeMsgConsGrid,
	       {
	       	xtype:'panel',
	        layout:'column',
   	        border : false,
   	        height:30,
   	        items:[{
   	            columnWidth:.5,
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
//   	            layout:'form',
   	            border : false,
       	        bodyStyle : 'padding:5px 0px 0px 20px',
   	            items:[{
   	            	xtype:'button',
			   	    width:80,
			   	    text:'删除',
		            handler:function(){
	             		var contacts = selfDeMsgConsSm.getSelections();
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
	                    	define_user_id_store[m]= new Array();
	                    	define_user_id_store[m]['CALLING_CARD_ID']=selfDeMsgConsStore.getAt(m).get('CALLING_CARD_ID');
	                    	define_user_id_store[m]['ORG_NAME']=selfDeMsgConsStore.getAt(m).get('ORG_NAME');
	                    	define_user_id_store[m]['PERSONNEL_NAME']=selfDeMsgConsStore.getAt(m).get('PERSONNEL_NAME');
	                    	define_user_id_store[m]['MOBILE_NO']=selfDeMsgConsStore.getAt(m).get('MOBILE_NO');
	                    	define_user_id_store[m]['POSITION']=selfDeMsgConsStore.getAt(m).get('POSITION');
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
			labelSeparator:'',
			width:180
		});
		
		var aBconsNameTF= new Ext.form.TextField({
			fieldLabel:'联系人',
			labelAlign : 'right',
			labelSeparator:'',
			width:180
		});
		
		var aBMObileNoTF= new Ext.form.TextField({
			fieldLabel:'手机号码',
			labelAlign : 'right',
			labelSeparator:'',
			width:180
		});
	
		var addressBookPanl = Ext.create('Ext.panel.Panel',{
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
				labelWidth : 50,
				items:[aBorgNameTF]	
			},{
				border : false,
			    width:190,
				labelWidth : 50,
				items:[aBconsNameTF]	
			},{
				border : false,
			    width:200,
				labelWidth : 50,
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
						addressBookStore.proxy.extraParams = {
										'queryItems.orgName': Ext.String.trim(aBorgNameTF.getValue()),
										'queryItems.consName': Ext.String.trim(aBconsNameTF.getValue()),
										'queryItems.mobileNo': Ext.String.trim(aBMObileNoTF.getValue())
									};
						addressBookStore.load();
					}
				}]
			}]
		});
				
		var addressBookSelectModel1 = Ext.create('Ext.selection.CheckboxModel',{});
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
				url : './MsgSubscribeManageAction!querySelfDeContact.action',
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
		var addressBookGrid = Ext.create('Ext.grid.Panel',{
				region:'center',
				selModel:addressBookSelectModel1,
				store : addressBookStore,
				stripeRows: true,
				loadMask:true,
				region:'center',
				viewConfig : {
					forceFit : true
				},
				columns:[
					   {header:'单位名称',dataIndex:'ORG_NAME',sortable:false,align:'center'},
					   {header:'联系人',dataIndex:'PERSONNEL_NAME',sortable:false,align:'center'},
					   {header:'联系电话',dataIndex:'MOBILE_NO',sortable:false,align:'center'},
					   {header:'职位',dataIndex:'POSITION',sortable:false,align:'center'}
				],
				tbar : [{
					xtype : 'label',
					htight:20,
					html : "<font font-weight:bold;>联系人明细</font>"
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
//		                    var r = new selfDeMsgConsStore.recordType(ii);
		                    idArray.push(ii);
	                    }
	                    if(idArray.length>0){
	                    	selfDeMsgConsStore.add(idArray);
		                    var define_user_id_store =new Array();
		                    var define_user_id='';
		                    for(var m=0;m<selfDeMsgConsStore.getCount();m++){
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
			labelAlign : 'right',
			labelSeparator:'',
			width:180
		});
		
		var aBconsNameTF= new Ext.form.TextField({
			fieldLabel:'联系人',
			labelAlign : 'right',
			labelSeparator:'',
			width:180
		});
		
		var aBMObileNoTF= new Ext.form.TextField({
			fieldLabel:'手机号码',
			labelAlign : 'right',
			labelSeparator:'',
			width:180
		});
	
		var addressBookPanl = Ext.create('Ext.panel.Panel',{
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
			    width:200,
				labelWidth : 50,
				
				items:[aBorgNameTF]	
			},{
				border : false,
			    width:200,
				labelWidth : 50,
				items:[aBconsNameTF]	
			},{
				border : false,
			    width:200,
				labelWidth : 50,
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
						addressBookStore.proxy.extraParams = {
											'queryItems.orgName' : Ext.String.trim(aBorgNameTF.getValue()),
											'queryItems.consName' : Ext.String.trim(aBconsNameTF.getValue()),
											'queryItems.mobileNo' :Ext.String.trim(aBMObileNoTF.getValue())
						};
						addressBookStore.currentPage=1;
						addressBookStore.load({  start:0  });
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
					    'D_NAME'
//					     'ROLE_DESC'
				      ] 
		});
		
		var addressBookStore =   Ext.create('Ext.data.Store', {
			model : 'addressBook',
			remoteSort : true,
			pageSize: DEFAULT_PAGE_SIZE,
			buffered: true,
			proxy : {
				type : 'ajax',//MsgSubscribeManageAction!
				url : './MsgSubscribeManageAction!queryStatContact.action',
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
		   
		var addressBookGrid = new Ext.grid.GridPanel({
				stripeRows: true,
				selModel:addressBookSelectModel,
				loadMask:true,
				store : addressBookStore,
				region:'center',
				viewConfig : {
					forceFit : true
				},
				columns:[
					{header:'单位名称',dataIndex:'ORG_NAME',sortable:false,align:'center'},
				    {header:'工号',dataIndex:'STAFF_NO',sortable:false,align:'center'},
				    {header:'联系人',dataIndex:'U_NAME',sortable:false,align:'center'},
				    {header:'联系电话',dataIndex:'MOBILE_NO',sortable:false,align:'center'},
				    {header:'职位',dataIndex:'D_NAME',sortable:false,align:'center'}
//				    {header:'角色',dataIndex:'ROLE_DESC',sortable:false,align:'center'}
				],
				tbar : [{
					xtype:'label',
					height:20,
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
//		                    var r = new statContactStore.recordType(ii);
		                    idArray.push(ii);
	                    }
	                    if(idArray.length>0){
	                    	statContactStore.add(idArray);
		                    var staff_no_id_store =new Array();
		                    var staff_no_id='';
		                    for(var m=0;m<statContactStore.getCount();m++){
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
	
	var msgTempletCombox3 = Ext.create('Ext.form.ComboBox',{
		name:'msgTempletCombox3',
		fieldLabel:'短信模板',
		labelSeparator : '',
	    width:200,
//		mode : "local",
	    queryMode : "local",
		forceSelection : true,
		labelAlign : 'right',
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
	
    var msgContent3= Ext.create('Ext.form.field.TextArea',{
    	    hideLabel : true,
    		width:255,
    		height:350
    });
    
	var selfDeContactPanel2 =  Ext.create('Ext.panel.Panel',{
		border : false,
	    width:300,
 	    labelAlign : 'right',
		labelWidth : 50,
 	    bodyStyle : 'padding:15px 0px 0px 0px',
		items:[msgTempletCombox3,msgContent3]
	});
	
	var selfDeContactPanel = Ext.create('Ext.panel.Panel',{
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
	
	var contactPanelFit = Ext.create('Ext.tab.Panel',{	
		border : true,
		activeTab: 0,
		width:600,
		
		items : [statContactPanel,consContactPanel,selfDeContactPanel]
	}); 
	
	var contactPanel = Ext.create('Ext.panel.Panel',{
		border : false,
		bodyStyle : 'padding:13px 0px 0px 0px',
		items : [contactPanelFit]
	});
	
	var button2 = new Ext.Button({
	   	    width:80,
	   	    text:'',
            handler:function(){
               if(sendUserLimit=='01'){
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
							contactAddStore.loadData(smsSubscribeObjList[i].SUBS_OBJ_ID_STORE);
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
	
	var msgSubPanel2Fit = Ext.create('Ext.panel.Panel',{
		border : false,
		autoScroll : true,
		region:'center',
		title: '订阅对象设置',
		height:450,
		layout:'table',
		bodyStyle : 'padding:0px 0px 0px 22px',
		layoutConfig : {
			columns :2
	    },
	    defaults: {height: 450},
		items: [eventList,contactPanel],
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
	
	var msgSubPanel2 = Ext.create('Ext.panel.Panel',{
		border : false,
		layout:'border',
		items:[msgSubPanel2Fit]
	});
	//--------------发送人定义------------------------------------------------------	
	//供电单位
	var tgNameField = Ext.create('Ext.form.field.Text',{
		fieldLabel : '所属台区',
		labelSeparator : '',
 	    labelAlign : 'right',
		labelWidth : 70,		 
		width:190
	});
	
	var copySectField = Ext.create('Ext.form.field.Text',{
		fieldLabel : '抄表段号',
  		labelSeparator : '',
 	    labelAlign : 'right',
		labelWidth : 70,
		width:190
	});
	
	var consNoField = Ext.create('Ext.form.field.Text',{
		fieldLabel : '用户编号',
  		labelSeparator : '',
 	    labelAlign : 'right',
		labelWidth : 70,
		width:190
	});
	
	var consNameField = Ext.create('Ext.form.field.Text',{
		fieldLabel : '用户名称',
        labelAlign: 'right',
        labelWidth:70,
        labelSeparator : '',
		width:190
	});
	
	var contactDefQueryPanel = Ext.create('Ext.panel.Panel',{
		region:'north',
		border : false,
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
	            width:200,
		        items:[consNameField]
			},{
				border:false,
			    width:810,
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
						};
						contactDefStore.proxy.extraParams = {
											'queryItems.tgId' : Ext.String.trim(tgNameField.getValue()),
											'queryItems.mrSectNo' : Ext.String.trim(copySectField.getValue()),
											'queryItems.consNo' : Ext.String.trim(consNoField.getValue()),
											'queryItems.consName' : Ext.String.trim(consNameField.getValue())
											};
						contactDefStore.load( {
							params : {
								start : 0,
								limit : DEFAULT_PAGE_SIZE
							}
						});
						contactDefStore.currentPage=1;
						contactDefStore.load({
						    	start:0
						});
						contactDefTabPanel.setActiveTab(0);
					}
				}]
			}]
	});
	///////////////////////
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
			url : './MsgSubscribeManageAction!queryConsContact.action',
			reader : {
				type : 'json',
				root : 'resultList',
				totalProperty : 'totalCount'
			}
		}	
	});
	 
	var contactDefGridPanel=Ext.create('Ext.grid.Panel',{
		border : false,
		store: contactDefStore,
		selModel : contactDefSelectModel,
		stripeRows: true,
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
	             iconCls: 'plus',
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
//		                    var r = new contactAddStore.recordType(ii);
		                    idArray.push(ii);
	                    }
                        if(idArray.length>0){
	                    	contactAddStore.add(idArray);
		                    var subs_obj_id_store =new Array();
		                    var subs_obj_id='';
		                    for(var m=0;m<contactAddStore.getCount();m++){
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
	var contactAddSelectModel = Ext.create('Ext.selection.CheckboxModel',{});
	var contactAddStore = Ext.create('Ext.data.Store', {
		model : 'contactAdd',
		remoteSort : true,
		buffered: true,
		proxy : new Ext.data.MemoryProxy()
	});

	var contactAddGridPanel= Ext.create('Ext.grid.Panel',{
		border : false,
		selModel : contactAddSelectModel,
		store: contactAddStore,
		stripeRows: true,
		columnLines : true,
		columns:[Ext.create('Ext.grid.RowNumberer', 
							{header : '序号', width : 30}
						),
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
	
//	var contactDefTabPanel = new Ext.TabPanel({
		var contactDefTabPanel = Ext.create('Ext.tab.Panel',{
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
	
	var msgSubPanel3 = Ext.create('Ext.panel.Panel',{
		id:'addMsgSubPanel3',
		border : false,
		title: '发送人定义',
		layout:'border',
		items: [contactDefQueryPanel,contactDefTabPanel],
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
	
	var msgSubPanel = Ext.create('Ext.panel.Panel',{
		layout : 'card',
		activeItem : 0,
		border : false,
		items : [msgSubPanel1,msgSubPanel2,msgSubPanel3]
	});
	

	renderModel(msgSubPanel, '添加订阅事件');	
//	renderModel(msgSubTypePanel11, '添加订阅事件');
	
//	renderTo:Ext.getBody();
	// 监听左边树点击事件
//	var valueQueryTreeListener = new LeftTreeListener({
//		modelName : '添加订阅事件',
//		processClick : function(p, node, e) {
//			var obj = node.attributes.attributes;
//			var type = node.attributes.type;
//			if(msgSubPanel.getLayout().activeItem.getId()=='addMsgSubPanel3'){
//				if (type == 'usr' && obj.consType=='2'){
//					selectTgId = obj.tgId;
//					tgNameField.setValue(node.text);
//				}
//			}
//		},
//	    processUserGridSelect:function(cm,row,record){
//			if(msgSubPanel.getLayout().activeItem.getId()=='addMsgSubPanel3'){
//				selectTgId=record.get('tgId');
//				tgNameField.setValue(record.get('consName'));
//			}
//	    }
//	});
	
	
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
     		url:'./MsgSubscribeManageAction!saveOrUpdateSmsSubscribeInfo.action',
     		params : {
     			'queryItems.id' :addSubscribeId,
     			'queryItems.sendUserLimit' :sendUserLimit, 
				paramList :contanctArray, 
				'queryItems.eventSrc' :dataRecCombox.getValue()
     		},
     		success : function(response){
 	    		var result = Ext.decode(response.responseText);
			    if(result.FLAG==1){
                    Ext.MessageBox.alert("提示","添加事件成功！");
                    msgSubPanel.layout.setActiveItem(0);
                    selectedEventCode='';
                    if(typeof(Ext.getCmp('msgSubscribeObjGrid')!='undefined')){
                    	Ext.getCmp('msgSubscribeObjGrid').getStore().load();
                    }
                    if(typeof(Ext.getCmp('msgSendObjGrid')!='undefined')){
                    	Ext.getCmp('msgSendObjGrid').getStore().removeAll();
                    }
                    Ext.getCmp('添加订阅事件').destroy();
                }
                else{
                    Ext.MessageBox.alert("提示","添加事件失败！");
                }
        	},
        	callback:function(){
        		Ext.getBody().unmask();
        	}
     	});	
    }
    
    function  checkSmsSubScribeInfo(){
    	if(sendUserLimit=='01'){
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
