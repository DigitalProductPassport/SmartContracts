// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ProductPassport.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Batch is Ownable {
    struct BatchDetails {
        uint256 amount;
        uint256 assemblingTime;
        string transportDetails;
        string geolocation;
    }

    mapping(uint256 => BatchDetails) public batches;
    ProductPassport private _productPassport;

    constructor(address productPassportAddress, address initialOwner) Ownable(initialOwner) {
        _productPassport = ProductPassport(productPassportAddress);
    }

    function setBatchDetails(
        uint256 batchId,
        uint256 amount,
        uint256 assemblingTime,
        string memory transportDetails,
        string memory geolocation
    ) public onlyOwner {
        batches[batchId] = BatchDetails(
            amount,
            assemblingTime,
            transportDetails,
            geolocation
        );
    }

    function getBatchDetails(uint256 batchId) public view returns (BatchDetails memory) {
        return batches[batchId];
    }
}
