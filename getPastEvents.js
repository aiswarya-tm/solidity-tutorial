const { Web3 } = require("web3");
const eventABI = require("./abi/eventABI");

require("dotenv").config();

// Initialize your HTTP web3 provider (Alchemy, Infura, etc.)
const web3 = new Web3(process.env.HTTP_URL);

// Address of the contract
const contractAddress = process.env.CONTRACT_ADDRESS;

// Create an instance of the contract
const contractInstance = new web3.eth.Contract(eventABI, contractAddress);

//store the event name
const eventName = "CounterIncremented";

console.log("fetching old events");

//based on indexed values in event
const filter = {
  user: "0xa253ca2A0F948fcA43c2c91B8C961cDB85bA09ff",
};

contractInstance
  .getPastEvents(eventName, {
    filter,
    fromBlock: 5872733,
    toBlock: 5873044,
  })
  .then(function (events) {
    console.log(events);
  });
