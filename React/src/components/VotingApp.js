import React, { useState, useEffect } from 'react';
import { BrowserProvider, Contract } from 'ethers';
import votingjson from '../../../hardhat2/artifacts/contracts/voting.sol/voting.json';

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";  // Your deployed contract address
const contractABI = votingjson.abi;

function VotingApp() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [ycpVotes, setYcpVotes] = useState(0);
  const [tdpVotes, setTdpVotes] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);
  const [contractaddr, setcontractaddr] = useState(null);
  const [accountaddr, setaccountaddr] = useState(null);

  useEffect(() => {
    if (contract) {
      Result();
    }
  }, [contract]);

  const connectMetaMask = async () => {
    if (typeof window.ethereum === 'undefined') {
      console.error("MetaMask is not installed or not detected!");
      return;
    }

    try {
      setcontractaddr(contractAddress);

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setaccountaddr(accounts[0]);
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, contractABI, signer);

      setProvider(provider);
      setSigner(signer);
      setContract(contract);

      console.log('MetaMask connected with account:', accounts[0]);
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  };

  const Result = async () => {
    if (contract) {
      try {
        const result = await contract.Result();
        setTotalVotes(Number(result[0]));
        setYcpVotes(Number(result[1]));
        setTdpVotes(Number(result[2]));
      } catch (error) {
        console.error('Error fetching votes:', error);
      }
    }
  };

  const voteYcp = async () => {
    if (contract) {
      try {
        const tx = await contract.ycpvoting();
        await tx.wait();
        Result();
      } catch (error) {
        console.error('Error voting for YCP:', error);
      }
    }
  };

  const voteTdp = async () => {
    if (contract) {
      try {
        const tx = await contract.tpdvoting();
        await tx.wait();
        Result();
      } catch (error) {
        console.error('Error voting for TDP:', error);
      }
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen flex flex-col items-center justify-center py-6 px-4">
      <header className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col items-center">
          <button 
            onClick={connectMetaMask} 
            className='bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md mb-4 hover:bg-red-600 transition'
          >
            Connect MetaMask
          </button>
          <button 
            onClick={Result} 
            className='bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md mb-4 hover:bg-blue-600 transition'
          >
            Fetch Votes
          </button>
          <div className="text-center font-semibold mb-4">
            <h2 className="text-gray-700">Contract Address: {contractaddr}</h2>
            <h2 className="text-gray-700">Account Address: {accountaddr}</h2>
            <h3 className="text-lg text-gray-800">Total Votes: {totalVotes}</h3>
            <h3 className="text-lg text-gray-800">YCP Votes: {ycpVotes}</h3>
            <h3 className="text-lg text-gray-800">TDP Votes: {tdpVotes}</h3>
          </div>
          <div className="flex flex-col items-center">
            <button 
              onClick={voteYcp} 
              className='bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md mb-4 hover:bg-green-600 transition'
            >
              Vote for YCP
            </button>
            <button 
              onClick={voteTdp} 
              className='bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md mb-4 hover:bg-yellow-600 transition'
            >
              Vote for TDP
            </button>
          </div>
        </div>
      </header>
      <div className="mt-6 w-full max-w-md text-center">
        <h2>
          {(ycpVotes > 0 && tdpVotes > 0) 
            ? ycpVotes > tdpVotes 
              ? <h2 className="text-green-600 font-bold text-xl bg-green-100 p-4 rounded-lg shadow-md">YCP Winning Moment!</h2> 
              : <h2 className="text-yellow-600 font-bold text-xl bg-yellow-100 p-4 rounded-lg shadow-md">TDP Wins!</h2> 
            : <h2 className="text-gray-500 font-bold text-xl">Not Connected to MetaMask</h2>
          }
        </h2>
      </div>
    </div>
  );
}

export default VotingApp;
