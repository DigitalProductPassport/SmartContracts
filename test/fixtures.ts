import type { HardhatEthers } from "@nomicfoundation/hardhat-ethers/types";

export const COMPLEX_ID = "COMPLEX-1";
export const COMPLEX_GEO_ID = "GEO-COMPLEX-1";
export const COMPLEX_LAT = "-20.3155";
export const COMPLEX_LON = "-40.3128";
export const MATERIAL = "0x0000000000000000000000000000000000000001";

// Deploys and wires every contract. Geolocation ownership is handed to
// ComplexManagement because addComplex writes geolocations through it.
export async function deploySystem(ethers: HardhatEthers) {
  const [owner, other] = await ethers.getSigners();

  const geolocation = await ethers.deployContract("Geolocation", [owner.address]);
  const complexManagement = await ethers.deployContract("ComplexManagement", [owner.address]);
  const productPassport = await ethers.deployContract("ProductPassport", [owner.address]);
  const batch = await ethers.deployContract("IntegratedProductPassportBatch", [owner.address]);

  await complexManagement.setGeolocationContract(await geolocation.getAddress());
  await productPassport.setComplexManagement(await complexManagement.getAddress());
  await batch.initializeContracts(
    await productPassport.getAddress(),
    await complexManagement.getAddress(),
    await geolocation.getAddress(),
  );
  await geolocation.transferOwnership(await complexManagement.getAddress());

  return { owner, other, geolocation, complexManagement, productPassport, batch };
}

export async function deploySystemWithProduct(ethers: HardhatEthers) {
  const system = await deploySystem(ethers);

  await system.complexManagement.addComplex(
    COMPLEX_ID,
    "Vitoria Plant",
    "Brazil",
    "Av. Industrial, 100",
    COMPLEX_GEO_ID,
    "Factory",
    "Food",
    COMPLEX_LAT,
    COMPLEX_LON,
    "Main production site",
  );

  await system.productPassport.createProduct(
    1,
    "Brigadeiro",
    ["QmManualHash"],
    ["QmSpecHash"],
    "BRG-2026-001",
    "2026-06-20",
    "2026-12-31",
    "FDA-5678",
    "Not applicable",
    [MATERIAL],
    COMPLEX_ID,
  );

  return system;
}
