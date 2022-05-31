// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SC1 is ERC20, Ownable {
    constructor() ERC20("TRAX", "TRX01") {
        _mint(msg.sender, 1000000000000000000000);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function balance() public view returns(uint256){
        return totalSupply();
    }

    function transact(address add, uint amount) public payable returns(bool){
        return transfer(add,amount);
    }
}
