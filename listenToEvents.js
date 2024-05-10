const { Web3 } = require("web3");
const pauserABI = require("./abi/eventABI");

require("dotenv").config();

// Initialize your WS web3 provider (Alchemy, Infura, etc.)
const web3 = new Web3(process.env.WSS_URL);

// Address of the contract
const contractAddress = process.env.CONTRACT_ADDRESS;

// Create an instance of the contract
const contractInstance = new web3.eth.Contract(pauserABI, contractAddress);

async function main() {
  console.log("Listening to events");

  //based on indexed values in event
  const filter = {
    user: "0xa253ca2A0F948fcA43c2c91B8C961cDB85bA09ff",
  };

  const subscription = await contractInstance.events.CounterIncremented({
    filter,
    fromBlock: 5873045,
  });

  subscription.on("connected", function (subscriptionId) {
    console.log(subscriptionId);
  });

  subscription.on("data", function (event) {
    console.log(event);
  });

  subscription.on("error", function (error, receipt) {
    // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
    console.log("error ", error);
  });
}

main();
