Ext.onReady(function(){	
	Ext.define('protocolCodeModel',{
		extend : 'Ext.data.Model',
		fields : [{
			type : 'string',
			name : 'PROTOCOL_CODE'
		},{
			type : 'string',
			name : 'PROTOCOL_NAME'
		}]
	});
	
	var protocolCodeStore = Ext.create('Ext.data.Store', {
		model : 'protocolCodeModel',
		proxy : {
		    type : 'ajax',
		    url : './sysman/templateManageAction!queryProtocolCode.action',
		    reader : {
		        root : 'protocolCodeList'
 	        }
	    }
	});

	var protocolCodeComboBox = Ext.create('Ext.form.ComboBox', {
		id : 'protocolCodeComboBox',
		columnWidth : .2,
	    fieldLabel: '终端规约',
	    padding : '10px ',
	    labelAlign : 'right',
	    store: protocolCodeStore,
	    valueField: 'PROTOCOL_CODE',
	    displayField: 'PROTOCOL_NAME'
	});
	
	Ext.define('eventTypeCodeStore',{
		extend : 'Ext.data.Model',
		fields : [{
					type : 'string',
					name : 'EVENT_TYPE_CODE'
				}, {
					type : 'string',
					name : 'EVENT_TYPE_NAME'
				}]
	});
	
	var vwEventTypeCodeStore = Ext.create('Ext.data.Store',{
		model : 'eventTypeCodeStore',
		proxy : {
		    type : 'ajax',
		    url : './sysman/templateManageAction!queryEventTypeCode.action',
		    reader : {
		        root : 'eventTypeCodeList'
 	        }
	    }
	});

	var vwEventTypeCodeComboBox = Ext.create('Ext.form.ComboBox',{
		id : 'vwEventTypeCodeComboBox',
		fieldLabel : 'eventType',
		width : 200,
		labelAlign : 'left',
		store : vwEventTypeCodeStore,
		displayField : 'EVENT_TYPE_NAME',
		valueField : 'EVENT_TYPE_CODE',
		listeners : {
		    select : function(){
		       vwSeaAlarmCodeStore.load({
			      params : {
			         eventTypeCode : vwEventTypeCodeComboBox.getValue()
		          }
		       });
	        }
	    }
	});
	
	Ext.define('seaAlarmCodeStore',{
		extend : 'Ext.data.Model',
		fields : [{
					type : 'string',
					name : 'EVENT_NAME'
				}, {
					type : 'string',
					name : 'EVENT_NO'
				}]
	});
	
	var vwSeaAlarmCodeStore = Ext.create('Ext.data.Store',{
		model : 'seaAlarmCodeStore',
		proxy : {
		   type : 'ajax',
		   url : './sysman/templateManageAction!querySeaAlarmCode.action',
		   reader : {
		      root : 'seaAlarmCodeList' 
		   }	    
	   }
	});
	
	var vwSeaAlarmCodeComboBox = Ext.create('Ext.form.ComboBox',{
		id : 'vwSeaAlarmCodeComboBox',
		fieldLabel : 'alarmCode',
		width : 200,
		labelAlign : 'left',
		store : vwSeaAlarmCodeStore,
		displayField : 'EVENT_NAME',
		valueField : 'EVENT_NO'
	});
	
	Ext.define('tmnlTypeCodeModel',{
		extend : 'Ext.data.Model',
		fields : [{
			type : 'string',
			name : 'TMNL_TYPE_CODE'
		},{
			type : 'string',
			name : 'TMNL_TYPE'
		}]
	});
	
	var tmnlTypeCodeStore = Ext.create('Ext.data.Store', {
		model : 'tmnlTypeCodeModel',
		proxy : {
		    type : 'ajax',
		    url : './sysman/templateManageAction!queryTmnlTypeCode.action',
		    reader : {
		        root : 'tmnlTypeCodeList'
 	        }
	    }
	});
	
	var tmnlTypeCodeComboBox = Ext.create('Ext.form.ComboBox',{
		id : 'tmnlTypeCodeComboBox',
		columnWidth : .2,
	    fieldLabel: '终端类型',
	    padding : '10px ',
	    labelAlign : 'right',
	    store: tmnlTypeCodeStore,
	    displayField: 'TMNL_TYPE',
	    valueField: 'TMNL_TYPE_CODE'
	});
	
	var tmnlEventTempSetButton = Ext.create('Ext.Button', {
	    text: '查询',
	    handler: function() {
	        f9Store.load({
	        	params : {
	        	   tmnlTypeCode : tmnlTypeCodeComboBox.getValue(),
				   protocolCode : protocolCodeComboBox.getValue()
	            }
	        });
	    }
	});
	
	Ext.define('orgNoModel',{
		extend : 'Ext.data.Model',
		fields : [{
					type : 'string',
					name : 'ORG_NO'
				}, {
					type : 'string',
					name : 'ORG_NAME'
				}]
	});
	
	var orgNoStore = Ext.create('Ext.data.Store',{
		model : 'orgNoModel',
		proxy : {
		    type : 'ajax',
		    url : './sysman/templateManageAction!queryOrgNoNameByOrgType03.action',
		    reader : {
		       root : 'orgNoList'
	        }
	    }
	});
	
	orgNoStore.load();
			
	var orgNoGrid = Ext.create('Ext.grid.Panel',{
      region : 'center',
      store : orgNoStore,
      loadMask : true,
      border : false,
      viewConfig: {
      stripeRows: true
      },
      columns : [{
	    text : '供电单位编号',
	    dataIndex : 'ORG_NO',
	    align : 'center'
      },{
	  text : '供电单位名称',
	  dataIndex : 'ORG_NAME',
	  align : 'center'
      }]
   });
	
	var sendButton =  Ext.create('Ext.Button',{
	      text : '下发终端任务',
	      border : false,
	      region : 'south',
	      height : 20,
	      handler : function(){
    	   var row = orgNoGrid.getSelectionModel().getSelection(); 
    	   if(row.length>0){
    		   var orgNo = row[0].get('ORG_NO');
    		   Ext.Ajax.request({
    	     	   url : './sysman/templateManageAction!sendTmnlTask.action',
    	     	   params : {
    	     	       orgNoParam : orgNo
    	            },
    	        success : function(response) {
    					var result = Ext.decode(response.responseText);
    					if(result.retString=="success"){
    						Ext.Msg.alert('操作反馈', '生成终端参数成功，已通知前置');
    					}
    					else
    					Ext.Msg.alert('操作反馈', result.retString);
    	        }
    	       });
	       }
    	   else
    	   Ext.Msg.alert('提示', '请选择供电单位');
          }
    });
	
	var orgNoPanel = Ext.create('Ext.panel.Panel',{
		layout : 'border',
		border :　false,
		items : [
		         orgNoGrid,
			     sendButton 
			]
	});
	
	var orgNoWindow = Ext.create('Ext.window.Window', {
	    title: '供电单位列表',
	    height: 200,
	    width: 220,
	    layout: 'fit',
	    border : false,
	    closeAction : 'hide',
	    items: [orgNoPanel]
	  });
	
	var formTmnlParamButtonStep1 = Ext.create('Ext.Button',{
		text : '下发',
		handler : function(){
		  orgNoWindow.show();
	    }
	});
	
	var tmnlEventTempSetSaveButton = Ext.create('Ext.Button',{
		text : '保存',
		handler: function() {
		     var orgNoParam ;
		     var protocolCodeParam;
		     var tmnlTypeCodeParam;
		     var eventNoParam;
		     var recFlagParam;
		     var eventLevelParam;
		     var eventIsValidParam;
		     var createAppFlowParam;
		     var eventAnalParam;
		     var alarmCodeParam;
		    
		     var row = tmnlEventTempSetGrid.getSelectionModel().getSelection();
		     if(row.length>0){
		    	 orgNoParam = row[0].get('ORG_NO');
		    	 protocolCodeParam = row[0].get('PROTOCOL_CODE');
		    	 tmnlTypeCodeParam = row[0].get('TMNL_TYPE_CODE');
		    	 eventNoParam = row[0].get('EVENT_NO');
		    	 if(Ext.getCmp('recFlagOn').getValue()==true)
		    		 recFlagParam = '1';
		    	 else
		    	 if(Ext.getCmp('recFlagOff').getValue()==true)
		    		 recFlagParam = '0'; 
		    	 
		    	 if(Ext.getCmp('eventLevelImportant').getValue()==true)
		    		 eventLevelParam = '1';
		    	 else
		         if(Ext.getCmp('eventLevelNormal').getValue()==true)
		        	 eventLevelParam = '0';
		         
		    	 if(Ext.getCmp('eventIsValid0').getValue()==true)
		    		 eventIsValidParam = '0';
		    	 else
		    	 if(Ext.getCmp('eventIsValid1').getValue()==true)
			    	 eventIsValidParam = '1';
			     else
			     if(Ext.getCmp('eventIsValid2').getValue()==true)
				     eventIsValidParam = '2';
				 else
			     if(Ext.getCmp('eventIsValid3').getValue()==true)
				     eventIsValidParam = '3';
				     
		    	 if(Ext.getCmp('flowOff').getValue()==true)
		    	    createAppFlowParam = '0';
		    	 else
		    	 if(Ext.getCmp('flowOn').getValue()==true)
		    		createAppFlowParam = '1'; 
		    	 
		    	 if(Ext.getCmp('eventAnal0').getValue()==true)
		    		eventAnalParam = '0';
		    	 else
		    	 if(Ext.getCmp('eventAnal1').getValue()==true)
				    eventAnalParam = '1';
				 else
				 if(Ext.getCmp('eventAnal2').getValue()==true)
					eventAnalParam = '2';
		    	    
		    	 alarmCodeParam = vwSeaAlarmCodeComboBox.getValue();
		     }      	    
           Ext.Ajax.request({
        	   url : './sysman/templateManageAction!saveBTmnlEventTemplate.action',
        	   params : {
        	       orgNoParam : orgNoParam,
  		           protocolCodeParam : protocolCodeParam,
  		           tmnlTypeCodeParam : tmnlTypeCodeParam,
  		           eventNoParam : eventNoParam,
  		           recFlagParam : recFlagParam,
  		           eventLevelParam : eventLevelParam,
  		           eventIsValidParam : eventIsValidParam,
  		           createAppFlowParam : createAppFlowParam,
  		           eventAnalParam : eventAnalParam,
  		           alarmCodeParam : alarmCodeParam
               },
           success : function(response) {
   				var result = Ext.decode(response.responseText);
   				if(result.retString=="success"){
   					Ext.Msg.alert('操作反馈', '保存成功');
   					f9Store.load({
   			        	params : {
   			        	   tmnlTypeCode : tmnlTypeCodeComboBox.getValue(),
   						   protocolCode : protocolCodeComboBox.getValue()
   			            }
   			        });
   				}
   				else
   				if(result.retString=="failure")
   					Ext.Msg.alert('操作反馈', '保存失败');
           }
          });
	    }
	});
	
	var tmnlTypeProtocolTopPanel = Ext.create('Ext.panel.Panel',{
		region : 'north',
		height : 50,
		layout : 'column',
		border : false,
		items : [protocolCodeComboBox,tmnlTypeCodeComboBox,{
			padding:'10px 20px',
			columnWidth : .1,
			border : false,
			items : [tmnlEventTempSetButton]
		}]
	});
	
	Ext.define('f9Store',{
		extend : 'Ext.data.Model',
		fields : [{
					type : 'string',
					name : 'ORG_NO'
				}, {
					type : 'string',
					name : 'PROTOCOL_CODE'
				}, {
					type : 'string',
					name : 'TMNL_TYPE_CODE'
				}, {
					type : 'string',
					name : 'EVENT_NO'
				}, {
					type : 'string',
					name : 'EVENT_NAME'
				}, {
					type : 'string',
					name : 'REC_FLAG'
				}, {
					type : 'string',
					name : 'EVENT_LEVEL'
				}, {
					type : 'string',
					name : 'EVENT_ANAL'
				},{
					type : 'string',
					name : 'EVENT_IS_VALID'
				},{
					type : 'string',
					name : 'CREATE_APP_FLOW'
				},{
					type : 'string',
					name : 'ALARM_CODE'
				}]
	});
	
	var f9Store = Ext.create('Ext.data.Store',{
		model : 'f9Store',
		proxy : {
		    type : 'ajax',
		    url : './sysman/templateManageAction!queryF9Temp.action',
		    reader : {
		        root : 'f9TempList'
 	        }
	    }
	});
	
	var tmnlEventTempSetGrid = Ext.create('Ext.grid.Panel',{
		region : 'center',
		title : 'F9',
		store : f9Store,
		loadMask : true,
		viewConfig: {
            stripeRows: true
        },
		columns : [{
			text : '供电单位',
			dataIndex : 'ORG_NO',
			align : 'center',
			width : 80
		},{
			text : '终端规约',
			dataIndex : 'PROTOCOL_CODE',
			align : 'center',
			width : 80
		},{
			text : '终端类型',
			dataIndex : 'TMNL_TYPE_CODE',
			align : 'center',
			width : 80
		},{
			text : '事件编号',
			dataIndex : 'EVENT_NO',
			align : 'center',
			width : 80
		},{
			text : '事件名称',
			dataIndex : 'EVENT_NAME',
			align : 'center',
			width : 150
		},{
			text : 'recFlag',
			dataIndex : 'REC_FLAG',
			align : 'center',
			width : 70
		},{
			text : 'eventLevel',
			dataIndex : 'EVENT_LEVEL',
			align : 'center',
			width : 70
		},{
			text : 'eventAnal',
			dataIndex : 'EVENT_ANAL',
			align : 'center',
			width : 70
		},{
			text : 'eventIsValid',
			dataIndex : 'EVENT_IS_VALID',
			align : 'center',
			width : 70
		},{
			text : 'createAppFlow',
			dataIndex : 'CREATE_APP_FLOW',
			align : 'center',
			width : 70
		},{
			text : '事件编码',
			dataIndex : 'ALARM_CODE',
			align : 'center',
			width : 80
		}],
		listeners :{
        	'itemclick' : function(grid,record,item,index,e,options){
        	    if(record.get('REC_FLAG')==1){
        	       Ext.getCmp('recFlagOn').setValue(true);
        	    }else
        	    if(record.get('REC_FLAG')==0){
        	       Ext.getCmp('recFlagOff').setValue(true);
        	    }
        	    
        	    if(record.get('EVENT_LEVEL')==1){
                   Ext.getCmp('eventLevelImportant').setValue(true);        	   
        	    }else
        	    if(record.get('EVENT_LEVEL')==0){
        	       Ext.getCmp('eventLevelNormal').setValue(true);
        	    }
        	    
        	    if(record.get('EVENT_IS_VALID')==0){
        	    	Ext.getCmp('eventIsValid0').setValue(true);
        	    }else
        	    if(record.get('EVENT_IS_VALID')==1){
        	    	Ext.getCmp('eventIsValid1').setValue(true);
        	    }else
        	    if(record.get('EVENT_IS_VALID')==2){
        	    	Ext.getCmp('eventIsValid2').setValue(true);
        	    }else
        	    if(record.get('EVENT_IS_VALID')==3){
        	    	Ext.getCmp('eventIsValid3').setValue(true);
        	    }
        	    
        	    if(record.get('CREATE_APP_FLOW')==0){
        	    	Ext.getCmp('flowOff').setValue(true);
        	    }else
        	    if(record.get('CREATE_APP_FLOW')==1){
        	    	Ext.getCmp('flowOn').setValue(true);
        	    }
        	    
        	    if(record.get('EVENT_ANAL')==0){
        	    	Ext.getCmp('eventAnal0').setValue(true);
        	    }else
        	    if(record.get('EVENT_ANAL')==1){
        	    	Ext.getCmp('eventAnal1').setValue(true);
        	    }else
        	    if(record.get('EVENT_ANAL')==2){
        	    	Ext.getCmp('eventAnal2').setValue(true);
        	    }
            }
        }
	});
	
	var tmnlEventTempEditPanel = Ext.create('Ext.panel.Panel',{
		title : '编辑区',
		region : 'east',
		width : 250,
		items : [{
			xtype : 'form',
			border : false,
			layout : 'column',
			items : [{
				columnWidth : .5,
	            xtype: 'fieldset',
	            id : 'recFlag',
	            title: 'recFlag',
	            defaultType: 'radio',
	            layout: 'anchor',
	            items: [{
	                boxLabel: '打开',
	                name : 'recFlag',
	                id : 'recFlagOn',
	                inputValue: 1
	            }, {
	                boxLabel: '关闭',
	                name : 'recFlag',
	                id : 'recFlagOff',
	                inputValue: 0
	            }]
	        },{
	        	columnWidth : .5,
	            xtype: 'fieldset',
	            title: 'eventLevel',
	            defaultType: 'radio',
	            layout: 'anchor',
	            items: [{
	                boxLabel: '一般',
	                name: 'eventLevel',
	                id : 'eventLevelNormal',
	                inputValue: 0
	            }, {
	                boxLabel: '重要',
	                name: 'eventLevel',
	                id : 'eventLevelImportant',
	                inputValue: 1
	            }]
	        },{
	        	columnWidth : 1,
	            xtype: 'fieldset',
	            title: 'eventIsValid',
	            defaultType: 'radio',
	            layout: 'column',
	            items: [{
	            	columnWidth : .5,
	                boxLabel: '不生成异常',
	                name: 'eventIsValid',
	                id : 'eventIsValid0',
	                inputValue: 0
	            }, {
	            	columnWidth : .5,
	                boxLabel: '生成计量异常',
	                name: 'eventIsValid',
	                id : 'eventIsValid1',
	                inputValue: 1
	            },{
	            	columnWidth : .5,
	                boxLabel: '生成用电异常',
	                name: 'eventIsValid',
	                id : 'eventIsValid2',
	                inputValue: 2
	            },{
	            	columnWidth : .5,
	                boxLabel: '终端异常工况',
	                name: 'eventIsValid',
	                id : 'eventIsValid3',
	                inputValue: 3
	            }]
	        },{
	        	columnWidth : 1,
	            xtype: 'fieldset',
	            title: 'createAppFlow',
	            defaultType: 'radio',
	            layout: 'anchor',
	            items: [{
	                boxLabel: '不生成流程',
	                name: 'createAppFlow',
	                id : 'flowOff',
	                inputValue: 0
	            }, {
	                boxLabel: '在成立时产生待办事项',
	                name: 'createAppFlow',
	                id : 'flowOn',
	                inputValue: 1
	            }]
	        },{
	        	columnWidth : 1,
	            xtype: 'fieldset',
	            title: 'eventAnal',
	            defaultType: 'radio',
	            layout: 'column',
	            items: [{
	            	columnWidth : .5,
	                boxLabel: '独立事件',
	                name: 'eventAnal',
	                id : 'eventAnal0',
	                inputValue: 0
	            }, {
	            	columnWidth : .5,
	                boxLabel: '智能分析',
	                name: 'eventAnal',
	                id : 'eventAnal1',
	                inputValue: 1
	            },{
	            	columnWidth : .5,
	            	boxLabel : '不用分析',
	            	name : 'eventAnal',
	            	id : 'eventAnal2',
	            	inputValue : 2
	            }]
	        },{
	        	columnWidth : 1,
	        	border : false,
	        	padding:'0px 10px',
	        	items : [vwEventTypeCodeComboBox]
	        },{
	        	columnWidth : 1,
	        	border : false,
	        	padding:'0px 10px',
	        	items : [vwSeaAlarmCodeComboBox]
	        },{
	        	columnWidth : .5,
	        	border : false,
	        	padding:'10px 40px',
	        	items : [tmnlEventTempSetSaveButton]
	        },{
	        	columnWidth : .5,
	        	border : false,
	        	padding:'10px 40px',
	        	items : [formTmnlParamButtonStep1]
	        }]
		}]
	});
	
	var tmnlEventCenterPanel = Ext.create('Ext.panel.Panel',{
		region : 'center',
		layout : 'border',
		border : false,
		items : [tmnlEventTempSetGrid,tmnlEventTempEditPanel]
	});
	
	var tmnlEventTempSetPanel = Ext.create('Ext.panel.Panel',{
		title : '终端事件模板设置',
		layout : 'border',
		items : [tmnlTypeProtocolTopPanel,tmnlEventCenterPanel]
	});
	
	var mainPanel = Ext.create('Ext.tab.Panel',{
		layout : 'fit',
		activeTab : 0,
		items : [tmnlEventTempSetPanel]
	});
	renderModel(mainPanel,'参数模板管理');
});