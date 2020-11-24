import React, { useState, useEffect } from 'react';
import { getUserDetails } from '../auth/index';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wallet: {
    position: 'absolute',
    right: '25px',
  },
}));

const WalletDetails = props => {
  const [walletAccountNumber, setwalletAccountNumber] = useState('');
  const [walletAccountBalance, setwalletAccountBalance] = useState('');
  var [message, setMessage] = useState('');

  const classes = useStyles();

  useEffect(() => {
    getUserDetails()
      .then(data => {
        setwalletAccountNumber(data[0].walletAccountNumber);
        setwalletAccountBalance(data[0].walletAccountBalance.toFixed(2));
      })
      .catch(error => {
        setMessage(error);
      });
  }, [props.reload]);

  return (
    <div className={classes.wallet}>
      <p>
        <font color='#b80000'>
          Wallet Account Number:
          <font color='#1273de'>{walletAccountNumber}</font>{' '}
          {/*removed stringify because wallet account number shows value in quotations*/}
        </font>
      </p>
      <p>
        <font color='#b80000'>
          Wallet Account Balance:
          <font color='#1273de'>
            {message == '' ? walletAccountBalance : message}
          </font>
        </font>
      </p>
    </div>
  );
};

export default WalletDetails;
