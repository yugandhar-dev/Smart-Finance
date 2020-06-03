import React, { useState } from "react";
import "./App.css";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import FundInfo from "./FundInfo";
import { Jumbotron } from "react-bootstrap";
import { getLowRisk, getMediumRisk, getHighRisk } from "../auth/index";

import { Button, Form } from "reactstrap";

const FundOptions = () => {
  const [status, currentStatus] = useState(null);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const lowRisk = (event) => {
    event.preventDefault();
    //history.push("/signin/user");
    getLowRisk()
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          console.log("Low Risk Fund Details Retrieved succesfully!");
          // setSuccessMsg("Transaction saved successfully!");
          // document.getElementById("forms").reset();
          setResponse(data[0]);
        }
      })
      .catch(console.log("Fund Details Retrieval error"));
  };

  const mediumRisk = (event) => {
    event.preventDefault();
    //history.push("/signin/user");
    getMediumRisk()
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          console.log("Medium Risk Fund Details Retrieved succesfully!");
          // setSuccessMsg("Transaction saved successfully!");
          // document.getElementById("forms").reset();
          setResponse(data[0]);
        }
      })
      .catch(console.log("Fund Details Retrieval error"));
  };
  const highRisk = (event) => {
    event.preventDefault();
    //history.push("/signin/user");
    getHighRisk()
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          console.log("High Risk Fund Details Retrieved succesfully!");
          // setSuccessMsg("Transaction saved successfully!");
          // document.getElementById("forms").reset();
          setResponse(data[0]);
        }
      })
      .catch(console.log("Fund Details Retrieval error"));
  };

  return (
    <div>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        // component={Paper}
      >
        <h1 className="Cen">SMART FINANCE FUND OPTIONS</h1>
        <Button onClick={lowRisk} className="block">
          Low Risk Fund
        </Button>
        <br></br>
        <Button onClick={mediumRisk} className="block">
          Medium Risk fund
        </Button>
        <br></br>
        <Button onClick={highRisk} className="block">
          High Risk Fund
        </Button>
      </Grid>
      <br />
      <br />

      <Grid
        container
        direction="column"
        justify="left"
        alignItems="left"
        // component={Paper}
      >
        {/* <p>{JSON.stringify(response)}</p> */}
        <p>Fund ID:{JSON.stringify(response.fundId)}</p>
        <p>Fund Title:{JSON.stringify(response.fundTitle)}</p>
        <p>
          Return Of Investment:{JSON.stringify(response.returnOfInvestment)}%
        </p>
        <p>Description:{JSON.stringify(response.description)}</p>
      </Grid>
    </div>
  );
};

export default FundOptions;
