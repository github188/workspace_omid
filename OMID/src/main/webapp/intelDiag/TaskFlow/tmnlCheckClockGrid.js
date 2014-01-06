	//终端时钟不对
Ext.define('tmnlCheckClockModel', {
	extend : 'Ext.data.Model',
	fields : ["CHECK_OBJ_TIME","SERVER_TIME"]
});
	
Ext.create('Ext.data.Store',{
	storeId :'tmnlCheckClockStoreId',
	model : 'tmnlCheckClockModel',
	remoteSort : true,
	buffered: true,
	pageSize : DEFAULT_PAGE_SIZE,
	proxy : {
		type : 'ajax',
		url : 'taskFlowAction!queryTmnlCheckClock.action',
		extraParams: {
        },
		reader : {
			type : 'json',
			root : 'tmnlCheckClockList',
			totalProperty : 'totalCount'
		}
	}
});
Ext.define("TaskFlow.tmnlCheckClockGrid",{
  	extend    : "Ext.grid.Panel",
	loadMask : true,
	selModel : Ext.create('Ext.selection.CheckboxModel'),
	border : true,
	store : Ext.data.StoreManager.lookup('tmnlCheckClockStoreId'), 
	verticalScrollerType : 'paginggridscroller',
	invalidateScrollerOnRefresh : false,
	viewConfig : {
		trackOver : false
	},
	columnLines : true,
	columns :  [{
				text : "终端时钟",
				width : 120,
				dataIndex : 'CHECK_OBJ_TIME',
				align : 'center',
				sortable : true
			}, {
				text : "主站时钟",
				width : 120,
				dataIndex : 'SERVER_TIME',
				align : 'center',
				sortable : false
			}],
			 initComponent : function() {
				  var me = this;    
				  me.callParent();
				  },
			query: function  (record) {
				  Ext.data.StoreManager.lookup('tmnlCheckClockStoreId').load({
				  		params:	{'queryItems.terminal_addr' : record.data["TERMINAL_ADDR"]}
				  })
	 }
});



