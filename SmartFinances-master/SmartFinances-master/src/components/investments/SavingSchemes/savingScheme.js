import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {
  List,
  TextField,
  Grid,
  ListItem,
  Button,
  MenuItem,
  Select,
} from '@material-ui/core';
import {
  getInvestmentOptions,
  getInvestmentDetails,
  getInvestmentCompanies,
  investFunds,
  getUserDetails,
} from '../../../auth/index';
import {useWallet} from '../../../context/wallet';

export default (props) => {
  const [noOfUnits, setNoOfUnits] = useState('');
  const [companies, setCompanies] = useState({});
  const [amount, setAmount] = useState();
  const [company, setCompany] = useState('');
  const [len, setLength] = useState();
  const [message, setMessage] = useState('');
  const {walletReload, setWalletReload} = useWallet();
  const investType = 'savingScheme';
  let investmentDetails;

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

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        investmentType: investType,
      };
      investmentDetails = await getInvestmentCompanies(data);

      let comps = {};
      let comp = [];
      investmentDetails.map((val) => {
        comp.push(val.companyName);
      });
      comps = {comp};
      setCompanies(comps);
      setLength(comp.length);
    };
    fetchData();
  }, []);

  const getCompany = (event) => {
    setCompany(event.target.value);
  };

  const calculateAmount = async (event) => {
    setNoOfUnits(event);
    const data = {
      investmentType: investType,
    };
    investmentDetails = await getInvestmentCompanies(data);
    investmentDetails.map((value) => {
      if (value.companyName === company) {
        const creditAmount = parseFloat(
          parseFloat(event * value.pricePerUnit).toFixed(2)
        );
        setAmount(creditAmount);
        setMessage(`Your wallet account gets deducted by $${creditAmount}`);
      }
    });
  };

  const resetForm = () => {
    setCompany('');
    setAmount('');
    setNoOfUnits('');
  };

  const buyFunds = async () => {
    const userDetails = await getUserDetails();
    const data = {
      accountNumber: userDetails[0].accountNumber,
      walletAccountNumber: userDetails[0].walletAccountNumber,
      investmentType: 'savingScheme',
      companyName: company,
      numberOfUnits: parseInt(noOfUnits),
    };
    const response = await investFunds(data);
    response.error && setMessage(response.error);
    response.Success && setMessage(response.Success);
    setWalletReload(!walletReload);
    props.setReload(!props.reload);
  };

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
      <Grid xs={false} sm={8} md={5} component={Paper} elevation={10} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Saving Schemes
          </Typography>
          <form className={classes.form} id="forms">
            <List>
              <ListItem>
                <a>Select company:</a>
                <Select
                  style={{margin: '2px', padding: '0px 5px'}}
                  variant="outlined"
                  style={{padding: '0px 40px'}}
                  labelId="companies"
                  id="companies"
                  onChange={getCompany}
                >
                  {companies.comp && len > 0 ? (
                    companies.comp.map((val, index) => (
                      <MenuItem key={index} value={val}>
                        {val}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem
                      selected="selected"
                      value={'No Investments Found'}
                    >
                      No Companies Found
                    </MenuItem>
                  )}
                </Select>
              </ListItem>
              <br />
              <ListItem>
                <a>Enter Number of Units: </a>
                <TextField
                  placeholder="Units"
                  value={noOfUnits}
                  id = "units"
                  onChange={(event) => calculateAmount(event.target.value)}
                />
              </ListItem>
              <ListItem>
                <a>Amount:</a>
                <TextField value={amount} />
              </ListItem>
              <Grid container justify="space-evenly">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={resetForm}
                    className={classes.submit}
                  >
                    Reset
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={buyFunds}
                    className={classes.submit}
                  >
                    Buy
                  </Button>
                </Grid>
              </Grid>
              <div>{message}</div>
            </List>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
