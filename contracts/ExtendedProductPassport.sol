// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
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
        Geolocation GeolocationId;
        Geolocation originGeolocationId;
    }

    mapping(uint256 => BatchDetails) public batches;

    constructor() ERC721("DigitalProductPassport", "DPP") Ownable(msg.sender) {
    }

    function createBatch(
        uint256 batchId,
        uint256 amount,
        uint256 assemblingTime,
        string memory transportDetails,
        uint256 productId
    ) external onlyOwner {
        (ProductPassport.ProductData memory product, ) = productPassport.getProductDetails(productId);
        require(bytes(product.complexId).length != 0, "Product must be associated with a complex");
        
        ComplexManagement.Complex memory complex = complexManagement.getComplex(product.complexId);

        string memory  originGeolocationId = complex.geolocationId;
        string  memory geolocationId = originGeolocationId;
        
        batches[batchId] = BatchDetails(amount, assemblingTime, transportDetails, originGeolocationId, geolocationId);
    }

    function getBatchDetails(uint256 batchId, uint256 productId) external view returns (
        BatchDetails memory,
        ProductPassport.ProductData memory,
        ComplexManagement.Complex memory,
        Geolocation memory
    ) {
        BatchDetails memory batch = batches[batchId];
        (ProductPassport.ProductData memory product, ComplexManagement.Complex memory complex) = productPassport.getProductDetails(productId);
        Geolocation memory geoLocation = geolocation.getGeolocation(batch.GeolocationId);
        Geolocation memory origin = geolocation.getGeolocation(batch.originGeolocationId);
        return (batch, product, complex, geoLocation, origin);
    }
}
