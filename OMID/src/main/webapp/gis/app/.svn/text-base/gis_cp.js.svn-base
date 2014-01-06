Ext.define('cpModel', {
    extend: 'Ext.data.Model',
    fields: ['CP_ADDR', 'NAME', 'GPS_LATITUDE', 'GPS_LONGITUDE', 'CP_NO', 'TERMINAL_ADDR', 'AREA_NO','ORG_NO','ORG_NAME']
});



Ext.application({
    name: 'Gis_CP',
    launch: function() {


        var test_obj = {
            org_no: "601",
            TERMINAL_ADDR: "888"
        };

        var store = Ext.create('Ext.data.Store', {

            model: "cpModel",
            pageSize: 50,
            buffered: true,
            selModel: {
                selType: 'cellmodel'
            },
            proxy: {
                type: 'ajax',
                url: 'gisAction!queryCp',
                //params: {search_params: Ext.encode(test_obj)},
                extraParams: {
                    search_params: Ext.encode(test_obj)
                },
                reader: {
                    type: 'json',
                    root: 'cplist',
                    totalProperty: 'totalCount'
                }
            }
            // autoLoad: true
        });

        //store.load({params: { search_params: Ext.encode(test_obj)} });
        //store.load({params:{flag:'all'}});  
        var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        });
        var grid = Ext.create('Ext.grid.Panel', {
            forceFit: true,
            region: "center",
            verticalScrollerType: 'paginggridscroller',
            // do not reset the scrollbar when the view refreshs
            invalidateScrollerOnRefresh: false,
            stateful: true,
            store: store,
            stateId: 'stateGrid',
            sortable: false,
            viewConfig: {
                stripeRows: true
            },
            columns: [{
                xtype: 'rownumberer',
                // flex: 0,
                width: 8
            }, {
                text: '采集点编号',
                sortable: false,
                menuDisabled: true,
                flex: 1,
                dataIndex: 'CP_NO'
            }, {
                text: '采集点名称',
                sortable: false,
                menuDisabled: true,
                flex: 1,
                dataIndex: 'NAME'
            }, {
                text: '供电单位',
                sortable: false,
                menuDisabled: true,
                flex: 1,
                dataIndex: 'ORG_NAME'
            }, {
                text: '终端地址',
                sortable: false,
                menuDisabled: true,
                flex: 1,
                dataIndex: 'TERMINAL_ADDR'
            }, {
                text: '经度',
                sortable: false,
                menuDisabled: true,
                flex: 1,
                dataIndex: 'GPS_LONGITUDE',
                editor: {
                    xtype: 'numberfield',
                    decimalPrecision: 10,
                    allowBlank: false,
                    minValue: 0,
                    maxValue: 100000
                }

            }, {
                text: '纬度',
                sortable: false,
                menuDisabled: true,
                flex: 1,
                dataIndex: 'GPS_LATITUDE',
                editor: {
                    xtype: 'numberfield',
                    decimalPrecision: 10,
                    allowBlank: false,
                    minValue: 0,
                    maxValue: 100000
                }
            }],
            plugins: [cellEditing]

        });

        grid.on('edit', onEdit, this);

        function onEdit() {
            var record = grid.getSelectionModel().getSelection()[0];

            var param = {};
            param.cp_no = record.get("CP_NO");
            param.gps_latitude = record.get("GPS_LATITUDE");
            param.gps_longitude = record.get("GPS_LONGITUDE");



            Ext.Ajax.request({
                url: 'gisAction!updateCpGps',
                method: 'POST',
                params: {
                    cpDataString: Ext.encode(param)
                },
                success: function(response, options) {
                    Ext.MessageBox.show({
                        title: "操作成功",
                        msg: "操作成功：位置信息已更新",
                        icon: Ext.MessageBox.INFO,
                        buttons: Ext.Msg.OK
                    })
                },
                failure: function(response, options) {
                    Ext.MessageBox.show({
                        title: "操作失败",
                        msg: "操作失败：请联系管理员",
                        icon: Ext.MessageBox.ERROR,
                        buttons: Ext.Msg.OK
                    })
                }
            })

        }


        var form = Ext.create('Ext.panel.Panel', {
            region: 'north',
            border: true,
            items: [{
                xtype: 'form',
                padding: 8,
                frame: true,
                defaultType: 'textfield',
                layout: 'hbox',
                defaults: {
                    anchor: '100%',
                    hideEmptyLabel: false,
                    labelWidth: 80,
                    //标签宽度
                    labelAlign: 'right'
                },
                items: [{
                    xtype:'combo',
                    fieldLabel: '供电单位',
                    labelAlign:'right',
                    name: 'org_no',
                    store : statQuery.orgStore,
                    displayField : 'ORG_NAME',
                    valueField : 'ORG_NO',
                    multiSelect : false,
                    queryMode : 'local',
                    anchor:'96%',
                    editable: false,
                    listeners : {
                      afterRender : function(combo) {
                         combo.setValue(statQuery.orgStore.first().data.ORG_NO);
                      }
                    }
                }, {
                    xtype: 'textfield',
                    name: 'cp_no',
                    fieldLabel: '采集点编号'
                }, {
                    xtype: 'textfield',
                    name: 'tmnl_addr',
                    fieldLabel: '终端地址'
                },{
                    xtype: 'button',
                    text: '查询',
                    width: 80,
                    margin: '0 0 0 120',
                    handler: function() {
                        // this.up('form').getForm().reset();
                        params = this.up('form').getForm().getValues();
                        store.getProxy().extraParams = {
                            search_params: Ext.encode(params)
                        };
                        store.load();
                    }
                }]
            }]



        });


        var mainPanel = Ext.create('Ext.panel.Panel', {
            layout: "fit",
            hideBorders: true,
            items: {
                layout: "border",
                deferredRender: false,
                items: [grid, form]
            }
        });
        renderModel(mainPanel, "GIS信息维护");

        store.guaranteeRange(0, 60)
    }



});