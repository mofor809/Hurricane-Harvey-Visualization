var dataset = ee.ImageCollection('OREGONSTATE/PRISM/AN81d')
                  .filter(ee.Filter.date('2017-08-24', '2017-09-02'));
var precipitation = dataset.select('ppt');
var precipitationVis = {
  min: 0.0,
  max: 50.0,
  palette: ['grey', 'yellow', 'red', 'purple', 'cyan'],
};
Map.setCenter(-95.3698, 29.7604, 9);
Map.addLayer(precipitation, precipitationVis, 'Precipitation');

//setting the dates to encompass Hurricane Harvey
var startDate = '2017-08-24'
var endDate = '2017-09-02'

var precip = ee.ImageCollection('OREGONSTATE/PRISM/AN81d')
  .filterDate(startDate, endDate);
  
//focusing map on Houston, creating a video of the storm at 3 fps.
var videoArgs = {
  dimensions: 720,
  region: ee.Geometry.Rectangle([-90, 26, -98, 33]), 
  framesPerSecond: 3,
  crs: 'EPSG:3857',
  min: 0.0,
  max: 50.0,
  palette: ['grey', 'yellow', 'red', 'purple','cyan']
};

var videoURL = precip.select('ppt').getVideoThumbURL(videoArgs);

print('Video URL: ', videoURL);