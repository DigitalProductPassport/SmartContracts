import { expect } from "chai";
import { ethers } from "hardhat";

describe("Batch", function () {
  let Batch;
  let batch;
  let contractProductPassport;
  let productPassport;
  let owner;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    contractProductPassport = await ethers.getContractFactory("ProductPassport");
    productPassport = await contractProductPassport.deploy(owner.address);
    await productPassport.deployed();
    Batch = await ethers.getContractFactory("Batch");
    batch = await Batch.deploy(productPassport.address, owner.address);
    await batch.deployed();
  });

  it("Should set and retrieve batch details correctly", async function () {
    const batchId = 1;
    const amount = 100;
    const assemblingTime = 12345;
    const transportDetails = "Transport details";
    const ipfsHash = "QmTzQ1N1z5S7dF1uQn9F1Y1vN1uF1N1uF1uQn9TzQ1N1";

    await batch.setBatchDetails(batchId, amount, assemblingTime, transportDetails, ipfsHash);

    const batchDetails = await batch.getBatchDetails(batchId);
    const tokenURI = await batch.tokenURI(batchId);

    expect(batchDetails.amount).to.equal(amount);
    expect(batchDetails.assemblingTime).to.equal(assemblingTime);
    expect(batchDetails.transportDetails).to.equal(transportDetails);
    expect(tokenURI).to.equal(`ipfs://${ipfsHash}`);
  });
});
