Ext.onReady(function() {
		var panel = new Ext.Panel({
				width :620,
				id : 'chartpanel',
				height :420,
				autoScroll :true,
				title :'1111',
				renderTo: 'chartdiv1'
			});
			var myChart1 = new FusionCharts("../FusionCharts/FCF_Pie3D.swf",
					"myChartId1", "600", "400");
			myChart1.setDataURL("Data.xml");
			myChart1.render("chartpanel");
			var myChart2 = new FusionCharts("../FusionCharts/FCF_Column3D.swf",
					"myChartId2", "600", "300");
			myChart2.setDataURL("Data.xml");
			myChart2.render("chartdiv2");
			
			var myChart3 = new FusionCharts("../FusionCharts/FCF_Line.swf",
					"myChartId3", "600", "300");
			myChart3.setDataURL("Data.xml");
			myChart3.render("chartdiv3");
			
			var myChart4 = new FusionCharts("../FusionCharts/FCF_Area2D.swf",
					"myChartId4", "400", "250");
			myChart4.setDataURL("Data.xml");
			myChart4.render("chartdiv4");
		});