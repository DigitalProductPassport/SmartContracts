import { expect } from "chai";
import { network } from "hardhat";

const { ethers, networkHelpers } = await network.create();

describe("Geolocation", function () {
  async function deployGeolocation() {
    const [owner, other] = await ethers.getSigners();
    const geolocation = await ethers.deployContract("Geolocation", [owner.address]);
    return { owner, other, geolocation };
  }

  it("sets and retrieves a geolocation", async function () {
    const { geolocation } = await networkHelpers.loadFixture(deployGeolocation);

    await expect(geolocation.setGeolocation("GEO1", "-79.4912", "41.108097", "Test location"))
      .to.emit(geolocation, "GeolocationAdded")
      .withArgs("GEO1", "-79.4912", "41.108097", "Test location");

    const location = await geolocation.getGeolocation("GEO1");
    expect(location.latitude).to.equal("-79.4912");
    expect(location.longitude).to.equal("41.108097");
    expect(location.additionalInfo).to.equal("Test location");
    expect(await geolocation.geolocationExists("GEO1")).to.equal(true);
  });

  it("rejects empty ids and coordinates", async function () {
    const { geolocation } = await networkHelpers.loadFixture(deployGeolocation);

    await expect(geolocation.setGeolocation("", "1", "1", "")).to.be.revertedWith("ID cannot be empty");
    await expect(geolocation.setGeolocation("GEO1", "", "1", "")).to.be.revertedWith(
      "Latitude cannot be empty",
    );
    await expect(geolocation.setGeolocation("GEO1", "1", "", "")).to.be.revertedWith(
      "Longitude cannot be empty",
    );
    await expect(
      geolocation.setGeolocation("GEO1", "1".repeat(21), "1", ""),
    ).to.be.revertedWith("Invalid coordinates format");
  });

  it("updates and removes a geolocation", async function () {
    const { geolocation } = await networkHelpers.loadFixture(deployGeolocation);
    await geolocation.setGeolocation("GEO1", "1", "2", "old");

    await expect(geolocation.updateGeolocation("GEO1", "3", "4", "new")).to.emit(
      geolocation,
      "GeolocationUpdated",
    );
    expect((await geolocation.getGeolocation("GEO1")).latitude).to.equal("3");

    await expect(geolocation.removeGeolocation("GEO1")).to.emit(geolocation, "GeolocationRemoved");
    expect(await geolocation.geolocationExists("GEO1")).to.equal(false);

    await expect(geolocation.updateGeolocation("GEO1", "1", "1", "")).to.be.revertedWith(
      "Geolocation does not exist",
    );
  });

  it("only allows the owner to write", async function () {
    const { geolocation, other } = await networkHelpers.loadFixture(deployGeolocation);

    await expect(geolocation.connect(other).setGeolocation("GEO1", "1", "2", ""))
      .to.be.revertedWithCustomError(geolocation, "OwnableUnauthorizedAccount")
      .withArgs(other.address);
  });
});
