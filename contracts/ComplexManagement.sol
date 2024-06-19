// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Geolocation.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ComplexManagement is Ownable,Geolocation {
    struct Complex {
        string complexId;
        string complexName;
        string complexCountry;
        string complexAddress;
        string complexSiteType;
        string complexIndustry;
        string latitude;
        string longitude;
    }

    mapping(string => Complex) public complexes;
    mapping(address => bool) public contributors;

    event ComplexAdded(
        string complexId,
        string complexName,
        string complexCountry,
        string complexAddress,
        string complexSiteType,
        string complexIndustry,
        string latitude,
        string longitude
    );

    constructor(address _initialOwner) Ownable(_initialOwner) {
    }

    function addComplex(
        string memory _complexId,
        string memory _complexName,
        string memory _complexCountry,
        string memory _complexAddress,
        string memory _latitude,
        string memory _longitude,
        string memory _complexSiteType,
        string memory _complexIndustry
    ) external onlyOwnerOrContributor {
        complexes[_complexId] = Complex({
            complexId: _complexId,
            complexName: _complexName,
            complexCountry: _complexCountry,
            complexAddress: _complexAddress,
            complexSiteType: _complexSiteType,
            complexIndustry: _complexIndustry,
            latitude: _latitude,
            longitude: _longitude
        });

        setGeolocation(_complexId, _latitude, _longitude, _complexAddress);

        emit ComplexAdded(
            _complexId,
            _complexName,
            _complexCountry,
            _complexAddress,
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
