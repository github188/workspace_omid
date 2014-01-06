Ext.onReady(function(){
	var ROLEID;
	Ext.define('roleModel',{
		extend : 'Ext.data.Model',
		fields : [{
			        type : 'string',
			        name : 'ROLE_ID'
		        },{
					type : 'string',
					name : 'ROLE_DESC'
				}, {
					type : 'string',
					name : 'ROLE_ATTR_NAME'
				},{
					type : 'string',
					name : 'ROLE_LEVEL'
				},{
					type : 'string',
					name : 'ROLE_ATTR_CODE'
				}]
	});
	
	var roleStore = Ext.create('Ext.data.Store',{
		model : 'roleModel',
		proxy : {
		    type : 'ajax',
		    url : './sysman/roleManageAction!queryPRole.action',
		    reader : {
		       root : 'roleList'
	        }
	    },
	    autoLoad : true
	});
		
	var roleGridSm = Ext.create('Ext.selection.CheckboxModel');
	var roleGridPanel = Ext.create('Ext.grid.Panel',{
		region : 'center',
		selModel: roleGridSm,
		store : roleStore,
	      loadMask : true,
	      viewConfig: {
	      stripeRows: true
	      },
	      columns : [{
	    	text : '角色编号',
			dataIndex : 'ROLE_ID',
			align : 'center',
			hidden : true
		  },{
		    text : '角色名称',
		    dataIndex : 'ROLE_DESC',
		    align : 'center'
	      },{
		    text : '角色类型',
		    dataIndex : 'ROLE_ATTR_NAME',
		    align : 'center'
	      },{
			 text : '角色级别',
			 dataIndex : 'ROLE_LEVEL',
			 align : 'center',
			 renderer : function(val){
	    	    if(val=='02'){
	    	       return '网省';
	    	    }else
	    	    if(val=='03'){
	    	       return '地市';
	    	    }else
	    	    if(val=='04'){
	    	       return '区县';
	    	    }
	    	    else
	    	       return val;
	         }
		  },{
			 dataIndex : 'ROLE_ATTR_CODE',
			 align : 'center',
			 hidden : true
		  }],
		  listeners : {
	        	'itemclick' : function(grid,record,item,index,e,options){
	    	        var roleId = record.get('ROLE_ID');
	        	    var roleDesc = record.get('ROLE_DESC');
	        	    var roleAttr = record.get('ROLE_ATTR_CODE');
	        	    var roleLevel = record.get('ROLE_LEVEL');
	        	    roleIdField.setValue(roleId);
	        	    roleNameField.setValue(roleDesc);
	   		        roleAttrComboBox.setValue(roleAttr);
	   		        roleLevelComboBox.setValue(roleLevel);
	   		        
	   		        ROLEID = roleId;
	   		        operatorStore.getProxy().extraParams = {
	   		        	roleId : roleId
	   		        };
	   		        
	   		        operatorStore.load();
	            }
	      }
	});
	
	  

	
	var roleIdField = Ext.create('Ext.form.field.Text',{
		 labelAlign : 'right',
		 fieldLabel : '角色编号',
 	     name : 'roleId',
	     id : 'roleId',
	     xtype: 'textfield',
	     width : 160
	});
	
	var roleNameField = Ext.create('Ext.form.field.Text',{
		 labelAlign : 'right',
		 fieldLabel : '角色名称',
  	     name : 'roleName',
	     id : 'roleName',
	     xtype: 'textfield',
	     width : 160
	});
	
	Ext.define('roleModel',{
		extend : 'Ext.data.Model',
		fields : [{
					type : 'string',
					name : 'ROLE_ATTR_CODE'
				}, {
					type : 'string',
					name : 'ROLE_ATTR_CODE_NAME'
				}]
	});
	
	var roleAttrStore = Ext.create('Ext.data.Store',{
		model : 'roleModel',
		proxy : {
		    type : 'ajax',
		    url : './sysman/roleManageAction!queryVwRoleAttr.action',
		    reader : {
		       root : 'roleAttrList'
	        }
	    }
	});
	var roleAttrComboBox = Ext.create('Ext.form.field.ComboBox', {
		id : 'roleAttrComboBox',
		name : 'roleAttrComboBox',
		columnWidth : .33,
	    fieldLabel: '角色类型',
	    padding : '5px ',
	    labelAlign : 'right',
	    store: roleAttrStore,
	    valueField: 'ROLE_ATTR_CODE',
	    displayField: 'ROLE_ATTR_CODE_NAME',
		editable : false
	});
	
	var roleLevelStore =  new Ext.data.ArrayStore({
		fields : ['ROLE_LEVEL_CODE', 'ROLE_LEVEL_NAME'],
		data : [['02', '网省'], ['03', '地市'],['04','区县']]
    });
	
	var roleLevelComboBox = Ext.create('Ext.form.field.ComboBox', {
		id : 'roleLevelComboBox',
		name : 'roleLevelComboBox',
		columnWidth : .33,
	    fieldLabel: '角色级别',
	    padding : '5px ',
	    labelAlign : 'right',
	    store: roleLevelStore,
	    valueField: 'ROLE_LEVEL_CODE',
	    displayField: 'ROLE_LEVEL_NAME',
		editable : false
	});
	
	var roleAddButton =  Ext.create('Ext.Button',{
	      text : '增加',
	      handler: function() {
		  if(roleNameField.getValue()==''){
			  Ext.Msg.alert('操作反馈', '请填写角色名称');
		  }else{
		    Ext.Ajax.request({
    	       url : './sysman/roleManageAction!savePRole.action',
    	       params : {
    	       roleId : '',
    	       roleName : roleNameField.getValue(),
    	       roleAttr : roleAttrComboBox.getValue(),
    	       roleLevel : roleLevelComboBox.getValue()
               },
               success : function(response) {
				var result = Ext.decode(response.responseText);
				if(result.savePRoleStatus=="success"){
					Ext.Msg.alert('操作反馈', '增加成功');
					roleStore.load();
				}
				else
				Ext.Msg.alert('操作反馈', result.savePRoleStatus);
                }
            });
		   }
	      }
	});
	
	var roleSaveButton =  Ext.create('Ext.Button',{ 
	      text : '修改',
	      handler : function(){
		  if(roleIdField.getValue()==''){
			  Ext.Msg.alert('操作反馈', '请选择相关角色');
		  }else{
		      Ext.Ajax.request({
	     	     url : './sysman/roleManageAction!savePRole.action',
	     	     params : {
	     	       roleId : roleIdField.getValue(),
	     	       roleName : roleNameField.getValue(),
	     	       roleAttr : roleAttrComboBox.getValue(),
	     	       roleLevel : roleLevelComboBox.getValue()
	             },
	             success : function(response) {
					var result = Ext.decode(response.responseText);
					if(result.savePRoleStatus=="success"){
						Ext.Msg.alert('操作反馈', '修改成功');
						roleStore.load();
					}
					else
					Ext.Msg.alert('操作反馈', result.savePRoleStatus);
	             }
	          });
		    } 
	      }
	});
	
	var roleDeleteButton =  Ext.create('Ext.Button',{ 
	      text : '删除',
	      handler : function(){
		 var roleRow = roleGridPanel.getSelectionModel().getSelection(); 
		  if(roleRow.length<=0){
			  Ext.Msg.alert('操作反馈', '请选择相关角色');
		  }else{
			  if(roleRow.length>0){
				  var roleIds = '';
			      for(var i=0;i<roleRow.length;i++){
			    		if(i==0) 
			    		roleIds = roleRow[i].get('ROLE_ID');
			    		else
			    		roleIds = roleIds + ',' + roleRow[i].get('ROLE_ID');
			      }
			  }
		      Ext.Ajax.request({
	     	     url : './sysman/roleManageAction!deletePRole.action',
	     	     params : {
	     	       roleIds : roleIds
	             },
	             success : function(response) {
					var result = Ext.decode(response.responseText);
					if(result.deletePRoleStatus=="success"){
						Ext.Msg.alert('操作反馈', '删除成功');
						roleStore.load();
					}
					else
					Ext.Msg.alert('操作反馈', result.deletePRoleStatus);
	             }
	          });
		    } 
	      }
	});
	
	var roleEditPanel = Ext.create('Ext.panel.Panel',{
		region : 'south',
		height : 100,
		layout : 'column',
		items : [{
		 padding : '5px ',
   		 columnWidth : .33,
   		 border : false,
		 items : [roleNameField]
         },roleAttrComboBox,roleLevelComboBox,
         {
       		 columnWidth : .4,
       		 padding : '10px 80px ',
       		 border : false,
    		 items : [roleAddButton]
         },{
       		 columnWidth : .3,
       		 padding : '10px 10px ',
       		 border : false,
    		 items : [roleSaveButton]
         },{
       		 columnWidth : .3,
       		 padding : '10px 10px ',
       		 border : false,
    		 items : [roleDeleteButton]
         }
         ]
	});
	
	var roleManagePanel = Ext.create('Ext.panel.Panel',{
		title : '角色管理',
		layout : 'border',
		region : 'west',
		width : 500,
		border : false,
		items : [roleGridPanel,roleEditPanel]
	});
	
	Ext.define('operatorModel',{
		extend : 'Ext.data.Model',
		fields : [{
					type : 'string',
					name : 'STAFF_NO'
				},{
					type : 'string',
					name : 'ORG_NAME'
				},{
					type : 'string',
					name : 'NAME'
				}]
	});
	
	var operatorStore = Ext.create('Ext.data.Store',{
		model : 'operatorModel',
        pageSize : DEFAULT_PAGE_SIZE,
		proxy : {
		    type : 'ajax',
		    url : './sysman/roleManageAction!queryPSysUser.action',
		    reader : {
		       root : 'operatorList',
		       totalProperty: 'operatorTotalCount'
	        }
	    }
	});

	var operatorGridSm = Ext.create('Ext.selection.CheckboxModel',{
		mode : 'MULTI'
	});
	var operatorGridPanel = Ext.create('Ext.grid.Panel',{
		region : 'center',
		selModel: operatorGridSm,
		store : operatorStore,
	      loadMask : true,
	      viewConfig: {
	      	stripeRows: true,
	      	forceFit : true
	      },
	      columns : [{
		    text : '用户编号',
		    dataIndex : 'STAFF_NO',
		    align : 'center'
	      },{
		    text : '供电单位',
		    dataIndex : 'ORG_NAME',
		    align : 'center'
	      },{
			 text : '用户名称',
			 dataIndex : 'NAME',
			 align : 'center'
		  }],
		  listeners : {
	        	'itemclick' : function(grid,record,item,index,e,options){
	    	        var staffNo = record.get('STAFF_NO');
	    	        roleGridPanel.getSelectionModel().deselectAll();
	    	        Ext.Ajax.request({
	     	              url : './sysman/roleManageAction!queryRowByStaffNo.action',
	     	              params : {
	     	                staffNo : staffNo
	                    },
	                    success : function(response) {	
	  				      var result = Ext.decode(response.responseText);
	  				      var rowIds = result.rowIds;
	  				      if(rowIds!=''){
	  				    	var rowIdArray = rowIds.split(',');
	  				        for(var i=0;i<rowIdArray.length;i++){
	  				    	    roleGridPanel.getSelectionModel().select(parseInt(rowIdArray[i]),true);
	  				        }
	  				      }
	                   }
	                });
	    	        
	            }
	      },
	      dockedItems : [{
        	 xtype : 'pagingtoolbar',
        	 store : operatorStore,
        	 dock : 'bottom',
        	 displayInfo : true
	      },{
	      	xtype : 'toolbar',
	      	dock : 'top',
	      	items : [{
	      		xtype : 'button',
	      		text : '增加用户',
	      		handler : function(){
	      			if(Ext.isEmpty(ROLEID)){
	      				Ext.Msg.alert('提示','请选择需要操作的角色!');
	      				return;
	      			}
	      			addUserWindow.show();
	      			addOperatorStore.load();
	      		}
	      	},{
	      		xtype : 'button',
	      		text : '删除用户',
	      		handler : function(){
					var data = operatorGridPanel.getSelectionModel().getSelection();
					if(data.length == 0) {
						Ext.Msg.alert('提示', '请至少选择一个用户！')
						return
					}
					var staffnos = {};
					for(var i = 0; i < data.length ; i++){
						staffnos[i] = data[i].data['STAFF_NO']
					}
					
					Ext.Ajax.request({
		    	       url : './sysman/roleManageAction!deletePAccessRoleByStaffno.action',
		    	       params : {
			    	       staffNo : staffnos
		               },
		               success : function(response) {
							var result = Ext.decode(response.responseText);
							if(result.deletePRoleStatus=="success"){
								Ext.Msg.alert('操作反馈', '删除成功');
								operatorStore.load();
								addUserWindow.hide();
							}
							else
								Ext.Msg.alert('操作反馈', result.deletePRoleStatus);
		                }
		            });
	      		}
	      	}]
	      }]
	});

	
	Ext.define('addOperatorModel',{
		extend : 'Ext.data.Model',
		fields : [{
					type : 'string',
					name : 'STAFF_NO'
				},{
					type : 'string',
					name : 'ORG_NAME'
				},{
					type : 'string',
					name : 'NAME'
				}]
	});
	//增加用户store
	var addOperatorStore = Ext.create('Ext.data.Store',{
		model : 'addOperatorModel',
		proxy : {
		    type : 'ajax',
		    url : './sysman/roleManageAction!queryPSysUserByOrgNo.action',
		    reader : {
		       root : 'operatorList'
	        }
	    }
	});

	var addOperatorGridSm = Ext.create('Ext.selection.CheckboxModel',{
		mode : 'MULTI'
	});
	var addOperatorGridPanel = Ext.create('Ext.grid.Panel',{
		region : 'center',
		selModel: addOperatorGridSm,
		store : addOperatorStore,
	      loadMask : true,
	      viewConfig: {
	      	stripeRows: true,
	      	forceFit : true
	      },
	      columns : [{
		    text : '用户编号',
		    dataIndex : 'STAFF_NO',
		    align : 'center'
	      },{
		    text : '供电单位',
		    dataIndex : 'ORG_NAME',
		    align : 'center'
	      },{
			 text : '用户名称',
			 dataIndex : 'NAME',
			 align : 'center'
		  }]
	});
	//增加用户窗口
	var addUserWindow = Ext.create('Ext.Window',{
		title : '添加用户',
		closeAction : 'hide',
		width : 600,
		height : 400,
		layout : 'border',
		items : [addOperatorGridPanel],
		buttons : [{
			text : '确定',
			handler : function(){
				var data = addOperatorGridPanel.getSelectionModel().getSelection();
				if(data.length == 0) {
					Ext.Msg.alert('提示', '请至少选择一个用户！')
					return
				}
				var staffnos = {};
				for(var i = 0; i < data.length ; i++){
					staffnos[i] = data[i].data['STAFF_NO']
				}
				
				Ext.Ajax.request({
	    	       url : './sysman/roleManageAction!savePAccessRole.action',
	    	       params : {
		    	       roleId : ROLEID,
		    	       staffNo : staffnos
	               },
	               success : function(response) {
						var result = Ext.decode(response.responseText);
						if(result.savePAccessRoleStatus=="success"){
							Ext.Msg.alert('操作反馈', '增加成功');
							operatorStore.load();
							addUserWindow.hide();
						}
						else
							Ext.Msg.alert('操作反馈', result.savePAccessRoleStatus);
	                }
	            });
			}
		},{
			text : '取消',
			handler : function(){
				addUserWindow.hide();
			}
		}]
	});
	
	var operatorSaveButton =  Ext.create('Ext.Button',{ 
	      text : '保存',
	      handler : function(){
		    var operatorRow = operatorGridPanel.getSelectionModel().getSelection(); 
		    var roleRow = roleGridPanel.getSelectionModel().getSelection(); 
		    if(operatorRow.length<=0){
		    	Ext.Msg.alert('操作提示', '请选择对应操作员');
		    }
		    if(roleRow.length<=0){
		    	Ext.Msg.alert('操作提示', '请选择对应角色');
		    }
		    if(operatorRow.length>0 && roleRow.length>0){
		    	var roleIds = '';
		    	for(var i=0;i<roleRow.length;i++){
		    		if(i==0) 
		    		roleIds = roleRow[i].get('ROLE_ID');
		    		else
		    		roleIds = roleIds + ',' + roleRow[i].get('ROLE_ID');
		    	}
		    	Ext.Ajax.request({
   	              url : './sysman/roleManageAction!savePAccessRole.action',
   	              params : {
   	                roleId : roleIds,
   	                staffNo : operatorRow[0].get('STAFF_NO')
                  },
                  success : function(response) {
				  var result = Ext.decode(response.responseText);
				  if(result.savePAccessRoleStatus=="success"){
					 Ext.Msg.alert('操作反馈', '保存成功');
				  }
				  else
				  Ext.Msg.alert('操作反馈', result.savePAccessRoleStatus);
                 }
              });
		    }
	      
    }
	});
	
	var operatorQueryButton =  Ext.create('Ext.Button',{ 
	      text : '查询',
	      handler : function(){
	         operatorStore.load({
	        	 params : {
	        	   staffNo : operatorNoField.getValue(),
	        	   staffName : operatorNameField.getValue()
	             }
	         });
          }
	});
	
	var operatorQueryAllButton =  Ext.create('Ext.Button',{ 
	      text : '显示全部',
	      handler : function(){
		     operatorStore.load({
	        	 params : {
	        	   staffNo : '',
	        	   staffName : '',
	        	   orgNo : ''
	             }
	         });
	      }
	});
	
	var operatorNoField = Ext.create('Ext.form.field.Text',{
		 labelAlign : 'right',
		 fieldLabel : '用户编号',
 	     name : 'operatorNo',
	     id : 'operatorNo',
	     xtype: 'textfield',
	     width : 160
	});
	
	var operatorNameField = Ext.create('Ext.form.field.Text',{
		 labelAlign : 'right',
		 fieldLabel : '用户名称',
	     name : 'operatorName',
	     id : 'operatorName',
	     xtype: 'textfield',
	     width : 160
	});
	
//	Ext.define('oOrgModel',{
//		extend : 'Ext.data.Model',
//		fields : [{
//					type : 'string',
//					name : 'ORG_NO'
//				}, {
//					type : 'string',
//					name : 'ORG_NAME'
//				}]
//	});
//	
//	var oOrgStore = Ext.create('Ext.data.Store',{
//		model : 'oOrgModel',
//		proxy : {
//		    type : 'ajax',
//		    url : './sysman/roleManageAction!queryOOrg.action',
//		    reader : {
//		       root : 'oOrgList'
//	        }
//	    }
//	});
//	var oOrgComboBox = Ext.create('Ext.form.field.ComboBox', {
//		id : 'oOrgComboBox',
//		name : 'oOrgComboBox',
//		columnWidth : .33,
//	    fieldLabel: '供电单位',
//	    padding : '5px ',
//	    labelAlign : 'right',
//	    store: oOrgStore,
//	    valueField: 'ORG_NO',
//	    displayField: 'ORG_NAME',
//		editable : false
//	});
	
	var operatorControlPanel = Ext.create('Ext.panel.Panel',{
		region : 'south',
		height : 100,
		layout : 'column',
		items : [{
			padding : '5px ',
	   		columnWidth : .5,
	   		border : false,
			items : [operatorNoField]
	        },{
	   		padding : '5px ',
	   		columnWidth : .5,
	   		border : false,
			items : [operatorNameField]
	        },{
			columnWidth : .4,
			padding : '10px 100px ',
			border : false,
			items : [operatorQueryButton]
		},{
			columnWidth : .3,
			padding : '10px 10px ',
			border : false,
			items : []
		},{
			columnWidth : .3,
			padding : '10px 10px ',
			border : false,
			items : [operatorQueryAllButton]
		}]
	});
	
	var operatorManagePanel = Ext.create('Ext.panel.Panel',{
		region : 'center',
		title : '指派人管理',
		layout : 'border',
		border : false,
		items : [operatorGridPanel,operatorControlPanel]
	});
	
	var roleManageMainPanel = Ext.create('Ext.panel.Panel',{
		layout : 'border',
		items : [roleManagePanel,operatorManagePanel]
	}); 
	
	renderModel(roleManageMainPanel,'角色管理');
});