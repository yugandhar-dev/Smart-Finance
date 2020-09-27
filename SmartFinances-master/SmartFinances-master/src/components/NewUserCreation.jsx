import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { createUser } from "../auth/index";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  paper: {
    margin: theme.spacing(8, 8),
    display: "flex",
    flexDirection: "column",
    direction: "column",
    alignItems: "stretch",

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
}));

const NewUser = () => {
  const [] = useState(null);
  const classes = useStyles();

  const [accountNumber, setAccountNumber] = useState("");
  const [emailId, setEmailId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bankName, setBankName] = useState("");
  const [address, setAddress] = useState("");
  const [tfnNumber, setTfnNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [openingBalance, setOpeningBalance] = useState("");
  const [, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    createUser({
      accountNumber,
      emailId,
      firstName,
      lastName,
      bankName,
      address,
      tfnNumber,
      phoneNumber,
      openingBalance,
    })
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setSuccessMsg("User NOT saved successfully!");
        } else {
          console.log("User saved succesfully!");
          setSuccessMsg("User saved successfully!");
          document.getElementById("forms").reset();
        }
      })
      .catch(console.log("Error creating new user"));
  };

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
            <Typography component="h1" variant="h3">
              ENTER DETAILS
            </Typography>
            <p>{successMsg}</p>
            <form className={classes.form} noValidate id="forms">
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="Account Number"
                label="Account Number"
                name="Account Number"
                autoComplete="Account Number"
                autoFocus
                onChange={(e) => setAccountNumber(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="Email"
                label="Email"
                id="Email"
                autoComplete="Email"
                autoFocus
                onChange={(e) => setEmailId(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="FirstName"
                label="FirstName"
                id="FirstName"
                autoComplete="FirstName"
                autoFocus
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="LastName"
                label="LastName"
                id="LastName"
                autoComplete="LastName"
                autoFocus
                onChange={(e) => setLastName(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="BankName"
                label="BankName"
                id="BankName"
                autoComplete="BankName"
                autoFocus
                onChange={(e) => setBankName(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="Address"
                label="Address"
                id="Address"
                autoComplete="Address"
                autoFocus
                onChange={(e) => setAddress(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="TFN number"
                label="TFN number"
                id="TFN number"
                autoComplete="TFN number"
                autoFocus
                onChange={(e) => setTfnNumber(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="Phone number"
                label="Phone number"
                id="Phone number"
                autoComplete="Phone number"
                autoFocus
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="Opening Balance"
                label="Opening Balance"
                id="Opening Balance"
                autoComplete="Opening Balance"
                autoFocus
                onChange={(e) => setOpeningBalance(e.target.value)}
              />
              <Button
                onClick={onSubmit}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Create New User
              </Button>
              {/* <p className="text-white text-center">
                {JSON.stringify(accountNumber)},{JSON.stringify(emailId)},
                {JSON.stringify(firstName)},{JSON.stringify(lastName)},
                {JSON.stringify(bankName)},{JSON.stringify(address)},
                {JSON.stringify(tfnNumber)},{JSON.stringify(phoneNumber)},
                {JSON.stringify(openingBalance)}
              </p> */}
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default NewUser;
