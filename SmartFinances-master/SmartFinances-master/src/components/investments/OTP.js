import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Investments from "./Investments";
import Success from "./Success";
import { verifyOtp } from "../../auth/smsAuth";
import { addFundsToWallet } from "../../auth/index";
import { useWallet } from "../../context/wallet";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh",
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

const OTP = props => {
  const [status, currentStatus] = useState(null);
  const [otp, onChangeOTP] = useState("");
  const [error, setError] = useState("");
  const { walletReload, setWalletReload } = useWallet();

  const submitOtp = async e => {
    e.preventDefault();
    const res = await verifyOtp(otp);
    if (res) {
      setError("");
      await addFundsToWallet({
        walletAccountNumber: props.to,
        walletFund: props.amount,
      });
      setWalletReload(!walletReload);
      props.setReload(!props.reload);
      currentStatus(
        "OTP is verified. Amount is added into wallet successfully"
      );
    } else {
      currentStatus("");
      setError("OTP is incorrect. Please try again");
    }
  };

  const classes = useStyles();
  return (
    <div>
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

            <form className={classes.form} noValidate id="forms">
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="From"
                label="From"
                name="From"
                autoComplete="From"
                autoFocus
                value={props.from}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="To"
                label="To"
                name="To"
                autoComplete="To"
                autoFocus
                value={props.to}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="Amount"
                label="Amount"
                name="Amount"
                autoComplete="Amount"
                autoFocus
                value={props.amount}
              />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="OTP"
                label="OTP"
                name="OTP"
                value={otp}
                autoComplete="From"
                autoFocus
                onChange={e => onChangeOTP(e.target.value)}
              />
              <Button
                onClick={submitOtp}
                type="submit"
                id="sign-in-button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Submit
              </Button>
              <Button
                onClick={submitOtp}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Cancel
              </Button>
              {error}
              {status}
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default OTP;
