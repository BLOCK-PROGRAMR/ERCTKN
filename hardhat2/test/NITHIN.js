const { ethers } = require('hardhat');
const { expect } = require('chai');

describe("NITHIN contract", async function () {
    let contractOwner;
    let nk;

    beforeEach(async function () {
        const [owner] = await ethers.getSigners();
        const Nk = await ethers.getContractFactory("NITHIN");
        nk = await Nk.deploy();
       console.log(await nk);
        contractOwner = owner.address;//address of the owner
    });

    it("getData checking", async function () {
        const data = await nk.getData();
        const wallet_balance = data[0]; 
        const wallet = data[1];
        const owner = data[2];

        console.log(wallet_balance, wallet, owner);

        expect(wallet_balance).to.equal(5);
        expect(wallet).to.equal("");
        expect(owner).to.equal(contractOwner);
    });

    it("add amount", async function () {
        const balanceToAdd = 100;
        const wallet = "SBI";
        
        await nk.add(wallet, balanceToAdd);

        const data = await nk.getData();
        const wallet_balance = data[0];
        const updatedWallet = data[1];

        console.log("walletBalance", wallet_balance);
        expect(wallet_balance).to.equal(5 + balanceToAdd);
        expect(updatedWallet).to.equal(wallet);
    });
});
