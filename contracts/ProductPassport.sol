// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ProductPassport {
    struct ProductDetails {
        string uid;
        string gtin;
        string taricCode;
        string manufacturerInfo;
        string facilityInfo;
        string consumerInfo;
        string endOfLifeInfo;
    }

    struct ProductData {
        string description;
        string[] manuals;
        string[] specifications;
    }

    mapping(uint256 => ProductDetails) public products;
    mapping(uint256 => ProductData) public productData;

    function setProductDetails(
        uint256 productId,
        string memory uid,
        string memory gtin,
        string memory taricCode,
        string memory manufacturerInfo,
        string memory facilityInfo,
        string memory consumerInfo,
        string memory endOfLifeInfo
    ) internal {
        products[productId] = ProductDetails(
            uid,
            gtin,
            taricCode,
            manufacturerInfo,
            facilityInfo,
            consumerInfo,
            endOfLifeInfo
        );
    }

    function setProductData(
        uint256 productId,
        string memory description,
        string[] memory manuals,
        string[] memory specifications
    ) internal {
        productData[productId] = ProductData(
            description,
            manuals,
            specifications
        );
    }

    function getProductDetails(uint256 productId) public view returns (ProductDetails memory) {
        return products[productId];
    }

    function getProductData(uint256 productId) public view returns (ProductData memory) {
        return productData[productId];
    }
}
