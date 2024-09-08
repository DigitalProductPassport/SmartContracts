// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Geolocation {
    struct GeoLocation {
        string latitude;
        string longitude;
        string additionalInfo;
    }

    mapping(string => GeoLocation) public geolocations;

    event GeolocationAdded(string id, string latitude, string longitude, string additionalInfo);

    // Store geolocation data
    function setGeolocation(
        string memory id, 
        string memory latitude, 
        string memory longitude, 
        string memory additionalInfo
    ) public {
        geolocations[id] = GeoLocation(latitude, longitude, additionalInfo);
        emit GeolocationAdded(id, latitude, longitude, additionalInfo);
    }

    // Retrieve geolocation data
    function getGeolocation(string memory id) public view returns (GeoLocation memory) {
        return geolocations[id];
    }
}
