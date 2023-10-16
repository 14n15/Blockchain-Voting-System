import { ethers } from "ethers";
import * as ReactBootStrap from "react-bootstrap";
import { useState, useEffect } from "react";
import ABIFILE from "./artifacts/contracts/BlockchainVoting.sol/BlockchainVoting.json";
import FatcVoter from "./comp/FatcVoter";
import Propsal from "./comp/Propsal";
import Voturi from "./comp/Voturi";
import Set from "./comp/FatchCandi";
import Vote from "./comp/Vote";
const ABI = ABIFILE.abi;
const ContractAddress = "0xD7EbA1A0d1c83f7eb2BC4a278a7DF825596e592F";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [isoff, setOff] = useState(false);
  const [loading, setLoading] = useState(false);

  const Dicconnect = async () => {
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("Connected")) {
        window.localStorage.removeItem("Connected");
        setOff(false);
        window.location.reload();
      } else {
      }
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("Connected")) {
        Connect();
      }
    }
  }, []);

  const Connect = async (e) => {
    // e.preventDefault();
    setLoading(true);
    if (typeof window.ethereum !== "undefined") {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setOff(true);
      window.localStorage.setItem("Connected", "injected");
      console.log(account);
      setAccount(account);
      document.getElementById("connectbtn").innerHTML = account;

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);

      const signer = provider.getSigner();
      console.log(signer);
      const contract = new ethers.Contract(ContractAddress, ABI, signer);
      setContract(contract);
      console.log(contract);
    
      
      await provider.send("eth_requestAccounts", []);
      
      const address = await signer.getAddress();
      setAccount(address);
      console.log("Metamask Connected : " + address);
      setAccount(address);
      document.getElementById("connectbtn").innerHTML = address;
    
    }
  };
  return (
    <div
      className="mx-auto p-4 text-light  "
      style={{
        width: 1000,
        marginTop: 25,
        backgroundColor: "#a9adab",
      }}
    >
     
      <p className="text-left h2 text-warning p-2">
        Blockchain Voting System
      </p>
      
      <div className="d-flex center-content-between">
        <button
          onClick={Connect}
          id="connectbtn"
          className="btn btn-success mx-2"
        >
          {!loading ? (
            "Connect"
          ) : (
            <ReactBootStrap.Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
        </button>

        <button
          onClick={Dicconnect}
          id="Dissconnectbtn"
          className="btn btn-success mx-2"
          disabled={!isoff}
        >
          Disconnect
        </button>
      </div>

      <br></br>

      <FatcVoter contract={contract} account={account} provider={provider} />
       
      <Set contract={contract} account={account} provider={provider} />

      <Vote contract={contract} account={account} provider={provider} />

      

      <Propsal contract={contract} account={account} provider={provider} />

      <Voturi contract={contract} account={account} provider={provider} />
    </div>
  );
}

export default App;
