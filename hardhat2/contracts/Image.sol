// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;


contract Image{

    string public imageHash;
    function setImage(string memory _imagehash)public{

        imageHash=_imagehash;
    }
    function getImage()public view returns(string memory){
        return imageHash ;


    }
}

