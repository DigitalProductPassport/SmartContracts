// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Geolocation {
    struct Address {
        string addressStreet;
        string addressCity;
        string addressStateProvince;
        string addressCountry;
        string addressCountryIso2;
        string addressCountryIso3;
        string addressPostalCode;
        string addressFullAddress;
        int256 addressLatitude;  
        int256 addressLongitude;
    }

    struct GeoLocation {
        int256 latitude;
        int256 longitude;
    }

    mapping(string => GeoLocation) public complexGeolocations;

    event GeolocationAdded(string complexId, int256 latitude, int256 longitude, string additionalInfo);

    function setGeolocation(string memory complexId, int256 latitude, int256 longitude, string memory additionalInfo) public {
        complexGeolocations[complexId] = GeoLocation(latitude, longitude);
        emit GeolocationAdded(complexId, latitude, longitude, additionalInfo);
    }

    function getGeolocation(string memory complexId) public view returns (GeoLocation memory) {
        return complexGeolocations[complexId];
    }
}
