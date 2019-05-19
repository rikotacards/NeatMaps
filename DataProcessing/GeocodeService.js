//Pass in JSON Object, add coorindate data via Geocode service

var API_KEY = require('../GoogleMaps.config')

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

var convertToGeocode = async (data) => {

  try {

    var colorAssignment = {};

      for (var i of data){
        //Assign random color to category
        if(!colorAssignment[i.CATEGORY]){
          colorAssignment[i.CATEGORY] =
          Math.floor(Math.random()*16777215).toString(16);
        }

        var fullAddress = `${i.ADDRESS},${i.CITY},${i.STATE}`
        var res = await getCoordinates(fullAddress)

        i.coordinates = res.json.results[0].geometry.location

        i.colorcode = colorAssignment[i.CATEGORY]
      }

      return data

  } catch (err) {
      console.log(err)
  }
}
module.exports = {
  convertToGeocode: convertToGeocode
}
