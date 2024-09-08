import { HardhatUserConfig } from "hardhat/types";
import * as dotenv from "dotenv";
require('hardhat-abi-exporter');
require('@nomicfoundation/hardhat-toolbox')
import '@typechain/hardhat'



dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  networks: {
    hardhat: {},
    baseChain: {
      url: `https://base-sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      chainId: 1,
      accounts: []
    },
    avalanche: {
      url: `https://avalanche-fuji.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      chainId: 43114,
      accounts: []
    },
    arbitrum: {
      url: `https://arbitrum-sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      chainId: 42161,
      accounts: []
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      chainId: 1337,
      accounts: []
    }
  },
  typechain: {
    outDir: "types",
    target: "ethers-v6",
  },
  docgen: {
    output: './documentation-web/tutorial-basics',
    pages: 'files',
  }
};

export default config;
