import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { TextField, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { List } from '@material-ui/core';
import { submitPhone, verifyOtp } from '../../auth/smsAuth';
import {
  getUserPhoneNumber,
  getUserDetails,
  getEmailId,
  payToMerchant,
} from '../../auth/index';
import { useWallet } from '../../context/wallet';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },

  paper: {
    margin: theme.spacing(5, 5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    justifyItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1), //tilting the page up and down
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default props => {
  const [amount, setAmount] = useState('');
  const [payeename, setPayeename] = useState('');
  const [payeeaccount, setPayeeaccount] = useState('');
  const [roundOffAmount, setRoundOffAmount] = useState('');
  const [message, setMessage] = useState('');
  const [otp, setOTP] = useState('');
  const [phoneNumber, setPhonenumber] = useState('');
  const [error, setError] = useState('');
  const [emailId, setemailId] = useState('');
  const [accNumber, setAccNumber] = useState('');
  const { walletReload, setWalletReload } = useWallet();
  const subcategory = 'Paid merchant';

  let response = '';

  const getAmount = value => {
    setAmount(value);
    setRoundOffAmount(parseFloat(parseFloat(5 - (value % 5)).toFixed(2)));
  };

  const resetValues = () => {
    setAmount('');
    setPayeename('');
    setPayeeaccount('');
    setRoundOffAmount('');
    setMessage('');
  };

  const sendOtp = async () => {
    const res = submitPhone('+' + phoneNumber);
    if (res === false) {
      setError('SMS cannot be sent. Please check your phone number');
      return;
    } else {
      setMessage('OTP sent. Please enter it below.');
    }
  };

  const payAmount = async () => {
    setMessage();
    const res = await verifyOtp(otp);
    if (res) {
      try {
        const userDetails = await getUserDetails();
        const data = {
          sourceAccountNumber: userDetails[0].accountNumber,
          destinationAccountNumber: payeeaccount,
          amount,
          roundOffAmount,
          subcategory,
        };
        response = await payToMerchant(data);
        if (response.Success) setMessage(response.Success);
        if (response.error) setMessage(response.error);
        setWalletReload(!walletReload);
        props.setReload(!props.reload);
      } catch (ex) {
        setMessage(`Something wrong, ${ex}`);
      }
    } else setError('OTP is incorrect. Please try again');
  };

  const validateInput = () =>
    payeeaccount.toString().length < 3 ||
    parseFloat(amount) <= 0 ||
    amount <= 0 ||
    otp.toString().length < 1;

  const classes = useStyles();

  useEffect(() => {
    const getDetails = async () => {
      const userDetails = await getUserDetails();
      setAccNumber(userDetails[0].accountNumber);
      const email = await getEmailId(userDetails[0].accountNumber);
      setemailId(email.emailId);
      const phNo = await getUserPhoneNumber(email.emailId);
      setPhonenumber(phNo.phoneNumber);
    };
    getDetails();
  }, []);

  return (
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
        sm={12}
        md={12}
        component={Paper}
        elevation={10}
        square
      >
        <div className={classes.paper}>
          <form className={classes.form} id="forms">
            <List maxwidth="sm">
              <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
                <Typography component="h1" variant="h5">
                  ENTER DETAILS
                </Typography>
              </ListItem>

              <ListItem>
                <TextField
                  size="small"
                  label="Merchant name"
                  variant="outlined"
                  id="payeename"
                  value={payeename}
                  onChange={event => setPayeename(event.target.value)}
                />
              </ListItem>
              <ListItem>
                <TextField
                  size="small"
                  label="Merchant account number"
                  variant="outlined"
                  id="payeeaccount"
                  value={payeeaccount}
                  onChange={event => setPayeeaccount(event.target.value)}
                />
              </ListItem>
              <ListItem>
                <TextField
                  size="small"
                  label="Amount"
                  variant="outlined"
                  id="amount"
                  value={amount}
                  onChange={event => getAmount(event.target.value)}
                />
              </ListItem>
              <ListItem>
                <TextField
                  size="small"
                  label="Roundoff Amount"
                  variant="outlined"
                  value={roundOffAmount}
                  onChange={event => setRoundOffAmount(event.target.value)}
                />
              </ListItem>
              <ListItem>
                <TextField
                  size="small"
                  label="OTP"
                  variant="outlined"
                  id="otp"
                  value={otp}
                  onChange={event => setOTP(event.target.value)}
                />
              </ListItem>

              <ListItem>
                <Grid container justify="space-evenly">
                  <Grid item>
                    <Button
                      onClick={sendOtp}
                      variant="contained"
                      color="primary"
                    >
                      Generate OTP
                    </Button>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container justify="space-evenly">
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={resetValues}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      id="sign-in-button"
                      onClick={payAmount}
                      disabled={validateInput()}
                    >
                      Pay
                    </Button>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <div>{message}</div>
              </ListItem>
            </List>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
