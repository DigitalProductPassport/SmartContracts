// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ProductPassport.sol";

contract Batch is ProductPassport {
    struct BatchDetails {
        uint256 amount;
        string origin;
        string location;
    }

    mapping(uint256 => BatchDetails) public batches;

    function setBatchDetails(
        uint256 batchId,
        uint256 amount,
        string memory origin,
        string memory location
    ) internal {
        batches[batchId] = BatchDetails(amount, origin, location);
    }

    function setBatchData(
        uint256 batchId,
        string memory uid,
        string memory gtin,
        string memory taricCode,
        string memory manufacturerInfo,
        string memory facilityInfo,
        string memory consumerInfo,
        string memory endOfLifeInfo,
        string memory description,
        string[] memory manuals,
        string[] memory specifications
    ) public {
        setProductDetails(batchId, uid, gtin, taricCode, manufacturerInfo, facilityInfo, consumerInfo, endOfLifeInfo);
        setProductData(batchId, description, manuals, specifications);
    }

    function getBatchDetails(uint256 batchId) public view returns (BatchDetails memory) {
        return batches[batchId];
    }
}
