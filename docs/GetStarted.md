# Digital Product Passport Smart Contracts

## Introduction

Welcome to the Digital Product Passport Smart Contracts repository! This project implements Ethereum smart contracts for managing ownership and data related to digital product passports. These passports are intended to track and store comprehensive data about products throughout their lifecycle, leveraging blockchain technology for transparency and security.

### What is a Digital Product Passport?

The digital product passport serves as a digital record that accompanies a product from its inception through to disposal. It consolidates data about materials used, sourcing locations, manufacturing details, sales history, repairs, and more. This information is crucial for ensuring transparency, traceability, and sustainability across the product's lifecycle.

## Installation and Dependencies

To get started with the Digital Product Passport Smart Contracts, follow these steps:

1. **Install Node.js and npm**: Ensure Node.js (which includes npm) is installed on your machine. Visit [nodejs.org](https://nodejs.org/) for instructions.

2. **Initialize your project**: If you haven't already initialized your project with npm, do so by running:
   ```bash
   npm init -y
   ```

3. **Install the Smart Contracts Package**: Install the Digital Product Passport Smart Contracts package from npm:
   ```bash
   npm install @digitalproductpassport/smartcontracts
   ```

## Smart Contracts Overview

### ProductPassport

The `ProductPassport` contract manages product-specific data including descriptions, manuals, specifications, batch information, certifications, and compliance details.

#### ProductData Struct

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

#### Functions

- `constructor(address initialOwner)`: Initializes the contract with an initial owner.
- `setProductData(...)`: Sets detailed data for a specific product.
- `getProductData(...)`: Retrieves the data of a product by its ID.
- `authorizeEntity(...)`, `revokeEntity(...)`: Manages entity authorization to update product data.

### Batch

The `Batch` contract manages batches of products, storing details such as amount, assembling time, transport details, and IPFS hashes.

#### BatchDetails Struct

```solidity
struct BatchDetails {
  uint256 amount;
  uint256 assemblingTime;
  string transportDetails;
}
```

#### Functions

- `constructor(address productPassportAddress, address initialOwner)`: Initializes the contract with a link to the `ProductPassport` contract and an initial owner.
- `setBatchDetails(...)`: Sets details for a specific batch.
- `getBatchDetails(...)`: Retrieves details of a batch by its ID.
- `tokenURI(...)`: Returns the URI for a specific batch's metadata.

### Geolocation

The `Geolocation` contract manages geographic locations associated with products or production facilities.

#### GeoLocation Struct

```solidity
struct GeoLocation {
  string latitude;
  string longitude;
  string additionalInfo;
}
```

#### Functions

- `setGeolocation(...)`: Sets geolocation data for a specific ID.
- `getGeolocation(...)`: Retrieves geolocation data by its ID.

### ComplexManagement

The `ComplexManagement` contract manages complex facilities or sites related to product manufacturing or processing.

#### Complex Struct

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

#### Functions

- `addComplex(...)`: Adds a new complex facility with detailed information.
- `getComplex(...)`: Retrieves details of a complex by its ID.
- `addContributor(...)`, `removeContributor(...)`: Manages contributors who can update complex data.

## Getting Started

Now that you have installed the necessary packages and reviewed the smart contracts, you can begin deploying and interacting with the Digital Product Passport smart contracts in your Ethereum development environment.

### Example Deployment Script

Here's a basic example of deploying and interacting with the smart contracts using Hardhat:

```javascript
const fs = require('fs');
const hre = require('hardhat');

async function main() {
  const productData = JSON.parse(fs.readFileSync('./productData.json', 'utf8'));
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const ProductPassport = await hre.ethers.getContractFactory("ProductPassport");
  const productPassport = await ProductPassport.deploy(deployer.address);
  await productPassport.deployed();

  console.log("ProductPassport deployed to:", productPassport.address);

  // Set product data
  const {
    productId,
    description,
    manuals,
    specifications,
    batchNumber,
    productionDate,
    expiryDate,
    certifications,
    warrantyInfo,
    materialComposition,
    complianceInfo,
    ipfs
  } = productData;

  await productPassport.setProductData(
    productId,
    description,
    manuals,
    specifications,
    batchNumber,
    productionDate,
    expiryDate,
    certifications,
    warrantyInfo,
    materialComposition,
    complianceInfo
  );

  console.log("Product data set in ProductPassport contract.");

  // Additional deployment steps
  // ...

  console.log("Deployment completed.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

### Running Tests

Ensure you have configured your Ethereum development environment with Hardhat or similar, and then run tests to verify contract functionalities:

```bash
npx hardhat test
```

## Conclusion

You have now set up and explored the Digital Product Passport Smart Contracts repository. Start integrating these contracts into your applications to manage and track product data securely on the Ethereum blockchain.
