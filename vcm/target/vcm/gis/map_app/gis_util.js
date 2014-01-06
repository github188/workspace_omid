

function create_point (lon,lat,type,attribute) {

  var point = new OpenLayers.Geometry.Point(lon, lat,type);

  point.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
  attribute = typeof(attribute) == 'undefined' ? {} : attribute;
  attribute['settlement_type'] = type;

  var feature_point = new OpenLayers.Feature.Vector(point, attribute);

  return feature_point;

}


function draw_sketch_feature (dataList) {
  var pointList = [];
  for(var i = 0; i < dataList.length; i++) {

      var newPoint = new OpenLayers.Geometry.Point(dataList[i].lon, dataList[i].lat);
      pointList.push(newPoint);

  }
  var linearRing = new OpenLayers.Geometry.LinearRing(pointList);
  linearRing.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
  var polygonFeature = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Polygon([linearRing]));

  return polygonFeature
}

