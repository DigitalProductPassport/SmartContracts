// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Geolocation {
    struct GeoLocation {
        int256 latitude;
        int256 longitude;
        string additionalInfo;
    }

    mapping(string => GeoLocation) public geolocations;

    event GeolocationAdded(string id, int256 latitude, int256 longitude, string additionalInfo);

    function setGeolocation(string memory id, int256 latitude, int256 longitude, string memory additionalInfo) public {
        geolocations[id] = GeoLocation(latitude, longitude, additionalInfo);
        emit GeolocationAdded(id, latitude, longitude, additionalInfo);
    }

    function getGeolocation(string memory id) public view returns (GeoLocation memory) {
        return geolocations[id];
    }
}
