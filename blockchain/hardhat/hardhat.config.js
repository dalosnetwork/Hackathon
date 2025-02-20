// mkdir yournetwork-hardhat
// cd yournetwork-hardhat
// npm init -y
// npm install --save-dev hardhat
// npx hardhat

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
    solidity: "0.8.20",
    networks: {
        yournetwork: {
            url: "YOURRPCLINK",
            accounts: [process.env.PRIVATE_KEY] // your private key
        }
    }
};
