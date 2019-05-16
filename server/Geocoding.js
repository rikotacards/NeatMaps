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


var data = [ { CATEGORY: 'one-family dwelling',
STATE: 'CA',
CITY: 'Foster City',
ZIPCODE: '94404',
ADDRESS: '2545, 777 Shell Blvd' },
{ CATEGORY: 'restricted density multiple dwelling',
STATE: 'CA',
CITY: 'Menlo Park',
ZIPCODE: '94025',
ADDRESS: '2800 Sand Hill Road' },
{ CATEGORY: 'historic preservation overlay zone',
STATE: 'CA',
CITY: 'Foster City',
ZIPCODE: '94404',
ADDRESS: '919 Edgewater Blvd' },
{ CATEGORY: 'limited manufacturing',
STATE: 'CA',
CITY: 'Belmont',
ZIPCODE: '94002',
ADDRESS: '1309 Elmer St A' },
{ CATEGORY: 'restricted density multiple dwelling',
STATE: 'CA',
CITY: 'San Carlos',
ZIPCODE: '94070',
ADDRESS: '1106 Alameda de las Pulgas' },
{ CATEGORY: 'limited ground floor commercial',
STATE: 'CA',
CITY: 'Redwood City',
ZIPCODE: '94063',
ADDRESS: '2006 Broadway' },
{ CATEGORY: 'restricted industrial',
STATE: 'CA',
CITY: 'Menlo Park',
ZIPCODE: '94027',
ADDRESS: '299 Alameda de las Pulgas' },
{ CATEGORY: 'one-family dwelling',
STATE: 'CA',
CITY: 'Redwood City',
ZIPCODE: '94063',
ADDRESS: '1555 El Camino Real' },
{ CATEGORY: 'limited manufacturing',
STATE: 'CA',
CITY: 'Half Moon Bay',
ZIPCODE: '94019',
ADDRESS: '250 Poplar St' },
{ CATEGORY: 'restricted light industrial',
STATE: 'CA',
CITY: 'Hayward',
ZIPCODE: '94544',
ADDRESS: '1768-1798 Canterbury Ln' },
{ CATEGORY: 'restricted density multiple dwelling',
STATE: 'CA',
CITY: 'Daly City',
ZIPCODE: '94015',
ADDRESS: '260 Washington St' },
{ CATEGORY: 'historic preservation overlay zone',
STATE: 'CA',
CITY: 'Redwood City',
ZIPCODE: '94063',
ADDRESS: '840 Sweeney Ave' },
{ CATEGORY: 'limited ground floor commercial',
STATE: 'CA',
CITY: 'Pacifica',
ZIPCODE: '94044',
ADDRESS: '104 Hilton Way' },
{ CATEGORY: 'two-family dwellings',
STATE: 'CA',
CITY: 'Redwood City',
ZIPCODE: '94063',
ADDRESS: '2645 Fair Oaks Ave' },
{ CATEGORY: 'one-family dwelling',
STATE: 'CA',
CITY: 'Burlingame',
ZIPCODE: '94010',
ADDRESS: '1715 Quesada Way' },
{ CATEGORY: 'two-family dwellings',
STATE: 'CA',
CITY: 'Fremont',
ZIPCODE: '94538',
ADDRESS: '39324 Argonaut Way' },
{ CATEGORY: 'restricted industrial',
STATE: 'CA',
CITY: 'Palo Alto',
ZIPCODE: '94301',
ADDRESS: '535 Ramona St' },
{ CATEGORY: 'one-family dwelling',
STATE: 'CA',
CITY: 'Redwood City',
ZIPCODE: '94061',
ADDRESS: '2521 Goodwin Ave' },
{ CATEGORY: 'restricted light industrial',
STATE: 'CA',
CITY: 'Woodside',
ZIPCODE: '94062',
ADDRESS: '17288 Skyline Blvd' },
{ CATEGORY: 'restricted density multiple dwelling',
STATE: 'CA',
CITY: 'Menlo Park',
ZIPCODE: '94025',
ADDRESS: '3567 Alameda de las Pulgas' } ]


var convertToGeocode = async (data) => {
  try {
      for (var i of data){
        var fullAddress = `${i.ADDRESS},${i.CITY},${i.STATE}`
        var res = await getCoordinates(fullAddress)
        i.coordinates = res.json.results[0].geometry.location
      }
      console.log(data)
      return data
  } catch (err) {
      console.log(err)
  }
}


module.exports = {
  convertToGeocode: convertToGeocode
}
// convertToGeocode(data)