import React, { useState } from "react";
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { getFund } from "../auth/index";

import ManageFund from "./ManageFund";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  paper: {
    margin: theme.spacing(8, 8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    justifyItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const ExistingFunds = () => {
  const [status, currentStatus] = useState(null);
  const [fundId, setFundId] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const classes = useStyles();

  const onSubmit = (event) => {
    event.preventDefault();
    getFund({
      fundId,
    })
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setSuccessMsg("Fund Retrieval NOT  successfull!");
        } else {
          setSuccessMsg("Fund Retrieved successfully!");
          document.getElementById("forms").reset();
          setResponse(data);
        }
      })
      .catch(console.log("Error retrieving fund"));
  };

  return (
    <div>
      <div className="App">
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          component="main"
          className={classes.root}
        >
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={10}
            md={10}
            component={Paper}
            elevation={10}
            square
          >
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                MANAGE EXISTING FUND OPTIONS
              </Typography>
              <p>{successMsg}</p>
              <form className={classes.form} noValidate id="forms">
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="Fund Id Number"
                  label="Fund Id Number"
                  id="Fund Id Number"
                  autoComplete="Fund Id Number"
                  autoFocus
                  onChange={(e) => setFundId(e.target.value)}
                />

                <Button
                  onClick={onSubmit}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  SUBMIT
                </Button>
                {/* <p className="text-white text-center">
                  {JSON.stringify(fundId)}
                </p> */}
                <p>Fund Id:{JSON.stringify(response.fundId)}</p>
                <p>Fund Title:{JSON.stringify(response.fundTitle)}</p>
                <p>ROI:{JSON.stringify(response.returnOfInvestment)}</p>
                <p>Fund Description:{JSON.stringify(response.description)}</p>
              </form>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ExistingFunds;
