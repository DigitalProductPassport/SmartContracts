import { expect } from "chai";
import { network } from "hardhat";
import { COMPLEX_GEO_ID, COMPLEX_LAT, deploySystemWithProduct } from "./fixtures.js";

const { ethers, networkHelpers } = await network.create();

describe("IntegratedProductPassportBatch", function () {
  const withProduct = () => deploySystemWithProduct(ethers);

  async function withBatch() {
    const system = await deploySystemWithProduct(ethers);
    await system.batch.createBatch(1, 100, 1_683_000_000, "Truck delivery", 1);
    return system;
  }

  it("creates a batch, mints its NFT and returns all details", async function () {
    const { batch, owner } = await networkHelpers.loadFixture(withProduct);

    await expect(batch.createBatch(1, 100, 1_683_000_000, "Truck delivery", 1))
      .to.emit(batch, "BatchCreated")
      .withArgs(1, 100, 1);

    expect(await batch.ownerOf(1)).to.equal(owner.address);
    expect(await batch.name()).to.equal("DigitalProductPassport");
    expect(await batch.symbol()).to.equal("DPP");

    const [details, product, complex, current, origin] = await batch.getBatchDetails(1, 1);
    expect(details.amount).to.equal(100n);
    expect(details.assemblingTime).to.equal(1_683_000_000n);
    expect(details.transportDetails).to.equal("Truck delivery");
    expect(details.originGeolocationId).to.equal(COMPLEX_GEO_ID);
    expect(details.currentGeolocationId).to.equal(COMPLEX_GEO_ID);
    expect(product.description).to.equal("Brigadeiro");
    expect(complex.complexName).to.equal("Vitoria Plant");
    expect(current.latitude).to.equal(COMPLEX_LAT);
    expect(origin.latitude).to.equal(COMPLEX_LAT);
  });

  it("rejects batches for unknown products and duplicate ids", async function () {
    const { batch } = await networkHelpers.loadFixture(withBatch);

    await expect(batch.createBatch(2, 10, 0, "", 99)).to.be.revertedWith("Product does not exist");
    await expect(batch.createBatch(1, 10, 0, "", 1)).to.be.revertedWith("Batch ID already exists");
  });

  it("requires contracts to be initialized", async function () {
    const [owner] = await ethers.getSigners();
    const batch = await ethers.deployContract("IntegratedProductPassportBatch", [owner.address]);

    await expect(batch.createBatch(1, 10, 0, "", 1)).to.be.revertedWith("Contracts not initialized");
  });

  it("moves a batch to an existing geolocation", async function () {
    const { batch, complexManagement } = await networkHelpers.loadFixture(withBatch);

    await complexManagement.addComplex(
      "WAREHOUSE-1",
      "Sao Paulo Warehouse",
      "Brazil",
      "Rua Logistica, 5",
      "GEO-WAREHOUSE-1",
      "Warehouse",
      "Logistics",
      "-23.5505",
      "-46.6333",
      "Distribution center",
    );

    await expect(batch.updateBatchLocation(1, "GEO-WAREHOUSE-1", "", "", ""))
      .to.emit(batch, "BatchLocationUpdated")
      .withArgs(1, "GEO-WAREHOUSE-1");

    const [details, , , current, origin] = await batch.getBatchDetails(1, 1);
    expect(details.currentGeolocationId).to.equal("GEO-WAREHOUSE-1");
    expect(current.latitude).to.equal("-23.5505");
    expect(origin.latitude).to.equal(COMPLEX_LAT);
  });

  it("sets the token URI of a batch", async function () {
    const { batch } = await networkHelpers.loadFixture(withBatch);

    await batch.setTokenURI(1, "ipfs://QmBatchMetadata");
    expect(await batch.tokenURI(1)).to.equal("ipfs://QmBatchMetadata");

    await expect(batch.setTokenURI(2, "ipfs://x")).to.be.revertedWith("Batch NFT does not exist");
  });

  it("only allows the owner to create batches", async function () {
    const { batch, other } = await networkHelpers.loadFixture(withProduct);

    await expect(batch.connect(other).createBatch(1, 10, 0, "", 1)).to.be.revertedWithCustomError(
      batch,
      "OwnableUnauthorizedAccount",
    );
  });
});
