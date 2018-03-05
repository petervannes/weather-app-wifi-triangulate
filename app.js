// const scanner = require('node-wifi-scanner');
const axios = require('axios');
const wifiScanner = require('./wifiscanner/wifiscanner');
const geoLocate = require('./geolocate/geolocate');

global.googleAPIKey = "AIzaSyBy$Lll8HjL131uXMb6LQjb-bzN3HLYQ18";
global.darkSkyAPIKey = "ff4c279745ee6c7563beae2ae5ec4az7";

wifiScanner.scanWifiNetworks().then((WifiAccesPoints) => {
  return geoLocate.geoLocate(WifiAccesPoints).then((Coordinates) => {
    console.log("Your coordinates are;");
    console.log(
      `Latitude ${Coordinates.lat}, Longtitude ${Coordinates.lng}`);
    console.log(
      `Corresponding address: ${Coordinates.formatted_address}`);
    var weatherUrl =
      `https://api.darksky.net/forecast/${global.darkSkyAPIKey}/${Coordinates.lat},${Coordinates.lng}?units=si`
    return axios.get(weatherUrl);
  })
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(
    `The temperature now is ${temperature}, but feels like ${apparentTemperature}`
  );
}).catch((error) => {
  if (error.code === 'ENOTFOUND') {
    console.log(`Host not found; ${error.hostname}`);
  } else if (error.response !== undefined) {
    if (error.response.status === 404) {
      console.log(`Host not found; ${error.response.config.url}`)
    }
  } else if (error.type !== undefined) {
    console.log(`${error.type} error occured, detail "${error.message}"`);
  } else {
    console.log('Cryptic error occured');
    console.log(error);
  }


});
