// test/geolocation.test.ts

import { expect } from "chai";
import { ethers, network } from "hardhat";
import { Ownership } from "../typechain-types";

describe("Geolocation", function () {
  async function deployGeolocationFixture() {
    await network.provider.request({ method: "hardhat_reset", params: [] }); // Ensure the Hardhat network is reset and initialized

    const [_, wallet, contributor, otherAccount] = await ethers.getSigners();

    const OwnershipFactory = await ethers.getContractFactory("Ownership", wallet);
    const ownership = (await OwnershipFactory.deploy()) as Ownership;

    await ownership.addContributor(contributor.address);

    return { ownership, wallet, contributor, otherAccount };
  }

  describe("Geolocation Updates", function () {
    it("Should allow owner and contributors to update geolocations for multiple batches", async function () {
      const { ownership, wallet, contributor } = await deployGeolocationFixture();

      const batches = [
        { batchId: 1, amount: 100, origin: "Factory A", location: "Location A" },
        { batchId: 2, amount: 200, origin: "Factory B", location: "Location B" }
      ];

      const geolocations = [
        { latitude: "40.7128 N", longitude: "74.0060 W", info: "New York City" },
        { latitude: "34.0522 N", longitude: "118.2437 W", info: "Los Angeles" },
        { latitude: "51.5074 N", longitude: "0.1278 W", info: "London" }
      ];

      for (const batch of batches) {
        await ownership.connect(wallet).mintBatch(batch.amount, batch.batchId, batch.origin, batch.location);
        await ownership.connect(contributor).mintBatch(batch.amount, batch.batchId, batch.origin, batch.location);

        for (const geo of geolocations) {
          await ownership.connect(wallet).addBatchGeolocation(batch.batchId, geo.latitude, geo.longitude, geo.info);
          let retrievedGeo = await ownership.getGeolocation(batch.batchId);
          expect(retrievedGeo.latitude).to.equal(geo.latitude);
          expect(retrievedGeo.longitude).to.equal(geo.longitude);

          await ownership.connect(contributor).addBatchGeolocation(batch.batchId, geo.latitude, geo.longitude, geo.info);
          retrievedGeo = await ownership.getGeolocation(batch.batchId);
          expect(retrievedGeo.latitude).to.equal(geo.latitude);
          expect(retrievedGeo.longitude).to.equal(geo.longitude);
        }
      }
    });

    it("Should prevent non-owners and non-contributors from updating geolocations", async function () {
      const { ownership, otherAccount } = await deployGeolocationFixture();

      const batchId = 1;
      const latitude = "40.7128 N";
      const longitude = "74.0060 W";
      const additionalInfo = "New York City";

      await expect(
        ownership.connect(otherAccount).addBatchGeolocation(batchId, latitude, longitude, additionalInfo)
      ).to.be.revertedWith("Not authorized");
    });

    it("Should allow multiple geolocation updates for the same batch", async function () {
      const { ownership, wallet, contributor } = await deployGeolocationFixture();

      const batchId = 1;
      const amount = 100;
      const origin = "Factory A";
      const location = "Location A";

      await ownership.connect(wallet).mintBatch(amount, batchId, origin, location);
      await ownership.connect(contributor).mintBatch(amount, batchId, origin, location);

      const geolocations = [
        { latitude: "40.7128 N", longitude: "74.0060 W", info: "New York City" },
        { latitude: "34.0522 N", longitude: "118.2437 W", info: "Los Angeles" },
        { latitude: "51.5074 N", longitude: "0.1278 W", info: "London" }
      ];

      for (const geo of geolocations) {
        await ownership.connect(wallet).addBatchGeolocation(batchId, geo.latitude, geo.longitude, geo.info);
        let retrievedGeo = await ownership.getGeolocation(batchId);
        expect(retrievedGeo.latitude).to.equal(geo.latitude);
        expect(retrievedGeo.longitude).to.equal(geo.longitude);

        await ownership.connect(contributor).addBatchGeolocation(batchId, geo.latitude, geo.longitude, geo.info);
        retrievedGeo = await ownership.getGeolocation(batchId);
        expect(retrievedGeo.latitude).to.equal(geo.latitude);
        expect(retrievedGeo.longitude).to.equal(geo.longitude);
      }
    });
  });
});
