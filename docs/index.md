# Solidity API

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

## Geolocation

### GeoLocation

```solidity
struct GeoLocation {
  string latitude;
  string longitude;
  string additionalInfo;
}
```

### geolocations

```solidity
mapping(string => struct Geolocation.GeoLocation) geolocations
```

### GeolocationAdded

```solidity
event GeolocationAdded(string id, string latitude, string longitude, string additionalInfo)
```

### setGeolocation

```solidity
function setGeolocation(string id, string latitude, string longitude, string additionalInfo) public
```

### getGeolocation

```solidity
function getGeolocation(string id) public view returns (struct Geolocation.GeoLocation)
```

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

## ComplexManagement

### Complex

```solidity
struct Complex {
  string complexId;
  string complexName;
  string complexCountry;
  string complexAddress;
  string complexSiteType;
  string complexIndustry;
  string latitude;
  string longitude;
}
```

### complexes

```solidity
mapping(string => struct ComplexManagement.Complex) complexes
```

### contributors

```solidity
mapping(address => bool) contributors
```

### ComplexAdded

```solidity
event ComplexAdded(string complexId, string complexName, string complexCountry, string complexAddress, string complexSiteType, string complexIndustry, string latitude, string longitude)
```

### constructor

```solidity
constructor(address _initialOwner) public
```

### addComplex

```solidity
function addComplex(string _complexId, string _complexName, string _complexCountry, string _complexAddress, string _latitude, string _longitude, string _complexSiteType, string _complexIndustry) external
```

### getComplex

```solidity
function getComplex(string _complexId) public view returns (struct ComplexManagement.Complex)
```

### onlyOwnerOrContributor

```solidity
modifier onlyOwnerOrContributor()
```

### addContributor

```solidity
function addContributor(address _contributor) external
```

### removeContributor

```solidity
function removeContributor(address _contributor) external
```

