Ext.onReady(function() {

	Ext.define('storeModel_4', {
				extend : 'Ext.data.Model',
				fields : ["EXCEPT_TYPE_NAME", 'EVENT_NAME', 'EXCETION_NUM1',
						'EXCETION_NUM2', 'EXCETION_NUM3']
			});

	Ext.define('storeModel_1', {
				extend : 'Ext.data.Model',
				fields : ["EXCEPT_TYPE_NAME", 'EVENT_NAME', 'EXCETION_NUM1',
						'EXCETION_NUM2', 'EXCETION_NUM3']
			});

	Ext.define('storeModel_2', {
				extend : 'Ext.data.Model',
				fields : ["EXCEPT_TYPE_NAME", 'EVENT_NAME', 'EXCETION_NUM1',
						'EXCETION_NUM2', 'EXCETION_NUM3']
			});

	Ext.define('storeModel_3', {
				extend : 'Ext.data.Model',
				fields : ["EXCEPT_TYPE_NAME", 'EVENT_NAME', 'EXCETION_NUM1',
						'EXCETION_NUM2', 'EXCETION_NUM3']
			});

	var gridStore_4 = Ext.create('Ext.data.Store', {
				model : 'storeModel_4',
				proxy : {
					// 异步获取数据，这里的URL可以改为任何动态页面，只要返回JSON数据即可
					type : 'ajax',
					url : 'mainPageAction!rightQuery_1',
					reader : {
						root : 'resultList'
					}
				}
			});

	gridStore_4.proxy.extraParams = {
		orgNo : LOGGEDORGNO,
		orgType : LOGGEDLEVEL
	};
	gridStore_4.load();

	var gridStore_1 = Ext.create('Ext.data.Store', {
				model : 'storeModel_1',
				proxy : {
					// 异步获取数据，这里的URL可以改为任何动态页面，只要返回JSON数据即可
					type : 'ajax',
					url : 'mainPageAction!rightQuery_2',
					reader : {
						root : 'resultList'
					}
				}
			});

	var gridStore_2 = Ext.create('Ext.data.Store', {
				model : 'storeModel_2',
				proxy : {
					// 异步获取数据，这里的URL可以改为任何动态页面，只要返回JSON数据即可
					type : 'ajax',
					url : 'mainPageAction!rightQuery_3',
					reader : {
						root : 'resultList'
					}
				}
			});

	var gridStore_3 = Ext.create('Ext.data.Store', {
				model : 'storeModel_3',
				proxy : {
					// 异步获取数据，这里的URL可以改为任何动态页面，只要返回JSON数据即可
					type : 'ajax',
					url : 'mainPageAction!rightQuery_4',
					reader : {
						root : 'resultList'
					}
				}
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
							width : 60,
							align : 'center',
							sortable : true
						}, {
							text : "异常名称",
							dataIndex : 'EVENT_NAME',
							align : 'center',
							width : 130,
							sortable : false,
							renderer : function(val) {
								if (null != val) {
									var html = '<div ext:qtitle="异常名称" ext:qtip="'
											+ val + '">' + val + '</div>';
									return html;
								} else
									return '';
							}
						}, {
							text : "数量",
							dataIndex : 'EXCETION_NUM1',
							width : 40,
							align : 'center',
							sortable : true
						}, {
							text : "未处理",
							dataIndex : 'EXCETION_NUM2',
							align : 'center',
							width : 60,
							sortable : true
						}, {
							text : "处理中",
							dataIndex : 'EXCETION_NUM3',
							align : 'center',
							width : 40,
							sortable : true
						}],
				disableSelection : true,
				autoScroll : false,
				loadMask : true,
				viewConfig : {
					id : 'gv',
					trackOver : true,
					stripeRows : true
				}
			});

	var gridPanel_1 = Ext.create('Ext.grid.Panel', {
				id : 'gridPanel_1',
				store : gridStore_1,
				title : '<font color="#D46B1D" size="2">重要</font>',
				border : true,
				columnLines : true,
				columns : [{
							text : "异常类型",
							dataIndex : 'EXCEPT_TYPE_NAME',
							width : 60,
							align : 'center',
							sortable : true
						}, {
							text : "异常名称",
							dataIndex : 'EVENT_NAME',
							align : 'center',
							width : 130,
							sortable : false
						}, {
							text : "数量",
							dataIndex : 'EXCETION_NUM1',
							width : 40,
							align : 'center',
							sortable : true
						}, {
							text : "未处理",
							dataIndex : 'EXCETION_NUM2',
							align : 'center',
							width : 60,
							sortable : true
						}, {
							text : "处理中",
							dataIndex : 'EXCETION_NUM3',
							align : 'center',
							width : 40,
							sortable : true
						}],
				disableSelection : true,
				loadMask : true,
				viewConfig : {
					id : 'gv_1',
					trackOver : false,
					stripeRows : false
				}
			});

	var gridPanel_2 = Ext.create('Ext.grid.Panel', {
				id : 'gridPanel_2',
				store : gridStore_2,
				title : '<font color="#C7CF18" size="2" family="宋体">较重要</font>',
				border : true,
				columnLines : true,
				columns : [{
							text : "异常类型",
							dataIndex : 'EXCEPT_TYPE_NAME',
							width : 60,
							align : 'center',
							sortable : true
						}, {
							text : "异常名称",
							dataIndex : 'EVENT_NAME',
							align : 'center',
							width : 130,
							sortable : false
						}, {
							text : "数量",
							dataIndex : 'EXCETION_NUM1',
							width : 40,
							align : 'center',
							sortable : true
						}, {
							text : "未处理",
							dataIndex : 'EXCETION_NUM2',
							align : 'center',
							width : 60,
							sortable : true
						}, {
							text : "处理中",
							dataIndex : 'EXCETION_NUM3',
							align : 'center',
							width : 40,
							sortable : true
						}],
				disableSelection : true,
				loadMask : true,
				viewConfig : {
					id : 'gv_2',
					trackOver : false,
					stripeRows : false
				}
			});

	var gridPanel_3 = Ext.create('Ext.grid.Panel', {
				id : 'gridPanel_3',
				store : gridStore_3,
				title : '<font color="#1D3DDA" size="2">一般</font>',
				border : true,
				columnLines : true,
				columns : [{
							text : "异常类型",
							dataIndex : 'EXCEPT_TYPE_NAME',
							width : 60,
							align : 'center',
							sortable : true
						}, {
							text : "异常名称",
							dataIndex : 'EVENT_NAME',
							align : 'center',
							width :130,
							sortable : false
						}, {
							text : "数量",
							dataIndex : 'EXCETION_NUM1',
							width : 40,
							align : 'center',
							sortable : true
						}, {
							text : "未处理",
							dataIndex : 'EXCETION_NUM2',
							align : 'center',
							width : 60,
							sortable : true
						}, {
							text : "处理中",
							dataIndex : 'EXCETION_NUM3',
							align : 'center',
							width : 40,
							sortable : true
						}],
				disableSelection : true,
				loadMask : true,
				viewConfig : {
					id : 'gv_3',
					trackOver : false,
					stripeRows : false
				}
			});

	Ext.Ajax.request({
				url : 'mainPageAction!rightQuery_5',
				params : {
					orgNo : LOGGEDORGNO,
					orgType : LOGGEDLEVEL
				},
				success : function(response) {
					var result = Ext.decode(response.responseText);
					var list = result.resultList;
					for (var i = 0; i < list.length; i++) {
						Ext.getDom("num").innerHTML = list[0].EXCETION_NUM;
						Ext.getDom("num1").innerHTML = list[0].EXCETION_NUM1;
						Ext.getDom("num2").innerHTML = list[0].EXCETION_NUM2;
						Ext.getDom("num3").innerHTML = list[0].EXCETION_NUM3;
						Ext.getDom("num4").innerHTML = list[0].EXCETION_NUM4;
					}
				}
			});
	var xmlCity = '';
	var xmlCounty = '';
	if (LOGGEDLEVEL == "02") {
		var showFlash = function() {
			Ext.getDom("div_flashm1").innerHTML = "<embed id='flashm1' name='flashm1' width='650' height='550' src='img/anhui.swf' quality='high' wmode='transparent' pluginspage='http://www.macromedia.com/go/getflashplayer' flashvars='path=flash&htmlMod=m1&xmlCity="
					+ xmlCity
					+ "&xmlCounty="
					+ xmlCounty
					+ " 'type='application/x-shockwave-flash' allowNetworking='all' allowScriptAccess='always'/>";
		};
		Ext.Ajax.request({
					url : 'mainPageAction!rightQuery_6',
					params : {
						queryCode : '1',
						orgNo : LOGGEDORGNO,
						orgType : LOGGEDLEVEL
					},
					success : function(response) {
						var result = Ext.decode(response.responseText);
						var list = result.resultList;
						var listCounty = result.resultCountryList;
						var xmlString = '';
						var xmlString_1 = '';
						xmlString += '<anhui>';
						for (var i = 0; i < list.length; i++) {
							var color;
							color = 0x96c878;
							xmlString += '<city id="'
									+ list[i].ORG_NO
									+ '" name="'
									+ list[i].ORG_SHORT_NAME
									+ '" color="'
									+ color
									+ '" alarmrank="'
									+ list[i].REMARK
									+ '" alarmcnt="'
									+ list[i].EXCETION_NUM1
									+ '"><![CDATA[异常总数:'
									+ (list[i].EXCETION_NUM == null
											? 0
											: list[i].EXCETION_NUM)
									+ ',<font color="#D4101D">严重异常:'
									+ (list[i].EXCETION_NUM1 == null
											? 0
											: list[i].EXCETION_NUM1)
									+ '</font>,<font color="#D46B1D">重要异常:'
									+ (list[i].EXCETION_NUM2 == null
											? 0
											: list[i].EXCETION_NUM2)
									+ '</font>,<font color="#D1B11A">较重要异常:'
									+ (list[i].EXCETION_NUM3 == null
											? 0
											: list[i].EXCETION_NUM3)
									+ '</font>,<font color="#1D3DDA">一般异常:'
									+ (list[i].EXCETION_NUM4 == null
											? 0
											: list[i].EXCETION_NUM4)
									+ '</font>]]></city>';
						}
						xmlString += '</anhui>';
						xmlCity = xmlString;
						xmlString_1 += '<anhui>';
						for (var j = 0; j < listCounty.length; j++) {
							var color;
							color = 0x96c878;
							xmlString_1 += '<city id="'
									+ listCounty[j].ORG_NO
									+ '" name="'
									+ listCounty[j].ORG_SHORT_NAME
									+ '" color="'
									+ color
									+ '" alarmrank="'
									+ listCounty[j].REMARK
									+ '" alarmcnt="'
									+ listCounty[j].EXCETION_NUM1
									+ '"><![CDATA[异常总数:'
									+ (listCounty[j].EXCETION_NUM == null
											? 0
											: listCounty[j].EXCETION_NUM)
									+ ',<font color="#D4101D">严重异常:'
									+ (listCounty[j].EXCETION_NUM1 == null
											? 0
											: listCounty[j].EXCETION_NUM1)
									+ '</font>,<font color="#D46B1D">重要异常:'
									+ (listCounty[j].EXCETION_NUM2 == null
											? 0
											: listCounty[j].EXCETION_NUM2)
									+ '</font>,<font color="#D1B11A">较重要异常:'
									+ (listCounty[j].EXCETION_NUM3 == null
											? 0
											: listCounty[j].EXCETION_NUM3)
									+ '</font>,<font color="#1D3DDA">一般异常:'
									+ (listCounty[j].EXCETION_NUM4 == null
											? 0
											: listCounty[j].EXCETION_NUM4)
									+ '</font>]]></city>';
						}
						xmlString_1 += '</anhui>';
						xmlCounty = xmlString_1;
						showFlash();
					}
				});
	} else {
		var showFlash_1 = function(org) {
			Ext.getDom("div_flashm1").innerHTML = "<embed width='650' height='520 allowscriptaccess='always' allownetworking='all' type='application/x-shockwave-flash' flashvars='path=flash&htmlMod=m1&countyName="
					+ org
					+ "&xmlCounty="
					+ xmlCounty
					+ "' pluginspage='http://www.macromedia.com/go/getflashplayer' wmode='transparent' quality='high' src='flash/"
					+ org
					+ ".swf' name='flashm1' id='flashm1' allowfullscreen='true'></embed>";
		};
		Ext.Ajax.request({
					url : 'mainPageAction!rightQuery_6',
					params : {
						queryCode : '1',
						orgNo : LOGGEDORGNO,
						orgType : LOGGEDLEVEL
					},
					success : function(response) {
						var result = Ext.decode(response.responseText);
						var list = result.cityInfoList;
						var flashOrg = result.flashOrg;
						var xmlString = '';
						xmlString += '<anhui>';
						for (var i = 0; i < list.length; i++) {
							var color;
							color = 0x96c878;
							xmlString += '<city id="'
									+ list[i].ORG_NO
									+ '" name="'
									+ list[i].ORG_SHORT_NAME
									+ '" color="'
									+ color
									+ '" alarmrank="'
									+ list[i].REMARK
									+ '" alarmcnt="'
									+ list[i].EXCETION_NUM1
									+ '"><![CDATA[异常总数:'
									+ (list[i].EXCETION_NUM == null
											? 0
											: list[i].EXCETION_NUM)
									+ ',<font color="#D4101D">严重异常:'
									+ (list[i].EXCETION_NUM1 == null
											? 0
											: list[i].EXCETION_NUM1)
									+ '</font>,<font color="#D46B1D">重要异常:'
									+ (list[i].EXCETION_NUM2 == null
											? 0
											: list[i].EXCETION_NUM2)
									+ '</font>,<font color="#D1B11A">较重要异常:'
									+ (list[i].EXCETION_NUM3 == null
											? 0
											: list[i].EXCETION_NUM3)
									+ '</font>,<font color="#1D3DDA">一般异常:'
									+ (list[i].EXCETION_NUM4 == null
											? 0
											: list[i].EXCETION_NUM4)
									+ '</font>]]></city>';
						}
						xmlString += '</anhui>';
						xmlCounty = xmlString;
						var org;
						if (flashOrg == '34401') {
							org = 'hefei';
						} else if (flashOrg == '34402') {
							org = 'huainan';
						} else if (flashOrg == '34403') {
							org = 'huaibei';
						} else if (flashOrg == '34404') {
							org = 'bengbu';
						} else if (flashOrg == '34405') {
							org = 'wuhu';
						} else if (flashOrg == '34406') {
							org = 'maanshan';
						} else if (flashOrg == '34407') {
							org = 'tongling';
						} else if (flashOrg == '34408') {
							org = 'anqing';
						} else if (flashOrg == '34409') {
							org = 'suzhou';
						} else if (flashOrg == '34410') {
							org = 'liuan';
						} else if (flashOrg == '34412') {
							org = 'huangshan';
						} else if (flashOrg == '34413') {
							org = 'chuzhou';
						} else if (flashOrg == '34414') {
							org = 'fuyang';
						} else if (flashOrg == '34415') {
							org = 'xuancheng';
						} else if (flashOrg == '34416') {
							org = 'chizhou';
						} else {
							org = 'bozhou';
						}
						showFlash_1(org);
					}
				});
	}
	var tabPanel = Ext.createWidget('tabpanel', {
		activeTab : 0,
		region : 'center',
		renderTo : 'gridTest',
		height : 345,
		width : 349,
		items : [gridPanel_4, gridPanel_1, gridPanel_2, gridPanel_3],
		listeners : {
			'tabchange' : function(t, b) {
				if (b.getId() == 'gridPanel_4') {
					var xmlCity = '';
					var xmlCounty = '';
					if (LOGGEDLEVEL == "02") {
						var showFlash = function() {
							Ext.getDom("div_flashm1").innerHTML = "<embed id='flashm1' name='flashm1' width='650' height='550' src='img/anhui.swf' quality='high' wmode='transparent' pluginspage='http://www.macromedia.com/go/getflashplayer' flashvars='path=flash&htmlMod=m1&xmlCity="
									+ xmlCity
									+ "&xmlCounty="
									+ xmlCounty
									+ " 'type='application/x-shockwave-flash' allowNetworking='all' allowScriptAccess='always'/>";
						};
						Ext.Ajax.request({
							url : 'mainPageAction!rightQuery_6',
							params : {
								queryCode : '1',
								orgNo : LOGGEDORGNO,
								orgType : LOGGEDLEVEL
							},
							success : function(response) {
								var result = Ext.decode(response.responseText);
								var list = result.resultList;
								var listCounty = result.resultCountryList;
								var xmlString = '';
								var xmlString_1 = '';
								xmlString += '<anhui>';
								for (var i = 0; i < list.length; i++) {
									var color;
									color = 0x96c878;
									xmlString += '<city id="'
											+ list[i].ORG_NO
											+ '" name="'
											+ list[i].ORG_SHORT_NAME
											+ '" color="'
											+ color
											+ '" alarmrank="'
											+ list[i].REMARK
											+ '" alarmcnt="'
											+ list[i].EXCETION_NUM1
											+ '"><![CDATA[异常总数:'
											+ (list[i].EXCETION_NUM == null
													? 0
													: list[i].EXCETION_NUM)
											+ ',<font color="#D4101D">严重异常:'
											+ (list[i].EXCETION_NUM1 == null
													? 0
													: list[i].EXCETION_NUM1)
											+ '</font>,<font color="#D46B1D">重要异常:'
											+ (list[i].EXCETION_NUM2 == null
													? 0
													: list[i].EXCETION_NUM2)
											+ '</font>,<font color="#D1B11A">较重要异常:'
											+ (list[i].EXCETION_NUM3 == null
													? 0
													: list[i].EXCETION_NUM3)
											+ '</font>,<font color="#1D3DDA">一般异常:'
											+ (list[i].EXCETION_NUM4 == null
													? 0
													: list[i].EXCETION_NUM4)
											+ '</font>]]></city>';
								}
								xmlString += '</anhui>';
								xmlCity = xmlString;
								xmlString_1 += '<anhui>';
								for (var j = 0; j < listCounty.length; j++) {
									var color;
									color = 0x96c878;
									xmlString_1 += '<city id="'
											+ listCounty[j].ORG_NO
											+ '" name="'
											+ listCounty[j].ORG_SHORT_NAME
											+ '" color="'
											+ color
											+ '" alarmrank="'
											+ listCounty[j].REMARK
											+ '" alarmcnt="'
											+ listCounty[j].EXCETION_NUM1
											+ '"><![CDATA[异常总数:'
											+ (listCounty[j].EXCETION_NUM == null
													? 0
													: listCounty[j].EXCETION_NUM)
											+ ',<font color="#D4101D">严重异常:'
											+ (listCounty[j].EXCETION_NUM1 == null
													? 0
													: listCounty[j].EXCETION_NUM1)
											+ '</font>,<font color="#D46B1D">重要异常:'
											+ (listCounty[j].EXCETION_NUM2 == null
													? 0
													: listCounty[j].EXCETION_NUM2)
											+ '</font>,<font color="#D1B11A">较重要异常:'
											+ (listCounty[j].EXCETION_NUM3 == null
													? 0
													: listCounty[j].EXCETION_NUM3)
											+ '</font>,<font color="#1D3DDA">一般异常:'
											+ (listCounty[j].EXCETION_NUM4 == null
													? 0
													: listCounty[j].EXCETION_NUM4)
											+ '</font>]]></city>';
								}
								xmlString_1 += '</anhui>';
								xmlCounty = xmlString_1;
								showFlash();
							}
						});
					} else {
						var showFlash_1 = function(org) {
							Ext.getDom("div_flashm1").innerHTML = "<embed width='650' height='520 allowscriptaccess='always' allownetworking='all' type='application/x-shockwave-flash' flashvars='path=flash&htmlMod=m1&countyName="
									+ org
									+ "&xmlCounty="
									+ xmlCounty
									+ "' pluginspage='http://www.macromedia.com/go/getflashplayer' wmode='transparent' quality='high' src='flash/"
									+ org
									+ ".swf' name='flashm1' id='flashm1' allowfullscreen='true'></embed>";
						};
						Ext.Ajax.request({
							url : 'mainPageAction!rightQuery_6',
							params : {
								queryCode : '1',
								orgNo : LOGGEDORGNO,
								orgType : LOGGEDLEVEL
							},
							success : function(response) {
								var result = Ext.decode(response.responseText);
								var list = result.cityInfoList;
								var flashOrg = result.flashOrg;
								var xmlString = '';
								xmlString += '<anhui>';
								for (var i = 0; i < list.length; i++) {
									var color;
									color = 0x96c878;
									xmlString += '<city id="'
											+ list[i].ORG_NO
											+ '" name="'
											+ list[i].ORG_SHORT_NAME
											+ '" color="'
											+ color
											+ '" alarmrank="'
											+ list[i].REMARK
											+ '" alarmcnt="'
											+ list[i].EXCETION_NUM1
											+ '"><![CDATA[异常总数:'
											+ (list[i].EXCETION_NUM == null
													? 0
													: list[i].EXCETION_NUM)
											+ ',<font color="#D4101D">严重异常:'
											+ (list[i].EXCETION_NUM1 == null
													? 0
													: list[i].EXCETION_NUM1)
											+ '</font>,<font color="#D46B1D">重要异常:'
											+ (list[i].EXCETION_NUM2 == null
													? 0
													: list[i].EXCETION_NUM2)
											+ '</font>,<font color="#D1B11A">较重要异常:'
											+ (list[i].EXCETION_NUM3 == null
													? 0
													: list[i].EXCETION_NUM3)
											+ '</font>,<font color="#1D3DDA">一般异常:'
											+ (list[i].EXCETION_NUM4 == null
													? 0
													: list[i].EXCETION_NUM4)
											+ '</font>]]></city>';
								}
								xmlString += '</anhui>';
								xmlCounty = xmlString;
								var org;
								if (flashOrg == '34401') {
									org = 'hefei';
								} else if (flashOrg == '34402') {
									org = 'huainan';
								} else if (flashOrg == '34403') {
									org = 'huaibei';
								} else if (flashOrg == '34404') {
									org = 'bengbu';
								} else if (flashOrg == '34405') {
									org = 'wuhu';
								} else if (flashOrg == '34406') {
									org = 'maanshan';
								} else if (flashOrg == '34407') {
									org = 'tongling';
								} else if (flashOrg == '34408') {
									org = 'anqing';
								} else if (flashOrg == '34409') {
									org = 'suzhou';
								} else if (flashOrg == '34410') {
									org = 'liuan';
								} else if (flashOrg == '34412') {
									org = 'huangshan';
								} else if (flashOrg == '34413') {
									org = 'chuzhou';
								} else if (flashOrg == '34414') {
									org = 'fuyang';
								} else if (flashOrg == '34415') {
									org = 'xuancheng';
								} else if (flashOrg == '34416') {
									org = 'chizhou';
								} else {
									org = 'bozhou';
								}
								showFlash_1(org);
							}
						});
					}

				} else if (b.getId() == 'gridPanel_1') {
					gridStore_1.proxy.extraParams = {
						orgNo : LOGGEDORGNO,
						orgType : LOGGEDLEVEL
					};
					gridStore_1.load();

					var xmlCity = '';
					var xmlCounty = '';
					if (LOGGEDLEVEL == "02") {
						var showFlash = function() {
							Ext.getDom("div_flashm1").innerHTML = "<embed id='flashm1' name='flashm1' width='650' height='550' src='img/anhui.swf' quality='high' wmode='transparent' pluginspage='http://www.macromedia.com/go/getflashplayer' flashvars='path=flash&htmlMod=m1&xmlCity="
									+ xmlCity
									+ "&xmlCounty="
									+ xmlCounty
									+ " 'type='application/x-shockwave-flash' allowNetworking='all' allowScriptAccess='always'/>";
						};
						Ext.Ajax.request({
							url : 'mainPageAction!rightQuery_6',
							params : {
								queryCode : '2',
								orgNo : LOGGEDORGNO,
								orgType : LOGGEDLEVEL
							},
							success : function(response) {
								var result = Ext.decode(response.responseText);
								var list = result.resultList;
								var listCounty = result.resultCountryList;
								var xmlString = '';
								var xmlString_1 = '';
								xmlString += '<anhui>';
								for (var i = 0; i < list.length; i++) {
									var color;
									color = 0x96c878;
									xmlString += '<city id="'
											+ list[i].ORG_NO
											+ '" name="'
											+ list[i].ORG_SHORT_NAME
											+ '" color="'
											+ color
											+ '" alarmrank="'
											+ list[i].REMARK
											+ '" alarmcnt="'
											+ list[i].EXCETION_NUM2
											+ '"><![CDATA[异常总数:'
											+ (list[i].EXCETION_NUM == null
													? 0
													: list[i].EXCETION_NUM)
											+ ',<font color="#D4101D">严重异常:'
											+ (list[i].EXCETION_NUM1 == null
													? 0
													: list[i].EXCETION_NUM1)
											+ '</font>,<font color="#D46B1D">重要异常:'
											+ (list[i].EXCETION_NUM2 == null
													? 0
													: list[i].EXCETION_NUM2)
											+ '</font>,<font color="#D1B11A">较重要异常:'
											+ (list[i].EXCETION_NUM3 == null
													? 0
													: list[i].EXCETION_NUM3)
											+ '</font>,<font color="#1D3DDA">一般异常:'
											+ (list[i].EXCETION_NUM4 == null
													? 0
													: list[i].EXCETION_NUM4)
											+ '</font>]]></city>';
								}
								xmlString += '</anhui>';
								xmlCity = xmlString;
								xmlString_1 += '<anhui>';
								for (var j = 0; j < listCounty.length; j++) {
									var color;
									color = 0x96c878;
									xmlString_1 += '<city id="'
											+ listCounty[j].ORG_NO
											+ '" name="'
											+ listCounty[j].ORG_SHORT_NAME
											+ '" color="'
											+ color
											+ '" alarmrank="'
											+ listCounty[j].REMARK
											+ '" alarmcnt="'
											+ listCounty[j].EXCETION_NUM2
											+ '"><![CDATA[异常总数:'
											+ (listCounty[j].EXCETION_NUM == null
													? 0
													: listCounty[j].EXCETION_NUM)
											+ ',<font color="#D4101D">严重异常:'
											+ (listCounty[j].EXCETION_NUM1 == null
													? 0
													: listCounty[j].EXCETION_NUM1)
											+ '</font>,<font color="#D46B1D">重要异常:'
											+ (listCounty[j].EXCETION_NUM2 == null
													? 0
													: listCounty[j].EXCETION_NUM2)
											+ '</font>,<font color="#D1B11A">较重要异常:'
											+ (listCounty[j].EXCETION_NUM3 == null
													? 0
													: listCounty[j].EXCETION_NUM3)
											+ '</font>,<font color="#1D3DDA">一般异常:'
											+ (listCounty[j].EXCETION_NUM4 == null
													? 0
													: listCounty[j].EXCETION_NUM4)
											+ '</font>]]></city>';
								}
								xmlString_1 += '</anhui>';
								xmlCounty = xmlString_1;
								showFlash();
							}
						});
					} else {
						var showFlash_1 = function(org) {
							Ext.getDom("div_flashm1").innerHTML = "<embed width='650' height='520 allowscriptaccess='always' allownetworking='all' type='application/x-shockwave-flash' flashvars='path=flash&htmlMod=m1&countyName="
									+ org
									+ "&xmlCounty="
									+ xmlCounty
									+ "' pluginspage='http://www.macromedia.com/go/getflashplayer' wmode='transparent' quality='high' src='flash/"
									+ org
									+ ".swf' name='flashm1' id='flashm1' allowfullscreen='true'></embed>";
						};
						Ext.Ajax.request({
							url : 'mainPageAction!rightQuery_6',
							params : {
								queryCode : '2',
								orgNo : LOGGEDORGNO,
								orgType : LOGGEDLEVEL
							},
							success : function(response) {
								var result = Ext.decode(response.responseText);
								var list = result.cityInfoList;
								var flashOrg = result.flashOrg;
								var xmlString = '';
								xmlString += '<anhui>';
								for (var i = 0; i < list.length; i++) {
									var color;
									color = 0x96c878;
									xmlString += '<city id="'
											+ list[i].ORG_NO
											+ '" name="'
											+ list[i].ORG_SHORT_NAME
											+ '" color="'
											+ color
											+ '" alarmrank="'
											+ list[i].REMARK
											+ '" alarmcnt="'
											+ list[i].EXCETION_NUM2
											+ '"><![CDATA[异常总数:'
											+ (list[i].EXCETION_NUM == null
													? 0
													: list[i].EXCETION_NUM)
											+ ',<font color="#D4101D">严重异常:'
											+ (list[i].EXCETION_NUM1 == null
													? 0
													: list[i].EXCETION_NUM1)
											+ '</font>,<font color="#D46B1D">重要异常:'
											+ (list[i].EXCETION_NUM2 == null
													? 0
													: list[i].EXCETION_NUM2)
											+ '</font>,<font color="#D1B11A">较重要异常:'
											+ (list[i].EXCETION_NUM3 == null
													? 0
													: list[i].EXCETION_NUM3)
											+ '</font>,<font color="#1D3DDA">一般异常:'
											+ (list[i].EXCETION_NUM4 == null
													? 0
													: list[i].EXCETION_NUM4)
											+ '</font>]]></city>';
								}
								xmlString += '</anhui>';
								xmlCounty = xmlString;
								var org;
								if (flashOrg == '34401') {
									org = 'hefei';
								} else if (flashOrg == '34402') {
									org = 'huainan';
								} else if (flashOrg == '34403') {
									org = 'huaibei';
								} else if (flashOrg == '34404') {
									org = 'bengbu';
								} else if (flashOrg == '34405') {
									org = 'wuhu';
								} else if (flashOrg == '34406') {
									org = 'maanshan';
								} else if (flashOrg == '34407') {
									org = 'tongling';
								} else if (flashOrg == '34408') {
									org = 'anqing';
								} else if (flashOrg == '34409') {
									org = 'suzhou';
								} else if (flashOrg == '34410') {
									org = 'liuan';
								} else if (flashOrg == '34412') {
									org = 'huangshan';
								} else if (flashOrg == '34413') {
									org = 'chuzhou';
								} else if (flashOrg == '34414') {
									org = 'fuyang';
								} else if (flashOrg == '34415') {
									org = 'xuancheng';
								} else if (flashOrg == '34416') {
									org = 'chizhou';
								} else {
									org = 'bozhou';
								}
								showFlash_1(org);
							}
						});
					}
				} else if (b.getId() == 'gridPanel_2') {
					gridStore_2.proxy.extraParams = {
						orgNo : LOGGEDORGNO,
						orgType : LOGGEDLEVEL
					};
					gridStore_2.load();
					var xmlCity = '';
					var xmlCounty = '';
					if (LOGGEDLEVEL == "02") {
						var showFlash = function() {
							Ext.getDom("div_flashm1").innerHTML = "<embed id='flashm1' name='flashm1' width='650' height='550' src='img/anhui.swf' quality='high' wmode='transparent' pluginspage='http://www.macromedia.com/go/getflashplayer' flashvars='path=flash&htmlMod=m1&xmlCity="
									+ xmlCity
									+ "&xmlCounty="
									+ xmlCounty
									+ " 'type='application/x-shockwave-flash' allowNetworking='all' allowScriptAccess='always'/>";
						};
						Ext.Ajax.request({
							url : 'mainPageAction!rightQuery_6',
							params : {
								queryCode : '3',
								orgNo : LOGGEDORGNO,
								orgType : LOGGEDLEVEL
							},
							success : function(response) {
								var result = Ext.decode(response.responseText);
								var list = result.resultList;
								var listCounty = result.resultCountryList;
								var xmlString = '';
								var xmlString_1 = '';
								xmlString += '<anhui>';
								for (var i = 0; i < list.length; i++) {
									var color;
									color = 0x96c878;
									xmlString += '<city id="'
											+ list[i].ORG_NO
											+ '" name="'
											+ list[i].ORG_SHORT_NAME
											+ '" color="'
											+ color
											+ '" alarmrank="'
											+ list[i].REMARK
											+ '" alarmcnt="'
											+ list[i].EXCETION_NUM3
											+ '"><![CDATA[异常总数:'
											+ (list[i].EXCETION_NUM == null
													? 0
													: list[i].EXCETION_NUM)
											+ ',<font color="#D4101D">严重异常:'
											+ (list[i].EXCETION_NUM1 == null
													? 0
													: list[i].EXCETION_NUM1)
											+ '</font>,<font color="#D46B1D">重要异常:'
											+ (list[i].EXCETION_NUM2 == null
													? 0
													: list[i].EXCETION_NUM2)
											+ '</font>,<font color="#D1B11A">较重要异常:'
											+ (list[i].EXCETION_NUM3 == null
													? 0
													: list[i].EXCETION_NUM3)
											+ '</font>,<font color="#1D3DDA">一般异常:'
											+ (list[i].EXCETION_NUM4 == null
													? 0
													: list[i].EXCETION_NUM4)
											+ '</font>]]></city>';
								}
								xmlString += '</anhui>';
								xmlCity = xmlString;
								xmlString_1 += '<anhui>';
								for (var j = 0; j < listCounty.length; j++) {
									var color;
									color = 0x96c878;
									xmlString_1 += '<city id="'
											+ listCounty[j].ORG_NO
											+ '" name="'
											+ listCounty[j].ORG_SHORT_NAME
											+ '" color="'
											+ color
											+ '" alarmrank="'
											+ listCounty[j].REMARK
											+ '" alarmcnt="'
											+ listCounty[j].EXCETION_NUM3
											+ '"><![CDATA[异常总数:'
											+ (listCounty[j].EXCETION_NUM == null
													? 0
													: listCounty[j].EXCETION_NUM)
											+ ',<font color="#D4101D">严重异常:'
											+ (listCounty[j].EXCETION_NUM1 == null
													? 0
													: listCounty[j].EXCETION_NUM1)
											+ '</font>,<font color="#D46B1D">重要异常:'
											+ (listCounty[j].EXCETION_NUM2 == null
													? 0
													: listCounty[j].EXCETION_NUM2)
											+ '</font>,<font color="#D1B11A">较重要异常:'
											+ (listCounty[j].EXCETION_NUM3 == null
													? 0
													: listCounty[j].EXCETION_NUM3)
											+ '</font>,<font color="#1D3DDA">一般异常:'
											+ (listCounty[j].EXCETION_NUM4 == null
													? 0
													: listCounty[j].EXCETION_NUM4)
											+ '</font>]]></city>';
								}
								xmlString_1 += '</anhui>';
								xmlCounty = xmlString_1;
								showFlash();
							}
						});
					} else {
						var showFlash_1 = function(org) {
							Ext.getDom("div_flashm1").innerHTML = "<embed width='650' height='520 allowscriptaccess='always' allownetworking='all' type='application/x-shockwave-flash' flashvars='path=flash&htmlMod=m1&countyName="
									+ org
									+ "&xmlCounty="
									+ xmlCounty
									+ "' pluginspage='http://www.macromedia.com/go/getflashplayer' wmode='transparent' quality='high' src='flash/"
									+ org
									+ ".swf' name='flashm1' id='flashm1' allowfullscreen='true'></embed>";
						};
						Ext.Ajax.request({
							url : 'mainPageAction!rightQuery_6',
							params : {
								queryCode : '3',
								orgNo : LOGGEDORGNO,
								orgType : LOGGEDLEVEL
							},
							success : function(response) {
								var result = Ext.decode(response.responseText);
								var list = result.cityInfoList;
								var flashOrg = result.flashOrg;
								var xmlString = '';
								xmlString += '<anhui>';
								for (var i = 0; i < list.length; i++) {
									var color;
									color = 0x96c878;
									xmlString += '<city id="'
											+ list[i].ORG_NO
											+ '" name="'
											+ list[i].ORG_SHORT_NAME
											+ '" color="'
											+ color
											+ '" alarmrank="'
											+ list[i].REMARK
											+ '" alarmcnt="'
											+ list[i].EXCETION_NUM3
											+ '"><![CDATA[异常总数:'
											+ (list[i].EXCETION_NUM == null
													? 0
													: list[i].EXCETION_NUM)
											+ ',<font color="#D4101D">严重异常:'
											+ (list[i].EXCETION_NUM1 == null
													? 0
													: list[i].EXCETION_NUM1)
											+ '</font>,<font color="#D46B1D">重要异常:'
											+ (list[i].EXCETION_NUM2 == null
													? 0
													: list[i].EXCETION_NUM2)
											+ '</font>,<font color="#D1B11A">较重要异常:'
											+ (list[i].EXCETION_NUM3 == null
													? 0
													: list[i].EXCETION_NUM3)
											+ '</font>,<font color="#1D3DDA">一般异常:'
											+ (list[i].EXCETION_NUM4 == null
													? 0
													: list[i].EXCETION_NUM4)
											+ '</font>]]></city>';
								}
								xmlString += '</anhui>';
								xmlCounty = xmlString;
								var org;
								if (flashOrg == '34401') {
									org = 'hefei';
								} else if (flashOrg == '34402') {
									org = 'huainan';
								} else if (flashOrg == '34403') {
									org = 'huaibei';
								} else if (flashOrg == '34404') {
									org = 'bengbu';
								} else if (flashOrg == '34405') {
									org = 'wuhu';
								} else if (flashOrg == '34406') {
									org = 'maanshan';
								} else if (flashOrg == '34407') {
									org = 'tongling';
								} else if (flashOrg == '34408') {
									org = 'anqing';
								} else if (flashOrg == '34409') {
									org = 'suzhou';
								} else if (flashOrg == '34410') {
									org = 'liuan';
								} else if (flashOrg == '34412') {
									org = 'huangshan';
								} else if (flashOrg == '34413') {
									org = 'chuzhou';
								} else if (flashOrg == '34414') {
									org = 'fuyang';
								} else if (flashOrg == '34415') {
									org = 'xuancheng';
								} else if (flashOrg == '34416') {
									org = 'chizhou';
								} else {
									org = 'bozhou';
								}
								showFlash_1(org);
							}
						});
					}
				} else {
					gridStore_3.proxy.extraParams = {
						orgNo : LOGGEDORGNO,
						orgType : LOGGEDLEVEL
					};
					gridStore_3.load();
					var xmlCity = '';
					var xmlCounty = '';
					if (LOGGEDLEVEL == "02") {
						var showFlash = function() {
							Ext.getDom("div_flashm1").innerHTML = "<embed id='flashm1' name='flashm1' width='650' height='550' src='img/anhui.swf' quality='high' wmode='transparent' pluginspage='http://www.macromedia.com/go/getflashplayer' flashvars='path=flash&htmlMod=m1&xmlCity="
									+ xmlCity
									+ "&xmlCounty="
									+ xmlCounty
									+ " 'type='application/x-shockwave-flash' allowNetworking='all' allowScriptAccess='always'/>";
						};
						Ext.Ajax.request({
							url : 'mainPageAction!rightQuery_6',
							params : {
								queryCode : '4',
								orgNo : LOGGEDORGNO,
								orgType : LOGGEDLEVEL
							},
							success : function(response) {
								var result = Ext.decode(response.responseText);
								var list = result.resultList;
								var listCounty = result.resultCountryList;
								var xmlString = '';
								var xmlString_1 = '';
								xmlString += '<anhui>';
								for (var i = 0; i < list.length; i++) {
									var color;
									color = 0x96c878;
									xmlString += '<city id="'
											+ list[i].ORG_NO
											+ '" name="'
											+ list[i].ORG_SHORT_NAME
											+ '" color="'
											+ color
											+ '" alarmrank="'
											+ list[i].REMARK
											+ '" alarmcnt="'
											+ list[i].EXCETION_NUM4
											+ '"><![CDATA[异常总数:'
											+ (list[i].EXCETION_NUM == null
													? 0
													: list[i].EXCETION_NUM)
											+ ',<font color="#D4101D">严重异常:'
											+ (list[i].EXCETION_NUM1 == null
													? 0
													: list[i].EXCETION_NUM1)
											+ '</font>,<font color="#D46B1D">重要异常:'
											+ (list[i].EXCETION_NUM2 == null
													? 0
													: list[i].EXCETION_NUM2)
											+ '</font>,<font color="#D1B11A">较重要异常:'
											+ (list[i].EXCETION_NUM3 == null
													? 0
													: list[i].EXCETION_NUM3)
											+ '</font>,<font color="#1D3DDA">一般异常:'
											+ (list[i].EXCETION_NUM4 == null
													? 0
													: list[i].EXCETION_NUM4)
											+ '</font>]]></city>';
								}
								xmlString += '</anhui>';
								xmlCity = xmlString;
								xmlString_1 += '<anhui>';
								for (var j = 0; j < listCounty.length; j++) {
									var color;
									color = 0x96c878;
									xmlString_1 += '<city id="'
											+ listCounty[j].ORG_NO
											+ '" name="'
											+ listCounty[j].ORG_SHORT_NAME
											+ '" color="'
											+ color
											+ '" alarmrank="'
											+ listCounty[j].REMARK
											+ '" alarmcnt="'
											+ listCounty[j].EXCETION_NUM4
											+ '"><![CDATA[异常总数:'
											+ (listCounty[j].EXCETION_NUM == null
													? 0
													: listCounty[j].EXCETION_NUM)
											+ ',<font color="#D4101D">严重异常:'
											+ (listCounty[j].EXCETION_NUM1 == null
													? 0
													: listCounty[j].EXCETION_NUM1)
											+ '</font>,<font color="#D46B1D">重要异常:'
											+ (listCounty[j].EXCETION_NUM2 == null
													? 0
													: listCounty[j].EXCETION_NUM2)
											+ '</font>,<font color="#D1B11A">较重要异常:'
											+ (listCounty[j].EXCETION_NUM3 == null
													? 0
													: listCounty[j].EXCETION_NUM3)
											+ '</font>,<font color="#1D3DDA">一般异常:'
											+ (listCounty[j].EXCETION_NUM4 == null
													? 0
													: listCounty[j].EXCETION_NUM4)
											+ '</font>]]></city>';
								}
								xmlString_1 += '</anhui>';
								xmlCounty = xmlString_1;
								showFlash();
							}
						});
					} else {
						var showFlash_1 = function(org) {
							Ext.getDom("div_flashm1").innerHTML = "<embed width='650' height='520 allowscriptaccess='always' allownetworking='all' type='application/x-shockwave-flash' flashvars='path=flash&htmlMod=m1&countyName="
									+ org
									+ "&xmlCounty="
									+ xmlCounty
									+ "' pluginspage='http://www.macromedia.com/go/getflashplayer' wmode='transparent' quality='high' src='flash/"
									+ org
									+ ".swf' name='flashm1' id='flashm1' allowfullscreen='true'></embed>";
						};
						Ext.Ajax.request({
							url : 'mainPageAction!rightQuery_6',
							params : {
								queryCode : '4',
								orgNo : LOGGEDORGNO,
								orgType : LOGGEDLEVEL
							},
							success : function(response) {
								var result = Ext.decode(response.responseText);
								var list = result.cityInfoList;
								var flashOrg = result.flashOrg;
								var xmlString = '';
								xmlString += '<anhui>';
								for (var i = 0; i < list.length; i++) {
									var color;
									color = 0x96c878;
									xmlString += '<city id="'
											+ list[i].ORG_NO
											+ '" name="'
											+ list[i].ORG_SHORT_NAME
											+ '" color="'
											+ color
											+ '" alarmrank="'
											+ list[i].REMARK
											+ '" alarmcnt="'
											+ list[i].EXCETION_NUM4
											+ '"><![CDATA[异常总数:'
											+ (list[i].EXCETION_NUM == null
													? 0
													: list[i].EXCETION_NUM)
											+ ',<font color="#D4101D">严重异常:'
											+ (list[i].EXCETION_NUM1 == null
													? 0
													: list[i].EXCETION_NUM1)
											+ '</font>,<font color="#D46B1D">重要异常:'
											+ (list[i].EXCETION_NUM2 == null
													? 0
													: list[i].EXCETION_NUM2)
											+ '</font>,<font color="#D1B11A">较重要异常:'
											+ (list[i].EXCETION_NUM3 == null
													? 0
													: list[i].EXCETION_NUM3)
											+ '</font>,<font color="#1D3DDA">一般异常:'
											+ (list[i].EXCETION_NUM4 == null
													? 0
													: list[i].EXCETION_NUM4)
											+ '</font>]]></city>';
								}
								xmlString += '</anhui>';
								xmlCounty = xmlString;
								var org;
								if (flashOrg == '34401') {
									org = 'hefei';
								} else if (flashOrg == '34402') {
									org = 'huainan';
								} else if (flashOrg == '34403') {
									org = 'huaibei';
								} else if (flashOrg == '34404') {
									org = 'bengbu';
								} else if (flashOrg == '34405') {
									org = 'wuhu';
								} else if (flashOrg == '34406') {
									org = 'maanshan';
								} else if (flashOrg == '34407') {
									org = 'tongling';
								} else if (flashOrg == '34408') {
									org = 'anqing';
								} else if (flashOrg == '34409') {
									org = 'suzhou';
								} else if (flashOrg == '34410') {
									org = 'liuan';
								} else if (flashOrg == '34412') {
									org = 'huangshan';
								} else if (flashOrg == '34413') {
									org = 'chuzhou';
								} else if (flashOrg == '34414') {
									org = 'fuyang';
								} else if (flashOrg == '34415') {
									org = 'xuancheng';
								} else if (flashOrg == '34416') {
									org = 'chizhou';
								} else {
									org = 'bozhou';
								}
								showFlash_1(org);
							}
						});
					}
				}
			}
		}
	});

});
