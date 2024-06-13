import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Ownership", function () {
  async function deployOwnershipFixture() {
    const [owner, otherAccount, contributor] = await ethers.getSigners();

    // Deploy ProductPassport contract
    const ProductPassport = await ethers.getContractFactory("ProductPassport");
    const productPassport = await ProductPassport.deploy();
    await productPassport.deployed();

    // Deploy Batch contract (inherits ProductPassport)
    const Batch = await ethers.getContractFactory("Batch");
    const batch = await Batch.deploy();
    await batch.deployed();

    // Add contributor to the Batch contract
    await batch.addContributor(contributor.address);

    return { ownership: batch, owner, otherAccount, contributor, productPassport, batch };
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
    it("Should allow owner and contributors to set batch details", async function () {
      const { ownership, owner, contributor } = await loadFixture(deployOwnershipFixture);

      const batchId = 1;
      const amount = 100;
      const assemblingTime = Math.floor(Date.now() / 1000);
      const transportDetails = "Transport A";
      const geolocation = "40.7128 N, 74.0060 W";

      // Product details
      const uid = "UID123";
      const gtin = "GTIN123";
      const taricCode = "TARIC123";
      const manufacturerInfo = "Manufacturer Info";
      const consumerInfo = "Consumer Info";
      const endOfLifeInfo = "End of Life Info";
      const description = "Product Description";
      const manuals = ["Manual 1", "Manual 2"];
      const specifications = ["Spec 1", "Spec 2"];

      // Set product details and data in ProductPassport contract
      await ownership.connect(owner).setProductDetails(batchId, uid, gtin, taricCode, manufacturerInfo, consumerInfo, endOfLifeInfo);
      await ownership.connect(owner).setProductData(batchId, description, manuals, specifications);

      // Set batch details
      await ownership.connect(owner).setBatchDetails(batchId, amount, assemblingTime, transportDetails, geolocation);

      let batchDetails = await ownership.getBatchDetails(batchId);
      expect(batchDetails.amount).to.equal(amount);
      expect(batchDetails.assemblingTime).to.equal(assemblingTime);
      expect(batchDetails.transportDetails).to.equal(transportDetails);
      expect(batchDetails.geolocation).to.equal(geolocation);

      // Verify product details
      let productDetails = await ownership.getProductDetails(batchId);
      expect(productDetails.uid).to.equal(uid);
      expect(productDetails.gtin).to.equal(gtin);
      expect(productDetails.taricCode).to.equal(taricCode);
      expect(productDetails.manufacturerInfo).to.equal(manufacturerInfo);
      expect(productDetails.consumerInfo).to.equal(consumerInfo);
      expect(productDetails.endOfLifeInfo).to.equal(endOfLifeInfo);

      // Verify product data
      let productData = await ownership.getProductData(batchId);
      expect(productData.description).to.equal(description);
      expect(productData.manuals).to.deep.equal(manuals);
      expect(productData.specifications).to.deep.equal(specifications);

      await ownership.connect(contributor).setBatchDetails(batchId + 1, amount, assemblingTime, transportDetails, geolocation);

      batchDetails = await ownership.getBatchDetails(batchId + 1);
      expect(batchDetails.amount).to.equal(amount);
      expect(batchDetails.assemblingTime).to.equal(assemblingTime);
      expect(batchDetails.transportDetails).to.equal(transportDetails);
      expect(batchDetails.geolocation).to.equal(geolocation);
    });

    it("Should prevent non-owners and non-contributors from setting batch details", async function () {
      const { ownership, otherAccount } = await loadFixture(deployOwnershipFixture);

      const batchId = 1;
      const amount = 100;
      const assemblingTime = Math.floor(Date.now() / 1000);
      const transportDetails = "Transport A";
      const geolocation = "40.7128 N, 74.0060 W";

      await expect(
        ownership.connect(otherAccount).setBatchDetails(batchId, amount, assemblingTime, transportDetails, geolocation)
      ).to.be.revertedWith("Not authorized");
    });
  });

  describe("Geolocation", function () {
    it("Should allow owner and contributors to add geolocation data", async function () {
      const { ownership, owner, contributor } = await loadFixture(deployOwnershipFixture);

      const batchId = 1;
      const geolocation = "40.7128 N, 74.0060 W";
      const transportDetails = "New York City";
      const amount = 100;
      const assemblingTime = Math.floor(Date.now() / 1000);

      await ownership.connect(owner).setBatchDetails(batchId, amount, assemblingTime, transportDetails, geolocation);
      let geo = await ownership.getBatchDetails(batchId);
      expect(geo.geolocation).to.equal(geolocation);

      await ownership.connect(contributor).setBatchDetails(batchId + 1, amount, assemblingTime, transportDetails, geolocation);
      geo = await ownership.getBatchDetails(batchId + 1);
      expect(geo.geolocation).to.equal(geolocation);
    });

    it("Should prevent non-owners and non-contributors from adding geolocation data", async function () {
      const { ownership, otherAccount } = await loadFixture(deployOwnershipFixture);

      const batchId = 1;
      const geolocation = "40.7128 N, 74.0060 W";
      const transportDetails = "New York City";
      const amount = 100;
      const assemblingTime = Math.floor(Date.now() / 1000);

      await expect(
        ownership.connect(otherAccount).setBatchDetails(batchId, amount, assemblingTime, transportDetails, geolocation)
      ).to.be.revertedWith("Not authorized");
    });
  });
});
