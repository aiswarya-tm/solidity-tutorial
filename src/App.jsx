import { useState } from "react";
import { Web3 } from "web3";
import "./App.css";
import Counter from "./components";

function App() {
  //react state to store and show the connected account
  const [connectedAccount, setConnectedAccount] = useState(null);
  const [web3, setWeb3] = useState(null);

  async function connectMetamask() {
    try {
      //check metamask is installed
      if (window.ethereum) {
        // instantiate Web3 with the injected provider
        const web3_temp = new Web3(window.ethereum);
        setWeb3(web3_temp);

        //request user to connect accounts (Metamask will prompt)
        await window.ethereum.request({ method: "eth_requestAccounts" })

        //get the connected accounts
        const accounts = await web3.eth.getAccounts();

        //show the first connected account in the react page
        setConnectedAccount(accounts[0]);
      } else {
        alert("Please download metamask");
      }
    } catch (err) {
      alert(err.message);
    }
  }

  async function disconnectMetamask() {
    try {
      await window.ethereum.request({
        method: "eth_requestAccounts",
        params: [
          {
            eth_accounts: {},
          },
        ],
      });
      setConnectedAccount(null);
    } catch (err) {
      console.log(err);
    }
  }


  window.ethereum.on("accountsChanged", (accounts) => {
    // If user has locked/logout from MetaMask, this resets the accounts array to empty
    if (!accounts.length) {
      // logic to handle what happens once MetaMask is locked
      setConnectedAccount(null);
    }
  });

  return (
    <div className="App">
      {connectedAccount == null ? (
        /* Button to trigger Metamask connection */
        <button onClick={() => connectMetamask()}>Connect to Metamask</button>
      ) : (
        <>
          <button onClick={() => disconnectMetamask()}>
            Disconnect From Metamask
          </button>
          {/* Display the connected account and counter section*/}
          <h3>Connected Account:</h3>
          <p>{connectedAccount}</p>
          {/* Passing web3 as props to other components, so they can access the metamask account*/}
          <Counter web3={web3} />
        </>
      )}
    </div>
  );
}

export default App;
