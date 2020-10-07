import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import {makeStyles} from '@material-ui/core/styles';
import {ListItem, TextField} from '@material-ui/core';
import {
  getUserDetails,
  getReceiptValue,
  receiptTransaction,
} from '../../auth/index';
import Typography from '@material-ui/core/Typography';
import {useWallet} from '../../context/wallet';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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

export default (props) => {
  const [message, setMessage] = useState();
  const [amount, setAmount] = useState();
  const [roundOffAmount, setRoundOffAmount] = useState('');
  const {walletReload, setWalletReload} = useWallet();
  const subcategory = 'Upload receipt';
  let response = '';

  const uploadImage = async (event) => {
    setMessage(`Loading...`);
    const files = event.target.files;
    const formData = new FormData();
    formData.append('files', files[0]);
    const receiptValue = await getReceiptValue(formData).catch((ex) =>
      setMessage(ex)
    );
    if (receiptValue.success) {
      setWalletReload(!walletReload);
      props.setReload(!props.reload);
      setAmount(receiptValue.value);
      setRoundOffAmount(
        parseFloat(parseFloat(5 - (receiptValue.value % 5)).toFixed(2))
      );
      setMessage(
        `Receipt Upload successful. Your amount is ${receiptValue.value}`
      );
    } else setMessage('Receipt upload unsuccessful. Please try again.');
  };

  const resetValues = () => {
    setAmount('');
    setRoundOffAmount('');
    setMessage('');
  };

  const addtoHistory = async () => {
    try {
      const userDetails = await getUserDetails();
      const data = {
        sourceAccountNumber: userDetails[0].accountNumber,
        amount,
        roundOffAmount,
        subcategory,
      };
      response = await receiptTransaction(data);
      if (response.Success) setMessage(response.Success);
      if (response.error) setMessage(response.error);
      setWalletReload(!walletReload);
      props.setReload(!props.reload);
    } catch (ex) {
      setMessage(`Something wrong, ${ex}`);
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
              Upload Receipt
            </Typography>
            <form className={classes.form} id="forms">
              <ListItem>
                Upload receipt to save in transaction history:
                <Button color="secondary" variant="outlined" component="label">
                  Upload File
                  <input
                    type="file"
                    style={{display: 'none'}}
                    onChange={uploadImage}
                  />
                </Button>
              </ListItem>
              <ListItem>
                Receipt Amount:
                <TextField
                  size="small"
                  variant="outlined"
                  value={amount}
                  disabled
                />
              </ListItem>
              <ListItem>
                Roundoff Amount:
                <TextField
                  size="small"
                  variant="outlined"
                  value={roundOffAmount}
                  onChange={(event) => setRoundOffAmount(event.target.value)}
                />
              </ListItem>
              <ListItem>
                <Grid container justify="space-evenly">
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={resetValues}
                    >
                      clear
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={addtoHistory}
                    >
                      Confirm
                    </Button>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>{message}</ListItem>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
