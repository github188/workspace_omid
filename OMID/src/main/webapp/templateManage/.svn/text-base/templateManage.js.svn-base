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
	
	Ext.define('seaAlarmCodeStore01',{
		extend : 'Ext.data.Model',
		fields : [{
					type : 'string',
					name : 'EVENT_NAME'
				}, {
					type : 'string',
					name : 'EVENT_NO'
				}]
	});
	
	var vwSeaAlarmCodeStore01 = Ext.create('Ext.data.Store',{
		model : 'seaAlarmCodeStore01',
		proxy : {
		   type : 'ajax',
		   url : './sysman/templateManageAction!querySeaAlarmCode01.action',
		   reader : {
		      root : 'seaAlarmCodeList01' 
		   }	    
	   },
	   autoLoad : true
	});
	

	
	var vwSeaAlarmCodeComboBox01 = Ext.create('Ext.form.field.ComboBox',{
		id : 'vwSeaAlarmCodeComboBox01',
		name : 'vwSeaAlarmCodeComboBox01',
		fieldLabel : '计量异常',
		width : 200,
		labelAlign : 'left',
		store : vwSeaAlarmCodeStore01,
		displayField : 'EVENT_NAME',
		valueField : 'EVENT_NO',
		editable : false
		
	});
	
	vwSeaAlarmCodeComboBox01.setVisible(false);
	
	Ext.define('seaAlarmCodeStore02',{
		extend : 'Ext.data.Model',
		fields : [{
					type : 'string',
					name : 'EVENT_NAME'
				}, {
					type : 'string',
					name : 'EVENT_NO'
				}]
	});
	
	var vwSeaAlarmCodeStore02 = Ext.create('Ext.data.Store',{
		model : 'seaAlarmCodeStore02',
		proxy : {
		   type : 'ajax',
		   url : './sysman/templateManageAction!querySeaAlarmCode02.action',
		   reader : {
		      root : 'seaAlarmCodeList02' 
		   }	    
	   },
	   autoLoad : true
	});

	var vwSeaAlarmCodeComboBox02 = Ext.create('Ext.form.field.ComboBox',{
		id : 'vwSeaAlarmCodeComboBox02',
		name : 'vwSeaAlarmCodeComboBox02',
		fieldLabel : '用电异常',
		width : 200,
		labelAlign : 'left',
		store : vwSeaAlarmCodeStore02,
		displayField : 'EVENT_NAME',
		valueField : 'EVENT_NO',
		editable : false
	});
	
	vwSeaAlarmCodeComboBox02.setVisible(false);

	Ext.define('seaAlarmCodeStore03',{
		extend : 'Ext.data.Model',
		fields : [{
					type : 'string',
					name : 'EVENT_NAME'
				}, {
					type : 'string',
					name : 'EVENT_NO'
				}]
	});
	
	var vwSeaAlarmCodeStore03 = Ext.create('Ext.data.Store',{
		model : 'seaAlarmCodeStore03',
		proxy : {
		   type : 'ajax',
		   url : './sysman/templateManageAction!querySeaAlarmCode03.action',
		   reader : {
		      root : 'seaAlarmCodeList03' 
		   }	    
	   },
	   autoLoad : true
	});

	var vwSeaAlarmCodeComboBox03 = Ext.create('Ext.form.field.ComboBox',{
		id : 'vwSeaAlarmCodeComboBox03',
		name : 'vwSeaAlarmCodeComboBox03',
		fieldLabel : '终端异常',
		width : 200,
		labelAlign : 'left',
		store : vwSeaAlarmCodeStore03,
		displayField : 'EVENT_NAME',
		valueField : 'EVENT_NO',
		editable : false
	});
	
	vwSeaAlarmCodeComboBox03.setVisible(false);
	
	//
	Ext.define('seaAlarmCodeStore0101',{
		extend : 'Ext.data.Model',
		fields : [{
					type : 'string',
					name : 'EVENT_NAME'
				}, {
					type : 'string',
					name : 'EVENT_NO'
				}]
	});
	
	var vwSeaAlarmCodeStore0101 = Ext.create('Ext.data.Store',{
		model : 'seaAlarmCodeStore0101',
		proxy : {
		   type : 'ajax',
		   url : './sysman/templateManageAction!querySeaAlarmCode0101.action',
		   reader : {
		      root : 'seaAlarmCodeList0101' 
		   }	    
	   },
	   autoLoad : true
	});
	

	
	var vwSeaAlarmCodeComboBox0101 = Ext.create('Ext.form.field.ComboBox',{
		id : 'vwSeaAlarmCodeComboBox0101',
		name : 'vwSeaAlarmCodeComboBox0101',
		fieldLabel : '计量异常',
		width : 200,
		labelAlign : 'left',
		store : vwSeaAlarmCodeStore0101,
		displayField : 'EVENT_NAME',
		valueField : 'EVENT_NO',
		editable : false
		
	});
	
	vwSeaAlarmCodeComboBox0101.setVisible(false);
	
	Ext.define('seaAlarmCodeStore0202',{
		extend : 'Ext.data.Model',
		fields : [{
					type : 'string',
					name : 'EVENT_NAME'
				}, {
					type : 'string',
					name : 'EVENT_NO'
				}]
	});
	
	var vwSeaAlarmCodeStore0202 = Ext.create('Ext.data.Store',{
		model : 'seaAlarmCodeStore0202',
		proxy : {
		   type : 'ajax',
		   url : './sysman/templateManageAction!querySeaAlarmCode0202.action',
		   reader : {
		      root : 'seaAlarmCodeList0202' 
		   }	    
	   },
	   autoLoad : true
	});

	var vwSeaAlarmCodeComboBox0202 = Ext.create('Ext.form.field.ComboBox',{
		id : 'vwSeaAlarmCodeComboBox0202',
		name : 'vwSeaAlarmCodeComboBox0202',
		fieldLabel : '用电异常',
		width : 200,
		labelAlign : 'left',
		store : vwSeaAlarmCodeStore0202,
		displayField : 'EVENT_NAME',
		valueField : 'EVENT_NO',
		editable : false
	});
	
	vwSeaAlarmCodeComboBox0202.setVisible(false);

	Ext.define('seaAlarmCodeStore0303',{
		extend : 'Ext.data.Model',
		fields : [{
					type : 'string',
					name : 'EVENT_NAME'
				}, {
					type : 'string',
					name : 'EVENT_NO'
				}]
	});
	
	var vwSeaAlarmCodeStore0303 = Ext.create('Ext.data.Store',{
		model : 'seaAlarmCodeStore0303',
		proxy : {
		   type : 'ajax',
		   url : './sysman/templateManageAction!querySeaAlarmCode0303.action',
		   reader : {
		      root : 'seaAlarmCodeList0303' 
		   }	    
	   },
	   autoLoad : true
	});

	var vwSeaAlarmCodeComboBox0303 = Ext.create('Ext.form.field.ComboBox',{
		id : 'vwSeaAlarmCodeComboBox0303',
		name : 'vwSeaAlarmCodeComboBox0303',
		fieldLabel : '终端异常',
		width : 200,
		labelAlign : 'left',
		store : vwSeaAlarmCodeStore0303,
		displayField : 'EVENT_NAME',
		valueField : 'EVENT_NO',
		editable : false
	});
	
	vwSeaAlarmCodeComboBox0303.setVisible(false);
	//
	
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
    					orgNoWindow.close();
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
	
	var eventAppDefSaveButton = Ext.create('Ext.Button',{
		text : '保存',
		handler : function(){
		   //更新主表
	     var orgNoParam ;
	     var protocolCodeParam;
	     var tmnlTypeCodeParam;
	     var eventNoParam;
	     var recFlagParam;
	     var eventLevelParam;
	     var eventIsValidParam;
	     var createAppFlowParam;
	     var alarmCodeParam;
	    
	     var row = tmnlEventTempSetGrid.getSelectionModel().getSelection();
	     if(row.length==0){
	    	 return Ext.Msg.alert("提示","请选择终端事件");
	     }
	     
	     var tmnlTemplateId = tmnlEventTempSetGrid.getSelectionModel().getSelection()[0].get('TMNL_TEMPLATE_ID');
	       //更新下面的表
		   var tmnlTempIdParam ;
		   var eventCodeParam;
		   var eventIsValidParam2;
		   var isValidParam;
		   var alarmCodeParam2;
		   var row2 = eventAppDefGrid.getSelectionModel().getSelection();
	     
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
	         
	    	 if(Ext.getCmp('eventIsValid0').getValue()==true){
	    		 eventIsValidParam = '0';
	    		 alarmCodeParam = '';
	    	 }
	    	 else
	    	 if(Ext.getCmp('eventIsValid1').getValue()==true){
		    	 eventIsValidParam = '1';
		    	 alarmCodeParam = vwSeaAlarmCodeComboBox01.getValue();
	    	 }
		     else
		     if(Ext.getCmp('eventIsValid2').getValue()==true){
			     eventIsValidParam = '2';
			     alarmCodeParam = vwSeaAlarmCodeComboBox02.getValue();
		     }
			 else
		     if(Ext.getCmp('eventIsValid3').getValue()==true){
			     eventIsValidParam = '3';
			     alarmCodeParam = vwSeaAlarmCodeComboBox03.getValue();
		     }
			     
	    	 if(Ext.getCmp('flowOff').getValue()==true)
	    	    createAppFlowParam = '0';
	    	 else
	    	 if(Ext.getCmp('flowOn').getValue()==true)
	    		createAppFlowParam = '1'; 
	    	 
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
	  		           alarmCodeParam : alarmCodeParam
	             },
	         success : function(response) {
	  				var result = Ext.decode(response.responseText);
	  				if(result.retString=="success"){
	  					if(row2.length==0)
	  					Ext.Msg.alert('操作反馈', '保存成功');
	  					f9Store.load({
	  			        	params : {
	  			        	   tmnlTypeCode : Ext.getCmp('tmnlTypeCodeComboBox').getValue(),
	  						   protocolCode : Ext.getCmp('protocolCodeComboBox').getValue()
	  			            }
	  			        });
	  				}
	  				else
	  				if(result.retString=="failure")
	  					Ext.Msg.alert('操作反馈', '保存失败');
	         }
	        });
	     }      	    
       
		   
		   
		   if(row2.length>0){
			   tmnlTempIdParam = row2[0].get('TMNL_TEMPLATE_ID');
			   eventCodeParam = row2[0].get('EVENT_CODE');
			   if(Ext.getCmp('appDefeventIsValid0').getValue()==true){
		    		 eventIsValidParam2 = '0';
		    		 alarmCodeParam2 = '';
			     }
			     else
		    	 if(Ext.getCmp('appDefeventIsValid1').getValue()==true){
			    	 eventIsValidParam2 = '1';
			    	 alarmCodeParam2 = vwSeaAlarmCodeComboBox0101.getValue();
		    	 }
			     else
			     if(Ext.getCmp('appDefeventIsValid2').getValue()==true){
				     eventIsValidParam2 = '2';
				     alarmCodeParam2 = vwSeaAlarmCodeComboBox0202.getValue();
			     }
				 else
			     if(Ext.getCmp('appDefeventIsValid3').getValue()==true){
				     eventIsValidParam2 = '3';
				     alarmCodeParam2 = vwSeaAlarmCodeComboBox0303.getValue();
			     }
				     
		    	 if(Ext.getCmp('appDefeventrecFlagOff').getValue()==true)
		    		 isValidParam = '0';
		    	 else
		    	 if(Ext.getCmp('appDefeventrecFlagOn').getValue()==true)
		    		 isValidParam = '1'; 
		    	 Ext.Ajax.request({
		        	   url : './sysman/templateManageAction!saveBTmnlEveAppDef.action',
		        	   params : {
		    		    tmnlTempIdParam : tmnlTempIdParam,
		  		        eventCodeParam : eventCodeParam,
		  		        eventIsValidParam2 : eventIsValidParam2,
		  		        isValidParam : isValidParam,
		  		        alarmCodeParam2 : alarmCodeParam2
		               },
		           success : function(response) {
		   				var result = Ext.decode(response.responseText);
		   				if(result.retString=="success"){
		   					Ext.Msg.alert('操作反馈', '保存成功');
		   					eventAppDefStore.load({
		   			        	params : {
		   			        	   tmnlTemplateId : tmnlTemplateId
		   			        	}
		   			        });
		   				}
		   				else
		   				if(result.retString=="failure")
		   					Ext.Msg.alert('操作反馈', '保存失败');
		           }
		          });	   
		   }
	    }
	});
	
	var tmnlEventTempSetButton = Ext.create('Ext.Button',{
		text: '查询',
		handler: function() {
	        f9Store.load({
	        	params : {
	        	   tmnlTypeCode : Ext.getCmp('tmnlTypeCodeComboBox').getValue(),
				   protocolCode : Ext.getCmp('protocolCodeComboBox').getValue()
	            }
	        });
	    }
	});
	
	var tmnlTypeProtocolTopPanel = Ext.create('Ext.panel.Panel',{
		region : 'north',
		height : 40,
		layout : 'column',
		items : [{
			    xtype : 'combo',
			    columnWidth : .2,
				id : 'protocolCodeComboBox',
				name : 'protocolCodeComboBox',
				padding : '10px ',
			    fieldLabel: '终端规约',
			    labelAlign : 'right',
			    store: protocolCodeStore,
			    valueField: 'PROTOCOL_CODE',
			    displayField: 'PROTOCOL_NAME',
				editable : false
		   },{
			    xtype : 'combo',
			    columnWidth : .2,
				id : 'tmnlTypeCodeComboBox',
				name : 'tmnlTypeCodeComboBox',
				padding : '10px ',
			    fieldLabel: '终端类型',
			    labelAlign : 'right',
			    store: tmnlTypeCodeStore,
			    displayField: 'TMNL_TYPE',
			    valueField: 'TMNL_TYPE_CODE',
				editable : false
		   },{
				border : false,
			    columnWidth : .1,
			    padding : '10px 20px ',
			    items : [tmnlEventTempSetButton]
			},{
				border : false,
				columnWidth : .1,
				padding : '10px 20px ',
				items : [formTmnlParamButtonStep1]
			}]
	});
	
	Ext.define('f9Store',{
		extend : 'Ext.data.Model',
		fields : [{
					type : 'string',
					name : 'ORG_NAME'
				}, {
					type : 'string',
					name : 'ORG_NO'
				},{
					type : 'string',
					name : 'PROTOCOL_CODE'
				},{
					type : 'string',
					name : 'PROTOCOL_NAME'
				}, {
					type : 'string',
					name : 'TMNL_TYPE_CODE'
				},{
					type : 'string',
					name : 'TMNL_TYPE'
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
					name : 'ALARM_NAME'
				},{
					type : 'string',
					name : 'ALARM_CODE'
				},{
					type : 'string',
					name : 'TMNL_TEMPLATE_ID'
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
		title : '终端事件',
		store : f9Store,
		loadMask : true,
		viewConfig: {
            stripeRows: true
        },
		columns : [{
        	xtype: 'rownumberer',
        	width: 30,
        	sortable: false
        },{
			text : '供电单位',
			dataIndex : 'ORG_NAME',
			align : 'center',
			width : 80
		},{
			text : '供电单位编号',
			dataIndex : 'ORG_NO',
			align : 'center',
			width : 80,
			hidden : true
		},{
			text : '终端规约编号',
			dataIndex : 'PROTOCOL_CODE',
			align : 'center',
			width : 100,
			hidden : true
		},{
			text : '终端规约',
			dataIndex : 'PROTOCOL_NAME',
			align : 'center',
			width : 100
		},{
			text : '终端类型编号',
			dataIndex : 'TMNL_TYPE_CODE',
			align : 'center',
			width : 80,
			hidden : true
		},{
			text : '终端类型',
			dataIndex : 'TMNL_TYPE',
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
			width : 120
		},{
			text : '事件记录有效标志',
			dataIndex : 'REC_FLAG',
			align : 'center',
			width : 70,
			renderer: function(val){
			  if(val==1) return '打开';
			  else
			  if(val==0) return '关闭';
		    }
		},{
			text : '事件等级',
			dataIndex : 'EVENT_LEVEL',
			align : 'center',
			width : 70,
			renderer: function(val){
			  if(val==1) return '重要';
			  else
			  if(val==0) return '一般';
		    }
		},{
			text : '是否分析事件',
			dataIndex : 'EVENT_ANAL',
			align : 'center',
			width : 70,
			renderer: function(val){
			  if(val==0) return '独立事件';
			  else
			  if(val==1) return '智能分析';
			  else
			  if(val==2) return '不用分析';
		    }
		},{
			text : '事件成立标志',
			dataIndex : 'EVENT_IS_VALID',
			align : 'center',
			width : 70,
			renderer: function(val){
			  if(val==0) return '不生成异常';
			  else
			  if(val==1) return '生成计量异常';
			  else
			  if(val==2) return '生成用电异常';
			  else
			  if(val==3) return '终端异常工况';
		    }
		},{
			text : '是否自动生成流程',
			dataIndex : 'CREATE_APP_FLOW',
			align : 'center',
			width : 70,
			renderer: function(val){
			  if(val==0) return '不生成流程';
			  else
			  if(val==1) return '在成立时产生待办事项';
		    }
		},{
			text : '异常名称',
			dataIndex : 'ALARM_NAME',
			align : 'center',
			width : 80
		},{
			text : '异常编码',
			dataIndex : 'ALARM_CODE',
			align : 'center',
			width : 80,
			hidden : true
		},{
			dataIndex : 'TMNL_TEMPLATE_ID',
			hidden : true
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
			    	vwSeaAlarmCodeComboBox01.setValue(record.get('ALARM_CODE'));
        	    }else
        	    if(record.get('EVENT_IS_VALID')==2){
        	    	Ext.getCmp('eventIsValid2').setValue(true);
			    	vwSeaAlarmCodeComboBox02.setValue(record.get('ALARM_CODE'));
        	    }else
        	    if(record.get('EVENT_IS_VALID')==3){
        	    	Ext.getCmp('eventIsValid3').setValue(true);
			    	vwSeaAlarmCodeComboBox03.setValue(record.get('ALARM_CODE'));
        	    }
        	    
        	    if(record.get('CREATE_APP_FLOW')==0){
        	    	Ext.getCmp('flowOff').setValue(true);
        	    }else
        	    if(record.get('CREATE_APP_FLOW')==1){
        	    	Ext.getCmp('flowOn').setValue(true);
        	    } 
        	    
        	    if(record.get('EVENT_ANAL')==0){
        	    	eventAppDefStore.removeAll();
        	    	    Ext.getCmp('appDefeventIsValid0').setValue(false);
        	    	    Ext.getCmp('appDefeventIsValid1').setValue(false);
        	    	    Ext.getCmp('appDefeventIsValid2').setValue(false);
        	    	    Ext.getCmp('appDefeventIsValid3').setValue(false);
    		    	    Ext.getCmp('appDefeventrecFlagOff').setValue(false);
        	        	Ext.getCmp('appDefeventrecFlagOn').setValue(false);
        	        	vwSeaAlarmCodeComboBox0101.setValue('');
        	        	vwSeaAlarmCodeComboBox0202.setValue('');
        	        	vwSeaAlarmCodeComboBox0303.setValue('');
        	    }else
        	    if(record.get('EVENT_ANAL')==1){
        	    	eventAppDefStore.load({
   			        	params : {
   			        	   tmnlTemplateId : record.get('TMNL_TEMPLATE_ID')
   			        	}
   			        });
        	    }
            }
        }
	});
	
	var tmnlEventTempEditPanel = Ext.create('Ext.panel.Panel',{
		title : '终端事件编辑区',
		region : 'north',
		minHeight: 270,
		maxHeight: 350,
		split: true,
		animCollapse: true,
		collapsible: true,
		items : [{
			xtype : 'form',
			border : false,
			layout : 'column',
			padding:'10px 10px',
			items : [
			{
				columnWidth : .5,
	            xtype: 'fieldset',
	            title: '事件记录有效标志',
	            items : [{
	            	xtype : 'radiogroup',
	            	items : [{
		                boxLabel: '打开',
		                name: 'recFlag',
		                id : 'recFlagOn',
		                inputValue: 1
		            }, {
		                boxLabel: '关闭',
		                name: 'recFlag',
		                id : 'recFlagOff',
		                inputValue: 0
		            }]
	            }]
	        },{
	        	columnWidth : .5,
	            xtype: 'fieldset',
	            title: '事件等级',
	            items : [{
	            	xtype : 'radiogroup',
	            	items : [{
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
	            }]
	        },{
	        	columnWidth : 1,
	            xtype: 'fieldset',
	            title: '是否自动生成流程',
	            items : [{
	            	xtype : 'radiogroup',
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
	            }]	            
	        },{
	        	columnWidth : 1,
	            xtype: 'fieldset',
	            title: '事件成立标志',
	            items : [{ 
	            	xtype : 'radiogroup',
	            	layout: 'column',
                    items : [{
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
	            }],
	            listeners : {
        	      change : function(f, newvalue,oldvalue) {
	            	var no = newvalue.eventIsValid;
	            	if(no==0){
	            		vwSeaAlarmCodeComboBox01.setVisible(false);
				    	vwSeaAlarmCodeComboBox02.setVisible(false);
				    	vwSeaAlarmCodeComboBox03.setVisible(false);
	            	}else
	            	if(no==1){
	            		vwSeaAlarmCodeComboBox01.setVisible(true);
				    	vwSeaAlarmCodeComboBox02.setVisible(false);
				    	vwSeaAlarmCodeComboBox03.setVisible(false);
	            	}else
	            	if(no==2){
	            		vwSeaAlarmCodeComboBox02.setVisible(true);
				    	vwSeaAlarmCodeComboBox01.setVisible(false);
				    	vwSeaAlarmCodeComboBox03.setVisible(false);
	            	}else
	            	if(no==3){
	            		vwSeaAlarmCodeComboBox01.setVisible(false);
				    	vwSeaAlarmCodeComboBox02.setVisible(false);
				    	vwSeaAlarmCodeComboBox03.setVisible(true);
	            	}
		          }
                }
	            }]
	        },{
	        	columnWidth : 1,
	        	border : false,
	        	padding:'0px 10px',
	        	items : [vwSeaAlarmCodeComboBox01]
	        },{
	        	columnWidth : 1,
	        	border : false,
	        	padding:'0px 10px',
	        	items : [vwSeaAlarmCodeComboBox02]
	        },{
	        	columnWidth : 1,
	        	border : false,
	        	padding:'0px 10px',
	        	items : [vwSeaAlarmCodeComboBox03]
	        }
	        ]
		}]
	});
	
	Ext.define('eventAppDefModel',{
		extend : 'Ext.data.Model',
		fields : [{
			        type : 'string',
			        name : 'TMNL_TEMPLATE_ID'
		        },{
					type : 'string',
					name : 'OPER_TYPE_CODE'
				},{
					type : 'string',
					name : 'PROT_TYPE_CODE'
				},{
			        type : 'string',
			        name : 'EVENT_CODE'
		        },{
					type : 'string',
					name : 'EVENT_IS_VALID'
				},{
					type : 'string',
					name : 'ALARM_CODE'
				},{
					type : 'string',
					name : 'ALARM_NAME'
				},{
					type : 'string',
					name : 'IS_VALID'
				}]
	});
	
	var eventAppDefStore = Ext.create('Ext.data.Store',{
		model : 'eventAppDefModel',
		proxy : {
		    type : 'ajax',
		    url : './sysman/templateManageAction!queryEventAppDef.action',
		    reader : {
		        root : 'eventAppDefList'
 	        }
	    }
	});
	
	var eventAppDefGrid = Ext.create('Ext.grid.Panel',{
		region : 'south',
		height : 100,
		minHeight: 50,
		maxHeight: 350,
		split: true,
		animCollapse: true,
		collapsible: true,
		border : false,
		title : '终端上送事件分析流程',
		store : eventAppDefStore,
		loadMask : true,
		viewConfig: {
            stripeRows: true
        },
		columns : [{
        	xtype: 'rownumberer',
        	width: 30,
        	sortable: false
        },{
        	dataIndex : 'TMNL_TEMPLATE_ID',
        	hidden : true
        },{
        	text : '分析事件类型',
        	dataIndex : 'OPER_TYPE_CODE', 
        	align : 'center',
        	width : 150,
			renderer: function(val){
			  if(val=='01') return '召测电能表事件';
			  else
			  if(val=='02') return '分析主站异常事件';
		    }
        },{
        	text : '电表规约',
        	dataIndex : 'PROT_TYPE_CODE',
        	align : 'center',
        	width : 150
        },{
        	text : '事件编码',
        	dataIndex : 'EVENT_CODE',
        	align : 'center',
        	width : 150
        },{
        	text : '事件成立标志',
        	dataIndex : 'EVENT_IS_VALID',
        	align : 'center',
        	width : 80,
			renderer: function(val){
			  if(val==0) return '不生成异常';
			  else
			  if(val==1) return '生成计量异常';
			  else
			  if(val==2) return '生成用电异常';
			  else
			  if(val==3) return '终端异常工况';
		    }
        },{
        	text : '异常编码',
        	dataIndex : 'ALARM_CODE',
        	align : 'center',
        	width : 150,
        	hidden : true
        },{
        	text : '异常名称',
        	dataIndex : 'ALARM_NAME',
        	align : 'center',
        	width : 150
        },{
        	text : '是否有效',
        	dataIndex : 'IS_VALID',
        	align : 'center',
        	width : 80,
			renderer: function(val){
			  if(val==0) return '关闭';
			  else
			  if(val==1) return '开启';
		    }
        }],
        listeners :{
        	'itemclick' : function(grid,record,item,index,e,options){
    	        if(record.get('EVENT_IS_VALID')==0){
    	    	    Ext.getCmp('appDefeventIsValid0').setValue(true);
    	        }else
    	        if(record.get('EVENT_IS_VALID')==1){
    	    	    Ext.getCmp('appDefeventIsValid1').setValue(true);
		    	    vwSeaAlarmCodeComboBox0101.setValue(record.get('ALARM_CODE'));
    	        }else
    	        if(record.get('EVENT_IS_VALID')==2){
    	    	    Ext.getCmp('appDefeventIsValid2').setValue(true);
		    	    vwSeaAlarmCodeComboBox0202.setValue(record.get('ALARM_CODE'));
    	        }else
    	        if(record.get('EVENT_IS_VALID')==3){
    	    	    Ext.getCmp('appDefeventIsValid3').setValue(true);
		    	    vwSeaAlarmCodeComboBox0303.setValue(record.get('ALARM_CODE'));
    	        }
    	        
    	        if(record.get('IS_VALID')==0){
    	        	Ext.getCmp('appDefeventrecFlagOff').setValue(true);
    	        }else
    	        if(record.get('IS_VALID')==1){
    	        	Ext.getCmp('appDefeventrecFlagOn').setValue(true);
    	        }
            }
        }
	});
	
	var tmnlEventLeftPanel = Ext.create('Ext.panel.Panel',{
		region : 'center',
		layout : 'border',
		border : false,
		items : [tmnlEventTempSetGrid,eventAppDefGrid]
	});
	
	var eventAppDefEditPanel = Ext.create('Ext.panel.Panel',{
		title : '终端上送事件分析流程编辑区',
		region : 'center',
		items : [{			
			xtype : 'form',
			border : false,
			layout : 'column',
			padding:'10px 10px',
			items : [{
	        	columnWidth : 1,
	            xtype: 'fieldset',
	            title: '事件成立标志',
	            items : [{ 
	            	xtype : 'radiogroup',
	            	layout: 'column',
                    items : [{
	            	columnWidth : .5,
	                boxLabel: '不生成异常',
	                name: 'appDefeventIsValid',
	                id : 'appDefeventIsValid0',
	                inputValue: 0
	            }, {
	            	columnWidth : .5,
	                boxLabel: '生成计量异常',
	                name: 'appDefeventIsValid',
	                id : 'appDefeventIsValid1',
	                inputValue: 1
	            },{
	            	columnWidth : .5,
	                boxLabel: '生成用电异常',
	                name: 'appDefeventIsValid',
	                id : 'appDefeventIsValid2',
	                inputValue: 2
	            },{
	            	columnWidth : .5,
	                boxLabel: '终端异常工况',
	                name: 'appDefeventIsValid',
	                id : 'appDefeventIsValid3',
	                inputValue: 3
	            }],
	            listeners : {
	        	      change : function(f, newvalue,oldvalue) {
		            	var no = newvalue.appDefeventIsValid;
		            	if(no==0){
		            		vwSeaAlarmCodeComboBox0101.setVisible(false);
					    	vwSeaAlarmCodeComboBox0202.setVisible(false);
					    	vwSeaAlarmCodeComboBox0303.setVisible(false);
		            	}else
		            	if(no==1){
		            		vwSeaAlarmCodeComboBox0101.setVisible(true);
					    	vwSeaAlarmCodeComboBox0202.setVisible(false);
					    	vwSeaAlarmCodeComboBox0303.setVisible(false);
		            	}else
		            	if(no==2){
		            		vwSeaAlarmCodeComboBox0202.setVisible(true);
					    	vwSeaAlarmCodeComboBox0101.setVisible(false);
					    	vwSeaAlarmCodeComboBox0303.setVisible(false);
		            	}else
		            	if(no==3){
		            		vwSeaAlarmCodeComboBox0101.setVisible(false);
					    	vwSeaAlarmCodeComboBox0202.setVisible(false);
					    	vwSeaAlarmCodeComboBox0303.setVisible(true);
		            	}
			          }
	                }
	            }]
	        },{
	        	columnWidth : 1,
	        	border : false,
	        	padding:'0px 10px',
	        	items : [vwSeaAlarmCodeComboBox0101]
	        },{
	        	columnWidth : 1,
	        	border : false,
	        	padding:'0px 10px',
	        	items : [vwSeaAlarmCodeComboBox0202]
	        },{
	        	columnWidth : 1,
	        	border : false,
	        	padding:'0px 10px',
	        	items : [vwSeaAlarmCodeComboBox0303]
	        },{
	        	columnWidth : .5,
	        	xtype : 'radiogroup',
	        	padding:'0px 10px ',
	        	html : '是否有效:',
	        		items: [{
		                boxLabel: '开启',
		                name : 'appDefeventrecFlag',
		                id : 'appDefeventrecFlagOn',
		                inputValue: 1
		            }, {
		                boxLabel: '关闭',
		                name : 'appDefeventrecFlag',
		                id : 'appDefeventrecFlagOff',
		                inputValue: 0
		            }]
	        },{
	        	columnWidth : .5,
	        	border : false,
	        	padding:'10px 40px',
	        	items : [eventAppDefSaveButton]
	        }]
	     }]
	});
	
	var editPanel = Ext.create('Ext.panel.Panel',{
//		title : '编辑区',
		region : 'east',
		width : 280,
		layout : 'border',
		border : false,
		items : [tmnlEventTempEditPanel,eventAppDefEditPanel]
	});
	
	var tmnlEventCenterPanel = Ext.create('Ext.panel.Panel',{
		region : 'center',
		layout : 'border',
		border : false,
		items : [tmnlEventLeftPanel,editPanel]
	});
	
	var tmnlEventTempSetPanel = Ext.create('Ext.panel.Panel',{
		title : '终端事件模板设置',
		layout : 'fit',
		items : {
		  layout : 'border', 
		  items : [tmnlTypeProtocolTopPanel,tmnlEventCenterPanel]
	    }
	});
	
	var mainPanel = Ext.create('Ext.tab.Panel',{
		layout : 'fit',
		activeTab : 0,
		items : [tmnlEventTempSetPanel]
	});
	renderModel(mainPanel,'参数模板管理');
});