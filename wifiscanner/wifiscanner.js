const scanner = require('node-wifi-scanner');

function scanWifiNetworks() {

  return new Promise((resolve, reject) => {

    var WifiAccesPoints = [];

    scanner.scan((err, networks) => {

      if (err || networks.length === 0) {
        reject({
          type: "generic",
          message: "Failed to scan Wifi networks"
        });
      }

      for (var cnt in networks) {
        var ap = {
          macAddress: networks[cnt].mac,
          signalStrength: networks[cnt].rssi,
          channel: networks[cnt].channel
        };
        WifiAccesPoints.push(ap);
      }

      resolve(WifiAccesPoints);
    });
  });
}

module.exports = {
  scanWifiNetworks
};
