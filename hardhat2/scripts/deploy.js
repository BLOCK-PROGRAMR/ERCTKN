async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const NITHIN = await ethers.getContractFactory("NITHIN");
    const nithin = await NITHIN.deploy();

    console.log("Contract deployed to address:", nithin.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
