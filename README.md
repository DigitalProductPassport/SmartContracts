I understand. Let's correct the Pinata integration section to reflect the proper usage of a JSON configuration file, including how to pin files listed in the JSON file.

Here's the updated README:

---

# Digital Product Passport SDK

## Introduction

Welcome to the Digital Product Passport SDK repository! This project provides a JavaScript/TypeScript SDK for interacting with Digital Product Passport (DPP) smart contracts deployed on the Ethereum blockchain.

## What is a Digital Product Passport?

A Digital Product Passport (DPP) is a comprehensive digital record that tracks a product's journey from design to disposal. It consolidates data related to material sourcing, manufacturing, and lifecycle events, providing valuable information to manufacturers, consumers, and repair services.

Instead of a physical document, the DPP is represented digitally and can be accessed through various means such as NFC chips, QR codes, or RFID tags. The DPP provides transparency and traceability throughout the product's lifecycle.

## SDK Overview

The Digital Product Passport SDK facilitates interactions with the DPP smart contracts. It provides methods for deploying contracts, setting and retrieving product details, and integrating with Pinata for storing and retrieving product-related files.

### Features

- **Batch Management**: Deploy and interact with Batch contracts for managing product batches.
- **Product Passport Management**: Deploy and interact with Product Passport contracts for managing product details.
- **Pinata Integration**: Upload and manage product-related files on IPFS via Pinata.

### Key Components

- **Batch**: Interact with Batch smart contracts, deploy new instances, and manage batch details.
- **ProductPassport**: Interact with Product Passport smart contracts to set and retrieve product details.
- **Pinata Utility**: Upload JSON data and files to IPFS via Pinata.

## Installation

To install the SDK, use npm:

```bash
npm install @digitalproductpassport/sdk
```

## Usage

### Initial Setup

Before using the SDK, configure your environment by setting up your Ethereum provider and private key.

### Example: Using the Batch Component

```typescript
import { ethers } from 'ethers';
import { Batch } from '@digitalproductpassport/sdk';

const provider = new ethers.JsonRpcProvider('YOUR_PROVIDER_URL');
const privateKey = 'YOUR_PRIVATE_KEY';
const gweiBid = 20;

const batch = new Batch(provider, privateKey, gweiBid);

(async () => {
  const contractAddress = await batch.deployBatch();
  console.log(`Batch contract deployed at: ${contractAddress}`);

  await batch.setBatch('batchId', {
    productIds: ['product1', 'product2'],
    productionDate: '2023-01-01',
    expiryDate: '2024-01-01',
    location: 'Factory Location'
  });

  const batchDetails = await batch.getBatch('batchId');
  console.log(`Batch details: ${JSON.stringify(batchDetails)}`);
})();
```

### Example: Using the ProductPassport Component

```typescript
import { ethers } from 'ethers';
import { ProductPassport } from '@digitalproductpassport/sdk';

const provider = new ethers.JsonRpcProvider('YOUR_PROVIDER_URL');
const privateKey = 'YOUR_PRIVATE_KEY';
const gweiBid = 20;

const productPassport = new ProductPassport(provider, privateKey, gweiBid);

(async () => {
  const passportAddress = await productPassport.deploy();
  console.log(`Product Passport contract deployed at: ${passportAddress}`);

  await productPassport.setProductPassport({
    productId: 'product123',
    description: 'Product Description',
    manuals: ['manual1.pdf', 'manual2.pdf'],
    specifications: ['spec1.pdf', 'spec2.pdf'],
    batchNumber: 'batch001',
    productionDate: '2023-01-01',
    expiryDate: '2024-01-01',
    certifications: 'Certifications Info',
    warrantyInfo: 'Warranty Info',
    materialComposition: 'Material Composition',
    complianceInfo: 'Compliance Info',
    ipfs: 'QmTestHash'
  });

  const productDetails = await productPassport.getProductPassport('product123');
  console.log(`Product Passport details: ${JSON.stringify(productDetails)}`);
})();
```

### Example: Pinata Integration with JSON Configuration

Create a JSON configuration file, `config.json`, with the following structure:

```json
{
  "manuals": ["path/to/manual1.pdf", "path/to/manual2.pdf"],
  "specifications": ["path/to/spec1.pdf", "path/to/spec2.pdf"],
  "otherField": "someValue"
}
```

Use the Pinata utility to upload the files listed in the configuration file and get back the IPFS CIDs:

```typescript
import { uploadFilesFromConfig } from '@digitalproductpassport/sdk';

const configPath = 'path/to/config.json';

(async () => {
  try {
    const pinnedData = await uploadFilesFromConfig(configPath);
    console.log('Pinned data:', pinnedData);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();
```

## Running Tests

To run the tests for the SDK, use:

```bash
npm test
```

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Make your changes in a new branch.
3. Submit a pull request with a description of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to adjust the code examples, file paths, and other details to better fit your project structure and requirements.