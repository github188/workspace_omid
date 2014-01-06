/*--------------Gis配置信息获取----------------*/
Ext.application({});

//feature point styles
var symbolizers_lookup = {
  'error1': {
    'fillColor': '#BD1922',
    'fillOpacity': .8,
    'pointRadius': 6,
    'strokeColor': '#454545',
    'strokeWidth': 2
  },
  'error2': {
    'fillColor': '#336699',
    'fillOpacity': .8,
    'pointRadius': 6,
    'strokeColor': '#AFAB57',
    'strokeWidth': 1
  },
  'error3': {
    'fillColor': '#00CCFF',
    'fillOpacity': .8,
    'pointRadius': 6,
    'strokeColor': '#669933',
    'strokeWidth': 1
  },
  'error4': {
    'fillColor': '#6666CC',
    'fillOpacity': .8,
    'pointRadius': 6,
    'strokeColor': '#812B30',
    'strokeWidth': 1
  },
  'error5': {
    'fillColor': '#336699',
    'fillOpacity': .8,
    'pointRadius': 26,
    'strokeColor': '#003366',
    'strokeWidth': 2
  }
}

//TMS server URL
var GIS_BASE_URL ="";

Ext.onReady(function() {

  Ext.Ajax.request({
    url: 'gisAction!queryGisStyleColor',
    success: function(response) {
      var data = Ext.JSON.decode(response.responseText);
      var colorList = data.colorList;
      for(var i = 0; i < colorList.length; i++) {
        var obj = colorList[i];
        symbolizers_lookup[obj.ERROR_TYPE]["fillColor"] = obj.COLOR;
      }
    }
  });  

  Ext.Ajax.request({
    url: 'gisAction!queryGisURL',
    success: function(response) {
      var data = Ext.JSON.decode(response.responseText);
      GIS_BASE_URL = data.gisurlString;

    }
  });

});