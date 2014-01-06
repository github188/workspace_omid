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
			x:20,
			xtype : 'radio',
			id:'year_now',
			fieldLabel : '统计年份',
			boxLabel : '今年',
			name : 'maxPowerRatioRadio',
			checked : true,
			inputValue : 1
		},	{
			x:35,
			xtype : 'radio',
			boxLabel : '去年',
			name : 'maxPowerRatioRadio',
			checked : false,
			inputValue : 2
		},
		{
			x:50,
			xtype : 'radio',
			id:"queryType",
			fieldLabel : '统计口径',
			boxLabel : '电量',
			name : 'maxPowerRatioRadio1',
			checked : true
		},	{
			x:70,
			xtype : 'radio',
			boxLabel : '电费',
			name : 'maxPowerRatioRadio1',
			checked : false
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
			x:140,
			xtype : 'button',
			text : '统计口径切换	',
			align : 'center',
			top :10,
			width : 80,
			handler : function() {
			}
	    }
		],
	}); 
	
	
	//中间图表
	var centerPanel = Ext.create('Ext.panel.Panel', {
				border : false,
				layout :'column',
				height:250,
				width:1200,
				items : [
				{
					columnWidth : 0.5,
					height:300,
					html : "<div id='SelfPieDiv' align='center' ></div>",
					border:false
				},
				{
					columnWidth : 0.5,
					height:300,
					html : "<div id='LowerPieDiv' align='center' ></div>",
					border:false
				}
				]
	});
	
	var downPanel = Ext.create('Ext.grid.Panel', {
		
		title:'大客户和全省电量 对比 ',
		store : detailStore,
		region : 'center',
		loadMask : true,
		border : true,
		columnLines : true,
		columns : [{
					header : "序号",
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
					header : "大客户售电量",
					sortable : true,
					resizable : true,
					dataIndex : "VIP_POWER",
					width:135
				}
				, {
					header : "全省售电量",
					sortable : true,
					resizable : true,
					dataIndex : "VIP_CHARGR",
					width:135
				}
				, {
					header : "大客户售电费",
					sortable : true,
					resizable : true,
					dataIndex : "ALL_POWER",
					width:135
				}
				, {
					header : "全省售电费",
					sortable : true,
					resizable : true,
					dataIndex : "ALL_CHARGR",
					width:140
				}, {
					header : "大客户售电量百分比",
					sortable : true,
					resizable : true,
					dataIndex : "MARKETING",
					width:200
					
				},{
					header : "大客户售电费用百分比",
					sortable : true,
					resizable : true,
					dataIndex : "PERCENTAGE",
				    width:200
				}]
});
	var toppanle   = Ext.createWidget('panel', {
		activeTab  :0,
		region : 'top',
		renderTo : 'gridtop',
		height :39,
		width : 1090,
		items:[formPanel],
	});
	var gridcenter   = Ext.createWidget('panel', {
		activeTab  :0,
		region : 'center',
		renderTo : 'gridcenter',
		height :200,
		width : 1090,
		items:[centerPanel],
	});
	
	var gridbottom = Ext.createWidget('panel', {
		activeTab  :0,
		region : 'center',
		renderTo : 'gridbottom',
		height :400,
		width : 1090,
		items:[downPanel],
	});
	//---------图形--------------------------
	// 电量统计
	var selfPieLoad = function() {
		var myChart4 = new  FusionCharts("./FusionCharts/Pie3D.swf",
				"myChartId4", "550", "250");
		Ext.Ajax.request({
			url : 'MeasureExcAction!querySelfPie.action',
			params : Ext.getCmp('queryForm').getForm().getValues(),
			success : function(response) {
				var result = Ext.decode(response.responseText);
				var tmpData = result.selfList;
				var pieXML ='<graph caption="本级单位各类异常数量" decimals="2"  enableRotation="0" bgRatio="0,100" bgAlpha="40,100" shownames="1" showvalues="1" color ="FFFFFF"  baseFont="宋体" baseFontSize="12" useRoundEdges="1" showSum="1" formatNumberScale="0" >';
				if(tmpData!=null&&tmpData.length>0){
					for (i = 0; i < tmpData.length; i++) {
						pieXML += "<set name='" + tmpData[i].NAME + "' value='"
								+ tmpData[i].VALUE + "'/>";
					}
				}
				pieXML += "</graph>";
				myChart4.setDataXML(pieXML);
				myChart4.render("SelfPieDiv");
			}
		})
	};
	
	// 电费统计
	var lowerPieLoad = function() {
		var myChart5 = new FusionCharts("./FusionCharts/MSColumn3D.swf",
				"myChartId5", "550", "250");
		Ext.Ajax.request({
			url : 'MeasureExcAction!querLowerPie.action',
			params : Ext.getCmp('myChart5').getForm().getValues(),
			success : function(response) {
				var result = Ext.decode(response.responseText);
				var tmpData = result.lowerList;
				var pieXML ='<graph caption="下级单位异常总数" decimals="2"  enableRotation="0" bgRatio="0,100" bgAlpha="40,100" shownames="1" showvalues="1" color ="FFFFFF"  baseFont="宋体" baseFontSize="12" useRoundEdges="1" showSum="1" formatNumberScale="0" >';
				if(tmpData!=null&&tmpData.length>0){
					for (i = 0; i < tmpData.length; i++) {
						pieXML += "<set name='" + tmpData[i].NAME + "' value='"
								+ tmpData[i].VALUE + "'/>";
					}
				}
				pieXML += "</graph>";
				//alert(pieXML);
				myChart5.setDataXML(pieXML);
				myChart5.render("LowerPieDiv");
			}
		})
	};
	selfPieLoad();
	lowerPieLoad();
	
});