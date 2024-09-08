import { expect } from "chai";
import { ethers } from "hardhat";
import type { Geolocation } from "../types";

describe("Geolocation", function () {
  let geolocation: Geolocation;
  let owner: any;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    
    const GeolocationFactory = await ethers.getContractFactory("Geolocation");
    geolocation = await GeolocationFactory.deploy() as Geolocation;
    await geolocation.waitForDeployment();  // Adjusted deployment method
  });

  it("Should set and retrieve geolocation correctly", async function () {
    const id = "GEO1";
    const latitude = "-79.4912";
    const longitude = "41.108097";
    const additionalInfo = "Test location";

    await geolocation.setGeolocation(id, latitude, longitude, additionalInfo);

    const location = await geolocation.getGeolocation(id);

    expect(location.latitude).to.equal(latitude);
    expect(location.longitude).to.equal(longitude);
    expect(location.additionalInfo).to.equal(additionalInfo);
  });
});
