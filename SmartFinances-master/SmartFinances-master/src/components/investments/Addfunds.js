import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import OTP from "./OTP";
import { getUserDetails } from "../../auth/index";
import { submitPhone } from "../../auth/smsAuth";
import { getUserPhoneNumber } from "../../auth/index";
import { getEmailId } from "../../auth/index";

const useStyles = makeStyles(theme => ({
  root: {
    maxHeight: "100vh",
    marginTop: "5%",
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
    margin: theme.spacing(1), //tilting the page up and down
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  control: {
    padding: theme.spacing(2),
  },
}));

function Addfunds(props) {
  const [status, currentStatus] = useState(null);
  const [from, onChangeFrom] = useState("");
  const [to, onChangeTo] = useState("");
  const [amount, onChangeAmount] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  getUserDetails()
    .then(data => {
      onChangeTo(data[0].walletAccountNumber);
      onChangeFrom(data[0].accountNumber);
    })
    .catch(error => console.log(error));

  getEmailId(from)
    .then(data => {
      setEmail(data.emailId);
    })
    .catch(error => console.log(error));

  const onReset = event => {
    event.preventDefault();

    document.getElementById("forms").reset();
  };

  const sendOtp = async () => {
    currentStatus("otp");
    const number = await getUserPhoneNumber(email);
    const res = submitPhone(`+${number.phoneNumber}`);
    if (res === false) {
      setError("SMS cannot be sent. Please check your phone number");
      return;
    }
  };

  const classes = useStyles();
  return (
    <div>
      {status !== null ? (
        <div>
          {status === "otp" ? (
            <OTP
              from={from}
              to={to}
              amount={amount}
              reload={props.reload}
              setReload={props.setReload}
            />
          ) : (
            ""
          )}
        </div>
      ) : (
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
            sm={8}
            md={5}
            component={Paper}
            elevation={10}
            square
          >
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                ENTER DETAILS
              </Typography>

              <form className={classes.form} id="forms">
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="From"
                  label="From"
                  name="From"
                  value={from}
                  autoComplete="From"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="To"
                  label="To"
                  name="To"
                  value={to}
                  autoComplete="To"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="Amount"
                  label="Amount"
                  name="Amount"
                  type="number"
                  value={amount}
                  autoComplete="Amount"
                  autoFocus
                  onChange={e => onChangeAmount(e.target.value)}
                />
                <div id="recaptcha-container"></div>
                {from !== "" && to !== "" && amount !== "" ? (
                  <React.Fragment>
                    <Button
                      onClick={sendOtp}
                      type="submit"
                      fullWidth
                      variant="contained"
                      id="sign-in-button"
                      color="primary"
                      className={classes.submit}
                    >
                      Confirm and Send Otp
                    </Button>
                  </React.Fragment>
                ) : (
                  ""
                )}
                <Button
                  onClick={onReset}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Reset
                </Button>
              </form>
            </div>
            {error}
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default Addfunds;
