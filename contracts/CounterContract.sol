// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract CounterContract {
    uint256 public counter;
    
    constructor() {
        counter = 1;
    }

    function increment() public {
        counter++;
    }

    function decrement() public {
        if(counter == 1)
            revert("Cannot decrement further!!!");
        counter--;
    }
}
