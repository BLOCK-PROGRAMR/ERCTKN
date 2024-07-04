const {ethers}=require('hardhat')
const { expect } = require('chai');

describe('Voting Contract', function () {
  let VotingContract;
  let votingContract;

  beforeEach(async () => {
   //contract is deploying before function function is calling
    VotingContract = await ethers.getContractFactory('voting');
    votingContract = await VotingContract.deploy();
 
  });

  it('initialize with correct vote counts', async function () {
    const result = await votingContract.Result();
    expect(result[0]).to.equal(12);
    expect(result[1]).to.equal(8);
    expect(result[2]).to.equal(4); 
  });

  it(' increment Ycp votes correctly', async function () {
    await votingContract.ycpvoting();
    const result = await votingContract.Result();
    expect(result[0]).to.equal(13); 
    expect(result[1]).to.equal(9); 
    expect(result[2]).to.equal(4); 
  });

  it('increment Tdp votes correctly', async function () {
    await votingContract.tpdvoting();
    const result = await votingContract.Result();
    expect(result[0]).to.equal(13); 
    expect(result[1]).to.equal(8); 
    expect(result[2]).to.equal(5);
  });

  it(' multiple votes correctly', async function () {
    await votingContract.ycpvoting();
    await votingContract.tpdvoting();
    await votingContract.tpdvoting();
    const result = await votingContract.Result();
    expect(result[0]).to.equal(15); 
    expect(result[1]).to.equal(9); 
    expect(result[2]).to.equal(6); 
  });

});
