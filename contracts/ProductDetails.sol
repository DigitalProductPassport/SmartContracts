// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProductDetails {
    struct Product {
        string uid;
        string gtin;
        string taricCode;
        string manufacturerInfo;
        string consumerInfo;
        string endOfLifeInfo;
    }

    mapping(uint256 => Product) public products;
    mapping(address => bool) public authorizedEntities;

    modifier onlyAuthorized() virtual {
        require(authorizedEntities[msg.sender], "Not authorized");
        _;
    }

    function setProduct(
        uint256 productId,
        string memory uid,
        string memory gtin,
        string memory taricCode,
        string memory manufacturerInfo,
        string memory consumerInfo,
        string memory endOfLifeInfo
    ) public virtual onlyAuthorized {
        products[productId] = Product(
            uid,
            gtin,
            taricCode,
            manufacturerInfo,
            consumerInfo,
            endOfLifeInfo
        );
    }

    function getProduct(uint256 productId) public view returns (Product memory) {
        return products[productId];
    }

    function authorizeEntity(address entity) public virtual {
        authorizedEntities[entity] = true;
    }

    function revokeEntity(address entity) public virtual {
        authorizedEntities[entity] = false;
    }
}
