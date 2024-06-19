import { expect } from "chai";
import { ethers } from "hardhat";

describe("Batch", function () {
  let Batch;
  let batch;
  let contractProductPassport;
  let productPassport;

  beforeEach(async function () {
    const [owner, addr1] = await ethers.getSigners();
    contractProductPassport = await ethers.getContractFactory("ProductPassport");
    productPassport = await contractProductPassport.deploy(owner.address);
    await productPassport.deployed()
    Batch = await ethers.getContractFactory("Batch");
    batch = await Batch.deploy(productPassport.address,owner.address);
    await batch.deployed();
  });

  it("Should set and retrieve batch details correctly", async function () {
    const batchId = 1;
    const amount = 100;
    const assemblingTime = 12345;
    const transportDetails = "Transport details";
    const latitude = "-79.4912";
    const longitude = "41.108097";
    const info = "wikidata_id: 'Q179325'";

    await batch.setBatchDetails(batchId, amount, assemblingTime, transportDetails);
    await batch.setGeolocation(batchId, latitude, longitude, info);

    const batchDetails = await batch.getBatchDetails(batchId);
    const batchGeolocation = await batch.getGeolocation(batchId);

    expect(batchDetails.amount).to.equal(amount);
    expect(batchDetails.assemblingTime).to.equal(assemblingTime);
    expect(batchDetails.transportDetails).to.equal(transportDetails);
    expect(batchGeolocation.latitude).to.equal(latitude);
    expect(batchGeolocation.longitude).to.equal(longitude);
    
  });
});
