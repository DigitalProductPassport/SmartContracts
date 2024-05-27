# ProductPassport Contract

## Overview
The `ProductPassport` contract is responsible for managing the digital product passport, which includes details about the product's lifecycle. This contract allows setting and retrieving product details.

## Contract Details
- **Contract Name**: ProductPassport
- **Primary Functions**:
  - `setProductDetails`: Sets the details of the product.
  - `getProductDetails`: Retrieves the details of the product.

## Functions

### setProductDetails
```solidity
function setProductDetails(string memory _details) public {
    // Function to set the details of the product.
}

function getProductDetails() public view returns (string memory) {
    // Function to get the details of the product.
}
```