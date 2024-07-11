import React, { useState } from 'react';
import { BrowserProvider, Contract } from 'ethers';
import Imageabi from '../../hardhat2/artifacts/contracts/Image.sol/Image.json';

// Replace with your actual contract address
const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const imageABI = Imageabi.abi;

// Replace with your actual API keys
const apikey = "71d56e3cb096e665a2de";
const secretapikey = "9c143be3f17e1b2ded75a8ce1e1ec08bd583a5a80b6ff904725575863f0a9289";

const Imageproject = () => {
  const [hash, setHash] = useState('');
  const [storedHash, setStoredHash] = useState('');
  const [file, setFile] = useState(null);
  const [contract, setContract] = useState(null);//object stored as null and string stored as ""

  // Connect to MetaMask and initialize the contract
  const connectMetaMask = async () => {
    if (typeof window.ethereum === 'undefined') {
      console.log('MetaMask is not installed. Please install MetaMask.');
      return;
    }

    try {
     const account= await window.ethereum.request({ method: 'eth_requestAccounts' });
     console.log("owner adress:"+account[0]);
     const provider = new BrowserProvider(window.ethereum);
       console.log(window.ethereum);
      const signer =await provider.getSigner();
      console.log("signer:"+signer);
     const contractInstance=new Contract(contractAddress,imageABI,signer);
     console.log("contract:"+contractInstance);
      setContract(contractInstance);
      console.log('MetaMask is connected');
    } catch (err) {
      console.error('MetaMask connection error:', err);
    }
  };

  // Upload file to Pinata
  const uploadToPinata = async (file) => {
    const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          'pinata_api_key': apikey,
          'pinata_secret_api_key': secretapikey,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Pinata upload failed: ${response.statusText}. Details: ${errorText}`);
      }

      const result = await response.json();
      console.log("IPFS Hash:", result.IpfsHash);
      console.log("type of ipfs hash:"+typeof result.IpfsHash);
      return result.IpfsHash;
    } catch (error) {
      console.error('Error uploading to Pinata:', error);
      throw error;
    }
  };

  // Handle image upload and interaction with the contract
  const handleUpload = async () => {
    if (file && contract) {
      try {
        const hash = await uploadToPinata(file);
        setHash(hash);
         console.log("sethash:"+hash);
         console.log("type of hash:"+typeof hash);
        //  const gasLimit = await contract.estimateGas.setImage(hash);
        //  console.log("Gas Limit:", gasLimit.toString());
         
        const tx = await contract.setImage(hash);
        await tx.wait();
        const storedHash = await contract.getImage();
        console.log("Stored Hash:", storedHash);
        setStoredHash(storedHash);
      } catch (err) {
        console.error('Error uploading image or interacting with contract:', err);
      }
    } else {
      console.log('File or contract not found.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <button 
          onClick={connectMetaMask} 
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Connect MetaMask
        </button>
        <div className="my-4">
          <input 
            type="file" 
            onChange={(e) => setFile(e.target.files[0])} 
            className="block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100"
          />
        </div>
        <button 
          onClick={handleUpload} 
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
        >
          Upload Image
        </button>
      </div>
      {hash && (
        <div className="mt-8 p-4 bg-white rounded shadow-md text-center">
          <p>Image uploaded successfully:</p>
          <a href={`https://gateway.pinata.cloud/ipfs/${hash}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            View Image
          </a>
          <img src={`https://gateway.pinata.cloud/ipfs/${hash}`} alt="Uploaded" className="mt-4 max-w-full h-auto" />
        </div>
      )}
      {storedHash && (
        <div className="mt-8 p-4 bg-white rounded shadow-md text-center">
          <p>Stored Image Hash:</p>
          <a href={`https://gateway.pinata.cloud/ipfs/${storedHash}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            View Image
          </a>
          <img src={`https://gateway.pinata.cloud/ipfs/${storedHash}`} alt="Stored" className="mt-4 max-w-full h-auto" />
        </div>
      )}
    </div>
  );
};

export default Imageproject;
