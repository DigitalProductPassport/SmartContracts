// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Geolocation is Ownable {
    struct GeoLocation {
        string latitude;
        string longitude;
        string additionalInfo;
    }

    mapping(string => GeoLocation) public geolocations;

    event GeolocationAdded(string id, string latitude, string longitude, string additionalInfo);
    event GeolocationUpdated(string id, string latitude, string longitude, string additionalInfo);
    event GeolocationRemoved(string id);

    constructor(address initialOwner) Ownable(initialOwner) {}

    function validateCoordinates(string memory latitude, string memory longitude) internal pure returns (bool) {
        // Basic validation could check format or range
        // This is a simple example - a more robust implementation would use proper parsing and validation
        bytes memory latBytes = bytes(latitude);
        bytes memory lonBytes = bytes(longitude);
        return (latBytes.length > 0 && latBytes.length <= 20 && 
                lonBytes.length > 0 && lonBytes.length <= 20);
    }

    function setGeolocation(
        string memory id, 
        string memory latitude, 
        string memory longitude, 
        string memory additionalInfo
    ) public onlyOwner {
        require(bytes(id).length > 0, "ID cannot be empty");
        require(bytes(latitude).length > 0, "Latitude cannot be empty");
        require(bytes(longitude).length > 0, "Longitude cannot be empty");
        require(validateCoordinates(latitude, longitude), "Invalid coordinates format");
        
        geolocations[id] = GeoLocation(latitude, longitude, additionalInfo);
        emit GeolocationAdded(id, latitude, longitude, additionalInfo);
    }

    // Update existing geolocation data
    function updateGeolocation(
        string memory id, 
        string memory latitude, 
        string memory longitude, 
        string memory additionalInfo
    ) public onlyOwner {
        require(bytes(geolocations[id].latitude).length > 0, "Geolocation does not exist");
        
        geolocations[id] = GeoLocation(latitude, longitude, additionalInfo);
        emit GeolocationUpdated(id, latitude, longitude, additionalInfo);
    }

    // Remove a geolocation
    function removeGeolocation(string memory id) public onlyOwner {
        require(bytes(geolocations[id].latitude).length > 0, "Geolocation does not exist");
        delete geolocations[id];
        emit GeolocationRemoved(id);
    }

    // Retrieve geolocation data
    function getGeolocation(string memory id) public view returns (GeoLocation memory) {
        return geolocations[id];
    }

    // Check if a geolocation exists
    function geolocationExists(string memory id) public view returns (bool) {
        return bytes(geolocations[id].latitude).length > 0;
    }
}