 
Ext.onReady(function() {

    Ext.define('taiquList', {
    	  extend: 'Ext.data.Model',
    	  fields: ['TG_NAME','TG_NO','ORG_NAME','INST_ADDR' ]    	    
    	});

  	var  taiquStore = Ext.create('Ext.data.Store', {
  		model: 'taiquList',
  		proxy: {
  			type: 'ajax',
  			url: '../awaitAlarm/flowPrintAction!TG.action',
  			reader: {
  				root: 'list',
  				type: 'json'
  			}
  		}
  		,autoLoad: true
  		, listeners : { 'load' : function(store, records, options) {
  	   	  Ext.getCmp('taiquorgno').setText(   store.first().data.ORG_NAME   , false);
  	   	  Ext.getCmp('taiquno').setText(   store.first().data.TG_NO   , false);
  	   	  Ext.getCmp('taiquname').setText(   store.first().data.TG_NAME   , false);
  	   	  Ext.getCmp('taiquaddr').setText(   store.first().data.INST_ADDR   , false);
		 }
  		}
  	});
  	taiquStore.removeAll();
  	taiquStore.getProxy().extraParams = {
  		task_id: task_id
     };
  	taiquStore.load();
  	
	
    var taiqupanel = Ext.create( 'Ext.panel.Panel', { 
        width: 800,
        height: 120,
    	region : 'center',
    	title : "异常处理工单",
    	items : [{
    			xtype : 'container',
    			layout : 'column',
    			defaults : {
    				columnWidth : 0.25,
    				labelAlign : "right",
    				margin : '10 0 10 0'
    			},
    			items : [{
    						xtype:'label',
    						text : '供电单位:'    						 
    					},
    					{
    						xtype:'label',
    						id:'taiquorgno',
    						text : '' 
    					},{
    						xtype:'label',
    						text : '台区编号:'   
    					},{
    						xtype:'label',
    						id:'taiquno',
    						text : ''
    					}]
    				}, {
                		xtype:'container',
    	                layout:'column',
    	                defaults:{
    						columnWidth : 0.25,
    						labelAlign : "right",
    	    				margin : '10 0 10 0'
    					},
    	            	items:[ {
    						xtype:'label',
    						text : '台区名称:'    						 
    					},
    					{
    						xtype:'label',
    						id:'taiquname',
    						text : '' 
    					},{
    						xtype:'label',
    						text : '台区地址:'   
    					},{
    						xtype:'label',
    						id:'taiquaddr',
    						text : '' 
    					}
    					 ]
    			}]

    });
    
 
    Ext.define('flowdetailList', {
    	  extend: 'Ext.data.Model',
    	  fields: ['CONS_NO','ALARM_TYPE','ALARM_ID','ALARM_CODE','ALARM_SRC',
    	           'TASK_ID','EXCEPT_TYPE_NAME', 'TERMINAL_ADDR','CONS_NAME','TERMINAL_ID','METER_ID','ALARM_DATE','ASSET_NO','ELEC_ADDR']    	    
    	});

	var  flowdetaiStore = Ext.create('Ext.data.Store', {
		model: 'flowdetailList',
		proxy: {
			type: 'ajax',
			url: '../awaitAlarm/flowPrintAction!TaskDetail.action',
			reader: {
				root: 'detailList',
				type: 'json'
			}
		}
 		,autoLoad: true
	});
	flowdetaiStore.removeAll();
	flowdetaiStore.getProxy().extraParams = {
  		task_id: task_id
     };
	flowdetaiStore.load();
	
	
    var datagridpanel=Ext.create('Ext.grid.Panel', {
        title: '问题描述',
        region: "center",
		columnLines : true,
        store: flowdetaiStore,
        columns: [
            { header: '异常名称', align : 'center', dataIndex: 'EXCEPT_TYPE_NAME' , width:100},
            { header: '异常发生日期',align : 'center', dataIndex: 'ALARM_DATE', width:100},
            { header: '终端地址', align : 'center',dataIndex: 'TERMINAL_ADDR', width:100 },
            { header: '电能表资产号', align : 'center', dataIndex: 'ASSET_NO' , width:100},
            { header: '用户姓名', align : 'center', dataIndex: 'CONS_NAME' , flex:1},
            { header: '用户地址', align : 'center', dataIndex: 'ELEC_ADDR' , width:200 }
           
        ],
        width: 800
    });

    Ext.define('fankuiList', {
  	  extend: 'Ext.data.Model',
  	  fields: ['ORG_NAME','STAFF_NAME' ]    	    
  	});

	var  fankuiStore = Ext.create('Ext.data.Store', {
		model: 'fankuiList',
		proxy: {
			type: 'ajax',
			url: '../awaitAlarm/flowPrintAction!doResult.action',
			reader: {
				root: 'thingsList',
				type: 'json'
			}
		}
		,autoLoad: true
		, listeners : { 'load' : function(store, records, options) {
	   	  Ext.getCmp('fankuiorgno').setText(   store.first().data.ORG_NAME   , true);
	   	  Ext.getCmp('fankuiname').setText(   store.first().data.STAFF_NAME   , true);
		 }
		}
	});
	fankuiStore.removeAll();
	fankuiStore.getProxy().extraParams = {
  		task_id: task_id
     };
	fankuiStore.load();
	
    
    
    
    
    

    var fankuipanel = Ext.create('Ext.panel.Panel', { 
        width: 800,
        height: 300,
    	border : true,
    	layout : 'auto' ,
    	region : 'center',
    	title : "处理反馈",
    	items : [{
    			xtype : 'container',
    			layout : 'column',
    			defaults : {
    				columnWidth : 0.25,
    				labelAlign : "right",
    				margin : '10 0 10 0'
    			},
    			items : [{
    						xtype:'label',
    						text : '处理单位:'    						 
    					},
    					{
    						xtype:'label',
    						id:'fankuiorgno',
    						text : ''   
    					},{
    						xtype:'label',
    						text : '处理人:'   
    					},{
    						xtype:'label',
    						id:'fankuiname',
    						text : ''   
    					}]
    				}, {
                		xtype:'container',
    	                layout:'column',
    	                defaults:{
    						columnWidth : 0.25,
    						labelAlign : "right",
    						margin : '10 0 10 0'
    					},
    	            	items:[ {
    						xtype:'label',
    						text : '处理日期:'    						 
    					},
    					{
    						xtype:'label',
    						text : ''   
    					},{
    						xtype:'label',
    						text : '处理结果:'   
    					},{
    						xtype:'label',
    						text : ''   
    					}
    					 ]
    			}, {
            		xtype:'container',
	                layout:'column',
	                defaults:{
						columnWidth : 0.25,
						labelAlign : "right",
						margin : '10 0 10 0'
					},
	            	items:[ {
						xtype:'label',
						text : '处理意见:'    						 
					} ,{
						xtype:'label',
						text : ' '    						 
					}  ,{
						xtype:'label',
						text : ' '    						 
					} 
					 ,{
							xtype:'label',
							text : ' '    						 
						} 
					 ]
			},{
        		xtype:'container',
                layout:'column',
                hight:100,
                defaults:{
					columnWidth : 1,
					labelAlign : "right" ,
					margin : '10 0 10 0'
				},
            	items:[ {
					xtype:'textarea',
					text : ' ' 
				}  
				 ]
						},{
				    		xtype:'container',
				            layout:'column',
				            hight:30,
				            defaults:{
								columnWidth : .2,
								labelAlign : "center"
							},
				        	items:[  {
								xtype:'label',
								text : ' '    						 
							} ,{
								xtype:'label',
								text : ' '    						 
							} ,{
								xtype : 'button',
								text : '打印' ,
								width:80,
								margin : '10 10 10 10',
								handler : function() { 
									window.print();
								}
							} ,{
								xtype:'label',
								text : ' '    						 
							} ,{
								xtype:'label',
								text : ' '    						 
							}   
							 ]
					}]

    });
	  Ext.create('Ext.Panel', {
						   region : 'center',
		                   width: 800,
		                   height: 800,
		                   border : false,
		                  layout: {
		                        type: 'vbox',
		                        align: 'center'
		                  },
		                   renderTo: 'grid-example',
		                   items : [taiqupanel,datagridpanel,fankuipanel]
		              });

});
