/*Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', './ext4/examples/ux');
Ext.require([
    'Ext.ux.form.MultiSelect'
]);*/

Ext.onReady(function() {  
	
	/*************供电管理单位模型************/
	Ext.define('vcmOrgNoModel', {  
		extend : 'Ext.data.Model',
		fields:["ORG_NO", "ORG_NAME"]
	});
	
	var eleManaOrgStore = Ext.create('Ext.data.Store', {
		model : 'vcmOrgNoModel',
		proxy : {
			type : 'ajax',
			url : 'groupModelManageAction!queryTgOrgNo.action',
			reader : {
				root : 'vcmTgOrgNoList',
				type : 'json'
			 }
			}
		});
	eleManaOrgStore.load({
				params : {
					vcmOrgNo : '34101'
				}
			});
	
	/*********************客户群管理************************/	
	var customGroupNameField = new Ext.form.TextField({
		fieldLabel : '客户群名称',
	    readOnly : false,
  		labelSeparator : '',
		labelAlign : 'right',
		labelWidth : 70,
		width:190
	});
	/*********************新建客户群************************/
	var vipGroupAddPanel=Ext.create('Ext.form.Panel',{//新建客户群面板
		//region:'north',
		layout:'absolute',
		width:300,
		height:300,
		//title:'群模型管理',
		items: [{
            x: 10,        
            y: 10,         
            xtype:'label',
            text: ' 客户群名称'    
        },{
            x: 80,         
            y: 10,        
            xtype : 'textfield',
            width:140,
      		//id : 'MEAS_ORG',
            displayField: 'ORG_NAME',
	        //store: TgorgStore,
	        //queryMode: 'local',
	        typeAhead: true,
	        //valueField:'ORG_NO',
	        //value :'34101'
        },{
            x: 260,        
            y: 10,         
            xtype:'label',
            text: '建立人'    
        },{
            x: 340,         
            y: 10,        
            xtype : 'textfield',
            width:140,
      		//id : 'MEAS_ORG',
            //displayField: 'ORG_NAME',
	        //store: TgorgStore,
	        //queryMode: 'local',
	        typeAhead: true,
	        //valueField:'ORG_NO',
	        //value :'34101'
        },{
            x: 10,        
            y: 40,         
            xtype:'label',
            text: '群生成日期'    
        },{
            x: 80,         
            y: 40,        
            xtype : 'combo',
            width:140,
            //id : 'MEAS_STATE_DATE',
            xtype : 'datefield',
            value : new Date(),
            format: 'Y-m-d'
        },{
            x: 260,        
            y: 40,         
            xtype:'label',
            text: '群用途类型'    
        },{
            x: 340,         
            y: 40,        
            xtype : 'combo',
            width:140,
      		//id : 'MEAS_ORG',
            //displayField: 'ORG_NAME',
	        //store: TgorgStore,
	        queryMode: 'local',
	        typeAhead: true,
	        //valueField:'ORG_NO',
	        //value :'34101'
        },{
            x: 10,        
            y: 70,         
            xtype:'label',
            text: ' 群用途描述'    
        },{
            x: 80,         
            y: 70,        
            xtype : 'textarea',
            width:400,
            hight:100,
      		//id : 'MEAS_ORG',
            displayField: 'ORG_NAME',
	        //store: TgorgStore,
	        //queryMode: 'local',
	        typeAhead: true,
	        //valueField:'ORG_NO',
	        //value :'34101'
        },{
            x: 10,        
            y: 160,         
            xtype:'label',
            text: '群类型'    
        },{
            x: 80,         
            y: 160,        
            xtype : 'combo',
            width:140,
      		//id : 'MEAS_ORG',
            //displayField: 'ORG_NAME',
	        //store: TgorgStore,
	        queryMode: 'local',
	        typeAhead: true,
	        //valueField:'ORG_NO',
	        //value :'34101'
        },{
            x: 260,        
            y: 160,         
            xtype:'label',
            text: '关联群模型'    
        },{
            x: 340,         
            y: 160,        
            xtype : 'combo',
            width:140,
      		//id : 'MEAS_ORG',
            //displayField: 'ORG_NAME',
	        //store: TgorgStore,
	        queryMode: 'local',
	        typeAhead: true,
	        //valueField:'ORG_NO',
	        //value :'34101'
        },{         
            x: 80,        
            y: 190,
            width : 30,
            xtype : 'button',
            text : '确定',
            align : 'center',
            
            listeners: {
                click: function() {
        	//this.close();
                },
            }
        },{         
            x: 340,        
            y: 190,
            width : 30,
            xtype : 'button',
            text : '取消',
            align : 'center',
        }]  
		
		
	});
	
	
	var vipGroupChangePanel=Ext.create('Ext.form.Panel',{//修改客户群面板
		//region:'north',
		layout:'absolute',
		width:300,
		height:300,
		//title:'群模型管理',
		items: [{
            x: 10,        
            y: 10,         
            xtype:'label',
            text: ' 客户群名称'    
        },{
            x: 80,         
            y: 10,        
            xtype : 'textfield',
            width:140,
      		//id : 'MEAS_ORG',
            displayField: 'ORG_NAME',
	        //store: TgorgStore,
	        //queryMode: 'local',
	        typeAhead: true,
	        //valueField:'ORG_NO',
	        //value :'34101'
        },{
            x: 260,        
            y: 10,         
            xtype:'label',
            text: '建立人'    
        },{
            x: 340,         
            y: 10,        
            xtype : 'textfield',
            width:140,
      		//id : 'MEAS_ORG',
            //displayField: 'ORG_NAME',
	        //store: TgorgStore,
	        //queryMode: 'local',
	        typeAhead: true,
	        //valueField:'ORG_NO',
	        //value :'34101'
        },{
            x: 10,        
            y: 40,         
            xtype:'label',
            text: '群生成日期'    
        },{
            x: 80,         
            y: 40,        
            xtype : 'combo',
            width:140,
            //id : 'MEAS_STATE_DATE',
            xtype : 'datefield',
            value : new Date(),
            format: 'Y-m-d'
        },{
            x: 260,        
            y: 40,         
            xtype:'label',
            text: '群用途类型'    
        },{
            x: 340,         
            y: 40,        
            xtype : 'combo',
            width:140,
      		//id : 'MEAS_ORG',
            //displayField: 'ORG_NAME',
	        //store: TgorgStore,
	        queryMode: 'local',
	        typeAhead: true,
	        //valueField:'ORG_NO',
	        //value :'34101'
        },{
            x: 10,        
            y: 70,         
            xtype:'label',
            text: ' 群用途描述'    
        },{
            x: 80,         
            y: 70,        
            xtype : 'textarea',
            width:400,
            hight:100,
      		//id : 'MEAS_ORG',
            displayField: 'ORG_NAME',
	        //store: TgorgStore,
	        //queryMode: 'local',
	        typeAhead: true,
	        //valueField:'ORG_NO',
	        //value :'34101'
        },{
            x: 10,        
            y: 160,         
            xtype:'label',
            text: '群类型'    
        },{
            x: 80,         
            y: 160,        
            xtype : 'combo',
            width:140,
      		//id : 'MEAS_ORG',
            //displayField: 'ORG_NAME',
	        //store: TgorgStore,
	        queryMode: 'local',
	        typeAhead: true,
	        //valueField:'ORG_NO',
	        //value :'34101'
        },{
            x: 260,        
            y: 160,         
            xtype:'label',
            text: '关联群模型'    
        },{
            x: 340,         
            y: 160,        
            xtype : 'combo',
            width:140,
      		//id : 'MEAS_ORG',
            //displayField: 'ORG_NAME',
	        //store: TgorgStore,
	        queryMode: 'local',
	        typeAhead: true,
	        //valueField:'ORG_NO',
	        //value :'34101'
        },{         
            x: 80,        
            y: 190,
            width : 30,
            xtype : 'button',
            text : '确定',
            align : 'center',
            
            listeners: {
                click: function() {
        	//this.close();
                },
            }
        },{         
            x: 340,        
            y: 190,
            width : 30,
            xtype : 'button',
            text : '取消',
            align : 'center',
        }]  
		
		
	});
	
	var vipGroupMemberManaCtrlPanel=Ext.create('Ext.form.Panel',{//客户群成员管理控制面板
		region:'center',
		layout:'column',
		//title:'群模型管理',
		items: [{         
			columnWidth : 0.33,
            xtype : 'button',
            text : '删除群成员',
            align : 'center',
            
            listeners: {
                click: function() {
        	//this.close();
                },
            }
        },{         
        	columnWidth : 0.33,
            xtype : 'button',
            text : '添加群成员',
            align : 'center',
        },{         
        	columnWidth : 0.33,
            xtype : 'button',
            text : '确定',
            align : 'center',
        }]  
		
		
	});

   	var vipGroupMemberManaGridPanel = Ext.create('Ext.grid.Panel', {//显示客户群查询结果
		//layout:'fit',
		autoScroll : true,
		//verticalScrollerType: 'paginggridscroller',
        // do not reset the scrollbar when the view refreshs
        invalidateScrollerOnRefresh: false,
        store : store,
        selModel :selModel,

        
		columns : [
		           {
		        	   xtype: 'rownumberer',
		        	   flex: 0,
		        	   width: 30
		           },
		        {
					header : "客户群标示",
					sortable : true,
					resizable : true,
					dataIndex : "idxx",
					flex:1
				}, {
					header : "客户标示",
					sortable : true,
					resizable : true,
					dataIndex : "namexx",
					flex:1
				}, {
					header : "群对象标示",
					sortable : true,
					resizable : true,
					flex: 1,
					dataIndex : "organizationxx"
				}]
				
				
	});
	var vipGroupMemberScrPanel=Ext.create('Ext.form.Panel',{//新建客户群面板
		region:'north',
		layout:'fit',
		width:200,
		height:240,
		items: [vipGroupMemberManaGridPanel]  
		
		
	});
	var vipGroupMemberManaPanel=Ext.create('Ext.form.Panel',{//新建客户群面板
		layout:'border',
		width:300,
		height:300,
		items: [vipGroupMemberScrPanel,vipGroupMemberManaCtrlPanel]  
		
		
	});
   	
   	
	var vipGroupManaSearchPanel=Ext.create('Ext.form.Panel',{//客户群查询面板
		height : 90,
		region : 'north',
		border : false,
		layout : 'auto',
		frame: true,
		items : [{
				xtype : 'container',
				layout : 'column',
				defaults : {
					columnWidth : 0.33,
					labelAlign : "right",
			//		margin : '6 0 6 0'
				},
				items : [{							
							xtype:'combo',
							fieldLabel : '供电管理单位',
							multiSelect : false,
							queryMode : 'local',
							store : eleManaOrgStore,
							displayField : 'ORG_NAME',
							valueField : 'ORG_NO',
							value :'34101',
							emptyText : '--请输入--',
							blankText : '--请输入--',
							editable : false,
							anchor : '100%',

						},
						
						
						customGroupNameField,
						
						
						
						
						{
						//	columnWidth : 0.33,
							xtype:'combo',
							fieldLabel : '群用途类型',
							//name : 'flow_status_code',
							//store : statQuery.flowFlagingStore,
							//displayField : 'NAME',
							//valueField : 'VALUE',
							multiSelect : false,
							//queryMode : 'local',
							// flex : 1,
							editable : false,
							anchor : '100%',
							
						},
						
						{         
			                //x: 80,        
			                //y: 100,
							//width : 10,
							columnWidth : 0.2,
			                xtype : 'button',
			                
			                text : '查询',
			                anchor: '70%',
			                margin : '6 20 6 30' ,
			                //align : 'center',
			                /**handler:function(){
			                	Tgstore.proxy.extraParams={
			                			orgNo : Ext.getCmp('MEAS_ORG').getValue(),
			                			statDate : Ext.Date.format((Ext.getCmp('MEAS_STATE_DATE').getValue()),'Y-m-d'),
			                			tgId : Ext.getCmp('MEAS_TG_NAME').getValue()
			            		};
			            		Tgstore.currentPage = 1;
			            		Tgstore.load({
			            			start :0
			            		});
			                }*/
			            },
			            //customGroupIncreaseButton,
						
						{       
			         	columnWidth : 0.2,
			                //x: 80,        
			                //y: 100,
			                //width : 100,
			            	margin : '6 30 6 30' ,
			            	width:30,
			                xtype : 'button',
			                anchor: '60%',
			                text : '新增',
			                
			                
			                listeners: {
			                    click: function() {
			                        // this == the button, as we are in the local scope
			        		Ext.create('Ext.window.Window', {
								modal : true,
								closeAction : 'hide',
								height : 300,
								width : 500,
								resizable : false,
								title : '新建客户群',
								layout : 'fit',
								items : [vipGroupAddPanel]
							}).show();
			                    },
			                }
			                
			                
			                //align : 'center',
			                /**handler:function(){
			                	Tgstore.proxy.extraParams={
			                			orgNo : Ext.getCmp('MEAS_ORG').getValue(),
			                			statDate : Ext.Date.format((Ext.getCmp('MEAS_STATE_DATE').getValue()),'Y-m-d'),
			                			tgId : Ext.getCmp('MEAS_TG_NAME').getValue()
			            		};
			            		Tgstore.currentPage = 1;
			            		Tgstore.load({
			            			start :0
			            		});
			                }*/
			            },
						
						{    
			            	columnWidth : 0.2,
			            	margin : '6 30 6 30' ,
			                //x: 80,        
			                //y: 100,
			                width : 60,
			                xtype : 'button',
			                anchor: '60%',
			                text : '删除',
			                //align : 'center',
			                /**handler:function(){
			                	Tgstore.proxy.extraParams={
			                			orgNo : Ext.getCmp('MEAS_ORG').getValue(),
			                			statDate : Ext.Date.format((Ext.getCmp('MEAS_STATE_DATE').getValue()),'Y-m-d'),
			                			tgId : Ext.getCmp('MEAS_TG_NAME').getValue()
			            		};
			            		Tgstore.currentPage = 1;
			            		Tgstore.load({
			            			start :0
			            		});
			                }*/
			            },
						
						{      
			            	columnWidth : 0.2,
			            	margin : '6 30 6 20' ,
			                //x: 80,        
			                //y: 100,
			                width : 60,
			                xtype : 'button',
			                anchor: '60%',
			                text : '修改',
			                listeners: {
			                    click: function() {
			                        // this == the button, as we are in the local scope
			        		Ext.create('Ext.window.Window', {
								modal : true,
								height : 300,
								width : 500,
								resizable : false,
								title : '修改客户群',
								layout : 'fit',
								items : [vipGroupChangePanel]
							}).show();
			                    },
			                }
		},
		
		{      
        	columnWidth : 0.2,
        	margin : '6 0 6 0' ,
            //x: 80,        
            //y: 100,
            width : 120,
            xtype : 'button',
            text : '关联群成员',
            listeners: {
                click: function() {
                    // this == the button, as we are in the local scope
    		Ext.create('Ext.window.Window', {
				modal : true,
				height : 300,
				width : 500,
				resizable : false,
				title : '关联群成员',
				layout : 'fit',
				items : [vipGroupMemberManaPanel]
			}).show();
                },
            }
}]

				}]
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
			    }
		}
	});
	
	var data=[ [1, 'EasyJWeb','EasyJF','www.easyjf.com'],
	           [2, 'jfox', 'huihoo','www.huihoo.org'],
	           [3, 'jdon', 'jdon','<a href="./B/2.jsp">2.jsp</a>'],
	           [4, 'springside', 'springside','\<a href="./B/2.jsp"\>2.jsp\</a\>'] ];
	
	
	var store= Ext.create('Ext.data.ArrayStore',{fields:[{name:'idxx'},{name:'namexx'},{name:'organizationxx'},{name:'homepagexx'}],data:data});

	           //store.load(testStore);
	           
	       	var vipGroupManaSearchResultPanel = Ext.create('Ext.grid.Panel', {//显示客户群查询结果
	    		region : 'center',
	    		title : '查询结果',
	    		autoScroll : true,
	    		//verticalScrollerType: 'paginggridscroller',
	            // do not reset the scrollbar when the view refreshs
	            invalidateScrollerOnRefresh: false,
	            store : store,
	            selModel :selModel,
       
	            
	    		columns : [
	    		           {
	    		        	   xtype: 'rownumberer',
	    		        	   flex: 0,
	    		        	   width: 30
	    		           },
	    		        {
	    					header : "客户群名称",
	    					sortable : true,
	    					resizable : true,
	    					dataIndex : "idxx",
	    					flex:1
	    				}, {
	    					header : "建立人",
	    					sortable : true,
	    					resizable : true,
	    					dataIndex : "namexx",
	    					flex:1
	    				}, {
	    					header : "群生成日期",
	    					sortable : true,
	    					resizable : true,
	    					flex: 1,
	    					dataIndex : "organizationxx"
	    				},{
	    					header : "群用途类型",
	    					sortable : true,
	    					resizable : true,
	    					flex: 1,
	    					dataIndex : "homepagexx"
	    				},
	    				{
	    					header : "群类型",
	    					sortable : true,
	    					resizable : true,
	    					flex: 1,
	    					dataIndex : "homepagexx"
	    				},
	    				{
	    					header : "刷新周期",
	    					sortable : true,
	    					resizable : true,
	    					flex: 1,
	    					dataIndex : "homepagexx"
	    				},
	    				{
	    					header : "刷新模式",
	    					sortable : true,
	    					resizable : true,
	    					flex: 1,
	    					dataIndex : "homepagexx"
	    				}]
	    				
	    				
	    	});
	       	//testStore.load();
	
	/**var vipGroupManaSearchResultPanel=Ext.create('Ext.form.Panel',{
		region:'center',
		title:'查询结果',
		items:[resultGrid
		       ]
		
		
	});
	
	*
	*/
	
	var vipGroupManaPanel=Ext.create('Ext.form.Panel',{
		region:'west',
		width:500,
		title:'客户群查询',
		collapsible: true,
	      floatable: false,
	    autoScroll: true,
		items:[vipGroupManaSearchPanel,vipGroupManaSearchResultPanel
		       ]
		
		
	});
	
	/*********************模型管理部分***********************/
	
	
	
	/*****************查询结果模型****************/
	Ext.define('vcmModelQueryResult', {   
		extend : 'Ext.data.Model',
		fields:['P_MODEL_CODE','PS_ORG_NO', 'NAME','CREATOR_NO','CREATE_TIME','START_DATE','STOP_PERSON_NO','STOP_DATE','STOP_REASON','GROUP_TYPE_CODE']
	});
	
	var vcmModelQueryResultStore = Ext.create('Ext.data.Store', {
		model : 'vcmModelQueryResult',
		proxy : {
			type : 'ajax',
			url : 'groupModelManageAction!queryModel.action',
			reader : {
				root : 'queryModelList',
				type : 'json'
			 }
			}
		});
	
	
	var panel_model_form = Ext.create('Ext.form.Panel',{  
		//region :'north', 
		id : 'panel_model_form',
		name : 'panel_model_form',
	//	autoScroll : true,
		border : true,
		//split: true,
		  width:800,
		  height: 35,
	      layout: 'hbox',
	      items : [{
	    	  xtype : 'combo',
				labelWidth:80,
				fieldLabel : '供电管理单位',
				name : 'eleManaOrg',
				id : 'eleManaOrg',
				width:200,
				queryMode : 'local',
				store : eleManaOrgStore,
				
				displayField : 'ORG_NAME',
				valueField : 'ORG_NO',
				value :'34101',
				emptyText : '--请输入--',
				blankText : '--请输入--',
				margin : '2 10 2 2'
			}, {
				xtype : 'textfield',
				labelWidth:60,
				fieldLabel : '模型名称',
				//name : 'eleAbnolConsNo',
				//id : 'eleAbnolConsNo',
				width:120,
				//emptyText : '----请输入----',
				//blankText : '----请输入----',
				margin : '2 10 2 2'

			}, {
				xtype : 'textfield',
				labelWidth:50,
				fieldLabel : '建立人',
				//name : 'eleAbnolTerminalAddr',
				//id : 'eleAbnolTerminalAddr',
				width:110,
				//emptyText : '----请输入----',
				//blankText : '----请输入----',
				margin : '2 5 2 2'
			}, {
				xtype : 'button',
				text : '查询',
				labelWidth:60,
				margin : '2 5 2 2 ', 
				handler:function(){ 
					vcmModelQueryResultStore.proxy.extraParams={
	            			vcmOrgNo : Ext.getCmp('eleManaOrg').getValue()
	        		};
					vcmModelQueryResultStore.load();
	            }
			},{
				xtype : 'button',
				text : '新增',
				labelWidth:60,
				//align : 'center',
				//width : 120,
				margin : '2 5 2 2',
				listeners : {
					click : function(){ 
				    Ext.create('Ext.window.Window', {
					modal : true,
					closeAction : 'hide',
					height :400,
					width : 550,
					resizable : true,
					title : '新建群模型',
					layout : 'fit',
					items : [add_model]
				}).show();
				}
			  }
			},{
				xtype : 'button',
				text : '删除',
				labelWidth:60,
				//align : 'center',
				//width : 120,
				margin : '2 5 2 2',
				listeners : {
					click : function(){ 
				    Ext.create('Ext.window.Window', {
					modal : true,
					height :400,
					width : 550,
					resizable : true,
					title : '删除群模型',
					layout : 'fit',
					//items : [add_model]
				}).show();
				}
			  }
			},{
				xtype : 'button',
				text : '修改',
				labelWidth:60,
				//align : 'center',
				//width : 120,
				margin : '2 5 2 2',
				listeners : {
					click : function(){ 
				    Ext.create('Ext.window.Window', {
					modal : true,
					height :400,
					width : 550,
					resizable : true,
					title : '修改群模型',
					layout : 'fit',
					items : [change_model]
				}).show();
				}
			  }
			},{
				xtype : 'button',
				text : '关联模型条件',
				labelWidth:60,
				//align : 'center',
				//width : 120,
				margin : '2 5 2 2',
				listeners : {
					click : function(){ 
				    Ext.create('Ext.window.Window', {
					modal : true,
					height :400,
					width : 550,
					resizable : true,
					title : '关联模型条件',
					layout : 'fit',
					items : [add_modelCondition]
				}).show();
				}
			  }
			}]
	});
	
	/***********************模型查询**************************/
	
	/*Ext.define('ModelManaOrgSt', {
		extend : 'Ext.data.Model',
		fields : [{
					name : 'VCM_ORG_NO',
					type : 'string'
				}, {
					name : 'VCM_ORG_NAME',
					type : 'string'
				}, {
					name : 'VCM_ORG_TYPE',
					type : 'string'
				}]
	});
	
	var eleManaOrgStore = Ext.create('Ext.data.Store', {
		model : 'orgSt',
		proxy : {
			type : 'ajax',
			url : 'eleAbnormalAnalyAction!queryOrgNolist.action',
			reader : {
				root : 'orgList',
				type : 'json'
			}
		}
			// autoLoad: true
		});
	orgStore.load({
				params : {
					orgNo : '34101'
				},
				callback: function(records, operation, success) {
					Ext.getCmp('eleAbnolOrgValue').setValue("34404");
				}
			});*/
	
	
	/**********************新增群模型模块***********************/
	var add_model=Ext.create('Ext.form.Panel',{
		layout:'absolute',
		width:300,
		height:300,
		items: [{
            x: 10,        
            y: 10,         
            xtype:'label',
            text: ' 供电管理单位',
        },{
            x: 80,         
            y: 10,        
            xtype : 'combo',
            width:140,
            id : 'eleManaUnit',
            name : 'eleManaUnit',
            //displayField: 'ORG_NAME',
	        //store: TgorgStore,
	        //queryMode: 'local',
	        typeAhead: true,
	        //valueField:'ORG_NO',
	        //value :'34101'
        },{
            x: 260,        
            y: 10,         
            xtype:'label',
            text: '模型名称'    
        },{
            x: 340,         
            y: 10,        
            xtype : 'textfield',
            width:140,
            id : 'modelName',
            name : 'modelName',
      		//id : 'MEAS_ORG',
            //displayField: 'ORG_NAME',
	        //store: TgorgStore,
	        //queryMode: 'local',
	        typeAhead: true,
	        //valueField:'ORG_NO',
	        //value :'34101'
        },{
            x: 10,        
            y: 40,         
            xtype:'label',
            text: '建立人'    
        },{
            x: 80,         
            y: 40,        
            xtype : 'textfield',
            width:140,
            id: 'buildMan',
            name: 'buildMan'
        },{
            x: 260,        
            y: 40,         
            xtype:'label',
            text: '群类型'    
        },{
            x: 340,         
            y: 40,        
            xtype : 'textfield',
            width:140,
            id: 'groupType',
            name: 'groupType',
      		//id : 'MEAS_ORG',
            //displayField: 'ORG_NAME',
	        //store: TgorgStore,
	        queryMode: 'local',
	        typeAhead: true,
	        //valueField:'ORG_NO',
	        //value :'34101'
        },{
            x: 10,        
            y: 70,         
            xtype:'label',
            text: '父模型标识'    
        },{
            x: 80,         
            y: 70,        
            xtype : 'combo',
            width:140,
            id : 'parentModelLable',
            name : 'parentModelLable'
        },{
            x: 260,        
            y: 70,         
            xtype:'label',
            text: '自定义SQL'    
        },{
            x: 340,         
            y: 70,        
            xtype : 'textfield',
            width:140,
      		id: 'customSQL',
      		name: 'customSQL',
            //displayField: 'ORG_NAME',
	        //store: TgorgStore,
	        //queryMode: 'local',
	        typeAhead: true
	        //valueField:'ORG_NO',
	        //value :'34101'
        },{
            x: 10,        
            y: 120,         
            xtype:'label',
            text: '说明'    
        },{
            x: 80,         
            y: 120,        
            xtype : 'textarea',
            width:400,
            hight:100,
      		id: 'explanation',
      		name: 'explanation',
            //displayField: 'ORG_NAME',
	        //store: TgorgStore,
	        //queryMode: 'local',
	        typeAhead: true,
	        //valueField:'ORG_NO',
	        //value :'34101'
        },{         
            x: 200,        
            y: 230,
            width : 30,
            xtype : 'button',
            text : '确定',
            align : 'center',
        },{         
            x: 300,        
            y: 230,
            width : 30,
            xtype : 'button',
            text : '取消',
            align : 'center',
        }]  
	});
	
	/**********************修改群模型模块***********************/
	var change_model=Ext.create('Ext.form.Panel',{
		layout:'absolute',
		width:300,
		height:300,
		items: [{
            x: 10,        
            y: 10,         
            xtype:'label',
            text: ' 供电管理单位',
        },{
            x: 80,         
            y: 10,        
            xtype : 'combo',
            width:140,
            id : 'eleManaUnit',
            name : 'eleManaUnit',
            //displayField: 'ORG_NAME',
	        //store: TgorgStore,
	        //queryMode: 'local',
	        typeAhead: true,
	        //valueField:'ORG_NO',
	        //value :'34101'
        },{
            x: 260,        
            y: 10,         
            xtype:'label',
            text: '模型名称'    
        },{
            x: 340,         
            y: 10,        
            xtype : 'textfield',
            width:140,
            id : 'modelName',
            name : 'modelName',
      		//id : 'MEAS_ORG',
            //displayField: 'ORG_NAME',
	        //store: TgorgStore,
	        //queryMode: 'local',
	        typeAhead: true,
	        //valueField:'ORG_NO',
	        //value :'34101'
        },{
            x: 10,        
            y: 40,         
            xtype:'label',
            text: '建立人'    
        },{
            x: 80,         
            y: 40,        
            xtype : 'textfield',
            width:140,
            id: 'buildMan',
            name: 'buildMan'
        },{
            x: 260,        
            y: 40,         
            xtype:'label',
            text: '群类型'    
        },{
            x: 340,         
            y: 40,        
            xtype : 'textfield',
            width:140,
            id: 'groupType',
            name: 'groupType',
      		//id : 'MEAS_ORG',
            //displayField: 'ORG_NAME',
	        //store: TgorgStore,
	        queryMode: 'local',
	        typeAhead: true,
	        //valueField:'ORG_NO',
	        //value :'34101'
        },{
            x: 10,        
            y: 70,         
            xtype:'label',
            text: '父模型标识'    
        },{
            x: 80,         
            y: 70,        
            xtype : 'combo',
            width:140,
            id : 'parentModelLable',
            name : 'parentModelLable'
        },{
            x: 260,        
            y: 70,         
            xtype:'label',
            text: '自定义SQL'    
        },{
            x: 340,         
            y: 70,        
            xtype : 'textfield',
            width:140,
      		id: 'customSQL',
      		name: 'customSQL',
            //displayField: 'ORG_NAME',
	        //store: TgorgStore,
	        //queryMode: 'local',
	        typeAhead: true
	        //valueField:'ORG_NO',
	        //value :'34101'
        },{
            x: 10,        
            y: 120,         
            xtype:'label',
            text: '说明'    
        },{
            x: 80,         
            y: 120,        
            xtype : 'textarea',
            width:400,
            hight:100,
      		id: 'explanation',
      		name: 'explanation',
            //displayField: 'ORG_NAME',
	        //store: TgorgStore,
	        //queryMode: 'local',
	        typeAhead: true,
	        //valueField:'ORG_NO',
	        //value :'34101'
        },{         
            x: 200,        
            y: 230,
            width : 30,
            xtype : 'button',
            text : '确定',
            align : 'center',
        },{         
            x: 300,        
            y: 230,
            width : 30,
            xtype : 'button',
            text : '取消',
            align : 'center',
        }]  
	});
	
	/**********************关联群模型条件模块***********************/
	
	var buildModelCondition=Ext.create('Ext.form.Panel',{
		region:'west',
		width:275,
		height:400,
		
		layout:'column',
		defaults : {
			labelAlign : "center",
			margin : '10 10 10 10'
		},
		//title:'群模型管理',
		items: [
		        {
			columnWidth : 0.3,
        	//margin : '6 30 6 20' ,
            xtype:'label',
            text: ' 条件名称',
        },
        {
        	columnWidth : 0.7,
        	//margin : '6 30 6 20' ,      
            xtype : 'textfield',
            width:140,
            //id : 'eleManaUnit',
            //name : 'eleManaUnit',
            //displayField: 'ORG_NAME',
	        //store: TgorgStore,
	        //queryMode: 'local',
	        typeAhead: true,
	        //valueField:'ORG_NO',
	        //value :'34101'
        },
        {
        	columnWidth : 0.3,
        	//margin : '6 30 6 20' ,        
            xtype:'label',
            text: '条件'    
        },{
        	columnWidth : 0.7,
        	//margin : '6 30 6 20' ,       
            xtype : 'textfield',
            width:140,
            //id : 'modelName',
            //name : 'modelName',
      		//id : 'MEAS_ORG',
            //displayField: 'ORG_NAME',
	        //store: TgorgStore,
	        //queryMode: 'local',
	        typeAhead: true,
	        //valueField:'ORG_NO',
	        //value :'34101'
        },
        {
        	columnWidth : 0.3,
        	//margin : '6 30 6 20' ,        
            xtype:'label',
            text: '比较值'    
        },{
        	columnWidth : 0.7,
        	//margin : '6 30 6 20' ,         
            xtype : 'textfield',
            width:140,
            //id: 'buildMan',
            //name: 'buildMan'
        },
        {
        	columnWidth : 0.3,
        	//margin : '6 30 6 20' ,          
            xtype:'label',
            text: '逻辑符号'    
        },{ 
        	columnWidth : 0.7,
        	//margin : '6 30 6 20' ,         
            xtype : 'combo',
            width:140,
            //id: 'groupType',
            //name: 'groupType',
      		//id : 'MEAS_ORG',
            //displayField: 'ORG_NAME',
	        //store: TgorgStore,
	        queryMode: 'local',
	        typeAhead: true,
	        //valueField:'ORG_NO',
	        //value :'34101'
        },
 {         
        	columnWidth : 0.5,
        	margin : '150 30 6 20' ,
            width : 30,
            xtype : 'button',
            text : '确定',
            align : 'center',
        },{         
        	columnWidth : 0.5,
        	margin : '150 30 6 20' ,
            xtype : 'button',
            text : '取消',
            align : 'center',
        }]  
	});	
	
   	var selectModelConditionGrid = Ext.create('Ext.grid.Panel', {
		//layout:'fit',
		region:'north',
		width:275,
		height:300,
		autoScroll : true,
		//verticalScrollerType: 'paginggridscroller',
        // do not reset the scrollbar when the view refreshs
        invalidateScrollerOnRefresh: false,
        store : store,
        selModel :selModel,

        
		columns : [
		           {
		        	   xtype: 'rownumberer',
		        	   flex: 0,
		        	   width: 30
		           },
		        {
					header : "模型条件",
					sortable : true,
					resizable : true,
					dataIndex : "idxx",
					flex:1
				}, {
					header : "条件",
					sortable : true,
					resizable : true,
					dataIndex : "namexx",
					flex:1
				}]
				
				
	});
	
   	var selectModelConditionButton = Ext.create('Ext.form.Panel',{
		//layout:'fit',
		region:'center',
		width:275,
		layout:'column',
		defaults : {
			labelAlign : "center",
			margin : '10 10 10 10'
		},
		//title:'群模型管理',
		items: [
 {         
        	columnWidth : 0.5,
        	margin : '15 30 6 20' ,
            width : 30,
            xtype : 'button',
            text : '删除',
            align : 'center',
        },{         
        	columnWidth : 0.5,
        	margin : '15 30 6 20' ,
            xtype : 'button',
            text : '确定',
            align : 'center',
        }]  
				
				
	});
   	
   	var selectModelCondition = Ext.create('Ext.form.Panel',{
   		region:'center',
		layout:'border',
		width:275,
		height:400,
		items: [selectModelConditionGrid,selectModelConditionButton]
				
				
	});
   	
   	
   	
	
	var add_modelCondition=Ext.create('Ext.form.Panel',{
		layout:'border',
		width:550,
		height:400,
		items: [buildModelCondition,selectModelCondition]  
	});
	
	
	var hh=Ext.create('Ext.panel.Panel',{
		height:35,
		width : 800,
		//autoScroll:true,
		layout:'fit',
		items:[panel_model_form]
	});
	
	    /************单选按钮************/
	var selModelManage = Ext.create('Ext.selection.CheckboxModel',{
		mode : 'SINGLE',
		/*listeners : {
		    select : function(t,rec,index,e) {
			    var tgId = rec.get('TG_ID');
			    var orgNo  = rec.get('ORG_NO');
			    var orgType = rec.get('ORG_TYPE');
			    var statDate = Ext.Date.format((Ext.getCmp('MEAS_STATE_DATE').getValue()),'Y-m-d');
				   tginfoQuery(tgId,orgNo,orgType,statDate);
			    }
		}*/
	});
	 var grid_model = Ext.create('Ext.grid.Panel', {
         forceFit: true,
         //region: 'center',
       //  verticalScrollerType: 'paginggridscroller',
         // do not reset the scrollbar when the view refreshs
         //invalidateScrollerOnRefresh: false,
        //stateful: true,
       
        // stateId: 'stateGrid',
         //autoScroll : true,
         store: vcmModelQueryResultStore,
         selModel : selModelManage,
         height : 200,
         width : 800,
         columns: [{
             text: '客户群模型',
             sortable: false,
             menuDisabled: true,
             flex: 1,
            // dataIndex: 'CP_NO'
         },{
             text: '供电单位',
             sortable: false,
             menuDisabled: true,
             flex: 1,
            // dataIndex: 'NAME'
         },{
             text: '模型名称',
             sortable: false,
             menuDisabled: true,
             flex: 1,
            // dataIndex: 'AREA_NO'
         },{
             text: '建立人',
             sortable: false,
             menuDisabled: true,
             flex: 1,
            // dataIndex: 'TERMINAL_ADDR'
         },{
             text: '建立时间',
             sortable: false,
             menuDisabled: true,
             flex: 1,
            // dataIndex: 'NAME'
         },{
             text: '启用时间',
             sortable: false,
             menuDisabled: true,
             flex: 1,
             //dataIndex: 'NAME'
         },{
             text: '停用人',
             sortable: false,
             menuDisabled: true,
             flex: 1,
            // dataIndex: 'NAME'
         },{
             text: '停用时间',
             sortable: false,
             menuDisabled: true,
             flex: 1,
            // dataIndex: 'NAME'
         },{
             text: '停用原因',
             sortable: false,
             menuDisabled: true,
             flex: 1,
             //dataIndex: 'NAME'
         },{
             text: '群类型',
             sortable: false,
             menuDisabled: true,
             flex: 1,
            // dataIndex: 'NAME'
         }],

     });

	 
	 
	/*var Panel_model_formAndGrid = Ext.create('Ext.panel.Panel',{
			layout : 'border',
			border :true,
			id : Panel_model_formAndGrid,
			name : Panel_model_formAndGrid,
			items: [panel_model_form,grid_model]
		});*/
		
	
	var panel_model_manage = Ext.create('Ext.panel.Panel',{  
		title : '模型管理',
		region :'north', 
		id : 'panel_model_manage',
		name : 'panel_model_manage',
		autoScroll : true,
		//overFlow : 'auto',
		border : true,
		
		 minHeight: 250,
	      collapsible: true,
	      items: [hh,grid_model]
	     // floatable: false,
	     
	});	
	
	
	
	/**************大客户管理面板**********/
	var vipConsManaCtrlPanel=Ext.create('Ext.form.Panel',{//用电用户管理控制面板
		region:'center',
		layout:'column',
		//title:'群模型管理',
		items: [{         
			columnWidth : 0.25,
            xtype : 'button',
            text : '删除用电用户',
            align : 'center',
            
            listeners: {
                click: function() {
        	//this.close();
                },
            }
        },{         
        	columnWidth : 0.25,
            xtype : 'button',
            text : '添加用电用户',
            align : 'center',
        }
        ,{         
        	columnWidth : 0.25,
            xtype : 'button',
            text : '同步用电用户',
            align : 'center',
        },{         
        	columnWidth : 0.25,
            xtype : 'button',
            text : '确定',
            align : 'center',
        }]  
		
		
	});
	
   	var vipConsManaGridPanel = Ext.create('Ext.grid.Panel', {//显示大客户用电用户查询结果
		//layout:'fit',
		autoScroll : true,
		//verticalScrollerType: 'paginggridscroller',
        // do not reset the scrollbar when the view refreshs
        invalidateScrollerOnRefresh: false,
        store : store,
        selModel :selModel,

        
		columns : [
		           {
		        	   xtype: 'rownumberer',
		        	   flex: 0,
		        	   width: 30
		           },
		        {
					header : "用户编号",
					sortable : true,
					resizable : true,
					dataIndex : "idxx",
					flex:1
				}, {
					header : "用户名称",
					sortable : true,
					resizable : true,
					dataIndex : "namexx",
					flex:1
				}, {
					header : "供电单位编号",
					sortable : true,
					resizable : true,
					flex: 1,
					dataIndex : "organizationxx"
				}, {
					header : "变电站标示",
					sortable : true,
					resizable : true,
					flex: 1,
					dataIndex : "organizationxx"
				}, {
					header : "台区标示",
					sortable : true,
					resizable : true,
					flex: 1,
					dataIndex : "organizationxx"
				}]
				
				
	});
	var vipConsScrPanel=Ext.create('Ext.form.Panel',{
		region:'north',
		layout:'fit',
		width:200,
		height:340,
		items: [vipConsManaGridPanel]  
		
		
	});
	var vipConsManaPanel=Ext.create('Ext.form.Panel',{
		layout:'border',
		width:300,
		height:300,
		items: [vipConsScrPanel,vipConsManaCtrlPanel]  
		
		
	});
	
	
	var panel_vcm_form = Ext.create('Ext.form.Panel',{  
		//region :'north', 
		id : 'panel_vcm_form',
		name : 'panel_vcm_form',
		autoScroll : true,
		//border : true,
		//split: true,
		  width : 900,
		  Height: 45,
	      //collapsible: true,
	      //floatable: false,
	     layout: 'hbox',
	      items : [{
				xtype : 'combo',
				fieldLabel : '供电管理单位',
				labelWidth : 80,
				width : 180,
				//name : 'eleAbnolOrgValue',
				//id : 'eleAbnolOrgValue',
				queryMode : 'local',
				//store : orgStore,
				//displayField : 'ORG_NAME',
				//valueField : 'ORG_NO',
				//emptyText : '----请输入----',
				//blankText : '----请输入----',
				margin : '2 10 2 2'
			}, {
				xtype : 'textfield',
				fieldLabel : '大客户类型',
				labelWidth : 70,
				width : 170,
				//name : 'eleAbnolConsNo',
				//id : 'eleAbnolConsNo',
				//emptyText : '----请输入----',
				//blankText : '----请输入----',
				margin : '2 10 2 2'

			}, {
				xtype : 'textfield',
				fieldLabel : '客户名称',
				labelWidth : 60,
				width : 140,
				//name : 'eleAbnolTerminalAddr',
				//id : 'eleAbnolTerminalAddr',
				//emptyText : '----请输入----',
				//blankText : '----请输入----',
				margin : '2 10 2 2'
			}, {
				xtype : 'button',
				text : '查询',
				labelWidth:60,
				//width : 80,
				margin : '2 5 2 2'
				
				//handler : function() {
					//queryEleAbnormalInfoFun();
					// queryEleCurveInfo('0011A');
				//}
			},{
				xtype : 'button',
				text : '导入',
				labelWidth:60,
				//width : 80,
				margin : '2 5 2 2'
				
				//handler : function() {
					//queryEleAbnormalInfoFun();
					// queryEleCurveInfo('0011A');
				//}
			},{
				xtype : 'button',
				text : '新增',
				labelWidth:60,
				//width : 80,
				margin : '2 5 2 2',
				listeners : {
					click : function(){ 
				    Ext.create('Ext.window.Window', {
					modal : true,
					closeAction : 'hide',
					height : 400,
					width : 500,
					resizable : false,
					title : '新增大客户',
					layout : 'fit',
					items : [add_VIP]
				}).show();
				}
			  }
					//handler : function() {
					//queryEleAbnormalInfoFun();
					// queryEleCurveInfo('0011A');
				//}
			},{
				xtype : 'button',
				text : '删除',
				labelWidth:60,
				//width : 80,
				margin : '2 5 2 2',
				listeners : {
					click : function(){ 
				    Ext.create('Ext.window.Window', {
					modal : true,
					height : 400,
					width : 500,
					resizable : false,
					title : '删除大客户',
					layout : 'fit',
//					items : [add_VIP]
				}).show();
				}
			  }
					//handler : function() {
					//queryEleAbnormalInfoFun();
					// queryEleCurveInfo('0011A');
				//}
			},{
				xtype : 'button',
				text : '关联用电用户',
				labelWidth:60,
				//width : 80,
				margin : '2 5 2 2',
				
	            listeners: {
	                click: function() {
	                    // this == the button, as we are in the local scope
	    		Ext.create('Ext.window.Window', {
					modal : true,
					height : 400,
					width : 500,
					resizable : false,
					title : '关联用电用户',
					layout : 'fit',
					items : [vipConsManaPanel]
				}).show();
	                },
	            }
	//handler : function() {
					//queryEleAbnormalInfoFun();
					// queryEleCurveInfo('0011A');
				//}
			}]
	});
	var add_model=Ext.create('Ext.form.Panel',{
		layout:'absolute',
		width:300,
		height:300,
		items: [{
            x: 10,        
            y: 10,         
            xtype:'label',
            text: ' 供电管理单位',
        },{
            x: 80,         
            y: 10,        
            xtype : 'combo',
            width:140,
            id : 'eleManaUnit',
            name : 'eleManaUnit',
            //displayField: 'ORG_NAME',
	        //store: TgorgStore,
	        //queryMode: 'local',
	        typeAhead: true,
	        //valueField:'ORG_NO',
	        //value :'34101'
        },{
            x: 260,        
            y: 10,         
            xtype:'label',
            text: '模型名称'    
        },{
            x: 340,         
            y: 10,        
            xtype : 'textfield',
            width:140,
            id : 'modelName',
            name : 'modelName',
      		//id : 'MEAS_ORG',
            //displayField: 'ORG_NAME',
	        //store: TgorgStore,
	        //queryMode: 'local',
	        typeAhead: true,
	        //valueField:'ORG_NO',
	        //value :'34101'
        },{
            x: 10,        
            y: 40,         
            xtype:'label',
            text: '建立人'    
        },{
            x: 80,         
            y: 40,        
            xtype : 'textfield',
            width:140,
            id: 'buildMan',
            name: 'buildMan'
        },{
            x: 260,        
            y: 40,         
            xtype:'label',
            text: '群类型'    
        },{
            x: 340,         
            y: 40,        
            xtype : 'textfield',
            width:140,
            id: 'groupType',
            name: 'groupType',
      		//id : 'MEAS_ORG',
            //displayField: 'ORG_NAME',
	        //store: TgorgStore,
	        queryMode: 'local',
	        typeAhead: true,
	        //valueField:'ORG_NO',
	        //value :'34101'
        },{
            x: 10,        
            y: 70,         
            xtype:'label',
            text: '父模型标识'    
        },{
            x: 80,         
            y: 70,        
            xtype : 'combo',
            width:140,
            id : 'parentModelLable',
            name : 'parentModelLable'
        },{
            x: 260,        
            y: 70,         
            xtype:'label',
            text: '自定义SQL'    
        },{
            x: 340,         
            y: 70,        
            xtype : 'textfield',
            width:140,
      		id: 'customSQL',
      		name: 'customSQL',
            //displayField: 'ORG_NAME',
	        //store: TgorgStore,
	        //queryMode: 'local',
	        typeAhead: true
	        //valueField:'ORG_NO',
	        //value :'34101'
        },{
            x: 10,        
            y: 120,         
            xtype:'label',
            text: '说明'    
        },{
            x: 80,         
            y: 120,        
            xtype : 'textarea',
            width:400,
            hight:100,
      		id: 'explanation',
      		name: 'explanation',
            //displayField: 'ORG_NAME',
	        //store: TgorgStore,
	        //queryMode: 'local',
	        typeAhead: true,
	        //valueField:'ORG_NO',
	        //value :'34101'
        },{         
            x: 200,        
            y: 230,
            width : 30,
            xtype : 'button',
            text : '确定',
            align : 'center',
        },{         
            x: 300,        
            y: 230,
            width : 30,
            xtype : 'button',
            text : '取消',
            align : 'center',
        }]  
	});
	
	var yy=Ext.create('Ext.panel.Panel',{
		height:45,
		width : 900,
		layout:'fit',
		items:[panel_vcm_form]
	});
	
	 var grid_vcm = Ext.create('Ext.grid.Panel', {
         forceFit: true,
         id : 'grid_vcm',
         name : 'grid_vcm',
         width : 900,
         height : 100,
         //region: 'center',
       //  verticalScrollerType: 'paginggridscroller',
         // do not reset the scrollbar when the view refreshs
         //invalidateScrollerOnRefresh: false,
        //stateful: true,
       //  store: store,
        // stateId: 'stateGrid',
        
         columns: [{
             text: '供电单位',
             sortable: false,
             menuDisabled: true,
             flex: 1,
            // dataIndex: 'CP_NO'
         },{
             text: '大客户',
             sortable: false,
             menuDisabled: true,
             flex: 1,
            // dataIndex: 'NAME'
         },{
             text: 'VIP标志',
             sortable: false,
             menuDisabled: true,
             flex: 1,
            // dataIndex: 'AREA_NO'
         },{
             text: 'VIP等级',
             sortable: false,
             menuDisabled: true,
             flex: 1,
            // dataIndex: 'TERMINAL_ADDR'
         }],
     });
	
	var panel_vcm = Ext.create('Ext.panel.Panel',{ 
		title : '大客户管理',
		region :'center',
		id : 'panel_vcm', 
		name : 'panel_vcm', 
		border : true,
		//width : 800,
		//split: true,
		//Height: 300,
	      collapsible: true,
	      floatable: false,
	      autoScroll: true,
		//height : 250,
		  //layout : 'fit',
		 items:[yy,grid_vcm]
		//items:[grid,formpanel_2]
	});
	
	
	
	
	
	
	
	
	
	
	var Panel_right = Ext.create('Ext.panel.Panel',{
		layout : 'border',
		border :true,
		region :'center',
		autoScroll:true,
		items:[panel_model_manage,panel_vcm]
	});
	
	
	
	
	
	var mainPanel = Ext.create('Ext.panel.Panel',{
		layout : 'border',
		border :true,
		autoScroll : true,
		items:[vipGroupManaPanel,Panel_right]
	});
	
renderModel(mainPanel,"客户群管理"); 
	
	});	
