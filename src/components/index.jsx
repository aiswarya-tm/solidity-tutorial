import { useState, useEffect } from "react";
import { Contract } from "web3";
import { contractAbi } from "../assets/contractABI";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

// const web3 = new Web3(RPC_URL);

export default function Counter({ web3 }) {
  //react state to store the counter value
  const [counter, setCounter] = useState("");

  //Function to get the value of counter from contract
  const getCounter = async () => {
    //Create the contract instance
    const contract = new Contract(contractAbi, contractAddress, web3);

    //Calling the contract state variable counter
    const counter_val = await contract.methods.counter().call();

    //Set the react state variable
    setCounter(counter_val.toString());
  };

  const increment = async () => {
    try {
      //Create the contract instance
      const contract = new Contract(contractAbi, contractAddress, web3);

      //Get the account details
      let accounts = await web3.eth.getAccounts();

      //Increments the value of counter. From address has to be passed in the send()
      await contract.methods
        .increment()
        .send({ from: accounts[0] })
        .on("transactionHash", (hash) => console.log("Transaction Hash:", hash))
        .on("confirmation", (confirmationNumber) =>
          console.log("Confirmation:", confirmationNumber)
        )
        .on("receipt", (receipt) => {
          console.log("Transaction Receipt:", receipt);
          //To update the value of counter
          getCounter();
        })
        .on("error", (error) => console.error("Error:", error));
    } catch (err) {
      console.log("Error ", err);
    }
  };

  const decrement = async () => {
    try {
      const contract = new Contract(contractAbi, contractAddress, web3);

      //Create the contract instance
      let accounts = await web3.eth.getAccounts();

      //Decrements the value of counter. From address has to be passed in the send()
      await contract.methods
        .decrement()
        .send({ from: accounts[0] })
        .on("transactionHash", (hash) => console.log("Transaction Hash:", hash))
        .on("confirmation", (confirmationNumber) =>
          console.log("Confirmation:", confirmationNumber)
        )
        .on("receipt", (receipt) => {
          console.log("Transaction Receipt:", receipt);
          //To update the value of counter
          getCounter();
        })
        .on("error", (error) => console.error("Error:", error));
    } catch (err) {
      console.log("Error ", err);
    }
  };

  useEffect(() => {
    getCounter();
  });

  return (
    <>
      <h2>Interacting With Counter Contract</h2>
      <button onClick={() => increment()}>Increment</button>
      <button onClick={() => decrement()}>Decrement</button>
      <p>Counter: {counter}</p>
    </>
  );
}
