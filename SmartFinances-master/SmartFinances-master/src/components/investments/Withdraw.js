import React, {useState, useEffect} from 'react';
import styled, {css} from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {InvestmentWithdraw, getUserDetails} from '../../auth/index';
import {useWallet} from '../../context/wallet';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: '-15%',
  },

  paper: {
    margin: theme.spacing(8, 8),
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

const Input = styled.input`
  border-shadow: none;
  text-align: Left;
  border-radius: 8px;
  padding: 10px;
  onclick-border: none;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: #07236a;
  border-radius: 10px;
  margin-top: 5px;
  padding: 10px;
  border-shadow: none;
  border: none;
  color: white;
  position: right;
  cursor: pointer;

  :hover {
    background-color: #07236a;
  }
  :disabled {
    background-color: grey;
  }
`;

const Message = styled.p`
  color: green;
  ${(props) =>
    props.error &&
    css`
      color: red;
    `}
`;

export default (props) => {
  const [error, setError] = useState('');
  const [response, setResponse] = useState('');
  const [walletAmount, setWalletAmount] = useState('');
  const {walletReload, setWalletReload} = useWallet();

  useEffect(() => {
    getUserDetails()
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setResponse(data[0]);
        }
      })
      .catch((ex) => console.log('Fund Details Retrieval error', ex));
  }, []);

  const withdrawAmount = async (e) => {
    e.preventDefault();
    const userDetails = await getUserDetails();
    const data = {
      accountNumber: userDetails[0].accountNumber,
      walletAccountNumber: userDetails[0].walletAccountNumber,
      walletFund: walletAmount,
    };
    const res = await InvestmentWithdraw(data);
    res.error ? setError(res.error + ' Please try again') : setError(null);
    setWalletAmount('');
    setWalletReload(!walletReload);
    props.setReload(!props.reload);
    console.log(response, 'string');
  };

  const validateInput = () =>
    parseFloat(walletAmount) <= 0 || walletAmount == '';

  const classes = useStyles();

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
        sm={8}
        md={5}
        component={Paper}
        elevation={10}
        square
      >
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Withdraw Money
          </Typography>
          <br></br>
          <form className={classes.form} id="forms">
            <p>Account number:{JSON.stringify(response.accountNumber)}</p>
            <p>
              Enter the amount you want to withdraw:
              <Input
                type="text"
                value={walletAmount}
                onChange={(event) => setWalletAmount(event.target.value)}
              ></Input>{' '}
            </p>
            <br></br>
            <Button onClick={withdrawAmount} disabled={validateInput()}>
              Withdraw
            </Button>
            <Button margin-left="40%">Reset</Button>
            {error != '' && error == null ? (
              <Message>
                The amount has been successfully withdrawn and your balances are
                updated.
              </Message>
            ) : (
              <Message error>{error}</Message>
            )}
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
