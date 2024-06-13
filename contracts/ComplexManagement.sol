// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Geolocation.sol";

contract ComplexManagement {
    Geolocation public geolocationContract;

    struct Complex {
        string complexId;
        string complexName;
        string complexCountry;
        Geolocation.Address complexAddress;
        string complexProvidedId;
        string complexSiteType;
        string complexSicCode;
        string complexIndustry;
    }

    mapping(string => Complex) private complexes;

    constructor(address _geolocationContract) {
        geolocationContract = Geolocation(_geolocationContract);
    }

    function addComplex(
        string memory complexId,
        string memory complexName,
        string memory complexCountry,
        string memory addressStreet,
        string memory addressCity,
        string memory addressStateProvince,
        string memory addressCountry,
        string memory addressCountryIso2,
        string memory addressCountryIso3,
        string memory addressPostalCode,
        string memory addressFullAddress,
        int256 addressLatitude,
        int256 addressLongitude,
        string memory complexProvidedId,
        string memory complexSiteType,
        string memory complexSicCode,
        string memory complexIndustry
    ) public {
        Geolocation.Address memory complexAddress = Geolocation.Address(
            addressStreet,
            addressCity,
            addressStateProvince,
            addressCountry,
            addressCountryIso2,
            addressCountryIso3,
            addressPostalCode,
            addressFullAddress,
            addressLatitude,
            addressLongitude
        );

        Complex memory complex = Complex(
            complexId,
            complexName,
            complexCountry,
            complexAddress,
            complexProvidedId,
            complexSiteType,
            complexSicCode,
            complexIndustry
        );

        complexes[complexId] = complex;
    }

    function getComplex(string memory complexId) public view returns (Complex memory) {
        return complexes[complexId];
    }
}
