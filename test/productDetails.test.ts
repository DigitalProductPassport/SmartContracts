import { expect } from "chai";
require("hardhat");

describe("ProductDetails", function () {
  let ProductDetails;
  let productDetails;
  let owner;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    ProductDetails = await ethers.getContractFactory("ProductDetails");
    productDetails = await ProductDetails.deploy();
    await productDetails.waitForDeployment();
    await productDetails.authorizeEntity(owner.address);
  });

  it("Should set and retrieve product details correctly", async function () {
    const productId = 1;
    const uid = "UID-123";
    const gtin = "GTIN-456";
    const taricCode = "TARIC-789";
    const manufacturerInfo = "Manufacturer info";
    const consumerInfo = "Consumer info";
    const endOfLifeInfo = "End of life info";

    await productDetails.setProduct(productId, uid, gtin, taricCode, manufacturerInfo, consumerInfo, endOfLifeInfo);

    const product = await productDetails.getProduct(productId);

    expect(product.uid).to.equal(uid);
    expect(product.gtin).to.equal(gtin);
    expect(product.taricCode).to.equal(taricCode);
    expect(product.manufacturerInfo).to.equal(manufacturerInfo);
    expect(product.consumerInfo).to.equal(consumerInfo);
    expect(product.endOfLifeInfo).to.equal(endOfLifeInfo);
  });
});
