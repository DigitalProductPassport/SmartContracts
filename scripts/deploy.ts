import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Ownership = await ethers.getContractFactory("Ownership");
  const ownership = await Ownership.deploy();

  await ownership.deployed();

  console.log("Ownership contract deployed to:", ownership.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
