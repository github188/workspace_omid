/**
 * @author jianghaihui
 * @date 2012-10-17
 */

//Ext.Loader.setConfig({enabled: true});
//Ext.Loader.setPath('Ext.ux', './ext4/examples/ux/');
//Ext.require([
//    'Ext.grid.*',
//    'Ext.data.*',
//    'Ext.util.*',
//    'Ext.toolbar.Paging',
//    'Ext.ux.PreviewPlugin',
//    'Ext.ModelManager',
//    'Ext.tip.QuickTipManager'
//]);
Ext.onReady(function() {
	var alarm_type = '01'
	var gOrgNo; 
	var gEventLevel;
	var gQueryDate;
	var gConsNo;
	var gTerminalAddr;
	var gFlowStatusCode;	
	var sConsNo;
	var sAlarmCode;
	var currentDate;
    var currentTime=''; 
    var intnum=1;
    var amArray=new Array('0','1');
    var show1='show1';
    var show2='';
    var numberdata=0;
   function getAppointDate(){
     //日期切换按钮
	var appointDate = Ext.create('Ext.Button',{
	    width:100,
		text: '查询指定日期数据',
	    handler: function() {
	    	var ss=selectModel.getSelection();
	    	if(Ext.isEmpty(ss)){
	    		Ext.Msg.alert('提示', '请选择异常事件');
	    		return;
	    	}
	    	var appointDateDataInfoPanel1 =  Ext.create('Ext.panel.Panel',{
				border : false,
				height:40,
				region:'north',
				layout:'fit',
				items:[{
					margin : '5 0 0 10',
			        xtype: 'radiogroup',
			        hideLabel: true,
			        columns: 2,
					vertical: true,
					id:'appointDateDataInfoPanel1Radiogroup',
			        items: [
			            { boxLabel: '异常发生日期', name: 'rb', inputValue: '1', checked: true,
			            	 listeners: {
			            	 	change:function(t,newValue,oldValue,e){
			            	 			if(newValue=='1'){
			            	 				Ext.getCmp('appointDateDataRadiogroup').setDisabled(false);
			            	 				Ext.getCmp('appointDateDataInfoDatefield').setDisabled(true);
			            	 			}
			            	 			else{
			            	 				Ext.getCmp('appointDateDataRadiogroup').setDisabled(true);
			            	 				Ext.getCmp('appointDateDataInfoDatefield').setDisabled(false);
			            	 			}
			            	 		}
			            	 }
			            },
			            { boxLabel: '指定查询日期', name: 'rb', inputValue: '2'}
			        ]
			    }]
			});
			
			var appointDateDataInfoPanel2 =  Ext.create('Ext.panel.Panel',{
				border : false,
				region:'center',
				layout:'column',
   	            items:[{
	   	            columnWidth:.5,
	   	            height:150,
	   	            margin : '10 10 10 10',
	   	            items:[{
	   	            	id:'appointDateDataRadiogroup',
				        xtype: 'radiogroup',
				        columns: 1,
				        vertical: true,
				        hideLabel: true,
				        layout:'fit',
				        items: []
	   	            }]
   	            },{
   	            	columnWidth:.5,
   	            	border : false,
	   	            items:[{
	   	            	id:'appointDateDataInfoDatefield',
	   	            	xtype:'datefield',
	   	            	hideLabel: true,
	   	            	width : 100,
						value : new Date(),
						format : 'Y-m-d',
						margin : '10 20 10 10',
						disabled:true
	   	            },{
	   	                xtype:'button',
	   	                width:70,
	   	                text: '查询',
	   	                margin : '50 0 0 40',
	   	                handler: function() {
	   	                	var cc=Ext.getCmp('appointDateDataInfoPanel1Radiogroup').getValue();
	   	                	if(cc.rb=='1'){
	   	                		var dd=Ext.getCmp('appointDateDataRadiogroup').getValue();
	   	                		if(Ext.isEmpty(dd)){
	   	                			Ext.Msg.alert('提示', '请选择异常发生日期');
	    							return;
	   	                		}
	   	                		queryElectroExceptionInfo(ss[0],dd.dateList);
	   	                	}
	   	                	else{
	   	                		queryElectroExceptionInfo(ss[0],Ext.getCmp('appointDateDataInfoDatefield').getRawValue());
	   	                	}
	   	                	win.close();
	   	                }
	   	            },{
	   	                  xtype:'button',
		   	              width:70,
		   	              text: '退出',
		   	              margin : '10 0 0 40',
		   	              handler: function() {
		   	                	win.close();
		   	           }
	   	            }]
   	            }]
			});
	       var dateList = ss[0].get('SAVE_ALARM_DATE').split(',','-1');
	       var flag=1;
	       if(dateList.length==1 && dateList[0]==''){
	       	  flag=0;
	       }
	       if(flag==1){
			   for(var i=0;i<dateList.length;i++){
			   	    var  elecDate = dateList[i].replace("/","-");
			   	    elecDate = elecDate.replace("/","-");
			   	    if(i==0){
			   	    	
				    	Ext.getCmp('appointDateDataRadiogroup').add({
				    		boxLabel: elecDate, name: 'dateList', inputValue: elecDate, checked: true,width:100
				    	});
			   	    }
			   	    else{
			   	    	Ext.getCmp('appointDateDataRadiogroup').add({
				    		boxLabel: elecDate, name: 'dateList', inputValue: elecDate,width:100
				    	});
			   	    }
			   }
	       }
	      
	       var win = Ext.create('Ext.window.Window', {
			       modal:true,
			       height:250,
			       width:300,
				   resizable:false,
			       title:'切换日期',
			       layout:'border',
			       items:[appointDateDataInfoPanel1,appointDateDataInfoPanel2]
			});
			win.showAt(500,100);
	    }
	});
	return appointDate;
	}
// njl


	var appointDate1 = Ext.create('Ext.Button', {
		text : '查询指定日期区间数据',
		handler : function() {
			var ss = selectModel.getSelection();
			if (Ext.isEmpty(ss)) {
				Ext.Msg.alert('提示', '请选择异常事件');
				return;
			}
			var appointDateDataInfoPanel11 = Ext.create('Ext.panel.Panel', {
						border : false,
						height : 40,
						region : 'north',
						layout : 'fit',
						items : [{
							margin : '5 0 0 10',
							xtype : 'radiogroup',
							hideLabel : true,
							columns : 2,
							vertical : true,
							id : 'appointDateDataInfoPanel1Radiogroup1',
							items : [{
								boxLabel : '异常发生日期',
								name : 'rb',
								inputValue : '1',
								checked : true,
								listeners : {
									change : function(t, newValue, oldValue, e) {
										if (newValue == '1') {
											Ext
													.getCmp('appointDateDataRadiogroup1')
													.setDisabled(false);
											Ext
													.getCmp('appointDateDataInfoDatefield1')
													.setDisabled(true);
											Ext
													.getCmp('appointDateDataInfoDatefield2')
													.setDisabled(true);
										} else {
											Ext
													.getCmp('appointDateDataRadiogroup1')
													.setDisabled(true);
											Ext
													.getCmp('appointDateDataInfoDatefield1')
													.setDisabled(false);
											Ext
													.getCmp('appointDateDataInfoDatefield2')
													.setDisabled(false);
										}
									}
								}
							}, {
								boxLabel : '指定查询日期',
								name : 'rb',
								inputValue : '2'
							}]
						}]
					});

			var appointDateDataInfoPanel21 = Ext.create('Ext.panel.Panel', {
				border : false,
				region : 'center',
				layout : 'column',
				items : [{
							columnWidth : .5,
							height : 150,
							margin : '10 10 10 10',
							items : [{
										id : 'appointDateDataRadiogroup1',
										xtype : 'radiogroup',
										columns : 1,
										vertical : true,
										hideLabel : true,
										layout : 'fit',
										items : []
									}]
						}, {
							columnWidth : .5,
							border : false,
							items : [{
										id : 'appointDateDataInfoDatefield1',
										xtype : 'datefield',
										hideLabel : true,
										width : 100,
										value : new Date(),
										format : 'Y-m-d',
										margin : '10 20 10 10',
										disabled : true
									}, {
										id : 'appointDateDataInfoDatefield2',
										xtype : 'datefield',
										hideLabel : true,
										width : 100,
										value : new Date(),
										format : 'Y-m-d',
										margin : '10 20 10 10',
										disabled : true
									}, {
										xtype : 'button',
										width : 70,
										text : '查询',
										margin : '50 0 0 40',
										handler : function() {

											var cc = Ext
													.getCmp('appointDateDataInfoPanel1Radiogroup1')
													.getValue();
											// alert(cc.rb);
											if (cc.rb == '1') {
												var dd = Ext
														.getCmp('appointDateDataRadiogroup1')
														.getValue();

												if (Ext.isEmpty(dd)) {
													Ext.Msg.alert('提示',
															'请选择异常发生日期');
													return;
												}
												queryElectroExceptionInfo(
														ss[0], dd.dateList);
											} else {
												amArray[0] = Ext.getCmp('appointDateDataInfoDatefield1').getRawValue();
												amArray[1] = Ext.getCmp('appointDateDataInfoDatefield2').getRawValue();
													if(show1=='good1' && show2!='good2'){
														show1 = 'show1';
												        show2 = '';
													 }else{
														 show1='';
														 show2='show2';
													 }
														
												queryElectroExceptionInfo(
														ss[0], amArray);
												intnum = 1;
												
											}
											win1.close();
										}
									},{
						  xtype:'button',
		   	              width:70,
		   	              text: '退出',
		   	              margin : '10 0 0 40',
		   	              handler: function() {
		   	              win.close();
		   	           }
					 }]
			}]
      });
			var dateList = ss[0].get('SAVE_ALARM_DATE').split(',', '-1');
			var flag = 1;
			if (dateList.length == 1 && dateList[0] == '') {
				flag = 0;
			}
			if (flag == 1) {
				for (var i = 0; i < dateList.length; i++) {
					var elecDate = dateList[i].replace("/", "-");
					elecDate = elecDate.replace("/", "-");
					if (i == 0) {
						Ext.getCmp('appointDateDataRadiogroup1').add({
									boxLabel : elecDate,
									name : 'dateList',
									inputValue : elecDate,
									checked : true
								});
					} else {
						Ext.getCmp('appointDateDataRadiogroup1').add({
									boxLabel : elecDate,
									name : 'dateList',
									inputValue : elecDate
								});
					}
				}
			}

								var win1 = Ext.create('Ext.window.Window', {
									modal : true,
									height : 250,
									width : 300,
									resizable : false,
									title : '切换日期',
									layout : 'border',
									items : [ appointDateDataInfoPanel11,
											appointDateDataInfoPanel21 ]
								});
								win1.show();
							}
						});

		// njl
		var before30Days = Ext.create('Ext.Button', {
			id : 'before30Days',
			text : '前30天',
			handler : function() {
				var ss = selectModel.getSelection();
				if (Ext.isEmpty(ss)) {
					Ext.Msg.alert('提示', '请选择异常事件');
					return;
				}
				if(show1=='good1' && show2 !='good2'){
				   show1='show1';
				}
				
				else{
					show2='show2';
				}
				for ( var i = 0; i < amArray.length - 1; i++) {
					if (amArray[0] == '0') {
						currentDate = Ext.Date.format(Ext.Date
								.add(Ext.Date.parse(currentDate, "Y-m-d"),
										Ext.Date.DAY, -28), "Y-m-d");
						next30Days.setDisabled(false);
						Ext.getCmp('abnormalEleChartPanel').removeAll();
						amArray[1] = currentDate;
						
						if (ss[0].get('ALARM_CODE') == '00105'
								|| ss[0].get('ALARM_CODE') == '00107') {
							query00105(ss[0], currentDate);
						}
					} else {
						if (intnum == 1) {
							currentDate = Ext.Date.format(Ext.Date.add(Ext.Date
									.parse(amArray[0], "Y-m-d"), Ext.Date.DAY,
									-28), "Y-m-d");
							next30Days.setDisabled(false);
							Ext.getCmp('abnormalEleChartPanel').removeAll();
							amArray[1] = currentDate;
							if (ss[0].get('ALARM_CODE') == '00105'
									|| ss[0].get('ALARM_CODE') == '00107') {
								query00105(ss[0], amArray[0]);
							}
						} else {
							currentDate = Ext.Date.format(Ext.Date.add(Ext.Date
									.parse(amArray[0], "Y-m-d"), Ext.Date.DAY,
									-28), "Y-m-d");
							amArray[0] = currentDate;
							next30Days.setDisabled(false);
							amArray[1] = currentDate;
							Ext.getCmp('abnormalEleChartPanel').removeAll();
							if (ss[0].get('ALARM_CODE') == '00105'
									|| ss[0].get('ALARM_CODE') == '00107') {
								query00105(ss[0], amArray[0]);

							}

						}
						intnum = intnum + 1;
					}
				}
			}
		});
	var next30Days = Ext.create('Ext.Button', {
			id : 'next30Days',
			text : '后30天',
			handler : function() {
				var ss = selectModel.getSelection();
				if (Ext.isEmpty(ss)) {
					Ext.Msg.alert('提示', '请选择异常事件');
					return;
				}
				if(show1=='good1' && show2 !='good2'){
				  show1='show1';
				}else{
				  show2='show2';
				}
			for ( var i = 0; i < amArray.length - 1; i++) {
				if (amArray[0] == '0') {
					currentDate = Ext.Date.format(Ext.Date.add(Ext.Date.parse(
							currentDate, "Y-m-d"), Ext.Date.DAY, 28), "Y-m-d");
					var dd = Ext.Date.add(Ext.Date.parse(currentDate, "Y-m-d"),
							Ext.Date.DAY, -1);
					if (dd > new Date()) {
						next30Days.setDisabled(true);
					}
					Ext.getCmp('abnormalEleChartPanel').removeAll();
					if (ss[0].get('ALARM_CODE') == '00105'
							|| ss[0].get('ALARM_CODE') == '00107') {
						query00105(ss[0], currentDate);
				 }
				} else {
						currentDate = Ext.Date.format(
								Ext.Date.add(Ext.Date
										.parse(amArray[1], "Y-m-d"),
										Ext.Date.DAY, 28), "Y-m-d");
						amArray[1] = currentDate;
						var dd = Ext.Date.add(Ext.Date.parse(amArray[1],
						"Y-m-d"), Ext.Date.DAY, -1);
						
						if(dd>new Date()){
							next30Days.setDisabled(true);
						}
						Ext.getCmp('abnormalEleChartPanel').removeAll();
						if (ss[0].get('ALARM_CODE') == '00105'
								|| ss[0].get('ALARM_CODE') == '00107') {
							query00105(ss[0], amArray[1]);
				}
     		}
		}
	}
});

var before30Days104 = Ext.create('Ext.Button',{
	   id:'before30Days104',
		text: '前30天',
	    handler: function() {
	    	var ss=selectModel.getSelection();
	    	if(Ext.isEmpty(ss)){
	    		Ext.Msg.alert('提示', '请选择异常事件');
	    		return;
	    	}
	    	currentDate = Ext.Date.format(Ext.Date.add(Ext.Date.parse(currentDate, "Y-m-d"), Ext.Date.DAY, -28),"Y-m-d");
	    	next30Days104.setDisabled(false);
	    	Ext.getCmp('abnormalEleChartPanel').removeAll();
	        if(ss[0].get('ALARM_CODE')=='00104'){
	    		query00104(ss[0],currentDate);
	    	}
	        else if(ss[0].get('ALARM_CODE')=='00106'){
	    		query00106(ss[0],currentDate);
	    	}
	       else if(ss[0].get('ALARM_CODE')=='00103'){
	    		query00103(ss[0],currentDate);
	    	}
	    }
	});
	
	var next30Days104 = Ext.create('Ext.Button',{
		id:'next30Days104',
		text: '后30天',
	    handler: function() {
	    	var ss=selectModel.getSelection();
	    	if(Ext.isEmpty(ss)){
	    		Ext.Msg.alert('提示', '请选择异常事件');
	    		return;
	    	}
	    	currentDate = Ext.Date.format(Ext.Date.add(Ext.Date.parse(currentDate, "Y-m-d"), Ext.Date.DAY, 28),"Y-m-d");
	    	var dd = Ext.Date.add(Ext.Date.parse(currentDate, "Y-m-d"), Ext.Date.DAY, -1);
	    	if(dd>new Date()){
	    		next30Days104.setDisabled(true);
	    	}
	    	Ext.getCmp('abnormalEleChartPanel').removeAll();
	         if(ss[0].get('ALARM_CODE')=='00104'){
	    		query00104(ss[0],currentDate);
	    	}
	         else if(ss[0].get('ALARM_CODE')=='00106'){
	    		query00106(ss[0],currentDate);
	    	}
	        else if(ss[0].get('ALARM_CODE')=='00103'){
	    		query00103(ss[0],currentDate);
	    	}
	    }
	});
	
		var graphshow = Ext.create('Ext.Button', {
				id : 'graphshow',
				text : '图形展示',
				handler : function() {
					 show1 = 'show1';
//					 if(show2 !=''){
//					  show2='';
//					 }
					var ss =selectModel.getSelection();
					Ext.getCmp('abnormalEleChartPanel').removeAll();
					if (ss[0].get('ALARM_CODE') == '00105'
							|| ss[0].get('ALARM_CODE') == '00107') {
						query00105(ss[0], currentDate);
					}
				}
			});

	var datashow = Ext.create('Ext.Button', {
				id : 'datashow',
				text : '数据展示',
				handler : function() {
					 show2 = 'show2';
					var ss =selectModel.getSelection();
					Ext.getCmp('abnormalEleChartPanel').removeAll();
					if (ss[0].get('ALARM_CODE') == '00105'
							|| ss[0].get('ALARM_CODE') == '00107') {
						query00105(ss[0], currentDate);
					}
				}
			});
		 

	// njl
function queryBefore7Days(){
var before7Days = Ext.create('Ext.Button',{
		id:'before7Days',
		text: '前7天',
		width:70,
	    handler: function() {
	    	var ss=selectModel.getSelection();
	    	if(Ext.isEmpty(ss)){
	    		Ext.Msg.alert('提示', '请选择异常事件');
	    		return;
	    	}
	    	//alert(currentDate);
	    	currentDate = Ext.Date.format(Ext.Date.add(Ext.Date.parse(currentDate, "Y-m-d"), Ext.Date.DAY, -5),"Y-m-d");
	    	next7Days.setDisabled(false);
	    	Ext.getCmp('abnormalEleChartPanel').removeAll();
            if(ss[0].get('ALARM_CODE')=='0010A'){
	    		query0010A(ss[0],currentDate);
	    	}
	    	
	    }
	});
	return before7Days;
}
  function queryNext7Days(){
	var next7Days = Ext.create('Ext.Button',{
		id:'next7Days',
		text: '后7天',
		width:70,
	    handler: function() {
	    	var ss=selectModel.getSelection();
	    	if(Ext.isEmpty(ss)){
	    		Ext.Msg.alert('提示', '请选择异常事件');
	    		return;
	    	}
	    	currentDate = Ext.Date.format(Ext.Date.add(Ext.Date.parse(currentDate, "Y-m-d"), Ext.Date.DAY, 5),"Y-m-d");
            var dd = Ext.Date.add(Ext.Date.parse(currentDate, "Y-m-d"), Ext.Date.DAY, -1);
	    	if(dd>new Date()){
	    		next7Days.setDisabled(true);
	    	}
	    	Ext.getCmp('abnormalEleChartPanel').removeAll();
            if(ss[0].get('ALARM_CODE')=='0010A'){
	    		query0010A(ss[0],currentDate);
	    	}
	    }
	});
	return next7Days;
}
	function queryElectroExceptionInfo(rec,alarmDate){
		Ext.getCmp('abnormalEleChartPanel').removeAll();
		//电压断缺相页面/*'00100'*/
		if(rec.get('ALARM_CODE')=='00100'|| rec.get('ALARM_CODE')=='00102'){
				Ext.define('BLPhase',{
					extend : 'Ext.data.Model',
					fields : [ 
							   "DATA_TIME",
							   "UA",
						       "UB",
						       "UC",
						       "IA",
					           "IB",
						       "IC",
						       "P",
						       "Q"
						      ]
				});
				
				var bLPhaseStore =   Ext.create('Ext.data.Store', {
					model : 'BLPhase',
					remoteSort : true,
					proxy : new Ext.data.MemoryProxy()	
				});
				
				var bLPhaseGridPanel = Ext.create('Ext.grid.Panel', {
						height: 300,
						width : Ext.getCmp('abnormalEleChartPanel').getWidth(),
						loadMask : true,
						border : false,
						store:bLPhaseStore,
						viewConfig: {
				            trackOver: false
				        },
						columnLines : true,
						columns : [{
									text : "时间",
									width : 120,
									dataIndex : 'DATA_TIME',
									align : 'center',
									sortable : true
								}, {
									text : "A相电压",
									width : 120,
									dataIndex : 'UA',
									align : 'center',
									sortable : false
								}, {
									text : "B相电压",
									width : 90,
									dataIndex : 'UB',
									align : 'center',
									sortable : true
								}, {
									text : "C相电压",
									width : 120,
									dataIndex : 'UC',
									align : 'center',
									sortable : false
								}, {
									text : "A相电流",
									width : 120,
									dataIndex : 'IA',
									align : 'center',
									sortable : false
								}, {
									text : "B相电流",
									width : 100,
									dataIndex : 'IB',
									align : 'center',
									sortable : false
								}, {
									text : "C相电流",
									width : 120,
									dataIndex : 'IC',
									align : 'center',
									sortable : false
								}, {
									text : "有功功率",
									width : 120,
									dataIndex : 'P',
									align : 'center',
									sortable : false
								}, {
									text : "无功功率",
									width : 120,
									dataIndex : 'Q',
									align : 'center',
									sortable : true
								}]
		
					});
				
				bLPhaseStore.removeAll();
								
				var toolbar=Ext.create('Ext.toolbar.Toolbar', {
					//height:10,
					width:Ext.getCmp('abnormalEleChartPanel').getWidth(),
				    dock: 'top',
				    items: [{xtype: 'tbfill'},'-',getAppointDate()]
				});
				Ext.getCmp('abnormalEleChartPanel').add(toolbar);
				Ext.getCmp('abnormalEleChartPanel').getEl().mask('正在查询...');
				Ext.Ajax.request({
			 	    url : 'measureExceptionAnalAction!queryBLPhaseInfo.action',					
					params : {
						'queryItems.meterId': rec.get('METER_ID'),
						'queryItems.dataTime' : alarmDate
					},
				success : function(response) {
					var result = Ext.decode(response.responseText);
					var resultList = result.resultList;
					if(!Ext.isEmpty(resultList)){
						bLPhaseStore.loadData(resultList);
						//生成电压数据
						var abnormalEleChartFitPanel = Ext.create('Ext.panel.Panel',{
							id:'abnormalEleChartFitPanel',
							border : false,
							height:300,
							width:Ext.getCmp('abnormalEleChartPanel').getWidth(),
							renderTo : Ext.getBody()
						});
						var xmlData = "<graph caption='电压曲线图'  xAxisName='时间' yAxisName='电压'  backgroundColor ='transparent' labelDisplay = 'WRAP' anchorRadius='3' decimalPrecision='0' formatNumberScale='2' bgcolor='F3f3f3' bgAlpha='70'  numvdivlines='5' showValues='0' divLineColor='CC3300' divLineIsDashed='1' chartRightMargin='50' labelStep='5'>";
						 xmlData += "<categories>";
						for(var i=0;i<resultList.length;i++){
							xmlData += "<category name='"+ resultList[i]['DATA_TIME'].substring(10,16)+"'  />";
							i=i+2;
						}
						xmlData += "</categories>";
						xmlData += "<dataset seriesName='A相'  color='#E7ED1A' anchorBorderColor='#E7ED1A' anchorBgColor='#E7ED1A'>";
						for(var i=0;i<resultList.length;i++){
							xmlData += "<set value='"+resultList[i]['UA']+"' />";
							i=i+2;
						}
						xmlData += "</dataset>";
						xmlData += "<dataset seriesName='B相' color='#3BC71A' anchorBorderColor='#3BC71A' anchorBgColor='#3BC71A'>";
						for(var i=0;i<resultList.length;i++){
							xmlData += "<set value='"+resultList[i]['UB']+"' />";
							i=i+2;
						}
						xmlData += "</dataset>";
						xmlData += "<dataset seriesName='C相' color='#BF1515' anchorBorderColor='#BF1515' anchorBgColor='#BF1515'>";
						for(var i=0;i<resultList.length;i++){
							xmlData += "<set value='"+resultList[i]['UC']+"' />";
							i=i+2;
						}
						xmlData += "</dataset></graph>";
						
						var picCharts = new FusionCharts("./FusionCharts-new/MSLine.swf",
									Math.random() * 0xffffff, Ext.getCmp('abnormalEleChartPanel').getWidth(), 300);		
						picCharts.setDataXML(xmlData);
						picCharts.render("abnormalEleChartFitPanel");
						
						Ext.getCmp('abnormalEleChartPanel').add(abnormalEleChartFitPanel);
						
						//生成电流数据
						var abnormalEleChartFitPanel2 = Ext.create('Ext.panel.Panel',{
							id:'abnormalEleChartFitPanel2',
							border : false,
							height:300,
							width:Ext.getCmp('abnormalEleChartPanel').getWidth(),
							renderTo : Ext.getBody()
						});
						var xmlData2 = "<graph caption='电流曲线图' xAxisName='时间' yAxisName='电流' labelDisplay = 'WRAP' anchorRadius='3' decimalPrecision='0' formatNumberScale='2' bgcolor='F3f3f3' bgAlpha='70' numvdivlines='5' showValues='0' divLineColor='CC3300' divLineIsDashed='1' chartRightMargin='50' labelStep='5'>";
						 xmlData2 += "<categories>";
						for(var i=0;i<resultList.length;i++){
							xmlData2 += "<category name='"+ resultList[i]['DATA_TIME'].substring(10,16)+"'  />";
							i=i+2;
						}
						xmlData2 += "</categories>";
						xmlData2 += "<dataset seriesName='A相' color='#E7ED1A' anchorBorderColor='#E7ED1A' anchorBgColor='#E7ED1A'>";
						for(var i=0;i<resultList.length;i++){
							xmlData2 += "<set value='"+resultList[i]['IA']+"' />";
							i=i+2;
						}
						xmlData2 += "</dataset>";
						xmlData2 += "<dataset seriesName='B相' color='#3BC71A' anchorBorderColor='#3BC71A' anchorBgColor='#3BC71A'>";
						for(var i=0;i<resultList.length;i++){
							xmlData2 += "<set value='"+resultList[i]['IB']+"' />";
							i=i+2;
						}
						xmlData2 += "</dataset>";
						xmlData2 += "<dataset seriesName='C相' color='#BF1515' anchorBorderColor='#BF1515' anchorBgColor='#BF1515'>";
						for(var i=0;i<resultList.length;i++){
							xmlData2 += "<set value='"+resultList[i]['IC']+"' />";
							i=i+2;
						}
						xmlData2 += "</dataset></graph>";
						
						var picCharts2 = new FusionCharts("./FusionCharts-new/MSLine.swf",
									Math.random() * 0xffffff, Ext.getCmp('abnormalEleChartPanel').getWidth(), 300);		
						picCharts2.setDataXML(xmlData2);
						picCharts2.render("abnormalEleChartFitPanel2");
						
						Ext.getCmp('abnormalEleChartPanel').add(abnormalEleChartFitPanel2);
					}
					Ext.getCmp('abnormalEleChartPanel').add(bLPhaseGridPanel);
					
					Ext.getCmp('abnormalEleChartPanel').doLayout();
					Ext.getCmp('abnormalEleChartPanel').getEl().unmask();
				},
				failure : function(response) {
					Ext.Msg.alert('提示', '查询失败1');
					Ext.getCmp('abnormalEleChartPanel').getEl().unmask();
				}

			});			
		}
		else if(rec.get('ALARM_CODE')=='00103'){
			next30Days104.setDisabled(false);
			query00103(rec,alarmDate)
		}
		else if(rec.get('ALARM_CODE')=='00104'){
			next30Days104.setDisabled(false);
			query00104(rec,alarmDate);
		}
		else if(rec.get('ALARM_CODE')=='00105'|| rec.get('ALARM_CODE')=='00107'){
			next30Days.setDisabled(false);
			before30Days.setDisabled(false);
			query00105(rec,alarmDate);
		}
		else if(rec.get('ALARM_CODE')=='00106'){
			query00106(rec,alarmDate);
		}
		else if(rec.get('ALARM_CODE')=='00108'||rec.get('ALARM_CODE')=='00109'||rec.get('ALARM_CODE')=='0010B'){
			abnormalRelaInfoTabpanel.setActiveTab(1);
			return;
		}
		else if(rec.get('ALARM_CODE')=='0010A'){
			query0010A(rec,alarmDate);
		}
	}
	
	function query00103(rec,alarmDate){	
		 var dataTime1='';
			Ext.define('eMpDayRead',{
					extend : 'Ext.data.Model',
					fields : [ 
							   "DATA_DATE",
						       "PAP_R",
						       "PAP_R1",
						       "PAP_R2",
						       "PAP_R3",
						       "PAP_R4",
						       "RAP_R",
						       "RAP_R1",
						       "RAP_R2",
						       "RAP_R3",
						       "RAP_R4"
						      ]
				});
				
				var eMpDayReadStore =   Ext.create('Ext.data.Store', {
					model : 'eMpDayRead',
					remoteSort : true,
					proxy : {
						type : 'ajax',
						url :  'measureExceptionAnalAction!queryeMpDayRead.action',
						reader : {
							type : 'json',
							root : 'resultList'
						}
					}	
				});
				
				var eMpDayReadGridPanel = Ext.create('Ext.grid.Panel', {
						//height: Ext.getCmp('abnormalEleChartPanel').getHeight(),
						//width : Ext.getCmp('abnormalEleChartPanel').getWidth(),
						loadMask : true,
						border : false,
						store:eMpDayReadStore,
						viewConfig: {
				            trackOver: false
				        },
						columnLines : true,
						columns : [{
									text : "时间",
									width : 120,
									dataIndex : 'DATA_DATE',
									align : 'center',
									sortable : true
								}, {
									text : "正向有功总能量示值 ",
									width : 120,
									dataIndex : 'PAP_R',
									align : 'center',
									sortable : false
								}, {
									text : "正向有功费率1示值 ",
									width : 90,
									dataIndex : 'PAP_R1',
									align : 'center',
									sortable : false
								}, {
									text : "正向有功费率2示值 ",
									width : 120,
									dataIndex : 'PAP_R2',
									align : 'center',
									sortable : false
								}, {
									text : "正向有功费率3示值 ",
									width : 120,
									dataIndex : 'PAP_R3',
									align : 'center',
									sortable : false
								}, {
									text : "正向有功费率4示值 ",
									width : 100,
									dataIndex : 'PAP_R4',
									align : 'center',
									sortable : false
								}, {
									text : "反向有功总能量示值 ",
									width : 120,
									dataIndex : 'RAP_R',
									align : 'center',
									sortable : false
								}, {
									text : "反向有功费率1示值",
									width : 120,
									dataIndex : 'RAP_R1',
									align : 'center',
									sortable : false
								}, {
									text : "反向有功费率2示值",
									width : 120,
									dataIndex : 'RAP_R2',
									align : 'center',
									sortable : true
								}, {
									text : "反向有功费率3示值",
									width : 120,
									dataIndex : 'RAP_R3',
									align : 'center',
									sortable : true
								}, {
									text : "反向有功费率4示值",
									width : 120,
									dataIndex : 'RAP_R4',
									align : 'center',
									sortable : true
								}]
					});
					
					eMpDayReadStore.proxy.extraParams={
						'queryItems.meterId': rec.get('METER_ID'),
						'queryItems.dataTime' : alarmDate,
						'queryItems.dataTime1': dataTime1
						
					};
					Ext.getCmp('abnormalEleChartPanel').getEl().mask('正在查询...');
					eMpDayReadStore.load({
						callback: function(records, operation, success) {
							Ext.getCmp('abnormalEleChartPanel').getEl().unmask();
						}
					});
					var toolbar=Ext.create('Ext.toolbar.Toolbar', {
						width:Ext.getCmp('abnormalEleChartPanel').getWidth(),
					    dock: 'top',
					    items: [{xtype: 'tbfill'},'-',before30Days104,'-',next30Days104]
					});
					Ext.getCmp('abnormalEleChartPanel').add(toolbar);
					Ext.getCmp('abnormalEleChartPanel').add(eMpDayReadGridPanel);

	}

	function  query00104(rec,alarmDate){
		var dataTime1='14';
			Ext.define('aCalcDayPower',{
					extend : 'Ext.data.Model',
					fields : [ 
							   "STAT_DATE",
						       "PAP_E",
						       "PAP_R_S",
						       "PAP_R_E"
						      ]
				});
				
				var aCalcDayPowerStore =   Ext.create('Ext.data.Store', {
					model : 'aCalcDayPower',
					remoteSort : true,
					proxy : new Ext.data.MemoryProxy()	
				});
				
				var aCalcDayPowerGridPanel = Ext.create('Ext.grid.Panel', {
						//loadMask : true,
				    	height : 180,
						border : false,
						store:aCalcDayPowerStore,
						viewConfig: {
				            trackOver: false
				        },
						columnLines : true,
						columns : [{
									text : "日期",
									width : 120,
									dataIndex : 'STAT_DATE',
									align : 'center',
									sortable : true
								}, {
									text : "正向有功总电能量 ",
									width : 120,
									dataIndex : 'PAP_E',
									align : 'center',
									sortable : false
								}, {
									text : "正向有功总能示值起码 ",
									width : 120,
									dataIndex : 'PAP_R_S',
									align : 'center',
									sortable : false
								}, {
									text : "正向有功总能示值止码 ",
									width : 120,
									dataIndex : 'PAP_R_E',
									align : 'center',
									sortable : false
								}]
					});
					
					var toolbar=Ext.create('Ext.toolbar.Toolbar', {
						width:Ext.getCmp('abnormalEleChartPanel').getWidth(),
					    dock: 'top',
					    items: [{xtype: 'tbfill'},'-',before30Days104,'-',next30Days104]
					});
					Ext.getCmp('abnormalEleChartPanel').add(toolbar);
					
					Ext.getCmp('abnormalEleChartPanel').getEl().mask('正在查询...');
					Ext.Ajax.request({
				 	    url : 'measureExceptionAnalAction!queryMeterFlyInfo.action',					
						params : {
							'queryItems.meterId': rec.get('METER_ID'),
							'queryItems.dataTime' : alarmDate,
							'queryItems.consType':rec.get('CONS_TYPE'),
							'queryItems.dataTime1':dataTime1
						},
					success : function(response) {
						var result = Ext.decode(response.responseText);
						var resultList = result.resultList;
						var resultList2 = result.resultList2;
						if(!Ext.isEmpty(resultList)){
							aCalcDayPowerStore.loadData(resultList);
							//生成电压数据
							var abnormalEleChartFitPanel = Ext.create('Ext.panel.Panel',{
								id:'aCalcDayPowerChar-1',
								border : false,
								height:300,
								width:Ext.getCmp('abnormalEleChartPanel').getWidth(),
								renderTo : Ext.getBody()
							});
							var xmlData = "<graph caption='电能量曲线图' xAxisName='日期' yAxisName='电能量' labelDisplay = 'WRAP' anchorRadius='3' decimalPrecision='0' formatNumberScale='2' bgcolor='F3f3f3' bgAlpha='70' numvdivlines='5' showValues='0' divLineColor='CC3300' divLineIsDashed='1' chartRightMargin='50' labelStep='8'>";
							 xmlData += "<categories>";
							for(var i=resultList.length-1;i>=0;i--){
								xmlData += "<category name='"+ resultList[i]['STAT_DATE']+"'  />";
								i=i-2;
							}
							xmlData += "</categories>";
							xmlData += "<dataset seriesName='正向有功总电能量'  color='#BF1515' anchorBorderColor='#BF1515' anchorBgColor='#BF1515'>";
							for(var i=resultList.length-1;i>=0;i--){
								xmlData += "<set value='"+resultList[i]['PAP_E']+"' />";
								i=i-3;
							}
							xmlData += "</dataset></graph>";
							
							var picCharts = new FusionCharts("./FusionCharts-new/ScrollLine2D.swf",
										Math.random() * 0xffffff, Ext.getCmp('abnormalEleChartPanel').getWidth(), 300);		
							picCharts.setDataXML(xmlData);
							picCharts.render("aCalcDayPowerChar-1");
							
							Ext.getCmp('abnormalEleChartPanel').add(abnormalEleChartFitPanel);
						}
						Ext.getCmp('abnormalEleChartPanel').add(aCalcDayPowerGridPanel);
						if(rec.get('CONS_TYPE')=='1'){
							Ext.define('BLPhase1',{
								extend : 'Ext.data.Model',
								fields : [ 
										   "DATA_TIME",
									       "IA",
								           "IB",
									       "IC"]
							});
							
							var bLPhaseStore =   Ext.create('Ext.data.Store', {
								model : 'BLPhase1',
								remoteSort : true,
								proxy : new Ext.data.MemoryProxy()	
							});
							
							var bLPhaseGridPanel = Ext.create('Ext.grid.Panel', {
									height: 300,
									width : Ext.getCmp('abnormalEleChartPanel').getWidth(),
									loadMask : true,
									border : false,
									store:bLPhaseStore,
									viewConfig: {
							            trackOver: false
							        },
									columnLines : true,
									columns : [{
												text : "时间",
												width : 120,
												dataIndex : 'DATA_TIME',
												align : 'center',
												sortable : true
											}, {
												text : "A相电流",
												width : 120,
												dataIndex : 'IA',
												align : 'center',
												sortable : false
											}, {
												text : "B相电流",
												width : 100,
												dataIndex : 'IB',
												align : 'center',
												sortable : false
											}, {
												text : "C相电流",
												width : 120,
												dataIndex : 'IC',
												align : 'center',
												sortable : false
											}]
					
										});
							if(!Ext.isEmpty(resultList2)){
								bLPhaseStore.loadData(resultList2);
								//生成电压数据
								var abnormalEleChartFitPanel = Ext.create('Ext.panel.Panel',{
									id:'aCalcDayPowerChar-2',
									border : false,
									height:300,
									width:Ext.getCmp('abnormalEleChartPanel').getWidth(),
									renderTo : Ext.getBody()
								});
								var xmlData2 = "<graph caption='电流曲线图' xAxisName='时间' yAxisName='电流' labelDisplay = 'WRAP' anchorRadius='3' decimalPrecision='0' formatNumberScale='2' bgcolor='F3f3f3' bgAlpha='70' numvdivlines='5' showValues='0' divLineColor='CC3300' divLineIsDashed='1' chartRightMargin='50' labelStep='5'>";
								 xmlData2 += "<categories>";
								for(var i=0;i<resultList2.length;i++){
									xmlData2 += "<category name='"+ resultList2[i]['DATA_TIME'].substring(10,16)+"'  />";
									i=i+1;
								}
								xmlData2 += "</categories>";
								xmlData2 += "<dataset seriesName='A相' color='#E7ED1A' anchorBorderColor='#E7ED1A' anchorBgColor='#E7ED1A'>";
								for(var i=0;i<resultList2.length;i++){
									xmlData2 += "<set value='"+resultList2[i]['IA']+"' />";
									i=i+1;
								}
								xmlData2 += "</dataset>";
								xmlData2 += "<dataset seriesName='B相' color='#3BC71A' anchorBorderColor='#3BC71A' anchorBgColor='#3BC71A'>";
								for(var i=0;i<resultList2.length;i++){
									xmlData2 += "<set value='"+resultList2[i]['IB']+"' />";
									i=i+1;
								}
								xmlData2 += "</dataset>";
								xmlData2 += "<dataset seriesName='C相' color='#BF1515' anchorBorderColor='#BF1515' anchorBgColor='#BF1515'>";
								for(var i=0;i<resultList2.length;i++){
									xmlData2 += "<set value='"+resultList2[i]['IC']+"' />";
									i=i+1;
								}
								xmlData2 += "</dataset></graph>";
								
								
								var picCharts2 = new FusionCharts("./FusionCharts-new/MSLine.swf",
											Math.random() * 0xffffff, Ext.getCmp('abnormalEleChartPanel').getWidth(), 300);		
								picCharts2.setDataXML(xmlData2);
								picCharts2.render("aCalcDayPowerChar-2");
								
								Ext.getCmp('abnormalEleChartPanel').add(abnormalEleChartFitPanel);
							}
							Ext.getCmp('abnormalEleChartPanel').add(bLPhaseGridPanel);
						}
						Ext.getCmp('abnormalEleChartPanel').doLayout();
						Ext.getCmp('abnormalEleChartPanel').getEl().unmask();
					},
					failure : function(response) {
						Ext.Msg.alert('提示', '查询失败2');
						Ext.getCmp('abnormalEleChartPanel').getEl().unmask();
					}
				});
		}
		
	function query00105(rec,alarmDate){
		      var dataTime1='';
    	      var dataTime2='';
		  if(alarmDate.length<10 ){
		    for(var i=0;i<alarmDate.length;i++){
		    		dataTime1=alarmDate[0];
		    		dataTime2=alarmDate[1];
		    	}
		    	var toolbar=Ext.create('Ext.toolbar.Toolbar', {
					width:Ext.getCmp('abnormalEleChartPanel').getWidth(),
				    dock: 'top',
				    items: ['-',graphshow,'-',datashow,{xtype: 'tbfill'},'-',appointDate1,'-',before30Days,'-',next30Days]
				    });
				Ext.getCmp('abnormalEleChartPanel').add(toolbar);
				Ext.getCmp('abnormalEleChartPanel').getEl().mask('正在查询...');
		 	Ext.Ajax.request({
			 	    url : 'measureExceptionAnalAction!queryRapExceptInfo.action',					
					params : {
						'queryItems.meterId': rec.get('METER_ID'),
						'queryItems.dataTime1' : dataTime1,
						'queryItems.dataTime2' : dataTime2,
						'queryItems.dataTime': rec.get('ALARM_DATE'),
						'queryItems.consType':rec.get('CONS_TYPE')
					},
				success : function(response) {
									
					Ext.define('eMpDayRead-5',{
						extend : 'Ext.data.Model',
						fields : [ 
								   "DATA_DATE",
								   "PAP_R",
								   "PRP_R",
							       "RAP_R",
							       "RRP_R"
							      ]
					});
					
					var dataStore =   Ext.create('Ext.data.Store', {
						model : 'eMpDayRead-5',
						remoteSort : true,
						proxy : new Ext.data.MemoryProxy()	
					});
					var columns = new Array();
					if(rec.get('ALARM_CODE')=='00105'){
					columns = [{
										text : "日期",
										width : 120,
										dataIndex : 'DATA_DATE',
										align : 'center',
										sortable : true
									}, {
										text : "反向有功总能量示值",
										width : 120,
										dataIndex : 'RAP_R',
										align : 'center',
										sortable : false
									}, {
										text : "反向无功总能量示值",
										width : 120,
										dataIndex : 'RRP_R',
										align : 'center',
										sortable : false
									}];
					}
					else if(rec.get('ALARM_CODE')=='00107'){
						columns =[{
								text : "时间",
								width : 120,
								dataIndex : 'DATA_DATE',
								align : 'center',
								sortable : true
							}, {
								text : "正向有功总能量示值 ",
								width : 120,
								dataIndex : 'PAP_R',
								align : 'center',
								sortable : false
							}, {
								text : "正向无功总能量示值 ",
								width : 90,
								dataIndex : 'PRP_R',
								align : 'center',
								sortable : false
							},{
								text : "反向有功总能量示值 ",
								width : 120,
								dataIndex : 'RAP_R',
								align : 'center',
								sortable : false
							},{
								text : "反向无功总能量示值 ",
								width : 120,
								dataIndex : 'RRP_R',
								align : 'center',
								sortable : false
							}];
					}
                var compGridPanel=Ext.create('Ext.draw.Component',{
					width:Ext.getCmp("abnormalEleChartPanel").getWidth(),
					height:20,
					viewBox:false,
					renderTo:Ext.getBody(),
					items:[{
						 type:'rect',
						 x:50,
						 y:20,
						 height:30,
						 width:Ext.getCmp("abnormalEleChartPanel").getWidth(),
						 stroke:"#C0C0C0",
						 fill:"#C0C0C0"
					}]
			})
					var dataGridPanel = Ext.create('Ext.grid.Panel', {
							//loadMask : true,
						    title:'电能示值',
					    	height : 190,
							border : false,
							store:dataStore,
							viewConfig: {
					            trackOver: false
					        },
							columnLines : true,
							columns : columns
						});
				var result = Ext.decode(response.responseText);
				var resultList = result.resultList;
				var resultList2 = result.resultList2;
				if(!Ext.isEmpty(resultList)){
				  dataStore.loadData(resultList);
				}
					if(show1=='show1'){
						
							//生成电压数据
							var abnormalEleChartFitPanel = Ext.create('Ext.panel.Panel',{
								id:'RapExceptChar-1',
								border : false,
								height:300,
								width:Ext.getCmp('abnormalEleChartPanel').getWidth(),
								renderTo : Ext.getBody()
							});
							var xmlData ="";
							if(rec.get('ALARM_CODE')=='00105'){
							    xmlData = "<graph caption='电能示值曲线图' xAxisName='日期' yAxisName='电能示值' labelDisplay = 'WRAP' anchorRadius='3' decimalPrecision='0' formatNumberScale='2' bgcolor='F3f3f3' bgAlpha='70' numvdivlines='5' showValues='0' divLineColor='CC3300' divLineIsDashed='1' chartRightMargin='50'>";
								 xmlData += "<categories>";
								for(var i=resultList.length-1;i>=0;i--){
									xmlData += "<category name='"+ resultList[i]['DATA_DATE']+"'  />";
									i=i-3;
								}
								xmlData += "</categories>";
								
								xmlData += "<dataset seriesName='反向有功总能量示值'  color='#003399' anchorBorderColor='#003399' anchorBgColor='#003399'>";
								for(var i=resultList.length-1;i>=0;i--){
									xmlData += "<set value='"+resultList[i]['RAP_R']+"' />";
									i=i-3;
								}
								xmlData += "</dataset>";
								xmlData += "<dataset seriesName='反向无功总能量示值'  color='#FF6600' anchorBorderColor='#FF6600' anchorBgColor='#FF6600'>";
								for(var i=resultList.length-1;i>=0;i--){
									xmlData += "<set value='"+resultList[i]['RRP_R']+"' />";
									i=i-3;
								}
							}
							else if(rec.get('ALARM_CODE')=='00107'){
								xmlData = "<graph caption='电能示值曲线图' xAxisName='日期' yAxisName='电能示值' labelDisplay = 'WRAP' anchorRadius='3' decimalPrecision='0' formatNumberScale='2' bgcolor='F3f3f3' bgAlpha='70' numvdivlines='5' showValues='0' divLineColor='CC3300' divLineIsDashed='1' chartRightMargin='50'>";
								 xmlData += "<categories>";
								for(var i=resultList.length-1;i>=0;i--){
									xmlData += "<category name='"+ resultList[i]['DATA_DATE']+"'  />";
									i=i-3;
								}
								xmlData += "</categories>";
								
								xmlData += "<dataset seriesName='正向有功总能量示值'  color='#BF1515' anchorBorderColor='#BF1515' anchorBgColor='#BF1515'>";
								for(var i=resultList.length-1;i>=0;i--){
									xmlData += "<set value='"+resultList[i]['PAP_R']+"' />";
									i=i-3;
								}
								xmlData += "</dataset>";
								xmlData += "<dataset seriesName='正向无功总能量示值'  color='#000000' anchorBorderColor='#000000' anchorBgColor='#000000'>";
								for(var i=resultList.length-1;i>=0;i--){
									xmlData += "<set value='"+resultList[i]['PRP_R']+"' />";
									i=i-3;
								}
								xmlData += "</dataset>";
								xmlData += "<dataset seriesName='反向有功总能量示值'  color='#003399' anchorBorderColor='#003399' anchorBgColor='#003399'>";
								for(var i=resultList.length-1;i>=0;i--){
									xmlData += "<set value='"+resultList[i]['RAP_R']+"' />";
								}
								xmlData += "</dataset>";
								xmlData += "<dataset seriesName='反向无功总能量示值'  color='#FF6600' anchorBorderColor='#FF6600' anchorBgColor='#FF6600'>";
								for(var i=resultList.length-1;i>=0;i--){
								xmlData += "<set value='"+resultList[i]['RRP_R']+"' />";
								i=i-3;
								}
							}
							xmlData += "</dataset></graph>";
							var picCharts = new FusionCharts("./FusionCharts-new/ScrollLine2D.swf",
										Math.random() * 0xffffff, Ext.getCmp('abnormalEleChartPanel').getWidth(), 300);		
							picCharts.setDataXML(xmlData);
							picCharts.render("RapExceptChar-1");
						
						     Ext.getCmp('abnormalEleChartPanel').add(abnormalEleChartFitPanel);
							//}
						
						}
						if(show2=='show2'){
						Ext.getCmp('abnormalEleChartPanel').add(dataGridPanel);
						Ext.getCmp('abnormalEleChartPanel').add(compGridPanel);
						}
						if(rec.get('CONS_TYPE')=='1'){
							Ext.define('BLPhase1',{
								extend : 'Ext.data.Model',
								fields : [ 
										   "DATA_TIME",
									       "IA",
								           "IB",
									       "IC"]
							});
							
							var bLPhaseStore =   Ext.create('Ext.data.Store', {
								model : 'BLPhase1',
								remoteSort : true,
								proxy : new Ext.data.MemoryProxy()	
							});
							
							var bLPhaseGridPanel = Ext.create('Ext.grid.Panel', {
								    title:'电流数据',
									height: 300,
									width : Ext.getCmp('abnormalEleChartPanel').getWidth(),
									loadMask : true,
									border : true,
									store:bLPhaseStore,
									viewConfig: {
							            trackOver: false
							        },
									columnLines : true,
									columns : [{
												text : "时间",
												width : 120,
												dataIndex : 'DATA_TIME',
												align : 'center',
												sortable : true
											}, {
												text : "A相电流",
												width : 120,
												dataIndex : 'IA',
												align : 'center',
												sortable : false
											}, {
												text : "B相电流",
												width : 100,
												dataIndex : 'IB',
												align : 'center',
												sortable : false
											}, {
												text : "C相电流",
												width : 120,
												dataIndex : 'IC',
												align : 'center',
												sortable : false
											}]
					
										});
							if(!Ext.isEmpty(resultList2)){
							   bLPhaseStore.loadData(resultList2); 
							  }
						if(show1=='show1'){
							 //生成电压数据
								var abnormalEleChartFitPanel = Ext.create('Ext.panel.Panel',{
									id:'RapExceptChar-2',
									border : false,
									height:300,
									width:Ext.getCmp('abnormalEleChartPanel').getWidth(),
									renderTo : Ext.getBody()
								});
								var xmlData2 = "<graph caption='电流曲线图' xAxisName='时间' yAxisName='电流' labelDisplay = 'WRAP' anchorRadius='3' decimalPrecision='2' formatNumberScale='2' bgcolor='F3f3f3' bgAlpha='70' numvdivlines='5' showValues='0' divLineColor='CC3300' divLineIsDashed='1' chartRightMargin='50' labelStep='5'>";
								 xmlData2 += "<categories>";
								for(var i=0;i<resultList2.length;i++){
									xmlData2 += "<category name='"+ resultList2[i]['DATA_TIME'].substring(10,16)+"'  />";
									i=i+1;
								}
								xmlData2 += "</categories>";
								
								xmlData2 += "<dataset seriesName='A相' color='#E7ED1A' anchorBorderColor='#E7ED1A' anchorBgColor='#E7ED1A'>";
								for(var i=0;i<resultList2.length;i++){
									xmlData2 += "<set value='"+resultList2[i]['IA']+"' />";
									i=i+1;
								}
								xmlData2 += "</dataset>";
								xmlData2 += "<dataset seriesName='B相' color='#3BC71A' anchorBorderColor='#3BC71A' anchorBgColor='#3BC71A'>";
								for(var i=0;i<resultList2.length;i++){
									xmlData2 += "<set value='"+resultList2[i]['IB']+"' />";
									i=i+1;
								}
								xmlData2 += "</dataset>";
								xmlData2 += "<dataset seriesName='C相' color='#BF1515' anchorBorderColor='#BF1515' anchorBgColor='#BF1515'>";
								for(var i=0;i<resultList2.length;i++){
									xmlData2 += "<set value='"+resultList2[i]['IC']+"' />";
									i=i+1;
								}
								xmlData2 += "</dataset></graph>";
								
								var picCharts2 = new FusionCharts("./FusionCharts-new/MSLine.swf",
											Math.random() * 0xffffff, Ext.getCmp('abnormalEleChartPanel').getWidth(), 300);		
								picCharts2.setDataXML(xmlData2);
								picCharts2.render("RapExceptChar-2");
								
								 Ext.getCmp('abnormalEleChartPanel').add(abnormalEleChartFitPanel);
								 show1='good1';
							//	}
								
							}
							if(show2=='show2'){
								Ext.getCmp('abnormalEleChartPanel').add(bLPhaseGridPanel);
							   show2='good2';
							}
							
						}
						Ext.getCmp('abnormalEleChartPanel').doLayout();
						Ext.getCmp('abnormalEleChartPanel').getEl().unmask();
					},
					failure : function(response) {
						Ext.Msg.alert('提示', '查询失败3');
						Ext.getCmp('abnormalEleChartPanel').getEl().unmask();
					}
					
				});
		    
		   }else{
		    	
			var toolbar=Ext.create('Ext.toolbar.Toolbar', {
				width:Ext.getCmp('abnormalEleChartPanel').getWidth(),
			    dock: 'top',
			    items: ['-',graphshow,'-',datashow,{xtype: 'tbfill'},'-',appointDate1,'-',before30Days,'-',next30Days]
			    });
			Ext.getCmp('abnormalEleChartPanel').add(toolbar);
			Ext.getCmp('abnormalEleChartPanel').getEl().mask('正在查询...');
			Ext.Ajax.request({
		 	    url : 'measureExceptionAnalAction!queryRapExceptInfo.action',					
				params : {
					'queryItems.meterId': rec.get('METER_ID'),
					'queryItems.dataTime' : alarmDate,
					'queryItems.dataTime1' : dataTime1,
					'queryItems.consType':rec.get('CONS_TYPE')
				},
			success : function(response) {
								
				Ext.define('eMpDayRead-5',{
					extend : 'Ext.data.Model',
					fields : [ 
							   "DATA_DATE",
							   "PAP_R",
							   "PRP_R",
						       "RAP_R",
						       "RRP_R"
						      ]
				});
				
				var dataStore =   Ext.create('Ext.data.Store', {
					model : 'eMpDayRead-5',
					remoteSort : true,
					proxy : new Ext.data.MemoryProxy()	
				});
				var columns = new Array();
				if(rec.get('ALARM_CODE')=='00105'){
				columns = [{
									text : "日期",
									width : 120,
									dataIndex : 'DATA_DATE',
									align : 'center',
									sortable : true
								}, {
									text : "反向有功总能量示值",
									width : 120,
									dataIndex : 'RAP_R',
									align : 'center',
									sortable : false
								}, {
									text : "反向无功总能量示值",
									width : 120,
									dataIndex : 'RRP_R',
									align : 'center',
									sortable : false
								}];
				}
				else if(rec.get('ALARM_CODE')=='00107'){
					columns =[{
							text : "时间",
							width : 120,
							dataIndex : 'DATA_DATE',
							align : 'center',
							sortable : true
						}, {
							text : "正向有功总能量示值 ",
							width : 120,
							dataIndex : 'PAP_R',
							align : 'center',
							sortable : false
						}, {
							text : "正向无功总能量示值 ",
							width : 90,
							dataIndex : 'PRP_R',
							align : 'center',
							sortable : false
						},{
							text : "反向有功总能量示值 ",
							width : 120,
							dataIndex : 'RAP_R',
							align : 'center',
							sortable : false
						},{
							text : "反向无功总能量示值 ",
							width : 120,
							dataIndex : 'RRP_R',
							align : 'center',
							sortable : false
						}];
				}
	           var compGridPanel=Ext.create('Ext.draw.Component',{
					width:Ext.getCmp("abnormalEleChartPanel").getWidth(),
					height:20,
					viewBox:false,
					renderTo:Ext.getBody(),
					items:[{
						 type:'rect',
						 x:50,
						 y:20,
						 height:30,
						 width:Ext.getCmp("abnormalEleChartPanel").getWidth(),
						 stroke:"#000000",
						 fill:"#C0C0C0"
					}]
			})
				var dataGridPanel = Ext.create('Ext.grid.Panel', {
						//loadMask : true,
					    title:'电能示值',
				    	height : 180,
						border : false,
						store:dataStore,
						viewConfig: {
				            trackOver: false
				        },
						columnLines : true,
						columns : columns
					});
					var result = Ext.decode(response.responseText);
					var resultList = result.resultList;
					var resultList2 = result.resultList2;
					if(!Ext.isEmpty(resultList)){
					dataStore.loadData(resultList);
					}
				if(show1=='show1'){
				
				//	if(!Ext.isEmpty(resultList)){
						
						//生成电压数据
						var abnormalEleChartFitPanel = Ext.create('Ext.panel.Panel',{
							id:'RapExceptChar-1',
							border : false,
							height:300,
							width:Ext.getCmp('abnormalEleChartPanel').getWidth(),
							renderTo : Ext.getBody()
						});
						var xmlData ="";
						if(rec.get('ALARM_CODE')=='00105'){
						    xmlData = "<graph caption='电能示值曲线图' xAxisName='日期' yAxisName='电能示值' labelDisplay = 'WRAP' anchorRadius='3' decimalPrecision='0' formatNumberScale='2' bgcolor='F3f3f3' bgAlpha='70' numvdivlines='5' showValues='0' divLineColor='CC3300' divLineIsDashed='1' chartRightMargin='50'>";
							 xmlData += "<categories>";
							for(var i=resultList.length-1;i>=0;i--){
								xmlData += "<category name='"+ resultList[i]['DATA_DATE']+"'  />";
								i=i-3;
							}
							xmlData += "</categories>";
							xmlData += "<dataset seriesName='反向有功总能量示值'  color='#003399' anchorBorderColor='#003399' anchorBgColor='#003399'>";
							for(var i=resultList.length-1;i>=0;i--){
								xmlData += "<set value='"+resultList[i]['RAP_R']+"' />";
								i=i-3;
							}
							xmlData += "</dataset>";
							xmlData += "<dataset seriesName='反向无功总能量示值'  color='#FF6600' anchorBorderColor='#FF6600' anchorBgColor='#FF6600'>";
							for(var i=resultList.length-1;i>=0;i--){
								xmlData += "<set value='"+resultList[i]['RRP_R']+"' />";
								i=i-3;
							}
						}
						else if(rec.get('ALARM_CODE')=='00107'){
							xmlData = "<graph caption='电能示值曲线图' xAxisName='日期' yAxisName='电能示值' labelDisplay = 'WRAP' anchorRadius='3' decimalPrecision='0' formatNumberScale='2' bgcolor='F3f3f3' bgAlpha='70' numvdivlines='5' showValues='0' divLineColor='CC3300' divLineIsDashed='1' chartRightMargin='50'>";
							 xmlData += "<categories>";
							for(var i=resultList.length-1;i>=0;i--){
								xmlData += "<category name='"+ resultList[i]['DATA_DATE']+"'  />";
								i=i-3;
							}
							xmlData += "</categories>";
							xmlData += "<dataset seriesName='正向有功总能量示值'  color='#BF1515' anchorBorderColor='#BF1515' anchorBgColor='#BF1515'>";
							for(var i=resultList.length-1;i>=0;i--){
								xmlData += "<set value='"+resultList[i]['PAP_R']+"' />";
								i=i-3;

							}
							xmlData += "</dataset>";
							xmlData += "<dataset seriesName='正向无功总能量示值'  color='#000000' anchorBorderColor='#000000' anchorBgColor='#000000'>";
							for(var i=resultList.length-1;i>=0;i--){
								xmlData += "<set value='"+resultList[i]['PRP_R']+"' />";
								i=i-3;
							}
							xmlData += "</dataset>";
							xmlData += "<dataset seriesName='反向有功总能量示值'  color='#003399' anchorBorderColor='#003399' anchorBgColor='#003399'>";
							for(var i=resultList.length-1;i>=0;i--){
								xmlData += "<set value='"+resultList[i]['RAP_R']+"' />";
								i=i-3;
                                }
							xmlData += "</dataset>";
							xmlData += "<dataset seriesName='反向无功总能量示值'  color='#FF6600' anchorBorderColor='#FF6600' anchorBgColor='#FF6600'>";
							for(var i=resultList.length-1;i>=0;i--){
								xmlData += "<set value='"+resultList[i]['RRP_R']+"' />";
								i=i-3;
							}
						}
						
						xmlData += "</dataset></graph>";
						var picCharts = new FusionCharts("./FusionCharts-new/ScrollLine2D.swf",
									Math.random() * 0xffffff, Ext.getCmp('abnormalEleChartPanel').getWidth(), 300);		
						picCharts.setDataXML(xmlData);
						picCharts.render("RapExceptChar-1");
						
						Ext.getCmp('abnormalEleChartPanel').add(abnormalEleChartFitPanel);
				        
						//}
					 }
					if(show2=='show2'){
	                  Ext.getCmp('abnormalEleChartPanel').add(dataGridPanel);
					  Ext.getCmp('abnormalEleChartPanel').add(compGridPanel);
					}
					
					if(rec.get('CONS_TYPE')=='1'){
						Ext.define('BLPhase1',{
							extend : 'Ext.data.Model',
							fields : [ 
									   "DATA_TIME",
								       "IA",
							           "IB",
								       "IC"]
						});
						
						var bLPhaseStore =   Ext.create('Ext.data.Store', {
							model : 'BLPhase1',
							remoteSort : true,
							proxy : new Ext.data.MemoryProxy()	
						});
						
						var bLPhaseGridPanel = Ext.create('Ext.grid.Panel', {
							    title:'电流数据',
								height: 300,
								width : Ext.getCmp('abnormalEleChartPanel').getWidth(),
								loadMask : true,
								border : false,
								store:bLPhaseStore,
								viewConfig: {
						            trackOver: false
						        },
								columnLines : true,
								columns : [{
											text : "时间",
											width : 120,
											dataIndex : 'DATA_TIME',
											align : 'center',
											sortable : true
										}, {
											text : "A相电流",
											width : 120,
											dataIndex : 'IA',
											align : 'center',
											sortable : false
										}, {
											text : "B相电流",
											width : 100,
											dataIndex : 'IB',
											align : 'center',
											sortable : false
										}, {
											text : "C相电流",
											width : 120,
											dataIndex : 'IC',
											align : 'center',
											sortable : false
										}]
				
									});
									if(!Ext.isEmpty(resultList2)){
									bLPhaseStore.loadData(resultList2);
									}
				     	if(show1=='show1'){
						//if(!Ext.isEmpty(resultList2)){
							//bLPhaseStore.loadData(resultList2);
							//生成电压数据
							var abnormalEleChartFitPanel = Ext.create('Ext.panel.Panel',{
								id:'RapExceptChar-2',
								border : false,
								height:300,
								width:Ext.getCmp('abnormalEleChartPanel').getWidth(),
								renderTo : Ext.getBody()
							});
							var xmlData2 = "<graph caption='电流曲线图' xAxisName='时间' yAxisName='电流' labelDisplay = 'WRAP' anchorRadius='3' decimalPrecision='2' formatNumberScale='2' bgcolor='F3f3f3' bgAlpha='70' numvdivlines='5' showValues='0' divLineColor='CC3300' divLineIsDashed='1' chartRightMargin='50' labelStep='5'>";
							 xmlData2 += "<categories>";
							for(var i=0;i<resultList2.length;i++){
								xmlData2 += "<category name='"+ resultList2[i]['DATA_TIME'].substring(10,16)+"'  />";
								i=i+1;
							}
							xmlData2 += "</categories>";
							xmlData2 += "<dataset seriesName='A相' color='#E7ED1A' anchorBorderColor='#E7ED1A' anchorBgColor='#E7ED1A'>";
							for(var i=0;i<resultList2.length;i++){
								xmlData2 += "<set value='"+resultList2[i]['IA']+"' />";
								i=i+1;
							}
							xmlData2 += "</dataset>";
							xmlData2 += "<dataset seriesName='B相' color='#3BC71A' anchorBorderColor='#3BC71A' anchorBgColor='#3BC71A'>";
							for(var i=0;i<resultList2.length;i++){
								xmlData2 += "<set value='"+resultList2[i]['IB']+"' />";
								i=i+1;
							}
							xmlData2 += "</dataset>";
							xmlData2 += "<dataset seriesName='C相' color='#BF1515' anchorBorderColor='#BF1515' anchorBgColor='#BF1515'>";
							for(var i=0;i<resultList2.length;i++){
								xmlData2 += "<set value='"+resultList2[i]['IC']+"' />";
								i=i+1;
							}
							xmlData2 += "</dataset></graph>";
							
							var picCharts2 = new FusionCharts("./FusionCharts-new/MSLine.swf",
										Math.random() * 0xffffff, Ext.getCmp('abnormalEleChartPanel').getWidth(), 300);		
							picCharts2.setDataXML(xmlData2);
							picCharts2.render("RapExceptChar-2");
							
							Ext.getCmp('abnormalEleChartPanel').add(abnormalEleChartFitPanel);
					         show1='good1';
						//	}
						}
						if(show2=='show2'){
						Ext.getCmp('abnormalEleChartPanel').add(bLPhaseGridPanel);
						show2='good2';
						}
				     }
		            Ext.getCmp('abnormalEleChartPanel').doLayout();
					Ext.getCmp('abnormalEleChartPanel').getEl().unmask();
				},
				failure : function(response) {
					Ext.Msg.alert('提示', '查询失败4');
					Ext.getCmp('abnormalEleChartPanel').getEl().unmask();
				}
			});

      }
	}
	
	function query00106(rec,alarmDate){

		  var dataTime1='';
			var toolbar=Ext.create('Ext.toolbar.Toolbar', {
				width:Ext.getCmp('abnormalEleChartPanel').getWidth(),
			    dock: 'top',
			    items: [{xtype: 'tbfill'},'-',before30Days104,'-',next30Days104]
			});
			Ext.getCmp('abnormalEleChartPanel').add(toolbar);
			Ext.getCmp('abnormalEleChartPanel').getEl().mask('正在查询...');
			Ext.Ajax.request({
		 	    url : 'measureExceptionAnalAction!queryeMpDayRead.action',					
				params : {
					'queryItems.meterId': rec.get('METER_ID'),
					'queryItems.dataTime' : alarmDate,
					'queryItems.dataTime1': dataTime1
				},
				success : function(response) {
						Ext.define('eMpDayRead-6',{
							extend : 'Ext.data.Model',
							fields : [ 
									   "DATA_DATE",
								       "PAP_R",
								       "PAP_R",
								       "RAP_R",
								       "RRP_R"
								      ]
						});
						
						var dataStore =   Ext.create('Ext.data.Store', {
							model : 'eMpDayRead-6',
							remoteSort : true,
							proxy :  new Ext.data.MemoryProxy()	
						});
						
						var eMpDayReadGridPanel = Ext.create('Ext.grid.Panel', {
								//height: Ext.getCmp('abnormalEleChartPanel').getHeight(),
								//width : Ext.getCmp('abnormalEleChartPanel').getWidth(),
								loadMask : true,
								border : false,
								store:dataStore,
								viewConfig: {
						            trackOver: false
						        },
								columnLines : true,
								columns : [{
											text : "时间",
											width : 120,
											dataIndex : 'DATA_DATE',
											align : 'center',
											sortable : true
										}, {
											text : "正向有功总能量示值 ",
											width : 120,
											dataIndex : 'PAP_R',
											align : 'center',
											sortable : false
										}, {
											text : "正向无功总能量示值 ",
											width : 90,
											dataIndex : 'PRP_R',
											align : 'center',
											sortable : false
										},{
											text : "反向有功总能量示值 ",
											width : 120,
											dataIndex : 'RAP_R',
											align : 'center',
											sortable : false
										},{
											text : "反向无功总能量示值 ",
											width : 120,
											dataIndex : 'RRP_R',
											align : 'center',
											sortable : false
										}]
							});
							var result = Ext.decode(response.responseText);
							var resultList = result.resultList;
							if(!Ext.isEmpty(resultList)){
								dataStore.loadData(resultList);
								//生成曲线数据
								var abnormalEleChartFitPanel = Ext.create('Ext.panel.Panel',{
									id:'meterAgainChar-1',
									border : false,
									height:300,
									width:Ext.getCmp('abnormalEleChartPanel').getWidth(),
									renderTo : Ext.getBody()
								});
								var xmlData = "<graph caption='电能示值曲线图' xAxisName='日期' yAxisName='电能示值' labelDisplay = 'WRAP' anchorRadius='3' decimalPrecision='0' formatNumberScale='2' bgcolor='F3f3f3' bgAlpha='70' numvdivlines='5' showValues='0' divLineColor='CC3300' divLineIsDashed='1' chartRightMargin='50'>";
								 xmlData += "<categories>";
								for(var i=resultList.length-1;i>=0;i--){
									xmlData += "<category name='"+ resultList[i]['DATA_DATE']+"'  />";
									i=i-3;
								}
								xmlData += "</categories>";
								xmlData += "<dataset seriesName='正向有功总能量示值'  color='#BF1515' anchorBorderColor='#BF1515' anchorBgColor='#BF1515'>";
								for(var i=resultList.length-1;i>=0;i--){
									xmlData += "<set value='"+resultList[i]['PAP_R']+"' />";
									i=i-3;
								}
								xmlData += "</dataset>";
								xmlData += "<dataset seriesName='正向无功总能量示值'  color='#000000' anchorBorderColor='#000000' anchorBgColor='#000000'>";
								for(var i=resultList.length-1;i>=0;i--){
									xmlData += "<set value='"+resultList[i]['PRP_R']+"' />";
									i=i-3;
								}
								xmlData += "</dataset>";
								xmlData += "<dataset seriesName='反向有功总能量示值'  color='#003399' anchorBorderColor='#003399' anchorBgColor='#003399'>";
								for(var i=resultList.length-1;i>=0;i--){
									xmlData += "<set value='"+resultList[i]['RAP_R']+"' />";
									i=i-3;
								}
								xmlData += "</dataset>";
								xmlData += "<dataset seriesName='反向无功总能量示值'  color='#FF6600' anchorBorderColor='#FF6600' anchorBgColor='#FF6600'>";
								for(var i=resultList.length-1;i>=0;i--){
									xmlData += "<set value='"+resultList[i]['RRP_R']+"' />";
									i=i-3;
								}
								xmlData += "</dataset></graph>";
								
								var picCharts = new FusionCharts("./FusionCharts-new/ScrollLine2D.swf",
											Math.random() * 0xffffff, Ext.getCmp('abnormalEleChartPanel').getWidth(), 300);		
								picCharts.setDataXML(xmlData);
								picCharts.render("meterAgainChar-1");
								
								Ext.getCmp('abnormalEleChartPanel').add(abnormalEleChartFitPanel);
							}
							Ext.getCmp('abnormalEleChartPanel').add(eMpDayReadGridPanel);
							Ext.getCmp('abnormalEleChartPanel').doLayout();
							Ext.getCmp('abnormalEleChartPanel').getEl().unmask();
					},
				failure : function(response) {
					Ext.Msg.alert('提示', '查询失败5');
					Ext.getCmp('abnormalEleChartPanel').getEl().unmask();
				}
			});
		
	}
	
	function query00107(rec,alarmDate){
		    var dataTime1='17';
			var toolbar=Ext.create('Ext.toolbar.Toolbar', {
				width:Ext.getCmp('abnormalEleChartPanel').getWidth(),
			    dock: 'top',
			    items: [{xtype: 'tbfill'},'-',queryBefore7Days(),'-',queryNext7Days()]
			});
			Ext.getCmp('abnormalEleChartPanel').add(toolbar);
			Ext.getCmp('abnormalEleChartPanel').getEl().mask('正在查询...');
			Ext.Ajax.request({
		 	    url : 'measureExceptionAnalAction!queryRapExceptInfo.action',					
				params : {
					'queryItems.meterId': rec.get('METER_ID'),
					'queryItems.dataTime' : alarmDate,
					'queryItems.consType':rec.get('CONS_TYPE'),
					'queryItems.dataTime1':dataTime1
				},
			success : function(response) {
								
				Ext.define('eMpDayRead-7',{
					extend : 'Ext.data.Model',
					fields : [ 
							   "DATA_DATE",
						       "PAP_R",
							   "PAP_R",
							   "RAP_R",
							   "RRP_R"
						      ]
				});
				
				var dataStore =   Ext.create('Ext.data.Store', {
					model : 'eMpDayRead-7',
					remoteSort : true,
					proxy : new Ext.data.MemoryProxy()	
				});
				
				var dataGridPanel = Ext.create('Ext.grid.Panel', {
						//loadMask : true,
				    	height : 180,
						border : false,
						store:dataStore,
						viewConfig: {
				            trackOver: false
				        },
						columnLines : true,
						columns : [{
									text : "日期",
									width : 120,
									dataIndex : 'DATA_DATE',
									align : 'center',
									sortable : true
								}, {
									text : "正向有功总能量示值 ",
									width : 120,
									dataIndex : 'PAP_R',
									align : 'center',
									sortable : false
								}, {
									text : "正向无功总能量示值 ",
									width : 90,
									dataIndex : 'PRP_R',
									align : 'center',
									sortable : false
								},{
									text : "反向有功总能量示值 ",
									width : 120,
									dataIndex : 'RAP_R',
									align : 'center',
									sortable : false
								},{
									text : "反向无功总能量示值 ",
									width : 120,
									dataIndex : 'RRP_R',
									align : 'center',
									sortable : false
								}]
					});
					var result = Ext.decode(response.responseText);
					var resultList = result.resultList;
					var resultList2 = result.resultList2;
					if(!Ext.isEmpty(resultList)){
						dataStore.loadData(resultList);
						//生成曲线数据
						var abnormalEleChartFitPanel = Ext.create('Ext.panel.Panel',{
							id:'meterStopChar-1',
							border : false,
							height:300,
							width:Ext.getCmp('abnormalEleChartPanel').getWidth(),
							renderTo : Ext.getBody()
						});
						var xmlData = "<graph caption='电能示值曲线图' xAxisName='日期' yAxisName='电能示值' labelDisplay = 'WRAP' anchorRadius='3' decimalPrecision='0' formatNumberScale='2' bgcolor='F3f3f3' bgAlpha='70' numvdivlines='5' showValues='0' divLineColor='CC3300' divLineIsDashed='1' chartRightMargin='50'>";
						 xmlData += "<categories>";
						for(var i=resultList.length-1;i>=0;i--){
							xmlData += "<category name='"+ resultList[i]['DATA_DATE']+"'  />";
							i=i-3;
						}
						xmlData += "</categories>";
						xmlData += "<dataset seriesName='正向有功总能量示值'  color='#BF1515' anchorBorderColor='#BF1515' anchorBgColor='#BF1515'>";
						for(var i=resultList.length-1;i>=0;i--){
							xmlData += "<set value='"+resultList[i]['PAP_R']+"' />";
							i=i-3;
						}
						xmlData += "</dataset>";
						xmlData += "<dataset seriesName='正向无功总能量示值'  color='#000000' anchorBorderColor='#000000' anchorBgColor='#000000'>";
						for(var i=resultList.length-1;i>=0;i--){
							xmlData += "<set value='"+resultList[i]['PRP_R']+"' />";
							i=i-3;
						}
						xmlData += "</dataset>";
						xmlData += "<dataset seriesName='反向有功总能量示值'  color='#003399' anchorBorderColor='#003399' anchorBgColor='#003399'>";
						for(var i=resultList.length-1;i>=0;i--){
							xmlData += "<set value='"+resultList[i]['RAP_R']+"' />";
							i=i-3;
						}
						xmlData += "</dataset>";
						xmlData += "<dataset seriesName='反向无功总能量示值'  color='#FF6600' anchorBorderColor='#FF6600' anchorBgColor='#FF6600'>";
						for(var i=resultList.length-1;i>=0;i--){
							xmlData += "<set value='"+resultList[i]['RRP_R']+"' />";
							i=i-3;
						}
						xmlData += "</dataset></graph>";
						
						var picCharts = new FusionCharts("./FusionCharts-new/MSLine.swf",
									Math.random() * 0xffffff, Ext.getCmp('abnormalEleChartPanel').getWidth(), 300);		
						picCharts.setDataXML(xmlData);
						picCharts.render("meterStopChar-1");
						
						Ext.getCmp('abnormalEleChartPanel').add(abnormalEleChartFitPanel);
					}
					Ext.getCmp('abnormalEleChartPanel').add(dataGridPanel);
					if(rec.get('CONS_TYPE')=='1'){
						Ext.define('BLPhase1',{
							extend : 'Ext.data.Model',
							fields : [ 
									   "DATA_TIME",
								       "IA",
							           "IB",
								       "IC"]
						});
						
						var bLPhaseStore =   Ext.create('Ext.data.Store', {
							model : 'BLPhase1',
							remoteSort : true,
							proxy : new Ext.data.MemoryProxy()	
						});
						
						var bLPhaseGridPanel = Ext.create('Ext.grid.Panel', {
								height: 300,
								width : Ext.getCmp('abnormalEleChartPanel').getWidth(),
								loadMask : true,
								border : false,
								store:bLPhaseStore,
								viewConfig: {
						            trackOver: false
						        },
								columnLines : true,
								columns : [{
											text : "时间",
											width : 120,
											dataIndex : 'DATA_TIME',
											align : 'center',
											sortable : true
										}, {
											text : "A相电流",
											width : 120,
											dataIndex : 'IA',
											align : 'center',
											sortable : false
										}, {
											text : "B相电流",
											width : 100,
											dataIndex : 'IB',
											align : 'center',
											sortable : false
										}, {
											text : "C相电流",
											width : 120,
											dataIndex : 'IC',
											align : 'center',
											sortable : false
										}]
				
									});
						if(!Ext.isEmpty(resultList2)){
							bLPhaseStore.loadData(resultList2);
							//生成电压数据
							var abnormalEleChartFitPanel = Ext.create('Ext.panel.Panel',{
								id:'RapExceptChar-2',
								border : false,
								height:300,
								width:Ext.getCmp('abnormalEleChartPanel').getWidth(),
								renderTo : Ext.getBody()
							});
							var xmlData2 = "<graph caption='电流曲线图' xAxisName='时间' yAxisName='电流' labelDisplay = 'WRAP' anchorRadius='3' decimalPrecision='0' formatNumberScale='2' bgcolor='F3f3f3' bgAlpha='70' numvdivlines='5' showValues='0' divLineColor='CC3300' divLineIsDashed='1' chartRightMargin='50' labelStep='5'>";
							 xmlData2 += "<categories>";
							for(var i=0;i<resultList2.length;i++){
								xmlData2 += "<category name='"+ resultList2[i]['DATA_TIME'].substring(10,16)+"'  />";
								i=i+1;
							}
							xmlData2 += "</categories>";
							xmlData2 += "<dataset seriesName='A相' color='#E7ED1A' anchorBorderColor='#E7ED1A' anchorBgColor='#E7ED1A'>";
							for(var i=0;i<resultList2.length;i++){
								xmlData2 += "<set value='"+resultList2[i]['IA']+"' />";
								i=i+1;
							}
							xmlData2 += "</dataset>";
							xmlData2 += "<dataset seriesName='B相' color='#3BC71A' anchorBorderColor='#3BC71A' anchorBgColor='#3BC71A'>";
							for(var i=0;i<resultList2.length;i++){
								xmlData2 += "<set value='"+resultList2[i]['IB']+"' />";
								i=i+1;
							}
							xmlData2 += "</dataset>";
							xmlData2 += "<dataset seriesName='C相' color='#BF1515' anchorBorderColor='#BF1515' anchorBgColor='#BF1515'>";
							for(var i=0;i<resultList2.length;i++){
								xmlData2 += "<set value='"+resultList2[i]['IC']+"' />";
								i=i+1;
							}
							xmlData2 += "</dataset></graph>";
							
							var picCharts2 = new FusionCharts("./FusionCharts-new/MSLine.swf",
										Math.random() * 0xffffff, Ext.getCmp('abnormalEleChartPanel').getWidth(), 300);		
							picCharts2.setDataXML(xmlData2);
							picCharts2.render("RapExceptChar-2");
							
							Ext.getCmp('abnormalEleChartPanel').add(abnormalEleChartFitPanel);
						}
						Ext.getCmp('abnormalEleChartPanel').add(bLPhaseGridPanel);
					}
					Ext.getCmp('abnormalEleChartPanel').doLayout();
					Ext.getCmp('abnormalEleChartPanel').getEl().unmask();
				},
				failure : function(response) {
					Ext.Msg.alert('提示', '查询失败6');
					Ext.getCmp('abnormalEleChartPanel').getEl().unmask();
				}
			});
	}
	
	function query0010A(rec,alarmDate){
				Ext.define('BLPhase0010A',{
					extend : 'Ext.data.Model',
					fields : [ 
							   "DATA_TIME",
							   "FORWARDPOWER"
						      ]
				});
				
				var bLPhaseStore =   Ext.create('Ext.data.Store', {
					model : 'BLPhase0010A',
					remoteSort : true,
					proxy : new Ext.data.MemoryProxy()	
				});
				
				var bLPhaseGridPanel = Ext.create('Ext.grid.Panel', {
						height: 300,
						width : Ext.getCmp('abnormalEleChartPanel').getWidth(),
						loadMask : true,
						border : false,
						store:bLPhaseStore,
						viewConfig: {
				            trackOver: false
				        },
						columnLines : true,
						columns : [{
									text : "时间",
									width : 120,
									dataIndex : 'DATA_TIME',
									align : 'center',
									sortable : true
								}, {
									text : "正向有功功率",
									width : 120,
									dataIndex : 'FORWARDPOWER',
									align : 'center',
									sortable : true
								}]
		
					});
								
				var toolbar=Ext.create('Ext.toolbar.Toolbar', {
					width:Ext.getCmp('abnormalEleChartPanel').getWidth(),
				    dock: 'top',
				    items: [{xtype: 'tbfill'},'-',getAppointDate()]
				});
				
				Ext.getCmp('abnormalEleChartPanel').add(toolbar);
				Ext.getCmp('abnormalEleChartPanel').getEl().mask('正在查询...');
				Ext.Ajax.request({
			 	    url : 'measureExceptionAnalAction!queryBLPhaseInfo.action',					
					params : {
						'queryItems.meterId': rec.get('METER_ID'),
						'queryItems.dataTime' : alarmDate
					},
				success : function(response) {
					var result = Ext.decode(response.responseText);
					var resultList = result.resultList;
					if(!Ext.isEmpty(resultList)){
						bLPhaseStore.loadData(resultList);
						//生成电压数据
						var abnormalEleChartFitPanel = Ext.create('Ext.panel.Panel',{
							id:'abnormalEleChartFitPanel0010A',
							border : false,
							height:300,
							width:Ext.getCmp('abnormalEleChartPanel').getWidth(),
							renderTo : Ext.getBody()
						});
						var xmlData = "<graph caption='功率曲线图' xAxisName='时间' yAxisName='功率' labelDisplay = 'WRAP' anchorRadius='3' decimalPrecision='0' formatNumberScale='2' bgcolor='F3f3f3' bgAlpha='70' numvdivlines='5' showValues='0' divLineColor='CC3300' divLineIsDashed='1' chartRightMargin='50' labelStep='8'>";
						 xmlData += "<categories>";
						for(var i=0;i<resultList.length;i++){
							xmlData += "<category name='"+ resultList[i]['DATA_TIME'].substring(10,16)+"'  />";
						}
						xmlData += "</categories>";
						xmlData += "<dataset seriesName='正向有功功率'  color='#BF1515' anchorBorderColor='#BF1515' anchorBgColor='#BF1515'>";
						for(var i=0;i<resultList.length;i++){
							xmlData += "<set value='"+resultList[i]['FORWARDPOWER']+"' />";
						}
						xmlData += "</dataset></graph>";
						
						var picCharts = new FusionCharts("./FusionCharts-new/MSLine.swf",
									Math.random() * 0xffffff, Ext.getCmp('abnormalEleChartPanel').getWidth(), 300);		
						picCharts.setDataXML(xmlData);
						picCharts.render("abnormalEleChartFitPanel0010A");
						
						Ext.getCmp('abnormalEleChartPanel').add(abnormalEleChartFitPanel);
						
					}
					Ext.getCmp('abnormalEleChartPanel').add(bLPhaseGridPanel);
					
					Ext.getCmp('abnormalEleChartPanel').doLayout();
					Ext.getCmp('abnormalEleChartPanel').getEl().unmask();
				},
				failure : function(response) {
					Ext.Msg.alert('提示', '查询失败7');
					Ext.getCmp('abnormalEleChartPanel').getEl().unmask();
				}

			});			
	}
	
	var selectModel = Ext.create('Ext.selection.CheckboxModel',{
	    	//injectCheckbox:false, 
			mode : 'SINGLE',
			listeners : {
				    select : function(t,rec,index,e) {
				    	  sConsNo=rec.get('CONS_NO');
						  sAlarmCode=rec.get('ALARM_CODE');
					      currentDate = rec.get('ALARM_DATE');
				    	//if("abnormalEleChartPanel"==abnormalRelaInfoTabpanel.getActiveTab().getId()){
					      numberdata=numberdata+1;
					      if(numberdata>1){
					      	 show1='show1';
					      	// show2='good1';
					      }
				    		queryElectroExceptionInfo(rec,rec.get('ALARM_DATE'));
				    		 
				    	//}
				    		
		      			//else if("abnormalEleMeterEventPanel"==abnormalRelaInfoTabpanel.getActiveTab().getId()){
		      					eleMeterEventStore.proxy.extraParams={
									'queryItems.alarmId' : rec.get('ALARM_ID'),
									'queryItems.eventTypeCode':'02'
								};
								eleMeterEventStore.load();
		      			//}
								queryTmnlEventInfo(rec.get('ALARM_ID'));
								
								queryFileInfoFun(rec);
								
								queryExceptHisInfo(sConsNo,sAlarmCode);
		      			
		      		}/*,
		      		deselect: function(t,rec,index,e) {
	
		      		}*/
			}
	});
	
	Ext.define('Event',{
		extend : 'Ext.data.Model',
		fields : [ 
				   "ALARM_ID",
				   "ALARM_CODE",
			       "EVENT_NAME",
			       "EVENT_LEVEL",
			       "ORG_NO",
		           "ORG_NAME",
			       "CONS_NO",
			       "CONS_NAME",
			       "ALARM_SRC",
			       "CONS_TYPE",
			       "CONS_TYPE_NAME",
			       "FIRST_ALARM_DATE",
			       "ALARM_DATE",
			       "ALARM_CNT",
			       "FIRST_RESUME_DATE",
			       "RESUME_DATE",
			       "RESUME_DAY_CNT",
			       "TERMINAL_ADDR",
			       "METER_ID",
			       "ASSET_NO",
			       "ALARM_SRC",
			       "SAVE_ALARM_DATE"
			      ]
	});
	
	var msExceAnalStore =   Ext.create('Ext.data.Store', {
		model : 'Event',
		remoteSort : true,
		pageSize: DEFAULT_PAGE_SIZE,
		proxy : {
			type : 'ajax',
			url : 'measureExceptionAnalAction!queryAlarmAnalyseInfo.action',
			reader : {
				type : 'json',
				root : 'resultList',
				totalProperty : 'totalCount'
			}
		}	
	});
	
	var abnormalInfoGrid = Ext.create('Ext.grid.Panel', {
				title : '计量异常事件明细',
				loadMask : true,
				selModel : selectModel,
				region : 'center',
				border : true,
				store:msExceAnalStore,
//				verticalScrollerType: 'paginggridscroller',
//				invalidateScrollerOnRefresh: false,
				viewConfig: {
		            trackOver: false
		        },
				columnLines : true,
				columns : [Ext.create('Ext.grid.RowNumberer', {
						header : '序号',
						width : 30
						}),{
							text : "供电单位",
							width : 120,
							dataIndex : 'ORG_NAME',
							align : 'center',
							sortable : true
						}, {
							text : "事件名称",
							id:"event_id",
							width : 120,
							dataIndex : 'EVENT_NAME',
							align : 'center',
							sortable : false
						}, {
							text : "事件等级",
							width : 90,
							dataIndex : 'EVENT_LEVEL',
							align : 'center',
							sortable : true,
							renderer:function(value){
					   			if(value=="严重"){
						   			return "<font color='#D4101D';font-weight:bold>严重</font>";
						   		}
						   		else if(value=="重要"){
						   			return "<font color='#D46B1D';font-weight:bold>重要</font>";
						   		}
						   		else if(value=="较重要"){
						   			return "<font color='#D1B11A';font-weight:bold>较重要</font>";
						   		}
						   		else if(value=="一般"){
						   			return "<font color='#026115';font-weight:bold>一般</font>";
						   		}
			   				}
						}, {
							text : "用户名称",
							width : 120,
							dataIndex : 'CONS_NAME',
							align : 'center',
							sortable : false
						}, {
							text : "用户编号",
							width : 120,
							dataIndex : 'CONS_NO',
							align : 'center',
							sortable : false
						}, {
							text : "用户类别",
							width : 100,
							dataIndex : 'CONS_TYPE_NAME',
							align : 'center',
							sortable : false
						}, {
							text : "最近告警时间",
							width : 120,
							dataIndex : 'ALARM_DATE',
							align : 'center',
							sortable : false
						}, {
							text : "第一次告警时间",
							width : 120,
							dataIndex : 'FIRST_ALARM_DATE',
							align : 'center',
							sortable : false
						}, {
							text : "告警发生次数",
							width : 120,
							dataIndex : 'ALARM_CNT',
							align : 'center',
							sortable : true
						}, {
							text : "告警来源",
							width : 120,
							dataIndex : 'ALARM_SRC',
							align : 'center',
							sortable : false
						}, {
							text : "最近恢复时间",
							width : 120,
							dataIndex : 'RESUME_DATE',
							align : 'center',
							sortable : false
						}, {
							text : "第一次恢复时间",
							width : 120,
							dataIndex : 'FIRST_RESUME_DATE',
							align : 'center',
							sortable : false
						}, {
							text : "恢复天数",
							width : 90,
							dataIndex : 'RESUME_DAY_CNT',
							align : 'center',
							sortable : false
						}, {
							text : "终端地址",
							width : 120,
							dataIndex : 'TERMINAL_ADDR',
							align : 'center',
							sortable : false
						}, {
							text : "表计资产号",
							width : 120,
							dataIndex : 'ASSET_NO',
							align : 'center',
							sortable : false
						}],
//				  bbar: [{
//				        xtype: 'pagingtoolbar',
//				        store: msExceAnalStore,   
//				        dock: 'bottom',
//				        displayInfo: true
//				    }],
				  dockedItems: [{
				        xtype: 'pagingtoolbar',
				        store: msExceAnalStore,   
				        dock: 'bottom',
				        displayInfo: true
				    }]		
			});
	margins = '3 20 3 20';
	/*var exceptionInfoLabel = Ext.create('Ext.form.Label',{
				
				});
	var abnormalInfoFormpanel2=Ext.create('Ext.panel.Panel',{
		title : '异常信息统计',
				width : 300,
				autoScroll : true,
				region : 'east',
				layout:'fit',
				items:[exceptionInfoLabel]
		
	})*/
	Ext.define('EventCount',{
		extend : 'Ext.data.Model',
		fields : [ "EVENT_NAME",
			       "ALARM_CODE",
			       "CNT"
			      ]
	});
	
	var eventCountStore =   Ext.create('Ext.data.Store', {
		model : 'EventCount',
		remoteSort : true,
		proxy : new Ext.data.MemoryProxy()	
	});
	
	var abnormalInfoFormpanel2=Ext.create('Ext.grid.Panel',{
		border : false,
		title : '异常信息统计',
		loadMask : true,
		region : 'east',
		width : 300,
		border : true,
		viewConfig: {
            trackOver: false
        },
        store:eventCountStore,
		columnLines : false,
		columns : [{
							text : "异常事件",
							width : 120,
							dataIndex : 'EVENT_NAME',
							align : 'center',
							sortable : false
						},{
							text : "数量",
							width : 120,
							dataIndex : 'CNT',
							align : 'center',
							sortable : false,
							renderer : function(s, m, rec) {
								if(rec.get('ALARM_CODE')==''){
									return s;
								}
								else{
									return "<a href='javascript:' onclick='queryExceptInfo(\""
										 + rec.get('ALARM_CODE')
										 + "\");'>"+s+"</a>";
								}
							}
						}]
	});

	var abnormalInfoFormpanel = Ext.create('Ext.form.Panel', {
				title : '异常信息统计',
				width : 300,
				autoScroll : true,
				region : 'east',
				border : true,
				items:[]
//				layout : 'absolute',
//				labelSperater : ':',
//				defaultType : 'textfield',
//				items : [{
//							xtype : 'textfield',
//							fieldLabel : '电压过高',
//							labelWidth : 110,
//							width : 160,
//							margin : '10 10 10 10',
//							value : 0
//						}, {
//							xtype : 'label',
//							margin : '10 10 10 185',
//							text : '件'
//						}, {
//							xtype : 'textfield',
//							fieldLabel : '电流异常',
//							labelWidth : 110,
//							width : 160,
//							margin : '35 10 10 10',
//							value : 0
//						}, {
//							xtype : 'label',
//							margin : '35 10 10 185',
//							text : '件'
//						}, {
//							xtype : 'textfield',
//							fieldLabel : '电流失流',
//							labelWidth : 110,
//							width : 160,
//							margin : '60 10 10 10',
//							value : 0
//						}, {
//							xtype : 'label',
//							margin : '60 10 10 185',
//							text : '件'
//						}, {
//							xtype : 'textfield',
//							fieldLabel : '电流过流',
//							labelWidth : 110,
//							width : 160,
//							margin : '85 10 10 10',
//							value : 0
//						}, {
//							xtype : 'label',
//							margin : '85 10 10 185',
//							text : '件'
//						}, {
//							xtype : 'textfield',
//							fieldLabel : '电流不平衡超阈值',
//							labelWidth : 110,
//							width : 160,
//							margin : '110 10 10 10',
//							value : 0
//						}, {
//							xtype : 'label',
//							margin : '110 10 10 185',
//							text : '件'
//						}, {
//							xtype : 'textfield',
//							fieldLabel : '需量超变压器容量',
//							labelWidth : 110,
//							width : 160,
//							margin : '135 10 10 10',
//							value : 0
//						}, {
//							xtype : 'label',
//							margin : '135 10 10 185',
//							text : '件'
//						}, {
//							xtype : 'textfield',
//							fieldLabel : '功率超变压器容量',
//							labelWidth : 110,
//							width : 160,
//							margin : '160 10 10 10',
//							value : 0
//						}, {
//							xtype : 'label',
//							margin : '160 10 10 185',
//							text : '件'
//						}, {
//							xtype : 'textfield',
//							fieldLabel : '功率因数异常',
//							labelWidth : 110,
//							width : 160,
//							margin : '185 10 10 10',
//							value : 0
//						}, {
//							xtype : 'label',
//							margin : '185 10 10 185',
//							text : '件'
//						}, {
//							xtype : 'textfield',
//							fieldLabel : '负荷超合同容量',
//							labelWidth : 110,
//							width : 160,
//							margin : '210 10 10 10',
//							value : 0
//						}, {
//							xtype : 'label',
//							margin : '210 10 10 185',
//							text : '件'
//						}, {
//							xtype : 'textfield',
//							fieldLabel : '功率曲线为零',
//							labelWidth : 110,
//							width : 160,
//							margin : '235 10 10 10',
//							value : 0
//						}, {
//							xtype : 'label',
//							margin : '235 10 10 185',
//							text : '件'
//						}, {
//							xtype : 'textfield',
//							fieldLabel : '功率、电量曲线不对应',
//							labelWidth : 110,
//							width : 160,
//							margin : '260 10 10 10',
//							value : 0
//						}, {
//							xtype : 'label',
//							margin : '260 10 10 185',
//							text : '件'
//						}, {
//							xtype : 'textfield',
//							fieldLabel : '电压越限',
//							labelWidth : 110,
//							width : 160,
//							margin : '285 10 10 10',
//							value : 0
//						}, {
//							xtype : 'label',
//							margin : '285 10 10 185',
//							text : '件'
//						}, {
//							xtype : 'textfield',
//							fieldLabel : '电压不平衡超阈值',
//							labelWidth : 110,
//							width : 160,
//							margin : '310 10 10 10',
//							value : 0
//						}, {
//							xtype : 'label',
//							margin : '310 10 10 185',
//							text : '件'
//						}, {
//							xtype : 'textfield',
//							fieldLabel : '总计',
//							labelWidth : 110,
//							width : 160,
//							margin : '335 10 10 10',
//							value : 0
//						}, {
//							xtype : 'label',
//							margin : '335 10 10 185',
//							text : '件'
//						}]
			});

	var top_panel = Ext.create('Ext.panel.Panel', {
				border : false,
				layout : 'border',
				height : 250,
				split: true,
				region : 'north',
				items : [abnormalInfoGrid, abnormalInfoFormpanel2]
			});
	
	var abnormalEleChartPanel = Ext.create('Ext.panel.Panel', {
		        id:'abnormalEleChartPanel',
				title : '用电信息',
				//layout:'fit',
				border : false,
				monitorResize : true,
				autoScroll : true,
				//tbar : [{xtype: 'tbfill'},'-',appointDate],
				items : []
			});
	Ext.define('EleMeterEvent',{
		extend : 'Ext.data.Model',
		fields : [  "ALARM_ID",
			        "ALARM_TYPE_CODE",
			        "METER_ID",
			        "EVENT_NO",
			        "EVENT_NAME",
			        "ID",
			        "EVENT_TYPE_CODE",
			        "TERMINAL_ID",
			        "EVENT_TIME",
			        "REC_TIME"
			      ]
	});
	
	var eleMeterEventStore =   Ext.create('Ext.data.Store', {
		model : 'EleMeterEvent',
		remoteSort : true,
		//pageSize: DEFAULT_PAGE_SIZE,
		buffered: true,
		proxy : {
			type : 'ajax',
			url : 'measureExceptionAnalAction!queryMeterEvent.action',
			reader : {
				type : 'json',
				root : 'resultList'
			}
		}	
	});
	
	var abnormalEleMeterEventPanel1 = Ext.create('Ext.grid.Panel', {
				loadMask : true,
				border : false,
				store:eleMeterEventStore,
				viewConfig: {
		            trackOver: false
		        },
				columnLines : true,
				columns : [{
							text : "表计资产号",
							width : 120,
							dataIndex : 'ASSET_NO',
							align : 'center',
							sortable : true
						}, {
							text : "事件名称",
							width : 120,
							dataIndex : 'EVENT_NAME',
							align : 'center',
							sortable : false
						}, {
							text : "发生时间",
							width : 90,
							dataIndex : 'EVENT_TIME',
							align : 'center',
							sortable : true
						}, {
							text : "接收时间",
							width : 120,
							dataIndex : 'REC_TIME',
							align : 'center',
							sortable : false
						}, {
							text : "明细",
							width : 120,
							align : 'center',
							renderer : function(s, m, rec) {
								return "<a href='javascript:' onclick='queryAlarmEventDetailInfo(\""
										 + rec.get('ID')+"\",\"1"+
										 + "\");'>查看</a>";
							}
								
							
						}]
		});
	
		////////电能表事件记录
		var eleMeterEventRecStore =   Ext.create('Ext.data.Store', {
			model : 'EleMeterEvent',
			remoteSort : true,
			//pageSize: DEFAULT_PAGE_SIZE,
			buffered: true,
			proxy : {
				type : 'ajax',
				url : 'measureExceptionAnalAction!queryEleMeterEventRec.action',
				reader : {
					type : 'json',
					root : 'resultList'
				}
			}	
		});
	
	var abnormalEleMeterEventRecPanel = Ext.create('Ext.grid.Panel', {
				region:'center',
				loadMask : true,
				//border : false,
				store:eleMeterEventRecStore,
				viewConfig: {
		            trackOver: false
		        },
				columnLines : true,
				columns : [{
							text : "表计资产号",
							width : 120,
							dataIndex : 'ASSET_NO',
							align : 'center',
							sortable : true
						}, {
							text : "事件名称",
							width : 120,
							dataIndex : 'EVENT_NAME',
							align : 'center',
							sortable : false
						}, {
							text : "发生时间",
							width : 90,
							dataIndex : 'EVENT_TIME',
							align : 'center',
							sortable : true
						}, {
							text : "接收时间",
							width : 120,
							dataIndex : 'REC_TIME',
							align : 'center',
							sortable : false
						}, {
							text : "明细",
							width : 120,
							align : 'center',
							renderer : function(s, m, rec) {
								return "<a href='javascript:' onclick='queryAlarmEventDetailInfo(\""
										 + rec.get('MET_EVENT_ID')+"\",\"2"+
										 + "\");'>查看</a>";
							}
								
							
						}]
		});
		
	var abnormalEleMeterEventPanel2Top=  Ext.create('Ext.panel.Panel', {
		border : false,
		region:'north',
		layout: {
            type: 'table',
            columns: 3
        },
        defaults: {height: 30},
        bodyStyle : 'padding:5px 0px 0px 5px',
		items : [{
			border : false,
			width : 220,
			items:[{
				xtype : 'datefield',
				id:'eleMeterEventStartDateField',
				fieldLabel : '开始日期',
				labelAlign:'right', 
				labelSeparator:'',
				width:195,
				labelWidth : 70,
				value: Ext.Date.add(new Date(), Ext.Date.DAY, -6),
				format : 'Y-m-d'
			}]
		},{
			border : false,
			width : 220,
			items:[{
				xtype : 'datefield',
				id:'eleMeterEventEndDateField',
				fieldLabel : '结束日期',
				labelAlign:'right', 
				labelSeparator:'',
				width:195,
				labelWidth : 70,
				value:new Date(),
				format : 'Y-m-d'
			}]
		},{
			border : false,
			width : 220,
			items:[{
   	                xtype:'button',
   	                width:70,
   	                text: '查询',
   	                margin : '0 0 0 10',
   	                handler: function() {
   	                	queryEleMeterEventRec();
   	                }
            }]
		}]
	});	
	
	//查询电能表事件记录
	function queryEleMeterEventRec(){
        	var ss=selectModel.getSelection();
	    	if(Ext.isEmpty(ss)){
	    		Ext.Msg.alert('提示', '请选择异常事件');
	    		return;
	    	}
        	eleMeterEventRecStore.proxy.extraParams={
				'queryItems.consNo' : ss[0].get('CONS_NO'),
				'queryItems.meterId': ss[0].get('METER_ID'),
				'queryItems.startDate':Ext.Date.format(Ext.getCmp('eleMeterEventStartDateField').getValue(),'Y-m-d'),
				'queryItems.endDate':Ext.Date.format(Ext.getCmp('eleMeterEventEndDateField').getValue(),'Y-m-d')
			};
			eleMeterEventRecStore.load();    
	}
	
	var abnormalEleMeterEventPanel2 = Ext.create('Ext.panel.Panel', {	
		layout:'border',
		border : false,
		items:[abnormalEleMeterEventPanel2Top,abnormalEleMeterEventRecPanel]
	});
	
	var abnormalEleMeterEventPanelTotal = Ext.create('Ext.panel.Panel', {	
		layout : 'card', 
		activeItem : 0,
		border : false,
		items : [abnormalEleMeterEventPanel1,abnormalEleMeterEventPanel2]
	});
	
	var abnormalEleMeterEventPanel = Ext.create('Ext.panel.Panel', {
		id:'abnormalEleMeterEventPanel',
		border : false,
		title:'电能表事件',
		layout : 'border',
		items:[{
			xtype:'panel',
			region:'north',
			height:30,
			border:false,
			items:[{
					margin : '5 0 0 20',
			        xtype: 'radiogroup',
			        hideLabel: true,
			        columns: 2,
					vertical: true,
					width:250,
			        items: [
			            { boxLabel: '异常事件', name: 'event', inputValue: '1', checked: true,
			            	 listeners: {
			            	 	change:function(t,newValue,oldValue,e){
			            	 			if(newValue=='1'){
			            	 				abnormalEleMeterEventPanelTotal.getLayout().setActiveItem(0);
			            	 			}
			            	 			else{
			            	 				abnormalEleMeterEventPanelTotal.getLayout().setActiveItem(1);
			            	 			}
			            	 		}
			            	 }
			            },
			            { boxLabel: '事件记录', name: 'event', inputValue: '2'}
			        ]
			    }]
		},{
			xtype:'panel',
			region:'center',
			layout:'fit',
			items:[abnormalEleMeterEventPanelTotal]
		}]
	});
	// --------------终端事件-------------------
	Ext.define('tmnlEleMeterEvent', {
				extend : 'Ext.data.Model',
				fields : ["ALARM_ID", "ALARM_TYPE_CODE", "METER_ID",
						"EVENT_NO", "EVENT_NAME", "ID", "EVENT_TYPE_CODE",
						"TERMINAL_ID", "EVENT_TIME", "REC_TIME"]
			});
			
			
	var tmnlEleMeterEventStore = Ext.create('Ext.data.Store', {
				model : 'tmnlEleMeterEvent',
				remoteSort : true,
				// pageSize: DEFAULT_PAGE_SIZE,
				buffered : true,
				proxy : {
					type : 'ajax',
					url : 'measureExceptionAnalAction!queryMeterEvent.action',
					reader : {
						type : 'json',
						root : 'resultList'
					}
				}
			});	
	var abnormalEleTmnlEventPanel = Ext.create('Ext.grid.Panel', {
		title : '终端事件',
		loadMask : true,
		border : false,
		store : tmnlEleMeterEventStore,
		viewConfig : {
			trackOver : false
		},
		columnLines : true,
		columns : [{
					text : "终端资产号",
					width : 120,
					dataIndex : 'TMNL_ASSET_NO',
					align : 'center',
					sortable : true
				}, {
					text : "事件名称",
					width : 120,
					dataIndex : 'EVENT_NAME',
					align : 'center',
					sortable : false
				}, {
					text : "发生时间",
					width : 90,
					dataIndex : 'EVENT_TIME',
					align : 'center',
					sortable : true
				}, {
					text : "接收时间",
					width : 120,
					dataIndex : 'REC_TIME',
					align : 'center',
					sortable : false
				}, {
					text : "明细",
					width : 120,
					align : 'center',
					renderer : function(s, m, rec) {
						return "<a href='javascript:' onclick='queryAlarmEventDetailInfo(\""
								+ rec.get('ID') +"\",\"1"+ "\");'>查看</a>";
					}
				}]
	});
	
	var fileInfoPanel = Ext.create('Ext.form.Panel', {
				// title : '档案',
				layout : 'column',
				border : false,
				bodyStyle : 'padding:5px 0px 10px 5px',
				items : [{
							columnWidth : .33,
							xtype : 'form',
							border : false,
//							labelAlign : "right",
//							labelWidth : 40,
							items : [{
										xtype : 'label',
										html : "<font size=2px;font-weight:bold>用户信息</font>",
										margin : '5 20 20 100'
									}, {
										xtype : 'textfield',
										id : 'eleAbnormalConsNo-1',
										fieldLabel : '用户编号',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 70,
										readOnly : true

									}, {
										xtype : 'textfield',
										id : 'eleAbnormalConsName-1',
										fieldLabel : '用户名称',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 70,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'eleAbnormalVolt-1',
										fieldLabel : '供电电压',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 70,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'eleAbnormalElecAddr-1',
										fieldLabel : '用电地址',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 70,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'eleAbnormalRuncap-1',
										fieldLabel : '运行容量',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 70,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'eleAbnormalTrade-1',
										fieldLabel : '行业分类',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 70,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'eleAbnormalEleType-1',
										fieldLabel : '用电类别',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 70,
										readOnly : true
									}]

						}, {
							columnWidth : .33,
							xtype : 'form',
							border : false,
							items : [{
										xtype : 'label',
										html : "<font size=2px;font-weight:bold>终端信息</font>",
										margin : '5 20 20 110'
									}, {
										xtype : 'textfield',
										id : 'eleAbnormalTerAddr-1',
										fieldLabel : '终端地址',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 80,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'eleAbnormalTerAssetNo-1',
										fieldLabel : '终端资产号',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 80,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'eleAbnormalTerStatus-1',
										fieldLabel : '终端状态',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 80,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'eleAbnormalTerProlCode-1',
										fieldLabel : '终端规约',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 80,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'eleAbnormalTerType-1',
										fieldLabel : '终端类别',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 80,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'eleAbnormalTerCollMode-1',
										fieldLabel : '采集方式',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 80,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'eleAbnormalTerFactory-1',
										fieldLabel : '终端厂商',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 80,
										readOnly : true
									}]

						}, {
							columnWidth : .3,
							xtype : 'form',
							border : false,
							items : [{
										xtype : 'label',
										html : "<font size=2px;font-weight:bold>电表信息</font>",
										margin : '5 20 20 105'
									}, {
										xtype : 'textfield',
										id : 'eleAbnormalMeterAssetNo-1',
										fieldLabel : '电能表资产号',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 80,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'eleAbnormalMeterCpt-1',
										fieldLabel : '综合倍率',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 80,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'eleAbnormalMeterProl-1',
										fieldLabel : '通讯规约',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 80,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'eleAbnormalMeterMp-1',
										fieldLabel : '计量点性质',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 80,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'eleAbnormalMeterEffect-1',
										fieldLabel : '主用途类型',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 80,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'eleAbnormalMeterVolt-1',
										fieldLabel : '电压等级',
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 80,
										readOnly : true
									}, {
										xtype : 'textfield',
										id : 'eleAbnormalMeterWirMode-1',
										fieldLabel : '接线方式',
										readOnly : true,
										labelAlign:'right', 
										labelSeparator:'',
										width:195,
										labelWidth : 80,
										readOnly : true
									},{
										xtype : 'textfield',
										id : 'eleAbnormalMeterMeaMode-1',
										labelAlign:'right', 
										labelSeparator:'',
										fieldLabel : '计量方式',
										width:195,
										labelWidth : 80,
										readOnly : true
									}]

						}]
			});
	var abnormalEleFilePanel = Ext.create('Ext.panel.Panel', {
				title : '档案信息',
				border : true,
				layout : 'fit',
				monitorResize : true,
				autoScroll : true,
				items : [fileInfoPanel]
			});
	//------------异常历史信息------------------
	var hisSelectModel = Ext.create('Ext.selection.CheckboxModel');
	Ext.define('hisInfoModel', {
				extend : 'Ext.data.Model',
				fields : ["CONS_NO","ALARM_ID","ALARM_CODE", "EVENT_NAME", "EVENT_LEVEL","FIRST_ALARM_DATE", "ALARM_DATE",
						"ALARM_CNT", "FIRST_RESUME_DATE", "RESUME_DATE",
						"RESUME_DAY_CNT","ALARM_SRC","METER_ASSET_NO"]
			});
	var abnormalEleHisStore = Ext.create('Ext.data.Store', {
				model : 'hisInfoModel',
				remoteSort : true,
				pageSize : DEFAULT_PAGE_SIZE,
				proxy : {
					type : 'ajax',
					url : 'eleAbnormalAnalyAction!queryAlarmAnalyseHisInfo.action',
					reader : {
						type : 'json',
						root : 'eleHisInfoList',
						totalProperty : 'totalCount'
					}
				}
			});
			
	var abnormalInfoHisGrid = Ext.create('Ext.grid.Panel', {
				loadMask : true,
				selModel : hisSelectModel,
				region : 'center',
				border : true,
				store : abnormalEleHisStore,
				tbar : [{
						xtype : 'label',
						html : "<font font-weight:bold;>查询日期内历史信息</font>"
					},
					'->',
					{
							xtype : 'datefield',
							fieldLabel : '开始日期',							
							id : 'eleHisQuerySdate1',
						//	value : new Date().add(Date.MONTH,-3),
							value : new Date(),
							format : 'Y-m-d'
						},
					{
							xtype : 'datefield',
							fieldLabel : '结束日期',							
							id : 'eleHisQueryEdate1',
							value : new Date(),
							format : 'Y-m-d'
						}, {
							xtype : 'button',
							text : '查询',
							align : 'center',
							width : 80,						
							handler : function() {	
								if(Ext.isEmpty(sConsNo)||Ext.isEmpty(sAlarmCode)){
									Ext.Msg.alert("提示","请选择一条记录");
									return;
								}else{
									queryExceptHisInfo(sConsNo,sAlarmCode);
								}
							}
						}
						
					],
//				verticalScrollerType : 'paginggridscroller',
//				invalidateScrollerOnRefresh : false,
				viewConfig : {
					trackOver : false
				},
				columnLines : true,
				columns : [{
							text : "用户编码",
							width : 120,
							dataIndex : 'CONS_NO',
							align : 'center',
							sortable : true
						}, {
							text : "告警编码",
							width : 120,
							dataIndex : 'ALARM_CODE',
							align : 'center',
							sortable : false
						}, {
							text : "事件名称",
							width : 120,
							dataIndex : 'EVENT_NAME',
							align : 'center',
							sortable : false
						}, {
							text : "事件等级",
							width : 90,
							dataIndex : 'EVENT_LEVEL',
							align : 'center',
							sortable : true
						},  {
							text : "最近告警时间",
							width : 120,
							dataIndex : 'ALARM_DATE',
							align : 'center',
							sortable : false
						}, {
							text : "第一次告警时间",
							width : 120,
							dataIndex : 'FIRST_ALARM_DATE',
							align : 'center',
							sortable : false
						}, {
							text : "告警发生次数",
							width : 120,
							dataIndex : 'ALARM_CNT',
							align : 'center',
							sortable : true
						}, {
							text : "告警来源",
							width : 120,
							dataIndex : 'ALARM_SRC',
							align : 'center',
							sortable : false
						}, {
							text : "最近恢复时间",
							width : 120,
							dataIndex : 'RESUME_DATE',
							align : 'center',
							sortable : false
						}, {
							text : "第一次恢复时间",
							width : 120,
							dataIndex : 'FIRST_RESUME_DATE',
							align : 'center',
							sortable : false
						}, {
							text : "恢复天数",
							width : 90,
							dataIndex : 'RESUME_DAY_CNT',
							align : 'center',
							sortable : false
						}, {
							text : "电能表资产号",
							width : 120,
							dataIndex : 'METER_ASSET_NO',
							align : 'center',
							sortable : false
						}],
				  dockedItems: [{
				        xtype: 'pagingtoolbar',
				        store: abnormalEleHisStore,   
				        dock: 'bottom',
				        displayInfo: true
				    }]	

			});

	var abnormalEleHistoryPanel = Ext.create('Ext.panel.Panel', {
				title : '异常历史信息',
				border : true,
				layout : 'fit',
				monitorResize : true,
				autoScroll : true,
				items : [abnormalInfoHisGrid]
			});
			
	var abnormalRelaInfoTabpanel = Ext.createWidget('tabpanel', {
				border : false,
				region : 'center',
				//split : true,
				activeTab : 0,
				defaults : {
					bodyPandding : 10
				},
				items : [abnormalEleChartPanel, abnormalEleMeterEventPanel,
						abnormalEleTmnlEventPanel, abnormalEleFilePanel,
						abnormalEleHistoryPanel]
			})

	// ------------右下角查询条件panel------------------
	Ext.define('orgSt', {
				extend : 'Ext.data.Model',
				fields : [{
							name : 'ORG_NO',
							type : 'string'
						}, {
							name : 'ORG_NAME',
							type : 'string'
						}, {
							name : 'ORG_TYPE',
							type : 'string'
						}]
			});
	var orgStore = Ext.create('Ext.data.Store', {
		model : 'orgSt',
		proxy : {
			type : 'ajax',
			url : 'eleAbnormalAnalyAction!queryOrgNolist.action',
			reader : {
				root : 'orgList',
				type : 'json'
			}
		}
		//	 autoLoad: true
	});
	
	orgStore.load({
				params : {
					orgNo : LOGGEDORGNO
				},
				callback: function(records, operation, success) {
					Ext.getCmp('eleAbnolOrgValue1').setValue(LOGGEDORGNO);
				}
			});
			
	Ext.define('eventSt', {
				extend : 'Ext.data.Model',
				fields : [{
							name : 'EVENT_LEVEL',
							type : 'string'
						}, {
							name : 'EVENT_LEVEL_NAME',
							type : 'string'
						}]
			});
	Ext.define('eventCons', {
				extend : 'Ext.data.Model',
				fields : [{
							name : 'CONS_TYPE',
							type : 'string'
						}, {
							name : 'CONS_TYPE_NAME',
							type : 'string'
						}]
			});
	var eventLevelStore = Ext.create('Ext.data.Store', {
				model : 'eventSt',
				proxy : {
					type : 'ajax',
					url : 'eleAbnormalAnalyAction!queryEventLevelList.action',
					reader : {
						root : 'eventList',
						type : 'json'
					}
				},
				autoLoad : true
			})
	eventLevelStore.load({
				callback: function(records, operation, success) {
					Ext.getCmp('eleAbnolEventValue1').setValue('01');
				}
			});
			
	var constypeStore = Ext.create('Ext.data.Store', {
				model : 'eventCons',
				proxy : {
					type : 'ajax',
					url : 'eleAbnormalAnalyAction!queryconstypeList.action',
					reader : {
						root : 'consList',
						type : 'json'
					}
				},
				autoLoad : true
			})
	constypeStore.load({
				callback: function(records, operation, success) {
					Ext.getCmp('constype1').setValue('1');
				}
			});
			
	Ext.define('flowStatusCodeModel', {
				extend : 'Ext.data.Model',
				fields : [{
							name : 'flowStatusCodeValue',
							type : 'string'
						}, {
							name : 'flowStatusCodeName',
							type : 'string'
						}]
			});		
			
	var flowStatusCodeStore = Ext.create('Ext.data.Store', {
		    model: 'flowStatusCodeModel',
		    data : [
		        {flowStatusCodeValue: '0', flowStatusCodeName: '持续关注'},
		        {flowStatusCodeValue: '1', flowStatusCodeName: '新异常'}
		    ],
		    autoLoad : true
	});
	
	var queryContionParam = Ext.create('Ext.form.Panel', {
				border : true,
				title : '查询条件',
				region : 'east',
				bodyStyle : 'padding:10px 0px 10px 10px',
				width : 300,
				items : [{
							xtype : 'combo',
							fieldLabel : '供电单位',
							name : 'eleAbnolOrgValue',
							id : 'eleAbnolOrgValue1',
							queryMode: 'local',
							store : orgStore,
							labelAlign:'right', 
							labelSeparator:'',
							labelWidth:70,
							displayField : 'ORG_NAME',
							valueField : 'ORG_NO',
							emptyText : '----请输入----',
							blankText : '----请输入----',
							margin : '10 20 10 10'
						}, {
							xtype : 'combo',
							fieldLabel : '事件等级',
							name : 'eleAbnolEventValue',
							id : 'eleAbnolEventValue1',
							queryMode: 'local',
							store : eventLevelStore,
							labelAlign:'right', 
							labelSeparator:'',
							labelWidth:70,
							displayField : 'EVENT_LEVEL_NAME',
							valueField : 'EVENT_LEVEL',
							emptyText : '----请输入----',
							blankText : '----请输入----',
							margin : '10 20 10 10'
						}, {
							xtype : 'combo',
							fieldLabel : '事件状态',
							name : 'flowStatusCode',
							id : 'flowStatusCode1',
							store : flowStatusCodeStore,
							queryMode: 'local',
							labelAlign:'right', 
							labelSeparator:'',
							labelWidth:70,
							displayField : 'flowStatusCodeName',
							valueField : 'flowStatusCodeValue',
							value:'1',
							margin : '10 20 10 10'
						},
						{
						 	xtype : 'combo',
							fieldLabel : '用户类型',
							name : 'constype',
							id : 'constype1',
							store : constypeStore,
							queryMode: 'local',
							labelAlign:'right', 
							labelSeparator:'',
							labelWidth:70,
							displayField : 'CONS_TYPE_NAME',
							valueField : 'CONS_TYPE',
							value:'1',
							margin : '10 20 10 10'
						},
							{
							xtype : 'datefield',
							fieldLabel : '查询日期',
							name : 'queryDate',
							id : 'eleAbnolQueryDate1',
							labelAlign:'right', 
							labelSeparator:'',
							labelWidth:70,
							value : new Date(),
							format : 'Y-m-d',
							margin : '10 20 10 10',
							hidden:true
						}, {
							xtype : 'textfield',
							fieldLabel : '用户编号',
							name : 'eleAbnolConsNo',
							id : 'eleAbnolConsNo1',
							labelAlign:'right', 
							labelSeparator:'',
							labelWidth:70,
							emptyText : '----请输入----',
							blankText : '----请输入----',
							margin : '10 20 10 10'

						}, {
							xtype : 'textfield',
							fieldLabel : '终端地址',
							name : 'eleAbnolTerminalAddr',
							id : 'eleAbnolTerminalAddr1',
							labelAlign:'right', 
							labelSeparator:'',
							labelWidth:70,
							emptyText : '----请输入----',
							blankText : '----请输入----',
							margin : '10 20 10 10'
						}, {
							xtype : 'button',
							text : '查询',
							width: 80,
							align : 'center',
							margin : '10 20 10 155',
							handler : function() {
								queryEleAbnormalInfoFun();
							}
						}]

			});
	var bottom_panel = Ext.create('Ext.panel.Panel', {
				border : false,
				layout : 'border',
				region : 'center',
				items : [abnormalRelaInfoTabpanel, queryContionParam]
			});

	var totalPanel = Ext.create('Ext.panel.Panel', {
				layout : 'border',
				border : false,
				items : [top_panel, bottom_panel]

			});
	// -----------function--------------
	function queryEleAbnormalInfoFun() {
		var orgNo = Ext.getCmp("eleAbnolOrgValue1").getValue();
		var eventLevel = Ext.getCmp("eleAbnolEventValue1").getValue();
		var queryDate = Ext.getCmp("eleAbnolQueryDate1").getRawValue();
		var consNo = Ext.getCmp("eleAbnolConsNo1").getValue();
		var terminalAddr = Ext.getCmp("eleAbnolTerminalAddr1").getValue();
		var flowStatusCode = Ext.getCmp("flowStatusCode1").getValue();
		var consType=Ext.getCmp("constype1").getValue();
		gOrgNo = Ext.getCmp("eleAbnolOrgValue1").getValue();
		gEventLevel = Ext.getCmp("eleAbnolEventValue1").getValue();
		gQueryDate = Ext.getCmp("eleAbnolQueryDate1").getRawValue();
		gConsNo = Ext.getCmp("eleAbnolConsNo1").getValue();
		gTerminalAddr = Ext.getCmp("eleAbnolTerminalAddr1").getValue();
		gFlowStatusCode=Ext.getCmp("flowStatusCode1").getValue();
		
		if (Ext.isEmpty(orgNo)) {
			Ext.Msg.alert("提示", "请选择供电单位！");
			return;
		}
		if (Ext.isEmpty(eventLevel)) {
			Ext.Msg.alert("提示", "事件等级！");
			return;
		}
		eventCountStore.removeAll();
		var queryItems = {};
		Ext.Ajax.request({
			 	    url : 'eleAbnormalAnalyAction!queryEleAbnormalTotalList.action',					
					params : {
						'queryItems.alarmType': '01',
						'queryItems.orgNo' : orgNo,
						//'queryItems.orgNo' : orgNo,
						'queryItems.eventLevel' : eventLevel,
						'queryItems.queryDate' : queryDate,
						'queryItems.consNo' : consNo,
						'queryItems.terminalAddr' : terminalAddr,
						'queryItems.flowStatusCode':flowStatusCode,
						'queryItems.consType':consType
					},
				success : function(response) {
					var result = Ext.decode(response.responseText);
					var staTotalList = result.eleStattisTotalList;
					if(!Ext.isEmpty(staTotalList)){
						eventCountStore.loadData(staTotalList);
					}
					/*var exceptionInfo ="";
					var count = 0;
					for(var i=0;i<staTotalList.length;i++){
						exceptionInfo+='<div style="float:left" align = "center" width="50px">'+staTotalList[i]['EVENT_NAME']+'</div>'
									 +"<div style='float:left' align = 'center' width='30px'><a href='javascript:' onclick='queryExceptInfo(\""
									 + staTotalList[i]['ALARM_CODE']
									 + "\");'>"+staTotalList[i]['CNT']+'</a></div>'
									 +'<div align = "center" width="10px">件</div>';
						count+=staTotalList[i]['CNT'];
					}
					exceptionInfo+='<div style="float:left" align = "center" width="50">合计</div>'
										 +'<div style="float:left" align = "center" width="30">'+count+'</a></div>'
										 +'<div align = "center" width="10">件</div>';
					exceptionInfoLabel.setText(exceptionInfo,false);*/
				},
				failure : function(response) {
					Ext.Msg.alert('提示', '查询异常统计信息失败');
				}

			});
		queryExceptInfo('');
	}

	renderModel(totalPanel, "计量异常分析");
	
	
	queryExceptInfo = function (alarmCode){
		var consType=Ext.getCmp("constype1").getValue();
		    //msExceAnalStore.removeAll();
			msExceAnalStore.proxy.extraParams={
				'queryItems.orgNo' : gOrgNo,
				//'queryItems.orgNo' : '34401',
				'queryItems.eventLevel' : gEventLevel,
				'queryItems.queryDate' : gQueryDate,
				'queryItems.consNo' : gConsNo,
				'queryItems.terminalAddr' : gTerminalAddr,
				'queryItems.alarmType': '01',
				'queryItems.alarmCode': alarmCode,
				'queryItems.flowStatusCode':gFlowStatusCode,
				'queryItems.consType':consType
			};
			
			msExceAnalStore.currentPage=1;
			msExceAnalStore.load({
			    	start:0
			});
			//msExceAnalStore.guaranteeRange(0, DEFAULT_PAGE_SIZE-1);	
	}
	
	queryAlarmEventDetailInfo = function (id,type){ //1--异常事件  2--事件记录
		var url ='';
		if(type=1){
			url='measureExceptionAnalAction!queryMeterEventDetail.action';
		}
		else if(type==2){
			url='measureExceptionAnalAction!queryMeterEventRecDetail.action';
		}
		
		Ext.define('EleMeterEventDetail',{
			extend : 'Ext.data.Model',
			fields : [  "ITEM_NO",
				        "EVENT_DATA"
				      ]
		});
		
		var eleMeterEventDetailStore =   Ext.create('Ext.data.Store', {
			model : 'EleMeterEventDetail',
			remoteSort : true,
			//pageSize: DEFAULT_PAGE_SIZE,
			buffered: true,
			proxy : {
				type : 'ajax',
				url : url,
				reader : {
					type : 'json',
					root : 'resultList'
				}
			}	
		});
		
		var eleMeterEventGridPanel = Ext.create('Ext.grid.Panel', {
					loadMask : true,
					border : false,
					store:eleMeterEventDetailStore,
					viewConfig: {
			            trackOver: false
			        },
					columnLines : true,
					columns : [{
								text : "序号",
								width : 120,
								dataIndex : 'ITEM_NO',
								align : 'center',
								sortable : true
							}, {
								text : "事件对应数据",
								width : 120,
								dataIndex : 'EVENT_DATA',
								align : 'center',
								sortable : false
							}]
			});
			
			eleMeterEventDetailStore.proxy.extraParams={
				'queryItems.id' : id
			};
			eleMeterEventDetailStore.load();
			
			Ext.create('Ext.window.Window', {
			       modal:true,
			       height:110,
			       width:340,
				   resizable:false,
			       title:'电能表事件明细',
			       layout:'fit',
			       items:[eleMeterEventGridPanel]
			}).show();
	}
	
	//---------查询用户档案信息--------------
	function queryFileInfoFun(record) {
		fileInfoPanel.getForm().reset();
		var queryFileItems = {};
		var orgNo = record.get('ORG_NO');
		var consNo = record.get('CONS_NO');
		var termimalAddr = record.get('TERMINAL_ADDR');
		var meterId = record.get('METER_ID');

		Ext.Ajax.request({
					url : 'eleAbnormalAnalyAction!queryFileTotalList.action',
					params : {
						'queryFileItems.orgNo' : orgNo,
						'queryFileItems.consNo' : consNo,
						'queryFileItems.termimalAddr' : termimalAddr,
						'queryFileItems.meterId' : meterId
					},
					success : function(response) {
						var result = Ext.decode(response.responseText);
						var staTotalList = result.eleFileTotalList;
						if(staTotalList.length>0)
						{
							setFileFormValue(staTotalList);
						}
					}
				});
	};
	
	function setFileFormValue(staTotalList) {
		// ---用户的--
		Ext.getCmp("eleAbnormalConsNo-1").setValue(staTotalList[0].CONS_NO);
		Ext.getCmp("eleAbnormalConsName-1").setValue(staTotalList[0].CONS_NAME);
		Ext.getCmp("eleAbnormalVolt-1").setValue(staTotalList[0].VOLT);
		Ext.getCmp("eleAbnormalElecAddr-1").setValue(staTotalList[0].ELEC_ADDR);
		Ext.getCmp("eleAbnormalRuncap-1").setValue(staTotalList[0].RUN_CAP);
		Ext.getCmp("eleAbnormalTrade-1").setValue(staTotalList[0].TRADE_NAME);
		Ext.getCmp("eleAbnormalEleType-1").setValue(staTotalList[0].ELEC_TYPE);
		// ----终端的----
		Ext.getCmp("eleAbnormalTerAddr-1")
				.setValue(staTotalList[0].TERMINAL_ADDR);
		Ext.getCmp("eleAbnormalTerAssetNo-1")
				.setValue(staTotalList[0].TMNL_ASSET_NO);
		Ext.getCmp("eleAbnormalTerStatus-1")
				.setValue(staTotalList[0].STATUS_NAME);
		Ext.getCmp("eleAbnormalTerProlCode-1")
				.setValue(staTotalList[0].PROTOCOL_NAME);
		Ext.getCmp("eleAbnormalTerType-1").setValue(staTotalList[0].TMNL_TYPE);
		Ext.getCmp("eleAbnormalTerCollMode-1")
				.setValue(staTotalList[0].COLL_MODE_NAME);
		Ext.getCmp("eleAbnormalTerFactory-1")
				.setValue(staTotalList[0].FACTORY_NAME);
		// -----电表的----

		Ext.getCmp("eleAbnormalMeterAssetNo-1")
				.setValue(staTotalList[0].ASSET_NO);
		Ext.getCmp("eleAbnormalMeterCpt-1").setValue(staTotalList[0].T_FACTOR);
		Ext.getCmp("eleAbnormalMeterProl-1").setValue(staTotalList[0].COMM_MODE);
		Ext.getCmp("eleAbnormalMeterMp-1").setValue(staTotalList[0].MP_ATTR_NAME);
		Ext.getCmp("eleAbnormalMeterEffect-1")
				.setValue(staTotalList[0].USAGE_TYPE_NAME);
		Ext.getCmp("eleAbnormalMeterVolt-1").setValue(staTotalList[0].VOLT_CODE);
		Ext.getCmp("eleAbnormalMeterWirMode-1").setValue(staTotalList[0].WIRING_MODE_NAME);
		Ext.getCmp("eleAbnormalMeterMeaMode-1")
				.setValue(staTotalList[0].MEAS_MODE);

	}
	
	//-------查询异常历史信息-------------------
	function queryExceptHisInfo(consNo,alarmCode){
		var queryItems = {};
//		abnormalEleHisStore.load({
//					params : {
		abnormalEleHisStore.proxy.extraParams = {
						'queryItems.alarmType' : alarm_type,
						'queryItems.consNo' : consNo,
						'queryItems.querySdate' : Ext
								.getCmp("eleHisQuerySdate1").getRawValue(),
						'queryItems.queryEdate' : Ext
								.getCmp("eleHisQueryEdate1").getRawValue(),
						'queryItems.alarmCode' : alarmCode
					}
			//	});
	//	abnormalEleHisStore.guaranteeRange(0, DEFAULT_PAGE_SIZE - 1);
					abnormalEleHisStore.currentPage=1;
					abnormalEleHisStore.load({
			    	start:0
			});
	}
	
	//--------------------查询终端事件------------------------------------
	function queryTmnlEventInfo(alarmId){		
		tmnlEleMeterEventStore.proxy.extraParams = {
			'queryItems.alarmId' : alarmId,
			'queryItems.eventTypeCode':'01'
		};
		tmnlEleMeterEventStore.load();
	}
	//测试分页
/*	Ext.tip.QuickTipManager.init();

	Ext.define('ForumThread', {
        extend: 'Ext.data.Model',
        fields: [
            'title', 'forumtitle', 'forumid', 'username',
            {name: 'replycount', type: 'int'},
            {name: 'lastpost', mapping: 'lastpost', type: 'date', dateFormat: 'timestamp'},
            'lastposter', 'excerpt', 'threadid'
        ],
        idProperty: 'threadid'
    });

    // create the Data Store
    var store = Ext.create('Ext.data.Store', {
        pageSize: 50,
        model: 'ForumThread',
        remoteSort: true,
        proxy: {
            // load using script tags for cross domain, if the data in on the same domain as
            // this page, an HttpProxy would be better
            type: 'jsonp',
            url: 'http://www.sencha.com/forum/topics-browse-remote.php',
            reader: {
                root: 'topics',
                totalProperty: 'totalCount'
            },
            // sends single sort as multi parameter
            simpleSortMode: true
        },
        sorters: [{
            property: 'lastpost',
            direction: 'DESC'
        }]
    });

    var totalPanel = Ext.create('Ext.grid.Panel', {
        width: 700,
        height: 500,
        title: 'ExtJS.com - Browse Forums',
        store: store,
        disableSelection: true,
        loadMask: true,
        viewConfig: {
            id: 'gv',
            trackOver: false,
            stripeRows: false,
            plugins: [{
                ptype: 'preview',
                bodyField: 'excerpt',
                expanded: true,
                pluginId: 'preview'
            }]
        },
        // grid columns
        columns:[{
            // id assigned so we can apply custom css (e.g. .x-grid-cell-topic b { color:#333 })
            // TODO: This poses an issue in subclasses of Grid now because Headers are now Components
            // therefore the id will be registered in the ComponentManager and conflict. Need a way to
            // add additional CSS classes to the rendered cells.
            id: 'topic',
            text: "Topic",
            dataIndex: 'title',
            flex: 1,
            //renderer: renderTopic,
            sortable: false
        },{
            text: "Author",
            dataIndex: 'username',
            width: 100,
            hidden: true,
            sortable: true
        },{
            text: "Replies",
            dataIndex: 'replycount',
            width: 70,
            align: 'right',
            sortable: true
        },{
            id: 'last',
            text: "Last Post",
            dataIndex: 'lastpost',
            width: 150,
            //renderer: renderLast,
            sortable: true
        }],
        // paging bar on the bottom
        bbar: Ext.create('Ext.PagingToolbar', {
        	width:30,
            store: store,
            displayInfo: true,
            displayMsg: 'Displaying topics {0} - {1} of {2}',
            emptyMsg: "No topics to display"
        })
       // renderTo: 'topic-grid'
    });
    var totalPanel1 = Ext.create('Ext.panel.Panel', {
    	items:[totalPanel]
    });
	renderModel(totalPanel1, "计量异常分析");*/
})