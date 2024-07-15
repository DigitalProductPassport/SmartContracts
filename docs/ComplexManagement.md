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

