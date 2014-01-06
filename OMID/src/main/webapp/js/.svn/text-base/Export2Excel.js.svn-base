var EXCEL_DEFAULT_COUNT = 32767

Ext.define('Ext.ux.MyToolBar',{
	extend : 'Ext.toolbar.Paging',
	expallable : false,
	expcurable : false,
	expalltext : '全部',
	expcurtext : '当前页',
	initComponent : function(){
		var grid = this.grid;
		var title = this.title;
		if(this.expallable || this.expcurable){
			var expbtn = Ext.create('Ext.button.Split',{
				iconCls : 'exportExcel',
				tooltip : '导出EXCEL',
				handler : function(btn){
					btn.showMenu();
				},
				menu : new Ext.menu.Menu([])
			});
			
			if(this.expallable){
				expbtn.menu.add(Ext.create('Ext.menu.Item',{
					text : this.expalltext,
					iconCls : 'exportExcel',
					tooltip : '导出所有数据',
					handler : function(){
						if(grid.store.getCount()==0){
							Ext.MessageBox.alert("提示",'没有数据，无需导出！');
							return ;
						}
						expallpage(grid,title);
					}
				}))
			}
			
			if(this.expcurable){
				expbtn.menu.add(Ext.create('Ext.menu.Item',{
					text : this.expcurtext,
					iconCls : 'exportExcel',
					tooltip : '导出当前页',
					handler : function(){
						if(grid.store.getCount()==0){
							Ext.MessageBox.alert("提示",'没有数据，无需导出！');
							return ;
						}
						expcurpage(grid,title);
					}
				}))
			}
			
			this.items = ['-', expbtn];
		}
		this.callParent();
	}
});

var getType = function(value){
	var type = Ext.type(value);
	var result = "";
	switch (type) {
		case "number" :
			result = "Number";
			break;
		case "int" :
			result = "Number";
			break;
		case "float" :
			result = "Number";
			break;
		case "bool" :
		case "boolean" :
			result = "String";
			break;
		case "date" :
			result = "DateTime";
			break;
		default :
			result = "String";
			break;
	}
	return result;
}

var Base64 = (function() {
	// private property
	var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	// private method for UTF-8 encoding
	function utf8Encode(string) {
		string = string.replace(/\r\n/g, "\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
		}
		return utftext;
	}

	// public method for encoding
	return {
		// This was the original line, which tries to use Firefox's built in
		// Base64 encoder, but this kept throwing exceptions....
		// encode : (typeof btoa == 'function') ? function(input) { return
		// btoa(input); } : function (input) {

		encode : function(input) {
			var output = "";
			var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
			var i = 0;
			input = utf8Encode(input);
			while (i < input.length) {
				chr1 = input.charCodeAt(i++);
				chr2 = input.charCodeAt(i++);
				chr3 = input.charCodeAt(i++);
				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;
				if (isNaN(chr2)) {
					enc3 = enc4 = 64;
				} else if (isNaN(chr3)) {
					enc4 = 64;
				}
				output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2)
						+ keyStr.charAt(enc3) + keyStr.charAt(enc4);
			}
			return output;
		}
	};
})();

var getExcelUrl = (function() {
	var getClass = (function() {
		return {
			getClass : function(value) {
				var type = Ext.type(value);
				var result = "";
				switch (type) {
					case "number" :
						result = "float";
						break;
					case "int" :
						result = "int";
						break;
					case "float" :
						result = "float";
						break;
					case "bool" :
					case "boolean" :
						result = "";
						break;
					case "date" :
						result = "date";
						break;
					default :
						result = "";
						break;
				}
				return result;
			}
		};
	})();
	var storeToXml = (function() {
		return {
			storeToXml : function(grid, title, isAll) {
				var store = grid.store;
				var count = store.getCount();
				var columns = grid.columns;

				var temp = '<ss:Worksheet ss:Name="ExportTable Grid">';
//				var headerXml = '<ss:Cell ss:StyleID="headercell">'
//						+ '<ss:Data ss:Type="String">'
//						+ title
//						+ '</ss:Data>'
//						+ '<ss:NamedCell ss:Name="Print_Titles" />'
//						+ '</ss:Cell>';
//				temp += '<ss:Table>' + '<ss:Column ss:AutoFitWidth="0" ss:Width="120"/>'
//						+ '<ss:Row ss:AutoFitHeight="1">' + headerXml
//						+ '</ss:Row>';
				temp += '<ss:Table>';
						
				var cell = '<ss:Row>';
				var column = '';
				for (var k = 0; k < columns.length; k++) {
					if(columns[k].dataIndex != '' && !columns[k].isHidden()){
						column += '<ss:Column ss:AutoFitWidth="0" ss:Width="'+columns[k].getWidth()+'"/>';
						cell += '<ss:Cell ss:StyleID="headercell"><ss:Data ss:Type="String">';
						cell += columns[k].text;
						cell += '</ss:Data></ss:Cell>';
					}
				}
				cell += '</ss:Row>';
				temp = temp+column+cell;
				if(!isAll){
					for (var i = 0; i < count; i++) {
						var cellClass = (i & 1) ? 'odd' : 'even';
						var model = store.getAt(i);
	//					var fields = model.fields;
						temp += '<ss:Row ss:Height="20">';
						for (var j = 0; j < columns.length; j++) {
							if(columns[j].dataIndex != '' && !columns[j].isHidden()){
								var name = columns[j].dataIndex;
								var value = model.get(name);
								value = (value+'').replace(/</g,'【');
								value=(value+'').replace(/>/g,'】');
								temp += '<ss:Cell ss:StyleID="' + cellClass
										+ getClass.getClass(value)
										+ '"><ss:Data ss:Type="'
										+ getType(value) + '">';
								if (getType(value) == 'DateTime') {
									var date = Ext.util.Format.date(value, 'Y-m-d');
									temp += date;
								} else {
									temp += value;
								}
								temp += '</ss:Data></ss:Cell>';
							}
						}
						temp += '</ss:Row>';
					}
				}else{
					temp += 'gridStoreData';
				}
				
				temp += '</ss:Table>';
				temp += '</ss:Worksheet>';

				var main = '<xml version="1.0" encoding="utf-8">'
						+ '<ss:Workbook xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:o="urn:schemas-microsoft-com:office:office">'
						+ '<o:DocumentProperties><o:Title>'
						+ 'title111111111111111111111'
						+ '</o:Title></o:DocumentProperties>'
						+ '<ss:ExcelWorkbook>'
						+ '<ss:WindowHeight>'
						+ 100
						+ '</ss:WindowHeight>'
						+ '<ss:WindowWidth>'
						+ 500
						+ '</ss:WindowWidth>'
						+ '<ss:ProtectStructure>False</ss:ProtectStructure>'
						+ '<ss:ProtectWindows>False</ss:ProtectWindows>'
						+ '</ss:ExcelWorkbook>'
						+ '<ss:Styles>'
						+ '<ss:Style ss:ID="Default">'
						+ '<ss:Alignment ss:Vertical="Top" ss:WrapText="1" />'
						+ '<ss:Font ss:FontName="arial" ss:Size="10" />'
						+ '<ss:Borders>'
						+ '<ss:Border ss:Color="#e4e4e4" ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Top" />'
						+ '<ss:Border ss:Color="#e4e4e4" ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Bottom" />'
						+ '<ss:Border ss:Color="#e4e4e4" ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Left" />'
						+ '<ss:Border ss:Color="#e4e4e4" ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Right" />'
						+ '</ss:Borders>'
						+ '<ss:Interior />'
						+ '<ss:NumberFormat />'
						+ '<ss:Protection />'
						+ '</ss:Style>'
						+ '<ss:Style ss:ID="title">'
						+ '<ss:Borders />'
						+ '<ss:Font />'
						+ '<ss:Alignment ss:WrapText="1" ss:Vertical="Center" ss:Horizontal="Center" />'
						+ '<ss:NumberFormat ss:Format="@" />'
						+ '</ss:Style>'
						+ '<ss:Style ss:ID="headercell">'
						+ '<ss:Font ss:Bold="1" ss:Size="10" />'
						+ '<ss:Alignment ss:WrapText="1" ss:Horizontal="Center" />'
						+ '<ss:Interior ss:Pattern="Solid" ss:Color="#A3C9F1" />'
						+ '</ss:Style>'
						+ '<ss:Style ss:ID="even">'
						+ '<ss:Interior ss:Pattern="Solid" ss:Color="#CCFFFF" />'
						+ '</ss:Style>'
						+ '<ss:Style ss:Parent="even" ss:ID="evendate">'
						+ '<ss:NumberFormat ss:Format="yyyy-mm-dd" />'
						+ '</ss:Style>'
						+ '<ss:Style ss:Parent="even" ss:ID="evenint">'
						+ '<ss:NumberFormat ss:Format="0" />'
						+ '</ss:Style>'
						+ '<ss:Style ss:Parent="even" ss:ID="evenfloat">'
						+ '<ss:NumberFormat ss:Format="0.00" />'
						+ '</ss:Style>'
						+ '<ss:Style ss:ID="odd">'
						+ '<ss:Interior ss:Pattern="Solid" ss:Color="#CCCCFF" />'
						+ '</ss:Style>'
						+ '<ss:Style ss:Parent="odd" ss:ID="odddate">'
						+ '<ss:NumberFormat ss:Format="yyyy-mm-dd" />'
						+ '</ss:Style>'
						+ '<ss:Style ss:Parent="odd" ss:ID="oddint">'
						+ '<ss:NumberFormat ss:Format="0" />' + '</ss:Style>'
						+ '<ss:Style ss:Parent="odd" ss:ID="oddfloat">'
						+ '<ss:NumberFormat ss:Format="0.00" />'
						+ '</ss:Style>' + '</ss:Styles>' + temp
						+ '</ss:Workbook>';
				return main;
			}
		};
	})();
	return {
		getExcelUrl : function(inputGrid, inputTitle, isAll) {
			var content = storeToXml.storeToXml(inputGrid, inputTitle, isAll);
			return content;
		}
	};
})();

var expcurpage = function(grid,title){
	var content = getExcelUrl.getExcelUrl(grid, title);
	if(Ext.isIE){
		var fd = Ext.get('frmDummy');
		if (!fd) {
			fd = Ext.DomHelper.append(Ext.getBody(), {
				tag : 'form',
				method : 'post',
				id : 'frmDummy',
				action : './export2excel.jsp',
//				target : '_blank',
				name : 'frmDummy',
				cls : 'x-hidden',
				cn : [{
							tag : 'input',
							name : 'exportContent',
							id : 'exportContent',
							type : 'hidden'
						},{
							tag : 'input',
							name : 'exporttitle',
							id : 'exporttitle',
							type : 'hidden'
						}]
			}, true);
			fd.child('#exportContent').set({
				value : content
			});
			fd.child('#exporttitle').set({
				value : title
			});
		}
		fd.dom.submit();
	}else{
		var url = 'data:application/vnd.ms-excel;base64,'
					+ Base64.encode(content);
		window.location=url;
	}
}

var getDataMethod = function(url){
	if (url.indexOf('!') < 1)
			return 'execute';
	var i = url.indexOf('!');
	var j = url.indexOf('.action');
	return url.substr(i + 1, j - i - 1);
}

var processUrl = function(url){
	var newurl = "";
	if (url.indexOf("!") > 0)
		newurl = url.replace(/!.*\.action/, '!exportExcel.action');
	else
		newurl = url.replace(/\.action/, '!exportExcel.action');
	return newurl;
}

var colInfoAndType = function(grid){
	var cmDataIndex = '';
	var cmDataType = '';
	var result = {};
	var columns = grid.columns;
	for(var i = 0 ; i < columns.length ; i++){
		if(columns[i].dataIndex != '' && !columns[i].isHidden()){
			var model ;
			if(grid.store.getTotalCount() > 0){
				model = grid.store.getAt(0);
			}
			if(Ext.isEmpty(model)){
				cmDataType += 'String,'
			}else{
				var dataValue = model.get(columns[i].dataIndex);
				cmDataType += getType(dataValue)+',';
			}
			cmDataIndex += columns[i].dataIndex+',';
		}
	}
	result.cmDataIndex = cmDataIndex;
	result.cmDataType = cmDataType;
	return result;
}

var expallpage = function (grid, title){
	var content = getExcelUrl.getExcelUrl(grid, title, true);
	var limit = grid.store.getTotalCount()> EXCEL_DEFAULT_COUNT?EXCEL_DEFAULT_COUNT:grid.store.getTotalCount();
	var url = grid.store.url || grid.store.proxy.url;
	if (Ext.isEmpty(url)) {
		this.expPage();
		return;
	}
	var dataMethod = getDataMethod(url);
	url = processUrl(url);
	url = Ext.urlAppend(url, Ext.urlEncode(grid.store.proxy.extraParams));
	var rootProperty = grid.store.proxy.reader.root;
	var cmDataType = colInfoAndType(grid).cmDataType;
	var cmDataIndex = colInfoAndType(grid).cmDataIndex;
	var fd = Ext.get('exportExcel');
	if (!fd) {
		fd = Ext.DomHelper.append(Ext.getBody(), {
			tag : 'form',
			method : 'post',
			id : 'exportExcel',
			action : url,
//			target : '_blank',
			name : 'exportExcel',
			cls : 'x-hidden',
			cn : [{
				tag : 'input',
				name : 'dataMethod',
				id : 'dataMethod',
				type : 'hidden'
			}, {
				tag : 'input',
				name : 'rootProperty',
				id : 'rootProperty',
				type : 'hidden'
			}, {
				tag : 'input',
				name : 'cmDataType',
				id : 'cmDataType',
				type : 'hidden'
			}, {
				tag : 'input',
				name : 'cmDataIndex',
				id : 'cmDataIndex',
				type : 'hidden'
			}, {
				tag : 'input',
				name : 'cm',
				id : 'cm',
				type : 'hidden'
			}, {
				tag : 'input',
				name : 'limit',
				id : 'limit',
				type : 'hidden',
				value : limit
			},{
				tag : 'input',
				name : 'start',
				id : 'start',
				type : 'hidden',
				value : 0
			},{
				tag : 'input',
				name : 'excelFileName',
				id : 'excelFileName',
				type : 'hidden',
				value : 0
			}]
		},true);
	}
	fd.dom.action=url;
	fd.child('#dataMethod').set({
		value : dataMethod
	});
	fd.child('#excelFileName').set({
		value : title
	});
	fd.child('#rootProperty').set({
		value : rootProperty
	});
	fd.child('#cmDataType').set({
		value : cmDataType
	});
	fd.child('#cmDataIndex').set({
		value : cmDataIndex
	});
	fd.child('#cm').set({
		value : content
	});
	fd.dom.submit();
}

