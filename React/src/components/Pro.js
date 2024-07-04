import React, { useState } from 'react';
import { BrowserProvider, Contract } from 'ethers';

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";  // Your deployed contract address
const contractABI = [{
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_wallet",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_wallet_balance",
        "type": "uint256"
      }
    ],
    "name": "add",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getData",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "wallet_balance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  } 
];

function Pro() {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [walletBalance, setWalletBalance] = useState(null);
    const [wallet, setWallet] = useState(null);
    const [owner, setOwner] = useState(null);
    const [newBalance, setNewBalance] = useState('');
    const [newWallet, setNewWallet] = useState('');

    const connectMetaMask = async () => {
        console.log("window.ethereum:", window.ethereum); // Log to see if MetaMask is detected
        if (typeof window.ethereum === 'undefined') {
            console.error("MetaMask is not installed or not detected!");
            return;
        }

        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log("Connected account:", accounts[0]);

            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new Contract(contractAddress, contractABI, signer);

            setProvider(provider);
            setSigner(signer);
            setContract(contract);

            console.log('MetaMask connected');
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
        }
    };

    const getData = async () => {
        if (contract) {
            try {
                const data = await contract.getData();
                setWalletBalance(data[0].toString());
                setWallet(data[1]);
                setOwner(data[2]);
            } catch (error) {
                console.error('Error getting data:', error);
            }
        }
    };

    const addAmount = async () => {
        if (contract) {
            try {
              // const adress=await signer.getAddress();
              // const nonce=await provider.getTransactionCount(adress);
                const tx = await contract.add(newWallet, parseInt(newBalance));
                console.log("log the transcitions");
                await tx.wait();
                getData();
                console.log("transaction is confrimed and added");
            } catch (error) {
                console.error('Error adding amount:', error);
            }
        }
    };

    return (
        <div className=" bg-blue-400">
            <header className="">
                <button onClick={connectMetaMask}>Connect MetaMask</button>
                <button onClick={getData}>Get Data</button>
                <div className="text-center font-semibold text-red-400">
                    <h3>Wallet Balance: {walletBalance}</h3>
                    <h3>Wallet: {wallet}</h3>
                    <h3>Owner: {owner}</h3>
                </div>
                <div className="text-center">
                    <input 
                        type="text" 
                        placeholder="New Wallet" 
                        value={newWallet} 
                        onChange={(e) => setNewWallet(e.target.value)} 
                    />
                    <input 
                        type="number" 
                        placeholder="Balance to Add" 
                        value={newBalance} 
                        onChange={(e) => setNewBalance(e.target.value)} 
                    />
                    <button onClick={addAmount}>Add Amount</button>
                </div>
            </header>
        </div>
    );
}

export default Pro;
