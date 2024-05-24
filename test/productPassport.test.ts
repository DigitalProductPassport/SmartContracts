import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Ownership", function () {
  async function deployOwnershipFixture() {
    const [owner, otherAccount, contributor] = await ethers.getSigners();

    const Ownership = await ethers.getContractFactory("Ownership");
    const ownership = await Ownership.deploy();

    await ownership.addContributor(contributor.address);

    return { ownership, owner, otherAccount, contributor };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { ownership, owner } = await loadFixture(deployOwnershipFixture);
      expect(await ownership.owner()).to.equal(owner.address);
    });
  });

  describe("Contributors", function () {
    it("Should add and remove contributors correctly", async function () {
      const { ownership, contributor, owner } = await loadFixture(deployOwnershipFixture);

      await ownership.addContributor(contributor.address);
      expect(await ownership.contributors(contributor.address)).to.be.true;

      await ownership.removeContributor(contributor.address);
      expect(await ownership.contributors(contributor.address)).to.be.false;
    });
  });

  describe("Batch Minting", function () {
    it("Should allow owner and contributors to mint batches", async function () {
      const { ownership, owner, contributor } = await loadFixture(deployOwnershipFixture);

      const batchId = 1;
      const amount = 100;
      const origin = "Factory A";
      const location = "Location A";
      const uid = "UID123";
      const gtin = "GTIN123";
      const taricCode = "TARIC123";
      const manufacturerInfo = "Manufacturer Info";
      const facilityInfo = "Facility Info";
      const description = "Product Description";
      const manuals = ["Manual 1", "Manual 2"];
      const specifications = ["Spec 1", "Spec 2"];
      const consumerInfo = "Consumer Info";
      const endOfLifeInfo = "End of Life Info";

      await ownership.connect(owner).mintBatch(amount, batchId, origin, location);

      await ownership.connect(owner).setBatchAndData(
        batchId,
        uid,
        gtin,
        taricCode,
        manufacturerInfo,
        facilityInfo,
        consumerInfo,
        endOfLifeInfo,
        description,
        manuals,
        specifications
      );

      expect((await ownership.getBatchDetails(batchId)).amount).to.equal(amount);

      await ownership.connect(contributor).mintBatch(amount, batchId + 1, origin, location);

      await ownership.connect(contributor).setBatchAndData(
        batchId + 1,
        uid,
        gtin,
        taricCode,
        manufacturerInfo,
        facilityInfo,
        consumerInfo,
        endOfLifeInfo,
        description,
        manuals,
        specifications
      );

      expect((await ownership.getBatchDetails(batchId + 1)).amount).to.equal(amount);
    });

    it("Should prevent non-owners and non-contributors from minting batches", async function () {
      const { ownership, otherAccount } = await loadFixture(deployOwnershipFixture);

      const batchId = 1;
      const amount = 100;
      const origin = "Factory A";
      const location = "Location A";
      const uid = "UID123";
      const gtin = "GTIN123";
      const taricCode = "TARIC123";
      const manufacturerInfo = "Manufacturer Info";
      const facilityInfo = "Facility Info";
      const description = "Product Description";
      const manuals = ["Manual 1", "Manual 2"];
      const specifications = ["Spec 1", "Spec 2"];
      const consumerInfo = "Consumer Info";
      const endOfLifeInfo = "End of Life Info";

      await expect(
        ownership.connect(otherAccount).mintBatch(amount, batchId, origin, location)
      ).to.be.revertedWith("Not authorized");

      await expect(
        ownership.connect(otherAccount).setBatchAndData(
          batchId,
          uid,
          gtin,
          taricCode,
          manufacturerInfo,
          facilityInfo,
          consumerInfo,
          endOfLifeInfo,
          description,
          manuals,
          specifications
        )
      ).to.be.revertedWith("Not authorized");
    });
  });

  describe("Geolocation", function () {
    it("Should allow owner and contributors to add geolocation data", async function () {
      const { ownership, owner, contributor } = await loadFixture(deployOwnershipFixture);

      const batchId = 1;
      const latitude = "40.7128 N";
      const longitude = "74.0060 W";
      const additionalInfo = "New York City";

      await ownership.connect(owner).addBatchGeolocation(batchId, latitude, longitude, additionalInfo);
      let geo = await ownership.getGeolocation(batchId);
      expect(geo.latitude).to.equal(latitude);
      expect(geo.longitude).to.equal(longitude);

      await ownership.connect(contributor).addBatchGeolocation(batchId + 1, latitude, longitude, additionalInfo);
      geo = await ownership.getGeolocation(batchId + 1);
      expect(geo.latitude).to.equal(latitude);
      expect(geo.longitude).to.equal(longitude);
    });

    it("Should prevent non-owners and non-contributors from adding geolocation data", async function () {
      const { ownership, otherAccount } = await loadFixture(deployOwnershipFixture);

      const batchId = 1;
      const latitude = "40.7128 N";
      const longitude = "74.0060 W";
      const additionalInfo = "New York City";

      await expect(
        ownership.connect(otherAccount).addBatchGeolocation(batchId, latitude, longitude, additionalInfo)
      ).to.be.revertedWith("Not authorized");
    });
  });
});
