//		//终端停运但上报异常
//		Ext.define('tmnlStopModel', {
//					extend : 'Ext.data.Model',
//					fields : ["DATA_TIME","P"]
//			});
//			
//			Ext.create('Ext.data.Store',{
//				//extend  : "Ext.data.Store",
//				storeId :'tmnlStopStoreId',
//				model : 'tmnlStopModel',
//				remoteSort : true,
////				proxy : new Ext.data.MemoryProxy()
//				buffered: true,
//				pageSize : DEFAULT_PAGE_SIZE,
//				proxy : {
//					type : 'ajax',
//					url : 'taskFlowAction!queryTmnlStop.action',
//					extraParams: {
//		            },
//					reader : {
//						type : 'json',
//						root : 'tmnlStopList',
//						totalProperty : 'totalCount'
//					}
//				}
//				//,autoLoad : true
//		});
//			//异常信息
//			Ext.define("TaskFlow.tmnlStopGrid",{
//			  	extend    : "Ext.grid.Panel",
//				loadMask : true,
//				selModel : Ext.create('Ext.selection.CheckboxModel'),
//				//region : 'center',
//				border : true,
//				store : Ext.data.StoreManager.lookup('tmnlStopStoreId'), 
//				verticalScrollerType : 'paginggridscroller',
//				invalidateScrollerOnRefresh : false,
//				viewConfig : {
//					trackOver : false
//				},
//				columnLines : true,
//				columns :  [{
//							text : "时间",
//							width : 120,
//							dataIndex : 'DATA_TIME',
//							align : 'center',
//							sortable : true
//						}, {
//							text : "功率",
//							width : 120,
//							dataIndex : 'P',
//							align : 'center',
//							sortable : false
//						}],
//						 initComponent : function() {
//							  var me = this;    
//					          //me.html = "This is A!";
//							  me.callParent();
//							  },
//						query: function  (record) {
//  							  //console.log(record.data["TERMINAL_ID"]);
//  							  //var store = Ext.create('abnormalEleChartStoreId');
//  							  Ext.data.StoreManager.lookup('tmnlStopStoreId').load({
////  							  	store.load({
//  							  		params:	{'queryItems.terminal_id' : record.data["TERMINAL_ID"]}
//  							  })
// 				 }
//			});


			// ---负荷分析
			Ext.define('tmnlStopModel', {
						extend : 'Ext.data.Model',
						fields : ["DATA_TIME", "P"]
					});
			var tmnlStopStore = Ext.create('Ext.data.Store', {
						model : 'tmnlStopModel',
						remoteSort : true,
						proxy : new Ext.data.MemoryProxy()
					});
			var tmnlStopGridPanel = Ext.create('Ext.grid.Panel', {
						height : 300,
//						width : Ext.getCmp('abnormalEleChartPanelId')
//								.getWidth(),
						loadMask : true,
						border : false,
						store : tmnlStopStore,
						viewConfig : {
							trackOver : false
						},
						columnLines : true,
						columns : [{
									text : "时间",
									width : 120,
									dataIndex : 'DATA_TIME',
									align : 'center',
									sortable : true
								}, {
									text : "功率",
									width : 120,
									dataIndex : 'P',
									align : 'center',
									sortable : false
								}]

					});
			Ext.getCmp('abnormalEleChartPanelId').getEl().mask('正在查询...');
			Ext.Ajax.request({
				url : 'taskFlowAction!queryTmnlStop.action',
				params : {
					'queryItems.terminal_addr' : record.data["TERMINAL_ADDR"]
				},
				success : function(response) {
					// alert(runCap);
					var result = Ext.decode(response.responseText);
					var resultList = result.resultList;
					if (!Ext.isEmpty(resultList)) {
						bLPowerStore.loadData(resultList);
						var abnormalEleChartFitPowerPanelId = Ext.create(
								'Ext.panel.Panel', {
									id : 'abnormalEleChartFitPowerPanelId',
									border : false,
									height : 300,
									width : Ext
											.getCmp('abnormalEleChartPanelId')
											.getWidth(),
									renderTo : Ext.getBody()
								});
						var xmlData2 = "<graph caption='功率曲线图' xAxisName='' yAxisName='功率' labelDisplay = 'WRAP' anchorRadius='3' decimalPrecision='0' formatNumberScale='0' bgcolor='F3f3f3' bgAlpha='70' numvdivlines='5' showValues='0' divLineColor='CC3300' divLineIsDashed='1' chartRightMargin='50' labelStep='8'>";
						xmlData2 += "<categories>";
						for (var i = 0; i < resultList.length; i++) {
							xmlData2 += "<category name='"
									+ resultList[i]['DATA_TIME'].substring(10,
											16) + "'  />";
						}
						xmlData2 += "</categories>";
						xmlData2 += "<dataset seriesName='正向有功功率' color='#E7ED1A' anchorBorderColor='#E7ED1A' anchorBgColor='#E7ED1A'>";

						var temp = resultList[0]['FORWARDPOWER'];
						if (Ext.isEmpty(temp)) {
							temp = 0;
						}
						xmlData2 += "<set value='" + temp + "' />";
						for (var i = 1; i < resultList.length; i++) {
							if (Ext.isEmpty(resultList[i]['FORWARDPOWER'])) {
								xmlData2 += "<set value='" + temp + "' />";
							} else {
								xmlData2 += "<set value='"
										+ resultList[i]['FORWARDPOWER']
										+ "' />";
								temp = resultList[i]['FORWARDPOWER'];
							}
						}
						xmlData2 += "</dataset>";
						xmlData2 += "<dataset seriesName='正向无功功率' color='#3BC71A' anchorBorderColor='#3BC71A' anchorBgColor='#3BC71A'>";
						var temp = resultList[0]['REVERSEPOWER'];
						if (Ext.isEmpty(temp)) {
							temp = 0;
						}
						xmlData2 += "<set value='" + temp + "' />";
						for (var i = 1; i < resultList.length; i++) {
							if (Ext.isEmpty(resultList[i]['REVERSEPOWER'])) {
								xmlData2 += "<set value='" + temp + "' />";
							} else {
								xmlData2 += "<set value='"
										+ resultList[i]['REVERSEPOWER']
										+ "' />";
								temp = resultList[i]['REVERSEPOWER'];
							}
						}
						xmlData2 += "</dataset>";
						xmlData2 += " <trendLines> <line startValue='"
								+ runCap
								+ "' color='FF0000' displayvalue='运行容量' />  </trendLines>";

						xmlData2 += "</graph>";

						var picCharts2 = new FusionCharts(
								"./FusionCharts-new/MSLine.swf",
								"eleAbnormalPicPowerCharts", Ext
										.getCmp('abnormalEleChartPanelId')
										.getWidth(), 300);
						picCharts2.setDataXML(xmlData2);
						picCharts2.render("abnormalEleChartFitPowerPanelId");
						Ext.getCmp('abnormalEleChartPanelId')
								.add(abnormalEleChartFitPowerPanelId);

					}

					Ext.getCmp('abnormalEleChartPanelId').add(bLPowerGridPanel);
					Ext.getCmp('abnormalEleChartPanelId').doLayout();
					Ext.getCmp('abnormalEleChartPanelId').getEl().unmask();
				},
				failure : function(response) {
					Ext.Msg.alert('提示', '查询功率曲线信息失败');
					Ext.getCmp('abnormalEleChartPanelId').getEl().unmask();
				}

			});

