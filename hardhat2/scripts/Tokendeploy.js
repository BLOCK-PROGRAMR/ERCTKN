const { ethers } = require("hardhat"); // Make sure Hardhat is installed

const main = async () => {
    const [deployer] = await ethers.getSigners();
    console.log("Deployer address:", deployer.address);
    const ERC20Token = await ethers.getContractFactory("MyToken");
    
     const token = await ERC20Token.deploy();
    // await token.deployed(); // Wait for the contract to be deployed
    console.log("Contract address:", token.address);
};

main()
    .then(() => process.exit(0)) 
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
