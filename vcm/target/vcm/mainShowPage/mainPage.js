	Ext.onReady(function(){
		
		Ext.define('storeModel_4',{
			extend :'Ext.data.Model',
			fields:["EXCEPT_TYPE_NAME",'EVENT_NAME','EXCETION_NUM1','EXCETION_NUM2','EXCETION_NUM3']
		});
		
		Ext.define('storeModel_1',{
			extend :'Ext.data.Model',
			fields:["EXCEPT_TYPE_NAME",'EVENT_NAME','EXCETION_NUM1','EXCETION_NUM2','EXCETION_NUM3']
		});
		
		Ext.define('storeModel_2',{
			extend :'Ext.data.Model',
			fields:["EXCEPT_TYPE_NAME",'EVENT_NAME','EXCETION_NUM1','EXCETION_NUM2','EXCETION_NUM3']
		});
		
		Ext.define('storeModel_3',{
			extend :'Ext.data.Model',
			fields:["EXCEPT_TYPE_NAME",'EVENT_NAME','EXCETION_NUM1','EXCETION_NUM2','EXCETION_NUM3']
		});
		
		var gridStore_4 = Ext.create('Ext.data.Store', { 
	        model: 'storeModel_4', 
	        pageSize : 12,
	        proxy: { 
	           //异步获取数据，这里的URL可以改为任何动态页面，只要返回JSON数据即可 
	            type: 'ajax', 
	            url: 'mainPageAction!rightQuery_1', 
	            reader: { 
	                root: 'resultList'
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
	            url: 'mainPageAction!rightQuery_2', 
	            reader: { 
	                root: 'resultList'
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
	             url: 'mainPageAction!rightQuery_3', 
	            reader: { 
	                root: 'resultList'
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
	             url: 'mainPageAction!rightQuery_4', 
	            reader: { 
	                root: 'resultList'
	            } 
	        }, 
	        autoLoad: true 
    	});
    	
    	var gridPanel_4 = Ext.create('Ext.grid.Panel', {
    			id : 'gridPanel_4',
				store : gridStore_4,
				title : '<font color="#D4101D" size="2" family="楷体">严重</font>',
				border : true,
				columnLines : false,
				columns : [{
							text : "异常类型",
							dataIndex : 'EXCEPT_TYPE_NAME',
							width : 80,
							align :'center',
							sortable : true
						}, {
							text : "异常名称",
							dataIndex : 'EVENT_NAME',
							align :'center',
							width : 80,
							sortable : false,
							renderer : function (val) {
							    if(null!=val){
									var html = '<div ext:qtitle="异常名称" ext:qtip="' + val + '">' + val + '</div>';
									return html;
							    }
								else
									return '';
								}
						}, {
							text : "数量",
							dataIndex : 'EXCETION_NUM1',
							width : 40,
							align :'center',
							sortable : true
						}, {
							text : "未处理",
							dataIndex : 'EXCETION_NUM2',
							align :'center',
							width : 60,
							sortable : true
						}, {
							text : "处理中",
							dataIndex : 'EXCETION_NUM3',
							align :'center',
							width : 60,
							sortable : true
						}],
				disableSelection : true,
				autoScroll : false,
				loadMask : true,
				viewConfig : {
					id : 'gv',
					trackOver : true,
					stripeRows : true
				},
				bbar: Ext.create('Ext.PagingToolbar', {
	            store: gridStore_4,
	            displayInfo: true,
	            beforePageText : '第',
	            afterPageText : '页,共【{0}】页',
	            nextText :"下一页",
	            prevText : "上一页",
	            firstText : '第一页',
	            lastText : '最后一页',
	            refreshText : '刷新',
	            displayMsg: '显示{0}-{1}条',
	            emptyMsg: "无数据显示"
        		})
			});
		
		var	gridPanel_1 = Ext.create('Ext.grid.Panel', {
				id : 'gridPanel_1',
				store : gridStore_1,
				title : '<font color="#D46B1D" size="2">重要</font>',
				border : true,
				columnLines : true,
				columns : [{
							text : "异常类型",
							dataIndex : 'EXCEPT_TYPE_NAME',
							width : 80,
							align :'center',
							sortable : true
						}, {
							text : "异常名称",
							dataIndex : 'EVENT_NAME',
							align :'center',
							width : 80,
							sortable : false
						}, {
							text : "数量",
							dataIndex : 'EXCETION_NUM1',
							width : 40,
							align :'center',
							sortable : true
						}, {
							text : "未处理",
							dataIndex : 'EXCETION_NUM2',
							align :'center',
							width : 60,
							sortable : true
						}, {
							text : "处理中",
							dataIndex : 'EXCETION_NUM3',
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
	            store: gridStore_1,
	            displayInfo: true,
	            beforePageText : '第',
	            afterPageText : '页,共【{0}】页',
	            nextText :"下一页",
	            prevText : "上一页",
	            firstText : '第一页',
	            lastText : '最后一页',
	            refreshText : '刷新',
	            displayMsg: '显示{0}-{1}条',
	            emptyMsg: "无数据显示"
        		})
			});
		
		var	gridPanel_2 = Ext.create('Ext.grid.Panel', {
				id : 'gridPanel_2',
				store : gridStore_2,
				title : '<font color="#C7CF18" size="2" family="宋体">较重要</font>',
				border : true,
				columnLines : true,
				columns : [{
							text : "异常类型",
							dataIndex : 'EXCEPT_TYPE_NAME',
							width : 80,
							align :'center',
							sortable : true
						}, {
							text : "异常名称",
							dataIndex : 'EVENT_NAME',
							align :'center',
							width : 80,
							sortable : false
						}, {
							text : "数量",
							dataIndex : 'EXCETION_NUM1',
							width : 40,
							align :'center',
							sortable : true
						}, {
							text : "未处理",
							dataIndex : 'EXCETION_NUM2',
							align :'center',
							width : 60,
							sortable : true
						}, {
							text : "处理中",
							dataIndex : 'EXCETION_NUM3',
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
	            store: gridStore_2,
	            displayInfo: true,
	            beforePageText : '第',
	            afterPageText : '页,共【{0}】页',
	            nextText :"下一页",
	            prevText : "上一页",
	            firstText : '第一页',
	            lastText : '最后一页',
	            refreshText : '刷新',
	            displayMsg: '显示{0}-{1}条',
	            emptyMsg: "无数据显示"
        		})
			});	
		
		var	gridPanel_3 = Ext.create('Ext.grid.Panel', {
				id : 'gridPanel_3',
				store : gridStore_3,
				title : '<font color="#026115" size="2">一般</font>',
				border : true,
				columnLines : true,
				columns : [{
							text : "异常类型",
							dataIndex : 'EXCEPT_TYPE_NAME',
							width : 80,
							align :'center',
							sortable : true
						}, {
							text : "异常名称",
							dataIndex : 'EVENT_NAME',
							align :'center',
							width : 80,
							sortable : false
						}, {
							text : "数量",
							dataIndex : 'EXCETION_NUM1',
							width : 40,
							align :'center',
							sortable : true
						}, {
							text : "未处理",
							dataIndex : 'EXCETION_NUM2',
							align :'center',
							width : 60,
							sortable : true
						}, {
							text : "处理中",
							dataIndex : 'EXCETION_NUM3',
							align :'center',
							width : 60,
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
	            beforePageText : '第',
	            afterPageText : '页,共【{0}】页',
	            nextText :"下一页",
	            prevText : "上一页",
	            firstText : '第一页',
	            lastText : '最后一页',
	            refreshText : '刷新',
	            displayMsg: '显示{0}-{1}条',
	            emptyMsg: "无数据显示"
        		})
			});
		Ext.Ajax.request({
				url : 'mainPageAction!rightQuery_5',
				success : function(response) {
					var result = Ext.decode(response.responseText);
					var list = result.resultList;
					for (var i = 0; i < list.length; i++) {
						Ext.getDom("num").innerHTML =list[0].EXCETION_NUM;
						Ext.getDom("num1").innerHTML =list[0].EXCETION_NUM1;
						Ext.getDom("num2").innerHTML =list[0].EXCETION_NUM2;
						Ext.getDom("num3").innerHTML =list[0].EXCETION_NUM3;
						Ext.getDom("num4").innerHTML =list[0].EXCETION_NUM4;
					}
				}
		});	
		var xmlCity = '';
	var showFlash=function (){
			Ext.getDom("div_flashm1").innerHTML = "<embed id='flashm1' name='flashm1' width='650' height='580' src='img/anhui.swf' quality='high' wmode='transparent' pluginspage='http://www.macromedia.com/go/getflashplayer' flashvars='path=flash&htmlMod=m1&xmlCity="+xmlCity+" 'type='application/x-shockwave-flash' allowNetworking='all' allowScriptAccess='always'/>";
	};
	
		Ext.Ajax.request({
				url : 'mainPageAction!rightQuery_6',
				params : {
					queryCode : '1'
				},
				success : function(response) {
					var result = Ext.decode(response.responseText);
					var list = result.resultList;
					var xmlString = '';
					xmlString += '<anhui>';
					for (var i = 0; i < list.length; i++) {
						var color;
						color=0x96c878;
						xmlString += '<city id="'+list[i].ORG_NO+'" name="'+list[i].ORG_SHORT_NAME+'" color="'+color+'" alarmrank="'+list[i].REMARK+'" alarmcnt="'+list[i].EXCETION_NUM1+'"><![CDATA[异常总数:'+(list[i].EXCETION_NUM==null?0:list[i].EXCETION_NUM)+',<font color="#D4101D">严重异常:'+(list[i].EXCETION_NUM1==null?0:list[i].EXCETION_NUM1)+'</font>,<font color="#D46B1D">重要异常:'+(list[i].EXCETION_NUM2==null?0:list[i].EXCETION_NUM2)+'</font>,<font color="#D1B11A">较重要异常:'+(list[i].EXCETION_NUM3==null?0:list[i].EXCETION_NUM3)+'</font>,<font color="#026115">一般异常:'+(list[i].EXCETION_NUM4==null?0:list[i].EXCETION_NUM4)+'</font>]]></city>';
					}
					xmlString += '</anhui>';
						xmlCity = xmlString;
						showFlash();
						return xmlString;
				}
			});
		var tabPanel  = Ext.createWidget('tabpanel', {
			activeTab  :0,
			region : 'center',
			renderTo : 'gridTest',
			height :345,
			width : 349,
			items:[gridPanel_4,gridPanel_1,gridPanel_2,gridPanel_3],
			listeners : {
				'tabchange' : function(t, b) {
					if(b.getId()=='gridPanel_4'){
						Ext.Ajax.request({
							url : 'mainPageAction!rightQuery_6',
							params : {
								queryCode : '1'
							},
							success : function(response) {
								var result = Ext.decode(response.responseText);
								var list = result.resultList;
								var xmlString = '';
								xmlString += '<anhui>';
								for (var i = 0; i < list.length; i++) {
									var color;
									color=0x96c878;
									xmlString += '<city id="'+list[i].ORG_NO+'" name="'+list[i].ORG_SHORT_NAME+'" color="'+color+'" alarmrank="'+list[i].REMARK+'" alarmcnt="'+list[i].EXCETION_NUM1+'"><![CDATA[异常总数:'+(list[i].EXCETION_NUM==null?0:list[i].EXCETION_NUM)+',<font color="#D4101D">严重异常:'+(list[i].EXCETION_NUM1==null?0:list[i].EXCETION_NUM1)+'</font>,<font color="#D46B1D">重要异常:'+(list[i].EXCETION_NUM2==null?0:list[i].EXCETION_NUM2)+'</font>,<font color="#D1B11A">较重要异常:'+(list[i].EXCETION_NUM3==null?0:list[i].EXCETION_NUM3)+'</font>,<font color="#026115">一般异常:'+(list[i].EXCETION_NUM4==null?0:list[i].EXCETION_NUM4)+'</font>]]></city>';
								}
								xmlString += '</anhui>';
									xmlCity = xmlString;
									showFlash();
									return xmlString;
							}
						});
					}else if(b.getId()== 'gridPanel_1'){
						Ext.Ajax.request({
							url : 'mainPageAction!rightQuery_6',
							params : {
								queryCode : '2'
							},
							success : function(response) {
								var result = Ext.decode(response.responseText);
								var list = result.resultList;
								var xmlString = '';
								xmlString += '<anhui>';
								for (var i = 0; i < list.length; i++) {
									var color;
									color=0x96c878;
									xmlString += '<city id="'+list[i].ORG_NO+'" name="'+list[i].ORG_SHORT_NAME+'" color="'+color+'" alarmrank="'+list[i].REMARK+'" alarmcnt="'+list[i].EXCETION_NUM2+'"><![CDATA[异常总数:'+(list[i].EXCETION_NUM==null?0:list[i].EXCETION_NUM)+',<font color="#D4101D">严重异常:'+(list[i].EXCETION_NUM1==null?0:list[i].EXCETION_NUM1)+'</font>,<font color="#D46B1D">重要异常:'+(list[i].EXCETION_NUM2==null?0:list[i].EXCETION_NUM2)+'</font>,<font color="#D1B11A">较重要异常:'+(list[i].EXCETION_NUM3==null?0:list[i].EXCETION_NUM3)+'</font>,<font color="#026115">一般异常:'+(list[i].EXCETION_NUM4==null?0:list[i].EXCETION_NUM4)+'</font>]]></city>';
								}
								xmlString += '</anhui>';
									xmlCity = xmlString;
									showFlash();
									return xmlString;
							}
						});
					}else if(b.getId()== 'gridPanel_2'){
						Ext.Ajax.request({
							url : 'mainPageAction!rightQuery_6',
							params : {
								queryCode : '3'
							},
							success : function(response) {
								var result = Ext.decode(response.responseText);
								var list = result.resultList;
								var xmlString = '';
								xmlString += '<anhui>';
								for (var i = 0; i < list.length; i++) {
									var color;
									color=0x96c878;
									xmlString += '<city id="'+list[i].ORG_NO+'" name="'+list[i].ORG_SHORT_NAME+'" color="'+color+'" alarmrank="'+list[i].REMARK+'" alarmcnt="'+list[i].EXCETION_NUM3+'"><![CDATA[异常总数:'+(list[i].EXCETION_NUM==null?0:list[i].EXCETION_NUM)+',<font color="#D4101D">严重异常:'+(list[i].EXCETION_NUM1==null?0:list[i].EXCETION_NUM1)+'</font>,<font color="#D46B1D">重要异常:'+(list[i].EXCETION_NUM2==null?0:list[i].EXCETION_NUM2)+'</font>,<font color="#D1B11A">较重要异常:'+(list[i].EXCETION_NUM3==null?0:list[i].EXCETION_NUM3)+'</font>,<font color="#026115">一般异常:'+(list[i].EXCETION_NUM4==null?0:list[i].EXCETION_NUM4)+'</font>]]></city>';
								}
								xmlString += '</anhui>';
									xmlCity = xmlString;
									showFlash();
									return xmlString;
							}
						});
					}else {
						Ext.Ajax.request({
							url : 'mainPageAction!rightQuery_6',
							params : {
								queryCode : '4'
							},
							success : function(response) {
								var result = Ext.decode(response.responseText);
								var list = result.resultList;
								var xmlString = '';
								xmlString += '<anhui>';
								for (var i = 0; i < list.length; i++) {
									var color;
									color=0x96c878;
									xmlString += '<city id="'+list[i].ORG_NO+'" name="'+list[i].ORG_SHORT_NAME+'" color="'+color+'" alarmrank="'+list[i].REMARK+'" alarmcnt="'+list[i].EXCETION_NUM4+'"><![CDATA[异常总数:'+(list[i].EXCETION_NUM==null?0:list[i].EXCETION_NUM)+',<font color="#D4101D">严重异常:'+(list[i].EXCETION_NUM1==null?0:list[i].EXCETION_NUM1)+'</font>,<font color="#D46B1D">重要异常:'+(list[i].EXCETION_NUM2==null?0:list[i].EXCETION_NUM2)+'</font>,<font color="#D1B11A">较重要异常:'+(list[i].EXCETION_NUM3==null?0:list[i].EXCETION_NUM3)+'</font>,<font color="#026115">一般异常:'+(list[i].EXCETION_NUM4==null?0:list[i].EXCETION_NUM4)+'</font>]]></city>';
								}
								xmlString += '</anhui>';
									xmlCity = xmlString;
									showFlash();
									return xmlString;
							}
						});
					}
				}
			}
		});
		
	});
