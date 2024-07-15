import { expect } from "chai";
import { ethers } from "hardhat";

describe("ComplexManagement", function () {
  let ComplexManagement;
  let complexManagement;
  let Geolocation;
  let geolocation;

  beforeEach(async function () {
    const [owner, addr1] = await ethers.getSigners();
    Geolocation = await ethers.getContractFactory("Geolocation");
    geolocation = await Geolocation.deploy();
    await geolocation.deployed();

    // Deploy ComplexManagement contract and pass necessary arguments
    ComplexManagement = await ethers.getContractFactory("ComplexManagement");
    complexManagement = await ComplexManagement.deploy(owner.address);
    await complexManagement.deployed();
  });

  it("Should add and retrieve complex details correctly", async function () {
    const complexId = "COMPLEX1";
    const complexName = "Test Complex";
    const complexCountry = "Test Country";
    const complexAddress = "123 Test Street, Test City, Test Country";
    const latitude = "-79.4912";
    const longitude = "41.108097";
    const complexSiteType = "Site Type";
    const complexIndustry = "Industry";

    await complexManagement.addComplex(
      complexId,
      complexName,
      complexCountry,
      complexAddress,
      latitude,
      longitude,
      complexSiteType,
      complexIndustry
    );

    const complex = await complexManagement.getComplex(complexId);

    expect(complex.complexName).to.equal(complexName);
    expect(complex.complexCountry).to.equal(complexCountry);
    expect(complex.complexAddress).to.equal(complexAddress);
    expect(complex.latitude).to.equal(latitude);
    expect(complex.longitude).to.equal(longitude);
    expect(complex.complexSiteType).to.equal(complexSiteType);
    expect(complex.complexIndustry).to.equal(complexIndustry);
  });

});
