var DEFAULT_PAGE_SIZE = 200;

Ext.onReady(function(){
	Ext.create('Ext.panel.Panel', {
	    title: 'Toolbar Seperator Example',
	    width: 300,
	    height: 200,
	    tbar : [
	        'Item 1',
	        { xtype: 'tbseparator' },
	        'Item 2'
	    ],
	    renderTo: Ext.getBody()
	});
});