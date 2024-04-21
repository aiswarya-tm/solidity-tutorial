require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",

  networks: {
    sepolia: {
      url: process.env.SEPOLIAI_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 100000000000,
      timeout: 0,
    }
  },
 
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY
    }
  },

};
