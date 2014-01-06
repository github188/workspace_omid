//终端数据突变
			Ext.define('tmnlChangDataModel', {
					extend : 'Ext.data.Model',
					fields : ["eve_type","data_time","content"]
			});
			
			Ext.create('Ext.data.Store',{
				storeId :'tmnlChangDataStoreId',
				model : 'tmnlChangDataModel',
				remoteSort : true,
//				proxy : new Ext.data.MemoryProxy()
				buffered: true,
				pageSize : DEFAULT_PAGE_SIZE,
				proxy : {
					type : 'ajax',
					url : 'taskFlowAction!queryTmnlChangData.action',
					extraParams: {
		            },
					reader : {
						type : 'json',
						root : 'tmnlChangDataList',
						totalProperty : 'totalCount'
					}
				}
				//,autoLoad : true
		});
			//异常信息
			Ext.define("TaskFlow.tmnlChangDataGrid",{
			  	extend    : "Ext.grid.Panel",
				loadMask : true,
				selModel : Ext.create('Ext.selection.CheckboxModel'),
				//region : 'center',
				border : true,
				store : Ext.data.StoreManager.lookup('tmnlChangDataStoreId'), 
				verticalScrollerType : 'paginggridscroller',
				invalidateScrollerOnRefresh : false,
				viewConfig : {
					trackOver : false
				},
				columnLines : true,
				columns :  [{
							text : "数据类型",
							width : 120,
							dataIndex : 'eve_type',
							align : 'center',
							sortable : true
						}, {
							text : "数据时间",
							width : 120,
							dataIndex : 'data_time',
							align : 'center',
							sortable : false
						}, {
							text : "显示内容",
							width : 120,
							dataIndex : 'content',
							align : 'center',
							flex :'1',
							sortable : false
						}],
						 initComponent : function() {
							  var me = this;    
					          //me.html = "This is A!";
							  me.callParent();
							  },
						query: function  (record) {
  							  //console.log(record.data["TERMINAL_ID"]);
  							  //var store = Ext.create('abnormalEleChartStoreId');
  							  Ext.data.StoreManager.lookup('tmnlChangDataStoreId').load({
//  							  	store.load({
  							  		params:	{'queryItems.terminal_id' : record.data["TERMINAL_ID"]}
  							  })
 				 }
			});



