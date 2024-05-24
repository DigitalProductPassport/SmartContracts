// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Owner.sol";
import "./Batch.sol";

contract Ownership is Ownable, Batch {
    mapping(address => bool) public contributors;

    event BatchMinted(uint256 amount, uint256 batchId);
    event ContributorAdded(address contributor);
    event ContributorRemoved(address contributor);

    modifier onlyContributor() {
        require(contributors[msg.sender] || msg.sender == owner(), "Not authorized");
        _;
    }

    function addContributor(address contributor) public onlyOwner {
        contributors[contributor] = true;
        emit ContributorAdded(contributor);
    }

    function removeContributor(address contributor) public onlyOwner {
        contributors[contributor] = false;
        emit ContributorRemoved(contributor);
    }

    function mintBatch(
        uint256 amount,
        uint256 batchId,
        string memory origin,
        string memory location
    ) public onlyContributor {
        setBatchDetails(batchId, amount, origin, location);
        emit BatchMinted(amount, batchId);
    }

    function setBatchAndData(
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
    ) public onlyContributor {
        setBatchData(batchId, uid, gtin, taricCode, manufacturerInfo, facilityInfo, consumerInfo, endOfLifeInfo, description, manuals, specifications);
    }
}
