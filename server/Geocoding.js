//Pass in JSON Object, add coorindate data via Geocode service

var API_KEY = require('../GoogleMaps.config.js')

var googleMapsClient = require('@google/maps').createClient({
  key: API_KEY.key,
  Promise: Promise
})

var getCoordinates = (address) => {
  return googleMapsClient.geocode({
    address: address
  })
  .asPromise();
}

//Assign random color to category
//Each category has a color code
var convertToGeocode = async (data) => {
  try {

    var colorAssignment = {};

      for (var i of data){

        if(!colorAssignment[i.CATEGORY]){
          colorAssignment[i.CATEGORY] =
          Math.floor(Math.random()*16777215).toString(16);
        }

        var fullAddress = `${i.ADDRESS},${i.CITY},${i.STATE}`
        var res = await getCoordinates(fullAddress)
        i.coordinates = res.json.results[0].geometry.location
        i.colorcode = colorAssignment[i.CATEGORY]
      }
      console.log(data)
      return data
  } catch (err) {
      console.log(err)
  }
}

// convertToGeocode(data)

module.exports = {
  convertToGeocode: convertToGeocode
}
// convertToGeocode(data)