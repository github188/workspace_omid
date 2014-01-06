// Ext.require(['Ext.form.*', 'Ext.grid.*', 'Ext.toolbar.Paging',
// 'Ext.data.*']);

Ext.onReady(function() {
	
	// 异常个数
	Ext.define('countModel', {
				extend : 'Ext.data.Model',
				fields : ['SERIOUS_EVENT', 'IMPORTANT_EVENT','COMMON_EVENT','RATHER_EVENT','TOTAL_EVENT']
	});
	
	function close_typePieLoad(param){
		return function(){
			typePieLoad(param);
		}
	}
		// 异常明细
	Ext.define('detailModel', {
				extend : 'Ext.data.Model',
				fields : ['EVENT_NAME', 'LEVEL_NAME','TIMEOUT_EVENT','DISTORT_EVENT','FILE_EVENT','TOTAL_EVENT','NEW_EVENT','NATIVE_EVENT','MARKETING_EVENT']
	});
	// 异常明细查询
	var detailStore = Ext.create('Ext.data.Store', {
		model : 'detailModel',
		proxy : {
			type : 'ajax',
			url : 'DisposeExcAction!queryEventDetail.action',
			reader : {
				root : 'detailList',
				type : 'json'
			}
		}
//		,autoLoad : true
	});
	var piePanel = Ext.create('Ext.panel.Panel', {
		region : 'center',
		layout : 'auto',
		border : false,
		items : [{
					border : false,
					xtype : 'panel',
					// renderTo : Ext.getBody(),
					height : 300,
					html : "<div id='statQuery_disposePieDiv' align='center' width='1000'></div>"
				}]

	});
 //单位异常Model
	var eventStore = Ext.create('Ext.data.Store', {
		model : 'countModel',
		//params : Ext.getCmp('statQuery_disPosequeryForm').getForm().getValues(),
		proxy : {
			type : 'ajax',
			url : 'DisposeExcAction!queryEventCount.action',
			reader : {
				root : 'event_count',
				type : 'json'
			}
		},
	//	autoLoad : true,
		 listeners : { 'load' : function(store, records, options) {
		 	
		 	 // var alarmAnalyse_url='<a href="#" onclick=openTab({title:"异常综合查询",url:"./statQuery/AlarmAnalyse.jsp?flow_flag=2';
		 	  var alarmAnalyse_url='<a href="#"> ';
			  Ext.getCmp('lbl_total').setText( alarmAnalyse_url +
			  store.first().data.TOTAL_EVENT + '</a>', false);
			 
			  
			  Ext.getCmp('lbl_serious').setText( alarmAnalyse_url+
			  store.first().data.SERIOUS_EVENT + '</a>', false);
			  Ext.getCmp('lbl_important').setText( alarmAnalyse_url +
			  store.first().data.IMPORTANT_EVENT + '</a>', false);
			  Ext.getCmp('lbl_common').setText( alarmAnalyse_url +
			  store.first().data.COMMON_EVENT + '</a>', false); 
			  Ext.getCmp('lbl_rather').setText( alarmAnalyse_url +
			  store.first().data.RATHER_EVENT + '</a>', false);
			  Ext.get('lbl_total').on('click',close_typePieLoad(''));
			  Ext.get('lbl_serious').on('click',close_typePieLoad('01'));
			  Ext.get('lbl_important').on('click',close_typePieLoad('02'));
			  Ext.get('lbl_common').on('click',close_typePieLoad('04'));
			  Ext.get('lbl_rather').on('click',close_typePieLoad('03'));
		 }
		 }
			 

	});
   var startX=10;
   var endX=120;
   var startY=10;
   var stepY=30;
	// 异常分类
	var typePanel = Ext.create('Ext.panel.Panel', {
				region : 'center',
				title : "统计信息",
				layout:'absolute',
				items : [{
							xtype : 'label',
							text : '待办总数:',
							x:startX,
							y:startY
						}, {
							xtype : 'label',
							//html : "<a></a>",
							id : 'lbl_total',
							x:endX,
							y:startY
							},{
								xtype : 'label',
								text : '严重待办数:',
								x:startX,
								y:startY+stepY
							}, {
								xtype : 'label',
								id : 'lbl_serious',
								//html : "<a href=''></a>",
								x:endX,
								y:startY+stepY
							},{
								xtype : 'label',
								text : '重要待办数:',
								x:startX,
								y:startY+stepY*2
							}, {
								xtype : 'label',
								id : 'lbl_important',
								//html : "<a href=''></a>",
								x:endX,
								y:startY+stepY*2
							},{
								xtype : 'label',
								text : '较重要待办数:',
								x:startX,
								y:startY+stepY*3
							}, {
								xtype : 'label',
								id : 'lbl_rather',
								//html : "<a href=''></a>",
								x:endX,
								y:startY+stepY*3
							},{
								xtype : 'label',
								text : '一般待办数:',
								x:startX,
								y:startY+stepY*4
							}, {
								xtype : 'label',
								id : 'lbl_common',
								//html : "<a href=''></a>",
								x:endX,
								y:startY+stepY*4
							}]
				

			});
	var bottomPanel=Ext.create('Ext.grid.Panel', {
				region:'south',
				title : "异常明细",
				layout : "fit",
				height:280,
				store : detailStore,
				viewConfig : {  
	                forceFit : true,  
	                getRowClass : function(record,rowIndex,rowParams,detailStore){  
	                    //禁用数据显示红色  
	                	
	                    if( record.data.LEVEL_NAME== "严重"){  
	                        return 'x-grid-record-red';  
	                    }else if(record.data.LEVEL_NAME== "重要"){  
	                        return 'x-grid-record-green';  
	                    }else if(record.data.LEVEL_NAME== "较重要"){  
	                        return 'x-grid-record-yellow';  
	                    }else if(record.data.LEVEL_NAME== "一般"){  
	                        return 'x-grid-record-blue';  
	                    }  
	                    
	                      
	                }  
	            }, 
				columns : [
						{
			                xtype: 'rownumberer',
			                flex: 0,
			                width: 30
			            },{
							header : "异常名称",
							sortable : true,
							dataIndex : "EVENT_NAME",
							width:150
							
						}, {
							header : "等级",
							sortable : true,
							dataIndex : "LEVEL_NAME",
							flex:1
//							,
//							renderer: function(v) {
//								if(v == "严重") return "<font color='red'>" + v + "</font>";
//								else if(v == "重要") return "<font color='green'>" + v + "</font>";
//								else if(v == "较重要") return "<font color='yellow'>" + v + "</font>";
//								else if(v == "一般") return "<font color='blue'>" + v + "</font>";
//				
//							}
						}
						, {
							header : "异常总数",
							sortable : true,
							dataIndex : "TOTAL_EVENT",
							flex:1
						}
						, {
							header : "新异常",
							sortable : true,
							dataIndex : "NEW_EVENT",
							flex:1
						}
						, {
							header : "本地处理",
							sortable : true,
							dataIndex : "NATIVE_EVENT",
							flex:1
						}
						, {
							header : "营销处理",
							sortable : true,
							dataIndex : "MARKETING_EVENT",
							flex:1
						}, {
							header : "处理超期",
							sortable : true,
							dataIndex : "TIMEOUT_EVENT",
							flex:1
						}
						, {
							header : "误报",
							sortable : true,
							dataIndex : "DISTORT_EVENT",
							flex:1
						}, {
							header : "归档",
							sortable : true,
							dataIndex : "FILE_EVENT",
							flex:1
						}]

			});
	var rightArea = Ext.create('Ext.panel.Panel', {
				region : 'east',
				width : 220,
				border : true,
				layout : 'border',
				items : [typePanel, {
					region : 'south',
					height : 280,
					xtype : 'form',
					border : false,
					id : 'statQuery_disPosequeryForm',
					title:'查询条件',
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
								store : statQuery.orgStore,
								displayField : 'ORG_NAME',
								valueField : 'ORG_NO',
								multiSelect : false,
								queryMode : 'local',
								autoSelect:true,
								editable:false,
								listeners : {
							      afterRender : function(combo) {
							      	if(statQuery.orgStore.first().data!=null&&typeof(statQuery.orgStore.first().data)!='undefined'){
							         combo.setValue(statQuery.orgStore.first().data.ORG_NO);
							      	}
							      	typePieLoad('');
							      	eventStore.load({
										params : Ext.getCmp('statQuery_disPosequeryForm').getForm().getValues()
									});
							      }
				   				}
							},
							{
								xtype : 'label',
								text : '异常类型'
							}, {
								xtype : 'combo',
								store : statQuery.typeStore,
								displayField : 'NAME',
								valueField : 'VALUE',
								multiSelect : false,
								queryMode : 'local',
								editable:false,
								flex:1,
								name : 'alarm_type',
								listeners : {
							      afterRender : function(combo) {
							         combo.setValue(statQuery.typeStore.first().data.VALUE);
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
								waitMsg : '查询中。。。',
								margin : '5 20 5 100',
								handler : function() {
									form = this.up('form').getForm()
											.getValues();
									eventStore.load({
										params : form
									});
									detailStore.load({
										params : form
									});
									typePieLoad('');
									
								}

							}]

				}]
			});

	// 第一个饼
	var typePieLoad = function(event_level) {
		var myChart1 = new FusionCharts("./FusionCharts/Pie3D.swf",
				"myChartId1", "1000", "280");
		var query_Obj=Ext.getCmp('statQuery_disPosequeryForm').getForm().getValues();
		query_Obj.event_level=event_level;
		Ext.Ajax.request({
			url : 'DisposeExcAction!queryEventStatePie.action',
			params : query_Obj,
			success : function(response) {
				var result = Ext.decode(response.responseText);
				var tmpData = result.statePieList;
				var pieMap = '<graph caption="异常处理统计" decimals="2"  enableRotation="0" bgRatio="0,100" bgAlpha="40,100" shownames="1" showvalues="1" color ="FFFFFF"  baseFont="宋体" baseFontSize="12" useRoundEdges="1" showSum="1" formatNumberScale="0" >';
				if(tmpData!=null){
					for (i = 0; i < tmpData.length; i++) {
						pieMap += "<set name='" + tmpData[i].NAME + "' value='"
							+ tmpData[i].VALUE + "'/>";
					}
				}
				
				pieMap += "</graph>";
				myChart1.setDataXML(pieMap);
				myChart1.render("statQuery_disposePieDiv");
			}
		})
	};
	
	var leftArea = Ext.create('Ext.panel.Panel', {
				region : 'center',
				border : false,
				layout : 'border',
				items : [piePanel, bottomPanel]
	});

	var mainPanel  =  Ext.create('Ext.panel.Panel', {
		//activeTab  :0,
		layout:'fit',
		items:[{
		    layout:'border',
		    items:[leftArea,rightArea]
		}]
		
	});
	
	renderModel(mainPanel, "异常处理统计");
		
		
});
