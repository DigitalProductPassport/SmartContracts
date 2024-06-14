// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Geolocation.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ComplexManagement is Ownable {
    struct Complex {
        string complexId;
        string complexName;
        string complexCountry;
        string complexAddress;
        string complexProvidedId;
        string complexSiteType;
        string complexIndustry;
        int256 latitude;
        int256 longitude;
    }

    mapping(string => Complex) public complexes;
    mapping(address => bool) public contributors;

    Geolocation public geolocationContract;

    event ComplexAdded(
        string complexId,
        string complexName,
        string complexCountry,
        string complexAddress,
        string complexProvidedId,
        string complexSiteType,
        string complexIndustry,
        int256 latitude,
        int256 longitude
    );

    constructor(address _geolocationContract, address _initialOwner) Ownable(_initialOwner) {
        geolocationContract = Geolocation(_geolocationContract);
    }

    function addComplex(
        string memory _complexId,
        string memory _complexName,
        string memory _complexCountry,
        string memory _complexAddress,
        int256 _latitude,
        int256 _longitude,
        string memory _complexProvidedId,
        string memory _complexSiteType,
        string memory _complexIndustry
    ) external onlyOwnerOrContributor {
        complexes[_complexId] = Complex({
            complexId: _complexId,
            complexName: _complexName,
            complexCountry: _complexCountry,
            complexAddress: _complexAddress,
            complexProvidedId: _complexProvidedId,
            complexSiteType: _complexSiteType,
            complexIndustry: _complexIndustry,
            latitude: _latitude,
            longitude: _longitude
        });

        geolocationContract.setGeolocation(_complexId, _latitude, _longitude, _complexAddress);

        emit ComplexAdded(
            _complexId,
            _complexName,
            _complexCountry,
            _complexAddress,
            _complexProvidedId,
            _complexSiteType,
            _complexIndustry,
            _latitude,
            _longitude
        );
    }

    function getComplex(string memory _complexId) public view returns (Complex memory) {
        return complexes[_complexId];
    }

    modifier onlyOwnerOrContributor() {
        require(owner() == _msgSender() || contributors[_msgSender()], "Ownable: caller is not the owner nor a contributor");
        _;
    }

    function addContributor(address _contributor) external onlyOwner {
        contributors[_contributor] = true;
    }

    function removeContributor(address _contributor) external onlyOwner {
        contributors[_contributor] = false;
    }
}
