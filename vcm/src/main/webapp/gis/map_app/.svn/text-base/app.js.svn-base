Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false,
    paths: {
        GeoExt: "gis/open/geoExt"
    }
});

Ext.require(['Ext.container.Viewport', 'Ext.layout.container.Border', 'GeoExt.tree.Panel', 'Ext.tree.plugin.TreeViewDragDrop', 'GeoExt.panel.Map', 'GeoExt.tree.OverlayLayerContainer', 'GeoExt.tree.BaseLayerContainer', 'GeoExt.data.LayerTreeModel', 'GeoExt.tree.View', 'GeoExt.tree.Column', 'Ext.tree.*', 'Ext.data.*', 'Ext.window.MessageBox']);

Ext.define('treeModel', {
    extend: 'Ext.data.Model',
    fields: ['text', 'cls', 'expanded', 'children', 'leaf', 'range']
});

Ext.define('eventModel', {
    extend: 'Ext.data.Model',
    fields: ['EVENT_NAME', 'EVENT_NO', 'EVENT_TYPE', 'EVENT_LEVEL']
});

Ext.define('userModel', {
    extend: 'Ext.data.Model',
    fields: ['TERMINAL_ID', 'EVENT_LEVEL', 'CP_NO', 'GPS_LATITUDE', 'GPS_LONGITUDE', 'CP_ADDR', 'AREA_NO', 'TERMINAL_ADDR', 'NAME', 'CONS_NAME']
});

Ext.define('cpModel', {
    extend: 'Ext.data.Model',
    fields: ['CP_ADDR', 'NAME', 'GPS_LATITUDE', 'GPS_LONGITUDE', 'CP_NO', 'TERMINAL_ADDR', 'AREA_NO']
});


Ext.application({
    name: 'HelloExt',
    launch: function() {

        var menu_html = generate_menu();

        Ext.getDoc().on("contextmenu", function(e) {
            e.stopEvent();
        });

        var anhui_map = "anhui.";

        var map_url = GIS_BASE_URL+"/gis_map/gmc/";
        var pro4326 = new OpenLayers.Projection("EPSG:4326");
        var pro900913 = new OpenLayers.Projection("EPSG:900913");



        var map = new OpenLayers.Map("map", {
            maxExtent: new OpenLayers.Bounds(-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892),
            numZoomLevels: 7,
            maxResolution: 156543.0339,
            resolutions: [1222.99245234375, 611.496226171875, 305.7481130859375, 152.87405654296876, 76.43702827148438, 38.21851413574219, 19.109257067871095],
            units: 'm',
            projection: "EPSG:900913",
            restrictedExtent: new OpenLayers.Bounds(114.66815, 29.37739, 119.72186, 34.72807).transform(pro4326,pro900913),
            displayProjection: new OpenLayers.Projection("EPSG:4326")
        });



        OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {
            defaultHandlerOptions: {
                'single': true,
                'double': true,
                'pixelTolerance': null,
                'stopSingle': false,
                'stopDouble': false
            },
            handleRightClicks: true,
            initialize: function(options) {
                this.handlerOptions = OpenLayers.Util.extend({}, this.defaultHandlerOptions);
                OpenLayers.Control.prototype.initialize.apply(this, arguments);
                this.handler = new OpenLayers.Handler.Click(
                this, this.eventMethods, this.handlerOptions);
            },
            CLASS_NAME: "OpenLayers.Control.Click"
        });
        // Add an instance of the Click control that listens to various click events: 
        var oClick = new OpenLayers.Control.Click({
            eventMethods: {
                'rightclick': function(e) {
                    remove_popups();
                    // alert("You clicked near " + lonlat.lat + " N, " + +lonlat.lon + " E");
                    console.log("right");
                    var popup_menu = new OpenLayers.Popup("gis_pop_clicken", map.getLonLatFromPixel(e.xy), new OpenLayers.Size(150, 40), menu_html, false);
                    map.addPopup(popup_menu);
                    set_menu_event(map.getLonLatFromPixel(e.xy));
                },
                'click': function(e) {
                    remove_popups();
                },
                'dblclick': function(e) {
                    remove_popups();
                },
                'dblrightclick': function(e) {
                }
            }
        });

        map.addControl(oClick);
        oClick.activate();


        // map.getViewport().oncontextmenu = function noContextMenu(e) {
        //     if(e != null) {
        //         if(OpenLayers.Event.isRightClick(e)) {
        //             remove_popups();
        //             var lonlat = map.getLonLatFromPixel({x:e.offsetX,y:e.offsetY}).transform(new OpenLayers.Projection("EPSG:900913"), new OpenLayers.Projection("EPSG:4326"));
        //             // alert("You clicked near " + lonlat.lat + " N, " + +lonlat.lon + " E");
        //             var popup_menu = new OpenLayers.Popup.FramedCloud("clicken", map.getLonLatFromPixel({x:e.offsetX,y:e.offsetY}), null, menu_html,null, false);
        //             // popup_menu.closeOnMove = true;
        //             map.addPopup(popup_menu);
        //             Ext.getDom("clicken").oncontextmenu = function(e) {
        //                 if(e.stopPropagation) {
        //                     e.stopPropagation(); //在基于firefox内核的浏览器中支持做法stopPropagation
        //                 } else {
        //                     e.cancelBubble = true; //基于ie的写法
        //                 }
        //                 return false;
        //             }
        //         }
        //     } else {
        //         alert("Right button click"); // Add the right click 
        //     }
        //     return false; //cancel the right click of brower 
        // }
        // // map.getViewport().onclick =function (e) {
        // //     remove_popups();     
        // // }
        // map.getViewport().ondblclick =function (e) {
        //     remove_popups();     
        // }



        var layer = new OpenLayers.Layer.TMS("Name", map_url, {
            'type': 'png',
            'getURL': get_my_url
        });



        var vector_style_map = new OpenLayers.StyleMap({});
        vector_style_map.addUniqueValueRules('default', 'settlement_type', symbolizers_lookup);


        var vector_layers = [];
        for(var i = 1; i < 5; i++) {
            var tmp_layer = new OpenLayers.Layer.Vector('error' + i, {
                eventListeners: {
                    'featureselected': function(evt) {
                        var feature = evt.feature;
                        //This is so ugly ,refactor it later
                        var html_string = "";
                        html_string += "<div style='font-size:.9em'>采集点编号: ";
                        html_string += feature.attributes.CP_NO;
                        html_string += "<br>采集点名称: ";
                        html_string += feature.attributes.NAME;
                        html_string += "<br>采集点地址: ";
                        html_string += feature.attributes.CP_ADDR;
                        html_string += "<br>终端区划码: ";
                        html_string += feature.attributes.AREA_NO;
                        html_string += "<br>&nbsp&nbsp&nbsp&nbsp终端地址: ";
                        html_string += feature.attributes.TERMINAL_ADDR;
                        html_string += "</div>";
                        var popup = new OpenLayers.Popup.FramedCloud("popup", OpenLayers.LonLat.fromString(feature.geometry.toShortString()), null, html_string, null, false);
                        feature.popup = popup;
                        map.addPopup(popup);
                    },
                    'featureunselected': function(evt) {
                        var feature = evt.feature;
                        map.removePopup(feature.popup);
                        feature.popup.destroy();
                        feature.popup = null;
                    }
                }
            });
            tmp_layer.styleMap = vector_style_map;
            vector_layers.push(tmp_layer);
        }
        map.addLayers([layer]);
        map.addLayers(vector_layers);


        //add control
        map.addControl(new OpenLayers.Control.Scale());
        map.addControl(new OpenLayers.Control.MousePosition());



        // create the select feature control
        var selector = new OpenLayers.Control.SelectFeature(vector_layers, {
            // hover:true,
            // highlightOnly: true,
            autoActivate: true

        });
        map.addControl(selector);


        // var lonLat = new OpenLayers.LonLat(118.73302, 32.03733);
        var lonLat = new OpenLayers.LonLat(117.299378, 31.793555);
        lonLat.transform(map.displayProjection, map.getProjectionObject());
        map.setCenter(lonLat, 0);

        //test point
        // var test_feture = create_point(117.235004, 31.840233, 'error2');
        // var test_feture1 = create_point(118.836004, 31.840233, 'error3');
        // var test_feture2 = create_point(117.837004, 31.840233, 'error4');
        // var test_feture3 = create_point(117.238004, 31.840233, 'error1');
        // map.getLayersByName('error2')[0].addFeatures([test_feture, test_feture1, test_feture2, test_feture3]);
        var mapPanel = Ext.create('GeoExt.panel.Map', {
            border: true,
            region: "center",
            map: map
        });



        var store = Ext.create('Ext.data.TreeStore', {
            model: treeModel,

            proxy: {
                type: 'ajax',
                url: 'gis/res/check-nodes.json'
            }
        });

        var tree = Ext.create('Ext.tree.Panel', {
            store: store,
            border: true,
            region: "east",
            split: true,
            rootVisible: false,
            useArrows: true,
            width: 150,
            listeners: {
                'checkchange': function(node, checked, obj) {
                    layers = map.getLayersByName(node.data.range);

                    if(layers != null && layers.length > 0) {

                        layers[0].setVisibility(checked);
                    }

                }
            }
        });



        var mainPanel = Ext.create('Ext.panel.Panel', {
            layout: "fit",
            hideBorders: true,
            items: {
                layout: "border",
                deferredRender: false,
                items: [mapPanel]
            }
        });



        var cons_store = Ext.create('Ext.data.Store', {

            model: userModel,
            proxy: {
                type: 'ajax',
                url: 'gisAction!queryCpByAlarmType',
                reader: {
                    type: 'json',
                    root: 'eventPonintList'
                }
            }
            // autoLoad: true
        });

        var cons_grid = Ext.create('Ext.grid.Panel', {
            store: cons_store,
            // height:100,
            // forceFit: true,
            columns: [{
                text: '户名',
                dataIndex: 'CONS_NAME',
                sortable: false,
                flex: 1
            }],
            listeners: {
                itemclick: function(argument, record) {
                    destroy_all_points();
                    var point = record.data;
                    create_one_point(point);
                    pantoLonLat(point.GPS_LONGITUDE, point.GPS_LATITUDE, 5);
                }
            }
        });


        var cons_panel = Ext.create('Ext.panel.Panel', {
            layout: "border",
            hideBorders: true,
            border: false,
            // width: 100,
            items: [{
                xtype: 'form',
                region: 'north',
                // layout: 'vbox',
                defaults: {
                    // anchor: '90%',
                    hideEmptyLabel: false,
                    labelWidth: 60
                },
                items: [{
                    xtype: 'textfield',
                    name: 'cons_no',
                    width: 180,
                    fieldLabel: '用户编号'
                }, {
                    xtype: 'textfield',
                    name: 'cons_name',
                    width: 180,
                    fieldLabel: '用户名称'
                }, {
                    xtype: 'button',
                    text: "查询",
                    width: 80,
                    margin: '0 0 0 100',
                    handler: function() {
                        params = this.up('form').getForm().getValues();
                        params.by_cons = 'yes';
                        cons_store.load({
                            params: {
                                gis_search_param: Ext.encode(params)
                            }
                        })

                    }
                }]
            }, {
                region: 'center',
                items: cons_grid
            }]

        });

        var test_obj = {};
        test_obj.event_type = "01";

        var event_store = Ext.create('Ext.data.Store', {

            model: eventModel,
            proxy: {
                type: 'ajax',
                url: 'gisAction!queryEventCode',
                extraParams: {
                    event_search_param: Ext.encode(test_obj)
                },
                reader: {
                    type: 'json',
                    root: 'eventCodeList'
                }
            },
            autoLoad: true

        });



        var event_grid = Ext.create('Ext.grid.Panel', {
            store: event_store,
            // height:300,
            // forceFit: true,
            columns: [{
                text: '名称',
                dataIndex: 'EVENT_NAME',
                sortable: false,
                flex: 1
            }],
            listeners: {
                itemclick: function(grid, record) {
                    queryCpAlarmByEventNo(record);
                }
            }


        });

        var event_panel = Ext.create('Ext.panel.Panel', {
            layout: "border",
            hideBorders: true,
            border: false,
            width: 150,
            items: [{
                xtype: 'radiogroup',
                region: 'north',
                // defaultType: 'radiofield',
                defaults: {
                    flex: 1
                },
                layout: 'hbox',
                height: 20,
                items: [{
                    boxLabel: '计量',
                    name: 'event_type',
                    inputValue: '01',
                    id: 'radio1',
                    checked: true
                }, {
                    boxLabel: '用电',
                    name: 'event_type',
                    inputValue: '02',
                    id: 'radio2'
                }, {
                    boxLabel: '终端',
                    name: 'event_type',
                    inputValue: '03',
                    id: 'radio3'
                }],
                listeners: {
                    change: function(f, value) {
                        event_store.load({
                            params: {
                                event_search_param: Ext.encode(value)
                            }
                        });

                    }
                }
            }, {
                region: 'center',
                items: event_grid

            }]

        });



        //get sketch data
        Ext.Ajax.request({
            url: 'gis/res/anhui.json',
            success: function(response) {
                var data = eval(response.responseText);
                if(data != null && data.length > 0) {
                    var drawlayer = new OpenLayers.Layer.Vector("sketch");
                    drawlayer.styleMap = sketch_style_map;
                    map.addLayer(drawlayer);
                    drawlayer.addFeatures([draw_sketch_feature(data)]);

                }
            }
        });

        var cpStore = Ext.create('Ext.data.Store', {
            model: "cpModel",
            pageSize: 50,
            buffered: true,
            selModel: {
                selType: 'cellmodel'
            },
            proxy: {
                type: 'ajax',
                url: 'gisAction!queryCp',
                reader: {
                    type: 'json',
                    root: 'cplist',
                    totalProperty: 'totalCount'
                }
            }
            // autoLoad: true
        });

        function queryCpAlarmByLevel() {

            Ext.Ajax.request({
                url: 'gisAction!queryCpByAlarmType',
                success: function(response) {

                    var data = Ext.JSON.decode(response.responseText);
                    // console.log(response.responseText);
                    add_pointlist(data.eventPonintList);

                }

            });
        }

        function queryCpAlarmByEventNo(record) {
            var params = {};
            params.event_no = record.data.EVENT_NO;
            Ext.Ajax.request({
                url: 'gisAction!queryCpByAlarmType',
                params: {
                    gis_search_param: Ext.encode(params)
                },
                success: function(response) {
                    destroy_all_points();
                    var data = Ext.JSON.decode(response.responseText);
                    var rev = add_pointlist(data.eventPonintList);


                }
            })
        }


        function queryCpAlarmByCons(attribute) {
            attribute = typeof(attribute) == 'undefined' ? {} : attribute;
            Ext.Ajax.request({
                url: 'gisAction!queryCpByAlarmType',
                params: {
                    gis_search_param: Ext.encode(attribute)
                },
                success: function(response) {
                    destroy_all_points();
                    var data = Ext.JSON.decode(response.responseText);
                    var rev = add_pointlist(data.eventPonintList);
                    // console.log(response.responseText);
                    if(rev != "null") {
                        var lonLat = new OpenLayers.LonLat(data.eventPonintList[0].GPS_LONGITUDE, data.eventPonintList[0].GPS_LATITUDE);
                        lonLat.transform(map.displayProjection, map.getProjectionObject());
                        map.zoomTo(12);
                        map.panTo(lonLat);
                    }
                }

            });
        }



        renderModel(mainPanel, "异常处理定位");

        queryCpAlarmByLevel();



        var query_tab = new Ext.TabPanel({
            activeItem: 0,
            border: false,
            items: [{
                title: '等级',
                border: false,
                layout: 'fit',
                items: [tree]
            }, {
                title: '事件',
                border: false,
                layout: 'fit',
                items: [event_panel]
            }, {
                title: '用户',
                border: false,
                layout: 'fit',
                items: [cons_panel]
            }],
            listeners: {
                tabchange: function(tp, p) {
                    if(p.title == '等级') {
                        destroy_all_points();
                        queryCpAlarmByLevel();
                        map.zoomTo(0);
                    } else if(p.title == '事件') {
                        destroy_all_points();
                        map.zoomTo(0);
                    }
                }
            }


        });

        var control_win = Ext.create('Ext.window.Window', {
            title: '异常定位查询',
            id: 'gis_panel_win',
            height: 380,
            width: 100,
            layout: 'fit',
            closable: false,
            items: [query_tab]
        });
        control_win.show();
        control_win.alignTo(mainPanel, "tr-tr");



        Ext.getCmp('mainTabPanel').on("beforeremove", destroy_window);

        function generate_menu(argument) {
            var spec = {
                id: 'my-ul',
                tag: 'ul',
                cls: 'my-list',
                // append children after creating
                children: [ // may also specify 'cn' instead of 'children'
                {
                    tag: 'li',
                    id: 'gis_set_cp',
                    html: '在这里设置终端'
                }]
            };
            return Ext.DomHelper.markup(spec);

        }

        function set_menu_event(lonlat) {
            var dom_set_cp = Ext.get("gis_set_cp");
            if(dom_set_cp) {
                dom_set_cp.on('click', set_cp_pop_up(lonlat.transform(pro900913,pro4326)));
            }
        }

        function set_cp_pop_up(lonlat) {

            return function() {
                remove_popups();
                var grid = Ext.create('Ext.grid.Panel', {
                    forceFit: true,
                    region: "center",
                    verticalScrollerType: 'paginggridscroller',
                    // do not reset the scrollbar when the view refreshs
                    invalidateScrollerOnRefresh: false,
                    stateful: true,
                    store: cpStore,
                    stateId: 'stateGrid',
                    sortable: false,
                    viewConfig: {
                        stripeRows: true
                    },
                    columns: [{
                        xtype: 'rownumberer',
                        flex: 0,
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
                        text: '区划码',
                        sortable: false,
                        menuDisabled: true,
                        flex: 1,
                        dataIndex: 'AREA_NO'
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
                        dataIndex: 'GPS_LONGITUDE'
                    }, {
                        text: '纬度',
                        sortable: false,
                        menuDisabled: true,
                        flex: 1,
                        dataIndex: 'GPS_LATITUDE'
                    }],
                    listeners: {
                        itemdblclick: function(gird, record) {
                            var param = {};
                            param.cp_no = record.get("CP_NO");
                            param.gps_latitude = lonlat.lat;
                            param.gps_longitude = lonlat.lon;

                            // alert("You clicked near " + lonlat.lat + " N, " + +lonlat.lon + " E");

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
                                    });
                                    cpSelWindow.close();
                                    cpStore.removeAll();

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
                    }
                });

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
                            xtype: 'combo',
                            fieldLabel: '供电单位',
                            labelAlign: 'right',
                            name: 'org_no',
                            store: statQuery.orgStore,
                            displayField: 'ORG_NAME',
                            valueField: 'ORG_NO',
                            multiSelect: false,
                            queryMode: 'local',
                            anchor: '96%',
                            editable: false,
                            labelWidth: 60,
                            listeners: {
                                afterRender: function(combo) {
                                    combo.setValue(statQuery.orgStore.first().data.ORG_NO);
                                }
                            }
                        }, {
                            xtype: 'textfield',
                            name: 'cp_no',
                            labelWidth: 70,
                            fieldLabel: '采集点编号'

                        }, {
                            xtype: 'textfield',
                            name: 'tmnl_addr',
                            labelWidth: 60,
                            fieldLabel: '终端地址'
                        }, {
                            xtype: 'button',
                            text: '查询',
                            width: 80,
                            margin: '0 0 0 10',
                            handler: function() {
                                // this.up('form').getForm().reset();
                                params = this.up('form').getForm().getValues();
                                cpStore.getProxy().extraParams = {
                                    search_params: Ext.encode(params)
                                };
                                cpStore.load();
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
                var cpSelWindow = Ext.create('Ext.window.Window', {
                    title: '选择终端',
                    height: 400,
                    width: 800,
                    layout: 'fit',
                    modal: true,
                    items: [mainPanel]
                });
                cpSelWindow.show();
            }
        }



        cpStore.guaranteeRange(0, 60);

        function remove_popups() {
            for(var i = map.popups.length - 1; i >= 0; i--) {
                map.removePopup(map.popups[i]);
            };
        }

        function destroy_window(argument, component) {
            if(component.id == '异常处理定位') {
                control_win.close();
                control_win.destroy();
            };
        };



        function destroy_all_points() {
            for(var i = 1; i < 5; i++) {
                map.getLayersByName('error' + i)[0].removeAllFeatures();
            }
        }

        function pantoLonLat(Lon, Lat, zoomlevel) {
            // body...
            var lonLat = new OpenLayers.LonLat(Lon, Lat);
            lonLat.transform(map.displayProjection, map.getProjectionObject());
            map.zoomTo(zoomlevel);
            map.panTo(lonLat);
        }


        function add_pointlist(pointList) {
            if(pointList.length == 0) {
                Ext.MessageBox.show({
                    title: "无位置信息",
                    msg: "未发现相关终端位置信息",
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                })
                return "null"
            }

            var errors_obj = {
                error1: [],
                error2: [],
                error3: [],
                error4: []
            }
            for(var i = 0; i < pointList.length; i++) {
                var point = pointList[i];
                // console.log(point["EVENT_LEVEL"]);
                errors_obj[point.EVENT_LEVEL].push(create_point(point.GPS_LONGITUDE, point.GPS_LATITUDE, point.EVENT_LEVEL, point));
            }
            for(var i = 1; i < 5; i++) {
                map.getLayersByName('error' + i)[0].addFeatures(errors_obj["error" + i]);
            }

            return pointList.length
        }

        function create_one_point(point){
            map.getLayersByName(point.EVENT_LEVEL)[0].addFeatures(create_point(point.GPS_LONGITUDE, point.GPS_LATITUDE, point.EVENT_LEVEL, point));
        }


        function get_my_url(bounds) {
            var res = this.map.getResolution();
            // console.log(res);
            var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
            var y = Math.round((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
            var z = this.map.getZoom();
            if(z < 7) {
                z += 7
            }
            var path = anhui_map + z + "/gmcn_" + x + "_" + y + "_" + z + "." + this.type;
            var url = this.url;
            if(url instanceof Array) {
                url = this.selectUrl(path, url);
            }
            return url + path;

        }

    }
});