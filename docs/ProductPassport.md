## ProductPassport

### ProductData

```solidity
struct ProductData {
  string description;
  string[] manuals;
  string[] specifications;
  string batchNumber;
  string productionDate;
  string expiryDate;
  string certifications;
  string warrantyInfo;
  string materialComposition;
  string complianceInfo;
}
```

### productData

```solidity
mapping(uint256 => struct ProductPassport.ProductData) productData
```

### onlyAuthorized

```solidity
modifier onlyAuthorized()
```

### constructor

```solidity
constructor(address initialOwner) public
```

### setProductData

```solidity
function setProductData(uint256 productId, string description, string[] manuals, string[] specifications, string batchNumber, string productionDate, string expiryDate, string certifications, string warrantyInfo, string materialComposition, string complianceInfo) public
```

### getProductData

```solidity
function getProductData(uint256 productId) public view returns (struct ProductPassport.ProductData)
```

### authorizeEntity

```solidity
function authorizeEntity(address entity) public
```

### revokeEntity

```solidity
function revokeEntity(address entity) public
```

