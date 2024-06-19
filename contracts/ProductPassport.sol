// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ProductDetails.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ProductPassport is ProductDetails, Ownable {
    struct ProductData {
        string description;
        string[] manuals;
        string[] specifications;
    }

    mapping(uint256 => ProductData) public productData;

    
    constructor(address initialOwner) Ownable(initialOwner) {
    }
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
