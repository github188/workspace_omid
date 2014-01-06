Ext.onReady(function(){
	
	//大客户电量
	Ext.define('detailModel', {
				extend : 'Ext.data.Model',
				fields : ['ORG_NO', 'ORG_NAME','VIP_POWER','VIP_CHARGR','ALL_POWER','ALL_CHARGE','PERCENTAGE']
	});
	
	// 大客户电量查询
	var detailStore = Ext.create('Ext.data.Store', {
		model : 'detailModel',
		proxy : {
			type : 'ajax',
			url : 'HomePageAction!getVipCustomer.action',
			reader : {
				root : 'detailList',
				type : 'json'
			}
		}
	});
	
	
	/*************供电管理单位模型************/
	Ext.define('vcmOrgNoModel', {  
		extend : 'Ext.data.Model',
		fields:["ORG_NO", "ORG_NAME"]
	});
	
	var eleManaOrgStore = Ext.create('Ext.data.Store', {
		model : 'vcmOrgNoModel',
		proxy : {
			type : 'ajax',
			url : 'HomePageAction!queryTgOrgNo.action',
			reader : {
				root : 'vcmTgOrgNoList',
				type : 'json'
			 }
			}
	});
	
	eleManaOrgStore.load({
				params : {
					vcmOrgNo : '34101'
				}
	});

	

	var formPanel = Ext.create('Ext.form.Panel', {
		id : 'queryForm',
		region : 'north',
		border : false,
		layout : 'column',
		frame: true,     
		items: [{
			id:'manager',
			xtype:'combo',
			fieldLabel : '供电管理单位',
			multiSelect : false,
			queryMode : 'local',
			store : eleManaOrgStore,
			displayField : 'ORG_NAME',
			valueField : 'ORG_NO',
			value :'34101',
			emptyText : '--请输入--',
			blankText : '--请输入--',
			editable : false,
			anchor : '100%',
		},
		{
			id:'manager1',
			xtype:'combo',
			fieldLabel : '分析来源',
			multiSelect : false,
			queryMode : 'local',
			store : eleManaOrgStore,
			displayField : 'ORG_NAME',
			valueField : 'ORG_NO',
			value :'主站分析',
			emptyText : '--请输入--',
			blankText : '--请输入--',
			editable : false,
			anchor : '100%',
		},	
		{
			id:'manager2',
			xtype:'combo',
			fieldLabel : '分析等级',
			multiSelect : false,
			queryMode : 'local',
			store : eleManaOrgStore,
			displayField : 'ORG_NAME',
			valueField : 'ORG_NO',
			value :'高危客户',
			emptyText : '--请输入--',
			blankText : '--请输入--',
			editable : false,
			anchor : '100%',
		},
	    {
			x:100,
			xtype : 'button',
			text : '查询',
			align : 'center',
			top :10,
			width : 80,
			handler : function() {
			  var name = Ext.getCmp("manager").getValue();
			  var year = "";
			  if(Ext.getCmp("year_now").getValue() == true){
				  year = "今年";
			  }else{
				  year = "去年";
			  }
			  var queryType = "";
			  if(Ext.getCmp("queryType").getValue() == true){
				  queryType = "电量";
			  }else{
				  queryType = "电费";
			  }
			  
	   		   Ext.Ajax.request({
		     	   url : 'HomePageAction!getVipCustomer.action',
		     	   params : {
	   			   		powerSuportName : name,
	   			   		queryDate : year,
	   			   	    queryType :queryType
		            },
		        success : function(response) {
		            	detailStore.load();
		        }
		       });
			}
	    },
	    {
			x:120,
			xtype : 'button',
			text : '确认客户类型',
			align : 'center',
			top :10,
			width : 80,
			handler : function() {

			}
	    }
		]
	}); 
	
	
	
	var downPanel = Ext.create('Ext.grid.Panel', {
		
		title:'潜在用户分析结果 ',
		store : detailStore,
		region : 'center',
		loadMask : true,
		border : true,
		columnLines : true,
		columns : [{
					header : "大客户名称",
					sortable : true,
					resizable : true,
					dataIndex : "ORG_NO",
					//dataIndex : "NMBER",
					width:70
					
				}, {
					header : "供电单位",
					sortable : true,
					resizable : true,
					dataIndex:"ORG_NAME",
					//dataIndex : "MONTH",
					width:70
				}, {
					header : "分析类型",
					sortable : true,
					resizable : true,
					dataIndex : "VIP_POWER",
					width:135
				}
				, {
					header : "分析等级",
					sortable : true,
					resizable : true,
					dataIndex : "VIP_CHARGR",
					width:135
				}
				, {
					header : "分析来源",
					sortable : true,
					resizable : true,
					dataIndex : "ALL_POWER",
					width:135
				}
				, {
					header : "经济类型",
					sortable : true,
					resizable : true,
					dataIndex : "ALL_POWER",
					width:135
				}
				, {
					header : "产业分类",
					sortable : true,
					resizable : true,
					dataIndex : "ALL_POWER",
					width:135
				}
				]
});
	
	var mainPanel = Ext.create('Ext.panel.Panel',{
		layout : 'border',
		border :true,
		autoScroll : true,
		items:[formPanel,downPanel]
	});
	
	renderModel(mainPanel,'待办事项');
});