// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract CounterContract {
    uint256 public counter;

    event CounterIncremented (address indexed user, uint256 counter, uint256 timestamp);
    event CounterDecremented (address indexed user, uint256 counter, uint256 timestamp);

    constructor() {
        counter = 1;
    }

    function increment() public {
        counter++;
        emit CounterIncremented(msg.sender,counter,block.timestamp);
    }

    function decrement() public {
        if(counter == 1)
            revert("Cannot decrement further!!!");
        counter--;
        emit CounterDecremented(msg.sender,counter,block.timestamp);
    }
}
