import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// Deploys the full Digital Product Passport system and wires the contracts together.
export default buildModule("DigitalProductPassport", (m) => {
  const owner = m.getAccount(0);

  const geolocation = m.contract("Geolocation", [owner]);
  const complexManagement = m.contract("ComplexManagement", [owner]);
  const productPassport = m.contract("ProductPassport", [owner]);
  const batch = m.contract("IntegratedProductPassportBatch", [owner]);

  const setGeolocation = m.call(complexManagement, "setGeolocationContract", [geolocation]);
  m.call(productPassport, "setComplexManagement", [complexManagement]);
  m.call(batch, "initializeContracts", [productPassport, complexManagement, geolocation]);

  // ComplexManagement writes geolocations on addComplex, so it must own Geolocation
  m.call(geolocation, "transferOwnership", [complexManagement], { after: [setGeolocation] });

  return { geolocation, complexManagement, productPassport, batch };
});
