// deploy.js

async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log('Deploying contracts with the account:', deployer.address);
  
    const Voting = await ethers.getContractFactory('voting'); // Adjust contract name if necessary
    const votingContract = await Voting.deploy();
  
    console.log('Voting contract deployed to:', await votingContract.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  