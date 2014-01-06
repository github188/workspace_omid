Ext.onReady(function(){
	Ext.Ajax.request({
		url : 'pMenuAction.action',
		params : {
		
		},
		success : function(response) {
			var result = Ext.decode(response.responseText);
//			var list = result.list;
//			Ext.Msg.alert("提示",list.length);
		}
	});
})