## Batch

### BatchDetails

```solidity
struct BatchDetails {
  uint256 amount;
  uint256 assemblingTime;
  string transportDetails;
}
```

### batches

```solidity
mapping(uint256 => struct Batch.BatchDetails) batches
```

### constructor

```solidity
constructor(address productPassportAddress, address initialOwner) public
```

### setBatchDetails

```solidity
function setBatchDetails(uint256 batchId, uint256 amount, uint256 assemblingTime, string transportDetails, string ipfsHash) public
```

### getBatchDetails

```solidity
function getBatchDetails(uint256 batchId) public view returns (struct Batch.BatchDetails)
```

