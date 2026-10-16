import { expect } from "chai";
import { network } from "hardhat";
import {
  COMPLEX_ID,
  COMPLEX_LAT,
  COMPLEX_LON,
  MATERIAL,
  deploySystem,
  deploySystemWithProduct,
} from "./fixtures.js";

const { ethers, networkHelpers } = await network.create();

describe("ComplexManagement", function () {
  const withSystem = () => deploySystem(ethers);
  const withProduct = () => deploySystemWithProduct(ethers);

  it("adds a complex and stores its geolocation", async function () {
    const { complexManagement } = await networkHelpers.loadFixture(withProduct);

    const complex = await complexManagement.getComplex(COMPLEX_ID);
    expect(complex.complexName).to.equal("Vitoria Plant");
    expect(complex.complexCountry).to.equal("Brazil");

    const geo = await complexManagement.getComplexGeolocation(COMPLEX_ID);
    expect(geo.latitude).to.equal(COMPLEX_LAT);
    expect(geo.longitude).to.equal(COMPLEX_LON);
  });

  it("rejects duplicate complex ids", async function () {
    const { complexManagement } = await networkHelpers.loadFixture(withProduct);

    await expect(
      complexManagement.addComplex(COMPLEX_ID, "X", "X", "X", "GEO-X", "X", "X", "1", "1", ""),
    ).to.be.revertedWith("Complex ID already exists");
  });

  it("updates and removes a complex", async function () {
    const { complexManagement } = await networkHelpers.loadFixture(withProduct);

    await complexManagement.updateComplex(COMPLEX_ID, "Renamed", "Brazil", "New address", "Factory", "Food");
    expect((await complexManagement.getComplex(COMPLEX_ID)).complexName).to.equal("Renamed");

    await expect(complexManagement.removeComplex(COMPLEX_ID))
      .to.emit(complexManagement, "ComplexRemoved")
      .withArgs(COMPLEX_ID);
    expect(await complexManagement.complexExists(COMPLEX_ID)).to.equal(false);
  });

  it("requires the geolocation contract to be set", async function () {
    const [owner] = await ethers.getSigners();
    const complexManagement = await ethers.deployContract("ComplexManagement", [owner.address]);

    await expect(
      complexManagement.addComplex("C", "X", "X", "X", "G", "X", "X", "1", "1", ""),
    ).to.be.revertedWith("Geolocation contract not set");
  });

  it("only allows the owner to add complexes", async function () {
    const { complexManagement, other } = await networkHelpers.loadFixture(withSystem);

    await expect(
      complexManagement.connect(other).addComplex("C", "X", "X", "X", "G", "X", "X", "1", "1", ""),
    ).to.be.revertedWithCustomError(complexManagement, "OwnableUnauthorizedAccount");
  });
});

describe("ProductPassport", function () {
  const withSystem = () => deploySystem(ethers);
  const withProduct = () => deploySystemWithProduct(ethers);

  it("creates a product and returns it with its origin geolocation", async function () {
    const { productPassport } = await networkHelpers.loadFixture(withProduct);

    expect(await productPassport.productExists(1)).to.equal(true);

    const [product, origin] = await productPassport.getProductDetails(1);
    expect(product.description).to.equal("Brigadeiro");
    expect(product.manuals).to.deep.equal(["QmManualHash"]);
    expect(product.specifications).to.deep.equal(["QmSpecHash"]);
    expect(product.batchNumber).to.equal("BRG-2026-001");
    expect(product.materialComposition).to.deep.equal([MATERIAL]);
    expect(product.complexId).to.equal(COMPLEX_ID);
    expect(origin.latitude).to.equal(COMPLEX_LAT);
    expect(origin.longitude).to.equal(COMPLEX_LON);
  });

  it("emits ProductCreated", async function () {
    const { productPassport } = await networkHelpers.loadFixture(withProduct);

    await expect(
      productPassport.createProduct(2, "Second", [], [], "B2", "", "", "", "", [MATERIAL], COMPLEX_ID),
    )
      .to.emit(productPassport, "ProductCreated")
      .withArgs(2, "Second", "B2", COMPLEX_ID);
  });

  it("rejects a product with a non-existent complex", async function () {
    const { productPassport } = await networkHelpers.loadFixture(withSystem);

    await expect(
      productPassport.createProduct(1, "P", [], [], "B", "", "", "", "", [MATERIAL], "missing"),
    ).to.be.revertedWith("Complex does not exist");
  });

  it("rejects a duplicate product id", async function () {
    const { productPassport } = await networkHelpers.loadFixture(withProduct);

    await expect(
      productPassport.createProduct(1, "P", [], [], "B", "", "", "", "", [MATERIAL], COMPLEX_ID),
    ).to.be.revertedWith("Product ID already exists");
  });

  it("updates and removes a product", async function () {
    const { productPassport } = await networkHelpers.loadFixture(withProduct);

    await productPassport.updateProduct(1, "Updated", [], [], "B9", "", "", "", "", [MATERIAL]);
    const [product] = await productPassport.getProductDetails(1);
    expect(product.description).to.equal("Updated");
    expect(product.complexId).to.equal(COMPLEX_ID);

    await expect(productPassport.removeProduct(1)).to.emit(productPassport, "ProductRemoved").withArgs(1);
    expect(await productPassport.productExists(1)).to.equal(false);
  });

  it("only allows the owner to create products", async function () {
    const { productPassport, other } = await networkHelpers.loadFixture(withProduct);

    await expect(
      productPassport
        .connect(other)
        .createProduct(2, "P", [], [], "B", "", "", "", "", [MATERIAL], COMPLEX_ID),
    ).to.be.revertedWithCustomError(productPassport, "OwnableUnauthorizedAccount");
  });
});
