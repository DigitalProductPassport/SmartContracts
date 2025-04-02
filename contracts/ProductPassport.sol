// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./ComplexManagement.sol";
import "./Geolocation.sol";

contract ProductPassport is Ownable {
    ComplexManagement public complexManagement;
    
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
    event ProductUpdated(uint256 productId, string description, string batchNumber);
    event ProductRemoved(uint256 productId);
    event ComplexManagementSet(address complexManagementAddress);

    constructor(address initialOwner) Ownable(initialOwner) {}

    // Set the ComplexManagement contract address
    function setComplexManagement(address _complexManagement) public onlyOwner {
        require(_complexManagement != address(0), "Invalid complex management address");
        complexManagement = ComplexManagement(_complexManagement);
        emit ComplexManagementSet(_complexManagement);
    }

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
    ) public onlyOwner {
        require(address(complexManagement) != address(0), "ComplexManagement contract not set");
        require(bytes(complexId).length > 0, "Complex ID must be provided");
        require(complexManagement.complexExists(complexId), "Complex does not exist");
        require(products[productId].materialComposition.length == 0, "Product ID already exists");

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

    // Update an existing product
    function updateProduct(
        uint256 productId,
        string memory description,
        string[] memory manuals,
        string[] memory specifications,
        string memory batchNumber,
        string memory productionDate,
        string memory expiryDate,
        string memory certifications,
        string memory warrantyInfo,
        address[] memory materialComposition
    ) public onlyOwner {
        require(products[productId].materialComposition.length > 0, "Product does not exist");
        
        ProductData storage product = products[productId];
        product.description = description;
        product.manuals = manuals;
        product.specifications = specifications;
        product.batchNumber = batchNumber;
        product.productionDate = productionDate;
        product.expiryDate = expiryDate;
        product.certifications = certifications;
        product.warrantyInfo = warrantyInfo;
        product.materialComposition = materialComposition;

        emit ProductUpdated(productId, description, batchNumber);
    }

    // Remove a product
    function removeProduct(uint256 productId) public onlyOwner {
        require(products[productId].materialComposition.length > 0, "Product does not exist");
        delete products[productId];
        emit ProductRemoved(productId);
    }

    function getProductDetails(uint256 productId) public view returns (ProductData memory, Geolocation.GeoLocation memory) {
        require(address(complexManagement) != address(0), "ComplexManagement contract not set");
        require(products[productId].materialComposition.length > 0, "Product does not exist");
        
        ProductData memory product = products[productId];
        Geolocation.GeoLocation memory origin = complexManagement.getComplexGeolocation(product.complexId);
        
        return (product, origin);
    }

    // Check if a product exists
    function productExists(uint256 productId) public view returns (bool) {
        return products[productId].materialComposition.length > 0;
    }
}