Ext.onReady(function() { 
	
	Ext.define('userGridModel', {
		extend : 'Ext.data.Model',
		fields : ['CONS_ID','CONS_NO','CONS_NAME','ORG_NO','SUBS_ID','TG_ID']
	});

   var userGridStore = Ext.create('Ext.data.Store', {
      model : 'userGridModel',
      proxy : {
	      type : 'ajax',
	      url : 'impCustomerManaAction!queryCConsVcm.action',
	      reader : {
		      root : 'userList',
		      type : 'json'
	      }
      }
   });
	
	var userGridSm = Ext.create('Ext.selection.CheckboxModel', {
		mode : 'SINGLE',
		listeners : {
			select : function(model, record, index) {
			}
		}
	});
	
	var userGridPanel = Ext.create('Ext.grid.Panel',{
		region : 'center',
        id : 'userGrid',
        name : 'userGrid',
        store: userGridStore,
        selModel : userGridSm,
        columns: [{
            text: '用户编号',
            dataIndex: 'CONS_ID',
            hidden : true
         },{
             text: '用户编号',
             dataIndex: 'CONS_NO'
         },{
        	 text : '用户名称',
        	 dataIndex : 'CONS_NAME'
         },{
        	 text : '供电单位编号',
        	 dataIndex : 'ORG_NO'
         },{
        	 text : '变电站标识',
        	 dataIndex : 'SUBS_ID'
         },{
        	 text : '台区标识',
        	 dataIndex : 'TG_ID'
         }],
         listeners :{
          	'itemclick' : function(grid,record,item,index,e,options){
 		        editConsIdTextField.setValue(record.get('CONS_ID'));
 	        }
 	     }
     });
	
	var userDeleteButton = Ext.create('Ext.Button',{
		text : '删除',
		handler : function(){
 	       var row = userGridPanel.getSelectionModel().getSelection(); 
	       if(row!=null && row.length>0){
	    	   var consIds = '';
	    	   for(var i=0;i<row.length;i++){
		       var consId = row[i].get('CONS_ID');
		          if(i==0)
		          consIds = consId;
		          else
		          consIds = consIds + ',' + consId;
	           }
	    	   Ext.Ajax.request({
		     	      url : 'impCustomerManaAction!deleteCConsVcm.action',
		     	      params : {
		     	          consIds : consIds
		               },
		              success : function(response) {
						  var result = Ext.decode(response.responseText);
						  if(result.deleteCConsVcmRet=="success"){
							  Ext.Msg.alert('操作反馈', '删除用电用户成功');
						  }
						  else
						  Ext.Msg.alert('操作反馈', result.deleteCConsVcmRet);
		              }
		       });
           }
	       else
	       Ext.Msg.alert('提示', '请选择待删除的用电用户');
      }
	});
	
	var userDeletePanel = Ext.create('Ext.panel.Panel',{
		region : 'south',
		height : 40,
		border : false,
		items : [{
			padding : '10px 20px',
			border : false,
			items : [userDeleteButton]
		}]
	});
	
	var userPanel = Ext.create('Ext.panel.Panel',{
		title : '用电用户',
		layout : 'border',
		border : false,
		items : [userGridPanel,userDeletePanel]
	});
	
	Ext.define('oOrgModel',{
		extend : 'Ext.data.Model',
		fields : [{
			type : 'string',
			name : 'ORG_NO'
		},{
			type : 'string',
			name : 'ORG_NAME'
		}]
	});	
	var oOrgStore = Ext.create('Ext.data.Store', {
		model : 'oOrgModel',
		proxy : {
		    type : 'ajax',
		    url : 'impCustomerManaAction!queryOOrg03.action',
		    reader : {
		        root : 'orgList'
 	        }
	    }
	});
	var oOrgComboBox = Ext.create('Ext.form.field.ComboBox', {
		id : 'oOrgComboBox',
		name : 'oOrgComboBox',
	    fieldLabel: '供电单位',
	    width : 220,
	    labelAlign : 'right',
	    valueField: 'ORG_NO',
	    displayField: 'ORG_NAME',
	    store : oOrgStore,
		editable : false
	});	
	
	var consNameField = Ext.create('Ext.form.field.Text',{
		labelAlign : 'right',
		fieldLabel : '用户名称',
		width : 200,
		name : 'consName',
		id : 'consName'
	});
	
	var consNoField = Ext.create('Ext.form.field.Text',{
		labelAlign : 'right',
		fieldLabel : '用户编号',
		width : 200,
		name : 'consNo',
		id : 'consNo'
	});
	
	var importUserQueryButton = Ext.create('Ext.Button',{
		text : '查询',
		handler : function(){
		   importUserGridStore.load({
				  params : {
				    orgNo : oOrgComboBox.getValue(),
					consNo : consNoField.getValue(),
					consName : consNameField.getValue()
			      }
		      });
	    }
	});
	
	var importUserImportButton = Ext.create('Ext.Button',{
		text : '导入',
		handler : function(){
 	       var row = importUserGridPanel.getSelectionModel().getSelection(); 
 	       var custRow = vcmManageGridPanel.getSelectionModel().getSelection();
 	       var custId ='';
 	       if(custRow!=null && custRow.length>0){
 	    	   custId = custRow[0].get('CUST_ID');
 	       }
 	       else{
 	           Ext.Msg.alert('提示','请选择大客户记录');
 	       }
	       if(row!=null && row.length>0){
	    	   var consIds = '';
	    	   for(var i=0;i<row.length;i++){
		       var consId = row[i].get('CONS_ID');
		          if(i==0)
		          consIds = consId;
		          else
		          consIds = consIds + ',' + consId;
	           }
	    	   Ext.Ajax.request({
		     	      url : 'impCustomerManaAction!importCConsVcm.action',
		     	      params : {
	    		          custId : custId,
		     	          consIds : consIds
		               },
		              success : function(response) {
						  var result = Ext.decode(response.responseText);
						  if(result.importCConsVcmRet=="success"){
							  Ext.Msg.alert('操作反馈', '导入用电用户成功');
						  }
						  else
						  Ext.Msg.alert('操作反馈', result.importCConsVcmRet);
		              }
		       });
           }
	       else
	       Ext.Msg.alert('提示', '请选择待导入的用电用户');
      }
	});
	
	var importUserChoosePanel = Ext.create('Ext.panel.Panel',{
		region : 'north',
		border : false,
		heigth : 150,
		layout : 'column',
		
		items :[{
			columnWidth :　.2,
			padding : '10px ',
			border : false,
			items : [oOrgComboBox]
		},{
			columnWidth :　.2,
			padding : '10px ',
			border : false,
			items : [consNameField]
		},{
			columnWidth :　.2,
			padding : '10px ',
			border : false,
			items : [consNoField]
		},{
			columnWidth :　.1,
			padding : '10px ',
			border : false,
			items : [importUserQueryButton]
		},{
			columnWidth :　.1,
			padding : '10px ',
			border : false,
			items : [importUserImportButton]
		}]
	});
	
	Ext.define('importUserGridModel', {
		extend : 'Ext.data.Model',
		fields : ['CONS_ID','CONS_NO','CONS_NAME','ORG_NO','SUBS_ID','TG_ID']
	});

   var importUserGridStore = Ext.create('Ext.data.Store', {
      model : 'importUserGridModel',
      proxy : {
	      type : 'ajax',
	      url : 'impCustomerManaAction!queryCCons.action',
	      reader : {
		      root : 'importUserList',
		      type : 'json',
		      totalProperty: 'importUserTotalCount'
	      }
      }
   });
	
	var importUserGridSm = Ext.create('Ext.selection.CheckboxModel');
	
	var importUserGridPanel = Ext.create('Ext.grid.Panel',{
		region : 'center',
        id : 'importUserGrid',
        name : 'importUserGrid',
        store: importUserGridStore,
        selModel : importUserGridSm,
        columns: [{
            text: '用户编号',
            dataIndex: 'CONS_ID',
            hidden : true
        },{
             text: '用户编号',
             dataIndex: 'CONS_NO'
         },{
        	 text : '用户名称',
        	 dataIndex : 'CONS_NAME'
         },{
        	 text : '供电单位编号',
        	 dataIndex : 'ORG_NO'
         },{
        	 text : '变电站标识',
        	 dataIndex : 'SUBS_ID'
         },{
        	 text : '台区标识',
        	 dataIndex : 'TG_ID'
         }],
         dockedItems : [{
        	 xtype : 'pagingtoolbar',
        	 store : importUserGridStore,
        	 dock : 'bottom',
        	 displayInfo : true
         }]
     });
	
	var importUserPanel = Ext.create('Ext.panel.Panel',{
		title : '导入用电用户',
		layout : 'border',
		border : false,
		items : [importUserChoosePanel,importUserGridPanel]
	});
	
	Ext.define('editOOrgModel',{
		extend : 'Ext.data.Model',
		fields : [{
			type : 'string',
			name : 'ORG_NO'
		},{
			type : 'string',
			name : 'ORG_NAME'
		}]
	});	
	var editOOrgStore = Ext.create('Ext.data.Store', {
		model : 'editOOrgModel',
		proxy : {
		    type : 'ajax',
		    url : 'impCustomerManaAction!queryOOrg03.action',
		    reader : {
		        root : 'editOrgList'
 	        }
	    }
	});
	var editOOrgComboBox = Ext.create('Ext.form.field.ComboBox', {
		id : 'editOOrgComboBox',
		name : 'editOOrgComboBox',
	    fieldLabel: '供电单位',
	    width : 220,
	    labelAlign : 'right',
	    valueField: 'ORG_NO',
	    displayField: 'ORG_NAME',
	    store : oOrgStore,
		editable : false
	});	
	
	var editConsNameField = Ext.create('Ext.form.field.Text',{
		labelAlign : 'right',
		fieldLabel : '用户名称',
		width : 200,
		name : 'editConsName',
		id : 'editConsName',
		allowBlank : false
	});
	
	var editConsNoField = Ext.create('Ext.form.field.Text',{
		labelAlign : 'right',
		fieldLabel : '用户编号',
		width : 200,
		name : 'editConsNo',
		id : 'editConsNo',
		allowBlank : false
	});
	
//	Ext.define('consSortModel',{
//		extend : 'Ext.data.Model',
//		fields : [{
//			type : 'string',
//			name : 'CONS_SORT_CODE'
//		},{
//			type : 'string',
//			name : 'CONS_SORT_NAME'
//		}]
//	});	
//	var consSortStore = Ext.create('Ext.data.Store', {
//		model : 'consSortModel',
//		proxy : {
//		    type : 'ajax',
//		    url : '',
//		    reader : {
//		        root : 'consSortList'
// 	        }
//	    }
//	});
	var consSortComboBox = Ext.create('Ext.form.field.ComboBox', {
		id : 'consSortComboBox',
		name : 'consSortComboBox',
	    fieldLabel: '用户分类',
	    width : 200,
	    labelAlign : 'right',
	    valueField: 'CONS_SORT_CODE',
	    displayField: 'CONS_SORT_NAME',
	    store : new Ext.data.ArrayStore({
			fields : ['CONS_SORT_CODE', 'CONS_SORT_NAME'],
			data : [['01', '高压'], ['02', '低压非居民'],['03','低压居民']]
		}),
		editable : false
	});	
	
	var elecAddrField = Ext.create('Ext.form.field.Text',{
		labelAlign : 'right',
		fieldLabel : '用电地址',
		width : 200,
		name : 'elecAddr',
		id : 'elecAddr'
	});
	
	Ext.define('tradeModel',{
		extend : 'Ext.data.Model',
		fields : [{
			type : 'string',
			name : 'TRADE_CODE'
		},{
			type : 'string',
			name : 'TRADE_NAME'
		}]
	});	
	var tradeStore = Ext.create('Ext.data.Store', {
		model : 'tradeModel',
		proxy : {
		    type : 'ajax',
		    url : '',
		    reader : {
		        root : 'tradeList'
 	        }
	    }
	});
	var tradeComboBox = Ext.create('Ext.form.field.ComboBox', {
		id : 'tradeComboBox',
		name : 'tradeComboBox',
	    fieldLabel: '行业分类',
	    width : 200,
	    labelAlign : 'right',
	    valueField: 'TRADE_CODE',
	    displayField: 'TRADE_NAME',
	    store : tradeStore,
		editable : false
	});	
	
//	Ext.define('hecIndustryModel',{
//		extend : 'Ext.data.Model',
//		fields : [{
//			type : 'string',
//			name : 'HEC_INDUSTRY_CODE'
//		},{
//			type : 'string',
//			name : 'HEC_INDUSTRY_NAME'
//		}]
//	});	
//	var hecIndustryStore = Ext.create('Ext.data.Store', {
//		model : 'hecIndustryModel',
//		proxy : {
//		    type : 'ajax',
//		    url : '',
//		    reader : {
//		        root : 'hecIndustryList'
// 	        }
//	    }
//	});
	var hecIndustryComboBox = Ext.create('Ext.form.field.ComboBox', {
		id : 'hecIndustryComboBox',
		name : 'hecIndustryComboBox',
	    fieldLabel: '高耗能行业类别',
	    width : 200,
	    labelAlign : 'right',
	    valueField: 'HEC_INDUSTRY_CODE',
	    displayField: 'HEC_INDUSTRY_NAME',
	    store : new Ext.data.ArrayStore({
			fields : ['HEC_INDUSTRY_CODE', 'HEC_INDUSTRY_NAME'],
			data : [['00', '非高耗能'], ['01', '是高耗能']]
		}),
		editable : false
	});	
	
	var isVipComboBox = Ext.create('Ext.form.field.ComboBox', {
		id : 'isVipComboBox',
		name : 'isVipComboBox',
	    fieldLabel: '重要用户标识',
	    width : 200,
	    labelAlign : 'right',
	    valueField: 'value',
	    displayField: 'name',
	    store : new Ext.data.ArrayStore({
			fields : ['value', 'name'],
			data : [['0', '否'], ['1', '是']]
		}),
		editable : false
	});	
	
	var operatorComboBox = Ext.create('Ext.form.field.ComboBox', {
		id : 'operatorComboBox',
		name : 'operatorComboBox',
	    fieldLabel: '运算符',
	    width : 200,
	    labelAlign : 'right',
	    valueField: 'value',
	    displayField: 'name',
	    store : new Ext.data.ArrayStore({
			fields : ['value', 'name'],
			data : [['1', '正'], ['-1', '负']]
		}),
		editable : false
	});	
	
	var editConsIdTextField = Ext.create('Ext.form.field.Text',{
		labelAlign : 'right',
		width : 200,
		name : 'newConsId',
		id : 'newConsId'
	});
	
	var userSaveButton = Ext.create('Ext.Button',{
		text : '保存',
		handler : function(){
		   var custRow = vcmManageGridPanel.getSelectionModel().getSelection();
	       var custId ='';
	       if(custRow!=null && custRow.length>0){
	    	   custId = custRow[0].get('CUST_ID');
	       }
	       else{
	           Ext.Msg.alert('提示','请选择大客户记录');
	       }
		
		  if(editConsNoField.getValue()!='' && editConsNameField.getValue()!=''){
			   var meterRow =  meterGridPanel.getSelectionModel().getSelection();
			   var meterId = '';
			   var lineId = '';
			   var facId = factoryComboBox.getValue();
			   if(meterRow!=null && meterRow.length>0){
				   meterId = meterRow[0].get('METER_ID');
				   lineId = meterRow[0].get('DEV_ID');
				   facId = meterRow[0].get('FAC_ID');
			   }
			   var userParams = {
					     "userDetail.consId":editConsIdTextField.getValue(),
				         "userDetail.consSrc":1,
				         "userDetail.custId":custId,
				         "userDetail.orgNo":editOOrgComboBox.getValue(),
				         "userDetail.consNo":editConsNoField.getValue(),
				         "userDetail.consName":editConsNameField.getValue(),
				         "userDetail.subsId":facId,
				         "userDetail.lineId":lineId,
				         "userDetail.meterId":meterId,
				         "userDetail.consSortCode":consSortComboBox.getValue(),
				         "userDetail.elecAddr":elecAddrField.getValue(),
				         "userDetail.tradeCode":tradeComboBox.getValue(),
				         "userDetail.hecIndustryCode":hecIndustryComboBox.getValue(),
				         "userDetail.isVip":isVipComboBox.getValue()
			   };
			   Ext.Ajax.request({
		     	      url : 'impCustomerManaAction!saveCConsVcm.action',
		     	      params : userParams,
		              success : function(response) {
						  var result = Ext.decode(response.responseText);
						  if(result.saveCConsVcmRet=="success"){
							  Ext.Msg.alert('操作反馈', '保存用电用户信息成功');
						  }
						  else
						  Ext.Msg.alert('操作反馈', result.saveCConsVcmRet);
		              }
		       });
		      }else{
		    	  Ext.Msg.alert('提示', '用户编号或用户名称不能为空!');
		    	  return;
		      }  
		    }
	});
	
	var userCleanButton = Ext.create('Ext.Button',{
		text : '清空',
		handler : function(){
		editConsIdTextField.setValue('');
		editOOrgComboBox.setValue('');
		editConsNameField.setValue('');
		editConsNoField.setValue('');
		consSortComboBox.setValue('');
		elecAddrField.setValue('');
		tradeComboBox.setValue('');
		hecIndustryComboBox.setValue('');
		isVipComboBox.setValue('');
		operatorComboBox.setValue('');
		meterGridStore.removeAll();
	    }
	});

	var editUserPanel = Ext.create('Ext.panel.Panel',{
		region : 'north',
		border : false,
		heigth : 500,
		layout : 'column',
		items : [{
			columnWidth : .2,
			border : false,
			items : [editConsIdTextField],
			hidden : true
		},{
			padding : '10px ',
			columnWidth :　.2,
			border : false,
			items : [editOOrgComboBox]
		},{
			padding : '10px ',
			columnWidth :　.2,
			border : false,
			items : [editConsNameField]
		},{
			padding : '10px ',
			columnWidth :　.2,
			border : false,
			items : [editConsNoField]
		},{
			padding : '10px ',
			columnWidth : .2,
			border : false,
			items : [consSortComboBox]
		},{
			padding : '10px ',
			columnWidth : .2,
			border : false,
			items : [elecAddrField]
		},{
			columnWidth : .2,
			border : false,
			items : [tradeComboBox]
		},{
			columnWidth : .2,
			border : false,
			items : [hecIndustryComboBox]
		},{
			columnWidth : .2,
			border : false,
			items : [isVipComboBox]
		},{
			columnWidth : .2,
			border : false,
			items : [operatorComboBox]
		},{
			columnWidth : .1,
			border : false,
			items : [userSaveButton]
		},{
			columnWidth : .1,
			border : false,
			items : [userCleanButton]
		}]
	});
			
	Ext.define('areaModel',{
		extend : 'Ext.data.Model',
		fields : [{
			type : 'string',
			name : 'AREA_CODE'
		},{
			type : 'string',
			name : 'AREA_NAME'
		}]
	});	
	var areaStore = Ext.create('Ext.data.Store', {
		autoLoad : false,
		model : 'areaModel',
		proxy : {
		    type : 'ajax',
		    url : 'impCustomerManaAction!queryPbsArea.action',
		    reader : {
		        root : 'areaList'
 	        }
	    }
	});
	var areaComboBox = Ext.create('Ext.form.field.ComboBox', {
		id : 'areaComboBox',
		name : 'areaComboBox',
	    fieldLabel: '供电区域',
	    width : 200,
	    labelAlign : 'right',
	    valueField: 'AREA_CODE',
	    displayField: 'AREA_NAME',
	    store : areaStore,
		editable : false,
		listeners : {
			   select : function(){
		            factoryComboBox.setValue('');
		            factoryStore.load({
  	  	              params : {
  	  		           areaId : areaComboBox.getValue()
  	  	              }
  	  	            });
		       }
		}
	});	
	
	Ext.define('factoryModel',{
		extend : 'Ext.data.Model',
		fields : [{
			type : 'string',
			name : 'FACTORY_CODE'
		},{
			type : 'string',
			name : 'FACTORY_NAME'
		}]
	});	
	var factoryStore = Ext.create('Ext.data.Store', {
		model : 'factoryModel',
		proxy : {
		    type : 'ajax',
		    url : 'impCustomerManaAction!queryPbsFactory.action',
		    reader : {
		        root : 'factoryList'
 	        }
	    }
	});
	var factoryComboBox = Ext.create('Ext.form.field.ComboBox', {
		id : 'factoryComboBox',
		name : 'factoryComboBox',
	    fieldLabel: '厂站名称',
	    width : 200,
	    labelAlign : 'right',
	    valueField: 'FACTORY_CODE',
	    displayField: 'FACTORY_NAME',
	    store : factoryStore,
		editable : false,
		listConfig : {
	       loadMask:false
	    } 
	});	
	
	var meterQueryButton = Ext.create('Ext.Button',{
		text : '查询',
		handler : function(){
		   meterGridStore.load({
			  params : {
				factoryId : factoryComboBox.getValue(),
				meterType : Ext.getCmp('meterType').getValue()
		      }
	      });
	    }
	});
	
	var meterChoosePanel = Ext.create('Ext.panel.Panel',{
		region : 'north',
		heigth : 50,
		border : false,
		layout : 'column',
		items : [{
			columnWidth : .2,
			padding : '10px ',
			border : false,
			items : [areaComboBox]
		},{
			columnWidth : .2,
			padding : '10px ',
			border : false,
			items : [factoryComboBox]
		},{
			padding : '10px ',
        	columnWidth : .5,
        	id : 'meterType',
        	xtype : 'radiogroup',
        		items: [{
	                boxLabel: '变压器',
	                name : 'radio',
	                id : 'transformer',
	                inputValue: 1
	            }, {
	                boxLabel: '电容器',
	                name : 'radio',
	                id : 'capacitor',
	                inputValue: 0
	            },{
	            	boxLabel : '线路',
	            	name : 'radio',
	            	id : 'line',
	            	inputValue : 2
	            },{
	            	boxLabel : '其他',
	            	name : 'radio',
	            	id : 'else',
	            	inputValue : 3
	            }]
        },{
        	columnWidth : .1,
        	border : false,
        	padding : '10px ',
        	items : [meterQueryButton]
        }]
	});
	
	Ext.define('meterGridModel', {
		extend : 'Ext.data.Model',
		fields : ['METER_ID','METER_NAME','DEV_ID','FAC_ID','FAC_NAME']
	});

   var meterGridStore = Ext.create('Ext.data.Store', {
      model : 'meterGridModel',
      proxy : {
	      type : 'ajax',
	      url : 'impCustomerManaAction!queryPbsMeter.action',
	      reader : {
		      root : 'meterList',
		      type : 'json',
		      totalProperty : 'meterTotalCount'
	      }
      }
   });
	
	var meterGridSm = Ext.create('Ext.selection.CheckboxModel', {
		mode : 'SINGLE',
		listeners : {
			select : function(model, record, index) {
			}
		}
	});
	
	var meterGridPanel = Ext.create('Ext.grid.Panel',{
		region : 'center',
        id : 'meterGrid',
        name : 'meterGrid',
        store: meterGridStore,
        selModel : meterGridSm,
        columns: [{
        	 text : '电能表编号',
        	 dataIndex : 'METER_ID'
         },{
        	 text : '电能表名称',
        	 width : 300,
        	 dataIndex : 'METER_NAME'
         },{
        	 text : '设备编号',
        	 dataIndex : 'DEV_ID'
         },{
        	 text : '厂站编号',
        	 dataIndex : 'FAC_ID',
        	 hidden : true
         },{
        	 text : '厂站名称',
        	 dataIndex : 'FAC_NAME'
         }],
         dockedItems : [{
        	 xtype : 'pagingtoolbar',
        	 store : meterGridStore,
        	 dock : 'bottom',
        	 displayInfo : true
         }]
     });
	
	var relaMeterPanel = Ext.create('Ext.panel.Panel',{
		title : '关联电能表',
		region : 'center',
		layout : 'border',
		items : [meterChoosePanel,meterGridPanel]
	});
	
	var newUserPanel = Ext.create('Ext.panel.Panel',{
		title : '编辑用电用户',
		layout : 'border',
		border : false,
		items : [editUserPanel,relaMeterPanel]
	});
	
	var userTabPanel = Ext.create('Ext.tab.Panel',{
		region : 'center',
		activeTab : 0,
		layout : 'fit',
		items : [userPanel,importUserPanel,newUserPanel]
	});
	
	var vcmNoTextField = Ext.create('Ext.form.field.Text',{
		labelAlign : 'right',
		fieldLabel : '大客户编号',
		name : 'vcmNo',
		id : 'vcmNo'});
	
	var vcmNameTextField = Ext.create('Ext.form.field.Text',{
		labelAlign : 'right',
		fieldLabel : '客户名称',
		name : 'vcmName',
		id : 'vcmName'});
	
	var vcmQueryButton = Ext.create('Ext.Button',{
		text : '查询',
		handler : function(){
		  vcmManageGridStore.load({
			  params : {
			    vcmId : '',
				vcmNo : vcmNoTextField.getValue(),
				vcmName : vcmNameTextField.getValue()
		      }
	      });
	    }
	});
	
	var vcmDeleteButton = Ext.create('Ext.Button',{
		text : '删除',
		handler : function(){}
	});
	
	var vcmManageChoosePanel = Ext.create('Ext.panel.Panel',{
		region : 'north',
		heigth : 150,
		layout : 'column',
		border : false,
		items : [{
			padding : '10px ',
			columnWidth :　.3,
			border : false,
			items : [vcmNoTextField]
			},{
			padding : '10px ',
			columnWidth : .3,
			border : false,
			items : [vcmNameTextField]
			},{
			padding : '10px ',
			columnWidth : .1,
			border : false,
			items : [vcmQueryButton]
			},{
			padding : '10px ',
			columnWidth : .1,
			border : false,
			items : [vcmDeleteButton]
			}
			]
	});
	
	Ext.define('vcmManageGridModel', {
		extend : 'Ext.data.Model',
		fields : ['CUST_ID','CUST_TYPE','CUST_NO','CUST_NAME','ECONOMY_TYPE_CODE',
				'ANNUAL_GP','CREDIT_LEVEL_CODE','VALUE_LEVEL_CODE','RISK_LEVEL_CODE','VIP_FLAG',
				'QUERY_PWD','ENTEPRISE_WEBSITE','ENTEPRISE_SCALE','BRIEF','REG_CAPITAL',
				'T_CAPTAL,LEGAL_PERSON','OPER_SCOPE','MAIN_PRODUCT','PRODUCE_TECH',
				'OUTPUT','VIP_LEVEL','MAIN_MATERIAL','SUPPLY_SRC','SALES_AMT',
				'SALES_REGION','PS_ENSURE_PRJ','POWER_COST_RATIO','INDUSTRY_CODE']
	});

   var vcmManageGridStore = Ext.create('Ext.data.Store', {
      model : 'vcmManageGridModel',
      proxy : {
	      type : 'ajax',
	      url : 'impCustomerManaAction!queryCCustVcm.action',
	      reader : {
		      root : 'vcmList',
		      type : 'json'
	      }
      }
   });
	
	var vcmManageGridSm = Ext.create('Ext.selection.CheckboxModel', {
		mode : 'SINGLE',
		listeners : {
			select : function(model, record, index) {
			}
		}
	});
	
	var vcmManageGridPanel = Ext.create('Ext.grid.Panel',{
		region : 'center',
        id : 'vcmManageGrid',
        name : 'vcmManageGrid',
        store: vcmManageGridStore,
        selModel :vcmManageGridSm,
        columns: [{
             text: '客户标识',
             dataIndex: 'CUST_ID',
             hidden : true
         },{
             text: '大客户类型',
           	 dataIndex: 'CUST_TYPE'
         },{
             text: '客户编号',
             dataIndex: 'CUST_NO'
         },{
             text: '客户名称',
             dataIndex: 'CUST_NAME'
         },{
             text: '经济类型',
             dataIndex: 'ECONOMY_TYPE_CODE'
         },{
             text: '信用等级',
             dataIndex: 'CREDIT_LEVEL_CODE'
         },{
             text: '价值等级',      
             dataIndex: 'VALUE_LEVEL_CODE'
         },{
             text: '风险等级',
             dataIndex: 'RISK_LEVEL_CODE'
         },{
             text: 'VIP标志',
             dataIndex: 'VIP_FLAG'
         }],
         listeners :{
         	'itemclick' : function(grid,record,item,index,e,options){
		        userGridStore.load({
		        	params : {
		        	    consId : '',
		        	    custId : record.get('CUST_ID')
		            }
		        });
		        newVcmIdTextField.setValue(record.get('CUST_ID'));
	        }
	     }
     });
	
	var vcmManagePanel = Ext.create('Ext.panel.Panel',{
		title : '大客户管理',
		layout : 'border',
		border : false,
		items : [vcmManageChoosePanel,vcmManageGridPanel]
	});
	
	var importVcmNoTextField = Ext.create('Ext.form.field.Text',{
		labelAlign : 'right',
		fieldLabel : '大客户编号',
		name : 'importVcmNo',
		id : 'importVcmNo'});
	
	var importVcmNameTextField = Ext.create('Ext.form.field.Text',{
		labelAlign : 'right',
		fieldLabel : '客户名称',
		name : 'importVcmName',
		id : 'importVcmName'});
	
	var importVcmQueryButton = Ext.create('Ext.Button',{
		text : '查询',
		handler : function(){
		    importVcmGridStore.load({
		    	params : {
		    	   importVcmNo : importVcmNoTextField.getValue(),
		    	   importVcmName : importVcmNameTextField.getValue()
		        }
		    });
	    }
	});
	
	var importVcmImportButton = Ext.create('Ext.Button',{
		text : '导入',
		handler : function(){
 	       var row = importVcmGridPanel.getSelectionModel().getSelection(); 
	       if(row!=null && row.length>0){
	    	   var custIds = '';
	    	   for(var i=0;i<row.length;i++){
		       var custId = row[i].get('CUST_ID');
		          if(i==0)
		          custIds = custId;
		          else
		          custIds = custIds + ',' + custId;
	           }
	    	   Ext.Ajax.request({
		     	      url : 'impCustomerManaAction!importCCustVcm.action',
		     	      params : {
		     	          custIds : custIds
		               },
		              success : function(response) {
						  var result = Ext.decode(response.responseText);
						  if(result.importCCustVcmRet=="success"){
							  Ext.Msg.alert('操作反馈', '导入大客户成功');
						  }
						  else
						  Ext.Msg.alert('操作反馈', result.importCCustVcmRet);
		              }
		       });
           }
	       else
	       Ext.Msg.alert('提示', '请选择待导入的大客户');
      }
	});
	
	var importVcmChoosePanel = Ext.create('Ext.panel.Panel',{
		region : 'north',
		heigth : 150,
		layout : 'column',
		border : false,
		items : [{
			padding : '10px ',
			columnWidth :　.3,
			border : false,
			items : [importVcmNoTextField]
			},{
			padding : '10px ',
			columnWidth : .3,
			border : false,
			items : [importVcmNameTextField]
			},{
			padding : '10px ',
			columnWidth : .1,
			border : false,
			items : [importVcmQueryButton]
			},{
			padding : '10px ',
			columnWidth : .1,
			border : false,
			items : [importVcmImportButton]
			}
			]
	});
	
	Ext.define('importVcmGridModel', {
		extend : 'Ext.data.Model',
		fields : ['CUST_ID','CUST_NO','NAME','ECONOMY_TYPE_CODE','CREDIT_LEVEL_CODE','VALUE_LEVEL_CODE','RISK_LEVEL_CODE','VIP_FLAG']
	});

   var importVcmGridStore = Ext.create('Ext.data.Store', {
      model : 'importVcmGridModel',
      id : 'importVcmGridStore',
	  remoteSort: true,
      buffered: true,
      proxy : {
	      type : 'ajax',
	      url : 'impCustomerManaAction!queryCCust.action',
	      reader : {
		      root : 'cCustList',
		      type : 'json',
		      totalProperty: 'cCustTotalCount'
	      }
      }
   });
	
	var importVcmGridSm = Ext.create('Ext.selection.CheckboxModel');
	
	var importVcmGridPanel = Ext.create('Ext.grid.Panel',{
		region : 'center',
        store : importVcmGridStore,
        selModel : importVcmGridSm,
        columns: [{
        	xtype: 'rownumberer',
        	width: 50,
        	sortable: false
        },{
             dataIndex: 'CUST_ID',
             hidden : true
         },{
        	 text : '客户编号',
        	 dataIndex : 'CUST_NO'
         },{
        	 text : '客户名称',
        	 dataIndex : 'NAME',
        	 width : 200
         },{
        	 text : '经济类型',
        	 dataIndex : 'ECONOMY_TYPE_CODE'
         },{
        	 text : '信用等级',
        	 dataIndex : 'CREDIT_LEVEL_CODE'
         },{
        	 text : '价值等级',
        	 dataIndex : 'VALUE_LEVEL_CODE'
         },{
        	 text : '风险等级',
        	 dataIndex : 'RISK_LEVEL_CODE'
         },{
        	 text : 'VIP标志',
        	 dataIndex : 'VIP_FLAG'
         }],
         dockedItems : [{
        	 xtype : 'pagingtoolbar',
        	 store : importVcmGridStore,
        	 dock : 'bottom',
        	 displayInfo : true
         }]
     });
	
	importVcmGridStore.guaranteeRange(0, 199);
	
	var importVcmPanel = Ext.create('Ext.panel.Panel',{
		title : '导入大客户',
		layout : 'border',
		border : false,
		items : [importVcmChoosePanel,importVcmGridPanel]
	});
	
	var newVcmIdTextField = Ext.create('Ext.form.field.Text',{
		labelAlign : 'right',
		width : 200,
		name : 'newVcmId',
		id : 'newVcmId'
		});
	
	var newVcmNoTextField = Ext.create('Ext.form.field.Text',{
		labelAlign : 'right',
		fieldLabel : '大客户编号',
		width : 200,
		name : 'newVcmNo',
		id : 'newVcmNo',
		allowBlank : false
		});
	
	var newVcmNameTextField = Ext.create('Ext.form.field.Text',{
		labelAlign : 'right',
		fieldLabel : '客户名称',
		width : 200,
		name : 'newVcmName',
		id : 'newVcmName',
		allowBlank : false
		});
	
//	Ext.define('vcmTypeModel',{
//		extend : 'Ext.data.Model',
//		fields : [{
//			type : 'string',
//			name : 'VCM_TYPE_CODE'
//		},{
//			type : 'string',
//			name : 'VCM_TYPE_NAME'
//		}]
//	});	
//	var vcmTypeStore = Ext.create('Ext.data.Store', {
//		model : 'vcmTypeModel',
//		proxy : {
//		    type : 'ajax',
//		    url : '',
//		    reader : {
//		        root : 'vcmTypeList'
// 	        }
//	    }
//	});
	var vcmTypeComboBox = Ext.create('Ext.form.field.ComboBox', {
		id : 'vcmTypeComboBox',
		name : 'vcmTypeComboBox',
	    fieldLabel: '大客户类型',
	    width : 200,
	    labelAlign : 'right',
	    valueField: 'VCM_TYPE_CODE',
	    displayField: 'VCM_TYPE_NAME',
	    store : new Ext.data.ArrayStore({
			fields : ['VCM_TYPE_CODE', 'VCM_TYPE_NAME'],
			data : [['0', '一般大客户'], ['1', 'VIP大客户']]
		}),
		editable : false
	});	
	
	Ext.define('economymTypeModel',{
		extend : 'Ext.data.Model',
		fields : [{
			type : 'string',
			name : 'ECONOMY_TYPE_CODE'
		},{
			type : 'string',
			name : 'ECONOMY_TYPE_NAME'
		}]
	});	
	var economyTypeStore = Ext.create('Ext.data.Store', {
		model : 'economyTypeModel',
		proxy : {
		    type : 'ajax',
		    url : '',
		    reader : {
		        root : 'economyTypeList'
 	        }
	    }
	});
	var economyTypeComboBox = Ext.create('Ext.form.field.ComboBox', {
		id : 'economyTypeComboBox',
		name : 'economyTypeComboBox',
	    fieldLabel: '经济类型',
	    width : 200,
	    labelAlign : 'right',
	    valueField: 'ECONOMY_TYPE_CODE',
	    displayField: 'ECONOMY_TYPE_NAME',
	    store : economyTypeStore,
		editable : false
	});	
	
	Ext.define('creditLevelModel',{
		extend : 'Ext.data.Model',
		fields : [{
			type : 'string',
			name : 'CREDIT_LEVEL_CODE'
		},{
			type : 'string',
			name : 'CREDIT_LEVEL_NAME'
		}]
	});	
	var creditLevelStore = Ext.create('Ext.data.Store', {
		model : 'creditLevelModel',
		proxy : {
		    type : 'ajax',
		    url : '',
		    reader : {
		        root : 'creditLevelList'
 	        }
	    }
	});
	var creditLevelComboBox = Ext.create('Ext.form.field.ComboBox', {
		id : 'creditLevelComboBox',
		name : 'creditLevelComboBox',
	    fieldLabel: '信用等级',
	    width : 200,
	    labelAlign : 'right',
	    valueField: 'CREDIT_LEVEL_CODE',
	    displayField: 'CREDIT_LEVEL_NAME',
	    store : creditLevelStore,
		editable : false
	});	
	
	Ext.define('valueLevelModel',{
		extend : 'Ext.data.Model',
		fields : [{
			type : 'string',
			name : 'VALUE_LEVEL_CODE'
		},{
			type : 'string',
			name : 'VALUE_LEVEL_NAME'
		}]
	});	
	var valueLevelStore = Ext.create('Ext.data.Store', {
		model : 'valueLevelModel',
		proxy : {
		    type : 'ajax',
		    url : '',
		    reader : {
		        root : 'valueLevelList'
 	        }
	    }
	});
	var valueLevelComboBox = Ext.create('Ext.form.field.ComboBox', {
		id : 'valueLevelComboBox',
		name : 'valueLevelComboBox',
	    fieldLabel: '价值等级',
	    width : 200,
	    labelAlign : 'right',
	    valueField: 'VALUE_LEVEL_CODE',
	    displayField: 'VALUE_LEVEL_NAME',
	    store : valueLevelStore,
		editable : false
	});	
	
	Ext.define('riskLevelModel',{
		extend : 'Ext.data.Model',
		fields : [{
			type : 'string',
			name : 'RISK_LEVEL_CODE'
		},{
			type : 'string',
			name : 'RISK_LEVEL_NAME'
		}]
	});	
	var riskLevelStore = Ext.create('Ext.data.Store', {
		model : 'riskLevelModel',
		proxy : {
		    type : 'ajax',
		    url : '',
		    reader : {
		        root : 'riskLevelList'
 	        }
	    }
	});
	var riskLevelComboBox = Ext.create('Ext.form.field.ComboBox', {
		id : 'riskLevelComboBox',
		name : 'riskLevelComboBox',
	    fieldLabel: '风险等级',
	    width : 200,
	    labelAlign : 'right',
	    valueField: 'RISK_LEVEL_CODE',
	    displayField: 'RISK_LEVEL_NAME',
	    store : riskLevelStore,
		editable : false
	});	
	
//	Ext.define('vipFlagModel',{
//		extend : 'Ext.data.Model',
//		fields : [{
//			type : 'string',
//			name : 'VIP_FLAG_CODE'
//		},{
//			type : 'string',
//			name : 'VIP_FLAG_NAME'
//		}]
//	});	
//	var vipFlagStore = Ext.create('Ext.data.Store', {
//		model : 'vipFlagModel',
//		proxy : {
//		    type : 'ajax',
//		    url : '',
//		    reader : {
//		        root : 'vipFlagList'
// 	        }
//	    }
//	});
	var vipFlagComboBox = Ext.create('Ext.form.field.ComboBox', {
		id : 'vipFlagComboBox',
		name : 'vipFlagComboBox',
	    fieldLabel: 'VIP标志',
	    width : 200,
	    labelAlign : 'right',
	    valueField: 'VIP_FLAG_CODE',
	    displayField: 'VIP_FLAG_NAME',
	    store : new Ext.data.ArrayStore({
			fields : ['VIP_FLAG_CODE', 'VIP_FLAG_NAME'],
			data : [['Y', 'VIP客户'], ['N', '非VIP客户']]
		}),
		editable : false
	});	
	
	var legalPersonField = Ext.create('Ext.form.field.Text',{
		labelAlign : 'right',
		fieldLabel : '法人代表',
		width : 200,
		name : 'legalPerson',
		id : 'legalPerson'
	});
	
	Ext.define('industryModel',{
		extend : 'Ext.data.Model',
		fields : [{
			type : 'string',
			name : 'INDUSTRY_CODE'
		},{
			type : 'string',
			name : 'INDUSTRY_NAME'
		}]
	});	
	var industryStore = Ext.create('Ext.data.Store', {
		model : 'industryModel',
		proxy : {
		    type : 'ajax',
		    url : '',
		    reader : {
		        root : 'industryList'
 	        }
	    }
	});
	var industryComboBox = Ext.create('Ext.form.field.ComboBox', {
		id : 'industryComboBox',
		name : 'industryComboBox',
	    fieldLabel: '产业分类',
	    width : 200,
	    labelAlign : 'right',
	    valueField: 'INDUSTRY_CODE',
	    displayField: 'INDUSTRY_NAME',
	    store : industryStore,
		editable : false
	});	
	
	var operScopeField = Ext.create('Ext.form.field.Text',{
		labelAlign : 'right',
		fieldLabel : '经营范围',
		width : 200,
		name : 'operScope',
		id : 'operScope'
	});
	
	var entepriseWebsiteField = Ext.create('Ext.form.field.Text',{
		labelAlign : 'right',
		fieldLabel : '企业网址',
		width : 425,
		name : 'entepriseWebSite',
		id : 'entepriseWebSite'
	});
	
	var briefField = Ext.create('Ext.form.field.Text',{
		labelAlign : 'right',
		fieldLabel : '企业简介',
		width : 425,
		name : 'brief',
		id : 'brief'
	});
	
	var vcmCleanButton = Ext.create('Ext.Button',{
		text : '清空',
		handler : function(){
		  newVcmIdTextField.setValue('');
		  newVcmNoTextField.setValue('');
	      newVcmNameTextField.setValue('');
	      vcmTypeComboBox.setValue('');
	      economyTypeComboBox.setValue('');
	      creditLevelComboBox.setValue('');
	      valueLevelComboBox.setValue('');
	      riskLevelComboBox.setValue('');
	      vipFlagComboBox.setValue('');
	      legalPersonField.setValue('');
	      industryComboBox.setValue('');
	      operScopeField.setValue('');
	      entepriseWebsiteField.setValue('');
	      briefField.setValue('')
	    }
	});
	
	var vcmSaveButton = Ext.create('Ext.Button',{
		text : '保存',
		handler : function(){
		  if(newVcmNoTextField.getValue()!='' && newVcmNameTextField.getValue()!=''){
		   var vcmParams = {
				     "vcmDetail.custId":newVcmIdTextField.getValue(),
				     "vcmDetail.custNo":newVcmNoTextField.getValue(),
			         "vcmDetail.custName":newVcmNameTextField.getValue(),
			         "vcmDetail.custType":vcmTypeComboBox.getValue(),
			         "vcmDetail.economyType":economyTypeComboBox.getValue(),
			         "vcmDetail.creditLevel":creditLevelComboBox.getValue(),
			         "vcmDetail.valueLevel":valueLevelComboBox.getValue(),
			         "vcmDetail.riskLevel":riskLevelComboBox.getValue(),
			         "vcmDetail.vipFlag":vipFlagComboBox.getValue(),
			         "vcmDetail.legalPerson":legalPersonField.getValue(),
			         "vcmDetail.industry":industryComboBox.getValue(),
			         "vcmDetail.operScope":operScopeField.getValue(),
			         "vcmDetail.entepriseWebsite":entepriseWebsiteField.getValue(),
			         "vcmDetail.brief":briefField.getValue()
		   };
		   Ext.Ajax.request({
	     	      url : 'impCustomerManaAction!saveCCustVcm.action',
	     	      params : vcmParams,
	              success : function(response) {
					  var result = Ext.decode(response.responseText);
					  if(result.saveCCustVcmRet=="success"){
						  Ext.Msg.alert('操作反馈', '保存大客户信息成功');
					  }
					  else
					  Ext.Msg.alert('操作反馈', result.saveCCustVcmRet);
	              }
	       });
	      }else{
	    	  Ext.Msg.alert('提示', '客户编号或客户名称不能为空!');
	    	  return;
	      }  
	    }
	});
	
	var newVcmPanel = Ext.create('Ext.panel.Panel',{
		title : '编辑大客户',
		layout : 'column',
		padding : '10px ',
		border : false,
		items : [{
			columnWidth :　.2,
			border : false,
			hidden : true,
			items : [newVcmIdTextField]
		    },{
			columnWidth :　.2,
			border : false,
			items : [newVcmNoTextField]
			},{
			columnWidth : .2,
			border : false,
			items : [newVcmNameTextField]
			},{
			columnWidth : .2,
			border : false,
			items : [vcmTypeComboBox]
			},{
			columnWidth : .2,
			border : false,
			items : [economyTypeComboBox]
			},{
			columnWidth : .2,
			border : false,
			items : [creditLevelComboBox]
			},{
			columnWidth : .2,
			border : false,
			items : [valueLevelComboBox]
			},{
			columnWidth : .2,
			border : false,
			items : [riskLevelComboBox]
			},{
			columnWidth : .2,
			border : false,
			items : [vipFlagComboBox]
			},{
			columnWidth :　.2,
			border : false,
			items : [legalPersonField]
			},{
			columnWidth : .2,
			border : false,
			items : [industryComboBox]
			},{
			columnWidth :　.2,
			border : false,
			items : [operScopeField]			
			},{
			columnWidth : .4,
			border : false,
	        items : [entepriseWebsiteField]
			},{
			columnWidth : .4,
			border : false,
		    items : [briefField]	
			},{
			padding : '10px 40px ',
			columnWidth : .2,
			border : false,
			items : [vcmSaveButton]
			},{
			padding : '10px 40px ',
			columnWidth : .2,
			border : false,
			items : [vcmCleanButton]		
			}]
	});
	
	var vcmTabPanel = Ext.create('Ext.tab.Panel',{
		region : 'north',
		activeTab : 0 ,
		height : 200,
		layout : 'fit',
		items :[vcmManagePanel,importVcmPanel,newVcmPanel]
	});
	
	newVcmPanel.on('activate', 
		 function() {
		    if(newVcmIdTextField.getValue()!=''){
		    	Ext.Ajax.request({
		     	      url : 'impCustomerManaAction!queryCCustVcm.action',
		     	      params : {
		    		      vcmId : newVcmIdTextField.getValue(),
					      vcmNo : '',
					      vcmName : ''
		               },
		              success : function(response) {
						  var result = Ext.decode(response.responseText);
						  var list = result.vcmList;
						  if(list!=null && list.length>0){
						  newVcmNoTextField.setValue(list[0].CUST_NO);
					      newVcmNameTextField.setValue(list[0].CUST_NAME);
					      vcmTypeComboBox.setValue(list[0].CUST_TYPE);
					      economyTypeComboBox.setValue(list[0].ECONOMY_TYPE_CODE);
					      creditLevelComboBox.setValue(list[0].CREDIT_LEVEL_CODE);
					      valueLevelComboBox.setValue(list[0].VALUE_LEVEL_CODE);
					      riskLevelComboBox.setValue(list[0].RISK_LEVEL_CODE);
					      vipFlagComboBox.setValue(list[0].VIP_FLAG);
					      legalPersonField.setValue(list[0].LEGAL_PERSON);
					      industryComboBox.setValue(list[0].INDUSTRY_CODE);
					      operScopeField.setValue(list[0].OPER_SCOPE);
					      entepriseWebsiteField.setValue(list[0].ENTEPRISE_WEBSITE);
					      briefField.setValue(list[0].BRIEF)
		                  }
		              }
		       });}
	     }
	);
	
	newUserPanel.on('activate', 
			 function() {
			    if(editConsIdTextField.getValue()!=''){
			    	Ext.Ajax.request({
			     	      url : 'impCustomerManaAction!queryCConsVcm.action',
			     	      params : {
			    		     consId : editConsIdTextField.getValue(),
			    		     custId : ''
			               },
			              success : function(response) {
							  var result = Ext.decode(response.responseText);
							  var list = result.userList;
							  if(list!=null && list.length>0){
								  editConsIdTextField.setValue(list[0].CONS_ID);
								  editOOrgComboBox.setValue(list[0].ORG_NO);
								  editConsNameField.setValue(list[0].CONS_NAME);
								  editConsNoField.setValue(list[0].CONS_NO);
								  consSortComboBox.setValue(list[0].CONS_SORT_CODE);
								  elecAddrField.setValue(list[0].ELEC_ADDR);
								  tradeComboBox.setValue(list[0].TRADE_CODE);
								  hecIndustryComboBox.setValue(list[0].HEC_INDUSTRY_CODE);
								  isVipComboBox.setValue(list[0].IS_VIP);
								  //operatorComboBox.setValue('');
								  meterGridStore.removeAll();
			                  }
			              }
			       });}
		     }
		);
	
    var vcmRelaDefPanel = Ext.create('Ext.panel.Panel',{
    	layout : 'border',
    	border : false,
    	items : [vcmTabPanel,userTabPanel]
    });
	
    renderModel(vcmRelaDefPanel,"大客户关系定义"); 
	
	});	
	
