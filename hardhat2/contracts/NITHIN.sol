// SPDX-License-Identifier:MIT
pragma solidity ^0.8.19;

contract NITHIN {
    uint public wallet_balance=5;
    string   wallet;
    address  owner;
    
    constructor() {
        owner=msg.sender; 
    }
      function add(string memory _wallet,uint _wallet_balance)public {
        wallet_balance+=_wallet_balance;
        wallet=_wallet;
    }  
    function getData()public view returns(uint,string memory,address){
        return(wallet_balance,wallet,owner);
    }
}