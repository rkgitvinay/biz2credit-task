var express = require('express');
var router = express.Router();
var GeoPoint = require('geopoint');
var fs = require('fs');
const sourceLat = 53.339428;
const sourceLong = -6.257664;

router.get('/getResult', function(req, res, next) {
  var contents = fs.readFileSync('Customers _Assignment_Coding Challenge.txt', 'utf8');
  var arrStr = contents.split(/[{}]/);
  const getResult = filterAndModifyObject(arrStr);
  res.send(getResult);
});


filterAndModifyObject = (arrayString) => {
  const filterdArray = [];
  const originalArray = [];
  for(var i=0; i<arrayString.length; i++) {
    var tempObject = JSON.parse('{' + arrayString[i] + '}')
    if (Object.keys(tempObject).length !== 0 && tempObject.constructor === Object) {
      originalArray.push(tempObject);
      const distance = checkDistanceBetweenLatLong(tempObject.latitude, tempObject.longitude);
      if (distance <= 100) {
        filterdArray.push(tempObject);
      }
    }  
  }
  return {filterdArray:filterdArray, originalArray:originalArray};
}

checkDistanceBetweenLatLong = (latitude, longitude) => {  
  point1 = new GeoPoint(sourceLat, sourceLong);
  point2 = new GeoPoint(parseFloat(latitude), parseFloat(longitude));
  var distance = point1.distanceTo(point2, true)
  return distance;
}

module.exports = router;
