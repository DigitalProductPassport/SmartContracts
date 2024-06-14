// batch.test.ts
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Batch", function () {
  let Batch;
  let batch;

  beforeEach(async function () {
    Batch = await ethers.getContractFactory("Batch");
    batch = await Batch.deploy(ethers.constants.AddressZero); // AddressZero or any other required initial parameter
    await batch.deployed();
  });

  it("Should set and retrieve batch details correctly", async function () {
    const batchId = 1;
    const amount = 100;
    const assemblingTime = 12345;
    const transportDetails = "Transport details";
    const geolocation = "Location A";

    await batch.setBatchDetails(batchId, amount, assemblingTime, transportDetails, geolocation);

    const batchDetails = await batch.getBatchDetails(batchId);

    expect(batchDetails.amount).to.equal(amount);
    expect(batchDetails.assemblingTime).to.equal(assemblingTime);
    expect(batchDetails.transportDetails).to.equal(transportDetails);
    expect(batchDetails.geolocation).to.equal(geolocation);
  });
});
