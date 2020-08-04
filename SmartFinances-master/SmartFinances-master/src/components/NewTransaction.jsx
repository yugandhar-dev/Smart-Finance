import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { newTransaction } from "../auth/index";

const useStyles = makeStyles((theme) => ({
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

const NewTransaction = () => {
  //const [status, currentStatus] = useState(null);
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [roundedAmount, setRoundedAmount] = useState("");
  const [date, setDate] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [fund, setFund] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  //const [afterAmount,setAfterAmount] = useState("")
  
  const calculateRoundOff = (event) => {
    setAmount(event.target.value);
    setRoundedAmount(parseFloat((5 - parseFloat(event.target.value) % 5).toFixed(2)))
  }

  const classes = useStyles();

  const onSubmit = (event) => {
    event.preventDefault();
    //history.push("/signin/user");
    newTransaction({
      account,
      amount,
      roundedAmount,
      date,
      transactionType,
      fund,
      description,
    })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          console.log("Transaction saved succesfully!");
          setSuccessMsg("Transaction saved successfully!");
          document.getElementById("forms").reset();
        }
      })
      .catch(console.log("New transaction request error"));
  };

  const onReset = (event) => {
    event.preventDefault();
    //setAmount("");
    document.getElementById("forms").reset();
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
          <p>{error}</p>
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
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
                value={account}
                onChange={(e) => setAccount(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="Fund Amount"
                label="Fund Amount"
                name="Fund Amount"
                autoComplete="FundAmount"
                autoFocus
                value={amount}
                onChange={calculateRoundOff}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="Round offFund Amount"
                label="Round OffFund Amount"
                name="Round Off Fund Amount"
                autoComplete="Round Off FundAmount"
                value={roundedAmount}
                autoFocus
                onChange={(e) => setRoundedAmount(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="date"
                label="Date"
                type="date"
                defaultValue="2020-05-3"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setDate(e.target.value)}
              />

              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="select"
                label="Select"
                select
                onChange={(e) => setTransactionType(e.target.value)}
              >
                <MenuItem value={"Select"}>Select Type</MenuItem>
                <MenuItem value={"expense"}>Expense</MenuItem>
              </TextField>

              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="select"
                label="Select Risk"
                select
                onChange={(e) => setFund(e.target.value)}
              >
                <MenuItem value={"Select"}>Select Fund</MenuItem>
                <MenuItem value={"lowRiskFund"}>Low Risk</MenuItem>
                <MenuItem value={"mediumRiskFund"}>Medium Risk</MenuItem>
                <MenuItem value={"highRiskFund"}>High Risk</MenuItem>
              </TextField>

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="Description"
                label="Description"
                name="Description"
                autoComplete="Description"
                autoFocus
                onChange={(e) => setDescription(e.target.value)}
              />

              <Button
                onClick={onSubmit}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Create Transaction
              </Button>
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
              {/* <p className="text-white text-center">
                {JSON.stringify(account)}
                {JSON.stringify(amount)},{JSON.stringify(roundedAmount)},
                {JSON.stringify(date)},{JSON.stringify(transactionType)}
                {JSON.stringify(fund)},{JSON.stringify(description)}
              </p> */}
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default NewTransaction;
