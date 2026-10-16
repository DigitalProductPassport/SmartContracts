import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.create();

describe("ProductPassportEchidnaTest", function () {
  it("deploys and keeps its invariants after creating a product", async function () {
    const harness = await ethers.deployContract("ProductPassportEchidnaTest");

    await harness.testCreateProduct();

    expect(await harness.echidna_product_has_valid_complex()).to.equal(true);
    expect(await harness.echidna_product_has_geolocation()).to.equal(true);
  });
});
