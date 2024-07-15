# Digital Product Passport Smart Contracts

## Introduction

Welcome to the Digital Product Passport Smart Contracts repository! This project aims to implement smart contracts for managing ownership and data related to digital product passports on the Ethereum blockchain.

## What is a Digital Product Passport?

Like its travel-friendly namesake, the digital product passport will become a necessary document that accompanies a product on its journey, consolidating data from material sourcing and extraction all the way through to end-of-life recycling. However, instead of a paper booklet, the DPP will be permanently affixed to each product in the form of an NFC chip, QR code, or RFID tag.

The data collection starts at a product’s design phase, documenting the materials it contains, where they were sourced, and where the product was assembled. From that point on, the DPP is continuously updated, showing when and where the product was sold, if it has been repaired, or if any parts were replaced, for example.

Over the course of its lifetime, anyone who interacts with the product – including manufacturers, shoppers, and repair staff – can scan the DPP to instantly reveal all this underlying product information.

## Smart Contracts

This repository contains Ethereum smart contracts that facilitate ownership management and data storage for digital product passports.

### Ownership Contract

The Ownership contract manages ownership of digital product passports. It allows the owner to add and remove contributors who can perform specific actions on the passport. 

This contract is inspired by OpenZeppelin's Ownable.sol contract and aims to modify it for the specific authorization use cases of digital product passports.

### ProductPassport Contract

The ProductPassport contract stores details and data related to digital product passports. It allows setting and retrieving product details and associated data.

## Test Cases

The `test` directory contains test cases written in Solidity for the smart contracts. These test cases ensure the correctness and functionality of the contracts.

## Getting Started

To get started with this project, follow these steps:

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Run tests using `npm test`.

## Contributing

Contributions are welcome! Please fork this repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
