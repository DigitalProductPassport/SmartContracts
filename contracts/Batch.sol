// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/ownership/Ownable.sol";

import "./ProductPassport.sol";

contract Batch is ProductPassport {
    struct BatchDetails {
        uint256 amount;
        uint256 assemblingTime;
        string transportDetails;
        string geolocation;
    }

    mapping(uint256 => BatchDetails) public batches;

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
