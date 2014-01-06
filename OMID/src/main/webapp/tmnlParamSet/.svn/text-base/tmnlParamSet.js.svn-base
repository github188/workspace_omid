Ext.onReady(function(){
	Ext.define('orgNoModel2',{
		extend : 'Ext.data.Model',
		fields : [{
					type : 'string',
					name : 'ORG_NO'
				}, {
					type : 'string',
					name : 'ORG_NAME'
				}]
	});
	
	var orgNoStore2 = Ext.create('Ext.data.Store',{
		model : 'orgNoModel2',
		proxy : {
		    type : 'ajax',
		    url : './sysman/templateManageAction!queryOrgNoNameByOrgType03.action',
		    reader : {
		       root : 'orgNoList'
	        }
	    }
	});
	var orgNoComboBox2 = Ext.create('Ext.form.field.ComboBox', {
		id : 'orgNoComboBox2',
		name : 'orgNoComboBox2',
		columnWidth : .2,
	    fieldLabel: '供电单位',
	    padding : '10px ',
	    labelAlign : 'right',
	    store: orgNoStore2,
	    valueField: 'ORG_NO',
	    displayField: 'ORG_NAME',
		editable : false
	});
	
	Ext.define('tmnlTypeCodeModel2',{
		extend : 'Ext.data.Model',
		fields : [{
			type : 'string',
			name : 'TMNL_TYPE_CODE'
		},{
			type : 'string',
			name : 'TMNL_TYPE'
		}]
	});
	var tmnlTypeCodeStore2 = Ext.create('Ext.data.Store', {
		model : 'tmnlTypeCodeModel2',
		proxy : {
		    type : 'ajax',
		    url : './sysman/templateManageAction!queryTmnlTypeCode.action',
		    reader : {
		        root : 'tmnlTypeCodeList'
 	        }
	    }
	});
	var tmnlTypeCodeComboBox2 = Ext.create('Ext.form.field.ComboBox',{
		id : 'tmnlTypeCodeComboBox2',
		name : 'tmnlTypeCodeComboBox2',
		columnWidth : .2,
	    fieldLabel: '终端类型',
	    padding : '10px ',
	    labelAlign : 'right',
	    store: tmnlTypeCodeStore2,
	    displayField: 'TMNL_TYPE',
	    valueField: 'TMNL_TYPE_CODE',
		editable : false
	});
	Ext.define('protocolCodeModel2',{
		extend : 'Ext.data.Model',
		fields : [{
			type : 'string',
			name : 'PROTOCOL_CODE'
		},{
			type : 'string',
			name : 'PROTOCOL_NAME'
		}]
	});
	var protocolCodeStore2 = Ext.create('Ext.data.Store', {
		model : 'protocolCodeModel2',
		proxy : {
		    type : 'ajax',
		    url : './sysman/templateManageAction!queryProtocolCode.action',
		    reader : {
		        root : 'protocolCodeList'
 	        }
	    }
	});
	var protocolCodeComboBox2 = Ext.create('Ext.form.field.ComboBox', {
		id : 'protocolCodeComboBox2',
		name : 'protocolCodeComboBox2',
		columnWidth : .2,
	    fieldLabel: '终端规约',
	    padding : '10px ',
	    labelAlign : 'right',
	    store: protocolCodeStore2,
	    valueField: 'PROTOCOL_CODE',
	    displayField: 'PROTOCOL_NAME',
		editable : false
	});	
	
	Ext.define('callStatusCodeModel',{
		extend : 'Ext.data.Model',
		fields : [{
			type : 'string',
			name : 'CALL_STATUS_CODE'
		},{
			type : 'string',
			name : 'CALL_STATUS_NAME'
		}]
	});
	var callStatusCodeStore = Ext.create('Ext.data.Store', {
		model : 'callStatusCodeModel',
		proxy : {
		    type : 'ajax',
		    url : './sysman/tmnlParamSetAction!queryCallStatusCode.action',
		    reader : {
		        root : 'sendCodeList'
 	        }
	    }
	});
	var sendStatusComboBox = Ext.create('Ext.form.field.ComboBox', {
		id : 'sendStatusComboBox',
		name : 'sendStatusComboBox',
		columnWidth : .2,
	    fieldLabel: '下发状态',
	    padding : '10px ',
	    labelAlign : 'right',
	    valueField: 'CALL_STATUS_CODE',
	    displayField: 'CALL_STATUS_NAME',
	    store : callStatusCodeStore,
		editable : false
	});	
	var queryButton = Ext.create('Ext.Button', {
	    text: '查询',
	    handler: function() {
		  terminalListStore.load({
	        	params : {
       	         tmnlTypeCode : tmnlTypeCodeComboBox2.getValue(),
			     protocolCode : protocolCodeComboBox2.getValue(),
			     orgNo : orgNoComboBox2.getValue(),
			     terminalAddr : Ext.getCmp('terminalAddr').getValue(),
			     sendStatus : sendStatusComboBox.getValue(),
			     taskIds : Ext.getCmp('taskId').getValue()
           }
         });
	    }
	});
	
	var taskEndTime = new Date();
	var taskBeginTime = new Date();
	taskBeginTime.setTime(taskEndTime.getTime() - 3600 * 24 * 30 * 1000);
	
	var taskBeginTimeItem = Ext.create('Ext.form.field.Date',{labelAlign : 'right',
		xtype: 'datefield',
		fieldLabel: '任务生成时间',
		id: 'taskBeginTime',
		name: 'taskBeginTime',
		format: 'Y-m-d',
		width : 200,
		value: taskBeginTime,
		editable: false});
	var taskEndTimeItem = Ext.create('Ext.form.field.Date',{labelAlign : 'right',
        xtype: 'datefield',
		fieldLabel: '止',
		id: 'taskEndTime',
		name: 'taskEndTime',
		format: 'Y-m-d',
		width : 200,
		value: taskEndTime,
		editable: false});
	
	var taskExecuteBeginTimeItem = Ext.create('Ext.form.field.Date',{labelAlign : 'right',
		xtype: 'datefield',
		fieldLabel: '任务执行时间',
		id: 'taskExecuteBeginTime',
		name: 'taskExecuteBeginTime',
		format: 'Y-m-d',
		width : 200,
		value: taskBeginTime,
		editable: false});
	var taskExecuteEndTimeItem = Ext.create('Ext.form.field.Date',{labelAlign : 'right',
        xtype: 'datefield',
		fieldLabel: '止',
		id: 'taskExecuteEndTime',
		name: 'taskExecuteEndTime',
		format: 'Y-m-d',
		width : 200,
		value: taskEndTime,
		editable: false});
	
	Ext.define('callStatusCodeModel',{
		extend : 'Ext.data.Model',
		fields : [{
					type : 'string',
					name : 'CALL_STATUS_CODE'
				}, {
					type : 'string',
					name : 'CALL_STATUS_NAME'
				}]
	});
	
	var callStatusCodeStore = Ext.create('Ext.data.Store',{
		model : 'callStatusCodeModel',
		proxy : {
		    type : 'ajax',
		    url : './sysman/tmnlParamSetAction!queryCallStatusCode.action',
		    reader : {
		       root : 'sendCodeList'
	        }
	    }
	});
	var callStatusCodeComboBox = Ext.create('Ext.form.field.ComboBox', {
		id : 'callStatusCodeComboBox',
		name : 'callStatusCodeComboBox',
		columnWidth : .3,
	    fieldLabel: '任务状态',
	    padding : '10px ',
	    labelAlign : 'right',
	    store: callStatusCodeStore,
	    valueField: 'CALL_STATUS_CODE',
	    displayField: 'CALL_STATUS_NAME',
		editable : false
	});
	
	var taskIdQueryButton = Ext.create('Ext.Button',{
		text : '查询',
		handler : function(){
		   chooseStore.load({
     	      params : {
   	             taskBeginTimeParam : taskBeginTimeItem.getValue(),
   	             taskEndTimeParam : taskEndTimeItem.getValue(),
   	             taskExecuteBeginTimeParam : taskExecuteBeginTimeItem.getValue(),
   	             taskExecuteEndTimeParam : taskExecuteEndTimeItem.getValue(),
   	             callStatusCodeParam : callStatusCodeComboBox.getValue(),
   	             sponsorParam : sponsorField.getValue()
   	          }
           });
	    }
	});
	 
	var taskIdChooseButton = Ext.create('Ext.Button',{
		text : '确认',
		handler : function(){
		   var row = chooseGrid.getSelectionModel().getSelection();
		   if(row.length>0){
			  var taskId = '';
			  var taskIds = '';
			  for(var i = 0;i<row.length;i++){ 
				taskId = row[i].get('TASK_ID');
				if(i==0){   
			        taskIds = taskId;
				}else{
					taskIds = taskIds + ',' + taskId;
				}
			  }
			  Ext.getCmp('taskId').setValue(taskIds);
		   }
		   chooseWindow.close();
	    }
	});
	
	var sponsorField = Ext.create('Ext.form.field.Text',{
		 labelAlign : 'right',
		 fieldLabel : '发起人',
   	     name : 'taskSponsor',
	     id : 'taskSponsor',
	     xtype: 'textfield',
	     width : 190
	     });
	
	var choosePanel = Ext.create('Ext.panel.Panel',{
		region : 'north',
		height : 80,
		layout : 'column',
		items : [{
			padding : '10px ',
            columnWidth : .3,
            border : false,
            items : [taskBeginTimeItem]
			},{
			padding : '10px ',
            columnWidth : .3,
            border : false,
            items : [taskEndTimeItem]
			},callStatusCodeComboBox,{
				padding : '10px',
				columnWidth : .1,
				border : false,
				items : [taskIdQueryButton]
			},{
	            columnWidth : .3,
	            border : false,
	            items : [taskExecuteBeginTimeItem]
			},{
	            columnWidth : .3,
	            border : false,
	            items : [taskExecuteEndTimeItem]
			},{
				 columnWidth : .3,
				 border : false,
				 items : [sponsorField]
		    },{
				columnWidth : .1,
				border : false,
				items : [taskIdChooseButton]
			}]
	});
	
	Ext.define('chooseModel',{
		extend : 'Ext.data.Model',
		fields : [{
			        type : 'string',
			        name : 'TASK_ID'
		        },{
					type : 'string',
					name : 'ORG_NAME'
				},{
					type : 'string',
					name : 'TASK_BEGIN_TIME'
				},{
					type : 'string',
					name : 'CALL_SATRT_TIME'
			    },{
			    	type : 'string',
					name : 'CALL_END_TIME'
			    },{
			    	type : 'string',
					name : 'CALL_STATUS_NAME'
			    },{
			    	type : 'string',
					name : 'TASK_SPONSOR'
			    }]
	});
	
	var chooseStore = Ext.create('Ext.data.Store',{
		model : 'chooseModel',
		id : 'chooseStore',
		pageSize: 200,
		remoteSort: true,
        buffered: true,
		proxy : {
		    type : 'ajax',
		    url : './sysman/tmnlParamSetAction!queryFTaskFront.action',
		    reader : {
		       type : 'json',
		       root : 'chooseList',
		       totalProperty: 'chooseTotalCount'
	        }
	    }
	});
	
	var chooseGridSm = Ext.create('Ext.selection.CheckboxModel');
	var chooseGrid = Ext.create('Ext.grid.Panel',{
		  title : '批次明细',
		  selModel: chooseGridSm,
	      region : 'center',
	      store : chooseStore,
	      loadMask : true,
	      border : false,
	      verticalScrollerType: 'paginggridscroller',
	      invalidateScrollerOnRefresh: false,
	      viewConfig: {
	      trackOver: false,
	      stripeRows: true
	      },
	      columns : [{
	        	xtype: 'rownumberer',
	        	width: 30,
	        	sortable: false
	      },{
	    	  dataIndex : 'TASK_ID',
	    	  hidden : true
	      },{
		      text : '供电单位名称',
		      dataIndex : 'ORG_NAME',
		      align : 'center'
	      },{
		      text : '任务生成时间',
		      dataIndex : 'TASK_BEGIN_TIME',
		      align : 'center',
		      width: 120,
	          renderer: function(val){
				return val.replace('T',' ');
			  }
	      },{
		      text : '任务执行时间',
		      dataIndex : 'CALL_SATRT_TIME',
		      align : 'center',
		      width: 120,
	          renderer: function(val){
				return val.replace('T',' ');
			  }
	      },{
		      text : '任务结束时间',
		      dataIndex : 'CALL_END_TIME',
		      align : 'center',
		      width: 120,
	          renderer: function(val){
				return val.replace('T',' ');
			  }
	      },{
		      text : '任务状态',
		      dataIndex : 'CALL_STATUS_NAME',
		      align : 'center'
	      },{
		      text : '发起人',
		      dataIndex : 'TASK_SPONSOR',
		      align : 'center'
	      }]
	   });
	
	chooseStore.guaranteeRange(0, 199);
	
	var chooseWindow = Ext.create('Ext.window.Window',{
		title : '参数设置批次查询',
		height : 400,
		width : 700,
		layout: 'border',
	    border : false,
	    closeAction : 'hide',
	    items: [choosePanel,chooseGrid]
	});
	
	var chooseButton = Ext.create('Ext.Button',{
		text : '选择',
		handler : function(){
		   chooseWindow.show();
	    }
	});
	
	var queryPanel = Ext.create('Ext.panel.Panel',{
		region : 'north',
		height : 80,
		layout : 'column',
		items : [orgNoComboBox2,tmnlTypeCodeComboBox2,protocolCodeComboBox2,
		{
		 columnWidth : .2,
		 padding:'10px  ',
		 labelAlign : 'right',
		 fieldLabel: '终端地址',
	     name: 'terminalAddr',
	     id : 'terminalAddr',
	     allowBlank:false,
	     xtype: 'textfield'
         },sendStatusComboBox,{
    		 columnWidth : .2,
    		 labelAlign : 'right',
    		 fieldLabel: '任务编号',
    	     name: 'taskId',
    	     id : 'taskId',
    	     allowBlank:false,
    	     xtype: 'textfield'
             },{
              padding:'0px 10px',
           	  columnWidth : .1,
           	  border : false,items : [chooseButton]
             },{
              padding:'0px 20px',
    	      columnWidth : .1,
    	      border : false,items : [queryButton]
    	     }]
	});
	
	Ext.define('terminalListModel',{
		extend : 'Ext.data.Model',
		fields : ['TERMINAL_ID','TASK_ITEM_ID','TERMINAL_ADDR','PROTOCOL_CODE','PROTOCOL_NAME','TERMINAL_TYPE_CODE','TMNL_TYPE','EVENT_CODE','TASK_BEGIN_TIME','FIRST_CALL_TIME',
		          'END_CALL_TIME','CALL_STATUS_NAME','FAILURE_REMARK','CALL_CNT']
	});
	var terminalListStore = Ext.create("Ext.data.Store",{
		id: 'terminalListStore',
        pageSize: 200,
        model: 'terminalListModel',
        remoteSort: true,
        buffered: true,
        proxy: {
        	type: 'ajax',
        	url: './sysman/tmnlParamSetAction!queryFTaskFrontDet.action',
            reader: {
            	type : 'json',
                root: 'terminalList',
                totalProperty: 'totalCount'
            }
        }
	});
		
	Ext.define('tmnlTypeCodeModelWin',{
		extend : 'Ext.data.Model',
		fields : [{
			type : 'string',
			name : 'TMNL_TYPE_CODE'
		},{
			type : 'string',
			name : 'TMNL_TYPE'
		}]
	});
	var tmnlTypeCodeStoreWin = Ext.create('Ext.data.Store', {
		model : 'tmnlTypeCodeModelWin',
		proxy : {
		    type : 'ajax',
		    url : './sysman/templateManageAction!queryTmnlTypeCode.action',
		    reader : {
		        root : 'tmnlTypeCodeList'
 	        }
	    }
	});
	var tmnlTypeCodeComboBoxWin = Ext.create('Ext.form.field.ComboBox',{
		id : 'tmnlTypeCodeComboBoxWin',
		name : 'tmnlTypeCodeComboBoxWin',
	    fieldLabel: '终端类型',
	    width : 190,
	    store: tmnlTypeCodeStoreWin,
	    displayField: 'TMNL_TYPE',
	    valueField: 'TMNL_TYPE_CODE',
		editable : false
	});
	Ext.define('protocolCodeModelWin',{
		extend : 'Ext.data.Model',
		fields : [{
			type : 'string',
			name : 'PROTOCOL_CODE'
		},{
			type : 'string',
			name : 'PROTOCOL_NAME'
		}]
	});
	var protocolCodeStoreWin = Ext.create('Ext.data.Store', {
		model : 'protocolCodeModelWin',
		proxy : {
		    type : 'ajax',
		    url : './sysman/templateManageAction!queryProtocolCode.action',
		    reader : {
		        root : 'protocolCodeList'
 	        }
	    }
	});
	var protocolCodeComboBoxWin = Ext.create('Ext.form.field.ComboBox', {
		id : 'protocolCodeComboBoxWin',
		name : 'protocolCodeComboBoxWin',
		width : 190,
	    fieldLabel: '终端规约',
	    store: protocolCodeStoreWin,
	    valueField: 'PROTOCOL_CODE',
	    displayField: 'PROTOCOL_NAME',
		editable : false
	});	
	
	var tmnlAddQueryButton = Ext.create('Ext.Button',{
		text : '查询',
		handler : function(){
		   tmnlStore.load({
        	   params : {
	    	     tmnlTypeCode : tmnlTypeCodeComboBoxWin.getValue(),
	    	     protocolCode : protocolCodeComboBoxWin.getValue(),
	    	     consNos : Ext.getCmp('consNoWin').getValue(),
	    	     terminalAddrs : Ext.getCmp('terminalAddrWin').getValue() 
	    	   }
           });
	    }
	});
	
	var tmnlAddSendButton = Ext.create('Ext.Button',{
		text : '下发',
		handler : function(){
		   var row = tmnlGrid.getSelectionModel().getSelection();
		   if(row.length>20){
			   Ext.Msg.alert('提示', '不允许一次下发终端数量超过20个!');
			   return ;
		   }
		   if(row.length>0){
			  var terminalId = '';
			  var protocolCode = '';
			  var tmnlTypeCode = '';
			  var areaCode = '';
			  for(var i = 0;i<row.length;i++){ 
				if(i==0){
			        terminalId = row[i].get('TMNL_ASSET_NO');
			        protocolCode = row[i].get('PROTOCOL_CODE');
			        tmnlTypeCode = row[i].get('TERMINAL_TYPE_CODE');
			        areaCode = row[i].get('AREA_CODE');
				}
				else{
					terminalId = terminalId + ','+ row[i].get('TMNL_ASSET_NO');
				    protocolCode = protocolCode + ','+ row[i].get('PROTOCOL_CODE');
				    tmnlTypeCode = tmnlTypeCode + ','+ row[i].get('TERMINAL_TYPE_CODE');
				    areaCode = areaCode + ','+ row[i].get('AREA_CODE');
				}
		     }
			  Ext.Ajax.request({
   	     	   url : './sysman/templateManageAction!sendTaskByTmnl.action',
   	     	   params : {
   	     	       terminalIdParam : terminalId,
   	     	       protocolCodeParam : protocolCode,
   	     	       tmnlTypeCodeParam : tmnlTypeCode,
   	     	       areaCodeParam : areaCode
   	            },
   	           success : function(response) {
   					var result = Ext.decode(response.responseText);
   					if(result.sendByTmnlString=="success"){
   						Ext.Msg.alert('操作反馈', '生成终端参数成功，已通知前置');
   					}
   					else
   					Ext.Msg.alert('操作反馈', result.sendByTmnlString);
   	        }
   	       });
		   }
	    }
	});
	
	var tmnlTextField = Ext.create('Ext.form.field.Text',{
		 labelAlign : 'right',
		 fieldLabel : '终端地址',
    	 name: 'terminalAddrWin',
	     id : 'terminalAddrWin',
	     xtype: 'textfield',
	     width : 190,
	     emptyText : '多个终端支持逗号分隔'
	});
	
	var consTextField = Ext.create('Ext.form.field.Text',{
		 labelAlign : 'right',
	 	 fieldLabel : '用户编号 ',
	 	 name: 'consNoWin',
	 	 id : 'consNoWin',
		 xtype: 'textfield',
		 width : 190,
		 emptyText : '多个户号支持逗号分隔'
	});
	
	var tmnlQueryPanel = Ext.create('Ext.panel.Panel',{
		region : 'north',
		height : 80,
		layout : 'column',
		items : [{
			     padding:'10px 20px',
  	             columnWidth : .4,
  	             border : false,
			     items : [tmnlTypeCodeComboBoxWin]},
			     {
				  padding:'10px 20px',
	  	          columnWidth : .4,
	  	          border : false,
				  items : [protocolCodeComboBoxWin]},
		         {padding:'10px 20px',
	    	      columnWidth : .2,
	    	      border : false,
	    	      items : [tmnlAddQueryButton]},
	    	      {
	    	    	 padding:'0px 20px',
	    	 		 columnWidth : .4,
	    	 		 border : false,
	    	 		 items : [tmnlTextField]
	    	      },{
	    	    	 padding:'0px 20px', 
	    	    	 columnWidth : .4,
		    	 	 border : false,
		    	 	 items : [consTextField]
	    	      },{
	    	    	 padding:'0px 20px',
		    	     columnWidth : .2,
		    	     border : false,
		    	     items : [tmnlAddSendButton]
	    	      }
		        ]
	});
	
	Ext.define('tmnlModel',{
		extend : 'Ext.data.Model',
		fields : [{
					type : 'string',
					name : 'ORG_NAME'
				},{
					type : 'string',
					name : 'CONS_NO'
				},{
					type : 'string',
					name : 'CONS_NAME'
				},{
					type : 'string',
					name : 'TERMINAL_ADDR'
				},{
					type : 'string',
					name : 'TMNL_ASSET_NO'
				},{
					type : 'string',
					name : 'PROTOCOL_NAME'
				},{
					type : 'string',
					name : 'COLL_MODE'
				},{
					type : 'string',
					name : 'TMNL_TYPE'
				},{
					type : 'string',
					name : 'PROTOCOL_CODE'
				},{
					type : 'string',
					name : 'TERMINAL_TYPE_CODE'
				},{
					type : 'string',
					name : 'AREA_CODE'
				}]
	});
	
	var tmnlStore = Ext.create('Ext.data.Store',{
		model : 'tmnlModel',
		id : 'tmnlStore',
		pageSize: 200,
		remoteSort: true,
        buffered: true,
		proxy : {
		    type : 'ajax',
		    url : './sysman/templateManageAction!queryTmnl.action',
//		    extraParams: {
//                total: 2000
//            },
		    reader : {
		       type : 'json',
		       root : 'tmnlList',
		       totalProperty: 'tmnlTotalCount'
	        }
	    }
	});
	
	var tmnlGridSm = Ext.create('Ext.selection.CheckboxModel');
	var tmnlGrid = Ext.create('Ext.grid.Panel',{
		  selModel: tmnlGridSm,
	      region : 'center',
	      store : tmnlStore,
	      loadMask : true,
	      border : false,
	      viewConfig: {
	      stripeRows: true
	      },
	      verticalScrollerType: 'paginggridscroller',
	      loadMask: true,
	      invalidateScrollerOnRefresh: false,
	      viewConfig: {
	      trackOver: false
	      },
	      columns : [{
	        	xtype: 'rownumberer',
	        	width: 30,
	        	sortable: false
	      },{
		      text : '供电单位名称',
		      dataIndex : 'ORG_NAME',
		      align : 'center'
	      },{
			  text : '用户编号',
			  dataIndex : 'CONS_NO',
			  align : 'center'
		  },{
			  text : '用户名称',
			  dataIndex : 'CONS_NAME',
			  align : 'center'   	  
		  },{
			  text : '终端地址',
			  dataIndex : 'TERMINAL_ADDR',
			  align : 'center'
		  },{
			  text : '终端资产号',
			  dataIndex : 'TMNL_ASSET_NO',
			  align : 'center'
		  },{
			  text : '通讯规约',
			  dataIndex : 'PROTOCOL_NAME',
			  align : 'center'
		  },{
			  text : '通讯方式',
			  dataIndex : 'COLL_MODE',
			  align : 'center'
		  },{
			  text : '终端类型',
			  dataIndex : 'TMNL_TYPE',
			  align : 'center'
		  },{
			  dataIndex : 'PROTOCOL_CODE',
			  hidden :　true
		  },{
			  dataIndex : 'TERMINAL_TYPE_CODE',
			  hidden : true
		  },{
			  dataIndex : 'AREA_CODE',
			  hidden : true
		  }]
	   });
	
	tmnlStore.guaranteeRange(0, 199);
	
	var addTmnlWindow = Ext.create('Ext.window.Window',{
		height : 400,
		width : 600,
		layout: 'border',
	    border : false,
	    closeAction : 'hide',
	    items: [tmnlQueryPanel,tmnlGrid]
	});
	
	var gridPanel  = Ext.create('Ext.grid.Panel',{
		region : 'center',
		border : false,
		title : '终端列表',
		store : terminalListStore,
		verticalScrollerType: 'paginggridscroller',
        loadMask: true,
        invalidateScrollerOnRefresh: false,
        viewConfig: {
            trackOver: false
        },
        tbar : [{xtype:'tbfill'},Ext.create('Ext.Button',{
        	text : '添加',
        	handler: function() {
        	   addTmnlWindow.show();
            }
        })],
        columns:[{
        	xtype: 'rownumberer',
        	width: 50,
        	sortable: false
        },{
        	dataIndex : 'TERMINAL_ID',
        	hidden : true
        },{
        	dataIndex : 'TASK_ITEM_ID',
        	hidden : true
        },{
        	text : '终端地址',
        	dataIndex : 'TERMINAL_ADDR',
        	align: 'center',
        	width: 100
        },{
        	dataIndex : 'PROTOCOL_CODE',
        	hidden : true
        },{
        	text : '终端规约',
        	dataIndex : 'PROTOCOL_NAME',
        	align: 'center',
        	width: 150
        },{
        	dataIndex : 'TERMINAL_TYPE_CODE',
        	hidden : true
        },{
        	text : '终端类型',
        	dataIndex : 'TMNL_TYPE',
        	align: 'center',
        	width: 100
        },{
        	text : '参数名称',
        	dataIndex : 'EVENT_CODE',
        	align: 'center',
        	width: 100
        },{
        	text : '任务生成时间',
        	dataIndex : 'TASK_BEGIN_TIME',
        	align : 'center',
        	width : 150,
        	renderer: function(val){
			return val.replace('T',' ');
		    }
        },{
        	text : '第一次下发时间',
        	dataIndex : 'FIRST_CALL_TIME',
        	align: 'center',
        	width: 150,
        	renderer: function(val){
			return val.replace('T',' ');
		    }
        },{
        	text : '最近下发时间',
        	dataIndex : 'END_CALL_TIME',
        	align: 'center',
        	width: 150,
        	renderer: function(val){
			return val.replace('T',' ');
		    }
        },{
        	text : '状态',
        	dataIndex : 'CALL_STATUS_NAME',
        	align: 'center',
        	width: 100
        },{
        	text : '失败原因',
        	dataIndex : 'FAILURE_REMARK',
        	align: 'center',
        	width: 100
        },{
        	text : '下发次数',
        	dataIndex : 'CALL_CNT',
        	align: 'center',
        	width: 100
        }],
        listeners : {
        	'itemclick' : function(grid,record,item,index,e,options){
        	    var terminalId = record.get('TERMINAL_ID');
        	    var tmnlTypeCode = record.get('TERMINAL_TYPE_CODE');
        	    var protocolCode = record.get('PROTOCOL_CODE');
        	    tTmnlParamStore.load({
    	        	params : {
        	    	terminalId : terminalId,
        	    	tmnlTypeCode : tmnlTypeCode,
        	    	protocolCode : protocolCode
        	    	}
                });   
            }
        }
	});
	
	terminalListStore.guaranteeRange(0, 199);
	
	Ext.define('tTmnlParamModel',{
		extend : 'Ext.data.Model',
		fields : ['EVENT_NAME','REC_FLAG','EVENT_LEVEL','EVENT_NO']
	});
	var tTmnlParamStore = Ext.create('Ext.data.Store',{
		model : 'tTmnlParamModel',
		proxy : {
		    type : 'ajax',
		    url : './sysman/tmnlParamSetAction!queryTTmnlParam.action',
		    reader : {
		        root : 'tTmnlParamList'
 	        }
	    }
	});
	var tmnlEventParamPanel = Ext.create('Ext.grid.Panel',{
		title : '终端事件参数',
		store : tTmnlParamStore,
		loadMask : true,
		viewConfig: {
            stripeRows: true
        },
        columns : [{
			text : '事件名称',
			dataIndex : 'EVENT_NAME',
			align : 'center',
			width : 300
		},{
			text : '事件记录有效标志',
			dataIndex : 'REC_FLAG',
			align : 'center',
			width : 200,
			renderer: function(val){
			  if(val==1) return '打开';
			  else
			  if(val==0) return '关闭';
		    }
		},{
			text : '事件等级',
			dataIndex : 'EVENT_LEVEL',
			align : 'center',
			width : 200,
			renderer: function(val){
			  if(val==1) return '重要';
			  else
			  if(val==0) return '一般';
		    }
		},{
			text : '事件编码',
			dataIndex : 'EVENT_NO',
			align : 'center',
			width : 200
		}]
	});
	var meterThresholdPanel = Ext.create('Ext.panel.Panel',{
		title : '电能表异常判别阈值'
	});
	var tabPanel = Ext.create('Ext.tab.Panel',{
		region : 'south',
		activeTab : 0,
		height : 200,
		layout : 'fit',
		items :[tmnlEventParamPanel,meterThresholdPanel]
	});
	var mainPanel = Ext.create('Ext.panel.Panel',{
		border : false,
		layout : 'border',
		items : [queryPanel,gridPanel,tabPanel]
	});
	renderModel(mainPanel,'终端参数设置');
});