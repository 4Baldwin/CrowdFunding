require("@matterlabs/hardhat-zksync-solc");
require('dotenv').config();

module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  defaultNetwork: "Sepolia", // กำหนด default network ให้เป็น Sepolia
  networks: {
    hardhat: {},
    Sepolia: {
      url: 'https://rpc.ankr.com/eth_sepolia',
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
};
