Ext.onReady(function(){
	
	var elecAnalyseNorthPanel = Ext.create('Ext.panel.Panel',{
		title : '用电分析',
		region : 'north',
		height : 200,
		layout : 'border',
		
		border : false,
		//html : 'ksdjksjadfksdjkfjsdkjf'
	});
	
	
	var elecAnalyseWestPanel = Ext.create('Ext.panel.Panel',{
		title : '查询结果',
		region : 'west',
		width : 300,
		
		//layout: 'fit'
		
	});
	
	var nddlzfbPanel = Ext.create('Ext.panel.Panel',{
		title : '年度电量总分比',
		layout : 'border',
		border : false
		
	});
	
	var tjkjPanel = Ext.create('Ext.panel.Panel',{
		title : '占统计口径内总量比重',
		layout : 'border',
		border : false
		
	});
	var zzlPanel = Ext.create('Ext.panel.Panel',{
		title : '增长率',
		layout : 'border',
		border : false
		
	});
	
	var zzgxlPanel = Ext.create('Ext.panel.Panel',{
		title : '增长贡献率',
		layout : 'border',
		border : false
		
	});
	
	
	var elecAnalyseCenterPanel = Ext.create('Ext.tab.Panel',{
		region : 'center',
		//layout: 'fit',
		activeTab : 0 ,
		items : [nddlzfbPanel,tjkjPanel,zzlPanel,zzgxlPanel]
	});
	
	
	var elecAnalyseBottomPanel = Ext.create('Ext.panel.Panel',{
		layout : 'border',
		region : 'center',
    	border : false,
    	items : [elecAnalyseWestPanel,elecAnalyseCenterPanel]
    });
	
	
	var elecAnalysePanel = Ext.create('Ext.panel.Panel',{
    	layout : 'fit',
    	items : [elecAnalyseNorthPanel,elecAnalyseBottomPanel]
    });
	
	
	
	
	renderModel(elecAnalysePanel,"用电分析");
	
	
	
	
});
