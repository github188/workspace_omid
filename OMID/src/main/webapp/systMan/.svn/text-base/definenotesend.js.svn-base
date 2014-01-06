Ext.onReady(function() {
	var pnumber;
	var orgname;
	var selectmodel = Ext.create('Ext.selection.CheckboxModel', {
				mode : 'MULTI'
			
			});
	var Tarea = new Ext.form.field.TextArea({
				id : "Tarea",
				fieldLabel : '短信发送内容',
				height : 185,
				border : false,
				width : 980
			})

	var selfDeMsgOpPanl1 = Ext.create('Ext.panel.Panel', {
				height : 200,
				width : 1000,
				border : false,
				bodyPadding : 10,
				items : [Tarea]
			})

	var orgNameT = new Ext.form.field.Text({
				id : "orgNameT",
				fieldLabel : '供电单位',
				labelWidth : 55,
				width : 170
			});
	var consNameT = new Ext.form.field.Text({
				id : "consNameT",
				fieldLabel : '联系人',
				labelWidth : 50,
				width : 170
			});
	var mobileNoNF = new Ext.form.field.Text({
				id : "mobileNoNF",
				fieldLabel : '手机号码',
				labelWidth : 55,
				width : 170
			});

	var query = Ext.create('Ext.Button', {
				width : 80,
				text : '查询',
				handler : function() {
					var a1 = Ext.getCmp("orgNameT").getValue();
					var a2 = Ext.getCmp("consNameT").getValue();
					var a3 = Ext.getCmp("mobileNoNF").getValue()
					if (a1 == '' && a2 == '' && a3 == '') {
						Ext.Msg.alert('提示', '请输入至少一个查询条件');
					} else {

						msExceAnalStore.proxy.extraParams = {
							"queryItems.org_name" : Ext.getCmp("orgNameT")
									.getValue(),
							"queryItems.personnel_name" : Ext
									.getCmp("consNameT").getValue(),
							"queryItems.mobile_no" : Ext.getCmp("mobileNoNF")
									.getValue()
						}
						msExceAnalStore.load();
					}

				}
			})
	var newbutton = Ext.create('Ext.Button', {
				width : 80,
				text : '发送',
				handler : function() {
					var selsend = selectmodel.getSelection();
					var arraySend = new Array();
					var numint = 0;
					if (Ext.isEmpty(Tarea.getValue())) {
						Ext.Msg.alert('提示', '请填写短信内容');
						return;
					}
					if (selsend.length < 1) {
						Ext.Msg.alert('提示', '请选择联系人信息');
						return;
					}
					for (var i = 0; i <= selsend.length - 1; i++) {
						var conten = {};
						conten.PERSONNEL_NAME = selsend[i]
								.get('PERSONNEL_NAME');
						conten.MOBILE_NO = selsend[i].get('MOBILE_NO');
						conten.ORG_NO = selsend[i].get('ORG_NO');
						arraySend[numint++] = Ext.encode(conten);
					}
					selfDeMsgSendPanel.getEl().mask("发送中...");
					Ext.Ajax.request({
								url : 'DefinenotSendAction!sendSelfDeMsg.action',
								params : {
									consList : arraySend,
									msgContent : Tarea.getValue()
								},
								success : function(response) {
									selfDeMsgSendPanel.getEl().unmask();
									var result = Ext
											.decode(response.responseText);
									if ('1' == result.flag)
										Ext.MessageBox.alert("提示", "短信已发送！");
									else
										Ext.MessageBox.alert("提示", "短信发送失败！");
								}
							});
				}
			})
	var manage = Ext.create('Ext.Button', {
				width : 80,
				text : '管理通讯录',
				handler : function() {
					manageway();
				}
			})
	var selfDeMsgOpPanl2 = Ext.create('Ext.panel.Panel', {
				border : false,
				height : 100,
				layout : 'column',
				x : 50,
				bodyStyle : 'padding:5px 0px 10px 5px',
				items : [{
							columnWidth : 0.17,
							border : false,
							items : [orgNameT]
						}, {
							columnWidth : 0.17,
							border : false,
							items : [consNameT]
						}, {
							columnWidth : 0.17,
							border : false,
							items : [mobileNoNF]
						}, {
							columnWidth : 0.17,
							border : false,
							x : 50,
							items : [query]
						}, {
							columnWidth : 0.1,
							border : false,
							x : -30,
							items : [newbutton]
						}, {
							columnWidth : 0.1,
							x : -35,
							border : false,
							items : [manage]
						}]
			})
	var selfDeMsgOpPanl = Ext.create('Ext.panel.Panel', {
				border : false,
				region : 'north',
				height : 250,
				items : [selfDeMsgOpPanl1, selfDeMsgOpPanl2]
			});

	Ext.define('Event', {
				extend : 'Ext.data.Model',
				fields : ["ORG_NO", "ORG_NAME", "PERSONNEL_NAME", "MOBILE_NO",
						"POSITION"]
			});

	var msExceAnalStore = Ext.create('Ext.data.Store', {
				model : 'Event',
				remoteSort : true,
				pageSize : DEFAULT_PAGE_SIZE,
				proxy : {
					type : 'ajax',
					url : 'DefinenotSendAction!qureyList.action',
					reader : {
						type : 'json',
						root : 'resultList',
						totalProperty : 'totalCount'
					}
				}
			});

	var selfDeMsgConsGrid = Ext.create('Ext.grid.Panel', {
				title : '联系人列表',
				loadMask : true,
				selModel :selectmodel,
				region : 'center',
				multiSelect:true,
				border : true,
				store : msExceAnalStore,
				viewConfig : {
					trackOver : false
				},
				columnLines : true,
				columns : [Ext.create('Ext.grid.RowNumberer', {
					header : '序号',
					width : 30
					}),{
							text : "供电单位",
							width : 250,
							dataIndex : 'ORG_NAME',
							align : 'center',
							sortable : true
						}, {
							text : "联系人",
							width : 250,
							dataIndex : 'PERSONNEL_NAME',
							align : 'center',
							sortable : false
						}, {
							text : "联系电话",
							width : 250,
							dataIndex : 'MOBILE_NO',
							align : 'center',
							sortable : false
						}, {
							text : "职位",
							width : 250,
							dataIndex : 'POSITION',
							align : 'center',
							sortable : false
						}],
				dockedItems : [{
							xtype : 'pagingtoolbar',
							store : msExceAnalStore,
							dock : 'bottom',
							displayInfo : true
						}]
			});
	var selfDeMsgSendPanel = new Ext.Panel({
				border : false,
				layout : 'border',
				items : [selfDeMsgOpPanl, selfDeMsgConsGrid]
			});
	renderModel(selfDeMsgSendPanel, '自定义短信发送');

	//-----------------管理通讯录--------------------------------------//	  

	function manageway() {
		var selectmodel1 = Ext.create('Ext.selection.CheckboxModel', {
					mode : 'SINGLE'
				});
		var orgNameTt = new Ext.form.field.Text({
					id : "orgNameTt",
					fieldLabel : '供电单位',
					labelWidth : 55,
					width : 150
				});
		var consNameTt = new Ext.form.field.Text({
					id : "consNameTt",
					fieldLabel : '联系人',
					labelWidth : 50,
					width : 150
				});
		var mobileNoTt = new Ext.form.field.Text({
					id : "mobileNoTt",
					fieldLabel : '手机号码',
					labelWidth : 55,
					width : 150
				});
		var addButton = Ext.create('Ext.Button', {
					id : 'addButton',
					width : 70,
					text : '增加',
					handler : function() {
						addManage(1);

					}
				});
		var alterButton = Ext.create('Ext.Button', {
					id : 'alterButton',
					width : 70,
					text : '修改',
					handler : function() {
						var selArray = selectmodel1.getSelection();
						if (Ext.isEmpty(selArray)) {
							Ext.Msg.alert('提示', '请选择要修改的信息');
							return;
						}
						addManage(selArray);
					}
				});
		var deleteButton = Ext.create('Ext.Button', {
					id : 'deleteButton',
					width : 70,
					text : '删除',
					handler : function() {
						var selArray = selectmodel1.getSelection();
						if(Ext.isEmpty(selArray)){
							Ext.Msg.alert('提示','请选择要删除的联系人信息');
							
						}else{
							deleteNews(selArray);
						}

					}
				});
		var queryMenage = Ext.create('Ext.Button', {
					width : 80,
					text : '查询',
					handler : function() {
						var b1 = Ext.getCmp("orgNameTt").getValue();
						var b2 = Ext.getCmp("consNameTt").getValue();
						var b3 = Ext.getCmp("mobileNoTt").getValue();
						if (b1 == '' && b2 == '' && b3 == '') {
							Ext.Msg.alert('提示', '请输入至少一个查询条件');
						} else {
							addressBookStore.proxy.extraParams = {
								"queryItems.org_name" : Ext.getCmp("orgNameTt")
										.getValue(),
								"queryItems.personnel_name" : Ext
										.getCmp("consNameTt").getValue(),
								"queryItems.mobile_no" : Ext
										.getCmp("mobileNoTt").getValue()
							}
							addressBookStore.load();
						}

					}
				});

		var addressBookManage = Ext.create('Ext.panel.Panel', {
					id : 'addressBookManage',
					border : true,
					region : 'north',
					height : 50,
					layout : 'column',
					bodyStyle : 'padding: 15px 0px 0px 0px ',
					items : [{
								columnWidth : 0.25,
								border : false,
								x : 10,
								items : [orgNameTt]
							}, {
								columnWidth : 0.25,
								border : false,
								x : 10,
								items : [consNameTt]
							}, {
								columnWidth : 0.25,
								border : false,
								x : 10,
								items : [mobileNoTt]
							}, {
								columnWidth : 0.18,
								border : false,
								x : 50,
								items : [queryMenage]
							}]
				})

		Ext.define('EventMan', {
					extend : 'Ext.data.Model',
					fields : ["ORG_NO", "CALLING_CARD_ID", "ORG_NAME",
							"PERSONNEL_NAME", "MOBILE_NO", "POSITION"]
				});

		var addressBookStore = Ext.create('Ext.data.Store', {
					model : 'EventMan',
					remoteSort : true,
					pageSize : DEFAULT_PAGE_SIZE,
					proxy : {
						type : 'ajax',
						url : 'DefinenotSendAction!qureyList.action',
						reader : {
							type : 'json',
							root : 'resultList',
							totalProperty : 'totalCount'
						}
					}
				});

		var addressBookConsGrid = Ext.create('Ext.grid.Panel', {
					loadMask : true,
					region : 'center',
					border : true,
					selModel : selectmodel1,
					store : addressBookStore,
					tbar : ['联系人明细', {
								xtype : 'tbfill'
							}, '-', addButton, '-', alterButton, '-',
							deleteButton],
					viewConfig : {
						trackOver : false
					},
					columnLines : true,
					columns : [Ext.create('Ext.grid.RowNumberer', {
						header : '序号',
						width : 30
						}),{
								text : "供电单位",
								id : "orgid",
								width : 160,
								dataIndex : 'ORG_NAME',
								align : 'center',
								sortable : true
							}, {
								text : "联系人",
								width : 160,
								id : "linkman_id",
								dataIndex : 'PERSONNEL_NAME',
								align : 'center',
								sortable : false
							}, {
								text : "联系电话",
								width : 160,
								id : "phone_id",
								dataIndex : 'MOBILE_NO',
								align : 'center',
								sortable : false
							}, {
								text : "职位",
								width : 160,
								id : "post_id",
								dataIndex : 'POSITION',
								align : 'center',
								sortable : false
							}],
					dockedItems : [{
								xtype : 'pagingtoolbar',
								store : addressBookStore,
								dock : 'bottom',
								displayInfo : true
							}]

				});
		var manageWindow = Ext.create('Ext.window.Window', {
					title : '管理联系人',
					modal : true,
					height : 400,
					width : 700,
					layout : 'border',
					resizable : false,
					items : [addressBookManage, addressBookConsGrid]
				});
		manageWindow.show();
		//添加按钮,修改按钮
		function addManage(type) {

			var panelWin = Ext.create('Ext.panel.Panel', {
						border : true,
						bodyStyle : 'padding: 10px 5px 5px 5px ',
						items : [{
									id : 'orgname_id',
									xtype : 'textfield',
									labelWidth : 55,
									fieldLabel : '供电单位',
									allowBlank : false,
									width : 170
								}, {
									id : 'linkmanid',
									xtype : 'textfield',
									labelWidth : 55,
									fieldLabel : '联系人',
									allowBlank : false,
									width : 170
								}, {
									id : 'postid',
									xtype : 'textfield',
									labelWidth : 55,
									fieldLabel : '职位',
									width : 170
								}, {
									id : 'numberid',
									xtype : 'textfield',
									allowBlank : false,
									labelWidth : 55,
									fieldLabel : '手机号码',
									width : 170
								}]

					});
			if (type != 1) {
				for (var i = 0; i <= type.length - 1; i++) {
					Ext.getCmp('orgname_id').setValue(type[i].get('ORG_NAME'));
					Ext.getCmp('linkmanid').setValue(type[i]
							.get('PERSONNEL_NAME'));
					Ext.getCmp('postid').setValue(type[i].get('POSITION'));
					Ext.getCmp('numberid').setValue(type[i].get('MOBILE_NO'));
					var callingcardid = type[i].get('CALLING_CARD_ID');
				}
			};
			var button1 = Ext.create('Ext.Button', {
				text : '确定',
				x : 25,
				y : 10,
				width : 60,
				handler : function() {
					if (type == 1) {
						orgname = Ext.getCmp('orgname_id').getValue();
						var linkman = Ext.getCmp('linkmanid').getValue();
						var postt = Ext.getCmp('postid').getValue();
						pnumber = Ext.getCmp('numberid').getValue();
						if (orgname == '' && linkman == '' && pnumber == '') {
							Ext.Msg.alert('提示', '必填项没有输入');
							return;
						} else {
							Ext.Ajax.request({
										url : 'DefinenotSendAction!addManage.action',
										params : {
											'queryItems.org_name' : orgname,
											'queryItems.personnel_name' : linkman,
											'queryItems.position' : postt,
											'queryItems.mobile_no' : pnumber
										},
										success : function(response) {
                                         var result = Ext.decode(response.responseText);
                                         if(result.flag==1){
                                         	Ext.Msg.alert('提示','增加成功');
                                         		  addquery();
							                      addWin.close();
                                         }else{
                                         	Ext.Msg.alert('提示','增加失败');
                                         	  addWin.close();
                                         }
										}
									})

						}
					} else {
						orgname = Ext.getCmp('orgname_id').getValue();
						var linkman = Ext.getCmp('linkmanid').getValue();
						var postt = Ext.getCmp('postid').getValue();
						pnumber = Ext.getCmp('numberid').getValue();
						Ext.Ajax.request({
									url : 'DefinenotSendAction!updateManage.action',
									params : {
										'queryItems.calling_card_id' : callingcardid,
										'queryItems.org_name' : orgname,
										'queryItems.personnel_name' : linkman,
										'queryItems.position' : postt,
										'queryItems.mobile_no' : pnumber
									},
									success : function(response) {
										var result = Ext
												.decode(response.responseText);
										if (result.flag == 1) {
											Ext.Msg.alert('提示', '更新成功');
											addquery();
											addWin.close();
										} else {
											Ext.Msg.alert('提示', '更新失败');
											addWin.close();
										}
									}
								})
					}
				}
			})

			function addquery() {
				addressBookStore.proxy.extraParams = {
					"queryItems.org_name" : orgname,
					"queryItems.mobile_no" : pnumber
				}
				addressBookStore.load();
			}
			var button2 = Ext.create('Ext.Button', {
						text : '取消',
						x : 30,
						y : 10,
						width : 60,
						handler : function() {
							addWin.close();
						}
					})
			var addWin = Ext.create('Ext.window.Window', {
						title : '联系人信息',
						height : 200,
						width : 150,
						items : [panelWin, button1, button2]
					})
			addWin.show();
		};
		function deleteNews(selArray) {
			for (var i = 0; i <= selArray.length - 1; i++) {
				var selMedcardid = selArray[i].get('CALLING_CARD_ID');
				Ext.Ajax.request({
							url : 'DefinenotSendAction!deleteManage.action',
							params : {
								'queryItems.calling_card_id' : selMedcardid
							},
							success : function(response) {
								var result = Ext.decode(response.responseText);
								if (result.flag == 1) {
									Ext.Msg.alert('提示', '删除成功');
									addressBookStore.load();
								} else {
									Ext.Msg.alert('提示', '删除失败');
								}
							}
						})

			}
		}
	}

});
