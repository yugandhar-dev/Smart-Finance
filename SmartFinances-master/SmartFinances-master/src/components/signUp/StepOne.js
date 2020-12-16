import React from 'react';
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

const StepOne = ({ formData, setFormData, count, setCount }) => {
  const {
    firstName,
    lastName,
    email,
    dob,
    phone,
    gender,
    address,
    city,
    state,
    postalCode,
  } = formData;

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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
            {/* <p style={{ color: 'red' }}>{error}</p> */}
            <FormControl variant="outlined" className={classes.form}>
              <TextField
                label="First Name"
                name="firstName"
                value={firstName}
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
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                autoComplete="off"
                fullWidth
              />
            </FormControl>

            <FormControl variant="outlined" className={classes.form}>
              <TextField
                label="Email Address"
                name="email"
                value={email}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                autoComplete="off"
                fullWidth
              />
            </FormControl>

            <FormControl variant="outlined" className={classes.form}>
              <TextField
                type="date"
                name="dob"
                value={dob}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">DOB</InputAdornment>
                  ),
                }}
                margin="normal"
                variant="outlined"
                autoComplete="off"
                fullWidth
              />
            </FormControl>

            <FormControl variant="outlined" className={classes.form}>
              <TextField
                label="Phone Number"
                name="phone"
                value={phone}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                autoComplete="off"
                fullWidth
              />
            </FormControl>

            <FormControl variant="outlined" className={classes.form}>
              <InputLabel>Gender</InputLabel>
              <Select
                labelId="gender"
                name="gender"
                id="gender-type-outlined"
                onChange={handleChange}
                label="Gender"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {Array.from(new Set(['Male', 'Female'])).map(gender => (
                  <MenuItem key={Math.random(10)} value={gender}>
                    {gender}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="outlined" className={classes.form}>
              <TextField
                label="Address"
                name="address"
                value={address}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                autoComplete="off"
                fullWidth
              />
            </FormControl>

            <FormControl variant="outlined" className={classes.form}>
              <TextField
                label="City"
                name="city"
                value={city}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                autoComplete="off"
                fullWidth
              />
            </FormControl>

            <FormControl variant="outlined" className={classes.form}>
              <TextField
                label="State"
                name="state"
                value={state}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                autoComplete="off"
                fullWidth
              />
            </FormControl>

            <FormControl variant="outlined" className={classes.form}>
              <TextField
                label="Postal Code"
                name="postalCode"
                value={postalCode}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                autoComplete="off"
                fullWidth
              />
            </FormControl>

            <FormControl variant="outlined" className={classes.form}>
              <Button
                fullWidth
                onClick={() => setCount(count + 1)}
                variant="contained"
                color="primary"
                className={classes.otpBtn}
              >
                Continue
              </Button>
            </FormControl>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default StepOne;
