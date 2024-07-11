import React, { useState } from "react";
import { BrowserProvider, Contract, ethers } from "ethers";
import ERCjson from "../../../hardhat2/artifacts/contracts/ERCToken.sol/MyToken.json";

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"; // Replace with your c
console.log(ERCjson.abi);

const ERCtoken = () => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [balanceAddr, setBalanceAddr] = useState("");
    const [mintAddr, setMintAddr] = useState("");
    const [mintAmt, setMintAmt] = useState(0);
    const [transferAdd, setTransferAdd] = useState("");
    const [transferAmt, setTransferAmt] = useState(0);
    const [balance, setBalance] = useState("");
    const [status, setStatus] = useState("");
    const [totalbalance,settotalbalance]=useState("");
    const [Owner,setOwner]=useState("");
    const [transferowner,settransferowner]=useState("");

    const connectMetaMask = async () => {
        if (typeof window.ethereum === "undefined") {
            setStatus("MetaMask is not installed. Please install MetaMask.");
            return;
        }
        console.log(window.ethereum);

        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log(accounts[0],accounts[1]);
        setStatus(`Connected as: ${accounts[0]}`);
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new Contract(contractAddress,ERCjson.abi,signer);

        setContract(contract);
        setProvider(provider);
        setSigner(signer);
        setStatus("MetaMask connection established");
    };

    const minting = async () => {
        if (contract) {
            try {
                setStatus("Minting in progress...");
                console.log("mint:"+mintAddr,mintAmt);
                const tx = await contract.mint(mintAddr, mintAmt);
                await tx.wait();
                setStatus("Minting successful");
            } catch (err) {
                
                setStatus(`Minting failed: ${err.message}`);
            }
        }
    };

    const transferring = async () => {
        if (contract) {
            try {
                setStatus("Transferring in progress...");
             // Ensure ethers is correctly imported
             console.log("transfer"+transferAdd,transferAmt);
                const tx = await contract.transfer(transferAdd,transferAmt);
               
                await tx.wait();
                setStatus("Transfer successful");
            } catch (err) {
                setStatus(`Transfer failed: ${err.message}`);
            }
        }
    };

    const checkBalance = async () => {
        if (contract) {
            try {
               
                const balance = await contract.balanceOf(balanceAddr);
                const string_value=balance.toString();
                setBalance(string_value);
                console.log("after balance:"+balance);
                setStatus("Balance retrieved successfully");
            } catch (err) {
                setStatus(`Failed to retrieve balance: ${err.message}`);
            }
        }
    };
 const totalBalance=async()=>{

    if(contract){
        try{
             const supply=await contract.totalSupply();
            //  const decimalValue = ethers.utils.formatUnits(supply, 18);
            const stringvalue=supply.toString();
             settotalbalance(stringvalue);
             console.log("total supply:",supply);
          console.log("string value",stringvalue)
        }
        catch(err){
            setStatus(`Failed to retrieve balance: ${err.message}`);
        }
    }
 }
 const checkOwner=async()=>{
    if(contract){
        try{
             const owner=await contract.owner();
            const _onwner=owner.toString();
            console.log("owneer:"+_onwner);
            setOwner(_onwner);

        }
        catch(err){
            setStatus(`owner fetching failed:${err.message}`);
        }
    }

 }
 const tranfer0wnership=async()=>{
    if(contract){
        try{
            const Ownership=await contract.transferOwnership(transferowner);
            // const string_value=Ownership.toString();
            console.log("Ownership:"+Ownership)
        }
        catch(err){
            setStatus(`transferOwnership is failed:${err.message}`);
        }
    }
 }
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4 text-center">ERC20 Token Interaction</h1>
                
                <button
                    onClick={connectMetaMask}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 mb-6"
                >
                    Connect MetaMask
                </button>
                 <div>
                 <p className="mt-2 text-lg font-medium">ERC20TokenOwner: {Owner}</p>
                 </div>
                 <br/>
                 <div className="mb-6">
                  <button onClick={checkOwner} className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300">checkOwner</button>
                   </div>
                   <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Recipient Address"
                        value={transferowner}
                        onChange={(e) => settransferowner(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                    />
                    <button onClick={tranfer0wnership} className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300">tranfer0wnership</button>
                    </div>
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Mint Tokens</h2>
                    <input
                        type="text"
                        placeholder="Recipient Address"
                        value={mintAddr}
                        onChange={(e) => setMintAddr(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        value={mintAmt}
                        onChange={(e) => setMintAmt(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                    />
                    <button
                        onClick={minting}
                        className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
                    >
                        Mint
                    </button>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Transfer Tokens</h2>
                    <input
                        type="text"
                        placeholder="Recipient Address"
                        value={transferAdd}
                        onChange={(e) => setTransferAdd(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        value={transferAmt}
                        onChange={(e) => setTransferAmt(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                    />
                    <button
                        onClick={transferring}
                        className="w-full bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-300"
                    >
                        Transfer
                    </button>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-2">Check Balance</h2>
                    <input
                        type="text"
                        placeholder="Address"
                        value={balanceAddr}
                        onChange={(e) => setBalanceAddr(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                    />
                    <button
                        onClick={checkBalance}
                        className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition duration-300"
                    >
                        Check Balance
                    </button>
                    <p className="mt-2 text-lg font-medium">Balance: {balance} MTK</p>
                    <br/><br/>
                    <button     onClick={totalBalance}
                     className="w-full bg-orange-400 text-white py-2 px-4 rounded hover:bg-orange-600 transition duration-300">
                   totalBalance
                    </button>
                    <p className="mt-2 text-lg font-medium">totalBalance: {totalbalance} MTK</p>
                    
                </div>

                {status && <p className="mt-4 text-center text-gray-600">{status}</p>}
            </div>
        </div>
    );
};

export default ERCtoken;
