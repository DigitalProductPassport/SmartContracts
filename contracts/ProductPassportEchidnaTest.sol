// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ProductPassport.sol";
import "./ComplexManagement.sol";
import "./Geolocation.sol";

contract ProductPassportEchidnaTest {
    ProductPassport productPassport;
    ComplexManagement complexManagement;
    Geolocation geolocation;
    
    address owner = msg.sender;
    uint256 testProductId = 1;
    string testComplexId = "test-complex";
    string testGeoId = "test-geo";
    
    constructor() {
        // Deploy contracts
        geolocation = new Geolocation(owner);
        complexManagement = new ComplexManagement(owner);
        productPassport = new ProductPassport(owner);
        
        // Set up contract relationships
        complexManagement.setGeolocationContract(address(geolocation));
        productPassport.setComplexManagement(address(complexManagement));
        
        // Initialize test data
        geolocation.setGeolocation(testGeoId, "40.7128", "-74.0060", "Test location");
        
        // Add test complex
        complexManagement.addComplex(
            testComplexId,
            "Test Complex",
            "Test Country",
            "Test Address",
            testGeoId,
            "Test Site",
            "Test Industry",
            "40.7128",
            "-74.0060",
            "Test Info"
        );
    }
    
    // Test function: Product creation should work with valid parameters
    function testCreateProduct() public {
        string[] memory manuals = new string[](1);
        manuals[0] = "Test Manual";
        
        string[] memory specs = new string[](1);
        specs[0] = "Test Spec";
        
        address[] memory materials = new address[](1);
        materials[0] = address(0x1);
        
        productPassport.createProduct(
            testProductId,
            "Test Product",
            manuals,
            specs,
            "BATCH001",
            "2025-04-01",
            "2026-04-01",
            "ISO9001",
            "1 Year",
            materials,
            testComplexId
        );
        
        // Assertion: product should exist after creation
        assert(productPassport.productExists(testProductId));
    }
    
    // Test invariant: Product must always be associated with an existing complex
    function echidna_product_has_valid_complex() public view returns (bool) {
        if (!productPassport.productExists(testProductId)) {
            return true; // Skip if product doesn't exist yet
        }
        
        (ProductPassport.ProductData memory product, ) = productPassport.getProductDetails(testProductId);
        return complexManagement.complexExists(product.complexId);
    }
    
    // Test invariant: Geolocation should be retrievable for any product
    function echidna_product_has_geolocation() public view returns (bool) {
        if (!productPassport.productExists(testProductId)) {
            return true; // Skip if product doesn't exist yet
        }
        
        (ProductPassport.ProductData memory product, Geolocation.GeoLocation memory geo) = 
            productPassport.getProductDetails(testProductId);
            
        // Verify that geolocation has valid data
        return bytes(geo.latitude).length > 0 && bytes(geo.longitude).length > 0;
    }
}