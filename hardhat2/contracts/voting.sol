// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;

contract voting{

    uint  Totalvotes=12;
    uint  Ycpvotes=8;
    uint Tdpvotes=4;
   function ycpvoting()public{//changing the state varibles
    Totalvotes+=1;
    Ycpvotes+=1;
   }
   function tpdvoting()public{//changing the state variables
    Totalvotes+=1;
    Tdpvotes+=1;
    
   }
  
   function Result()public view returns(uint,uint,uint){

        return(Totalvotes,Ycpvotes,Tdpvotes);
   }
}