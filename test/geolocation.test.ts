import { expect } from "chai";
import { ethers } from "hardhat";
import { Ownership } from "../typechain-types";

describe("Geolocation", function () {
  async function deployGeolocationFixture() {
    const [owner, contributor, otherAccount] = await ethers.getSigners();

    const OwnershipFactory = await ethers.getContractFactory("Ownership");
    const ownership = (await OwnershipFactory.deploy()) as Ownership;

    await ownership.addContributor(contributor.address);

    return { ownership, owner, contributor, otherAccount };
  }

  describe("Geolocation Updates", function () {
    it("Should allow owner and contributors to update geolocations for multiple batches", async function () {
      const { ownership, owner, contributor } = await deployGeolocationFixture();

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
        await ownership.connect(owner).mintBatch(batch.amount, batch.batchId, batch.origin, batch.location);

        for (const geo of geolocations) {
          await ownership.connect(owner).addBatchGeolocation(batch.batchId, geo.latitude, geo.longitude, geo.info);
          const retrievedGeo = await ownership.getGeolocation(batch.batchId);
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
      const { ownership, owner } = await deployGeolocationFixture();

      const batchId = 1;
      const amount = 100;
      const origin = "Factory A";
      const location = "Location A";

      await ownership.connect(owner).mintBatch(amount, batchId, origin, location);

      const geolocations = [
        { latitude: "40.7128 N", longitude: "74.0060 W", info: "New York City" },
        { latitude: "34.0522 N", longitude: "118.2437 W", info: "Los Angeles" },
        { latitude: "51.5074 N", longitude: "0.1278 W", info: "London" }
      ];

      for (const geo of geolocations) {
        await ownership.connect(owner).addBatchGeolocation(batchId, geo.latitude, geo.longitude, geo.info);
        const retrievedGeo = await ownership.getGeolocation(batchId);
        expect(retrievedGeo.latitude).to.equal(geo.latitude);
        expect(retrievedGeo.longitude).to.equal(geo.longitude);
      }
    });
  });
});
