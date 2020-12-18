import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { submitNewUser } from '../../auth/index';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage:
      'url(https://images.unsplash.com/photo-1490079027102-cd08f2308c73?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', //for sigin icon
  },
  avatar: {
    margin: theme.spacing(1), //tilting the page up and down
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '90%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  otpBtn: {
    margin: theme.spacing(2, 0, 2),
    padding: '2%',
  },
  phone: {
    width: '75%',
    marginRight: '20px',
  },
}));

const StepThree = ({ formData, setFormData, count, setCount }) => {
  const { bankName, accountNumber, tfnNumber, openingBalance } = formData;

  const [error, setError] = useState('');

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitForm = async () => {
    if (
      bankName !== '' &&
      accountNumber !== '' &&
      tfnNumber !== '' &&
      openingBalance !== ''
    ) {
      if (isNaN(parseInt(accountNumber)) || accountNumber.length !== 9) {
        setError('Please enter valid Account Number');
      } else if (isNaN(parseInt(tfnNumber)) || tfnNumber.length !== 9)
        setError('Please enter valid TFN Number');
      else if (isNaN(parseInt(openingBalance)) || parseInt(openingBalance) < 0)
        setError('Please enter valid Opening balance');
      else {
        setError('');
        await submitNewUser(formData);
        setCount(count + 1);
      }
    } else setError('Please enter all the fields');
  };

  const classes = useStyles();
  return (
    <div>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <div className="content">
          <h1>Smart Finance</h1>
          <p>Smart Finance, the place where all your tomorrows are secured.</p>
          <p>
            Life is navigating from one choice to another. If you are here, you
            have already made one smart choice.
          </p>
          <p>
            As our privileged user, you would to able to contribute to your
            life-savings by investing in the funds of various risks. Worried
            about the risk factors, Don't worry we got you covered. With our
            varied fund options, you will be having total control in your
            investments. The more you invest the more we can help you in
            managing your savings.
          </p>
        </div>
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              User Registration
            </Typography>

            <FormControl variant="outlined" className={classes.form}>
              <InputLabel>Bank Name</InputLabel>
              <Select
                labelId="bankName"
                name="bankName"
                id="bankName-type-outlined"
                onChange={handleChange}
                label="Bank Name"
                value={bankName}
                required
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {Array.from(
                  new Set([
                    'American Express',
                    'Australia and New Zealand Banking Group Limited',
                    'Australian Military Bank Ltd',
                    'Australian Super',
                    'Bank of Melbourne',
                    'Bank of Queensland Limited',
                    'Bank of Sydney Ltd',
                    'Bendigo and Adelaide Bank Limited',
                    'Citibank',
                    'Commonwealth Bank of Australia',
                    'Defence Bank Limited',
                    'G&C Mutual Bank',
                    'Gateway Credit Union Ltd',
                    'Greater Bank Limited',
                    'Heritage Bank Limited',
                    'HSBC Bank Australia Limited',
                    'IMB Ltd ',
                    'ING Bank (Australia) Limited',
                    'National Australia Bank Limited',
                    'Regional Australia Bank',
                    'Rural Bank',
                    'St. George Bank',
                    'UBank',
                    'Westpac Banking Corporation',
                  ])
                ).map(bank => (
                  <MenuItem key={Math.random(10)} value={bank}>
                    {bank}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="outlined" className={classes.form}>
              <TextField
                label="Account Number"
                name="accountNumber"
                value={accountNumber}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                autoComplete="off"
                fullWidth
                required
              />
            </FormControl>

            <FormControl variant="outlined" className={classes.form}>
              <TextField
                label="Opening Balance"
                name="openingBalance"
                value={openingBalance}
                onChange={handleChange}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                variant="outlined"
                autoComplete="off"
                fullWidth
                required
              />
            </FormControl>

            <FormControl variant="outlined" className={classes.form}>
              <TextField
                label="TFN Number"
                name="tfnNumber"
                value={tfnNumber}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                autoComplete="off"
                fullWidth
                required
              />
            </FormControl>

            <p style={{ color: 'red' }}>{error}</p>

            <FormControl variant="outlined" className={classes.form}>
              <Button
                fullWidth
                onClick={() => setCount(count - 1)}
                variant="contained"
                color="secondary"
                className={classes.otpBtn}
              >
                Back
              </Button>
              <Button
                fullWidth
                onClick={submitForm}
                variant="contained"
                color="primary"
                className={classes.otpBtn}
              >
                Next
              </Button>
            </FormControl>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default StepThree;
