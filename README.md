# Sample Hardhat Project

- This project demonstrates a basic Hardhat use case. It comes with a sample contract and a Hardhat Ignition module that deploys that contract.
- The contract has a counter variable and functions to increment and decrement the values of this counter.

## Install Dependencies
`npm i`
- node version used = `v20.11.0`

## Prerequisites Before Compiling and deployment
- Create a `.env` file.
- Set the env varibales based on variables found in `.env.example` file.

## Compilation
`npx hardhat verify`

## Deployment
`npx hardhat ignition deploy ./ignition/modules/Counter.js`

## Verification
`npx hardhat verify --network <network-name> <contract-address>`
- eg: npx hardhat verify --network sepolia 0x4742A20144cFb365922c89eC61237196Bb63ADaA
