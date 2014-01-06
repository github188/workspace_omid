
//投运终端无配置任务，调试失败时间超期
			Ext.define('abnormalInfoModel', {
					extend : 'Ext.data.Model',
					fields : ["APP_NO",  
							"METER_FLAG",
							"DEBUG_TIME","DEBUG_CNT","TMNL_TASK_TYPE_NAME","DEBUG_STATUS_NAME",
							"FLOW_FLAG_NAME"]
			});
			
		//	var queryItems = {}
	//			var abnormalEleChartStore = Ext.create('Ext.data.Store', {
			Ext.create('Ext.data.Store',{
				//extend  : "Ext.data.Store",
				storeId :'abnormalEleChartStoreId',
				model : 'abnormalInfoModel',
				remoteSort : true,
//				proxy : new Ext.data.MemoryProxy()
				buffered: true,
				pageSize : DEFAULT_PAGE_SIZE,
				proxy : {
					type : 'ajax',
					url : 'taskFlowAction!queryAbnormal.action',
//					extraParams: {
//		            },
					reader : {
						type : 'json',
						root : 'abnormalList',
						totalProperty : 'totalCount'
					}
				}
				//,autoLoad : true
		});
			//异常信息
			Ext.define("TaskFlow.abnormalEleChartGrid",{
			  	extend    : "Ext.grid.Panel",
				loadMask : true,
				selModel : Ext.create('Ext.selection.CheckboxModel'),
				//region : 'center',
//				width: 888,
//				height:250,
				layout:'fit',
				//border : true,
				store : Ext.data.StoreManager.lookup('abnormalEleChartStoreId'), 
				verticalScrollerType : 'paginggridscroller',
				invalidateScrollerOnRefresh : false,
				viewConfig : {
					trackOver : false
				},
				columnLines : true,
				columns :  [{
							text : "工单号",
							width : 120,
							dataIndex : 'APP_NO',
							align : 'center',
							sortable : true
						}, {
							text : "任务类型",
							width : 120,
							dataIndex : 'TMNL_TASK_TYPE_NAME',
							align : 'center',
							sortable : false
						}, {
							text : "是否换表",
							width : 120,
							dataIndex : 'METER_FLAG',
							align : 'center',
							sortable : false
						}, {
							text : "调式状态",
							width : 90,
							dataIndex : 'DEBUG_STATUS_NAME',
							align : 'center',
							sortable : true
						},  {
							text : "调试时间",
							width : 120,
							dataIndex : 'DEBUG_TIME',
							align : 'center',
							sortable : false
						}, {
							text : "流程类型",
							width : 120,
							dataIndex : 'FLOW_FLAG_NAME',
							align : 'center',
							sortable : false
						}, {
							text : "调试次数",
//							width : 120,
							flex : 1,
							dataIndex : 'DEBUG_CNT',
							align : 'center',
							sortable : true
						}],
						 initComponent : function() {
							  var me = this;    
					          //me.html = "This is A!";
							  me.callParent();
							  },
						query: function  (record) {
  							  Ext.data.StoreManager.lookup('abnormalEleChartStoreId').load({
  							  		params:	{'queryItems.terminal_id' : record.data["TERMINAL_ID"]}
  							  });
  							  
 				 }
			});

//			var abnormalEleChartGrid = Ext.create('Ext.grid.Panel', {
//				});
//			abnormalEleChartStore.removeAll();
//			Ext.Ajax.request({
//				url : 'taskFlowAction!queryAbnormal.action',
//				params : {
//					'queryItems.terminal_id':terminal_id
//				},
//				success:function(respnose){
//					var result = Ext.decode(response.responseText);
//					var resultList = result.abnormalList;
//					if (!Ext.isEmpty(resultList)) {
//						abnormalEleChartStore.loadData(resultList);
//					}
//				}
//			})
//			abnormalEleChartStore.load();
//			Ext.getCmp('abnormalEleChartPanel').add(abnormalEleChartGrid);
//			Ext.getCmp('abnormalEleChartPanel').doLayout();
//			Ext.getCmp('abnormalEleChartPanel').getEl().unmask();


