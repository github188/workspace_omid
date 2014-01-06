//测量点参数与主站不一致
			Ext.define('tmnlParamModel', {
					extend : 'Ext.data.Model',
					fields : ["PROT_ITEM_NO","SEND_TIME","CALL_VALUE","BLOCK_SN","INNER_BLOCK_SN",
							  "CURRENT_VALUE","PROT_ITEM_NAME","STAFF_NO"]
			});
			
			Ext.create('Ext.data.Store',{
				//extend  : "Ext.data.Store",
				storeId :'tmnlParamStoreId',
				model : 'tmnlParamModel',
				remoteSort : true,
				buffered: true,
				pageSize : DEFAULT_PAGE_SIZE,
				proxy : {
					type : 'ajax',
					url : 'taskFlowAction!queryTmnlParam.action',
					extraParams: {
		            },
					reader : {
						type : 'json',
						root : 'tmnlParamList',
						totalProperty : 'totalCount'
					}
				}
				//,autoLoad : true
		});
			//异常信息
			Ext.define("TaskFlow.tmnlParamGrid",{
			  	extend    : "Ext.grid.Panel",
				loadMask : true,
				selModel : Ext.create('Ext.selection.CheckboxModel'),
				//region : 'center',
				border : true,
				store : Ext.data.StoreManager.lookup('tmnlParamStoreId'), 
				verticalScrollerType : 'paginggridscroller',
				invalidateScrollerOnRefresh : false,
				viewConfig : {
					trackOver : false,
					getRowClass : function(record, rowIndex, rowParams, store) {
//						if (record.get('ALARM_DATE') == Ext.Date.format(Ext.Date.add(
//										new Date(), Ext.Date.DAY, -1), 'Y-m-d')) {
//							return 'x-grid-record-red';
//						} else {
//							return 'x-grid-record-rblue';
//						}
						if (record.get('CURRENT_VALUE') != record.get('CALL_VALUE')) {
							return 'x-grid-record-red';
						} else {
							
						}
			}
				},
				//width : 800,
				columnLines : true,
				columns :  [{
							text : "参数项名称",
							width : 120,
							dataIndex : 'PROT_ITEM_NAME',
							align : 'center',
							sortable : true
						},{
							text : "当前值",
							width : 120,
							dataIndex : 'CURRENT_VALUE',
							align : 'center',
							sortable : true
						}, {
							text : "召测值",
							width : 90,
							dataIndex : 'CALL_VALUE',
							align : 'center',
							sortable : true
						},{
							text : "历史值",
							width : 120,
							dataIndex : 'HISTORY_VALUE',
							align : 'center',
							sortable : true
						}, {
							text : "块内序号",
							width : 120,
							dataIndex : 'INNER_BLOCK_SN',
							align : 'center',
							sortable : false
						}, {
							text : "下发时间",
							width : 120,
							dataIndex : 'SEND_TIME',
							align : 'center',
							sortable : false
						}, {
							text : "下发人",
							width : 120,
							dataIndex : 'STAFF_NO',
							align : 'center',
							sortable : false
						}
					/*	, {
							text : "流程",
							width : 120,
							dataIndex : '',
							align : 'center',
							sortable : false
						}*/],
						 initComponent : function() {
							  var me = this;    
					          //me.html = "This is A!";
							  me.callParent();
							  },
						query: function  (record) {
							
  							  Ext.data.StoreManager.lookup('tmnlParamStoreId').load({
  							  		params:	{'queryItems.terminal_id' : record.data["TERMINAL_ID"]}
  							  })
 				 }
			});



