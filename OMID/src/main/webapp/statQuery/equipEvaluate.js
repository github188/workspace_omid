var DEFAULT_PAGE_SIZE = 1;
Ext.onReady(function() {
	// 装置应用评价
	Ext.define('equipModel', {
				extend : 'Ext.data.Model',
				fields : ['ORG_NAME', 'NAME', 'EQUIP_COUNT', 'BUG_COUNT',
						'EXC_COUNT', 'DISTORT_COUNT', 'SUCC_COUNT', 'BUG_RATE',
						'DISTORT_RATE', 'SUCC_RATE']
			});
	
//	var form_array=[];
//	for(var i=0;i<3;i++){
		var formPanel = Ext.create('Ext.form.Panel', {
		id : 'queryForm',
		height : 110,
		region : 'north',
		border : true,
		layout : 'auto',
		items : [{
			xtype : 'fieldset',
			layout : 'auto',
			width : 1100,
			height : 90,
			margin : '8 0 0 30',
			title:'查询条件',
			items : [{
				xtype : 'container',
				layout : 'column',
				defaults : {
					columnWidth : 0.3,
					labelAlign : "right",
					margin : '6 0 0 0'
				},
				items : [{
							xtype:'combo',
							fieldLabel : '供电单位',
							name : 'org_no',
							store : statQuery.orgStore,
							displayField : 'ORG_NAME',
							valueField : 'ORG_NO',
							multiSelect : false,
							queryMode : 'local',
							// flex : 1,
							editable : false,
							anchor : '100%',
							listeners : {
								afterRender : function(combo) {
									if(statQuery.orgStore.first().data!=null&&typeof(statQuery.orgStore.first().data)!='undefined'){
										combo
												.setValue(statQuery.orgStore.first().data.ORG_NO);
									}
								}
							}
						},
						{
							fieldLabel : '统计类型',
							xtype : 'radiogroup',
							margin : '6 0 0 60',
							vertical: true,
							column:3,
							//cls: 'x-check-group-alt',
							flex:1,
							items : [{
										boxLabel : '终端',
										name : 'equip_type',
										inputValue : '01',
										checked:true
									}, {
										boxLabel : '电表',
										name : 'equip_type',
										inputValue : '02'
										
									}, {
										boxLabel : '载波',
										name : 'equip_type',
										inputValue : '03'
										
							}]
						},{
							fieldLabel : '统计条件',
							xtype : 'radiogroup',
							vertical: true,
							column:3,
							items : [{
										boxLabel : '生产厂家',
										name : 'group_condition',
										inputValue : 'FACTORY_CODE',
										checked:true
										
									}, {
										boxLabel : '规约',
										name : 'group_condition',
										inputValue : 'PROTOCOL_CODE'
									}, {
										boxLabel : '型号',
										name : 'group_condition',
										inputValue : 'TYPE_CODE'
									}]

						}]
			}, {
				xtype : 'container',
				layout : 'column',
				defaults : {
					labelAlign : "right",
					margin : '6 0 6 0'
				},
				items : [{
							columnWidth : 0.3,
							xtype : 'datefield',
							format : 'Y-m',
							name : 'date_month',
							fieldLabel : '统计月份',
							// flex : 1,
							anchor : '100%',
							labelAlign : 'right'
						}, {
							columnWidth : 0.4,
							border:false
						},{
							columnWidth : 0.3,
							xtype : 'button',
							text : "查  询",
							waitMsg : '查询中。。。',
							flex : 1,
							margin : '6 220 0 0',
							handler : function() {
								form = this.up('form').getForm().getValues();
								equipStore.getProxy().extraParams =form;
								equipStore.load();
								//change_backColor();
							}
						}]
			}]
		}]

	});
//	form_array.push(formPanel)
//	}
//	

	// 异常明细查询
	var equipStore = Ext.create('Ext.data.Store', {
		model : 'equipModel',
		pageSize: 50,
		remoteSort: true,
        buffered: true,
		proxy : {
			type : 'ajax',
			url : 'EquipEvaluateAction!queryEquipList.action',
			extraParams:Ext.getCmp('queryForm').getForm().getValues(),
			reader : {
				root : 'equipList',
				totalProperty: 'totalCount',
				type : 'json'
			}
		}
	});
	
//		var grid_array=[];
//	// 底部表格
//		for(var i=0;i<3;i++){
			var resultGrid = Ext.create('Ext.grid.Panel', {
				region : 'center',
				title : '查询结果',
				verticalScrollerType: 'paginggridscroller',
	            // do not reset the scrollbar when the view refreshs
	            invalidateScrollerOnRefresh: false,
				store : equipStore,
				columns : [
				        {
			                xtype: 'rownumberer',
			                flex: 0,
			                width: 30
			            },{
							header : "供电单位",
							sortable : true,
							resizable : true,
							dataIndex : "ORG_NAME",
							width:160
						}, {
							header : "统计单元",
							sortable : true,
							resizable : true,
							dataIndex : "NAME",
							width:200
						}, {
							header : "装置总数",
							sortable : true,
							resizable : true,
							flex: 1,
							dataIndex : "EQUIP_COUNT"
						}, {
							header : "故障数",
							sortable : true,
							resizable : true,
							flex: 1,
							dataIndex : "BUG_COUNT"
						}, {
							header : "异常数",
							sortable : true,
							resizable : true,
							flex: 1,
							dataIndex : "EXC_COUNT"
						}, {
							header : "误报数",
							sortable : true,
							resizable : true,
							flex: 1,
							dataIndex : "DISTORT_COUNT"
						}, {
							header : "采集成功数",
							sortable : true,
							resizable : true,
							flex: 1,
							dataIndex : "SUCC_COUNT"
						}, {
							header : "故障率",
							sortable : true,
							resizable : true,
							flex: 1,
							dataIndex : "BUG_RATE"
						}, {
							header : "误报率",
							sortable : true,
							resizable : true,
							flex: 1,
							dataIndex : "DISTORT_RATE"
						}, {
							header : "采集成功率",
							sortable : true,
							resizable : true,
							flex: 1,
							dataIndex : "SUCC_RATE",
							renderer:function(value){
								var succ_rate=value.substring(0,value.indexOf('%'))*1;
					   			if(succ_rate>=80){
						   			return "<font color='#D4101D';font-weight:bold>"+value+"</font>";
						   		}
						   		else if(succ_rate>=60 && succ_rate<80){
						   			return "<font color='#D46B1D';font-weight:bold>"+value+"</font>";
						   		}
						   		else {
						   			return "<font color='#FF0000';font-weight:bold>"+value+"</font>";
						   		}
			   				}
						}]
//						,
//						viewConfig: {
//	                        forceFit: true,
//	                        stripeRows:false, //各行变色
//	                        getRowClass: function(record, rowIndex, rowParams, store) { //如果此行满足某条件，则加上背景色
//	                        	if(record!=null&&record.get('SUCC_RATE')!=null){
//		                        	var tmp_str=String(record.get('SUCC_RATE'));
//	  								var succ_rate=tmp_str.substring(0,tmp_str.indexOf('%'))*1;
//		                            if (succ_rate>=60) {
//		                                return "x-grid-record-red";
//		                            } else {
//		                                return "";
//		                            }
//	                        	}
//	                        }
//						}
			});
//			grid_array.push(resultGrid);
//		}
//	var change_backColor=function() {
//		resultGrid.getStore().on('load',function(s,records){
//		var gird_count=0;
//  		s.each(function(r){
//  			var tmp_str=String(r.get('SUCC_RATE'));
//  			var succ_rate=tmp_str.substring(0,tmp_str.indexOf('%'));
//	        if(succ_rate>=60){
//	            resultGrid.getView().getRow(gird_count).style.backgroundColor='#FFFF00';
//	        }else {
//	        	resultGrid.getView().getRow(gird_count).style.backgroundColor='#FF0000';
//	        }
//    		gird_count=gird_count+1;
//        });
//	});
//}
	// 终端Tab
	var tmnlTabPanel = Ext.create('Ext.panel.Panel', {
				layout : "fit",
				hideBorders : true,
				title : '终端',
				items : {
					layout : "border",
					items : [formPanel, resultGrid]
				}
	});
//	// 载波Tab
//	var carrierTabPanel = Ext.create('Ext.panel.Panel', {
//				//renderTo : Ext.getBody(),
//				layout : "fit",
//				hideBorders : true,
//				title : '载波设备',
//				items : {
//					layout : "border",
//				// deferredRender : false,
//					items : [form_array[1], grid_array[1]]
//				}
//	});
//	// 电表Tab
//	var meterTabPanel = Ext.create('Ext.panel.Panel', {
//				//renderTo : Ext.getBody(),
//				layout : "fit",
//				hideBorders : true,
//				title : '电表',
//				items : {
//					layout : "border",
//				// deferredRender : false,
//					items : [form_array[2], grid_array[2]]
//				}
//	});
	
	var mainPanel = Ext.create('Ext.tab.Panel', {
				activeTab :0,
				layout : 'fit',
//				items : [tmnlTabPanel,meterTabPanel,carrierTabPanel]
				items : [tmnlTabPanel]
	});
	//equipStore.guaranteeRange(0, 50);
	renderModel(tmnlTabPanel, "装置应用评价");

});
