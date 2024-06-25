import { expect } from "chai";
import { ethers } from "hardhat";

describe("ProductPassport", function () {
  let ProductPassport;
  let productPassport;
  let owner;
  let addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    ProductPassport = await ethers.getContractFactory("ProductPassport");
    productPassport = await ProductPassport.deploy(owner.address);
    await productPassport.deployed();
    await productPassport.authorizeEntity(owner.address);
  });

  it("Should set and retrieve product data correctly", async function () {
    const productId = 1;
    const description = "Product description";
    const manuals = ["Manual 1", "Manual 2"];
    const specifications = ["Spec 1", "Spec 2"];
    const batchNumber = "Batch-001";
    const productionDate = "2023-01-01";
    const expiryDate = "2025-01-01";
    const certifications = "Cert-123";
    const warrantyInfo = "2 years";
    const materialComposition = "Material 1, Material 2";
    const complianceInfo = "Compliant with standard XYZ";

    await productPassport.setProductData(
      productId,
      description,
      manuals,
      specifications,
      batchNumber,
      productionDate,
      expiryDate,
      certifications,
      warrantyInfo,
      materialComposition,
      complianceInfo
    );

    const productData = await productPassport.getProductData(productId);

    expect(productData.description).to.equal(description);
    expect(productData.manuals).to.eql(manuals);
    expect(productData.specifications).to.eql(specifications);
    expect(productData.batchNumber).to.equal(batchNumber);
    expect(productData.productionDate).to.equal(productionDate);
    expect(productData.expiryDate).to.equal(expiryDate);
    expect(productData.certifications).to.equal(certifications);
    expect(productData.warrantyInfo).to.equal(warrantyInfo);
    expect(productData.materialComposition).to.equal(materialComposition);
    expect(productData.complianceInfo).to.equal(complianceInfo);
  });

  it("Should only allow authorized entities to set product data", async function () {
    const productId = 1;
    const description = "Product description";
    const manuals = ["Manual 1", "Manual 2"];
    const specifications = ["Spec 1", "Spec 2"];
    const batchNumber = "Batch-001";
    const productionDate = "2023-01-01";
    const expiryDate = "2025-01-01";
    const certifications = "Cert-123";
    const warrantyInfo = "2 years";
    const materialComposition = "Material 1, Material 2";
    const complianceInfo = "Compliant with standard XYZ";

    await expect(
      productPassport.connect(addr1).setProductData(
        productId,
        description,
        manuals,
        specifications,
        batchNumber,
        productionDate,
        expiryDate,
        certifications,
        warrantyInfo,
        materialComposition,
        complianceInfo
      )
    ).to.be.revertedWith("Not authorized");

    await productPassport.authorizeEntity(addr1.address);

    await productPassport.connect(addr1).setProductData(
      productId,
      description,
      manuals,
      specifications,
      batchNumber,
      productionDate,
      expiryDate,
      certifications,
      warrantyInfo,
      materialComposition,
      complianceInfo
    );

    const productData = await productPassport.getProductData(productId);

    expect(productData.description).to.equal(description);
    expect(productData.manuals).to.eql(manuals);
    expect(productData.specifications).to.eql(specifications);
    expect(productData.batchNumber).to.equal(batchNumber);
    expect(productData.productionDate).to.equal(productionDate);
    expect(productData.expiryDate).to.equal(expiryDate);
    expect(productData.certifications).to.equal(certifications);
    expect(productData.warrantyInfo).to.equal(warrantyInfo);
    expect(productData.materialComposition).to.equal(materialComposition);
    expect(productData.complianceInfo).to.equal(complianceInfo);
  });
});
