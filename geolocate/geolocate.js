const axios = require('axios');

var coordinates = {};

function geoLocate(WifiAccesPointsObj) {

  WifiAccesPoints = JSON.stringify(WifiAccesPointsObj);
  var GoogleRequestJSON = {
    "wifiAccessPoints": WifiAccesPoints
  };

  var geolocateURL =
    `https://www.googleapis.com/geolocation/v1/geolocate?&key=${global.googleAPIKey}`;

  return axios.post(geolocateURL, GoogleRequestJSON).then((response) => {

    var lat = response.data.location.lat;
    var lng = response.data.location.lng;

    coordinates.lat = lat;
    coordinates.lng = lng;

    var geocodeURL =
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&key=${global.googleAPIKey}`
    return axios.get(geocodeURL);
  }).then((response) => {

    coordinates.formatted_address = response.data.results[0].formatted_address;

    return new Promise((resolve, reject) => {
      resolve(coordinates);
    });
  });
}

module.exports = {
  geoLocate
};
