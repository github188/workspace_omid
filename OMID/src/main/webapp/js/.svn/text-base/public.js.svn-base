/**
 *grid内的文字可被选中 
 */
Ext.override(Ext.view.Table, {
			afterRender : function() {
				var me = this;

				me.callParent();
				me.mon(me.el, {
							scroll : me.fireBodyScroll,
							scope : me
						});
				if (!me.featuresMC
						&& (me.featuresMC.findIndex('ftype', 'unselectable') >= 0)) {
					me.el.unselectable();
				}

				me.attachEventsForFeatures();
			}
		});

Ext.define('Myext.grid.SelectFeature', {
			extend : 'Ext.grid.feature.Feature',
			alias : 'feature.selectable',
			mutateMetaRowTpl : function(metaRowTpl) {
				var i, ln = metaRowTpl.length;
				for (i = 0; i < ln; i++) {
					tpl = metaRowTpl[i];
					tpl = tpl.replace(/x-grid-row/, 'x-grid-row x-selectable');
					tpl = tpl.replace(/x-grid-cell-inner x-unselectable/g,
							'x-grid-cell-inner');
					tpl = tpl.replace(/unselectable="on"/g, '');
					metaRowTpl[i] = tpl;
				};
			}
		});
var selectFeature = Ext.create('Myext.grid.SelectFeature');		