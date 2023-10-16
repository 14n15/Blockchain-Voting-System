import React from "react";
import * as ReactBootStrap from "react-bootstrap";
import { useState } from "react";

function Propsal({ contract, account, provider }) {
  const [showpropsal, setshowprosal] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log();
  console.log("vote comp");
  const ToPropsal = () => {
    if (showpropsal === true) {
      setshowprosal(false);
    } else {
      setshowprosal(true);
    }
  };
  const SetPropsalFc = async (e) => {
    e.preventDefault();
    const Account = document.getElementById("Account").value;
    console.log(Account);
    const Name = document.getElementById("Name").value;
    console.log(Name);
    if (Account && Name) {
      setLoading(true);
      const tx = await contract.RequestForNextVoting(Account, Name);
      let receipt = await tx.wait();
      console.log("Submit Succssfully! ");
      console.log(receipt);
      window.location.reload();
    } else {
      alert("please Fill input Felid");
    }
  };

  const Fatch = async () => {
    const candidates = await contract.getRequestPropsal();
    console.log(candidates);
    setCandidates(candidates);
  };

  return (
    <div>
      <br></br>
      <button onClick={ToPropsal} className="btn btn-primary">
        PUNETI ALTE INTREBARI{" "}
      </button>
      {showpropsal && (
        <form onSubmit={SetPropsalFc} className="form-group">
          <div className="m-3">
            <p className="h5"> ADRESA TA : {account}</p>
          </div>
          <div className="p-2">
            ADRESA INTREBARE{" "}
            <input type="text" id="Account" class="form-control"></input>
          </div>
          <div className="p-2">
            NUMELE TAU{" "}
            <input type="text" id="Name" class="form-control"></input>
          </div>
          <button type="submit" className="btn btn-dark mt-2">
            {!loading ? (
              "VOTEAZA!"
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
        </form>
      )}
      <br></br>

      <div className="mt-3">
        {/* <p className="text-dark h3">Next Candidates</p> */}
        <button onClick={Fatch} className="btn btn-success">
          VEZI INTREBARI
        </button>
        {candidates.map((candidate) => {
          return (
            <div key={Math.random()}>
              <table>
                <tbody>
                  <tr>
                    <td className="p-2">{candidate.name}</td>
                    <td className="p-2">{candidate._CandidateAddress}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Propsal;
