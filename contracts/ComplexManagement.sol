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
    event ComplexUpdated(string complexId, string complexName, string complexCountry);
    event ComplexRemoved(string complexId);
    event GeolocationContractSet(address geolocationContractAddress);

    constructor(address initialOwner) Ownable(initialOwner) {}

    // Set the Geolocation contract address
    function setGeolocationContract(address _geolocationContract) public onlyOwner {
        require(_geolocationContract != address(0), "Invalid geolocation contract address");
        geolocationContract = Geolocation(_geolocationContract);
        emit GeolocationContractSet(_geolocationContract);
    }

    // Add a new complex and set the geolocation using the Geolocation contract
function addComplex(
    string memory complexId,
    string memory complexName,
    string memory complexCountry,
    string memory complexAddress,
    string memory geolocationId,
    string memory complexSiteType,
    string memory complexIndustry,
    string memory latitude,
    string memory longitude,
    string memory additionalInfo
) public onlyOwner {
    require(address(geolocationContract) != address(0), "Geolocation contract not set");
    require(bytes(complexId).length > 0, "Complex ID cannot be empty");
    require(bytes(complexes[complexId].complexName).length == 0, "Complex ID already exists");
    
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

    // Update an existing complex
    function updateComplex(
        string memory complexId,
        string memory complexName,
        string memory complexCountry,
        string memory complexAddress,
        string memory complexSiteType,
        string memory complexIndustry
    ) public onlyOwner {
        require(bytes(complexes[complexId].complexName).length > 0, "Complex does not exist");
        
        Complex storage complex = complexes[complexId];
        complex.complexName = complexName;
        complex.complexCountry = complexCountry;
        complex.complexAddress = complexAddress;
        complex.complexSiteType = complexSiteType;
        complex.complexIndustry = complexIndustry;

        emit ComplexUpdated(complexId, complexName, complexCountry);
    }

    // Remove a complex
    function removeComplex(string memory complexId) public onlyOwner {
        require(bytes(complexes[complexId].complexName).length > 0, "Complex does not exist");
        delete complexes[complexId];
        emit ComplexRemoved(complexId);
    }

    // Get the complex details along with geolocation
    function getComplexGeolocation(string memory complexId) public view returns (
        Geolocation.GeoLocation memory
    ) {
        Complex memory complex = complexes[complexId];
        require(bytes(complex.complexName).length > 0, "Complex does not exist");
        require(address(geolocationContract) != address(0), "Geolocation contract not set");
        
        Geolocation.GeoLocation memory geo = geolocationContract.getGeolocation(complex.geolocationId);
        return geo;
    }

    // Get the complex details
    function getComplex(string memory complexId) public view returns (
        Complex memory
    ) {
        require(bytes(complexes[complexId].complexName).length > 0, "Complex does not exist");
        return complexes[complexId];
    }

    // Check if a complex exists
    function complexExists(string memory complexId) public view returns (bool) {
        return bytes(complexes[complexId].complexName).length > 0;
    }
}