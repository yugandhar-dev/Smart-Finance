import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { getUser } from "../auth/index";

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

const UserDetails = () => {
  const [tfnNumber, setTfnNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailId, setEmailId] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [response, setResponse] = useState("");
  const classes = useStyles();

  const onSubmit = (event) => {
    event.preventDefault();
    getUser({
      tfnNumber,
      phoneNumber,
      emailId,
    })
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setSuccessMsg("User retrieval NOT  successfully!");
        } else {
          setSuccessMsg("User retrieved successfully!");
          document.getElementById("forms").reset();
          setResponse(data);
        }
      })
      .catch(console.log("Error retrieving user"));
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
        <Grid item xs={3} sm={8} md={5} component={Paper} elevation={10} square>
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              ENTER THE DETAILS
            </Typography>
            <p>{successMsg}</p>
            <form className={classes.form} noValidate id="forms">
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="tfnNumber"
                label="tfnNumber"
                name="tfnNumber"
                autoComplete="tfnNumber"
                auto
                Focus
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
                name="Email"
                label="Email"
                id="Email"
                autoComplete="Email"
                autoFocus
                onChange={(e) => setEmailId(e.target.value)}
              />
              <Button
                onClick={onSubmit}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                RETRIEVE USER DETAILS
              </Button>
              {/* <p className="text-white text-center">
                {JSON.stringify(tfnNumber)},{JSON.stringify(phoneNumber)},
                {JSON.stringify(emailId)}
              </p> */}
              {/* <p className="text-white text-center">
                {JSON.stringify(response)},
              </p> */}
              <p>Account Number:{JSON.stringify(response.accountNumber)}</p>
              <p>Email Id:{JSON.stringify(response.emailId)}</p>
              <p>First Name:{JSON.stringify(response.firstName)}</p>
              <p>Last Name:{JSON.stringify(response.lastName)}</p>
              <p>Address:{JSON.stringify(response.address)}</p>
              <p>Phone Number:{JSON.stringify(response.phoneNumber)}</p>
              <p>Opening Balance:{JSON.stringify(response.openingBalance)}</p>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserDetails;
