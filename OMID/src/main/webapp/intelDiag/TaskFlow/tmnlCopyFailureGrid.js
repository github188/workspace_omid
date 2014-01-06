	//连续N天抄表失败
Ext.define('tmnlCopyFailureModel', {
	extend : 'Ext.data.Model',
	fields : ["CONS_NAME","ASSET_NO","MARK_TIME","PROTOCOL_NAME","READ_FAIL_N","COLL_PORT","CONS_SORT_NAME"]
});
	
Ext.create('Ext.data.Store',{
	storeId :'tmnlCopyFailureStoreId',
	model : 'tmnlCopyFailureModel',
	remoteSort : true,
	buffered: true,
	pageSize : DEFAULT_PAGE_SIZE,
	proxy : {
		type : 'ajax',
		url : 'taskFlowAction!queryTmnlCopyFailure.action',
		extraParams: {
        },
		reader : {
			type : 'json',
			root : 'tmnlCopyFailureList',
			totalProperty : 'totalCount'
		}
	}
});
Ext.define("TaskFlow.tmnlCopyFailureGrid",{
  	extend    : "Ext.grid.Panel",
	loadMask : true,
	selModel : Ext.create('Ext.selection.CheckboxModel'),
	border : true,
	store : Ext.data.StoreManager.lookup('tmnlCopyFailureStoreId'), 
	verticalScrollerType : 'paginggridscroller',
	invalidateScrollerOnRefresh : false,
	viewConfig : {
		trackOver : false
	},
	columnLines : true,
	columns :  [{
				text : "用户",
				width : 120,
				dataIndex : 'CONS_NAME',
				align : 'center',
				sortable : true
			}, {
				text : "电能表资产号",
				width : 120,
				dataIndex : 'ASSET_NO',
				align : 'center',
				sortable : false
			}, {
				text : "电能表规约",
				width : 120,
				dataIndex : 'PROTOCOL_NAME',
				align : 'center',
				sortable : false
			},  {
				text : "失败天数",
				width : 120,
				dataIndex : 'READ_FAIL_N',
				align : 'center',
				sortable : false
			}, {
				text : "抄表时间",
				width : 120,
				dataIndex : 'MARK_TIME',
				align : 'center',
				sortable : false
			},{
				text : "端口",
				width : 90,
				dataIndex : 'COLL_PORT',
				align : 'center',
				sortable : true
			},  {
				text : "用户类型",
				//width : 120,
				flex : 1,
				dataIndex : 'CONS_SORT_NAME',
				align : 'center',
				sortable : false
			}],
			 initComponent : function() {
				  var me = this;    
				  me.callParent();
				  },
			query: function  (record) {
				  Ext.data.StoreManager.lookup('tmnlCopyFailureStoreId').load({
				  		params:	{'queryItems.terminal_addr' : record.data["TERMINAL_ADDR"]}
				  })
	 }
});



