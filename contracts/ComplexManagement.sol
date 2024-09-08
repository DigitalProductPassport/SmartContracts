// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Geolocation.sol";

contract ComplexManagement is Ownable {
    Geolocation public geolocationContract;

    struct Complex {
        string complexName;
        string complexCountry;
        string complexAddress;
        string complexSiteType;
        string complexIndustry;
        string geolocationId;
    }

    mapping(string => Complex) public complexes;

    event ComplexAdded(string complexId, string complexName, string complexCountry);

    constructor() Ownable(owner()) {
        
    }

    // Add a new complex and set the geolocation using the Geolocation contract
    function addComplex(
        string memory complexId,
        string memory complexName,
        string memory complexCountry,
        string memory complexAddress,
        string memory geolocationId,  // Reference the Geolocation by an ID
        string memory complexSiteType,
        string memory complexIndustry,
        string memory latitude,  // Latitude for geolocation
        string memory longitude,  // Longitude for geolocation
        string memory additionalInfo  // Additional info for geolocation
    ) public onlyOwner {
        // Store the geolocation in the Geolocation contract
        geolocationContract.setGeolocation(geolocationId, latitude, longitude, additionalInfo);

        // Add the complex details (excluding geolocation data)
        complexes[complexId] = Complex(
            complexName, 
            complexCountry, 
            complexAddress, 
            complexSiteType, 
            complexIndustry, 
            geolocationId
        );

        emit ComplexAdded(complexId, complexName, complexCountry);
    }

    // Get the complex details along with geolocation
    function getComplexGeolocation(string memory complexId) public view returns (
        GeoLocation memory
    ) {
        Complex memory complex = complexes[complexId];
        GeoLocation memory geo = geolocationContract.getGeolocation(complex.geolocationId);
        return geo;
    }

        function getComplex(string memory complexId) public view returns (
        Complex memory
    ) {
        Complex memory complex = complexes[complexId];
        return complex;
    }
}
