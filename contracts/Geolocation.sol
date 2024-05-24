// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Geolocation {
    struct GeoLocation {
        string latitude;
        string longitude;
    }

    mapping(uint256 => GeoLocation) public batchGeolocations;

    event GeolocationAdded(uint256 batchId, string latitude, string longitude, string additionalInfo);

    function setGeolocation(uint256 batchId, string memory latitude, string memory longitude, string memory additionalInfo) public {
        batchGeolocations[batchId] = GeoLocation(latitude, longitude);
        emit GeolocationAdded(batchId, latitude, longitude, additionalInfo);
    }

    function getGeolocation(uint256 batchId) public view returns (GeoLocation memory) {
        return batchGeolocations[batchId];
    }
}
