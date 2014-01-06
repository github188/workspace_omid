Ext.onReady(function() {
	var longMoniStore = Ext.create('Ext.data.ArrayStore', {
				fields : ['longCode', 'longName'],
				data : [["07", "光纤信道工况"], ["02", "GPRS/CDMA"], ["01", "230MHz"]]
			});

	var localMoniStore = Ext.create('Ext.data.ArrayStore', {
				fields : ['localCode', 'localName'],
				data : [["05", "485载波"], ["06", "载波通道"]]
			});

	var distanceMo = Ext.create('Ext.panel.Panel', {
				width : 800,
				id : 'distanceMo',
				border : false,
				html: "<div id='distanceMoo'></div>"
			});

	var distanceMo_1 = Ext.create('Ext.panel.Panel', {
				width : 800,
				id : 'distanceMo_1',
				border : false,
				html: "<div id='distanceMo_11'></div>"
			});

	var cardPanel = Ext.create('Ext.panel.Panel', {
				id : 'cardPanel',
				border : false,
				autoScroll : true,
				region : 'center',
				layout : 'card',
				activeItem : 0,
				items : [distanceMo, distanceMo_1]
			});
	var picCharts_5 = new FusionCharts("./FusionCharts/MSLine.swf",
			"picCharts_5", 800, 210);

	var picCharts_6 = new FusionCharts("./FusionCharts/MSLine.swf",
			"picCharts_6", 800, 210);

	var formpanel = Ext.create('Ext.form.Panel', {
		id : 'formpanel',
		title : '查询条件',
		region : 'east',
		height : 230,
		width : 300,
		border : true,
		bodyStyle : 'padding:10px 0px 10px 10px',
		items : [{
			margin : '0 0 0 10',
			xtype : 'radiogroup',
			columns : 2,
			vertical : true,
			hideLabel : true,
			id : 'radioGroup_33',
			items : [{
						boxLabel : '选择远程信道',
						name : 'monitor',
						inputValue : '0',
						checked : true,
						listeners : {
							change : function(t, newValue, oldValue, e) {
								if (newValue == 1) {
									Ext.getCmp('monitorPanel')
											.setTitle('远程信道监测');
									Ext.getCmp('longMoni').show();
									Ext.getCmp('localMoni').hide();
								}
							}
						}
					}, {
						boxLabel : '选择本地信道',
						name : 'monitor',
						inputValue : 'l',
						listeners : {
							change : function(t, newValue, oldValue, e) {
								if (newValue == 1) {
									Ext.getCmp('monitorPanel')
											.setTitle('本地信道监测');
									Ext.getCmp('localMoni').show();
									Ext.getCmp('longMoni').hide();
								}
							}

						}
					}]
		}, {
			xtype : 'combo',
			fieldLabel : '远程信道监测',
			id : 'longMoni',
			name : 'longMoni',
			queryMode : 'local',
			store : longMoniStore,
			displayField : 'longName',
			valueField : 'longCode',
			value : '07',
			margin : '10 10 10 0'
		}, {
			xtype : 'combo',
			fieldLabel : '本地信道监测',
			id : 'localMoni',
			name : 'localMoni',
			queryMode : 'local',
			hidden : true,
			store : localMoniStore,
			displayField : 'localName',
			valueField : 'localCode',
			value : '05',
			margin : '10 10 10 0'
		}, {
			id : 'COMPARE_STATE_DATE',
			xtype : 'datefield',
			name : 'COMPARE_STATE_DATE',
			fieldLabel : '对比日期',
			value : Ext.Date.add(new Date(), Ext.Date.DAY, -1),
			format : 'Y-m-d',
			margin : '10 10 10 0'
		}, {
			id : 'ONLINE_STATE_DATE',
			xtype : 'datefield',
			name : 'ONLINE_STATE_DATE',
			fieldLabel : '查询日期',
			value : new Date(),
			format : 'Y-m-d',
			margin : '10 10 10 0'
		}, {
			xtype : 'button',
			text : '查询',
			align : 'center',
			width : 80,
			margin : '10 10 10 150',
			handler : function() {
				if (Ext.getCmp('radioGroup_33').getValue().monitor == "0") {
					Ext.getCmp('cardPanel').getLayout().setActiveItem(0);
					Ext.Ajax.request({
						url : 'onLineCheckAction!queryTmnlRate',
						params : {
							orgNo : LOGGEDORGNO,
							orgType : LOGGEDLEVEL,
							collMode : Ext.getCmp('longMoni').getValue(),
							statDate : Ext.Date.format((Ext
											.getCmp('ONLINE_STATE_DATE')
											.getValue()), 'Y-m-d'),
							compareDate : Ext.Date.format((Ext
											.getCmp('COMPARE_STATE_DATE')
											.getValue()), 'Y-m-d')
						},
						success : function(response) {
							var result = Ext.decode(response.responseText);
							var list = result.tmnlStatRateList;
							var list_1 = result.tmnlComRateList;
							var XmlData = "<graph labelDisplay = 'WRAP' anchorRadius='3' decimalPrecision='4' formatNumberScale='0' bgcolor='F3f3f3' bgAlpha='70' numvdivlines='5' showValues='0' divLineColor='CC3300' divLineIsDashed='1' chartRightMargin='50' labelStep='3'>";
							if (!Ext.isEmpty(list)) {
								XmlData += '<categories>';
								for (var i = 0; i < list.length; i++) {
									XmlData += '<category label="'
											+ list[i].STAT_TIME + '"/>';
								}
								XmlData += '</categories>'
								XmlData += '<dataset seriesName="'
										+ Ext.Date
												.format(
														(Ext
																.getCmp('ONLINE_STATE_DATE')
																.getValue()),
														'Y-m-d')
										+ '" color="#1D3DDA" anchorBorderColor="#1D3DDA" anchorBgColor="#1D3DDA">';
								for (var i = 0; i < list.length; i++) {
									XmlData += '<set value="'
											+ list[i].TMNL_RATE + '"/>';
								}
							}
							XmlData += '</dataset>'
							XmlData += '<dataset seriesName="'
									+ Ext.Date.format(
											(Ext.getCmp('COMPARE_STATE_DATE')
													.getValue()), 'Y-m-d')
									+ '"  color="#F1683C" anchorBorderColor="#F1683C" anchorBgColor="#F1683C">';
							if (!Ext.isEmpty(list_1)) {
								for (var i = 0; i < list_1.length; i++) {
									XmlData += '<set value="'
											+ list_1[i].TMNL_RATE + '"/>';
								}
							}
							XmlData += '</dataset>'
							XmlData += '</graph>';
							picCharts_5.setDataXML(XmlData);
							picCharts_5.render("distanceMoo");
						}
					});
				} else {
					Ext.getCmp('cardPanel').getLayout().setActiveItem(1);
					Ext.Ajax.request({
						url : 'onLineCheckAction!queryTmnlRate',
						params : {
							orgNo : LOGGEDORGNO,
							orgType : LOGGEDLEVEL,
							collMode : Ext.getCmp('localMoni').getValue(),
							statDate : Ext.Date.format((Ext
											.getCmp('ONLINE_STATE_DATE')
											.getValue()), 'Y-m-d'),
							compareDate : Ext.Date.format((Ext
											.getCmp('COMPARE_STATE_DATE')
											.getValue()), 'Y-m-d')
						},
						success : function(response) {
							var result = Ext.decode(response.responseText);
							var list = result.tmnlStatRateList;
							var list_1 = result.tmnlComRateList;
							var XmlData = '<graph formatNumberScale="0"  decimalPrecision="2" showValues="0" numdivlines="3" numVdivlines="0" labelStep="3">';
							if (!Ext.isEmpty(list)) {
								XmlData += '<categories>';
								for (var i = 0; i < list.length; i++) {
									XmlData += '<category label="'
											+ list[i].STAT_TIME + '"/>';
								}
								XmlData += '</categories>'
								XmlData += '<dataset seriesName="'
										+ Ext.Date
												.format(
														(Ext
																.getCmp('ONLINE_STATE_DATE')
																.getValue()),
														'Y-m-d')
										+ '" showValues="0" color="#1D3DDA">';
								for (var i = 0; i < list.length; i++) {
									XmlData += '<set value="'
											+ list[i].TMNL_RATE + '"/>';
								}
								XmlData += '</dataset>'
							}
							XmlData += '<dataset seriesName="'
									+ Ext.Date.format(
											(Ext.getCmp('COMPARE_STATE_DATE')
													.getValue()), 'Y-m-d')
									+ '" showValues="0" color="F1683C">';
							if (!Ext.isEmpty(list_1)) {
								for (var i = 0; i < list_1.length; i++) {
									XmlData += '<set value="'
											+ list_1[i].TMNL_RATE + '"/>';
								}
								XmlData += '</dataset>'
							}
							XmlData += '</graph>';
							picCharts_6.setDataXML(XmlData);
							picCharts_6.render("distanceMo_11");
						}
					});
				}
			}
		}]
	});

	var picPanel_1 = Ext.create('Ext.panel.Panel', {
				id : 'monitorPanel',
				title : '远程信道监测',
				border : false,
				layout : 'border',
				region : 'north',
				height : 230,
				items : [cardPanel, formpanel]
			});
	/*抄表状态*/
	var picCharts_1 = new FusionCharts("./FusionCharts/Pie3D.swf",
			"picCharts_1", 530, 270);

	/*上线终端*/
	var picCharts_2 = new FusionCharts("./FusionCharts/MSColumn3D.swf",
			"picCharts_2", 530, 270);
	/*终端控制状态*/
	var picCharts_3 = new FusionCharts("./FusionCharts/ScrollColumn2D.swf",
			"picCharts_3", 530, 270);
	/*远程状态控制下发失败数量*/
	var picCharts_4 = new FusionCharts("./FusionCharts/ScrollColumn2D.swf",
			"picCharts_4", 530, 270);
	var radioGroup_1 = Ext.create('Ext.panel.Panel', {
		border : false,
		height : 40,
		region : 'north',
		layout : 'fit',
		items : [{
			margin : '0 0 0 10',
			xtype : 'radiogroup',
			columns : 2,
			vertical : true,
			hideLabel : true,
			id : 'radioGroup_11',
			items : [{
				boxLabel : '抄表状态',
				name : 'size',
				inputValue : '0',
				checked : true,
				listeners : {
					change : function(t, newValue, oldValue, e) {
						if (newValue == 1) {
							Ext.getCmp('radioPanelCard_1').getLayout()
									.setActiveItem(0);
							Ext.Ajax.request({
								url : 'onLineCheckAction!querReadMeter',
								params : {
									orgNo : LOGGEDORGNO,
									orgType : LOGGEDLEVEL
								},
								success : function(response) {
									var result = Ext
											.decode(response.responseText);
									var list = result.readMeterList;
									var XmlData = '<graph caption="抄表失败数量统计" decimals="2"  enableRotation="0"  shownames="1" showvalues="1" color ="FFFFFF"  baseFont="宋体" baseFontSize="12" useRoundEdges="1" showSum="1" formatNumberScale="0">';
									if (!Ext.isEmpty(list)) {
										for (var i = 0; i < list.length; i++) {
											XmlData += '<set label="'
													+ list[i].ORG_SHORT_NAME
													+ '" value ="'
													+ list[i].NUMS + '"/>';
										}
										XmlData += '</graph>';
										picCharts_1.setDataXML(XmlData);
										picCharts_1.render("sonpicPanel_11");
									}
								}
							});
						}
					}
				}
			}, {
				boxLabel : '远程状态控制',
				name : 'size',
				inputValue : 'l',
				listeners : {
					change : function(t, newValue, oldValue, e) {
						if (newValue == 1) {
							Ext.getCmp('radioPanelCard_1').getLayout()
									.setActiveItem(1);
							Ext.Ajax.request({
								url : 'onLineCheckAction!queryMetNum',
								params : {
									orgNo : LOGGEDORGNO,
									orgType : LOGGEDLEVEL
								},
								success : function(response) {
									var result = Ext
											.decode(response.responseText);
									var list = result.meterNumList;
									var XmlData = '<chart  decimals="2"  enableRotation="0"  shownames="1" showvalues="1" color ="FFFFFF"  baseFont="宋体" baseFontSize="12" useRoundEdges="1" showSum="1" formatNumberScale="0">';
									if (!Ext.isEmpty(list)) {
										XmlData += '<categories>';
										for (var i = 0; i < list.length; i++) {
											XmlData += '<category label="'
													+ list[i].ORG_NAME + '"/>';
										}
										XmlData += '</categories>'
										XmlData += '<dataset seriesName="控制下发失败数量" showValues="0" color="#1D3DDA">';
										for (var i = 0; i < list.length; i++) {
											XmlData += '<set value="'
													+ list[i].NUMS + '"/>';
										}
										XmlData += '</dataset>'
										XmlData += '</chart>';
										picCharts_4.setDataXML(XmlData);
										picCharts_4.render("sonpicPanel_44");
									}
								}
							});
						}
					}

				}
			}]
		}]
	});

	var radioGroup_2 = Ext.create('Ext.panel.Panel', {
		border : false,
		height : 40,
		region : 'north',
		layout : 'fit',
		items : [{
			margin : '0 0 0 10',
			xtype : 'radiogroup',
			columns : 2,
			vertical : true,
			hideLabel : true,
			id : 'radioGroup_22',
			items : [{
				boxLabel : '上线终端',
				name : 'br',
				inputValue : '0',
				checked : true,
				listeners : {
					change : function(t, newValue, oldValue, e) {
						if (newValue == 1) {
							Ext.getCmp('radioPanelCard').getLayout()
									.setActiveItem(0);
							Ext.Ajax.request({
								url : 'onLineCheckAction!queryModeNum',
								params : {
									orgNo : LOGGEDORGNO,
									orgType : LOGGEDLEVEL
								},
								success : function(response) {
									var result = Ext
											.decode(response.responseText);
									var list = result.modeNumList;
									var XmlData = '<chart  decimals="2"  enableRotation="0"  shownames="1" showvalues="1" color ="FFFFFF"  baseFont="宋体" baseFontSize="12" useRoundEdges="1" showSum="1" formatNumberScale="0">';
									if (!Ext.isEmpty(list)) {
										XmlData += '<categories>';
										for (var i = 0; i < list.length; i++) {
											XmlData += '<category label="'
													+ list[i].COLL_MODE + '"/>';
										}
										XmlData += '</categories>'
										XmlData += '<dataset seriesName="终端上线数" showValues="0">';
										for (var i = 0; i < list.length; i++) {
											XmlData += '<set value="'
													+ list[i].MODENUM + '"/>';
										}
										XmlData += '</dataset>'
										XmlData += '</chart>';
										picCharts_2.setDataXML(XmlData);
										picCharts_2.render("sonpicPanel_22");
									}
								}
							});
						}
					}
				}
			}, {
				boxLabel : '终端控制状态',
				name : 'br',
				inputValue : 'l',
				listeners : {
					change : function(t, newValue, oldValue, e) {
						if (newValue == 1) {
							Ext.getCmp('radioPanelCard').getLayout()
									.setActiveItem(1);
							Ext.Ajax.request({
								url : 'onLineCheckAction!queryFeelNum',
								params : {
									orgNo : LOGGEDORGNO,
									orgType : LOGGEDLEVEL
								},
								success : function(response) {
									var result = Ext
											.decode(response.responseText);
									var list = result.feelNumList;
									var XmlData = '<chart  decimals="2"  enableRotation="0"  shownames="1" showvalues="1" color ="FFFFFF"  baseFont="宋体" baseFontSize="12" useRoundEdges="1" showSum="1" formatNumberScale="0">';
									if (!Ext.isEmpty(list)) {
										XmlData += '<categories>';
										for (var i = 0; i < list.length; i++) {
											XmlData += '<category label="'
													+ list[i].ORG_SHORT_NAME
													+ '"/>';
										}
										XmlData += '</categories>'
										XmlData += '<dataset seriesName="购电下发失败数量" showValues="0" color="#1D3DDA">';
										for (var i = 0; i < list.length; i++) {
											XmlData += '<set value="'
													+ list[i].FEELNUMS + '"/>';
										}
										XmlData += '</dataset>'
										XmlData += '</chart>';
										picCharts_3.setDataXML(XmlData);
										picCharts_3.render("sonpicPanel_33");
									}
								}
							});
						}
					}

				}
			}]
		}]
	});

	var radioPanel_1 = Ext.create('Ext.panel.Panel', {
				id : 'sonpicPanel_1',
				border : false,
				html: "<div id='sonpicPanel_11'></div>"
			});
	var radioPanel_2 = Ext.create('Ext.panel.Panel', {
				id : 'sonpicPanel_2',
				border : false,
				html: "<div id='sonpicPanel_22'></div>"
			});

	var radioPanel_3 = Ext.create('Ext.panel.Panel', {
				id : 'sonpicPanel_3',
				border : false,
				html: "<div id='sonpicPanel_33'></div>"
			});
	var radioPanel_4 = Ext.create('Ext.panel.Panel', {
				id : 'sonpicPanel_4',
				border : false,
				html: "<div id='sonpicPanel_44'></div>"
			});
	var radioPanelCard_1 = Ext.create('Ext.panel.Panel', {
				id : 'radioPanelCard_1',
				region : 'center',
				layout : 'card',
				border : false,
				activeItem : 0,
				items : [radioPanel_1, radioPanel_4]
			});

	var radioPanelCard = Ext.create('Ext.panel.Panel', {
				id : 'radioPanelCard',
				region : 'center',
				layout : 'card',
				border : false,
				activeItem : 0,
				items : [radioPanel_2, radioPanel_3]
			});

	var picPanel_2 = Ext.create('Ext.panel.Panel', {
				title : '电能表状态',
				border : true,
				columnWidth : .5,
				height : 350,
				layout : 'border',
				items : [radioGroup_1, radioPanelCard_1]
			});
	var picPanel_3 = Ext.create('Ext.panel.Panel', {
				title : '采集设备状态',
				border : true,
				height : 350,
				columnWidth : .5,
				layout : 'border',
				items : [radioGroup_2, radioPanelCard]
			});

	var picPanel_4 = Ext.create('Ext.panel.Panel', {
				border : false,
				layout : 'column',
				region : 'center',
				items : [picPanel_2, picPanel_3]
			});
	var mainPanel = Ext.create('Ext.panel.Panel', {
				border : false,
				layout : 'border',
				items : [picPanel_1,picPanel_4]
			});

	renderModel(mainPanel,"通信信道工况");
	Ext.Ajax.request({
		url : 'onLineCheckAction!queryTmnlRate',
		params : {
			orgNo : LOGGEDORGNO,
			orgType : LOGGEDLEVEL,
			collMode : Ext.getCmp('longMoni').getValue(),
			statDate : Ext.Date.format((Ext.getCmp('ONLINE_STATE_DATE').getValue()), 'Y-m-d'),
			compareDate : Ext.Date.format((Ext.getCmp('COMPARE_STATE_DATE').getValue()), 'Y-m-d')
		},
		success : function(response) {
			var result = Ext.decode(response.responseText);
			var list = result.tmnlStatRateList;
			var list_1 = result.tmnlComRateList;
			var XmlData = "<graph labelDisplay = 'WRAP' anchorRadius='3' decimalPrecision='4' formatNumberScale='0' bgcolor='F3f3f3' bgAlpha='70' numvdivlines='5' showValues='0' divLineColor='CC3300' divLineIsDashed='1' chartRightMargin='50' labelStep='3'>";
			if (!Ext.isEmpty(list)) {
				XmlData += '<categories>';
				for (var i = 0; i < list.length; i++) {
					XmlData += '<category label="' + list[i].STAT_TIME + '"/>';
				}
				XmlData += '</categories>'
				XmlData += '<dataset seriesName="'
						+ Ext.Date.format((Ext.getCmp('ONLINE_STATE_DATE')
										.getValue()), 'Y-m-d')
						+ '" color="#1D3DDA" anchorBorderColor="#1D3DDA" anchorBgColor="#1D3DDA">';
				for (var i = 0; i < list.length; i++) {
					XmlData += '<set value="' + list[i].TMNL_RATE + '"/>';
				}
			}
			XmlData += '</dataset>'
			XmlData += '<dataset seriesName="'
					+ Ext.Date.format((Ext.getCmp('COMPARE_STATE_DATE')
									.getValue()), 'Y-m-d')
					+ '"  color="#F1683C" anchorBorderColor="#F1683C" anchorBgColor="#F1683C">';
			if (!Ext.isEmpty(list_1)) {
				for (var i = 0; i < list_1.length; i++) {
					XmlData += '<set value="' + list_1[i].TMNL_RATE + '"/>';
				}
			}
			XmlData += '</dataset>'
			XmlData += '</graph>';
			picCharts_5.setDataXML(XmlData);
			picCharts_5.render("distanceMoo");
		}
	});
	Ext.Ajax.request({
		url : 'onLineCheckAction!querReadMeter',
		params : {
			orgNo : LOGGEDORGNO,
			orgType : LOGGEDLEVEL
		},
		success : function(response) {
			var result = Ext
					.decode(response.responseText);
			var list = result.readMeterList;
			var XmlData = '<graph caption="抄表失败数量统计" decimals="2"  enableRotation="0"  shownames="1" showvalues="1" color ="FFFFFF"  baseFont="宋体" baseFontSize="12" useRoundEdges="1" showSum="1" formatNumberScale="0">';
			if (!Ext.isEmpty(list)) {
				for (var i = 0; i < list.length; i++) {
					XmlData += '<set label="'
							+ list[i].ORG_SHORT_NAME
							+ '" value ="'
							+ list[i].NUMS + '"/>';
				}
				XmlData += '</graph>';
				picCharts_1.setDataXML(XmlData);
				picCharts_1.render("sonpicPanel_11");
			}
		}
	});
	Ext.Ajax.request({
		url : 'onLineCheckAction!queryModeNum',
		params : {
			orgNo : LOGGEDORGNO,
			orgType : LOGGEDLEVEL
		},
		success : function(response) {
			var result = Ext
					.decode(response.responseText);
			var list = result.modeNumList;
			var XmlData = '<chart  decimals="2"  enableRotation="0"  shownames="1" showvalues="1" color ="FFFFFF"  baseFont="宋体" baseFontSize="12" useRoundEdges="1" showSum="1" formatNumberScale="0">';
			if (!Ext.isEmpty(list)) {
				XmlData += '<categories>';
				for (var i = 0; i < list.length; i++) {
					XmlData += '<category label="'
							+ list[i].COLL_MODE + '"/>';
				}
				XmlData += '</categories>'
				XmlData += '<dataset seriesName="终端上线数" showValues="0">';
				for (var i = 0; i < list.length; i++) {
					XmlData += '<set value="'
							+ list[i].MODENUM + '"/>';
				}
				XmlData += '</dataset>'
				XmlData += '</chart>';
				picCharts_2.setDataXML(XmlData);
				picCharts_2.render("sonpicPanel_22");
			}
		}
	});
});
