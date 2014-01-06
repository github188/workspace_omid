Ext.require(['Ext.form.*', 'Ext.grid.*', 'Ext.toolbar.Paging', 'Ext.data.*']);

Ext.application({});
Ext.onReady(function() {

	Ext.define('tmnlData', {
				extend : 'Ext.data.Model',
				fields : [{
							name : 'stat_id',
							type : 'string'
						}, {
							name : 'org_no',
							type : 'string'
						}, {
							name : 'terminal_type_code',
							type : 'string'
						}, {
							name : 'stat_date',
							type : 'string'
						}]
			});

	// 创建数据源
	var store = Ext.create('Ext.data.Store', {
				// 分页大小
				pageSize : 2,
				model : 'tmnlData',

				proxy : {
					// 异步获取数据，这里的URL可以改为任何动态页面，只要返回JSON数据即可
					type : 'ajax',
					url : '../TmnlExcAction!queryOrgNolist.action',
					reader : {
						root : 'tmnlList',
						type : 'json'
					}
				}

				//,autoLoad : true
			});
		
			
			
			
			
	var formPanel = Ext.create('Ext.form.Panel', {
		renderTo : Ext.getBody(),
		xtype : "panel",
		title : "终端异常事件统计",
		width : 1024,
		height : 150,
		layout : "auto",
		id:'tmnlForm',
		items : [{
			xtype : "fieldset",
			title : "查询条件",
			layout : "auto",
			height : 100,
			items : [{
						xtype : "container",
						title : "",
						labelWidth : 100,
						labelAlign : "right",
						layout : "column",
						height : 60,
						items : [{
									labelAlign:'right',
									xtype : "textfield",
									fieldLabel : "供电单位",
									name : "org_no",
									emptyText : ''
								}, {
									labelAlign:'right',
									xtype : "textfield",
									fieldLabel : "终端地址",
									name : "TERMINAl_ADDR"
								}

						]

					}, {
						xtype : "container",
						title : "",
						labelWidth : 100,
						labelAlign : "right",
						layout : "column",
						height : 60,
						items : [{
									labelAlign:'right',
									xtype : "datefield",
									fieldLabel : "发生时间",
									name : "START_DATE"
								}, {
									labelAlign:'right',
									xtype : "datefield",
									fieldLabel : "到",
									name : "END_DATE"
								}, {
									xtype : "button",
									text : "查  询",
									width : 80,
									waitMsg : '查询中。。。',
									margin : '0 0 0 80',
									handler : function() {
										store.load({
										 params:{
												pn:1,pageSize:1
											},
											page:1
										});
//										form=Ext.getCmp('tmnlForm').getForm().getValues();
//										form.pn=1;
//										form.pageSize=1;
//										xxx = Ext.encode(form);
//										
//										
//										Ext.Ajax.request({
//											url : '../TmnlExcAction!queryTmnlExc.action',
//											params:{
//												pn:1,pageSize:1
//											},
//											method:'POST',
//											success : function(response) {
//												var result = Ext.decode(response.responseText);
//												//var list = result.tmnlList;
//												
//											}
//											
//										});
										
//										
//										 this.up('form').getForm().submit({
//										 type :"ajax",
//										 url :
//										 '../TmnlExcAction!queryTmnlExc.action',
//										 params:{pn:1,pageSize:1},
//										 waitMsg: 'Loading...',
//										 method:'post',
//										 success: function(response) {
//																									
//										 store.loadPage(1);
//										 },failure: function(response) {
//										 
//										// tmnlList=Ext.decode(response.response
//										 alert(action);
//										 }
//
//										 });

									}
								}

						]

					}

			]

		}]

	});

	Ext.create('Ext.grid.Panel', {
				renderTo : Ext.getBody(),
				xtype : "panel",
				title : "终端异常信息",
				width : 1024,
				height : 400,
				layout : "auto",
				store : store,

				columns : [{
							header : "序列",
							sortable : true,
							resizable : true,
							dataIndex : "stat_id",
							width : 200
						}, {
							header : "供电单位",
							sortable : true,
							resizable : true,
							dataIndex : "org_no",
							width : 200
						}, {
							header : "发生时间",
							sortable : true,
							resizable : true,
							dataIndex : "stat_date",
							width : 200
						}],
				bbar : Ext.create('Ext.PagingToolbar', {
							store : store,
							displayInfo : true,
							displayMsg : '显示 {0} - {1} 条，共计 {2} 条',
							emptyMsg : "没有数据"
						})

			});

});
