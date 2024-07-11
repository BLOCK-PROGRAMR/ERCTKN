import React, { useState } from 'react';
import { BrowserProvider, Contract } from 'ethers';
import projson from "../..//../hardhat2/artifacts/contracts/NITHIN.sol/NITHIN.json";

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"; // Your deployed contract address
const contractABI = projson.abi;

function Pro() {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [walletBalance, setWalletBalance] = useState(null);
    const [wallet, setWallet] = useState(null);
    const [owner, setOwner] = useState(null);
    const [newBalance, setNewBalance] = useState('');
    const [newWallet, setNewWallet] = useState('');
    const [token,settoken]=useState("");
    var onweraddress=null;

    const connectMetaMask = async () => {
        console.log("window.ethereum:", window.ethereum); // Log to see if MetaMask is detected
        if (typeof window.ethereum === 'undefined') {
            console.error("MetaMask is not installed or not detected!");
            return;
        }

        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log("Connected account:", accounts[0]);
            onweraddress=accounts[0];

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
                console.log(data[0].toString(), data[1], data[2]);
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
            //  if(onweraddress==='0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'){
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
        // }
        // else{
        //     console.log("you are not a owner");
        //     settoken("You are not a owner,only owner have a right to add the data..So you can contact who have been deployed this smart contract")
        // }
        }
    };

    return (
        <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center">
            <header className="w-full max-w-md mx-auto bg-white p-8 shadow-lg rounded-lg">
                <div className="flex flex-col items-center">
                    <button 
                        className="w-full mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300" 
                        onClick={connectMetaMask}
                    >
                        Connect MetaMask
                    </button>  
                    <button 
                        className="w-full mb-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300" 
                        onClick={getData}
                    >
                        Get Data
                    </button>
                </div>
                <div className="text-center font-semibold text-gray-700 mb-6">
                    <h3>Wallet Balance: {walletBalance}</h3>
                    <h3>Wallet: {wallet}</h3>
                    <h3>Owner: {owner}</h3>
                </div>
                <div className="flex flex-col items-center">
                    <input 
                        type="text" 
                        placeholder="New Wallet" 
                        value={newWallet} 
                        onChange={(e) => setNewWallet(e.target.value)} 
                        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <input 
                        type="number" 
                        placeholder="Balance to Add" 
                        value={newBalance} 
                        onChange={(e) => setNewBalance(e.target.value)} 
                        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <button 
                        className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300" 
                        onClick={addAmount}
                    >
                        Add Amount
                    </button>
                </div>
            </header>

            <h2 className='bg-yellow-200 text-red-600'>{token}</h2>
        </div>
    );
}

export default Pro;
