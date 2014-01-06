
Ext.onReady(function() {
	// 左边chart
	Ext.define('countModel', {
				extend : 'Ext.data.Model',
				fields : ['NAME', 'VALUE','ORG_NO']
	});
	// //单位异常Model
	var eventStore = Ext.create('Ext.data.Store', {
		model : 'countModel',
		proxy : {
			type : 'ajax',
			url : 'MeasureExcAction!queryEventCount.action',
			reader : {
				root : 'orgEventList',
				type : 'json'
			}
		}
//		,
//		autoLoad : true
			/*
			 * , listeners : { 'load' : function(store, records, options) {
			 * Ext.getCmp('lb_total').setText( "<a href=''>" +
			 * store.first().data.TOTAL_EVENT + '</a>', false);
			 * Ext.getCmp('lb_serious').setText( "<a href=''>" +
			 * store.first().data.SERIOUS_EVENT + '</a>', false);
			 * Ext.getCmp('lb_important').setText( "<a href=''>" +
			 * store.first().data.IMPORTANT_EVENT + '</a>', false);
			 * Ext.getCmp('lb_common').setText( "<a href=''>" +
			 * store.first().data.COMMON_EVENT + '</a>', false); } }
			 */

	});
	var piePanel = Ext.create('Ext.panel.Panel', {
		region : 'center',
		layout : 'fit',
		border : false,
		id : 'typePiePanel',
		height:280,
		anchor:'100%',
		items : [{
					border : false,
					xtype : 'panel',
					// renderTo : Ext.getBody(),
					html : "<div id='statQuery_typePieDiv' align='center' valign='middle'></div>"
				}]

	});

	var barPanel = Ext.create('Ext.panel.Panel', {
				region : 'south',
				layout : 'column',
				anchor:'100%',
				height : 250,
				border : false,
				items : [

				{
							columnWidth : 0.5,
							height : 250,
							xtype : 'panel',
							border : false,
							anchor:'100%',
							html : "<div id='statQuery_barDiv' align='center' ></div>"
						}, {
							columnWidth : 0.5,
							height : 250,
							xtype : 'panel',
							border : false,
							anchor:'100%',
							html : "<div id='statQuery_StatePieDiv' align='center' width='500'></div>"
						}]

			});
	// 供电单位列表
	var orgGrid = Ext.create('Ext.grid.Panel', {
				region : 'center',
				title : "各单位异常信息",
				//height : 300,
				store : eventStore,
				autoScroll:true,
				columns : [{
							header : "供电单位",
							sortable : true,
							dataIndex : "NAME",
							width : 105
						}, {
							header : "异常数",
							sortable : true,
							dataIndex : "VALUE",
							width : 90
						}],
				listeners : {
						itemclick:function(view,record,item,index,e){
							Ext.getCmp('statQuery_excStatistics_org_no').setValue(record.get('ORG_NO'));
//							var query_obj=Ext.getCmp('statQuery_StatisticsqueryForm').getForm().getValues();
//							eventStore.load({
//								params : query_obj
//							});
							typePieLoad();
							barLoad();
							StatePieLoad();
						}
				}

			});
	
	var rightArea = Ext.create('Ext.panel.Panel', {
				region : 'east',
				width : 220,
				border : true,
				layout : 'border',
				items : [orgGrid, {
					region : 'south',
					xtype : 'form',
					height:280,
					title : "查询条件",
					border : false,
					id : 'statQuery_StatisticsqueryForm',
					defaults : {
						margin : '8 5 8 10',
						anchor:'90%'
					},
					items : [{
								xtype : 'label',
								text : '供电单位'
							}, {
								xtype : 'combo',
								name : 'org_no',
								id:'statQuery_excStatistics_org_no',
								store : statQuery.orgStore,
								displayField : 'ORG_NAME',
								valueField : 'ORG_NO',
								multiSelect : false,
								queryMode : 'local',
								autoSelect:true,
								editable:false,
								listeners : {
							      afterRender : function(combo) {
							      	 if(typeof(statQuery.orgStore.first().data)!='undefined'){
							      	 	combo.setValue(statQuery.orgStore.first().data.ORG_NO);
							      	 }
							        typePieLoad();
									barLoad();
									StatePieLoad();
									eventStore.load({
										params : Ext.getCmp('statQuery_StatisticsqueryForm').getForm().getValues()
									});
							      }
				   				}
							},
							/*{
								xtype : 'label',
								text : '异常来源'
							}, {
								xtype : 'combo',
								store : statQuery.sourceStore,
								displayField : 'NAME',
								valueField : 'VALUE',
								multiSelect : false,
								queryMode : 'local',
								editable:false,
								flex:1,
								name : 'event_source',
								listeners : {
							      afterRender : function(combo) {
							         combo.setValue(statQuery.sourceStore.first().data.VALUE);
							      }
							   }
							}, */
								{
								xtype : 'label',
								text : '异常状态'
							}, {
								xtype : 'combo',
								store : statQuery.flowStatusStore,
								displayField : 'NAME',
								valueField : 'VALUE',
								multiSelect : false,
								queryMode : 'local',
								editable:false,
								flex:1,
								name : 'flow_status_code',
								listeners : {
							      afterRender : function(combo) {
							         combo.setValue(statQuery.flowStatusStore.first().data.VALUE);
							      }
							   }
							}, {
								xtype : 'label',
								text : '开始日期'
							}, {
								xtype : 'datefield',
								format : 'Y-m-d',
								name : 'start_date',
								value:statQuery.start_date
							}, {
								xtype : 'label',
								text : '结束日期'
							}, {
								xtype : 'datefield',
								format : 'Y-m-d',
								name : 'end_date',
								value:statQuery.end_date

							},

							{
								xtype : 'button',
								text : "查  询",
								width : 80,
								waitMsg : '查询中...',
								margin : '5 20 10 100',
								handler : function() {
									form = this.up('form').getForm()
											.getValues();
									eventStore.load({
										params : form
									});
									typePieLoad();
									barLoad();
									StatePieLoad();
								}

							}]

				}]
			});

	// 第一个饼
	var typePieLoad = function() {
		var myChart1 = new FusionCharts("./FusionCharts/Pie3D.swf",
				"myChartId1", "1000", "300");
		var param=Ext.getCmp('statQuery_StatisticsqueryForm').getForm().getValues();
		Ext.Ajax.request({
			url : 'MeasureExcAction!queryTypePie.action',
			params : param,
//			params : {
//				org_no : '1540403',
//				start_date : '2012-10-1',
//				end_date : '2012-10-30'
//			},
			success : function(response) {
				var result = Ext.decode(response.responseText);
				var tmpData = result.pieList;
				var pieMap = '<graph caption="异常分类统计" decimals="2"  enableRotation="0" bgRatio="0,100" bgAlpha="40,100" shownames="1" showvalues="1" color ="FFFFFF"  baseFont="宋体" baseFontSize="12" useRoundEdges="1" showSum="1" formatNumberScale="0"  >';
				for (i = 0; i < tmpData.length; i++) {
					pieMap += "<set name='" + tmpData[i].NAME + "' value='"
							+ tmpData[i].VALUE + "'/>";
				}
				pieMap += "</graph>";
				// alert(pieMap);
				myChart1.setDataXML(pieMap);
				myChart1.render("statQuery_typePieDiv");
			}
		})
	};
	
	// 第二图
	var barLoad = function() {
		var myChart2 = new FusionCharts("./FusionCharts/StackedBar3D.swf",
				"myChartId2", "460", "250");
		Ext.Ajax.request({
			url : 'MeasureExcAction!queryEventBar.action',
			 params : Ext.getCmp('statQuery_StatisticsqueryForm').getForm().getValues(),
//			params : {
//				org_no : '1540403',
//				start_date : '2012-10-1',
//				end_date : '2012-10-30'
//			},
			success : function(response) {
				var result = Ext.decode(response.responseText);
				var tmpList = result.barList;
				var levelList = new Array();
				var typeList = new Array();
				if (tmpList!=null&&tmpList.length > 0) {
					for (var i = 0; i < tmpList.length; i++) {
						//if (levelList.indexOf(tmpList[i].EVENT_LEVEL_NAME) == -1) {
						if(!Ext.Array.contains(levelList,tmpList[i].EVENT_LEVEL_NAME)){
							levelList.push(tmpList[i].EVENT_LEVEL_NAME);
						}
						//if (typeList.indexOf(tmpList[i].NAME) == -1) {
						if(!Ext.Array.contains(typeList,tmpList[i].NAME)){
							typeList.push(tmpList[i].NAME);
						}
					}
				}
				var barXML = "<graph palette='1' caption='异常等级统计' shownames='1'  showvalues='1'  showSum='1'  overlapBars='0' showShadow='1' color ='FFFFFF'  baseFont='宋体' baseFontSize='12' formatNumberScale='0'>";
				barXML += "<categories>";
				if (levelList.length >= 0) {
					for (i = 0; i < levelList.length; i++) {
						barXML += "<category label='" + levelList[i] + "'/>";
					}
				}
				barXML += "</categories>";

				if (levelList.length > 0) {
					for (i = 0; i < typeList.length; i++) {
						barXML += "<dataset seriesName='" + typeList[i]
								+ "' showValues='0'>";
						if (levelList.length >= 0) {
							for (j = 0; j < levelList.length; j++) {
								for (k = 0; k < tmpList.length; k++) {
									if (levelList[j] == tmpList[k].EVENT_LEVEL_NAME
											&& typeList[i] == tmpList[k].NAME) {
										barXML += "<set value='"
												+ tmpList[k].VALUE + "'/>";
									}
								}
							}
						}
						barXML += "</dataset>";
					}
				}
				barXML += "</graph>";
				//alert(barXML);
				myChart2.setDataXML(barXML);
				myChart2.render("statQuery_barDiv");
			}
		})
	};
//	barLoad();
	// 最后一个饼
	var StatePieLoad = function() {
		var myChart3 = new FusionCharts("./FusionCharts/Pie3D.swf",
				"myChartId3", "460", "250");
		Ext.Ajax.request({
			url : 'MeasureExcAction!queryEventStatePie.action',
			 params : Ext.getCmp('statQuery_StatisticsqueryForm').getForm().getValues(),
//			params : {
//				org_no : '1540403',
//				start_date : '2012-10-1',
//				end_date : '2012-10-30'
//			},
			success : function(response) {
				var result = Ext.decode(response.responseText);
				var tmpData = result.statePieList;
				var pieXML ='<graph caption="异常处理统计" decimals="2"  enableRotation="0" bgRatio="0,100" bgAlpha="40,100" shownames="1" showvalues="1" color ="FFFFFF"  baseFont="宋体" baseFontSize="12" useRoundEdges="1" showSum="1" formatNumberScale="0" >';
				for (i = 0; i < tmpData.length; i++) {
					pieXML += "<set name='" + tmpData[i].NAME + "' value='"
							+ tmpData[i].VALUE + "'/>";
				}
				pieXML += "</graph>";
				// alert(pieXML);
				myChart3.setDataXML(pieXML);
				myChart3.render("statQuery_StatePieDiv");
			}
		})
	};
	var leftArea = Ext.create('Ext.panel.Panel', {
				region : 'center',
				border : false,
				layout : 'border',
				items : [piePanel, barPanel]
	});
	var  tabPanel1 = Ext.create('Ext.panel.Panel', {
				layout : "fit",
				hideBorders : true,
				title:'异常综合统计',
				items : {
					layout : "border",
					deferredRender : false,
					items : [leftArea, rightArea]
					//
				}
	});
	
	//以上为 第一个tal页
/* ------------------------------分割线----------------------------- */
	//以下为第二个tal页
	
	// 异常明细
	Ext.define('detailModel', {
				extend : 'Ext.data.Model',
				fields : ['EVENT_NAME', 'LEVEL_NAME','ALARM_CODE','EVENT_LEVEL'
				,'A_CNT','B_CNT','C_CNT','D_CNT','E_CNT','F_CNT','ALARM_CNT','ALARM_APP_CNT']
	});
	// 异常明细查询
	var detailStore = Ext.create('Ext.data.Store', {
		model : 'detailModel',
		proxy : {
			type : 'ajax',
			url : 'MeasureExcAction!queryEventDetail.action',
			reader : {
				root : 'detailList',
				type : 'json'
			}
		}
//		,autoLoad : true
	});
	
	//中间图表
	var centerPanel = Ext.create('Ext.panel.Panel', {
				//region : 'center',
				border : false,
				layout :'column',
				height:250,
				width:1200,
				items : [
				{
					columnWidth : 0.5,
					height:300,
					html : "<div id='statQuery_SelfPieDiv' align='center' ></div>",
					border:false
				},
				{
					columnWidth : 0.5,
					height:300,
					html : "<div id='statQuery_LowerPieDiv' align='center' ></div>",
					border:false
				}
				]
	});
	//底部表格
	var downPanel = Ext.create('Ext.grid.Panel', {
				region : 'center',
				border : false,
				title:'异常明细',
				store : detailStore,
				columns : [ /*{
							header : "用户类别",
							sortable : true,
							dataIndex : "CONS_SORT",
							//width:200,
							flex:1
						},*/{
							header : "异常名称",
							sortable : true,
							dataIndex : "EVENT_NAME",
							width:200,
							flex:1
						}, {
							header : "等级",
							sortable : true,
							dataIndex : "LEVEL_NAME",
							renderer: function(v) {
								if(v == "严重") return "<font color='#D4101D'>" + v + "</font>";
								else if(v == "重要") return "<font color='#D46B1D'>" + v + "</font>";
								else if(v == "较重要") return "<font color='#C7CF18'>" + v + "</font>";
								else if(v == "一般") return "<font color='#1D3DDA'>" + v + "</font>";
				
							},
							flex:1
						}
						, {
							header : "异常总数",
							sortable : true,
							dataIndex : "ALARM_CNT",
							flex:1
						}
						, {
							header : "异常工单数",
							sortable : true,
							dataIndex : "ALARM_APP_CNT",
							flex:1
						}
						, {
							header : "大型专变用户（ A类）",
							sortable : true,
							dataIndex : "A_CNT",
							flex:1
						}, {
							header : "中小型专变用户（ B类）",
							sortable : true,
							dataIndex : "B_CNT",
							flex:1
						}, {
							header : "三相一般工商业用户（ C类）",
							sortable : true,
							dataIndex : "C_CNT",
							flex:1
						}, {
							header : "单相一般工商业用户（ D类）",
							sortable : true,
							dataIndex : "D_CNT",
							flex:1
						}, {
							header : "居民用户（ E类）",
							sortable : true,
							dataIndex : "E_CNT",
							flex:1
						}, {
							header : "公用配变考核计量点（ F类）",
							sortable : true,
							dataIndex : "F_CNT",
							flex:1
						}]
	});
	 var formPanel= Ext.create('Ext.form.Panel', {
	 		id:'excStatistics_tab2Form',
            region: 'north',
            height : 80,
            border : false,
            layout:'auto', 
            frame: true,
            items: [{
            	    xtype:'container',
	                layout:'column',
	                defaultType: 'combo',
					defaults:{
						columnWidth : 0.3,
						anchor : '95%',
						labelAlign : "right"
					},
            	items:[
            	{
            		fieldLabel:'供电单位',
					name : 'org_no',
					store : statQuery.orgStore,
					displayField : 'ORG_NAME',
					valueField : 'ORG_NO',
					multiSelect : false,
					queryMode : 'local',
					editable:false,
        	        listeners : {
				      afterRender : function(combo) {
				      	if(typeof(statQuery.orgStore.first().data)!='undefined'){
				         combo.setValue(statQuery.orgStore.first().data.ORG_NO);
				      	}
				      }
				   }
            	},{
        			fieldLabel:'异常类型',
					name : 'alarm_type',
					store : statQuery.typeStore,
					displayField : 'NAME',
					valueField : 'VALUE',
					multiSelect : false,
					queryMode : 'local',
					editable:false,
        	        listeners : {
				      afterRender : function(combo) {
				         combo.setValue(statQuery.typeStore.first().data.VALUE);
				      }
				   }
            	},{
        			fieldLabel:'异常等级',
					name : 'alarm_level',
					store : statQuery.levelStore,
					displayField : 'NAME',
					valueField : 'VALUE',
					multiSelect : false,
					queryMode : 'local',
					editable:false,
        	        listeners : {
				      afterRender : function(combo) {
				         combo.setValue(statQuery.levelStore.first().data.VALUE);
				      }
				   }
            	}]
            	},
            	{
            		xtype:'container',
	                layout:'column',
	                defaults:{
	                	columnWidth : 0.3,
						anchor : '95%',
						labelAlign : "right"
						
					},
	            	items:[{
	            		
						xtype : 'datefield',
						format : 'Y-m-d',
//						name : 'start_date',
//						fieldLabel:'开始日期',
//						value:statQuery.start_date
						
						name : 'start_date',
						fieldLabel:'发生日期',
						value:statQuery.yesterday_date
					},{
						/*xtype : 'datefield',
						format : 'Y-m-d',
						name : 'end_date',
						fieldLabel:'到',
						value:statQuery.end_date*/
						
						xtype : 'container'
					},{
						columnWidth : 0.3,
						xtype : 'button',
						text : "查  询",
						//width : 80,
						waitMsg : '查询中...',
						margin : '0 0 0 250',
						handler : function() {
							form = this.up('form').getForm()
									.getValues();
							detailStore.load({
								params : form
							}
							);
							selfPieLoad();
							lowerPieLoad();
						}
					}]
             }]
        });
	//顶部表单
   var upPanel = Ext.create('Ext.panel.Panel', {
				region : 'north',
				border : false,
				items : [formPanel,centerPanel]
	});
	var  tabPanel2 = Ext.create('Ext.panel.Panel', {
				layout : "fit",
				hideBorders : true,
				title:'异常分类统计',
				items : {
					layout : "border",
					deferredRender : false,
					items : [upPanel, downPanel]
					//
				}
	});
	
	// 本单位饼图
	var selfPieLoad = function() {
		var myChart4 = new FusionCharts("./FusionCharts/Pie3D.swf",
				"myChartId4", "500", "250");
		Ext.Ajax.request({
			url : 'MeasureExcAction!querySelfPie.action',
			params : Ext.getCmp('excStatistics_tab2Form').getForm().getValues(),
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
				//alert(pieXML);
				myChart4.setDataXML(pieXML);
				myChart4.render("statQuery_SelfPieDiv");
			}
		})
	};
	
	// 下级单位饼图
	var lowerPieLoad = function() {
		var myChart5 = new FusionCharts("./FusionCharts/Pie3D.swf",
				"myChartId5", "500", "250");
		Ext.Ajax.request({
			url : 'MeasureExcAction!querLowerPie.action',
			params : Ext.getCmp('excStatistics_tab2Form').getForm().getValues(),
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
				myChart5.render("statQuery_LowerPieDiv");
			}
		})
	};
	
//	eventStore.load({
//		params : Ext.getCmp('queryForm').getForm().getValues()
//	});
//	selfPieLoad();
//	lowerPieLoad();
	var mainPanel  = Ext.createWidget('tabpanel', {
		//activeTab  :0,
		layout:'fit',
		items:[tabPanel1,tabPanel2]
	});
	renderModel(mainPanel, "异常综合统计");
		
		
});
