	Ext.onReady(function(){
		
		var gridPanel;
		var gridCm;
		var gridStore;
		
		Ext.define('storeModel',{
			extend :'Ext.data.Model',
			fields:["ID",'USERNAME','EMAIL','PASSWORD','REGISTERDATE']
		});
		
		Ext.define('storeModel_1',{
			extend :'Ext.data.Model',
			fields:["ID",'USERNAME','EMAIL','PASSWORD','REGISTERDATE']
		});
		
		Ext.define('storeModel_2',{
			extend :'Ext.data.Model',
			fields:["ID",'USERNAME','EMAIL','PASSWORD','REGISTERDATE']
		});
		
		Ext.define('storeModel_3',{
			extend :'Ext.data.Model',
			fields:["ID",'USERNAME','EMAIL','PASSWORD','REGISTERDATE']
		});
		
		gridStore = Ext.create('Ext.data.Store', { 
	        model: 'storeModel', 
	        pageSize : 12,
	        proxy: { 
	           //异步获取数据，这里的URL可以改为任何动态页面，只要返回JSON数据即可 
	            type: 'ajax', 
	            url: 'helloAction!queryUser.action', 
	            reader: { 
	                root: 'list',
	                totalProperty : 'totalCount'
	            } 
	        }, 
	        autoLoad: true 
    	}); 
		
    	var gridStore_1 = Ext.create('Ext.data.Store', { 
	        model: 'storeModel_1', 
	        pageSize : 12,
	        proxy: { 
	           //异步获取数据，这里的URL可以改为任何动态页面，只要返回JSON数据即可 
	            type: 'ajax', 
	            url: 'helloAction!queryUser.action', 
	            reader: { 
	                root: 'list',
	                totalProperty : 'totalCount'
	            } 
	        }, 
	        autoLoad: true 
    	}); 
    	
    	var gridStore_2 = Ext.create('Ext.data.Store', { 
	        model: 'storeModel_2', 
	        pageSize : 12,
	        proxy: { 
	           //异步获取数据，这里的URL可以改为任何动态页面，只要返回JSON数据即可 
	            type: 'ajax', 
	            url: 'helloAction!queryUser.action', 
	            reader: { 
	                root: 'list',
	                totalProperty : 'totalCount'
	            } 
	        }, 
	        autoLoad: true 
    	});
    	
    	var gridStore_3 = Ext.create('Ext.data.Store', { 
	        model: 'storeModel_3', 
	        pageSize : 12,
	        proxy: { 
	           //异步获取数据，这里的URL可以改为任何动态页面，只要返回JSON数据即可 
	            type: 'ajax', 
	            url: 'helloAction!queryUser.action', 
	            reader: { 
	                root: 'list',
	                totalProperty : 'totalCount'
	            } 
	        }, 
	        autoLoad: true 
    	});
    	
    	gridPanel = Ext.create('Ext.grid.Panel', {
				store : gridStore,
				title : '<font color="#D4101D" size="2" family="楷体">严重</font>',
				border : true,
				columnLines : true,
				columns : [{
							text : "异常类型",
							width : 80,
							dataIndex : 'ID',
							sortable : true,
							align :'center'
						}, {
							text : "异常名称",
							dataIndex : 'USERNAME',
							align :'center',
							width : 80,
							sortable : false
						}, {
							text : "数量",
							dataIndex : 'EMAIL',
							align :'center',
							width : 40,
							sortable : true
						}, {
							text : "未处理",
							dataIndex : 'PASSWORD',
							align :'center',
							width : 60,
							sortable : true
						}, {
							text : "处理中",
							width : 60,
							dataIndex : 'STATE_1',
							align :'center',
							sortable : true
						}],
				disableSelection : true,
				autoScroll : false,
				loadMask : true,
				viewConfig : {
					id : 'gv',
					trackOver : false,
					stripeRows : false
				},
				bbar: Ext.create('Ext.PagingToolbar', {
	            store: gridStore,
	            displayInfo: true,
	            displayMsg: '{0} - {1}',
	            emptyMsg: "无数据显示"
        		})
			});
		
		var	gridPanel_1 = Ext.create('Ext.grid.Panel', {
				store : gridStore_1,
				title : '<font color="#D46B1D" size="2">重要</font>',
				border : true,
				columnLines : true,
				columns : [{
							text : "异常类型",
							dataIndex : 'ID',
							width : 80,
							align :'center',
							sortable : true
						}, {
							text : "异常名称",
							dataIndex : 'USERNAME',
							align :'center',
							width : 80,
							sortable : false
						}, {
							text : "数量",
							dataIndex : 'EMAIL',
							width : 40,
							align :'center',
							sortable : true
						}, {
							text : "未处理",
							dataIndex : 'PASSWORD',
							align :'center',
							width : 60,
							sortable : true
						}, {
							text : "处理中",
							dataIndex : 'STATE_1',
							align :'center',
							width : 60,
							sortable : true
						}],
				disableSelection : true,
				loadMask : true,
				viewConfig : {
					id : 'gv_1',
					trackOver : false,
					stripeRows : false
				},
				bbar: Ext.create('Ext.PagingToolbar', {
	            store: gridStore,
	            displayInfo: true,
	            displayMsg: '{0} - {1}',
	            emptyMsg: "无数据显示"
        		})
			});
		
		var	gridPanel_2 = Ext.create('Ext.grid.Panel', {
				store : gridStore_2,
				title : '<font color="#D1B11A" size="2" family="宋体">较重要</font>',
				border : true,
				columnLines : true,
				columns : [{
							text : "异常类型",
							width : 80,
							dataIndex : 'ID',
							align :'center',
							sortable : true
						}, {
							text : "异常名称",
							dataIndex : 'USERNAME',
							align :'center',
							width : 80,
							sortable : false
						}, {
							text : "数量",
							dataIndex : 'EMAIL',
							align :'center',
							width : 40,
							sortable : true
						}, {
							text : "未处理",
							dataIndex : 'PASSWORD',
							align :'center',
							width : 60,
							sortable : true
						}, {
							text : "处理中",
							dataIndex : 'STATE_1',
							align :'center',
							width : 60,
							sortable : true
						}],
				disableSelection : true,
				loadMask : true,
				viewConfig : {
					id : 'gv_2',
					trackOver : false,
					stripeRows : false
				},
				bbar: Ext.create('Ext.PagingToolbar', {
	            store: gridStore,
	            displayInfo: true,
	            displayMsg: '{0} - {1}',
	            emptyMsg: "无数据显示"
        		})
			});	
		
		var	gridPanel_3 = Ext.create('Ext.grid.Panel', {
				store : gridStore_3,
				title : '<font color="#026115" size="2">一般</font>',
				border : true,
				columnLines : true,
				columns : [{
							text : "异常类型",
							dataIndex : 'ID',
							align :'center',
							width : 80,
							sortable : true
						}, {
							text : "异常名称",
							dataIndex : 'USERNAME',
							width : 80,
							align :'center',
							sortable : false
						}, {
							text : "数量",
							dataIndex : 'EMAIL',
							width : 40,
							align :'center',
							sortable : true
						}, {
							text : "未处理",
							dataIndex : 'PASSWORD',
							width : 60,
							align :'center',
							sortable : true
						}, {
							text : "处理中",
							dataIndex : 'STATE_1',
							width : 60,
							align :'center',
							sortable : true
						}],
				disableSelection : true,
				loadMask : true,
				viewConfig : {
					id : 'gv_3',
					trackOver : false,
					stripeRows : false
				},
				bbar: Ext.create('Ext.PagingToolbar', {
	            store: gridStore_3,
	            displayInfo: true,
	            displayMsg: '{0} - {1}',
	            emptyMsg: "无数据显示"
        		})
			});
			
		var tabPanel  = Ext.createWidget('tabpanel', {
			activeTab  :0,
			region : 'center',
			renderTo : 'gridTest',
			height :345,
			width : 349,
			items:[gridPanel,gridPanel_1,gridPanel_2,gridPanel_3]
		});
		
	});
