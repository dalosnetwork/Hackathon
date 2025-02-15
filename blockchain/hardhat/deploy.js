
// ---------------------------------------------
// 1. Hardhat projesini başlattığınızdan emin olun
// 2. `npx hardhat compile` komutu ile kontratınızı derleyin
// 3. Deploy etmek için: `npx hardhat run scripts/deploy.js --network arbitrum_sepolia` (arbitrum sepolia için)
// ---------------------------------------------

const hre = require("hardhat");

async function main() {
    console.log("Deploying contract to Arbitrum Sepolia...");

    const MyContract = await hre.ethers.getContractFactory("MyContract");

    const myContract = await MyContract.deploy("Merhaba Arbitrum!"); // contructor param

    await myContract.deployed();

    console.log(`Contract deployed to: ${myContract.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
