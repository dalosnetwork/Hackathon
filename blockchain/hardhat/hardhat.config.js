// mkdir arbitrum-hardhat
// cd arbitrum-hardhat
// npm init -y
// npm install --save-dev hardhat
// npx hardhat

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
    solidity: "0.8.20",
    networks: {
        arbitrum_sepolia: {
            url: "https://sepolia-rollup.arbitrum.io/rpc",
            accounts: [process.env.PRIVATE_KEY] // your private key
        }
    }
};
