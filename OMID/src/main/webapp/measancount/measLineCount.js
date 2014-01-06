Ext.onReady(function() {
	Ext.define('LinestoreModel',{
		extend : 'Ext.data.Model',
		fields:['ORG_NO','ORG_NAME','ORG_TYPE','LINE_ID','LINE_NO','LINE_NAME','LINE_CNT','LINE_CNT_1','LINE_CNT_2','LINE_CNT_3','LINE_CNT_4','LINE_CNT_5','ALARM_CNT_5','LINE_CNT_6']
	})
	
	var Linestore = Ext.create('Ext.data.Store', { 
        model: 'LinestoreModel', 
        pageSize: DEFAULT_PAGE_SIZE,
        proxy: { 
           //异步获取数据，这里的URL可以改为任何动态页面，只要返回JSON数据即可 
            type: 'ajax', 
            url: 'measAnCountAction!queryLineInfo', 
            reader: { 
                root: 'lineInfo',
                totalProperty: 'totalCount'
            } 
        }
    }); 
	
	var selModel = Ext.create('Ext.selection.CheckboxModel',{
		mode : 'SINGLE',
		listeners : {
		    select : function(t,rec,index,e) {
			    var lineId = rec.get('LINE_ID');
				   LineinfoQuery(lineId);
				   queryLineDetail(lineId);
			    }
		}
	});
	
	function queryLineDetail(lineId){
			lineGridStore.proxy.extraParams={
    			lineId : lineId
    		};
    		lineGridStore.currentPage = 1;
    		lineGridStore.load({
    			start :0
    		});	
	};
	function LineinfoQuery(lineId){
		 Ext.Ajax.request({
						url : 'measAnCountAction!queryLine',
						params: {
							lineId :lineId,
							statDate : Ext.Date.format((Ext.getCmp('lineStatCombox').getValue()),'Y-m-d')
						},
						success : function(response) {
							var result = Ext.decode(response.responseText);
							var lineInfoXml = result.lineInfoXml;
							Ext.getDom('LineInfo').innerHTML = "<embed id='swf_line' name='swf_line' width='960' height='500' src='img/line-nohr.swf' quality='high' wmode='transparent' pluginspage='http://www.macromedia.com/go/getflashplayer' flashvars=\"xml="+lineInfoXml+"\" allowNetworking='all' allowScriptAccess='always'/>";
						}					
					});	
	};
	
	var Linegrid = Ext.create('Ext.grid.Panel', {
				store : Linestore,
				columnWidth :.7,
				height : 200,
				selModel :selModel,
				border : true,
				columnLines : false,
				columns : [{
							text : "供电单位",
							width : 120,
							dataIndex : 'ORG_NAME',
							align :'center',
							sortable : true
						}, {
							text : "线路名称",
							width : 140,
							dataIndex : 'LINE_NAME',
							align :'center',
							sortable : false
						}, {
							text : "异常总数",
							width : 100,
							dataIndex : 'LINE_CNT',
							align :'center',
							sortable : true
						}, {
							text : "计量异常数",
							width : 100,
							dataIndex : 'LINE_CNT_1',
							align :'center',
							sortable : true
						}, {
							text : "用电异常数",
							width : 100,
							dataIndex : 'LINE_CNT_2',
							align :'center',
							sortable : true
						}, {
							text : "终端异常数",
							width : 100,
							dataIndex : 'LINE_CNT_3',
							align :'center',
							sortable : true
						}, {
							text : "专变异常户数",
							width : 100,
							dataIndex : 'LINE_CNT_4',
							align :'center',
							sortable : true
						}, {
							text : "公变异常户数",
							width : 100,
							dataIndex : 'LINE_CNT_5',
							align :'center',
							sortable : true
						}, {
							text : "低压异常户数",
							width : 100,
							dataIndex : 'LINE_CNT_6',
							align :'center',
							sortable : true
						}],
			/*	x : 5,//距离边框距离
				y : 40,//距离边框距离
*/				
				disableSelection : false,//值为TRUE，表示禁止选择行
				loadMask : true,
				viewConfig : {
					trackOver : true,
					stripeRows : true
				},
				dockedItems: [{
				        xtype: 'pagingtoolbar',
				        store: Linestore,   
				        dock: 'bottom',
				        displayInfo: true
				    }]
			});
		/**-------------------暂时不需要的Store------------------**/
/*	Ext.define('runState',{
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
	*/
    Ext.define('LineNoModel',{
    	extend : 'Ext.data.Model',
    	fields:["ORG_NAME","ORG_NO","ORG_TYPE"]
    });
    
    var LineorgStore = Ext.create('Ext.data.Store',{
    	model : 'LineNoModel',
    	proxy : {
    		type : 'ajax',
    		url  : 'measAnCountAction!queryTgOrgNo',
    		reader : {
    			root : 'tgOrgNoList'
    		}
		}
    });
    
	LineorgStore.load({
		params :{
			orgNo : LOGGEDORGNO,
			orgType : LOGGEDLEVEL
		}
	});
	
     var queryOrgType=LOGGEDLEVEL;
     
	 var lINE_formpanel_2 = Ext.create('Ext.form.Panel', {
				title : '查询条件',
				border : false,
				columnWidth : .3,
				autoScroll : true,
				bodyStyle : 'padding:10px 0px 10px 10px',
				items : [{
							xtype : 'combo',
							fieldLabel : '供电单位',
							id : 'lineOrgCombox',
							name : 'lineOrgCombox',
							queryMode : 'local',
							store : LineorgStore,
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
							id : 'lineStatCombox',
							xtype : 'datefield',
							name : 'lineStatCombox',
							fieldLabel : '统计日期',
							format : 'Y-m-d',
							maxValue : new Date(),
							value: Ext.Date.add(new Date(), Ext.Date.DAY, -1),
							margin : '10 10 10 0'
						},{
							xtype : 'textfield',
							id : 'lineTextField',
							fieldLabel : '线路名称',
							emptyText : '请输入线路名称',
							margin : '10 10 10 0'
						}, {
							xtype : 'button',
							text : '查询',
							align : 'center',
							width : 80,
							margin : '10 10 10 150',
							handler : function() {
								Linestore.proxy.extraParams = {
									lineId : Ext.getCmp('lineTextField').getValue(),
									statDate : Ext.Date.format((Ext.getCmp('lineStatCombox').getValue()), 'Y-m-d'),
									orgNo : Ext.getCmp('lineOrgCombox').getValue(),
									orgType : queryOrgType
								};
								Linestore.currentPage = 1;
								Linestore.load({
											start : 0
										});
							}
						}]
			});		
	Ext.Date.patterns = {
		ISO8601Long : "Y-m-d H:i:s",
		ISO8601Short : "Y-m-d",
		ShortDate : "n/j/Y",
		LongDate : "l, F d, Y",
		FullDateTime : "l, F d, Y g:i:s A",
		MonthDay : "F d",
		ShortTime : "g:i A",
		LongTime : "g:i:s A",
		SortableDateTime : "Y-m-d\\TH:i:s",
		UniversalSortableDateTime : "Y-m-d H:i:sO",
		YearMonth : "F, Y"
	};
	
	var Linepanel_2 = Ext.create('Ext.panel.Panel',{
			title : '线路异常信息',
			region :'north',
			border : true,
			split: true,
			minHeight: 30,
            collapsible: true,
            floatable: false,
			height : 220,
			layout : 'column',
			items:[Linegrid,lINE_formpanel_2]
	});
	
	Ext.define('lineGridModel', {
				extend : 'Ext.data.Model',
				fields : ["EXCEPT_TYPE_NAME", 'EVENT_NAME', 'EVENT_LEVEL_NAME','DATA_SRC','CONS_NAME','CONS_NO','CONS_SORT_NAME','ALARM_DATE',
						'FIRST_ALARM_DATE', 'RESUME_DATE','FIRST_RESUME_DATE','RESUME_DAY_CNT','TMNL_ASSET_NO','TERMINAL_ADDR','ASSET_NO']
	});
	
	var lineGridStore = Ext.create('Ext.data.Store', {
				model : 'lineGridModel',
				proxy : {
					// 异步获取数据，这里的URL可以改为任何动态页面，只要返回JSON数据即可
					type : 'ajax',
					url : 'measAnCountAction!queryLineDetailInfo',
					reader : {
						root : 'lineInfoList',
						totalProperty: 'totalCount'
					}
				}
	});
	
	var lineInfoGridPanel = Ext.create('Ext.grid.Panel', {
				id : 'tgInfoGridPanel',
				store : lineGridStore,
				title : '线路异常信息明细',
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
				        store: lineGridStore,   
				        dock: 'bottom',
				        displayInfo: true
				    }]
			});	
	
	var LinepicPanel = Ext.create('Ext.panel.Panel',{
		html : '<div style="width:960px; height:500px; margin:0 auto;" id="LineInfo"></div>',
		region : 'center',
		title : '线路异常信息',
		autoScroll : true,
		layout : 'fit',
		border : false
	});
	
	var tabPanel = Ext.createWidget('tabpanel', {
		activeTab : 0,
		region : 'center',
		items : [LinepicPanel,lineInfoGridPanel]
	});
	var mainPanel = Ext.create('Ext.panel.Panel',{
			layout : 'border',
			border :true,
			items:[Linepanel_2,tabPanel]
	});
	renderModel(mainPanel,"按线路统计查询");
});
