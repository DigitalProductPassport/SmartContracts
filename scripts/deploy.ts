async function main() {
  const fs = require('fs');
  const hre = require('hardhat');

  const productData = JSON.parse(fs.readFileSync('./productData.json', 'utf8'));
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const ProductPassport = await hre.ethers.getContractFactory("ProductPassport");
  const productPassport = await ProductPassport.deploy(deployer.address);
  await productPassport.deployed();

  console.log("ProductPassport deployed to:", productPassport.address);

  const {
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
    complianceInfo,
    ipfs
  } = productData;

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

  console.log("Product data set in ProductPassport contract.");

  const Batch = await hre.ethers.getContractFactory("Batch");
  const batch = await Batch.deploy(productPassport.address, deployer.address);
  await batch.deployed();

  console.log("Batch deployed to:", batch.address);

  const batchId = 1;
  const amount = 1000;
  const assemblingTime = 12345;
  const transportDetails = "Transport details";
  const ipfsHash = ipfs;

  await batch.setBatchDetails(batchId, amount, assemblingTime, transportDetails, ipfsHash);

  const batchDetails = await batch.getBatchDetails(batchId);
  const tokenURI = await batch.tokenURI(batchId);

  console.log("Batch details:", batchDetails);
  console.log("Token URI:", tokenURI);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
