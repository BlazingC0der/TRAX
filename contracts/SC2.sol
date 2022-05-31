// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract SC2 {
    string name;
    string title;
    uint amount;
    bytes32 hash;
    function SetName(string memory Name) public{
        name=Name;
    }
    function SetTitle(string memory Title) public{
        title=Title;
    }
    function SetAmount(uint Amount) public{
        amount=Amount;
    }
    function SetHash(bytes32 Hash) public{
        hash=Hash;
    }
}