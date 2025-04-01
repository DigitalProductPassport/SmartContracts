// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./ProductPassport.sol";
import "./ComplexManagement.sol";
import "./Geolocation.sol";

contract IntegratedProductPassportBatch is ERC721URIStorage, Ownable {
    ProductPassport public productPassport;
    ComplexManagement public complexManagement;
    Geolocation public geolocation;

    struct BatchDetails {
        uint256 amount;
        uint256 assemblingTime;
        string transportDetails;
        string currentGeolocationId;
        string originGeolocationId;
    }

    mapping(uint256 => BatchDetails) public batches;

    event BatchCreated(uint256 batchId, uint256 amount, uint256 productId);
    event BatchLocationUpdated(uint256 batchId, string newGeolocationId);
    event ContractsInitialized(address productPassport, address complexManagement, address geolocation);

    constructor(address initialOwner) ERC721("DigitalProductPassport", "DPP") Ownable(initialOwner) {}

    // Initialize contract references
    function initializeContracts(
        address _productPassport,
        address _complexManagement,
        address _geolocation
    ) public onlyOwner {
        require(_productPassport != address(0), "Invalid ProductPassport address");
        require(_complexManagement != address(0), "Invalid ComplexManagement address");
        require(_geolocation != address(0), "Invalid Geolocation address");
        
        productPassport = ProductPassport(_productPassport);
        complexManagement = ComplexManagement(_complexManagement);
        geolocation = Geolocation(_geolocation);
        
        emit ContractsInitialized(_productPassport, _complexManagement, _geolocation);
    }

    function createBatch(
        uint256 batchId,
        uint256 amount,
        uint256 assemblingTime,
        string memory transportDetails,
        uint256 productId
    ) external onlyOwner {
        require(address(productPassport) != address(0), "Contracts not initialized");
        require(productPassport.productExists(productId), "Product does not exist");
        require(batches[batchId].amount == 0, "Batch ID already exists");
        
        (ProductPassport.ProductData memory product, ) = productPassport.getProductDetails(productId);
        require(bytes(product.complexId).length != 0, "Product must be associated with a complex");
        
        ComplexManagement.Complex memory complex = complexManagement.getComplex(product.complexId);
        string memory originGeolocationId = complex.geolocationId;
        
        batches[batchId] = BatchDetails(
            amount, 
            assemblingTime, 
            transportDetails, 
            originGeolocationId, // Current location starts as origin
            originGeolocationId
        );
        
        // Mint NFT for the batch
        _mint(owner(), batchId);
        
        emit BatchCreated(batchId, amount, productId);
    }

    // Update batch location
    function updateBatchLocation(
        uint256 batchId,
        string memory newGeolocationId,
        string memory latitude,
        string memory longitude,
        string memory additionalInfo
    ) external onlyOwner {
        require(batches[batchId].amount > 0, "Batch does not exist");
        require(address(geolocation) != address(0), "Geolocation contract not initialized");
        
        // Create new geolocation if it doesn't exist
        if (!geolocation.geolocationExists(newGeolocationId)) {
            geolocation.setGeolocation(newGeolocationId, latitude, longitude, additionalInfo);
        }
        
        batches[batchId].currentGeolocationId = newGeolocationId;
        emit BatchLocationUpdated(batchId, newGeolocationId);
    }

    function getBatchDetails(uint256 batchId, uint256 productId) external view returns (
        BatchDetails memory batch,
        ProductPassport.ProductData memory product,
        ComplexManagement.Complex memory complex,
        Geolocation.GeoLocation memory currentLocation,
        Geolocation.GeoLocation memory originLocation
    ) {
        require(address(productPassport) != address(0), "Contracts not initialized");
        require(batches[batchId].amount > 0, "Batch does not exist");
        
        batch = batches[batchId];
        (product, ) = productPassport.getProductDetails(productId);
        complex = complexManagement.getComplex(product.complexId);
        currentLocation = geolocation.getGeolocation(batch.currentGeolocationId);
        originLocation = geolocation.getGeolocation(batch.originGeolocationId);
        
        return (batch, product, complex, currentLocation, originLocation);
    }

    // Token URI management
    function setTokenURI(uint256 batchId, string memory tokenURI) external onlyOwner {
        require(_exists(batchId), "Batch NFT does not exist");
        _setTokenURI(batchId, tokenURI);
    }
}