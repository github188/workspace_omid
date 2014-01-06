var DEFAULT_PAGE_SIZE = 50; // 分页条数
var DEFAULT_TIMEOUT = 3 * 60 * 1000; // 默认超时

// 请求超时设置为3分钟
Ext.Ajax.timeout = DEFAULT_TIMEOUT;
Ext.QuickTips.init();

   /**
	 * @param {}
	 *            panel 要渲染到主页面的控件
	 * @param {}
	 *            modelname 模块名称
	 * @description 将模块渲染到主页面中
	 */
	var renderModel = function(panel ,modelname){
		var parent = Ext.getCmp(modelname);
		if (!parent) {
			Ext.MessageBox.alert('错误', '未取到相应的模块名');
			return;
		}
		parent.add(panel);
		parent.doLayout();
	}
	
	
	/**
	 * 打开页面的方法 需要传入title, url, tabpanel, iconCls
	 */
	var openTab = function(config){
		var tabpanel = config.tabpanel;
		if (!tabpanel)
			tabpanel = Ext.getCmp('mainTabPanel');
			
		var tab = tabpanel.getComponent(config.title);
		if (tab) {
			tabpanel.setActiveTab(tab);
		} else {
			var p = new Ext.Panel({
						title : config.title,
						closable : true,
						isOpenTree : config.isOpenTree,
						iconCls : config.iconCls,
						autoScroll : true,
						layout : 'fit',
						id : config.title,
						loader : {
							url : config.url,
							loadMask : 'Loading...',
							scripts : true,
							autoLoad : true
						}
					});
			var addtabpanel = tabpanel.add(p).show();
			tabpanel.setActiveTab(p);	
		}
	}

Ext.onReady(function(){
	var mainViewPort = new Ext.Viewport({
		minWidth : 600,
		layout : 'border',
		items : [new Ext.TabPanel({
			id : 'mainTabPanel',
			region : 'center',
			activeItem : 0,
			border : false,
			items : [{
				title : '首页',
				border : false,
				layout : 'fit',
				loader : {
					url : 'homepage.jsp', scripts : true, autoLoad : true
					 
				}
			}]
		}),Ext.create("Ext.panel.Panel",{
			region : 'north',
			height : 64,
			border : false,
			bodyBorder : false,
			layout : 'border',
			items : [{
				region : 'west',
				width : 710,
				border : false,
				html : '<div style="width:710px;height:64px;background-image:url(./img/images/logo.jpg)"></div>'
			},{
				region : 'center',
				bodyStyle : 'background : #009492;',
				border : false
			},{
				region : 'east',
				width : 135,
				bodyStyle : 'background : #009492;',
				border : false,
				items : [{
					border : false,
					height : 46,
					bodyStyle : 'background : #009492;'
				},{
					border : false,
					bodyStyle : 'background : transparent;',
					html : '<a href="#" onclick=openTab({title:"待办事项",url:"./exceHand/awaitAlarm.jsp"})><div style="width: 16px;float: left;"><img src="./images/menu/note-todo-list.png" style="width: 16px;height: 16px ;cursor:pointer;"></div> <div style="width: 50px;float: left; text-align: center;color: white; cursor:pointer;">待办事项</div></a>' +
							'<div style="width: 16px;float: left;margin-left: 5px"><img src="./images/menu/sign-out.png" style="width: 16px;height: 16px;cursor:pointer;"></div> <div style="width: 30px;float: left; text-align: left;color: white; cursor:pointer;">注销</div>'
				}]
// items : [{
// xtype : 'button',
// margin : '41 0 0 10',
// text : '待办事项'
// },{
// xtype : 'button',
// margin : '41 0 0 15',
// text : '注销'
// }]
			}]
		})
		,new Ext.Panel({
			region : 'west',
			minWidth: 150,
			maxWidth: 300,
			split: true,
			animCollapse: true,
			collapsible: true,
			width : 200,
			layout: 'accordion',
			layoutConfig:{
                animate: true
            },
            items : [{
            	autoScroll: true,
            	border: false,
            	id : 'intelDiagTreeNode',
            	title : '基础数据管理'
            },{
            	autoScroll: true,
            	border: false,
            	id : 'onlineMoniTreeNode',
            	title : '供用电综合服务'
            },{
            	autoScroll: true,
            	border: false,
            	id : 'exceHandTreeNode',
            	title : '智能用电分析'
            },{
            	autoScroll: true,
            	border: false,
            	id : 'statQueryTreeNode',
            	title : '数据挖掘分析'
            },{
            	autoScroll: true,
            	border: false,
            	id : 'systManaTreeNode',
            	title : '用电实时监控'
            }]
		})]
	});
	
	Ext.define("TreeNode",{
		extend : 'Ext.data.Model',
		fields : ['id','text','leaf','iconCls','qtip','attributes','children']
	});
	
	Ext.Ajax.request({
		url : 'pMenuAction.action',
		params : {
		
		},
		success : function(response) {
			var result = Ext.decode(response.responseText);
			
			var intelDiagTreeNode = result.intelDiagTreeNode;
			var onlineMoniTreeNode = result.onlineMoniTreeNode;
			var exceHandTreeNode = result.exceHandTreeNode;
			var statQueryTreeNode = result.statQueryTreeNode;
			var systManaTreeNode = result.systManaTreeNode;
			
			
			/**
			 * 基础数据管理菜单
			 */
			var intelDiagTreePanel = menuTree({
				rootText : '基础数据管理',
				model : 'TreeNode',
				data : intelDiagTreeNode
			});
			Ext.getCmp('intelDiagTreeNode').add(intelDiagTreePanel);
			
			/**
			 * 供用电综合服务菜单
			 */
			var onlineMoniTreePanel = menuTree({
				rootText : '供用电综合服务',
				model : 'TreeNode',
				data : onlineMoniTreeNode
			});
			Ext.getCmp('onlineMoniTreeNode').add(onlineMoniTreePanel);
			
			/**
			 * 智能用电分析菜单
			 */
			var exceHandTreePanel = menuTree({
				rootText : '智能用电分析',
				model : 'TreeNode',
				data : exceHandTreeNode
			});
			Ext.getCmp('exceHandTreeNode').add(exceHandTreePanel);
			
			/**
			 * 数据挖掘分析菜单
			 */
			var statQueryTreePanel = menuTree({
				rootText : '数据挖掘分析',
				model : 'TreeNode',
				data : statQueryTreeNode
			});
			Ext.getCmp('statQueryTreeNode').add(statQueryTreePanel);
			
			/**
			 * 用电实时监控菜单
			 */
			var systManaTreePanel = menuTree({
				rootText : '用电实时监控',
				model : 'TreeNode',
				data : systManaTreeNode
			});
			Ext.getCmp('systManaTreeNode').add(systManaTreePanel);
		}
	});
	/**
	 * 菜单树
	 */
	var menuTree = function(config){
		var rootText = config.rootText;
		var data = config.data;
		var menuStore = Ext.create('Ext.data.TreeStore',{
			model : config.model,
			proxy : {
				type : 'memory',
				data : data
			},
			root : {
				text : rootText,
				leaf : false,
				expanded: true
			}
		});
		
		var tree = Ext.create("Ext.tree.Panel", {
			border : false,
			width : 190,
			rootVisible : false,
			height : 200,
			store : menuStore,
			listeners : {
				'itemclick' : function(view,record){
					var r = record;
					if(Ext.isEmpty(r.data.attributes.url)){
						Ext.Msg.alert('提示','菜单的url不能为空!');
						return ;
					}
					openTab({
						title : r.data.attributes.title,
						url : r.data.attributes.url,
						tabpanel : Ext.getCmp('mainTabPanel'),
						iconCls : r.data.iconCls
					});
				}
			}
		});
		
		return tree;
	}
	
	/*
	 * 处理GIS悬浮框在Tab页切换时的显示/隐藏状态
	 * 
	 * 陈锋
	 */
	Ext.getCmp('mainTabPanel').on("tabchange", hide_window);
	
	function hide_window (tabPanel,newTab) {
		control_win = Ext.getCmp('gis_panel_win');
        if (control_win == undefined){
        	return
        }
// console.log("ddd"+newTab.id);
        if (newTab.id != "异常处理定位") {
            control_win.hide();
        } else{
            control_win.show();
// console.log('i should show it');
        };

    };	
})