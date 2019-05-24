/* eslint-disable consistent-return */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const API_KEY = require('../../GoogleMaps.config');

// eslint-disable-next-line import/order
const googleMapsClient = require('@google/maps').createClient({
  key: API_KEY.key,
  // eslint-disable-next-line object-shorthand
  Promise: Promise,
});

const getCoordinates = address => googleMapsClient.geocode({
  address,
})
  .asPromise();

const convertToGeocode = async (data) => {
  try {
    const colorAssignment = {};
    for (const i of data) {
      if (!colorAssignment[i.CATEGORY]) {
        colorAssignment[i.CATEGORY] = Math.floor(Math.random() * 16777215).toString(16);
      }
      const fullAddress = `${i.ADDRESS},${i.CITY},${i.STATE}`;
      const res = await getCoordinates(fullAddress);
      i.coordinates = res.json.results[0].geometry.location;
      i.colorcode = colorAssignment[i.CATEGORY];
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  convertToGeocode,
};
