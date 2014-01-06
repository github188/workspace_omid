Ext.onReady(function() {
	Ext.define('TgstoreModel',{
		extend : 'Ext.data.Model',
		fields:['ORG_NO','ORG_NAME','ORG_TYPE','TG_ID','TG_NAME','ALARM_CNT','ALARM_CNT_7','ALARM_CNT_1','ALARM_CNT_2','ALARM_CNT_3','ALARM_CNT_4','ALARM_CNT_5','ALARM_CNT_6']
	})
	
	var Tgstore = Ext.create('Ext.data.Store', { 
        model: 'TgstoreModel', 
        pageSize: DEFAULT_PAGE_SIZE,
        proxy: { 
           //异步获取数据，这里的URL可以改为任何动态页面，只要返回JSON数据即可 
            type: 'ajax', 
            url: 'measAnCountAction!queryMeasAn', 
            reader: { 
                root: 'tgInfoList',
                totalProperty: 'totalCount'
            } 
        }
    }); 
	
	var selModel = Ext.create('Ext.selection.CheckboxModel',{
		mode : 'SINGLE',
		listeners : {
		    select : function(t,rec,index,e) {
			    var tgId = rec.get('TG_ID');
			    var orgNo  = rec.get('ORG_NO');
			    var orgType = rec.get('ORG_TYPE');
			    var statDate = Ext.Date.format((Ext.getCmp('MEAS_STATE_DATE').getValue()),'Y-m-d');
				   tginfoQuery(tgId,orgNo,orgType,statDate);
				   queryTgDetail(tgId);
			    }
		}
	});
	
	function queryTgDetail(tgId){
			tgGridStore.proxy.extraParams={
    			tgId : tgId
    		};
    		tgGridStore.currentPage = 1;
    		tgGridStore.load({
    			start :0
    		});	
	};
	
	function tginfoQuery(tgId,orgNo,orgType,statDate){
		 Ext.Ajax.request({
						url : 'measAnCountAction!queryTgInfo',
						params: {
							tgId : tgId,
							orgNo : orgNo,
							orgType : orgType,
							statDate : statDate
						},
						success : function(response) {
							var result = Ext.decode(response.responseText);
							var TginfoXml = result.tginfoXml;
							Ext.getDom('TgInfo').innerHTML = "<embed id='swf_taiqu' name='swf_taiqu' width='900' height='500' src='img/taiqu.swf' quality='high' wmode='transparent' pluginspage='http://www.macromedia.com/go/getflashplayer' flashvars=\"xml="+TginfoXml+"\" allowNetworking='all' allowScriptAccess='always'/>";
						}					
					});	
	};
	
	var grid = Ext.create('Ext.grid.Panel', {
				store : Tgstore,
				columnWidth :.7,
				height : 200,
				selModel :selModel,
				border : true,
				columnLines : false,
				columns : [{
							text : "供电单位",
							width : 120,
							dataIndex : 'ORG_NAME',
							sortable : true
						}, {
							text : "台区名称",
							width : 140,
							dataIndex : 'TG_NAME',
							sortable : false
						}, {
							text : "异常总数",
							width : 100,
							dataIndex : 'ALARM_CNT',
							sortable : true
						}, {
							text : "处理中",
							width : 100,
							dataIndex : 'ALARM_CNT_7',
							sortable : true
						}, {
							text : "计量异常",
							width : 100,
							dataIndex : 'ALARM_CNT_1',
							sortable : true
						}, {
							text : "处理中",
							width : 100,
							dataIndex : 'ALARM_CNT_2',
							sortable : true
						}, {
							text : "用电异常",
							width : 100,
							dataIndex : 'ALARM_CNT_3',
							sortable : true
						}, {
							text : "处理中",
							width : 100,
							dataIndex : 'ALARM_CNT_4',
							sortable : true
						}],
				disableSelection : false,//值为TRUE，表示禁止选择行
				loadMask : true,
				viewConfig : {
					trackOver : true,
					stripeRows : true
				},
				dockedItems: [{
				        xtype: 'pagingtoolbar',
				        store: Tgstore,   
				        dock: 'bottom',
				        displayInfo: true
				    }]
			});
		/**-------------------暂时不需要的Store------------------**/
	Ext.define('runState',{
		extend : 'Ext.data.Model',
		fields:['STATUS_NAME','STATUS_CODE']
	});
	
	var statusCodestore = Ext.create('Ext.data.Store', { 
        model: 'runState', 
        proxy: { 
            type: 'ajax', 
            url: 'measAnCountAction!queryStatusCode', 
            reader: { 
                root: 'stausCodeList'
            } 
        }, 
        autoLoad: true 
    }); 
	
     Ext.define('TgCodeModel', {
        extend: 'Ext.data.Model',
        fields: ['CONS_SORT_NAME','CONS_SORT']
    });

    var tgCodeStore = Ext.create('Ext.data.Store', { 
        model: 'TgCodeModel', 
        proxy: { 
            type: 'ajax', 
            url: 'measAnCountAction!queryTgCode', 
            reader: { 
                root: 'tgCodeList'
            } 
        }, 
        autoLoad: true 
    });
	
    Ext.define('orgNoModel',{
    	extend : 'Ext.data.Model',
    	fields:["ORG_NAME","ORG_NO","ORG_TYPE"]
    });
    
    var TgorgStore = Ext.create('Ext.data.Store',{
    	model : 'orgNoModel',
    	proxy : {
    		type : 'ajax',
    		url  : 'measAnCountAction!queryTgOrgNo',
    		reader : {
    			root : 'tgOrgNoList'
    		}
		}
    });
    
	TgorgStore.load({
		params :{
			orgNo : LOGGEDORGNO,
			orgType : LOGGEDLEVEL
		}
	});
    
	 var queryOrgType=LOGGEDLEVEL;
	 var formpanel_2 = Ext.create('Ext.form.Panel', {    
            title: '查询条件',    
            region: 'east',
            height : 200,
            columnWidth :.3,
            split: true,
            collapsible: true,
            floatable: false,
            border : true,
            bodyStyle : 'padding:10px 0px 10px 10px',
            items: [{
							xtype : 'combo',
							fieldLabel : '供电单位',
							id : 'MEAS_ORG',
							name : 'MEAS_ORG',
							queryMode : 'local',
							store : TgorgStore,
							displayField : 'ORG_NAME',
							valueField : 'ORG_NO',
							value : LOGGEDORGNO,
							margin : '10 10 10 0',
							listeners : {
								select : function(combox, record, index) {
									queryOrgType = record[0].data.ORG_TYPE;
								}
							}
						}, {
							id : 'MEAS_STATE_DATE',
							xtype : 'datefield',
							name : 'MEAS_STATE_DATE',
							fieldLabel : '统计日期',
							value: Ext.Date.add(new Date(), Ext.Date.DAY, -1),
							format : 'Y-m-d',
							margin : '10 10 10 0'
						},{
							xtype : 'textfield',
							id : 'MEAS_TG_NAME',
							fieldLabel : '台区名称',
							emptyText : '请输入台区名称',
							margin : '10 10 10 0'
						}, {
							xtype : 'button',
							text : '查询',
							align : 'center',
							width : 80,
							margin : '10 10 10 150',
							handler : function() {
								Tgstore.proxy.extraParams={
			                			orgType : queryOrgType,
			                			orgNo : Ext.getCmp('MEAS_ORG').getValue(),
			                			statDate : Ext.Date.format((Ext.getCmp('MEAS_STATE_DATE').getValue()),'Y-m-d'),
			                			tgId : Ext.getCmp('MEAS_TG_NAME').getValue()
			            		};
			            		Tgstore.currentPage = 1;
			            		Tgstore.load({
			            			start :0
			            		});	
							}
						}]  
    });		
	
	var panel_2 = Ext.create('Ext.panel.Panel',{
			title : '异常信息',
			region :'north',
			border : true,
			split: true,
            collapsible: true,
            floatable: false,
			height : 220,
			layout : 'column',
			items:[grid,formpanel_2]
	});
	
	Ext.define('tgGridModel', {
				extend : 'Ext.data.Model',
				fields : ["EXCEPT_TYPE_NAME", 'EVENT_NAME', 'EVENT_LEVEL_NAME','DATA_SRC','CONS_NAME','CONS_NO','CONS_SORT_NAME','ALARM_DATE',
						'FIRST_ALARM_DATE', 'RESUME_DATE','FIRST_RESUME_DATE','RESUME_DAY_CNT','TMNL_ASSET_NO','TERMINAL_ADDR','ASSET_NO']
	});
	
	var tgGridStore = Ext.create('Ext.data.Store', {
				model : 'tgGridModel',
				proxy : {
					// 异步获取数据，这里的URL可以改为任何动态页面，只要返回JSON数据即可
					type : 'ajax',
					url : 'measAnCountAction!queryTgDetailInfo',
					reader : {
						root : 'tgInfoList',
						totalProperty: 'totalCount'
					}
				}
	});
	
	var tgInfoGridPanel = Ext.create('Ext.grid.Panel', {
				id : 'tgInfoGridPanel',
				store : tgGridStore,
				title : '台区异常信息明细',
				border : true,
				columnLines : true,
				columns : [{
							text : "异常类型",
							dataIndex : 'EXCEPT_TYPE_NAME',
							align : 'center',
							sortable : true
						}, {
							text : "异常名称",
							dataIndex : 'EVENT_NAME',
							align : 'center',
							sortable : false
						}, {
							text : "异常等级",
							dataIndex : 'EVENT_LEVEL_NAME',
							align : 'center',
							sortable : true
						}, {
							text : "异常来源",
							dataIndex : 'DATA_SRC',
							align : 'center',
							sortable : true
						}, {
							text : "用户编号",
							dataIndex : 'CONS_NO',
							align : 'center',
							sortable : true
						}, {
							text : "用户名称",
							dataIndex : 'CONS_NAME',
							align : 'center',
							sortable : true
						}, {
							text : "电能表资产号",
							dataIndex : 'ASSET_NO',
							align : 'center',
							sortable : true
						}, {
							text : "用户类别",
							dataIndex : 'CONS_SORT_NAME',
							align : 'center',
							sortable : true
						}, {
							text : "最近告警时间",
							dataIndex : 'ALARM_DATE',
							align : 'center',
							sortable : true
						}, {
							text : "第一次告警时间",
							dataIndex : 'FIRST_ALARM_DATE',
							align : 'center',
							sortable : true
						}, {
							text : "最近恢复时间",
							dataIndex : 'RESUME_DATE',
							align : 'center',
							sortable : true
						}, {
							text : "第一次恢复时间",
							dataIndex : 'FIRST_RESUME_DATE',
							align : 'center',
							sortable : true
						}, {
							text : "恢复天数",
							dataIndex : 'RESUME_DAY_CNT',
							align : 'center',
							sortable : true
						}, {
							text : "终端资产号",
							dataIndex : 'TMNL_ASSET_NO',
							align : 'center',
							sortable : true
						}, {
							text : "终端地址",
							dataIndex : 'TERMINAL_ADDR',
							align : 'center',
							sortable : true
						}],
				disableSelection : true,
				loadMask : true,
				viewConfig : {
					trackOver : false,
					stripeRows : false
				},
				dockedItems: [{
				        xtype: 'pagingtoolbar',
				        store: tgGridStore,   
				        dock: 'bottom',
				        displayInfo: true
				    }]
			});	
	var picPanel = Ext.create('Ext.panel.Panel',{
			id: 'picPanel',
			html : '<div style="width:900px; height:500px; margin:0 auto;" id="TgInfo"></div>',
			title : '台区信息',
			autoScroll : true,
			layout : 'fit',
			border : false
	});
	
	var tabPanel = Ext.createWidget('tabpanel', {
		activeTab : 0,
		region : 'center',
		items : [picPanel,tgInfoGridPanel]
	});
	
	var mainPanel = Ext.create('Ext.panel.Panel',{
			layout : 'border',
			border :true,
			items:[panel_2,tabPanel]
	});
	renderModel(mainPanel,"按台区统计查询");
});

