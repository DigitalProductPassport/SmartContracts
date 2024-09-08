// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./ComplexManagement.sol";
import "./Geolocation.sol";

contract ProductPassport is ComplexManagement {
    struct ProductData {
        string description;
        string[] manuals;
        string[] specifications;
        string batchNumber;
        string productionDate;
        string expiryDate;
        string certifications;
        string warrantyInfo;
        address[] materialComposition;
        string complexId;
    }

    mapping(uint256 => ProductData) public products;

    event ProductCreated(uint256 productId, string description, string batchNumber, string complexId);

    function createProduct(
        uint256 productId,
        string memory description,
        string[] memory manuals,
        string[] memory specifications,
        string memory batchNumber,
        string memory productionDate,
        string memory expiryDate,
        string memory certifications,
        string memory warrantyInfo,
        address[] memory materialComposition,
        string memory complexId



    ) public {
        require(bytes(complexId).length != 0, "Complex ID must be provided");

        products[productId] = ProductData({
            description: description,
            manuals: manuals,
            specifications: specifications,
            batchNumber: batchNumber,
            productionDate: productionDate,
            expiryDate: expiryDate,
            certifications: certifications,
            warrantyInfo: warrantyInfo,
            materialComposition: materialComposition,
            complexId: complexId
        });

        emit ProductCreated(productId, description, batchNumber, complexId);
    }

    function getProductDetails(uint256 productId) public view returns (ProductData memory,  Geolocation.GeoLocation memory) {
        ProductData memory product = products[productId];
        Geolocation.GeoLocation memory  origin  = getComplexGeolocation(product.complexId);
        return (product, origin);
    }
}