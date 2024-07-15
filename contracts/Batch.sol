// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ProductPassport.sol";
import "./Geolocation.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Batch is ERC721URIStorage, Ownable, Geolocation {
    struct BatchDetails {
        uint256 amount;
        uint256 assemblingTime;
        string transportDetails;
    }

    mapping(uint256 => BatchDetails) public batches;
    ProductPassport private _productPassport;

    constructor(address productPassportAddress, address initialOwner) ERC721("Product Passport", "DDP") Ownable(initialOwner) {
        _productPassport = ProductPassport(productPassportAddress);
    }

    function setBatchDetails(
        uint256 batchId,
        uint256 amount,
        uint256 assemblingTime,
        string memory transportDetails,
        string memory ipfsHash
    ) public onlyOwner {
        batches[batchId] = BatchDetails(
            amount,
            assemblingTime,
            transportDetails
        );
        _mint(owner(), batchId);
        _setTokenURI(batchId, string(abi.encodePacked("ipfs://", ipfsHash)));
    }

    function getBatchDetails(uint256 batchId) public view returns (BatchDetails memory) {
        return batches[batchId];
    }
}
