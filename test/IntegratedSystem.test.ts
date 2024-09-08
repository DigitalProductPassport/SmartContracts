import { expect } from "chai";
import { ethers } from "hardhat";
import type { ProductPassport, ComplexManagement, Geolocation, IntegratedProductPassportBatch } from "../types";

describe("Integrated System", function () {
  let productPassport: ProductPassport;
  let complexManagement: ComplexManagement;
  let geolocation: Geolocation;
  let integratedSystem: IntegratedProductPassportBatch;
  let owner: any;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();

  
    const GeolocationFactory = await ethers.getContractFactory("Geolocation");
    geolocation = await GeolocationFactory.deploy() as Geolocation;
    await geolocation.waitForDeployment();


    const ComplexManagementFactory = await ethers.getContractFactory("ComplexManagement");
    complexManagement = await ComplexManagementFactory.deploy(geolocation.getAddress()) as ComplexManagement;
    await complexManagement.waitForDeployment();


    const ProductPassportFactory = await ethers.getContractFactory("ProductPassport");
    productPassport = await ProductPassportFactory.deploy(complexManagement.getAddress()) as ProductPassport;
    await productPassport.waitForDeployment();


    const IntegratedProductPassportBatchFactory = await ethers.getContractFactory("IntegratedProductPassportBatch");
    integratedSystem = await IntegratedProductPassportBatchFactory.deploy(
      productPassport.getAddress(),
      complexManagement.getAddress(),
      geolocation.getAddress()
    ) as IntegratedProductPassportBatch;
    await integratedSystem.waitForDeployment();
  });

  it("Should create a complex, product, and batch, then retrieve all details", async function () {
    const complexId = "COMPLEX1";
    await complexManagement.addComplex(
      complexId,
      "Test Complex",
      "Test Country",
      "Test Address",
      "0",
      "0",
      "Factory",
      "Manufacturing"
    );


    const productId = 1;
    await productPassport.createProduct(
      productId,
      "Test Product",
      "BATCH001",
      "2023-05-01",
      complexId
    );

    const batchId = 1;
    await integratedSystem.createBatch(
      batchId,
      100,
      1683000000, // Unix timestamp for assembling time
      "Truck delivery",
      productId
    );


    const [batchDetails, productData, complex, geoLocation] = await integratedSystem.getBatchDetails(batchId, productId);

    expect(batchDetails.amount).to.equal(100);
    expect(batchDetails.assemblingTime).to.equal(1683000000);
    expect(batchDetails.transportDetails).to.equal("Truck delivery");
    expect(productData.description).to.equal("Test Product");
    expect(complex.complexName).to.equal("Test Complex");
    expect(geoLocation.latitude).to.equal("0");
    expect(geoLocation.longitude).to.equal("0");
  });
});
