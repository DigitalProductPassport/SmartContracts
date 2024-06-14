// productPassport.test.ts
import { expect } from "chai";
import { ethers } from "hardhat";

describe("ProductPassport", function () {
  let ProductPassport;
  let productPassport;

  beforeEach(async function () {
    ProductPassport = await ethers.getContractFactory("ProductPassport");
    productPassport = await ProductPassport.deploy();
    await productPassport.deployed();
  });

  it("Should set and retrieve product data correctly", async function () {
    const productId = 1;
    const description = "Product description";
    const manuals = ["Manual 1", "Manual 2"];
    const specifications = ["Spec 1", "Spec 2"];

    await productPassport.setProductData(productId, description, manuals, specifications);

    const productData = await productPassport.getProductData(productId);

    expect(productData.description).to.equal(description);
    expect(productData.manuals).to.eql(manuals);
    expect(productData.specifications).to.eql(specifications);
  });
});
