// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ProductDetails.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ProductPassport is ProductDetails, Ownable {
    struct ProductData {
        string description;
        string[] manuals;
        string[] specifications;
        string batchNumber;
        string productionDate;
        string expiryDate;
        string certifications;
        string warrantyInfo;
        string materialComposition;
        string complianceInfo;
    }

    mapping(uint256 => ProductData) public productData;

    modifier onlyAuthorized() override {
        require(authorizedEntities[msg.sender], "Not authorized");
        _;
    }

    constructor(address initialOwner) Ownable(initialOwner) {
    }

    function setProductData(
        uint256 productId,
        string memory description,
        string[] memory manuals,
        string[] memory specifications,
        string memory batchNumber,
        string memory productionDate,
        string memory expiryDate,
        string memory certifications,
        string memory warrantyInfo,
        string memory materialComposition,
        string memory complianceInfo
    ) public onlyAuthorized {
        productData[productId] = ProductData(
            description,
            manuals,
            specifications,
            batchNumber,
            productionDate,
            expiryDate,
            certifications,
            warrantyInfo,
            materialComposition,
            complianceInfo
        );
    }

    function getProductData(uint256 productId) public view returns (ProductData memory) {
        return productData[productId];
    }

    function authorizeEntity(address entity) public override onlyOwner {
        authorizedEntities[entity] = true;
    }

    function revokeEntity(address entity) public override onlyOwner {
        authorizedEntities[entity] = false;
    }
}
