import { expect } from "chai";
import { ethers } from "hardhat";
import type { ProductPassport, ComplexManagement, Geolocation } from "../types";

describe("ProductPassport", function () {
  let productPassport: ProductPassport;
  let complexManagement: ComplexManagement;
  let geolocation: Geolocation;
  let owner: any;
  let addr1: any;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    const GeolocationFactory = await ethers.getContractFactory("Geolocation");
    geolocation = await GeolocationFactory.deploy() as Geolocation;
    await geolocation.waitForDeployment();

  
    const ComplexManagementFactory = await ethers.getContractFactory("ComplexManagement");
    complexManagement = await ComplexManagementFactory.deploy(geolocation.getAddress()) as ComplexManagement;
    await complexManagement.waitForDeployment(); 

    const ProductPassportFactory = await ethers.getContractFactory("ProductPassport");
    productPassport = await ProductPassportFactory.deploy(complexManagement.getAddress()) as ProductPassport;
    await productPassport.waitForDeployment(); 

    await complexManagement.addComplex(
      "complex1",
      "Test Complex",
      "Test Country",
      "Test Address",
      "0",
      "0",
      "Factory",
      "Manufacturing"
    );
  });

  it("Should create and retrieve product data correctly", async function () {
    const productId = 1;
    const description = "Product description";
    const batchNumber = "Batch-001";
    const productionDate = "2023-01-01";
    const complexId = "complex1";

    await productPassport.createProduct(
      productId,
      description,
      batchNumber,
      productionDate,
      complexId
    );

    const [productData, complex] = await productPassport.getProductDetails(productId);

    expect(productData.description).to.equal(description);
    expect(productData.batchNumber).to.equal(batchNumber);
    expect(productData.productionDate).to.equal(productionDate);
    expect(productData.complexId).to.equal(complexId);
    expect(complex.complexId).to.equal(complexId);
  });

  it("Should allow anyone to create a product", async function () {
    const productId = 2;
    const description = "Product description";
    const batchNumber = "Batch-002";
    const productionDate = "2023-02-01";
    const complexId = "complex1";

    await productPassport.connect(addr1).createProduct(
      productId,
      description,
      batchNumber,
      productionDate,
      complexId
    );

    const [productData, _] = await productPassport.getProductDetails(productId);

    expect(productData.description).to.equal(description);
    expect(productData.batchNumber).to.equal(batchNumber);
    expect(productData.productionDate).to.equal(productionDate);
    expect(productData.complexId).to.equal(complexId);
  });

  it("Should fail to create a product with non-existent complex", async function () {
    const productId = 3;
    const description = "Product description";
    const batchNumber = "Batch-003";
    const productionDate = "2023-03-01";
    const nonExistentComplexId = "nonexistent";

    await expect(
      productPassport.createProduct(
        productId,
        description,
        batchNumber,
        productionDate,
        nonExistentComplexId
      )
    ).to.be.revertedWith("Complex does not exist");  
  });
});
