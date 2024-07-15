## ProductDetails

### Product

```solidity
struct Product {
  string uid;
  string gtin;
  string taricCode;
  string manufacturerInfo;
  string consumerInfo;
  string endOfLifeInfo;
}
```

### products

```solidity
mapping(uint256 => struct ProductDetails.Product) products
```

### authorizedEntities

```solidity
mapping(address => bool) authorizedEntities
```

### onlyAuthorized

```solidity
modifier onlyAuthorized()
```

### setProduct

```solidity
function setProduct(uint256 productId, string uid, string gtin, string taricCode, string manufacturerInfo, string consumerInfo, string endOfLifeInfo) public virtual
```

### getProduct

```solidity
function getProduct(uint256 productId) public view returns (struct ProductDetails.Product)
```

### authorizeEntity

```solidity
function authorizeEntity(address entity) public virtual
```

### revokeEntity

```solidity
function revokeEntity(address entity) public virtual
```

