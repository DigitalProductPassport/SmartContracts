// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ProductDetails.sol";

contract ProductPassport is ProductDetails {
    struct ProductData {
        string description;
        string[] manuals;
        string[] specifications;
    }

    mapping(uint256 => ProductData) public productData;

    function setProductData(
        uint256 productId,
        string memory description,
        string[] memory manuals,
        string[] memory specifications
    ) public {
        productData[productId] = ProductData(
            description,
            manuals,
            specifications
        );
    }

    function getProductData(uint256 productId) public view returns (ProductData memory) {
        return productData[productId];
    }
}
