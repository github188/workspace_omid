		//昨日终端与主站无通信
		Ext.define('mpCurveModel', {
					extend : 'Ext.data.Model',
					fields : ["TMNL_IP","SIM_NO","CURRENT_LOAD","EVENT_NAME","EVENT_TIME","LOAD_TIME","IS_ONLINE"
							,"ONOFF_TIME"]
			});
			
			Ext.create('Ext.data.Store',{
				//extend  : "Ext.data.Store",
				storeId :'mpCurveStoreId',
				model : 'mpCurveModel',
				remoteSort : true,
//				proxy : new Ext.data.MemoryProxy()
				buffered: true,
				pageSize : 100,
				proxy : {
					type : 'ajax',
					url : 'taskFlowAction!queryMpCurve.action',
					//url : 'measureExceptionAnalAction!queryBLPhaseInfo.action',
					extraParams: {
		            },
					reader : {
						type : 'json',
						root : 'mpCurveList',
						totalProperty : 'totalCount'
					}
				}
				//,autoLoad : true
		});
			//异常信息
			Ext.define("TaskFlow.mpCurveGrid",{
			  	extend    : "Ext.grid.Panel",
				loadMask : true,
				selModel : Ext.create('Ext.selection.CheckboxModel'),
				//region : 'center',
				border : true,
				store : Ext.data.StoreManager.lookup('mpCurveStoreId'), 
				verticalScrollerType : 'paginggridscroller',
				invalidateScrollerOnRefresh : false,
				viewConfig : {
					trackOver : false
				},
//				width : 800,
				columnLines : true,
				columns :  [{
							text : "终端IP",
							width : 120,
							dataIndex : 'TMNL_IP',
							align : 'center',
							sortable : true
						}, {
							text : "SIM卡号",
							width : 80,
							dataIndex : 'SIM_NO',
							align : 'center',
							sortable : false
						}, {
							text : "负荷",
							width : 120,
							dataIndex : 'CURRENT_LOAD',
							align : 'center',
							sortable : false
						}, {
							text : "负荷时间",
							width : 120,
							dataIndex : 'LOAD_TIME',
							align : 'center',
							sortable : false
						}, {
							text : "终端事件",
							width : 120,
							dataIndex : 'EVENT_NAME',
							align : 'center',
							sortable : false
						}, {
							text : "发生时间",
							width : 120,
							dataIndex : 'EVENT_TIME',
							align : 'center',
							sortable : false
						}, {
							text : "是否在线",
							width : 80,
							dataIndex : 'IS_ONLINE',
							align : 'center',
							sortable : false
						}, 
							{
							text : "在线/离线时间",
							width : 90,
							dataIndex : 'ONOFF_TIME',
							align : 'center',
							sortable : true
						}],
						
						 initComponent : function() {
							  var me = this;    
					          //me.html = "This is A!";
							  me.callParent();
							  },
						query: function  (record) {
  							  //console.log(record.data["TERMINAL_ID"]);
  							  //var store = Ext.create('abnormalEleChartStoreId');
  							  Ext.data.StoreManager.lookup('mpCurveStoreId').load({
//  							  	store.load({
  							  		params:	{'queryItems.terminal_id' : record.data["TERMINAL_ID"],
  							  				'queryItems.dataTime':record.data["ALARM_DATE"]}
  							  })
 				 }
// 				 dockedItems: [{
//				        xtype: 'pagingtoolbar',
//				        store: Ext.data.StoreManager.lookup('mpCurveStoreId'),   
//				        dock: 'bottom',
//				        displayInfo: true
//				    }]	
				    
			});



